export type BlogCategory = 'conselhos-financeiros' | 'credito' | 'sobre-nos'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  readTime: number
  publishedAt: string
  content: string
  thumbnailUrl?: string
}

export interface BlogPostMetadata {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  readTime: number
  publishedAt: string
  thumbnailUrl?: string
}
