import type { Metadata } from 'next'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import { aboutContent } from '@/data/about-content'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça a Resolvver, empresa especializada em bem-estar financeiro que ajuda mais de 185 mil pessoas por ano.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-mint text-brand-emerald text-xs font-semibold uppercase tracking-wider">
                {aboutContent.hero.badge}
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold mt-6 mb-4 text-balance">
                {aboutContent.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-brand-slate">
                {aboutContent.hero.subtitle}
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 rounded-3xl border border-brand-emerald/20"></div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft border border-brand-sky/70 bg-white">
                  <Image
                    src="/images/photos/4.jpg"
                    alt="Equipe Resolvver"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 420px, 90vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Story + Pillars */}
      <section className="py-16 md:py-24 bg-brand-sky/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <div className="rounded-3xl bg-[#123c35] text-white p-8 md:p-10 shadow-soft">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                {aboutContent.story.title}
              </h2>
              {aboutContent.story.body.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-brand-sky/80 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={aboutContent.story.image}
                  alt="Time Resolvver"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 520px, 90vw"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {aboutContent.pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="rounded-2xl border border-brand-sky/70 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-emerald/15 text-brand-emerald">
                    {pillar.id === 'technology' && (
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3v3m4.5-3v3M4.5 8.25h15M6 8.25v9a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 17.25v-9" />
                      </svg>
                    )}
                    {pillar.id === 'team' && (
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1m11-9a4 4 0 10-8 0 4 4 0 008 0zm6 9v-1a4 4 0 00-3-3.87" />
                      </svg>
                    )}
                    {pillar.id === 'experience' && (
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {pillar.id === 'tracking' && (
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a3 3 0 013-3h6m-6 9h6m-9 4h6a3 3 0 003-3V7a3 3 0 00-3-3H9a3 3 0 00-3 3v11a3 3 0 003 3z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-brand-slate leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Stat Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-brand-sky/70 bg-brand-mint/80 px-6 py-10 text-center shadow-sm">
            <div className="text-5xl md:text-6xl font-semibold text-brand-emerald mb-4">
              {aboutContent.stat.value}
            </div>
            <div className="text-xl text-brand-slate">
              {aboutContent.stat.label}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
