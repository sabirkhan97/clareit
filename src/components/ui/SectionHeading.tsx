import { ReactNode } from 'react'
import Reveal from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  className?: string
  dark?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto' : ''} ${className}`}>
      <Reveal>
        <span
          className={`eyebrow ${align === 'center' ? 'justify-center' : 'justify-center md:justify-start'} ${
            dark ? 'text-signal-400' : ''
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-signal-400' : 'bg-signal-500'}`} />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-5 font-display text-display-md font-medium text-balance ${
            dark ? 'text-paper' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.14}>
          <p
            className={`mt-5 max-w-xl text-base md:text-lg leading-relaxed ${
              dark ? 'text-ink-300' : 'text-ink-500'
            } ${align === 'center' ? 'mx-auto' : ''}`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
