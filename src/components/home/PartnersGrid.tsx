import Image from 'next/image'
import Container from '@/components/ui/Container'
import { homeContent } from '@/data/home-content'

export default function PartnersGrid() {
  const { partners } = homeContent

  // Generate array of 44 partner logos
  const partnerLogos = Array.from({ length: 44 }, (_, i) => ({
    id: `N${i + 1}`,
    name: `Parceiro ${i + 1}`,
    imagePath: `/images/partners/N${i + 1}.png`,
  }))

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            {partners.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {partnerLogos.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-4 bg-white border border-brand-sky/70 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <Image
                src={partner.imagePath}
                alt={partner.name}
                width={120}
                height={60}
                className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
