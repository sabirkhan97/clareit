import Marquee from './ui/Marquee'
import Reveal from './ui/Reveal'
import clients from '@/data/clients.json'

export default function ClientStrip() {
  return (
    <section className="border-y border-ink/10 bg-paper-dim py-12">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-ink-400 md:text-left">
            Trusted by engineering &amp; product teams at
          </p>
        </Reveal>
      </div>
      <div className="mt-7">
        <Marquee speed="slow">
          {clients.concat(clients).map((client, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center px-8 font-display text-2xl font-semibold tracking-tight text-ink-300 transition-colors hover:text-ink-600 md:text-3xl"
            >
              {client.logoText}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
