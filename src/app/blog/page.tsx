'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import BlogCard from '@/components/blog/BlogCard'
import CategoryFilter from '@/components/blog/CategoryFilter'
import { blogPosts } from '@/data/blog/posts'
import type { BlogCategory } from '@/types/blog'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'todos'>('todos')

  const filteredPosts =
    selectedCategory === 'todos'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-navy to-brand-slate text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Resolvver</h1>
            <p className="text-xl text-brand-sky">
              Sua estabilidade financeira é essencial. Por isso, criamos este blog para compartilhar dicas sobre finanças pessoais e ajudá-lo a gerenciá-las melhor.
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Content */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-brand-slate text-lg">
                Nenhum artigo encontrado nesta categoria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
