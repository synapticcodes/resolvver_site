import Container from '@/components/ui/Container'
import { stats } from '@/data/stats'

export default function Stats() {
  return (
    <section className="py-12 bg-white border-y border-brand-sky/60">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center rounded-2xl border border-brand-sky/70 bg-brand-sky/50 px-6 py-8 shadow-sm"
            >
              <div className="text-4xl md:text-5xl font-semibold text-brand-emerald mb-2">
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
