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
  { id: 'credito', label: 'Crédito' },
  { id: 'sobre-nos', label: 'Sobre nós' },
] as const

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id as BlogCategory | 'todos')}
          className={cn(
            'px-6 py-3 rounded-lg font-medium transition-all',
            selectedCategory === category.id
              ? 'bg-brand-emerald text-white shadow-md'
              : 'bg-white text-brand-slate border border-gray-300 hover:border-brand-emerald hover:text-brand-emerald'
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
