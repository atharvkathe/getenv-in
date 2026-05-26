const fs = require('fs');

const data = fs.readFileSync('stack-data.js', 'utf8');
const match = data.match(/const STACK_PAGES = (\[[\s\S]*\]);/);
const parsedStacks = JSON.parse(match[1]);

let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
let newUrls = parsedStacks.map(s => `
  <url>
    <loc>https://www.getenv.in/stack/${s.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

sitemap = sitemap.replace('</urlset>', newUrls + '\n</urlset>');
fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
console.log('Sitemap updated with 20 new URLs.');
