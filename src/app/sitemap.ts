import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/data/blog/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://resolvver.com.br'

  // Get all blog post slugs
  const blogSlugs = getAllSlugs()

  // Static pages
  const staticPages = [
    '',
    '/sobre',
    '/faq',
    '/simule-seu-caso',
    '/blog',
    '/contato',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Blog posts
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
