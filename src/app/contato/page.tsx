import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import LeadForm from '@/components/forms/LeadForm'
import { siteConfig } from '@/config/site'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata = buildPageMetadata({
  title: 'Contato',
  description: 'Entre em contato com a Resolvver para tirar dúvidas, iniciar sua simulação e entender as possibilidades de reorganizar suas dívidas.',
  path: '/contato',
})

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sky/60 text-brand-emerald text-xs font-semibold uppercase tracking-wider">
              Fale com a Resolvver
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold mt-6 mb-4 text-balance text-brand-navy">
              Entre em contato
            </h1>
            <p className="text-lg md:text-xl text-brand-slate">
              Nossa equipe está pronta para ajudar você. Preencha o formulário ou escolha um dos canais abaixo.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-brand-sky/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-brand-navy mb-8">
                Canais de atendimento
              </h2>

              <div className="space-y-6">
                <Card className="bg-white border-brand-sky/70">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-brand-emerald/15 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-navy mb-1">Email</h3>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-brand-emerald hover:underline"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-8 pt-8 border-t border-brand-sky/60">
                <h3 className="font-semibold text-brand-navy mb-4">Redes sociais</h3>
                <div className="flex space-x-4">
                  <a
                    href={siteConfig.links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-brand-emerald/40 text-brand-emerald flex items-center justify-center hover:bg-brand-emerald hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href={siteConfig.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-brand-emerald/40 text-brand-emerald flex items-center justify-center hover:bg-brand-emerald hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-brand-navy mb-8">
                Envie uma mensagem
              </h2>
              <div className="rounded-3xl border border-brand-sky/70 bg-white p-8 shadow-soft">
                <LeadForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
