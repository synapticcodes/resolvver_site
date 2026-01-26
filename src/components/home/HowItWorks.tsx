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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step number */}
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-emerald text-white flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-brand-navy mb-3">
                {step.title}
              </h3>
              <p className="text-brand-slate leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (desktop only) */}
              {index < howItWorksSteps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-12 w-full h-0.5 bg-brand-emerald/20" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
