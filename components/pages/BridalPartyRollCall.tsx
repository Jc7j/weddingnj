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

// Cycling pastel palette from the wedding design system
const paletteColors = [
  'bg-[oklch(0.92_0.03_140)]', // sage
  'bg-[oklch(0.92_0.03_10)]', // dusty rose
  'bg-[oklch(0.92_0.03_300)]', // lavender
  'bg-[oklch(0.92_0.03_230)]', // soft blue
  'bg-[oklch(0.93_0.02_80)]', // cream
]

export default function BridalPartyRollCall() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const groomsmenRef = useRef<HTMLDivElement>(null)
  const bridesmaidsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Header
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

      // Groomsmen cards — staggered reveal
      const groomsmenCards =
        groomsmenRef.current?.querySelectorAll('.roll-card')
      if (groomsmenCards) {
        gsap.fromTo(
          groomsmenCards,
          { y: 30, scale: 0.97, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
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

      // Groomsmen initial circles — bouncy scale-in
      const groomsmenCircles =
        groomsmenRef.current?.querySelectorAll('.roll-circle')
      if (groomsmenCircles) {
        gsap.fromTo(
          groomsmenCircles,
          { scale: 0, rotation: -15 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.2,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: groomsmenRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Divider line wipes in
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Bridesmaids cards
      const bridesmaidsCards =
        bridesmaidsRef.current?.querySelectorAll('.roll-card')
      if (bridesmaidsCards) {
        gsap.fromTo(
          bridesmaidsCards,
          { y: 30, scale: 0.97, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
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

      // Bridesmaids initial circles
      const bridesmaidsCircles =
        bridesmaidsRef.current?.querySelectorAll('.roll-circle')
      if (bridesmaidsCircles) {
        gsap.fromTo(
          bridesmaidsCircles,
          { scale: 0, rotation: -15 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.2,
            ease: 'back.out(2)',
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

  function renderCard(member: PartyMember, index: number) {
    const isEven = index % 2 === 0
    const colorClass = paletteColors[index % paletteColors.length]
    const initial = member.name.charAt(0)

    return (
      <div
        key={member.name}
        className={`roll-card flex items-center gap-5 rounded-xl bg-white/20 px-6 py-5 backdrop-blur-sm lg:gap-6 lg:px-8 lg:py-6 ${
          isEven ? '' : 'lg:ml-24'
        }`}
      >
        <div
          className={`roll-circle flex h-12 w-12 shrink-0 items-center justify-center rounded-full lg:h-16 lg:w-16 ${colorClass}`}
        >
          <span className="font-serif text-xl text-foreground/70 lg:text-2xl">
            {initial}
          </span>
        </div>
        <div>
          <p className="font-serif text-xl font-light text-foreground/85 lg:text-2xl">
            {member.name}
          </p>
          {member.role && (
            <p className="mt-0.5 text-xs tracking-[0.15em] uppercase text-foreground/40">
              {member.role}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background py-16 lg:py-24"
    >
      <DecorativeBackground variant="light" density="sparse" />

      <div className="container relative z-10 mx-auto max-w-3xl px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className="mb-4 font-medium text-muted-foreground text-xs tracking-[0.3em]">
            WEDDING PARTY
          </p>
          <h2 className="font-serif text-4xl text-foreground/90 lg:text-6xl">
            Bridal Party
          </h2>
          <p className="mt-3 font-serif text-foreground/40 text-sm italic tracking-wide">
            Elegant Roll Call
          </p>
        </div>

        {/* Groomsmen */}
        <div ref={groomsmenRef} className="mb-6">
          <h3 className="mb-6 text-center font-sans text-xs font-medium tracking-[0.2em] uppercase text-foreground/50">
            Groomsmen
          </h3>
          <div className="flex flex-col gap-3">
            {groomsmen.map((member, index) => renderCard(member, index))}
          </div>
        </div>

        {/* Diamond divider */}
        <div
          ref={dividerRef}
          className="my-10 flex origin-center items-center gap-4"
        >
          <div className="h-px flex-1 bg-foreground/10" />
          <div className="h-2.5 w-2.5 rotate-45 border border-foreground/15 bg-background" />
          <div className="h-px flex-1 bg-foreground/10" />
        </div>

        {/* Bridesmaids */}
        <div ref={bridesmaidsRef}>
          <h3 className="mb-6 text-center font-sans text-xs font-medium tracking-[0.2em] uppercase text-foreground/50">
            Bridesmaids
          </h3>
          <div className="flex flex-col gap-3">
            {bridesmaids.map((member, index) => renderCard(member, index))}
          </div>
        </div>
      </div>
    </section>
  )
}
