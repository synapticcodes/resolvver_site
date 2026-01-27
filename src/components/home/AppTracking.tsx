import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { homeContent } from '@/data/home-content'
import { benefits } from '@/data/benefits'

export default function AppTracking() {
  const { appTracking } = homeContent

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="rounded-3xl bg-[#123c35] text-white px-6 py-10 md:px-12 md:py-14 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
                {appTracking.title}
              </h2>
              <p className="text-brand-sky/80 text-lg mb-8">
                {appTracking.subtitle}
              </p>

              <ul className="space-y-4 mb-8">
                {benefits.map((benefit) => (
                  <li key={benefit.id} className="flex items-start">
                    <span className="mt-1 mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-emerald/20 text-brand-emerald">
                      <svg
                        className="h-4 w-4"
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
                    </span>
                    <span className="text-brand-sky/90">{benefit.title}</span>
                  </li>
                ))}
              </ul>

              <Button href="/simule-seu-caso" size="lg">
                {appTracking.cta}
              </Button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-brand-emerald/20 to-brand-sky/10 rounded-3xl p-8">
                <div className="aspect-[10/12] max-w-sm mx-auto bg-white/5 rounded-3xl border border-white/15 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center p-8">
                    <svg className="w-16 h-16 mx-auto mb-4 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p className="text-brand-sky text-sm">App Resolvver</p>
                  </div>

                  <div className="absolute -right-8 -bottom-8 bg-white/90 text-brand-navy rounded-2xl p-4 shadow-lg float-medium">
                    <p className="text-xs text-brand-slate">Status da negociação</p>
                    <p className="text-sm font-semibold">Em andamento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
