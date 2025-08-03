'use client'

import { motion } from 'framer-motion'

export default function FooterSection() {
  return (
    <motion.footer
      className="w-full bg-background px-6 py-16 md:px-12 lg:px-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        // Respect reduced motion preference
        ...(typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches && {
            duration: 0,
            y: 0,
          }),
      }}
      viewport={{ once: true }}
      aria-label="Wedding footer with thank you message"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 sm:flex-row sm:gap-4">
        <div className="text-center sm:text-left">
          <span
            className="font-script text-5xl leading-tight md:text-6xl lg:text-7xl"
            style={{ color: '#2B4735' }}
          >
            Thank You,
          </span>
        </div>

        <div className="text-center sm:text-right">
          <span
            className="font-serif text-xl tracking-wide md:text-2xl lg:text-3xl"
            style={{ color: '#2B4735' }}
          >
            - Nicole Coyu & James Shoung
          </span>
        </div>
      </div>
    </motion.footer>
  )
}
