#!/usr/bin/env node
/**
 * Local dev server for getenv.in (no dependencies).
 *
 *   node scripts/dev-server.js            -> http://localhost:3000
 *   node scripts/dev-server.js 8080       -> custom port
 *
 * Mirrors production (Vercel):
 *  - serves files from the repo root, `dir/` -> `dir/index.html`
 *  - unknown extension-less paths fall back to /index.html (the SPA rewrite in vercel.json)
 *  - applies the security headers from vercel.json, so CSP problems show up locally too
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.argv[2] || process.env.PORT || 3000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2'
};

function loadHeaders() {
  try {
    const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
    const all = (cfg.headers || []).find(h => h.source === '/(.*)');
    return all ? all.headers.filter(h => h.key !== 'Strict-Transport-Security') : [];
  } catch (e) {
    return [];
  }
}
const SECURITY_HEADERS = loadHeaders();

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const abs = path.normalize(path.join(ROOT, clean));
  if (!abs.startsWith(ROOT)) return null; // path traversal guard

  if (fs.existsSync(abs) && fs.statSync(abs).isFile()) return abs;
  const asIndex = path.join(abs, 'index.html');
  if (fs.existsSync(asIndex)) return asIndex;
  // SPA fallback for "pretty" routes like /kits/gst-invoice-engine
  if (!path.extname(clean)) return path.join(ROOT, 'index.html');
  return null;
}

const server = http.createServer((req, res) => {
  SECURITY_HEADERS.forEach(h => res.setHeader(h.key, h.value));
  const file = resolveFile(req.url);
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    console.log(`404 ${req.url}`);
    return;
  }
  res.writeHead(200, {
    'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store'
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, () => {
  console.log(`getenv.in dev server running at http://localhost:${PORT}  (Ctrl+C to stop)`);
});
