'use client'

import { useEffect, useRef } from 'react'

import { Button } from '~/components/ui/button'
import DecorativeBackground from '~/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'

const imagePositions = [
  {
    id: 'decoration-1',
    desktop: { top: '15%', left: '3%', width: 180, height: 220, rotation: -8 },
    mobile: { top: '8%', left: '2%', width: 100, height: 130, rotation: -5 },
    alt: 'Wedding decoration',
  },
  {
    id: 'floral-1',
    desktop: { top: '8%', right: '5%', width: 160, height: 200, rotation: 5 },
    mobile: { top: '5%', right: '2%', width: 90, height: 120, rotation: 3 },
    alt: 'Floral arrangement',
  },
  {
    id: 'venue-1',
    desktop: {
      bottom: '18%',
      left: '2%',
      width: 200,
      height: 160,
      rotation: -6,
    },
    mobile: { bottom: '25%', left: '1%', width: 100, height: 80, rotation: -3 },
    alt: 'Wedding venue',
  },
  {
    id: 'sunset-1',
    desktop: {
      bottom: '12%',
      right: '3%',
      width: 220,
      height: 180,
      rotation: 8,
    },
    mobile: {
      bottom: '20%',
      right: '1%',
      width: 110,
      height: 90,
      rotation: 4,
    },
    alt: 'Sunset view',
  },
  {
    id: 'arch-1',
    desktop: { top: '55%', left: '8%', width: 140, height: 180, rotation: -12 },
    mobile: { top: '60%', left: '3%', width: 70, height: 90, rotation: -8 },
    alt: 'Wedding arch',
  },
  {
    id: 'garden-1',
    desktop: {
      top: '48%',
      right: '10%',
      width: 150,
      height: 190,
      rotation: 10,
    },
    mobile: { top: '55%', right: '3%', width: 75, height: 95, rotation: 6 },
    alt: 'Garden setting',
  },
]

interface HeroProps {
  onRsvpClick: () => void
}

export default function HeroSection({ onRsvpClick }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(
        [
          titleRef.current,
          dateRef.current,
          locationRef.current,
          buttonRef.current,
          scrollIndicatorRef.current,
        ],
        {
          opacity: 0,
          y: 50,
        }
      )

      gsap.set(imagesRef.current, {
        opacity: 0,
        scale: 0.8,
        rotation: () => (Math.random() - 0.5) * 20,
      })

      // Create entrance timeline
      const tl = gsap.timeline({ delay: 0.5 })

      // Animate images first with stagger
      tl.to(imagesRef.current, {
        opacity: 1,
        scale: 1,
        rotation: (i) => imagePositions[i]?.desktop.rotation || 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        stagger: {
          amount: 1.5,
          from: 'random',
        },
      })

        // Animate text content
        .to(
          dateRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.8'
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.6'
        )
        .to(
          locationRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.6'
        )

      // Animate scroll indicator bouncing
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      <DecorativeBackground variant="light" density="medium" />
      {imagePositions.map((position, index) => (
        <div key={position.id}>
          {/* Desktop Images */}
          <div
            ref={(el) => {
              if (el) imagesRef.current[index] = el
            }}
            className="absolute hidden lg:block"
            style={{
              top: position.desktop.top,
              bottom: position.desktop.bottom,
              left: position.desktop.left,
              right: position.desktop.right,
              transform: `rotate(${position.desktop.rotation}deg)`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              style={{
                width: position.desktop.width,
                height: position.desktop.height,
              }}
            >
              <div className="absolute inset-0 animate-pulse bg-muted" />
              <span className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
                {position.alt}
              </span>
            </div>
          </div>

          {/* Mobile Images */}
          <div
            className="absolute block opacity-60 lg:hidden"
            style={{
              top: position.mobile.top,
              bottom: position.mobile.bottom,
              left: position.mobile.left,
              right: position.mobile.right,
              transform: `rotate(${position.mobile.rotation}deg)`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-md shadow-md transition-transform duration-300"
              style={{
                width: position.mobile.width,
                height: position.mobile.height,
              }}
            >
              <div className="absolute inset-0 animate-pulse bg-muted" />
              <span className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
                {position.alt}
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div ref={dateRef} className="mb-8 space-y-2">
          <div
            className="flex items-center justify-center gap-4 text-lg tracking-[0.3em]"
            style={{ color: '#2B4735' }}
          >
            <span>05</span>
            <span className="text-2xl">.</span>
            <span>21</span>
            <span className="text-2xl">.</span>
            <span>2026</span>
          </div>
        </div>

        <h1
          ref={titleRef}
          className="mb-6 font-serif text-6xl tracking-wider md:text-8xl lg:text-9xl"
          style={{ color: '#2B4735' }}
        >
          NICOLE & JAMES
        </h1>

        <p
          ref={locationRef}
          className="mb-12 font-script text-5xl md:text-6xl"
          style={{ color: '#2B4735' }}
        >
          Philippines
        </p>

        <Button
          ref={buttonRef}
          size="lg"
          className="rounded-full px-12 py-3 font-medium text-white tracking-wide transition-colors hover:opacity-90"
          style={{ backgroundColor: '#2B4735' }}
          onClick={onRsvpClick}
        >
          RSVP
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute inset-x-0 bottom-16 z-20 flex flex-col items-center text-muted-foreground"
      >
        <p className="mb-2 font-light text-sm tracking-wide">
          Discover our story
        </p>
        <div className="flex flex-col items-center">
          <ChevronDown className="h-6 w-6 animate-bounce" />
          <div className="mt-1 h-8 w-px bg-current opacity-30" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
