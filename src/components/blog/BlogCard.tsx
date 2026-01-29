import Image from 'next/image'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import type { BlogPostMetadata } from '@/types/blog'

interface BlogCardProps {
  post: BlogPostMetadata
  index?: number
}

const categoryLabels = {
  'conselhos-financeiros': 'Conselhos Financeiros',
  'credito': 'Créditos e Dívidas',
}

const categoryColors = {
  'conselhos-financeiros': 'bg-brand-sky/60 text-brand-emerald',
  'credito': 'bg-brand-sky/60 text-brand-emerald',
}

const cardImages = [
  '/images/photos/1.png.webp',
  '/images/photos/2.jpg',
  '/images/photos/3.jpg',
  '/images/photos/4.jpg',
  '/images/photos/5.jpg',
]

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const image = post.thumbnailUrl ?? cardImages[index % cardImages.length]

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card hover className="h-full flex flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-brand-sky/70 mb-4">
          <Image
            src={image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 360px, 90vw"
          />
        </div>
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category]}`}>
            {categoryLabels[post.category]}
          </span>
        </div>

        <h3 className="text-xl font-bold text-brand-navy mb-3 hover:text-brand-emerald transition-colors">
          {post.title}
        </h3>

        <p className="text-brand-slate mb-4 flex-grow line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center text-sm text-brand-slate pt-3 border-t border-gray-200">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{post.readTime} min de leitura</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
        </div>
      </Card>
    </Link>
  )
}
