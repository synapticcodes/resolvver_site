import Container from '@/components/ui/Container'
import { homeContent } from '@/data/home-content'

export default function MediaSection() {
  const { media } = homeContent

  return (
    <section className="py-16 md:py-24 bg-brand-sky/10">
      <Container>
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sky/60 text-brand-emerald text-xs font-semibold uppercase tracking-wider">
            Transparência e confiança
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 mt-6">
            {media.title}
          </h2>
          <p className="text-xl text-brand-slate max-w-3xl mx-auto mb-8">
            {media.subtitle}
          </p>

        </div>
      </Container>
    </section>
  )
}
