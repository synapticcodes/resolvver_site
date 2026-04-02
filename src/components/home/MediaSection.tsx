import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { homeContent } from '@/data/home-content'

export default function MediaSection() {
  const { media } = homeContent

  return (
    <section className="py-16 md:py-24 bg-brand-sky/10">
      <Container>
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sky/60 text-brand-emerald text-xs font-semibold uppercase tracking-wider">
            Transparência e confiança
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 mt-6">
            {media.title}
          </h2>
          <p className="text-xl text-brand-slate max-w-3xl mx-auto mb-8">
            {media.subtitle}
          </p>
          <div className="mx-auto grid max-w-5xl grid-cols-1 justify-items-center gap-5 md:grid-cols-3 md:gap-6">
            {media.logos.map((logo) => (
              <Link
                key={logo.name}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir matéria em ${logo.name}`}
                className="group relative isolate flex h-32 w-full max-w-[320px] items-center justify-center overflow-hidden rounded-[28px] border border-brand-sky/80 bg-white px-6 py-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/35 hover:shadow-[0_20px_45px_-24px_rgba(18,100,131,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald/40"
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(226,247,248,0.7),rgba(255,255,255,0)_40%,rgba(15,107,115,0.08))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-sky/50 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-[1.03]">
                  <div
                    className="relative h-full w-full"
                    style={{ transform: `scale(${logo.imageScale ?? 1})` }}
                  >
                    <Image
                      src={logo.imagePath}
                      alt={`Logo de ${logo.name}`}
                      fill
                      className="object-contain object-center"
                      sizes="(min-width: 768px) 280px, 100vw"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
