import type { MetadataRoute } from 'next'

const baseUrl = 'https://base64-forge.vercel.app'
const LAST_MODIFIED = new Date().toISOString()

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    '/tools/image-optimizer',
    '/tools/svg-forge',
    '/tools/json-synth',
    '/tools/code-architect',
    '/tools/prompt-architect',
    '/tools/product-forge'
  ]

  const staticPages = [
    '',
    '/cloud-sync',
    '/docs',
    '/about',
    '/performance',
    '/api-reference',
    '/usage-specs',
    '/privacy'
  ]

  const toolEntries = tools.map(tool => ({
    url: `${baseUrl}${tool}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const staticEntries = staticPages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: page === '' ? 1 : 0.7,
  }))

  return [...staticEntries, ...toolEntries]
}
