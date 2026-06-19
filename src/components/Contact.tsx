import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowUpRight, Send, Check } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Magnetic from './ui/Magnetic'
import company from '@/data/company.json'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Static demo — wire this up to your backend / form service of choice.
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-py bg-paper-dim">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Get in touch"
          title={
            <>
              Tell us what you're
              <br /> building. We'll be honest.
            </>
          }
          description="No sales theatre — you'll talk to an engineer within one business day."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <div className="rounded-4xl border border-ink/10 bg-paper p-7 shadow-soft md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full min-h-[360px] flex-col items-center justify-center text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check size={28} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-medium text-ink">
                    Message sent.
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-ink-500">
                    Thanks, {form.name.split(' ')[0] || 'there'}. Someone from the team
                    will reply to {form.email || 'your inbox'} within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setForm({ name: '', email: '', budget: '', message: '' })
                    }}
                    className="btn-ghost mt-7"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wider text-ink-400">
                        Your name
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jordan Patel"
                        className="mt-2 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-300 focus:border-signal-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wider text-ink-400">
                        Work email
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jordan@company.com"
                        className="mt-2 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-300 focus:border-signal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-ink-400">
                      Project budget
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {['< $20k', '$20–50k', '$50–150k', '$150k+'].map((range) => (
                        <button
                          type="button"
                          key={range}
                          onClick={() => setForm({ ...form, budget: range })}
                          className={`rounded-full border px-3 py-2.5 text-xs font-medium transition-all ${
                            form.budget === range
                              ? 'border-ink bg-ink text-paper'
                              : 'border-ink/15 text-ink-500 hover:border-ink/40'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-ink-400">
                      Project details
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="What are you building, and what's the timeline?"
                      className="mt-2 w-full resize-none rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-300 focus:border-signal-500"
                    />
                  </div>

                  <Magnetic strength={0.15} className="self-start">
                    <button type="submit" className="btn-primary">
                      Send message
                      <Send size={15} />
                    </button>
                  </Magnetic>
                </form>
              )}
            </div>
          </Reveal>

          {/* Contact info + map */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex h-full flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <a
                  href={`mailto:${company.contact.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-paper p-5 shadow-soft transition-all hover:border-ink/25"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-signal-50 text-signal-600">
                    <Mail size={18} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-ink-400">Email</div>
                    <div className="truncate text-sm font-medium text-ink">
                      {company.contact.email}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={15}
                    className="ml-auto shrink-0 text-ink-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <a
                  href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
                  className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-paper p-5 shadow-soft transition-all hover:border-ink/25"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-signal-50 text-signal-600">
                    <Phone size={18} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-ink-400">Phone</div>
                    <div className="truncate text-sm font-medium text-ink">
                      {company.contact.phone}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={15}
                    className="ml-auto shrink-0 text-ink-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>

              {/* Map */}
              <a
                href={company.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block flex-1 overflow-hidden rounded-2xl border border-ink/10 shadow-soft"
              >
                <iframe
                  title="Clareit office location — Arjun Nagar, Sector 8, Gurugram"
                  src={company.contact.embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[220px] w-full grayscale-[15%] transition-all duration-500 group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-t from-ink/85 to-transparent p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-ink">
                    <MapPin size={16} />
                  </span>
                  <div className="text-paper">
                    <div className="text-sm font-medium leading-snug">
                      {company.contact.address}
                    </div>
                    <div className="mt-0.5 text-xs text-paper/70">Open in Google Maps ↗</div>
                  </div>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
