# PRODUCT.md — getenv.in

> Read this before any product, page or copy decision. Technical details about the
> existing codebase live in CLAUDE.md. If the two conflict, ask; don't guess.

## 1. What getenv is (now)

getenv.in is pivoting from "a free .env file generator" to:

**Battle-tested AI coding environments for building Indian software.**

We sell **Kits**: drop-in environments for AI coding agents (Claude Code first; Cursor,
Antigravity and Codex via AGENTS.md). With a kit, an agent builds hard India-specific business
flows (subscriptions with UPI Autopay, GST invoicing, WhatsApp bots, DPDP compliance)
**correctly the first time**, and the agent has to *prove* that by passing the kit's test suite.

Tagline: **"Not prompts. Proven environments."**
Hero line: *"AI agents write code fast. They get Indian payments, GST and WhatsApp logic
wrong. getenv kits fix that."*

The existing free .env generator **stays**. It's the free entry point that brings developers in.

## 2. Why people pay (the moat). Never sell what's free.

Free stuff already floods the internet: generic CLAUDE.md / .cursorrules per stack
(Next.js, FastAPI, etc.) and single-API skills (including official Razorpay, Cashfree
and Paytm agent skills). **We never sell those.** A kit is only worth building if it has
all four of these:

| Free stuff online | A getenv kit |
|---|---|
| Generic "write clean Next.js" rules | One **end-to-end business flow** (e.g. subscribe → UPI Autopay mandate → failed payment retry → GST invoice → refund → credit note) |
| Wraps one API | **Glue across services + Indian rules** (Razorpay + GST + email/WhatsApp + DB) |
| Hope the AI got it right | **`verify/` test suite + fixtures**: the agent isn't "done" until the tests pass |
| Written once, goes stale | **Maintained**: updates when APIs or rules change, with every rule cited in `SOURCES.md` |

If a kit idea fails this table, kill it.

## 3. Who it's for

- **Primary:** Indian indie hackers, freelancers and small dev agencies building SaaS
  or client projects with AI coding agents. They know how to code, but they don't want to spend
  2 weeks learning UPI Autopay edge cases or GST place-of-supply rules.
- **Secondary:** no-code/automation builders who use Claude Code for client work.
- **Not for (v1):** large enterprises, non-Indian markets.

## 4. Kit anatomy (every kit ships this structure)

```
kit-name/
├── CLAUDE.md            # kit section to merge into the project's CLAUDE.md
├── AGENTS.md            # same rules for Cursor / Antigravity / Codex
├── .claude/
│   ├── skills/          # domain playbooks with the edge cases free skills miss
│   ├── commands/        # slash commands, e.g. /add-plan, /test-webhook
│   ├── agents/          # a reviewer subagent that checks domain rules
│   └── settings.json    # hooks: block live keys in commits, run verify/ before "done"
├── verify/              # test suite + fixtures the agent must pass  ← THE MOAT
├── example/             # demo app built 100% by an agent using this kit (proof)
├── SOURCES.md           # official docs/notifications behind every rule
└── CHANGELOG.md
```

## 5. Launch kits (v1)

### 🇮🇳 Kit 1: India Subscription SaaS Kit (₹1,499)
Razorpay Subscriptions done right: plans, UPI Autopay mandates and their limits/edge
cases, webhook signature checks + idempotency, failed payment retry (dunning),
upgrades/downgrades with proration, refunds, a GST invoice for each charge, and a test-mode script.

### 🧾 Kit 2: GST Invoice Engine Kit (₹1,499)
GSTIN format + checksum validation, CGST+SGST vs IGST by place of supply, reverse
charge (RCM) flagging, HSN/SAC handling, financial-year invoice numbering rules,
credit/debit notes, PDF invoices, e-invoice (IRN) JSON ready, GSTR-1 export.
(Built from what we learned building RCM Radar.)

### 💬 Kit 3: WhatsApp Lead Bot Kit (₹999)
WhatsApp Cloud API: opt-in capture, template message approval flow, 24-hour session
window rules, webhook handling, lead store + simple CRM (Supabase), Hinglish replies,
human handoff.

### 🔒 Kit 4: DPDP-Ready App Kit (waitlist, ₹1,999)
Consent notices, consent logs, data-principal rights (access/correct/erase), retention +
deletion jobs, breach log. Hook for the site: the DPDP Rules 2025 obligations for
data fiduciaries apply from **13 May 2027** (the government has discussed shortening
this, so confirm before publishing).

**Bundle:** all launch kits for ₹3,499 (early-bird).
**Updates:** 6 months of updates included.

> ⚠️ GST and DPDP kits are implementation help, **not legal or tax advice**. Say this on the
> kit page and in the kit's README. Every rule must cite its source in SOURCES.md.

## 6. Site structure (v1)

| Route | Purpose |
|---|---|
| `/` | Homepage: hero, "free vs kit" comparison, kit cards, how it works, free .env generator, FAQ |
| `/env` (or keep the current path) | The existing free .env generator. It must keep working. |
| `/kits` | Catalog of all kits |
| `/kits/[slug]` | Kit detail: the problem, what's inside (file tree), edge cases covered, verify/ preview, price, buy/waitlist |
| `/how-it-works` | Install in 3 steps, works with Claude Code / Cursor / Antigravity |
| `/faq` | Refunds, updates, "is this legal advice?", which agents are supported |

**Existing extras** (AI architect, templates, planning workspaces, resource guides):
keep anything that works; **remove "SOON" placeholders from the navigation** (JWT decoder etc.),
because unfinished features make the site look unfinished.

## 7. Payments & delivery (v1, keep it simple)

- **Live kits:** Razorpay Payment Page/Link per kit. After payment the buyer gets a download
  link or a private GitHub repo invite by email (manual at first is fine; automate later).
- **Kits not ready yet:** waitlist form (email only).
- **Privacy promise stays:** no accounts and no tracking beyond what the payment needs.
  Collect only the email.

## 8. Success metrics (first 60 days)

- 200 waitlist emails
- 20 paid kits sold
- At least 1 kit has a public demo (`example/`) people can see working

## 9. Out of scope for v1

User accounts/dashboards, subscriptions for getenv itself, a marketplace for third-party
kits, non-Indian kits, a mobile app.

## 10. Decisions log

| Date | Decision |
|---|---|
| 2026-11-26 | Pivot to AI coding environment kits; keep the free .env generator |
| 2026-11-26 | Only sell what fails the "already free online" test |
| 2026-11-26 | v1 kits: Subscription SaaS, GST Invoice Engine, WhatsApp Lead Bot; DPDP on waitlist |
