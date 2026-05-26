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
  state.framework = null;
  state.services.clear();
  state.dismissedWarnings.clear();
  state.generatedSecrets = {
    development: {},
    staging: {},
    production: {}
  };
  state.activeEnv = 'development';
  
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
    elements.step1Card.style.display = 'none';
    elements.step1Card.classList.remove('active');
  }
  if (elements.step2Card) {
    elements.step2Card.style.display = 'none';
    elements.step2Card.classList.remove('active');
  }
  if (elements.step3Card) {
    elements.step3Card.classList.add('active');
    elements.step3Card.style.display = 'block';
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
}

/* ==========================================================================
   HASH ROUTING & SPA COMPONENT PAGE SIMULATIONS
   ========================================================================== */
function handlePathRoute() {
  const path = window.location.pathname;
  
  // Hide all views first
  elements.homeView.classList.remove('active-view');
  if (elements.howItWorksView) elements.howItWorksView.classList.remove('active-view');
  elements.aboutView.classList.remove('active-view');
  elements.privacyView.classList.remove('active-view');
  elements.blogView.classList.remove('active-view');
  elements.blogPostView.classList.remove('active-view');
  if (elements.stackView) elements.stackView.classList.remove('active-view');
  
  if (path === '/about') {
    elements.aboutView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (path === '/privacy') {
    elements.privacyView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (path === '/blog') {
    elements.blogView.classList.add('active-view');
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
   LAUNCH
   ========================================================================== */
document.addEventListener('DOMContentLoaded', init);


