const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'app.js');
let content = fs.readFileSync(appPath, 'utf-8');

// 1. Add Code Protection at the top
const protectionCode = `/* ==========================================================================
   CODE PROTECTION MODULE
   ========================================================================== */
(function initCodeProtection() {
  // 1. Disable Right Click
  document.addEventListener('contextmenu', e => e.preventDefault());

  // 2. Disable DevTools Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F12') e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.key === 'I') e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.key === 'J') e.preventDefault();
    if (e.ctrlKey && e.key === 'u') e.preventDefault();
    if (e.ctrlKey && e.key === 's') e.preventDefault();
  });

  // 3. Obfuscate Console
  console.clear();
  console.log('%c⚠️ Stop!', 'color: #22c55e; font-size: 30px; font-weight: bold;');
  console.log('%cThis browser feature is for developers. If someone told you to paste something here, it is a scam.', 'color: red; font-size: 16px;');
  console.log('%c© 2026 getenv.in — All rights reserved.', 'color: #4a4a4a; font-size: 12px;');
})();

`;
content = protectionCode + content;

// 2. Update routing engine
const oldRouter = `function handleHashRoute() {
  const hash = window.location.hash || '#home';
  
  // Hide all views first
  elements.homeView.classList.remove('active-view');
  if (elements.howItWorksView) elements.howItWorksView.classList.remove('active-view');
  elements.aboutView.classList.remove('active-view');
  elements.privacyView.classList.remove('active-view');
  elements.blogView.classList.remove('active-view');
  elements.blogPostView.classList.remove('active-view');
  
  if (hash === '#about') {
    elements.aboutView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (hash === '#privacy') {
    elements.privacyView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (hash === '#blog') {
    // Render blog index view
    elements.blogView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (hash.startsWith('#blog/')) {
    // Decodes the slug to render the targeted post
    const postSlug = hash.replace('#blog/', '');
    const activePost = BLOG_POSTS.find(p => p.slug === postSlug);
    
    if (activePost) {
      elements.blogArticleContent.innerHTML = \`
        <h1>\${activePost.title}</h1>
        <div class="blog-meta" style="font-family:'JetBrains Mono', monospace; font-size:12px; color:var(--text-muted); margin-bottom:28px;">
          <span>Guides & Tutorial</span> • <span>\${activePost.readTime}</span>
        </div>
        <div class="blog-markdown">
          \${activePost.content}
        </div>
      \`;
      elements.blogPostView.classList.add('active-view');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fallback if post is invalid
      window.location.hash = '#blog';
    }
  } else if (hash === '#howitworks') {
    if (elements.howItWorksView) elements.howItWorksView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // Default to #home
    elements.homeView.classList.add('active-view');
  }
  updateHowItWorksVisibility();
}`;

const newRouter = `function handlePathRoute() {
  const path = window.location.pathname;
  
  // Hide all views first
  elements.homeView.classList.remove('active-view');
  if (elements.howItWorksView) elements.howItWorksView.classList.remove('active-view');
  elements.aboutView.classList.remove('active-view');
  elements.privacyView.classList.remove('active-view');
  elements.blogView.classList.remove('active-view');
  elements.blogPostView.classList.remove('active-view');
  
  if (path === '/about') {
    elements.aboutView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (path === '/privacy') {
    elements.privacyView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (path === '/blog') {
    elements.blogView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (path.startsWith('/blog/')) {
    const postSlug = path.replace('/blog/', '');
    const activePost = BLOG_POSTS.find(p => p.slug === postSlug);
    
    if (activePost) {
      elements.blogArticleContent.innerHTML = \`
        <h1>\${activePost.title}</h1>
        <div class="blog-meta" style="font-family:'JetBrains Mono', monospace; font-size:12px; color:var(--text-muted); margin-bottom:28px;">
          <span>Guides & Tutorial</span> • <span>\${activePost.readTime}</span>
        </div>
        <div class="blog-markdown">
          \${activePost.content}
        </div>
      \`;
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
    elements.homeView.classList.add('active-view');
  }
  updateHowItWorksVisibility();
}`;

content = content.replace(oldRouter, newRouter);

// 3. Update initialization listeners
const oldListeners = `  // Handle window popstate for hash routing SPA
  handleHashRoute();
  window.addEventListener('hashchange', handleHashRoute);`;

const newListeners = `  // Handle window popstate for path routing SPA
  handlePathRoute();
  window.addEventListener('popstate', handlePathRoute);

  // Global Link Interceptor for SPA navigation
  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
      e.preventDefault();
      const path = link.getAttribute('href');
      history.pushState(null, '', path);
      handlePathRoute();
    }
  });`;

content = content.replace(oldListeners, newListeners);

// 4. Update logoLink click handler
const oldLogoLink = `  // 3. Clear URL hash
  if (history.replaceState) {
    history.replaceState(null, null, window.location.pathname);
  }`;

const newLogoLink = `  // 3. Reset URL path to root
  history.pushState(null, '', '/');
  handlePathRoute();`;

content = content.replace(oldLogoLink, newLogoLink);

// 5. Update updateHowItWorksVisibility
const oldHow = `function updateHowItWorksVisibility() {
  const howItWorks = document.getElementById('how-it-works');
  if (!howItWorks) return;
  
  const hash = window.location.hash || '#home';
  const isHomePage = (hash === '#home' || hash === '' || hash.startsWith('#how-it-works'));`;

const newHow = `function updateHowItWorksVisibility() {
  const howItWorks = document.getElementById('how-it-works');
  if (!howItWorks) return;
  
  const path = window.location.pathname;
  const isHomePage = (path === '/' || path === '/index.html');`;

content = content.replace(oldHow, newHow);

fs.writeFileSync(appPath, content, 'utf-8');
console.log('Successfully updated app.js');
