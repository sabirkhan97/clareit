import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from './ui/Reveal'
import Magnetic from './ui/Magnetic'

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 md:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-4xl bg-ink px-8 py-16 text-center md:px-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-signal-400/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full border border-ember-400/20"
          />

          <Reveal>
            <span className="eyebrow justify-center text-signal-400">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
              Let's build something real
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="relative mx-auto mt-6 max-w-3xl font-display text-display-md font-medium text-paper text-balance">
              Got a project that needs real engineering behind it?
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="relative mx-auto mt-5 max-w-lg text-base text-ink-300">
              Tell us where you're stuck or what you're building. We'll tell you
              honestly whether we're the right fit.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="relative mt-9 flex justify-center">
              <Magnetic>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-8 py-4 text-sm font-semibold text-ink transition-all hover:bg-signal-500 hover:text-paper"
                >
                  Start the conversation
                  <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
