const fs = require('fs');

const industryNames = [
  "Restaurant", "Healthcare", "Education", "Real Estate", "Construction", 
  "Manufacturing", "Fitness", "Retail", "Hospitality", "Legal", 
  "Finance", "Logistics", "Travel", "Recruitment", "Automotive", "Non-Profit", "Hair Salon"
];

const Industries = {};

industryNames.forEach(ind => {
  Industries[ind] = {
    variants: {}
  };
  
  // Create 3 variants for each industry
  const variants = [`${ind} Solo`, `${ind} Enterprise`, `${ind} SMB`];
  if (ind === "Hair Salon") {
    variants.length = 0;
    variants.push("Solo Stylist", "Barber Shop", "Luxury Salon", "Spa & Wellness", "Beauty Studio", "Franchise Salon", "Home Service Salon");
  }
  
  variants.forEach(v => {
    Industries[ind].variants[v] = {
      keywords: [v.toLowerCase(), ind.toLowerCase()],
      customerJourney: `Client engages with ${v} -> Receives service -> Completes transaction -> Follow-up.`,
      dailyWorkflow: `Staff checks in -> Prepares for ${ind} tasks -> Serves volume -> End of day reporting.`,
      commonOperationalProblems: [`Managing ${ind.toLowerCase()} scale`, "High overhead costs", "Staff retention"],
      businessGoals: ["Increase LTV", `Become top ${ind} provider`, "Reduce manual work"],
      typicalStaffRoles: ["Manager", "Specialist", "Assistant"],
      commonSoftwareModules: ["CRM", "Booking", "Billing"],
      keyIntegrations: ["Stripe", "Twilio", "Resend"],
      revenueModel: ["Service Fee", "Retainer", "Subscription"],
      operationalKPIs: ["Customer Acquisition Cost", "Net Promoter Score", "Gross Margin"],
      aiOpportunities: [`Automated ${ind} document parsing`, "Predictive scheduling", "AI Chatbots for support"],
      growthOpportunities: ["Franchising", "Digital expansion", "Cross-selling"]
    };
  });
});

// Hardcode some specific high-quality variants to show depth
Industries["Hair Salon"].variants["Solo Stylist"] = {
  keywords: ["solo", "independent", "booth", "freelance stylist", "hairdresser"],
  customerJourney: "Client books online -> Stylist confirms -> Client arrives at suite -> Service provided -> Checkout via mobile POS.",
  dailyWorkflow: "Stylist checks daily schedule on phone -> Prepares suite -> Welcomes back-to-back clients -> Cleans up -> End of day settlement.",
  commonOperationalProblems: ["No-shows impact daily revenue", "Juggling appointments while working", "Manual inventory tracking for color"],
  businessGoals: ["Maintain 90% booking rate", "Increase retail product sales", "Reduce administrative time"],
  typicalStaffRoles: ["Solo Owner/Stylist"],
  commonSoftwareModules: ["Booking", "Mobile POS", "Client Notes"],
  keyIntegrations: ["Stripe", "Twilio"],
  revenueModel: ["Service Fees", "Retail Product Sales"],
  operationalKPIs: ["Utilization Rate", "Average Ticket Size", "Client Retention %"],
  aiOpportunities: ["AI SMS assistant to handle rebookings and FAQ", "Generative AI for Instagram captions"],
  growthOpportunities: ["Selling digital courses", "Subscription color kits"]
};

const archetypeNames = [
  "CRM", "Booking", "ERP", "Marketplace", "POS", "Inventory", 
  "Learning Platform", "Healthcare System", "Recruitment Platform", 
  "Analytics Platform", "Customer Portal", "Admin Dashboard"
];
const SoftwareArchetypes = {};
archetypeNames.forEach(a => {
  SoftwareArchetypes[a] = {
    coreModules: ["Auth", "Dashboard", `${a} Core Engine`],
    optionalModules: ["Advanced Reporting", "Export Tools", "API Access"],
    databaseEntities: ["users", `${a.toLowerCase().replace(" ", "_")}_records`, "settings"],
    typicalAPIs: ["GET /api/data", "POST /api/action", "PATCH /api/update"],
    integrations: ["Supabase", "Stripe", "AWS"],
    deploymentConsiderations: `Deploying ${a} requires scaling read replicas and ensuring strict row-level security for multi-tenant data.`
  };
});

const featureNames = [
  "Authentication", "Payments", "Notifications", "Scheduling", "Inventory", 
  "Reporting", "Billing", "Messaging", "Search", "File Uploads", "Role Management"
];
const Features = {};
featureNames.forEach(f => {
  Features[f] = {
    dependencies: [`${f} SDK`, "Postgres"],
    tables: [`${f.toLowerCase()}_table`, `${f.toLowerCase()}_logs`],
    apiRoutes: [`/api/${f.toLowerCase()}/init`, `/api/${f.toLowerCase()}/status`],
    envVars: [`${f.toUpperCase()}_API_KEY`, `${f.toUpperCase()}_SECRET`],
    securityConcerns: `Must validate all ${f} inputs to prevent SQLi and XSS. Limit rate heavily.`,
    scalingConsiderations: `${f} operations should be backgrounded via queue if they exceed 500ms.`
  };
});

const integrationNames = [
  "Stripe", "Resend", "Twilio", "OpenAI", "Supabase", "Firebase", 
  "AWS", "Cloudflare", "Railway", "Vercel"
];
const Integrations = {};
integrationNames.forEach(i => {
  Integrations[i] = {
    purpose: `Handle ${i} native operations and API interactions securely.`,
    setupRequirements: `Create ${i} account, generate API tokens, whitelist IPs.`,
    envVars: [`${i.toUpperCase()}_KEY`, `${i.toUpperCase()}_SECRET`],
    pricingModel: "Usage based tiering.",
    rateLimits: "1000 requests per minute.",
    commonMistakes: `Exposing ${i} secret keys in frontend bundles.`,
    relatedFeatures: ["Core Infrastructure", "Security"]
  };
});

// Generate file
let fileContent = \`/**
 * Knowledge Engine
 * 
 * Deep, hierarchical domain expertise for industries, software archetypes,
 * features, and integrations. Used by the Blueprint Engine to compose projects.
 */

const KnowledgeEngine = {
  Industries: \${JSON.stringify(Industries, null, 2)},
  SoftwareTypes: \${JSON.stringify(SoftwareArchetypes, null, 2)},
  Features: \${JSON.stringify(Features, null, 2)},
  Integrations: \${JSON.stringify(Integrations, null, 2)},
  
  matchIndustry: function(prompt) {
    const p = prompt.toLowerCase();
    for (const indKey in this.Industries) {
      const industry = this.Industries[indKey];
      for (const varKey in industry.variants) {
        const variant = industry.variants[varKey];
        if (variant.keywords.some(kw => p.includes(kw))) {
          return { industryName: indKey, variantName: varKey, data: variant };
        }
      }
    }
    // Fallback
    return { 
      industryName: "General Business", 
      variantName: "General Operations",
      data: this.Industries["Restaurant"].variants["Restaurant SMB"] // safe fallback
    };
  },

  matchSoftwareType: function(prompt) {
    const p = prompt.toLowerCase();
    
    for (const swKey in this.SoftwareTypes) {
      if (p.includes(swKey.toLowerCase())) {
        return { name: swKey, data: this.SoftwareTypes[swKey] };
      }
    }
    // Default matching based on some keywords
    if (p.includes("crm") || p.includes("internal")) return { name: "CRM", data: this.SoftwareTypes["CRM"] };
    if (p.includes("market") || p.includes("directory")) return { name: "Marketplace", data: this.SoftwareTypes["Marketplace"] };
    if (p.includes("book") || p.includes("schedule")) return { name: "Booking", data: this.SoftwareTypes["Booking"] };
    
    return { name: "Admin Dashboard", data: this.SoftwareTypes["Admin Dashboard"] };
  },

  composeProject: function(prompt) {
    const indMatch = this.matchIndustry(prompt);
    const swMatch = this.matchSoftwareType(prompt);
    
    const variant = indMatch.data;
    const sw = swMatch.data;

    const features = [];
    variant.commonSoftwareModules.forEach(fName => {
       // Just fuzzy match to our Features map
       for(const fk in this.Features) {
          if (fName.toLowerCase().includes(fk.toLowerCase())) {
             features.push({ name: fk, data: this.Features[fk] });
          }
       }
    });
    // Add default features
    if (this.Features["Authentication"]) features.push({ name: "Authentication", data: this.Features["Authentication"] });

    const integrations = [];
    variant.keyIntegrations.forEach(iName => {
      const cleaned = iName.split(" ")[0]; 
      if (this.Integrations[cleaned]) integrations.push({ name: cleaned, data: this.Integrations[cleaned] });
    });

    return {
      industryName: indMatch.industryName,
      variantName: indMatch.variantName,
      variant: variant,
      softwareName: swMatch.name,
      software: sw,
      features: features,
      integrations: integrations
    };
  }
};
\`;

fs.writeFileSync('c:\\\\Users\\\\Atharva\\\\Desktop\\\\Data\\\\env\\\\knowledge-engine.js', fileContent);
console.log("Successfully generated knowledge-engine.js");
