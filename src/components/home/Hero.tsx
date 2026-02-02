import Image from 'next/image'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { homeContent } from '@/data/home-content'

export default function Hero() {
  const { hero } = homeContent

  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-0 w-[28rem] h-[28rem] bg-brand-emerald/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[26rem] h-[26rem] bg-brand-sky/70 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sky/60 text-brand-emerald text-xs font-semibold uppercase tracking-wider">
              UM PLANO PARA RESTAURAR SUA FINANÇAS
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mt-6 mb-4 text-balance">
              {hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-brand-slate mb-8">
              {hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/simule-seu-caso" size="lg">
                {hero.primaryCta}
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-brand-slate">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-emerald"></span>
                Plano simples, feito para você.
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-emerald"></span>
                Até 90% de desconto
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-emerald"></span>
                Acompanhamento no app
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative float-slow">
              <div className="absolute -inset-6 rounded-full border border-brand-emerald/30"></div>
              <div className="absolute -inset-12 rounded-full border border-brand-emerald/10"></div>
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full border-[14px] border-brand-emerald/80 p-2 bg-white shadow-soft overflow-hidden">
                <Image
                  src="/images/photos/1.png.webp"
                  alt="Cliente Resolvver"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 384px, 320px"
                  priority
                />
              </div>
              <div className="absolute -right-4 -bottom-6 bg-white rounded-2xl p-4 shadow-soft border border-brand-sky/70 float-medium">
                <p className="text-xs text-brand-slate">Desconto médio</p>
                <p className="text-2xl font-semibold text-brand-emerald">70%</p>
                <p className="text-xs text-brand-slate">em negociações</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
