import Container from '@/components/ui/Container'
import { homeContent } from '@/data/home-content'
import { howItWorksSteps } from '@/data/how-it-works'

export default function HowItWorks() {
  const { howItWorks } = homeContent

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            {howItWorks.title}
          </h2>
          <p className="text-xl text-brand-slate">
            {howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step, index) => (
            <div key={step.id} className="relative rounded-2xl border border-brand-sky/70 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-emerald/15 text-brand-emerald flex items-center justify-center text-lg font-semibold">
                  {index + 1}
                </div>
                <span className="text-xs uppercase tracking-wider text-brand-slate">Passo {index + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-brand-navy mb-3">
                {step.title}
              </h3>
              <p className="text-brand-slate leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
