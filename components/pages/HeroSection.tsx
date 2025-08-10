'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { Button } from '~/components/ui/button'
import DecorativeBackground from '~/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'

const imagePositions = [
  {
    id: 'decoration-1',
    src: '/hero/IMG_8712.jpg',
    desktop: { top: '10%', left: '1%', width: 280, height: 320, rotation: -8 },
    mobile: { top: '5%', left: '1%', width: 140, height: 160, rotation: -5 },
    alt: 'Wedding ceremony decoration',
  },
  {
    id: 'floral-1',
    src: '/hero/IMG_8745.jpg',
    desktop: { top: '5%', right: '2%', width: 260, height: 300, rotation: 5 },
    mobile: { top: '3%', right: '1%', width: 130, height: 150, rotation: 3 },
    alt: 'Beautiful floral arrangement',
  },
  {
    id: 'venue-1',
    src: '/hero/IMG_8755.jpg',
    desktop: {
      bottom: '15%',
      left: '1%',
      width: 300,
      height: 240,
      rotation: -6,
    },
    mobile: {
      bottom: '20%',
      left: '1%',
      width: 150,
      height: 120,
      rotation: -3,
    },
    alt: 'Wedding venue setting',
  },
  {
    id: 'sunset-1',
    src: '/hero/IMG_8757.jpg',
    desktop: {
      bottom: '8%',
      right: '1%',
      width: 320,
      height: 260,
      rotation: 8,
    },
    mobile: {
      bottom: '15%',
      right: '1%',
      width: 160,
      height: 130,
      rotation: 4,
    },
    alt: 'Romantic sunset moment',
  },
  {
    id: 'arch-1',
    src: '/hero/IMG_8758.jpg',
    desktop: { top: '50%', left: '5%', width: 220, height: 280, rotation: -12 },
    mobile: { top: '55%', left: '2%', width: 110, height: 140, rotation: -8 },
    alt: 'Wedding ceremony arch',
  },
  {
    id: 'garden-1',
    src: '/hero/IMG_8766.jpg',
    desktop: {
      top: '42%',
      right: '6%',
      width: 240,
      height: 300,
      rotation: 10,
    },
    mobile: { top: '50%', right: '2%', width: 120, height: 150, rotation: 6 },
    alt: 'Garden wedding setting',
  },
  {
    id: 'celebration-top-1',
    src: '/hero/IMG_8770.jpg',
    desktop: { top: '2%', left: '25%', width: 200, height: 240, rotation: -3 },
    mobile: { top: '1%', left: '20%', width: 100, height: 120, rotation: -2 },
    alt: 'Wedding celebration moment',
  },
  {
    id: 'flowers-top-1',
    src: '/hero/IMG_8771.jpg',
    desktop: { top: '1%', right: '30%', width: 180, height: 220, rotation: 4 },
    mobile: { top: '0.5%', right: '25%', width: 90, height: 110, rotation: 2 },
    alt: 'Wedding flowers arrangement',
  },
  {
    id: 'details-bottom-1',
    src: '/hero/IMG_8772.jpg',
    desktop: { bottom: '2%', left: '30%', width: 220, height: 180, rotation: 2 },
    mobile: { bottom: '1%', left: '25%', width: 110, height: 90, rotation: 1 },
    alt: 'Wedding details',
  },
  {
    id: 'moments-bottom-1',
    src: '/hero/IMG_8775.jpg',
    desktop: { bottom: '1%', right: '25%', width: 240, height: 200, rotation: -4 },
    mobile: { bottom: '0.5%', right: '20%', width: 120, height: 100, rotation: -2 },
    alt: 'Special wedding moments',
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
              <Image
                src={position.src}
                alt={position.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 160px, 320px"
                priority
              />
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
              <Image
                src={position.src}
                alt={position.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 160px, 320px"
              />
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
