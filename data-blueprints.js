const BLUEPRINT_HEURISTICS = {
  getCategory: function(prompt) {
    const p = prompt.toLowerCase();
    if (p.includes('ai') || p.includes('openai') || p.includes('gpt') || p.includes('image') || p.includes('video') || p.includes('whisper') || p.includes('llm') || p.includes('rag') || p.includes('chat') || p.includes('prompt')) {
      return 'ai-saas';
    }
    if (p.includes('shop') || p.includes('store') || p.includes('ecommerce') || p.includes('checkout') || p.includes('stripe') || p.includes('marketplace') || p.includes('delivery') || p.includes('food') || p.includes('vendor') || p.includes('buyer') || p.includes('seller')) {
      return 'ecommerce';
    }
    if (p.includes('crm') || p.includes('internal') || p.includes('dashboard') || p.includes('admin') || p.includes('pipeline') || p.includes('tracker') || p.includes('portal') || p.includes('company') || p.includes('feedback') || p.includes('ticket')) {
      return 'crm-internal';
    }
    return 'general';
  },

  generateHTML: function(prompt) {
    const category = this.getCategory(prompt);
    
    if (category === 'ai-saas') {
      return {
        execSummary: `Designed a high-throughput, edge-native AI SaaS framework featuring streaming chat responses, semantic vector search capabilities, and a usage-based subscription pricing model. The stack prioritizes serverless compute and scalable vector indexing.`,
        businessProblem: `<ul><li><strong>The Gap:</strong> Businesses need instant, automated insights from unstructured internal documents, but building custom AI pipelines requires specialized, expensive ML talent.</li><li><strong>The Solution:</strong> A self-serve platform where teams can securely upload PDFs, automatically vector-index them, and query them through a specialized chatbot interface.</li><li><strong>Value Proposition:</strong> Reduces manual document processing time by 80% while keeping data securely siloed from public LLM training sets.</li></ul>`,
        userJourney: `
          <li><strong>Acquisition:</strong> User lands on marketing site, tries a live demo of the chatbot using sample data.</li>
          <li><strong>Onboarding:</strong> User registers via Google SSO, is prompted to upload their first proprietary document.</li>
          <li><strong>Activation:</strong> The platform processes the document, user asks a question, and experiences the "Aha!" moment of getting an accurate semantic answer.</li>
          <li><strong>Expansion:</strong> User exhausts free trial tokens, hits the paywall, and converts to a premium recurring subscription to process larger datasets.</li>
        `,
        revenueModel: `<ul><li><strong>Freemium Tier:</strong> $0/mo. Limited to 2 documents and 50 chat queries per month. Used as a lead-generation funnel.</li><li><strong>Pro Tier:</strong> $29/mo. Unlimited documents, up to 1000 queries per month, and priority support.</li><li><strong>Enterprise Tier:</strong> Custom pricing. Dedicated vector namespaces, single-tenant deployment options, and SLA guarantees.</li><li><strong>Unit Economics:</strong> Expected customer acquisition cost (CAC) of $15, with an average customer lifetime value (LTV) of $350. API token costs average $0.02 per query.</li></ul>`,
        techStack: `
          <span class="stat-badge">Next.js (App Router)</span>
          <span class="stat-badge">TypeScript</span>
          <span class="stat-badge">Supabase / PostgreSQL</span>
          <span class="stat-badge">Pinecone Vector DB</span>
          <span class="stat-badge">OpenAI / Anthropic APIs</span>
          <span class="stat-badge">Stripe (Usage Billing)</span>
          <span class="stat-badge">Vercel AI SDK</span>
          <span class="stat-badge">Tailwind CSS</span>
        `,
        folderStructure: `
my-ai-app/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts         # Streams OpenAI GPT responses
│   │   ├── embed/
│   │   │   └── route.ts         # Generates and stores Pinecone vectors
│   │   └── stripe/
│   │       └── webhook/
│   │           └── route.ts     # Handles payment events
│   ├── chat/
│   │   └── page.tsx             # Interactive dashboard UI
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── chat-window.tsx          # Streaming message bubbles
│   ├── ui/                      # Primitive design buttons
│   └── upgrade-modal.tsx        # Payment billing gate
├── lib/
│   ├── openai.ts                # OpenAI SDK instantiation
│   └── pinecone.ts              # Pinecone index references
├── prisma/
│   └── schema.prisma            # Primary DB model definitions
└── package.json
        `.trim(),
        dbSchema: `
-- Core SQL schema for AI generations and subscriptions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  stripe_customer_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  tokens_used INT DEFAULT 0,
  model_name VARCHAR(50) DEFAULT 'gpt-4o',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE vector_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  pinecone_id VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
        `.trim(),
        dbTables: `
<table class="bp-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
  <thead>
    <tr style="border-bottom: 2px solid var(--border-muted); text-align: left;">
      <th style="padding: 8px;">Table Name</th>
      <th style="padding: 8px;">Description</th>
      <th style="padding: 8px;">Primary Keys / Constraints</th>
      <th style="padding: 8px;">RLS Policy</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600;">users</td>
      <td style="padding: 8px;">Core profile records, mapped to Stripe customers.</td>
      <td style="padding: 8px;">id (UUID PK), stripe_customer_id (Unique)</td>
      <td style="padding: 8px; color: var(--accent-color);">Enable. Read own records.</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600;">generations</td>
      <td style="padding: 8px;">Auditing and token counting logs for API billing.</td>
      <td style="padding: 8px;">id (UUID PK), user_id (FK -> users)</td>
      <td style="padding: 8px; color: var(--accent-color);">Enable. Create/Read by authenticated owners.</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600;">vector_documents</td>
      <td style="padding: 8px;">Metadata for raw documents stored in Pinecone vector index.</td>
      <td style="padding: 8px;">id (UUID PK), pinecone_id (Unique Index)</td>
      <td style="padding: 8px; color: var(--accent-color);">Enable. Read/Write limited to active subscribers.</td>
    </tr>
  </tbody>
</table>
        `.trim(),
        erdDiagram: `
erDiagram
    users ||--o{ generations : audit
    users ||--o{ vector_documents : uploads
    users {
        uuid id PK
        varchar email UNIQUE
        varchar stripe_customer_id
    }
    generations {
        uuid id PK
        uuid user_id FK
        text prompt
        text response
        int tokens_used
    }
    vector_documents {
        uuid id PK
        uuid user_id FK
        text content
        varchar pinecone_id
    }
        `.trim(),
        apiRoutePlan: `
<table class="bp-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
  <thead>
    <tr style="border-bottom: 2px solid var(--border-muted); text-align: left;">
      <th style="padding: 8px;">Method</th>
      <th style="padding: 8px;">Endpoint</th>
      <th style="padding: 8px;">Payload</th>
      <th style="padding: 8px;">Response</th>
      <th style="padding: 8px;">Auth Required</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600; color: #3b82f6;">POST</td>
      <td style="padding: 8px; font-family: monospace;">/api/chat</td>
      <td style="padding: 8px; font-family: monospace;">{ messages: Message[] }</td>
      <td style="padding: 8px;">ReadableStream (chunks)</td>
      <td style="padding: 8px; color: var(--accent-color);">Yes (JWT check)</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600; color: #3b82f6;">POST</td>
      <td style="padding: 8px; font-family: monospace;">/api/embed</td>
      <td style="padding: 8px; font-family: monospace;">{ text: string }</td>
      <td style="padding: 8px; font-family: monospace;">{ success: true, count: number }</td>
      <td style="padding: 8px; color: var(--accent-color);">Yes (Premium scope)</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600; color: #ef4444;">POST</td>
      <td style="padding: 8px; font-family: monospace;">/api/stripe/webhook</td>
      <td style="padding: 8px;">Raw request binary payload</td>
      <td style="padding: 8px; font-family: monospace;">{ received: true }</td>
      <td style="padding: 8px; color: var(--text-muted);">No (Stripe Signature verification)</td>
    </tr>
  </tbody>
</table>
        `.trim(),
        authFlow: `
          <li>User signs in using Google/GitHub OAuth via Supabase Auth (Client-side trigger).</li>
          <li>Supabase issues a JWT access token, automatically stored in an HTTP-only Cookie.</li>
          <li>Edge API Routes intercept incoming requests and decode the JWT validation signature.</li>
          <li>For premium API routes, a database hook verifies the subscription status before streaming LLM tokens.</li>
        `,
        userRoles: `
          <li><strong>Free Tier User:</strong> Limited to 20 API requests/day, standard rate-limiting, models capped at GPT-4o-mini.</li>
          <li><strong>Premium Tier User:</strong> Unlimited queries, access to vector storage uploads, advanced models (Claude 3.5 Sonnet).</li>
          <li><strong>System Admin:</strong> Can override rate limits, inspect generation telemetry logs, and refund active invoices.</li>
        `,
        envVariables: `
# Database Configuration
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.supabase.co:5432/postgres"

# AI Engine Credentials
OPENAI_API_KEY="sk-proj-..."
PINECONE_API_KEY="pc_..."
PINECONE_ENVIRONMENT="us-east-1-aws"

# Billing Configuration
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_APP_URL="https://getenv.in"
        `.trim(),
        deploymentStrategy: `
          <li><strong>Frontend Host:</strong> Vercel Global Edge Network with region-localized Serverless runtimes.</li>
          <li><strong>Database Engine:</strong> Supabase serverless PostgreSQL with connection pooling (PgBouncer).</li>
          <li><strong>CI/CD Pipeline:</strong> GitHub Actions triggering automated code linting, typescript checking, and production branch deployments.</li>
        `,
        infraCost: `
<table class="bp-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
  <thead>
    <tr style="border-bottom: 2px solid var(--border-muted); text-align: left;">
      <th style="padding: 8px;">Resource</th>
      <th style="padding: 8px;">Provider</th>
      <th style="padding: 8px;">Billing Tier</th>
      <th style="padding: 8px;">Estimated Base Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px;">Serverless Compute</td>
      <td style="padding: 8px;">Vercel</td>
      <td style="padding: 8px;">Pro Team license</td>
      <td style="padding: 8px; font-family: monospace;">$20.00/mo</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px;">Relational Database</td>
      <td style="padding: 8px;">Supabase</td>
      <td style="padding: 8px;">Pro Tier (PgBouncer enabled)</td>
      <td style="padding: 8px; font-family: monospace;">$25.00/mo</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px;">Vector Search Index</td>
      <td style="padding: 8px;">Pinecone</td>
      <td style="padding: 8px;">Serverless starter index</td>
      <td style="padding: 8px; font-family: monospace;">$70.00/mo</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px;">LLM Queries</td>
      <td style="padding: 8px;">OpenAI</td>
      <td style="padding: 8px;">Usage-based API key credits</td>
      <td style="padding: 8px; font-family: monospace;">$150.00/mo (Scaled)</td>
    </tr>
    <tr style="border-bottom: 2px solid var(--border-muted); font-weight: bold; background: rgba(34,197,94,0.05);">
      <td style="padding: 8px;" colspan="3">Total Base Cost</td>
      <td style="padding: 8px; font-family: monospace; color: #22c55e;">$265.00/mo</td>
    </tr>
  </tbody>
</table>
        `.trim(),
        devPhases: `
          <div class="roadmap-step active">
            <div class="step-number">Phase 1</div>
            <div class="step-details">
              <h4>Foundational Architecture & Auth (Week 1)</h4>
              <p>Initialize Next.js project. Setup database tables, connection hooks, and configure SSO auth credentials.</p>
            </div>
          </div>
          <div class="roadmap-step">
            <div class="step-number">Phase 2</div>
            <div class="step-details">
              <h4>AI Integration & Core Functions (Week 2)</h4>
              <p>Implement streaming endpoints using Vercel AI SDK. Build document ingestion pipeline with Pinecone embeddings.</p>
            </div>
          </div>
          <div class="roadmap-step">
            <div class="step-number">Phase 3</div>
            <div class="step-details">
              <h4>Billing Gate & Dashboard Assembly (Week 3)</h4>
              <p>Configure Stripe webhook handlers and usage tracking logs. Design full user interface for templates and generation controls.</p>
            </div>
          </div>
        `,
        mvpScope: `
          <li>Responsive streaming chatbot window widget for users.</li>
          <li>PDF file parser tool that converts input paragraphs to embeddings.</li>
          <li>Secure Stripe customer portal checkout and invoice manager.</li>
          <li>Global API rate-limiter logic built inside Next.js edge middleware.</li>
        `,
        scalingPlan: `
          <li><strong>Caching Strategy:</strong> Implement local caching for repeating embedding query hashes using Upstash Redis.</li>
          <li><strong>Processing Queues:</strong> Transition heavy doc analysis jobs from API router execution into specialized worker daemons (BullMQ).</li>
          <li><strong>High Availability:</strong> Shift vector nodes into multi-region clusters to prevent ingestion bottlenecks.</li>
        `,
        thirdPartyServices: `
          <li><strong>OpenAI / Anthropic:</strong> Foundational models (GPT-4o, Claude 3.5).</li>
          <li><strong>Pinecone:</strong> Fully managed serverless vector databases.</li>
          <li><strong>Stripe:</strong> Dynamic recurring subscription management.</li>
          <li><strong>Resend:</strong> Secure transaction and notification emails.</li>
        `,
        archDiagram: `
graph TD
    Client[Browser Client]
    Vercel[Vercel Edge Gateway]
    Supabase[(PostgreSQL DB)]
    Pinecone[(Pinecone Vector DB)]
    OpenAI[OpenAI LLM API]
    Stripe[Stripe Billing API]

    Client -->|HTTPS Request| Vercel
    Vercel -->|SQL Query| Supabase
    Vercel -->|Vector Search| Pinecone
    Vercel -->|Token Streaming| OpenAI
    Vercel -->|Webhook Sync| Stripe
        `.trim()
      };
    }
    
    if (category === 'ecommerce') {
      return {
        execSummary: `Designed a transactional e-commerce/marketplace blueprint featuring distributed checkout states, dynamic product listing cache updates, and multiple split-payout structures for store vendors.`,
        businessProblem: `<ul><li><strong>The Gap:</strong> Independent creators and niche sellers struggle to reach buyers without paying exorbitant fees to massive generalized marketplaces (e.g., Amazon, Etsy).</li><li><strong>The Solution:</strong> A specialized, highly-curated multi-vendor marketplace tailored to a specific industry, giving sellers better margins and buyers a focused shopping experience.</li><li><strong>Value Proposition:</strong> Empowers small businesses to own their storefronts while offloading payment compliance and traffic aggregation to the platform.</li></ul>`,
        userJourney: `
          <li><strong>Discovery:</strong> Buyer finds a product via SEO or social media, lands on a fast-loading edge-cached product page.</li>
          <li><strong>Conversion:</strong> Buyer adds item to cart, creates a seamless account during checkout via magic link, and completes purchase.</li>
          <li><strong>Fulfillment (Vendor):</strong> The seller receives an instant notification, packs the order, and updates the tracking number in their vendor dashboard.</li>
          <li><strong>Payout (Vendor):</strong> Upon delivery confirmation, Stripe Connect automatically routes the funds minus platform fees directly to the vendor's bank account.</li>
        `,
        revenueModel: `<ul><li><strong>Transaction Fee:</strong> The platform takes a flat 10% commission on every successful sale (plus Stripe processing fees).</li><li><strong>Seller Subscriptions (Optional):</strong> $15/mo "Pro Vendor" tier for advanced analytics, priority search placement, and zero-commission on the first 10 sales.</li><li><strong>Promoted Listings:</strong> Sellers can pay per click (PPC) to feature their products at the top of category pages.</li><li><strong>Unit Economics:</strong> High volume, low margin. Focus must be on maximizing Gross Merchandise Value (GMV).</li></ul>`,
        techStack: `
          <span class="stat-badge">Remix (React Framework)</span>
          <span class="stat-badge">TypeScript</span>
          <span class="stat-badge">PostgreSQL (Neon)</span>
          <span class="stat-badge">Prisma ORM</span>
          <span class="stat-badge">Redis (Session Caching)</span>
          <span class="stat-badge">Stripe Connect (Split Payouts)</span>
          <span class="stat-badge">AWS S3 (Product Media)</span>
          <span class="stat-badge">Tailwind CSS</span>
        `,
        folderStructure: `
my-shop-app/
├── app/
│   ├── components/
│   │   ├── cart-drawer.tsx
│   │   └── product-card.tsx
│   ├── routes/
│   │   ├── _index.tsx           # Home landing feed
│   │   ├── products.$id.tsx     # Product listing details
│   │   ├── checkout.tsx         # Stripe gateway interface
│   │   └── webhooks.stripe.ts   # Payout status worker
│   ├── services/
│   │   ├── db.server.ts         # Prisma DB connections
│   │   └── stripe.server.ts     # Payout calculators
│   └── entry.server.tsx
├── prisma/
│   ├── schema.prisma            # Relations: Orders, Users, Products
│   └── seed.ts                  # Mock stock inventory generator
└── package.json
        `.trim(),
        dbSchema: `
-- E-commerce SQL schema
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'buyer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL, -- Stored in cents (integer)
  vendor_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stock_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_amount INT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  stripe_payment_intent VARCHAR(255) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
        `.trim(),
        dbTables: `
<table class="bp-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
  <thead>
    <tr style="border-bottom: 2px solid var(--border-muted); text-align: left;">
      <th style="padding: 8px;">Table Name</th>
      <th style="padding: 8px;">Description</th>
      <th style="padding: 8px;">Primary Keys / Constraints</th>
      <th style="padding: 8px;">RLS Policy</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600;">users</td>
      <td style="padding: 8px;">Stores profiles categorized by role (buyer, vendor, admin).</td>
      <td style="padding: 8px;">id (UUID PK)</td>
      <td style="padding: 8px; color: var(--accent-color);">Enable. Profile updates by account owner.</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600;">products</td>
      <td style="padding: 8px;">Contains listings. Price stored in cents for Stripe safety.</td>
      <td style="padding: 8px;">id (UUID PK), price (INT CHECK > 0)</td>
      <td style="padding: 8px; color: var(--accent-color);">Enable. Read public, update by vendor id.</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600;">orders</td>
      <td style="padding: 8px;">Tracks purchases linked to buyer IDs and payment statuses.</td>
      <td style="padding: 8px;">id (UUID PK), buyer_id (FK -> users)</td>
      <td style="padding: 8px; color: var(--accent-color);">Enable. Read by buyer or vendor.</td>
    </tr>
  </tbody>
</table>
        `.trim(),
        erdDiagram: `
erDiagram
    users ||--o{ products : lists
    users ||--o{ orders : buys
    users {
        uuid id PK
        varchar email
        varchar role
    }
    products {
        uuid id PK
        varchar name
        int price
        uuid vendor_id FK
        int stock_count
    }
    orders {
        uuid id PK
        uuid buyer_id FK
        int total_amount
        varchar status
        varchar stripe_payment_intent
    }
        `.trim(),
        apiRoutePlan: `
<table class="bp-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
  <thead>
    <tr style="border-bottom: 2px solid var(--border-muted); text-align: left;">
      <th style="padding: 8px;">Method</th>
      <th style="padding: 8px;">Endpoint</th>
      <th style="padding: 8px;">Payload</th>
      <th style="padding: 8px;">Response</th>
      <th style="padding: 8px;">Auth Required</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600; color: #10b981;">GET</td>
      <td style="padding: 8px; font-family: monospace;">/products</td>
      <td style="padding: 8px; font-family: monospace;">Query: page, category</td>
      <td style="padding: 8px;">Product[] json list</td>
      <td style="padding: 8px; color: var(--text-muted);">No</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600; color: #3b82f6;">POST</td>
      <td style="padding: 8px; font-family: monospace;">/checkout</td>
      <td style="padding: 8px; font-family: monospace;">{ cartItems: Item[] }</td>
      <td style="padding: 8px; font-family: monospace;">{ stripeUrl: string }</td>
      <td style="padding: 8px; color: var(--accent-color);">Yes</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600; color: #3b82f6;">POST</td>
      <td style="padding: 8px; font-family: monospace;">/api/vendor/register</td>
      <td style="padding: 8px; font-family: monospace;">{ taxInfo, bankDetails }</td>
      <td style="padding: 8px; font-family: monospace;">{ success: true, onboardingUrl: string }</td>
      <td style="padding: 8px; color: var(--accent-color);">Yes (Vendor scope)</td>
    </tr>
  </tbody>
</table>
        `.trim(),
        authFlow: `
          <li>SSO authentication processes email details and links with Auth0/Supabase Auth.</li>
          <li>Cookies track browser session keys and authorize standard CRUD API queries.</li>
          <li>For multi-vendor models, Stripe Connect onboarding yields account IDs referenced in user records.</li>
        `,
        userRoles: `
          <li><strong>Buyer Role:</strong> Can read products, write reviews, and checkout cart items.</li>
          <li><strong>Vendor Role:</strong> Manage product inventory listings and view payment payouts dashboard.</li>
          <li><strong>Platform Admin:</strong> Moderates products, flags fraud orders, and monitors transfer logs.</li>
        `,
        envVariables: `
# Database Endpoint
DATABASE_URL="postgresql://db_user:[PASS]@neon-postgres-endpoint/main"

# Stripe Connect Integration
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_CONNECT_CLIENT_ID="ca_..."

# Cloud Storage Credentials
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_ACCESS_KEY="secret..."
AWS_S3_BUCKET_NAME="my-product-assets-s3"
        `.trim(),
        deploymentStrategy: `
          <li><strong>Frontend Host:</strong> Cloudflare Pages or Fly.io (Node container instance localized with local region pools).</li>
          <li><strong>Database Engine:</strong> Neon PostgreSQL serverless database.</li>
          <li><strong>CI/CD Pipeline:</strong> GitHub Actions automated push hooks checking TypeScript structures and running Cypress integration checks.</li>
        `,
        infraCost: `
<table class="bp-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
  <thead>
    <tr style="border-bottom: 2px solid var(--border-muted); text-align: left;">
      <th style="padding: 8px;">Resource</th>
      <th style="padding: 8px;">Provider</th>
      <th style="padding: 8px;">Billing Tier</th>
      <th style="padding: 8px;">Estimated Base Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px;">Container hosting</td>
      <td style="padding: 8px;">Fly.io</td>
      <td style="padding: 8px;">2x shared CPU instances</td>
      <td style="padding: 8px; font-family: monospace;">$15.00/mo</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px;">Database</td>
      <td style="padding: 8px;">Neon PostgreSQL</td>
      <td style="padding: 8px;">Autoscaling compute tier</td>
      <td style="padding: 8px; font-family: monospace;">$20.00/mo</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px;">Image Asset CDN</td>
      <td style="padding: 8px;">AWS S3 / Cloudflare</td>
      <td style="padding: 8px;">Storage base + bandwidth</td>
      <td style="padding: 8px; font-family: monospace;">$12.00/mo</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px;">Session Storage cache</td>
      <td style="padding: 8px;">Upstash Redis</td>
      <td style="padding: 8px;">Serverless execution counts</td>
      <td style="padding: 8px; font-family: monospace;">$10.00/mo</td>
    </tr>
    <tr style="border-bottom: 2px solid var(--border-muted); font-weight: bold; background: rgba(34,197,94,0.05);">
      <td style="padding: 8px;" colspan="3">Total Base Cost</td>
      <td style="padding: 8px; font-family: monospace; color: #22c55e;">$57.00/mo</td>
    </tr>
  </tbody>
</table>
        `.trim(),
        devPhases: `
          <div class="roadmap-step active">
            <div class="step-number">Phase 1</div>
            <div class="step-details">
              <h4>Database Schema & Products (Week 1)</h4>
              <p>Configure PostgreSQL tables via Prisma. Populate seed data. Design search listings page.</p>
            </div>
          </div>
          <div class="roadmap-step">
            <div class="step-number">Phase 2</div>
            <div class="step-details">
              <h4>Cart Actions & Stripe Gateway (Week 2)</h4>
              <p>Assemble checkout page. Build API route communicating session parameters to Stripe.</p>
            </div>
          </div>
          <div class="roadmap-step">
            <div class="step-number">Phase 3</div>
            <div class="step-details">
              <h4>Vendor Connect & Launch (Week 3)</h4>
              <p>Implement Connect split payouts and vendor invoice views. Deploy production application.</p>
            </div>
          </div>
        `,
        mvpScope: `
          <li>Fully searchable public product catalogue.</li>
          <li>Shopping cart system tracking items locally.</li>
          <li>Stripe checkout webhook integration verifying stock limits.</li>
          <li>Vendor registration pages allowing payout routing setup.</li>
        `,
        scalingPlan: `
          <li><strong>Caching:</strong> Store public product endpoints in global CDNs to limit compute load on postgres queries.</li>
          <li><strong>Inventory:</strong> Secure product count reservation logic in Redis to prevent checkout conflicts during high volume.</li>
        `,
        thirdPartyServices: `
          <li><strong>Stripe:</strong> Payment and payout split gateway.</li>
          <li><strong>Cloudflare / AWS S3:</strong> Asset storage and edge image CDN caches.</li>
          <li><strong>Resend:</strong> Automated receipt delivery messages.</li>
        `,
        archDiagram: `
graph TD
    Client[Browser Client]
    Remix[Remix Backend Node App]
    Postgres[(Neon Postgres Database)]
    Redis[(Upstash Redis Session)]
    S3[AWS S3 Asset Bucket]
    Stripe[Stripe Connect Gateway]

    Client -->|Render views| Remix
    Remix -->|Prisma queries| Postgres
    Remix -->|Session context| Redis
    Remix -->|Upload media| S3
    Remix -->|Split checkouts| Stripe
        `.trim()
      };
    }

    if (category === 'crm-internal') {
      return {
        execSummary: `Designed a secure, role-based corporate administration dashboard and client tracker prioritizing database safety, strict audit trail logging, and enterprise CRM pipelines.`,
        businessProblem: `<ul><li><strong>The Gap:</strong> Sales and operations teams are managing complex, high-value deals using fragmented spreadsheets, leading to lost data and poor visibility for executives.</li><li><strong>The Solution:</strong> A centralized, SOC2-compliant deal pipeline with strict access controls, automated stage tracking, and immutable audit logs.</li><li><strong>Value Proposition:</strong> Increases sales team efficiency by standardizing workflows and provides management with real-time forecasting dashboards.</li></ul>`,
        userJourney: `
          <li><strong>Authentication:</strong> Employee logs in via their corporate Identity Provider (e.g., Okta) via SAML SSO.</li>
          <li><strong>Daily Workflow:</strong> Employee views their personalized Kanban board, dragging and dropping active deals across pipeline stages.</li>
          <li><strong>Collaboration:</strong> Employee leaves internal notes on a deal profile and tags a manager for pricing approval.</li>
          <li><strong>Reporting (Admin):</strong> An executive opens the analytics tab to view team performance, conversion rates, and the quarter's projected revenue.</li>
        `,
        revenueModel: `<ul><li><strong>Per-Seat Licensing (B2B SaaS):</strong> $45/user/month billed annually.</li><li><strong>Enterprise Contracts:</strong> $15,000+ ACV (Annual Contract Value) for large organizations requiring custom integrations, SLA guarantees, and dedicated account managers.</li><li><strong>Implementation Fees:</strong> One-time $2,000 setup fee for data migration from legacy systems and team training.</li><li><strong>Unit Economics:</strong> High LTV, low churn. The stickiness of a CRM means once a company is onboarded, they rarely leave. Focus is on reducing high initial acquisition and sales costs.</li></ul>`,
        techStack: `
          <span class="stat-badge">React (Vite App)</span>
          <span class="stat-badge">FastAPI (Python)</span>
          <span class="stat-badge">PostgreSQL (Supabase)</span>
          <span class="stat-badge">SQLAlchemy ORM</span>
          <span class="stat-badge">Redis (Task Queue)</span>
          <span class="stat-badge">WorkOS (SSO Auth)</span>
          <span class="stat-badge">Tailwind CSS</span>
        `,
        folderStructure: `
my-crm-system/
├── backend/
│   ├── app/
│   │   ├── database/
│   │   │   └── session.py       # DB Session handlers
│   │   ├── models/
│   │   │   └── models.py        # Users, Logs, Deals, Contacts
│   │   ├── routers/
│   │   │   ├── auth.py          # WorkOS integration endpoint
│   │   │   ├── pipeline.py      # CRM Deal pipeline actions
│   │   │   └── activity.py      # Logging middleware
│   │   └── main.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard-shell.tsx
│   │   │   └── kanban-board.tsx
│   │   ├── hooks/
│   │   │   └── use-auth.tsx
│   │   └── main.tsx
└── package.json
        `.trim(),
        dbSchema: `
-- CRM SQL schema definitions
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  role VARCHAR(50) DEFAULT 'employee',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  value_cents INT NOT NULL,
  stage VARCHAR(50) DEFAULT 'lead',
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(255) NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
        `.trim(),
        dbTables: `
<table class="bp-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
  <thead>
    <tr style="border-bottom: 2px solid var(--border-muted); text-align: left;">
      <th style="padding: 8px;">Table Name</th>
      <th style="padding: 8px;">Description</th>
      <th style="padding: 8px;">Primary Keys / Constraints</th>
      <th style="padding: 8px;">RLS Policy</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600;">teams</td>
      <td style="padding: 8px;">Defines company workspace partitions.</td>
      <td style="padding: 8px;">id (UUID PK)</td>
      <td style="padding: 8px; color: var(--accent-color);">Enable. Capped by admin control.</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600;">users</td>
      <td style="padding: 8px;">Tracks employee information, roles, and teams.</td>
      <td style="padding: 8px;">id (UUID PK), team_id (FK -> teams)</td>
      <td style="padding: 8px; color: var(--accent-color);">Enable. Read by same team members.</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600;">deals</td>
      <td style="padding: 8px;">CRM pipeline card data tracking opportunity size.</td>
      <td style="padding: 8px;">id (UUID PK), assigned_to (FK -> users)</td>
      <td style="padding: 8px; color: var(--accent-color);">Enable. Read/Write limited to assigned team.</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600;">audit_logs</td>
      <td style="padding: 8px;">Immutable log entries tracking administrative behaviors.</td>
      <td style="padding: 8px;">id (UUID PK)</td>
      <td style="padding: 8px; color: var(--accent-color);">ReadOnly policies. Write allowed from application backend.</td>
    </tr>
  </tbody>
</table>
        `.trim(),
        erdDiagram: `
erDiagram
    teams ||--o{ users : contains
    users ||--o{ deals : manages
    users ||--o{ audit_logs : triggers
    teams {
        uuid id PK
        varchar name
    }
    users {
        uuid id PK
        varchar email
        uuid team_id FK
        varchar role
    }
    deals {
        uuid id PK
        varchar title
        int value_cents
        varchar stage
        uuid assigned_to FK
    }
    audit_logs {
        uuid id PK
        uuid user_id FK
        varchar action
        timestamptz timestamp
    }
        `.trim(),
        apiRoutePlan: `
<table class="bp-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
  <thead>
    <tr style="border-bottom: 2px solid var(--border-muted); text-align: left;">
      <th style="padding: 8px;">Method</th>
      <th style="padding: 8px;">Endpoint</th>
      <th style="padding: 8px;">Payload</th>
      <th style="padding: 8px;">Response</th>
      <th style="padding: 8px;">Auth Required</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600; color: #10b981;">GET</td>
      <td style="padding: 8px; font-family: monospace;">/api/deals</td>
      <td style="padding: 8px; font-family: monospace;">Query: stage, assigned_to</td>
      <td style="padding: 8px;">Deal[] list JSON</td>
      <td style="padding: 8px; color: var(--accent-color);">Yes (Bearer Token)</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600; color: #3b82f6;">POST</td>
      <td style="padding: 8px; font-family: monospace;">/api/deals</td>
      <td style="padding: 8px; font-family: monospace;">{ title: string, value: int }</td>
      <td style="padding: 8px;">Deal model JSON</td>
      <td style="padding: 8px; color: var(--accent-color);">Yes (Employee+ scope)</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600; color: #f59e0b;">PATCH</td>
      <td style="padding: 8px; font-family: monospace;">/api/deals/{id}/stage</td>
      <td style="padding: 8px; font-family: monospace;">{ stage: string }</td>
      <td style="padding: 8px;">Updated deal JSON</td>
      <td style="padding: 8px; color: var(--accent-color);">Yes (Owner/Admin only)</td>
    </tr>
  </tbody>
</table>
        `.trim(),
        authFlow: `
          <li>Identity checks route through WorkOS to coordinate SAML SSO with corporate identity provider (Okta/Azure AD).</li>
          <li>Authorized sessions establish secure HttpOnly JWT credentials mapped to employee profiles.</li>
          <li>Middlewares filter queries to verify roles and record transaction attempts in the audit log database.</li>
        `,
        userRoles: `
          <li><strong>Employee:</strong> Read/Write privileges for deals assigned to them or their team workspace.</li>
          <li><strong>Manager:</strong> Ability to assign deals, execute audits, and view team billing statistics.</li>
          <li><strong>Super Admin:</strong> Full permissions over team structures, database schema adjustments, and permission level profiles.</li>
        `,
        envVariables: `
# API Database URI
DATABASE_URL="postgresql://crm_db_user:[PASS]@supabase-postgresql/crm"

# WorkOS SSO integration secrets
WORKOS_API_KEY="sk_workos_..."
WORKOS_CLIENT_ID="project_..."

# Logger & Task Cache
REDIS_URL="redis://localhost:6379/0"
        `.trim(),
        deploymentStrategy: `
          <li><strong>Server Host:</strong> AWS Elastic Container Service (Fargate Docker environment) positioned behind an AWS Application Load Balancer.</li>
          <li><strong>Database Engine:</strong> Multi-region managed PostgreSQL database with replica fallbacks.</li>
          <li><strong>CI/CD Pipeline:</strong> GitHub Action scripts checking code layouts and running unit tests inside Python virtual containers prior to building final Docker images.</li>
        `,
        infraCost: `
<table class="bp-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
  <thead>
    <tr style="border-bottom: 2px solid var(--border-muted); text-align: left;">
      <th style="padding: 8px;">Resource</th>
      <th style="padding: 8px;">Provider</th>
      <th style="padding: 8px;">Billing Tier</th>
      <th style="padding: 8px;">Estimated Base Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px;">ECS Tasks (Compute)</td>
      <td style="padding: 8px;">AWS Fargate</td>
      <td style="padding: 8px;">2x tasks (0.5 vCPU, 1GB RAM)</td>
      <td style="padding: 8px; font-family: monospace;">$35.00/mo</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px;">Load Balancer</td>
      <td style="padding: 8px;">AWS ALB</td>
      <td style="padding: 8px;">Active ALB standard hours</td>
      <td style="padding: 8px; font-family: monospace;">$22.00/mo</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px;">PostgreSQL Database</td>
      <td style="padding: 8px;">AWS RDS</td>
      <td style="padding: 8px;">db.t4g.micro instance class</td>
      <td style="padding: 8px; font-family: monospace;">$30.00/mo</td>
    </tr>
    <tr style="border-bottom: 2px solid var(--border-muted); font-weight: bold; background: rgba(34,197,94,0.05);">
      <td style="padding: 8px;" colspan="3">Total Base Cost</td>
      <td style="padding: 8px; font-family: monospace; color: #22c55e;">$87.00/mo</td>
    </tr>
  </tbody>
</table>
        `.trim(),
        devPhases: `
          <div class="roadmap-step active">
            <div class="step-number">Phase 1</div>
            <div class="step-details">
              <h4>Enterprise Auth & SAML SSO (Week 1)</h4>
              <p>Configure WorkOS credentials. Map corporate roles to user database profiles. Implement audit logs database schema.</p>
            </div>
          </div>
          <div class="roadmap-step">
            <div class="step-number">Phase 2</div>
            <div class="step-details">
              <h4>CRM Pipeline & Kanban UI (Week 2)</h4>
              <p>Build deal status columns. Wire drag-and-drop actions to database update endpoints. Add security roles middleware validation.</p>
            </div>
          </div>
          <div class="roadmap-step">
            <div class="step-number">Phase 3</div>
            <div class="step-details">
              <h4>Auditing Panel & Deployments (Week 3)</h4>
              <p>Design visual audit logs browser tool. Deploy Docker image files onto AWS Fargate containers.</p>
            </div>
          </div>
        `,
        mvpScope: `
          <li>Workspace division by corporate team IDs.</li>
          <li>Kanban board interface managing CRM pipeline deals.</li>
          <li>Detailed audit logs tracking critical deal stage changes.</li>
          <li>Secure enterprise SAML login integration.</li>
        `,
        scalingPlan: `
          <li><strong>Database Read Replicas:</strong> Deploy read replicas to process intensive reporting dashboard operations.</li>
          <li><strong>Archiving Engine:</strong> Setup automated task logs scheduler migrating older audit records to AWS S3 Glacier storage.</li>
        `,
        thirdPartyServices: `
          <li><strong>WorkOS:</strong> Multi-tenant enterprise SSO provider.</li>
          <li><strong>Sentry:</strong> Advanced server error and trace log auditing.</li>
          <li><strong>Twilio Sendgrid:</strong> Client update transactional email alerts.</li>
        `,
        archDiagram: `
graph TD
    Client[Browser Client]
    ALB[AWS Application Load Balancer]
    Fargate[ECS FastAPI Task Containers]
    RDS[(AWS RDS Postgres DB)]
    WorkOS[WorkOS SSO API]

    Client -->|SAML Session| ALB
    ALB -->|Forward Request| Fargate
    Fargate -->|Read/Write schema| RDS
    Fargate -->|OAuth validation| WorkOS
        `.trim()
      };
    }

    // fallback category: general
    return {
      execSummary: `Designed a standard web application architecture optimized for quick release iterations, featuring relational database schemas, clear API pathways, and edge compute servers.`,
      businessProblem: `<ul><li><strong>The Gap:</strong> A generalized problem statement where users need a digital solution to track, manage, or share data efficiently.</li><li><strong>The Solution:</strong> A responsive, fast web application providing standard CRUD (Create, Read, Update, Delete) capabilities.</li><li><strong>Value Proposition:</strong> Saves users time, organizes their data, and provides accessibility from any device.</li></ul>`,
      userJourney: `
        <li><strong>Onboarding:</strong> User registers for an account to save their preferences.</li>
        <li><strong>Core Loop:</strong> User creates new records, edits existing entries, and organizes their data.</li>
        <li><strong>Retention:</strong> The application sends periodic email summaries or notifications to bring the user back.</li>
      `,
      revenueModel: `<ul><li><strong>Standard Subscription:</strong> $9.99/mo for core features.</li><li><strong>Premium Features:</strong> Paywalls for advanced data exports, integrations, or increased storage limits.</li></ul>`,
      techStack: `
        <span class="stat-badge">Next.js (App Router)</span>
        <span class="stat-badge">TypeScript</span>
        <span class="stat-badge">PostgreSQL (Neon)</span>
        <span class="stat-badge">Prisma ORM</span>
        <span class="stat-badge">Stripe (Payment Gate)</span>
        <span class="stat-badge">Tailwind CSS</span>
      `,
      folderStructure: `
my-web-app/
├── app/
│   ├── api/
│   │   └── route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── lib/
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
└── package.json
      `.trim(),
      dbSchema: `
-- General relational SQL schema
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
      `.trim(),
      dbTables: `
<table class="bp-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
  <thead>
    <tr style="border-bottom: 2px solid var(--border-muted); text-align: left;">
      <th style="padding: 8px;">Table Name</th>
      <th style="padding: 8px;">Description</th>
      <th style="padding: 8px;">Primary Keys / Constraints</th>
      <th style="padding: 8px;">RLS Policy</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600;">users</td>
      <td style="padding: 8px;">Stores user profile configuration profiles.</td>
      <td style="padding: 8px;">id (UUID PK)</td>
      <td style="padding: 8px; color: var(--accent-color);">Enable. Read own records.</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600;">tasks</td>
      <td style="padding: 8px;">General schema database records mapping lists to users.</td>
      <td style="padding: 8px;">id (UUID PK), user_id (FK -> users)</td>
      <td style="padding: 8px; color: var(--accent-color);">Enable. Read/Write limited to owners.</td>
    </tr>
  </tbody>
</table>
      `.trim(),
      erdDiagram: `
erDiagram
    users ||--o{ tasks : creates
    users {
        uuid id PK
        varchar email
    }
    tasks {
        uuid id PK
        uuid user_id FK
        varchar title
        boolean completed
    }
      `.trim(),
      apiRoutePlan: `
<table class="bp-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
  <thead>
    <tr style="border-bottom: 2px solid var(--border-muted); text-align: left;">
      <th style="padding: 8px;">Method</th>
      <th style="padding: 8px;">Endpoint</th>
      <th style="padding: 8px;">Payload</th>
      <th style="padding: 8px;">Response</th>
      <th style="padding: 8px;">Auth Required</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600; color: #10b981;">GET</td>
      <td style="padding: 8px; font-family: monospace;">/api/tasks</td>
      <td style="padding: 8px; font-family: monospace;">None</td>
      <td style="padding: 8px;">Task[] JSON array</td>
      <td style="padding: 8px; color: var(--accent-color);">Yes</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px; font-weight: 600; color: #3b82f6;">POST</td>
      <td style="padding: 8px; font-family: monospace;">/api/tasks</td>
      <td style="padding: 8px; font-family: monospace;">{ title: string }</td>
      <td style="padding: 8px;">Task object JSON</td>
      <td style="padding: 8px; color: var(--accent-color);">Yes</td>
    </tr>
  </tbody>
</table>
      `.trim(),
      authFlow: `
        <li>Sign in via credential forms triggers JWT session generation handlers.</li>
        <li>Access tokens store user scopes checked inside serverless edge APIs.</li>
      `,
      userRoles: `
        <li><strong>Standard User:</strong> Read/Write privileges for database resources they own.</li>
        <li><strong>System Admin:</strong> Full permissions over billing lists, dashboards, and error logs.</li>
      `,
      envVariables: `
DATABASE_URL="postgresql://db_user:[PASS]@neon-postgres-endpoint/main"
NEXT_PUBLIC_APP_URL="https://getenv.in"
STRIPE_SECRET_KEY="sk_test_..."
      `.trim(),
      deploymentStrategy: `
        <li><strong>Frontend Host:</strong> Vercel Global Edge Server platform.</li>
        <li><strong>Database Engine:</strong> Neon serverless PostgreSQL.</li>
        <li><strong>CI/CD Pipeline:</strong> GitHub Actions build validation runs.</li>
      `,
      infraCost: `
<table class="bp-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
  <thead>
    <tr style="border-bottom: 2px solid var(--border-muted); text-align: left;">
      <th style="padding: 8px;">Resource</th>
      <th style="padding: 8px;">Provider</th>
      <th style="padding: 8px;">Billing Tier</th>
      <th style="padding: 8px;">Estimated Base Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px;">Compute hosting</td>
      <td style="padding: 8px;">Vercel</td>
      <td style="padding: 8px;">Hobby / Free Plan</td>
      <td style="padding: 8px; font-family: monospace;">$0.00/mo</td>
    </tr>
    <tr style="border-bottom: 1px solid var(--border-muted);">
      <td style="padding: 8px;">Database</td>
      <td style="padding: 8px;">Neon PostgreSQL</td>
      <td style="padding: 8px;">Free Tier Pool</td>
      <td style="padding: 8px; font-family: monospace;">$0.00/mo</td>
    </tr>
    <tr style="border-bottom: 2px solid var(--border-muted); font-weight: bold; background: rgba(34,197,94,0.05);">
      <td style="padding: 8px;" colspan="3">Total Base Cost</td>
      <td style="padding: 8px; font-family: monospace; color: #22c55e;">$0.00/mo (Free Starter)</td>
    </tr>
  </tbody>
</table>
      `.trim(),
      devPhases: `
        <div class="roadmap-step active">
          <div class="step-number">Phase 1</div>
          <div class="step-details">
            <h4>Scaffolding & DB Setups (Week 1)</h4>
            <p>Initialize directories. Configure database connection files. Build user schema rules.</p>
          </div>
        </div>
        <div class="roadmap-step">
          <div class="step-number">Phase 2</div>
          <div class="step-details">
            <h4>Features & Layouts (Week 2)</h4>
            <p>Assemble core application page endpoints and connect task routing logic.</p>
          </div>
        </div>
      `,
      mvpScope: `
        <li>Google/Email sign in authentication loops.</li>
        <li>Clean, responsive task board listing and modification capabilities.</li>
      `,
      scalingPlan: `
        <li><strong>Caching:</strong> Store public query endpoints inside Redis caching layers.</li>
      `,
      thirdPartyServices: `
        <li><strong>Stripe:</strong> Payment checkouts gateways.</li>
        <li><strong>Resend:</strong> User authentication email delivery.</li>
      `,
      archDiagram: `
graph TD
    Client[Browser Client]
    Vercel[Vercel Serverless Server]
    Postgres[(Neon Postgres DB)]

    Client -->|Interactive views| Vercel
    Vercel -->|SQL Commands| Postgres
      `.trim()
    };
  }
};
