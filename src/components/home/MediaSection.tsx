import Container from '@/components/ui/Container'
import { homeContent } from '@/data/home-content'

export default function MediaSection() {
  const { media } = homeContent

  return (
    <section className="py-16 md:py-24 bg-brand-sky/20">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            {media.title}
          </h2>
          <p className="text-xl text-brand-slate max-w-3xl mx-auto">
            {media.subtitle}
          </p>
        </div>
      </Container>
    </section>
  )
}
