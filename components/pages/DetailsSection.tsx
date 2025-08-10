'use client'

import { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const detailItems = [
  {
    id: 'venue',
    label: 'THE VENUE',
    title: '5160 W. Lake\nHomewood,\nCA 96141',
    link: { text: 'West Shore Cafe', url: 'https://www.westhorecafe.com' },
    description: null,
    position: 'left',
    verticalOffset: 0,
  },
  {
    id: 'airport',
    label: 'THE AIRPORT',
    title: 'Reno\nInternational\nAirport',
    link: { text: 'Book A Flight', url: 'https://www.google.com/flights' },
    description:
      'SFO / OAK might have cheaper ticket\noptions but are both a 3-5hr drive\nfrom Tahoe.',
    position: 'center',
    verticalOffset: 200,
  },
  {
    id: 'lodging',
    label: 'THE LODGING',
    title: 'Tahoe\nVistana\nInn',
    link: { text: 'Book A Room', url: 'https://www.booking.com' },
    description:
      "We recommend that guests stay\nnear King's Beach, CA on the\nnorth shore of Lake Tahoe near\nor at Tahoe Vistana Inn.",
    position: 'right',
    verticalOffset: 400,
  },
  {
    id: 'activities',
    label: 'ACTIVITIES',
    title: 'Pack\nLayers',
    link: null,
    description: 'Hiking\nPaddle Boarding\nKayaking\nCanoeing',
    position: 'left',
    verticalOffset: 600,
  },
  {
    id: 'food',
    label: 'FOOD & DRINK',
    title: 'A Few\nFavorites',
    link: null,
    description:
      'West Shore Cafe\nSunnyside Restaurant\nGar Woods Grill\nChristy Hill',
    position: 'center',
    verticalOffset: 800,
  },
  {
    id: 'schedule',
    label: 'THE SCHEDULE',
    title: 'Save\nThe Date',
    link: null,
    description:
      '3:00 PM - Ceremony\n4:00 PM - Cocktail Hour\n5:30 PM - Reception\n10:00 PM - After Party',
    position: 'right',
    verticalOffset: 1000,
  },
]

export default function DetailsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const mountainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll('.detail-item')

      if (elements) {
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      if (mountainRef.current) {
        gsap.fromTo(
          mountainRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 0.15,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
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
      id="details"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-background py-20 lg:py-32"
    >
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div ref={contentRef} className="relative z-10">
          {/* Zigzag Layout Container */}
          <div className="relative">
            {detailItems.map((item) => {
              const getPositionClass = () => {
                switch (item.position) {
                  case 'left':
                    return 'lg:left-0'
                  case 'center':
                    return 'lg:left-1/2 lg:-translate-x-1/2'
                  case 'right':
                    return 'lg:right-0'
                  default:
                    return ''
                }
              }

              return (
                <div
                  key={item.id}
                  className={`detail-item relative mb-12 w-full lg:absolute lg:mb-0 lg:w-[30%] ${getPositionClass()}`}
                  style={{
                    top: `${item.verticalOffset}px`,
                  }}
                >
                  <div className="space-y-6">
                    <div>
                      <p className="mb-2 font-medium text-muted-foreground text-xs tracking-[0.2em]">
                        {item.label}
                      </p>
                      <div className="mb-8 h-px w-12 bg-muted-foreground/30" />
                    </div>
                    <div>
                      {item.description && item.position === 'right' && (
                        <p className="mb-8 whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      <h2
                        className="mb-4 whitespace-pre-line font-serif text-4xl leading-tight"
                        style={{ color: '#2B4735' }}
                      >
                        {item.title}
                      </h2>
                      {item.link && (
                        <a
                          href={item.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block border-current border-b pb-1 text-sm transition-opacity hover:opacity-70"
                          style={{ color: '#2B4735' }}
                        >
                          {item.link.text}
                        </a>
                      )}
                      {item.description && item.position === 'left' && (
                        <p className="mt-4 whitespace-pre-line text-base text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Add height to container based on last item */}
          <div style={{ height: `${Math.max(...detailItems.map(item => item.verticalOffset)) + 400}px` }} />
        </div>
      </div>

      {/* Mountain Illustration */}
      <div
        ref={mountainRef}
        className="pointer-events-none absolute bottom-0 left-0 w-full max-w-md opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%232B4735' stroke-width='0.5' fill='none'%3E%3Cpath d='M0 200 L50 150 L100 180 L150 120 L200 160 L250 140 L300 170 L350 130 L400 180 L400 300 L0 300 Z' fill='%232B4735' opacity='0.05'/%3E%3Cpath d='M0 200 L50 150 L100 180 L150 120 L200 160 L250 140 L300 170 L350 130 L400 180'/%3E%3Cpath d='M20 250 L20 200 M40 240 L40 180 M60 245 L60 195 M80 255 L80 210 M100 250 L100 200 M120 240 L120 185 M140 248 L140 198 M160 252 L160 205 M180 245 L180 195 M200 250 L200 200'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom left',
          backgroundSize: 'contain',
          height: '300px',
        }}
      />
    </section>
  )
}
