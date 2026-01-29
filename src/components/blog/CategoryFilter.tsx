'use client'

import { cn } from '@/lib/utils'
import type { BlogCategory } from '@/types/blog'

interface CategoryFilterProps {
  selectedCategory: BlogCategory | 'todos'
  onCategoryChange: (category: BlogCategory | 'todos') => void
}

const categories = [
  { id: 'todos', label: 'Todos os Artigos' },
  { id: 'conselhos-financeiros', label: 'Conselhos Financeiros' },
  { id: 'credito', label: 'Créditos e Dívidas' },
] as const

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mb-12">
      <span className="text-xs uppercase tracking-wider text-brand-slate">Lista de leitura</span>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id as BlogCategory | 'todos')}
          className={cn(
            'px-2 py-1 text-sm font-medium transition-colors border-b-2',
            selectedCategory === category.id
              ? 'text-brand-emerald border-brand-emerald'
              : 'text-brand-slate border-transparent hover:text-brand-emerald'
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
