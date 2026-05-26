const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf-8');

// 1. Replace SEO Meta block
const seoStart = content.indexOf('<!-- SEO Meta Tags -->');
const seoEnd = content.indexOf('</script>', content.indexOf('<!-- JSON-LD Structured Data -->')) + 9;

if (seoStart !== -1 && seoEnd > seoStart) {
  const newSeoBlock = `<!-- SEO Meta Tags -->
  <title>.env File Generator — Free dotenv Template for Next.js, React, Django & More | getenv.in</title>
  <meta name="description" content="Generate production-ready .env files instantly. Pick your framework (Next.js, React, Django, Laravel) and services (Stripe, Supabase, OpenAI) — get a complete environment variables template with inline docs. Free, no login required.">
  <meta name="keywords" content="env file generator, dotenv generator, environment variables template, nextjs env setup, react env file, django env variables, stripe env variables, supabase env setup, generate dotenv file online, free env generator">
  <meta name="robots" content="index, follow">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://www.getenv.in/">

  <!-- Open Graph -->
  <meta property="og:title" content=".env File Generator — Free dotenv Template Generator"/>
  <meta property="og:description" content="Generate production-ready .env files instantly. 20+ frameworks, 100+ services. Free forever."/>
  <meta property="og:url" content="https://www.getenv.in"/>
  <meta property="og:type" content="website"/>
  <meta property="og:image" content="https://www.getenv.in/og-image.png"/>

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content=".env File Generator"/>
  <meta name="twitter:description" content="Generate production-ready .env files instantly. Free forever."/>
  <meta name="twitter:image" content="https://www.getenv.in/og-image.png"/>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Style sheet -->
  <link rel="stylesheet" href="styles.css">

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": ".env File Generator",
    "url": "https://www.getenv.in",
    "description": "Generate production-ready .env files for Next.js, React, Django, Laravel and 20+ frameworks with 100+ service integrations",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "20+ Framework Support",
      "100+ Service Integrations", 
      "Multi-environment Support",
      "Secret Key Generator",
      "Free Forever"
    ]
  }
  </script>`;
  
  content = content.substring(0, seoStart) + newSeoBlock + content.substring(seoEnd);
} else {
  console.log('Failed to find SEO block to replace');
}

// 2. Inject Hidden H2 Tags
const h1Target = '<h1 id="hero-title"><span class="typewriter-text"></span><span class="blinking-cursor">|</span></h1>';
const hiddenH2s = `
        <h2 style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">Free .env File Generator for Developers</h2>
        <h2 style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">Generate Environment Variables for 20+ Frameworks Instantly</h2>
        <h2 style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">Support for Next.js, React, Django, Laravel and More</h2>
        <h2 style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">Configure Stripe, Supabase, OpenAI and 100+ Services</h2>`;

if (content.includes(h1Target) && !content.includes('Free .env File Generator for Developers')) {
  content = content.replace(h1Target, h1Target + hiddenH2s);
}

fs.writeFileSync(indexPath, content, 'utf-8');
console.log('Successfully applied final SEO tweaks');
