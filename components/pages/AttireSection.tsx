'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

import DecorativeBackground from '@/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const colorPalette = [
  { name: 'Black', hex: '#2E2E2E', category: 'COLOUR PALETTE' },
  { name: 'Copper', hex: '#B87333', category: 'COLOUR PALETTE' },
  { name: 'Pink', hex: '#F5C6D6', category: 'COLOUR PALETTE' },
  { name: 'Tan', hex: '#D2B48C', category: 'COLOUR PALETTE' },
  { name: 'Blush', hex: '#F5DDD5', category: 'COLOUR PALETTE' },
  { name: 'Vanilla', hex: '#F3E5D0', category: 'COLOUR PALETTE' },
  { name: 'Green', hex: '#7FA670', category: 'COLOUR PALETTE' },
  { name: 'Mint', hex: '#B8D8D1', category: 'COLOUR PALETTE' },
]

export default function AttireSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const paletteRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const colorCards = paletteRef.current?.querySelectorAll('.color-card')

      if (colorCards) {
        gsap.fromTo(
          colorCards,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: paletteRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            opacity: 0,
            x: 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
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
              trigger: textRef.current,
              start: 'top 85%',
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
      id="attire"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background py-20 lg:py-32"
    >
      <DecorativeBackground variant="light" density="sparse" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center" ref={textRef}>
          <h2 className="mb-4 font-serif text-2xl text-foreground/90 sm:mb-6 sm:text-3xl lg:text-5xl">
            Dress Code & Attire
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base lg:text-lg">
            We invite you to join us in cocktail attire. Please consider wearing
            colors from our curated palette below to create a harmonious
            celebration. The venue is outdoors, so consider bringing a light
            jacket for the evening.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div ref={paletteRef}>
            <h3 className="mb-8 text-center font-medium text-muted-foreground text-xs tracking-[0.2em] lg:text-left">
              SUGGESTED COLOUR PALETTE
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {colorPalette.map((color) => (
                <div
                  key={color.name}
                  className="color-card group cursor-pointer transition-transform duration-200 hover:scale-105"
                >
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <div
                      className="aspect-square w-full"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="bg-white p-2 text-center sm:p-3">
                      <p className="font-medium text-foreground text-xs sm:text-sm">
                        {color.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] text-muted-foreground sm:mt-1 sm:text-xs">
                        {color.hex}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="sticky top-24">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/attire.png"
                  alt="Attire color palette inspiration"
                  fill
                  className="bg-gray-50 object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="mt-4 space-y-3 text-muted-foreground text-xs sm:mt-6 sm:space-y-4 sm:text-sm">
                <div>
                  <h4 className="mb-1 font-medium text-foreground text-sm sm:mb-2 sm:text-base">
                    For Ladies:
                  </h4>
                  <p className="leading-relaxed">
                    Cocktail dresses, elegant midi or floor-length gowns in any
                    of the suggested colors. Feel free to add your personal
                    style while keeping within the color palette.
                  </p>
                </div>
                <div>
                  <h4 className="mb-1 font-medium text-foreground text-sm sm:mb-2 sm:text-base">
                    For Gentlemen:
                  </h4>
                  <p className="leading-relaxed">
                    Suit and tie in complementary colors. Navy, charcoal, or
                    lighter suits work beautifully with our palette. Consider
                    incorporating accent colors in your tie or pocket square.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
