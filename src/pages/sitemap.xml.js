export async function GET() {
  const siteUrl = 'https://kfoodhack.com';
  const recipeModules = import.meta.glob('./recipes/*.md', { eager: true });
  const recipes = Object.values(recipeModules);

  const staticPages = ['', '/about', '/privacy'];
  const recipeUrls = recipes.map((r) => r.url);
  const allUrls = [...staticPages, ...recipeUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (url) => `<url>
    <loc>${siteUrl}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('\n  ')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
