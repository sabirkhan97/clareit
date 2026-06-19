import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import testimonials from '@/data/testimonials.json'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const go = (dir: number) => {
    setDirection(dir)
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length)
  }

  const current = testimonials[index]

  return (
    <section className="section-py bg-ink relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" />
      <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-signal-500/15 blur-[100px]" />

      <div className="container-px relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What clients say"
          title="Word from the people who shipped with us"
          align="center"
          dark
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <Quote className="mx-auto text-signal-400" size={40} strokeWidth={1.5} />

          <div className="relative mt-6 min-h-[220px] sm:min-h-[180px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 text-center"
              >
                <p className="font-display text-xl font-normal leading-relaxed text-paper text-balance md:text-2xl">
                  "{current.quote}"
                </p>
                <div className="mt-7">
                  <div className="font-semibold text-paper">{current.name}</div>
                  <div className="mt-0.5 text-sm text-ink-300">
                    {current.role}, {current.company}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper transition-colors hover:bg-paper/10"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-signal-400' : 'w-1.5 bg-paper/25'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper transition-colors hover:bg-paper/10"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
