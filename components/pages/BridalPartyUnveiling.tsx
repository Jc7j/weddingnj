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

export default function BridalPartyUnveiling() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const namesRef = useRef<HTMLDivElement>(null)

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

      // Each name reveals independently via its own ScrollTrigger
      const nameItems =
        namesRef.current?.querySelectorAll('.unveil-name-inner')
      if (nameItems) {
        nameItems.forEach((item) => {
          gsap.fromTo(
            item,
            { yPercent: 100 },
            {
              yPercent: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item.parentElement,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })
      }

      // Separator lines wipe in
      const separators =
        namesRef.current?.querySelectorAll('.unveil-separator')
      if (separators) {
        separators.forEach((sep) => {
          gsap.fromTo(
            sep,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sep,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })
      }

      // Group labels fade in
      const labels =
        namesRef.current?.querySelectorAll('.unveil-label')
      if (labels) {
        labels.forEach((label) => {
          gsap.fromTo(
            label,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: label,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  function renderNameRow(member: PartyMember, index: number, isLast: boolean) {
    const number = String(index + 1).padStart(2, '0')

    return (
      <div key={member.name}>
        <div className="overflow-hidden">
          <div className="unveil-name-inner flex items-baseline gap-4 py-3 lg:py-4">
            <span className="shrink-0 text-sm text-foreground/10">
              {number}
            </span>
            <div>
              <span className="font-serif text-3xl font-light text-foreground/85 lg:text-5xl">
                {member.name}
              </span>
              {member.role && (
                <p className="mt-1 text-xs tracking-[0.15em] uppercase text-foreground/40">
                  {member.role}
                </p>
              )}
            </div>
          </div>
        </div>
        {!isLast && (
          <div className="unveil-separator h-px origin-left bg-foreground/10" />
        )}
      </div>
    )
  }

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
          <p className="mt-3 font-serif text-foreground/40 text-sm italic tracking-wide">
            The Unveiling
          </p>
        </div>

        {/* Two-column grid on desktop, single on mobile */}
        <div ref={namesRef} className="grid grid-cols-1 gap-x-16 lg:grid-cols-2">
          {/* Groomsmen */}
          <div>
            <p className="unveil-label mb-6 text-center font-sans text-xs font-medium tracking-[0.2em] uppercase text-foreground/50 lg:text-left">
              Groomsmen
            </p>
            {groomsmen.map((member, index) =>
              renderNameRow(member, index, index === groomsmen.length - 1)
            )}
          </div>

          {/* Bridesmaids */}
          <div className="mt-12 lg:mt-0">
            <p className="unveil-label mb-6 text-center font-sans text-xs font-medium tracking-[0.2em] uppercase text-foreground/50 lg:text-left">
              Bridesmaids
            </p>
            {bridesmaids.map((member, index) =>
              renderNameRow(member, index, index === bridesmaids.length - 1)
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
