import Container from '@/components/ui/Container'
import { stats } from '@/data/stats'

export default function Stats() {
  return (
    <section className="py-12 bg-brand-sky/30 border-y border-brand-sky">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-emerald mb-2">
                {stat.value}
              </div>
              <div className="text-brand-slate font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
