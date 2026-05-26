const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf-8');

const startIndex = content.indexOf('<!-- SEO Meta Tags -->');
const endIndex = content.indexOf('<link rel="stylesheet" href="animations.css">');

if (startIndex !== -1 && endIndex !== -1) {
  const newSEO = `<!-- SEO Meta Tags -->
  <title>.env File Generator — Free dotenv Template for Next.js, React, Django & 20+ Frameworks</title>
  <meta name="description" content="Generate production-ready .env files instantly. Pick your framework and services — get complete environment variable templates with explanations for Next.js, React, Django, Laravel and 100+ services. Free, no login required.">
  <meta name="keywords" content="env file generator, dotenv generator, environment variable generator, nextjs env, react env file, django env variables, laravel env setup, stripe env variables, supabase env setup, free env generator">
  <meta name="robots" content="index, follow">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://www.getenv.in/">

  <!-- Open Graph -->
  <meta property="og:title" content=".env File Generator — Free dotenv Template Generator"/>
  <meta property="og:description" content="Generate production-ready .env files instantly for Next.js, React, Django and 100+ services. Free forever."/>
  <meta property="og:url" content="https://www.getenv.in"/>
  <meta property="og:type" content="website"/>
  <meta property="og:image" content="https://www.getenv.in/og-image.png"/>

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content=".env File Generator — Free dotenv Template Generator"/>
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
    "description": "Generate production-ready .env files instantly for 20+ frameworks and 100+ services",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
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
  </script>
  `;

  content = content.substring(0, startIndex) + newSEO + content.substring(endIndex);
  fs.writeFileSync(indexPath, content, 'utf-8');
  console.log('Successfully updated SEO tags in index.html');
} else {
  console.error('Could not find start or end markers for SEO section.');
}
