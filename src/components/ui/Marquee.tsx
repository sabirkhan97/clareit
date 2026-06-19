import { ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  reverse?: boolean
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
  pauseOnHover?: boolean
}

export default function Marquee({
  children,
  reverse = false,
  className = '',
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div className={`group relative flex overflow-hidden mask-fade-x ${className}`}>
      <div
        className={`flex shrink-0 items-center gap-10 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex shrink-0 items-center gap-10 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
      >
        {children}
      </div>
    </div>
  )
}
