const fs = require('fs');

const slugs = [
  'nextjs-supabase-stripe',
  'nextjs-openai',
  'react-firebase',
  'django-postgresql',
  'nextjs-clerk-mongodb',
  'node-stripe-mongodb',
  'nextjs-prisma-postgresql',
  'laravel-mysql',
  'fastapi-postgresql',
  'nextjs-vercel-stripe'
];

let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

let newUrls = slugs.map(slug => `
  <url>
    <loc>https://www.getenv.in/stack/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('');

sitemap = sitemap.replace('</urlset>', newUrls + '\n</urlset>');
fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
console.log('Sitemap updated with 10 new static SSG URLs.');
