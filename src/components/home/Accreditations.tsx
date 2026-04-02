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

          <div className="mx-auto inline-flex w-full max-w-[620px] items-center justify-center rounded-[32px] border border-brand-sky/80 bg-white p-5 shadow-soft sm:p-8">
            <div className="flex w-full flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8 md:gap-9">
              <div className="relative w-full max-w-[180px] aspect-[224/187] sm:max-w-[210px] md:max-w-[225px]">
                <Image
                  src="/images/accreditations/procon-logo.webp"
                  alt="Logo do selo do Procon"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 210px, 225px"
                />
              </div>

              <div className="relative w-full max-w-[145px] aspect-[350/481] sm:max-w-[150px] md:max-w-[165px]">
                <Image
                  src="/images/accreditations/procon-qr.webp"
                  alt="Certificado do Procon com QR Code"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 145px, (max-width: 768px) 150px, 165px"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
