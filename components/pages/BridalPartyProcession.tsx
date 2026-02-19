'use client'

import { useEffect, useRef } from 'react'

import DecorativeBackground from '@/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface PartyMember {
  name: string
  role?: string
}

const groomsmen: Array<PartyMember> = [
  { name: 'Rocky Lim', role: 'Co-Best Man' },
  { name: 'Jeffrey Miyamoto', role: 'Co-Best Man' },
  { name: 'Steven CoYu' },
  { name: 'Andrew G.' },
  { name: 'Bryan V.' },
]

const bridesmaids: Array<PartyMember> = [
  { name: 'Stephanie Lam', role: 'Maid of Honor' },
  { name: 'Jasmine CoYu' },
  { name: 'Natalyn Ngo' },
  { name: 'Rosalyn Ngo' },
  { name: 'Manabu S.' },
]

export default function BridalPartyProcession() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const ampersandRef = useRef<HTMLSpanElement>(null)
  const groomsmenRef = useRef<HTMLDivElement>(null)
  const bridesmaidsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Header fade in
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Divider line scales in vertically
      gsap.fromTo(
        dividerRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Ampersand scales up with bounce
      gsap.fromTo(
        ampersandRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: ampersandRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Groomsmen slide in from the left
      const groomsmenItems =
        groomsmenRef.current?.querySelectorAll('.procession-name')
      if (groomsmenItems) {
        gsap.fromTo(
          groomsmenItems,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: groomsmenRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Bridesmaids slide in from the right
      const bridesmaidsItems =
        bridesmaidsRef.current?.querySelectorAll('.procession-name')
      if (bridesmaidsItems) {
        gsap.fromTo(
          bridesmaidsItems,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bridesmaidsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background py-16 lg:py-24"
    >
      <DecorativeBackground variant="light" density="sparse" />

      <div className="container relative z-10 mx-auto max-w-5xl px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className="mb-4 font-medium text-muted-foreground text-xs tracking-[0.3em]">
            WEDDING PARTY
          </p>
          <h2 className="font-serif text-4xl text-foreground/90 lg:text-6xl">
            Bridal Party
          </h2>
        </div>

        {/* Split-screen aisle layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Groomsmen — right-aligned against center */}
          <div
            ref={groomsmenRef}
            className="flex-1 rounded-l-lg bg-[oklch(0.94_0.03_140/0.08)] py-6 lg:py-14"
          >
            <h3 className="mb-8 text-center font-sans text-xs font-medium tracking-[0.2em] uppercase text-foreground/50">
              Groomsmen
            </h3>
            <div className="flex flex-col items-center gap-5 lg:items-end lg:pr-12">
              {groomsmen.map((member) => (
                <div key={member.name} className="procession-name text-center lg:text-right">
                  <span className="font-serif text-2xl font-light text-foreground/85 lg:text-4xl">
                    {member.name}
                  </span>
                  {member.role && (
                    <p className="mt-1 text-xs tracking-[0.15em] uppercase text-foreground/40">
                      {member.role}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Center divider with ampersand */}
          <div className="relative flex items-center justify-center px-6 py-4 lg:px-10 lg:py-0">
            {/* Vertical line (desktop) / horizontal line (mobile) */}
            <div
              ref={dividerRef}
              className="absolute h-px w-full origin-left bg-foreground/15 lg:h-full lg:w-px lg:origin-top"
            />
            <span
              ref={ampersandRef}
              className="relative z-10 bg-background px-3 py-2 font-serif text-4xl font-light text-foreground/20 lg:text-6xl"
            >
              &amp;
            </span>
          </div>

          {/* Bridesmaids — left-aligned against center */}
          <div
            ref={bridesmaidsRef}
            className="flex-1 rounded-r-lg bg-[oklch(0.94_0.03_10/0.08)] py-10 lg:py-14"
          >
            <h3 className="mb-8 text-center font-sans text-xs font-medium tracking-[0.2em] uppercase text-foreground/50">
              Bridesmaids
            </h3>
            <div className="flex flex-col items-center gap-5 lg:items-start lg:pl-12">
              {bridesmaids.map((member) => (
                <div key={member.name} className="procession-name text-center lg:text-left">
                  <span className="font-serif text-2xl font-light text-foreground/85 lg:text-4xl">
                    {member.name}
                  </span>
                  {member.role && (
                    <p className="mt-1 text-xs tracking-[0.15em] uppercase text-foreground/40">
                      {member.role}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
