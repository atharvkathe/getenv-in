const fs = require('fs');
const path = require('path');

const BLOG_POSTS = [
  {
    slug: 'nextjs-env-guide',
    title: 'Next.js Environment Variables: The Complete Guide',
    seoTitle: 'Next.js Environment Variables: The Complete Guide | getenv.in',
    seoMeta: 'Master Next.js environment variables. Learn the NEXT_PUBLIC_ prefix, cascading .env file hierarchies (.env.local, .env.production), server vs client scope, and avoid common security leakage mistakes.',
    excerpt: 'Everything you need to know about NEXT_PUBLIC_ prefixes, server-side vs client-side variables, and the .env.local vs .env.production cascade hierarchy.',
    readTime: '8 min read',
    content: `
<p>Managing <strong>Next.js environment variables</strong> is a fundamental architectural skill for modern full-stack web development. Whether you are constructing a highly dynamic React application, compiling a static site, or running Server Actions in Next.js, separating your configurations from your application logic is vital. This comprehensive guide walks you through how environment variables work in Next.js, how they cascade, client-side vs. server-side execution boundaries, and how to avoid the most common security mistakes shipped by developers. If you want to jump straight to building, <a href="/">use our free .env template generator</a> to scaffold a production-ready configuration instantly.</p>

<h2>Understanding Environment Variables in Next.js</h2>
<p>By default, environment variables loaded into a Next.js application are exclusively accessible in the Node.js runtime environment. This means they are only available in server-side contexts, such as React Server Components (RSC), API routes, <code>getServerSideProps</code>, and <code>getStaticProps</code>. They are completely hidden from the browser client.</p>

<p>This "server-only by default" behavior is a critical security safeguard. If you have database credentials, Stripe private secret keys, or custom internal administrative passwords, you define them simply in your <code>.env</code> file like this:</p>

<pre><code># Available strictly on the server-side
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb"
API_SECRET_KEY="sk_live_51M..."</code></pre>

<p>Inside a Next.js Server Component or API Route, you access this variable using the standard Node.js syntax:</p>

<pre><code>// app/api/users/route.js
export async function GET() {
  const dbUrl = process.env.DATABASE_URL; // Perfectly safe and resolved on the server
  // ... database queries here
}</code></pre>

<p>If you try to read <code>process.env.DATABASE_URL</code> inside a client-side component (a file starting with <code>"use client"</code>), it will resolve to <code>undefined</code>. This prevents the browser from ever seeing your master database connection string or private keys.</p>

<h2>Exposing Variables to the Client: The NEXT_PUBLIC_ Prefix</h2>
<p>There are many scenarios where you legitimately need to expose configuration details directly to the client's browser. For instance, you might need to initialize a Google Analytics tracker with a measurement ID, connect a Supabase client using an anonymous public key, or load Stripe Elements with a publishable key.</p>

<p>To tell Next.js that a variable is safe to send to the browser, you must prefix the variable's key with <code>NEXT_PUBLIC_</code>. For example:</p>

<pre><code># Accessible in both client and server contexts
NEXT_PUBLIC_ANALYTICS_ID="G-12345ABC"
NEXT_PUBLIC_SUPABASE_URL="https://xyz.supabase.co"</code></pre>

<p>During the build process, Next.js scans your client-side JavaScript bundle files. If it encounters a reference to <code>process.env.NEXT_PUBLIC_ANALYTICS_ID</code>, it literally inlines (hardcodes) the string value into the compiled browser files. This means anyone inspecting your page's JavaScript can read this value. **Never prefix private database credentials, payment secret keys, or authentication secret keys with <code>NEXT_PUBLIC_</code>.**</p>

<h2>The Cascading Environment File Hierarchy</h2>
<p>Next.js supports a sophisticated cascading system of environment files, allowing you to define different variables depending on your execution environment (development, staging, or production). Next.js will automatically load files in the following priority order, from highest priority to lowest priority:</p>

<ol>
  <li><code>.env.development.local</code>, <code>.env.production.local</code>, <code>.env.local</code>: These files override their corresponding non-local templates. They should <strong>always</strong> be added to your <code>.gitignore</code> file as they contain environment-specific secrets.</li>
  <li><code>.env.development</code>: Loaded automatically only when running <code>next dev</code>. This is where you configure local mock services, test databases, and sandbox endpoints.</li>
  <li><code>.env.production</code>: Loaded automatically when running <code>next start</code> or during the <code>next build</code> phase. Excellent for staging and production configurations.</li>
  <li><code>.env</code>: The baseline file. These values are applied across all environments unless overridden by a more specific file. Perfect for non-sensitive default parameters.</li>
</ol>

<h2>Common Environment Mistakes to Avoid</h2>
<ul>
  <li><strong>Committing .env to Git:</strong> The absolute most frequent mistake is forgetting to add <code>.env</code> or <code>.env.local</code> to your <code>.gitignore</code>. Once a key is pushed to GitHub, it is permanently logged in the Git history. Even if deleted in a later commit, the key remains compromised.</li>
  <li><strong>Trying to access server variables on the client:</strong> If your frontend calls <code>process.env.MY_SECRET</code> and it returns <code>undefined</code>, check if the component is marked with <code>"use client"</code>. Client components can only read keys prefixed with <code>NEXT_PUBLIC_</code>.</li>
  <li><strong>Stale variables during local development:</strong> When you modify your <code>.env.local</code> file, Next.js does not always hot-reload the environment variables instantly. Always stop your dev server (<code>Ctrl + C</code>) and restart it (<code>npm run dev</code>) to ensure changes are correctly compiled.</li>
</ul>

<p>By strictly applying the prefix rules, utilizing cascading environment hierarchies, and maintaining a solid git ignore strategy, you ensure your Next.js application remains impenetrable while remaining incredibly fast. If you are starting a new stack configuration, <a href="/">head back to our generator homepage</a> to compile the perfect boilerplate instantly.</p>
`
  },
  {
    slug: 'secure-api-keys',
    title: 'How to Secure Your API Keys in 2026',
    seoTitle: 'How to Secure Your API Keys in 2026: Complete Checklist | getenv.in',
    seoMeta: 'A complete developer security checklist for protecting API keys, secrets, and environment configurations in production. Learn how to prevent git leakage, rotate secrets, and use secure vaults.',
    excerpt: 'Exposing a production key can cost thousands of dollars in minutes. Learn the essential strategies for keeping your secrets out of source control and securing them in production.',
    readTime: '6 min read',
    content: `
<p>In modern web architectures, understanding <strong>how to secure API keys</strong> is the single most critical task for a developer before pushing code to production. A leaked administrative key—whether for OpenAI, AWS, Stripe, or Supabase—can be hijacked by automated crawlers within seconds. This can lead to massive service charges, database compromises, and severe brand damage. Security is not a luxury; it must be baked into your workflow from the very first commit. To get started on a secure foundation, <a href="/">use our free .env generator</a> to instantly scaffold sanitized environment variable configurations.</p>

<h2>Why API Key Security is Critical</h2>
<p>In a serverless and cloud-native ecosystem, your API keys represent the keys to your financial and data vaults. Unlike password credentials which are protected by user interfaces, API keys are designed for high-throughput machine-to-machine authentication. They bypass multi-factor authentication (MFA) and authorization gates completely.</p>

<p>Automated scrapers continuously crawl GitHub, GitLab, and public web spaces, scanning every single commit for exposed credentials. A leaked AWS or OpenAI key can be exploited within 30 seconds of being pushed online, spinning up thousands of dollars of compute resources before your DevOps team even receives a notification. Even in private repositories, hardcoding secrets represents a massive security threat, exposing keys to unauthorized employees and violating SOC2 or ISO 27001 compliance standards.</p>

<h2>Rule 1: Never Commit .env Files to Git</h2>
<p>The golden rule of environment variable management is simple: **your local <code>.env</code> file must never enter version control.** To ensure this, you must configure your project's <code>.gitignore</code> file immediately upon repository creation. A standard secure <code>.gitignore</code> should include the following entries:</p>

<pre><code># .gitignore
.env
.env.local
.env.development.local
.env.production.local
.env.testing.local
*.env</code></pre>

<p>If you accidentally commit a <code>.env</code> file, you cannot simply delete it and push a new commit. The secret will still reside in your repository's commit history. You must execute a filter-branch command or use tools like <code>git-filter-repo</code> to scrub the file entirely from your history, or revoke and recreate the key immediately in your provider dashboard.</p>

<h2>Using the .env.example Template Pattern</h2>
<p>If you cannot commit your <code>.env</code> file, how do new developers onboarding onto your team know which environment variables are required to run the project locally? The answer is the <code>.env.example</code> pattern.</p>

<p>A <code>.env.example</code> file is a sanitized template committed to Git. It lists every required environment key but omits all sensitive values, replacing them with generic description placeholders or mock safe defaults. For example:</p>

<pre><code># .env.example
# The database connection URL (local PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Stripe publishable keys are safe for client-side templates
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder

# DO NOT put your actual live secret key here!
STRIPE_SECRET_KEY=</code></pre>

<p>When a teammate clones the repository, they simply duplicate the template (<code>cp .env.example .env</code>) and fill in their local sandbox credentials. This keeps secrets isolated on developer machines while keeping configuration requirements completely documented.</p>

<h2>API Key Security Checklist</h2>
<p>Before launching your application to the public, review this essential security checklist:</p>

<table>
  <thead>
    <tr>
      <th>Security Control</th>
      <th>Status</th>
      <th>Action Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Principle of Least Privilege</strong></td>
      <td>Critical</td>
      <td>Scope API keys to the narrowest possible permissions (e.g., read-only S3 keys).</td>
    </tr>
    <tr>
      <td><strong>GitHub Secret Scanning</strong></td>
      <td>Recommended</td>
      <td>Enable GitHub Secret Scanning to block commits containing active secret signatures.</td>
    </tr>
    <tr>
      <td><strong>IP & Referrer Restrictions</strong></td>
      <td>Highly Recommended</td>
      <td>Restrict public keys (like Google Maps) to your exact domain referrers.</td>
    </tr>
    <tr>
      <td><strong>Key Rotation Policy</strong></td>
      <td>Standard</td>
      <td>Establish a 90-day key rotation schedule and dynamic config switches.</td>
    </tr>
    <tr>
      <td><strong>Production Secret Vaults</strong></td>
      <td>Best Practice</td>
      <td>Inject secrets at runtime using Vercel, AWS Secrets Manager, or HashiCorp Vault.</td>
    </tr>
  </tbody>
</table>

<p>Securing your project starts with proper environment discipline. By isolating local files, providing templates, restricting key permissions, and actively monitoring usage, you maintain an impenetrable security posture. To quickly generate a sanitized template for your exact stack, <a href="/">use our free generator tool on the home view</a>.</p>
`
  },
  {
    slug: 'stripe-nextjs-env',
    title: 'Setting Up Stripe with Next.js: Environment Variables You Actually Need',
    seoTitle: 'Setting Up Stripe with Next.js: Environment Variables You Actually Need | getenv.in',
    seoMeta: 'Learn the exact Stripe environment variables needed for a secure Next.js checkout. Understand STRIPE_SECRET_KEY, publishable keys, webhook secrets, and test vs live modes.',
    excerpt: 'Confused about which Stripe keys go to the browser and which stay on the server? A detailed breakdown of Stripe variables, webhooks, and client-side setup.',
    readTime: '7 min read',
    content: `
<p>Integrating payments is one of the most critical phases of launching a SaaS. To make Stripe work seamlessly with a Next.js framework, you must configure a set of environment variables. The key to a secure Stripe integration is understanding exactly which variables belong on the server, which can be shared with the browser client, and how to safely handle webhooks. If you want to jump straight to copying a perfectly structured configuration, <a href="/">generate your customized Stripe environment template here</a>.</p>

<h2>The Stripe Two-Key Cryptographic System</h2>
<p>Stripe uses a dual-key mechanism to separate public frontend operations from critical backend administrative operations. Understanding this boundary is the absolute core of payment gateway security.</p>

<h3>1. Stripe Publishable Key (Frontend element loading)</h3>
<p>The Stripe Publishable Key (prefixed with <code>pk_test_</code> or <code>pk_live_</code>) is designed to be public. It is loaded inside your Next.js React client to initialize Stripe.js and render Stripe Elements. This key is responsible for tokenizing credit card data securely, sending it directly to Stripe's servers without letting sensitive credit card data touch your backend servers.</p>

<p>Because the browser needs access to this key, you must prefix it with <code>NEXT_PUBLIC_</code> in your Next.js project:</p>

<pre><code># Safe for browser-side JavaScript bundle loading
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51M..."</code></pre>

<h3>2. Stripe Secret Key (Backend administrative API calls)</h3>
<p>The Stripe Secret Key (prefixed with <code>sk_test_</code> or <code>sk_live_</code>) is your master key. It has absolute authority over your Stripe account, allowing you to charge cards, trigger refunds, read transactions, and manage subscriptions. **This key must never, under any circumstances, be exposed to the browser client.**</p>

<p>In your Next.js app, define it simply without the <code>NEXT_PUBLIC_</code> prefix, keeping it isolated inside server-side Node.js environments (like API routes, server actions, or Server Components):</p>

<pre><code># Keep this private! Exclusively resolved in Node.js server environments
STRIPE_SECRET_KEY="sk_test_51M..."</code></pre>

<h2>Initializing the Stripe Client Safely in Code</h2>
<p>To use Stripe on the server-side, you initialize the official Stripe Node.js SDK using your private key. Here is a clean, production-grade example of a Next.js checkout API route:</p>

<pre><code>// app/api/checkout/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Ensure you pin to your dashboard API version
});

export async function POST(req) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: 'price_1H...', quantity: 1 }],
      mode: 'subscription',
      success_url: 'https://getenv.in/success',
      cancel_url: 'https://getenv.in/cancel',
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}</code></pre>

<h2>The Webhook Signature Verification Secret</h2>
<p>When an asynchronous event happens in Stripe (such as a subscription invoice getting paid successfully), Stripe sends a webhook request to your Next.js server. To prevent malicious actors from spoofing checkout payload requests, you must verify the signature of the incoming request.</p>

<p>To do this, you need a third environment variable: your **Stripe Webhook Secret** (prefixed with <code>whsec_</code>), which is generated in your Stripe dashboard under Webhooks.</p>

<pre><code># Used to authenticate incoming Stripe webhook requests
STRIPE_WEBHOOK_SECRET="whsec_abc123..."</code></pre>

<p>Here is how you parse and verify the webhook signature in a Next.js Route Handler:</p>

<pre><code>// app/api/webhooks/stripe/route.js
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text(); // Retrieve raw request body
  const signature = headers().get('stripe-signature');
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json({ error: \`Webhook error: \${err.message}\` }, { status: 400 });
  }

  // Fulfill subscription changes based on event type
  if (event.type === 'invoice.payment_succeeded') {
    const subscription = event.data.object;
    // Update user database status here
  }
  
  return NextResponse.json({ received: true });
}</code></pre>

<h2>Test Keys vs. Production Keys</h2>
<p>Stripe automatically separates your test environment and live environment. For local development, make sure you exclusively use keys starting with <code>pk_test_</code>, <code>sk_test_</code>, and <code>whsec_</code>. When pushing your project live on hosting providers like Vercel or AWS, swap these keys out for your live keys (<code>pk_live_</code>, <code>sk_live_</code>) inside the hosting dashboard variables. Decoupling configuration from your code is what keeps your customer data secure and your implementation flawless. Need a secure starting boiler? <a href="/">Compile your complete Next.js Stripe variables right now</a>.</p>
`
  },
  {
    slug: 'supabase-nextjs-env',
    title: 'Supabase + Next.js: Complete .env Setup Guide',
    seoTitle: 'Supabase + Next.js: Complete .env Setup Guide | getenv.in',
    seoMeta: 'Learn how to configure Supabase environment variables in Next.js. Master the difference between public anon keys, private service role keys, and setup PostgreSQL connection strings securely.',
    excerpt: 'Supabase utilizes anonymous public keys, Row Level Security, and high-privilege service roles. Discover how to setup your environment variables safely.',
    readTime: '7 min read',
    content: `
<p>Integrating your database layer with a backend-as-a-service requires a clear understanding of your **Supabase environment variable setup**. Supabase is a powerful open-source PostgreSQL database alternative, but its security model differs significantly from traditional architectures. By utilizing PostgreSQL Row Level Security (RLS) and JWT tokens directly in the client browser, Supabase requires you to be extremely disciplined about which API keys you expose. If you want to jump straight to configuring your variables, <a href="/">use our free .env generator</a> to scaffold your Supabase templates instantly.</p>

<h2>The Supabase Environment Variable Matrix</h2>
<p>A standard Supabase integration requires three key environment variables. Understanding their scopes and privileges is the difference between a secure deployment and an exposed database.</p>

<h3>1. NEXT_PUBLIC_SUPABASE_URL</h3>
<p>This is the unique REST API gateway address for your Supabase project instance. It tells the Supabase Client SDK where to send queries, authentication requests, and real-time subscription calls. It is completely safe to expose to the client browser and must be prefixed with <code>NEXT_PUBLIC_</code>:</p>

<pre><code># The API gateway endpoint. Safe for public bundle loading
NEXT_PUBLIC_SUPABASE_URL="https://yourprojectid.supabase.co"</code></pre>

<h3>2. NEXT_PUBLIC_SUPABASE_ANON_KEY</h3>
<p>The anonymous key (or <code>anon</code> key) is a public API key. It is designed to be embedded directly inside your client-side React components. When the Supabase SDK is initialized with the anon key, all database queries are executed with the PostgreSQL <code>anon</code> database role.</p>

<p>The magic of the anon key relies entirely on **Row Level Security (RLS)**. If you have active RLS policies on your tables, an anonymous user can only read or write rows that your SQL policies explicitly permit. If RLS is disabled, the anon key could allow anyone to read your entire database. **Always enable RLS on every table before deploying your anon key.**</p>

<pre><code># The public client key. Safe for public browser scripts
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsIn..."</code></pre>

<h3>3. SUPABASE_SERVICE_ROLE_KEY</h3>
<p>The Supabase Service Role Key is your administrative master key. It has full, unrestricted access over your entire database, **bypassing PostgreSQL Row Level Security (RLS) entirely.** It can execute any read, insert, update, or delete statement on any table, regardless of RLS policies.</p>

<p><strong>This key is highly sensitive and must never, under any circumstances, be exposed to the browser client.</strong> Never prefix this key with <code>NEXT_PUBLIC_</code>. Keep it locked inside server-side environments such as Server Actions, API routes, or edge functions:</p>

<pre><code># Keep private! Bypasses all Row Level Security (RLS)
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsIn..."</code></pre>

<h2>Initializing the Supabase Clients in Next.js</h2>
<p>In modern Next.js apps, you typically maintain two distinct Supabase client initializations: a browser-safe client for your client-side interactive views, and a server client for server-side environments. Here is how they access your environment variables:</p>

<h3>A. Browser Client (Safe for Browser Bundle)</h3>
<pre><code>// utils/supabase/client.js
import { createBrowserClient } from '@supabase/ssr';

// Initializes with public variables
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);</code></pre>

<h3>B. Server Client (Using the Service Role Key for Admin Actions)</h3>
<p>When executing background tasks, executing administrative authentication functions, or running seed migrations, initialize your client using your private service role key:</p>

<pre><code>// utils/supabase/admin.js
import { createClient } from '@supabase/supabase-js';

// Initializes with private service role key. Bypasses RLS!
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);</code></pre>

<h2>Row Level Security: The Ultimate Defense</h2>
<p>To prevent malicious users from abusing your public anonymous keys, you must execute a SQL security policy in your Supabase SQL editor. For example, to restrict user data access to authenticated owners:</p>

<pre><code>-- Enable RLS on user profile table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy allowing users to only read their own row
CREATE POLICY "Allow users to read own profiles" ON profiles
  FOR SELECT USING (auth.uid() = id);</code></pre>

<p>By coupling PostgreSQL's native security engine with properly isolated client and server variables, you build an architecture that is incredibly robust, secure, and lightning-fast. Need a clean environment template to start your next Supabase project? <a href="/">Generate your .env file on our homepage now</a>.</p>
`
  },
  {
    slug: 'what-is-dotenv',
    title: 'What is a .env File? A Beginner\'s Explanation',
    seoTitle: 'What is a .env File? Plain English Explanation for Beginners | getenv.in',
    seoMeta: 'Discover what a .env file is, how environment variables keep your application secrets secure, and how to use dotenv libraries to build code configurations like a pro.',
    excerpt: 'The fundamental concept behind modern software configuration. Discover why we use .env files and how they protect our API keys from internet leaks.',
    readTime: '5 min read',
    content: `
<p>If you are new to web development, you might have run into a file at the root of a project named simply <code>.env</code>. You might ask: <strong>what is env file</strong> and why does every developer tutorial insist on using them? In this beginner-friendly guide, we will break down environment variables, dotenv files, the syntax of key-value configurations, and why this simple text file is the cornerstone of modern application security. If you need to build one quickly for a project, <a href="/">try our free interactive .env generator</a> to output a customized config file instantly.</p>

<h2>The Concept: What is an Environment Variable?</h2>
<p>Before understanding the file, you must understand the concept of an environment variable. An environment variable is a global setting managed by your computer's operating system (Windows, macOS, or Linux). Your code can read these settings while it runs.</p>

<p>Think of it as a configuration dashboard. Instead of writing variables directly into your code (like hardcoding a port number or database credentials), you store them in the environment. For example, in Node.js, you read a global environment variable like this:</p>

<pre><code>// Reading a variable from the operating system environment
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;</code></pre>

<h2>What is a .env File?</h2>
<p>During local development, setting environment variables directly in your operating system command line (like terminal or command prompt) can be tedious, especially when you have dozens of variables. To solve this, developers created the <code>dotenv</code> pattern.</p>

<p>A <code>.env</code> file (pronounced "dot-env") is a plain text file saved at the very root of your project. It is simply a text-based list of configuration keys and their corresponding values. Here is what a basic <code>.env</code> file looks like:</p>

<pre><code># This is a comment inside a dotenv file
PORT=8080
DATABASE_URL="mongodb://localhost:27017/my_app"
SECRET_KEY="my-super-secret-passphrase"</code></pre>

<p>When you start your application, a library (like <code>dotenv</code> in Node.js, or <code>python-dotenv</code> in Python) reads this text file and automatically injects all the keys and values into the operating system environment at runtime. Your application reads them as if they were natively configured in the machine.</p>

<h2>Why We Use .env Files (The Twin Benefits)</h2>
<p>Using a dotenv file provides two massive advantages to web developers: **Security** and **Flexibility**.</p>

<h3>1. Security (Keeping your credentials off the internet)</h3>
<p>The single most important rule of software development is: **never hardcode passwords, credit card secret keys, or database credentials inside your source code.** If you upload your codebase to GitHub, anyone can see your keys, exploit your APIs, and charge your accounts.</p>

<p>By extracting these credentials into a local <code>.env</code> file and adding that file to your <code>.gitignore</code>, Git will completely ignore the file. Your secrets remain safely stored strictly on your local physical hard drive and never enter version control.</p>

<h3>2. Flexibility (Deploying to different environments)</h3>
<p>A professional application runs in multiple stages: local development (on your laptop), staging (for testing), and live production (accessible by users). By reading settings from the environment, your code remains identical across all stages. Only the values in the environment change:</p>

<ul>
  <li>On your laptop, the environment variable <code>DATABASE_URL</code> connects to your local PostgreSQL instance (<code>localhost</code>).</li>
  <li>On the production server, the environment variable <code>DATABASE_URL</code> connects to your highly secure cloud database.</li>
</ul>

<p>You don't need to change a single line of code to deploy to staging or production; you simply inject different values inside the hosting dashboard. This makes your application extremely scalable and portable. Now that you know what it is, head over to our <a href="/">homepage generator</a> to create your first secure configuration file.</p>
`
  },
  {
    slug: 'env-example-pattern',
    title: 'The .env.example Pattern: Why Every Project Needs One',
    seoTitle: 'The .env.example Pattern: Best Practices | getenv.in',
    seoMeta: 'Learn what .env.example is, why it is critical for developer onboarding, how to write pristine environment templates, and keep configurations in sync without exposing secret keys.',
    excerpt: 'How do you share required environment variables with your team if you cannot commit the .env file? The answer is the .env.example template pattern.',
    readTime: '6 min read',
    content: `
<p>Decoupling configuration from your source code using environment variables is the industry standard for modern software engineering. However, because you are strictly ignoring your <code>.env</code> file in version control, you introduce a practical collaboration bottleneck: how does a new developer joining your team know which variables they need to configure to run the application? The answer is the <strong>.env.example pattern</strong>. In this guide, we will explore why every professional repository must include a sanitized template, how to write one, and best practices for team onboarding. If you want to automatically generate a perfect template alongside your code, <a href="/">try our free interactive .env generator</a>.</p>

<h2>What is a .env.example File?</h2>
<p>A <code>.env.example</code> (or <code>.env.template</code>) is a sanitized copy of your project's environment variables. It has the exact same keys as your real <code>.env</code> file, but all highly sensitive credentials (like active production passwords or private Stripe tokens) are replaced with mock descriptions or left blank.</p>

<p>Unlike the real <code>.env</code> file, the <code>.env.example</code> file is **committed to your Git repository**. It serves as a living, executable documentation of your project's external dependencies.</p>

<h2>The Standard Developer Onboarding Workflow</h2>
<p>By maintaining a pristine example file, you turn developer onboarding from a hours-long debugging session into a 30-second workflow. The standard process for running a newly cloned project is:</p>

<ol>
  <li>Clone the git repository to your local computer: <code>git clone https://github.com/user/repo</code></li>
  <li>Duplicate and rename the template: <code>cp .env.example .env</code></li>
  <li>Open the newly created <code>.env</code> file in your text editor (VS Code, etc.).</li>
  <li>Fill in the blank values with your local sandbox API keys.</li>
  <li>Boot the local development server: <code>npm run dev</code> or <code>python main.py</code></li>
</ol>

<p>Because the real <code>.env</code> file is actively ignored by your project's <code>.gitignore</code>, developers can make custom local configurations without fear of accidentally committing their credentials back to the remote repository.</p>

<h2>How to Write a Professional .env.example File</h2>
<p>A poor example file simply lists empty keys, leaving developers guessing about format. A pristine example file contains helpful descriptive comments, default non-sensitive parameters, and direct URLs showing where to generate developer credentials. Here is a production-grade template:</p>

<pre><code># =========================================================================
# APPLICATION CORE CONFIGURATION
# =========================================================================
# Local execution port. Default is 3000
PORT=3000
NODE_ENV=development

# =========================================================================
# DATABASE SETTINGS
# =========================================================================
# Postgres URL. Replace with your local container port if different
# Format: postgres://username:password@hostname:port/database_name
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/my_db"

# =========================================================================
# INTEGRATIONS & KEY REGISTRATIONS
# =========================================================================
# Retrieve your public key from: https://dashboard.stripe.com/test/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder

# Private Stripe key. Ask your tech lead or generate a local test key.
# DO NOT COMMIT A LIVE KEY!
STRIPE_SECRET_KEY=</code></pre>

<h2>Handling Configuration Drift</h2>
<p>The most common failure point of this pattern is "configuration drift." As your application grows, developers add new dependencies and corresponding environment variables to their local <code>.env</code> files to test new features. However, they frequently forget to add these new keys to the <code>.env.example</code> file before merging their pull requests.</p>

<p>When this happens, the example file becomes outdated. The next developer to pull the code will experience mysterious application crashes because a new environment key was introduced but never documented. To prevent this, build a routine check: make reviewing and updating the <code>.env.example</code> file a mandatory step in your team's code review checklist. Keep your configurations pristine, secure, and perfectly synced. To generate a standardized template for your exact stack, <a href="/">use our free .env template builder today</a>.</p>
`
  }
];

const indexPath = path.join(__dirname, 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf-8');

const ssgSeoBlock = (post, prevPost, nextPost) => `
      <!-- preloaded blog container for physical page direct hit indexability -->
      <div class="blog-post-container">
        <a href="/blog" class="back-link" style="display: block; margin-bottom: 24px;">← Back to Blog</a>
        
        <div class="blog-terminal-header">
          $ cat ./guides/${post.slug}.md<br>
          &gt; loading article...
        </div>
        
        <article class="blog-article-body">
          <h1>${post.title}</h1>
          <div class="blog-meta" style="font-family:'JetBrains Mono', monospace; font-size:12px; color:var(--text-muted); margin-bottom:28px;">
            <span>Guides & Tutorial</span> • <span class="read-time-badge" style="background: rgba(34, 197, 94, 0.1); color: var(--accent-color); padding: 2px 6px; border-radius: 4px; font-weight: 500;">${post.readTime}</span>
          </div>
          <div class="blog-markdown">
            ${post.content}
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

// Build directories
const blogDir = path.join(__dirname, 'blog');
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir);
}

BLOG_POSTS.forEach((post, index) => {
  const postDir = path.join(blogDir, post.slug);
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }

  let html = indexHtml;

  // 1. Title
  html = html.replace(/<title>.*<\/title>/, `<title>${post.seoTitle || post.title}</title>`);

  // 2. Meta description
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${post.seoMeta}">`);

  // 3. Canonical
  html = html.replace(
    /<link rel="canonical" href="https:\/\/www\.getenv\.in\/">/,
    `<link rel="canonical" href="https://www.getenv.in/blog/${post.slug}">`
  );

  // 4. Open Graph & Twitter
  html = html.replace(/<meta property="og:title" content="[^"]*"\/>/g, `<meta property="og:title" content="${post.seoTitle || post.title}"/>`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\/>/g, `<meta property="og:description" content="${post.seoMeta}"/>`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\/>/g, `<meta property="og:url" content="https://www.getenv.in/blog/${post.slug}"/>`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\/>/g, `<meta name="twitter:title" content="${post.seoTitle || post.title}"/>`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\/>/g, `<meta name="twitter:description" content="${post.seoMeta}"/>`);

  // 5. Swap SPA Views by modifying active-view class directly
  html = html.replace('id="home-view" class="view active-view"', 'id="home-view" class="view"');
  
  // Inject Pre-rendered content inside blog-post-view and make active
  const prevPost = index > 0 ? BLOG_POSTS[index - 1] : null;
  const nextPost = index < BLOG_POSTS.length - 1 ? BLOG_POSTS[index + 1] : null;
  
  const injectMarkup = ssgSeoBlock(post, prevPost, nextPost);
  
  // Locate the blog-post-view element and replace its dynamic target
  const blogPostViewTarget = `<div id="blog-post-view" class="view page-view">
      <div class="blog-post-container">
        <a href="/blog" class="back-link">← Back to Blog</a>
        
        <article id="blog-article-content" class="blog-article-body">
          <!-- Loaded dynamically via app.js -->
        </article>
        
        <!-- CTA Box -->
        <div class="blog-cta-box">
          <h3>Ready to configure your stack?</h3>
          <p>Generate a professional, fully commented .env file for your exact framework in seconds.</p>
          <a href="/" class="btn btn-primary cta-btn">Generate your .env file instantly →</a>
        </div>
      </div>
    </div>`;

  const blogPostViewReplacement = `<div id="blog-post-view" class="view page-view active-view">
      ${injectMarkup}
    </div>`;

  html = html.replace(blogPostViewTarget, blogPostViewReplacement);

  // 6. Fix Asset Paths for Absolute references
  html = html.replace(/href="styles\.css"/g, 'href="/styles.css"');
  html = html.replace(/src="presets-core\.js"/g, 'src="/presets-core.js"');
  html = html.replace(/src="compiler-core\.js"/g, 'src="/compiler-core.js"');
  html = html.replace(/src="app\.js"/g, 'src="/app.js"');
  html = html.replace(/src="animations\.js"/g, 'src="/animations.js"');
  html = html.replace(/src="stack-data\.js"/g, 'src="/stack-data.js"');
  html = html.replace(/href="favicon\.svg"/g, 'href="/favicon.svg"');

  fs.writeFileSync(path.join(postDir, 'index.html'), html, 'utf-8');
  console.log(`Generated physical blog page: blog/${post.slug}/index.html`);
});

console.log('Finished compiling physical static blog pages successfully!');
