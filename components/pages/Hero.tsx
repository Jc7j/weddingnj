'use client'

import { useEffect, useRef } from 'react'

import { Button } from '~/components/ui/button'

import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'

const imagePositions = [
  {
    id: 'decoration-1',
    desktop: { top: '10%', left: '5%', width: 200, height: 250, rotation: -5 },
    mobile: { top: '8%', left: '2%', width: 120, height: 150, rotation: -3 },
    alt: 'Wedding decoration',
  },
  {
    id: 'floral-1',
    desktop: { top: '5%', right: '8%', width: 180, height: 220, rotation: 3 },
    mobile: { top: '5%', right: '2%', width: 100, height: 130, rotation: 2 },
    alt: 'Floral arrangement',
  },
  {
    id: 'venue-1',
    desktop: {
      bottom: '15%',
      left: '3%',
      width: 220,
      height: 180,
      rotation: -3,
    },
    mobile: { bottom: '25%', left: '1%', width: 110, height: 90, rotation: -2 },
    alt: 'Wedding venue',
  },
  {
    id: 'sunset-1',
    desktop: {
      bottom: '10%',
      right: '5%',
      width: 240,
      height: 200,
      rotation: 5,
    },
    mobile: {
      bottom: '20%',
      right: '1%',
      width: 120,
      height: 100,
      rotation: 3,
    },
    alt: 'Sunset view',
  },
  {
    id: 'arch-1',
    desktop: { top: '50%', left: '12%', width: 160, height: 200, rotation: -8 },
    mobile: { top: '60%', left: '5%', width: 80, height: 100, rotation: -5 },
    alt: 'Wedding arch',
  },
  {
    id: 'garden-1',
    desktop: { top: '45%', right: '15%', width: 170, height: 210, rotation: 7 },
    mobile: { top: '55%', right: '5%', width: 85, height: 110, rotation: 4 },
    alt: 'Garden setting',
  },
]

interface HeroProps {
  onRsvpClick: () => void
}

export default function Hero({ onRsvpClick }: HeroProps) {
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
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
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
          <div className="flex items-center justify-center gap-4 text-lg text-muted-foreground tracking-[0.3em]">
            <span>05</span>
            <span className="text-2xl">.</span>
            <span>21</span>
            <span className="text-2xl">.</span>
            <span>2026</span>
          </div>
        </div>

        <h1
          ref={titleRef}
          className="mb-6 font-serif text-6xl text-primary tracking-wider md:text-8xl lg:text-9xl"
        >
          NICOLE & JAMES
        </h1>

        <p
          ref={locationRef}
          className="mb-12 font-light text-3xl text-muted-foreground italic md:text-4xl"
          style={{ fontFamily: 'serif' }}
        >
          Philippines
        </p>

        <Button ref={buttonRef} size="lg" className="px-8" onClick={onRsvpClick}>
          RSVP
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute inset-x-0 bottom-16 z-20 flex flex-col items-center text-muted-foreground"
      >
        <p className="mb-2 font-light text-sm tracking-wide">
          Discover our love story
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
