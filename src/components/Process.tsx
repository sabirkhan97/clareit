import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    desc: 'We dig into your codebase, constraints, and goals before proposing anything. No generic SOWs.',
  },
  {
    n: '02',
    title: 'Architect',
    desc: 'A technical plan you can read — stack choices, timelines, and tradeoffs spelled out in plain terms.',
  },
  {
    n: '03',
    title: 'Build',
    desc: 'Weekly shippable increments. You see working software from week one, not a deck in week eight.',
  },
  {
    n: '04',
    title: 'Ship & support',
    desc: 'Deployed, monitored, and handed off with documentation your team can actually maintain.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section-py bg-paper overflow-hidden">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              Four steps. Zero
              <br /> mystery middle.
            </>
          }
          description="A predictable process, built so you always know what's happening and why."
        />

        <div className="relative mt-20">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-ink/10 md:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="absolute left-0 right-0 top-7 hidden h-px bg-signal-500 md:block"
          />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.12}>
                <div className="relative">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-ink/10 bg-paper font-mono text-sm text-ink shadow-soft">
                    {step.n}
                  </div>
                  <h3 className="mt-6 font-display text-xl font-medium text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
