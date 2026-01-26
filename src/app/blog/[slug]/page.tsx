import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { getPostBySlug, getAllSlugs } from '@/data/blog/posts'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Artigo não encontrado',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const categoryLabels = {
    'conselhos-financeiros': 'Conselhos Financeiros',
    'credito': 'Crédito',
    'sobre-nos': 'Sobre nós',
  }

  return (
    <>
      {/* Article Header */}
      <article className="py-16 bg-white">
        <Container size="small">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-brand-emerald/10 text-brand-emerald">
              {categoryLabels[post.category]}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center text-brand-slate mb-8 pb-8 border-b border-gray-200">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{post.readTime} min de leitura</span>
            <span className="mx-3">•</span>
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}</span>
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-brand-navy prose-p:text-brand-slate prose-a:text-brand-emerald prose-strong:text-brand-navy prose-li:text-brand-slate"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Container>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-brand-sky/20">
        <Container size="small">
          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">
              Pronto para resolver suas dívidas?
            </h2>
            <p className="text-brand-slate text-lg mb-8">
              Descubra como podemos ajudá-lo a alcançar a liberdade financeira.
            </p>
            <Button href="/simule-seu-caso" size="lg">
              Simular meu caso
            </Button>
          </div>
        </Container>
      </section>

      {/* Back to Blog */}
      <section className="py-8 bg-white border-t border-gray-200">
        <Container size="small">
          <Button href="/blog" variant="ghost">
            ← Voltar para o blog
          </Button>
        </Container>
      </section>
    </>
  )
}
