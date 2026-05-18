import type { Metadata } from 'next'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import BlogCard from '@/components/blog/BlogCard'
import CategoryFilter from '@/components/blog/CategoryFilter'
import Button from '@/components/ui/Button'
import { blogPostMetadata } from '@/data/blog/posts'
import type { BlogCategory } from '@/types/blog'
import { siteConfig } from '@/config/site'

interface BlogPageProps {
  searchParams?: Promise<{
    categoria?: string
  }>
}

const isValidCategory = (value?: string): value is BlogCategory =>
  value === 'conselhos-financeiros' || value === 'credito'

const categoryMetadataMap: Record<BlogCategory, {
  title: string
  description: string
}> = {
  'conselhos-financeiros': {
    title: 'Blog: Conselhos Financeiros',
    description: 'Conteúdos práticos da Resolvver sobre orçamento, organização financeira e decisões mais seguras para o dia a dia.',
  },
  'credito': {
    title: 'Blog: Créditos e Dívidas',
    description: 'Artigos da Resolvver sobre crédito, renegociação, score, cartão e soluções para organizar dívidas com mais clareza.',
  },
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const selectedCategory = isValidCategory(resolvedSearchParams?.categoria)
    ? resolvedSearchParams.categoria
    : undefined

  const categoryMetadata = selectedCategory
    ? categoryMetadataMap[selectedCategory]
    : {
        title: 'Blog',
        description: 'Conteúdos práticos sobre finanças pessoais, crédito e organização do orçamento para ajudar você a tomar decisões melhores.',
      }

  const canonicalUrl = selectedCategory
    ? `${siteConfig.url}/blog?categoria=${selectedCategory}`
    : `${siteConfig.url}/blog`

  return {
    title: categoryMetadata.title,
    description: categoryMetadata.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: `${categoryMetadata.title} | ${siteConfig.name}`,
      description: categoryMetadata.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: categoryMetadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryMetadata.title} | ${siteConfig.name}`,
      description: categoryMetadata.description,
      images: [siteConfig.ogImage],
    },
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams
  const selectedCategory = isValidCategory(resolvedSearchParams?.categoria)
    ? resolvedSearchParams.categoria
    : 'todos'

  const filteredPosts =
    selectedCategory === 'todos'
      ? blogPostMetadata
      : blogPostMetadata.filter((post) => post.category === selectedCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sky/60 text-brand-emerald text-xs font-semibold uppercase tracking-wider">
                Blog Resolvver
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold mt-6 mb-4 text-balance">
                Sua estabilidade financeira é o mais importante
              </h1>
              <p className="text-lg md:text-xl text-brand-slate">
                Conteúdos práticos sobre finanças pessoais, crédito e organização do orçamento para ajudar você a tomar decisões melhores.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 rounded-3xl border border-brand-emerald/20"></div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft border border-brand-sky/70 bg-white">
                  <Image
                    src="/images/photos/blog-estabilidade-financeira.webp"
                    alt="Equipe Resolvver"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 420px, 90vw"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Content */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <CategoryFilter selectedCategory={selectedCategory} />

          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-brand-slate">
                Nenhum artigo encontrado nesta categoria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-navy">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl bg-white/95 p-6 md:p-10 shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
              <div>
                <p className="text-sm text-brand-slate mb-2">Quer ajuda personalizada?</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-brand-navy mb-4">
                  Liquidamos suas dívidas com até 90% de desconto
                </h2>
                <p className="text-base text-brand-slate mb-6">
                  Simule seu caso e descubra as possibilidades para o seu momento financeiro.
                </p>
                <Button href="/simule-seu-caso" size="md">
                  Simular meu caso
                </Button>
              </div>

              <div className="relative h-56 md:h-64 rounded-2xl overflow-hidden border border-brand-sky/70">
                <Image
                  src="/images/photos/5-optimized.webp"
                  alt="Consultoria financeira"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 420px, 90vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
