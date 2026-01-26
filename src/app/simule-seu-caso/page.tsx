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
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-navy to-brand-slate text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Liquidamos suas dívidas com até 90% de desconto
            </h1>
            <p className="text-xl text-brand-sky">
              Conquiste sua liberdade financeira sem pesar no bolso
            </p>
          </div>
        </Container>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container size="small">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">
                Simule seu programa
              </h2>
              <p className="text-brand-slate">
                Descubra quanto você poderia reduzir das suas dívidas com nosso simulador. Preencha o formulário abaixo e nossa equipe entrará em contato.
              </p>
            </div>

            <LeadForm />
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-brand-sky/20">
        <Container>
          <h2 className="text-3xl font-bold text-brand-navy text-center mb-12">
            Por que escolher a Resolvver?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-emerald/10 flex items-center justify-center">
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

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-emerald/10 flex items-center justify-center">
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

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-emerald/10 flex items-center justify-center">
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
