/* ==========================================================================
   components.js — reusable UI components + kit page renderers.
   Data comes from kits-data.js (KITS, KIT_SETTINGS, SITE_FAQ, FREE_VS_KIT).
   Styling lives in kits.css and uses theme.css tokens only.
   ========================================================================== */

const KitUtils = {
  esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },
  formatPrice(amount) {
    return KIT_SETTINGS.currency + Number(amount).toLocaleString('en-IN');
  },
  isPlaceholderLink(url) {
    return !url || /REPLACE_WITH/i.test(url) || !/^https:\/\//.test(url);
  },
  getKit(slug) {
    return KITS.find(k => k.slug === slug) || null;
  },
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }
};

const Components = {
  /** Small uppercase mono label that sits above a section heading, e.g. // HOW IT WORKS */
  label(text) {
    return `<p class="g-label">// ${KitUtils.esc(text)}</p>`;
  },

  /**
   * Terminal window card.
   * lines: [{ kind: 'cmd' | 'out' | 'ok' | 'dim', text }]
   * Rendered fully for screen readers; the visible copy can be typed out with KitPages.playTerminal().
   */
  terminalCard({ id = '', title = '~/my-saas — claude', lines = [], animate = false } = {}) {
    const lineHtml = lines.map(l => {
      const text = KitUtils.esc(l.text);
      if (l.kind === 'cmd') return `<span class="t-line t-cmd" data-kind="cmd"><span class="t-prompt">$</span> <span class="t-text">${text}</span></span>`;
      return `<span class="t-line t-${l.kind || 'out'}" data-kind="${l.kind || 'out'}"><span class="t-text">${text}</span></span>`;
    }).join('');
    const plain = lines.map(l => (l.kind === 'cmd' ? '$ ' : '') + l.text).join('\n');
    return `
      <figure class="terminal-card" ${id ? `id="${KitUtils.esc(id)}"` : ''} ${animate ? 'data-animate="true"' : ''}>
        <div class="terminal-bar" aria-hidden="true">
          <span class="t-dot"></span><span class="t-dot"></span><span class="t-dot"></span>
          <span class="terminal-title">${KitUtils.esc(title)}</span>
        </div>
        <pre class="terminal-body" aria-hidden="true">${lineHtml}</pre>
        <figcaption class="sr-only">${KitUtils.esc(title)}: ${KitUtils.esc(plain)}</figcaption>
      </figure>`;
  },

  /** "Free rules online" vs "getenv kit" comparison table */
  freeVsKitTable(rows = FREE_VS_KIT) {
    return `
      <div class="fvk-wrap">
        <table class="fvk-table">
          <caption class="sr-only">What free rules online give you compared with a getenv kit</caption>
          <thead>
            <tr><th scope="col">Free rules online</th><th scope="col">getenv kit</th></tr>
          </thead>
          <tbody>
            ${rows.map(r => `
              <tr>
                <td><span class="mark mark-no" aria-hidden="true">✗</span><span class="sr-only">Free: </span>${KitUtils.esc(r.free)}</td>
                <td><span class="mark mark-yes" aria-hidden="true">✓</span><span class="sr-only">Kit: </span>${KitUtils.esc(r.kit)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  },

  statusBadge(kit) {
    return kit.status === 'waitlist' ? '<span class="g-badge">Waitlist</span>' : '';
  },

  price(amount, { note = KIT_SETTINGS.priceNote, size = '' } = {}) {
    return `
      <div class="g-price ${size}">
        <span class="g-price-amount">${KitUtils.formatPrice(amount)}</span>
        ${note ? `<span class="g-price-note">${KitUtils.esc(note)}</span>` : ''}
      </div>`;
  },

  chips(items, max) {
    const list = typeof max === 'number' ? items.slice(0, max) : items;
    return `<ul class="g-chips">${list.map(i => `<li class="g-chip">${KitUtils.esc(i)}</li>`).join('')}</ul>`;
  },

  fileTree(lines, { max } = {}) {
    const list = typeof max === 'number' && lines.length > max ? [...lines.slice(0, max), '└── …'] : lines;
    return `<pre class="g-tree" aria-label="Kit file tree">${list.map(l => KitUtils.esc(l)).join('\n')}</pre>`;
  },

  /** Kit card: whole card is one link; border turns accent on hover/focus. */
  kitCard(kit) {
    return `
      <a class="kit-card" href="/kits/${KitUtils.esc(kit.slug)}" aria-label="${KitUtils.esc(kit.name)}: view kit">
        <div class="kit-card-head">
          <h3 class="kit-card-name">${KitUtils.esc(kit.name)}</h3>
          ${this.statusBadge(kit)}
        </div>
        <p class="kit-card-problem">${KitUtils.esc(kit.problem)}</p>
        ${this.fileTree(kit.fileTree, { max: 5 })}
        ${this.chips(kit.edgeCases, 3)}
        <div class="kit-card-foot">
          ${this.price(kit.price, { note: kit.status === 'waitlist' ? 'join the waitlist' : 'one-time' })}
          <span class="kit-card-link">${kit.status === 'waitlist' ? 'Join waitlist' : 'View kit'} →</span>
        </div>
      </a>`;
  },

  kitGrid(kits = KITS) {
    return `<div class="kit-grid">${kits.map(k => this.kitCard(k)).join('')}</div>`;
  },

  problemCards() {
    const cards = [
      { title: 'AI gets UPI Autopay wrong', body: 'Mandate limits, pre-debit notices, failed-charge retries. Agents skip the edge cases and renewals quietly fail.' },
      { title: 'GST place-of-supply bugs', body: 'CGST+SGST or IGST depends on where the supply lands. Get it wrong and every invoice needs a credit note.' },
      { title: 'WhatsApp 24h window rejections', body: 'Outside the 24-hour session window only approved templates go through. Agents send free text and Meta rejects it.' }
    ];
    return `<div class="problem-grid">${cards.map(c => `
      <article class="g-card problem-card">
        <h3>${KitUtils.esc(c.title)}</h3>
        <p>${KitUtils.esc(c.body)}</p>
      </article>`).join('')}</div>`;
  },

  steps(items) {
    return `<ol class="g-steps">${items.map((s, i) => `
      <li class="g-step">
        <span class="g-step-num" aria-hidden="true">0${i + 1}</span>
        <h3>${KitUtils.esc(s.title)}</h3>
        <p>${s.html || KitUtils.esc(s.body)}</p>
      </li>`).join('')}</ol>`;
  },

  faqList(items) {
    return `<div class="g-faq">${items.map(item => `
      <details class="g-faq-item">
        <summary>${KitUtils.esc(item.q)}</summary>
        <p>${KitUtils.esc(item.a)}</p>
      </details>`).join('')}</div>`;
  },

  legalNotice() {
    return `
      <aside class="g-notice" role="note">
        <strong>Not legal or tax advice.</strong>
        This kit is implementation help, not legal or tax advice. Every rule cites its source in SOURCES.md; check anything that affects your filings or compliance with a qualified professional.
      </aside>`;
  },

  /** Buy button. Placeholder links stay visible but don't navigate. */
  buyButton(kitOrBundle, label) {
    const text = label || `Buy for ${KitUtils.formatPrice(kitOrBundle.price)}`;
    if (KitUtils.isPlaceholderLink(kitOrBundle.buyUrl)) {
      return `<button type="button" class="g-btn g-btn-primary" data-buy-placeholder="${KitUtils.esc(kitOrBundle.name)}">${KitUtils.esc(text)}</button>`;
    }
    return `<a class="g-btn g-btn-primary" href="${KitUtils.esc(kitOrBundle.buyUrl)}" rel="noopener" target="_blank">${KitUtils.esc(text)}</a>`;
  },

  waitlistForm(kit) {
    const id = `waitlist-${kit.slug}`;
    return `
      <form class="g-waitlist" data-waitlist="${KitUtils.esc(kit.slug)}" novalidate>
        <label for="${id}" class="g-field-label">Email for the ${KitUtils.esc(kit.name)} waitlist</label>
        <div class="g-waitlist-row">
          <input id="${id}" name="email" type="email" class="g-input" autocomplete="email" inputmode="email" required>
          <button type="submit" class="g-btn g-btn-primary">Join waitlist</button>
        </div>
        <p class="g-form-status" role="status" aria-live="polite"></p>
        <p class="g-form-hint">Email only. No account, no tracking.</p>
      </form>`;
  },

  kitActions(kit) {
    if (kit.status === 'waitlist') {
      return `${this.price(kit.price, { note: 'planned price · join the waitlist' })}${this.waitlistForm(kit)}`;
    }
    return `
      ${this.price(kit.price)}
      <div class="g-actions">${this.buyButton(kit)}</div>
      <p class="g-form-status" role="status" aria-live="polite"></p>
      <p class="g-form-hint">Secure checkout by Razorpay. Download link or private GitHub repo invite by email.</p>`;
  }
};

/* ==========================================================================
   Page renderers (called by handlePathRoute in app.js)
   ========================================================================== */
const HOW_STEPS = [
  { title: 'Buy', body: 'Pick a kit and pay once with Razorpay. You get a download link or a private GitHub repo invite by email.' },
  { title: 'Drop into repo', body: 'Merge the kit\'s CLAUDE.md section, copy .claude/ and verify/ into your project. Cursor, Antigravity and Codex read AGENTS.md.' },
  { title: 'Agent builds + passes verify/', body: 'Ask your agent for the feature. Hooks run the verify/ suite, and the agent isn\'t done until every test is green.' }
];

const HERO_TERMINAL = [
  { kind: 'cmd', text: 'unzip india-subscription-saas.zip -d .' },
  { kind: 'dim', text: '  + CLAUDE.md  + .claude/  + verify/' },
  { kind: 'cmd', text: 'claude "add yearly plans with UPI Autopay"' },
  { kind: 'dim', text: '  writing mandate flow, webhook handler, GST invoice…' },
  { kind: 'cmd', text: 'npm run verify' },
  { kind: 'ok', text: '✓ 24 passed' }
];

const KitPages = {
  _typingToken: 0,

  setMeta(title, description) {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
  },

  renderHome() {
    const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
    set('hero-terminal', Components.terminalCard({ id: 'hero-terminal-card', lines: HERO_TERMINAL, animate: true }));
    set('home-problems', Components.problemCards());
    set('home-fvk', Components.freeVsKitTable());
    set('home-kits', Components.kitGrid());
    set('home-steps', Components.steps(HOW_STEPS));
    set('home-faq', Components.faqList(SITE_FAQ.slice(0, 5)));
    this.playTerminal(document.getElementById('hero-terminal-card'));
  },

  renderCatalog(container) {
    const live = KITS.filter(k => k.status === 'live').length;
    const b = KIT_SETTINGS.bundle;
    container.innerHTML = `
      <section class="g-section g-page-head">
        ${Components.label('KITS')}
        <h1 class="g-h1">Kits for the flows AI gets wrong</h1>
        <p class="g-lead">${live} live kits and one on the waitlist. Each one is an end-to-end Indian business flow with a test suite your agent has to pass.</p>
      </section>
      <section class="g-section-tight">
        ${Components.kitGrid(KITS)}
      </section>
      <section class="g-section-tight">
        <div class="g-card bundle-card">
          <div>
            ${Components.label('BUNDLE')}
            <h2 class="g-h3">${KitUtils.esc(b.name)}</h2>
            <p class="g-muted">${KitUtils.esc(b.description)} ${KIT_SETTINGS.updatesMonths} months of updates included.</p>
          </div>
          <div class="bundle-buy">
            ${Components.price(b.price, { note: 'early-bird · one-time' })}
            <div class="g-actions">${Components.buyButton(b, 'Buy the bundle')}</div>
            <p class="g-form-status" role="status" aria-live="polite"></p>
          </div>
        </div>
      </section>
      <section class="g-section-tight">
        ${Components.label('EVERY KIT SHIPS WITH')}
        <div class="split">
          <div class="g-text">
            <h2 class="g-h2">Same structure, every kit</h2>
            <p class="g-muted">Rules for your agent, domain skills that cover the edge cases free skills miss, a reviewer subagent, hooks that block live keys in commits, and the verify/ suite that proves the build works.</p>
            <a href="/how-it-works" class="g-btn g-btn-secondary">How it works</a>
          </div>
          ${Components.fileTree(KIT_ANATOMY)}
        </div>
      </section>`;
    this.setMeta('Kits — AI coding environments for Indian software | getenv.in',
      'Drop-in kits for Claude Code, Cursor and Codex: Razorpay subscriptions with UPI Autopay, GST invoicing, WhatsApp lead bots and DPDP compliance, each with a verify/ test suite.');
  },

  renderDetail(container, slug) {
    const kit = KitUtils.getKit(slug);
    if (!kit) return false;
    const others = KITS.filter(k => k.slug !== kit.slug);
    container.innerHTML = `
      <nav class="g-crumbs" aria-label="Breadcrumb"><a href="/kits">Kits</a> <span aria-hidden="true">/</span> <span aria-current="page">${KitUtils.esc(kit.name)}</span></nav>
      <section class="g-section-tight kit-hero">
        <div class="kit-hero-text">
          ${Components.label(kit.status === 'waitlist' ? 'KIT · WAITLIST' : 'KIT')}
          <h1 class="g-h1">${KitUtils.esc(kit.name)}</h1>
          <p class="g-lead">${KitUtils.esc(kit.problem)}</p>
          <p class="g-muted">${KitUtils.esc(kit.summary)}</p>
          ${kit.legalNote ? Components.legalNotice() : ''}
        </div>
        <div class="g-card kit-buy">
          ${Components.kitActions(kit)}
        </div>
      </section>

      <section class="g-section-tight">
        ${Components.label('THE PROBLEM')}
        <div class="g-text">
          <h2 class="g-h2">Why agents get this wrong</h2>
          <p class="g-muted">Free rules and single-API skills cover one service at a time. They miss the glue between services and the Indian rules, so the happy path works and the edge cases break in production. This kit covers:</p>
        </div>
        ${Components.chips(kit.services)}
      </section>

      <section class="g-section-tight">
        <div class="split">
          <div>
            ${Components.label('EDGE CASES COVERED')}
            <h2 class="g-h2">What the kit handles</h2>
            <ul class="g-checklist">${kit.edgeCases.map(e => `<li>${KitUtils.esc(e)}</li>`).join('')}</ul>
          </div>
          <div>
            ${Components.label("WHAT'S INSIDE")}
            <h2 class="g-h2">File tree</h2>
            ${Components.fileTree(kit.fileTree)}
          </div>
        </div>
      </section>

      <section class="g-section-tight">
        ${Components.label('VERIFY/ PREVIEW')}
        <div class="g-text">
          <h2 class="g-h2">Done means the tests pass</h2>
          <p class="g-muted">A sample of the checks your agent runs before it can say it's finished.</p>
        </div>
        ${Components.terminalCard({
          title: `~/my-app — ${kit.slug}/verify`,
          lines: kit.verify.map(t => t.startsWith('$ ')
            ? { kind: 'cmd', text: t.slice(2) }
            : { kind: t.startsWith('✓') ? 'ok' : 'dim', text: t })
        })}
        ${kit.notice ? `<p class="g-muted g-small">${KitUtils.esc(kit.notice)}</p>` : ''}
      </section>

      <section class="g-section-tight">
        ${Components.label('OTHER KITS')}
        ${Components.kitGrid(others)}
      </section>`;
    this.setMeta(`${kit.name} — ${KitUtils.formatPrice(kit.price)} | getenv.in`, `${kit.problem} ${kit.summary}`);
    return true;
  },

  renderHowItWorks(container) {
    container.innerHTML = `
      <section class="g-section g-page-head">
        ${Components.label('HOW IT WORKS')}
        <h1 class="g-h1">Install in 3 steps</h1>
        <p class="g-lead">A kit is a folder of rules, skills and tests. Your agent reads it, builds the flow, and proves it with verify/.</p>
      </section>
      <section class="g-section-tight">
        ${Components.steps(HOW_STEPS)}
      </section>
      <section class="g-section-tight">
        ${Components.label('WORKS WITH')}
        <h2 class="g-h2">Your agent, your editor</h2>
        <div class="fvk-wrap">
          <table class="fvk-table works-table">
            <caption class="sr-only">Which kit files each AI coding agent uses</caption>
            <thead><tr><th scope="col">Agent</th><th scope="col">What it reads</th></tr></thead>
            <tbody>
              <tr><td>Claude Code</td><td>CLAUDE.md, plus .claude/ skills, slash commands, reviewer subagent and hooks</td></tr>
              <tr><td>Cursor</td><td>AGENTS.md</td></tr>
              <tr><td>Antigravity</td><td>AGENTS.md</td></tr>
              <tr><td>Codex</td><td>AGENTS.md</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="g-section-tight">
        <div class="split">
          <div class="g-text">
            ${Components.label('KIT ANATOMY')}
            <h2 class="g-h2">What's in the folder</h2>
            <p class="g-muted">The verify/ suite and its fixtures are the part free rules don't have. Hooks in settings.json run it before your agent says "done", and block live keys from being committed.</p>
          </div>
          ${Components.fileTree(KIT_ANATOMY)}
        </div>
      </section>
      <section class="g-section g-final">
        <h2 class="g-h2">Pick the flow you're building</h2>
        <a href="/kits" class="g-btn g-btn-primary">Browse kits</a>
      </section>`;
    this.setMeta('How it works — getenv kits for Claude Code, Cursor and Codex | getenv.in',
      'Buy a kit, drop it into your repo, and your AI agent builds the flow and passes the verify/ test suite. Works with Claude Code, Cursor, Antigravity and Codex.');
  },

  renderFaq(container) {
    container.innerHTML = `
      <section class="g-section g-page-head">
        ${Components.label('FAQ')}
        <h1 class="g-h1">Questions, answered</h1>
      </section>
      <section class="g-section-tight g-text-wide">
        ${Components.faqList(SITE_FAQ)}
      </section>
      <section class="g-section g-final">
        <h2 class="g-h2">Still deciding?</h2>
        <a href="/kits" class="g-btn g-btn-primary">Browse kits</a>
      </section>`;
    this.setMeta('FAQ — getenv kits | getenv.in', 'Refunds, updates, supported AI agents, delivery, and whether the GST and DPDP kits are legal advice.');
  },

  /** Types out a terminal card's command lines once. Respects prefers-reduced-motion. */
  playTerminal(card) {
    if (!card) return;
    const token = ++this._typingToken;
    const lines = [...card.querySelectorAll('.t-line')];
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || card.dataset.animate !== 'true') return; // final state is already rendered

    const texts = lines.map(l => l.querySelector('.t-text').textContent);
    lines.forEach(l => { l.classList.add('t-hidden'); l.querySelector('.t-text').textContent = ''; });

    let i = 0;
    const next = () => {
      if (token !== this._typingToken || i >= lines.length) return;
      const line = lines[i];
      const target = line.querySelector('.t-text');
      const full = texts[i];
      line.classList.remove('t-hidden');
      if (line.dataset.kind === 'cmd') {
        let c = 0;
        line.classList.add('t-typing');
        const type = () => {
          if (token !== this._typingToken) return;
          target.textContent = full.slice(0, ++c);
          if (c < full.length) setTimeout(type, 28);
          else { line.classList.remove('t-typing'); i++; setTimeout(next, 260); }
        };
        type();
      } else {
        target.textContent = full;
        i++;
        setTimeout(next, 320);
      }
    };
    setTimeout(next, 300);
  },

  /** Delegated handlers for waitlist forms and placeholder buy buttons (bound once). */
  bind() {
    document.addEventListener('submit', async e => {
      const form = e.target.closest('form[data-waitlist]');
      if (!form) return;
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const status = form.querySelector('.g-form-status');
      const email = input.value.trim();
      input.removeAttribute('aria-invalid');
      if (!KitUtils.isValidEmail(email)) {
        input.setAttribute('aria-invalid', 'true');
        status.textContent = 'Enter a valid email address.';
        status.dataset.tone = 'error';
        input.focus();
        return;
      }
      if (!KIT_SETTINGS.waitlistEndpoint) {
        status.textContent = 'Waitlist signups open soon. Nothing was saved, so please check back.';
        status.dataset.tone = 'info';
        return;
      }
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      try {
        const res = await fetch(KIT_SETTINGS.waitlistEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, kit: form.dataset.waitlist })
        });
        if (!res.ok) throw new Error(String(res.status));
        status.textContent = "You're on the list. We'll email you when it opens.";
        status.dataset.tone = 'success';
        form.reset();
      } catch (err) {
        status.textContent = 'Could not join right now. Please try again in a minute.';
        status.dataset.tone = 'error';
      } finally {
        button.disabled = false;
      }
    });

    // Close the header "More tools" menu after choosing a link or clicking elsewhere.
    document.addEventListener('click', e => {
      document.querySelectorAll('details.nav-more[open]').forEach(d => {
        if (!d.contains(e.target) || e.target.closest('.nav-more-menu a')) d.open = false;
      });
    });

    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-buy-placeholder]');
      if (!btn) return;
      const status = btn.closest('.kit-buy, .bundle-buy, .g-card')?.querySelector('.g-form-status');
      if (status) {
        status.textContent = 'Checkout opens soon. The payment link is not live yet.';
        status.dataset.tone = 'info';
      }
    });
  }
};

const KIT_ANATOMY = [
  'kit-name/',
  '├── CLAUDE.md            # kit section to merge into your CLAUDE.md',
  '├── AGENTS.md            # same rules for Cursor / Antigravity / Codex',
  '├── .claude/',
  '│   ├── skills/          # domain playbooks with the edge cases',
  '│   ├── commands/        # slash commands, e.g. /add-plan',
  '│   ├── agents/          # reviewer subagent for domain rules',
  '│   └── settings.json    # hooks: block live keys, run verify/',
  '├── verify/              # tests + fixtures the agent must pass',
  '├── example/             # demo app built by an agent with this kit',
  '├── SOURCES.md           # official docs behind every rule',
  '└── CHANGELOG.md'
];

KitPages.bind();
