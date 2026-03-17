import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

interface PageMetadataInput {
  title?: string
  description: string
  path: string
  image?: string
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
}: PageMetadataInput): Metadata {
  const canonicalUrl = path === '/' ? siteConfig.url : `${siteConfig.url}${path}`
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: resolvedTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          alt: title ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [image],
    },
  }
}
