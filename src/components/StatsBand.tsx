import Reveal from './ui/Reveal'
import CountUp from './ui/CountUp'
import company from '@/data/company.json'

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-signal-400/40 to-transparent" />

      <div className="container-px relative mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">
        {company.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="text-center md:text-left">
              <div className="font-display text-4xl font-medium text-paper md:text-5xl">
                <CountUp value={stat.value} />
              </div>
              <div className="mt-2 font-mono text-xs uppercase tracking-wider text-ink-300">
                {stat.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
