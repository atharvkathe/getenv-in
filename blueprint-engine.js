/**
 * Blueprint Engine
 * Analyzes prompts and generates structured JSON project blueprints.
 * Now acts as an orchestrator, composing data dynamically from the deep Knowledge Engine variants.
 */

const BlueprintEngine = {
  generateSnapshot: function(prompt) {
    // 1. Ask Knowledge Engine to compose the parts
    const composition = KnowledgeEngine.composeProject(prompt);
    
    const category = composition.softwareCategory;
    const persona = composition.builderPersona;
    const businessModel = composition.businessModel;
    const industry = composition.industryContext;
    const feats = composition.features;
    const ints = composition.integrations;

    // Combine third party services
    const thirdPartyServices = ints.map(i => ({ name: i.name, description: i.data.purpose || "Integration" }));

    // Extract env variables from features and integrations
    let envVarsList = [];
    feats.forEach(f => envVarsList.push(...(f.data.envVars || [])));
    ints.forEach(i => envVarsList.push(...(i.data.envVars || [])));
    const envVariables = envVarsList.length > 0 
      ? envVarsList.map(v => `${v}=""`).join("\\n") 
      : 'DATABASE_URL=""';

    // Deployment Strategy based on Software Category
    const deploymentStrategy = [
      category.deploymentStrategy || "Frontend: Vercel or Next.js hosting.",
      "Database: Managed PostgreSQL (Supabase).",
      category.scalingConsiderations || "Standard CI/CD pipelines via GitHub Actions."
    ];

    // Build the snapshot intelligently
    return Models.createProjectSnapshot({
      opportunity: {
        problemSeverity: "High - " + (persona.painPoints?.[0] || "Core inefficiencies exist."),
        marketMaturity: "Evolving tech landscape.",
        businessComplexity: "Medium",
        techComplexity: persona.technicalExperience === "High" ? "High" : "Medium",
        estimatedEffort: persona.speedRequirements === "Extremely High" ? "2-4 weeks for MVP." : "4-8 weeks."
      },
      industry: {
        name: `${composition.industryContextName} (Built for ${composition.softwareCategoryName})`,
        commonProblems: persona.painPoints || ["Manual processes"],
        inefficiencies: industry.specificNeeds || ["Lack of automation"],
        softwareValue: category.purpose || "Digitizes core workflows."
      },
      marketLandscape: {
        competitorCategories: ["Legacy Solutions", "Niche SaaS"],
        commonStrengths: ["Domain specific knowledge"],
        commonWeaknesses: ["Poor UX", "Slow iteration cycles"]
      },
      workflow: {
        currentProcess: persona.commonMistakes?.[0] || "Manual disjointed tasks.",
        proposedSoftwareProcess: businessModel.typicalCustomerJourney || "Digitized end-to-end workflow."
      },
      automation: {
        repetitiveTasks: industry.specificNeeds || ["Data entry"],
        recommendedAutomations: category.optionalModules || ["Automated reporting"],
        aiWorkflows: ["Smart suggestions based on user context"]
      },
      revenueModel: {
        models: [composition.businessModelName],
        tiers: [
          { name: "Starter Tier", price: "$49/mo", description: "Core features for individuals." },
          { name: "Pro Tier", price: "$99/mo", description: "Advanced integrations and team sharing." },
          { name: "Enterprise", price: "Custom", description: "Dedicated account manager and SLAs." }
        ],
        unitEconomics: businessModel.revenueMechanics || "Standard economics."
      },
      successMetrics: {
        kpis: [...(businessModel.commonMetrics || []), ...(industry.industryKPIs || [])]
      },
      risks: {
        business: businessModel.disadvantages || ["User adoption friction"],
        technical: [category.commonMistakes?.[0] || "Scaling issues"],
        operational: ["Customer support scale-up"],
        scaling: [category.scalingConsiderations || "Database performance under load"]
      },
      futureOpportunities: {
        aiFeatures: ["Predictive analytics"],
        additionalModules: category.futureExpansionPaths || ["Mobile App", "Vendor Portal"],
        expansion: businessModel.growthStrategy || ["API access for partners"],
        adjacentProducts: ["White-label version"]
      },
      execSummary: `Architected a modern ${composition.softwareCategoryName} prioritizing the needs of a ${composition.builderPersonaName}. The solution leverages a ${composition.businessModelName} model, enriched with specific workflows for the ${composition.industryContextName} sector.`,
      businessProblem: {
        gap: persona.painPoints?.[0] || "Inefficient manual workflows.",
        solution: category.purpose || "Custom SaaS",
        valueProposition: category.typicalUsers?.[0] ? `Empowers ${category.typicalUsers[0]}` : "Streamlines operations."
      },
      userJourney: [businessModel.typicalCustomerJourney || "User signs up and gets value."],
      techStack: persona.preferredStack || ["Next.js (React)", "Node.js API", "PostgreSQL", ...ints.map(i => i.name)],
      folderStructure: `my-app/
├── app/
│   ├── api/
│   │   └── routes/
│   ├── dashboard/
│   └── page.tsx
├── components/
│   └── ui/
├── lib/
├── prisma/
│   └── schema.prisma
└── package.json`,
      dbSchema: "-- Custom Schema optimized for " + composition.softwareCategoryName,
      dbTables: (category.databaseEntities || []).map(t => ({ name: t, description: "Core domain entity", constraints: "id PK", rls: "Enable." })),
      erdDiagram: `erDiagram
    users ||--o{ resources : owns
    users {
        uuid id PK
        varchar email UNIQUE
    }
    resources {
        uuid id PK
        uuid user_id FK
        jsonb data
    }`,
      apiRoutePlan: (category.typicalAPIs || []).map(route => {
         const parts = route.split(" ");
         return { method: parts[0] || "GET", endpoint: parts[1] || route, payload: "{}", response: "{ success: true }", auth: "Yes" };
      }),
      authFlow: [
        category.authenticationPattern || "Standard Authentication.",
        "System provisions JWT session stored in HTTP-only cookies.",
        "Middleware checks access for protected routes."
      ],
      userRoles: ["System Admin", "Standard User", ...(category.typicalUsers || [])],
      envVariables: envVariables,
      deploymentStrategy: deploymentStrategy,
      infraCost: [
        { resource: "Hosting", spec: "Vercel / Next.js Edge", cost: "$20/mo" },
        { resource: "Database", spec: "Postgres Managed", cost: "$25/mo" },
        ...ints.map(i => ({ resource: i.name, spec: "Usage-based", cost: "Pay-as-you-go" }))
      ],
      devPhases: [
        { title: "Phase 1: Foundation", duration: "Week 1", description: "Auth, Database schema, and core routing." },
        { title: "Phase 2: Core Logic", duration: "Week 2", description: "Business logic and API implementation." },
        { title: "Phase 3: Integrations", duration: "Week 3", description: "Third-party APIs: " + ints.map(i=>i.name).join(", ") },
        { title: "Phase 4: Launch", duration: "Week 4", description: "Testing and production deployment." }
      ],
      mvpScope: category.coreModules || ["Dashboard", "Auth"],
      scalingPlan: [category.scalingConsiderations || "Standard caching", "Read replicas for database", "CDN for static assets"],
      thirdPartyServices: thirdPartyServices,
      archDiagram: "flowchart TD\\n Client --> Server"
    });
  }
};
