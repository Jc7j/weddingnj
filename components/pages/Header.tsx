'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Button } from '~/components/ui/button'

import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  { label: 'Our Story', href: '#story' },
  { label: 'Wedding Party', href: '#wedding-party' },
  { label: 'Venue', href: '#venue' },
  { label: 'Details', href: '#details' },
  { label: 'Q&A', href: '#qa' },
]

interface HeaderProps {
  onRsvpClick: () => void
}

export default function Header({ onRsvpClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (href: string) => {
    const lenis = (
      window as Window & {
        lenis?: {
          scrollTo: (
            target: string,
            options?: {
              duration?: number
              easing?: (t: number) => number
              onComplete?: () => void
            }
          ) => void
        }
      }
    ).lenis
    if (lenis) {
      lenis.scrollTo(href, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        onComplete: () => {
          // Refresh ScrollTrigger after Lenis completes the scroll
          setTimeout(() => {
            ScrollTrigger.refresh()
          }, 100)
        },
      })
    } else {
      // Fallback to native scroll if Lenis isn't available
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-serif text-2xl tracking-wider transition-colors hover:opacity-80"
            style={{ color: '#2B4735' }}
          >
            NJ
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className="font-medium text-sm transition-colors hover:text-primary"
                >
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="hidden rounded-full px-8 py-2 font-medium text-white tracking-wide transition-colors hover:opacity-90 md:inline-flex"
                style={{ backgroundColor: '#2B4735' }}
                onClick={onRsvpClick}
              >
                RSVP
              </Button>
            </motion.div>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md p-2 transition-colors hover:bg-accent md:hidden"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
          >
            <div className="container mx-auto border-t bg-background px-4 py-4">
              <motion.ul
                className="space-y-4"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                  },
                }}
              >
                {navItems.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -10 },
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => scrollToSection(item.href)}
                      className="block py-2 font-medium text-sm transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Button>
                  </motion.li>
                ))}
                <motion.li
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -10 },
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="sm"
                      className="w-full rounded-full px-8 py-2 font-medium text-white tracking-wide transition-colors hover:opacity-90"
                      style={{ backgroundColor: '#2B4735' }}
                      onClick={() => {
                        setIsMenuOpen(false)
                        onRsvpClick()
                      }}
                    >
                      RSVP
                    </Button>
                  </motion.div>
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
