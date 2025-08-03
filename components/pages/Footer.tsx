'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="w-full bg-background py-16 px-6 md:px-12 lg:px-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: 'easeOut',
        // Respect reduced motion preference
        ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches && {
          duration: 0,
          y: 0
        })
      }}
      viewport={{ once: true }}
      role="contentinfo"
      aria-label="Wedding footer with thank you message"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between flex-col sm:flex-row gap-8 sm:gap-4">
        <div className="text-center sm:text-left" aria-label="Thank you message">
          <span className="font-script text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
            Thank You,
          </span>
        </div>
        
        <div className="text-center sm:text-right" aria-label="Couple names">
          <span className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground tracking-wide">
            Nicole Coyu & James Shoung
          </span>
        </div>
      </div>
    </motion.footer>
  )
}