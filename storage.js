/**
 * Storage & Data Migration Layer
 * Handles loading, saving, and migrating localStorage workspaces.
 */

// Global workspace state (moved from app.js)
let workspaceState = {
  projects: [],
  drafts: [],
  savedBlueprints: [],
  favoriteTemplates: [],
  recentGenerators: [],
  exports: [],
  activeProjectId: null,
  activeTab: 'overview'
};

const Storage = {
  /**
   * Initializes the workspace state from local storage.
   * Performs migrations on legacy projects if necessary.
   */
  initWorkspace() {
    const stored = localStorage.getItem('getenv_workspace');
    if (stored) {
      try {
        workspaceState = JSON.parse(stored);
        
        // Ensure default arrays exist
        workspaceState.projects = workspaceState.projects || [];
        workspaceState.drafts = workspaceState.drafts || [];
        workspaceState.savedBlueprints = workspaceState.savedBlueprints || [];
        workspaceState.favoriteTemplates = workspaceState.favoriteTemplates || [];
        workspaceState.recentGenerators = workspaceState.recentGenerators || [];
        workspaceState.exports = workspaceState.exports || [];

        // Migrate legacy projects (HTML blobs) to Structured JSON Snapshot
        workspaceState.projects.forEach(project => {
          if (project.versions && project.versions.length > 0) {
            project.versions.forEach(version => {
              if (version.blueprint) {
                // If the blueprint is the old HTML structure (has execSummary string instead of overview object)
                if (typeof version.blueprint.execSummary === 'string') {
                  version.projectSnapshot = this.migrateLegacyBlueprint(version.blueprint);
                  delete version.blueprint; // Remove legacy HTML blob
                } else if (version.projectSnapshot) {
                  // Already migrated
                }
              }
            });
          }
          
          // Migrate legacy tasks
          if (project.tasks && project.tasks.length > 0) {
            project.tasks = project.tasks.map(t => {
              if (t.title) return t; // Already migrated
              return Models.createTask(t.id, t.phase, t.text, t.completed);
            });
          }

          // Migrate legacy notes
          if (typeof project.notes === 'string') {
            project.notes = [Models.createNote("note_1", "Legacy Notes", project.notes)];
          }
        });
      } catch (e) {
        console.error("Failed to parse workspace state:", e);
      }
    }
    return workspaceState;
  },

  saveWorkspaceState() {
    localStorage.setItem('getenv_workspace', JSON.stringify(workspaceState));
  },

  updateProjectField(projectId, field, value) {
    const index = workspaceState.projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      workspaceState.projects[index][field] = value;
      workspaceState.projects[index].lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      this.saveWorkspaceState();
    }
  },

  /**
   * Translates a legacy HTML blueprint into the new structured JSON model.
   * Keeps the HTML payload safely inside the structured objects as a fallback.
   */
  migrateLegacyBlueprint(legacyBlueprint) {
    return Models.createProjectSnapshot(legacyBlueprint);
  }
};
