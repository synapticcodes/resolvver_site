import Image from 'next/image'
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

          <div className="inline-flex items-center justify-center p-8 bg-white rounded-[32px] border border-brand-sky/80 shadow-soft">
            <div className="flex items-center gap-5">
              <div className="relative w-32 h-[84px]">
                <Image
                  src="/images/selo-procon.png"
                  alt="Selo do Procon"
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
