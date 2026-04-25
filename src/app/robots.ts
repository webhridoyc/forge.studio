import type { MetadataRoute } from 'next'

const baseUrl = 'https://base64-forge.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/preferences', '/billing'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
