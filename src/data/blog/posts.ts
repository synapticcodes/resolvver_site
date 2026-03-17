import { BlogPost, BlogCategory, BlogPostMetadata } from '@/types/blog'
import { post as post1 } from './post-1-1'
import { post as post2 } from './post-2-2'
import { post as post3 } from './post-3'
import { post as post4 } from './post-4'
import { post as post5 } from './post-5'
import { post as post6 } from './post-6'
import { post as post7 } from './post-7'
import { post as post8 } from './post-8'
import { post as post9 } from './post-9'
import { post as post10 } from './post-10'
import { post as post11 } from './post-11'
import { post as post12 } from './post-12'
import { post as post13 } from './post-13'
import { post as post14 } from './post-14'
import { post as post15 } from './post-15'
import { post as post16 } from './post-16'
import { post as post17 } from './post-17'
import { post as post18 } from './post-18'

export const blogPosts: BlogPost[] = [
  post1,
  post2,
  post3,
  post4,
  post5,
  post6,
  post7,
  post8,
  post9,
  post10,
  post11,
  post12,
  post13,
  post14,
  post15,
  post16,
  post17,
  post18,
].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

export const blogPostMetadata: BlogPostMetadata[] = blogPosts.map(({ content, legacySlugs, ...metadata }) => metadata)

const legacySlugMap = new Map(
  blogPosts.flatMap((post) =>
    (post.legacySlugs ?? []).map((legacySlug) => [legacySlug, post.slug] as const)
  )
)

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getCanonicalSlugByLegacySlug(slug: string): string | undefined {
  return legacySlugMap.get(slug)
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((post) => post.category === category)
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug)
}
