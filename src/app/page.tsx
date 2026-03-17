import { buildPageMetadata } from '@/lib/metadata'
import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import HowItWorks from '@/components/home/HowItWorks'
import AppTracking from '@/components/home/AppTracking'
import Benefits from '@/components/home/Benefits'
import Testimonials from '@/components/home/Testimonials'
import MediaSection from '@/components/home/MediaSection'
import PartnersGrid from '@/components/home/PartnersGrid'
import Accreditations from '@/components/home/Accreditations'

export const metadata = buildPageMetadata({
  description: 'Renegociação de dívidas com até 90% de desconto, suporte humano e acompanhamento pelo app para reorganizar sua vida financeira.',
  path: '/',
})

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <AppTracking />
      <Benefits />
      <Testimonials />
      <MediaSection />
      <PartnersGrid />
      <Accreditations />
    </>
  )
}
