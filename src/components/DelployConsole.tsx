'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'

// A miniature, believable CI/CD log — the thing engineers actually stare at.
// Loops on a timer: steps check off one by one, holds on "live," then resets.
const STEPS = [
  'Installing dependencies',
  'Running test suite · 214/214 passed',
  'Building services (.NET · Node)',
  'Provisioning cloud infrastructure',
  'Deploying to production',
]

const STEP_DELAY_MS = 850
const HOLD_DELAY_MS = 2400

export default function DeployConsole({ className = '' }: { className?: string }) {
  const [done, setDone] = useState(0)
  const isLive = done >= STEPS.length

  useEffect(() => {
    const delay = isLive ? HOLD_DELAY_MS : STEP_DELAY_MS
    const t = setTimeout(() => setDone((d) => (isLive ? 0 : d + 1)), delay)
    return () => clearTimeout(t)
  }, [done, isLive])

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-paper/10 bg-paper/[0.04] shadow-2xl shadow-black/50 backdrop-blur-xl ${className}`}
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-paper/10 bg-paper/[0.03] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-paper/40">deploy.clareit.sh</span>
      </div>

      <div className="min-h-[220px] space-y-2.5 px-5 py-6 font-mono text-[13px]">
        {STEPS.map((step, i) => {
          const complete = i < done
          const active = i === done
          if (!complete && !active) return null
          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2.5"
            >
              {complete ? (
                <Check size={14} className="shrink-0 text-emerald-400" />
              ) : (
                <Loader2 size={14} className="shrink-0 animate-spin text-signal-400" />
              )}
              <span className={complete ? 'text-red/45' : 'text-red/85'}>{step}</span>
            </motion.div>
          )
        })}

        <AnimatePresence>
          {isLive && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 flex items-center gap-2 border-t border-paper/10 pt-3 text-emerald-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live in production
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between border-t border-paper/10 bg-paper/[0.03] px-5 py-3 font-mono text-[11px] text-paper/40">
        <span>clareit / platform</span>
        <span>main @ {isLive ? 'a3f9c21' : 'building…'}</span>
      </div>
    </div>
  )
}