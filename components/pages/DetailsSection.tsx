'use client'

import { useEffect, useRef } from 'react'

import DecorativeBackground from '@/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const detailItems = [
  {
    id: 'welcome-party',
    label: 'WELCOME PARTY',
    title: 'Friday\nEvening\nCelebration',
    link: null,
    description:
      'Join us for drinks and light appetizers\nas we kick off our wedding weekend\nat the resort lounge.',
    position: 'left',
    verticalOffset: 0,
  },
  {
    id: 'ceremony',
    label: 'CEREMONY',
    title: 'Sacred\nVows',
    link: null,
    description:
      'The wedding ceremony will take place\nin the beautiful garden setting\nwith mountain views as our backdrop.',
    position: 'center',
    verticalOffset: 200,
  },
  {
    id: 'cocktail-hour',
    label: 'COCKTAIL HOUR',
    title: 'Garden\nCocktails',
    link: null,
    description:
      "Celebrate with signature cocktails\nand hors d'oeuvres while we take photos\nand you mingle with fellow guests.",
    position: 'right',
    verticalOffset: 400,
  },
  {
    id: 'dinner',
    label: 'DINNER',
    title: 'Reception\nFeast',
    link: null,
    description:
      'A delicious Filipino-inspired menu\nfeaturing local ingredients\nand family recipes.',
    position: 'left',
    verticalOffset: 600,
  },
  {
    id: 'dancing',
    label: 'DANCING',
    title: 'Dance\nFloor',
    link: null,
    description:
      'Let loose and dance the night away\nto a mix of your favorite songs\nand Filipino classics.',
    position: 'center',
    verticalOffset: 800,
  },
  {
    id: 'cake',
    label: 'CAKE',
    title: 'Sweet\nEnding',
    link: null,
    description:
      'Join us for the cake cutting ceremony\nand indulge in our three-tier\ncoconut and ube creation.',
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
      <DecorativeBackground variant="light" density="sparse" />
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div ref={contentRef} className="relative z-10">
          {/* Zigzag Layout Container */}
          <div className="relative">
            {detailItems.map((item, index) => {
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
                      <p className="mb-2 flex items-center gap-2 font-medium text-muted-foreground text-xs tracking-[0.2em]">
                        <span className="text-muted-foreground/50">{index + 1}.</span>
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
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block border-current border-b pb-1 text-sm transition-opacity hover:opacity-70"
                          style={{ color: '#2B4735' }}
                        >
                          {item.link}
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
          <div
            style={{
              height: `${Math.max(...detailItems.map((item) => item.verticalOffset)) + 400}px`,
            }}
          />
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
