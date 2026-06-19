import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface CountUpProps {
  value: string
  duration?: number
}

export default function CountUp({ value, duration = 1.6 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const [display, setDisplay] = useState('0')

  // Extract numeric portion and any suffix (%, +, x, etc.)
  const match = value.match(/^([\d.]+)(.*)$/)
  const numeric = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : ''
  const prefix = match ? '' : value

  useEffect(() => {
    if (!isInView || !match) return
    let start: number | null = null
    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numeric * eased
      const formatted = Number.isInteger(numeric)
        ? Math.round(current).toString()
        : current.toFixed(1)
      setDisplay(formatted)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  if (!match) {
    return <span ref={ref}>{prefix}</span>
  }

  return (
    <motion.span ref={ref}>
      {display}
      {suffix}
    </motion.span>
  )
}
