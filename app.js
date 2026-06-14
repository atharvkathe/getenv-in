/* ==========================================================================
   APP CONFIGURATION & DATA STRUCTURES
   ========================================================================== */


// 1. FRAMEWORKS CONFIGURATION

// Helper to get general/framework environment variables dynamically

// FEATURE 7: Generates a 64-character cryptographically secure random hex string
function generateSecureSecret() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// FEATURE 8: Set up click events on environment switcher tabs
function setupEnvSwitcher() {
  const envBtns = document.querySelectorAll('.env-btn');
  envBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetEnv = btn.getAttribute('data-env');
      if (targetEnv === state.activeEnv) return;
      
      // Update active button state
      envBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Show terminal transition status line
      const transitionStatus = document.getElementById('env-transition-status');
      if (transitionStatus) {
        transitionStatus.textContent = `> switching environment: ${targetEnv}...`;
        transitionStatus.style.display = 'block';
      }
      
      // Trigger loading cursor state
      document.body.classList.add('cursor-loading');
      
      // Trigger status transition, then switch env and compile with typewriter
      setTimeout(() => {
        if (transitionStatus) {
          transitionStatus.style.display = 'none';
        }
        document.body.classList.remove('cursor-loading');
        state.activeEnv = targetEnv;
        updateEnvBadge();
        compileDotenv(true); // run typewriter for environment switch
        saveSessionState();
      }, 500);
    });
  });
}

// FEATURE 8: Dynamic update for active environment status badge
function updateEnvBadge() {
  const badge = document.getElementById('env-badge');
  if (!badge) return;
  
  badge.className = 'env-badge'; // reset classes
  if (state.activeEnv === 'development') {
    badge.classList.add('dev-badge');
    badge.textContent = 'DEVELOPMENT';
  } else if (state.activeEnv === 'staging') {
    badge.classList.add('staging-badge');
    badge.textContent = 'STAGING';
  } else if (state.activeEnv === 'production') {
    badge.classList.add('prod-badge');
    badge.innerHTML = '⚠️ PRODUCTION';
  }
}

// FEATURE 7: Generates a secret for a single targeted variable and updates in-place
function generateSecretForVar(varName) {
  const secret = generateSecureSecret();
  if (!state.generatedSecrets[state.activeEnv]) {
    state.generatedSecrets[state.activeEnv] = {};
  }
  state.generatedSecrets[state.activeEnv][varName] = secret;
  compileDotenv(false); // Update instantly in-place without typewriter
}

// FEATURE 7: Generates secrets for all eligible variables in active environment
function handleGenerateAllSecrets() {
  // Trigger loading cursor state
  document.body.classList.add('cursor-loading');
  setTimeout(() => {
    document.body.classList.remove('cursor-loading');
  }, 400);

  const selectedFrameworkObj = FRAMEWORKS.find(fw => fw.id === state.framework);
  const prefixType = selectedFrameworkObj ? selectedFrameworkObj.prefixType : 'none';
  const envConfig = ENV_VALUES[state.activeEnv];
  
  let generatedAny = false;
  
  // A. Generate for general configuration secrets if any exist
  const generalVars = getFrameworkGeneralVars(state.framework, state.activeEnv);
  generalVars.forEach(v => {
    let finalVarName = v.name;
    if (v.type === 'public') {
      if (prefixType === 'nextjs') finalVarName = `NEXT_PUBLIC_${v.name}`;
      else if (prefixType === 'vite') finalVarName = `VITE_${v.name}`;
      else if (prefixType === 'astro') finalVarName = `PUBLIC_${v.name}`;
    }
    
    if (isSecretVariable(finalVarName)) {
      const secret = generateSecureSecret();
      if (!state.generatedSecrets[state.activeEnv]) {
        state.generatedSecrets[state.activeEnv] = {};
      }
      state.generatedSecrets[state.activeEnv][finalVarName] = secret;
      generatedAny = true;
    }
  });
  
  // B. Generate for selected services variables
  state.services.forEach(svcId => {
    const svcVars = getServiceVariables(svcId, state.framework, state.activeEnv, envConfig);
    
    svcVars.forEach(v => {
      let varName = v.name;
      if (v.type === 'public') {
        if (prefixType === 'nextjs') varName = `NEXT_PUBLIC_${v.name}`;
        else if (prefixType === 'vite') varName = `VITE_${v.name}`;
        else if (prefixType === 'astro') varName = `PUBLIC_${v.name}`;
      }
      
      if (isSecretVariable(varName)) {
        const secret = generateSecureSecret();
        if (!state.generatedSecrets[state.activeEnv]) {
          state.generatedSecrets[state.activeEnv] = {};
        }
        state.generatedSecrets[state.activeEnv][varName] = secret;
        generatedAny = true;
      }
    });
  });
  
  if (generatedAny) {
    compileDotenv(false); // Update output instantly in-place
  }
  
  // Update Action Button Feedback
  const btn = elements.btnGenerateSecrets;
  if (btn) {
    const originalText = btn.querySelector('.btn-text').textContent;
    const originalIcon = btn.querySelector('.btn-icon').textContent;
    
    btn.querySelector('.btn-text').textContent = 'All Generated';
    btn.querySelector('.btn-icon').textContent = '✓';
    btn.classList.add('copied'); // green glow indicator styling
    
    setTimeout(() => {
      btn.querySelector('.btn-text').textContent = originalText;
      btn.querySelector('.btn-icon').textContent = originalIcon;
      btn.classList.remove('copied');
    }, 2000);
  }
  
  // Show status log below buttons
  const statusLine = document.getElementById('secrets-status-line');
  if (statusLine) {
    statusLine.textContent = '> generating secrets......done ✓';
    statusLine.style.display = 'block';
    
    setTimeout(() => {
      statusLine.style.display = 'none';
    }, 1500);
  }
}

// 1. COPY TO CLIPBOARD
function handleCopyToClipboard() {
  const rawText = elements.btnCopyEnv.getAttribute('data-raw');
  if (!rawText) return;
  
  const originalText = elements.btnCopyEnv.querySelector('.btn-text').textContent;
  const originalIcon = elements.btnCopyEnv.querySelector('.btn-icon').textContent;
  
  navigator.clipboard.writeText(rawText)
    .then(() => {
      elements.btnCopyEnv.classList.add('copied');
      elements.btnCopyEnv.querySelector('.btn-text').textContent = 'Copied ✓';
      elements.btnCopyEnv.querySelector('.btn-icon').textContent = '✓';
      
      setTimeout(() => {
        elements.btnCopyEnv.classList.remove('copied');
        elements.btnCopyEnv.querySelector('.btn-text').textContent = originalText;
        elements.btnCopyEnv.querySelector('.btn-icon').textContent = originalIcon;
      }, 2000);
    })
    .catch(err => {
      // Fallback copy command for older browser support
      const textArea = document.createElement('textarea');
      textArea.value = rawText;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        elements.btnCopyEnv.querySelector('.btn-text').textContent = 'Copied ✓';
        setTimeout(() => {
          elements.btnCopyEnv.querySelector('.btn-text').textContent = originalText;
        }, 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy text: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    });
}

// 2. DOWNLOAD AS ACTUAL FILE (FEATURE 1: .env vs .env.example)
function handleDownloadFile() {
  const rawText = elements.btnDownloadEnv.getAttribute('data-raw');
  if (!rawText) return;
  
  const filename = state.activeTab === 'example' ? '.env.example' : `.env.${state.activeEnv}`;
  
  const blob = new Blob([rawText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = filename;
  
  document.body.appendChild(downloadLink);
  downloadLink.click();
  
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

// 3. START OVER & RESET STATES
function handleStartOver() {
  clearSessionState();
  clearActivePreset();
  
  state.framework = null;
  state.services.clear();
  state.dismissedWarnings.clear();
  state.generatedSecrets = {
    development: {},
    staging: {},
    production: {}
  };
  state.activeEnv = 'development';
  
  // Clear any inline display overrides
  if (elements.step1Card) elements.step1Card.style.display = '';
  if (elements.step2Card) elements.step2Card.style.display = '';
  if (elements.step3Card) elements.step3Card.style.display = '';
  
  // Reset env switcher buttons
  const envBtns = document.querySelectorAll('.env-btn');
  envBtns.forEach(b => b.classList.remove('active'));
  const devBtn = document.getElementById('env-btn-dev');
  if (devBtn) devBtn.classList.add('active');
  updateEnvBadge();
  
  // Reset Step 1: Framework Picker cards
  const fwCards = elements.frameworkGrid.querySelectorAll('.framework-card');
  fwCards.forEach(card => {
    card.classList.remove('selected');
    card.setAttribute('aria-checked', 'false');
  });
  elements.btnStep1Next.setAttribute('disabled', 'true');
  
  // Reset Step 2: Service Selector cards
  const svcCards = elements.servicesContainer.querySelectorAll('.service-checkbox-card:not(.disabled)');
  svcCards.forEach(card => {
    card.classList.remove('checked');
    card.setAttribute('aria-checked', 'false');
  });
  
  // Reset search inputs
  elements.serviceSearchInput.value = '';
  const categoryGroups = elements.servicesContainer.querySelectorAll('.category-group');
  categoryGroups.forEach(group => {
    group.style.display = 'flex';
    group.querySelectorAll('.service-checkbox-card').forEach(c => c.style.display = 'flex');
  });
  elements.searchEmptyState.style.display = 'none';
  
  // Reset Warnings and Code Block rendering
  elements.validationWarningsContainer.innerHTML = '';
  elements.dotenvCodeRender.innerHTML = '';
  
  // Reset output tab
  toggleOutputTab('env');
  
  // Clear welcome banner
  elements.storageWelcomeBanner.style.display = 'none';
  
  // Navigate back to Step 1
  transitionToStep(1);
}

function showToastNotification(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = 'position: fixed; bottom: 24px; right: 24px; display: flex; flex-direction: column; gap: 8px; z-index: 999999; pointer-events: none;';
    document.body.appendChild(toastContainer);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast-message jetbrains-font';
  toast.style.cssText = 'background: #121212; border: 1px solid #22c55e; color: #22c55e; font-size: 11px; padding: 10px 16px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); opacity: 0; transform: translateY(8px); transition: all 0.3s ease;';
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  // Force layout reflow
  toast.offsetHeight;
  
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      if (toast.parentNode === toastContainer) {
        toastContainer.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

function applyPreset(presetId) {
  // 1. Cycle rotation if same preset clicked
  if (state.activePreset === presetId) {
    state.presetClicks[presetId] = (state.presetClicks[presetId] || 0) + 1;
  } else {
    state.activePreset = presetId;
    if (state.presetClicks[presetId] === undefined) {
      state.presetClicks[presetId] = 0;
    }
  }

  // 2. Fetch config based on rotation
  const presetConfig = getPresetConfig(presetId, state.presetClicks[presetId], state.includeProdVars);
  if (!presetConfig) return;

  // 3. Clear existing selections and add preset-specific services
  state.services.clear();
  if (presetConfig.services) {
    presetConfig.services.forEach(svcId => state.services.add(svcId));
  }

  // 4. Select framework (pass true so it doesn't wipe activePreset!)
  selectFramework(presetConfig.framework, true);

  // 5. Highlight checkbox DOM cards in Step 2 search view
  const allSvcs = document.querySelectorAll('.service-checkbox-card');
  allSvcs.forEach(c => {
    const svcId = c.getAttribute('data-id');
    if (presetConfig.services && presetConfig.services.includes(svcId)) {
      c.classList.add('checked');
      c.setAttribute('aria-checked', 'true');
    } else {
      c.classList.remove('checked');
      c.setAttribute('aria-checked', 'false');
    }
  });

  // 6. Highlight active preset button and un-highlight others
  const presetBtns = document.querySelectorAll('.preset-btn');
  presetBtns.forEach(btn => {
    if (btn.getAttribute('data-preset') === presetId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 7. Update active preset badge
  const badge = document.getElementById('active-preset-badge');
  if (badge) {
    badge.textContent = `🎯 Active: ${presetConfig.presetName} [${presetConfig.rotationIndex + 1}/${presetConfig.totalRotations}]: ${presetConfig.description}`;
    badge.style.display = 'block';
  }

  // 8. Trigger compilation shimmer animation
  const codeBody = document.querySelector('.code-block-body');
  if (codeBody) {
    codeBody.classList.remove('compile-shimmer');
    void codeBody.offsetWidth; // Force layout reflow
    codeBody.classList.add('compile-shimmer');
  }

  // 9. Evaluate warnings, compile dotenv, generate shareable links
  evaluateWarnings();
  compileDotenv(false); // compile instantly without typewriter lag
  generateShareLink();
  saveSessionState();

  // 10. Jump directly to Step 3
  if (elements.step1Card) {
    elements.step1Card.style.display = '';
    elements.step1Card.classList.remove('active');
  }
  if (elements.step2Card) {
    elements.step2Card.style.display = '';
    elements.step2Card.classList.remove('active');
  }
  if (elements.step3Card) {
    elements.step3Card.style.display = '';
    elements.step3Card.classList.add('active');
    elements.step3Card.style.opacity = '1';
    elements.step3Card.style.transform = 'translateY(0)';
  }
  state.step = 3;
  updateStepIndicator(3);
  updateHowItWorksVisibility();

  // 11. Custom toast notification
  showToastNotification(`🤖 Loaded Preset: ${presetConfig.presetName} (${presetConfig.rotationIndex + 1}/${presetConfig.totalRotations})`);
}

/* ==========================================================================
   EVENT LISTENERS SYSTEM
   ========================================================================== */
function setupEventListeners() {
  // Bind Brand Dropdown Toggle
  const logoTrigger = document.getElementById('logo-trigger');
  const brandDropdown = document.getElementById('brand-dropdown');
  if (logoTrigger && brandDropdown) {
    logoTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = brandDropdown.style.display === 'block';
      brandDropdown.style.display = isOpen ? 'none' : 'block';
    });
    
    document.addEventListener('click', (e) => {
      if (!logoTrigger.contains(e.target) && !brandDropdown.contains(e.target)) {
        brandDropdown.style.display = 'none';
      }
    });
    
    // Close dropdown and reset when clicking active brand dropdown item
    const activeDropdownItem = document.querySelector('.brand-dropdown-item.active');
    if (activeDropdownItem) {
      activeDropdownItem.addEventListener('click', (e) => {
        e.preventDefault();
        brandDropdown.style.display = 'none';
        elements.logoLink.click();
      });
    }
  }

  // Bind Quick Preset Configuration Buttons
  const presetBtns = document.querySelectorAll('.preset-btn');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetId = btn.getAttribute('data-preset');
      applyPreset(presetId);
    });
  });

  // Bind Advanced Mode (Include Production Variables) Toggle
  const toggleProdVars = document.getElementById('toggle-prod-vars');
  if (toggleProdVars) {
    toggleProdVars.checked = state.includeProdVars || false;
    toggleProdVars.addEventListener('change', (e) => {
      state.includeProdVars = e.target.checked;
      
      if (state.activePreset) {
        // Trigger compilation shimmer animation
        const codeBody = document.querySelector('.code-block-body');
        if (codeBody) {
          codeBody.classList.remove('compile-shimmer');
          void codeBody.offsetWidth; // Force layout reflow
          codeBody.classList.add('compile-shimmer');
        }
        
        // Re-compile active preset with the new setting
        compileDotenv(false);
        saveSessionState();
        showToastNotification(state.includeProdVars ? '⚡ Advanced Mode Enabled: Production variables added' : '⚡ Advanced Mode Disabled');
      } else {
        compileDotenv(false);
        saveSessionState();
      }
    });
  }

  // Bind Global Keyboard Shortcut Interceptors
  document.addEventListener('keydown', (e) => {
    // 1. Esc -> Start Fresh
    if (e.key === 'Escape') {
      e.preventDefault();
      handleStartOver();
      showToastNotification('> Wiped state. Resetting generator...');
    }
    
    // 2. Ctrl + C -> Copy active .env block (only when on Step 3)
    if (state.step === 3 && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
      const selection = window.getSelection().toString();
      if (!selection) {
        const renderEl = document.getElementById('dotenv-code-render');
        if (renderEl) {
          e.preventDefault();
          navigator.clipboard.writeText(renderEl.innerText)
            .then(() => {
              showToastNotification('📋 Code block copied to clipboard!');
            });
        }
      }
    }
    
    // 3. Alt + 1/2/3 -> Switch Environment stage
    if (e.altKey && ['1', '2', '3'].includes(e.key)) {
      e.preventDefault();
      const envs = ['development', 'staging', 'production'];
      const targetEnv = envs[parseInt(e.key) - 1];
      const envBtn = document.querySelector(`.env-btn[data-env="${targetEnv}"]`);
      if (envBtn) {
        envBtn.click();
        showToastNotification(`> Switched environment to ${targetEnv.toUpperCase()}`);
      }
    }
    
    // 4. Alt + E / Alt + X -> Switch file tabs (.env vs .env.example)
    if (e.altKey && (e.key.toLowerCase() === 'e' || e.key.toLowerCase() === 'x')) {
      e.preventDefault();
      const targetTab = e.key.toLowerCase() === 'e' ? 'env' : 'example';
      toggleOutputTab(targetTab);
      showToastNotification(`> Switched file tab to .env${targetTab === 'example' ? '.example' : ''}`);
    }
  });

  // Step 1: Next Action
  elements.btnStep1Next.addEventListener('click', () => {
    if (state.framework) {
      transitionToStep(2);
    }
  });

  // Step 2: Back Action
  elements.btnStep2Back.addEventListener('click', () => {
    transitionToStep(1);
  });

  // Step 2: Generate Action
  elements.btnStep2Next.addEventListener('click', () => {
    evaluateWarnings();
    compileDotenv();
    generateShareLink();
    saveCurrentStackToStorage(); // FEATURE 5
    // Delay transition to allow the new spinner animation to play
    setTimeout(() => {
      transitionToStep(3);
    }, 800);
  });

  // Step 3: Copy Action
  elements.btnCopyEnv.addEventListener('click', handleCopyToClipboard);

  // Step 3: Download Action
  elements.btnDownloadEnv.addEventListener('click', handleDownloadFile);

  // Step 3: Reset Action
  elements.btnStartOver.addEventListener('click', handleStartOver);
  
  // FEATURE 1: Code Tabs Pill Buttons
  elements.tabBtnEnv.addEventListener('click', () => toggleOutputTab('env'));
  elements.tabBtnExample.addEventListener('click', () => toggleOutputTab('example'));
  
  // FEATURE 3: Copy Shareable Link Action
  elements.btnShareCopy.addEventListener('click', handleCopyShareLink);
  
  // FEATURE 4: Live Services Search
  elements.serviceSearchInput.addEventListener('input', handleServiceSearch);

  // Mobile Hamburger Navigation Listeners
  if (elements.menuToggle && elements.mobileMenu) {
    elements.menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
    
    const mobileLinks = elements.mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
    
    document.addEventListener('click', (e) => {
      if (elements.mobileMenu.classList.contains('open') && 
          !elements.mobileMenu.contains(e.target) && 
          !elements.menuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  // Step 3: Generate All Secrets Action
  if (elements.btnGenerateSecrets) {
    elements.btnGenerateSecrets.addEventListener('click', handleGenerateAllSecrets);
  }

  // Step 3: Inline Secret Generator Button click delegation
  if (elements.dotenvCodeRender) {
    elements.dotenvCodeRender.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-inline-gen');
      if (btn) {
        const varName = btn.getAttribute('data-var');
        if (varName) {
          generateSecretForVar(varName);
        }
      }
    });
  }

  // Templates Search & Filters Listeners
  const templatesSearch = document.getElementById('templates-search');
  const templatesCategory = document.getElementById('templates-filter-category');
  const templatesComplexity = document.getElementById('templates-filter-complexity');
  const templatesStack = document.getElementById('templates-filter-stack');

  if (templatesSearch) {
    templatesSearch.addEventListener('input', () => {
      renderTemplatesGrid();
    });
  }
  if (templatesCategory) {
    templatesCategory.addEventListener('change', () => {
      renderTemplatesGrid();
    });
  }
  if (templatesComplexity) {
    templatesComplexity.addEventListener('change', () => {
      renderTemplatesGrid();
    });
  }
  if (templatesStack) {
    templatesStack.addEventListener('change', () => {
      renderTemplatesGrid();
    });
  }
}

/* ==========================================================================
   HASH ROUTING & SPA COMPONENT PAGE SIMULATIONS
   ========================================================================== */
function handlePathRoute() {
  const path = window.location.pathname;
  
  // Hide all views first
  if (elements.homeView) elements.homeView.classList.remove('active-view');
  if (elements.workspaceView) elements.workspaceView.classList.remove('active-view');
  if (elements.seoHubView) elements.seoHubView.classList.remove('active-view');
  if (elements.searchView) elements.searchView.classList.remove('active-view');
  if (elements.generatorsView) elements.generatorsView.classList.remove('active-view');
  if (elements.architectView) elements.architectView.classList.remove('active-view');
  if (elements.templatesView) elements.templatesView.classList.remove('active-view');
  if (elements.resourcesView) elements.resourcesView.classList.remove('active-view');
  if (elements.pricingView) elements.pricingView.classList.remove('active-view');
  if (elements.aboutView) elements.aboutView.classList.remove('active-view');
  if (elements.privacyView) elements.privacyView.classList.remove('active-view');
  if (elements.stackView) elements.stackView.classList.remove('active-view');
  // Optional elements that might be undefined depending on DOM state
  if (elements.howItWorksView) elements.howItWorksView.classList.remove('active-view');
  if (elements.blogView) elements.blogView.classList.remove('active-view');
  if (elements.blogPostView) elements.blogPostView.classList.remove('active-view');
  
  if (path === '/about') {
    elements.aboutView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (path === '/privacy') {
    elements.privacyView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (path === '/resources' || path === '/blog') {
    if (elements.resourcesView) elements.resourcesView.classList.add('active-view');
    else if (elements.blogView) elements.blogView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (path === '/generators') {
    if (elements.generatorsView) elements.generatorsView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (path === '/architect') {
    if (elements.architectView) elements.architectView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (path === '/workspace') {
    if (elements.workspaceView) elements.workspaceView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof renderWorkspace === 'function') renderWorkspace();
  } else if (path === '/search') {
    if (elements.searchView) elements.searchView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof renderSiteWideSearch === 'function') renderSiteWideSearch();
  } else if (path.startsWith('/templates/') && path !== '/templates') {
    const slug = path.replace('/templates/', '');
    if (typeof renderSEOHubPage === 'function') renderSEOHubPage('templates', slug);
  } else if (path.startsWith('/stacks/')) {
    const slug = path.replace('/stacks/', '');
    if (typeof renderSEOHubPage === 'function') renderSEOHubPage('stacks', slug);
  } else if (path.startsWith('/integrations/')) {
    const slug = path.replace('/integrations/', '');
    if (typeof renderSEOHubPage === 'function') renderSEOHubPage('integrations', slug);
  } else if (path.startsWith('/blueprints/')) {
    const slug = path.replace('/blueprints/', '');
    if (typeof renderSEOHubPage === 'function') renderSEOHubPage('blueprints', slug);
  } else if (path === '/templates') {
    if (elements.templatesView) elements.templatesView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (path === '/pricing') {
    if (elements.pricingView) elements.pricingView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (path.startsWith('/stack/')) {
    const stackSlug = path.replace('/stack/', '');
    const activeStack = typeof STACK_PAGES !== 'undefined' ? STACK_PAGES.find(s => s.slug === stackSlug) : null;
    
    if (activeStack) {
      document.title = activeStack.title;
      let metaDesc = document.querySelector('meta[name="description"]');
      if(metaDesc && activeStack.metaDesc) metaDesc.setAttribute('content', activeStack.metaDesc);
      
      let faqsHtml = activeStack.faqs.map(f => `
        <div style="margin-bottom: 20px;">
          <h3 style="margin-bottom: 8px;">${f.q}</h3>
          <p style="margin-top: 0; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; font-size: 14px;">${f.a}</p>
        </div>
      `).join('');

      elements.stackArticleContent.innerHTML = `
        <h1>${activeStack.title}</h1>
        <div class="blog-meta" style="font-family:'JetBrains Mono', monospace; font-size:12px; color:var(--text-muted); margin-bottom:28px;">
          <span>Stack Configuration</span>
        </div>
        <div class="blog-markdown">
          ${activeStack.content}
          
          <h2 style="margin-top: 40px;">.env Template</h2>
          <pre><code>${activeStack.envTemplate}</code></pre>
          
          <h2 style="margin-top: 40px;">Frequently Asked Questions</h2>
          ${faqsHtml}
        </div>
        <div class="blog-cta-box" style="margin-top: 50px;">
          <h3>Ready to configure your stack?</h3>
          <p>Generate a professional, fully commented .env file for ${activeStack.name} instantly.</p>
          <a href="/" class="btn btn-primary cta-btn">Generate custom .env →</a>
        </div>
      `;
      elements.stackView.classList.add('active-view');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      history.replaceState(null, '', '/');
      handlePathRoute();
      return;
    }
  } else if (path.startsWith('/blog/')) {
    const postSlug = path.replace('/blog/', '');
    const activePost = BLOG_POSTS.find(p => p.slug === postSlug);
    
    if (activePost) {
      // 1. Dynamic SEO updates
      document.title = activePost.seoTitle || activePost.title;
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && activePost.seoMeta) metaDesc.setAttribute('content', activePost.seoMeta);
      
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', `https://www.getenv.in/blog/${activePost.slug}`);
      
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', activePost.seoTitle || activePost.title);
      
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', activePost.seoMeta);
      
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', `https://www.getenv.in/blog/${activePost.slug}`);

      // 2. Locate sequential posts
      const postIndex = BLOG_POSTS.findIndex(p => p.slug === postSlug);
      const prevPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
      const nextPost = postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;

      // 3. Render complete HTML layout directly inside blogPostView
      elements.blogPostView.innerHTML = `
        <div class="blog-post-container">
          <a href="/blog" class="back-link" style="display: block; margin-bottom: 24px;">← Back to Blog</a>
          
          <div class="blog-terminal-header">
            $ cat ./guides/${activePost.slug}.md<br>
            &gt; loading article...
          </div>
          
          <article class="blog-article-body">
            <h1>${activePost.title}</h1>
            <div class="blog-meta" style="font-family:'JetBrains Mono', monospace; font-size:12px; color:var(--text-muted); margin-bottom:28px;">
              <span>Guides & Tutorial</span> • <span class="read-time-badge" style="background: rgba(34, 197, 94, 0.1); color: var(--accent-color); padding: 2px 6px; border-radius: 4px; font-weight: 500;">${activePost.readTime}</span>
            </div>
            <div class="blog-markdown">
              ${activePost.content}
            </div>
          </article>

          <!-- Dynamic Prev/Next Navigation -->
          <div class="blog-post-navigation" style="display: flex; justify-content: space-between; align-items: center; margin-top: 40px; padding: 20px 0; border-top: 1px dashed var(--border-muted); border-bottom: 1px dashed var(--border-muted); font-family: 'JetBrains Mono', monospace; font-size: 11px; flex-wrap: wrap; gap: 16px;">
            <div>
              ${prevPost ? `<a href="/blog/${prevPost.slug}" class="blog-nav-link" style="color: var(--accent-color); text-decoration: none;">← Previous article</a>` : `<span style="color: var(--text-muted); opacity: 0.5;">← Previous article</span>`}
            </div>
            <div>
              <a href="/blog" class="blog-nav-link" style="color: var(--text-primary); text-decoration: none; font-weight: bold;">← Back to all guides</a>
            </div>
            <div>
              ${nextPost ? `<a href="/blog/${nextPost.slug}" class="blog-nav-link" style="color: var(--accent-color); text-decoration: none;">Next article →</a>` : `<span style="color: var(--text-muted); opacity: 0.5;">Next article →</span>`}
            </div>
          </div>
          
          <div style="margin-top: 24px; margin-bottom: 32px;">
            <a href="/blog" class="back-link">← Back to Blog</a>
          </div>

          <!-- Dynamic Green CTA Box -->
          <div class="blog-cta-box" style="border: 1px solid rgba(34, 197, 94, 0.3) !important; background-color: rgba(34, 197, 94, 0.03) !important; border-left: 4px solid var(--accent-color) !important; margin-top: 40px; padding: 24px; border-radius: 8px; display: flex; flex-direction: column; gap: 12px;">
            <h3 style="color: var(--accent-color); margin: 0; font-size: 16px; font-weight: 600;">Generate your .env file instantly →</h3>
            <p style="color: var(--text-secondary); margin: 0; font-size: 13px; line-height: 1.5;">Compile a professional, commented config template perfectly adjusted to your framework and services. 100% browser-side, zero logins required.</p>
            <a href="/" class="btn btn-primary cta-btn" style="align-self: flex-start; margin-top: 4px;">Generate your .env →</a>
          </div>
        </div>
      `;
      
      elements.blogPostView.classList.add('active-view');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      history.replaceState(null, '', '/blog');
      handlePathRoute();
      return;
    }
  } else if (path === '/how-it-works') {
    if (elements.howItWorksView) elements.howItWorksView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    document.title = '.env File Generator — Free dotenv Template for Next.js, React, Django & 20+ Frameworks';
    let metaDesc = document.querySelector('meta[name="description"]');
    if(metaDesc) metaDesc.setAttribute('content', 'Generate production-ready .env files instantly. Pick your framework and services — get complete environment variable templates with explanations for Next.js, React, Django, Laravel and 100+ services. Free, no login required.');
    
    elements.homeView.classList.add('active-view');
    restoreSessionState();
  }
  updateHowItWorksVisibility();
}

// Intercept logo clicking to perform startover resets
elements.logoLink.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Close the brand dropdown if open
  const brandDropdown = document.getElementById('brand-dropdown');
  if (brandDropdown) brandDropdown.style.display = 'none';
  
  // 1. Reset state and steps
  if (state.step !== 1) {
    transitionToStep(1);
  }
  handleStartOver();
  
  // 2. Safely swap to home view WITHOUT re-triggering animation if already home
  document.querySelectorAll('.view').forEach(v => {
    if (v.id === 'home-view') {
      if (!v.classList.contains('active-view')) {
        v.classList.add('active-view');
      }
    } else {
      v.classList.remove('active-view');
    }
  });

  // 3. Reset URL path to root
  history.pushState(null, '', '/');
  handlePathRoute();
  
  // 4. Force exact pixel-perfect scroll reset instantly
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
});

/* ==========================================================================
   AI PROJECT ARCHITECT SIMULATION LOGIC
   ========================================================================== */
function simulateAIGeneration() {
  if (!elements.aiInputTextarea || !elements.aiInputTextarea.value.trim()) {
    showToastNotification("⚠️ Please describe your app idea first.");
    return;
  }

  // 1. Show loader
  if (elements.aiLoadingOverlay) elements.aiLoadingOverlay.style.display = 'flex';
  
  const textOutput = elements.loaderOutput;
  if (textOutput) textOutput.innerHTML = '> initializing architect...<br>';
  
  const prompt = elements.aiInputTextarea.value.toLowerCase();
  
  // Fake Terminal Sequence
  const steps = [
    { delay: 400, text: '> analyzing requirements...' },
    { delay: 1000, text: '> parsing tech stack preferences...' },
    { delay: 1800, text: '> designing database schema...' },
    { delay: 2500, text: '> optimizing deployment strategy...' },
    { delay: 3200, text: '> compiling blueprint...' },
    { delay: 4000, text: '> done.' }
  ];

  steps.forEach(step => {
    setTimeout(() => {
      if (textOutput) textOutput.innerHTML += step.text + '<br>';
    }, step.delay);
  });

  // 2. Generate Mock Data based on heuristics
  setTimeout(() => {
    // Rely on data-blueprints.js to generate rich HTML output
    const htmlOutput = typeof BLUEPRINT_HEURISTICS !== 'undefined' ? 
      BLUEPRINT_HEURISTICS.generateHTML(prompt) : null;

    if (htmlOutput) {
      // Safely populate DOM elements
      const safeSetHtml = (id, html) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      };
      
      safeSetHtml('bp-exec-summary', htmlOutput.execSummary);
      safeSetHtml('bp-business-problem', htmlOutput.businessProblem);
      safeSetHtml('bp-user-journey', htmlOutput.userJourney);
      safeSetHtml('bp-revenue-model', htmlOutput.revenueModel);
      safeSetHtml('bp-stack', htmlOutput.techStack);
      
      const bpFolder = document.getElementById('bp-folder-structure');
      if (bpFolder) bpFolder.textContent = htmlOutput.folderStructure;
      
      const bpDbSchema = document.getElementById('bp-db-schema');
      if (bpDbSchema) bpDbSchema.textContent = htmlOutput.dbSchema;
      
      safeSetHtml('bp-db-tables-list', htmlOutput.dbTables);
      
      const erdEl = document.getElementById('bp-erd-diagram');
      if (erdEl) {
        erdEl.removeAttribute('data-processed');
        erdEl.setAttribute('data-code', htmlOutput.erdDiagram);
        erdEl.innerHTML = `<div class="mermaid" style="display: flex; justify-content: center;">${htmlOutput.erdDiagram}</div>`;
      }
      
      safeSetHtml('bp-api-route-plan', htmlOutput.apiRoutePlan);
      safeSetHtml('bp-auth-flow-steps', htmlOutput.authFlow);
      safeSetHtml('bp-user-roles-list', htmlOutput.userRoles);
      
      const bpEnvVars = document.getElementById('bp-env-vars-block');
      if (bpEnvVars) bpEnvVars.textContent = htmlOutput.envVariables;
      
      safeSetHtml('bp-deployment-strategy-list', htmlOutput.deploymentStrategy);
      safeSetHtml('bp-infra-costs-table', htmlOutput.infraCost);
      safeSetHtml('bp-development-timeline', htmlOutput.devPhases);
      safeSetHtml('bp-mvp-scope-list', htmlOutput.mvpScope);
      safeSetHtml('bp-scaling-plan-list', htmlOutput.scalingPlan);
      safeSetHtml('bp-third-party-list', htmlOutput.thirdPartyServices);
      
      const archEl = document.getElementById('bp-system-arch-diagram');
      if (archEl) {
        archEl.removeAttribute('data-processed');
        archEl.setAttribute('data-code', htmlOutput.archDiagram);
        archEl.innerHTML = `<div class="mermaid" style="display: flex; justify-content: center;">${htmlOutput.archDiagram}</div>`;
      }
    }
    
    // Hide Loader & Transition
    if (elements.aiLoadingOverlay) elements.aiLoadingOverlay.style.display = 'none';
    
    // Attempt Mermaid render
    if (typeof mermaid !== 'undefined') {
      try { 
        mermaid.init(undefined, document.querySelectorAll('.mermaid-diagram-placeholder .mermaid')); 
      } catch (e) {}
    }
    
    history.pushState(null, '', '/architect');
    handlePathRoute();
    
  }, 4500);
}

// Bind Generate Blueprint
if (elements.btnGenerateBlueprint) {
  elements.btnGenerateBlueprint.addEventListener('click', simulateAIGeneration);
}

// Bind Suggestion Chips
document.querySelectorAll('.suggestion-chip').forEach(chip => {
  chip.addEventListener('click', (e) => {
    if (elements.aiInputTextarea) {
      elements.aiInputTextarea.value = "I want to build a " + e.target.textContent + " using modern web technologies. Focus on scalability and performance.";
    }
  });
});

// Bind New Blueprint reset button
const btnNewBlueprint = document.getElementById('btn-new-blueprint');
if (btnNewBlueprint) {
  btnNewBlueprint.addEventListener('click', () => {
    history.pushState(null, '', '/');
    handlePathRoute();
    if (elements.aiInputTextarea) elements.aiInputTextarea.value = '';
  });
}

/* ==========================================================================
   CUSTOM FIGMA-STYLE CURSOR ENGINE
   ========================================================================== */
let mouseX = 0;
let mouseY = 0;

function initCustomCursor() {
  const pointer = document.getElementById('cursor-pointer');
  if (!pointer) return;

  // Set initial opacity to 0 until mouse moves to prevent weird visual glitches on first load
  pointer.style.opacity = '0';
  let firstMove = true;

  // Track mouse coordinates
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (firstMove) {
      pointer.style.opacity = '1';
      firstMove = false;
    }
    
    // Pointer follows mouse position exactly with zero lag
    pointer.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  // Track mouse leave/enter window bounds
  document.addEventListener('mouseleave', () => {
    pointer.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    pointer.style.opacity = '1';
  });

  // Mousedown & Mouseup toggles for click state
  document.addEventListener('mousedown', (e) => {
    document.body.classList.add('cursor-click');
    
    // Create quick Figma click ripple
    createFigmaClickRipple(e.clientX, e.clientY);
  });

  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-click');
  });

  // Initial binding of hoverable elements
  bindFigmaCursorHoverEvents();

  // Watch for dynamic DOM changes to bind hover to newly generated elements
  const domObserver = new MutationObserver(() => {
    bindFigmaCursorHoverEvents();
  });
  domObserver.observe(document.documentElement, { childList: true, subtree: true });
}

// Bind hover listeners to all clickable elements
function bindFigmaCursorHoverEvents() {
  const hoverables = document.querySelectorAll(
    'button, a, [role="button"], .card, .framework-card, .service-card, .service-checkbox-card, input, select, textarea, .tab-btn, .env-btn, .btn-inline-gen, label, [onclick], .nav-link, .logo'
  );

  hoverables.forEach(el => {
    if (el.dataset.figmaCursorBound) return; // avoid duplicate bindings
    el.dataset.figmaCursorBound = 'true';

    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });

    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

// Creates the Figma click ripple element, animated and auto-destroyed after 400ms
function createFigmaClickRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.className = 'figma-click-ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  document.body.appendChild(ripple);

  // Auto clean-up to prevent memory leaks
  setTimeout(() => {
    ripple.remove();
  }, 400);
}

/* ==========================================================================
   DYNAMIC RENDERING (ECOSYSTEM)
   ========================================================================== */
function renderTemplatesGrid() {
  if (!elements.templatesGrid) return;
  if (typeof TEMPLATES_DB === 'undefined') return;
  
  const searchInput = document.getElementById('templates-search');
  const categorySelect = document.getElementById('templates-filter-category');
  const complexitySelect = document.getElementById('templates-filter-complexity');
  const stackSelect = document.getElementById('templates-filter-stack');
  
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedCategory = categorySelect ? categorySelect.value : '';
  const selectedComplexity = complexitySelect ? complexitySelect.value : '';
  const selectedStack = stackSelect ? stackSelect.value : '';
  
  const filtered = TEMPLATES_DB.filter(t => {
    // 1. Search filter
    if (query) {
      const matchTitle = t.title.toLowerCase().includes(query);
      const matchDesc = t.desc.toLowerCase().includes(query);
      const matchCategory = t.category.toLowerCase().includes(query);
      const matchComplexity = t.complexity.toLowerCase().includes(query);
      const matchStack = t.stack.some(s => s.toLowerCase().includes(query));
      if (!matchTitle && !matchDesc && !matchCategory && !matchComplexity && !matchStack) {
        return false;
      }
    }
    
    // 2. Category filter
    if (selectedCategory && t.category !== selectedCategory) {
      return false;
    }
    
    // 3. Complexity filter
    if (selectedComplexity && t.complexity !== selectedComplexity) {
      return false;
    }
    
    // 4. Stack filter
    if (selectedStack && !t.stack.includes(selectedStack)) {
      return false;
    }
    
    return true;
  });
  
  if (filtered.length === 0) {
    elements.templatesGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; border: 1px dashed var(--border-muted); border-radius: 8px;">
        <p style="color: var(--text-secondary); font-family: 'JetBrains Mono', monospace; font-size: 14px; margin: 0;">No templates found matching your filter criteria.</p>
      </div>
    `;
    return;
  }
  
  elements.templatesGrid.innerHTML = filtered.map(t => {
    const isFav = workspaceState.favoriteTemplates && workspaceState.favoriteTemplates.includes(t.slug);
    return `
      <div class="blueprint-card" style="padding: 24px; display: flex; flex-direction: column; height: 100%; border-color: ${t.premium ? 'var(--accent-color)' : 'var(--border-muted)'}; position: relative; overflow: hidden;">
        <button class="favorite-star-btn" style="position: absolute; top: 12px; right: 12px; background: transparent; border: none; font-size: 16px; cursor: pointer; color: ${isFav ? '#eab308' : 'var(--text-muted)'}; z-index: 10;" onclick="event.preventDefault(); event.stopPropagation(); toggleFavoriteTemplate('${t.slug}');">
          ${isFav ? '★' : '☆'}
        </button>
        ${t.premium ? '<div style="position: absolute; top: -1px; left: -1px; background: var(--accent-color); color: #000; font-size: 10px; font-weight: bold; padding: 4px 12px; border-bottom-right-radius: 8px;">PREMIUM</div>' : ''}
        <h3 style="margin-top: ${t.premium ? '16px' : '0'}; font-size: 18px; color: var(--text-primary); margin-bottom: 8px; border: none; padding: 0;">${t.title}</h3>
        <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.5; margin-bottom: 20px; flex-grow: 1;">${t.desc}</p>
        
        <div style="margin-bottom: 20px;">
          <span style="display: block; font-size: 11px; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase;">Stack</span>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${t.stack.map(s => `<span class="stat-badge" style="font-size: 10px;">${s}</span>`).join('')}
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--border-muted); padding-top: 16px; margin-bottom: 20px;">
          <div>
            <span style="display: block; font-size: 10px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 2px;">Difficulty</span>
            <span style="font-size: 12px; font-family: 'JetBrains Mono', monospace; color: ${t.complexity === 'Advanced' ? '#ef4444' : (t.complexity === 'Intermediate' ? '#eab308' : '#22c55e')};">${t.complexity}</span>
          </div>
          <div>
            <span style="display: block; font-size: 10px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 2px;">Est. Build Time</span>
            <span style="font-size: 12px; font-family: 'JetBrains Mono', monospace; color: var(--text-primary);">${t.buildTime}</span>
          </div>
        </div>
        
        <a href="/templates/${t.slug}" class="btn btn-secondary" style="width: 100%; justify-content: center;" onclick="event.preventDefault(); history.pushState(null, '', '/templates/${t.slug}'); handlePathRoute();">View Blueprint →</a>
      </div>
    `;
  }).join('');
}

function renderGeneratorsGrid() {
  if (!elements.generatorsGrid) return;
  if (typeof GENERATORS_DB === 'undefined') return;
  
  elements.generatorsGrid.innerHTML = GENERATORS_DB.map(g => `
    <div class="blueprint-card" style="padding: 24px; display: flex; flex-direction: column; height: 100%; cursor: ${g.status === 'active' ? 'pointer' : 'default'}; opacity: ${g.status === 'active' ? '1' : '0.6'}; transition: transform 0.2s, border-color 0.2s;" onmouseenter="if('${g.status}'==='active'){this.style.borderColor='var(--accent-color)'; this.style.transform='translateY(-2px)';}" onmouseleave="this.style.borderColor='var(--border-muted)'; this.style.transform='translateY(0)';">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
        <span style="font-size: 32px; line-height: 1;">${g.icon}</span>
        <span class="stat-badge" style="${g.status === 'active' ? 'color: var(--accent-color); border-color: var(--accent-color); background: rgba(34,197,94,0.1);' : ''}">${g.status === 'active' ? 'ACTIVE' : 'SOON'}</span>
      </div>
      <h3 style="font-size: 16px; color: var(--text-primary); margin-bottom: 8px; border: none; padding: 0;">${g.name}</h3>
      <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.5; margin-bottom: 0;">${g.description}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   EXPORT SYSTEM (PHASE 7)
   ========================================================================== */
function convertHtmlTableToMarkdown(tableEl) {
  const rows = Array.from(tableEl.querySelectorAll('tr'));
  if (rows.length === 0) return "";
  
  let mdTable = "";
  
  // Headers
  const headers = Array.from(rows[0].querySelectorAll('th, td')).map(el => el.innerText.trim());
  mdTable += `| ${headers.join(' | ')} |\n`;
  mdTable += `| ${headers.map(() => '---').join(' | ')} |\n`;
  
  // Data Rows
  for (let i = 1; i < rows.length; i++) {
    const cols = Array.from(rows[i].querySelectorAll('td')).map(el => el.innerText.trim());
    if (cols.length > 0) {
      mdTable += `| ${cols.join(' | ')} |\n`;
    }
  }
  
  return mdTable;
}

function generateStructuredPlanMarkdown() {
  const title = document.getElementById('blueprint-title')?.innerText || 'Project Implementation Blueprint';
  const execSummary = document.getElementById('bp-exec-summary')?.innerText || '';
  
  // Suggested Tech Stack
  const techStackBadges = Array.from(document.querySelectorAll('#bp-stack .stat-badge')).map(el => el.innerText).join(', ');
  
  // Folder Structure
  const folderStructure = document.getElementById('bp-folder-structure')?.innerText || '';
  
  // Database Schema
  const dbSchema = document.getElementById('bp-db-schema')?.innerText || '';
  
  // Database Tables
  let dbTablesMd = "";
  const dbTablesTable = document.querySelector('#bp-db-tables-list table');
  if (dbTablesTable) {
    dbTablesMd = convertHtmlTableToMarkdown(dbTablesTable);
  }
  
  // Entity Relationships
  const erdSource = document.getElementById('bp-erd-diagram')?.getAttribute('data-code') || '';
  
  // API Route Plan
  let apiRouteMd = "";
  const apiRouteTable = document.querySelector('#bp-api-route-plan table');
  if (apiRouteTable) {
    apiRouteMd = convertHtmlTableToMarkdown(apiRouteTable);
  }
  
  // Auth Flow
  const authFlow = Array.from(document.querySelectorAll('#bp-auth-flow-steps li')).map(el => `- ${el.innerText}`).join('\n');
  
  // User Roles
  const userRoles = Array.from(document.querySelectorAll('#bp-user-roles-list li')).map(el => `- ${el.innerText}`).join('\n');
  
  // Env Variables
  const envVars = document.getElementById('bp-env-vars-block')?.innerText || '';
  
  // Deployment Strategy
  const deployment = Array.from(document.querySelectorAll('#bp-deployment-strategy-list li')).map(el => `- ${el.innerText}`).join('\n');
  
  // Infra Cost
  let infraCostMd = "";
  const infraCostTable = document.querySelector('#bp-infra-costs-table table');
  if (infraCostTable) {
    infraCostMd = convertHtmlTableToMarkdown(infraCostTable);
  }
  
  // Development Phases
  const devPhases = Array.from(document.querySelectorAll('#bp-development-timeline .roadmap-step')).map(el => {
    const num = el.querySelector('.step-number')?.innerText || '';
    const h4 = el.querySelector('h4')?.innerText || '';
    const p = el.querySelector('p')?.innerText || '';
    return `### ${num}: ${h4}\n${p}`;
  }).join('\n\n');
  
  // MVP Scope
  const mvpScope = Array.from(document.querySelectorAll('#bp-mvp-scope-list li')).map(el => `- ${el.innerText}`).join('\n');
  
  // Future Scaling Plan
  const scaling = Array.from(document.querySelectorAll('#bp-scaling-plan-list li')).map(el => `- ${el.innerText}`).join('\n');
  
  // Recommended SaaS APIs
  const saas = Array.from(document.querySelectorAll('#bp-third-party-list li')).map(el => `- ${el.innerText}`).join('\n');
  
  // System Arch Diagram
  const archSource = document.getElementById('bp-system-arch-diagram')?.getAttribute('data-code') || '';

  let md = `# ${title}\n\n`;
  md += `## 1. Executive Summary\n${execSummary}\n\n`;
  md += `## 2. Suggested Tech Stack\n${techStackBadges}\n\n`;
  md += `## 3. Folder Structure\n\`\`\`\n${folderStructure}\n\`\`\`\n\n`;
  md += `## 4. Database Schema (DDL)\n\`\`\`sql\n${dbSchema}\n\`\`\`\n\n`;
  md += `## 5. Database Tables\n${dbTablesMd}\n\n`;
  md += `## 6. Entity Relationships (Mermaid)\n\`\`\`mermaid\n${erdSource}\n\`\`\`\n\n`;
  md += `## 7. API Route Plan\n${apiRouteMd}\n\n`;
  md += `## 8. Authentication Flow\n${authFlow}\n\n`;
  md += `## 9. User Roles\n${userRoles}\n\n`;
  md += `## 10. Environment Variables\n\`\`\`bash\n${envVars}\n\`\`\`\n\n`;
  md += `## 11. Deployment Strategy\n${deployment}\n\n`;
  md += `## 12. Infrastructure Cost Estimate\n${infraCostMd}\n\n`;
  md += `## 13. Development Phases\n${devPhases}\n\n`;
  md += `## 14. MVP Scope\n${mvpScope}\n\n`;
  md += `## 15. Future Scaling Plan\n${scaling}\n\n`;
  md += `## 16. Recommended Third-Party Services\n${saas}\n\n`;
  md += `## 17. System Architecture Diagram (Mermaid)\n\`\`\`mermaid\n${archSource}\n\`\`\`\n`;

  return md;
}

const btnExportMd = document.getElementById('btn-export-md');
const btnExportPdf = document.getElementById('btn-export-pdf');
const btnExportNotion = document.getElementById('btn-export-notion');
const btnCopyAll = document.getElementById('btn-copy-all');

if (btnExportMd) {
  btnExportMd.addEventListener('click', () => {
    const md = generateStructuredPlanMarkdown();
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-blueprint.md';
    a.click();
    URL.revokeObjectURL(url);
    showToastNotification("Markdown exported successfully");
    if (typeof logExportAction === 'function') logExportAction("MD");
  });
}

if (btnExportNotion) {
  btnExportNotion.addEventListener('click', () => {
    const md = generateStructuredPlanMarkdown();
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notion-import-blueprint.md';
    a.click();
    URL.revokeObjectURL(url);
    showToastNotification("Notion-compatible file exported. Drag & drop directly into Notion!");
    if (typeof logExportAction === 'function') logExportAction("Notion");
  });
}

if (btnCopyAll) {
  btnCopyAll.addEventListener('click', () => {
    const md = generateStructuredPlanMarkdown();
    navigator.clipboard.writeText(md)
      .then(() => {
        showToastNotification("Copied entire plan to clipboard!");
        if (typeof logExportAction === 'function') logExportAction("Copy");
      })
      .catch(() => {
        showToastNotification("⚠️ Copy failed. Please try again.");
      });
  });
}

if (btnExportPdf) {
  btnExportPdf.addEventListener('click', () => {
    window.print();
    if (typeof logExportAction === 'function') logExportAction("PDF");
  });
}

/* ==========================================================================
   PROJECT WORKSPACE ENGINE (RETENTION WORKSPACE)
   ========================================================================== */
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
// Initialize workspace state from local storage
function initWorkspace() {
  const stored = localStorage.getItem('getenv_workspace');
  if (stored) {
    try {
      workspaceState = JSON.parse(stored);
      if (!workspaceState.projects) workspaceState.projects = [];
      if (!workspaceState.drafts) workspaceState.drafts = [];
      if (!workspaceState.savedBlueprints) workspaceState.savedBlueprints = [];
      if (!workspaceState.favoriteTemplates) workspaceState.favoriteTemplates = [];
      if (!workspaceState.recentGenerators) workspaceState.recentGenerators = [];
      if (!workspaceState.exports) workspaceState.exports = [];
    } catch(e) {
      console.error("Failed to parse workspace state:", e);
    }
  }
  // Bind Save to Workspace button in Architect View
  const btnSaveWorkspace = document.getElementById('btn-save-workspace');
  if (btnSaveWorkspace) {
    btnSaveWorkspace.addEventListener('click', saveActiveProjectToWorkspace);
  }

  // Bind active workspace buttons
  const selectStatus = document.getElementById('ws-project-status');
  if (selectStatus) {
    selectStatus.addEventListener('change', (e) => {
      if (workspaceState.activeProjectId) {
        updateProjectField(workspaceState.activeProjectId, 'status', e.target.value);
        showToastNotification(`Status updated to: ${e.target.value}`);
      }
    });
  }

  const btnDuplicate = document.getElementById('ws-btn-duplicate');
  if (btnDuplicate) {
    btnDuplicate.addEventListener('click', () => {
      if (workspaceState.activeProjectId) {
        duplicateProject(workspaceState.activeProjectId);
      }
    });
  }

  const btnExport = document.getElementById('ws-btn-export');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      if (workspaceState.activeProjectId) {
        exportProjectWorkspace(workspaceState.activeProjectId);
      }
    });
  }

  const btnClose = document.getElementById('ws-btn-close');
  if (btnClose) {
    btnClose.addEventListener('click', () => {
      workspaceState.activeProjectId = null;
      saveWorkspaceState();
      renderWorkspace();
    });
  }

  // Auto-save notes
  const notesTextarea = document.getElementById('ws-notes-textarea');
  if (notesTextarea) {
    notesTextarea.addEventListener('input', () => {
      if (workspaceState.activeProjectId) {
        updateProjectField(workspaceState.activeProjectId, 'notes', notesTextarea.value);
      }
    });
  }

  // Bind Tab Row clicks
  const tabRow = document.getElementById('ws-tab-row');
  if (tabRow) {
    tabRow.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        switchWorkspaceTab(tab);
      });
    });
  }

  // Version Select Dropdown change listener
  const versionSelect = document.getElementById('ws-version-select');
  if (versionSelect) {
    versionSelect.addEventListener('change', (e) => {
      if (workspaceState.activeProjectId) {
        const pIndex = workspaceState.projects.findIndex(p => p.id === workspaceState.activeProjectId);
        if (pIndex !== -1) {
          workspaceState.projects[pIndex].currentVersionIndex = parseInt(e.target.value);
          saveWorkspaceState();
          loadProjectDashboard(workspaceState.activeProjectId);
          showToastNotification(`Swapped to Version ${parseInt(e.target.value) + 1}`);
        }
      }
    });
  }

  // Create New Version Button click
  const btnNewVersion = document.getElementById('ws-btn-new-version');
  if (btnNewVersion) {
    btnNewVersion.addEventListener('click', () => {
      if (workspaceState.activeProjectId) {
        createNewProjectVersion(workspaceState.activeProjectId);
      }
    });
  }

  // Compare Versions Button click
  const btnCompare = document.getElementById('ws-btn-compare-versions');
  if (btnCompare) {
    btnCompare.addEventListener('click', () => {
      if (workspaceState.activeProjectId) {
        compareProjectVersions(workspaceState.activeProjectId);
      }
    });
  }
}

function saveWorkspaceState() {
  localStorage.setItem('getenv_workspace', JSON.stringify(workspaceState));
}

// Convert generated HTML/JSON properties to a workspace project structure
function saveActiveProjectToWorkspace() {
  const promptVal = elements.aiInputTextarea ? elements.aiInputTextarea.value.trim() : "";
  if (!promptVal) {
    showToastNotification("⚠️ No active plan to save. Design one first!");
    return;
  }

  const projName = prompt("Enter a name for this workspace project:", "My Software Architecture");
  if (!projName) return;

  const htmlOutput = typeof BLUEPRINT_HEURISTICS !== 'undefined' ? 
    BLUEPRINT_HEURISTICS.generateHTML(promptVal.toLowerCase()) : null;

  if (!htmlOutput) {
    showToastNotification("⚠️ Failed to generate project blueprint.");
    return;
  }

  const category = typeof BLUEPRINT_HEURISTICS !== 'undefined' ? 
    BLUEPRINT_HEURISTICS.getCategory(promptVal.toLowerCase()) : 'general';

  // Get stacks arrays
  const stackBadges = Array.from(document.querySelectorAll('#bp-stack .stat-badge')).map(el => el.innerText);
  
  // Format metadata
  const typeMap = {
    'ai-saas': 'AI SaaS App',
    'ecommerce': 'Ecommerce / Marketplace',
    'crm-internal': 'CRM / Internal Tool',
    'general': 'General SaaS'
  };

  // Compile checklist tasks dynamically based on tech stack
  const initialTasks = [
    { id: 1, phase: 1, text: "Define product scope and requirements", completed: true },
    { id: 2, phase: 1, text: "Review database schemas and ER diagrams", completed: false }
  ];
  let tid = 3;
  if (stackBadges.includes("Supabase") || stackBadges.includes("PostgreSQL (Supabase)")) {
    initialTasks.push({ id: tid++, phase: 1, text: "Create new Supabase project workspace", completed: false });
    initialTasks.push({ id: tid++, phase: 1, text: "Initialize PostgreSQL schemas DDL scripts", completed: false });
    initialTasks.push({ id: tid++, phase: 1, text: "Setup database Row Level Security (RLS) rules", completed: false });
  }
  if (stackBadges.includes("Next.js") || stackBadges.includes("Next.js (App Router)")) {
    initialTasks.push({ id: tid++, phase: 1, text: "Scaffold local Next.js repository using App Router", completed: false });
    initialTasks.push({ id: tid++, phase: 1, text: "Configure environment variables mapped to templates", completed: false });
  }
  if (stackBadges.includes("Stripe") || stackBadges.includes("Stripe Payments") || stackBadges.includes("Stripe Connect")) {
    initialTasks.push({ id: tid++, phase: 2, text: "Configure Stripe developer accounts and API keys", completed: false });
    initialTasks.push({ id: tid++, phase: 2, text: "Setup Stripe webhook routing triggers locally", completed: false });
  }
  if (stackBadges.includes("OpenAI") || stackBadges.includes("OpenAI / Anthropic APIs")) {
    initialTasks.push({ id: tid++, phase: 2, text: "Setup OpenAI API credentials key configuration", completed: false });
    initialTasks.push({ id: tid++, phase: 2, text: "Initialize Vercel AI SDK integration code", completed: false });
  }
  initialTasks.push({ id: tid++, phase: 2, text: "Build main dashboards UI layout views", completed: false });
  initialTasks.push({ id: tid++, phase: 2, text: "Deploy application staging cluster", completed: false });
  initialTasks.push({ id: tid++, phase: 2, text: "Launch production pipeline and go live!", completed: false });

  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const newProject = {
    id: "proj_" + Date.now(),
    name: projName,
    type: typeMap[category] || 'General Web App',
    createdDate: dateStr,
    lastUpdated: dateStr,
    stack: stackBadges,
    complexity: document.getElementById('ws-metric-complexity')?.innerText || 'Medium',
    cost: document.getElementById('ws-metric-cost')?.innerText || '$250/mo',
    timeline: '3 weeks',
    progress: 15,
    status: 'Planning',
    versions: [
      {
        versionNum: 1,
        date: dateStr,
        prompt: promptVal,
        blueprint: htmlOutput
      }
    ],
    currentVersionIndex: 0,
    notes: `### Ideas\n- Brainstorm details here...\n\n### Business Rules\n- Rate limiting profiles\n- Payment tier models`,
    tasks: initialTasks
  };

  workspaceState.projects.push(newProject);
  workspaceState.activeProjectId = newProject.id;
  saveWorkspaceState();

  // Route to workspace view
  history.pushState(null, '', '/workspace');
  handlePathRoute();
  showToastNotification("🎉 Project successfully saved to your workspace!");
}

function updateProjectField(projectId, field, value) {
  const index = workspaceState.projects.findIndex(p => p.id === projectId);
  if (index !== -1) {
    workspaceState.projects[index][field] = value;
    workspaceState.projects[index].lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    saveWorkspaceState();
  }
}

function switchWorkspaceTab(tabName) {
  workspaceState.activeTab = tabName;
  saveWorkspaceState();

  // Toggle active tab buttons
  const tabRow = document.getElementById('ws-tab-row');
  if (tabRow) {
    tabRow.querySelectorAll('button').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabName) {
        btn.classList.add('active');
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
      } else {
        btn.classList.remove('active');
        btn.classList.add('btn-secondary');
        btn.classList.remove('btn-primary');
      }
    });
  }

  // Show selected panel
  document.querySelectorAll('.ws-panel-view').forEach(panel => {
    panel.style.display = panel.id === `ws-panel-${tabName}` ? 'block' : 'none';
  });

  // Render content depending on active tab
  if (tabName === 'architecture' || tabName === 'database') {
    if (typeof mermaid !== 'undefined') {
      try {
        mermaid.init(undefined, document.querySelectorAll(`#ws-panel-${tabName} .mermaid`));
      } catch (e) {}
    }
  }
}

// Render the main workspace view
function renderWorkspace() {
  const listState = document.getElementById('workspace-list-state');
  const activeState = document.getElementById('workspace-active-state');
  
  if (!listState || !activeState) return;

  if (workspaceState.activeProjectId) {
    listState.style.display = 'none';
    activeState.style.display = 'block';
    loadProjectDashboard(workspaceState.activeProjectId);
  } else {
    listState.style.display = 'block';
    activeState.style.display = 'none';
    renderProjectsHomepage();
  }
}

// Draw the action-oriented developer dashboard homepage
function renderProjectsHomepage() {
  const listContainer = document.getElementById('workspace-projects-list');
  const draftsContainer = document.getElementById('workspace-drafts-list');
  const blueprintsContainer = document.getElementById('workspace-blueprints-list');
  const favoritesContainer = document.getElementById('workspace-favorites-list');
  const generatorsContainer = document.getElementById('workspace-generators-list');
  const exportsContainer = document.getElementById('workspace-exports-list');

  // Initialize keys to avoid undefined issues
  if (!workspaceState.projects) workspaceState.projects = [];
  if (!workspaceState.drafts) workspaceState.drafts = [];
  if (!workspaceState.savedBlueprints) workspaceState.savedBlueprints = [];
  if (!workspaceState.favoriteTemplates) workspaceState.favoriteTemplates = [];
  if (!workspaceState.recentGenerators) workspaceState.recentGenerators = [];
  if (!workspaceState.exports) workspaceState.exports = [];

  // --- 1. Active Projects ---
  if (listContainer) {
    if (workspaceState.projects.length === 0) {
      listContainer.innerHTML = `
        <div style="padding: 20px; text-align: center; border: 1px dashed var(--border-muted); border-radius: 6px;">
          <p style="color: var(--text-muted); font-size: 12px; margin-bottom: 12px; font-family: 'JetBrains Mono', monospace; line-height: 1.4;">No active projects in this workspace.</p>
          <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary" style="padding: 4px 10px; font-size: 11px; height: auto;" onclick="event.preventDefault(); quickSaveTemplate('crm-software');">Clone CRM Starter</button>
            <button class="btn btn-secondary" style="padding: 4px 10px; font-size: 11px; height: auto;" onclick="event.preventDefault(); quickSaveTemplate('ai-saas');">Clone AI SaaS</button>
          </div>
        </div>
      `;
    } else {
      listContainer.innerHTML = workspaceState.projects.map(p => `
        <div class="card-secondary" style="cursor: pointer; margin-bottom: 8px;" onclick="event.preventDefault(); loadProjectToWorkspace('${p.id}');">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-weight: bold; color: var(--text-primary); font-size: 13px;">${p.name}</span>
            <span class="stat-badge" style="background: rgba(34,197,94,0.1); color: var(--accent-color); font-size: 9px; padding: 2px 6px;">${p.status}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--text-muted);">
            <span>Stack: ${p.stack.slice(0, 2).join(' + ')}</span>
            <span>Progress: ${p.progress}%</span>
          </div>
        </div>
      `).join('');
    }
  }

  // --- 2. Session Drafts ---
  if (draftsContainer) {
    if (workspaceState.drafts.length === 0) {
      const sampleDrafts = [
        { name: "SaaS Dashboard Skeleton", stack: "Next.js + Postgres", slug: "saas-dashboard" },
        { name: "Inventory Management Backend", stack: "FastAPI + PG + React", slug: "inventory-system" }
      ];
      draftsContainer.innerHTML = sampleDrafts.map(d => `
        <div class="card-reference" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; margin-bottom: 6px;" onclick="event.preventDefault(); cloneDraftSample('${d.slug}', '${d.name}');">
          <div>
            <span style="color: var(--text-primary); display: block; font-weight: bold;">📝 ${d.name}</span>
            <span style="color: var(--text-muted); font-size: 10px;">Stack: ${d.stack}</span>
          </div>
          <span style="color: var(--accent-color); font-size: 10px;">Activate ➔</span>
        </div>
      `).join('');
    } else {
      draftsContainer.innerHTML = workspaceState.drafts.map(d => `
        <div class="card-reference" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; margin-bottom: 6px;" onclick="event.preventDefault(); loadDraftToWorkspace('${d.id}');">
          <div>
            <span style="color: var(--text-primary); display: block; font-weight: bold;">📝 ${d.name}</span>
            <span style="color: var(--text-muted); font-size: 10px;">Stack: ${d.stack.slice(0, 2).join(' + ')}</span>
          </div>
          <span style="color: var(--accent-color); font-size: 10px;">Edit ➔</span>
        </div>
      `).join('');
    }
  }

  // --- 3. Saved Blueprints ---
  if (blueprintsContainer) {
    if (workspaceState.savedBlueprints.length === 0) {
      const sampleBps = [
        { title: "Customer Support Live Chat", slug: "customer-support-platform", desc: "Vue 3 + Socket.io + MongoDB" },
        { title: "Gym Management Hub", slug: "gym-management", desc: "React + Django + SQLite" }
      ];
      blueprintsContainer.innerHTML = sampleBps.map(b => `
        <div class="card-reference" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; margin-bottom: 6px;" onclick="event.preventDefault(); saveBlueprintSample('${b.slug}', '${b.title}');">
          <div>
            <span style="color: var(--text-primary); display: block; font-weight: bold;">📐 ${b.title}</span>
            <span style="color: var(--text-muted); font-size: 10px;">${b.desc}</span>
          </div>
          <span style="color: var(--accent-color); font-size: 10px;">Clone ➔</span>
        </div>
      `).join('');
    } else {
      blueprintsContainer.innerHTML = workspaceState.savedBlueprints.map(b => `
        <div class="card-reference" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; margin-bottom: 6px;" onclick="event.preventDefault(); history.pushState(null,'','/blueprints/${b.slug}'); handlePathRoute();">
          <div>
            <span style="color: var(--text-primary); display: block; font-weight: bold;">📐 ${b.title}</span>
            <span style="color: var(--text-muted); font-size: 10px;">Slug: ${b.slug}</span>
          </div>
          <span style="color: var(--accent-color); font-size: 10px;">View ➔</span>
        </div>
      `).join('');
    }
  }

  // --- 4. Starred Templates ---
  if (favoritesContainer) {
    if (workspaceState.favoriteTemplates.length === 0) {
      const recs = [
        { title: "CRM Software Template", slug: "crm-software" },
        { title: "Job Portal Marketplace", slug: "job-portal" }
      ];
      favoritesContainer.innerHTML = recs.map(r => `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; padding: 6px 0; border-bottom: 1px dashed var(--border-muted);">
          <span style="color: var(--text-secondary); cursor: pointer;" onclick="event.preventDefault(); history.pushState(null,'','/templates/${r.slug}'); handlePathRoute();">☆ ${r.title}</span>
          <button class="btn btn-secondary" style="padding: 2px 6px; font-size: 9px; height: auto;" onclick="event.preventDefault(); toggleFavoriteTemplate('${r.slug}');">Star</button>
        </div>
      `).join('');
    } else {
      favoritesContainer.innerHTML = workspaceState.favoriteTemplates.map(slug => {
        const matched = typeof SEO_TEMPLATES !== 'undefined' ? SEO_TEMPLATES.find(x => x.slug === slug) : null;
        const title = matched ? matched.title : slug;
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; padding: 6px 0; border-bottom: 1px dashed var(--border-muted);">
            <a href="/templates/${slug}" style="color: var(--text-primary); text-decoration: none;" onclick="event.preventDefault(); history.pushState(null,'','/templates/${slug}'); handlePathRoute();">★ ${title}</a>
            <button class="btn btn-secondary" style="padding: 2px 6px; font-size: 9px; height: auto; color: #ef4444; border-color: rgba(239,68,68,0.2);" onclick="event.preventDefault(); toggleFavoriteTemplate('${slug}');">Remove</button>
          </div>
        `;
      }).join('');
    }
  }

  // --- 5. Recently Used Generators ---
  if (generatorsContainer) {
    if (workspaceState.recentGenerators.length === 0) {
      generatorsContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
            <span style="color: var(--text-secondary);">🔐 .env Template Generator</span>
            <a href="/generators" class="btn btn-secondary" style="padding: 2px 6px; font-size: 9px; height: auto;" onclick="event.preventDefault(); logGeneratorAction('.env Template Generator'); history.pushState(null,'','/'); handlePathRoute();">Launch</a>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; opacity: 0.6;">
            <span style="color: var(--text-muted);">🐳 Dockerfile Generator</span>
            <span style="font-size: 9px; font-family: 'JetBrains Mono', monospace; color: var(--text-muted);">SOON</span>
          </div>
        </div>
      `;
    } else {
      generatorsContainer.innerHTML = workspaceState.recentGenerators.map(gen => `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; padding: 4px 0; border-bottom: 1px dashed var(--border-muted);">
          <span style="color: var(--text-primary);">⚡ ${gen}</span>
          <span style="color: var(--text-muted); font-size: 10px; font-family: 'JetBrains Mono', monospace;">Accessed</span>
        </div>
      `).join('');
    }
  }

  // --- 6. Recent Exports ---
  if (exportsContainer) {
    if (workspaceState.exports.length === 0) {
      exportsContainer.innerHTML = `
        <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--text-muted); line-height: 1.6;">
          <div>[10:14 PM] Exported Markdown for CRM Platform</div>
          <div>[09:42 PM] Copied Clipboard for OpenAI Integration</div>
        </div>
      `;
    } else {
      exportsContainer.innerHTML = workspaceState.exports.map(exp => `
        <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--text-secondary); display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.05); padding-bottom: 4px;">
          <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">[${exp.time}] ${exp.title}</span>
          <span style="color: var(--accent-color); font-weight: bold;">${exp.format}</span>
        </div>
      `).join('');
    }
  }
}

// Clone interactive drafts samples into active projects list
window.cloneDraftSample = function(slug, name) {
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const newProj = {
    id: "proj_" + Date.now(),
    name: name,
    type: "Draft Planning",
    createdDate: dateStr,
    lastUpdated: dateStr,
    stack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    complexity: "Intermediate",
    cost: "$35/mo",
    timeline: "2 weeks",
    progress: 10,
    status: "Planning",
    versions: [
      {
        versionNum: 1,
        date: dateStr,
        prompt: `Draft planning for ${name}`,
        blueprint: ""
      }
    ],
    currentVersionIndex: 0,
    notes: `Notes for ${name}`,
    tasks: [
      { id: 1, phase: 1, text: "Configure environment values presets", completed: false },
      { id: 2, phase: 1, text: "Review database design layout model", completed: false }
    ]
  };
  if (!workspaceState.projects) workspaceState.projects = [];
  workspaceState.projects.push(newProj);
  workspaceState.activeProjectId = newProj.id;
  saveWorkspaceState();
  renderWorkspace();
  showToastNotification(`Activated draft workspace: ${name}`);
};

// Instantiates sample blueprints in projects
window.saveBlueprintSample = function(slug, title) {
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const newProj = {
    id: "proj_" + Date.now(),
    name: title + " Blueprint",
    type: "System Blueprint",
    createdDate: dateStr,
    lastUpdated: dateStr,
    stack: ["Vue 3", "Node.js", "Socket.io"],
    complexity: "Advanced",
    cost: "$55/mo",
    timeline: "3 weeks",
    progress: 15,
    status: "Planning",
    versions: [
      {
        versionNum: 1,
        date: dateStr,
        prompt: `System blueprint for ${title}`,
        blueprint: ""
      }
    ],
    currentVersionIndex: 0,
    notes: `Core system blueprint layout for ${title}.`,
    tasks: [
      { id: 1, phase: 1, text: "Setup deployment configuration", completed: false }
    ]
  };
  if (!workspaceState.projects) workspaceState.projects = [];
  workspaceState.projects.push(newProj);
  workspaceState.activeProjectId = newProj.id;
  saveWorkspaceState();
  renderWorkspace();
  showToastNotification(`Activated blueprint template: ${title}`);
};

// Starring helper
window.toggleFavoriteTemplate = function(slug) {
  if (!workspaceState.favoriteTemplates) workspaceState.favoriteTemplates = [];
  const idx = workspaceState.favoriteTemplates.indexOf(slug);
  if (idx > -1) {
    workspaceState.favoriteTemplates.splice(idx, 1);
    showToastNotification("Removed from Starred Templates");
  } else {
    workspaceState.favoriteTemplates.push(slug);
    showToastNotification("Starred Template Saved");
  }
  saveWorkspaceState();
  renderTemplatesGrid();
  renderProjectsHomepage();
};

// Logging actions
window.logGeneratorAction = function(name) {
  if (!workspaceState.recentGenerators) workspaceState.recentGenerators = [];
  if (workspaceState.recentGenerators[0] !== name) {
    workspaceState.recentGenerators.unshift(name);
    if (workspaceState.recentGenerators.length > 5) workspaceState.recentGenerators.pop();
    saveWorkspaceState();
    renderProjectsHomepage();
  }
};

window.logExportAction = function(format) {
  let titleName = document.getElementById('blueprint-title')?.innerText || 
                  document.getElementById('ws-project-name')?.innerText || 
                  document.querySelector('#seo-article-content h1')?.innerText || 
                  'System Blueprint';
  
  if (!workspaceState.exports) workspaceState.exports = [];
  
  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  workspaceState.exports.unshift({
    title: titleName,
    format: format,
    time: timeStr
  });
  if (workspaceState.exports.length > 8) workspaceState.exports.pop();
  saveWorkspaceState();
  renderProjectsHomepage();
};

// Clone popular templates directly into workspace
window.quickSaveTemplate = function(slug) {
  if (typeof TEMPLATES_DB === 'undefined') return;
  const template = TEMPLATES_DB.find(t => t.slug === slug);
  if (!template) return;

  const projName = prompt("Enter a workspace name for this template clone:", `${template.title} Clone`);
  if (!projName) return;

  // Find dynamic blueprint output heuristics for this template stack
  const keywords = template.stack.join(' ').toLowerCase();
  const htmlOutput = typeof BLUEPRINT_HEURISTICS !== 'undefined' ? 
    BLUEPRINT_HEURISTICS.generateHTML(keywords) : null;

  if (!htmlOutput) {
    showToastNotification("⚠️ Failed to generate template schema blueprint.");
    return;
  }

  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  // Generate initial tasks
  const initialTasks = [
    { id: 1, phase: 1, text: "Define product scope and requirements", completed: true },
    { id: 2, phase: 1, text: "Review database schemas and ER diagrams", completed: false }
  ];
  let tid = 3;
  template.stack.forEach(s => {
    initialTasks.push({ id: tid++, phase: 1, text: `Scaffold library setup config for ${s}`, completed: false });
  });
  initialTasks.push({ id: tid++, phase: 2, text: "Build main dashboards UI layout views", completed: false });
  initialTasks.push({ id: tid++, phase: 2, text: "Deploy application staging cluster", completed: false });
  initialTasks.push({ id: tid++, phase: 2, text: "Launch production pipeline and go live!", completed: false });

  const newProject = {
    id: "proj_" + Date.now(),
    name: projName,
    type: template.category || 'Developer Blueprint',
    createdDate: dateStr,
    lastUpdated: dateStr,
    stack: template.stack,
    complexity: template.complexity || 'Intermediate',
    cost: `$${template.cost || 20}/mo`,
    timeline: template.buildTime || '1 week',
    progress: 10,
    status: 'Planning',
    versions: [
      {
        versionNum: 1,
        date: dateStr,
        prompt: `Template clone of ${template.title}`,
        blueprint: htmlOutput
      }
    ],
    currentVersionIndex: 0,
    notes: `### Template Notes\n- Initialized from template: ${template.title}\n- Stack tags: ${template.stack.join(', ')}`,
    tasks: initialTasks
  };

  workspaceState.projects.push(newProject);
  workspaceState.activeProjectId = newProject.id;
  saveWorkspaceState();

  renderWorkspace();
  showToastNotification("🎉 Template cloned successfully to your projects workspace!");
};

function loadProjectToWorkspace(id) {
  workspaceState.activeProjectId = id;
  saveWorkspaceState();
  renderWorkspace();
}

// Populates active project dashboard variables and active version details
function loadProjectDashboard(id) {
  const p = workspaceState.projects.find(proj => proj.id === id);
  if (!p) return;

  const currentVersion = p.versions[p.currentVersionIndex] || p.versions[0];
  if (!currentVersion) return;

  const code = currentVersion.blueprint;

  // Header summary
  document.getElementById('ws-project-name').innerText = p.name;
  document.getElementById('ws-project-type').innerText = p.type;
  document.getElementById('ws-project-created').innerText = p.createdDate;
  document.getElementById('ws-project-updated').innerText = p.lastUpdated;
  document.getElementById('ws-project-status').value = p.status;

  // Key metrics
  document.getElementById('ws-metric-complexity').innerText = p.complexity;
  document.getElementById('ws-metric-cost').innerText = p.cost;
  document.getElementById('ws-metric-timeline').innerText = p.timeline;

  // Stack badges
  const stackContainer = document.getElementById('ws-project-stack');
  if (stackContainer) {
    stackContainer.innerHTML = p.stack.map(s => `<span class="stat-badge">${s}</span>`).join('');
  }

  // Version Select Dropdown options
  const versionSelect = document.getElementById('ws-version-select');
  if (versionSelect) {
    versionSelect.innerHTML = p.versions.map((v, index) => 
      `<option value="${index}" ${index === p.currentVersionIndex ? 'selected' : ''}>V${v.versionNum} (${v.date})</option>`
    ).join('');
  }

  // Tab - Overview panel content
  document.getElementById('ws-overview-summary').innerHTML = code.execSummary;
  document.getElementById('ws-overview-roles').innerHTML = code.userRoles;

  // Setup Implementation Assistant recommendations dynamically
  document.getElementById('ws-assistant-next').innerText = p.tasks.find(t => !t.completed)?.text || "All tasks complete! Launch build production.";
  document.getElementById('ws-assistant-bottleneck').innerText = p.status === 'Planning' ? "Refining requirements scope" : (p.status === 'Architecture Complete' ? "API Keys integrations setup" : "Database migrations configurations");
  
  const guideEl = document.getElementById('ws-assistant-guide');
  if (guideEl && typeof BLOG_POSTS !== 'undefined') {
    const popularPost = BLOG_POSTS[0];
    guideEl.innerText = popularPost.title;
    guideEl.href = `/blog/${popularPost.slug}`;
    guideEl.onclick = (e) => {
      e.preventDefault();
      history.pushState(null, '', `/blog/${popularPost.slug}`);
      handlePathRoute();
    };
  }
  
  const genEl = document.getElementById('ws-assistant-gen');
  if (genEl) {
    genEl.innerText = p.stack.includes("Supabase") ? ".env Generator -> Supabase Stack" : ".env Generator -> Next.js Config";
  }

  // Tab - Architecture panel content
  const archEl = document.getElementById('ws-arch-diagram');
  if (archEl) {
    archEl.removeAttribute('data-processed');
    archEl.setAttribute('data-code', code.archDiagram);
    archEl.innerHTML = `<div class="mermaid" style="display: flex; justify-content: center;">${code.archDiagram}</div>`;
  }

  // Tab - Database panel content
  const dbSchema = document.getElementById('ws-db-schema');
  if (dbSchema) dbSchema.textContent = code.dbSchema;
  document.getElementById('ws-db-tables-list').innerHTML = code.dbTables;

  // Tab - API Plan panel content
  document.getElementById('ws-api-route-plan').innerHTML = code.apiRoutePlan;

  // Tab - Env Variables panel content
  const envVars = document.getElementById('ws-env-vars');
  if (envVars) envVars.textContent = code.envVariables;

  // Tab - Deployment panel content
  document.getElementById('ws-deployment-strategy').innerHTML = code.deploymentStrategy;

  // Tab - Roadmap panel content
  document.getElementById('ws-roadmap-timeline').innerHTML = code.devPhases;

  // Tab - Resources panel content
  document.getElementById('ws-third-party').innerHTML = code.thirdPartyServices;

  // Tab - Notes panel content
  const notesTextarea = document.getElementById('ws-notes-textarea');
  if (notesTextarea) {
    notesTextarea.value = p.notes || "";
  }

  // Tab - Tasks checklist pane
  renderTasksChecklist(p);
  updateCompletionProgress(p.id);

  // Activate loaded tab
  switchWorkspaceTab(workspaceState.activeTab || 'overview');
}

// Generate checkboxes grouped by Phase 1 vs Phase 2
function renderTasksChecklist(project) {
  const checklistContainer = document.getElementById('ws-tasks-checklist');
  if (!checklistContainer) return;

  const phase1Tasks = project.tasks.filter(t => t.phase === 1);
  const phase2Tasks = project.tasks.filter(t => t.phase === 2);

  const buildPhaseHtml = (phaseNum, tasks) => `
    <div>
      <h4 style="margin-top: 0; margin-bottom: 12px; font-size: 14px; color: var(--accent-color); font-family: 'JetBrains Mono', monospace;">Phase ${phaseNum} Tasks</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${tasks.map(t => `
          <label style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: ${t.completed ? 'var(--text-muted)' : 'var(--text-secondary)'}; cursor: pointer; text-decoration: ${t.completed ? 'line-through' : 'none'};">
            <input type="checkbox" class="ws-task-checkbox" data-task-id="${t.id}" ${t.completed ? 'checked' : ''} style="cursor: pointer; width: 16px; height: 16px; accent-color: var(--accent-color);">
            <span>${t.text}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `;

  checklistContainer.innerHTML = `
    ${phase1Tasks.length ? buildPhaseHtml(1, phase1Tasks) : ''}
    ${phase2Tasks.length ? buildPhaseHtml(2, phase2Tasks) : ''}
  `;

  // Bind checkbox events
  checklistContainer.querySelectorAll('.ws-task-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const taskId = parseInt(checkbox.getAttribute('data-task-id'));
      const isCompleted = checkbox.checked;
      
      const pIndex = workspaceState.projects.findIndex(proj => proj.id === project.id);
      if (pIndex !== -1) {
        const tIndex = workspaceState.projects[pIndex].tasks.findIndex(t => t.id === taskId);
        if (tIndex !== -1) {
          workspaceState.projects[pIndex].tasks[tIndex].completed = isCompleted;
          saveWorkspaceState();
          
          updateCompletionProgress(project.id);
          
          // Re-render checklist text formatting
          const label = checkbox.closest('label');
          if (label) {
            label.style.color = isCompleted ? 'var(--text-muted)' : 'var(--text-secondary)';
            label.style.textDecoration = isCompleted ? 'line-through' : 'none';
          }

          // Update Implementation Assistant recommendation Live
          const nextTask = workspaceState.projects[pIndex].tasks.find(t => !t.completed);
          document.getElementById('ws-assistant-next').innerText = nextTask ? nextTask.text : "All tasks complete! Launch build production.";
        }
      }
    });
  });
}

function updateCompletionProgress(projectId) {
  const pIndex = workspaceState.projects.findIndex(p => p.id === projectId);
  if (pIndex === -1) return;

  const p = workspaceState.projects[pIndex];
  const total = p.tasks.length;
  const completed = p.tasks.filter(t => t.completed).length;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  workspaceState.projects[pIndex].progress = progressPercent;
  saveWorkspaceState();

  // Update UI values
  document.getElementById('ws-progress-val').innerText = progressPercent;
  document.getElementById('ws-progress-bar').style.width = `${progressPercent}%`;
}

function duplicateProject(projectId) {
  const source = workspaceState.projects.find(p => p.id === projectId);
  if (!source) return;

  const newProj = JSON.parse(JSON.stringify(source));
  newProj.id = "proj_" + Date.now();
  newProj.name = `${source.name} (Copy)`;
  newProj.createdDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  newProj.lastUpdated = newProj.createdDate;
  
  workspaceState.projects.push(newProj);
  workspaceState.activeProjectId = newProj.id;
  saveWorkspaceState();

  renderWorkspace();
  showToastNotification(`Duplicated project structure: ${newProj.name}`);
}

function exportProjectWorkspace(projectId) {
  const project = workspaceState.projects.find(p => p.id === projectId);
  if (!project) return;

  const text = JSON.stringify(project, null, 2);
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${project.name.toLowerCase().replace(/\\s+/g, '-')}-workspace-export.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToastNotification("Workspace configurations exported successfully as JSON payload.");
}

// Track project blueprint version history
function createNewProjectVersion(projectId) {
  const prompt = window.prompt("Modify your app ideas parameters/specifications:", "Add redis layer caching and worker threads for billing tasks");
  if (!prompt) return;

  const pIndex = workspaceState.projects.findIndex(p => p.id === projectId);
  if (pIndex === -1) return;

  const project = workspaceState.projects[pIndex];

  // Re-generate blueprint schemas
  const htmlOutput = typeof BLUEPRINT_HEURISTICS !== 'undefined' ? 
    BLUEPRINT_HEURISTICS.generateHTML(prompt.toLowerCase()) : null;

  if (!htmlOutput) {
    showToastNotification("⚠️ Generation failed. Please try a different query prompt.");
    return;
  }

  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const nextNum = project.versions.length + 1;

  const newVer = {
    versionNum: nextNum,
    date: dateStr,
    prompt: prompt,
    blueprint: htmlOutput
  };

  workspaceState.projects[pIndex].versions.push(newVer);
  workspaceState.projects[pIndex].currentVersionIndex = project.versions.length - 1;
  workspaceState.projects[pIndex].lastUpdated = dateStr;
  saveWorkspaceState();

  loadProjectDashboard(projectId);
  showToastNotification(`🎉 Created blueprint Version ${nextNum} successfully!`);
}

// Visual layout comparisons between versions
function compareProjectVersions(projectId) {
  const project = workspaceState.projects.find(p => p.id === projectId);
  if (!project) return;

  if (project.versions.length < 2) {
    showToastNotification("⚠️ Please create at least two blueprint versions to compare them!");
    return;
  }

  const targetVer = window.prompt(`Compare V${project.currentVersionIndex + 1} with which version? (Enter number 1-${project.versions.length}):`, "1");
  if (!targetVer) return;

  const tIndex = parseInt(targetVer) - 1;
  if (isNaN(tIndex) || tIndex < 0 || tIndex >= project.versions.length) {
    showToastNotification("⚠️ Invalid version number.");
    return;
  }

  const currentVersion = project.versions[project.currentVersionIndex];
  const compareVersion = project.versions[tIndex];

  const diffPrompt = `
    Comparison Summary between V${currentVersion.versionNum} and V${compareVersion.versionNum}:\n
    V${currentVersion.versionNum} Prompt: "${currentVersion.prompt}"\n
    V${compareVersion.versionNum} Prompt: "${compareVersion.prompt}"\n\n
    Review differences in folders, environment keys, and DDL tables on the panels.
  `;
  alert(diffPrompt);
}

/* ==========================================================================
   DYNAMIC SEO CONTENT HUB GENERATOR
   ========================================================================== */
function renderSEOHubPage(type, slug) {
  let pageData = null;
  let categoryName = "";
  
  if (type === 'templates' && typeof SEO_TEMPLATES !== 'undefined') {
    pageData = SEO_TEMPLATES.find(t => t.slug === slug);
    categoryName = "Templates";
  } else if (type === 'stacks' && typeof SEO_STACKS !== 'undefined') {
    pageData = SEO_STACKS.find(s => s.slug === slug);
    categoryName = "Tech Stacks";
  } else if (type === 'integrations' && typeof SEO_INTEGRATIONS !== 'undefined') {
    pageData = SEO_INTEGRATIONS.find(i => i.slug === slug);
    categoryName = "Integrations";
  } else if (type === 'blueprints' && typeof SEO_BLUEPRINTS !== 'undefined') {
    pageData = SEO_BLUEPRINTS.find(b => b.slug === slug);
    categoryName = "Project Blueprints";
  }

  if (!pageData) {
    history.replaceState(null, '', '/');
    handlePathRoute();
    return;
  }

  // --- 1. DYNAMIC SEO & META HEAD TAGS ---
  document.title = `${pageData.title} | Production Blueprint & Environment Configuration | getenv.in`;
  
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', pageData.desc || `Free production blueprint and environmental configuration setups for ${pageData.title}.`);
  }
  
  // Set Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `https://www.getenv.in/${type}/${slug}`);
  }

  // Set Open Graph Tags
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', pageData.title);
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', pageData.desc);
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `https://www.getenv.in/${type}/${slug}`);

  // Dynamic JSON-LD Schema injection for SEO rich snippets
  let schemaScript = document.getElementById('dynamic-seo-schema');
  if (schemaScript) schemaScript.remove();
  
  schemaScript = document.createElement('script');
  schemaScript.id = 'dynamic-seo-schema';
  schemaScript.type = 'application/ld+json';
  
  const schemaObj = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": pageData.title,
    "description": pageData.desc,
    "url": `https://www.getenv.in/${type}/${slug}`,
    "inLanguage": "en-US",
    "articleSection": categoryName,
    "author": {
      "@type": "Organization",
      "name": "getenv.in"
    }
  };
  schemaScript.text = JSON.stringify(schemaObj);
  document.head.appendChild(schemaScript);

  // --- 2. BREADCRUMBS RENDERING ---
  const breadcrumbsEl = document.getElementById('seo-breadcrumbs');
  if (breadcrumbsEl) {
    breadcrumbsEl.innerHTML = `
      <a href="/" style="color: var(--text-muted); text-decoration: none;">Home</a> &gt; 
      <a href="/templates" style="color: var(--text-muted); text-decoration: none;" onclick="event.preventDefault(); history.pushState(null,'','/templates'); handlePathRoute();">${categoryName}</a> &gt; 
      <span style="color: var(--accent-color);">${pageData.title}</span>
    `;
  }

  // --- 3. PAGE CONTENT COMPILATION ---
  const articleEl = document.getElementById('seo-article-content');
  if (!articleEl) return;

  let contentHtml = `<h1 class="page-title" style="margin-top: 0; font-size: 32px; border: none; padding: 0; margin-bottom: 8px;">${pageData.title}</h1>`;
  contentHtml += `<p class="blog-subtext" style="color: var(--text-secondary); margin-bottom: 32px; font-size: 15px;">${pageData.desc}</p>`;

  if (type === 'templates') {
    contentHtml += `
      <div class="blog-markdown">
        <h2>1. Overview</h2>
        <p>${pageData.overview}</p>
        
        <h2>2. Key Features</h2>
        <ul>
          ${pageData.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <h2>3. Recommended Tech Stack</h2>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
          ${pageData.recommendedStack.map(s => `<span class="stat-badge">${s}</span>`).join('')}
        </div>

        <h2>4. Database Design Schema</h2>
        <pre><code class="javascript">${pageData.dbDesign.trim()}</code></pre>

        <h2>5. Deployment Strategy</h2>
        <p>${pageData.deployment}</p>

        <h2>6. Est. Cost & Timeline</h2>
        <ul>
          <li><strong>Estimated Cost:</strong> ${pageData.costEstimate}</li>
          <li><strong>Estimated Build Time:</strong> ${pageData.timeline}</li>
        </ul>

        <h2>7. Frequently Asked Questions</h2>
        ${pageData.faqs.map(f => `
          <div style="margin-bottom: 16px;">
            <h4 style="margin-bottom: 4px; color: var(--text-primary); font-size: 14px;">Q: ${f.q}</h4>
            <p style="margin-top: 0; color: var(--text-muted); font-size: 13px;">A: ${f.a}</p>
          </div>
        `).join('')}
      </div>
    `;
  } else if (type === 'stacks') {
    contentHtml += `
      <div class="blog-markdown">
        <h2>1. Pros & Cons Analysis</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
          <div>
            <h4 style="color: #22c55e; margin-bottom: 8px;">Pros</h4>
            <ul>${pageData.pros.map(p => `<li>${p}</li>`).join('')}</ul>
          </div>
          <div>
            <h4 style="color: #ef4444; margin-bottom: 8px;">Cons</h4>
            <ul>${pageData.cons.map(c => `<li>${c}</li>`).join('')}</ul>
          </div>
        </div>

        <h2>2. Recommended Target Architecture</h2>
        <div class="mermaid" style="background: #000; padding: 16px; border: 1px solid var(--border-muted); border-radius: 8px; display: flex; justify-content: center; margin-bottom: 24px;">
          ${pageData.diagram.trim()}
        </div>

        <h2>3. Best Use Cases</h2>
        <p>${pageData.useCases}</p>

        <h2>4. Cost Profile</h2>
        <p>Estimated Base Cost: <strong>${pageData.costEstimate}</strong></p>

        <h2>5. Deployment Options</h2>
        <ul>
          ${pageData.deploymentOptions.map(d => `<li>${d}</li>`).join('')}
        </ul>

        <h2>6. FAQs</h2>
        ${pageData.faqs.map(f => `
          <div style="margin-bottom: 16px;">
            <h4 style="margin-bottom: 4px; color: var(--text-primary); font-size: 14px;">Q: ${f.q}</h4>
            <p style="margin-top: 0; color: var(--text-muted); font-size: 13px;">A: ${f.a}</p>
          </div>
        `).join('')}
      </div>
    `;
  } else if (type === 'integrations') {
    contentHtml += `
      <div class="blog-markdown">
        <h2>1. Setup Guide</h2>
        <p>${pageData.setup}</p>

        <h2>2. Environment Variables Configuration</h2>
        <pre><code class="bash">${pageData.envVars.trim()}</code></pre>

        <h2>3. Common Development Mistakes</h2>
        <div style="border-left: 4px solid #ef4444; background: rgba(239,68,68,0.05); padding: 14px; border-radius: 0 6px 6px 0; margin-bottom: 24px;">
          <p style="margin: 0; color: #f87171; font-size: 13px; line-height: 1.5;">${pageData.mistakes}</p>
        </div>

        <h2>4. Best Practices</h2>
        <p>${pageData.practices}</p>

        <h2>5. Cost Breakdown</h2>
        <p>${pageData.costBreakdown}</p>
      </div>
    `;
  } else if (type === 'blueprints') {
    contentHtml += `
      <div class="blog-markdown">
        <h2>1. Recommended System Architecture</h2>
        <p>${pageData.architecture}</p>

        <h2>2. Dynamic Folder Structure</h2>
        <pre><code class="bash">${pageData.folderStructure.trim()}</code></pre>

        <h2>3. SQL Database Schema (DDL)</h2>
        <pre><code class="sql">${pageData.database.trim()}</code></pre>

        <h2>4. API Route Plan</h2>
        <pre><code class="javascript">${pageData.apiPlan.trim()}</code></pre>

        <h2>5. Cost Profile</h2>
        <p>${pageData.costEstimate}</p>

        <h2>6. Scoped Roadmap Plan</h2>
        <p>${pageData.roadmap}</p>

        <h2>7. Hosting Strategy</h2>
        <p>${pageData.deployment}</p>
      </div>
    `;
  }

  articleEl.innerHTML = contentHtml;

  // Render Mermaid inline diagram if available on active Tech Stack page
  if (type === 'stacks' && typeof mermaid !== 'undefined') {
    try {
      mermaid.init(undefined, articleEl.querySelectorAll('.mermaid'));
    } catch(e) {}
  }

  // --- 4. DYNAMIC INTERNAL LINKING PANEL (SEO Boost) ---
  const internalEl = document.getElementById('seo-internal-links');
  if (internalEl) {
    let linksHtml = `<h3 style="margin-top:0; font-size:16px; text-transform:uppercase; font-family:'JetBrains Mono', monospace; color:var(--text-primary);">Explore Related Resources</h3>`;
    linksHtml += `<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">`;

    if (pageData.relatedTemplates && pageData.relatedTemplates.length) {
      linksHtml += `
        <div class="blueprint-card" style="padding: 16px;">
          <span style="font-size: 9px; color: var(--accent-color); text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">Related Templates</span>
          <div style="display:flex; flex-direction:column; gap:6px; margin-top:8px;">
            ${pageData.relatedTemplates.map(slug => {
              const matched = SEO_TEMPLATES.find(x => x.slug === slug);
              return matched ? `<a href="/templates/${slug}" style="color:var(--text-primary); text-decoration:none; font-size:13px;" onclick="event.preventDefault(); history.pushState(null,'','/templates/${slug}'); handlePathRoute();">➔ ${matched.title}</a>` : '';
            }).join('')}
          </div>
        </div>
      `;
    }

    if (pageData.relatedStacks && pageData.relatedStacks.length) {
      linksHtml += `
        <div class="blueprint-card" style="padding: 16px;">
          <span style="font-size: 9px; color: var(--accent-color); text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">Related Tech Stacks</span>
          <div style="display:flex; flex-direction:column; gap:6px; margin-top:8px;">
            ${pageData.relatedStacks.map(slug => {
              const matched = SEO_STACKS.find(x => x.slug === slug);
              return matched ? `<a href="/stacks/${slug}" style="color:var(--text-primary); text-decoration:none; font-size:13px;" onclick="event.preventDefault(); history.pushState(null,'','/stacks/${slug}'); handlePathRoute();">➔ ${matched.title}</a>` : '';
            }).join('')}
          </div>
        </div>
      `;
    }

    if (pageData.relatedIntegrations && pageData.relatedIntegrations.length) {
      linksHtml += `
        <div class="blueprint-card" style="padding: 16px;">
          <span style="font-size: 9px; color: var(--accent-color); text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">Related Integrations</span>
          <div style="display:flex; flex-direction:column; gap:6px; margin-top:8px;">
            ${pageData.relatedIntegrations.map(slug => {
              const matched = SEO_INTEGRATIONS.find(x => x.slug === slug);
              return matched ? `<a href="/integrations/${slug}" style="color:var(--text-primary); text-decoration:none; font-size:13px;" onclick="event.preventDefault(); history.pushState(null,'','/integrations/${slug}'); handlePathRoute();">➔ ${matched.title}</a>` : '';
            }).join('')}
          </div>
        </div>
      `;
    }

    if (pageData.relatedBlueprints && pageData.relatedBlueprints.length) {
      linksHtml += `
        <div class="blueprint-card" style="padding: 16px;">
          <span style="font-size: 9px; color: var(--accent-color); text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">Related Blueprints</span>
          <div style="display:flex; flex-direction:column; gap:6px; margin-top:8px;">
            ${pageData.relatedBlueprints.map(slug => {
              const matched = SEO_BLUEPRINTS.find(x => x.slug === slug);
              return matched ? `<a href="/blueprints/${slug}" style="color:var(--text-primary); text-decoration:none; font-size:13px;" onclick="event.preventDefault(); history.pushState(null,'','/blueprints/${slug}'); handlePathRoute();">➔ ${matched.title}</a>` : '';
            }).join('')}
          </div>
        </div>
      `;
    }

    linksHtml += `</div>`;
    internalEl.innerHTML = linksHtml;
  }

  // Show page
  elements.seoHubView.classList.add('active-view');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   SITE-WIDE SEARCH ENGINE
   ========================================================================== */
function renderSiteWideSearch() {
  const searchInput = document.getElementById('sitewide-search-input');
  const resultsContainer = document.getElementById('sitewide-search-results');
  
  if (!searchInput || !resultsContainer) return;

  // Define site-wide search query trigger
  searchInput.removeEventListener('input', handleSiteWideQuery);
  searchInput.addEventListener('input', handleSiteWideQuery);

  // Initial trigger to render popular matches
  handleSiteWideQuery();
}

function handleSiteWideQuery() {
  const searchInput = document.getElementById('sitewide-search-input');
  const resultsContainer = document.getElementById('sitewide-search-results');
  if (!searchInput || !resultsContainer) return;

  const query = searchInput.value.toLowerCase().trim();

  // Load all search sources
  const dataset = [];

  // Templates source
  if (typeof SEO_TEMPLATES !== 'undefined') {
    SEO_TEMPLATES.forEach(t => {
      dataset.push({
        title: t.title,
        desc: t.desc,
        tag: "Template",
        link: `/templates/${t.slug}`
      });
    });
  }

  // Stacks source
  if (typeof SEO_STACKS !== 'undefined') {
    SEO_STACKS.forEach(s => {
      dataset.push({
        title: s.title,
        desc: s.desc,
        tag: "Tech Stack",
        link: `/stacks/${s.slug}`
      });
    });
  }

  // Integrations source
  if (typeof SEO_INTEGRATIONS !== 'undefined') {
    SEO_INTEGRATIONS.forEach(i => {
      dataset.push({
        title: i.title,
        desc: i.desc,
        tag: "Integration Guide",
        link: `/integrations/${i.slug}`
      });
    });
  }

  // Blueprints source
  if (typeof SEO_BLUEPRINTS !== 'undefined') {
    SEO_BLUEPRINTS.forEach(b => {
      dataset.push({
        title: b.title,
        desc: b.costEstimate,
        tag: "System Blueprint",
        link: `/blueprints/${b.slug}`
      });
    });
  }

  // Resources/Guides source
  if (typeof BLOG_POSTS !== 'undefined') {
    BLOG_POSTS.forEach(b => {
      dataset.push({
        title: b.title,
        desc: b.summary || "Developer architectural guides documentation.",
        tag: "Resource Guide",
        link: `/blog/${b.slug}`
      });
    });
  }

  // Filter dataset by query
  const matches = dataset.filter(item => {
    if (!query) return true; // Show all by default
    return item.title.toLowerCase().includes(query) || 
           item.desc.toLowerCase().includes(query) || 
           item.tag.toLowerCase().includes(query);
  });

  if (matches.length === 0) {
    resultsContainer.innerHTML = `
      <div style="text-align: center; padding: 48px; border: 1px dashed var(--border-muted); border-radius: 8px;">
        <p style="color: var(--text-secondary); font-family: 'JetBrains Mono', monospace; font-size: 14px; margin: 0;">No query matches found. Try searching for "supabase", "stripe", or "CRM".</p>
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = matches.map(item => `
    <div class="blueprint-card" style="padding: 20px; border-color: var(--border-muted); transition: border-color 0.2s;" onmouseenter="this.style.borderColor='var(--accent-color)';" onmouseleave="this.style.borderColor='var(--border-muted)';">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span class="stat-badge" style="font-size: 9px; font-family: 'JetBrains Mono', monospace; border-color: var(--accent-color); color: var(--accent-color); background: rgba(34,197,94,0.05);">${item.tag.toUpperCase()}</span>
        <a href="${item.link}" class="btn btn-secondary" style="font-family: 'JetBrains Mono', monospace; font-size: 11px; padding: 4px 10px; height: auto;" onclick="event.preventDefault(); history.pushState(null, '', '${item.link}'); handlePathRoute();">View Details ➔</a>
      </div>
      <h3 style="margin: 0; font-size: 16px; color: var(--text-primary); border: none; padding: 0; font-weight: 600;">${item.title}</h3>
      <p style="margin: 6px 0 0 0; color: var(--text-secondary); font-size: 13px; line-height: 1.5;">${item.desc}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   LAUNCH
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  init();
});


