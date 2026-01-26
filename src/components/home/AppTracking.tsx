import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { homeContent } from '@/data/home-content'
import { benefits } from '@/data/benefits'

export default function AppTracking() {
  const { appTracking } = homeContent

  return (
    <section className="py-16 md:py-24 bg-brand-navy text-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {appTracking.title}
            </h2>
            <p className="text-brand-sky text-lg mb-8">
              {appTracking.subtitle}
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit.id} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-brand-emerald flex-shrink-0 mt-1 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-brand-sky">{benefit.title}</span>
                </li>
              ))}
            </ul>

            <Button href="/simule-seu-caso" size="lg">
              {appTracking.cta}
            </Button>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-brand-emerald/20 to-brand-sky/20 rounded-2xl p-8 backdrop-blur">
              <div className="aspect-[9/16] max-w-xs mx-auto bg-white/10 rounded-3xl border-4 border-white/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <svg className="w-16 h-16 mx-auto mb-4 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="text-brand-sky text-sm">App Resolvver</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
