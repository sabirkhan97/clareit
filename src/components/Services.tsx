import {
  LayoutTemplate,
  Server,
  Boxes,
  CloudCog,
  Smartphone,
  BrainCircuit,
  PenTool,
  ShieldCheck,
  ArrowUpRight,
  LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { StaggerGroup, StaggerItem } from './ui/Stagger'
import services from '@/data/services.json'

const ICONS: Record<string, LucideIcon> = {
  'layout-template': LayoutTemplate,
  server: Server,
  boxes: Boxes,
  'cloud-cog': CloudCog,
  smartphone: Smartphone,
  'brain-circuit': BrainCircuit,
  'pen-tool': PenTool,
  'shield-check': ShieldCheck,
}

export default function Services() {
  return (
    <section id="services" className="section-py bg-paper">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                One team, the whole stack —
                <br /> no handoffs lost in translation.
              </>
            }
            className="max-w-2xl"
          />
        </div>

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = ICONS[service.icon] ?? Boxes
            return (
              <StaggerItem key={service.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper p-7 shadow-soft transition-shadow duration-300 hover:shadow-lifted"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-signal-400/0 blur-2xl transition-all duration-500 group-hover:bg-signal-400/15" />

                  <div className="relative flex items-center justify-between">
                    <span className="font-mono text-xs text-ink-300">{service.index}</span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-700/[0.04] text-ink-600 transition-all duration-300 group-hover:bg-ink group-hover:text-paper">
                      <Icon size={20} strokeWidth={1.75} />
                    </div>
                  </div>

                  <h3 className="relative mt-6 font-display text-xl font-medium text-ink">
                    {service.title}
                  </h3>
                  <p className="relative mt-1.5 text-sm font-medium text-signal-600">
                    {service.short}
                  </p>
                  <p className="relative mt-3.5 flex-1 text-sm leading-relaxed text-ink-500">
                    {service.description}
                  </p>

                  <div className="relative mt-6 flex flex-wrap gap-1.5">
                    {service.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-ink/10 px-2.5 py-1 font-mono text-[11px] text-ink-400"
                      >
                        {s}
                      </span>
                    ))}
                    {service.stack.length > 3 && (
                      <span className="rounded-full border border-ink/10 px-2.5 py-1 font-mono text-[11px] text-ink-400">
                        +{service.stack.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="relative mt-6 flex items-center gap-1.5 text-sm font-semibold text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Learn more <ArrowUpRight size={14} />
                  </div>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
