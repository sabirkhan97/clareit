import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowDown, Sparkles } from 'lucide-react'
import Magnetic from './ui/Magnetic'
import Marquee from './ui/Marquee'
import stack from '@/data/stack.json'
import DeployConsole from './DelployConsole'

// How Clareit plugs into a team — real service models, not decoration.
const ENGAGEMENT_MODELS = ['Team augmentation', 'Dedicated pod', 'Fixed-scope build']

// Trust strip. Swap these for your real figures before shipping.
const METRICS: { value: string; label: string }[] = [
  { value: '6', label: 'Disciplines under one roof' },
  { value: '10+', label: 'Years shipping production code' },
  { value: '<2wk', label: 'From kickoff to first commit' },
]

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
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-paper pt-32"
    >
      {/* Background: dot grid + soft glow blooms, tuned for a light field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: 'radial-gradient(rgba(30,27,22,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <motion.div
        style={{ y: yMid }}
        className="pointer-events-none absolute -right-32 -top-24 h-[36rem] w-[36rem] rounded-full bg-signal-400/20 blur-[130px]"
      />
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute -left-40 top-1/2 h-[30rem] w-[30rem] rounded-full bg-ember-400/15 blur-[120px]"
      />

      <div className="container-px relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-14">
        {/* Copy + signature visual */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <motion.div style={{ opacity }} className="flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/12 bg-white/60 px-4 py-1.5 font-mono text-xs text-ink-500 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Open for Q3 engagements · Gurugram, India
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-signal-600"
            >
              Build · Ship · Scale
            </motion.span>

            <motion.div style={{ y: yText }}>
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 max-w-2xl font-display text-5xl font-medium leading-[1.04] text-ink text-balance md:text-6xl lg:text-[4.25rem]"
              >
                We build it.
                <br />
                We ship it.
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 italic text-signal-600">It earns its keep.</span>
                  <svg
                    className="absolute -bottom-1 left-0 z-0 w-full"
                    height="14"
                    viewBox="0 0 340 14"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9C68 2 272 2 338 9"
                      stroke="#E8743B"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 max-w-xl text-lg leading-relaxed text-ink-500 md:text-xl"
              >
                Clareit is a full-stack consultancy for teams who need real engineering,
                not a slide deck. Frontend, backend, .NET, cloud, and everything between —
                built by people who've shipped it before.
              </motion.p>
            </motion.div>

            {/* Engagement models */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-300">
                How we plug in
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {ENGAGEMENT_MODELS.map((model) => (
                  <span
                    key={model}
                    className="rounded-full border border-ink/12 bg-white/60 px-3.5 py-1.5 font-mono text-xs text-ink-500 backdrop-blur-sm"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-colors hover:bg-ink/85"
                >
                  Start a project
                  <ArrowUpRight size={16} />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-white/50"
                >
                  See our work
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Signature visual — live deploy console */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <DeployConsole className="w-full" />

            {/* floating stat badge, AppZime-style */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-2xl border border-ink/10 bg-paper/95 px-4 py-3 shadow-xl shadow-ink/10 backdrop-blur-xl sm:flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ember-400/15 text-ember-600">
                <Sparkles size={16} />
              </span>
              <div className="leading-tight">
                <p className="font-display text-lg font-semibold text-ink">40+</p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-400">
                  Releases shipped
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-start gap-x-10 gap-y-6 border-t border-ink/10 pt-8"
        >
          {METRICS.map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <dt className="sr-only">{m.label}</dt>
              <dd className="font-display text-3xl font-medium text-ink md:text-4xl">{m.value}</dd>
              <dd className="max-w-[11rem] font-mono text-xs leading-snug text-ink-400">{m.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Stack marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.75 }}
        className="relative z-10 mt-14 border-t border-ink/10 bg-paper/70 py-5 backdrop-blur-sm"
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
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-400 transition-colors hover:text-ink md:flex"
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