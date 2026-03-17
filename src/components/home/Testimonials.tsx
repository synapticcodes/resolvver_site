import Image from 'next/image'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { homeContent } from '@/data/home-content'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  const { testimonials: content } = homeContent
  const featuredTestimonials = testimonials.slice(0, 6)
  const remainingTestimonials = testimonials.slice(6)

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-brand-slate max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sky/60 text-brand-emerald text-xs font-semibold uppercase tracking-wider">
            Excelente
          </span>
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg key={index} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.376-2.454a1 1 0 00-1.176 0l-3.376 2.454c-.784.57-1.838-.197-1.539-1.118l1.287-3.97a1 1 0 00-.364-1.118L2 9.397c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.287-3.97z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-brand-slate">Depoimentos reais de clientes Resolvver</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} hover className="bg-white/95">
              <div className="mb-4">
                <svg className="w-8 h-8 text-brand-emerald/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-brand-slate mb-4 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t border-gray-200 pt-4 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-brand-sky/70 bg-brand-sky/40">
                  {testimonial.avatarUrl && (
                    <Image
                      src={testimonial.avatarUrl}
                      alt={`Foto de ${testimonial.name}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-brand-navy">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-brand-slate">
                    {testimonial.city}/{testimonial.state}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {remainingTestimonials.length > 0 && (
          <details className="group mt-8">
            <summary className="cursor-pointer list-none text-center font-semibold text-brand-emerald transition-colors hover:text-brand-navy">
              <span className="group-open:hidden">Ver mais depoimentos</span>
              <span className="hidden group-open:inline">Ocultar depoimentos</span>
            </summary>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remainingTestimonials.map((testimonial) => (
                <Card key={testimonial.id} hover className="bg-white/95">
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-brand-emerald/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-brand-slate mb-4 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="border-t border-gray-200 pt-4 flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-brand-sky/70 bg-brand-sky/40">
                      {testimonial.avatarUrl && (
                        <Image
                          src={testimonial.avatarUrl}
                          alt={`Foto de ${testimonial.name}`}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-navy">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-brand-slate">
                        {testimonial.city}/{testimonial.state}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </details>
        )}
      </Container>
    </section>
  )
}
