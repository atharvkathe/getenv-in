#!/usr/bin/env node
/**
 * Headless page checker (no npm dependencies; drives a locally installed Chrome/Edge over CDP).
 *
 *   node scripts/check-pages.js [baseUrl] [outDir] [route ...]
 *   node scripts/check-pages.js http://localhost:3000 .tmp/shots / /kits /faq
 *
 * For each route at 375px (mobile) and 1440px (desktop) it reports:
 *  - uncaught JS exceptions, console.error calls, failed requests / CSP violations
 *  - horizontal overflow (page wider than the viewport) and the widest offending elements
 *  - the active SPA view, page title and number of <h1> elements visible
 * and saves a full-page screenshot per route/viewport into outDir.
 * Exit code 1 if any first-party error or overflow was found.
 */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BASE = process.argv[2] || 'http://localhost:3000';
const OUT = path.resolve(process.argv[3] || path.join(os.tmpdir(), 'getenv-shots'));
const ROUTES = process.argv.slice(4).length ? process.argv.slice(4) : ['/'];
const PORT = 9333;
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812, mobile: true, scale: 2 },
  { name: 'desktop', width: 1440, height: 900, mobile: false, scale: 1 }
];
const BROWSERS = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].filter(Boolean);

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const exe = BROWSERS.find(p => fs.existsSync(p));
  if (!exe) throw new Error('No Chrome/Edge found. Set CHROME_PATH.');
  fs.mkdirSync(OUT, { recursive: true });
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'getenv-cdp-'));
  const browser = spawn(exe, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-extensions', 'about:blank'
  ], { stdio: 'ignore' });

  let version;
  for (let i = 0; i < 50 && !version; i++) {
    try { version = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); } catch (e) { await sleep(200); }
  }
  if (!version) throw new Error('Browser did not start');
  const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

  let id = 0;
  const pending = new Map();
  const listeners = [];
  ws.onmessage = ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
    } else if (msg.method) {
      listeners.forEach(fn => fn(msg));
    }
  };
  const send = (method, params = {}) => new Promise((res, rej) => {
    const mid = ++id;
    pending.set(mid, { res, rej });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });

  let events = [];
  listeners.push(msg => {
    if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      events.push({ kind: 'exception', text: (d.exception && d.exception.description || d.text).split('\n')[0], url: d.url || '' });
    } else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      events.push({ kind: 'console.error', text: msg.params.args.map(a => a.value || a.description || '').join(' ').slice(0, 300), url: '' });
    } else if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
      events.push({ kind: 'log', text: msg.params.entry.text.slice(0, 300), url: msg.params.entry.url || '' });
    }
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');

  const origin = new URL(BASE).origin;
  let failures = 0;
  const report = [];

  for (const vp of VIEWPORTS) {
    await send('Emulation.setDeviceMetricsOverride', { width: vp.width, height: vp.height, deviceScaleFactor: vp.scale, mobile: vp.mobile });
    await send('Emulation.setTouchEmulationEnabled', { enabled: vp.mobile });
    for (const route of ROUTES) {
      events = [];
      await send('Page.navigate', { url: BASE + route });
      // Wait for the load event (cold loads can be slow while web fonts download), then let animations settle.
      for (let t = 0; t < 40; t++) {
        await sleep(250);
        const rs = await send('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true });
        if (rs.result.value === 'complete') break;
      }
      await sleep(1200);
      const { result } = await send('Runtime.evaluate', {
        returnByValue: true,
        expression: `(() => {
          const vw = document.documentElement.clientWidth;
          const offenders = [...document.querySelectorAll('body *')]
            .filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.right > vw + 1 && getComputedStyle(el).position !== 'fixed'; })
            .filter(el => !el.closest('[aria-hidden="true"]'))
            .slice(0, 6)
            .map(el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0,2).join('.') : '') + ' right=' + Math.round(el.getBoundingClientRect().right));
          const active = document.querySelector('.view.active-view');
          return {
            title: document.title,
            path: location.pathname,
            activeView: active ? active.id : null,
            h1: active ? [...active.querySelectorAll('h1')].filter(h => h.offsetParent !== null).length : 0,
            scrollWidth: document.documentElement.scrollWidth,
            vw,
            offenders
          };
        })()`
      });
      const info = result.value;
      // Viewport-sized segments (top to bottom, max SEGMENTS) are easier to review than one huge image.
      const base = `${vp.name}${route.replace(/[\/]+/g, '_') || '_root'}`;
      const SEGMENTS = Number(process.env.SEGMENTS || 4);
      const startY = (await send('Runtime.evaluate', { expression: 'window.scrollY', returnByValue: true })).result.value;
      const total = (await send('Runtime.evaluate', { expression: 'document.documentElement.scrollHeight', returnByValue: true })).result.value;
      let file = '';
      for (let s = 0; s < SEGMENTS; s++) {
        const y = startY + s * vp.height;
        if (s > 0 && y >= total) break;
        await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
        await sleep(350);
        const shot = await send('Page.captureScreenshot', { format: 'png' });
        file = path.join(OUT, `${base}-${s + 1}.png`);
        fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
      }

      // A CSP block of a script on another origin is reported against our page URL; treat it as third-party.
      const isThirdPartyCsp = e => /Content Security Policy/.test(e.text) && /'https?:\/\//.test(e.text) && !e.text.includes(`'${origin}`);
      const firstParty = events.filter(e => !isThirdPartyCsp(e) && (!e.url || e.url.startsWith(origin) || e.kind === 'exception'));
      const thirdParty = events.filter(e => !firstParty.includes(e));
      const overflow = info.scrollWidth > info.vw + 1;
      if (firstParty.length || overflow) failures++;
      report.push({ vp: vp.name, route, ...info, overflow, firstParty, thirdParty: thirdParty.length, shot: file });
    }
  }

  // Functional test: drive the .env generator end-to-end (framework -> service -> generate).
  if (process.env.FLOW_GENERATOR) {
    events = [];
    await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
    await send('Page.navigate', { url: BASE + '/env' });
    await sleep(2000);
    const step = async (expr, wait = 0) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true }); if (wait) await sleep(wait); return r.result.value; };
    await step(`sessionStorage.clear(); document.querySelector('.framework-card[data-id="nextjs"]').click()`, 300);
    await step(`document.getElementById('btn-step1-next').click()`, 1800);
    await step(`document.querySelector('.service-checkbox-card[data-id="stripe"]').click()`, 300);
    await step(`document.getElementById('btn-step2-next').click()`, 500);
    // The step transition animation takes a variable time; poll for step 3 (max ~8s).
    for (let t = 0; t < 32 && !(await step(`document.getElementById('step-3-card').classList.contains('active')`)); t++) await sleep(250);
    await sleep(300);
    const out = await step(`({ step3: document.getElementById('step-3-card').classList.contains('active'), raw: document.getElementById('btn-copy-env').getAttribute('data-raw') || '' })`);
    await step(`document.getElementById('tab-btn-example').click()`, 600);
    const example = await step(`document.getElementById('btn-copy-env').getAttribute('data-raw') || ''`);
    const checks = {
      'reached step 3': out.step3,
      'output has NEXT_PUBLIC_ prefix': /NEXT_PUBLIC_/.test(out.raw),
      'output has Stripe vars': /STRIPE_SECRET_KEY=/.test(out.raw),
      '.env.example has empty values': /STRIPE_SECRET_KEY=\s*(#|$)/m.test(example)
    };
    Object.entries(checks).forEach(([k, v]) => { console.log(`${v ? 'ok  ' : 'FAIL'} [generator] ${k}`); if (!v) failures++; });
    events.filter(e => e.kind === 'exception').forEach(e => { console.log(`FAIL [generator] exception: ${e.text}`); failures++; });
  }

  // Functional test: kit pages (legal note, placeholder buy button, waitlist form validation).
  if (process.env.FLOW_KITS) {
    events = [];
    const step = async (expr, wait = 0) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); if (wait) await sleep(wait); return r.result.value; };
    const go = async p => { await send('Page.navigate', { url: BASE + p }); await sleep(1800); };
    const checks = {};

    await go('/kits/gst-invoice-engine');
    checks['GST page shows "not legal or tax advice"'] = await step(`/not legal or tax advice/i.test(document.querySelector('#kit-detail-view .g-notice')?.textContent || '')`);
    await step(`document.querySelector('#kit-detail-view [data-buy-placeholder]').click()`, 300);
    checks['placeholder buy button explains checkout is not live'] = await step(`/Checkout opens soon/.test(document.querySelector('#kit-detail-view .kit-buy .g-form-status').textContent)`);
    checks['URL unchanged after placeholder buy click'] = await step(`location.pathname === '/kits/gst-invoice-engine'`);

    await go('/kits/india-subscription-saas');
    checks['Subscription page has no legal note'] = await step(`!document.querySelector('#kit-detail-view .g-notice')`);

    await go('/kits/dpdp-ready-app');
    checks['DPDP page shows "not legal or tax advice"'] = await step(`/not legal or tax advice/i.test(document.querySelector('#kit-detail-view .g-notice')?.textContent || '')`);
    checks['DPDP page has waitlist form, no buy button'] = await step(`!!document.querySelector('#kit-detail-view form[data-waitlist]') && !document.querySelector('#kit-detail-view [data-buy-placeholder], #kit-detail-view a[href*="rzp"]')`);
    await step(`(() => { const f = document.querySelector('form[data-waitlist]'); f.querySelector('input').value = 'not-an-email'; f.requestSubmit(); })()`, 300);
    checks['waitlist rejects invalid email'] = await step(`document.querySelector('form[data-waitlist] input').getAttribute('aria-invalid') === 'true'`);
    await step(`(() => { KIT_SETTINGS.waitlistEndpoint = null; const f = document.querySelector('form[data-waitlist]'); f.querySelector('input').value = 'dev@example.com'; f.requestSubmit(); })()`, 300);
    checks['waitlist (no backend) says signups are not open yet'] = await step(`/open soon/i.test(document.querySelector('form[data-waitlist] .g-form-status').textContent)`);

    await go('/kits/does-not-exist');
    checks['unknown kit slug redirects to /kits'] = await step(`location.pathname === '/kits' && document.getElementById('kits-view').classList.contains('active-view')`);

    Object.entries(checks).forEach(([k, v]) => { console.log(`${v ? 'ok  ' : 'FAIL'} [kits] ${k}`); if (!v) failures++; });
    events.filter(e => e.kind === 'exception').forEach(e => { console.log(`FAIL [kits] exception: ${e.text}`); failures++; });
  }

  // End-to-end waitlist test against the dev server mock (start it with MOCK_WAITLIST=1),
  // which runs the real waitlist/Code.gs. Exercises the actual form + fetch code path.
  if (process.env.FLOW_WAITLIST) {
    events = [];
    const step = async (expr, wait = 0) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); if (wait) await sleep(wait); return r.result.value; };
    const submit = (email, website = '') => step(`(() => {
      KIT_SETTINGS.waitlistEndpoint = '/__mock/waitlist';
      const f = document.querySelector('form[data-waitlist]');
      f.querySelector('input[name="email"]').value = ${JSON.stringify(email)};
      f.querySelector('input[name="website"]').value = ${JSON.stringify(website)};
      f.requestSubmit();
    })()`, 900);
    const statusText = () => step(`document.querySelector('form[data-waitlist] .g-form-status').textContent`);
    await send('Page.navigate', { url: BASE + '/kits/dpdp-ready-app' });
    await sleep(1800);
    const checks = {};
    // Must be JSON: without the mock, the SPA fallback would answer with index.html.
    checks['mock endpoint is running (start dev server with MOCK_WAITLIST=1)'] = await step(`fetch('/__mock/waitlist/rows').then(r => r.json()).then(Array.isArray).catch(() => false)`);
    await submit('Founder@Example.com');
    checks['signup shows success'] = /You're on the list/.test(await statusText());
    await submit('founder@example.com');
    checks['repeat signup shows "already on the list"'] = /already on the list/.test(await statusText());
    await submit('bot@spam.co', 'http://spam.example');
    const rows = await step(`fetch('/__mock/waitlist/rows').then(r => r.json())`);
    checks['sheet has header + exactly one row'] = Array.isArray(rows) && rows.length === 2;
    checks['row stores lower-cased email and kit slug'] = !!rows && rows[1] && rows[1][1] === 'founder@example.com' && rows[1][2] === 'dpdp-ready-app';
    checks['honeypot submission not stored'] = !!rows && !JSON.stringify(rows).includes('bot@spam.co');
    Object.entries(checks).forEach(([k, v]) => { console.log(`${v ? 'ok  ' : 'FAIL'} [waitlist] ${k}`); if (!v) failures++; });
    events.filter(e => e.kind === 'exception').forEach(e => { console.log(`FAIL [waitlist] exception: ${e.text}`); failures++; });
  }

  ws.close();
  browser.kill();
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) { /* Windows may lock files briefly */ }

  for (const r of report) {
    const flag = (r.firstParty.length || r.overflow) ? 'FAIL' : 'ok  ';
    console.log(`${flag} [${r.vp}] ${r.route} -> ${r.path} view=${r.activeView} h1=${r.h1} width=${r.scrollWidth}/${r.vw} "${r.title}"`);
    if (r.overflow) console.log(`       overflow: ${r.offenders.join(' | ')}`);
    r.firstParty.forEach(e => console.log(`       ${e.kind}: ${e.text} ${e.url}`));
    if (r.thirdParty) console.log(`       (${r.thirdParty} third-party script(s) blocked by CSP/network; not first-party errors)`);
  }
  console.log(`\nScreenshots: ${OUT}`);
  process.exit(failures ? 1 : 0);
}

main().catch(e => { console.error(e); process.exit(2); });
