'use client'

import { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function VenueSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftImageRef = useRef<HTMLDivElement>(null)
  const rightContentRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const ringImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        leftImageRef.current,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
        }
      )
        .fromTo(
          rightContentRef.current,
          {
            opacity: 0,
            x: 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.7'
        )
        .fromTo(
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
          },
          '-=0.5'
        )
        .fromTo(
          ringImageRef.current,
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.5'
        )

      gsap.to([leftImageRef.current, ringImageRef.current], {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-background py-20 lg:py-32"
    >
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <h2 className="mb-12 text-center font-serif text-4xl text-foreground/90 lg:text-5xl">
          The Wedding
        </h2>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Main Photo & Text */}
          <div className="relative">
            <div
              ref={leftImageRef}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-center text-muted-foreground text-xl">
                  Imelda's Garden
                </span>
              </div>
            </div>

            {/* Text below image */}
            <div ref={textRef} className="mt-8 flex items-end gap-8">
              <div>
                {/* <p className="font-serif text-muted-foreground text-sm uppercase tracking-[0.2em]">
                  3:40PM
                </p> */}
                <p className="mt-2 font-serif text-3xl text-foreground/80 lg:text-4xl">
                  Emelda’s Garden in Cuenca, Batangas, Philippines
                </p>
              </div>
              {/* <div className="text-right">
                <p className="font-serif text-6xl text-foreground/40 leading-none lg:text-7xl">
                  19
                </p>
              </div> */}
            </div>
          </div>

          {/* Right Column - Map & Ring Photo */}
          <div className="relative flex flex-col gap-8 lg:mt-16">
            {/* Google Maps Embed */}
            <div
              ref={rightContentRef}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.0699999999997!2d121.1736!3d13.6536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd2b8c9e8c9e8f%3A0x8c8c8c8c8c8c8c8c!2sImelda's%20Garden%2C%20Sitio%20Sablay%2C%20Barangay%20Poblacion%208%20Hall%2C%20Cuenca%2C%20Batangas%2C%20Philippines!5e0!3m2!1sen!2sph!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
                title="Imelda's Garden Wedding Venue Location"
              />
            </div>

            {/* Ring Photo */}
            <div
              ref={ringImageRef}
              className="relative ml-auto aspect-square w-2/3 overflow-hidden rounded-lg bg-gradient-to-br from-accent/20 to-muted/20 shadow-xl lg:w-3/5"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-center text-muted-foreground text-sm">
                  Imelda's Garden
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
