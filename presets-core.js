/* ==========================================================================
   GETENV.IN — QUICK PRESETS DATA MODEL & DATASETS
   ========================================================================== */

const PRESETS_DATA = {
  'ai-app': {
    name: '🤖 AI App',
    defaultFramework: 'nextjs',
    rotations: [
      {
        description: 'Next.js + OpenAI + Supabase + Pinecone',
        framework: 'nextjs',
        services: ['openai', 'supabase_db', 'postgres'],
        variables: [
          { name: 'OPENAI_API_KEY', type: 'secret', placeholder: 'sk-proj-prod_openai_mock_key_2026_secure', comment: 'Secret key for OpenAI models (GPT-4o, GPT-4o-mini)', docUrl: 'https://platform.openai.com/api-keys' },
          { name: 'AI_MODEL', type: 'secret', placeholder: 'gpt-4o', comment: 'Primary LLM identifier to use in application routes', docUrl: 'https://platform.openai.com/docs/models' },
          { name: 'MAX_TOKENS', type: 'secret', placeholder: '4096', comment: 'Maximum response length limit for generated tokens', docUrl: 'https://platform.openai.com/docs/api-reference' },
          { name: 'SUPABASE_URL', type: 'public', placeholder: 'https://abcde12345.supabase.co', comment: 'REST endpoint base URL for Supabase backend services', docUrl: 'https://supabase.com/dashboard' },
          { name: 'SUPABASE_ANON_KEY', type: 'public', placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.anon_mock_token', comment: 'Client-safe anonymous database access key', docUrl: 'https://supabase.com/dashboard' },
          { name: 'SUPABASE_SERVICE_ROLE_KEY', type: 'secret', placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.service_mock_token', comment: 'Super-user bypass authentication role key. NEVER expose to browser.', docUrl: 'https://supabase.com/dashboard' },
          { name: 'PINECONE_API_KEY', type: 'secret', placeholder: 'pcsk_prod_pinecone_mock_key_123456789', comment: 'API key for vector search operations and queries', docUrl: 'https://app.pinecone.io/' },
          { name: 'PINECONE_ENVIRONMENT', type: 'secret', placeholder: 'us-east-1-gcp', comment: 'Pinecone database cloud hosting provider region', docUrl: 'https://app.pinecone.io/' },
          { name: 'PINECONE_INDEX', type: 'secret', placeholder: 'ai-embeddings-prod', comment: 'Index name storing text embeddings', docUrl: 'https://app.pinecone.io/' }
        ],
        advancedVariables: [
          { name: 'HELICONE_API_KEY', type: 'secret', placeholder: 'sk-helicone-prod-mock-key-2026', comment: 'Observability proxy API key for LLM cost and latency tracking', docUrl: 'https://www.helicone.ai/' },
          { name: 'LANGCHAIN_TRACING_V2', type: 'secret', placeholder: 'true', comment: 'Enables tracing of LangChain agent steps and prompts', docUrl: 'https://smith.langchain.com/' },
          { name: 'LANGCHAIN_API_KEY', type: 'secret', placeholder: 'lsv2_pt_mock_key_9999', comment: 'LangSmith platform API access key', docUrl: 'https://smith.langchain.com/' },
          { name: 'LANGCHAIN_PROJECT', type: 'secret', placeholder: 'ai-app-production', comment: 'LangSmith dashboard monitoring group', docUrl: 'https://smith.langchain.com/' },
          { name: 'REDIS_URL', type: 'secret', placeholder: 'redis://default:auth_pwd@localhost:6379', comment: 'Redis instance for prompt response caching and semantic search storage', docUrl: 'https://redis.io/' },
          { name: 'REDIS_CACHE_TTL', type: 'secret', placeholder: '3600', comment: 'Prompt response cache expiration limit in seconds', docUrl: 'https://redis.io/' },
          { name: 'AI_API_TIMEOUT_MS', type: 'secret', placeholder: '30000', comment: 'Maximum duration in milliseconds to wait for OpenAI response streams', docUrl: 'https://platform.openai.com/' }
        ]
      },
      {
        description: 'Next.js + Anthropic + Neon Postgres + Weaviate',
        framework: 'nextjs',
        services: ['neon', 'postgres'],
        variables: [
          { name: 'ANTHROPIC_API_KEY', type: 'secret', placeholder: 'sk-ant-sid01-prod_mock_key_2026_secure', comment: 'API credentials for Claude 3.5 Sonnet and Opus models', docUrl: 'https://console.anthropic.com/' },
          { name: 'ANTHROPIC_MODEL', type: 'secret', placeholder: 'claude-3-5-sonnet', comment: 'Claude model identifier', docUrl: 'https://console.anthropic.com/' },
          { name: 'NEON_DATABASE_URL', type: 'secret', placeholder: 'postgresql://neondb_owner:secure_pwd@ep-cool-snowflake-a5o1xyz.us-east-2.aws.neon.tech/neondb?sslmode=require', comment: 'Serverless pooled PostgreSQL URL', docUrl: 'https://console.neon.tech/' },
          { name: 'NEON_DIRECT_URL', type: 'secret', placeholder: 'postgresql://neondb_owner:secure_pwd@ep-cool-snowflake-a5o1xyz.us-east-2.aws.neon.tech/neondb?sslmode=require', comment: 'Non-pooled Postgres endpoint used for schema migrations', docUrl: 'https://console.neon.tech/' },
          { name: 'WEAVIATE_API_KEY', type: 'secret', placeholder: 'wsk_weaviate_mock_prod_key_987654321', comment: 'Credentials for serverless Weaviate cluster access', docUrl: 'https://weaviate.io/' },
          { name: 'WEAVIATE_URL', type: 'secret', placeholder: 'https://my-weaviate-sandbox.weaviate.network', comment: 'HTTPS endpoint address for Weaviate vector service', docUrl: 'https://weaviate.io/' },
          { name: 'AI_TEMPERATURE', type: 'secret', placeholder: '0.7', comment: 'Sampling temperature for responses (lower is more deterministic)', docUrl: 'https://console.anthropic.com/' }
        ],
        advancedVariables: [
          { name: 'UPSTASH_REDIS_REST_URL', type: 'public', placeholder: 'https://gilded-panda-12345.upstash.io', comment: 'Serverless rate limiting HTTP Redis endpoint', docUrl: 'https://upstash.com/' },
          { name: 'UPSTASH_REDIS_REST_TOKEN', type: 'secret', placeholder: 'upstash_redis_mock_token_abc', comment: 'Serverless Redis read-write authentication token', docUrl: 'https://upstash.com/' },
          { name: 'RATE_LIMIT_PER_MINUTE', type: 'secret', placeholder: '60', comment: 'API endpoint call quota throttling standard limit', docUrl: 'https://upstash.com/' },
          { name: 'SENTRY_DSN', type: 'secret', placeholder: 'https://sentry_mock_key@o100.ingest.sentry.io/450', comment: 'Sentry crash reporter connection endpoint', docUrl: 'https://sentry.io/' }
        ]
      },
      {
        description: 'Next.js + Gemini + Qdrant + Redis',
        framework: 'nextjs',
        services: ['redis', 'postgres'],
        variables: [
          { name: 'GEMINI_API_KEY', type: 'secret', placeholder: 'AIzaSyA_gemini_prod_mock_key_999', comment: 'Google Vertex AI / Gemini Pro model API key', docUrl: 'https://aistudio.google.com/' },
          { name: 'GEMINI_MODEL', type: 'secret', placeholder: 'gemini-1.5-pro', comment: 'Active Gemini model identifier', docUrl: 'https://aistudio.google.com/' },
          { name: 'DATABASE_URL', type: 'secret', placeholder: 'postgresql://postgres:db_pwd@localhost:5432/ai_app_db', comment: 'Standard local PostgreSQL database connection string', docUrl: 'https://www.postgresql.org/docs/' },
          { name: 'QDRANT_API_KEY', type: 'secret', placeholder: 'qsk_qdrant_mock_key_1122334455', comment: 'API credential for Qdrant Cloud cluster', docUrl: 'https://qdrant.tech/' },
          { name: 'QDRANT_URL', type: 'secret', placeholder: 'https://qdrant-cluster-abcd.qdrant.tech:6333', comment: 'REST/gRPC endpoint URL of the Qdrant service', docUrl: 'https://qdrant.tech/' },
          { name: 'AI_CONTEXT_WINDOW', type: 'secret', placeholder: '128000', comment: 'Active prompt token limit for the Gemini session context', docUrl: 'https://aistudio.google.com/' }
        ],
        advancedVariables: [
          { name: 'REDIS_URL', type: 'secret', placeholder: 'redis://localhost:6379', comment: 'Caching layer for high-speed AI embeddings and chat context database', docUrl: 'https://redis.io/' },
          { name: 'REDIS_MAX_CONNECTIONS', type: 'secret', placeholder: '20', comment: 'Maximum concurrent active connections in the Redis pool', docUrl: 'https://redis.io/' },
          { name: 'LANGCHAIN_TRACING_V2', type: 'secret', placeholder: 'false', comment: 'Turn off LangSmith tracing locally', docUrl: 'https://smith.langchain.com/' }
        ]
      }
    ]
  },
  'saas-stack': {
    name: '💳 SaaS Stack',
    defaultFramework: 'nextjs',
    rotations: [
      {
        description: 'Next.js + Stripe + Clerk + Postgres + Resend',
        framework: 'nextjs',
        services: ['stripe', 'clerk', 'postgres'],
        variables: [
          { name: 'DATABASE_URL', type: 'secret', placeholder: 'postgresql://postgres:db_pwd@localhost:5432/saas_db', comment: 'Main app PostgreSQL database connection string', docUrl: 'https://www.postgresql.org/docs/' },
          { name: 'STRIPE_SECRET_KEY', type: 'secret', placeholder: 'sk_test_51MockStripeSecretKey2026', comment: 'Stripe backend secret key. Never expose in frontend.', docUrl: 'https://dashboard.stripe.com/apikeys' },
          { name: 'STRIPE_WEBHOOK_SECRET', type: 'secret', placeholder: 'whsec_MockWebhookSecretKey2026', comment: 'Webhook validator to verify Stripe payment events', docUrl: 'https://dashboard.stripe.com/webhooks' },
          { name: 'CLERK_PUBLISHABLE_KEY', type: 'public', placeholder: 'pk_test_clerk_mock_key_123', comment: 'Clerk Auth safe key for client-side mounting and SDK load', docUrl: 'https://dashboard.clerk.com/' },
          { name: 'CLERK_SECRET_KEY', type: 'secret', placeholder: 'sk_test_clerk_secret_mock_key_999', comment: 'Private Clerk credential used for backend API calls', docUrl: 'https://dashboard.clerk.com/' },
          { name: 'RESEND_API_KEY', type: 'secret', placeholder: 're_MockResendAPIKey123456', comment: 'Email sending platform credential key', docUrl: 'https://resend.com/overview' },
          { name: 'APP_URL', type: 'public', placeholder: 'http://localhost:3000', comment: 'Base application absolute URL for redirects', docUrl: 'https://github.com/settings/apps' },
          { name: 'JWT_SECRET', type: 'secret', placeholder: 'jwt_secure_secret_hash_2026_saas', comment: 'Token signing secret for custom session cookies', docUrl: 'https://jwt.io/' }
        ],
        advancedVariables: [
          { name: 'UPSTASH_REDIS_REST_URL', type: 'public', placeholder: 'https://gilded-panda-12345.upstash.io', comment: 'Rate limit endpoint for DDoS and API spam mitigation', docUrl: 'https://upstash.com/' },
          { name: 'UPSTASH_REDIS_REST_TOKEN', type: 'secret', placeholder: 'upstash_redis_mock_token_abc', comment: 'Rate limit auth token', docUrl: 'https://upstash.com/' },
          { name: 'SENTRY_DSN', type: 'secret', placeholder: 'https://sentry_mock_key@o100.ingest.sentry.io/450', comment: 'Sentry crash reporter connection endpoint', docUrl: 'https://sentry.io/' },
          { name: 'STRIPE_WEBHOOK_SECRET_LIVE', type: 'secret', placeholder: 'whsec_live_MockWebhookSecretKey2026', comment: 'Webhook signature for production Stripe events', docUrl: 'https://dashboard.stripe.com/webhooks' },
          { name: 'AWS_REGION', type: 'secret', placeholder: 'us-east-1', comment: 'Standard cloud server deployment hosting region', docUrl: 'https://aws.amazon.com/' }
        ]
      },
      {
        description: 'Remix + Stripe + Auth0 + MySQL + SendGrid',
        framework: 'remix',
        services: ['stripe', 'mysql'],
        variables: [
          { name: 'DATABASE_URL', type: 'secret', placeholder: 'mysql://root:password@127.0.0.1:3306/remix_saas', comment: 'MySQL backend schema connection URL', docUrl: 'https://dev.mysql.com/doc/' },
          { name: 'STRIPE_SECRET_KEY', type: 'secret', placeholder: 'sk_test_51StripeRemixMock', comment: 'Stripe API key for checkout sessions', docUrl: 'https://dashboard.stripe.com/apikeys' },
          { name: 'STRIPE_WEBHOOK_SECRET', type: 'secret', placeholder: 'whsec_StripeRemixWebhookMock', comment: 'Verification hash for Remix webhook endpoints', docUrl: 'https://dashboard.stripe.com/webhooks' },
          { name: 'AUTH0_SECRET', type: 'secret', placeholder: 'auth0_secret_key_mock_long_string_2026', comment: 'Token encryption string for Auth0 sessions', docUrl: 'https://auth0.com/' },
          { name: 'AUTH0_BASE_URL', type: 'secret', placeholder: 'http://localhost:3000', comment: 'Callback and auth URL of this client application', docUrl: 'https://auth0.com/' },
          { name: 'AUTH0_ISSUER_BASE_URL', type: 'secret', placeholder: 'https://dev-auth0-mock.us.auth0.com', comment: 'Auth0 domain identifier tenant URL', docUrl: 'https://auth0.com/' },
          { name: 'AUTH0_CLIENT_ID', type: 'secret', placeholder: 'auth0_client_id_mock_123', comment: 'Auth0 registered app ID credential', docUrl: 'https://auth0.com/' },
          { name: 'SENDGRID_API_KEY', type: 'secret', placeholder: 'SG.SendGridMockKey12345', comment: 'API key for transactional email deliveries via SendGrid', docUrl: 'https://sendgrid.com/' },
          { name: 'APP_URL', type: 'secret', placeholder: 'http://localhost:3000', comment: 'Base application endpoint', docUrl: 'https://auth0.com/' }
        ],
        advancedVariables: [
          { name: 'SENTRY_DSN', type: 'secret', placeholder: 'https://sentry_mock_key@o100.ingest.sentry.io/450', comment: 'Telemetry crash tracking client', docUrl: 'https://sentry.io/' },
          { name: 'SENDGRID_SANDBOX_MODE', type: 'secret', placeholder: 'false', comment: 'Disables mail deliverability validation checks for tests', docUrl: 'https://sendgrid.com/' }
        ]
      },
      {
        description: 'SvelteKit + LemonSqueezy + Supabase Auth + Postmark',
        framework: 'sveltekit',
        services: ['supabase_db', 'postgres'],
        variables: [
          { name: 'DATABASE_URL', type: 'secret', placeholder: 'postgresql://postgres:pwd@db.neon.tech/svelte_saas', comment: 'Main app SvelteKit Postgres connection URL', docUrl: 'https://www.postgresql.org/docs/' },
          { name: 'LEMON_SQUEEZY_API_KEY', type: 'secret', placeholder: 'ls_api_mock_key_9999', comment: 'API key for LemonSqueezy recurring billing platform', docUrl: 'https://docs.lemonsqueezy.com/help/api' },
          { name: 'LEMON_SQUEEZY_WEBHOOK_SECRET', type: 'secret', placeholder: 'lsws_mock_secret_888', comment: 'Verifies LemonSqueezy subscription webhook requests', docUrl: 'https://docs.lemonsqueezy.com/help/api' },
          { name: 'SUPABASE_URL', type: 'public', placeholder: 'https://supabase.co', comment: 'Auth and database backend service URL', docUrl: 'https://supabase.com/' },
          { name: 'SUPABASE_ANON_KEY', type: 'public', placeholder: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.anon', comment: 'Publicly readable token to load auth components', docUrl: 'https://supabase.com/' },
          { name: 'POSTMARK_SERVER_TOKEN', type: 'secret', placeholder: 'postmark_server_mock_token_abc', comment: 'Postmark client token to dispatch transactional receipts', docUrl: 'https://postmarkapp.com/' },
          { name: 'APP_URL', type: 'public', placeholder: 'http://localhost:5173', comment: 'Active server domain url', docUrl: 'https://postmarkapp.com/' }
        ],
        advancedVariables: [
          { name: 'LAUNCHDARKLY_SDK_KEY', type: 'secret', placeholder: 'sdk-launchdarkly-prod-mock', comment: 'Real-time feature flag manager key', docUrl: 'https://launchdarkly.com/' },
          { name: 'POSTMARK_BOUNCE_WEBHOOK_URL', type: 'secret', placeholder: 'http://localhost:5173/api/webhooks/postmark-bounces', comment: 'Handles failed deliveries', docUrl: 'https://postmarkapp.com/' }
        ]
      }
    ]
  },
  'python-backend': {
    name: '🐍 Python API',
    defaultFramework: 'fastapi',
    rotations: [
      {
        description: 'FastAPI + PostgreSQL + Redis + Celery',
        framework: 'fastapi',
        services: ['postgres', 'redis'],
        variables: [
          { name: 'DATABASE_URL', type: 'secret', placeholder: 'postgresql://postgres:db_pwd@localhost:5432/fastapi_db', comment: 'SQLAlchemy / Tortoise ORM Postgres database endpoint', docUrl: 'https://www.postgresql.org/docs/' },
          { name: 'REDIS_URL', type: 'secret', placeholder: 'redis://localhost:6379/0', comment: 'Redis Cache connection endpoint. DB index 0.', docUrl: 'https://redis.io/' },
          { name: 'SECRET_KEY', type: 'secret', placeholder: 'fastapi_secure_secret_key_2026_api', comment: 'Salt token string used for encoding and decoding OAuth2 JWT tokens', docUrl: 'https://fastapi.tiangolo.com/' },
          { name: 'JWT_ALGORITHM', type: 'secret', placeholder: 'HS256', comment: 'Cryptographic hashing algorithm algorithm configuration', docUrl: 'https://fastapi.tiangolo.com/' },
          { name: 'ACCESS_TOKEN_EXPIRE_MINUTES', type: 'secret', placeholder: '60', comment: 'Token lifespan timeout duration in minutes', docUrl: 'https://fastapi.tiangolo.com/' },
          { name: 'CELERY_BROKER_URL', type: 'secret', placeholder: 'redis://localhost:6379/1', comment: 'Celery worker message broker queue. DB index 1.', docUrl: 'https://docs.celeryq.dev/' },
          { name: 'CELERY_RESULT_BACKEND', type: 'secret', placeholder: 'redis://localhost:6379/1', comment: 'Queue result storage directory endpoint. DB index 1.', docUrl: 'https://docs.celeryq.dev/' },
          { name: 'LOG_LEVEL', type: 'secret', placeholder: 'info', comment: 'Tuning configuration for standard output server logs (debug, info, warning, error)', docUrl: 'https://fastapi.tiangolo.com/' },
          { name: 'ENVIRONMENT', type: 'secret', placeholder: 'development', comment: 'Active execution state stage (development, staging, production)', docUrl: 'https://fastapi.tiangolo.com/' }
        ],
        advancedVariables: [
          { name: 'CELERY_WORKER_CONCURRENCY', type: 'secret', placeholder: '4', comment: 'Concurrent thread workers processing background tasks', docUrl: 'https://docs.celeryq.dev/' },
          { name: 'CELERY_WORKER_PREFETCH_MULTIPLIER', type: 'secret', placeholder: '1', comment: 'Prevents worker locking by prefetching single tasks', docUrl: 'https://docs.celeryq.dev/' },
          { name: 'REDIS_MAX_CONNECTIONS', type: 'secret', placeholder: '20', comment: 'Maximum active socket pool limit for the Redis database client', docUrl: 'https://redis.io/' },
          { name: 'WEB_CONCURRENCY', type: 'secret', placeholder: '3', comment: 'Gunicorn / Uvicorn parent worker forks tuning settings', docUrl: 'https://fastapi.tiangolo.com/' },
          { name: 'SENTRY_DSN', type: 'secret', placeholder: 'https://sentry_py_mock_key@o200.ingest.sentry.io/450', comment: 'Sentry credentials connection endpoint for FastAPI exceptions', docUrl: 'https://sentry.io/' },
          { name: 'PROMETHEUS_METRICS_ENABLED', type: 'secret', placeholder: 'True', comment: 'Toggles export endpoint endpoint for system monitoring', docUrl: 'https://prometheus.io/' }
        ]
      },
      {
        description: 'Django + MySQL + Celery + Redis',
        framework: 'django',
        services: ['mysql', 'redis'],
        variables: [
          { name: 'DB_ENGINE', type: 'secret', placeholder: 'django.db.backends.mysql', comment: 'Django database back-end layer engine', docUrl: 'https://docs.djangoproject.com/' },
          { name: 'DB_NAME', type: 'secret', placeholder: 'django_db', comment: 'Target relational schema database name', docUrl: 'https://docs.djangoproject.com/' },
          { name: 'DB_USER', type: 'secret', placeholder: 'django_user', comment: 'Secure MySQL db connection user login', docUrl: 'https://docs.djangoproject.com/' },
          { name: 'DB_PASSWORD', type: 'secret', placeholder: 'django_secure_pwd_2026', comment: 'Secure credentials for MySQL user', docUrl: 'https://docs.djangoproject.com/' },
          { name: 'DB_HOST', type: 'secret', placeholder: '127.0.0.1', comment: 'MySQL hostname address', docUrl: 'https://docs.djangoproject.com/' },
          { name: 'DB_PORT', type: 'secret', placeholder: '3306', comment: 'Standard MySQL server running port', docUrl: 'https://docs.djangoproject.com/' },
          { name: 'SECRET_KEY', type: 'secret', placeholder: 'django-insecure-mock-secret-key-2026-xyz', comment: 'Django cryptographic salt key base', docUrl: 'https://docs.djangoproject.com/' },
          { name: 'CELERY_BROKER_URL', type: 'secret', placeholder: 'redis://127.0.0.1:6379/0', comment: 'Celery tasks message dispatcher broker', docUrl: 'https://docs.celeryq.dev/' },
          { name: 'CELERY_RESULT_BACKEND', type: 'secret', placeholder: 'redis://127.0.0.1:6379/0', comment: 'Location database for completed tasks status', docUrl: 'https://docs.celeryq.dev/' },
          { name: 'DEBUG', type: 'secret', placeholder: 'True', comment: 'Toggles system tracebacks and debug layouts', docUrl: 'https://docs.djangoproject.com/' },
          { name: 'ALLOWED_HOSTS', type: 'secret', placeholder: 'localhost,127.0.0.1', comment: 'Whitelisted domains host server responds to', docUrl: 'https://docs.djangoproject.com/' }
        ],
        advancedVariables: [
          { name: 'CACHE_TTL', type: 'secret', placeholder: '86400', comment: 'Django middleware caching lifecycle duration in seconds', docUrl: 'https://docs.djangoproject.com/' },
          { name: 'SENTRY_DSN', type: 'secret', placeholder: 'https://sentry_mock_key@o100.ingest.sentry.io/450', comment: 'Production error logging dashboard integration endpoint', docUrl: 'https://sentry.io/' }
        ]
      },
      {
        description: 'FastAPI + MongoDB + RabbitMQ + Redis',
        framework: 'fastapi',
        services: ['mongodb', 'redis'],
        variables: [
          { name: 'MONGO_URI', type: 'secret', placeholder: 'mongodb://localhost:27017/fastapi_mongo', comment: 'PyMongo / Motor ODM client server connection endpoint', docUrl: 'https://mongodb.com/' },
          { name: 'REDIS_URL', type: 'secret', placeholder: 'redis://localhost:6379/0', comment: 'Cache store memory connection endpoint', docUrl: 'https://redis.io/' },
          { name: 'RABBITMQ_URL', type: 'secret', placeholder: 'amqp://guest:guest@localhost:5672//', comment: 'RabbitMQ server message queue broker URL', docUrl: 'https://rabbitmq.com/' },
          { name: 'SECRET_KEY', type: 'secret', placeholder: 'fastapi_mongo_secret_2026', comment: 'Encoding hash key string', docUrl: 'https://fastapi.tiangolo.com/' },
          { name: 'JWT_ALGORITHM', type: 'secret', placeholder: 'HS256', comment: 'Cryptography algorithm standard parameter', docUrl: 'https://fastapi.tiangolo.com/' },
          { name: 'ACCESS_TOKEN_EXPIRE_MINUTES', type: 'secret', placeholder: '30', comment: 'Tokens duration settings', docUrl: 'https://fastapi.tiangolo.com/' },
          { name: 'ENVIRONMENT', type: 'secret', placeholder: 'staging', comment: 'Execution environment', docUrl: 'https://fastapi.tiangolo.com/' }
        ],
        advancedVariables: [
          { name: 'MONGO_MAX_POOL_SIZE', type: 'secret', placeholder: '50', comment: 'Concurrent maximum active socket pool size for database connections', docUrl: 'https://mongodb.com/' },
          { name: 'OTEL_EXPORTER_OTLP_ENDPOINT', type: 'secret', placeholder: 'http://localhost:4317', comment: 'OpenTelemetry infrastructure collection client endpoint', docUrl: 'https://opentelemetry.io/' }
        ]
      }
    ]
  },
  'classic-mvc': {
    name: '🐘 Classic MVC',
    defaultFramework: 'laravel',
    rotations: [
      {
        description: 'Laravel + MySQL + Redis (Queue) + Mailgun',
        framework: 'laravel',
        services: ['mysql', 'redis'],
        variables: [
          { name: 'APP_NAME', type: 'secret', placeholder: 'Laravel', comment: 'Active application name descriptor', docUrl: 'https://laravel.com/docs' },
          { name: 'APP_ENV', type: 'secret', placeholder: 'local', comment: 'Active runtime deployment stage (local, testing, production)', docUrl: 'https://laravel.com/docs' },
          { name: 'APP_KEY', type: 'secret', placeholder: 'base64:laravel_mock_key_2026_secure_key_hash_123', comment: 'Salt seed used for encrypting app session cookies', docUrl: 'https://laravel.com/docs/10.x/encryption' },
          { name: 'APP_DEBUG', type: 'secret', placeholder: 'true', comment: 'Toggles full framework exceptions screen overlays', docUrl: 'https://laravel.com/docs' },
          { name: 'APP_URL', type: 'secret', placeholder: 'http://localhost', comment: 'Absolute base application domain address', docUrl: 'https://laravel.com/docs' },
          { name: 'DB_CONNECTION', type: 'secret', placeholder: 'mysql', comment: 'Relational database driver adapter key', docUrl: 'https://laravel.com/docs/10.x/database' },
          { name: 'DB_HOST', type: 'secret', placeholder: '127.0.0.1', comment: 'MySQL cluster container host address', docUrl: 'https://laravel.com/docs/10.x/database' },
          { name: 'DB_PORT', type: 'secret', placeholder: '3306', comment: 'MySQL default server access port', docUrl: 'https://laravel.com/docs/10.x/database' },
          { name: 'DB_DATABASE', type: 'secret', placeholder: 'laravel_db', comment: 'Target relational schema database name', docUrl: 'https://laravel.com/docs/10.x/database' },
          { name: 'DB_USERNAME', type: 'secret', placeholder: 'root', comment: 'SQL administrator connection login user', docUrl: 'https://laravel.com/docs/10.x/database' },
          { name: 'DB_PASSWORD', type: 'secret', placeholder: 'secret_pwd', comment: 'SQL database administrator credentials password', docUrl: 'https://laravel.com/docs/10.x/database' },
          { name: 'QUEUE_CONNECTION', type: 'secret', placeholder: 'redis', comment: 'Background queue dispatch system driver', docUrl: 'https://laravel.com/docs/10.x/queues' },
          { name: 'CACHE_STORE', type: 'secret', placeholder: 'redis', comment: 'Key-value cache server driver selection parameter', docUrl: 'https://laravel.com/docs/10.x/cache' },
          { name: 'REDIS_HOST', type: 'secret', placeholder: '127.0.0.1', comment: 'Redis caching server address', docUrl: 'https://laravel.com/docs/10.x/redis' },
          { name: 'REDIS_PORT', type: 'secret', placeholder: '6379', comment: 'Redis server port', docUrl: 'https://laravel.com/docs/10.x/redis' },
          { name: 'MAIL_MAILER', type: 'secret', placeholder: 'mailgun', comment: 'SMTP / API mail dispatching engine config key', docUrl: 'https://laravel.com/docs/10.x/mail' },
          { name: 'MAILGUN_DOMAIN', type: 'secret', placeholder: 'mg.laravel.com', comment: 'Whitelisted registered Mailgun sending domain', docUrl: 'https://laravel.com/docs/10.x/mail' },
          { name: 'MAILGUN_SECRET', type: 'secret', placeholder: 'key-mailgun_mock_secret_key', comment: 'Private Mailgun API billing key', docUrl: 'https://laravel.com/docs/10.x/mail' }
        ],
        advancedVariables: [
          { name: 'CACHE_TTL', type: 'secret', placeholder: '86400', comment: 'System data caching expiration period in seconds', docUrl: 'https://laravel.com/docs/10.x/cache' },
          { name: 'QUEUE_MAX_ATTEMPTS', type: 'secret', placeholder: '3', comment: 'Maximum task retries threshold before throwing background errors', docUrl: 'https://laravel.com/docs/10.x/queues' },
          { name: 'QUEUE_RETRY_AFTER', type: 'secret', placeholder: '90', comment: 'Seconds duration to wait before locking task retry executions', docUrl: 'https://laravel.com/docs/10.x/queues' },
          { name: 'LAUNCHDARKLY_SDK_KEY', type: 'secret', placeholder: 'sdk-launchdarkly-prod-mock', comment: 'Feature toggles manager key', docUrl: 'https://launchdarkly.com/' },
          { name: 'SENTRY_LARAVEL_DSN', type: 'secret', placeholder: 'https://sentry_laravel_mock_key', comment: 'Sentry connection parameter for PHP backend logs', docUrl: 'https://sentry.io/' }
        ]
      },
      {
        description: 'Ruby on Rails + PostgreSQL + Sidekiq + Postmark',
        framework: 'rails',
        services: ['postgres', 'redis'],
        variables: [
          { name: 'RAILS_ENV', type: 'secret', placeholder: 'development', comment: 'Active application execution state stage', docUrl: 'https://guides.rubyonrails.org/' },
          { name: 'SECRET_KEY_BASE', type: 'secret', placeholder: 'rails_secure_secret_key_base_mock_2026', comment: 'Cryptographic salt token for secure session cookie generation', docUrl: 'https://guides.rubyonrails.org/' },
          { name: 'DATABASE_URL', type: 'secret', placeholder: 'postgresql://postgres:db_pwd@127.0.0.1:5432/rails_db', comment: 'Relational active PostgreSQL connection URL', docUrl: 'https://guides.rubyonrails.org/database_.html' },
          { name: 'REDIS_URL', type: 'secret', placeholder: 'redis://127.0.0.1:6379/1', comment: 'Redis client queue connection URL. DB index 1.', docUrl: 'https://redis.io/' },
          { name: 'SIDEKIQ_CONCURRENCY', type: 'secret', placeholder: '5', comment: 'Concurrent threading processing server limits for Sidekiq queues', docUrl: 'https://github.com/sidekiq/sidekiq' },
          { name: 'POSTMARK_API_TOKEN', type: 'secret', placeholder: 'postmark_rails_mock_token', comment: 'Mail Delivery Server API key', docUrl: 'https://postmarkapp.com/' },
          { name: 'ACTION_MAILER_HOST', type: 'secret', placeholder: 'localhost:3000', comment: 'URL of host server used inside email body hyperlinks', docUrl: 'https://guides.rubyonrails.org/' }
        ],
        advancedVariables: [
          { name: 'PORT', type: 'secret', placeholder: '3000', comment: 'Rails puma webserver execution port', docUrl: 'https://guides.rubyonrails.org/' },
          { name: 'RAILS_MAX_THREADS', type: 'secret', placeholder: '5', comment: 'Concurrent database threading pools limits', docUrl: 'https://guides.rubyonrails.org/' }
        ]
      },
      {
        description: 'ASP.NET Core + SQL Server + RabbitMQ + SMTP',
        framework: 'aspnet',
        services: [],
        variables: [
          { name: 'ASPNETCORE_ENVIRONMENT', type: 'secret', placeholder: 'Development', comment: 'Standard framework execution stage parameter (Development, Staging, Production)', docUrl: 'https://learn.microsoft.com/en-us/aspnet/core/' },
          { name: 'ConnectionStrings__DefaultConnection', type: 'secret', placeholder: 'Server=tcp:sqlserver,1433;Database=aspnet_db;User ID=sa;Password=secure_pwd;', comment: 'SQL Server connection credentials parameter', docUrl: 'https://learn.microsoft.com/en-us/aspnet/core/' },
          { name: 'RabbitMQ__Host', type: 'secret', placeholder: 'localhost', comment: 'RabbitMQ host endpoint running address', docUrl: 'https://www.rabbitmq.com/' },
          { name: 'RabbitMQ__Username', type: 'secret', placeholder: 'guest', comment: 'Queue validation user login', docUrl: 'https://www.rabbitmq.com/' },
          { name: 'RabbitMQ__Password', type: 'secret', placeholder: 'guest', comment: 'Queue credentials password', docUrl: 'https://www.rabbitmq.com/' },
          { name: 'Smtp__Host', type: 'secret', placeholder: 'smtp.mailtrap.io', comment: 'Transactional mail outgoing SMTP gateway', docUrl: 'https://mailtrap.io/' },
          { name: 'Smtp__Port', type: 'secret', placeholder: '2525', comment: 'SMTP connection gateway port', docUrl: 'https://mailtrap.io/' },
          { name: 'Smtp__Username', type: 'secret', placeholder: 'smtp_user', comment: 'SMTP gateway login credentials user', docUrl: 'https://mailtrap.io/' },
          { name: 'Smtp__Password', type: 'secret', placeholder: 'smtp_pwd', comment: 'SMTP gateway access password', docUrl: 'https://mailtrap.io/' }
        ],
        advancedVariables: [
          { name: 'ASPNETCORE_URLS', type: 'secret', placeholder: 'http://+:80;https://+:443', comment: 'Web hosting ports and server protocol mappings', docUrl: 'https://learn.microsoft.com/en-us/aspnet/core/' }
        ]
      }
    ]
  },
  'web3-dapp': {
    name: '🌐 Web3 dApp',
    defaultFramework: 'vite',
    rotations: [
      {
        description: 'Vite (React) + Alchemy + WalletConnect + Contracts (Eth/Hardhat)',
        framework: 'vite',
        services: [],
        variables: [
          { name: 'ALCHEMY_API_KEY', type: 'secret', placeholder: 'alch_mock_ethereum_api_key_2026', comment: 'Alchemy RPC Node provider private gateway API key', docUrl: 'https://www.alchemy.com/' },
          { name: 'WALLETCONNECT_PROJECT_ID', type: 'public', placeholder: 'wc_project_id_mock_123456', comment: 'Web3 WalletConnect project identifier to mount wallets modal', docUrl: 'https://cloud.walletconnect.com/' },
          { name: 'RPC_URL', type: 'public', placeholder: 'https://eth-mainnet.g.alchemy.com/v2/alch_mock_ethereum_api_key_2026', comment: 'JSON-RPC endpoint URL for mainnet blockchain interaction', docUrl: 'https://www.alchemy.com/' },
          { name: 'CHAIN_ID', type: 'public', placeholder: '1', comment: 'Target active network numeric identifier (1 = Ethereum Mainnet)', docUrl: 'https://chainlist.org/' },
          { name: 'DEPLOYER_PRIVATE_KEY', type: 'secret', placeholder: '0x_hardhat_private_key_mock_64_chars_hex_value', comment: 'Smart contract deployment wallet private keys credentials. DO NOT commit.', docUrl: 'https://hardhat.org/' },
          { name: 'ETHERSCAN_API_KEY', type: 'secret', placeholder: 'etherscan_mock_api_key_999', comment: 'Required to auto-verify compiled smart contract codes on Etherscan', docUrl: 'https://etherscan.io/' }
        ],
        advancedVariables: [
          { name: 'FALLBACK_RPC_URL', type: 'public', placeholder: 'https://eth-mainnet.infura.io/v3/infura_mock', comment: 'Backup fallback JSON-RPC endpoint to prevent rate limiting', docUrl: 'https://infura.io/' },
          { name: 'GAS_PRICE_LIMIT_GWEI', type: 'secret', placeholder: '100', comment: 'Maximum active gas price cap threshold in Gwei to execute smart contract operations', docUrl: 'https://etherscan.io/' },
          { name: 'GNOSIS_SAFE_ADDRESS', type: 'secret', placeholder: '0x_gnosis_safe_address_mock', comment: 'Multi-sig wallet address acting as contract administrator role', docUrl: 'https://safe.global/' },
          { name: 'PINATA_API_KEY', type: 'secret', placeholder: 'pinata_mock_api_key_123', comment: 'API credential for Pinata IPFS metadata storage service', docUrl: 'https://www.pinata.cloud/' },
          { name: 'PINATA_SECRET_API_KEY', type: 'secret', placeholder: 'pinata_mock_secret_key_abc', comment: 'API private secret for Pinata service', docUrl: 'https://www.pinata.cloud/' }
        ]
      },
      {
        description: 'Next.js + Infura + RainbowKit + Smart Contracts (Polygon/Foundry)',
        framework: 'nextjs',
        services: [],
        variables: [
          { name: 'INFURA_PROJECT_ID', type: 'secret', placeholder: 'infura_mock_polygon_project_id_2026', comment: 'Infura client RPC node access endpoint ID', docUrl: 'https://infura.io/' },
          { name: 'WALLETCONNECT_PROJECT_ID', type: 'public', placeholder: 'wc_project_id_mock_polygon', comment: 'Clerk WalletConnect project ID for authentication modals', docUrl: 'https://cloud.walletconnect.com/' },
          { name: 'RPC_URL', type: 'public', placeholder: 'https://polygon-mainnet.infura.io/v3/infura_mock_polygon_project_id_2026', comment: 'JSON-RPC provider for Polygon PoS network', docUrl: 'https://infura.io/' },
          { name: 'CHAIN_ID', type: 'public', placeholder: '137', comment: 'Numeric network ID (137 = Polygon Mainnet)', docUrl: 'https://chainlist.org/' },
          { name: 'FOUNDRY_DEPLOYER_KEY', type: 'secret', placeholder: '0x_foundry_private_key_mock_64_chars', comment: 'Deployment key for Foundry forge script configurations', docUrl: 'https://book.getfoundry.sh/' },
          { name: 'POLYGONSCAN_API_KEY', type: 'secret', placeholder: 'polygonscan_mock_api_key_888', comment: 'Contract code verification keys', docUrl: 'https://polygonscan.com/' }
        ],
        advancedVariables: [
          { name: 'SENTRY_DSN', type: 'secret', placeholder: 'https://sentry_mock_key@o100.ingest.sentry.io/450', comment: 'Sentry connection endpoint', docUrl: 'https://sentry.io/' }
        ]
      },
      {
        description: 'Vue + QuickNode + Web3Auth + Solana Web3.js',
        framework: 'vite',
        services: [],
        variables: [
          { name: 'QUICKNODE_URL', type: 'public', placeholder: 'https://solana-mainnet.quiknode.pro/quicknode_mock_token/', comment: 'QuickNode RPC Endpoint for Solana Web3 client network lookup', docUrl: 'https://www.quicknode.com/' },
          { name: 'WEB3AUTH_CLIENT_ID', type: 'public', placeholder: 'web3auth_mock_client_id_solana', comment: 'Social logins Web3 authentication middleware client key', docUrl: 'https://web3auth.io/' },
          { name: 'SOLANA_NETWORK', type: 'public', placeholder: 'mainnet-beta', comment: 'Solana active network identifier cluster (devnet, testnet, mainnet-beta)', docUrl: 'https://solana.com/' },
          { name: 'SOLANA_DEPLOYER_PRIVATE_KEY', type: 'secret', placeholder: '0x_solana_private_key_mock_array_or_hex', comment: 'Program authority credentials deployer private keys', docUrl: 'https://solana.com/' }
        ],
        advancedVariables: [
          { name: 'HELICONE_API_KEY', type: 'secret', placeholder: 'sk-helicone-prod-mock-key', comment: 'Proxy proxy loggers key', docUrl: 'https://helicone.ai/' }
        ]
      }
    ]
  },
  'devops-docker': {
    name: '🐳 DevOps / Docker Stack',
    defaultFramework: 'nodejs',
    rotations: [
      {
        description: 'Express + Docker + Kubernetes + Grafana + Prometheus',
        framework: 'nodejs',
        services: ['postgres'],
        variables: [
          { name: 'DOCKER_REGISTRY', type: 'secret', placeholder: 'docker.io/my-username', comment: 'Image push repository server namespace url', docUrl: 'https://hub.docker.com/' },
          { name: 'CONTAINER_PORT', type: 'secret', placeholder: '8080', comment: 'Internal Docker container exposed network port', docUrl: 'https://docs.docker.com/' },
          { name: 'DEPLOY_ENV', type: 'secret', placeholder: 'production', comment: 'Active application staging environment tag', docUrl: 'https://kubernetes.io/' },
          { name: 'KUBE_NAMESPACE', type: 'secret', placeholder: 'backend-prod', comment: 'Kubernetes cluster segregation logical namespace', docUrl: 'https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/' },
          { name: 'GRAFANA_API_KEY', type: 'secret', placeholder: 'glsa_mock_grafana_token_123', comment: 'Token credentials for pushing performance data dashboards', docUrl: 'https://grafana.com/' },
          { name: 'PROMETHEUS_URL', type: 'secret', placeholder: 'http://prometheus-service.monitoring:9090', comment: 'Metric collection server database server endpoint', docUrl: 'https://prometheus.io/' },
          { name: 'HELM_RELEASE_NAME', type: 'secret', placeholder: 'backend-api', comment: 'Chart release name descriptor identifier', docUrl: 'https://helm.sh/' }
        ],
        advancedVariables: [
          { name: 'POD_REPLICAS', type: 'secret', placeholder: '3', comment: 'Desired active Kubernetes deployment scaling pod replicas', docUrl: 'https://kubernetes.io/' },
          { name: 'LOGGING_LEVEL', type: 'secret', placeholder: 'ERROR', comment: 'Output logging verbosity tuning standard', docUrl: 'https://kubernetes.io/' },
          { name: 'LOKI_URL', type: 'secret', placeholder: 'http://loki.monitoring:3100', comment: 'Grafana Loki cluster logging collector URL', docUrl: 'https://grafana.com/oss/loki/' },
          { name: 'LETSENCRYPT_EMAIL', type: 'secret', placeholder: 'admin@my-domain.com', comment: 'LetsEncrypt notifications email configuration', docUrl: 'https://letsencrypt.org/' },
          { name: 'INGRESS_HOST', type: 'secret', placeholder: 'api.my-domain.com', comment: 'Kubernetes ingress routing domain name mapping endpoint', docUrl: 'https://kubernetes.io/' }
        ]
      },
      {
        description: 'FastAPI + Docker + GitHub Actions CI + Sentry + Datadog',
        framework: 'fastapi',
        services: [],
        variables: [
          { name: 'DOCKER_IMAGE', type: 'secret', placeholder: 'ghcr.io/my-org/my-fastapi-app', comment: 'Target GitHub packages container image address registry', docUrl: 'https://github.com/features/packages' },
          { name: 'CONTAINER_PORT', type: 'secret', placeholder: '8000', comment: 'FastAPI container exposed server port', docUrl: 'https://docs.docker.com/' },
          { name: 'DEPLOY_ENV', type: 'secret', placeholder: 'staging', comment: 'CI environment identifier tag', docUrl: 'https://github.com/features/actions' },
          { name: 'GITHUB_ACTIONS', type: 'secret', placeholder: 'true', comment: 'Checks execution context inside active GitHub Actions container pipelines', docUrl: 'https://github.com/features/actions' },
          { name: 'DATADOG_API_KEY', type: 'secret', placeholder: 'dd_mock_api_key_2026_secure', comment: 'Datadog observability platform api credentials', docUrl: 'https://www.datadoghq.com/' },
          { name: 'DATADOG_SITE', type: 'secret', placeholder: 'datadoghq.com', comment: 'Target Datadog cloud dashboard region url', docUrl: 'https://www.datadoghq.com/' },
          { name: 'SENTRY_DSN', type: 'secret', placeholder: 'https://sentry_mock_key@o100.ingest.sentry.io/450', comment: 'Sentry core monitoring client parameters', docUrl: 'https://sentry.io/' }
        ],
        advancedVariables: [
          { name: 'DATADOG_SERVICE', type: 'secret', placeholder: 'fastapi-backend', comment: 'Logical name of server tags inside Datadog dashboard logs', docUrl: 'https://www.datadoghq.com/' }
        ]
      },
      {
        description: 'Go (Gin) + Docker + GitLab CI + OpenTelemetry + Jaeger',
        framework: 'go',
        services: [],
        variables: [
          { name: 'DOCKER_REGISTRY', type: 'secret', placeholder: 'registry.gitlab.com/my-group/my-go-app', comment: 'GitLab Container Registry registry address', docUrl: 'https://docs.gitlab.com/ee/user/packages/container_registry/' },
          { name: 'CONTAINER_PORT', type: 'secret', placeholder: '3000', comment: 'Golang server internal execution exposed port', docUrl: 'https://docs.docker.com/' },
          { name: 'DEPLOY_ENV', type: 'secret', placeholder: 'development', comment: 'Execution environment tag', docUrl: 'https://docs.gitlab.com/' },
          { name: 'GITLAB_CI', type: 'secret', placeholder: 'true', comment: 'Detects active GitLab execution environments', docUrl: 'https://docs.gitlab.com/' },
          { name: 'OTEL_EXPORTER_OTLP_ENDPOINT', type: 'secret', placeholder: 'http://jaeger-collector:4317', comment: 'OpenTelemetry collector endpoint forwarding signals', docUrl: 'https://opentelemetry.io/' },
          { name: 'OTEL_SERVICE_NAME', type: 'secret', placeholder: 'go-microservice', comment: 'OTel telemetry traces service logical identifier', docUrl: 'https://opentelemetry.io/' }
        ],
        advancedVariables: [
          { name: 'JAEGER_ENDPOINT', type: 'secret', placeholder: 'http://localhost:14268/api/traces', comment: 'Jaeger visualizer storage endpoint connection url', docUrl: 'https://www.jaegertracing.io/' }
        ]
      }
    ]
  },
  'firebase-app': {
    name: '🔥 Firebase App',
    defaultFramework: 'vite',
    rotations: [
      {
        description: 'Vite (React) + Firebase Core + Auth + Firestore + Storage',
        framework: 'vite',
        services: [],
        variables: [
          { name: 'FIREBASE_API_KEY', type: 'public', placeholder: 'AIzaSyFirebaseMockApiKey_2026_123', comment: 'Public web API configuration credentials key for Firebase Client SDK', docUrl: 'https://console.firebase.google.com/' },
          { name: 'FIREBASE_AUTH_DOMAIN', type: 'public', placeholder: 'my-firebase-app.firebaseapp.com', comment: 'Web authentication routing domains URL for components redirects', docUrl: 'https://console.firebase.google.com/' },
          { name: 'FIREBASE_PROJECT_ID', type: 'public', placeholder: 'my-firebase-app', comment: 'Firebase developer project identifier', docUrl: 'https://console.firebase.google.com/' },
          { name: 'FIREBASE_STORAGE_BUCKET', type: 'public', placeholder: 'my-firebase-app.appspot.com', comment: 'Storage files upload default bucket hosting container', docUrl: 'https://console.firebase.google.com/' },
          { name: 'FIREBASE_MESSAGING_SENDER_ID', type: 'public', placeholder: '123456789012', comment: 'Numeric identifier to authorize Push notifications deliveries', docUrl: 'https://console.firebase.google.com/' },
          { name: 'FIREBASE_APP_ID', type: 'public', placeholder: '1:123456789012:web:firebaseapp123', comment: 'Web application unique instance identifier key', docUrl: 'https://console.firebase.google.com/' },
          { name: 'FIREBASE_MEASUREMENT_ID', type: 'public', placeholder: 'G-FIREBASE123', comment: 'Google Analytics property stream key associated with Firebase', docUrl: 'https://console.firebase.google.com/' }
        ],
        advancedVariables: [
          { name: 'FIREBASE_FUNCTIONS_REGION', type: 'secret', placeholder: 'us-central1', comment: 'Serverless cloud functions default deployment region location', docUrl: 'https://firebase.google.com/docs/functions' },
          { name: 'FIRESTORE_EMULATOR_HOST', type: 'secret', placeholder: 'localhost:8080', comment: 'Local developer testing host routing bypass endpoint', docUrl: 'https://firebase.google.com/docs/emulator-suite' },
          { name: 'FIREBASE_CONFIG_CACHE_TIME_SEC', type: 'secret', placeholder: '3600', comment: 'Remote Config dashboard configs local cache lifecycle', docUrl: 'https://firebase.google.com/docs/remote-config' }
        ]
      },
      {
        description: 'Next.js + Firebase Core + Admin SDK + Cloud Functions + Firestore',
        framework: 'nextjs',
        services: [],
        variables: [
          { name: 'FIREBASE_API_KEY', type: 'public', placeholder: 'AIzaSyFirebaseNextJsMockApiKey_456', comment: 'Client SDK connection credentials key', docUrl: 'https://console.firebase.google.com/' },
          { name: 'FIREBASE_PROJECT_ID', type: 'public', placeholder: 'my-firebase-nextjs', comment: 'Next.js Firebase project context identifier', docUrl: 'https://console.firebase.google.com/' },
          { name: 'FIREBASE_CLIENT_EMAIL', type: 'secret', placeholder: 'firebase-adminsdk-mock@my-firebase-nextjs.iam.gserviceaccount.com', comment: 'Firebase Service Account email login credentials', docUrl: 'https://firebase.google.com/docs/admin/setup' },
          { name: 'FIREBASE_PRIVATE_KEY', type: 'secret', placeholder: '-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDh...\\n-----END PRIVATE KEY-----\\n', comment: 'Decryption private key for IAM administrative credentials. Do NOT commit.', docUrl: 'https://firebase.google.com/docs/admin/setup' },
          { name: 'FIREBASE_DATABASE_URL', type: 'secret', placeholder: 'https://my-firebase-nextjs.firebaseio.com', comment: 'Realtime Database JSON storage server URL endpoint', docUrl: 'https://console.firebase.google.com/' }
        ],
        advancedVariables: [
          { name: 'SUPER_ADMIN_EMAIL', type: 'secret', placeholder: 'admin@my-app.firebaseapp.com', comment: 'Special user role automatically authorized with premium administrative privileges', docUrl: 'https://firebase.google.com/docs/admin/setup' }
        ]
      },
      {
        description: 'SvelteKit + Firebase Core + Firestore + Messaging',
        framework: 'sveltekit',
        services: [],
        variables: [
          { name: 'FIREBASE_API_KEY', type: 'public', placeholder: 'AIzaSySvelteKitFirebaseMockApiKey_789', comment: 'Public web SDK key', docUrl: 'https://console.firebase.google.com/' },
          { name: 'FIREBASE_AUTH_DOMAIN', type: 'public', placeholder: 'svelte-firebase.firebaseapp.com', comment: 'Client UI authentication callback domain', docUrl: 'https://console.firebase.google.com/' },
          { name: 'FIREBASE_PROJECT_ID', type: 'public', placeholder: 'svelte-firebase', comment: 'SvelteKit project ID', docUrl: 'https://console.firebase.google.com/' },
          { name: 'FIREBASE_MESSAGING_SENDER_ID', type: 'public', placeholder: '987654321098', comment: 'Sender ID for web push integration', docUrl: 'https://console.firebase.google.com/' },
          { name: 'FIREBASE_APP_ID', type: 'public', placeholder: '1:987654321098:web:sveltefirebase123', comment: 'Unique application client wrapper ID', docUrl: 'https://console.firebase.google.com/' }
        ],
        advancedVariables: [
          { name: 'SENTRY_DSN', type: 'secret', placeholder: 'https://sentry_mock_key@o100.ingest.sentry.io/450', comment: 'Sentry connection endpoint', docUrl: 'https://sentry.io/' }
        ]
      }
    ]
  },
  'mern-stack': {
    name: '🥞 MERN Stack',
    defaultFramework: 'vite',
    rotations: [
      {
        description: 'Express + MongoDB + React (Vite) + Node + JWT',
        framework: 'vite',
        services: ['mongodb'],
        variables: [
          { name: 'MONGO_URI', type: 'secret', placeholder: 'mongodb://localhost:27017/mern_db', comment: 'Mongoose connection URI for local MongoDB server', docUrl: 'https://www.mongodb.com/docs/' },
          { name: 'JWT_SECRET', type: 'secret', placeholder: 'mern_jwt_secret_mock_2026_super_secure', comment: 'Encryption salt used to sign Express user credentials sessions', docUrl: 'https://jwt.io/' },
          { name: 'JWT_EXPIRATION', type: 'secret', placeholder: '7d', comment: 'Session access authorization timeout lifecycle period', docUrl: 'https://jwt.io/' },
          { name: 'PORT', type: 'secret', placeholder: '5000', comment: 'Node Express API local development listener port', docUrl: 'https://nodejs.org/' },
          { name: 'CLIENT_URL', type: 'public', placeholder: 'http://localhost:5173', comment: 'Frontend client UI domain origin used for CORS configurations', docUrl: 'https://expressjs.com/' },
          { name: 'NODE_ENV', type: 'secret', placeholder: 'development', comment: 'Express engine execution state mode (development, production)', docUrl: 'https://nodejs.org/' }
        ],
        advancedVariables: [
          { name: 'MONGO_MAX_POOL_SIZE', type: 'secret', placeholder: '50', comment: 'Maximum active persistent MongoDB database concurrent sockets pools', docUrl: 'https://www.mongodb.com/docs/' },
          { name: 'COOKIE_SECURE', type: 'secret', placeholder: 'false', comment: 'Restricts transit of session cookies to HTTPS only connections', docUrl: 'https://expressjs.com/' },
          { name: 'ALLOWED_ORIGINS', type: 'secret', placeholder: 'http://localhost:5173,http://127.0.0.1:5173', comment: 'Comma separated whitelisted origins for CORS security layer', docUrl: 'https://expressjs.com/' }
        ]
      },
      {
        description: 'Express + MongoDB + React (Vite) + Node + Sessions + Redis',
        framework: 'vite',
        services: ['mongodb', 'redis'],
        variables: [
          { name: 'MONGO_URI', type: 'secret', placeholder: 'mongodb+srv://mern:secure_pwd@cluster.mongodb.net/mern_prod', comment: 'Atlas MongoDB connection URL', docUrl: 'https://mongodb.com/' },
          { name: 'SESSION_SECRET', type: 'secret', placeholder: 'mern_session_secret_mock_key_2026', comment: 'Cryptographic hash key to sign express-session cookie', docUrl: 'https://expressjs.com/' },
          { name: 'REDIS_URL', type: 'secret', placeholder: 'redis://localhost:6379', comment: 'Session storage cache connection URL', docUrl: 'https://redis.io/' },
          { name: 'PORT', type: 'secret', placeholder: '8080', comment: 'Express API execution port', docUrl: 'https://nodejs.org/' },
          { name: 'CLIENT_URL', type: 'public', placeholder: 'http://localhost:3000', comment: 'CORS whitelist frontend domain', docUrl: 'https://expressjs.com/' },
          { name: 'NODE_ENV', type: 'secret', placeholder: 'production', comment: 'Active runtime deployment stage', docUrl: 'https://nodejs.org/' }
        ],
        advancedVariables: [
          { name: 'COOKIE_SECURE', type: 'secret', placeholder: 'true', comment: 'Enforces HTTPS cookies', docUrl: 'https://expressjs.com/' },
          { name: 'SESSION_TTL', type: 'secret', placeholder: '86400', comment: 'Session lifetime duration in Redis store (24 hours)', docUrl: 'https://redis.io/' }
        ]
      },
      {
        description: 'NestJS + MongoDB + React (Next.js) + Node + Clerk Auth',
        framework: 'nextjs',
        services: ['mongodb', 'clerk'],
        variables: [
          { name: 'MONGO_URI', type: 'secret', placeholder: 'mongodb://127.0.0.1:27017/nestjs_mern', comment: 'MongoDB local mongoose connection', docUrl: 'https://mongodb.com/' },
          { name: 'PORT', type: 'secret', placeholder: '4000', comment: 'NestJS API backend microservice port', docUrl: 'https://docs.nestjs.com/' },
          { name: 'CLERK_PUBLISHABLE_KEY', type: 'public', placeholder: 'pk_live_clerk_mern_mock_key', comment: 'Clerk browser mount key', docUrl: 'https://clerk.com/' },
          { name: 'CLERK_SECRET_KEY', type: 'secret', placeholder: 'sk_live_clerk_mern_secret_mock', comment: 'Backend Clerk SDK private verification key', docUrl: 'https://clerk.com/' },
          { name: 'API_URL', type: 'public', placeholder: 'http://localhost:4000', comment: 'Backend microservice endpoint mapping URL for API queries', docUrl: 'https://docs.nestjs.com/' }
        ],
        advancedVariables: [
          { name: 'SENTRY_DSN', type: 'secret', placeholder: 'https://sentry_mock_key@o100.ingest.sentry.io/450', comment: 'Sentry connection endpoint', docUrl: 'https://sentry.io/' }
        ]
      }
    ]
  },
  'analytics-stack': {
    name: '📊 Analytics Stack',
    defaultFramework: 'nextjs',
    rotations: [
      {
        description: 'Next.js + PostHog + Mixpanel + Sentry + GA4',
        framework: 'nextjs',
        services: [],
        variables: [
          { name: 'POSTHOG_KEY', type: 'public', placeholder: 'phc_posthog_mock_client_token_key_2026', comment: 'PostHog client UI tracking initialization token', docUrl: 'https://posthog.com/docs/getting-started/install' },
          { name: 'POSTHOG_HOST', type: 'public', placeholder: 'https://app.posthog.com', comment: 'PostHog cloud backend analytics data collector gateway', docUrl: 'https://posthog.com/docs/getting-started/install' },
          { name: 'MIXPANEL_TOKEN', type: 'public', placeholder: 'mixpanel_mock_project_token_key_123', comment: 'Mixpanel product funnel metrics project token', docUrl: 'https://docs.mixpanel.com/' },
          { name: 'SENTRY_DSN', type: 'public', placeholder: 'https://sentry_mock_key@o100.ingest.sentry.io/450', comment: 'Sentry javascript error tracking client connection parameter', docUrl: 'https://docs.sentry.io/platforms/javascript/' },
          { name: 'GA_ID', type: 'public', placeholder: 'G-GoogleAnalytics4Mock', comment: 'Google Analytics 4 global property web tag tracking code', docUrl: 'https://analytics.google.com/' }
        ],
        advancedVariables: [
          { name: 'POSTHOG_UI_HOST', type: 'public', placeholder: 'https://eu.posthog.com', comment: 'Data residency configuration region (e.g. EU cloud hosts)', docUrl: 'https://posthog.com/docs/privacy/gdpr-compliance' },
          { name: 'GA_MEASUREMENT_PROTOCOL_API_SECRET', type: 'secret', placeholder: 'ga4_protocol_secret_mock', comment: 'API credential for offline backend Google Analytics event dispatching', docUrl: 'https://developers.google.com/analytics/devguides/collection/protocol/ga4' },
          { name: 'POSTHOG_RECORDING_ENABLED', type: 'public', placeholder: 'true', comment: 'Toggles full video sessions replay recordings on dashboard', docUrl: 'https://posthog.com/' },
          { name: 'SENTRY_TRACES_SAMPLE_RATE', type: 'public', placeholder: '0.1', comment: 'Proportion of API transactions telemetry traced (10% sample rate)', docUrl: 'https://sentry.io/' }
        ]
      },
      {
        description: 'React (Vite) + Sentry + LogRocket + Fathom Analytics',
        framework: 'vite',
        services: [],
        variables: [
          { name: 'SENTRY_DSN', type: 'public', placeholder: 'https://sentry_vite_mock_key@o200.ingest.sentry.io/450', comment: 'Vite app error collection DSN', docUrl: 'https://sentry.io/' },
          { name: 'LOGROCKET_APP_ID', type: 'public', placeholder: 'logrocket/my-app', comment: 'LogRocket sessions recording project workspace key', docUrl: 'https://logrocket.com/' },
          { name: 'FATHOM_SITE_ID', type: 'public', placeholder: 'FATHOM_SITE_MOCK_ID', comment: 'Privacy-focused Fathom light analytics tracking ID', docUrl: 'https://usefathom.com/' },
          { name: 'SENTRY_AUTH_TOKEN', type: 'secret', placeholder: 'sentry_auth_mock_token_key', comment: 'Private key to upload build source-maps to Sentry server', docUrl: 'https://sentry.io/' }
        ],
        advancedVariables: [
          { name: 'SENTRY_ENVIRONMENT', type: 'public', placeholder: 'production', comment: 'Identifies active errors environment group', docUrl: 'https://sentry.io/' }
        ]
      },
      {
        description: 'SvelteKit + Amplitude + Sentry + Plausible Analytics',
        framework: 'sveltekit',
        services: [],
        variables: [
          { name: 'AMPLITUDE_API_KEY', type: 'public', placeholder: 'amplitude_mock_api_key_2026', comment: 'Amplitude metrics tracking ingestion client key', docUrl: 'https://amplitude.com/' },
          { name: 'SENTRY_DSN', type: 'public', placeholder: 'https://sentry_svelte_mock_key@o300.ingest.sentry.io/450', comment: 'SvelteKit error tracking client', docUrl: 'https://sentry.io/' },
          { name: 'PLAUSIBLE_DOMAIN', type: 'public', placeholder: 'my-svelte-app.com', comment: 'Plausible privacy dashboard domain target', docUrl: 'https://plausible.io/' },
          { name: 'PLAUSIBLE_API_KEY', type: 'secret', placeholder: 'plausible_mock_api_key_999', comment: 'Plausible stats lookup API key', docUrl: 'https://plausible.io/' }
        ],
        advancedVariables: [
          { name: 'AMPLITUDE_SERVER_ZONE', type: 'public', placeholder: 'EU', comment: 'European telemetry servers region endpoint', docUrl: 'https://amplitude.com/' }
        ]
      }
    ]
  },
  'auth-system': {
    name: '🔐 Auth System',
    defaultFramework: 'nextjs',
    rotations: [
      {
        description: 'JWT + Google OAuth + GitHub OAuth + Session Secrets',
        framework: 'nextjs',
        services: ['clerk'],
        variables: [
          { name: 'JWT_SECRET', type: 'secret', placeholder: 'jwt_auth_system_secret_mock_key_2026', comment: 'Cryptographic base salt string to sign secure JSON Web Tokens', docUrl: 'https://jwt.io/' },
          { name: 'SESSION_SECRET', type: 'secret', placeholder: 'session_auth_system_secret_mock_key_2026', comment: 'Private key string to sign secure session cookies', docUrl: 'https://expressjs.com/' },
          { name: 'GOOGLE_CLIENT_ID', type: 'public', placeholder: 'google_mock_oauth_client_id_2026.apps.googleusercontent.com', comment: 'OAuth API application unique public client ID', docUrl: 'https://console.cloud.google.com/apis/credentials' },
          { name: 'GOOGLE_CLIENT_SECRET', type: 'secret', placeholder: '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y_12345', comment: 'Private OAuth app secret key. Do NOT expose to browser.', docUrl: 'https://console.cloud.google.com/apis/credentials' },
          { name: 'GITHUB_CLIENT_ID', type: 'public', placeholder: 'github_mock_oauth_client_id_2026', comment: 'GitHub application unique public ID credentials', docUrl: 'https://github.com/settings/developers' },
          { name: 'GITHUB_CLIENT_SECRET', type: 'secret', placeholder: 'github_mock_oauth_client_secret_key_12345', comment: 'GitHub app private key secret credential', docUrl: 'https://github.com/settings/developers' }
        ],
        advancedVariables: [
          { name: 'JWT_ACCESS_EXPIRY', type: 'secret', placeholder: '15m', comment: 'Short-lived access tokens lifespan length (15 minutes)', docUrl: 'https://jwt.io/' },
          { name: 'JWT_REFRESH_EXPIRY', type: 'secret', placeholder: '7d', comment: 'Long-lived session refresh tokens lifecycle duration (7 days)', docUrl: 'https://jwt.io/' },
          { name: 'JWT_ISSUER', type: 'secret', placeholder: 'auth.my-app.com', comment: 'Claim parameter identifying the authenticating server issuer host', docUrl: 'https://jwt.io/' },
          { name: 'JWT_AUDIENCE', type: 'secret', placeholder: 'my-app.com', comment: 'Claim parameter mapping accepted recipient application scopes', docUrl: 'https://jwt.io/' },
          { name: 'COOKIE_DOMAIN', type: 'secret', placeholder: '.my-app.com', comment: 'Base parent domain mapping to enable cross-subdomain shared sessions cookies', docUrl: 'https://expressjs.com/' },
          { name: 'COOKIE_SAME_SITE', type: 'secret', placeholder: 'strict', comment: 'CSRF security cookie transmission mode (lax, strict, none)', docUrl: 'https://owasp.org/www-community/SameSite' }
        ]
      },
      {
        description: 'Auth0 Platform + JWT + Keycloak Integration + Apple Sign-In',
        framework: 'nextjs',
        services: [],
        variables: [
          { name: 'AUTH0_DOMAIN', type: 'public', placeholder: 'dev-my-auth-system.us.auth0.com', comment: 'Auth0 user portal domain url', docUrl: 'https://auth0.com/' },
          { name: 'AUTH0_CLIENT_ID', type: 'public', placeholder: 'auth0_system_mock_client_id', comment: 'Auth0 portal client identifier key', docUrl: 'https://auth0.com/' },
          { name: 'AUTH0_CLIENT_SECRET', type: 'secret', placeholder: 'auth0_system_mock_client_secret', comment: 'Auth0 private server validation credentials secret', docUrl: 'https://auth0.com/' },
          { name: 'KEYCLOAK_REALM', type: 'public', placeholder: 'my-auth-system-realm', comment: 'Keycloak access management security realm', docUrl: 'https://www.keycloak.org/' },
          { name: 'KEYCLOAK_URL', type: 'public', placeholder: 'https://keycloak.my-domain.com', comment: 'Keycloak custom host server endpoint', docUrl: 'https://www.keycloak.org/' },
          { name: 'APPLE_CLIENT_ID', type: 'public', placeholder: 'apple_mock_services_id', comment: 'Apple Sign-In Services ID public mapping key', docUrl: 'https://developer.apple.com/' },
          { name: 'APPLE_KEY_ID', type: 'secret', placeholder: 'apple_mock_private_key_id', comment: 'Private key file ID mapped inside developer account settings', docUrl: 'https://developer.apple.com/' }
        ],
        advancedVariables: [
          { name: 'AUTH0_AUDIENCE', type: 'secret', placeholder: 'https://api.my-domain.com', comment: 'Auth0 registered identifier API scope', docUrl: 'https://auth0.com/' }
        ]
      },
      {
        description: 'NextAuth.js + Clerk + JWT + PostgreSQL Shared Session Store',
        framework: 'nextjs',
        services: ['clerk', 'postgres'],
        variables: [
          { name: 'NEXTAUTH_URL', type: 'public', placeholder: 'http://localhost:3000', comment: 'NextAuth framework base landing redirect path endpoint', docUrl: 'https://next-auth.js.org/' },
          { name: 'NEXTAUTH_SECRET', type: 'secret', placeholder: 'nextauth_secure_secret_mock_key_2026', comment: 'Internal encryption key for JWT sessions', docUrl: 'https://next-auth.js.org/' },
          { name: 'CLERK_PUBLISHABLE_KEY', type: 'public', placeholder: 'pk_test_clerk_auth_system', comment: 'Clerk client initialization key', docUrl: 'https://clerk.com/' },
          { name: 'CLERK_SECRET_KEY', type: 'secret', placeholder: 'sk_test_clerk_auth_system_secret', comment: 'Clerk backend key', docUrl: 'https://clerk.com/' },
          { name: 'DATABASE_URL', type: 'secret', placeholder: 'postgresql://postgres:db_pwd@127.0.0.1:5432/nextauth_db', comment: 'NextAuth relational users storage backend PostgreSQL', docUrl: 'https://next-auth.js.org/' }
        ],
        advancedVariables: [
          { name: 'SENTRY_DSN', type: 'secret', placeholder: 'https://sentry_mock_key@o100.ingest.sentry.io/450', comment: 'Sentry connection endpoint', docUrl: 'https://sentry.io/' }
        ]
      }
    ]
  }
};

// Global helper to retrieve preset configurations based on cyclic click rotations
function getPresetConfig(presetId, clickCount = 0, includeProd = false) {
  const preset = PRESETS_DATA[presetId];
  if (!preset) return null;
  
  const rotationIndex = clickCount % preset.rotations.length;
  const activeRotation = preset.rotations[rotationIndex];
  
  // Return resolved values along with basic meta properties
  return {
    presetId: presetId,
    presetName: preset.name,
    framework: activeRotation.framework,
    services: activeRotation.services,
    rotationIndex: rotationIndex,
    totalRotations: preset.rotations.length,
    description: activeRotation.description,
    variables: activeRotation.variables,
    advancedVariables: includeProd ? activeRotation.advancedVariables : []
  };
}

// Make globally accessible in browser contexts
if (typeof window !== 'undefined') {
  window.PRESETS_DATA = PRESETS_DATA;
  window.getPresetConfig = getPresetConfig;
}

if (typeof module !== 'undefined') {
  module.exports = { PRESETS_DATA, getPresetConfig };
}
