/**
 * Project Operating System Data Models
 * Defines the structured JSON schemas for the GetEnv Workspace.
 */

const Models = {
  /**
   * Creates a structured Task object.
   */
  createTask(id, phase, text, completed = false, options = {}) {
    return {
      id,
      title: text,
      description: options.description || "",
      phase,
      priority: options.priority || "Medium",
      status: completed ? "Done" : "Todo",
      estimatedHours: options.estimatedHours || 0,
      completed,
      dependencies: options.dependencies || [],
      createdAt: options.createdAt || new Date().toISOString(),
      updatedAt: options.updatedAt || new Date().toISOString()
    };
  },

  /**
   * Creates a structured Note object.
   */
  createNote(id, title, content) {
    return {
      id,
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  /**
   * Creates a structured Project Snapshot (Blueprint) containing JSON data instead of HTML.
   */
  createProjectSnapshot(data = {}) {
    return {
      opportunity: {
        problemSeverity: data.opportunity?.problemSeverity || "",
        marketMaturity: data.opportunity?.marketMaturity || "",
        businessComplexity: data.opportunity?.businessComplexity || "",
        techComplexity: data.opportunity?.techComplexity || "",
        estimatedEffort: data.opportunity?.estimatedEffort || ""
      },
      industry: {
        name: data.industry?.name || "",
        commonProblems: data.industry?.commonProblems || [],
        inefficiencies: data.industry?.inefficiencies || [],
        softwareValue: data.industry?.softwareValue || ""
      },
      marketLandscape: {
        competitorCategories: data.marketLandscape?.competitorCategories || [],
        commonStrengths: data.marketLandscape?.commonStrengths || [],
        commonWeaknesses: data.marketLandscape?.commonWeaknesses || []
      },
      workflow: {
        currentProcess: data.workflow?.currentProcess || "",
        proposedSoftwareProcess: data.workflow?.proposedSoftwareProcess || ""
      },
      automation: {
        repetitiveTasks: data.automation?.repetitiveTasks || [],
        recommendedAutomations: data.automation?.recommendedAutomations || [],
        aiWorkflows: data.automation?.aiWorkflows || []
      },
      revenueModel: data.revenueModel || { models: [], tiers: [], unitEconomics: "" },
      successMetrics: {
        kpis: data.successMetrics?.kpis || []
      },
      risks: {
        business: data.risks?.business || [],
        technical: data.risks?.technical || [],
        operational: data.risks?.operational || [],
        scaling: data.risks?.scaling || []
      },
      futureOpportunities: {
        aiFeatures: data.futureOpportunities?.aiFeatures || [],
        additionalModules: data.futureOpportunities?.additionalModules || [],
        expansion: data.futureOpportunities?.expansion || [],
        adjacentProducts: data.futureOpportunities?.adjacentProducts || []
      },
      overview: {
        summary: data.execSummary || "",
        problem: data.businessProblem || { gap: "", solution: "", valueProposition: "" },
        userJourney: data.userJourney || []
      },
      architecture: {
        folderStructure: data.folderStructure || "",
        systemDiagram: data.archDiagram || "",
        stack: data.techStack || []
      },
      database: {
        schema: data.dbSchema || "",
        tables: data.dbTables || [],
        erd: data.erdDiagram || ""
      },
      api: {
        routes: data.apiRoutePlan || []
      },
      authentication: {
        flow: data.authFlow || [],
        roles: data.userRoles || []
      },
      environment: {
        variables: data.envVariables || ""
      },
      deployment: {
        strategy: data.deploymentStrategy || [],
        infraCosts: data.infraCost || []
      },
      roadmap: {
        phases: data.devPhases || [],
        mvpScope: data.mvpScope || [],
        scalingPlan: data.scalingPlan || []
      },
      integrations: {
        services: data.thirdPartyServices || []
      }
    };
  },

  /**
   * Creates a new structured Project Workspace.
   */
  createProject(id, name, type, stack, category, initialTasks, initialSnapshot, promptVal) {
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    
    return {
      id,
      name,
      type,
      category,
      createdDate: dateStr,
      lastUpdated: dateStr,
      stack: stack || [],
      complexity: 'Medium',
      cost: '$250/mo',
      timeline: '3 weeks',
      progress: 15,
      status: 'Planning',
      versions: [
        {
          versionNum: 1,
          date: dateStr,
          prompt: promptVal,
          projectSnapshot: initialSnapshot
        }
      ],
      currentVersionIndex: 0,
      notes: [
        this.createNote("note_1", "General Notes", "### Ideas\n- Brainstorm details here...\n\n### Business Rules\n- Rate limiting profiles\n- Payment tier models")
      ],
      tasks: initialTasks || [],
      timelineEvents: [
        { id: 'evt_' + Date.now(), timestamp: new Date().toISOString(), event: "Project Created", details: "Initial architecture mapped from prompt." }
      ],
      health: {
        planning: 0,
        architecture: 0,
        deployment: 0,
        documentation: 0,
        implementation: 0
      }
    };
  }
};
