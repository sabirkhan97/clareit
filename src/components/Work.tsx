import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import projects from '@/data/projects.json'

export default function Work() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="work" className="section-py bg-paper-dim">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Real systems, shipped to
                <br /> real production.
              </>
            }
            className="max-w-2xl"
          />
        </div>

        <div className="mt-16 divide-y divide-ink/10 border-y border-ink/10">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.04}>
              <motion.a
                href="#contact"
                onMouseEnter={() => setActive(project.id)}
                onMouseLeave={() => setActive(null)}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group relative grid grid-cols-1 items-center gap-4 py-8 md:grid-cols-12 md:gap-6 md:py-10"
              >
                <div className="flex items-baseline gap-4 md:col-span-1">
                  <span className="font-mono text-sm text-ink-300">{project.year}</span>
                </div>

                <div className="md:col-span-6">
                  <p className="font-mono text-xs uppercase tracking-wider text-signal-600">
                    {project.client} · {project.category}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-medium text-ink transition-colors duration-300 group-hover:text-signal-600 md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-500 md:hidden">
                    {project.summary}
                  </p>
                </div>

                <div className="hidden md:col-span-3 md:block">
                  <p className="text-sm leading-relaxed text-ink-500">{project.summary}</p>
                </div>

                <div className="flex items-center justify-between md:col-span-2 md:justify-end md:gap-6">
                  <div className="text-right">
                    <div className="font-display text-2xl font-semibold text-ink">
                      {project.metric.value}
                    </div>
                    <div className="max-w-[10rem] text-xs text-ink-400">
                      {project.metric.label}
                    </div>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition-all duration-300 group-hover:-rotate-0 group-hover:bg-ink group-hover:text-paper">
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>

                <AnimatePresence>
                  {active === project.id && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originX: 0 }}
                      className="absolute bottom-0 left-0 h-px w-full bg-signal-500"
                    />
                  )}
                </AnimatePresence>
              </motion.a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-2">
            {Array.from(new Set(projects.flatMap((p) => p.tags))).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink/10 px-3 py-1.5 font-mono text-xs text-ink-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
