/**
 * Knowledge Engine
 * 
 * Deep, hierarchical domain expertise for builder personas, business models,
 * software categories, and industry contexts. Used by the Blueprint Engine to compose projects.
 */

const KnowledgeEngine = {
  BuilderPersonas: {
    "Startup Founder": {
      keywords: ["startup", "founder", "entrepreneur", "indie hacker", "solo"],
      goals: ["Find product-market fit", "Raise capital or bootstrap to profitability", "Move fast"],
      painPoints: ["Limited time", "Wearing multiple hats", "Technical debt"],
      budgetConstraints: "Low to Medium. Needs cost-effective scaling.",
      speedRequirements: "Extremely High. MVP needed in weeks.",
      technicalExperience: "Varies from non-technical to full-stack.",
      preferredStack: ["Next.js", "Supabase", "Vercel", "Stripe"],
      commonMistakes: ["Over-engineering the MVP", "Scaling prematurely", "Ignoring distribution"]
    },
    "Agency": {
      keywords: ["agency", "freelancer", "dev shop", "client"],
      goals: ["Deliver high-quality projects on time", "Maximize profit margins", "Create reusable templates"],
      painPoints: ["Scope creep", "Client communication", "Handoffs"],
      budgetConstraints: "Client-defined, usually fixed.",
      speedRequirements: "High. Time is money.",
      technicalExperience: "High. Senior engineers.",
      preferredStack: ["Next.js", "Prisma", "AWS", "Tailwind"],
      commonMistakes: ["Custom building everything", "Poor documentation for handoff"]
    },
    "Enterprise Team": {
      keywords: ["enterprise", "internal tool", "innovation team", "corporate"],
      goals: ["Improve internal efficiency", "Ensure compliance and security", "Integrate with legacy systems"],
      painPoints: ["Slow approval processes", "Siloed data", "Compliance hurdles"],
      budgetConstraints: "High, but requires ROI justification.",
      speedRequirements: "Low to Medium. Quality and security take precedence.",
      technicalExperience: "High, specialized roles.",
      preferredStack: ["Java/C# Backend", "React Frontend", "Kubernetes", "AWS/Azure"],
      commonMistakes: ["Building instead of buying SaaS", "Ignoring UX for internal tools"]
    }
  },

  BusinessModels: {
    "Subscription SaaS": {
      keywords: ["saas", "subscription", "mrr", "monthly", "yearly"],
      revenueMechanics: "Recurring revenue on a monthly or annual basis.",
      advantages: ["Predictable revenue", "High valuation multiples", "Compounding growth"],
      disadvantages: ["High CAC", "Requires continuous value delivery to prevent churn"],
      typicalCustomerJourney: "Free Trial/Freemium -> Starter Tier -> Pro Tier -> Enterprise",
      growthStrategy: ["Content Marketing", "Product-Led Growth (PLG)", "Cold Email"],
      pricingConsiderations: "Tiered pricing based on value metrics (e.g., seats, usage, features).",
      commonMetrics: ["MRR", "ARR", "Churn Rate", "LTV", "CAC"]
    },
    "Marketplace": {
      keywords: ["marketplace", "platform", "commission", "matchmaking", "gig"],
      revenueMechanics: "Take rate or commission on transactions between buyers and sellers.",
      advantages: ["Network effects", "Defensibility at scale", "Low marginal cost of supply"],
      disadvantages: ["Chicken and egg problem", "High initial capital required to build liquidity"],
      typicalCustomerJourney: "User signs up -> Creates listing/Browses -> Transaction occurs -> Platform takes cut",
      growthStrategy: ["Constrain the initial market", "Subsidize the harder side (usually supply)"],
      pricingConsiderations: "Take rate percentage vs flat fee. Who pays the fee?",
      commonMetrics: ["Gross Merchandise Volume (GMV)", "Liquidity", "Take Rate"]
    },
    "Internal Tool": {
      keywords: ["internal", "admin", "efficiency", "backoffice"],
      revenueMechanics: "Cost savings, not direct revenue generation.",
      advantages: ["Defined user base", "Immediate feedback loop", "Clear ROI"],
      disadvantages: ["Often under-resourced", "Poor UX compared to consumer apps"],
      typicalCustomerJourney: "Employee onboarded -> Logs in -> Performs daily tasks -> Saves time",
      growthStrategy: ["Internal adoption campaigns", "Mandatory usage"],
      pricingConsiderations: "N/A - Budget allocated internally.",
      commonMetrics: ["Time Saved", "Error Reduction Rate", "Internal Adoption %"]
    }
  },

  SoftwareCategories: {
    "AI SaaS": {
      keywords: ["ai", "generative", "llm", "openai", "copilot"],
      purpose: "Provide AI-driven value, such as content generation, analysis, or automation.",
      typicalUsers: ["Knowledge Workers", "Creators", "Developers"],
      businessModel: "Subscription SaaS or Usage Based Pricing",
      coreModules: ["AI Prompt Interface", "Credit System", "Output History", "Auth"],
      optionalModules: ["Fine-tuning", "Team Workspaces", "API Access"],
      databaseEntities: ["users", "generations", "credits", "prompts"],
      typicalAPIs: ["POST /api/generate", "GET /api/history", "GET /api/credits"],
      authenticationPattern: "Standard OAuth + Email/Password",
      scalingConsiderations: "LLM API latency and rate limits. Edge functions for fast responses.",
      recommendedIntegrations: ["OpenAI", "Stripe", "Supabase"],
      deploymentStrategy: "Vercel Edge functions for streaming responses. Serverless DB.",
      commonMistakes: ["Not streaming responses", "Ignoring cost per generation in pricing"],
      securityConsiderations: "Prompt injection, data privacy (not training on user data)",
      futureExpansionPaths: ["Enterprise SLAs", "Custom Model Fine-tuning", "Workflow Automations"]
    },
    "CRM": {
      keywords: ["crm", "customer", "leads", "sales", "pipeline"],
      purpose: "Manage interactions with current and potential customers.",
      typicalUsers: ["Sales Teams", "Support Agents", "Founders"],
      businessModel: "Subscription SaaS",
      coreModules: ["Contact Management", "Pipeline Tracking", "Activity Logging"],
      optionalModules: ["Email Sequences", "Quoting/Invoicing", "Lead Scoring"],
      databaseEntities: ["contacts", "companies", "deals", "activities", "users"],
      typicalAPIs: ["GET /api/contacts", "POST /api/deals", "PATCH /api/deals/:id/stage"],
      authenticationPattern: "Role-Based Access Control (RBAC)",
      scalingConsiderations: "High read/write volume during business hours. Complex search queries.",
      recommendedIntegrations: ["Stripe", "Twilio", "Resend"],
      deploymentStrategy: "Node.js API with managed PostgreSQL. Search index like Algolia.",
      commonMistakes: ["Overcomplicating the UI", "Poor import/export functionality"],
      securityConsiderations: "Row-Level Security (RLS) is critical for multi-tenant data isolation.",
      futureExpansionPaths: ["Marketing Automation", "Helpdesk Ticketing"]
    },
    "Marketplace": {
      keywords: ["marketplace", "directory", "booking platform", "peer to peer"],
      purpose: "Connect supply and demand to facilitate transactions.",
      typicalUsers: ["Buyers", "Sellers", "Service Providers"],
      businessModel: "Marketplace (Commission)",
      coreModules: ["Search & Filtering", "Vendor Profiles", "Checkout/Escrow", "Reviews"],
      optionalModules: ["In-app Messaging", "Promoted Listings", "Dispute Resolution"],
      databaseEntities: ["users", "listings", "orders", "reviews", "messages"],
      typicalAPIs: ["GET /api/search", "POST /api/orders", "POST /api/listings"],
      authenticationPattern: "Dual-sided onboarding (Buyer/Seller profiles)",
      scalingConsiderations: "Search indexing must be extremely fast. Image optimization.",
      recommendedIntegrations: ["Stripe Connect", "Resend"],
      deploymentStrategy: "CDN for heavy assets. Robust search engine (e.g., Elasticsearch).",
      commonMistakes: ["Underestimating Stripe Connect complexity", "Leaky marketplace (users transacting off-platform)"],
      securityConsiderations: "Fraud prevention, secure escrow.",
      futureExpansionPaths: ["Value-add services for sellers", "Financing options"]
    },
    "Business Automation Platform": {
      keywords: ["automation", "erp", "internal", "workflow", "management", "operations", "dashboard"],
      purpose: "Digitize and automate core operational workflows for businesses.",
      typicalUsers: ["Managers", "Employees", "Admins"],
      businessModel: "Subscription SaaS or Enterprise Licensing",
      coreModules: ["Dashboard", "Role Management", "Task Queues", "Reporting"],
      optionalModules: ["Approval Workflows", "Audit Logs", "Third-party Syncing"],
      databaseEntities: ["users", "tasks", "logs", "resources"],
      typicalAPIs: ["GET /api/dashboard", "POST /api/tasks", "PATCH /api/tasks/:id"],
      authenticationPattern: "SSO (Single Sign-On) and strict RBAC",
      scalingConsiderations: "High availability required. Background job processing is critical.",
      recommendedIntegrations: ["AWS", "Stripe", "Supabase", "Twilio"],
      deploymentStrategy: "Enterprise-grade infrastructure. Dedicated instances or isolated tenants.",
      commonMistakes: ["Ignoring mobile responsiveness for field workers", "Hardcoding business logic"],
      securityConsiderations: "Audit trails for all actions. Compliance (SOC2/HIPAA) if applicable.",
      futureExpansionPaths: ["Predictive AI analytics", "API access for customers"]
    }
  },

  IndustryContext: {
    "Hair Salon": {
      keywords: ["salon", "hair", "barber", "stylist", "beauty"],
      context: "Service-based, highly schedule-dependent, reliant on repeat customers.",
      specificNeeds: ["Appointment scheduling with buffer times", "Commission tracking for stylists", "Inventory management for color/products"],
      industryKPIs: ["Utilization Rate", "Client Retention %", "Retail to Service Ratio"]
    },
    "Restaurant": {
      keywords: ["restaurant", "food", "dining", "cafe", "qsr"],
      context: "High volume, low margin, fast-paced environment with perishable inventory.",
      specificNeeds: ["Kitchen Display Systems (KDS)", "Table management", "Menu/Ingredient tracking"],
      industryKPIs: ["Ticket Time", "Food Cost %", "Labor Cost %", "RevPASH"]
    },
    "Healthcare": {
      keywords: ["healthcare", "clinic", "medical", "doctor", "patient"],
      context: "Highly regulated, privacy-first, complex billing structures.",
      specificNeeds: ["HIPAA compliance", "Insurance claims processing", "Patient portals", "EHR integration"],
      industryKPIs: ["Days in Accounts Receivable", "Patient Wait Time", "Claim Denial Rate"]
    },
    "Real Estate": {
      keywords: ["real estate", "property", "leasing", "landlord", "tenant"],
      context: "High value transactions or recurring billing, document-heavy workflows.",
      specificNeeds: ["Document signing", "Maintenance ticketing", "Background checks", "Escrow management"],
      industryKPIs: ["Occupancy Rate", "Rent Collection %", "Time to Close"]
    }
  },

  Features: {
    "Authentication": {
      dependencies: ["Supabase Auth", "NextAuth"],
      tables: ["users", "sessions", "oauth_tokens"],
      apiRoutes: ["/api/auth/callback", "/api/auth/session"],
      envVars: ["AUTH_SECRET", "NEXT_PUBLIC_AUTH_URL"],
      securityConcerns: "JWT token exposure, CSRF, XSS. Ensure HTTP-only cookies are used.",
      scalingConsiderations: "Auth checks happen on every request. Consider Edge caching or JWT stateless verification."
    },
    "Payments": {
      dependencies: ["Stripe SDK"],
      tables: ["subscriptions", "invoices", "payment_methods"],
      apiRoutes: ["/api/checkout", "/api/webhooks/stripe"],
      envVars: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
      securityConcerns: "Webhook impersonation. Must cryptographically verify Stripe signatures.",
      scalingConsiderations: "Webhooks must be idempotent. Retries from Stripe can cause duplicate processing if not handled."
    },
    "Notifications": {
      dependencies: ["Resend", "Twilio"],
      tables: ["notifications", "email_logs"],
      apiRoutes: ["/api/notify"],
      envVars: ["RESEND_API_KEY", "TWILIO_SID"],
      securityConcerns: "Spam abuse. Rate limit notification endpoints heavily.",
      scalingConsiderations: "Send emails/SMS asynchronously via background queues to avoid blocking the main thread."
    }
  },

  Integrations: {
    "Stripe": {
      purpose: "Payment processing and subscription billing.",
      setupRequirements: "Create Stripe account, configure webhook endpoints in dashboard.",
      envVars: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "NEXT_PUBLIC_STRIPE_KEY"],
      pricingModel: "2.9% + 30¢ per successful card charge.",
      rateLimits: "100 read operations per second, 100 write operations per second.",
      commonMistakes: "Failing to handle async webhook events, assuming a Checkout Session creation means payment was successful."
    },
    "Resend": {
      purpose: "Transactional email delivery.",
      setupRequirements: "Verify domain DNS records (TXT/SPF/DKIM).",
      envVars: ["RESEND_API_KEY"],
      pricingModel: "$20/mo for 50,000 emails.",
      rateLimits: "10 requests per second.",
      commonMistakes: "Not setting up DKIM, leading to emails landing in Spam folders."
    },
    "Supabase": {
      purpose: "PostgreSQL Database and Auth provider.",
      setupRequirements: "Create project, run migrations, setup RLS policies.",
      envVars: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"],
      pricingModel: "$25/mo Pro tier for 8GB RAM and 100GB storage.",
      rateLimits: "Depends on compute size. Connection pooling via Supavisor required for Serverless.",
      commonMistakes: "Forgetting Row Level Security (RLS) policies, exposing entire database to public."
    },
    "Twilio": {
      purpose: "SMS and Voice communications.",
      setupRequirements: "Purchase phone number and configure messaging service.",
      envVars: ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN"],
      pricingModel: "Pay per message ($0.0079 per SMS).",
      rateLimits: "1 MPS (Message Per Second) for standard numbers.",
      commonMistakes: "A2P 10DLC registration required for US messaging."
    }
  },

  matchSoftwareCategory: function(prompt) {
    const p = prompt.toLowerCase();
    for (const key in this.SoftwareCategories) {
      if (this.SoftwareCategories[key].keywords.some(kw => p.includes(kw))) {
        return { name: key, data: this.SoftwareCategories[key] };
      }
    }
    return { name: "Business Automation Platform", data: this.SoftwareCategories["Business Automation Platform"] }; // Default
  },

  matchBuilderPersona: function(prompt) {
    const p = prompt.toLowerCase();
    for (const key in this.BuilderPersonas) {
      if (this.BuilderPersonas[key].keywords.some(kw => p.includes(kw))) {
        return { name: key, data: this.BuilderPersonas[key] };
      }
    }
    return { name: "Startup Founder", data: this.BuilderPersonas["Startup Founder"] }; // Default
  },

  matchBusinessModel: function(prompt) {
    const p = prompt.toLowerCase();
    for (const key in this.BusinessModels) {
      if (this.BusinessModels[key].keywords.some(kw => p.includes(kw))) {
        return { name: key, data: this.BusinessModels[key] };
      }
    }
    return { name: "Subscription SaaS", data: this.BusinessModels["Subscription SaaS"] }; // Default
  },

  matchIndustryContext: function(prompt) {
    const p = prompt.toLowerCase();
    for (const key in this.IndustryContext) {
      if (this.IndustryContext[key].keywords.some(kw => p.includes(kw))) {
        return { name: key, data: this.IndustryContext[key] };
      }
    }
    return { 
      name: "General Business", 
      data: {
        context: "A standard business environment.",
        specificNeeds: ["Efficiency", "Data tracking"],
        industryKPIs: ["Revenue", "Profit Margin"]
      } 
    }; // Default
  },

  composeProject: function(prompt) {
    const categoryMatch = this.matchSoftwareCategory(prompt);
    const personaMatch = this.matchBuilderPersona(prompt);
    const businessModelMatch = this.matchBusinessModel(prompt);
    const industryMatch = this.matchIndustryContext(prompt);
    
    const category = categoryMatch.data;

    const features = [];
    ["Authentication", "Payments", "Notifications"].forEach(fName => {
      if (this.Features[fName]) features.push({ name: fName, data: this.Features[fName] });
    });

    const integrations = [];
    if (category.recommendedIntegrations) {
      category.recommendedIntegrations.forEach(iName => {
        const cleaned = iName.split(" ")[0];
        if (this.Integrations[cleaned]) integrations.push({ name: cleaned, data: this.Integrations[cleaned] });
      });
    }

    return {
      softwareCategoryName: categoryMatch.name,
      softwareCategory: category,
      builderPersonaName: personaMatch.name,
      builderPersona: personaMatch.data,
      businessModelName: businessModelMatch.name,
      businessModel: businessModelMatch.data,
      industryContextName: industryMatch.name,
      industryContext: industryMatch.data,
      features: features,
      integrations: integrations
    };
  }
};

if (typeof module !== 'undefined' && module.exports) module.exports = KnowledgeEngine;
