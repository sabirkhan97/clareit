import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

interface StaggerProps {
  children: ReactNode
  className?: string
}

export function StaggerGroup({ children, className = '' }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }: StaggerProps) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}
