import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { BlogCategory } from '@/types/blog'

interface CategoryFilterProps {
  selectedCategory: BlogCategory | 'todos'
}

const categories = [
  { id: 'todos', label: 'Todos os Artigos' },
  { id: 'conselhos-financeiros', label: 'Conselhos Financeiros' },
  { id: 'credito', label: 'Créditos e Dívidas' },
] as const

export default function CategoryFilter({ selectedCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mb-12">
      <span className="text-xs uppercase tracking-wider text-brand-slate">Lista de leitura</span>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={category.id === 'todos' ? '/blog' : `/blog?categoria=${category.id}`}
          className={cn(
            'px-2 py-1 text-sm font-medium transition-colors border-b-2',
            selectedCategory === category.id
              ? 'text-brand-emerald border-brand-emerald'
              : 'text-brand-slate border-transparent hover:text-brand-emerald'
          )}
        >
          {category.label}
        </Link>
      ))}
    </div>
  )
}
