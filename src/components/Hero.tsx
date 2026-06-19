import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import Magnetic from './ui/Magnetic'
import Marquee from './ui/Marquee'
import stack from '@/data/stack.json'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const yMid = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '120%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper pt-32"
    >
      {/* Parallax background layers */}
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0 bg-grid opacity-70"
      />
      <motion.div
        style={{ y: yMid }}
        className="pointer-events-none absolute -right-40 -top-20 h-[32rem] w-[32rem] rounded-full bg-signal-400/20 blur-[120px]"
      />
      <motion.div
        style={{ y: yMid }}
        className="pointer-events-none absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-ember-400/15 blur-[110px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-noise mix-blend-multiply" />

      {/* Floating code-like chips for atmosphere */}
      <motion.div
        style={{ y: yMid }}
        className="pointer-events-none absolute right-[8%] top-[22%] hidden font-mono text-xs text-ink-300/70 lg:block animate-float"
      >
        <div className="rounded-lg border border-ink/10 bg-paper/80 px-3 py-2 shadow-soft backdrop-blur-sm">
          <span className="text-signal-600">const</span> stack = <span className="text-ember-600">.NET</span>
        </div>
      </motion.div>
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute left-[10%] top-[58%] hidden font-mono text-xs text-ink-300/70 lg:block animate-float [animation-delay:1.4s]"
      >
        <div className="rounded-lg border border-ink/10 bg-paper/80 px-3 py-2 shadow-soft backdrop-blur-sm">
          status: <span className="text-emerald-600">shipped ✓</span>
        </div>
      </motion.div>

      <div className="container-px relative z-10 mx-auto flex max-w-7xl flex-1 flex-col justify-center">
        <motion.div style={{ opacity }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-500" />
            </span>
            Full-stack software consultancy · Gurugram, India
          </motion.span>

          <motion.div style={{ y: yText }}>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-5xl font-display text-display-xl font-medium text-ink text-balance"
            >
              We engineer software
              <br />
              that <span className="relative inline-block">
                <span className="relative z-10 italic text-signal-600">earns its keep</span>
                <svg
                  className="absolute -bottom-1 left-0 z-0 w-full"
                  height="14"
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9C60 2 240 2 298 9"
                    stroke="#E8743B"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-500 md:text-xl"
            >
              Clareit is a full-stack consultancy for teams who need real engineering,
              not a slide deck. Frontend, backend, .NET, cloud, and everything between —
              built by people who've shipped it before.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a href="#contact" className="btn-primary">
                Start a project
                <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href="#work" className="btn-secondary">
                See our work
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Stack marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 border-t border-ink/10 bg-paper/70 py-5 backdrop-blur-sm"
      >
        <Marquee>
          {stack.concat(stack).map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap font-mono text-sm text-ink-400"
            >
              {tech.name}
              <span className="text-ink-300">/</span>
            </span>
          ))}
        </Marquee>
      </motion.div>

      <button
        onClick={scrollToServices}
        aria-label="Scroll to services"
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-400 md:flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </button>
    </section>
  )
}
