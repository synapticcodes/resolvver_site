import { MetadataRoute } from 'next'
import { blogPostMetadata } from '@/data/blog/posts'
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const siteLastUpdated = new Date(siteConfig.lastUpdated)

  const staticPages = [
    '',
    '/sobre',
    '/faq',
    '/simule-seu-caso',
    '/blog',
    '/contato',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: siteLastUpdated,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const blogPages = blogPostMetadata.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
