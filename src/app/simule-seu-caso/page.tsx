import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import LeadForm from '@/components/forms/LeadForm'

export const metadata: Metadata = {
  title: 'Simule seu caso',
  description: 'Descubra quanto você poderia reduzir das suas dívidas. Liquidamos suas dívidas com até 90% de desconto.',
}

export default function SimulatePage() {
  return (
    <>
      {/* Hero + Form */}
      <section className="py-16 md:py-24 bg-white">
        <Container size="small">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-mint text-brand-emerald text-xs font-semibold uppercase tracking-wider">
              Simule seu programa
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold mt-6 mb-4 text-balance text-brand-navy">
              Liquidamos suas dívidas com até 90% de desconto
            </h1>
            <p className="text-lg md:text-xl text-brand-slate">
              Descubra quanto você poderia pagar com nosso simulador.
            </p>
          </div>

          <div className="mx-auto max-w-md rounded-3xl border border-brand-sky/70 bg-white p-8 shadow-soft">
            <LeadForm />
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-brand-sky/10">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold text-brand-navy text-center mb-10">
            Por que escolher a Resolvver?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center rounded-2xl bg-white border border-brand-sky/70 p-6 shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-brand-emerald/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">
                Até 90% de desconto
              </h3>
              <p className="text-brand-slate">
                Negociamos com seus credores para conseguir as melhores condições
              </p>
            </div>

            <div className="text-center rounded-2xl bg-white border border-brand-sky/70 p-6 shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-brand-emerald/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">
                Até 6 meses de carência
              </h3>
              <p className="text-brand-slate">
                Tempo para você se organizar antes de começar a pagar
              </p>
            </div>

            <div className="text-center rounded-2xl bg-white border border-brand-sky/70 p-6 shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-brand-emerald/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">
                Acompanhamento pelo app
              </h3>
              <p className="text-brand-slate">
                Veja o status em tempo real através do aplicativo Resolvver
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
