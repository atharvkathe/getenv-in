const GENERATORS_DB = [
  {
    id: "env-generator",
    slug: "env-generator",
    name: ".env Template Generator",
    description: "Generate production-ready .env files instantly with framework prefixes and secure secrets.",
    icon: "🔐",
    status: "active",
    type: "config"
  },
  {
    id: "dockerfile-generator",
    slug: "dockerfile-generator",
    name: "Dockerfile Generator",
    description: "Build optimized multi-stage Dockerfiles for Node.js, Python, Go, and more.",
    icon: "🐳",
    status: "coming-soon",
    type: "infrastructure"
  },
  {
    id: "docker-compose-generator",
    slug: "docker-compose-generator",
    name: "Docker Compose Generator",
    description: "Scaffold complex multi-container environments with networking and volumes.",
    icon: "🏗️",
    status: "coming-soon",
    type: "infrastructure"
  },
  {
    id: "github-actions-generator",
    slug: "github-actions-generator",
    name: "GitHub Actions Generator",
    description: "Generate CI/CD workflows for testing, building, and deploying your code.",
    icon: "🐙",
    status: "coming-soon",
    type: "ci-cd"
  },
  {
    id: "nginx-generator",
    slug: "nginx-generator",
    name: "Nginx Config Generator",
    description: "Generate secure reverse proxy, load balancer, and caching configurations.",
    icon: "⚙️",
    status: "coming-soon",
    type: "config"
  },
  {
    id: "kubernetes-generator",
    slug: "kubernetes-generator",
    name: "Kubernetes YAML Generator",
    description: "Create Deployments, Services, and Ingress manifests instantly.",
    icon: "☸️",
    status: "coming-soon",
    type: "infrastructure"
  },
  {
    id: "vercel-generator",
    slug: "vercel-config-generator",
    name: "Vercel Config Generator",
    description: "Generate vercel.json for custom routing, caching, and redirects.",
    icon: "▲",
    status: "coming-soon",
    type: "hosting"
  },
  {
    id: "railway-generator",
    slug: "railway-config-generator",
    name: "Railway Config Generator",
    description: "Build railway.json templates for instant PaaS deployment.",
    icon: "🚂",
    status: "coming-soon",
    type: "hosting"
  },
  {
    id: "render-generator",
    slug: "render-yaml-generator",
    name: "Render YAML Generator",
    description: "Define infrastructure as code with render.yaml.",
    icon: "☁️",
    status: "coming-soon",
    type: "hosting"
  },
  {
    id: "cicd-generator",
    slug: "cicd-pipeline-generator",
    name: "Generic CI/CD Generator",
    description: "Build GitLab, Bitbucket, and Jenkins pipeline templates.",
    icon: "🔄",
    status: "coming-soon",
    type: "ci-cd"
  }
];
