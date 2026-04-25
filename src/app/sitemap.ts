import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://base64-forge.vercel.app';
  const lastModified = new Date();

  const routes = [
    '',
    '/about',
    '/docs',
    '/performance',
    '/api-reference',
    '/contact',
    '/privacy',
    '/usage-specs',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
