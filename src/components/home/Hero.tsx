import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { homeContent } from '@/data/home-content'

export default function Hero() {
  const { hero } = homeContent

  return (
    <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy to-brand-slate py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-emerald rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-sky rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {hero.headline}
          </h1>
          <p className="text-2xl md:text-3xl text-brand-sky font-light mb-8">
            {hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/simule-seu-caso" size="lg">
              {hero.primaryCta}
            </Button>
            <Button href="/simule-seu-caso" variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-brand-navy">
              {hero.secondaryCta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
