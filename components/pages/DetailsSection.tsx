'use client'

import { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const detailItems = [
  {
    id: 'welcome-party',
    label: 'WELCOME PARTY',
    title: 'Tuesday Evening',
    time: 'Tuesday, May 19 • 7:00 PM',
    description:
      'Join us for drinks and light appetizers as we kick off our wedding weekend at the resort lounge.',
    position: 'left',
    bgColor: '#D5F0E6',
  },
  {
    id: 'ceremony',
    label: 'CEREMONY',
    title: 'Sacred Vows',
    time: 'Thursday, May 21 • 4:00 PM',
    description:
      'The wedding ceremony will take place in the beautiful garden setting with mountain views as our backdrop.',
    position: 'right',
    bgColor: '#F5DDD5',
  },
  {
    id: 'cocktail-hour',
    label: 'COCKTAIL HOUR',
    title: 'Garden Cocktails',
    time: 'Thursday, May 21 • 5:00 PM',
    description:
      "Celebrate with signature cocktails and hors d'oeuvres while we take photos and you mingle with fellow guests.",
    position: 'left',
    bgColor: '#E6D5F0',
  },
  {
    id: 'dinner',
    label: 'RECEPTION',
    title: 'Reception Feast',
    time: 'Thursday, May 21 • 6:30 PM',
    description:
      'A delicious Filipino-inspired menu featuring local ingredients and family recipes.',
    position: 'right',
    bgColor: '#D5E6F0',
  },
  {
    id: 'dancing',
    label: 'DANCING',
    title: 'Dance Floor',
    time: 'Thursday, May 21 • 8:30 PM',
    description:
      'Let loose and dance the night away to a mix of your favorite songs and Filipino classics.',
    position: 'left',
    bgColor: '#D4E6D5',
  },
  {
    id: 'cake',
    label: 'CAKE CUTTING',
    title: 'Sweet Ending',
    time: 'Thursday, May 21 • 10:00 PM',
    description:
      'Join us for the cake cutting ceremony and indulge in our three-tier coconut and ube creation.',
    position: 'right',
    bgColor: '#F5E6D3',
  },
]

export default function DetailsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
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
      }

      // Animate timeline path on desktop
      if (pathRef.current && window.innerWidth >= 1024) {
        const pathLength = pathRef.current.getTotalLength()
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        })

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 1,
          },
        })
      }

      // Animate timeline dots
      const dots = timelineRef.current?.querySelectorAll('.timeline-dot')
      if (dots) {
        dots.forEach((dot, index) => {
          gsap.fromTo(
            dot,
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              delay: index * 0.1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: dot,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })
      }

      // Animate detail cards
      const elements = contentRef.current?.querySelectorAll('.detail-item')
      if (elements) {
        elements.forEach((element, index) => {
          gsap.fromTo(
            element,
            {
              opacity: 0,
              x: detailItems[index].position === 'left' ? -50 : 50,
              scale: 0.95,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })
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
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className="mb-4 font-medium text-muted-foreground text-xs tracking-[0.3em]">
            WEDDING SCHEDULE
          </p>
          <h2 className="mb-4 font-serif text-3xl text-foreground/90 sm:text-4xl lg:text-6xl">
            Order of Events
          </h2>
        </div>

        <div ref={contentRef} className="relative z-10">
          {/* Mobile Timeline Line */}
          <div className="absolute top-0 left-6 h-full w-0.5 bg-gradient-to-b from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 sm:left-8 lg:hidden" />

          {/* Desktop Timeline Connector */}
          <svg
            ref={timelineRef}
            className="-translate-x-1/2 pointer-events-none absolute top-0 left-1/2 hidden h-full w-full lg:block"
            viewBox="0 0 800 1600"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="timeline-gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
                <stop
                  offset="50%"
                  stopColor="currentColor"
                  stopOpacity="0.15"
                />
                <stop
                  offset="100%"
                  stopColor="currentColor"
                  stopOpacity="0.05"
                />
              </linearGradient>
            </defs>

            {/* Main curved path */}
            <path
              ref={pathRef}
              d="M 400 50 Q 200 200 200 300 Q 200 400 400 500 Q 600 600 600 700 Q 600 800 400 900 Q 200 1000 200 1100 Q 200 1200 400 1300 Q 600 1400 600 1500"
              stroke="url(#timeline-gradient)"
              strokeWidth="2"
              fill="none"
              className="text-muted-foreground"
              strokeDasharray="5 5"
            />

            {/* Connection dots */}
            {detailItems.map((item, index) => {
              const y = 250 + index * 220
              const x = item.position === 'left' ? 200 : 600
              return (
                <g key={item.id}>
                  <circle
                    className="timeline-dot"
                    cx={x}
                    cy={y}
                    r="8"
                    fill="currentColor"
                    fillOpacity="0.1"
                    stroke="currentColor"
                    strokeOpacity="0.2"
                    strokeWidth="2"
                  />
                  <circle
                    className="timeline-dot"
                    cx={x}
                    cy={y}
                    r="4"
                    fill="currentColor"
                    fillOpacity="0.15"
                  />
                </g>
              )
            })}
          </svg>

          {/* Event Cards */}
          <div className="relative lg:space-y-16">
            {detailItems.map((item, index) => {
              const isLeft = item.position === 'left'

              return (
                <div
                  key={item.id}
                  className={`detail-item group relative mb-6 w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl sm:mb-8 lg:mb-0 ${
                    isLeft ? 'lg:pr-[55%]' : 'lg:pl-[55%]'
                  } after:-translate-y-8 ml-6 p-4 before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 after:absolute after:top-0 after:right-0 after:h-16 after:w-16 after:translate-x-8 after:rotate-45 after:bg-white/10 group-hover:before:opacity-100 sm:ml-8 sm:p-6 lg:ml-0 lg:p-8`}
                  style={{ backgroundColor: item.bgColor }}
                >
                  {/* Number and Label */}
                  <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/50 font-bold text-foreground/70 text-xs sm:h-8 sm:w-8 sm:text-sm">
                      {index + 1}
                    </span>
                    <p className="font-medium text-[10px] text-foreground/70 tracking-[0.2em] sm:text-xs">
                      {item.label}
                    </p>
                  </div>

                  {/* Title and Time */}
                  <div className="mb-3 sm:mb-4">
                    <h3 className="mb-2 font-serif text-foreground text-xl sm:text-2xl lg:text-3xl">
                      {item.title}
                    </h3>
                    <p className="font-medium text-foreground/50 text-xs sm:text-sm">
                      {item.time}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/70 text-xs leading-relaxed sm:text-sm lg:text-base">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 200"
          className="h-32 w-full opacity-5 lg:h-48"
          preserveAspectRatio="none"
        >
          <title>Decorative wave pattern</title>
          <path
            d="M0,128 C240,64 480,96 720,128 C960,160 1200,128 1440,96 L1440,200 L0,200 Z"
            fill="currentColor"
            className="text-foreground"
          />
        </svg>
      </div>
    </section>
  )
}
