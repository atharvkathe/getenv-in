const fs = require('fs');

const stacks = [
  { slug: "nextjs-stripe-supabase", name: "Next.js + Stripe + Supabase", title: "Next.js + Stripe + Supabase .env Template", env: "NEXT_PUBLIC_SUPABASE_URL=\\nNEXT_PUBLIC_SUPABASE_ANON_KEY=\\nSUPABASE_SERVICE_ROLE_KEY=\\nNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\\nSTRIPE_SECRET_KEY=\\nSTRIPE_WEBHOOK_SECRET=" },
  { slug: "nextjs-clerk-postgresql", name: "Next.js + Clerk + PostgreSQL", title: "Next.js + Clerk + PostgreSQL .env Template", env: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=\\nCLERK_SECRET_KEY=\\nDATABASE_URL=\\nNEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in\\nNEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up" },
  { slug: "react-firebase-stripe", name: "React + Firebase + Stripe", title: "React + Firebase + Stripe .env Template", env: "REACT_APP_FIREBASE_API_KEY=\\nREACT_APP_FIREBASE_AUTH_DOMAIN=\\nREACT_APP_FIREBASE_PROJECT_ID=\\nREACT_APP_STRIPE_PUBLISHABLE_KEY=\\nSTRIPE_SECRET_KEY=" },
  { slug: "django-postgresql-redis", name: "Django + PostgreSQL + Redis", title: "Django + PostgreSQL + Redis .env Template", env: "SECRET_KEY=\\nDEBUG=True\\nDATABASE_URL=postgres://user:pass@localhost:5432/db\\nREDIS_URL=redis://localhost:6379/1" },
  { slug: "nextjs-openai-supabase", name: "Next.js + OpenAI + Supabase", title: "Next.js + OpenAI + Supabase .env Template", env: "OPENAI_API_KEY=\\nNEXT_PUBLIC_SUPABASE_URL=\\nNEXT_PUBLIC_SUPABASE_ANON_KEY=\\nSUPABASE_SERVICE_ROLE_KEY=" },
  { slug: "nodejs-mongodb-stripe", name: "Node.js + MongoDB + Stripe", title: "Node.js + MongoDB + Stripe .env Template", env: "PORT=8080\\nMONGO_URI=\\nSTRIPE_SECRET_KEY=\\nSTRIPE_WEBHOOK_SECRET=" },
  { slug: "nextjs-prisma-postgresql", name: "Next.js + Prisma + PostgreSQL", title: "Next.js + Prisma + PostgreSQL .env Template", env: "DATABASE_URL=postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public\\nDIRECT_URL=" },
  { slug: "react-supabase-clerk", name: "React + Supabase + Clerk", title: "React + Supabase + Clerk .env Template", env: "REACT_APP_SUPABASE_URL=\\nREACT_APP_SUPABASE_ANON_KEY=\\nREACT_APP_CLERK_PUBLISHABLE_KEY=" },
  { slug: "laravel-mysql-stripe", name: "Laravel + MySQL + Stripe", title: "Laravel + MySQL + Stripe .env Template", env: "APP_NAME=Laravel\\nAPP_ENV=local\\nAPP_KEY=\\nAPP_DEBUG=true\\nAPP_URL=http://localhost\\nDB_CONNECTION=mysql\\nDB_HOST=127.0.0.1\\nDB_PORT=3306\\nDB_DATABASE=laravel\\nDB_USERNAME=root\\nDB_PASSWORD=\\nSTRIPE_KEY=\\nSTRIPE_SECRET=\\nSTRIPE_WEBHOOK_SECRET=" },
  { slug: "django-redis-celery", name: "Django + Redis + Celery", title: "Django + Redis + Celery .env Template", env: "SECRET_KEY=\\nDEBUG=True\\nCELERY_BROKER_URL=redis://localhost:6379/0\\nCELERY_RESULT_BACKEND=redis://localhost:6379/0" },
  { slug: "nextjs-stripe-clerk", name: "Next.js + Stripe + Clerk", title: "Next.js + Stripe + Clerk .env Template", env: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=\\nCLERK_SECRET_KEY=\\nNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\\nSTRIPE_SECRET_KEY=\\nSTRIPE_WEBHOOK_SECRET=" },
  { slug: "nodejs-postgresql-jwt", name: "Node.js + PostgreSQL + JWT", title: "Node.js + PostgreSQL + JWT .env Template", env: "PORT=3000\\nDATABASE_URL=postgres://user:pass@localhost:5432/db\\nJWT_SECRET=\\nJWT_EXPIRES_IN=7d" },
  { slug: "nextjs-resend-supabase", name: "Next.js + Resend + Supabase", title: "Next.js + Resend + Supabase .env Template", env: "RESEND_API_KEY=\\nNEXT_PUBLIC_SUPABASE_URL=\\nNEXT_PUBLIC_SUPABASE_ANON_KEY=" },
  { slug: "react-openai-firebase", name: "React + OpenAI + Firebase", title: "React + OpenAI + Firebase .env Template", env: "REACT_APP_FIREBASE_API_KEY=\\nREACT_APP_FIREBASE_AUTH_DOMAIN=\\nREACT_APP_FIREBASE_PROJECT_ID=\\nOPENAI_API_KEY=" },
  { slug: "nextjs-anthropic-supabase", name: "Next.js + Anthropic Claude + Supabase", title: "Next.js + Anthropic Claude + Supabase .env Template", env: "ANTHROPIC_API_KEY=\\nNEXT_PUBLIC_SUPABASE_URL=\\nNEXT_PUBLIC_SUPABASE_ANON_KEY=" },
  { slug: "django-openai-postgresql", name: "Django + OpenAI + PostgreSQL", title: "Django + OpenAI + PostgreSQL .env Template", env: "SECRET_KEY=\\nDEBUG=True\\nDATABASE_URL=postgres://user:pass@localhost:5432/db\\nOPENAI_API_KEY=" },
  { slug: "nodejs-stripe-mongodb", name: "Node.js + Stripe + MongoDB", title: "Node.js + Stripe + MongoDB .env Template", env: "PORT=8080\\nMONGO_URI=\\nSTRIPE_SECRET_KEY=\\nSTRIPE_WEBHOOK_SECRET=" },
  { slug: "nextjs-uploadthing-supabase", name: "Next.js + Uploadthing + Supabase", title: "Next.js + Uploadthing + Supabase .env Template", env: "UPLOADTHING_SECRET=\\nUPLOADTHING_APP_ID=\\nNEXT_PUBLIC_SUPABASE_URL=\\nNEXT_PUBLIC_SUPABASE_ANON_KEY=" },
  { slug: "nextjs-sentry-stripe", name: "Next.js + Sentry + Stripe", title: "Next.js + Sentry + Stripe .env Template", env: "NEXT_PUBLIC_SENTRY_DSN=\\nSENTRY_AUTH_TOKEN=\\nNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\\nSTRIPE_SECRET_KEY=" },
  { slug: "nodejs-redis-bullmq", name: "Node.js + Redis + BullMQ", title: "Node.js + Redis + BullMQ .env Template", env: "PORT=3000\\nREDIS_HOST=127.0.0.1\\nREDIS_PORT=6379\\nREDIS_PASSWORD=" }
];

function generateContent(stack) {
  const words = [];
  words.push('<p>Building an application with <strong>' + stack.name + '</strong> provides an incredibly powerful architecture for modern web development. When developers choose this stack, they are usually aiming for rapid iteration, massive scalability, and industry-standard security. However, tying these disparate services together securely requires a flawless environment configuration.</p>');
  words.push('<p>The biggest challenge when integrating ' + stack.name + ' is ensuring that secrets meant for the server never accidentally leak to the client browser. For instance, backend connection strings, master administrative keys, and webhook secrets must be fiercely protected inside your server environments. On the flip side, certain publishable keys and public URLs must be exposed to the client to allow frontend SDKs to initialize properly.</p>');
  words.push('<p>A properly structured <code>.env</code> file acts as the secure connective tissue between your codebase and these third-party platforms. By strictly following the 12-Factor App methodology, you decouple your sensitive configuration from your source code. This means your Git repository remains clean and secure, while your application seamlessly transitions from local development to production servers.</p>');
  words.push('<p>Below is the standard, production-tested <code>.env</code> template required to run ' + stack.name + '. It includes all the essential variables you need to bootstrap your project. Remember to substitute the placeholder values with your actual dashboard credentials. Never commit this file to version control. Always utilize a <code>.env.example</code> file to onboard new developers safely.</p>');
  return words.join('\\n');
}

function generateFaqs(stack) {
  return [
    {
      q: 'What goes into my ' + stack.name + ' .env file?',
      a: 'Your environment file must contain all API keys, database connection strings, and configuration variables that differ between development and production for ' + stack.name + '. Ensure you strictly separate public frontend keys from secret backend keys.'
    },
    {
      q: 'How do I secure my ' + stack.name + ' secrets?',
      a: 'Never hardcode secrets into your source code and always add your .env file to .gitignore. Use a secret manager in production and ensure backend keys are not prefixed with client-side expose flags (like NEXT_PUBLIC_ or REACT_APP_).'
    },
    {
      q: 'Can I share my ' + stack.name + ' .env file?',
      a: 'No, you should never share your actual .env file. Instead, share a sanitized .env.example file that lists the required variable names but leaves the sensitive values blank for your team members to fill in.'
    }
  ];
}

const STACK_PAGES = stacks.map(s => {
  return {
    slug: s.slug,
    title: s.title,
    metaDesc: 'Generate a production-ready .env file template for ' + s.name + '. Includes all the exact environment variables you need to start building securely.',
    content: generateContent(s),
    envTemplate: s.env,
    faqs: generateFaqs(s)
  };
});

const output = '// Auto-generated Stack Data\\nconst STACK_PAGES = ' + JSON.stringify(STACK_PAGES, null, 2) + ';\\n';

fs.writeFileSync('stack-data.js', output, 'utf-8');
console.log('stack-data.js generated successfully.');
