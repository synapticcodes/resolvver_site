import Link from 'next/link'
import Card from '@/components/ui/Card'
import type { BlogPostMetadata } from '@/types/blog'

interface BlogCardProps {
  post: BlogPostMetadata
}

const categoryLabels = {
  'conselhos-financeiros': 'Conselhos Financeiros',
  'credito': 'Crédito',
  'sobre-nos': 'Sobre nós',
}

const categoryColors = {
  'conselhos-financeiros': 'bg-blue-100 text-blue-800',
  'credito': 'bg-green-100 text-green-800',
  'sobre-nos': 'bg-purple-100 text-purple-800',
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card hover className="h-full flex flex-col">
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
