import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import company from '@/data/company.json'

export default function About() {
  return (
    <section id="about" className="section-py bg-paper-dim">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="About Clareit"
              title="Built by engineers who got tired of bad consultancies."
            />
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500">
                Clareit started in {company.brand.founded} with a simple complaint: most
                consultancies sell slides, not software. We do the opposite — fewer
                meetings, more shipped code, and engineers who stay on your project from
                kickoff to handoff.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="relative rounded-4xl border border-ink/10 bg-paper p-8 shadow-soft md:p-12">
                <Quote className="text-signal-300" size={36} strokeWidth={1.5} />
                <p className="mt-6 font-display text-2xl font-medium leading-snug text-ink md:text-3xl text-balance">
                  "We don't take projects we can't be proud of in two years. That rule
                  has shaped every hire, every client, and every line of code we ship."
                </p>

                <div className="mt-8 flex items-center gap-4 border-t border-ink/10 pt-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-display text-lg font-medium text-paper">
                    {company.brand.founder.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="font-display text-base font-semibold text-ink">
                      {company.brand.founder.name}
                    </div>
                    <div className="text-sm text-ink-400">
                      {company.brand.founder.role}, Clareit
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {[
                { label: 'Engineers', value: '32' },
                { label: 'Avg. tenure', value: '3.4y' },
                { label: 'Time zones', value: '4' },
                { label: 'Coffee/week', value: '∞' },
              ].map((stat, i) => (
                <Reveal key={stat.label} delay={0.2 + i * 0.06}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border border-ink/10 bg-paper p-5 text-center shadow-soft"
                  >
                    <div className="font-display text-2xl font-medium text-ink">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-ink-400">{stat.label}</div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
