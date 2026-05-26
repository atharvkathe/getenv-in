const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'app.js');
let content = fs.readFileSync(appPath, 'utf-8');

// 1. Add elements.stackView and elements.stackArticleContent
const elOld = `  blogPostView: document.getElementById('blog-post-view'),
  blogArticleContent: document.getElementById('blog-article-content'),`;
const elNew = `  blogPostView: document.getElementById('blog-post-view'),
  blogArticleContent: document.getElementById('blog-article-content'),
  stackView: document.getElementById('stack-view'),
  stackArticleContent: document.getElementById('stack-article-content'),`;

if (content.includes(elOld)) {
  content = content.replace(elOld, elNew);
} else {
  console.log('Could not find element declarations');
}

// 2. Hide stackView in handlePathRoute
const hideOld = `  elements.blogView.classList.remove('active-view');
  elements.blogPostView.classList.remove('active-view');`;
const hideNew = `  elements.blogView.classList.remove('active-view');
  elements.blogPostView.classList.remove('active-view');
  if (elements.stackView) elements.stackView.classList.remove('active-view');`;

if (content.includes(hideOld)) {
  content = content.replace(hideOld, hideNew);
} else {
  console.log('Could not find hide view logic');
}

// 3. Add /stack/ routing block
const routeOld = `  } else if (path.startsWith('/blog/')) {`;
const routeNew = `  } else if (path.startsWith('/stack/')) {
    const stackSlug = path.replace('/stack/', '');
    const activeStack = typeof STACK_PAGES !== 'undefined' ? STACK_PAGES.find(s => s.slug === stackSlug) : null;
    
    if (activeStack) {
      document.title = activeStack.title;
      let metaDesc = document.querySelector('meta[name="description"]');
      if(metaDesc && activeStack.metaDesc) metaDesc.setAttribute('content', activeStack.metaDesc);
      
      let faqsHtml = activeStack.faqs.map(f => \`
        <div style="margin-bottom: 20px;">
          <h3 style="margin-bottom: 8px;">\${f.q}</h3>
          <p style="margin-top: 0; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; font-size: 14px;">\${f.a}</p>
        </div>
      \`).join('');

      elements.stackArticleContent.innerHTML = \`
        <h1>\${activeStack.title}</h1>
        <div class="blog-meta" style="font-family:'JetBrains Mono', monospace; font-size:12px; color:var(--text-muted); margin-bottom:28px;">
          <span>Stack Configuration</span>
        </div>
        <div class="blog-markdown">
          \${activeStack.content}
          
          <h2 style="margin-top: 40px;">.env Template</h2>
          <pre><code>\${activeStack.envTemplate}</code></pre>
          
          <h2 style="margin-top: 40px;">Frequently Asked Questions</h2>
          \${faqsHtml}
        </div>
        <div class="blog-cta-box" style="margin-top: 50px;">
          <h3>Ready to configure your stack?</h3>
          <p>Generate a professional, fully commented .env file for \${activeStack.name} instantly.</p>
          <a href="/" class="btn btn-primary cta-btn">Generate custom .env →</a>
        </div>
      \`;
      elements.stackView.classList.add('active-view');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      history.replaceState(null, '', '/');
      handlePathRoute();
      return;
    }
  } else if (path.startsWith('/blog/')) {`;

if (content.includes(routeOld)) {
  content = content.replace(routeOld, routeNew);
} else {
  console.log('Could not find /blog/ routing logic');
}

fs.writeFileSync(appPath, content, 'utf-8');
console.log('Successfully updated app.js routing logic');
