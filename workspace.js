/**
 * Workspace Controller
 * Handles UI interactions for the Project Operating System.
 */

const WorkspaceController = {
  bindEvents() {
    const btnSaveWorkspace = document.getElementById('btn-save-workspace');
    if (btnSaveWorkspace) {
      btnSaveWorkspace.addEventListener('click', this.saveActiveProjectToWorkspace.bind(this));
    }

    const selectStatus = document.getElementById('ws-project-status');
    if (selectStatus) {
      selectStatus.addEventListener('change', (e) => {
        if (workspaceState.activeProjectId) {
          Storage.updateProjectField(workspaceState.activeProjectId, 'status', e.target.value);
          Utils.showToastNotification(`Status updated to: ${e.target.value}`);
        }
      });
    }

    const btnDuplicate = document.getElementById('ws-btn-duplicate');
    if (btnDuplicate) {
      btnDuplicate.addEventListener('click', () => {
        if (workspaceState.activeProjectId) {
          this.duplicateProject(workspaceState.activeProjectId);
        }
      });
    }

    const btnExport = document.getElementById('ws-btn-export');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        if (workspaceState.activeProjectId) {
          this.exportProjectWorkspace(workspaceState.activeProjectId);
        }
      });
    }

    const btnClose = document.getElementById('ws-btn-close');
    if (btnClose) {
      btnClose.addEventListener('click', () => {
        workspaceState.activeProjectId = null;
        Storage.saveWorkspaceState();
        this.renderWorkspace();
      });
    }

    const notesTextarea = document.getElementById('ws-notes-textarea');
    if (notesTextarea) {
      notesTextarea.addEventListener('input', () => {
        if (workspaceState.activeProjectId) {
          const project = workspaceState.projects.find(p => p.id === workspaceState.activeProjectId);
          if (project && project.notes && project.notes.length > 0) {
            project.notes[0].content = notesTextarea.value;
            project.notes[0].updatedAt = new Date().toISOString();
            Storage.updateProjectField(workspaceState.activeProjectId, 'notes', project.notes);
          }
        }
      });
    }

    const tabRow = document.getElementById('ws-tab-row');
    if (tabRow) {
      tabRow.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const tab = btn.getAttribute('data-tab');
          this.switchWorkspaceTab(tab);
        });
      });
    }

    const versionSelect = document.getElementById('ws-version-select');
    if (versionSelect) {
      versionSelect.addEventListener('change', (e) => {
        if (workspaceState.activeProjectId) {
          const pIndex = workspaceState.projects.findIndex(p => p.id === workspaceState.activeProjectId);
          if (pIndex !== -1) {
            workspaceState.projects[pIndex].currentVersionIndex = parseInt(e.target.value);
            Storage.saveWorkspaceState();
            this.loadProjectDashboard(workspaceState.activeProjectId);
            Utils.showToastNotification(`Swapped to Version ${parseInt(e.target.value) + 1}`);
          }
        }
      });
    }

    const btnNewVersion = document.getElementById('ws-btn-new-version');
    if (btnNewVersion) {
      btnNewVersion.addEventListener('click', () => {
        if (workspaceState.activeProjectId) {
          this.createNewProjectVersion(workspaceState.activeProjectId);
        }
      });
    }

    const btnCompare = document.getElementById('ws-btn-compare-versions');
    if (btnCompare) {
      btnCompare.addEventListener('click', () => {
        if (workspaceState.activeProjectId) {
          this.compareProjectVersions(workspaceState.activeProjectId);
        }
      });
    }
  },

  saveActiveProjectToWorkspace() {
    const promptVal = window.lastGeneratedPrompt || (document.getElementById('ai-prompt-input') ? document.getElementById('ai-prompt-input').value.trim() : "");
    if (!promptVal) {
      Utils.showToastNotification("⚠️ No active plan to save. Design one first!");
      return;
    }

    const projName = prompt("Enter a name for this workspace project:", "My Software Architecture");
    if (!projName) return;

    const snapshot = window.lastGeneratedSnapshot || BlueprintEngine.generateSnapshot(promptVal);
    
    if (!snapshot) {
      Utils.showToastNotification("⚠️ Failed to create project workspace.");
      return;
    }

    const category = BlueprintEngine.getCategory(promptVal);
    const typeMap = {
      'ai-saas': 'AI SaaS App',
      'ecommerce': 'Ecommerce / Marketplace',
      'crm-internal': 'CRM / Internal Tool',
      'general': 'General SaaS'
    };

    const initialTasks = [
      Models.createTask(1, 1, "Define product scope and requirements", true),
      Models.createTask(2, 1, "Review database schemas and ER diagrams", false)
    ];

    const newProject = Models.createProject(
      "proj_" + Date.now(),
      projName,
      typeMap[category] || 'General Web App',
      snapshot.architecture.stack,
      category,
      initialTasks,
      snapshot,
      promptVal
    );

    workspaceState.projects.unshift(newProject);
    Storage.saveWorkspaceState();
    
    Utils.showToastNotification(`Saved '${projName}' to Workspace!`);
    
    // Switch to Workspace UI
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
    const wsView = document.getElementById('workspace-view');
    if (wsView) {
      wsView.classList.add('active-view');
    }
    history.pushState(null, '', '/workspace');
    this.renderWorkspace();
  },

  renderWorkspace() {
    const defaultState = document.getElementById('ws-default-state');
    const projectDashboard = document.getElementById('ws-project-dashboard');
    const projectList = document.getElementById('ws-project-list');
    
    if (workspaceState.activeProjectId && workspaceState.projects.find(p => p.id === workspaceState.activeProjectId)) {
      if (defaultState) defaultState.style.display = 'none';
      if (projectDashboard) projectDashboard.style.display = 'block';
      this.loadProjectDashboard(workspaceState.activeProjectId);
    } else {
      if (defaultState) defaultState.style.display = 'flex';
      if (projectDashboard) projectDashboard.style.display = 'none';
      this.renderProjectsHomepage(projectList);
    }
  },

  renderProjectsHomepage(container) {
    if (!container) return;
    container.innerHTML = '';
    
    if (workspaceState.projects.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted); font-style: italic;">No saved projects yet. Generate one from the Architect UI!</p>';
      return;
    }

    workspaceState.projects.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'ws-project-card';
      
      let badgesHtml = '';
      if (proj.stack && proj.stack.length > 0) {
        proj.stack.slice(0, 3).forEach(b => {
          badgesHtml += `<span class="stat-badge">${b}</span>`;
        });
        if (proj.stack.length > 3) {
          badgesHtml += `<span class="stat-badge">+${proj.stack.length - 3}</span>`;
        }
      }

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
            <h3 style="margin: 0 0 4px 0; font-size: 16px;">${proj.name}</h3>
            <span style="color: var(--text-muted); font-size: 12px;">${proj.type} • Updated ${proj.lastUpdated}</span>
          </div>
          <span style="font-size: 11px; padding: 2px 8px; border-radius: 4px; border: 1px solid var(--border-active); color: var(--accent-color); background: rgba(59, 130, 246, 0.1);">
            ${proj.status}
          </span>
        </div>
        <div style="margin-bottom: 15px; display: flex; gap: 6px; flex-wrap: wrap;">
          ${badgesHtml}
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="flex: 1; margin-right: 15px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">
              <span>Progress</span>
              <span>${proj.progress || 0}%</span>
            </div>
            <div style="width: 100%; height: 4px; background: var(--bg-body); border-radius: 2px; overflow: hidden;">
              <div style="height: 100%; width: ${proj.progress || 0}%; background: var(--accent-color); border-radius: 2px;"></div>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" data-id="${proj.id}">Open →</button>
        </div>
      `;
      
      card.querySelector('button').addEventListener('click', () => {
        workspaceState.activeProjectId = proj.id;
        Storage.saveWorkspaceState();
        this.renderWorkspace();
      });
      
      container.appendChild(card);
    });
  },

  loadProjectDashboard(projectId) {
    const project = workspaceState.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const titleEl = document.getElementById('ws-project-title');
    if (titleEl) titleEl.textContent = project.name;
    const selectStatus = document.getElementById('ws-project-status');
    if (selectStatus) selectStatus.value = project.status || 'Planning';
    
    const vSelect = document.getElementById('ws-version-select');
    if (vSelect) {
      vSelect.innerHTML = '';
      project.versions.forEach((v, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = `Snapshot ${v.versionNum} (${v.date})`;
        if (index === (project.currentVersionIndex || 0)) {
          opt.selected = true;
        }
        vSelect.appendChild(opt);
      });
    }

    // Update Health Metrics
    const health = this.calculateProjectHealth(project);
    Storage.saveWorkspaceState(); // save health updates
    
    const updateHealthUI = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = `${val}%`;
    };
    
    updateHealthUI('ws-health-planning', health.planning);
    updateHealthUI('ws-health-architecture', health.architecture);
    updateHealthUI('ws-health-deployment', health.deployment);
    updateHealthUI('ws-health-documentation', health.documentation);
    updateHealthUI('ws-health-implementation', health.implementation);

    const version = project.versions[project.currentVersionIndex || 0];
    if (version && version.projectSnapshot) {
      Renderers.renderBlueprint(version.projectSnapshot);
    }
    
    this.switchWorkspaceTab(workspaceState.activeTab || 'overview');
  },

  switchWorkspaceTab(tabId) {
    workspaceState.activeTab = tabId;
    Storage.saveWorkspaceState();
    
    const tabRow = document.getElementById('ws-tab-row');
    if (tabRow) {
      tabRow.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      const activeBtn = tabRow.querySelector(`button[data-tab="${tabId}"]`);
      if (activeBtn) activeBtn.classList.add('active');
    }
    
    document.querySelectorAll('.ws-panel').forEach(p => p.style.display = 'none');
    
    const panelId = `ws-panel-${tabId}`;
    const activePanel = document.getElementById(panelId);
    if (activePanel) {
      activePanel.style.display = 'block';
      if (tabId === 'notes') this.renderNotesTab();
      if (tabId === 'tasks') this.renderTasksTab();
      if (tabId === 'timeline') this.renderTimelineTab();
    }
  },

  renderTasksTab() {
    const project = workspaceState.projects.find(p => p.id === workspaceState.activeProjectId);
    if (!project) return;
    
    const tasksList = document.getElementById('ws-tasks-list');
    if (!tasksList) return;
    
    tasksList.innerHTML = '';
    
    const groupedTasks = {
      1: { name: 'Phase 1: Foundation & Planning', tasks: [] },
      2: { name: 'Phase 2: Core Implementation', tasks: [] },
      3: { name: 'Phase 3: Launch & Post-Launch', tasks: [] }
    };
    
    project.tasks.forEach(t => {
      if (groupedTasks[t.phase]) {
        groupedTasks[t.phase].tasks.push(t);
      }
    });

    let completedCount = 0;
    
    Object.keys(groupedTasks).forEach(phaseKey => {
      const group = groupedTasks[phaseKey];
      if (group.tasks.length === 0) return;
      
      const header = document.createElement('h4');
      header.style.color = 'var(--text-secondary)';
      header.style.fontSize = '12px';
      header.style.textTransform = 'uppercase';
      header.style.letterSpacing = '1px';
      header.style.marginTop = phaseKey === '1' ? '0' : '20px';
      header.style.marginBottom = '10px';
      header.textContent = group.name;
      tasksList.appendChild(header);
      
      group.tasks.forEach(task => {
        if (task.completed) completedCount++;
        
        const taskRow = document.createElement('div');
        taskRow.style.display = 'flex';
        taskRow.style.alignItems = 'center';
        taskRow.style.marginBottom = '8px';
        taskRow.style.background = 'var(--bg-card-hover)';
        taskRow.style.padding = '8px 12px';
        taskRow.style.borderRadius = '6px';
        taskRow.style.border = '1px solid var(--border-muted)';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.style.marginRight = '12px';
        checkbox.style.accentColor = 'var(--accent-color)';
        checkbox.style.cursor = 'pointer';
        
        const label = document.createElement('span');
        label.textContent = task.title;
        label.style.fontSize = '13px';
        if (task.completed) {
          label.style.textDecoration = 'line-through';
          label.style.color = 'var(--text-muted)';
        }
        
        checkbox.addEventListener('change', () => {
          task.completed = checkbox.checked;
          task.status = task.completed ? "Done" : "Todo";
          
          const totalTasks = project.tasks.length;
          const currentCompleted = project.tasks.filter(t => t.completed).length;
          project.progress = Math.round((currentCompleted / totalTasks) * 100);
          
          this.addTimelineEvent(project.id, task.completed ? "Task Completed" : "Task Re-opened", task.title);
          
          Storage.saveWorkspaceState();
          this.renderTasksTab();
          
          // Re-render health metrics since implementation changed
          this.loadProjectDashboard(project.id);
          
          Utils.showToastNotification(task.completed ? "Task completed!" : "Task marked incomplete.");
        });
        
        taskRow.appendChild(checkbox);
        taskRow.appendChild(label);
        tasksList.appendChild(taskRow);
      });
    });
    
    if (project.tasks.length === 0) {
      tasksList.innerHTML = '<p style="color: var(--text-muted); font-size: 13px;">No tasks available for this project.</p>';
    }
  },

  renderNotesTab() {
    const project = workspaceState.projects.find(p => p.id === workspaceState.activeProjectId);
    if (!project) return;
    
    const textarea = document.getElementById('ws-notes-textarea');
    if (textarea && project.notes && project.notes.length > 0) {
      textarea.value = project.notes[0].content;
    }
  },

  duplicateProject(projectId) {
    const project = workspaceState.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const newProj = JSON.parse(JSON.stringify(project));
    newProj.id = "proj_" + Date.now();
    newProj.name = newProj.name + " (Copy)";
    newProj.createdDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    newProj.lastUpdated = newProj.createdDate;
    
    workspaceState.projects.unshift(newProj);
    workspaceState.activeProjectId = newProj.id;
    Storage.saveWorkspaceState();
    
    Utils.showToastNotification("Project duplicated successfully!");
    this.renderWorkspace();
  },

  exportProjectWorkspace(projectId) {
    const project = workspaceState.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", project.name.replace(/\\s+/g, '_') + "_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    Utils.showToastNotification("Workspace exported as JSON.");
  },

  createNewProjectVersion(projectId) {
    const project = workspaceState.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const currentVersion = project.versions[project.currentVersionIndex || 0];
    const promptVal = prompt("What modifications would you like to make to this snapshot?", "Add a Redis caching layer and change UI to Material Design");
    
    if (!promptVal) return;
    
    Utils.showToastNotification("Creating new snapshot... please wait", 4000);
    
    setTimeout(() => {
      const newSnapshot = BlueprintEngine.generateSnapshot(promptVal);
      if (newSnapshot) {
        project.versions.push({
          versionNum: project.versions.length + 1,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          prompt: promptVal,
          projectSnapshot: newSnapshot
        });
        project.currentVersionIndex = project.versions.length - 1;
        
        this.addTimelineEvent(project.id, "New Project Snapshot Created", `Prompt: "${promptVal}"`);
        
        Storage.saveWorkspaceState();
        this.loadProjectDashboard(projectId);
        Utils.showToastNotification(`Snapshot ${project.versions.length} created successfully!`);
      }
    }, 1500);
  },

  compareProjectVersions(projectId) {
    Utils.showToastNotification("Feature Coming Soon: Side-by-side JSON schema diffing viewer.");
  },

  calculateProjectHealth(project) {
    if (!project.health) {
      project.health = { planning: 0, architecture: 0, deployment: 0, documentation: 0, implementation: 0 };
    }
    
    const totalTasks = project.tasks ? project.tasks.length : 0;
    const completedTasks = totalTasks > 0 ? project.tasks.filter(t => t.completed).length : 0;
    project.health.implementation = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    project.health.planning = project.tasks && project.tasks.length > 0 ? 100 : 20;

    const version = project.versions[project.currentVersionIndex || 0];
    const snapshot = version ? version.projectSnapshot : null;
    
    if (snapshot) {
      let archScore = 0;
      if (snapshot.database && snapshot.database.schema) archScore += 40;
      if (snapshot.api && snapshot.api.routes && snapshot.api.routes.length > 0) archScore += 30;
      if (snapshot.architecture && snapshot.architecture.systemDiagram) archScore += 30;
      project.health.architecture = archScore;
      
      let depScore = 0;
      if (snapshot.deployment && snapshot.deployment.strategy && snapshot.deployment.strategy.length > 0) depScore += 50;
      if (snapshot.environment && snapshot.environment.variables) depScore += 50;
      project.health.deployment = depScore;
      
      let docScore = 0;
      if (project.notes && project.notes.length > 0 && project.notes[0].content.length > 100) docScore += 50;
      if (snapshot.overview && snapshot.overview.summary) docScore += 50;
      project.health.documentation = docScore;
    }
    
    return project.health;
  },

  addTimelineEvent(projectId, eventName, details) {
    const project = workspaceState.projects.find(p => p.id === projectId);
    if (!project) return;
    if (!project.timelineEvents) project.timelineEvents = [];
    
    project.timelineEvents.unshift({
      id: 'evt_' + Date.now(),
      timestamp: new Date().toISOString(),
      event: eventName,
      details: details || ""
    });
    
    Storage.saveWorkspaceState();
  },

  renderTimelineTab() {
    const project = workspaceState.projects.find(p => p.id === workspaceState.activeProjectId);
    if (!project) return;
    
    const timelineList = document.getElementById('ws-timeline-list');
    if (!timelineList) return;
    
    timelineList.innerHTML = '';
    
    const events = project.timelineEvents || [];
    
    if (events.length === 0) {
      timelineList.innerHTML = '<p style="color: var(--text-muted); font-size: 13px;">No events recorded yet.</p>';
      return;
    }
    
    events.forEach((evt, idx) => {
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.gap = '16px';
      item.style.marginBottom = '20px';
      
      const date = new Date(evt.timestamp);
      const timeStr = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      const dateStr = date.toLocaleDateString([], {month: 'short', day: 'numeric'});
      
      item.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="width: 12px; height: 12px; border-radius: 50%; background: var(--accent-color); margin-top: 4px;"></div>
          ${idx < events.length - 1 ? '<div style="flex: 1; width: 2px; background: var(--border-active); margin-top: 4px; min-height: 30px;"></div>' : ''}
        </div>
        <div style="flex: 1; background: var(--bg-card-hover); padding: 12px 16px; border-radius: 6px; border: 1px solid var(--border-muted);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <h4 style="margin: 0; font-size: 14px; color: var(--text-primary);">${evt.event}</h4>
            <span style="font-size: 11px; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">${dateStr} ${timeStr}</span>
          </div>
          <p style="margin: 0; font-size: 12px; color: var(--text-secondary); line-height: 1.5;">${evt.details}</p>
        </div>
      `;
      timelineList.appendChild(item);
    });
  }
};
