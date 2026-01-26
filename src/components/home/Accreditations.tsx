import Container from '@/components/ui/Container'
import { homeContent } from '@/data/home-content'

export default function Accreditations() {
  const { accreditations } = homeContent

  return (
    <section className="py-16 md:py-24 bg-brand-sky/20">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            {accreditations.title}
          </h2>
          <p className="text-xl text-brand-slate mb-8">
            {accreditations.subtitle}
          </p>

          <div className="inline-flex items-center justify-center p-8 bg-white rounded-2xl border-2 border-brand-emerald shadow-lg">
            <div className="w-32 h-32 rounded-full bg-brand-emerald/10 flex items-center justify-center">
              <svg className="w-16 h-16 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
