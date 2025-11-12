'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { Button } from '~/components/ui/button'
import DecorativeBackground from '~/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const imagePositions = [
  {
    id: 'decoration-1',
    src: '/hero/IMG_8712.jpg',
    desktop: { top: '10%', left: '1%', width: 280, height: 320, rotation: -8 },
    mobile: { top: '5%', left: '1%', width: 120, height: 140, rotation: -5 },
    alt: 'Wedding ceremony decoration',
    floatDelay: 0,
  },
  {
    id: 'floral-1',
    src: '/hero/IMG_8745.jpg',
    desktop: { top: '5%', right: '2%', width: 260, height: 300, rotation: 5 },
    mobile: { top: '3%', right: '1%', width: 110, height: 130, rotation: 3 },
    alt: 'Beautiful floral arrangement',
    floatDelay: 2,
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
      width: 130,
      height: 100,
      rotation: -3,
    },
    alt: 'Wedding venue setting',
    floatDelay: 1,
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
      width: 140,
      height: 110,
      rotation: 4,
    },
    alt: 'Romantic sunset moment',
    floatDelay: 3,
  },
  {
    id: 'arch-1',
    src: '/hero/IMG_8758.jpg',
    desktop: { top: '50%', left: '5%', width: 220, height: 280, rotation: -12 },
    mobile: { top: '55%', left: '2%', width: 110, height: 140, rotation: -8 },
    alt: 'Wedding ceremony arch',
    floatDelay: 1.5,
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
    floatDelay: 2.5,
  },
  {
    id: 'celebration-top-1',
    src: '/hero/IMG_8770.jpg',
    desktop: { top: '2%', left: '25%', width: 200, height: 240, rotation: -3 },
    mobile: { top: '1%', left: '20%', width: 100, height: 120, rotation: -2 },
    alt: 'Wedding celebration moment',
    floatDelay: 0.5,
  },
  {
    id: 'flowers-top-1',
    src: '/hero/IMG_8771.jpg',
    desktop: { top: '1%', right: '30%', width: 180, height: 220, rotation: 4 },
    mobile: { top: '0.5%', right: '25%', width: 90, height: 110, rotation: 2 },
    alt: 'Wedding flowers arrangement',
    floatDelay: 3.5,
  },
  {
    id: 'details-bottom-1',
    src: '/hero/IMG_8772.jpg',
    desktop: {
      bottom: '2%',
      left: '30%',
      width: 220,
      height: 180,
      rotation: 2,
    },
    mobile: { bottom: '1%', left: '25%', width: 110, height: 90, rotation: 1 },
    alt: 'Wedding details',
    floatDelay: 1.8,
  },
  {
    id: 'moments-bottom-1',
    src: '/hero/IMG_8775.jpg',
    desktop: {
      bottom: '1%',
      right: '25%',
      width: 240,
      height: 200,
      rotation: -4,
    },
    mobile: {
      bottom: '0.5%',
      right: '20%',
      width: 120,
      height: 100,
      rotation: -2,
    },
    alt: 'Special wedding moments',
    floatDelay: 2.8,
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

      // Add subtle floating animation to images
      imagesRef.current.forEach((image, index) => {
        if (!image) return
        const position = imagePositions[index]
        gsap.to(image, {
          y: '+=15',
          x: '+=10',
          rotation: `+=${position.desktop.rotation > 0 ? 2 : -2}`,
          duration: 4 + index * 0.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: position.floatDelay,
        })
      })

      // Subtle parallax on scroll
      gsap.to(imagesRef.current, {
        y: (index) => -50 - index * 10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Animate scroll indicator
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

      {/* Scattered Photos */}
      {imagePositions.map((position, index) => (
        <>
          {/* Desktop Images */}
          <div
            key={`${position.id}-desktop`}
            ref={(el) => {
              if (el) imagesRef.current[index] = el
            }}
            className="group absolute hidden overflow-hidden rounded-lg shadow-lg transition-all duration-500 before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:shadow-2xl group-hover:before:opacity-100 lg:block"
            style={{
              top: position.desktop.top,
              bottom: position.desktop.bottom,
              left: position.desktop.left,
              right: position.desktop.right,
              width: position.desktop.width,
              height: position.desktop.height,
              transform: `rotate(${position.desktop.rotation}deg)`,
            }}
          >
            <Image
              src={position.src}
              alt={position.alt}
              fill
              className="object-cover transition-all duration-500 group-hover:rotate-1 group-hover:scale-105"
              sizes="(max-width: 768px) 160px, 320px"
              priority
            />
          </div>

          {/* Mobile Images */}
          <div
            key={`${position.id}-mobile`}
            className="absolute block overflow-hidden rounded-md shadow-md lg:hidden"
            style={{
              top: position.mobile.top,
              bottom: position.mobile.bottom,
              left: position.mobile.left,
              right: position.mobile.right,
              width: position.mobile.width,
              height: position.mobile.height,
              transform: `rotate(${position.mobile.rotation}deg)`,
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
        </>
      ))}

      {/* Main Content with Soft Glow */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Soft glow backdrop */}
        <div className="-inset-20 pointer-events-none absolute bg-white/20 blur-3xl" />

        <div className="relative">
          <div ref={dateRef} className="mb-8 space-y-2">
            <p
              className="mb-2 font-light text-xs uppercase tracking-[0.3em]"
              style={{ color: '#2B4735' }}
            >
              Save the Date
            </p>
            <div
              className="flex items-center justify-center gap-3 text-lg tracking-[0.2em]"
              style={{ color: '#2B4735' }}
            >
              <span className="font-medium">THURSDAY</span>
              <span className="text-xl opacity-40">•</span>
              <span>05.21.2026</span>
            </div>
          </div>

          <h1
            ref={titleRef}
            className="mb-6 font-serif text-5xl tracking-wider sm:text-6xl md:text-8xl lg:text-9xl"
            style={{ color: '#2B4735' }}
          >
            NICOLE & JAMES
          </h1>

          <p
            ref={locationRef}
            className="mb-12 font-script text-4xl sm:text-5xl md:text-6xl"
            style={{ color: '#2B4735' }}
          >
            Philippines
          </p>

          <Button
            ref={buttonRef}
            size="lg"
            className="group rounded-full px-8 py-3 font-medium text-white tracking-wide shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:px-12"
            onClick={onRsvpClick}
          >
            <span className="relative">
              RSVP
              <span className="absolute inset-0 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50">
                RSVP
              </span>
            </span>
          </Button>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute inset-x-0 bottom-16 z-20 flex flex-col items-center"
      >
        <p
          className="mb-3 font-light text-sm uppercase tracking-[0.2em] opacity-70"
          style={{ color: '#2B4735' }}
        >
          Discover our story
        </p>
        <div className="flex flex-col items-center">
          <div className="relative">
            <ChevronDown
              className="h-5 w-5 animate-bounce"
              style={{ color: '#2B4735' }}
            />
            <ChevronDown
              className="absolute top-0 h-5 w-5 animate-bounce opacity-30"
              style={{
                color: '#2B4735',
                animationDelay: '0.1s',
              }}
            />
          </div>
          <div
            className="mt-2 h-12 w-px opacity-20"
            style={{
              background: `linear-gradient(to bottom, #2B4735, transparent)`,
            }}
          />
        </div>
      </div>

      {/* Subtle gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/50 via-background/20 to-transparent" />
    </section>
  )
}
