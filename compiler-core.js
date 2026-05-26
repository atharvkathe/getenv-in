/* ==========================================================================
   GETENV.IN — CORE COMPILER ENGINE & CONSTANTS
   ========================================================================== */

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
  {
    id: 'hostinger',
    name: 'Hostinger',
    category: 'DEPLOYMENT & INFRA',
    variables: [
      { name: 'HOSTINGER_API_KEY', type: 'secret', placeholder: 'your_hostinger_api_key', comment: 'Get it from: https://hpanel.hostinger.com/api', docUrl: 'https://hpanel.hostinger.com/api' },
      { name: 'HOSTINGER_DOMAIN', type: 'secret', placeholder: 'your_domain_here', comment: 'Get it from: https://hpanel.hostinger.com/api', docUrl: 'https://hpanel.hostinger.com/api' }
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
    "slug": "nextjs-env-guide",
    "title": "Next.js Environment Variables: The Complete Guide",
    "seoTitle": "Next.js Environment Variables: The Complete Guide | getenv.in",
    "seoMeta": "Master Next.js environment variables. Learn the NEXT_PUBLIC_ prefix, cascading .env file hierarchies (.env.local, .env.production), server vs client scope, and avoid common security leakage mistakes.",
    "excerpt": "Everything you need to know about NEXT_PUBLIC_ prefixes, server-side vs client-side variables, and the .env.local vs .env.production cascade hierarchy.",
    "readTime": "8 min read",
    "content": "\n<p>Managing <strong>Next.js environment variables</strong> is a fundamental architectural skill for modern full-stack web development. Whether you are constructing a highly dynamic React application, compiling a static site, or running Server Actions in Next.js, separating your configurations from your application logic is vital. This comprehensive guide walks you through how environment variables work in Next.js, how they cascade, client-side vs. server-side execution boundaries, and how to avoid the most common security mistakes shipped by developers. If you want to jump straight to building, <a href=\"/\">use our free .env template generator</a> to scaffold a production-ready configuration instantly.</p>\n\n<h2>Understanding Environment Variables in Next.js</h2>\n<p>By default, environment variables loaded into a Next.js application are exclusively accessible in the Node.js runtime environment. This means they are only available in server-side contexts, such as React Server Components (RSC), API routes, <code>getServerSideProps</code>, and <code>getStaticProps</code>. They are completely hidden from the browser client.</p>\n\n<p>This \"server-only by default\" behavior is a critical security safeguard. If you have database credentials, Stripe private secret keys, or custom internal administrative passwords, you define them simply in your <code>.env</code> file like this:</p>\n\n<pre><code># Available strictly on the server-side\nDATABASE_URL=\"postgresql://postgres:password@localhost:5432/mydb\"\nAPI_SECRET_KEY=\"sk_live_51M...\"</code></pre>\n\n<p>Inside a Next.js Server Component or API Route, you access this variable using the standard Node.js syntax:</p>\n\n<pre><code>// app/api/users/route.js\nexport async function GET() {\n  const dbUrl = process.env.DATABASE_URL; // Perfectly safe and resolved on the server\n  // ... database queries here\n}</code></pre>\n\n<p>If you try to read <code>process.env.DATABASE_URL</code> inside a client-side component (a file starting with <code>\"use client\"</code>), it will resolve to <code>undefined</code>. This prevents the browser from ever seeing your master database connection string or private keys.</p>\n\n<h2>Exposing Variables to the Client: The NEXT_PUBLIC_ Prefix</h2>\n<p>There are many scenarios where you legitimately need to expose configuration details directly to the client's browser. For instance, you might need to initialize a Google Analytics tracker with a measurement ID, connect a Supabase client using an anonymous public key, or load Stripe Elements with a publishable key.</p>\n\n<p>To tell Next.js that a variable is safe to send to the browser, you must prefix the variable's key with <code>NEXT_PUBLIC_</code>. For example:</p>\n\n<pre><code># Accessible in both client and server contexts\nNEXT_PUBLIC_ANALYTICS_ID=\"G-12345ABC\"\nNEXT_PUBLIC_SUPABASE_URL=\"https://xyz.supabase.co\"</code></pre>\n\n<p>During the build process, Next.js scans your client-side JavaScript bundle files. If it encounters a reference to <code>process.env.NEXT_PUBLIC_ANALYTICS_ID</code>, it literally inlines (hardcodes) the string value into the compiled browser files. This means anyone inspecting your page's JavaScript can read this value. **Never prefix private database credentials, payment secret keys, or authentication secret keys with <code>NEXT_PUBLIC_</code>.**</p>\n\n<h2>The Cascading Environment File Hierarchy</h2>\n<p>Next.js supports a sophisticated cascading system of environment files, allowing you to define different variables depending on your execution environment (development, staging, or production). Next.js will automatically load files in the following priority order, from highest priority to lowest priority:</p>\n\n<ol>\n  <li><code>.env.development.local</code>, <code>.env.production.local</code>, <code>.env.local</code>: These files override their corresponding non-local templates. They should <strong>always</strong> be added to your <code>.gitignore</code> file as they contain environment-specific secrets.</li>\n  <li><code>.env.development</code>: Loaded automatically only when running <code>next dev</code>. This is where you configure local mock services, test databases, and sandbox endpoints.</li>\n  <li><code>.env.production</code>: Loaded automatically when running <code>next start</code> or during the <code>next build</code> phase. Excellent for staging and production configurations.</li>\n  <li><code>.env</code>: The baseline file. These values are applied across all environments unless overridden by a more specific file. Perfect for non-sensitive default parameters.</li>\n</ol>\n\n<h2>Common Environment Mistakes to Avoid</h2>\n<ul>\n  <li><strong>Committing .env to Git:</strong> The absolute most frequent mistake is forgetting to add <code>.env</code> or <code>.env.local</code> to your <code>.gitignore</code>. Once a key is pushed to GitHub, it is permanently logged in the Git history. Even if deleted in a later commit, the key remains compromised.</li>\n  <li><strong>Trying to access server variables on the client:</strong> If your frontend calls <code>process.env.MY_SECRET</code> and it returns <code>undefined</code>, check if the component is marked with <code>\"use client\"</code>. Client components can only read keys prefixed with <code>NEXT_PUBLIC_</code>.</li>\n  <li><strong>Stale variables during local development:</strong> When you modify your <code>.env.local</code> file, Next.js does not always hot-reload the environment variables instantly. Always stop your dev server (<code>Ctrl + C</code>) and restart it (<code>npm run dev</code>) to ensure changes are correctly compiled.</li>\n</ul>\n\n<p>By strictly applying the prefix rules, utilizing cascading environment hierarchies, and maintaining a solid git ignore strategy, you ensure your Next.js application remains impenetrable while remaining incredibly fast. If you are starting a new stack configuration, <a href=\"/\">head back to our generator homepage</a> to compile the perfect boilerplate instantly.</p>\n"
  },
  {
    "slug": "secure-api-keys",
    "title": "How to Secure Your API Keys in 2026",
    "seoTitle": "How to Secure Your API Keys in 2026: Complete Checklist | getenv.in",
    "seoMeta": "A complete developer security checklist for protecting API keys, secrets, and environment configurations in production. Learn how to prevent git leakage, rotate secrets, and use secure vaults.",
    "excerpt": "Exposing a production key can cost thousands of dollars in minutes. Learn the essential strategies for keeping your secrets out of source control and securing them in production.",
    "readTime": "6 min read",
    "content": "\n<p>In modern web architectures, understanding <strong>how to secure API keys</strong> is the single most critical task for a developer before pushing code to production. A leaked administrative key—whether for OpenAI, AWS, Stripe, or Supabase—can be hijacked by automated crawlers within seconds. This can lead to massive service charges, database compromises, and severe brand damage. Security is not a luxury; it must be baked into your workflow from the very first commit. To get started on a secure foundation, <a href=\"/\">use our free .env generator</a> to instantly scaffold sanitized environment variable configurations.</p>\n\n<h2>Why API Key Security is Critical</h2>\n<p>In a serverless and cloud-native ecosystem, your API keys represent the keys to your financial and data vaults. Unlike password credentials which are protected by user interfaces, API keys are designed for high-throughput machine-to-machine authentication. They bypass multi-factor authentication (MFA) and authorization gates completely.</p>\n\n<p>Automated scrapers continuously crawl GitHub, GitLab, and public web spaces, scanning every single commit for exposed credentials. A leaked AWS or OpenAI key can be exploited within 30 seconds of being pushed online, spinning up thousands of dollars of compute resources before your DevOps team even receives a notification. Even in private repositories, hardcoding secrets represents a massive security threat, exposing keys to unauthorized employees and violating SOC2 or ISO 27001 compliance standards.</p>\n\n<h2>Rule 1: Never Commit .env Files to Git</h2>\n<p>The golden rule of environment variable management is simple: **your local <code>.env</code> file must never enter version control.** To ensure this, you must configure your project's <code>.gitignore</code> file immediately upon repository creation. A standard secure <code>.gitignore</code> should include the following entries:</p>\n\n<pre><code># .gitignore\n.env\n.env.local\n.env.development.local\n.env.production.local\n.env.testing.local\n*.env</code></pre>\n\n<p>If you accidentally commit a <code>.env</code> file, you cannot simply delete it and push a new commit. The secret will still reside in your repository's commit history. You must execute a filter-branch command or use tools like <code>git-filter-repo</code> to scrub the file entirely from your history, or revoke and recreate the key immediately in your provider dashboard.</p>\n\n<h2>Using the .env.example Template Pattern</h2>\n<p>If you cannot commit your <code>.env</code> file, how do new developers onboarding onto your team know which environment variables are required to run the project locally? The answer is the <code>.env.example</code> pattern.</p>\n\n<p>A <code>.env.example</code> file is a sanitized template committed to Git. It lists every required environment key but omits all sensitive values, replacing them with generic description placeholders or mock safe defaults. For example:</p>\n\n<pre><code># .env.example\n# The database connection URL (local PostgreSQL)\nDATABASE_URL=\"postgresql://user:password@localhost:5432/dbname\"\n\n# Stripe publishable keys are safe for client-side templates\nNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder\n\n# DO NOT put your actual live secret key here!\nSTRIPE_SECRET_KEY=</code></pre>\n\n<p>When a teammate clones the repository, they simply duplicate the template (<code>cp .env.example .env</code>) and fill in their local sandbox credentials. This keeps secrets isolated on developer machines while keeping configuration requirements completely documented.</p>\n\n<h2>API Key Security Checklist</h2>\n<p>Before launching your application to the public, review this essential security checklist:</p>\n\n<table>\n  <thead>\n    <tr>\n      <th>Security Control</th>\n      <th>Status</th>\n      <th>Action Required</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td><strong>Principle of Least Privilege</strong></td>\n      <td>Critical</td>\n      <td>Scope API keys to the narrowest possible permissions (e.g., read-only S3 keys).</td>\n    </tr>\n    <tr>\n      <td><strong>GitHub Secret Scanning</strong></td>\n      <td>Recommended</td>\n      <td>Enable GitHub Secret Scanning to block commits containing active secret signatures.</td>\n    </tr>\n    <tr>\n      <td><strong>IP & Referrer Restrictions</strong></td>\n      <td>Highly Recommended</td>\n      <td>Restrict public keys (like Google Maps) to your exact domain referrers.</td>\n    </tr>\n    <tr>\n      <td><strong>Key Rotation Policy</strong></td>\n      <td>Standard</td>\n      <td>Establish a 90-day key rotation schedule and dynamic config switches.</td>\n    </tr>\n    <tr>\n      <td><strong>Production Secret Vaults</strong></td>\n      <td>Best Practice</td>\n      <td>Inject secrets at runtime using Vercel, AWS Secrets Manager, or HashiCorp Vault.</td>\n    </tr>\n  </tbody>\n</table>\n\n<p>Securing your project starts with proper environment discipline. By isolating local files, providing templates, restricting key permissions, and actively monitoring usage, you maintain an impenetrable security posture. To quickly generate a sanitized template for your exact stack, <a href=\"/\">use our free generator tool on the home view</a>.</p>\n"
  },
  {
    "slug": "stripe-nextjs-env",
    "title": "Setting Up Stripe with Next.js: Environment Variables You Actually Need",
    "seoTitle": "Setting Up Stripe with Next.js: Environment Variables You Actually Need | getenv.in",
    "seoMeta": "Learn the exact Stripe environment variables needed for a secure Next.js checkout. Understand STRIPE_SECRET_KEY, publishable keys, webhook secrets, and test vs live modes.",
    "excerpt": "Confused about which Stripe keys go to the browser and which stay on the server? A detailed breakdown of Stripe variables, webhooks, and client-side setup.",
    "readTime": "7 min read",
    "content": "\n<p>Integrating payments is one of the most critical phases of launching a SaaS. To make Stripe work seamlessly with a Next.js framework, you must configure a set of environment variables. The key to a secure Stripe integration is understanding exactly which variables belong on the server, which can be shared with the browser client, and how to safely handle webhooks. If you want to jump straight to copying a perfectly structured configuration, <a href=\"/\">generate your customized Stripe environment template here</a>.</p>\n\n<h2>The Stripe Two-Key Cryptographic System</h2>\n<p>Stripe uses a dual-key mechanism to separate public frontend operations from critical backend administrative operations. Understanding this boundary is the absolute core of payment gateway security.</p>\n\n<h3>1. Stripe Publishable Key (Frontend element loading)</h3>\n<p>The Stripe Publishable Key (prefixed with <code>pk_test_</code> or <code>pk_live_</code>) is designed to be public. It is loaded inside your Next.js React client to initialize Stripe.js and render Stripe Elements. This key is responsible for tokenizing credit card data securely, sending it directly to Stripe's servers without letting sensitive credit card data touch your backend servers.</p>\n\n<p>Because the browser needs access to this key, you must prefix it with <code>NEXT_PUBLIC_</code> in your Next.js project:</p>\n\n<pre><code># Safe for browser-side JavaScript bundle loading\nNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\"pk_test_51M...\"</code></pre>\n\n<h3>2. Stripe Secret Key (Backend administrative API calls)</h3>\n<p>The Stripe Secret Key (prefixed with <code>sk_test_</code> or <code>sk_live_</code>) is your master key. It has absolute authority over your Stripe account, allowing you to charge cards, trigger refunds, read transactions, and manage subscriptions. **This key must never, under any circumstances, be exposed to the browser client.**</p>\n\n<p>In your Next.js app, define it simply without the <code>NEXT_PUBLIC_</code> prefix, keeping it isolated inside server-side Node.js environments (like API routes, server actions, or Server Components):</p>\n\n<pre><code># Keep this private! Exclusively resolved in Node.js server environments\nSTRIPE_SECRET_KEY=\"sk_test_51M...\"</code></pre>\n\n<h2>Initializing the Stripe Client Safely in Code</h2>\n<p>To use Stripe on the server-side, you initialize the official Stripe Node.js SDK using your private key. Here is a clean, production-grade example of a Next.js checkout API route:</p>\n\n<pre><code>// app/api/checkout/route.js\nimport { NextResponse } from 'next/server';\nimport Stripe from 'stripe';\n\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {\n  apiVersion: '2023-10-16', // Ensure you pin to your dashboard API version\n});\n\nexport async function POST(req) {\n  try {\n    const session = await stripe.checkout.sessions.create({\n      payment_method_types: ['card'],\n      line_items: [{ price: 'price_1H...', quantity: 1 }],\n      mode: 'subscription',\n      success_url: 'https://getenv.in/success',\n      cancel_url: 'https://getenv.in/cancel',\n    });\n    return NextResponse.json({ url: session.url });\n  } catch (error) {\n    return NextResponse.json({ error: error.message }, { status: 500 });\n  }\n}</code></pre>\n\n<h2>The Webhook Signature Verification Secret</h2>\n<p>When an asynchronous event happens in Stripe (such as a subscription invoice getting paid successfully), Stripe sends a webhook request to your Next.js server. To prevent malicious actors from spoofing checkout payload requests, you must verify the signature of the incoming request.</p>\n\n<p>To do this, you need a third environment variable: your **Stripe Webhook Secret** (prefixed with <code>whsec_</code>), which is generated in your Stripe dashboard under Webhooks.</p>\n\n<pre><code># Used to authenticate incoming Stripe webhook requests\nSTRIPE_WEBHOOK_SECRET=\"whsec_abc123...\"</code></pre>\n\n<p>Here is how you parse and verify the webhook signature in a Next.js Route Handler:</p>\n\n<pre><code>// app/api/webhooks/stripe/route.js\nimport { headers } from 'next/headers';\nimport { NextResponse } from 'next/server';\nimport Stripe from 'stripe';\n\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY);\n\nexport async function POST(req) {\n  const body = await req.text(); // Retrieve raw request body\n  const signature = headers().get('stripe-signature');\n  \n  let event;\n  try {\n    event = stripe.webhooks.constructEvent(\n      body,\n      signature,\n      process.env.STRIPE_WEBHOOK_SECRET\n    );\n  } catch (err) {\n    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });\n  }\n\n  // Fulfill subscription changes based on event type\n  if (event.type === 'invoice.payment_succeeded') {\n    const subscription = event.data.object;\n    // Update user database status here\n  }\n  \n  return NextResponse.json({ received: true });\n}</code></pre>\n\n<h2>Test Keys vs. Production Keys</h2>\n<p>Stripe automatically separates your test environment and live environment. For local development, make sure you exclusively use keys starting with <code>pk_test_</code>, <code>sk_test_</code>, and <code>whsec_</code>. When pushing your project live on hosting providers like Vercel or AWS, swap these keys out for your live keys (<code>pk_live_</code>, <code>sk_live_</code>) inside the hosting dashboard variables. Decoupling configuration from your code is what keeps your customer data secure and your implementation flawless. Need a secure starting boiler? <a href=\"/\">Compile your complete Next.js Stripe variables right now</a>.</p>\n"
  },
  {
    "slug": "supabase-nextjs-env",
    "title": "Supabase + Next.js: Complete .env Setup Guide",
    "seoTitle": "Supabase + Next.js: Complete .env Setup Guide | getenv.in",
    "seoMeta": "Learn how to configure Supabase environment variables in Next.js. Master the difference between public anon keys, private service role keys, and setup PostgreSQL connection strings securely.",
    "excerpt": "Supabase utilizes anonymous public keys, Row Level Security, and high-privilege service roles. Discover how to setup your environment variables safely.",
    "readTime": "7 min read",
    "content": "\n<p>Integrating your database layer with a backend-as-a-service requires a clear understanding of your **Supabase environment variable setup**. Supabase is a powerful open-source PostgreSQL database alternative, but its security model differs significantly from traditional architectures. By utilizing PostgreSQL Row Level Security (RLS) and JWT tokens directly in the client browser, Supabase requires you to be extremely disciplined about which API keys you expose. If you want to jump straight to configuring your variables, <a href=\"/\">use our free .env generator</a> to scaffold your Supabase templates instantly.</p>\n\n<h2>The Supabase Environment Variable Matrix</h2>\n<p>A standard Supabase integration requires three key environment variables. Understanding their scopes and privileges is the difference between a secure deployment and an exposed database.</p>\n\n<h3>1. NEXT_PUBLIC_SUPABASE_URL</h3>\n<p>This is the unique REST API gateway address for your Supabase database instance. It tells the Supabase Client SDK where to send queries, authentication requests, and real-time subscription calls. It is completely safe to expose to the client browser and must be prefixed with <code>NEXT_PUBLIC_</code>:</p>\n\n<pre><code># The API gateway endpoint. Safe for public bundle loading\nNEXT_PUBLIC_SUPABASE_URL=\"https://yourprojectid.supabase.co\"</code></pre>\n\n<h3>2. NEXT_PUBLIC_SUPABASE_ANON_KEY</h3>\n<p>The anonymous key (or <code>anon</code> key) is a public API key. It is designed to be embedded directly inside your client-side React components. When the Supabase SDK is initialized with the anon key, all database queries are executed with the PostgreSQL <code>anon</code> database role.</p>\n\n<p>The magic of the anon key relies entirely on **Row Level Security (RLS)**. If you have active RLS policies on your tables, an anonymous user can only read or write rows that your SQL policies explicitly permit. If RLS is disabled, the anon key could allow anyone to read your entire database. **Always enable RLS on every table before deploying your anon key.**</p>\n\n<pre><code># The public client key. Safe for public browser scripts\nNEXT_PUBLIC_SUPABASE_ANON_KEY=\"eyJhbGciOiJIUzI1NiIsIn...\"</code></pre>\n\n<h3>3. SUPABASE_SERVICE_ROLE_KEY</h3>\n<p>The Supabase Service Role Key is your administrative master key. It has full, unrestricted access over your entire database, **bypassing PostgreSQL Row Level Security (RLS) entirely.** It can execute any read, insert, update, or delete statement on any table, regardless of RLS policies.</p>\n\n<p><strong>This key is highly sensitive and must never, under any circumstances, be exposed to the browser client.</strong> Never prefix this key with <code>NEXT_PUBLIC_</code>. Keep it locked inside server-side environments such as Server Actions, API routes, or edge functions:</p>\n\n<pre><code># Keep private! Bypasses all Row Level Security (RLS)\nSUPABASE_SERVICE_ROLE_KEY=\"eyJhbGciOiJIUzI1NiIsIn...\"</code></pre>\n\n<h2>Initializing the Supabase Clients in Next.js</h2>\n<p>In modern Next.js apps, you typically maintain two distinct Supabase client initializations: a browser-safe client for your client-side interactive views, and a server client for server-side environments. Here is how they access your environment variables:</p>\n\n<h3>A. Browser Client (Safe for Browser Bundle)</h3>\n<pre><code>// utils/supabase/client.js\nimport { createBrowserClient } from '@supabase/ssr';\n\n// Initializes with public variables\nexport const supabase = createBrowserClient(\n  process.env.NEXT_PUBLIC_SUPABASE_URL,\n  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY\n);</code></pre>\n\n<h3>B. Server Client (Using the Service Role Key for Admin Actions)</h3>\n<p>When executing background tasks, executing administrative authentication functions, or running seed migrations, initialize your client using your private service role key:</p>\n\n<pre><code>// utils/supabase/admin.js\nimport { createClient } from '@supabase/supabase-js';\n\n// Initializes with private service role key. Bypasses RLS!\nexport const supabaseAdmin = createClient(\n  process.env.NEXT_PUBLIC_SUPABASE_URL,\n  process.env.SUPABASE_SERVICE_ROLE_KEY\n);</code></pre>\n\n<h2>Row Level Security: The Ultimate Defense</h2>\n<p>To prevent malicious users from abusing your public anonymous keys, you must execute a SQL security policy in your Supabase SQL editor. For example, to restrict user data access to authenticated owners:</p>\n\n<pre><code>-- Enable RLS on user profile table\nALTER TABLE profiles ENABLE ROW LEVEL SECURITY;\n\n-- Create policy allowing users to only read their own row\nCREATE POLICY \"Allow users to read own profiles\" ON profiles\n  FOR SELECT USING (auth.uid() = id);</code></pre>\n\n<p>By coupling PostgreSQL's native security engine with properly isolated client and server variables, you build an architecture that is incredibly robust, secure, and lightning-fast. Need a clean environment template to start your next Supabase project? <a href=\"/\">Generate your .env file on our homepage now</a>.</p>\n"
  },
  {
    "slug": "what-is-dotenv",
    "title": "What is a .env File? A Beginner's Explanation",
    "seoTitle": "What is a .env File? Plain English Explanation for Beginners | getenv.in",
    "seoMeta": "Discover what a .env file is, how environment variables keep your application secrets secure, and how to use dotenv libraries to build code configurations like a pro.",
    "excerpt": "The fundamental concept behind modern software configuration. Discover why we use .env files and how they protect our API keys from internet leaks.",
    "readTime": "5 min read",
    "content": "\n<p>If you are new to web development, you might have run into a file at the root of a project named simply <code>.env</code>. You might ask: <strong>what is env file</strong> and why does every developer tutorial insist on using them? In this beginner-friendly guide, we will break down environment variables, dotenv files, the syntax of key-value configurations, and why this simple text file is the cornerstone of modern application security. If you need to build one quickly for a project, <a href=\"/\">try our free interactive .env generator</a> to output a customized config file instantly.</p>\n\n<h2>The Concept: What is an Environment Variable?</h2>\n<p>Before understanding the file, you must understand the concept of an environment variable. An environment variable is a global setting managed by your computer's operating system (Windows, macOS, or Linux). Your code can read these settings while it runs.</p>\n\n<p>Think of it as a configuration dashboard. Instead of writing variables directly into your code (like hardcoding a port number or database credentials), you store them in the environment. For example, in Node.js, you read a global environment variable like this:</p>\n\n<pre><code>// Reading a variable from the operating system environment\nconst port = process.env.PORT || 3000;\nconst dbUrl = process.env.DATABASE_URL;</code></pre>\n\n<h2>What is a .env File?</h2>\n<p>During local development, setting environment variables directly in your operating system command line (like terminal or command prompt) can be tedious, especially when you have dozens of variables. To solve this, developers created the <code>dotenv</code> pattern.</p>\n\n<p>A <code>.env</code> file (pronounced \"dot-env\") is a plain text file saved at the very root of your project. It is simply a text-based list of configuration keys and their corresponding values. Here is what a basic <code>.env</code> file looks like:</p>\n\n<pre><code># This is a comment inside a dotenv file\nPORT=8080\nDATABASE_URL=\"mongodb://localhost:27017/my_app\"\nSECRET_KEY=\"my-super-secret-passphrase\"</code></pre>\n\n<p>When you start your application, a library (like <code>dotenv</code> in Node.js, or <code>python-dotenv</code> in Python) reads this text file and automatically injects all the keys and values into the operating system environment at runtime. Your application reads them as if they were natively configured in the machine.</p>\n\n<h2>Why We Use .env Files (The Twin Benefits)</h2>\n<p>Using a dotenv file provides two massive advantages to web developers: **Security** and **Flexibility**.</p>\n\n<h3>1. Security (Keeping your credentials off the internet)</h3>\n<p>The single most important rule of software development is: **never hardcode passwords, credit card secret keys, or database credentials inside your source code.** If you upload your codebase to GitHub, anyone can see your keys, exploit your APIs, and charge your accounts.</p>\n\n<p>By extracting these credentials into a local <code>.env</code> file and adding that file to your <code>.gitignore</code>, Git will completely ignore the file. Your secrets remain safely stored strictly on your local physical hard drive and never enter version control.</p>\n\n<h3>2. Flexibility (Deploying to different environments)</h3>\n<p>A professional application runs in multiple stages: local development (on your laptop), staging (for testing), and live production (accessible by users). By reading settings from the environment, your code remains identical across all stages. Only the values in the environment change:</p>\n\n<ul>\n  <li>On your laptop, the environment variable <code>DATABASE_URL</code> connects to your local PostgreSQL instance (<code>localhost</code>).</li>\n  <li>On the production server, the environment variable <code>DATABASE_URL</code> connects to your highly secure cloud database.</li>\n</ul>\n\n<p>You don't need to change a single line of code to deploy to staging or production; you simply inject different values inside the hosting dashboard. This makes your application extremely scalable and portable. Now that you understand the dotenv pattern, <a href=\"/\">use our free generator on the homepage</a> to build your first professional configurations in seconds.</p>\n"
  },
  {
    "slug": "env-example-pattern",
    "title": "The .env.example Pattern: Why Every Project Needs One",
    "seoTitle": "The .env.example Pattern: Best Practices | getenv.in",
    "seoMeta": "Learn what .env.example is, why it is critical for developer onboarding, how to write pristine environment templates, and keep configurations in sync without exposing secret keys.",
    "excerpt": "How do you share required environment variables with your team if you cannot commit the .env file? The answer is the .env.example template pattern.",
    "readTime": "6 min read",
    "content": "\n<p>Decoupling configuration from your source code using environment variables is the industry standard for modern software engineering. However, because you are strictly ignoring your <code>.env</code> file in version control, you introduce a practical collaboration bottleneck: how does a new developer joining your team know which variables they need to configure to run the application? The answer is the <strong>.env.example pattern</strong>. In this guide, we will explore why every professional repository must include a sanitized template, how to write one, and best practices for team onboarding. If you want to automatically generate a perfect template alongside your code, <a href=\"/\">try our free interactive .env generator</a>.</p>\n\n<h2>What is a .env.example File?</h2>\n<p>A <code>.env.example</code> (or <code>.env.template</code>) is a sanitized copy of your project's environment variables. It has the exact same keys as your real <code>.env</code> file, but all highly sensitive credentials (like active production passwords or private Stripe tokens) are replaced with mock descriptions or left blank.</p>\n\n<p>Unlike the real <code>.env</code> file, the <code>.env.example</code> file is **committed to your Git repository**. It serves as a living, executable documentation of your project's external dependencies.</p>\n\n<h2>The Standard Developer Onboarding Workflow</h2>\n<p>By maintaining a pristine example file, you turn developer onboarding from a hours-long debugging session into a 30-second workflow. The standard process for running a newly cloned project is:</p>\n\n<ol>\n  <li>Clone the git repository to your local computer: <code>git clone https://github.com/user/repo</code></li>\n  <li>Duplicate and rename the template: <code>cp .env.example .env</code></li>\n  <li>Open the newly created <code>.env</code> file in your text editor (VS Code, etc.).</li>\n  <li>Fill in the blank values with your local sandbox API keys.</li>\n  <li>Boot the local development server: <code>npm run dev</code> or <code>python main.py</code></li>\n</ol>\n\n<p>Because the real <code>.env</code> file is actively ignored by your project's <code>.gitignore</code>, developers can make custom local configurations without fear of accidentally committing their credentials back to the remote repository.</p>\n\n<h2>How to Write a Professional .env.example File</h2>\n<p>A poor example file simply lists empty keys, leaving developers guessing about format. A pristine example file contains helpful descriptive comments, default non-sensitive parameters, and direct URLs showing where to generate developer credentials. Here is a production-grade template:</p>\n\n<pre><code># =========================================================================\n# APPLICATION CORE CONFIGURATION\n# =========================================================================\n# Local execution port. Default is 3000\nPORT=3000\nNODE_ENV=development\n\n# =========================================================================\n# DATABASE SETTINGS\n# =========================================================================\n# Postgres URL. Replace with your local container port if different\n# Format: postgres://username:password@hostname:port/database_name\nDATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/my_db\"\n\n# =========================================================================\n# INTEGRATIONS & KEY REGISTRATIONS\n# =========================================================================\n# Retrieve your public key from: https://dashboard.stripe.com/test/apikeys\nNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder\n\n# Private Stripe key. Ask your tech lead or generate a local test key.\n# DO NOT COMMIT A LIVE KEY!\nSTRIPE_SECRET_KEY=</code></pre>\n\n<h2>Handling Configuration Drift</h2>\n<p>The most common failure point of this pattern is \"configuration drift.\" As your application grows, developers add new dependencies and corresponding environment variables to their local <code>.env</code> files to test new features. However, they frequently forget to add these new keys to the <code>.env.example</code> file before merging their pull requests.</p>\n\n<p>When this happens, other team members pull the latest code and find the application crashing with cryptic errors because a new environment key was introduced but never documented. To prevent this, build a routine check: make reviewing and updating the <code>.env.example</code> file a mandatory step in your team's code review checklist. Keep your configurations pristine, secure, and perfectly synced. To generate a standardized template for your exact stack, <a href=\"/\">use our free .env template builder today</a>.</p>\n"
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
  typewriterTimeout: null,
  activePreset: null, // Holds the active preset ID if currently using a preset
  presetClicks: {}, // Maps preset ID to active rotation click counts
  includeProdVars: false // Toggles addition of advanced monitoring, logging, and tuning variables
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
  stackView: document.getElementById('stack-view'),
  
  // Containers
  blogGrid: document.getElementById('blog-grid'),
  blogArticleContent: document.getElementById('blog-article-content'),
  stackArticleContent: document.getElementById('stack-article-content'),
  
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

  // FEATURE: Preloaded Static State for SSG Pages
  if (typeof window !== 'undefined' && window.PRELOADED_STATE) {
    state.framework = window.PRELOADED_STATE.framework;
    window.PRELOADED_STATE.services.forEach(svc => state.services.add(svc));
    
    // Visually update the UI DOM to match state
    if(state.framework) {
      const allFw = document.querySelectorAll('.framework-card');
      allFw.forEach(c => c.classList.remove('selected'));
      const fwCard = document.querySelector(`.framework-card[data-id="${state.framework}"]`);
      if(fwCard) fwCard.classList.add('selected');
    }
    state.services.forEach(svcId => {
      const svcCard = document.querySelector(`.service-card[data-id="${svcId}"]`);
      if(svcCard) svcCard.classList.add('checked');
    });

    // Jump immediately to Step 3 and generate
    document.getElementById('step-1-card').style.display = 'none';
    document.getElementById('step-2-card').style.display = 'none';
    document.getElementById('step-3-card').style.display = 'block';
    state.step = 3;
    
    // Slight timeout to let DOM settle before running generation logic
    setTimeout(() => {
      handleGenerate();
    }, 100);
  }

  // Handle window popstate for path routing SPA
  handlePathRoute();
  window.addEventListener('popstate', handlePathRoute);

  // Global Link Interceptor for SPA navigation
  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
      e.preventDefault();
      saveSessionState();
      const path = link.getAttribute('href');
      history.pushState(null, '', path);
      handlePathRoute();
    }
  });

  // Run Boot Sequence or Typewriter
  const hasSavedSession = (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('env_session_framework'));
  if (!(typeof window !== 'undefined' && window.PRELOADED_STATE)) {
    if (hasSavedSession) {
      // Hide boot overlay immediately if it exists
      const bootOverlay = document.getElementById('boot-overlay');
      if (bootOverlay) {
        bootOverlay.style.pointerEvents = 'none';
        bootOverlay.style.setProperty('display', 'none', 'important');
      }
      startHeroTypewriter();
    } else {
      checkBootSequence();
    }
  }
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
          const trustBar = document.getElementById('hero-trust-bar');
          if (trustBar) {
            setTimeout(() => {
              trustBar.style.opacity = '1';
            }, 450);
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
          <h3><a href="/blog/${post.slug}" class="blog-title-link" style="color: inherit; text-decoration: none;">${post.title}</a></h3>
          <p>${post.excerpt}</p>
        </div>
        <div class="blog-card-footer">
          <a href="/blog/${post.slug}" class="blog-card-link">Read →</a>
          <span class="blog-read-time">${post.readTime}</span>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   INTERACTIVE SELECTION & STEP FLOW CONTROLS
   ========================================================================== */

function clearActivePreset() {
  state.activePreset = null;
  const presetBtns = document.querySelectorAll('.preset-btn');
  presetBtns.forEach(btn => btn.classList.remove('active'));
  const badge = document.getElementById('active-preset-badge');
  if (badge) badge.style.display = 'none';
}

// CHOOSE FRAMEWORK (Step 1)
function selectFramework(fwId, isFromPreset = false) {
  state.framework = fwId;
  if (!isFromPreset) {
    clearActivePreset();
  }
  
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
  saveSessionState();
}

// TOGGLE SERVICES (Step 2)
function toggleService(svcId) {
  if (state.services.has(svcId)) {
    state.services.delete(svcId);
  } else {
    state.services.add(svcId);
  }
  clearActivePreset();
  
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
  saveSessionState();
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
      saveSessionState();
      
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
  
  const path = window.location.pathname;
  const isHomePage = (path === '/' || path === '/index.html');
  
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
   FEATURE — SESSION PERSISTENCE (SESSION STORAGE)
   ========================================================================== */
let isSessionRestored = false;
let restoreBannerTimeout = null;

function saveSessionState() {
  try {
    if (typeof sessionStorage !== 'undefined') {
      if (state.framework) {
        sessionStorage.setItem('env_session_framework', state.framework);
        sessionStorage.setItem('env_session_services', JSON.stringify([...state.services]));
        sessionStorage.setItem('env_session_step', state.step);
        sessionStorage.setItem('env_session_active_env', state.activeEnv);
        sessionStorage.setItem('env_session_active_tab', state.activeTab);
        sessionStorage.setItem('env_session_active_preset', state.activePreset || '');
        sessionStorage.setItem('env_session_preset_clicks', JSON.stringify(state.presetClicks || {}));
        sessionStorage.setItem('env_session_include_prod_vars', state.includeProdVars ? 'true' : 'false');
      }
    }
  } catch (e) {
    console.error('Failed to save session state', e);
  }
}

function clearSessionState() {
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('env_session_framework');
      sessionStorage.removeItem('env_session_services');
      sessionStorage.removeItem('env_session_step');
      sessionStorage.removeItem('env_session_active_env');
      sessionStorage.removeItem('env_session_active_tab');
      sessionStorage.removeItem('env_session_active_preset');
      sessionStorage.removeItem('env_session_preset_clicks');
      sessionStorage.removeItem('env_session_include_prod_vars');
    }
  } catch (e) {
    console.error('Failed to clear session state', e);
  }
}

function restoreSessionState() {
  if (isSessionRestored) return;
  
  try {
    if (typeof sessionStorage === 'undefined') return;
    
    const savedFw = sessionStorage.getItem('env_session_framework');
    if (!savedFw) return; // No saved session
    
    const savedSvcsRaw = sessionStorage.getItem('env_session_services');
    const savedStepRaw = sessionStorage.getItem('env_session_step');
    const savedEnvRaw = sessionStorage.getItem('env_session_active_env');
    const savedTabRaw = sessionStorage.getItem('env_session_active_tab');
    const savedActivePreset = sessionStorage.getItem('env_session_active_preset');
    const savedPresetClicksRaw = sessionStorage.getItem('env_session_preset_clicks');
    const savedIncludeProdVars = sessionStorage.getItem('env_session_include_prod_vars');
    
    const savedSvcs = savedSvcsRaw ? JSON.parse(savedSvcsRaw) : [];
    const savedStep = savedStepRaw ? parseInt(savedStepRaw) : 1;
    const savedEnv = savedEnvRaw || 'development';
    const savedTab = savedTabRaw || 'env';
    
    // Restore state object
    state.framework = savedFw;
    state.services.clear();
    savedSvcs.forEach(svc => state.services.add(svc));
    state.activeEnv = savedEnv;
    state.activeTab = savedTab;
    state.activePreset = savedActivePreset || null;
    state.presetClicks = savedPresetClicksRaw ? JSON.parse(savedPresetClicksRaw) : {};
    state.includeProdVars = savedIncludeProdVars === 'true';
    
    // Visually update the UI DOM to match framework selection
    const allFw = document.querySelectorAll('.framework-card');
    allFw.forEach(c => {
      if (c.getAttribute('data-id') === savedFw) {
        c.classList.add('selected');
        c.setAttribute('aria-checked', 'true');
      } else {
        c.classList.remove('selected');
        c.setAttribute('aria-checked', 'false');
      }
    });
    if (elements.btnStep1Next) {
      elements.btnStep1Next.removeAttribute('disabled');
    }
    
    // Visually update the UI DOM to match services checkboxes
    const allSvcs = document.querySelectorAll('.service-checkbox-card');
    allSvcs.forEach(c => {
      const svcId = c.getAttribute('data-id');
      if (state.services.has(svcId)) {
        c.classList.add('checked');
        c.setAttribute('aria-checked', 'true');
      } else {
        c.classList.remove('checked');
        c.setAttribute('aria-checked', 'false');
      }
    });
    
    // Restore active env and file tabs visually
    const envBtns = document.querySelectorAll('.env-btn');
    envBtns.forEach(btn => {
      if (btn.getAttribute('data-env') === savedEnv) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    updateEnvBadge();
    
    // Restore toggle state and active presets visually
    const toggleProdVars = document.getElementById('toggle-prod-vars');
    if (toggleProdVars) {
      toggleProdVars.checked = state.includeProdVars;
    }
    
    if (state.activePreset) {
      const presetBtns = document.querySelectorAll('.preset-btn');
      presetBtns.forEach(btn => {
        if (btn.getAttribute('data-preset') === state.activePreset) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      
      const presetConfig = getPresetConfig(state.activePreset, state.presetClicks[state.activePreset] || 0, state.includeProdVars);
      if (presetConfig) {
        const badge = document.getElementById('active-preset-badge');
        if (badge) {
          badge.textContent = `🎯 Active Stack [Rotation ${presetConfig.rotationIndex + 1}/${presetConfig.totalRotations}]: ${presetConfig.description}`;
          badge.style.display = 'block';
        }
      }
    } else {
      const presetBtns = document.querySelectorAll('.preset-btn');
      presetBtns.forEach(btn => btn.classList.remove('active'));
      const badge = document.getElementById('active-preset-badge');
      if (badge) badge.style.display = 'none';
    }
    
    toggleOutputTab(savedTab);
    
    // Jump straight to the saved step card
    // Hide all step cards first
    if (elements.step1Card) {
      elements.step1Card.style.opacity = '1';
      elements.step1Card.style.transform = 'translateY(0)';
      elements.step1Card.classList.remove('active');
      elements.step1Card.style.display = 'none';
    }
    if (elements.step2Card) {
      elements.step2Card.style.opacity = '1';
      elements.step2Card.style.transform = 'translateY(0)';
      elements.step2Card.classList.remove('active');
      elements.step2Card.style.display = 'none';
    }
    if (elements.step3Card) {
      elements.step3Card.style.opacity = '1';
      elements.step3Card.style.transform = 'translateY(0)';
      elements.step3Card.classList.remove('active');
      elements.step3Card.style.display = 'none';
    }
    
    const targetCard = document.getElementById(`step-${savedStep}-card`);
    if (targetCard) {
      targetCard.classList.add('active');
      targetCard.style.display = 'block';
      targetCard.style.opacity = '1';
      targetCard.style.transform = 'translateY(0)';
    }
    
    state.step = savedStep;
    updateStepIndicator(savedStep);
    updateHowItWorksVisibility();
    
    if (savedStep === 3) {
      evaluateWarnings();
      compileDotenv(false); // don't play typewriter animation on session restore!
      generateShareLink();
    }
    
    // Suppress the localStorage welcome banner if it was going to show
    if (elements.storageWelcomeBanner) {
      elements.storageWelcomeBanner.style.display = 'none';
    }
    
    // Show Session Restore Banner
    showSessionRestoreBanner();
    
    isSessionRestored = true;
  } catch (e) {
    console.error('Failed to restore session state', e);
  }
}

function showSessionRestoreBanner() {
  const banner = document.getElementById('session-restore-banner');
  if (!banner) return;
  
  banner.innerHTML = `
    <p>&gt; Session restored — continuing where you left off.</p>
    <button class="btn-fresh-start" id="btn-session-fresh">Start Fresh ×</button>
  `;
  
  banner.style.display = 'flex';
  
  // Bind click listener for Start Fresh
  const startFreshBtn = document.getElementById('btn-session-fresh');
  if (startFreshBtn) {
    startFreshBtn.addEventListener('click', () => {
      clearSessionState();
      // Remove banner instantly
      banner.style.display = 'none';
      if (restoreBannerTimeout) {
        clearTimeout(restoreBannerTimeout);
      }
      isSessionRestored = false;
      // Perform full start over
      handleStartOver();
    });
  }
  
  // Auto dismiss after 4 seconds
  if (restoreBannerTimeout) {
    clearTimeout(restoreBannerTimeout);
  }
  restoreBannerTimeout = setTimeout(() => {
    // Fade out / hide
    banner.style.transition = 'opacity 0.5s ease';
    banner.style.opacity = '0';
    setTimeout(() => {
      banner.style.display = 'none';
      banner.style.opacity = '1'; // reset opacity for next time
    }, 500);
  }, 4000);
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
  saveSessionState();
}

function compilePresetDotenv(playTypewriter = true) {
  const presetConfig = getPresetConfig(state.activePreset, state.presetClicks[state.activePreset] || 0, state.includeProdVars);
  if (!presetConfig) return;
  
  const selectedFrameworkObj = FRAMEWORKS.find(fw => fw.id === presetConfig.framework);
  const prefixType = selectedFrameworkObj ? selectedFrameworkObj.prefixType : 'none';
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
    outputLines.push(`# .env.EXAMPLE TEMPLATE FOR PRESET: ${presetConfig.presetName.toUpperCase()}`);
    outputLines.push(`# Active Stack: ${presetConfig.description}`);
    outputLines.push(`# Share this file with your development team. Safe to commit to Git.`);
  } else {
    outputLines.push(`# .env TEMPLATE FOR PRESET: ${presetConfig.presetName.toUpperCase()}`);
    outputLines.push(`# Active Stack: ${presetConfig.description}`);
    outputLines.push(`# Fill in your actual credentials. Never commit this file to Git.`);
  }
  outputLines.push(`# Created on ${new Date().toISOString().split('T')[0]} via getenv.in`);
  outputLines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  outputLines.push('');

  // C. Render standard variables
  outputLines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  outputLines.push(`# CORE ENVIRONMENT VARIABLES`);
  outputLines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  outputLines.push('');
  
  presetConfig.variables.forEach(v => {
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
    
    let activeValue = isExample ? '' : v.placeholder;
    
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

  // D. Render advanced variables
  if (presetConfig.advancedVariables && presetConfig.advancedVariables.length > 0) {
    outputLines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    outputLines.push(`# ⚡ ADVANCED PRODUCTION TUNING & TELEMETRY`);
    outputLines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    outputLines.push('');
    
    presetConfig.advancedVariables.forEach(v => {
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
      
      let activeValue = isExample ? '' : v.placeholder;
      
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
  }

  const rawContent = outputLines.join('\n').trim() + '\n';
  
  // Render syntax-highlighted HTML Output
  renderSyntaxHighlightedCode(rawContent, playTypewriter);
  
  // Store plain text string in button data attributes for easy file operations
  elements.btnCopyEnv.setAttribute('data-raw', rawContent);
  elements.btnDownloadEnv.setAttribute('data-raw', rawContent);
}

/* ==========================================================================
   CORE .env COMPILATION ENGINE
   ========================================================================== */
function compileDotenv(playTypewriter = true) {
  if (state.activePreset) {
    compilePresetDotenv(playTypewriter);
    return;
  }

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
