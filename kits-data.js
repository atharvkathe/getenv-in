/* ==========================================================================
   kits-data.js — EDIT KITS HERE. Components read everything from this file.
   --------------------------------------------------------------------------
   Kit fields
     slug         URL id -> /kits/<slug>
     name         Display name
     status       'live' (buy button) or 'waitlist' (waitlist form)
     price        Price in rupees (number). Shown as ₹1,499
     problem      One-line problem (kit cards)
     summary      2–3 sentence description (detail page intro)
     buyUrl       Razorpay Payment Page / Link. Anything containing
                  'REPLACE_WITH' is treated as a placeholder: the button stays
                  visible but shows "Checkout opens soon" instead of navigating.
     legalNote    true -> show the "not legal or tax advice" notice
     edgeCases    List of edge cases covered. First 3 are shown on kit cards.
     fileTree     Lines of the file tree preview (plain text, monospace)
     verify       Example verify/ output lines shown on the detail page
     services     Services the kit glues together
     notice       Optional extra note on the detail page (or null)
   NOTE: file trees, edge-case lists and verify previews are draft copy written
   from PRODUCT.md. Check them against the real kits before launch.
   ========================================================================== */

const KIT_SETTINGS = {
  currency: '₹',
  updatesMonths: 6,
  priceNote: 'one-time · 6 months of updates',
  bundle: {
    name: 'Launch bundle',
    description: 'All launch kits, early-bird price.',
    price: 3499,
    buyUrl: 'https://rzp.io/l/REPLACE_WITH_BUNDLE_LINK'
  },
  // Waitlist → Google Sheet via the Apps Script web app in waitlist/Code.gs.
  // Paste the web app URL from Deploy → Manage deployments (ends in /exec), e.g.
  //   'https://script.google.com/macros/s/AKfy.../exec'
  // Setup steps: waitlist/README.md. vercel.json already allows script.google.com.
  // While this is null the form validates the email and says signups aren't open yet.
  waitlistEndpoint: null
};

const KITS = [
  {
    slug: 'india-subscription-saas',
    name: 'India Subscription SaaS Kit',
    status: 'live',
    price: 1499,
    problem: 'Razorpay Subscriptions with UPI Autopay, done right the first time.',
    summary: 'Plans, UPI Autopay mandates, signed webhooks, failed-payment retries, upgrades with proration, refunds and a GST invoice for every charge. Your agent builds the whole flow and has to pass verify/ before it can call the job done.',
    buyUrl: 'https://rzp.io/l/REPLACE_WITH_SUBSCRIPTION_KIT_LINK',
    legalNote: false,
    services: ['Razorpay Subscriptions', 'UPI Autopay', 'GST invoicing', 'Email / WhatsApp receipts', 'Your database'],
    edgeCases: [
      'UPI Autopay mandate limits',
      'Webhook signature + idempotency',
      'Failed payment retry (dunning)',
      'Upgrade / downgrade with proration',
      'Refund → credit note',
      'GST invoice per charge',
      'Test-mode script for every event'
    ],
    fileTree: [
      'india-subscription-saas/',
      '├── CLAUDE.md',
      '├── AGENTS.md',
      '├── .claude/',
      '│   ├── skills/razorpay-subscriptions/',
      '│   ├── commands/add-plan.md',
      '│   ├── commands/test-webhook.md',
      '│   ├── agents/billing-reviewer.md',
      '│   └── settings.json',
      '├── verify/',
      '├── example/',
      '├── SOURCES.md',
      '└── CHANGELOG.md'
    ],
    verify: [
      '$ npm run verify',
      '✓ webhook rejects an invalid signature',
      '✓ duplicate webhook event is processed once',
      '✓ charge above mandate limit is refused',
      '✓ failed charge is retried, then subscription halts',
      '✓ GST invoice issued for each successful charge',
      '✓ refund creates a credit note',
      '6 passed'
    ],
    notice: null
  },
  {
    slug: 'gst-invoice-engine',
    name: 'GST Invoice Engine Kit',
    status: 'live',
    price: 1499,
    problem: 'GST invoices your CA won\'t send back: place of supply, RCM, credit notes.',
    summary: 'GSTIN validation with checksum, CGST+SGST vs IGST by place of supply, reverse-charge flagging, HSN/SAC handling, financial-year invoice numbering, credit and debit notes, PDF invoices, e-invoice (IRN) ready JSON and a GSTR-1 export.',
    buyUrl: 'https://rzp.io/l/REPLACE_WITH_GST_KIT_LINK',
    legalNote: true,
    services: ['GSTIN validation', 'PDF invoices', 'e-invoice (IRN) JSON', 'GSTR-1 export', 'Your database'],
    edgeCases: [
      'CGST+SGST vs IGST by place of supply',
      'GSTIN format + checksum',
      'Reverse charge (RCM) flagging',
      'HSN / SAC handling',
      'Financial-year invoice numbering',
      'Credit & debit notes',
      'e-invoice (IRN) JSON + GSTR-1 export'
    ],
    fileTree: [
      'gst-invoice-engine/',
      '├── CLAUDE.md',
      '├── AGENTS.md',
      '├── .claude/',
      '│   ├── skills/gst-rules/',
      '│   ├── commands/new-invoice.md',
      '│   ├── agents/gst-reviewer.md',
      '│   └── settings.json',
      '├── verify/',
      '├── example/',
      '├── SOURCES.md',
      '└── CHANGELOG.md'
    ],
    verify: [
      '$ npm run verify',
      '✓ intra-state supply splits CGST + SGST',
      '✓ inter-state supply charges IGST',
      '✓ invalid GSTIN checksum is rejected',
      '✓ RCM invoice is flagged',
      '✓ invoice number resets each financial year',
      '✓ credit note references the original invoice',
      '6 passed'
    ],
    notice: null
  },
  {
    slug: 'whatsapp-lead-bot',
    name: 'WhatsApp Lead Bot Kit',
    status: 'live',
    price: 999,
    problem: 'A WhatsApp Cloud API lead bot that Meta doesn\'t reject.',
    summary: 'Opt-in capture, the template approval flow, 24-hour session window rules, webhook handling, a lead store with a simple CRM on Supabase, Hinglish replies and handoff to a human.',
    buyUrl: 'https://rzp.io/l/REPLACE_WITH_WHATSAPP_KIT_LINK',
    legalNote: false,
    services: ['WhatsApp Cloud API', 'Supabase', 'Webhooks'],
    edgeCases: [
      '24-hour session window rules',
      'Template message approval flow',
      'Opt-in capture',
      'Webhook handling',
      'Hinglish replies',
      'Human handoff'
    ],
    fileTree: [
      'whatsapp-lead-bot/',
      '├── CLAUDE.md',
      '├── AGENTS.md',
      '├── .claude/',
      '│   ├── skills/whatsapp-cloud-api/',
      '│   ├── commands/new-template.md',
      '│   ├── agents/messaging-reviewer.md',
      '│   └── settings.json',
      '├── verify/',
      '├── example/',
      '├── SOURCES.md',
      '└── CHANGELOG.md'
    ],
    verify: [
      '$ npm run verify',
      '✓ free-form reply blocked outside the 24h window',
      '✓ template message allowed outside the window',
      '✓ message without opt-in is refused',
      '✓ webhook verify-token handshake passes',
      '✓ "talk to a human" hands off the chat',
      '5 passed'
    ],
    notice: null
  },
  {
    slug: 'dpdp-ready-app',
    name: 'DPDP-Ready App Kit',
    status: 'waitlist',
    price: 1999,
    problem: 'Consent, data-principal rights and retention for India\'s DPDP rules.',
    summary: 'Consent notices, consent logs, data-principal rights (access, correct, erase), retention and deletion jobs, and a breach log, wired into your app so your agent builds DPDP features the same way every time.',
    buyUrl: '',
    legalNote: true,
    services: ['Consent logs', 'Rights requests', 'Retention jobs', 'Breach log'],
    edgeCases: [
      'Consent notices + consent logs',
      'Access / correct / erase requests',
      'Retention + deletion jobs',
      'Breach log'
    ],
    fileTree: [
      'dpdp-ready-app/',
      '├── CLAUDE.md',
      '├── AGENTS.md',
      '├── .claude/',
      '│   ├── skills/dpdp-consent/',
      '│   ├── agents/privacy-reviewer.md',
      '│   └── settings.json',
      '├── verify/',
      '├── example/',
      '├── SOURCES.md',
      '└── CHANGELOG.md'
    ],
    verify: [
      '$ npm run verify',
      '✓ processing without consent is blocked',
      '✓ withdrawn consent stops processing',
      '✓ erase request deletes personal data',
      '✓ expired data is removed by the retention job',
      '4 passed'
    ],
    // PRODUCT.md: confirm this date before publishing; it may be shortened.
    notice: 'DPDP Rules 2025 obligations for data fiduciaries are scheduled to apply from 13 May 2027. Check the latest notification, as this timeline may change.'
  }
];

/* Site FAQ (homepage shows the first 5; /faq shows all). */
const SITE_FAQ = [
  {
    q: 'What is a kit, exactly?',
    a: 'A folder you drop into your repo: a CLAUDE.md section, an AGENTS.md, skills, slash commands, a reviewer subagent, hooks, and a verify/ test suite. Your AI agent reads the rules, builds the flow, and isn\'t done until the tests pass.'
  },
  {
    q: 'Which AI coding agents are supported?',
    a: 'Claude Code first. Cursor, Antigravity and Codex work through the AGENTS.md file that ships with every kit.'
  },
  {
    q: 'How do I get the kit after paying?',
    a: 'After payment you get a download link or an invite to a private GitHub repo by email.'
  },
  {
    q: 'Do I get updates?',
    a: 'Yes. Every kit includes 6 months of updates when APIs or rules change. Every rule is cited in the kit\'s SOURCES.md.'
  },
  {
    q: 'Is this legal or tax advice?',
    a: 'No. The GST and DPDP kits are implementation help, not legal or tax advice. Check anything that affects your filings or compliance with a qualified professional.'
  },
  {
    q: 'What about refunds?',
    a: 'We are finalising the refund policy before checkout opens. It will be shown on the payment page before you pay.'
  },
  {
    q: 'Do I need an account?',
    a: 'No. There are no accounts. We only collect the email needed to deliver your kit or add you to a waitlist.'
  },
  {
    q: 'Is the .env generator still free?',
    a: 'Yes. The .env generator stays free, runs entirely in your browser, and nothing you select is sent to a server.'
  },
  {
    q: 'What is a .env file?',
    a: 'A .env file is a simple text configuration file used to store sensitive project configuration and secret key-value pairs (like database credentials, API keys) outside the source code as environment variables.'
  },
  {
    q: 'Why should I use a .env.example file?',
    a: 'A .env.example file acts as a sanitized template of your .env variables, specifying required keys with mock placeholders. It is safe to commit to version control, helping team members onboard quickly.'
  }
];

/* "Free rules online" vs "getenv kit" comparison (PRODUCT.md §2). */
const FREE_VS_KIT = [
  { free: 'Generic "write clean Next.js" rules', kit: 'One end-to-end business flow: subscribe → UPI Autopay mandate → failed-payment retry → GST invoice → refund → credit note' },
  { free: 'Wraps one API', kit: 'Glue across services plus Indian rules: Razorpay + GST + email/WhatsApp + your database' },
  { free: 'Hope the AI got it right', kit: 'A verify/ test suite with fixtures. The agent isn\'t done until the tests pass' },
  { free: 'Written once, goes stale', kit: 'Maintained when APIs or rules change, with every rule cited in SOURCES.md' }
];
