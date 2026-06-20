'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const fadeUpVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  stagger?: boolean
  delay?: number
}

export default function ScrollReveal({ children, className, stagger, delay }: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      variants={stagger ? staggerContainer : fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUpVariant}>
      {children}
    </motion.div>
  )
}
