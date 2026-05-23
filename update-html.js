const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf-8');

// 1. Replace URLs globally
content = content.replace(/href="#home"/g, 'href="/"');
content = content.replace(/href="#howitworks"/g, 'href="/how-it-works"');
content = content.replace(/href="#blog"/g, 'href="/blog"');
content = content.replace(/href="#about"/g, 'href="/about"');
content = content.replace(/href="#privacy"/g, 'href="/privacy"');

// 2. Fix How It Works Page
const howItWorksOld = `<div id="howitworks-view" class="view page-view">
      <div class="blog-container">

        <h1 class="page-title">How it works</h1>
        <p class="blog-subtext">Three simple steps to generate your production-ready .env file.</p>`;

const howItWorksNew = `<div id="howitworks-view" class="view page-view">
      <div class="blog-container">
        
        <div class="blog-terminal-header">
          $ cat ./docs/how-it-works.md<br>
          &gt; loading guide...
        </div>
        
        <h1 class="page-title">How it works</h1>
        <p class="blog-subtext">Three simple steps to generate your production-ready .env file instantly.</p>`;
content = content.replace(howItWorksOld, howItWorksNew);

// 3. Footer Copyright
const footerOld = `<span class="footer-left">Built for developers, by developers.</span>`;
const footerNew = `<span class="footer-left">
        Built for developers, by developers.<br>
        <span style="display:block; font-family:'JetBrains Mono', monospace; font-size:0.7rem; margin-top:5px; color:var(--text-muted);">© 2026 getenv.in — All rights reserved.</span>
      </span>`;
content = content.replace(footerOld, footerNew);

fs.writeFileSync(indexPath, content, 'utf-8');
console.log('Successfully updated index.html');
