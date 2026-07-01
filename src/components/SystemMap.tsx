'use client'

import { useId, useState } from 'react'

// ClareIT capability board — redesigned as a PCB trace map.
// Six capability pads route into a central "ClareIT" chip, which outputs
// a single trace to a gold edge-connector labelled "Shipped software."
// Colors are pulled straight from the site's tokens (signal / ember / ink / paper)
// so it drops into the existing brand system instead of inventing a new one.

type NodeDef = {
  id: string
  label: string
  y: number
}

const NODES: NodeDef[] = [
  { id: 'frontend', label: 'Frontend', y: 46 },
  { id: 'backend', label: 'Backend & APIs', y: 118 },
  { id: 'dotnet', label: '.NET', y: 190 },
  { id: 'cloud', label: 'Cloud & DevOps', y: 262 },
  { id: 'mobile', label: 'Mobile', y: 334 },
  { id: 'data', label: 'Data & AI', y: 406 },
]

const PAD_X = 34
const BUS_X = 132
const CHIP_X0 = 268
const CHIP_X1 = 358
const CHIP_Y0 = 96
const CHIP_Y1 = 356
const PIN_STUB = 24 // length of the pin leg sticking out of the chip
const OUT_PIN_Y = (CHIP_Y0 + CHIP_Y1) / 2
const OUT_X0 = CHIP_X1 + PIN_STUB
const OUT_X1 = 486
const FINGER_X1 = 566

// Evenly distribute the six input pins across the chip's left edge.
const PIN_YS = NODES.map((_, i) => {
  const span = CHIP_Y1 - CHIP_Y0 - 40
  const step = span / (NODES.length - 1)
  return CHIP_Y0 + 20 + step * i
})

const SIGNAL = '#4f46e5'
const SIGNAL_SOFT = '#818cf8'
const EMBER = '#e8743b'
const INK = '#1e1b16'

function tracePath(padY: number, pinY: number) {
  const pinTipX = CHIP_X0 - PIN_STUB
  return `M ${PAD_X + 7} ${padY} H ${BUS_X} V ${pinY} H ${pinTipX}`
}

export default function SystemMap({ className = '' }: { className?: string }) {
  const uid = useId()
  const [active, setActive] = useState<string | null>(null)

  return (
    <svg
      viewBox="0 0 620 500"
      className={`h-full w-full overflow-visible ${className}`}
      role="img"
      aria-label="Diagram of Clareit's engineering capabilities — frontend, backend, .NET, cloud, mobile, and data — routing into a central practice that ships production software"
    >
      <defs>
        <filter id={`${uid}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id={`${uid}-finger`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={EMBER} stopOpacity="0.15" />
          <stop offset="100%" stopColor={EMBER} stopOpacity="0.85" />
        </linearGradient>

        <pattern id={`${uid}-dots`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.2" className="fill-ink-300" opacity="0.35" />
        </pattern>
      </defs>

      {/* Board substrate */}
      <rect
        x="6"
        y="6"
        width="608"
        height="488"
        rx="18"
        className="fill-ink/[0.02] stroke-ink/10"
        strokeWidth="1"
        strokeDasharray="2 5"
      />
      <rect x="6" y="6" width="608" height="488" rx="18" fill={`url(#${uid}-dots)`} />
      {[
        [22, 22],
        [598, 22],
        [22, 478],
        [598, 478],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" className="fill-none stroke-ink/15" strokeWidth="1.5" />
      ))}

      {/* Traces */}
      {NODES.map((n, i) => {
        const isActive = active === n.id
        const d = tracePath(n.y, PIN_YS[i])
        return (
          <g key={n.id}>
            <path d={d} fill="none" className="stroke-ink/15" strokeWidth="1.5" />
            <path
              d={d}
              fill="none"
              stroke={isActive ? EMBER : SIGNAL}
              strokeWidth={isActive ? 2.5 : 1.75}
              strokeLinecap="round"
              strokeDasharray="7 11"
              opacity={isActive ? 1 : 0.55}
              filter={isActive ? `url(#${uid}-glow)` : undefined}
              style={{ transition: 'stroke 0.2s ease, stroke-width 0.2s ease, opacity 0.2s ease' }}
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-72" dur="2.4s" repeatCount="indefinite" />
            </path>
            {/* pin leg into the chip */}
            <line
              x1={CHIP_X0 - PIN_STUB}
              y1={PIN_YS[i]}
              x2={CHIP_X0}
              y2={PIN_YS[i]}
              className="stroke-ink/40"
              strokeWidth="2"
            />
            {/* travelling data packet */}
            <rect width="5" height="5" x="-2.5" y="-2.5" rx="1.2" fill={isActive ? EMBER : SIGNAL_SOFT}>
              <animateMotion dur={`${2.4 + i * 0.25}s`} repeatCount="indefinite" path={d} />
            </rect>
          </g>
        )
      })}

      {/* Output trace + gold edge connector */}
      <line x1={CHIP_X1} y1={OUT_PIN_Y} x2={OUT_X0} y2={OUT_PIN_Y} className="stroke-ink/40" strokeWidth="2" />
      <path
        d={`M ${OUT_X0} ${OUT_PIN_Y} H ${OUT_X1}`}
        fill="none"
        stroke={EMBER}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="7 11"
        filter={`url(#${uid}-glow)`}
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-72" dur="1.6s" repeatCount="indefinite" />
      </path>
      <rect width="5" height="5" x="-2.5" y="-2.5" rx="1.2" fill={EMBER}>
        <animateMotion dur="1.6s" repeatCount="indefinite" path={`M ${OUT_X0} ${OUT_PIN_Y} H ${OUT_X1}`} />
      </rect>
      <rect
        x={OUT_X1}
        y={OUT_PIN_Y - 22}
        width={FINGER_X1 - OUT_X1}
        height="44"
        rx="4"
        fill={`url(#${uid}-finger)`}
        className="stroke-ember-600/40"
        strokeWidth="1"
      />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={OUT_X1 + 10 + i * 16}
          y1={OUT_PIN_Y - 22}
          x2={OUT_X1 + 10 + i * 16}
          y2={OUT_PIN_Y + 22}
          className="stroke-paper/50"
          strokeWidth="1"
        />
      ))}
      <text
        x={OUT_X1 + (FINGER_X1 - OUT_X1) / 2}
        y={OUT_PIN_Y - 32}
        textAnchor="middle"
        className="fill-ember-600 font-mono"
        fontSize="12"
        fontWeight="600"
        letterSpacing="0.02em"
      >
        Shipped software
      </text>

      {/* Input pads + labels */}
      {NODES.map((n) => {
        const isActive = active === n.id
        return (
          <g
            key={n.id}
            onMouseEnter={() => setActive(n.id)}
            onMouseLeave={() => setActive((cur) => (cur === n.id ? null : cur))}
            style={{ cursor: 'pointer' }}
          >
            {/* generous invisible hit target so the trace is easy to hover */}
            <rect x={0} y={n.y - 16} width={280} height={32} fill="transparent" />

            <rect
              x={PAD_X - 6}
              y={n.y - 6}
              width="12"
              height="12"
              rx="2.5"
              className="fill-paper stroke-ink/70"
              strokeWidth={isActive ? 2 : 1.5}
              style={{ transition: 'stroke-width 0.2s ease' }}
            />
            <circle cx={PAD_X} cy={n.y} r="2.5" fill={isActive ? EMBER : SIGNAL}>
              <animate attributeName="opacity" values="0.35;1;0.35" dur="2.6s" repeatCount="indefinite" />
            </circle>

            <rect
              x={PAD_X + 16}
              y={n.y - 11}
              width={n.label.length * 6.6 + 12}
              height="22"
              rx="4"
              className="fill-paper"
              opacity="0.82"
            />
            <text
              x={PAD_X + 22}
              y={n.y + 4}
              className={isActive ? 'fill-ink font-mono' : 'fill-ink-500 font-mono'}
              fontSize="12.5"
              fontWeight={isActive ? 600 : 500}
              style={{ transition: 'fill 0.2s ease' }}
            >
              {n.label}
            </text>
          </g>
        )
      })}

      {/* Core chip */}
      <g>
        <rect
          x={CHIP_X0}
          y={CHIP_Y0}
          width={CHIP_X1 - CHIP_X0}
          height={CHIP_Y1 - CHIP_Y0}
          rx="10"
          className="fill-ink stroke-signal-400/50"
          strokeWidth="1.5"
          filter={`url(#${uid}-glow)`}
        />
        {/* pin-1 notch */}
        <circle cx={(CHIP_X0 + CHIP_X1) / 2} cy={CHIP_Y0 + 14} r="4" className="fill-paper" opacity="0.85" />
        <text
          x={(CHIP_X0 + CHIP_X1) / 2}
          y={(CHIP_Y0 + CHIP_Y1) / 2 - 2}
          textAnchor="middle"
          className="fill-paper font-display"
          fontSize="19"
          fontWeight="600"
          letterSpacing="0.01em"
        >
          Clareit
        </text>
        <text
          x={(CHIP_X0 + CHIP_X1) / 2}
          y={(CHIP_Y0 + CHIP_Y1) / 2 + 20}
          textAnchor="middle"
          className="fill-signal-400 font-mono"
          fontSize="10"
          letterSpacing="0.18em"
        >
          CORE PRACTICE
        </text>
      </g>
    </svg>
  )
}