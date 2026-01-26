import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Accordion from '@/components/ui/Accordion'
import Button from '@/components/ui/Button'
import { faqItems } from '@/data/faq'

export const metadata: Metadata = {
  title: 'Perguntas Frequentes',
  description: 'Respostas diretas para as perguntas mais comuns de quem está colocando a vida financeira no lugar com a Resolvver.',
}

export default function FaqPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-navy to-brand-slate text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-brand-sky">
              Respostas diretas para as perguntas mais comuns de quem está colocando a vida financeira no lugar com a Resolvver.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 md:py-24 bg-white">
        <Container size="small">
          <Accordion items={faqItems} />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-sky/20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-xl text-brand-slate mb-8">
              Nossa equipe está pronta para te ajudar. Simule seu caso e descubra como podemos ajudá-lo.
            </p>
            <Button href="/simule-seu-caso" size="lg">
              Simular meu caso
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
