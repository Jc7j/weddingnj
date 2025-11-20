'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

import DecorativeBackground from '@/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const venueDetails = [
  {
    icon: '📍',
    label: 'Address',
    value: "Imelda's Garden\nCuenca, Batangas\nPhilippines",
  },
]

export default function VenueSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
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
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const imageElements = imagesRef.current?.querySelectorAll('.venue-image')
      if (imageElements) {
        gsap.fromTo(
          imageElements,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imagesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      const detailCards = detailsRef.current?.querySelectorAll('.detail-card')
      if (detailCards) {
        gsap.fromTo(
          detailCards,
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: detailsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          {
            opacity: 0,
            scale: 0.95,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mapRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      gsap.to(imagesRef.current, {
        y: -20,
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
      id="venue"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background py-8 lg:py-12"
    >
      <DecorativeBackground variant="light" density="sparse" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className="mb-4 font-medium text-muted-foreground text-xs tracking-[0.3em]">
            THE VENUE
          </p>
          <h2 className="mb-4 font-serif text-3xl text-foreground/90 sm:text-4xl lg:text-6xl">
            Imelda's Garden
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Images & Details */}
          <div className="space-y-8">
            {/* Venue Images */}
            <div ref={imagesRef} className="grid grid-cols-2 gap-4">
              <div className="venue-image group relative col-span-2 aspect-[16/10] overflow-hidden rounded-xl shadow-lg after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/30 after:via-transparent after:to-transparent">
                <Image
                  src="/venue/Venue-1.png"
                  alt="Main venue view"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="venue-image group relative aspect-square overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/venue/Venue-2.png"
                  alt="Garden view"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="venue-image group relative aspect-square overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/venue/Venue-3.png"
                  alt="Ceremony area"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>

            {/* Venue Details Cards */}
            <div
              ref={detailsRef}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {venueDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="detail-card rounded-lg bg-white/50 p-4 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/70 hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">{detail.icon}</span>
                    <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      {detail.label}
                    </p>
                  </div>
                  <p className="whitespace-pre-line text-foreground text-xs leading-relaxed sm:text-sm">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Map & Additional Info */}
          <div className="space-y-8">
            {/* Interactive Map */}
            <div ref={mapRef} className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl sm:aspect-[4/3]">
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
              <a
                href="https://maps.google.com/maps?q=Imelda's+Garden+Cuenca+Batangas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground/90 px-6 py-3 font-medium text-background text-sm transition-all duration-200 hover:bg-foreground"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Google Maps"
                >
                  <title>Google Maps icon</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                View on Google Maps
              </a>
            </div>

            {/* Getting There Section */}
            <div className="rounded-xl bg-primary/5 p-4 sm:p-6">
              <h3 className="mb-3 font-serif text-foreground text-lg sm:mb-4 sm:text-xl">
                Getting There
              </h3>
              <div className="space-y-3 text-muted-foreground text-xs sm:space-y-4 sm:text-sm">
                <div>
                  <p className="mb-1 font-medium text-foreground text-xs sm:text-sm">
                    From Manila (2-3 hours):
                  </p>
                  <p className="text-xs leading-relaxed sm:text-sm">
                    Take SLEX and exit at Batangas City. Follow the signs to
                    Cuenca via Alitagtag. The venue will be on your right after
                    entering Cuenca town proper.
                  </p>
                </div>
                <div>
                  <p className="mb-1 font-medium text-foreground text-xs sm:text-sm">
                    Rideshare:
                  </p>
                  <p className="text-xs leading-relaxed sm:text-sm">
                    Grab (the Philippines equivalent of Uber) is the recommended
                    way to travel. Available for rides throughout the region,
                    it's the safest and most convenient option to get to the
                    venue.
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
