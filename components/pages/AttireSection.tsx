'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

import DecorativeBackground from '@/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const colorPalette = [
  { name: 'Coral', image: '/colors/color-1.png' },
  { name: 'Sage', image: '/colors/color-2.png' },
  { name: 'Dusty Blue', image: '/colors/color-3.png' },
  { name: 'Mauve', image: '/colors/color-4.png' },
  { name: 'Peach', image: '/colors/color-5.png' },
  { name: 'Vanilla', image: '/colors/color-6.png' },
  { name: 'Blush', image: '/colors/color-7.png' },
  { name: 'Mint', image: '/colors/color-8.png' },
  { name: 'Light Olive', image: '/colors/color-9.png' },
  { name: 'Copper', image: '/colors/color-10.png' },
  { name: 'Tan', image: '/colors/color-11.png' },
  { name: 'Pink Beige', image: '/colors/color-12.png' },
]

export default function AttireSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const mobileGridRef = useRef<HTMLDivElement>(null)
  const attireImageRef = useRef<HTMLDivElement>(null)
  const mobileImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const leftCards = leftColumnRef.current?.querySelectorAll('.color-card')
      const rightCards = rightColumnRef.current?.querySelectorAll('.color-card')

      if (leftCards) {
        gsap.fromTo(
          leftCards,
          {
            opacity: 0,
            x: -30,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: leftColumnRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (rightCards) {
        gsap.fromTo(
          rightCards,
          {
            opacity: 0,
            x: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rightColumnRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (centerRef.current) {
        gsap.fromTo(
          centerRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: centerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      const mobileCards =
        mobileGridRef.current?.querySelectorAll('.mobile-color-card')

      if (mobileCards) {
        gsap.fromTo(
          mobileCards,
          {
            opacity: 0,
            y: 20,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mobileGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (attireImageRef.current) {
        gsap.fromTo(
          attireImageRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: attireImageRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (mobileImageRef.current) {
        gsap.fromTo(
          mobileImageRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mobileImageRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const leftColors = colorPalette.slice(0, 6)
  const rightColors = colorPalette.slice(6, 12)

  return (
    <section
      id="attire"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background py-20 lg:py-32"
    >
      <DecorativeBackground variant="light" density="sparse" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Desktop Layout - 3 Column Grid */}
        <div className="hidden gap-12 lg:grid lg:grid-cols-[1fr_2fr_1fr]">
          {/* Left Column - Color Swatches */}
          <div ref={leftColumnRef} className="space-y-4">
            {leftColors.map((color) => (
              <div
                key={color.name}
                className="color-card overflow-hidden rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={color.image}
                    alt={color.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 0vw, 120px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Center Column - Attire Information (Desktop Only) */}
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="mb-8 font-serif text-6xl text-foreground/90 italic">
              Attire
            </h2>

            <div className="space-y-6 text-muted-foreground text-base">
              <div>
                <h4 className="mb-2 font-medium text-foreground text-lg">
                  Ladies:
                </h4>
                <p className="leading-relaxed">
                  Soft pastel midi to floor length dresses, florals, and light,
                  flowy fabrics perfect for an outdoor garden setting.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-medium text-foreground text-lg">
                  Gentlemen:
                </h4>
                <p className="leading-relaxed">
                  Light suits or dressy separates in pastel or neutral tones.
                  Breathable fabrics encouraged (outdoor setting).
                </p>
              </div>

              <div className="mt-8 border-foreground/10 border-t pt-6">
                <p className="leading-relaxed">
                  Please do{' '}
                  <span className="font-semibold text-foreground">NOT</span>{' '}
                  wear white. Attire examples available on our website.
                </p>
              </div>
            </div>

            {/* Desktop Attire Image */}
            <div ref={attireImageRef} className="mt-8 w-full">
              <div className="relative aspect-[2568/2263] w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/attire.png"
                  alt="Attire color palette inspiration"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 600px, 0vw"
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Color Swatches */}
          <div ref={rightColumnRef} className="space-y-4">
            {rightColors.map((color) => (
              <div
                key={color.name}
                className="color-card overflow-hidden rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={color.image}
                    alt={color.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 0vw, 120px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div ref={centerRef} className="lg:hidden">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-6 font-serif text-3xl text-foreground/90 italic sm:mb-8 sm:text-4xl">
              Attire
            </h2>

            <div className="space-y-5 text-muted-foreground text-sm sm:space-y-6 sm:text-base">
              <div>
                <h4 className="mb-1.5 font-medium text-foreground text-base sm:mb-2 sm:text-lg">
                  Ladies:
                </h4>
                <p className="leading-relaxed">
                  Soft pastel midi to floor length dresses, florals, and light,
                  flowy fabrics perfect for an outdoor garden setting.
                </p>
              </div>

              <div>
                <h4 className="mb-1.5 font-medium text-foreground text-base sm:mb-2 sm:text-lg">
                  Gentlemen:
                </h4>
                <p className="leading-relaxed">
                  Light suits or dressy separates in pastel or neutral tones.
                  Breathable fabrics encouraged (outdoor setting).
                </p>
              </div>

              <div className="mt-6 border-foreground/10 border-t pt-5 sm:mt-8 sm:pt-6">
                <p className="leading-relaxed">
                  Please do{' '}
                  <span className="font-semibold text-foreground">NOT</span>{' '}
                  wear white. Attire examples available on our website.
                </p>
              </div>
            </div>

            {/* Mobile Attire Image */}
            <div ref={mobileImageRef} className="mt-8 w-full">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg sm:aspect-[2568/2263]">
                <Image
                  src="/attire.png"
                  alt="Attire color palette inspiration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 600px"
                  priority={false}
                />
              </div>
            </div>

            {/* Mobile Color Swatches Grid */}
            <div
              ref={mobileGridRef}
              className="mt-10 grid w-full grid-cols-3 gap-4 sm:mt-12 sm:grid-cols-4 sm:gap-5 md:grid-cols-6"
            >
              {colorPalette.map((color) => (
                <div
                  key={color.name}
                  className="mobile-color-card overflow-hidden rounded-lg shadow-lg transition-transform duration-200"
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={color.image}
                      alt={color.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 28vw, (max-width: 768px) 22vw, 15vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
