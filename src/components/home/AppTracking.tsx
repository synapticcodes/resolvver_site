import Image from 'next/image'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { homeContent } from '@/data/home-content'
import { benefits } from '@/data/benefits'

export default function AppTracking() {
  const { appTracking } = homeContent

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="rounded-3xl bg-brand-navy text-white px-6 py-10 md:px-12 md:py-14 shadow-soft">
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
              <div className="rounded-3xl px-6 py-8 md:px-8 md:py-10">
                <div className="relative mx-auto max-w-sm h-[300px] sm:h-[360px] md:h-[400px] lg:h-[440px] overflow-visible">
                  <Image
                    src="/images/app-resolvver-mock.png"
                    alt="Tela do App Resolvver"
                    fill
                    priority
                    className="object-contain object-right scale-[1.6] sm:scale-[1.75] md:scale-[1.9] translate-x-4 sm:translate-x-6 md:translate-x-8 drop-shadow-[0_30px_50px_rgba(0,0,0,0.35)]"
                    sizes="(min-width: 1280px) 520px, (min-width: 1024px) 480px, 80vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
