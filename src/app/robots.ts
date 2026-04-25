import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/preferences', '/billing', '/cloud-sync'],
    },
    sitemap: 'https://forge.studio/sitemap.xml',
  };
}
