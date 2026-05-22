/* ==========================================================================
   APP CONFIGURATION & DATA STRUCTURES
   ========================================================================== */

// 1. FRAMEWORKS CONFIGURATION
const FRAMEWORKS = [
  {
    id: 'nextjs',
    name: 'Next.js',
    prefixType: 'nextjs', // NEXT_PUBLIC_ for public, none for secret
    prefixText: 'NEXT_PUBLIC_',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>`
  },
  {
    id: 'vite',
    name: 'React (Vite)',
    prefixType: 'vite', // VITE_ for public, standard for secret
    prefixText: 'VITE_',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><circle cx="12" cy="12" r="4"></circle></svg>`
  },
  {
    id: 'nodejs',
    name: 'Node.js / Express',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><polyline points="12 22 12 12 22 8.5"></polyline><polyline points="12 12 2 8.5"></polyline></svg>`
  },
  {
    id: 'fastapi',
    name: 'FastAPI (Python)',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
  },
  {
    id: 'django',
    name: 'Django (Python)',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><path d="M14 9h3"></path><path d="M14 13h3"></path><path d="M14 17h3"></path></svg>`
  },
  {
    id: 'flutter',
    name: 'Flutter',
    prefixType: 'flutter', // No prefix, but custom note added
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 20 10 12 18 4 10 12 2"></polygon><polygon points="12 10 16 14 12 18 8 14 12 10"></polygon></svg>`
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>`
  },
  {
    id: 'sveltekit',
    name: 'SvelteKit',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z"></path><path d="M12 22V12"></path><path d="M22 7l-10 5L2 7"></path></svg>`
  },
  {
    id: 'nuxtjs',
    name: 'Nuxt.js',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 20 12 4 18 20 6 20"></polygon><polygon points="12 20 16 9 20 20 12 20"></polygon></svg>`
  },
  {
    id: 'laravel',
    name: 'Laravel',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
  },
  {
    id: 'go',
    name: 'Go (Gin / Fiber)',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="10 8 14 12 10 16"></polyline></svg>`
  },
  {
    id: 'rust',
    name: 'Rust (Actix-web)',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 19.07 4.93 22 12 19.07 19.07 12 22 4.93 19.07 2 12 4.93 4.93 12 2"></polygon><circle cx="12" cy="12" r="3"></circle></svg>`
  },
  {
    id: 'rails',
    name: 'Ruby on Rails',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 12 22 2 8.5 12 2"></polygon><polyline points="2 8.5 12 12 22 8.5"></polyline><line x1="12" y1="12" x2="12" y2="22"></line></svg>`
  },
  {
    id: 'springboot',
    name: 'Spring Boot (Java)',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c5.523 0 10 4.477 10 10S17.523 22 12 22 2 17.523 2 12 6.477 2 12 2z"></path><path d="M12 2a15.3 15.3 0 0 1 0 20"></path></svg>`
  },
  {
    id: 'aspnet',
    name: 'ASP.NET Core (C#)',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect><line x1="8" y1="8" x2="16" y2="16"></line><line x1="16" y1="8" x2="8" y2="16"></line></svg>`
  },
  {
    id: 'phoenix',
    name: 'Phoenix (Elixir)',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 18 12 14 2 18 12 2"></polygon><line x1="12" y1="2" x2="12" y2="14"></line></svg>`
  },
  {
    id: 'remix',
    name: 'Remix',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="9" width="12" height="12" rx="2"></rect><rect x="9" y="3" width="12" height="12" rx="2"></rect></svg>`
  },
  {
    id: 'astro',
    name: 'Astro',
    prefixType: 'astro',
    prefixText: 'PUBLIC_',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 18 18 12 14 6 18 12 2"></polygon><line x1="8" y1="20" x2="16" y2="20"></line></svg>`
  },
  {
    id: 'bun',
    name: 'Bun (Elysia)',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M4 12c4-2 12-2 16 0"></path></svg>`
  },
  {
    id: 'ktor',
    name: 'Kotlin (Ktor)',
    prefixType: 'none',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="2 2 12 2 22 12 22 22 12 22 2 12 2 2"></polygon><line x1="2" y1="2" x2="22" y2="22"></line></svg>`
  }
];

// 2. SERVICES CONFIGURATION (GROUPED BY CATEGORY)
const SERVICES = [
  // 🗄️ DATABASE
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'DATABASE',
    variables: [
      { name: 'DATABASE_URL', type: 'secret', placeholder: 'postgresql://postgres:postgres@localhost:5432/my_database', comment: 'Connection string for PostgreSQL client pools', docUrl: 'https://www.postgresql.org/docs/' }
    ]
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'DATABASE',
    variables: [
      { name: 'MONGODB_URI', type: 'secret', placeholder: 'mongodb+srv://admin:secure_pwd@cluster.mongodb.net/prod', comment: 'Atlas serverless connection URI', docUrl: 'https://www.mongodb.com/cloud/atlas' }
    ]
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'DATABASE',
    variables: [
      { name: 'DATABASE_URL', type: 'secret', placeholder: 'mysql://root:password@localhost:3306/prod_db', comment: 'MySQL database credential URL', docUrl: 'https://dev.mysql.com/doc/' }
    ]
  },
  {
    id: 'supabase_db',
    name: 'Supabase',
    category: 'DATABASE',
    variables: [
      { name: 'SUPABASE_URL', type: 'public', placeholder: 'https://project-ref.supabase.co', comment: 'Supabase client REST interface gateway', docUrl: 'https://supabase.com/dashboard/project/_/settings/api' },
      { name: 'SUPABASE_ANON_KEY', type: 'public', placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.anon_token', comment: 'Client-safe anonymous API gateway key', docUrl: 'https://supabase.com/dashboard/project/_/settings/api' }
    ]
  },
  {
    id: 'planetscale',
    name: 'PlanetScale',
    category: 'DATABASE',
    variables: [
      { name: 'DATABASE_URL', type: 'secret', placeholder: 'mysql://username:pscale_pwd@aws.connect.psdb.co/db?sslaccept=strict', comment: 'PlanetScale secure MySQL tunnel connection string', docUrl: 'https://planetscale.com/' }
    ]
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'DATABASE',
    variables: [
      { name: 'REDIS_URL', type: 'secret', placeholder: 'redis://default:strong_redis_auth@redis-cloud.com:6379', comment: 'Redis cluster cache connection URL', docUrl: 'https://redis.io/' }
    ]
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    category: 'DATABASE',
    disabled: true,
    tooltip: 'SQLite is stored in a local flat file. No environment variables are needed.',
    variables: []
  },
  {
    id: 'neon',
    name: 'Neon',
    category: 'DATABASE',
    variables: [
      { name: 'NEON_DATABASE_URL', type: 'secret', placeholder: 'postgresql://neondb_owner:secure_pwd@ep-cool-snowflake-a5o1xyz.us-east-2.aws.neon.tech/neondb?sslmode=require', comment: 'Neon Serverless PostgreSQL connection string with pooling', docUrl: 'https://console.neon.tech/' },
      { name: 'NEON_DIRECT_URL', type: 'secret', placeholder: 'postgresql://neondb_owner:secure_pwd@ep-cool-snowflake-a5o1xyz.us-east-2.aws.neon.tech/neondb?sslmode=require', comment: 'Neon non-pooled direct connection URL for migrations', docUrl: 'https://console.neon.tech/' }
    ]
  },
  {
    id: 'turso',
    name: 'Turso',
    category: 'DATABASE',
    variables: [
      { name: 'TURSO_DATABASE_URL', type: 'secret', placeholder: 'libsql://my-db-username.turso.io', comment: 'Turso LibSQL SQLite database cloud URL', docUrl: 'https://turso.tech/' },
      { name: 'TURSO_AUTH_TOKEN', type: 'secret', placeholder: 'ts_auth_token_cool_hash_value_99', comment: 'Turso database authorization bearer token', docUrl: 'https://turso.tech/' }
    ]
  },
  {
    id: 'cockroachdb',
    name: 'CockroachDB',
    category: 'DATABASE',
    variables: [
      { name: 'COCKROACH_DATABASE_URL', type: 'secret', placeholder: 'postgresql://admin:password@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full', comment: 'CockroachDB serverless connection string', docUrl: 'https://cockroachlabs.cloud/' }
    ]
  },
  {
    id: 'dynamodb',
    name: 'DynamoDB',
    category: 'DATABASE',
    variables: [
      { name: 'AWS_DYNAMODB_TABLE', type: 'secret', placeholder: 'prod-users-table', comment: 'AWS DynamoDB table target name', docUrl: 'https://console.aws.amazon.com/dynamodb' },
      { name: 'AWS_REGION', type: 'secret', placeholder: 'us-east-1', comment: 'AWS infrastructure region', docUrl: 'https://console.aws.amazon.com/dynamodb' },
      { name: 'AWS_ACCESS_KEY_ID', type: 'secret', placeholder: 'AKIA_DYNAMODB_USER_ACCESS_KEY', comment: 'AWS access key identification token', docUrl: 'https://console.aws.amazon.com/iam' },
      { name: 'AWS_SECRET_ACCESS_KEY', type: 'secret', placeholder: 'aws_secret_iam_credentials_signature_token', comment: 'AWS secret access key validation credential', docUrl: 'https://console.aws.amazon.com/iam' }
    ]
  },
  {
    id: 'firestore',
    name: 'Firebase Firestore',
    category: 'DATABASE',
    variables: [
      { name: 'FIREBASE_PROJECT_ID', type: 'public', placeholder: 'my-firestore-project-id', comment: 'Firebase project identifier', docUrl: 'https://console.firebase.google.com/' },
      { name: 'FIREBASE_PRIVATE_KEY', type: 'secret', placeholder: '-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQ...', comment: 'Firebase Service Account private key JSON format', docUrl: 'https://console.firebase.google.com/' },
      { name: 'FIREBASE_CLIENT_EMAIL', type: 'secret', placeholder: 'firebase-adminsdk-cool@my-project.iam.gserviceaccount.com', comment: 'Firebase Service Account admin email', docUrl: 'https://console.firebase.google.com/' }
    ]
  },
  {
    id: 'elasticsearch',
    name: 'Elasticsearch',
    category: 'DATABASE',
    variables: [
      { name: 'ELASTICSEARCH_NODE', type: 'secret', placeholder: 'https://elasticsearch-production.cool.us-east-1.aws.found.io:9243', comment: 'Elasticsearch node cloud instance cluster URL', docUrl: 'https://cloud.elastic.co/' },
      { name: 'ELASTICSEARCH_API_KEY', type: 'secret', placeholder: 'elastic_api_key_auth_base64', comment: 'Elasticsearch secure cluster authentication key', docUrl: 'https://cloud.elastic.co/' }
    ]
  },
  {
    id: 'fauna',
    name: 'Fauna',
    category: 'DATABASE',
    variables: [
      { name: 'FAUNA_SECRET', type: 'secret', placeholder: 'fnAEoCoolFaunaSecretKeyValString_99', comment: 'Fauna database access verification secret', docUrl: 'https://dashboard.fauna.com/' }
    ]
  },

  // 🔐 AUTHENTICATION
  {
    id: 'clerk',
    name: 'Clerk',
    category: 'AUTHENTICATION',
    variables: [
      { name: 'CLERK_PUBLISHABLE_KEY', type: 'public', placeholder: 'pk_test_Y2xlcmsuYXBwJC', comment: 'Clerk client browser routing publishable credential key', docUrl: 'https://dashboard.clerk.com/' },
      { name: 'CLERK_SECRET_KEY', type: 'secret', placeholder: 'sk_test_clerk_secret_key_prod_99', comment: 'Clerk backend user management verification key', docUrl: 'https://dashboard.clerk.com/' }
    ]
  },
  {
    id: 'nextauth',
    name: 'NextAuth / Auth.js',
    category: 'AUTHENTICATION',
    variables: [
      { name: 'NEXTAUTH_SECRET', type: 'secret', placeholder: 'generate_with_openssl_rand_base64_32', comment: 'Cryptographic salt utilized for secure JWT payload sealing', docUrl: 'https://authjs.dev/reference/installation' },
      { name: 'NEXTAUTH_URL', type: 'secret', placeholder: 'http://localhost:3000', comment: 'Primary callback origin base path URL for identity redirects', docUrl: 'https://authjs.dev/reference/installation' }
    ]
  },
  {
    id: 'firebase_auth',
    name: 'Firebase Auth',
    category: 'AUTHENTICATION',
    variables: [
      { name: 'FIREBASE_API_KEY', type: 'public', placeholder: 'AIzaSyA123_FirebaseBrowserKey', comment: 'Firebase developer API client identification key', docUrl: 'https://console.firebase.google.com/' },
      { name: 'FIREBASE_AUTH_DOMAIN', type: 'public', placeholder: 'my-project.firebaseapp.com', comment: 'Primary authorization redirect callback domain', docUrl: 'https://console.firebase.google.com/' },
      { name: 'FIREBASE_PROJECT_ID', type: 'public', placeholder: 'my-project-id', comment: 'Global identity identifier for Google Cloud engine', docUrl: 'https://console.firebase.google.com/' }
    ]
  },
  {
    id: 'supabase_auth',
    name: 'Supabase Auth',
    category: 'AUTHENTICATION',
    variables: [
      { name: 'SUPABASE_JWT_SECRET', type: 'secret', placeholder: 'supabase_jwt_verification_signature_secret', comment: 'Cryptographic token validation algorithm signature', docUrl: 'https://supabase.com/dashboard/project/_/settings/api' }
    ]
  },
  {
    id: 'auth0',
    name: 'Auth0',
    category: 'AUTHENTICATION',
    variables: [
      { name: 'AUTH0_SECRET', type: 'secret', placeholder: 'generate_long_random_cryptographic_secret', comment: 'Cryptographic token signing salt', docUrl: 'https://manage.auth0.com/' },
      { name: 'AUTH0_BASE_URL', type: 'secret', placeholder: 'http://localhost:3000', comment: 'Root redirect link of the application', docUrl: 'https://manage.auth0.com/' },
      { name: 'AUTH0_ISSUER_BASE_URL', type: 'public', placeholder: 'https://your-tenant.auth0.com', comment: 'Primary verification authority issuer URL', docUrl: 'https://manage.auth0.com/' },
      { name: 'AUTH0_CLIENT_ID', type: 'public', placeholder: 'auth0_client_id_hex_key', comment: 'Unique browser identifier for client logins', docUrl: 'https://manage.auth0.com/' }
    ]
  },
  {
    id: 'jwt',
    name: 'JWT (Custom)',
    category: 'AUTHENTICATION',
    variables: [
      { name: 'JWT_SECRET', type: 'secret', placeholder: 'local_high_entropy_signing_token_secret', comment: 'Custom JSON Web Token validation secret', docUrl: 'https://jwt.io/' },
      { name: 'JWT_EXPIRES_IN', type: 'secret', placeholder: '7d', comment: 'Default token validity timespan duration', docUrl: 'https://jwt.io/' }
    ]
  },
  {
    id: 'kinde',
    name: 'Kinde',
    category: 'AUTHENTICATION',
    variables: [
      { name: 'KINDE_CLIENT_ID', type: 'public', placeholder: 'kinde_client_id_hex_key', comment: 'Kinde client application identifier', docUrl: 'https://kinde.com/' },
      { name: 'KINDE_CLIENT_SECRET', type: 'secret', placeholder: 'kinde_client_secret_signing_token', comment: 'Kinde client application secret', docUrl: 'https://kinde.com/' },
      { name: 'KINDE_ISSUER_URL', type: 'public', placeholder: 'https://your-tenant.kinde.com', comment: 'Kinde authorization server URL', docUrl: 'https://kinde.com/' }
    ]
  },
  {
    id: 'cognito',
    name: 'AWS Cognito',
    category: 'AUTHENTICATION',
    variables: [
      { name: 'COGNITO_USER_POOL_ID', type: 'secret', placeholder: 'us-east-1_coolPoolId', comment: 'AWS Cognito User Pool identifier', docUrl: 'https://console.aws.amazon.com/cognito' },
      { name: 'COGNITO_CLIENT_ID', type: 'public', placeholder: 'cognito_app_client_id_hex_key', comment: 'AWS Cognito App Client identifier', docUrl: 'https://console.aws.amazon.com/cognito' }
    ]
  },
  {
    id: 'workos',
    name: 'WorkOS',
    category: 'AUTHENTICATION',
    variables: [
      { name: 'WORKOS_API_KEY', type: 'secret', placeholder: 'sk_test_workos_api_key_auth_99', comment: 'WorkOS API authorization key', docUrl: 'https://dashboard.workos.com/' },
      { name: 'WORKOS_CLIENT_ID', type: 'public', placeholder: 'project_workos_client_id_hex', comment: 'WorkOS project client application identifier', docUrl: 'https://dashboard.workos.com/' }
    ]
  },
  {
    id: 'keycloak',
    name: 'Keycloak',
    category: 'AUTHENTICATION',
    variables: [
      { name: 'KEYCLOAK_REALM', type: 'public', placeholder: 'my-realm', comment: 'Keycloak tenant realm identifier', docUrl: 'https://www.keycloak.org/' },
      { name: 'KEYCLOAK_URL', type: 'public', placeholder: 'https://keycloak.yourdomain.com', comment: 'Keycloak host authentication server endpoint', docUrl: 'https://www.keycloak.org/' },
      { name: 'KEYCLOAK_CLIENT_ID', type: 'public', placeholder: 'my-client-app', comment: 'Keycloak client identification tag', docUrl: 'https://www.keycloak.org/' },
      { name: 'KEYCLOAK_CLIENT_SECRET', type: 'secret', placeholder: 'keycloak_client_secret_signature_key', comment: 'Keycloak server credentials verify secret', docUrl: 'https://www.keycloak.org/' }
    ]
  },
  {
    id: 'magiclink',
    name: 'Magic Link',
    category: 'AUTHENTICATION',
    variables: [
      { name: 'MAGIC_PUBLISHABLE_KEY', type: 'public', placeholder: 'pk_live_MagicBrowserPublishableKeyString', comment: 'Magic client SDK publishable authorization key', docUrl: 'https://dashboard.magic.link/' },
      { name: 'MAGIC_SECRET_KEY', type: 'secret', placeholder: 'sk_live_MagicBackendMerchantSecretKey', comment: 'Magic backend token verify key', docUrl: 'https://dashboard.magic.link/' }
    ]
  },
  {
    id: 'lucia',
    name: 'Lucia Auth',
    category: 'AUTHENTICATION',
    variables: [
      { name: 'AUTH_SECRET', type: 'secret', placeholder: 'lucia_auth_session_verification_salt_hash_64', comment: 'Lucia Session verification cryptographic signing salt', docUrl: 'https://lucia-auth.com/' }
    ]
  },

  // 💳 PAYMENTS
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'PAYMENTS',
    variables: [
      { name: 'STRIPE_PUBLISHABLE_KEY', type: 'public', placeholder: 'pk_test_51stripe_publishable_token', comment: 'Stripe client UI elements checkout gateway key', docUrl: 'https://dashboard.stripe.com/apikeys' },
      { name: 'STRIPE_SECRET_KEY', type: 'secret', placeholder: 'sk_test_51stripe_backend_secret_token', comment: 'Stripe server charge and customer processing key', docUrl: 'https://dashboard.stripe.com/apikeys' },
      { name: 'STRIPE_WEBHOOK_SECRET', type: 'secret', placeholder: 'whsec_stripe_event_signing_secret', comment: 'Webhook digital signature verification secret', docUrl: 'https://dashboard.stripe.com/webhooks' }
    ]
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    category: 'PAYMENTS',
    variables: [
      { name: 'RAZORPAY_KEY_ID', type: 'public', placeholder: 'rzp_test_public_key_88', comment: 'Razorpay client integration key identifier', docUrl: 'https://dashboard.razorpay.com/app/keys' },
      { name: 'RAZORPAY_KEY_SECRET', type: 'secret', placeholder: 'rzp_test_secret_key_auth_99', comment: 'Razorpay backend merchant ledger authorization key', docUrl: 'https://dashboard.razorpay.com/app/keys' }
    ]
  },
  {
    id: 'lemonsqueezy',
    name: 'Lemon Squeezy',
    category: 'PAYMENTS',
    variables: [
      { name: 'LEMON_SQUEEZY_API_KEY', type: 'secret', placeholder: 'lemon_squeezy_api_token_signature_99', comment: 'Lemon Squeezy merchant subscription authorization key', docUrl: 'https://app.lemonsqueezy.com/settings/api-tokens' },
      { name: 'LEMON_SQUEEZY_STORE_ID', type: 'secret', placeholder: 'lemon_store_id_numeric_99', comment: 'Merchant store selector identity number', docUrl: 'https://app.lemonsqueezy.com/settings/stores' }
    ]
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'PAYMENTS',
    variables: [
      { name: 'PAYPAL_CLIENT_ID', type: 'public', placeholder: 'paypal_client_id_hex_token_99', comment: 'PayPal developer sandbox/live app identifier', docUrl: 'https://developer.paypal.com/dashboard/' },
      { name: 'PAYPAL_CLIENT_SECRET', type: 'secret', placeholder: 'paypal_merchant_secret_auth_token', comment: 'PayPal merchant credentials processing token', docUrl: 'https://developer.paypal.com/dashboard/' }
    ]
  },
  {
    id: 'cashfree',
    name: 'Cashfree',
    category: 'PAYMENTS',
    variables: [
      { name: 'CASHFREE_APP_ID', type: 'public', placeholder: 'CF_TEST_APP_ID_HEX_VALUE', comment: 'Cashfree merchant application ID', docUrl: 'https://merchant.cashfree.com/' },
      { name: 'CASHFREE_SECRET_KEY', type: 'secret', placeholder: 'cf_test_secret_key_auth_signature_token', comment: 'Cashfree merchant ledger verification key', docUrl: 'https://merchant.cashfree.com/' }
    ]
  },
  {
    id: 'payu',
    name: 'PayU',
    category: 'PAYMENTS',
    variables: [
      { name: 'PAYU_MERCHANT_KEY', type: 'public', placeholder: 'payu_merchant_key_alphanumeric', comment: 'PayU merchant gateway key identifier', docUrl: 'https://dashboard.payu.in/' },
      { name: 'PAYU_MERCHANT_SALT', type: 'secret', placeholder: 'payu_merchant_salt_signature_token', comment: 'PayU cryptographic hashing salt signature', docUrl: 'https://dashboard.payu.in/' }
    ]
  },
  {
    id: 'paytm',
    name: 'Paytm',
    category: 'PAYMENTS',
    variables: [
      { name: 'PAYTM_MID', type: 'public', placeholder: 'PaytmMerchantIdString012345', comment: 'Paytm merchant enterprise identifier', docUrl: 'https://dashboard.paytm.com/' },
      { name: 'PAYTM_MERCHANT_KEY', type: 'secret', placeholder: 'paytm_merchant_secret_auth_token', comment: 'Paytm checksum signature verification key', docUrl: 'https://dashboard.paytm.com/' }
    ]
  },
  {
    id: 'paddle',
    name: 'Paddle',
    category: 'PAYMENTS',
    variables: [
      { name: 'PADDLE_CLIENT_TOKEN', type: 'public', placeholder: 'pt_test_PaddleClientTokenForCheckout', comment: 'Paddle client checkout integration public key', docUrl: 'https://vendor.paddle.com/' },
      { name: 'PADDLE_API_KEY', type: 'secret', placeholder: 'paddle_api_key_secret_signature_99', comment: 'Paddle API merchant billing key', docUrl: 'https://vendor.paddle.com/' }
    ]
  },
  {
    id: 'braintree',
    name: 'Braintree',
    category: 'PAYMENTS',
    variables: [
      { name: 'BRAINTREE_MERCHANT_ID', type: 'public', placeholder: 'braintree_merchant_id_alphanumeric', comment: 'Braintree merchant account identifier', docUrl: 'https://www.braintreepayments.com/' },
      { name: 'BRAINTREE_PUBLIC_KEY', type: 'public', placeholder: 'braintree_public_key_identifier', comment: 'Braintree gateway integration key', docUrl: 'https://www.braintreepayments.com/' },
      { name: 'BRAINTREE_PRIVATE_KEY', type: 'secret', placeholder: 'braintree_private_key_signature_token', comment: 'Braintree billing verification secret key', docUrl: 'https://www.braintreepayments.com/' }
    ]
  },
  {
    id: 'square',
    name: 'Square',
    category: 'PAYMENTS',
    variables: [
      { name: 'SQUARE_APPLICATION_ID', type: 'public', placeholder: 'sandbox-sq0idb-SquareAppIdentifier', comment: 'Square application credential client identifier', docUrl: 'https://developer.squareup.com/' },
      { name: 'SQUARE_ACCESS_TOKEN', type: 'secret', placeholder: 'EAAAESquareAccessTokenSecretValue_99', comment: 'Square merchant API authorization token', docUrl: 'https://developer.squareup.com/' }
    ]
  },
  {
    id: 'instamojo',
    name: 'Instamojo',
    category: 'PAYMENTS',
    variables: [
      { name: 'INSTAMOJO_API_KEY', type: 'public', placeholder: 'instamojo_api_key_public_identifier', comment: 'Instamojo API account gateway key', docUrl: 'https://dashboard.instamojo.com/' },
      { name: 'INSTAMOJO_AUTH_TOKEN', type: 'secret', placeholder: 'instamojo_auth_token_signature_99', comment: 'Instamojo billing ledger authorization token', docUrl: 'https://dashboard.instamojo.com/' }
    ]
  },

  // 🤖 AI & LLMs
  {
    id: 'openai',
    name: 'OpenAI (GPT)',
    category: 'AI & LLMs',
    variables: [
      { name: 'OPENAI_API_KEY', type: 'secret', placeholder: 'sk-proj-openai_assistant_tokens_99', comment: 'OpenAI Developer platform API workspace key', docUrl: 'https://platform.openai.com/api-keys' }
    ]
  },
  {
    id: 'anthropic',
    name: 'Anthropic (Claude)',
    category: 'AI & LLMs',
    variables: [
      { name: 'ANTHROPIC_API_KEY', type: 'secret', placeholder: 'sk-ant-api03-anthropic_tokens', comment: 'Anthropic Claude model processing console key', docUrl: 'https://console.anthropic.com/settings/keys' }
    ]
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'AI & LLMs',
    variables: [
      { name: 'GEMINI_API_KEY', type: 'secret', placeholder: 'AIzaSy_GoogleGeminiDeveloperKey', comment: 'Google AI Studio multi-modal API console key', docUrl: 'https://aistudio.google.com/app/apikey' }
    ]
  },
  {
    id: 'groq',
    name: 'Groq',
    category: 'AI & LLMs',
    variables: [
      { name: 'GROQ_API_KEY', type: 'secret', placeholder: 'gsk_groq_ultra_low_latency_key', comment: 'Groq Cloud inference hardware API acceleration token', docUrl: 'https://console.groq.com/keys' }
    ]
  },
  {
    id: 'mistral',
    name: 'Mistral',
    category: 'AI & LLMs',
    variables: [
      { name: 'MISTRAL_API_KEY', type: 'secret', placeholder: 'mistral_la_plateforme_api_token', comment: 'Mistral AI developers portal workspace access key', docUrl: 'https://console.mistral.ai/api-keys/' }
    ]
  },
  {
    id: 'replicate',
    name: 'Replicate',
    category: 'AI & LLMs',
    variables: [
      { name: 'REPLICATE_API_TOKEN', type: 'secret', placeholder: 'r8_replicate_model_inference_token', comment: 'Replicate cloud infrastructure model execution token', docUrl: 'https://replicate.com/account/api-tokens' }
    ]
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    category: 'AI & LLMs',
    variables: [
      { name: 'HF_ACCESS_TOKEN', type: 'secret', placeholder: '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', comment: 'HuggingFace inference API hub credential key', docUrl: 'https://huggingface.co/settings/tokens' }
    ]
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    category: 'AI & LLMs',
    variables: [
      { name: 'DEEPSEEK_API_KEY', type: 'secret', placeholder: 'sk-deepseek-developer-inference-key-88', comment: 'DeepSeek LLM developer engine token', docUrl: 'https://platform.deepseek.com/' }
    ]
  },
  {
    id: 'grok',
    name: 'xAI Grok',
    category: 'AI & LLMs',
    variables: [
      { name: 'XAI_API_KEY', type: 'secret', placeholder: 'xai-grok-developer-inference-api-key-99', comment: 'xAI Grok model processing gateway token', docUrl: 'https://console.x.ai/' }
    ]
  },
  {
    id: 'cohere',
    name: 'Cohere',
    category: 'AI & LLMs',
    variables: [
      { name: 'COHERE_API_KEY', type: 'secret', placeholder: 'cohere_developer_nlp_inference_api_key', comment: 'Cohere industrial NLP processing API key', docUrl: 'https://dashboard.cohere.com/' }
    ]
  },
  {
    id: 'together',
    name: 'Together AI',
    category: 'AI & LLMs',
    variables: [
      { name: 'TOGETHER_API_KEY', type: 'secret', placeholder: 'together_ai_cloud_inference_api_key_99', comment: 'Together AI cloud serverless GPU backend API key', docUrl: 'https://api.together.xyz/' }
    ]
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'AI & LLMs',
    variables: [
      { name: 'ELEVENLABS_API_KEY', type: 'secret', placeholder: 'elevenlabs_voice_synthesis_api_key', comment: 'ElevenLabs AI voice generation access token', docUrl: 'https://elevenlabs.io/' }
    ]
  },
  {
    id: 'stability',
    name: 'Stability AI',
    category: 'AI & LLMs',
    variables: [
      { name: 'STABILITY_API_KEY', type: 'secret', placeholder: 'sk-stability-image-generation-token-99', comment: 'Stability AI Diffusion engine developer API key', docUrl: 'https://platform.stability.ai/' }
    ]
  },
  {
    id: 'fal',
    name: 'Fal.ai',
    category: 'AI & LLMs',
    variables: [
      { name: 'FAL_KEY', type: 'secret', placeholder: 'fal_key_secure_media_generation_api_token', comment: 'Fal.ai high-speed model execution token', docUrl: 'https://fal.ai/dashboard' }
    ]
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    category: 'AI & LLMs',
    variables: [
      { name: 'PERPLEXITY_API_KEY', type: 'secret', placeholder: 'pplx-perplexity-search-llm-api-key-88', comment: 'Perplexity Search LLM API gateway token', docUrl: 'https://docs.perplexity.ai/' }
    ]
  },

  // 📦 STORAGE
  {
    id: 'awss3',
    name: 'AWS S3',
    category: 'STORAGE',
    variables: [
      { name: 'AWS_ACCESS_KEY_ID', type: 'secret', placeholder: 'AKIA_AWS_IAM_USER_ACCESS_KEY', comment: 'AWS root developer user identification token', docUrl: 'https://console.aws.amazon.com/iam/home' },
      { name: 'AWS_SECRET_ACCESS_KEY', type: 'secret', placeholder: 'aws_secret_iam_credentials_signature_token', comment: 'AWS IAM user authorization password', docUrl: 'https://console.aws.amazon.com/iam/home' },
      { name: 'AWS_REGION', type: 'secret', placeholder: 'us-east-1', comment: 'Standard AWS infrastructure availability region', docUrl: 'https://docs.aws.amazon.com/general/latest/gr/rande.html' },
      { name: 'AWS_S3_BUCKET', type: 'secret', placeholder: 'my-production-s3-bucket-name', comment: 'Target AWS Simple Storage Service bucket store name', docUrl: 'https://console.aws.amazon.com/s3/' }
    ]
  },
  {
    id: 'cloudinary',
    name: 'Cloudinary',
    category: 'STORAGE',
    variables: [
      { name: 'CLOUDINARY_CLOUD_NAME', type: 'public', placeholder: 'cloudinary_user_cloud_name', comment: 'Cloudinary public media distribution asset host name', docUrl: 'https://dashboard.cloudinary.com/' },
      { name: 'CLOUDINARY_API_KEY', type: 'secret', placeholder: 'cloudinary_merchant_id_key', comment: 'Cloudinary media upload client api identifier', docUrl: 'https://dashboard.cloudinary.com/' },
      { name: 'CLOUDINARY_API_SECRET', type: 'secret', placeholder: 'cloudinary_backend_upload_signing_secret', comment: 'Cloudinary upload verification cryptographic signature', docUrl: 'https://dashboard.cloudinary.com/' }
    ]
  },
  {
    id: 'supabase_storage',
    name: 'Supabase Storage',
    category: 'STORAGE',
    variables: [
      { name: 'SUPABASE_STORAGE_BUCKET', type: 'secret', placeholder: 'avatars-profile-bucket', comment: 'Supabase storage engine static upload bucket name', docUrl: 'https://supabase.com/dashboard/project/_/storage/buckets' }
    ]
  },
  {
    id: 'uploadthing',
    name: 'Uploadthing',
    category: 'STORAGE',
    variables: [
      { name: 'UPLOADTHING_SECRET', type: 'secret', placeholder: 'sk_live_uploadthing_signing_key', comment: 'Uploadthing API credentials engine key', docUrl: 'https://uploadthing.com/dashboard/' },
      { name: 'UPLOADTHING_APP_ID', type: 'secret', placeholder: 'uploadthing_app_hex_identifier', comment: 'Uploadthing server workspace identification key', docUrl: 'https://uploadthing.com/dashboard/' }
    ]
  },
  {
    id: 'gcs',
    name: 'Google Cloud Storage',
    category: 'STORAGE',
    variables: [
      { name: 'GCS_PROJECT_ID', type: 'public', placeholder: 'my-gcs-project-id', comment: 'Google Cloud Storage project identity', docUrl: 'https://console.cloud.google.com/storage' },
      { name: 'GCS_KEY_FILE', type: 'secret', placeholder: 'path/to/gcs-key-file.json', comment: 'Local file system path to GCS IAM Service Account key', docUrl: 'https://console.cloud.google.com/storage' },
      { name: 'GCS_BUCKET', type: 'secret', placeholder: 'my-production-gcs-bucket-name', comment: 'Google Cloud Storage bucket identification tag', docUrl: 'https://console.cloud.google.com/storage' }
    ]
  },
  {
    id: 'azureblob',
    name: 'Azure Blob Storage',
    category: 'STORAGE',
    variables: [
      { name: 'AZURE_STORAGE_CONNECTION_STRING', type: 'secret', placeholder: 'DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=azure_secret_storage_key_99;EndpointSuffix=core.windows.net', comment: 'Azure Storage blob engine unified connection credential', docUrl: 'https://portal.azure.com/' },
      { name: 'AZURE_STORAGE_CONTAINER', type: 'secret', placeholder: 'my-production-blob-container-name', comment: 'Azure storage target container name', docUrl: 'https://portal.azure.com/' }
    ]
  },
  {
    id: 'backblazeb2',
    name: 'Backblaze B2',
    category: 'STORAGE',
    variables: [
      { name: 'B2_APPLICATION_KEY_ID', type: 'secret', placeholder: 'b2_app_key_id_hex_string', comment: 'Backblaze B2 API developer identifier', docUrl: 'https://www.backblaze.com/b2/cloud-storage.html' },
      { name: 'B2_APPLICATION_KEY', type: 'secret', placeholder: 'b2_app_key_secret_signature_99', comment: 'Backblaze B2 application authorization credential', docUrl: 'https://www.backblaze.com/b2/cloud-storage.html' },
      { name: 'B2_BUCKET_NAME', type: 'secret', placeholder: 'my-production-b2-bucket', comment: 'Backblaze B2 bucket identification tag', docUrl: 'https://www.backblaze.com/b2/cloud-storage.html' }
    ]
  },
  {
    id: 'imagekit',
    name: 'ImageKit',
    category: 'STORAGE',
    variables: [
      { name: 'IMAGEKIT_PUBLIC_KEY', type: 'public', placeholder: 'public_ImageKitClientPublishableKeyString', comment: 'ImageKit client browser uploads public credential', docUrl: 'https://imagekit.io/' },
      { name: 'IMAGEKIT_PRIVATE_KEY', type: 'secret', placeholder: 'private_ImageKitBackendServerUploadSecretKey', comment: 'ImageKit server charge and file processing secret', docUrl: 'https://imagekit.io/' },
      { name: 'IMAGEKIT_URL_ENDPOINT', type: 'public', placeholder: 'https://ik.imagekit.io/my_imagekit_id', comment: 'ImageKit primary assets media CDN base URL', docUrl: 'https://imagekit.io/' }
    ]
  },
  {
    id: 'pinata',
    name: 'Pinata',
    category: 'STORAGE',
    variables: [
      { name: 'PINATA_JWT', type: 'secret', placeholder: 'pinata_ipfs_jwt_secret_token_value_99', comment: 'Pinata IPFS pinning gateway authorization JSON Web Token', docUrl: 'https://app.pinata.cloud/' },
      { name: 'PINATA_GATEWAY', type: 'public', placeholder: 'https://gateway.pinata.cloud/ipfs/', comment: 'Pinata public IPFS asset delivery gate URL', docUrl: 'https://app.pinata.cloud/' }
    ]
  },
  {
    id: 'bunnycdn',
    name: 'Bunny CDN',
    category: 'STORAGE',
    variables: [
      { name: 'BUNNY_STORAGE_API_KEY', type: 'secret', placeholder: 'bunny_storage_access_secret_key_88', comment: 'Bunny CDN Storage Zone authorization key', docUrl: 'https://bunny.net/' },
      { name: 'BUNNY_STORAGE_ZONE', type: 'secret', placeholder: 'my-storage-zone-name', comment: 'Bunny CDN Storage Zone namespace target', docUrl: 'https://bunny.net/' }
    ]
  },

  // 📧 EMAIL
  {
    id: 'resend',
    name: 'Resend',
    category: 'EMAIL',
    variables: [
      { name: 'RESEND_API_KEY', type: 'secret', placeholder: 're_resend_marketing_api_signing_key', comment: 'Resend high-performance transaction email server token', docUrl: 'https://resend.com/api-keys' }
    ]
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    category: 'EMAIL',
    variables: [
      { name: 'SENDGRID_API_KEY', type: 'secret', placeholder: 'SG.SendgridMailAuthTokenForSecureEmails', comment: 'SendGrid transactional marketing API gateway key', docUrl: 'https://app.sendgrid.com/settings/api_keys' }
    ]
  },
  {
    id: 'nodemailer',
    name: 'Nodemailer (SMTP)',
    category: 'EMAIL',
    variables: [
      { name: 'SMTP_HOST', type: 'secret', placeholder: 'sandbox.smtp.mailtrap.io', comment: 'Nodemailer custom host gateway address URL', docUrl: 'https://nodemailer.com/about/' },
      { name: 'SMTP_PORT', type: 'secret', placeholder: '2525', comment: 'Nodemailer connection gateway port number', docUrl: 'https://nodemailer.com/about/' },
      { name: 'SMTP_USER', type: 'secret', placeholder: 'smtp_auth_user_uuid', comment: 'SMTP authorization account mailbox identifier', docUrl: 'https://nodemailer.com/about/' },
      { name: 'SMTP_PASSWORD', type: 'secret', placeholder: 'smtp_auth_password_uuid', comment: 'SMTP authorization mailbox account password', docUrl: 'https://nodemailer.com/about/' }
    ]
  },
  {
    id: 'postmark',
    name: 'Postmark',
    category: 'EMAIL',
    variables: [
      { name: 'POSTMARK_SERVER_TOKEN', type: 'secret', placeholder: 'postmark_transactional_server_auth_token', comment: 'Postmark transactional routing mailbox signature key', docUrl: 'https://postmarkapp.com/developer' }
    ]
  },
  {
    id: 'mailgun',
    name: 'Mailgun',
    category: 'EMAIL',
    variables: [
      { name: 'MAILGUN_API_KEY', type: 'secret', placeholder: 'key-mailgun_marketing_api_signing_key', comment: 'Mailgun server transaction email agent key', docUrl: 'https://app.mailgun.com/' },
      { name: 'MAILGUN_DOMAIN', type: 'secret', placeholder: 'mg.yourdomain.com', comment: 'Mailgun registered domain pipeline prefix', docUrl: 'https://app.mailgun.com/' }
    ]
  },
  {
    id: 'awsses',
    name: 'AWS SES',
    category: 'EMAIL',
    variables: [
      { name: 'AWS_SES_REGION', type: 'secret', placeholder: 'us-east-1', comment: 'AWS SES mail delivery region', docUrl: 'https://console.aws.amazon.com/ses' },
      { name: 'AWS_SES_ACCESS_KEY', type: 'secret', placeholder: 'AKIA_SES_USER_ACCESS_KEY', comment: 'AWS SES IAM identifier', docUrl: 'https://console.aws.amazon.com/ses' },
      { name: 'AWS_SES_SECRET_KEY', type: 'secret', placeholder: 'aws_ses_iam_credentials_signature_token', comment: 'AWS SES IAM verification token', docUrl: 'https://console.aws.amazon.com/ses' }
    ]
  },
  {
    id: 'brevo',
    name: 'Brevo',
    category: 'EMAIL',
    variables: [
      { name: 'BREVO_API_KEY', type: 'secret', placeholder: 'xkeysib-brevo_transactional_smtp_token_99', comment: 'Brevo SMTP transactional mailing API token', docUrl: 'https://brevo.com/' }
    ]
  },
  {
    id: 'loops',
    name: 'Loops',
    category: 'EMAIL',
    variables: [
      { name: 'LOOPS_API_KEY', type: 'secret', placeholder: 'loops_marketing_api_signing_key_99', comment: 'Loops newsletter tracking and emailing platform key', docUrl: 'https://loops.so/' }
    ]
  },
  {
    id: 'plunk',
    name: 'Plunk',
    category: 'EMAIL',
    variables: [
      { name: 'PLUNK_API_KEY', type: 'secret', placeholder: 'plunk_transactional_email_api_signing_key', comment: 'Plunk developer transactional email platform key', docUrl: 'https://useplunk.com/' }
    ]
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'EMAIL',
    variables: [
      { name: 'MAILCHIMP_API_KEY', type: 'secret', placeholder: 'mailchimp_marketing_api_signing_key_99-us1', comment: 'Mailchimp audience campaign authorization key', docUrl: 'https://admin.mailchimp.com/' },
      { name: 'MAILCHIMP_LIST_ID', type: 'secret', placeholder: 'mailchimp_audience_list_hex_id', comment: 'Mailchimp subscription list identification tag', docUrl: 'https://admin.mailchimp.com/' }
    ]
  },

  // 📊 ANALYTICS & MONITORING
  {
    id: 'google_analytics',
    name: 'Google Analytics',
    category: 'ANALYTICS & MONITORING',
    variables: [
      { name: 'GOOGLE_ANALYTICS_MEASUREMENT_ID', type: 'public', placeholder: 'G-MEASUREMENT_ID_88', comment: 'Google Global Site Tag GA4 measurement dashboard tag', docUrl: 'https://analytics.google.com/' }
    ]
  },
  {
    id: 'posthog',
    name: 'Posthog',
    category: 'ANALYTICS & MONITORING',
    variables: [
      { name: 'POSTHOG_KEY', type: 'public', placeholder: 'phc_PostHogBrowserClientApiKeyString_99', comment: 'Posthog browser elements client ingestion pipeline key', docUrl: 'https://app.posthog.com/project/settings' },
      { name: 'POSTHOG_HOST', type: 'public', placeholder: 'https://us.i.posthog.com', comment: 'Posthog data collection router engine gateway host', docUrl: 'https://app.posthog.com/project/settings' }
    ]
  },
  {
    id: 'sentry',
    name: 'Sentry',
    category: 'ANALYTICS & MONITORING',
    variables: [
      { name: 'SENTRY_DSN', type: 'public', placeholder: 'https://sentry_dsn_public_host_hash@o1.ingest.sentry.io/1', comment: 'Sentry client UI application error tracker pipeline URL', docUrl: 'https://sentry.io/settings/' }
    ]
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    category: 'ANALYTICS & MONITORING',
    variables: [
      { name: 'MIXPANEL_TOKEN', type: 'public', placeholder: 'mixpanel_browser_tracking_client_token_99', comment: 'Mixpanel client user cohort analytics identity token', docUrl: 'https://mixpanel.com/settings/project' }
    ]
  },
  {
    id: 'datadog',
    name: 'Datadog',
    category: 'ANALYTICS & MONITORING',
    variables: [
      { name: 'DATADOG_API_KEY', type: 'secret', placeholder: 'datadog_infrastructure_monitoring_api_key', comment: 'Datadog metric server data ingestion key', docUrl: 'https://app.datadoghq.com/' },
      { name: 'DATADOG_APP_KEY', type: 'secret', placeholder: 'datadog_infrastructure_monitoring_app_key', comment: 'Datadog dashboard workspace authentication key', docUrl: 'https://app.datadoghq.com/' }
    ]
  },
  {
    id: 'newrelic',
    name: 'New Relic',
    category: 'ANALYTICS & MONITORING',
    variables: [
      { name: 'NEW_RELIC_LICENSE_KEY', type: 'secret', placeholder: 'new_relic_license_key_hex_signature_99', comment: 'New Relic APM metric logging license key', docUrl: 'https://one.newrelic.com/' },
      { name: 'NEW_RELIC_APP_NAME', type: 'secret', placeholder: 'my-production-app', comment: 'New Relic APM project registration name', docUrl: 'https://one.newrelic.com/' }
    ]
  },
  {
    id: 'amplitude',
    name: 'Amplitude',
    category: 'ANALYTICS & MONITORING',
    variables: [
      { name: 'AMPLITUDE_API_KEY', type: 'public', placeholder: 'amplitude_browser_tracking_client_token', comment: 'Amplitude product analytics ingestion key', docUrl: 'https://amplitude.com/' }
    ]
  },
  {
    id: 'hotjar',
    name: 'Hotjar',
    category: 'ANALYTICS & MONITORING',
    variables: [
      { name: 'HOTJAR_SITE_ID', type: 'public', placeholder: 'hotjar_site_id_numeric_99', comment: 'Hotjar visual tracking tag identifier', docUrl: 'https://insights.hotjar.com/' }
    ]
  },
  {
    id: 'segment',
    name: 'Segment',
    category: 'ANALYTICS & MONITORING',
    variables: [
      { name: 'SEGMENT_WRITE_KEY', type: 'public', placeholder: 'segment_write_key_hex_token_99', comment: 'Segment CDPs workspace interface key', docUrl: 'https://app.segment.com/' }
    ]
  },
  {
    id: 'logrocket',
    name: 'LogRocket',
    category: 'ANALYTICS & MONITORING',
    variables: [
      { name: 'LOGROCKET_APP_ID', type: 'public', placeholder: 'logrocket_organization/my_app_name', comment: 'LogRocket session tracking system identifier', docUrl: 'https://logrocket.com/' }
    ]
  },
  {
    id: 'plausible',
    name: 'Plausible',
    category: 'ANALYTICS & MONITORING',
    variables: [
      { name: 'PLAUSIBLE_DOMAIN', type: 'public', placeholder: 'yourdomain.com', comment: 'Plausible target registration tracking website', docUrl: 'https://plausible.io/' }
    ]
  },
  {
    id: 'umami',
    name: 'Umami',
    category: 'ANALYTICS & MONITORING',
    variables: [
      { name: 'UMAMI_WEBSITE_ID', type: 'public', placeholder: 'umami_website_uuid_identifier', comment: 'Umami self-hosted analytics tracking site key', docUrl: 'https://umami.is/' },
      { name: 'UMAMI_SRC', type: 'public', placeholder: 'https://analytics.umami.is/script.js', comment: 'Umami server delivery tracking script URL', docUrl: 'https://umami.is/' }
    ]
  },
  {
    id: 'cloudflare_analytics',
    name: 'Cloudflare Analytics',
    category: 'ANALYTICS & MONITORING',
    variables: [
      { name: 'CLOUDFLARE_BEACON_TOKEN', type: 'public', placeholder: 'cloudflare_web_analytics_beacon_token', comment: 'Cloudflare Web Analytics tracking beacon token', docUrl: 'https://dash.cloudflare.com/' }
    ]
  },

  // 🚀 DEPLOYMENT & INFRA
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'DEPLOYMENT & INFRA',
    variables: [
      { name: 'VERCEL_ORG_ID', type: 'secret', placeholder: 'team_vercel_org_workspace_hash_99', comment: 'Vercel organization account identity string', docUrl: 'https://vercel.com/' },
      { name: 'VERCEL_PROJECT_ID', type: 'secret', placeholder: 'proj_vercel_application_deployment_hash', comment: 'Vercel project deployment configuration identity tag', docUrl: 'https://vercel.com/' }
    ]
  },
  {
    id: 'railway',
    name: 'Railway',
    category: 'DEPLOYMENT & INFRA',
    variables: [
      { name: 'RAILWAY_STATIC_URL', type: 'secret', placeholder: 'my-project-production.up.railway.app', comment: 'Railway deployment target network static domain', docUrl: 'https://railway.app/dashboard' }
    ]
  },
  {
    id: 'render',
    name: 'Render',
    category: 'DEPLOYMENT & INFRA',
    variables: [
      { name: 'RENDER_SERVICE_ID', type: 'secret', placeholder: 'srv-RenderDeployServiceHashKeyString_99', comment: 'Render deployment environment pipeline service code', docUrl: 'https://dashboard.render.com/' }
    ]
  },
  {
    id: 'flyio',
    name: 'Fly.io',
    category: 'DEPLOYMENT & INFRA',
    variables: [
      { name: 'FLY_APP_NAME', type: 'secret', placeholder: 'my-production-fly-vm-name', comment: 'Fly.io virtual server allocation identification name', docUrl: 'https://fly.io/dashboard' }
    ]
  },
  {
    id: 'aws',
    name: 'AWS (General)',
    category: 'DEPLOYMENT & INFRA',
    variables: [
      { name: 'AWS_REGION', type: 'secret', placeholder: 'us-east-1', comment: 'Standard AWS target infrastructure deployment region', docUrl: 'https://docs.aws.amazon.com/general/latest/gr/rande.html' }
    ]
  },
  {
    id: 'netlify',
    name: 'Netlify',
    category: 'DEPLOYMENT & INFRA',
    variables: [
      { name: 'NETLIFY_AUTH_TOKEN', type: 'secret', placeholder: 'netlify_auth_token_hex_signature_99', comment: 'Netlify dashboard interface integration token', docUrl: 'https://app.netlify.com/' },
      { name: 'NETLIFY_SITE_ID', type: 'secret', placeholder: 'netlify_site_uuid_identifier', comment: 'Netlify deployment server site identification code', docUrl: 'https://app.netlify.com/' }
    ]
  },
  {
    id: 'cfworkers',
    name: 'Cloudflare Workers',
    category: 'DEPLOYMENT & INFRA',
    variables: [
      { name: 'CLOUDFLARE_ACCOUNT_ID', type: 'secret', placeholder: 'cloudflare_account_id_hex_hash_99', comment: 'Cloudflare console account identifier', docUrl: 'https://dash.cloudflare.com/' },
      { name: 'CLOUDFLARE_API_TOKEN', type: 'secret', placeholder: 'cloudflare_workers_api_signing_token', comment: 'Cloudflare Workers serverless deployment token', docUrl: 'https://dash.cloudflare.com/' }
    ]
  },
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    category: 'DEPLOYMENT & INFRA',
    variables: [
      { name: 'DIGITALOCEAN_TOKEN', type: 'secret', placeholder: 'do_personal_access_token_hex_99', comment: 'DigitalOcean droplets cloud API key', docUrl: 'https://cloud.digitalocean.com/' }
    ]
  },
  {
    id: 'heroku',
    name: 'Heroku',
    category: 'DEPLOYMENT & INFRA',
    variables: [
      { name: 'HEROKU_API_KEY', type: 'secret', placeholder: 'heroku_auth_api_token_hex_signature_99', comment: 'Heroku account automation control key', docUrl: 'https://dashboard.heroku.com/' },
      { name: 'HEROKU_APP_NAME', type: 'secret', placeholder: 'my-heroku-production-app', comment: 'Heroku application instance name', docUrl: 'https://dashboard.heroku.com/' }
    ]
  },
  {
    id: 'gcloudrun',
    name: 'Google Cloud Run',
    category: 'DEPLOYMENT & INFRA',
    variables: [
      { name: 'GCP_PROJECT_ID', type: 'secret', placeholder: 'my-gcp-project-id', comment: 'Google Cloud Console project identifier', docUrl: 'https://console.cloud.google.com/' },
      { name: 'GCP_REGION', type: 'secret', placeholder: 'us-central1', comment: 'GCP Cloud Run deployment server region', docUrl: 'https://console.cloud.google.com/' }
    ]
  },
  {
    id: 'azureapp',
    name: 'Azure App Service',
    category: 'DEPLOYMENT & INFRA',
    variables: [
      { name: 'AZURE_PUBLISH_PROFILE', type: 'secret', placeholder: 'xml_publish_profile_credentials_contents', comment: 'Azure App Service unified publishing profile contents', docUrl: 'https://portal.azure.com/' }
    ]
  },
  {
    id: 'denodeploy',
    name: 'Deno Deploy',
    category: 'DEPLOYMENT & INFRA',
    variables: [
      { name: 'DENO_DEPLOY_TOKEN', type: 'secret', placeholder: 'ddp_DenoDeployAccessTokenSecretValue_99', comment: 'Deno Deploy serverless engine control token', docUrl: 'https://dash.deno.com/' }
    ]
  },

  // 💬 MESSAGING & REALTIME
  {
    id: 'twilio',
    name: 'Twilio',
    category: 'MESSAGING & REALTIME',
    variables: [
      { name: 'TWILIO_ACCOUNT_SID', type: 'secret', placeholder: 'ACTwilioAccountSidAlphanumericKeyString', comment: 'Twilio developer platform main identification key', docUrl: 'https://www.twilio.com/console' },
      { name: 'TWILIO_AUTH_TOKEN', type: 'secret', placeholder: 'twilio_auth_token_secret_signature_99', comment: 'Twilio account authorization password credential', docUrl: 'https://www.twilio.com/console' },
      { name: 'TWILIO_PHONE_NUMBER', type: 'secret', placeholder: '+15550199', comment: 'Twilio verified target virtual caller telephone number', docUrl: 'https://www.twilio.com/console' }
    ]
  },
  {
    id: 'pusher',
    name: 'Pusher',
    category: 'MESSAGING & REALTIME',
    variables: [
      { name: 'PUSHER_APP_ID', type: 'public', placeholder: 'pusher_app_id_numeric_99', comment: 'Pusher server instance identity number', docUrl: 'https://dashboard.pusher.com/' },
      { name: 'PUSHER_KEY', type: 'public', placeholder: 'pusher_client_publishable_key_99', comment: 'Pusher client browser elements connection key', docUrl: 'https://dashboard.pusher.com/' },
      { name: 'PUSHER_SECRET', type: 'secret', placeholder: 'pusher_backend_server_signing_secret', comment: 'Pusher backend server event authorization key', docUrl: 'https://dashboard.pusher.com/' },
      { name: 'PUSHER_CLUSTER', type: 'public', placeholder: 'us2', comment: 'Pusher cluster region locator', docUrl: 'https://dashboard.pusher.com/' }
    ]
  },
  {
    id: 'ably',
    name: 'Ably',
    category: 'MESSAGING & REALTIME',
    variables: [
      { name: 'ABLY_API_KEY', type: 'secret', placeholder: 'ably_app_key_id.ably_client_token_secret_signature_99', comment: 'Ably client realtime communication authorization key', docUrl: 'https://dashboard.ably.com/' }
    ]
  },
  {
    id: 'kafka',
    name: 'Kafka/Confluent',
    category: 'MESSAGING & REALTIME',
    variables: [
      { name: 'KAFKA_BOOTSTRAP_SERVERS', type: 'secret', placeholder: 'pkc-cool-snowflake-aws.us-east-1.confluent.cloud:9092', comment: 'Confluent Kafka cloud brokers bootstrap access servers', docUrl: 'https://confluent.cloud/' },
      { name: 'KAFKA_SASL_USERNAME', type: 'secret', placeholder: 'KAFKA_CONFLUENT_API_KEY_IDENTIFIER', comment: 'Kafka SASL username authentication key', docUrl: 'https://confluent.cloud/' },
      { name: 'KAFKA_SASL_PASSWORD', type: 'secret', placeholder: 'kafka_confluent_api_key_secret_signature_99', comment: 'Kafka SASL password credential', docUrl: 'https://confluent.cloud/' }
    ]
  },
  {
    id: 'rabbitmq',
    name: 'RabbitMQ',
    category: 'MESSAGING & REALTIME',
    variables: [
      { name: 'RABBITMQ_URL', type: 'secret', placeholder: 'amqps://user:password@rabbit-production-cool.rmq.cloudamqp.com/myvhost', comment: 'RabbitMQ queue broker access connection URL', docUrl: 'https://www.cloudamqp.com/' }
    ]
  },

  // 🔍 SEARCH
  {
    id: 'algolia',
    name: 'Algolia',
    category: 'SEARCH',
    variables: [
      { name: 'ALGOLIA_APP_ID', type: 'public', placeholder: 'ALGOLIA_APP_ID_HEX_VALUE', comment: 'Algolia index workspace identifier', docUrl: 'https://dashboard.algolia.com/' },
      { name: 'ALGOLIA_API_KEY', type: 'public', placeholder: 'algolia_search_client_only_publishable_key', comment: 'Algolia client browser index searching query key', docUrl: 'https://dashboard.algolia.com/' },
      { name: 'ALGOLIA_ADMIN_KEY', type: 'secret', placeholder: 'algolia_backend_master_index_write_secret_key', comment: 'Algolia master index database write key', docUrl: 'https://dashboard.algolia.com/' }
    ]
  },
  {
    id: 'typesense',
    name: 'Typesense',
    category: 'SEARCH',
    variables: [
      { name: 'TYPESENSE_HOST', type: 'public', placeholder: 'typesense-production-cool.typesense.net', comment: 'Typesense search node host server URL', docUrl: 'https://cloud.typesense.org/' },
      { name: 'TYPESENSE_PORT', type: 'public', placeholder: '443', comment: 'Typesense cluster access gateway port', docUrl: 'https://cloud.typesense.org/' },
      { name: 'TYPESENSE_SEARCH_ONLY_API_KEY', type: 'public', placeholder: 'typesense_search_only_api_key_88', comment: 'Typesense client browser searching query key', docUrl: 'https://cloud.typesense.org/' },
      { name: 'TYPESENSE_ADMIN_API_KEY', type: 'secret', placeholder: 'typesense_admin_index_write_secret_key', comment: 'Typesense master index write key', docUrl: 'https://cloud.typesense.org/' }
    ]
  },
  {
    id: 'meilisearch',
    name: 'Meilisearch',
    category: 'SEARCH',
    variables: [
      { name: 'MEILISEARCH_HOST', type: 'public', placeholder: 'https://meilisearch-production-cool.meilisearch.com', comment: 'Meilisearch cluster search server address', docUrl: 'https://www.meilisearch.com/' },
      { name: 'MEILISEARCH_SEARCH_KEY', type: 'public', placeholder: 'meilisearch_client_search_only_publishable_key', comment: 'Meilisearch client browser searching query key', docUrl: 'https://www.meilisearch.com/' },
      { name: 'MEILISEARCH_MASTER_KEY', type: 'secret', placeholder: 'meilisearch_backend_master_index_write_secret_key', comment: 'Meilisearch master index database write key', docUrl: 'https://www.meilisearch.com/' }
    ]
  },

  // 📍 MAPS & LOCATION
  {
    id: 'googlemaps',
    name: 'Google Maps',
    category: 'MAPS & LOCATION',
    variables: [
      { name: 'GOOGLE_MAPS_API_KEY', type: 'public', placeholder: 'AIzaSy_GoogleMapsClientBrowserApiKeyString', comment: 'Google Maps JS SDK map browser elements key', docUrl: 'https://console.cloud.google.com/google/maps-apis/' }
    ]
  },
  {
    id: 'mapbox',
    name: 'Mapbox',
    category: 'MAPS & LOCATION',
    variables: [
      { name: 'MAPBOX_ACCESS_TOKEN', type: 'public', placeholder: 'pk.mapbox_client_browser_access_token_88', comment: 'Mapbox map style loading client access token', docUrl: 'https://account.mapbox.com/' }
    ]
  },
  {
    id: 'heremaps',
    name: 'HERE Maps',
    category: 'MAPS & LOCATION',
    variables: [
      { name: 'HERE_MAPS_API_KEY', type: 'public', placeholder: 'here_maps_developer_client_browser_api_key', comment: 'HERE Maps styling loading client key', docUrl: 'https://developer.here.com/' }
    ]
  }
];

// Group services into unique categories list
const CATEGORY_ICONS = {
  'DATABASE': `[db]`,
  'AUTHENTICATION': `[auth]`,
  'PAYMENTS': `[pay]`,
  'AI & LLMs': `[ai]`,
  'STORAGE': `[storage]`,
  'EMAIL': `[email]`,
  'ANALYTICS & MONITORING': `[analytics]`,
  'DEPLOYMENT & INFRA': `[deploy]`,
  'MESSAGING & REALTIME': `[msg]`,
  'SEARCH': `[search]`,
  'MAPS & LOCATION': `[maps]`
};

// 3. BLOG POSTS DATABASE (FEATURE 6)
const BLOG_POSTS = [
  {
    slug: 'nextjs-env-guide',
    title: 'Next.js Environment Variables: The Complete Guide',
    excerpt: 'Everything you need to know about NEXT_PUBLIC_ prefixes, server-side vs client-side variables, and .env.local vs .env.production.',
    readTime: '5 min read',
    content: `
      <p>Managing environment variables in Next.js is a fundamental skill for building secure, scalable web applications. When constructing a web application, we inevitably handle a mix of public configurations (like API host URLs or public analytics tracking codes) and highly sensitive private credentials (like database connection strings, Stripe secret keys, or mail server passwords). If these two types of variables are not treated with strict separation, you risk major security exposures, system hijacking, or unexpected server bills. Next.js provides built-in mechanisms to elegantly handle these concerns, but developers must understand how they operate under the hood.</p>

      <h2>Server-Side vs. Client-Side Environments</h2>
      <p>By default, all environment variables loaded into a Next.js application are exclusively available in the Node.js environment. This means they are accessible only in server-side contexts, such as <code>getServerSideProps</code>, <code>getStaticProps</code>, API routes, and React Server Components (RSC). They are completely invisible to the client-side browser client. This secure-by-default boundary is a crucial line of defense in modern web development.</p>

      <p>To explicitly expose an environment variable to the browser client, Next.js requires you to prefix the variable name with <code>NEXT_PUBLIC_</code>. For example:</p>
      <pre><code># Secure: Accessible only on the server
DATABASE_URL=postgresql://db_user:db_password@localhost:5432/main_db
STRIPE_SECRET_KEY=sk_live_51xyz...

# Client-Safe: Inlined into the client-side bundle
NEXT_PUBLIC_ANALYTICS_ID=G-123456
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51xyz...</code></pre>

      <p>When Next.js compiles your application for production during the build process, it scans your codebase for any references to <code>process.env.NEXT_PUBLIC_*</code> variables and literally inlines their values directly into the compiled JavaScript bundle. This means anyone inspecting your site's JavaScript files or using browser DevTools can view these values. If you accidentally prefix a private key, such as <code>NEXT_PUBLIC_DATABASE_URL</code>, you are publishing your database password to the world. Always exercise extreme caution when applying this prefix.</p>

      <h2>Environment File Precedence and Configurations</h2>
      <p>Next.js supports loading variables from multiple files. Understanding the exact order of precedence is essential to ensure that your local configurations do not collide with your staging or production environments. Here is the loading priority from highest to lowest:</p>
      <ol>
        <li><code>.env.development.local</code> or <code>.env.production.local</code>: Local overrides for specific runtime environments. These files are designed for temporary local debugging and should never be committed to Git.</li>
        <li><code>.env.local</code>: A general local override file that applies to all environments (development, testing, and production). Like other \`.local\` files, it must remain strictly on your local disk and be excluded via <code>.gitignore</code>.</li>
        <li><code>.env.development</code> or <code>.env.production</code>: Default settings that are specific to either the development or production builds. These files are typically committed to Git to establish environment-wide defaults.</li>
        <li><code>.env</code>: The global default fallback environment file, loaded across all environments unless overridden by a more specific file.</li>
      </ol>

      <h2>Best Practices for Production Deployment</h2>
      <p>When deploying to cloud platforms like Vercel, Netlify, or AWS, you should never rely on pushing your local <code>.env.local</code> files to your git repository. Instead, you should inject these variables directly via the hosting provider's dashboard or environment configuration settings. This ensures your secrets are encrypted at rest and never exposed inside your codebase. Furthermore, using a \`.env.example\` file is highly recommended to provide your team with a complete, secure environment blueprint.</p>
    `
  },
  {
    slug: 'secure-api-keys',
    title: 'How to Secure Your API Keys in 2025',
    excerpt: 'Stop leaking secrets. A practical checklist for every developer shipping to production in the serverless cloud age.',
    readTime: '4 min read',
    content: `
      <p>API keys are the digital currency of modern software applications. They represent authorization, database access, payment gateways, and highly expensive artificial intelligence endpoints. In 2025, crawler bots and automated scanning scripts continuously search public internet spaces, indexing Git repositories, public forum posts, and raw client-side bundles looking for exposed credentials. A single leaked Stripe secret key, AWS credential, or OpenAI token can result in thousands of dollars in unexpected charges, data breaches, or catastrophic database deletions in a matter of minutes. Securing your credentials is not optional; it is a foundational component of software engineering.</p>

      <h2>The Golden Rule: Strict Git Exclusions</h2>
      <p>The most common way secrets are exposed is by committing a raw <code>.env</code> file into a public or even private Git repository. Even if you delete the file in a subsequent commit, it remains permanent in your Git commit history unless you perform a complex history rewrite. To prevent this, ensure your <code>.gitignore</code> file is initialized at the absolute start of your project with the following exclusions:</p>
      <pre><code># .gitignore - Crucial Secrets Exclusion
.env
.env.local
.env.development.local
.env.production.local
*.env.json
.shadow-secrets/</code></pre>

      <p>Double-check your repository status before every push using <code>git status</code> to confirm that no environment configuration files are queued for staging. If you are working in a team, configure a git hook or use tools like <code>gitleaks</code> to automatically scan for committed secrets before pushing code to remote hosts.</p>

      <h2>Implement the Principle of Least Privilege</h2>
      <p>When generating credentials on provider dashboards (like AWS, Stripe, Clerk, or Google Cloud), never use "root" or "admin" tokens if a narrower scope is available. Apply the Principle of Least Privilege to minimize the blast radius of a potential key leak:</p>
      <ul>
        <li><strong>Generate Read-Only Keys</strong>: If an integration only needs to fetch list items, do not give it write or delete permissions.</li>
        <li><strong>Enable IP and Referrer Restrictions</strong>: For browser-accessible keys (such as Google Maps or Firebase client keys), configure restrictions so they only accept requests originating from your domain or specific server IP addresses.</li>
        <li><strong>Maintain Environments Separation</strong>: Always use sandboxed "test" or "development" keys in your local coding space, and use live keys exclusively in your production cloud console. Never mix them.</li>
      </ul>

      <h2>Automated Key Rotation and Secret Managers</h2>
      <p>Security is a dynamic, ongoing practice. Do not treat your keys as permanent assets. Instead, set up an automated key rotation schedule, renewing critical API keys every 90 days. For enterprise teams, consider migrating away from raw local environment files altogether and adopting premium secret managers like HashiCorp Vault, AWS Secrets Manager, or Doppler. These systems inject secrets dynamically into your application runtimes, completely removing human exposure to raw secrets.</p>
    `
  },
  {
    slug: 'stripe-nextjs-env',
    title: 'Setting Up Stripe with Next.js: Environment Variables You Actually Need',
    excerpt: 'The exact .env variables Stripe needs, what each one does, and where to find them to support secure ecommerce.',
    readTime: '4 min read',
    content: `
      <p>Building a modern e-commerce checkout flow or SaaS subscription system with Stripe and Next.js is incredibly efficient, but setting up the integration safely requires an understanding of how publishable versus secret keys operate. Because Stripe processes financial transactions and user ledger entries, any security lapse can lead to fraudulent purchases, chargebacks, or data theft. To integrate Stripe cleanly, you must separate your client-side variables from your server-side secrets and validate incoming webhook events correctly.</p>

      <h2>The Essential Stripe Variable Stack</h2>
      <p>To establish a fully functional payment integration, your application must declare three core environment variables. Let's look at their structure and safe naming conventions:</p>
      <pre><code># 1. Public Publishable Key (Safe for client browsers)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51O...

# 2. Secret Key (Keep on server side only)
STRIPE_SECRET_KEY=sk_test_51O...

# 3. Webhook Signing Secret (Verifies events sent by Stripe)
STRIPE_WEBHOOK_SECRET=whsec_...</code></pre>

      <p>The <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> is utilized in your React components to instantiate the Stripe Elements UI wrapper. This key is safe to share because its permissions are restricted to UI styling and collecting payment card tokens. On the other hand, the <code>STRIPE_SECRET_KEY</code> must remain strictly on the server-side Node.js environment. This key gives direct read/write access to your Stripe account balance, customer lists, refund triggers, and subscriptions. Never prefix this key with <code>NEXT_PUBLIC_</code>.</p>

      <h2>Acquiring Your Stripe Credentials</h2>
      <p>To locate and retrieve these credentials for your development space:</p>
      <ol>
        <li>Log in to your <a href="https://dashboard.stripe.com/" target="_blank" rel="noopener">Stripe Dashboard</a>.</li>
        <li>Toggle the <strong>Test Mode</strong> switch in the upper-right corner of the screen. Always build and test your code in Test Mode.</li>
        <li>Navigate to the <strong>Developers</strong> tab and select <strong>API Keys</strong>.</li>
        <li>Copy the "Publishable key" (starts with <code>pk_test_</code>) and "Secret key" (starts with <code>sk_test_</code>) into your local <code>.env.local</code> configuration.</li>
      </ol>

      <h2>Configuring Webhooks Locally</h2>
      <p>When a payment completes, Stripe broadcasts an event payload to your server. To prevent unauthorized attackers from spoofing these events, Stripe signs each payload. Your API route must verify this digital signature using the <code>STRIPE_WEBHOOK_SECRET</code>. During local development, your backend runs on \`localhost\`, which Stripe's servers cannot reach. You can resolve this by using the official Stripe CLI to tunnel events to your local server:</p>
      <pre><code>stripe listen --forward-to localhost:3000/api/webhooks</code></pre>
      <p>Once you run this command, the CLI will output a temporary signing secret starting with <code>whsec_</code>. Copy this value and assign it to <code>STRIPE_WEBHOOK_SECRET</code> in your local <code>.env.local</code> file. When deploying your project to production, create a live webhook endpoint in the Stripe Dashboard to retrieve your permanent production signing secret.</p>
    `
  },
  {
    slug: 'supabase-nextjs-env',
    title: 'Supabase + Next.js: Complete .env Setup Guide',
    excerpt: 'URL, anon key, service role — what\'s the difference and which one goes where inside your server-side configurations.',
    readTime: '5 min read',
    content: `
      <p>Supabase is a highly popular open-source Firebase alternative built on top of the powerful PostgreSQL database engine. When developing a Next.js application integrated with Supabase, you are provided with several distinct API keys and endpoint URLs. Understanding the differences between these keys and their specific security implications is paramount. If you confuse a public anonymous key with a private administrative role key, you run the risk of granting anyone on the internet full administrative access to delete database tables, bypass row policies, or extract private user passwords.</p>

      <h2>The Supabase Environment Stack</h2>
      <p>To integrate Supabase with your Next.js application, you need to configure three primary environment variables. They fall into distinct client-side and server-side categories:</p>
      <pre><code># 1. Supabase Project REST Gateway URL (Safe for client browsers)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co

# 2. Anonymous Client API Key (Safe for client browsers)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1Ni...

# 3. Service Role Key (NEVER expose to the browser!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1Ni...</code></pre>

      <h2>1. NEXT_PUBLIC_SUPABASE_URL</h2>
      <p>This is the unique REST API gateway address for your Supabase project instance. It is safe to expose to client browsers because it simply points your browser client to the correct server. Both the client-side router and the server-side backend require this URL to establish connections with your Supabase services.</p>

      <h2>2. NEXT_PUBLIC_SUPABASE_ANON_KEY</h2>
      <p>The anonymous key is designed to be public and can be safely exposed inside browser clients. It honors your PostgreSQL Row Level Security (RLS) policies. When a client performs queries using the anonymous key, the request operates with the "anon" database role. Once a user logs in, the query automatically upgrades to use the "authenticated" database role. Because of RLS, users can only access data they are explicitly permitted to view. Always ensure that RLS is active on all database tables that handle user-sensitive data.</p>

      <h2>3. SUPABASE_SERVICE_ROLE_KEY</h2>
      <p>This is your administrative master key and represents the most critical security asset in your project. The Service Role Key bypasses PostgreSQL Row Level Security (RLS) entirely, meaning any query run with this key has unrestricted read, write, and delete permissions over all tables in your database. <strong>You must never expose this key to browser clients.</strong> Never prefix this key with <code>NEXT_PUBLIC_</code>. Keep it strictly inside server-side Node.js environments, such as React Server Components, server-side API routes, or cron scripts. If this key is leaked, revoke it immediately on your Supabase dashboard to prevent database hijacking.</p>
    `
  },
  {
    slug: 'what-is-dotenv',
    title: 'What is a .env File? A Beginner\'s Explanation',
    excerpt: 'Plain English explanation of environment variables, why they exist, and how to use them safely in your code bases.',
    readTime: '3 min read',
    content: `
      <p>When you are learning to code, it is very common to hardcode settings. You might write your local database connection password directly in a connection file, or copy-paste your OpenAI API token straight into a client-side fetch script. While this works perfectly on your local machine, it introduces massive security threats the moment you publish your source code to platforms like GitHub. A <code>.env</code> file is the standard developer solution for decoupling sensitive configuration settings from your actual source code, ensuring that your keys remain completely private while making your application highly portable.</p>

      <h2>Understanding Environment Variables</h2>
      <p>Environment variables are simple key-value pairs representing configuration settings that exist outside of your application's source files. Every server and operating system maintains its own set of environment variables. By referencing these variables in your code instead of hardcoding raw values, you achieve two massive benefits:</p>
      <ol>
        <li><strong>Security</strong>: You shield sensitive passwords, private keys, and payment tokens from being stored inside Git repository records. If your code is public, your secrets remain safe on your local disk.</li>
        <li><strong>Environment Portability</strong>: Your code remains identical whether it runs on your local laptop, a staging server, or a production cluster. You simply swap the external environment file to configure different databases or service modes.</li>
      </ol>

      <h2>Anatomy of a .env File</h2>
      <p>A <code>.env</code> file is a plain text file that contains uppercase keys and values, with comments preceded by a hash symbol (<code>#</code>). Here is a standard example:</p>
      <pre><code># Application Server Configuration
PORT=8080
DATABASE_URL=mongodb://localhost:27017/my_app

# Secret Integrations
OPENAI_API_KEY=sk-proj-123456</code></pre>

      <p>When your application starts, a parser library (like the standard <code>dotenv</code> package in Node.js, or built-in engines in Python and Go) reads the <code>.env</code> file and injects these variables directly into the application's runtime memory. For example, in Node.js, you can access these values anywhere in your backend code using <code>process.env</code>:</p>
      <pre><code>// Securely initialize database connection
const databasePath = process.env.DATABASE_URL;
connectToDatabase(databasePath);</code></pre>

      <h2>Crucial Security Rule: Git Ignored Files</h2>
      <p>Always remember that the <code>.env</code> file must exist exclusively on your local development machine. You must add the entry <code>.env</code> to your project's <code>.gitignore</code> file before staging any commits. To enable other developers to run your project, you should maintain a separate <code>.env.example</code> template. This template contains the exact same keys as your active <code>.env</code> file but replaces all private values with empty strings or helpful setup instructions. This allows teammates to copy the blueprint, insert their own keys, and start coding instantly.</p>
    `
  },
  {
    slug: 'env-example-pattern',
    title: 'The .env.example Pattern: Why Every Project Needs One',
    excerpt: 'How to use .env.example templates to onboard teammates fast without exposing real development credentials.',
    readTime: '3 min read',
    content: `
      <p>As software projects grow and incorporate more external integrations—such as databases, authentication providers, payment gateways, and telemetry reporting—the list of required environment variables expands rapidly. When a new developer joins your team, clones the repository, and attempts to run the code locally, they are often met with immediate application crashes or confusing errors. These failures occur because they are missing the necessary local configurations. The standard, professional solution to this problem is the <strong>.env.example pattern</strong>.</p>

      <h2>The Environment Variable Scavenger Hunt</h2>
      <p>Because actual <code>.env</code> files contain highly confidential API keys and database credentials, they are excluded from Git repositories. This is a critical security rule, but it creates a massive blind spot: new developers have no way of knowing which variables are required to make the project run. Without a blueprint, onboarding becomes a scavenger hunt where developers must search through code files to locate references to <code>process.env</code> or ask teammates to share their secret configurations over slack or email. This is not only inefficient but also introduces major security risks.</p>

      <h2>Standardizing Your Configurations with .env.example</h2>
      <p>A <code>.env.example</code> file is a public configuration blueprint committed directly to your Git repository. It mirrors the exact structure and keys of your active <code>.env</code> file but contains absolutely no private credentials. Instead, all values are left completely empty or filled with non-sensitive sandbox defaults. Let's look at an example template:</p>
      <pre><code># Server Setup Configuration
PORT=3000
DATABASE_URL=postgresql://localhost:5432/my_db

# Stripe Payment Integrations
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # Get from stripe dashboard in test mode
STRIPE_SECRET_KEY= # Server-side only! Do not share.

# Telemetry & Monitoring
NEXT_PUBLIC_ANALYTICS_ID=UA-XXXXXX-X</code></pre>

      <h2>Why the .env.example Pattern is Essential</h2>
      <p>Adopting this simple template file provides huge advantages for software engineering teams:</p>
      <ul>
        <li><strong>Instant Onboarding</strong>: A newly onboarded developer can simply copy the template using the command line (<code>cp .env.example .env</code>), populate it with their local credentials, and run the project in seconds.</li>
        <li><strong>Reliable CI/CD Pipelines</strong>: Automated test runners and build scripts reference the example file to verify that mandatory environment structures are initialized before launching tests.</li>
        <li><strong>Reduced Security Risks</strong>: Having a standardized template stops developers from sharing real configurations over insecure channels, keeping the team's workspaces secure.</li>
      </ul>
      <p>Make it a team habit to update the <code>.env.example</code> file every time you integrate a new service. Keeping this template file perfectly synchronized with your project requirements is a superb development practice that saves time and keeps your team productive and secure.</p>
    `
  }
];

/* ==========================================================================
   APP STATE
   ========================================================================== */
const state = {
  framework: null,
  services: new Set(),
  step: 1,
  activeTab: 'env', // 'env' or 'example'
  activeEnv: 'development', // 'development', 'staging', 'production'
  generatedSecrets: {
    development: {},
    staging: {},
    production: {}
  },
  dismissedWarnings: new Set(), // Tracks IDs of validation warnings closed manually
  typewriterTimeout: null
};

/* ==========================================================================
   DOM ELEMENTS
   ========================================================================== */
const elements = {
  frameworkGrid: document.getElementById('framework-grid'),
  servicesContainer: document.getElementById('services-container'),
  btnStep1Next: document.getElementById('btn-step1-next'),
  btnStep2Back: document.getElementById('btn-step2-back'),
  btnStep2Next: document.getElementById('btn-step2-next'),
  btnCopyEnv: document.getElementById('btn-copy-env'),
  btnDownloadEnv: document.getElementById('btn-download-env'),
  btnStartOver: document.getElementById('btn-start-over'),
  dotenvCodeRender: document.getElementById('dotenv-code-render'),
  stepIndicator: document.getElementById('step-indicator'),
  logoLink: document.getElementById('logo-link'),
  menuToggle: document.getElementById('menu-toggle'),
  mobileMenu: document.getElementById('mobile-menu'),
  
  // Upgraded Elements (Features 1-6)
  tabBtnEnv: document.getElementById('tab-btn-env'),
  tabBtnExample: document.getElementById('tab-btn-example'),
  serviceSearchInput: document.getElementById('service-search-input'),
  searchEmptyState: document.getElementById('search-empty-state'),
  validationWarningsContainer: document.getElementById('validation-warnings-container'),
  shareUrlInput: document.getElementById('share-url-input'),
  btnShareCopy: document.getElementById('btn-share-copy'),
  storageWelcomeBanner: document.getElementById('storage-welcome-banner'),
  btnGenerateSecrets: document.getElementById('btn-generate-secrets'),
  
  // Views
  homeView: document.getElementById('home-view'),
  howItWorksView: document.getElementById('howitworks-view'),
  aboutView: document.getElementById('about-view'),
  privacyView: document.getElementById('privacy-view'),
  blogView: document.getElementById('blog-view'),
  blogPostView: document.getElementById('blog-post-view'),
  
  // Containers
  blogGrid: document.getElementById('blog-grid'),
  blogArticleContent: document.getElementById('blog-article-content'),
  
  // Cards
  step1Card: document.getElementById('step-1-card'),
  step2Card: document.getElementById('step-2-card'),
  step3Card: document.getElementById('step-3-card')
};

/* ==========================================================================
   INITIALIZATION & ROUTING
   ========================================================================== */
function init() {
  initCustomCursor();
  renderFrameworkGrid();
  renderServicesGrouped();
  renderBlogIndex();
  setupEventListeners();
  setupEnvSwitcher();
  updateEnvBadge();
  
  // Setup URL state checks (FEATURE 3) or Session checks (FEATURE 5)
  const isLoadedFromUrl = handleUrlImport();
  if (!isLoadedFromUrl) {
    handleStorageCheck();
  }

  // Handle window popstate for hash routing SPA
  handleHashRoute();
  window.addEventListener('hashchange', handleHashRoute);

  // Run Boot Sequence or Typewriter
  checkBootSequence();
}

function checkBootSequence() {
  const bootOverlay = document.getElementById('boot-overlay');
  
  if (window.innerWidth <= 768) {
    if (bootOverlay) {
      bootOverlay.style.pointerEvents = 'none';
      bootOverlay.style.setProperty('display', 'none', 'important');
    }
    startHeroTypewriter();
    sessionStorage.setItem('env_boot_completed', 'true');
    return;
  }
  
  if (sessionStorage.getItem('env_boot_completed')) {
    if (bootOverlay) {
      bootOverlay.style.pointerEvents = 'none';
      bootOverlay.style.setProperty('display', 'none', 'important');
    }
    startHeroTypewriter();
  } else {
    runBootSequence();
  }
}

function runBootSequence() {
  const bootOverlay = document.getElementById('boot-overlay');
  const lines = [
    { el: document.getElementById('boot-line-1'), text: '&gt; initializing .env generator...' },
    { el: document.getElementById('boot-line-2'), text: '&gt; loading frameworks............ done' },
    { el: document.getElementById('boot-line-3'), text: '&gt; loading services.............. done' },
    { el: document.getElementById('boot-line-4'), text: '&gt; checking for secrets........... none found ✓' },
    { el: document.getElementById('boot-line-5'), text: '&gt; ready.' }
  ];
  
  if (!bootOverlay || !lines[0].el) {
    startHeroTypewriter();
    return;
  }
  
  sessionStorage.setItem('env_boot_completed', 'true');
  
  let currentLine = 0;
  
  function showNextLine() {
    if (currentLine < lines.length) {
      const lineObj = lines[currentLine];
      
      // Remove cursor from previous line
      if (currentLine > 0) {
        const prevLineObj = lines[currentLine - 1];
        if (prevLineObj.el) {
          prevLineObj.el.innerHTML = prevLineObj.text; // no cursor
        }
      }
      
      // Type out current line or show it with cursor
      if (lineObj.el) {
        lineObj.el.innerHTML = lineObj.text + '<span class="blinking-cursor">|</span>';
      }
      
      currentLine++;
      setTimeout(showNextLine, 300);
    } else {
      // All lines printed. Let's wait a bit then fade out overlay
      setTimeout(() => {
        if (bootOverlay) {
          bootOverlay.style.setProperty('pointer-events', 'none', 'important');
          bootOverlay.style.opacity = '0';
          setTimeout(() => {
            bootOverlay.style.setProperty('display', 'none', 'important');
            startHeroTypewriter();
          }, 400); // match transition duration
        } else {
          startHeroTypewriter();
        }
      }, 300);
    }
  }
  
  showNextLine();
}

function startHeroTypewriter() {
  const text = "Generate your .env file in 30 seconds";
  const titleTextEl = document.querySelector('#hero-title .typewriter-text');
  const subheadlineEl = document.getElementById('hero-subheadline');
  const badgesEl = document.getElementById('hero-stat-badges');
  
  if (!titleTextEl) return;
  
  titleTextEl.textContent = "";
  let charIdx = 0;
  
  function typeChar() {
    if (charIdx < text.length) {
      titleTextEl.textContent += text.charAt(charIdx);
      charIdx++;
      setTimeout(typeChar, 45);
    } else {
      // Typing completed. Cursor keeps blinking (CSS handles the blink).
      // Now, fade in subheadline.
      if (subheadlineEl) {
        subheadlineEl.style.opacity = '1';
        
        // Stagger fade in stat badges after subheadline appears.
        // The subheadline transition takes 500ms. Let's wait 300ms to start staggering.
        setTimeout(() => {
          if (badgesEl) {
            const badges = badgesEl.querySelectorAll('.stat-badge');
            badges.forEach((badge, idx) => {
              setTimeout(() => {
                badge.style.opacity = '1';
              }, idx * 150);
            });
          }
        }, 300);
      }
    }
  }
  
  typeChar();
}

function playTerminalStepTransition(fromStep, toStep, line1Text, line2Text, callback) {
  const currentCard = document.getElementById(`step-${fromStep}-card`);
  if (!currentCard) {
    callback();
    return;
  }
  
  const origPosition = currentCard.style.position;
  currentCard.style.position = 'relative';
  
  const overlay = document.createElement('div');
  overlay.className = 'transition-terminal jetbrains-font';
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.background = '#121212';
  overlay.style.borderRadius = '12px';
  overlay.style.padding = '32px';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'flex-start';
  overlay.style.alignItems = 'flex-start';
  overlay.style.zIndex = '100';
  overlay.style.color = '#22c55e';
  overlay.style.fontSize = '14px';
  overlay.style.lineHeight = '1.8';
  overlay.style.boxSizing = 'border-box';
  overlay.style.textAlign = 'left';
  
  overlay.innerHTML = `
    <div class="trans-line-1" style="min-height: 24px; width: 100%;"></div>
    <div class="trans-line-2" style="min-height: 24px; width: 100%; margin-top: 8px;"></div>
  `;
  
  currentCard.appendChild(overlay);
  
  const line1El = overlay.querySelector('.trans-line-1');
  const line2El = overlay.querySelector('.trans-line-2');
  
  let idx1 = 0;
  function typeLine1() {
    if (idx1 < line1Text.length) {
      line1El.innerHTML = line1Text.substring(0, idx1 + 1) + '<span class="blinking-cursor">|</span>';
      idx1++;
      setTimeout(typeLine1, 15);
    } else {
      line1El.innerHTML = line1Text;
      startSpinnerLine2();
    }
  }
  
  function startSpinnerLine2() {
    const spinnerChars = ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'];
    let spinnerIdx = 0;
    let elapsed = 0;
    const duration = fromStep === 1 ? 500 : 680; // duration in ms
    const interval = 80;
    
    const spinnerIntervalId = setInterval(() => {
      const char = spinnerChars[spinnerIdx];
      line2El.innerHTML = `<span style="color: #22c55e;">${char}</span> ${line2Text}`;
      spinnerIdx = (spinnerIdx + 1) % spinnerChars.length;
      elapsed += interval;
      
      if (elapsed >= duration) {
        clearInterval(spinnerIntervalId);
        // Complete the transition
        setTimeout(() => {
          if (overlay.parentNode === currentCard) {
            currentCard.removeChild(overlay);
          }
          currentCard.style.position = origPosition;
          
          callback();
          
          // Flash step indicator
          const targetIndicator = elements.stepIndicator.querySelector(`[data-step="${toStep}"]`);
          if (targetIndicator) {
            const numEl = targetIndicator.querySelector('.step-num');
            if (numEl) {
              numEl.classList.add('flash-green');
              setTimeout(() => {
                numEl.classList.remove('flash-green');
              }, 400);
            }
          }
        }, 100);
      }
    }, interval);
  }
  
  typeLine1();
}

// RENDER STEP 1: FRAMEWORKS
function renderFrameworkGrid() {
  elements.frameworkGrid.innerHTML = FRAMEWORKS.map(fw => {
    return `
      <div class="framework-card" 
           data-id="${fw.id}" 
           role="radio" 
           aria-checked="false" 
           tabindex="0">
        <div class="framework-icon">${fw.icon}</div>
        <div class="framework-name">${fw.name}</div>
      </div>
    `;
  }).join('');

  // Add click & keydown handlers
  const cards = elements.frameworkGrid.querySelectorAll('.framework-card');
  cards.forEach(card => {
    const fwId = card.getAttribute('data-id');
    
    // Click Select
    card.addEventListener('click', () => selectFramework(fwId));
    
    // Keyboard Select (Space/Enter)
    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        selectFramework(fwId);
      }
    });
  });
}

// RENDER STEP 2: SERVICES
function renderServicesGrouped() {
  const categories = [...new Set(SERVICES.map(s => s.category))];
  
  elements.servicesContainer.innerHTML = categories.map(cat => {
    const servicesInCat = SERVICES.filter(s => s.category === cat);
    const catIcon = CATEGORY_ICONS[cat] || '';
    
    return `
      <div class="category-group" data-category="${cat}">
        <div class="category-title">
          <span>${catIcon}</span> ${cat}
        </div>
        <div class="services-grid">
          ${servicesInCat.map(svc => {
            if (svc.disabled) {
              return `
                <div class="service-checkbox-card disabled" 
                     data-tooltip="${svc.tooltip}"
                     data-name="${svc.name.toLowerCase()}"
                     tabindex="-1"
                     aria-disabled="true">
                  <div class="service-icon-wrapper">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                    </svg>
                  </div>
                  <span class="service-label">${svc.name}</span>
                </div>
              `;
            }
            
            return `
              <div class="service-checkbox-card" 
                   data-id="${svc.id}" 
                   data-name="${svc.name.toLowerCase()}"
                   role="checkbox" 
                   aria-checked="false" 
                   tabindex="0">
                <div class="checkbox-indicator">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div class="service-icon-wrapper">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                  </svg>
                </div>
                <span class="service-label">${svc.name}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');

  // Add click & keydown handlers for enabled services
  const cards = elements.servicesContainer.querySelectorAll('.service-checkbox-card:not(.disabled)');
  cards.forEach(card => {
    const svcId = card.getAttribute('data-id');
    
    // Click Select
    card.addEventListener('click', () => toggleService(svcId));
    
    // Keyboard Select (Space/Enter)
    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleService(svcId);
      }
    });
  });
}

// FEATURE 6: RENDER BLOG INDEX CARDS
function renderBlogIndex() {
  elements.blogGrid.innerHTML = BLOG_POSTS.map(post => {
    return `
      <div class="blog-card">
        <div>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
        </div>
        <div class="blog-card-footer">
          <a href="#blog/${post.slug}" class="blog-card-link">Read →</a>
          <span class="blog-read-time">${post.readTime}</span>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   INTERACTIVE SELECTION & STEP FLOW CONTROLS
   ========================================================================== */

// CHOOSE FRAMEWORK (Step 1)
function selectFramework(fwId) {
  state.framework = fwId;
  
  // Update HTML active state
  const cards = elements.frameworkGrid.querySelectorAll('.framework-card');
  cards.forEach(card => {
    const cardId = card.getAttribute('data-id');
    if (cardId === fwId) {
      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');
    } else {
      card.classList.remove('selected');
      card.setAttribute('aria-checked', 'false');
    }
  });
  
  elements.btnStep1Next.removeAttribute('disabled');
}

// TOGGLE SERVICES (Step 2)
function toggleService(svcId) {
  if (state.services.has(svcId)) {
    state.services.delete(svcId);
  } else {
    state.services.add(svcId);
  }
  
  // Update HTML active state
  const cards = elements.servicesContainer.querySelectorAll(`[data-id="${svcId}"]`);
  cards.forEach(card => {
    const isChecked = state.services.has(svcId);
    if (isChecked) {
      card.classList.add('checked');
      card.setAttribute('aria-checked', 'true');
    } else {
      card.classList.remove('checked');
      card.setAttribute('aria-checked', 'false');
    }
  });

  // FEATURE 2: Real-time Smart Warnings update
  evaluateWarnings();
}

// STEP CARD TRANSITION HANDLER
function transitionToStep(targetStep) {
  const currentCard = document.getElementById(`step-${state.step}-card`);
  const targetCard = document.getElementById(`step-${targetStep}-card`);
  
  if (!currentCard || !targetCard) return;
  
  function executeCardSwitch() {
    currentCard.style.opacity = '0';
    currentCard.style.transform = 'translateY(8px)';
    
    setTimeout(() => {
      currentCard.classList.remove('active');
      
      targetCard.classList.add('active');
      targetCard.style.opacity = '0';
      targetCard.style.transform = 'translateY(8px)';
      
      // Force layout repaint
      targetCard.offsetHeight;
      
      targetCard.style.opacity = '1';
      targetCard.style.transform = 'translateY(0)';
      
      updateStepIndicator(targetStep);
      state.step = targetStep;
      updateHowItWorksVisibility();
      
      elements.stepIndicator.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      if (targetStep === 3) {
        compileDotenv();
      }
    }, 200);
  }

  // Forward transitions get a terminal boot sequence transition
  if (targetStep === 2 && state.step === 1) {
    const selectedFw = FRAMEWORKS.find(f => f.id === state.framework);
    const fwName = selectedFw ? selectedFw.name.toLowerCase() : state.framework;
    playTerminalStepTransition(1, 2, `&gt; stack selected: ${fwName}`, `loading services...`, executeCardSwitch);
  } else if (targetStep === 3 && state.step === 2) {
    const svcCount = state.services.size;
    playTerminalStepTransition(2, 3, `&gt; integrations selected: ${svcCount} services`, `generating your .env...`, executeCardSwitch);
  } else {
    // Backwards transition
    executeCardSwitch();
  }
}

// UPDATE PROGRESS STEP INDICATORS
function updateStepIndicator(step) {
  const steps = elements.stepIndicator.querySelectorAll('.step-indicator-item');
  steps.forEach(indicator => {
    const indicatorStep = parseInt(indicator.getAttribute('data-step'));
    
    indicator.classList.remove('active', 'completed');
    if (indicatorStep === step) {
      indicator.classList.add('active');
    } else if (indicatorStep < step) {
      indicator.classList.add('completed');
    }
  });
  
  const line1 = document.getElementById('line-1');
  const line2 = document.getElementById('line-2');
  
  if (step >= 2) {
    line1.classList.add('active');
  } else {
    line1.classList.remove('active');
  }
  
  if (step >= 3) {
    line2.classList.add('active');
  } else {
    line2.classList.remove('active');
  }
}

// UPDATE HOW IT WORKS SECTIONS VISIBILITY
function updateHowItWorksVisibility() {
  const howItWorks = document.getElementById('how-it-works');
  if (!howItWorks) return;
  
  const hash = window.location.hash || '#home';
  const isHomePage = (hash === '#home' || hash === '' || hash.startsWith('#how-it-works'));
  
  if (isHomePage && state.step === 1) {
    howItWorks.style.display = 'block';
  } else {
    howItWorks.style.display = 'none';
  }
}

// Mobile Hamburger Navigation Helpers
function toggleMobileMenu() {
  if (!elements.mobileMenu || !elements.menuToggle) return;
  const isOpen = elements.mobileMenu.classList.toggle('open');
  elements.menuToggle.textContent = isOpen ? '[ close ]' : '[ menu ]';
  elements.menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function closeMobileMenu() {
  if (!elements.mobileMenu || !elements.menuToggle) return;
  elements.mobileMenu.classList.remove('open');
  elements.menuToggle.textContent = '[ menu ]';
  elements.menuToggle.setAttribute('aria-expanded', 'false');
}

/* ==========================================================================
   FEATURE 4 — STEP 2 LIVE SEARCH
   ========================================================================== */
function handleServiceSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  const categoryGroups = elements.servicesContainer.querySelectorAll('.category-group');
  let overallVisible = 0;
  
  categoryGroups.forEach(group => {
    const cards = group.querySelectorAll('.service-checkbox-card');
    let groupVisible = 0;
    
    cards.forEach(card => {
      const serviceName = card.getAttribute('data-name');
      if (serviceName.includes(query)) {
        card.style.display = 'flex';
        groupVisible++;
        overallVisible++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // If no matching cards in this category, hide the category title too
    if (groupVisible === 0) {
      group.style.display = 'none';
    } else {
      group.style.display = 'flex';
    }
  });
  
  // Show empty state if overall search yields zero matches
  if (overallVisible === 0) {
    elements.searchEmptyState.style.display = 'block';
    elements.searchEmptyState.textContent = `No services found for '${query}' — try a different name.`;
  } else {
    elements.searchEmptyState.style.display = 'none';
  }
}

/* ==========================================================================
   FEATURE 2 — SMART VALIDATION WARNINGS ENGINE
   ========================================================================== */
function evaluateWarnings() {
  const selected = state.services;
  
  // Core Helper: Check categories
  const hasDatabase = [...selected].some(id => {
    const s = SERVICES.find(svc => svc.id === id);
    return s && s.category === 'DATABASE';
  });
  
  const hasAuth = [...selected].some(id => {
    const s = SERVICES.find(svc => svc.id === id);
    return s && s.category === 'AUTHENTICATION';
  });

  const activeWarnings = [];

  // Warn 1: Payment but no DB
  const hasPayments = [...selected].some(id => {
    const s = SERVICES.find(svc => svc.id === id);
    return s && s.category === 'PAYMENTS';
  });
  if (hasPayments && !hasDatabase) {
    activeWarnings.push({
      id: 'warn_payment_db',
      text: '⚠️ Payment services typically need a database to store transaction records and customer data.'
    });
  }

  // Warn 2: NextAuth or Lucia Auth but no DB
  const hasAuthAdapter = selected.has('nextauth') || selected.has('lucia');
  if (hasAuthAdapter && !hasDatabase) {
    activeWarnings.push({
      id: 'warn_nextauth_db',
      text: '⚠️ NextAuth and Lucia Auth require a database adapter to persist sessions and user accounts.'
    });
  }

  // Warn 3: AI but no Auth
  const hasAI = [...selected].some(id => {
    const s = SERVICES.find(svc => svc.id === id);
    return s && s.category === 'AI & LLMs';
  });
  if (hasAI && !hasAuth) {
    activeWarnings.push({
      id: 'warn_ai_auth',
      text: '⚠️ AI endpoints can be expensive — consider adding authentication to protect your API routes.'
    });
  }

  // Warn 4: Cloud Storage but no Auth
  const hasCloudStorage = [...selected].some(id => {
    const s = SERVICES.find(svc => svc.id === id);
    return s && s.category === 'STORAGE';
  });
  if (hasCloudStorage && !hasAuth) {
    activeWarnings.push({
      id: 'warn_s3_auth',
      text: '⚠️ Cloud storage buckets without auth protection can lead to accidental public exposure.'
    });
  }

  // Filter out manually dismissed warnings
  const warningsToShow = activeWarnings.filter(w => !state.dismissedWarnings.has(w.id));

  // Render warnings banners
  elements.validationWarningsContainer.innerHTML = warningsToShow.map(w => {
    return `
      <div class="warning-banner" data-id="${w.id}">
        <p>${w.text}</p>
        <button class="btn-warning-close" aria-label="Dismiss warning" onclick="dismissWarning('${w.id}')">×</button>
      </div>
    `;
  }).join('');
}

// Global scope window handler to allow click closes on banners
window.dismissWarning = function(id) {
  state.dismissedWarnings.add(id);
  
  // Animate slide-up/fade out of banner
  const banner = elements.validationWarningsContainer.querySelector(`[data-id="${id}"]`);
  if (banner) {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-8px)';
    banner.style.transition = 'all 0.18s ease';
    
    setTimeout(() => {
      evaluateWarnings();
    }, 180);
  }
};

/* ==========================================================================
   FEATURE 5 — REMEMBER LAST STACK (LOCAL STORAGE)
   ========================================================================== */
function saveCurrentStackToStorage() {
  if (state.framework) {
    localStorage.setItem('env_last_framework', state.framework);
    localStorage.setItem('env_last_services', JSON.stringify([...state.services]));
  }
}

function handleStorageCheck() {
  const savedFw = localStorage.getItem('env_last_framework');
  const savedSvcsRaw = localStorage.getItem('env_last_services');
  
  if (savedFw && savedSvcsRaw) {
    try {
      const savedSvcs = JSON.parse(savedSvcsRaw);
      
      const fwObj = FRAMEWORKS.find(f => f.id === savedFw);
      const fwName = fwObj ? fwObj.name : 'Unknown';
      
      const svcNames = savedSvcs.map(id => {
        const s = SERVICES.find(svc => svc.id === id);
        return s ? s.name : '';
      }).filter(Boolean).join(', ');
      
      const svcListText = svcNames ? ` + ${svcNames}` : '';
      
      // Render localStorage restore banner
      elements.storageWelcomeBanner.innerHTML = `
        <p>👋 Welcome back! Last time you used <strong>${fwName}${svcListText}</strong>.</p>
        <div class="storage-banner-actions">
          <button id="btn-restore-selection" class="btn-banner-link restore">Restore Selection</button>
          <button id="btn-fresh-start" class="btn-banner-link fresh">Start Fresh</button>
          <button id="btn-storage-close" class="btn-banner-close" aria-label="Dismiss banner">×</button>
        </div>
      `;
      
      elements.storageWelcomeBanner.style.display = 'flex';
      
      // Add Event Listeners inside dynamic banner
      document.getElementById('btn-restore-selection').addEventListener('click', () => {
        restoreSelection(savedFw, savedSvcs);
      });
      document.getElementById('btn-fresh-start').addEventListener('click', () => {
        dismissStorageBanner(true); // deletes keys
      });
      document.getElementById('btn-storage-close').addEventListener('click', () => {
        dismissStorageBanner(false); // preserves keys but closes
      });
    } catch (e) {
      console.error('Failed parsing saved stacks from localStorage', e);
    }
  }
}

function restoreSelection(fwId, svcIds) {
  // Clear any existing selections
  state.services.clear();
  
  // Select Framework
  selectFramework(fwId);
  
  // Select Services
  svcIds.forEach(id => {
    state.services.add(id);
    
    // Highlight checkbox DOM cards
    const card = elements.servicesContainer.querySelector(`[data-id="${id}"]`);
    if (card) {
      card.classList.add('checked');
      card.setAttribute('aria-checked', 'true');
    }
  });
  
  // Suppress banner and proceed
  elements.storageWelcomeBanner.style.display = 'none';
  
  // Evaluate warnings and compile output instantly
  evaluateWarnings();
  compileDotenv();
  
  // Force active tab to default .env
  toggleOutputTab('env');
  
  // Move directly to Step 3
  transitionToStep(3);
}

function dismissStorageBanner(deleteKeys) {
  elements.storageWelcomeBanner.style.display = 'none';
  if (deleteKeys) {
    localStorage.removeItem('env_last_framework');
    localStorage.removeItem('env_last_services');
  }
}

/* ==========================================================================
   FEATURE 3 — SHARE STACK URL ROUTINES
   ========================================================================== */
function handleUrlImport() {
  const urlParams = new URLSearchParams(window.location.search);
  const stack = urlParams.get('stack');
  const servicesRaw = urlParams.get('services');
  
  if (stack) {
    const fwObj = FRAMEWORKS.find(f => f.id === stack);
    if (fwObj) {
      // 1. Silent Framework select
      state.framework = stack;
      
      // Highlight card selection
      setTimeout(() => {
        const card = elements.frameworkGrid.querySelector(`[data-id="${stack}"]`);
        if (card) card.classList.add('selected');
      }, 50);
      
      // 2. Select Services
      state.services.clear();
      if (servicesRaw) {
        const servicesList = servicesRaw.split(',');
        servicesList.forEach(svcId => {
          const s = SERVICES.find(svc => svc.id === svcId);
          if (s && !s.disabled) {
            state.services.add(svcId);
            
            // Highlight card selection
            setTimeout(() => {
              const card = elements.servicesContainer.querySelector(`[data-id="${svcId}"]`);
              if (card) card.classList.add('checked');
            }, 50);
          }
        });
      }
      
      // 3. Render Dotenv Step 3
      evaluateWarnings();
      
      // 4. Force Direct Jump
      state.step = 3;
      setTimeout(() => {
        elements.step1Card.classList.remove('active');
        elements.step3Card.classList.add('active');
        elements.step3Card.style.opacity = '1';
        elements.step3Card.style.transform = 'translateY(0)';
        updateStepIndicator(3);
        compileDotenv();
      }, 100);
      
      return true; // Successfully imported selections
    }
  }
  return false;
}

function generateShareLink() {
  const params = new URLSearchParams();
  params.set('stack', state.framework);
  if (state.services.size > 0) {
    params.set('services', [...state.services].join(','));
  }
  
  const link = window.location.origin + window.location.pathname + '?' + params.toString();
  elements.shareUrlInput.value = link;
}

function handleCopyShareLink() {
  const linkText = elements.shareUrlInput.value;
  if (!linkText) return;
  
  navigator.clipboard.writeText(linkText)
    .then(() => {
      const originalText = elements.btnShareCopy.querySelector('.btn-text').textContent;
      elements.btnShareCopy.querySelector('.btn-text').textContent = '✓ Copied!';
      elements.btnShareCopy.classList.add('copied');
      
      setTimeout(() => {
        elements.btnShareCopy.querySelector('.btn-text').textContent = originalText;
        elements.btnShareCopy.classList.remove('copied');
      }, 2000);
    })
    .catch(err => {
      console.error('Failed copying share url: ', err);
    });
}

/* ==========================================================================
   FEATURE 1 — .env vs .env.example COMPILER & TAB TOGGLES
   ========================================================================== */
function toggleOutputTab(tabId) {
  state.activeTab = tabId;
  
  if (tabId === 'env') {
    elements.tabBtnEnv.classList.add('active');
    elements.tabBtnExample.classList.remove('active');
  } else {
    elements.tabBtnEnv.classList.remove('active');
    elements.tabBtnExample.classList.add('active');
  }
  
  // Re-run compilation mapping with correct active outputs
  compileDotenv();
}

/* ==========================================================================
   CORE .env COMPILATION ENGINE
   ========================================================================== */
function compileDotenv(playTypewriter = true) {
  const selectedFrameworkObj = FRAMEWORKS.find(fw => fw.id === state.framework);
  const prefixType = selectedFrameworkObj ? selectedFrameworkObj.prefixType : 'none';
  const prefixText = selectedFrameworkObj ? selectedFrameworkObj.prefixText : '';
  const selectedFwName = selectedFrameworkObj ? selectedFrameworkObj.name : 'Selected Framework';
  const isExample = state.activeTab === 'example';
  
  let outputLines = [];
  
  // A. Add Production Warning Header if production environment is selected
  if (state.activeEnv === 'production' && !isExample) {
    outputLines.push(`# ⚠️ WARNING: PRODUCTION ENVIRONMENT`);
    outputLines.push(`# NEVER commit production credentials to Git.`);
    outputLines.push(`# Double-check that permissions and restrictions are active on all live services.`);
    outputLines.push('');
  }

  // B. Add Master File Header Block
  outputLines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  if (isExample) {
    outputLines.push(`# .env.EXAMPLE TEMPLATE GENERATED FOR: ${selectedFwName.toUpperCase()} [${state.activeEnv.toUpperCase()}]`);
    outputLines.push(`# Share this file with your development team. Safe to commit to Git.`);
  } else {
    outputLines.push(`# .env TEMPLATE GENERATED FOR: ${selectedFwName.toUpperCase()} [${state.activeEnv.toUpperCase()}]`);
    outputLines.push(`# Fill in your actual credentials. Never commit this file to Git.`);
  }
  outputLines.push(`# Created on ${new Date().toISOString().split('T')[0]} via .env Generator`);
  outputLines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  outputLines.push('');

  // C. General Configuration Block
  outputLines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  outputLines.push(`# GENERAL CONFIGURATION`);
  outputLines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  
  const envConfig = ENV_VALUES[state.activeEnv];
  outputLines.push(envConfig.comment);
  
  const generalVars = getFrameworkGeneralVars(state.framework, state.activeEnv);

  generalVars.forEach(v => {
    let varName = v.name;
    let commentAnnotation = '';
    
    // Dynamic Variable Prefix Compiling based on Framework rules
    if (v.type === 'public') {
      if (prefixType === 'nextjs') {
        varName = `NEXT_PUBLIC_${v.name}`;
        commentAnnotation = ` # Prefixed for Next.js browser-side availability`;
      } else if (prefixType === 'vite') {
        varName = `VITE_${v.name}`;
        commentAnnotation = ` # Prefixed for Vite build-time client bundle inclusion`;
      } else if (prefixType === 'astro') {
        varName = `PUBLIC_${v.name}`;
        commentAnnotation = ` # Prefixed for Astro browser-side availability`;
      }
    }
    
    outputLines.push(`# ${v.comment}`);
    if (v.docUrl) {
      outputLines.push(`# Get it from: ${v.docUrl}`);
    }
    
    let activeValue = isExample ? '' : v.value;
    
    // Substitute secret if generated
    if (!isExample && isSecretVariable(varName)) {
      const generatedSecret = state.generatedSecrets[state.activeEnv]?.[varName];
      if (generatedSecret) {
        activeValue = generatedSecret;
      }
    }
    
    outputLines.push(`${varName}=${activeValue}${commentAnnotation}`);
    outputLines.push('');
  });

  // D. Flutter Warning Block
  if (prefixType === 'flutter') {
    outputLines.push(`# 💡 FLUTTER NOTE:`);
    outputLines.push(`# To load this file in Flutter, integrate the 'flutter_dotenv' package.`);
    outputLines.push(`# 1. Add flutter_dotenv to dependencies in your pubspec.yaml.`);
    outputLines.push(`# 2. Reference this .env file path inside your pubspec.yaml assets block.`);
    outputLines.push(`# 3. Initialize inside main.dart: await dotenv.load(fileName: ".env");`);
    outputLines.push('');
  }

  // E. Map chosen integrations to variable compiler
  if (state.services.size === 0) {
    outputLines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    outputLines.push(`# No services selected.`);
    outputLines.push(`# Go back to Step 2 to add integrations`);
    outputLines.push(`# and generate their API key variables.`);
    outputLines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  } else {
    state.services.forEach(svcId => {
      const service = SERVICES.find(s => s.id === svcId);
      if (!service) return;
      
      outputLines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      outputLines.push(`# ${service.name.toUpperCase()} INTEGRATION`);
      outputLines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      
      const svcVars = getServiceVariables(svcId, state.framework, state.activeEnv, envConfig);
      
      svcVars.forEach(v => {
        let varName = v.name;
        let commentAnnotation = '';
        
        // Dynamic Variable Prefix Compiling based on Framework rules
        if (v.type === 'public') {
          if (prefixType === 'nextjs') {
            varName = `NEXT_PUBLIC_${v.name}`;
            commentAnnotation = ` # Prefixed for Next.js browser-side availability`;
          } else if (prefixType === 'vite') {
            varName = `VITE_${v.name}`;
            commentAnnotation = ` # Prefixed for Vite build-time client bundle inclusion`;
          } else if (prefixType === 'astro') {
            varName = `PUBLIC_${v.name}`;
            commentAnnotation = ` # Prefixed for Astro browser-side availability`;
          }
        }
        
        // Single line descriptions & API keys references URL
        outputLines.push(`# ${v.comment}`);
        if (v.docUrl) {
          outputLines.push(`# Get it from: ${v.docUrl}`);
        }
        
        // Example mode empties all placeholder values
        let activeValue = isExample ? '' : v.placeholder;
        
        // Intercept database/redis environment aware substitutions for non-overridden standard variables
        if (!isExample) {
          if (varName === 'DATABASE_URL' && envConfig.DATABASE_URL) {
            activeValue = envConfig.DATABASE_URL;
          } else if (varName === 'REDIS_URL' && envConfig.REDIS_URL) {
            activeValue = envConfig.REDIS_URL;
          }
        }

        // Substitute secret key placeholders using environment-specific generated secrets if available
        if (!isExample && isSecretVariable(varName)) {
          const generatedSecret = state.generatedSecrets[state.activeEnv]?.[varName];
          if (generatedSecret) {
            activeValue = generatedSecret;
          }
        }
        
        outputLines.push(`${varName}=${activeValue}${commentAnnotation}`);
        outputLines.push('');
      });
    });
  }
  
  const rawContent = outputLines.join('\n').trim() + '\n';
  
  // Render syntax-highlighted HTML Output
  renderSyntaxHighlightedCode(rawContent, playTypewriter);
  
  // Store plain text string in button data attributes for easy file operations
  elements.btnCopyEnv.setAttribute('data-raw', rawContent);
  elements.btnDownloadEnv.setAttribute('data-raw', rawContent);
}

// Custom parser to format raw .env with custom spans
function renderSyntaxHighlightedCode(codeText, playTypewriter = true) {
  const escapedHtml = codeText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  const lines = escapedHtml.split('\n');
  const highlightedLines = lines.map(line => {
    // 1. Comment Line (entirely starts with #)
    if (line.trim().startsWith('#')) {
      return `<span class="token-comment">${line}</span>`;
    }
    
    // 2. Variable assignments (VAR_NAME=placeholder)
    if (line.includes('=')) {
      const firstEqualIdx = line.indexOf('=');
      const varName = line.substring(0, firstEqualIdx);
      let valuePart = line.substring(firstEqualIdx + 1);
      
      let commentPart = '';
      
      // Extract inline prefix comments if any exist
      if (valuePart.includes(' #')) {
        const commentIdx = valuePart.indexOf(' #');
        commentPart = valuePart.substring(commentIdx);
        valuePart = valuePart.substring(0, commentIdx);
      }
      
      const isSecret = isSecretVariable(varName);
      const isExample = state.activeTab === 'example';
      
      let valClass = 'token-value';
      let actionButton = '';
      
      if (isSecret && !isExample) {
        const hasGenerated = state.generatedSecrets[state.activeEnv]?.[varName] !== undefined;
        if (hasGenerated) {
          valClass = 'token-value generated';
          actionButton = ` <button class="btn-inline-gen" data-var="${varName}">↺ regen</button>`;
        } else {
          actionButton = ` <button class="btn-inline-gen" data-var="${varName}">⚡ gen</button>`;
        }
      }
      
      const highlightedVar = `<span class="token-name">${varName}</span>`;
      const highlightedOperator = `<span class="token-operator">=</span>`;
      const highlightedVal = `<span class="${valClass}">${valuePart}</span>`;
      const highlightedInlineComment = commentPart ? `<span class="token-prefix-note">${commentPart}</span>` : '';
      
      return `${highlightedVar}${highlightedOperator}${highlightedVal}${actionButton}${highlightedInlineComment}`;
    }
    
    // 3. Muted newlines
    return line;
  });

  // Get raw lines for character-by-character typing
  const rawLines = codeText.split('\n');

  // Cancel any active typewriter animation
  if (state.typewriterTimeout) {
    clearTimeout(state.typewriterTimeout);
    state.typewriterTimeout = null;
  }

  if (!playTypewriter) {
    elements.dotenvCodeRender.innerHTML = highlightedLines.join('\n');
    return;
  }

  // Set up typewriter state
  let currentLineIdx = 0;
  let currentCharIdx = 0;
  const renderedLines = new Array(highlightedLines.length).fill('');
  
  function typeNextChar() {
    // If the step card is no longer active or start over was clicked, stop
    if (state.step !== 3) {
      return;
    }

    const rawLine = rawLines[currentLineIdx];
    
    if (currentCharIdx < rawLine.length) {
      // Type character
      const typedSegment = rawLine.substring(0, currentCharIdx + 1);
      renderedLines[currentLineIdx] = typedSegment + '<span class="blinking-cursor">|</span>';
      
      // Render currently visible lines
      elements.dotenvCodeRender.innerHTML = renderedLines.slice(0, currentLineIdx + 1).join('\n');
      
      currentCharIdx++;
      state.typewriterTimeout = setTimeout(typeNextChar, 8);
    } else {
      // Line finished typing! Replace with fully highlighted HTML (no cursor)
      renderedLines[currentLineIdx] = highlightedLines[currentLineIdx];
      elements.dotenvCodeRender.innerHTML = renderedLines.slice(0, currentLineIdx + 1).join('\n');
      
      // Scroll code block body to bottom to keep active line visible
      const codeBlockBody = document.querySelector('.code-block-body');
      if (codeBlockBody) {
        codeBlockBody.scrollTop = codeBlockBody.scrollHeight;
      }
      
      // Move to next line
      currentLineIdx++;
      currentCharIdx = 0;
      
      if (currentLineIdx < highlightedLines.length) {
        state.typewriterTimeout = setTimeout(typeNextChar, 8);
      } else {
        // Entire typewriter output finished!
        state.typewriterTimeout = null;
      }
    }
  }
  
  // Start typewriter rendering
  typeNextChar();
}

/* ==========================================================================
   FILE OPERATIONS & UTILITIES
   ========================================================================== */

// ENVIRONMENT VALUE SCHEMES
const ENV_VALUES = {
  development: {
    comment: '# Local development — safe to use defaults',
    DATABASE_URL: 'postgresql://localhost:5432/myapp_dev',
    NODE_ENV: 'development',
    APP_ENV: 'development',
    API_BASE_URL: 'http://localhost:3000',
    REDIS_URL: 'redis://localhost:6379',
    DEBUG: 'true',
    LOG_LEVEL: 'debug'
  },
  staging: {
    comment: '# Staging — use separate credentials from production',
    DATABASE_URL: 'postgresql://staging-db.internal:5432/myapp_staging',
    NODE_ENV: 'production',
    APP_ENV: 'staging',
    API_BASE_URL: 'https://staging.yourdomain.com',
    REDIS_URL: 'redis://staging-redis.internal:6379',
    DEBUG: 'false',
    LOG_LEVEL: 'warn'
  },
  production: {
    comment: '# Production — NEVER use development credentials here',
    DATABASE_URL: 'postgresql://prod-db.internal:5432/myapp_prod',
    NODE_ENV: 'production',
    APP_ENV: 'production',
    API_BASE_URL: 'https://yourdomain.com',
    REDIS_URL: 'redis://prod-redis.internal:6379',
    DEBUG: 'false',
    LOG_LEVEL: 'error'
  }
};

// Helper to get general/framework environment variables dynamically
function getFrameworkGeneralVars(framework, activeEnv) {
  const envConfig = ENV_VALUES[activeEnv];
  
  switch (framework) {
    case 'rails':
      return [
        {
          name: 'RAILS_ENV',
          type: 'secret',
          comment: 'Ruby on Rails environment stage',
          value: activeEnv,
          docUrl: 'https://guides.rubyonrails.org/'
        },
        {
          name: 'SECRET_KEY_BASE',
          type: 'secret',
          comment: 'Secure cryptographic key base for session cookies',
          value: '',
          docUrl: 'https://guides.rubyonrails.org/security.html'
        },
        {
          name: 'RAILS_MASTER_KEY',
          type: 'secret',
          comment: 'Decryption key for credentials.yml.enc',
          value: '',
          docUrl: 'https://guides.rubyonrails.org/security.html'
        }
      ];
      
    case 'springboot':
      return [
        {
          name: 'SPRING_PROFILES_ACTIVE',
          type: 'secret',
          comment: 'Active Spring Boot application profile (dev, staging, prod)',
          value: activeEnv === 'development' ? 'dev' : (activeEnv === 'staging' ? 'staging' : 'prod'),
          docUrl: 'https://spring.io/projects/spring-boot/'
        },
        {
          name: 'SERVER_PORT',
          type: 'secret',
          comment: 'Spring Boot embedded web server binding port',
          value: '8080',
          docUrl: 'https://spring.io/projects/spring-boot/'
        }
      ];
      
    case 'aspnet':
      return [
        {
          name: 'ASPNETCORE_ENVIRONMENT',
          type: 'secret',
          comment: 'ASP.NET Core hosting environment (Development, Staging, Production)',
          value: activeEnv === 'development' ? 'Development' : (activeEnv === 'staging' ? 'Staging' : 'Production'),
          docUrl: 'https://learn.microsoft.com/en-us/aspnet/core/'
        },
        {
          name: 'ASPNETCORE_URLS',
          type: 'secret',
          comment: 'Network binding URLs for the host server',
          value: activeEnv === 'development' ? 'http://localhost:5000' : (activeEnv === 'staging' ? 'https://staging.yourdomain.com' : 'https://yourdomain.com'),
          docUrl: 'https://learn.microsoft.com/en-us/aspnet/core/'
        }
      ];
      
    case 'go':
      return [
        {
          name: 'SERVER_PORT',
          type: 'secret',
          comment: 'Local server port for Gin/Fiber router binding',
          value: '8080',
          docUrl: 'https://gin-gonic.com/docs/'
        },
        {
          name: 'JWT_SECRET',
          type: 'secret',
          comment: 'Cryptographic signature verification secret for JWT tokens',
          value: '',
          docUrl: 'https://jwt.io/'
        }
      ];
      
    case 'rust':
      return [
        {
          name: 'RUST_LOG',
          type: 'secret',
          comment: 'Log configuration level for env_logger / tracing',
          value: activeEnv === 'development' ? 'debug' : (activeEnv === 'staging' ? 'info' : 'warn'),
          docUrl: 'https://actix.rs/'
        },
        {
          name: 'SERVER_HOST',
          type: 'secret',
          comment: 'Server binding host interface address',
          value: activeEnv === 'development' ? '127.0.0.1' : '0.0.0.0',
          docUrl: 'https://actix.rs/'
        },
        {
          name: 'SERVER_PORT',
          type: 'secret',
          comment: 'Server binding port for Actix-web listener',
          value: '8080',
          docUrl: 'https://actix.rs/'
        }
      ];
      
    case 'phoenix':
      return [
        {
          name: 'MIX_ENV',
          type: 'secret',
          comment: 'Elixir Mix build environment stage',
          value: activeEnv === 'development' ? 'dev' : (activeEnv === 'staging' ? 'staging' : 'prod'),
          docUrl: 'https://hexdocs.pm/phoenix/'
        },
        {
          name: 'SECRET_KEY_BASE',
          type: 'secret',
          comment: 'Cryptographic signature base for sessions and sockets',
          value: '',
          docUrl: 'https://hexdocs.pm/phoenix/'
        },
        {
          name: 'PHX_HOST',
          type: 'secret',
          comment: 'Public host domain name for endpoint routing',
          value: activeEnv === 'development' ? 'localhost' : (activeEnv === 'staging' ? 'staging.yourdomain.com' : 'yourdomain.com'),
          docUrl: 'https://hexdocs.pm/phoenix/'
        },
        {
          name: 'PORT',
          type: 'secret',
          comment: 'HTTP server binding port',
          value: '4000',
          docUrl: 'https://hexdocs.pm/phoenix/'
        }
      ];
      
    case 'remix':
      return [
        {
          name: 'NODE_ENV',
          type: 'secret',
          comment: 'Node.js environment stage',
          value: activeEnv === 'development' ? 'development' : 'production',
          docUrl: 'https://remix.run/'
        },
        {
          name: 'SESSION_SECRET',
          type: 'secret',
          comment: 'Cryptographic key for signing session cookies',
          value: '',
          docUrl: 'https://remix.run/'
        }
      ];
      
    case 'astro':
      return [
        {
          name: 'NODE_ENV',
          type: 'secret',
          comment: 'Node.js environment stage',
          value: activeEnv === 'development' ? 'development' : 'production',
          docUrl: 'https://docs.astro.build/'
        },
        {
          name: 'API_BASE_URL',
          type: 'public',
          comment: 'Root endpoint for core API service router',
          value: envConfig.API_BASE_URL,
          docUrl: 'https://docs.astro.build/'
        }
      ];
      
    case 'bun':
      return [
        {
          name: 'BUN_ENV',
          type: 'secret',
          comment: 'Bun runtime environment mode',
          value: activeEnv,
          docUrl: 'https://bun.sh/'
        },
        {
          name: 'PORT',
          type: 'secret',
          comment: 'Bun server binding port',
          value: '3000',
          docUrl: 'https://elysiajs.com/'
        },
        {
          name: 'JWT_SECRET',
          type: 'secret',
          comment: 'Elysia JWT plugin secret key',
          value: '',
          docUrl: 'https://elysiajs.com/'
        }
      ];
      
    case 'ktor':
      return [
        {
          name: 'KTOR_ENV',
          type: 'secret',
          comment: 'Ktor application environment config stage',
          value: activeEnv === 'development' ? 'development' : (activeEnv === 'staging' ? 'staging' : 'production'),
          docUrl: 'https://ktor.io/'
        },
        {
          name: 'SERVER_PORT',
          type: 'secret',
          comment: 'Ktor embedded server engine port',
          value: '8080',
          docUrl: 'https://ktor.io/'
        },
        {
          name: 'JWT_SECRET',
          type: 'secret',
          comment: 'Cryptographic token verification secret for Ktor JWT auth provider',
          value: '',
          docUrl: 'https://ktor.io/'
        }
      ];
      
    default:
      return [
        { name: 'NODE_ENV', type: 'secret', comment: 'Target environment runtime (development, production)', value: envConfig.NODE_ENV },
        { name: 'APP_ENV', type: 'secret', comment: 'Application stage (development, staging, production)', value: envConfig.APP_ENV },
        { name: 'API_BASE_URL', type: 'public', comment: 'Root endpoint for core API service router', value: envConfig.API_BASE_URL },
        { name: 'DEBUG', type: 'secret', comment: 'Enable verbose developer logs and stack traces', value: envConfig.DEBUG },
        { name: 'LOG_LEVEL', type: 'secret', comment: 'Minimum severity level for logging engines', value: envConfig.LOG_LEVEL }
      ];
  }
}

// Helper to parse standard database connection strings into components
function parseConnectionString(connectionStr) {
  try {
    let cleanStr = connectionStr;
    if (cleanStr.startsWith('jdbc:')) {
      cleanStr = cleanStr.substring(5);
    }
    const url = new URL(cleanStr);
    return {
      host: url.hostname || 'localhost',
      port: url.port || (url.protocol.startsWith('postgres') ? '5432' : '3306'),
      user: url.username || '',
      password: url.password || '',
      database: url.pathname ? url.pathname.substring(1) : ''
    };
  } catch (e) {
    const match = connectionStr.match(/^(?:[a-zA-Z0-9+.-]+:\/\/)?(?:([^:]+):([^@]+)@)?([^:/]+)(?::(\d+))?\/?(.*)$/);
    if (match) {
      return {
        host: match[3] || 'localhost',
        port: match[4] || '5432',
        user: match[1] || '',
        password: match[2] || '',
        database: match[5] || ''
      };
    }
    return null;
  }
}

// Helper to remap integration service variables based on framework conventions
function getServiceVariables(serviceId, framework, activeEnv, envConfig) {
  const service = SERVICES.find(s => s.id === serviceId);
  if (!service) return [];
  
  if (framework === 'springboot') {
    if (serviceId === 'postgres') {
      let dbUrl = envConfig.DATABASE_URL || 'postgresql://localhost:5432/myapp_dev';
      let user = 'postgres';
      let pwd = 'password';
      const parsed = parseConnectionString(dbUrl);
      if (parsed) {
        if (parsed.user) user = parsed.user;
        if (parsed.password) pwd = parsed.password;
      }
      if (dbUrl.startsWith('postgresql://')) {
        dbUrl = dbUrl.replace('postgresql://', 'jdbc:postgresql://');
      } else if (!dbUrl.startsWith('jdbc:')) {
        dbUrl = 'jdbc:postgresql://' + dbUrl;
      }
      return [
        {
          name: 'SPRING_DATASOURCE_URL',
          type: 'secret',
          placeholder: dbUrl,
          comment: 'Spring Boot datasource JDBC connection URL',
          docUrl: 'https://spring.io/projects/spring-boot/'
        },
        {
          name: 'SPRING_DATASOURCE_USERNAME',
          type: 'secret',
          placeholder: user,
          comment: 'Database username for datasource connection',
          docUrl: 'https://spring.io/projects/spring-boot/'
        },
        {
          name: 'SPRING_DATASOURCE_PASSWORD',
          type: 'secret',
          placeholder: pwd,
          comment: 'Database password for datasource connection',
          docUrl: 'https://spring.io/projects/spring-boot/'
        }
      ];
    }
    if (serviceId === 'mysql') {
      let dbUrl = envConfig.DATABASE_URL ? envConfig.DATABASE_URL.replace('postgresql', 'mysql') : 'mysql://root:password@localhost:3306/prod_db';
      let user = 'root';
      let pwd = 'password';
      const parsed = parseConnectionString(dbUrl);
      if (parsed) {
        if (parsed.user) user = parsed.user;
        if (parsed.password) pwd = parsed.password;
      }
      if (dbUrl.startsWith('mysql://')) {
        dbUrl = dbUrl.replace('mysql://', 'jdbc:mysql://');
      } else if (!dbUrl.startsWith('jdbc:')) {
        dbUrl = 'jdbc:mysql://' + dbUrl;
      }
      return [
        {
          name: 'SPRING_DATASOURCE_URL',
          type: 'secret',
          placeholder: dbUrl,
          comment: 'Spring Boot datasource JDBC connection URL',
          docUrl: 'https://spring.io/projects/spring-boot/'
        },
        {
          name: 'SPRING_DATASOURCE_USERNAME',
          type: 'secret',
          placeholder: user,
          comment: 'Database username for datasource connection',
          docUrl: 'https://spring.io/projects/spring-boot/'
        },
        {
          name: 'SPRING_DATASOURCE_PASSWORD',
          type: 'secret',
          placeholder: pwd,
          comment: 'Database password for datasource connection',
          docUrl: 'https://spring.io/projects/spring-boot/'
        }
      ];
    }
    if (serviceId === 'planetscale') {
      let dbUrl = 'mysql://username:pscale_pwd@aws.connect.psdb.co/db?sslaccept=strict';
      let user = 'username';
      let pwd = 'pscale_pwd';
      const parsed = parseConnectionString(dbUrl);
      if (parsed) {
        if (parsed.user) user = parsed.user;
        if (parsed.password) pwd = parsed.password;
      }
      if (dbUrl.startsWith('mysql://')) {
        dbUrl = dbUrl.replace('mysql://', 'jdbc:mysql://');
      } else if (!dbUrl.startsWith('jdbc:')) {
        dbUrl = 'jdbc:mysql://' + dbUrl;
      }
      return [
        {
          name: 'SPRING_DATASOURCE_URL',
          type: 'secret',
          placeholder: dbUrl,
          comment: 'Spring Boot datasource JDBC connection URL',
          docUrl: 'https://spring.io/projects/spring-boot/'
        },
        {
          name: 'SPRING_DATASOURCE_USERNAME',
          type: 'secret',
          placeholder: user,
          comment: 'Database username for datasource connection',
          docUrl: 'https://spring.io/projects/spring-boot/'
        },
        {
          name: 'SPRING_DATASOURCE_PASSWORD',
          type: 'secret',
          placeholder: pwd,
          comment: 'Database password for datasource connection',
          docUrl: 'https://spring.io/projects/spring-boot/'
        }
      ];
    }
  }
  
  if (framework === 'aspnet') {
    if (serviceId === 'postgres') {
      const dbUrl = envConfig.DATABASE_URL || 'postgresql://localhost:5432/myapp_dev';
      return [
        {
          name: 'ConnectionStrings__Default',
          type: 'secret',
          placeholder: dbUrl,
          comment: 'Primary database connection string for ASP.NET Core Entity Framework',
          docUrl: 'https://learn.microsoft.com/en-us/aspnet/core/'
        }
      ];
    }
    if (serviceId === 'mysql') {
      const dbUrl = envConfig.DATABASE_URL ? envConfig.DATABASE_URL.replace('postgresql', 'mysql') : 'mysql://root:password@localhost:3306/prod_db';
      return [
        {
          name: 'ConnectionStrings__Default',
          type: 'secret',
          placeholder: dbUrl,
          comment: 'Primary database connection string for ASP.NET Core Entity Framework',
          docUrl: 'https://learn.microsoft.com/en-us/aspnet/core/'
        }
      ];
    }
    if (serviceId === 'planetscale') {
      const dbUrl = 'mysql://username:pscale_pwd@aws.connect.psdb.co/db?sslaccept=strict';
      return [
        {
          name: 'ConnectionStrings__Default',
          type: 'secret',
          placeholder: dbUrl,
          comment: 'Primary database connection string for ASP.NET Core Entity Framework',
          docUrl: 'https://learn.microsoft.com/en-us/aspnet/core/'
        }
      ];
    }
  }
  
  if (framework === 'go') {
    if (serviceId === 'postgres' || serviceId === 'mysql' || serviceId === 'planetscale') {
      let defaultPort = serviceId === 'postgres' ? '5432' : '3306';
      let defaultUser = serviceId === 'postgres' ? 'postgres' : 'root';
      let defaultDb = 'my_database';
      
      let host = 'localhost';
      let port = defaultPort;
      let user = defaultUser;
      let password = 'password';
      let dbName = defaultDb;
      
      let dbUrl = envConfig.DATABASE_URL;
      if (serviceId === 'mysql') {
        dbUrl = dbUrl ? dbUrl.replace('postgresql', 'mysql') : 'mysql://root:password@localhost:3306/prod_db';
      } else if (serviceId === 'planetscale') {
        dbUrl = 'mysql://username:pscale_pwd@aws.connect.psdb.co/db?sslaccept=strict';
      } else {
        dbUrl = dbUrl || 'postgresql://localhost:5432/myapp_dev';
      }
      
      const parsed = parseConnectionString(dbUrl);
      if (parsed) {
        host = parsed.host;
        port = parsed.port;
        if (parsed.user) user = parsed.user;
        if (parsed.password) password = parsed.password;
        if (parsed.database) dbName = parsed.database;
      }
      
      return [
        {
          name: 'DB_HOST',
          type: 'secret',
          placeholder: host,
          comment: 'Database host address (e.g. 127.0.0.1)',
          docUrl: 'https://gin-gonic.com/docs/'
        },
        {
          name: 'DB_PORT',
          type: 'secret',
          placeholder: port,
          comment: `Database network port (default: ${defaultPort})`,
          docUrl: 'https://gin-gonic.com/docs/'
        },
        {
          name: 'DB_USER',
          type: 'secret',
          placeholder: user,
          comment: 'Database connection user name',
          docUrl: 'https://gin-gonic.com/docs/'
        },
        {
          name: 'DB_PASSWORD',
          type: 'secret',
          placeholder: password,
          comment: 'Database connection user password',
          docUrl: 'https://gin-gonic.com/docs/'
        },
        {
          name: 'DB_NAME',
          type: 'secret',
          placeholder: dbName,
          comment: 'Database name',
          docUrl: 'https://gin-gonic.com/docs/'
        }
      ];
    }
  }
  
  return service.variables;
}

// FEATURE 7: Helper to check if a variable requires random secret generation
function isSecretVariable(name) {
  const upperName = name.toUpperCase();
  const exactSecrets = [
    'JWT_SECRET',
    'NEXTAUTH_SECRET',
    'APP_KEY',
    'SECRET_KEY',
    'APP_SECRET',
    'SESSION_SECRET',
    'ENCRYPTION_KEY',
    'WEBHOOK_SECRET',
    'SECRET_KEY_BASE',
    'SPRING_DATASOURCE_PASSWORD',
    'AUTH_SECRET',
    'RAILS_MASTER_KEY'
  ];
  if (exactSecrets.includes(upperName)) {
    return true;
  }
  
  if (upperName.endsWith('_SECRET') || upperName.endsWith('_KEY')) {
    // Exclude known third-party API keys
    const thirdPartyPrefixes = [
      'STRIPE', 'OPENAI', 'CLERK', 'FIREBASE', 'AWS', 'RESEND', 'POSTMARK', 'SENDGRID',
      'MAILGUN', 'DISCORD', 'SLACK', 'GITHUB', 'GOOGLE', 'TWITTER', 'LINKEDIN', 'PAYPAL',
      'LEMONSQUEEZY', 'RAZORPAY', 'SENTRY', 'LOGSNAG', 'MIXPANEL', 'HELLOSIGN', 'DOCUSIGN',
      'FATHOM', 'PLAUSIBLE', 'ANTHROPIC', 'GEMINI', 'GROQ', 'MISTRAL', 'DEEPSEEK', 'XAI',
      'COHERE', 'TOGETHER', 'ELEVENLABS', 'STABILITY', 'FAL', 'PERPLEXITY', 'TURSO', 'FAUNA',
      'KINDE', 'KEYCLOAK', 'MAGIC', 'CASHFREE', 'PADDLE', 'BRAINTREE', 'IMAGEKIT', 'BUNNY',
      'DATADOG', 'NEW_RELIC', 'HEROKU', 'PUSHER', 'ABLY', 'ALGOLIA', 'TYPESENSE', 'MEILISEARCH',
      'MAPBOX', 'HERE'
    ];
    const hasThirdPartyPrefix = thirdPartyPrefixes.some(prefix => upperName.startsWith(prefix));
    return !hasThirdPartyPrefix;
  }
  
  return false;
}

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

/* ==========================================================================
   EVENT LISTENERS SYSTEM
   ========================================================================== */
function setupEventListeners() {
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
function handleHashRoute() {
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
      elements.blogArticleContent.innerHTML = `
        <h1>${activePost.title}</h1>
        <div class="blog-meta" style="font-family:'JetBrains Mono', monospace; font-size:12px; color:var(--text-muted); margin-bottom:28px;">
          <span>Guides & Tutorial</span> • <span>${activePost.readTime}</span>
        </div>
        <div class="blog-markdown">
          ${activePost.content}
        </div>
      `;
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
}

// Intercept logo clicking to perform startover resets
elements.logoLink.addEventListener('click', (e) => {
  e.preventDefault();
  
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

  // 3. Clear URL hash
  if (history.replaceState) {
    history.replaceState(null, null, window.location.pathname);
  }
  
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


