import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'span'
  duration?: number
}

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  duration = 0.7,
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: easeOutExpo },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
