#!/usr/bin/env node
/** Unit tests for waitlist/Code.gs (run: node scripts/test-waitlist.js). */
const assert = require('assert');
const { createWaitlistScript } = require('./apps-script-harness');
const create = () => createWaitlistScript({ quiet: true });

const tests = {
  'health check responds'() {
    assert.deepStrictEqual(create().get(), { ok: true, service: 'getenv-waitlist' });
  },
  'valid signup creates header row and stores email + kit'() {
    const s = create();
    assert.deepStrictEqual(s.post({ email: ' Dev@Example.com ', kit: 'dpdp-ready-app', website: '' }), { ok: true });
    const rows = s.rows();
    assert.deepStrictEqual(rows[0], ['Timestamp (UTC)', 'Email', 'Kit']);
    assert.strictEqual(rows.length, 2);
    assert.strictEqual(rows[1][1], 'dev@example.com');
    assert.strictEqual(rows[1][2], 'dpdp-ready-app');
    assert.ok(!Number.isNaN(Date.parse(rows[1][0])));
  },
  'duplicate email + kit is not stored twice'() {
    const s = create();
    s.post({ email: 'a@b.co', kit: 'dpdp-ready-app' });
    assert.deepStrictEqual(s.post({ email: 'A@B.co', kit: 'dpdp-ready-app' }), { ok: true, duplicate: true });
    assert.strictEqual(s.rows().length, 2);
  },
  'same email for a different kit is stored'() {
    const s = create();
    s.post({ email: 'a@b.co', kit: 'dpdp-ready-app' });
    assert.deepStrictEqual(s.post({ email: 'a@b.co', kit: 'gst-invoice-engine' }), { ok: true });
    assert.strictEqual(s.rows().length, 3);
  },
  'invalid email is rejected'() {
    const s = create();
    assert.deepStrictEqual(s.post({ email: 'not-an-email', kit: 'dpdp-ready-app' }), { ok: false, error: 'invalid_email' });
    assert.strictEqual(s.rows().length, 0);
  },
  'invalid kit slug is rejected'() {
    assert.deepStrictEqual(create().post({ email: 'a@b.co', kit: '<script>' }), { ok: false, error: 'invalid_kit' });
  },
  'honeypot submissions are dropped silently'() {
    const s = create();
    assert.deepStrictEqual(s.post({ email: 'bot@spam.co', kit: 'dpdp-ready-app', website: 'http://spam' }), { ok: true });
    assert.strictEqual(s.rows().length, 0);
  },
  'formula-looking email is stored as text'() {
    const s = create();
    s.post({ email: '=cmd@evil.co', kit: 'dpdp-ready-app' });
    assert.strictEqual(s.rows()[1][1], "'=cmd@evil.co");
    assert.deepStrictEqual(s.post({ email: '=cmd@evil.co', kit: 'dpdp-ready-app' }), { ok: true, duplicate: true });
  },
  'malformed and oversized bodies are handled'() {
    const s = create();
    assert.deepStrictEqual(s.post('{not json'), { ok: false, error: 'server_error' });
    assert.deepStrictEqual(s.post('x'.repeat(3000)), { ok: false, error: 'too_large' });
  }
};

let failed = 0;
for (const [name, fn] of Object.entries(tests)) {
  try { fn(); console.log(`ok   ${name}`); } catch (e) { failed++; console.log(`FAIL ${name}\n     ${e.message}`); }
}
console.log(`\n${Object.keys(tests).length - failed}/${Object.keys(tests).length} passed`);
process.exit(failed ? 1 : 0);
