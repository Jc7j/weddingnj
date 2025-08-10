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
    subtitle: 'Celebration',
    time: 'Tuesday, May 19 • 7:00 PM',
    icon: '🥂',
    description:
      'Join us for drinks and light appetizers as we kick off our wedding weekend at the resort lounge.',
    position: 'left',
    verticalOffset: 0,
    bgColor: '#F0E6D5',
  },
  {
    id: 'ceremony',
    label: 'CEREMONY',
    title: 'Sacred Vows',
    subtitle: 'Garden Wedding',
    time: 'Thursday, May 21 • 4:00 PM',
    icon: '💍',
    description:
      'The wedding ceremony will take place in the beautiful garden setting with mountain views as our backdrop.',
    position: 'right',
    verticalOffset: 250,
    bgColor: '#F5DDD5',
  },
  {
    id: 'cocktail-hour',
    label: 'COCKTAIL HOUR',
    title: 'Garden Cocktails',
    subtitle: 'Mix & Mingle',
    time: 'Thursday, May 21 • 5:00 PM',
    icon: '🍸',
    description:
      "Celebrate with signature cocktails and hors d'oeuvres while we take photos and you mingle with fellow guests.",
    position: 'left',
    verticalOffset: 500,
    bgColor: '#E6D5F0',
  },
  {
    id: 'dinner',
    label: 'RECEPTION',
    title: 'Reception Feast',
    subtitle: 'Filipino Cuisine',
    time: 'Thursday, May 21 • 6:30 PM',
    icon: '🍽️',
    description:
      'A delicious Filipino-inspired menu featuring local ingredients and family recipes.',
    position: 'right',
    verticalOffset: 750,
    bgColor: '#D5E6F0',
  },
  {
    id: 'dancing',
    label: 'DANCING',
    title: 'Dance Floor',
    subtitle: 'Party Time',
    time: 'Thursday, May 21 • 8:30 PM',
    icon: '🎵',
    description:
      'Let loose and dance the night away to a mix of your favorite songs and Filipino classics.',
    position: 'left',
    verticalOffset: 1000,
    bgColor: '#D4E6D5',
  },
  {
    id: 'cake',
    label: 'CAKE CUTTING',
    title: 'Sweet Ending',
    subtitle: 'Ube & Coconut',
    time: 'Thursday, May 21 • 10:00 PM',
    icon: '🎂',
    description:
      'Join us for the cake cutting ceremony and indulge in our three-tier coconut and ube creation.',
    position: 'right',
    verticalOffset: 1250,
    bgColor: '#F5E6D3',
  },
]

export default function DetailsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<SVGSVGElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

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

      // Animate timeline path drawing
      if (timelineRef.current) {
        const path = timelineRef.current.querySelector('.timeline-path')
        if (path) {
          const pathLength = (path as SVGPathElement).getTotalLength()

          gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          })

          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 1,
            },
          })
        }
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

          // Add floating animation to icons
          const icon = element.querySelector('.event-icon')
          if (icon) {
            gsap.to(icon, {
              y: -5,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: 'power1.inOut',
            })
          }
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
          <p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
            Join us for a weekend of celebration as we begin our journey
            together
          </p>
        </div>

        <div ref={contentRef} className="relative z-10">
          {/* SVG Timeline Path - Desktop Only */}
          <svg
            ref={timelineRef}
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            style={{
              height: `${Math.max(...detailItems.map((item) => item.verticalOffset)) + 500}px`,
            }}
            preserveAspectRatio="none"
          >
            <title>Event timeline path</title>
            <path
              className="timeline-path"
              d={`
                M ${detailItems[0].position === 'left' ? '200' : '600'} 100
                ${detailItems
                  .map((item, index) => {
                    const x = item.position === 'left' ? 200 : 600
                    const y = item.verticalOffset + 150
                    if (index === 0) return ''
                    const prevItem = detailItems[index - 1]
                    const prevX = prevItem.position === 'left' ? 200 : 600
                    const prevY = prevItem.verticalOffset + 150
                    const midY = (prevY + y) / 2
                    return `Q ${prevX} ${midY}, ${x} ${y}`
                  })
                  .join(' ')}
              `}
              stroke="#2B4735"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              opacity="0.2"
            />
          </svg>

          {/* Mobile Timeline Line */}
          <div className="absolute top-0 left-6 h-full w-0.5 bg-muted-foreground/20 sm:left-8 lg:hidden" />

          {/* Event Cards */}
          <div className="relative">
            {detailItems.map((item, index) => {
              const isLeft = item.position === 'left'

              return (
                <div
                  key={item.id}
                  className={`detail-item relative mb-12 lg:absolute lg:mb-0 ${
                    isLeft ? 'lg:left-0' : 'lg:right-0'
                  } w-full lg:w-[45%]`}
                  style={{
                    top: `${item.verticalOffset}px`,
                  }}
                >
                  {/* Mobile Timeline Dot */}
                  <div className="absolute top-8 left-[-32px] flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-md sm:left-[-28px] sm:h-12 sm:w-12 lg:hidden">
                    <span className="text-lg sm:text-xl">{item.icon}</span>
                  </div>

                  {/* Card */}
                  <div
                    className="group relative ml-6 overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl sm:ml-8 lg:ml-0"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <div className="p-4 sm:p-6 lg:p-8">
                      {/* Number and Icon */}
                      <div className="mb-3 flex items-center justify-between sm:mb-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/50 font-bold text-foreground/70 text-xs sm:h-8 sm:w-8 sm:text-sm">
                            {index + 1}
                          </span>
                          <p className="font-medium text-[10px] text-foreground/70 tracking-[0.2em] sm:text-xs">
                            {item.label}
                          </p>
                        </div>
                        <span className="event-icon hidden text-2xl sm:text-3xl lg:block">
                          {item.icon}
                        </span>
                      </div>

                      {/* Title and Time */}
                      <div className="mb-3 sm:mb-4">
                        <h3 className="mb-1 font-serif text-foreground text-xl sm:text-2xl lg:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mb-1 font-serif text-base text-foreground/60 sm:mb-2 sm:text-lg">
                          {item.subtitle}
                        </p>
                        <p className="font-medium text-foreground/50 text-xs sm:text-sm">
                          {item.time}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-foreground/70 text-xs leading-relaxed sm:text-sm lg:text-base">
                        {item.description}
                      </p>

                      {/* Decorative Corner */}
                      <div className="-translate-y-8 absolute top-0 right-0 h-16 w-16 translate-x-8 rotate-45 bg-white/10" />
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Desktop Timeline Connector */}
                  <div
                    className={`-translate-y-1/2 absolute top-1/2 hidden h-0.5 w-8 bg-muted-foreground/20 lg:block ${
                      isLeft ? 'right-[-32px]' : 'left-[-32px]'
                    }`}
                  />
                </div>
              )
            })}
          </div>

          {/* Add height to container */}
          <div
            className="hidden lg:block"
            style={{
              height: `${Math.max(...detailItems.map((item) => item.verticalOffset)) + 400}px`,
            }}
          />
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
