const fs = require('fs');
const path = require('path');

const stacks = [
  {
    slug: 'nextjs-supabase-stripe',
    fw: 'nextjs',
    services: ['supabase_db', 'supabase_auth', 'stripe', 'nextauth'],
    title: 'Next.js + Supabase + Stripe .env File Generator',
    h1: 'Generate .env for Next.js with Supabase and Stripe',
    desc: 'Generate a complete, production-ready .env file for your Next.js application using Supabase for database/auth and Stripe for payments. Fast, secure, and accurate.',
    content: '<p>When building a modern SaaS application with Next.js, managing environment variables correctly is critical for security. Combining Supabase for your backend and Stripe for payment processing requires strict separation of public keys meant for the browser, and secret keys that must never leave your Node.js server.</p><p>This generator automatically configures your <code>NEXT_PUBLIC_</code> prefixed variables for your Supabase frontend client and Stripe Elements, while securely provisioning the backend keys like your Stripe Webhook Secret and Supabase Service Role Key. By using this pre-configured template, you ensure your application adheres to Next.js best practices, keeping your secrets safe from client-side bundle leakage while enabling a seamless development experience.</p>'
  },
  {
    slug: 'nextjs-openai',
    fw: 'nextjs',
    services: ['openai'],
    title: 'Next.js + OpenAI .env File Generator',
    h1: 'Generate .env for Next.js OpenAI Integration',
    desc: 'Instantly generate the environment variables needed to integrate OpenAI into your Next.js application securely.',
    content: '<p>Integrating OpenAI into a Next.js application opens up powerful AI capabilities, from chat interfaces to advanced text generation. However, the most common mistake developers make is accidentally exposing their OpenAI API keys to the client browser, leading to unauthorized usage and massive billing spikes.</p><p>By generating your <code>.env</code> file here, we ensure your OpenAI secret keys are strictly formatted for the server-side Next.js API routes or Server Actions. This template provides the exact configuration required by the official OpenAI Node SDK, allowing you to build generative AI features securely without worrying about token leakage.</p>'
  },
  {
    slug: 'react-firebase',
    fw: 'vite',
    services: ['firebase_auth', 'supabase_storage'],
    title: 'React + Firebase .env File Generator',
    h1: 'Generate .env for React Firebase App',
    desc: 'Generate your Vite React and Firebase environment variables securely. Complete template for Firebase Auth and configuration.',
    content: '<p>React single-page applications built with Vite handle environment variables differently than traditional frameworks. They require a specific <code>VITE_</code> prefix to expose safe configuration strings to your frontend client. When integrating Firebase, mapping these variables correctly is essential to initialize your Firebase App instance.</p><p>This tool auto-generates the exact Vite-compatible Firebase configuration template you need. It includes all the necessary public credentials for Firebase Authentication while ensuring you understand exactly which keys are safe to commit and which should be guarded. Instantly copy the output to your local <code>.env.local</code> and start building your React application without debugging connection errors.</p>'
  },
  {
    slug: 'django-postgresql',
    fw: 'django',
    services: ['postgres', 'redis'],
    title: 'Django + PostgreSQL .env File Generator',
    h1: 'Generate .env for Django with PostgreSQL',
    desc: 'Create a production-ready .env file for Django, PostgreSQL, and Redis. Secure your Django settings easily.',
    content: '<p>Django is a powerhouse framework, but migrating from the default SQLite database to a production-ready PostgreSQL instance requires careful environment configuration. Hardcoding database credentials in <code>settings.py</code> is a massive security risk. Instead, professional Django deployments rely heavily on environment variables to parse database URLs and secret keys.</p><p>This generator configures the perfect <code>.env</code> template for a robust Django stack utilizing PostgreSQL for relational data and Redis for caching or Celery task queues. It formats your connection strings accurately so packages like <code>dj-database-url</code> can parse them instantly, ensuring your transition from local development to production servers is flawless.</p>'
  },
  {
    slug: 'nextjs-clerk-mongodb',
    fw: 'nextjs',
    services: ['clerk', 'mongodb'],
    title: 'Next.js + Clerk + MongoDB .env Generator',
    h1: 'Generate .env for Next.js with Clerk Auth and MongoDB',
    desc: 'Complete environment variable template for Next.js integrating Clerk authentication and MongoDB databases.',
    content: '<p>Combining Clerk for seamless authentication and MongoDB for flexible NoSQL data storage is a highly popular stack for Next.js developers. Clerk requires specific publishable keys for the frontend middleware, while MongoDB requires a secure connection URI for your server-side database adapters.</p><p>This pre-configured template provides exactly what you need. It securely provisions the <code>NEXT_PUBLIC_CLERK_</code> variables required by the Clerk React SDK, alongside your secret MongoDB connection string. Using this generated file guarantees that your authentication middleware will function correctly across all environments without risking your database credentials.</p>'
  },
  {
    slug: 'node-stripe-mongodb',
    fw: 'nodejs',
    services: ['stripe', 'mongodb'],
    title: 'Node.js + Stripe + MongoDB .env Generator',
    h1: 'Generate .env for Node.js Express with Stripe',
    desc: 'Generate secure environment variables for a Node.js backend using MongoDB and Stripe payment processing.',
    content: '<p>Building a custom Node.js backend gives you ultimate control, but it also places the burden of security entirely on your shoulders. When processing payments with Stripe and storing user data in MongoDB, your environment file becomes the vault for your most critical infrastructure secrets.</p><p>This generator outputs a robust, production-ready template for Express or plain Node environments. It includes your MongoDB connection URIs, Stripe Secret Keys, and the critical Stripe Webhook Secret necessary for validating payment events. Keep these keys out of version control and ensure your Node server remains impenetrable.</p>'
  },
  {
    slug: 'nextjs-prisma-postgresql',
    fw: 'nextjs',
    services: ['postgres', 'redis'],
    title: 'Next.js + Prisma + PostgreSQL .env Generator',
    h1: 'Generate .env for Next.js Prisma PostgreSQL',
    desc: 'Auto-generate your .env file for Next.js utilizing a PostgreSQL database and Redis caching.',
    content: '<p>Using a strongly typed ORM like Prisma within Next.js provides an incredible developer experience. However, Prisma relies strictly on the <code>DATABASE_URL</code> environment variable to perform introspections, migrations, and runtime queries against your PostgreSQL instance.</p><p>This specialized template provides the exact connection string formats you need. Whether you are connecting directly to a local Postgres container or utilizing a connection pooler in production, this generated <code>.env</code> ensures Prisma can communicate with your database securely. It also provisions Redis variables, preparing your stack for high-performance caching or queuing right out of the box.</p>'
  },
  {
    slug: 'laravel-mysql',
    fw: 'laravel',
    services: ['mysql'],
    title: 'Laravel + MySQL .env File Generator',
    h1: 'Generate .env for Laravel with MySQL',
    desc: 'Instantly generate the perfect .env file for a Laravel application running on a MySQL database.',
    content: '<p>Laravel pioneered elegant environment management in the PHP ecosystem. A properly configured <code>.env</code> file is the lifeblood of any Laravel application, dictating everything from the active application environment to the underlying database driver.</p><p>This generator creates a pristine Laravel environment template specifically tuned for MySQL databases. It ensures your <code>DB_CONNECTION</code>, ports, and credentials are structured exactly as Laravel expects. By starting with this generated template, you avoid common configuration cache errors and ensure your Eloquent models can interface with MySQL seamlessly.</p>'
  },
  {
    slug: 'fastapi-postgresql',
    fw: 'fastapi',
    services: ['postgres', 'redis'],
    title: 'FastAPI + PostgreSQL .env File Generator',
    h1: 'Generate .env for FastAPI with PostgreSQL',
    desc: 'Secure environment variable template for FastAPI backends utilizing PostgreSQL and Redis.',
    content: '<p>FastAPI is renowned for its incredible speed and modern Python type-hinting. When deploying FastAPI for production workloads, Pydantic BaseSettings are typically used to ingest environment variables and validate database configurations before the server boots.</p><p>This generator outputs a strictly formatted <code>.env</code> file tailored for FastAPI integrations with PostgreSQL and Redis. It provides the exact connection URIs your SQLAlchemy or async database drivers require to establish connection pools. Start your robust, asynchronous Python backend with absolute confidence in your configuration layer.</p>'
  },
  {
    slug: 'nextjs-vercel-stripe',
    fw: 'nextjs',
    services: ['stripe', 'vercel'],
    title: 'Next.js + Vercel + Stripe .env Generator',
    h1: 'Deploy Next.js with Stripe on Vercel — .env Setup',
    desc: 'Generate the environment variables required to deploy a Next.js application with Stripe integrations on Vercel.',
    content: '<p>Deploying Next.js to Vercel provides a frictionless hosting experience, but managing environment variables across preview deployments and production requires a solid local configuration strategy. When integrating Stripe, you must ensure your test mode keys are used locally and production keys are strictly isolated in Vercel.</p><p>This template generates the perfect local <code>.env</code> file for Vercel deployments. It provisions the Vercel system environment variables alongside your Stripe keys, ensuring local development perfectly mirrors your cloud deployment. Generate this file, pull it via the Vercel CLI, and deploy with confidence.</p>'
  }
];

const indexPath = path.join(__dirname, 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf-8');

// The SEO paragraph block to append at the bottom of the home view
function buildSeoBlock(stack) {
  return `
      <!-- SEO Context Block for SSG Page -->
      <div class="ssg-seo-context" style="max-width: 800px; margin: 60px auto; padding: 0 20px;">
        <div class="blog-markdown" style="font-family:'JetBrains Mono', monospace; font-size: 14px; line-height: 1.6; color: var(--text-muted);">
          <h2 style="color: var(--primary-color); font-size: 1.2rem; margin-bottom: 20px;">About this Configuration</h2>
          ${stack.content}
          <div style="margin-top: 40px; text-align: center;">
             <a href="/" class="btn btn-primary cta-btn">← Generate custom .env for another stack</a>
          </div>
        </div>
      </div>
  `;
}

if (!fs.existsSync(path.join(__dirname, 'stack'))) {
  fs.mkdirSync(path.join(__dirname, 'stack'));
}

stacks.forEach(stack => {
  const stackDir = path.join(__dirname, 'stack', stack.slug);
  if (!fs.existsSync(stackDir)) {
    fs.mkdirSync(stackDir, { recursive: true });
  }

  let html = indexHtml;

  // 1. Replace Title
  html = html.replace(/<title>.*<\/title>/, `<title>${stack.title}</title>`);
  
  // 2. Replace Meta Description
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${stack.desc}">`);
  
  // 3. Replace H1
  html = html.replace(
    /<h1 id="hero-title">.*?<\/h1>/s, 
    `<h1 id="hero-title">${stack.h1}</h1>`
  );

  // 4. Inject Preloaded State
  const preloadScript = `
  <script>
    window.PRELOADED_STATE = {
      framework: '${stack.fw}',
      services: ${JSON.stringify(stack.services)}
    };
  </script>
  <!-- Style sheet -->`;
  html = html.replace('<!-- Style sheet -->', preloadScript);

  // 5. Append SEO block below the tool (but inside home-view)
  // We'll replace the closing div of home-view and the start of howitworks-view
  const targetReplace = '</div>\r\n\r\n    <!-- How It Works View -->';
  const targetReplace2 = '</div>\n\n    <!-- How It Works View -->'; // Handle LF vs CRLF
  
  const injectBlock = buildSeoBlock(stack) + '\n    </div>\n\n    <!-- How It Works View -->';
  
  if (html.includes(targetReplace)) {
    html = html.replace(targetReplace, injectBlock);
  } else if (html.includes(targetReplace2)) {
    html = html.replace(targetReplace2, injectBlock);
  } else {
    console.warn(`Could not find injection point for SEO block in ${stack.slug}`);
  }

  // 6. Fix Asset Paths (styles.css -> /styles.css, app.js -> /app.js, favicon etc)
  html = html.replace(/href="styles\.css"/g, 'href="/styles.css"');
  html = html.replace(/src="presets-core\.js"/g, 'src="/presets-core.js"');
  html = html.replace(/src="compiler-core\.js"/g, 'src="/compiler-core.js"');
  html = html.replace(/src="app\.js"/g, 'src="/app.js"');
  html = html.replace(/src="animations\.js"/g, 'src="/animations.js"');
  html = html.replace(/src="stack-data\.js"/g, 'src="/stack-data.js"');
  html = html.replace(/href="favicon\.svg"/g, 'href="/favicon.svg"');
  
  // Add canonical tag update
  html = html.replace(
    /<link rel="canonical" href="https:\/\/www\.getenv\.in\/">/,
    `<link rel="canonical" href="https://www.getenv.in/stack/${stack.slug}">`
  );

  fs.writeFileSync(path.join(stackDir, 'index.html'), html, 'utf-8');
  console.log(`Generated stack/${stack.slug}/index.html`);
});

console.log('Finished generating static stack pages.');
