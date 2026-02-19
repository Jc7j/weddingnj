'use client'

import { useEffect, useRef } from 'react'

import DecorativeBackground from '@/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface PartyMember {
  name: string
  image?: string
}

const groomsmen: Array<PartyMember> = [
  { name: 'Rocky Lim' },
  { name: 'Jeffrey M.' },
  { name: 'Steven CoYu' },
  { name: 'Andrew G.' },
  { name: 'Bryan V.' },
]

const bridesmaids: Array<PartyMember> = [
  { name: 'Stephanie Lam' },
  { name: 'Jasmine CoYu' },
  { name: 'Natalyn Ngo' },
  { name: 'Rosalyn Ngo' },
  { name: 'Manabu S.' },
]

export default function BridesAndGroomsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const groomsmenRef = useRef<HTMLDivElement>(null)
  const bridesmaidsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
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

      const groomsmenItems =
        groomsmenRef.current?.querySelectorAll('.party-item')
      if (groomsmenItems) {
        gsap.fromTo(
          groomsmenItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: groomsmenRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      const bridesmaidsItems =
        bridesmaidsRef.current?.querySelectorAll('.party-item')
      if (bridesmaidsItems) {
        gsap.fromTo(
          bridesmaidsItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
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
      id="wedding-party"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background py-12 lg:py-16"
    >
      <DecorativeBackground variant="light" density="sparse" />

      <div className="container relative z-10 mx-auto max-w-4xl px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-12 text-center">
          <p className="mb-4 font-medium text-muted-foreground text-xs tracking-[0.3em]">
            WEDDING PARTY
          </p>
          <h2 className="font-serif text-4xl text-foreground/90 lg:text-6xl">
            Bridal Party
          </h2>
        </div>

        {/* Two-column card */}
        <div className="overflow-hidden rounded-xl bg-white/30 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row">
            {/* Groomsmen */}
            <div
              ref={groomsmenRef}
              className="flex-1 border-muted/20 border-b md:border-r md:border-b-0"
            >
              <h3 className="border-muted/20 border-b px-5 py-4 text-center font-serif text-foreground/80 text-lg lg:px-6">
                Groomsmen
              </h3>
              {groomsmen.map((member, index) => {
                const isLast = index === groomsmen.length - 1
                const number = String(index + 1).padStart(2, '0')
                return (
                  <div
                    key={member.name}
                    className={`party-item group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/40 lg:px-6 ${
                      !isLast ? 'border-muted/20 border-b' : ''
                    }`}
                  >
                    <span className="shrink-0 font-serif text-lg text-muted-foreground/40 tabular-nums">
                      {number}
                    </span>
                    <span className="font-serif text-base text-foreground/90 lg:text-lg">
                      {member.name}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Bridesmaids */}
            <div ref={bridesmaidsRef} className="flex-1">
              <h3 className="border-muted/20 border-b px-5 py-4 text-center font-serif text-foreground/80 text-lg lg:px-6">
                Bridesmaids
              </h3>
              {bridesmaids.map((member, index) => {
                const isLast = index === bridesmaids.length - 1
                const number = String(index + 1).padStart(2, '0')
                return (
                  <div
                    key={member.name}
                    className={`party-item group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/40 lg:px-6 ${
                      !isLast ? 'border-muted/20 border-b' : ''
                    }`}
                  >
                    <span className="shrink-0 font-serif text-lg text-muted-foreground/40 tabular-nums">
                      {number}
                    </span>
                    <span className="font-serif text-base text-foreground/90 lg:text-lg">
                      {member.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
