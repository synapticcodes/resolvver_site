import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { aboutContent } from '@/data/about-content'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça a Resolvver, empresa especializada em bem-estar financeiro que ajuda mais de 185 mil pessoas por ano.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-navy to-brand-slate text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {aboutContent.hero.title}
            </h1>
            <p className="text-xl text-brand-sky">
              {aboutContent.hero.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <Container size="small">
          <div className="prose prose-lg max-w-none">
            {aboutContent.mainText.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-brand-slate leading-relaxed mb-6">
                {paragraph.split('**').map((text, i) =>
                  i % 2 === 0 ? (
                    text
                  ) : (
                    <strong key={i} className="font-bold text-brand-navy">
                      {text}
                    </strong>
                  )
                )}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-brand-sky/20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutContent.features.map((feature) => (
              <Card key={feature.id} hover>
                <h3 className="text-2xl font-bold text-brand-navy mb-3">
                  {feature.title}
                </h3>
                <p className="text-brand-slate leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Stat Section */}
      <section className="py-16 md:py-24 bg-brand-emerald text-white">
        <Container>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold mb-4">
              {aboutContent.stat.value}
            </div>
            <div className="text-xl text-white/90">
              {aboutContent.stat.label}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
