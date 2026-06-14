const TEMPLATES_DB = [
  // --- AI SaaS ---
  {
    slug: "ai-copywriter-seo",
    title: "AI Copywriter & SEO Suite",
    desc: "Generate optimized blog posts, social captions, and SEO meta tags using GPT-4 API.",
    complexity: "Intermediate",
    buildTime: "3 days",
    stack: ["Next.js", "OpenAI", "Supabase", "Stripe", "Tailwind"],
    category: "AI SaaS",
    premium: false,
    cost: 15
  },
  {
    slug: "ai-image-generator",
    title: "AI Image Generator Studio",
    desc: "An image creation playground leveraging Midjourney/DALL-E with credits management.",
    complexity: "Advanced",
    buildTime: "1 week",
    stack: ["Next.js", "DALL-E", "Stripe", "Supabase", "S3"],
    category: "AI SaaS",
    premium: true,
    cost: 45
  },
  {
    slug: "video-transcriber",
    title: "Automated Video Transcriber",
    desc: "Upload videos and generate timestamps, transcripts, and speaker diaries automatically.",
    complexity: "Advanced",
    buildTime: "2 weeks",
    stack: ["React", "Node.js", "Whisper API", "MongoDB", "Ffmpeg"],
    category: "AI SaaS",
    premium: false,
    cost: 30
  },
  {
    slug: "ai-chatbot-widget",
    title: "AI Chatbot & Support Widget",
    desc: "Embeddable live chat widget trained on custom helpdocs using vector embeddings.",
    complexity: "Advanced",
    buildTime: "1.5 weeks",
    stack: ["SvelteKit", "Pinecone", "OpenAI", "PostgreSQL", "Socket.io"],
    category: "AI SaaS",
    premium: true,
    cost: 35
  },
  {
    slug: "predictive-analytics",
    title: "Predictive Analytics Engine",
    desc: "Import CSV spreadsheets and run regression models to project sales and customer churn.",
    complexity: "Advanced",
    buildTime: "2 weeks",
    stack: ["Python", "FastAPI", "Pandas", "PostgreSQL", "React"],
    category: "AI SaaS",
    premium: false,
    cost: 50
  },
  {
    slug: "ai-travel-planner",
    title: "AI Travel Planner SaaS",
    desc: "Personalized travel itineraries generated on the fly based on budget, days, and interests.",
    complexity: "Intermediate",
    buildTime: "5 days",
    stack: ["Next.js", "OpenAI", "Mapbox", "Tailwind", "Firebase"],
    category: "AI SaaS",
    premium: false,
    cost: 20
  },

  // --- Marketplaces ---
  {
    slug: "freelancer-marketplace",
    title: "Freelancer Job Marketplace",
    desc: "A two-sided marketplace for contractors and employers with escrow, messaging, and reviews.",
    complexity: "Advanced",
    buildTime: "3 weeks",
    stack: ["Next.js", "Stripe Connect", "PostgreSQL", "Prisma", "Socket.io"],
    category: "Marketplaces",
    premium: true,
    cost: 65
  },
  {
    slug: "digital-asset-store",
    title: "Digital Asset Store",
    desc: "Sell 3D models, code templates, and design resources with instant secure file downloads.",
    complexity: "Intermediate",
    buildTime: "6 days",
    stack: ["Remix", "Stripe", "Supabase", "S3", "Tailwind"],
    category: "Marketplaces",
    premium: false,
    cost: 25
  },
  {
    slug: "food-delivery-network",
    title: "Local Food Delivery Network",
    desc: "Multi-vendor food ordering with interactive driver maps and restaurant dashboards.",
    complexity: "Advanced",
    buildTime: "4 weeks",
    stack: ["React Native", "Node.js", "MongoDB", "Socket.io", "Google Maps"],
    category: "Marketplaces",
    premium: false,
    cost: 80
  },
  {
    slug: "car-rental-hub",
    title: "Car Rental Hub",
    desc: "Peer-to-peer car renting platform with document verification, calendar blocks, and insurance logs.",
    complexity: "Advanced",
    buildTime: "3 weeks",
    stack: ["Next.js", "Firebase", "Stripe", "Mapbox", "Tailwind"],
    category: "Marketplaces",
    premium: true,
    cost: 55
  },
  {
    slug: "p2p-rental-space",
    title: "Peer-to-Peer Rental Space",
    desc: "Rent cameras, tools, or event gear locally with verification checks and security deposits.",
    complexity: "Intermediate",
    buildTime: "1.5 weeks",
    stack: ["React", "Express", "PostgreSQL", "Prisma", "Stripe"],
    category: "Marketplaces",
    premium: false,
    cost: 40
  },
  {
    slug: "saas-directory",
    title: "SaaS Directory & Marketplace",
    desc: "Platform to submit, filter, and buy micro-startups with escrow support.",
    complexity: "Intermediate",
    buildTime: "1 week",
    stack: ["Next.js", "PostgreSQL", "Supabase", "Stripe", "Tailwind"],
    category: "Marketplaces",
    premium: false,
    cost: 30
  },

  // --- Internal Tools ---
  {
    slug: "company-directory-org",
    title: "Company Directory & Org Chart",
    desc: "Visualize corporate structure, search employees, and manage team profiles with SAML SSO.",
    complexity: "Intermediate",
    buildTime: "4 days",
    stack: ["React", "Express", "MongoDB", "WorkOS", "Tailwind"],
    category: "Internal Tools",
    premium: false,
    cost: 15
  },
  {
    slug: "it-asset-tracker",
    title: "IT Asset Tracking Panel",
    desc: "Audit employee hardware, software licenses, serial numbers, and equipment assignments.",
    complexity: "Beginner",
    buildTime: "2 days",
    stack: ["Vue 3", "PocketBase", "Tailwind", "Chart.js"],
    category: "Internal Tools",
    premium: false,
    cost: 10
  },
  {
    slug: "customer-feedback-hub",
    title: "Customer Feedback Hub",
    desc: "Aggregate user feedback, vote on features, and publish public developer roadmaps.",
    complexity: "Intermediate",
    buildTime: "5 days",
    stack: ["Next.js", "Supabase", "Tailwind", "Prisma"],
    category: "Internal Tools",
    premium: false,
    cost: 15
  },
  {
    slug: "content-approval-pipeline",
    title: "Content Approval Pipeline",
    desc: "Workflows for marketing teams to draft, review, comment, and auto-publish blog content.",
    complexity: "Intermediate",
    buildTime: "1 week",
    stack: ["React", "Node.js", "PostgreSQL", "Socket.io", "Tiptap"],
    category: "Internal Tools",
    premium: false,
    cost: 20
  },
  {
    slug: "database-admin-dashboard",
    title: "Database Admin Dashboard",
    desc: "Visual schema viewer and safe querying tool for Postgres databases with row level checks.",
    complexity: "Advanced",
    buildTime: "1.5 weeks",
    stack: ["SvelteKit", "PostgreSQL", "Tailwind", "Chart.js"],
    category: "Internal Tools",
    premium: true,
    cost: 30
  },
  {
    slug: "support-ticket-dispatcher",
    title: "Support Ticket Dispatcher",
    desc: "Assign incoming emails to agents, triage priorities, and log standard SLA response times.",
    complexity: "Intermediate",
    buildTime: "1 week",
    stack: ["React", "FastAPI", "MongoDB", "Tailwind", "Resend"],
    category: "Internal Tools",
    premium: false,
    cost: 25
  },

  // --- CRM ---
  {
    slug: "sales-pipeline-manager",
    title: "Sales Pipeline Manager",
    desc: "Kanban board for deal stages, contract values, contact tracking, and email templates.",
    complexity: "Intermediate",
    buildTime: "6 days",
    stack: ["Next.js", "Supabase", "Tailwind", "Dnd-Kit"],
    category: "CRM",
    premium: false,
    cost: 18
  },
  {
    slug: "real-estate-client-tracker",
    title: "Real Estate Client Tracker",
    desc: "Keep log of home viewings, client preferences, budget metrics, and digital listings.",
    complexity: "Intermediate",
    buildTime: "1 week",
    stack: ["React Native", "Firebase", "Google Maps", "Tailwind"],
    category: "CRM",
    premium: false,
    cost: 22
  },
  {
    slug: "freelance-invoicing-crm",
    title: "Freelance Invoicing & CRM",
    desc: "Track client bills, calculate monthly earnings, send PDF receipts, and configure reminder emails.",
    complexity: "Beginner",
    buildTime: "3 days",
    stack: ["React", "PocketBase", "Stripe", "Tailwind"],
    category: "CRM",
    premium: false,
    cost: 12
  },
  {
    slug: "gym-membership-crm",
    title: "Gym Membership & CRM System",
    desc: "Manage client check-ins, subscription invoices, class schedules, and trainer hours.",
    complexity: "Intermediate",
    buildTime: "1.5 weeks",
    stack: ["Vue 3", "Laravel", "MySQL", "Tailwind"],
    category: "CRM",
    premium: false,
    cost: 25
  },
  {
    slug: "saas-subscription-crm",
    title: "SaaS Subscription CRM",
    desc: "Log active contracts, run stripe subscription forecasts, and visualize user retention patterns.",
    complexity: "Advanced",
    buildTime: "2 weeks",
    stack: ["Next.js", "PostgreSQL", "Stripe", "Prisma", "Chart.js"],
    category: "CRM",
    premium: true,
    cost: 50
  },
  {
    slug: "nonprofit-donor-database",
    title: "Non-profit Donor Database",
    desc: "Monitor recurring contributions, issue tax certificates, and plan direct outreach emails.",
    complexity: "Intermediate",
    buildTime: "5 days",
    stack: ["Next.js", "Supabase", "Stripe", "Resend"],
    category: "CRM",
    premium: false,
    cost: 15
  },

  // --- Developer Tools ---
  {
    slug: "api-mocking-service",
    title: "API Mocking & Testing Service",
    desc: "Generate dynamic REST endpoints with custom JSON schemas for mock API responses.",
    complexity: "Intermediate",
    buildTime: "4 days",
    stack: ["Node.js", "Express", "MongoDB", "React", "Tailwind"],
    category: "Developer Tools",
    premium: false,
    cost: 20
  },
  {
    slug: "log-monitoring-daemon",
    title: "Log Monitoring & Alerting Daemon",
    desc: "Tail server console logs and trigger instant Slack/Discord webhook alerts on runtime errors.",
    complexity: "Advanced",
    buildTime: "2 weeks",
    stack: ["Go", "Redis", "React", "PostgreSQL", "Docker"],
    category: "Developer Tools",
    premium: true,
    cost: 40
  },
  {
    slug: "feature-flag-sdk",
    title: "Feature Flag Management SDK",
    desc: "Tweak variables and roll out changes in real-time without redeploying code.",
    complexity: "Advanced",
    buildTime: "1.5 weeks",
    stack: ["Next.js", "Redis", "PostgreSQL", "Tailwind"],
    category: "Developer Tools",
    premium: true,
    cost: 35
  },
  {
    slug: "markdown-doc-gen",
    title: "Markdown Documentation Generator",
    desc: "Scan repositories, parse code structures, and compile static deployment guides automatically.",
    complexity: "Beginner",
    buildTime: "1 day",
    stack: ["Node.js", "TypeScript", "Commander", "Markdown"],
    category: "Developer Tools",
    premium: false,
    cost: 8
  },
  {
    slug: "db-migration-orchestrator",
    title: "Database Migration Orchestrator",
    desc: "Run diffs on database schemas and generate clean, step-back SQL migration scripts.",
    complexity: "Advanced",
    buildTime: "2 weeks",
    stack: ["Python", "PostgreSQL", "React", "Tailwind"],
    category: "Developer Tools",
    premium: false,
    cost: 45
  },
  {
    slug: "server-health-status",
    title: "Server Health Status Page",
    desc: "Configure ping checkers, test API endpoints, and display incident tables to users.",
    complexity: "Beginner",
    buildTime: "2 days",
    stack: ["Next.js", "SQLite", "Tailwind", "Cron"],
    category: "Developer Tools",
    premium: false,
    cost: 10
  },

  // --- Automation ---
  {
    slug: "social-media-scheduler",
    title: "Social Media Auto-Scheduler",
    desc: "Queue blog posts to post on Twitter, LinkedIn, and Threads via standard OAuth APIs.",
    complexity: "Intermediate",
    buildTime: "1 week",
    stack: ["Next.js", "Supabase", "Upstash Redis", "Tailwind"],
    category: "Automation",
    premium: false,
    cost: 20
  },
  {
    slug: "ecommerce-invoice-automator",
    title: "E-commerce Invoice Automator",
    desc: "Listen to Stripe Webhooks, build PDFs, and upload to cloud folders automatically.",
    complexity: "Beginner",
    buildTime: "3 days",
    stack: ["Node.js", "Express", "Stripe", "AWS S3", "Resend"],
    category: "Automation",
    premium: false,
    cost: 12
  },
  {
    slug: "web-scraping-pipeline",
    title: "Web Scraping & Data Pipeline",
    desc: "Schedule headless browsers to crawl pricing datasets and output aggregated CSV sheets.",
    complexity: "Advanced",
    buildTime: "2 weeks",
    stack: ["Python", "Playwright", "FastAPI", "PostgreSQL", "Celery"],
    category: "Automation",
    premium: true,
    cost: 55
  },
  {
    slug: "automated-backup-daemon",
    title: "Automated Backup Daemon",
    desc: "Incremental backups of local folders uploaded securely to decentralized Web3 buckets.",
    complexity: "Intermediate",
    buildTime: "5 days",
    stack: ["Rust", "S3", "Tailwind", "SQLite"],
    category: "Automation",
    premium: false,
    cost: 18
  },
  {
    slug: "newsletter-dispatcher",
    title: "Newsletter Dispatcher",
    desc: "Schedule rich marketing broadcasts, monitor open rates, and track bounces automatically.",
    complexity: "Intermediate",
    buildTime: "1 week",
    stack: ["Remix", "PostgreSQL", "Amazon SES", "Tailwind"],
    category: "Automation",
    premium: false,
    cost: 25
  },
  {
    slug: "webhook-relay-filter",
    title: "Webhook Relay & Filter Service",
    desc: "Intercept webhooks, apply custom filter formulas, and redirect matching payloads.",
    complexity: "Advanced",
    buildTime: "1.5 weeks",
    stack: ["Node.js", "Fastify", "Redis", "PostgreSQL"],
    category: "Automation",
    premium: true,
    cost: 35
  },

  // --- Ecommerce ---
  {
    slug: "subscription-box-platform",
    title: "Subscription Box Platform",
    desc: "Build recurring product delivery applications with flexible checkout and skip-billing features.",
    complexity: "Intermediate",
    buildTime: "1.5 weeks",
    stack: ["Next.js", "Stripe Billing", "Supabase", "Tailwind"],
    category: "Ecommerce",
    premium: true,
    cost: 38
  },
  {
    slug: "digital-book-store",
    title: "Digital Book Store",
    desc: "Sell epubs, PDFs, and guides with watermark generation and temporary download links.",
    complexity: "Beginner",
    buildTime: "4 days",
    stack: ["SvelteKit", "Stripe", "PostgreSQL", "Prisma", "S3"],
    category: "Ecommerce",
    premium: false,
    cost: 15
  },
  {
    slug: "custom-merchandise-creator",
    title: "Custom Merchandise Creator",
    desc: "Interactive canvas editor to custom print designs on t-shirts with automated shipping hooks.",
    complexity: "Advanced",
    buildTime: "2.5 weeks",
    stack: ["React", "Three.js", "Node.js", "Stripe", "Printify API"],
    category: "Ecommerce",
    premium: true,
    cost: 70
  },
  {
    slug: "b2b-wholesale-portal",
    title: "B2B Wholesale Portal",
    desc: "Restricted client portals, purchase orders, credit terms billing, and custom price lists.",
    complexity: "Intermediate",
    buildTime: "2 weeks",
    stack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind", "Resend"],
    category: "Ecommerce",
    premium: false,
    cost: 45
  },
  {
    slug: "single-product-checkout",
    title: "Single Product Checkout Page",
    desc: "High-conversion checkout pages with product reviews, FAQ sections, and Apple Pay buttons.",
    complexity: "Beginner",
    buildTime: "2 days",
    stack: ["HTML", "JavaScript", "Stripe", "Tailwind", "Micro-animations"],
    category: "Ecommerce",
    premium: false,
    cost: 10
  },
  {
    slug: "multivendor-dropship-hub",
    title: "Multi-vendor Dropshipping Hub",
    desc: "Import inventory catalogs, assign retail markups, and auto-route orders to suppliers.",
    complexity: "Advanced",
    buildTime: "3 weeks",
    stack: ["Next.js", "Node.js", "MongoDB", "Stripe", "AliExpress API"],
    category: "Ecommerce",
    premium: false,
    cost: 60
  },

  // --- Mobile Apps ---
  {
    slug: "fitness-tracker-workout",
    title: "Fitness Tracker & Workout Planner",
    desc: "Build customized exercises, track repetitions, and log workout progress on offline-first database.",
    complexity: "Intermediate",
    buildTime: "2 weeks",
    stack: ["React Native", "Expo", "WatermelonDB", "Zustand"],
    category: "Mobile Apps",
    premium: false,
    cost: 30
  },
  {
    slug: "meditation-wellness-guide",
    title: "Meditation & Wellness Guide",
    desc: "Audio playback streams, user meditation streaks, and offline audio downloads.",
    complexity: "Intermediate",
    buildTime: "1.5 weeks",
    stack: ["Flutter", "Firebase", "Stripe", "Supabase Storage"],
    category: "Mobile Apps",
    premium: false,
    cost: 28
  },
  {
    slug: "expense-budget-tracker",
    title: "Expense & Budget Tracker",
    desc: "Scan paper receipts with AI camera, assign budget limits, and export monthly CSV lists.",
    complexity: "Advanced",
    buildTime: "3 weeks",
    stack: ["React Native", "Expo", "SQLite", "OpenAI Vision"],
    category: "Mobile Apps",
    premium: true,
    cost: 40
  },
  {
    slug: "recipe-meal-prep",
    title: "Recipe & Meal Prep App",
    desc: "Dynamic grocery list updates, calendar planners, and automated recipe scale calculations.",
    complexity: "Beginner",
    buildTime: "1 week",
    stack: ["SwiftUI", "CoreData", "Tailwind", "CloudKit"],
    category: "Mobile Apps",
    premium: false,
    cost: 20
  },
  {
    slug: "local-travel-guide-app",
    title: "Local Travel Guide",
    desc: "Curated offline-ready maps, restaurant locations, and tourist audio spots with location tags.",
    complexity: "Intermediate",
    buildTime: "2 weeks",
    stack: ["React Native", "Mapbox", "Node.js", "PostgreSQL"],
    category: "Mobile Apps",
    premium: false,
    cost: 35
  },
  {
    slug: "task-habits-tracker",
    title: "Task & Habits Tracker",
    desc: "Track daily habits with grid calendars, custom alarms, and progress widget cards.",
    complexity: "Beginner",
    buildTime: "5 days",
    stack: ["React Native", "Zustand", "SQLite", "Expo"],
    category: "Mobile Apps",
    premium: false,
    cost: 15
  },

  // --- Dashboards ---
  {
    slug: "saas-metrics-kpi",
    title: "SaaS Metrics & KPI Dashboard",
    desc: "Sync Stripe & Chartmogul data to view MRR growth, active subscriptions, and cohort retention.",
    complexity: "Intermediate",
    buildTime: "1 week",
    stack: ["Next.js", "Stripe", "Chart.js", "Supabase"],
    category: "Dashboards",
    premium: true,
    cost: 45
  },
  {
    slug: "server-load-monitor",
    title: "Server Load & Performance Monitor",
    desc: "Real-time metrics of CPU load, RAM usage, and bandwidth usage with visual line charts.",
    complexity: "Advanced",
    buildTime: "2 weeks",
    stack: ["React", "FastAPI", "InfluxDB", "Chart.js", "Socket.io"],
    category: "Dashboards",
    premium: true,
    cost: 50
  },
  {
    slug: "ecommerce-sales-analytics",
    title: "E-commerce Sales Analytics",
    desc: "Heatmaps of customer orders, cart abandonments, conversion funnels, and top products.",
    complexity: "Intermediate",
    buildTime: "1 week",
    stack: ["Vue 3", "PostgreSQL", "Prisma", "Chart.js", "Tailwind"],
    category: "Dashboards",
    premium: false,
    cost: 30
  },
  {
    slug: "ad-campaign-performance",
    title: "Ad Campaign Performance Panel",
    desc: "Track spend, CTR, conversions, and CPA metrics from Google, Meta, and LinkedIn APIs.",
    complexity: "Advanced",
    buildTime: "2 weeks",
    stack: ["Next.js", "Django", "PostgreSQL", "ApexCharts", "Google Ads API"],
    category: "Dashboards",
    premium: false,
    cost: 65
  },
  {
    slug: "iot-sensor-telemetry",
    title: "IoT Sensor Telemetry Hub",
    desc: "Receive, graph, and trigger rule actions on continuous streams of temperature and humidity telemetry.",
    complexity: "Advanced",
    buildTime: "3 weeks",
    stack: ["React", "Node.js", "MQTT", "Redis", "TimescaleDB"],
    category: "Dashboards",
    premium: false,
    cost: 75
  },
  {
    slug: "crypto-portfolio-dashboard",
    title: "Crypto Portfolio Dashboard",
    desc: "Track active digital tokens, watch real-time charts, and calculate net gains over time.",
    complexity: "Beginner",
    buildTime: "4 days",
    stack: ["React", "Coingecko API", "Zustand", "Chart.js"],
    category: "Dashboards",
    premium: false,
    cost: 15
  }
];
