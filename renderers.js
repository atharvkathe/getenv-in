/**
 * Renderers
 * Converts structured JSON project models into DOM elements.
 * Maintains exact visual parity with the legacy HTML string templates.
 */

const Renderers = {
  renderList(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = item; // Keep innerHTML for bolding logic if string has <strong>
      container.appendChild(li);
    });
  },

  renderBusinessProblem(containerId, problem) {
    const container = document.getElementById(containerId);
    if (!container || !problem) return;
    
    container.innerHTML = `
      <ul>
        <li><strong>The Gap:</strong> ${problem.gap}</li>
        <li><strong>The Solution:</strong> ${problem.solution}</li>
        <li><strong>Value Proposition:</strong> ${problem.valueProposition}</li>
      </ul>
    `;
  },

  renderOpportunity(containerId, opp) {
    const container = document.getElementById(containerId);
    if (!container || !opp) return;
    
    container.innerHTML = `
      <li><strong>Problem Severity:</strong> ${opp.problemSeverity}</li>
      <li><strong>Market Maturity:</strong> ${opp.marketMaturity}</li>
      <li><strong>Business Complexity:</strong> ${opp.businessComplexity}</li>
      <li><strong>Tech Complexity:</strong> ${opp.techComplexity}</li>
      <li><strong>Estimated Build Effort:</strong> ${opp.estimatedEffort}</li>
    `;
  },

  renderIndustry(containerId, ind) {
    const container = document.getElementById(containerId);
    if (!container || !ind) return;
    
    container.innerHTML = `
      <p style="margin: 0 0 8px 0;"><strong>Industry:</strong> ${ind.name}</p>
      <p style="margin: 0 0 8px 0;"><strong>Common Problems:</strong> ${ind.commonProblems.join(', ')}</p>
      <p style="margin: 0 0 8px 0;"><strong>Inefficiencies:</strong> ${ind.inefficiencies.join(', ')}</p>
      <p style="margin: 0;"><strong>Software Value:</strong> ${ind.softwareValue}</p>
    `;
  },

  renderMarketLandscape(containerId, mkt) {
    const container = document.getElementById(containerId);
    if (!container || !mkt) return;
    
    container.innerHTML = `
      <p style="margin: 0 0 8px 0;"><strong>Competitor Categories:</strong> ${mkt.competitorCategories.join(', ')}</p>
      <p style="margin: 0 0 8px 0;"><strong>Common Strengths:</strong> ${mkt.commonStrengths.join(', ')}</p>
      <p style="margin: 0;"><strong>Common Weaknesses:</strong> ${mkt.commonWeaknesses.join(', ')}</p>
    `;
  },

  renderWorkflow(containerId, wf) {
    const container = document.getElementById(containerId);
    if (!container || !wf) return;
    
    container.innerHTML = `
      <li><strong>Current Process:</strong> ${wf.currentProcess}</li>
      <li><strong>Proposed Software Process:</strong> ${wf.proposedSoftwareProcess}</li>
    `;
  },

  renderAutomation(containerId, auto) {
    const container = document.getElementById(containerId);
    if (!container || !auto) return;
    
    container.innerHTML = `
      <p style="margin: 0 0 8px 0;"><strong>Repetitive Tasks:</strong> ${auto.repetitiveTasks.join(', ')}</p>
      <p style="margin: 0 0 8px 0;"><strong>Recommended Automations:</strong> ${auto.recommendedAutomations.join(', ')}</p>
      <p style="margin: 0;"><strong>AI Workflows:</strong> ${auto.aiWorkflows.join(', ')}</p>
    `;
  },

  renderRevenueModel(containerId, revenue) {
    const container = document.getElementById(containerId);
    if (!container || !revenue) return;
    
    let html = '<ul>';
    if (revenue.models && revenue.models.length > 0) {
      html += `<li><strong>Suggested Models:</strong> ${revenue.models.join(', ')}</li>`;
    }
    if (revenue.tiers) {
      revenue.tiers.forEach(tier => {
        html += `<li><strong>${tier.name}:</strong> ${tier.price}. ${tier.description}</li>`;
      });
    }
    if (revenue.unitEconomics) {
      html += `<li><strong>Unit Economics:</strong> ${revenue.unitEconomics}</li>`;
    }
    html += '</ul>';
    container.innerHTML = html;
  },

  renderRisks(containerId, risks) {
    const container = document.getElementById(containerId);
    if (!container || !risks) return;
    
    container.innerHTML = `
      <li><strong>Business:</strong> ${risks.business.join(' ')}</li>
      <li><strong>Technical:</strong> ${risks.technical.join(' ')}</li>
      <li><strong>Operational:</strong> ${risks.operational.join(' ')}</li>
      <li><strong>Scaling:</strong> ${risks.scaling.join(' ')}</li>
    `;
  },

  renderFuture(containerId, future) {
    const container = document.getElementById(containerId);
    if (!container || !future) return;
    
    container.innerHTML = `
      <p style="margin: 0 0 8px 0;"><strong>AI Features:</strong> ${future.aiFeatures.join(', ')}</p>
      <p style="margin: 0 0 8px 0;"><strong>Additional Modules:</strong> ${future.additionalModules.join(', ')}</p>
      <p style="margin: 0 0 8px 0;"><strong>Expansion:</strong> ${future.expansion.join(', ')}</p>
      <p style="margin: 0;"><strong>Adjacent Products:</strong> ${future.adjacentProducts.join(', ')}</p>
    `;
  },

  renderBadges(containerId, badges) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    badges.forEach(b => {
      const s = document.createElement('span');
      s.className = 'stat-badge';
      s.textContent = b;
      container.appendChild(s);
    });
  },

  renderTable(containerId, columns, data, columnMap) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = `
      <table class="bp-table" style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 2px solid var(--border-muted); text-align: left;">
            ${columns.map(col => `<th style="padding: 8px;">${col}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
    `;

    data.forEach(row => {
      html += `<tr style="border-bottom: 1px solid var(--border-muted);">`;
      columns.forEach(col => {
        const val = row[columnMap[col]];
        const isBold = col === columns[0] ? 'font-weight: 600;' : '';
        html += `<td style="padding: 8px; ${isBold}">${val || ''}</td>`;
      });
      html += `</tr>`;
    });

    html += `
        </tbody>
      </table>
    `;
    container.innerHTML = html;
  },

  renderApiRoutes(containerId, routes) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = `
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
    `;

    routes.forEach(route => {
      let methodColor = 'var(--text-primary)';
      if (route.method === 'POST') methodColor = 'var(--muted)';
      else if (route.method === 'GET') methodColor = 'var(--accent)';
      else if (route.method === 'DELETE') methodColor = 'var(--danger)';
      
      html += `<tr style="border-bottom: 1px solid var(--border-muted);">
        <td style="padding: 8px; font-weight: 600; color: ${methodColor};">${route.method}</td>
        <td style="padding: 8px; font-family: monospace;">${route.endpoint}</td>
        <td style="padding: 8px; font-family: monospace;">${route.payload}</td>
        <td style="padding: 8px; font-family: monospace;">${route.response}</td>
        <td style="padding: 8px; color: var(--accent-color);">${route.auth}</td>
      </tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
  },

  renderThirdParty(containerId, services) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = '<ul>';
    services.forEach(svc => {
      html += `<li><strong>${svc.name}:</strong> ${svc.description}</li>`;
    });
    html += '</ul>';
    container.innerHTML = html;
  },

  renderMermaid(containerId, mermaidText) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.removeAttribute('data-processed');
    container.setAttribute('data-code', mermaidText);
    container.innerHTML = `<div class="mermaid" style="display: flex; justify-content: center;">${mermaidText}</div>`;
  },

  renderBlueprint(snapshot) {
    // Shared Bindings Helper
    const bindToBoth = (id1, id2, fn) => { fn(id1); fn(id2); };

    // 1. Opportunity Assessment
    bindToBoth('bp-opportunity', 'ws-overview-opportunity', (id) => this.renderOpportunity(id, snapshot.opportunity));
    // 2. Industry Intelligence
    bindToBoth('bp-industry', 'ws-overview-industry', (id) => this.renderIndustry(id, snapshot.industry));
    // 3. Existing Market Landscape
    bindToBoth('bp-market-landscape', 'ws-overview-market', (id) => this.renderMarketLandscape(id, snapshot.marketLandscape));
    // 4. Business Workflow
    bindToBoth('bp-workflow', 'ws-overview-workflow', (id) => this.renderWorkflow(id, snapshot.workflow));
    // 5. Automation Opportunities
    bindToBoth('bp-automation', 'ws-overview-automation', (id) => this.renderAutomation(id, snapshot.automation));
    // 6. Revenue Model Suggestions
    bindToBoth('bp-revenue-model', 'ws-overview-revenue', (id) => this.renderRevenueModel(id, snapshot.revenueModel));
    // 7. Success Metrics
    bindToBoth('bp-success-metrics', 'ws-overview-metrics', (id) => this.renderList(id, snapshot.successMetrics?.kpis || []));
    // 9. Risks
    bindToBoth('bp-risks', 'ws-overview-risks', (id) => this.renderRisks(id, snapshot.risks));
    // 10. Future Opportunities
    bindToBoth('bp-future', 'ws-overview-future', (id) => this.renderFuture(id, snapshot.futureOpportunities));
    
    // Overview (Leftovers from previous)
    if (document.getElementById('ws-overview-summary')) {
       document.getElementById('ws-overview-summary').innerHTML = snapshot.overview.summary;
    }
    if (document.getElementById('bp-exec-summary')) {
       document.getElementById('bp-exec-summary').innerHTML = snapshot.overview.summary;
    }
    this.renderBusinessProblem('bp-business-problem', snapshot.overview.problem);
    this.renderList('bp-user-journey', snapshot.overview.userJourney);
    
    // 8. Technical Planning
    // Architecture
    this.renderBadges('bp-stack', snapshot.architecture.stack);
    const bpFolder = document.getElementById('bp-folder-structure');
    if (bpFolder) bpFolder.textContent = snapshot.architecture.folderStructure;
    this.renderMermaid('bp-system-arch-diagram', snapshot.architecture.systemDiagram);
    if (document.getElementById('ws-arch-diagram')) {
        this.renderMermaid('ws-arch-diagram', snapshot.architecture.systemDiagram);
    }
    
    // Database
    const bpDbSchema = document.getElementById('bp-db-schema');
    if (bpDbSchema) bpDbSchema.textContent = snapshot.database.schema;
    if (document.getElementById('ws-db-schema')) document.getElementById('ws-db-schema').textContent = snapshot.database.schema;
    
    this.renderTable('bp-db-tables-list', ['Table Name', 'Description', 'Primary Keys / Constraints', 'RLS Policy'], snapshot.database.tables, {
      'Table Name': 'name', 'Description': 'description', 'Primary Keys / Constraints': 'constraints', 'RLS Policy': 'rls'
    });
    this.renderTable('ws-db-tables-list', ['Table Name', 'Description', 'Primary Keys / Constraints', 'RLS Policy'], snapshot.database.tables, {
      'Table Name': 'name', 'Description': 'description', 'Primary Keys / Constraints': 'constraints', 'RLS Policy': 'rls'
    });

    this.renderMermaid('bp-erd-diagram', snapshot.database.erd);
    if (document.getElementById('ws-erd-diagram')) {
        this.renderMermaid('ws-erd-diagram', snapshot.database.erd);
    }
    
    // API
    this.renderApiRoutes('bp-api-route-plan', snapshot.api.routes);
    this.renderApiRoutes('ws-api-route-plan', snapshot.api.routes);
    
    // Authentication
    this.renderList('bp-auth-flow-steps', snapshot.authentication.flow);
    this.renderList('bp-user-roles-list', snapshot.authentication.roles);
    this.renderList('ws-overview-roles', snapshot.authentication.roles);
    
    // Environment
    const bpEnvVars = document.getElementById('bp-env-vars-block');
    if (bpEnvVars) bpEnvVars.textContent = snapshot.environment.variables;
    if (document.getElementById('ws-env-vars-block')) document.getElementById('ws-env-vars-block').textContent = snapshot.environment.variables;
    
    // Deployment
    this.renderList('bp-deployment-strategy-list', snapshot.deployment.strategy);
    this.renderList('ws-deployment-strategy-list', snapshot.deployment.strategy);
    
    this.renderTable('bp-infra-costs-table', ['Resource', 'Specification', 'Est. Cost'], snapshot.deployment.infraCosts, {
      'Resource': 'resource', 'Specification': 'spec', 'Est. Cost': 'cost'
    });
    
    // Roadmap
    this.renderTable('bp-development-timeline', ['Phase', 'Duration', 'Focus'], snapshot.roadmap.phases, {
      'Phase': 'title', 'Duration': 'duration', 'Focus': 'description'
    });
    this.renderList('bp-mvp-scope-list', snapshot.roadmap.mvpScope);
    this.renderList('bp-scaling-plan-list', snapshot.roadmap.scalingPlan);
    
    // Integrations
    this.renderThirdParty('bp-third-party-list', snapshot.integrations.services);

    // Attempt Mermaid initialization
    if (typeof mermaid !== 'undefined') {
      try { 
        mermaid.init(undefined, document.querySelectorAll('.mermaid-diagram-placeholder .mermaid')); 
      } catch (e) {}
    }
  }
};
