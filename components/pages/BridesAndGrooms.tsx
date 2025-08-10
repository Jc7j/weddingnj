'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import DecorativeBackground from '@/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const weddingParty = [
  {
    id: 'ghost-card',
    name: '',
    role: '',
    side: 'ghost',
    story: '',
    bgColor: '#F5E6D3',
    isGhost: true,
  },
  {
    id: 'maid-of-honor',
    name: 'Lorem Ipsum',
    role: 'Maid of Honor',
    side: 'bride',
    story:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    bgColor: '#F0D5D5',
    image: '/dogs/choco.png',
  },
  {
    id: 'best-man',
    name: 'Dolor Sit',
    role: 'Best Man',
    side: 'groom',
    story:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    bgColor: '#D5E0E6',
    image: '/dogs/fish.png',
  },
  {
    id: 'bridesmaid-1',
    name: 'Consectetur Adipiscing',
    role: 'Bridesmaid',
    side: 'bride',
    story:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    bgColor: '#E6D5F0',
    image: '/dogs/kobe.png',
  },
  {
    id: 'groomsman-1',
    name: 'Eiusmod Tempor',
    role: 'Groomsman',
    side: 'groom',
    story:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    bgColor: '#D4E6D5',
    image: '/dogs/molly.png',
  },
  {
    id: 'bridesmaid-2',
    name: 'Incididunt Labore',
    role: 'Bridesmaid',
    side: 'bride',
    story:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    bgColor: '#F0E6D5',
    image: '/dogs/choco.png',
  },
  {
    id: 'groomsman-2',
    name: 'Magna Aliqua',
    role: 'Groomsman',
    side: 'groom',
    story:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
    bgColor: '#F5DDD5',
    image: '/dogs/fish.png',
  },
  {
    id: 'bridesmaid-3',
    name: 'Veniam Quis',
    role: 'Bridesmaid',
    side: 'bride',
    story:
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    bgColor: '#D5E6F0',
    image: '/dogs/kobe.png',
  },
  {
    id: 'groomsman-3',
    name: 'Nostrud Exercitation',
    role: 'Groomsman',
    side: 'groom',
    story:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.',
    bgColor: '#E6D5F0',
    image: '/dogs/molly.png',
  },
  {
    id: 'bridesmaid-4',
    name: 'Ullamco Laboris',
    role: 'Bridesmaid',
    side: 'bride',
    story:
      'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.',
    bgColor: '#D5E6F0',
    image: '/dogs/choco.png',
  },
  {
    id: 'groomsman-4',
    name: 'Aliquip Commodo',
    role: 'Groomsman',
    side: 'groom',
    story:
      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.',
    bgColor: '#F5DDD5',
    image: '/dogs/fish.png',
  },
  {
    id: 'ghost-card-end',
    name: '',
    role: '',
    side: 'ghost',
    story: '',
    bgColor: '#F5E6D3',
    isGhost: true,
  },
]

export default function BridesAndGroomsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const realCards = weddingParty.filter((m) => !m.isGhost)

  const scrollToSection = (href: string) => {
    const lenis = (
      window as Window & {
        lenis?: {
          scrollTo: (
            target: string,
            options?: {
              duration?: number
              easing?: (t: number) => number
              onComplete?: () => void
            }
          ) => void
        }
      }
    ).lenis
    if (lenis) {
      lenis.scrollTo(href, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        onComplete: () => {
          setTimeout(() => {
            ScrollTrigger.refresh()
          }, 100)
        },
      })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const goToNext = () => {
    const nextIndex = currentIndex + 1
    if (nextIndex < realCards.length) {
      const targetProgress = nextIndex / realCards.length
      const timeline = timelineRef.current
      if (timeline) {
        timeline.progress(targetProgress)
      }
      setCurrentIndex(nextIndex)
      const section = sectionRef.current
      if (section) {
        gsap.to(section, {
          backgroundColor: realCards[nextIndex].bgColor,
          duration: 0.5,
          ease: 'power2.inOut',
        })
      }
    } else {
      // Scroll to next section (venue)
      scrollToSection('#venue')
    }
  }

  const goToPrevious = () => {
    const prevIndex = currentIndex - 1
    if (prevIndex >= 0) {
      const targetProgress = prevIndex / realCards.length
      const timeline = timelineRef.current
      if (timeline) {
        timeline.progress(targetProgress)
      }
      setCurrentIndex(prevIndex)
      const section = sectionRef.current
      if (section) {
        gsap.to(section, {
          backgroundColor: realCards[prevIndex].bgColor,
          duration: 0.5,
          ease: 'power2.inOut',
        })
      }
    } else {
      // Scroll to previous section (story)
      scrollToSection('#story')
    }
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const container = containerRef.current
      const progress = progressRef.current
      if (!section || !container || !progress) return

      const cards = cardsRef.current.filter(Boolean)
      const isMobile = window.innerWidth < 768

      if (isMobile) {
        const realCards = weddingParty.filter((m) => !m.isGhost)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '300%',
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              const progressPercentage = self.progress * 100
              gsap.set(progress, { width: `${progressPercentage}%` })

              const scrollIndex = Math.floor(self.progress * realCards.length)
              const clampedIndex = Math.min(scrollIndex, realCards.length - 1)
              const currentMember = realCards[clampedIndex]

              setCurrentIndex(clampedIndex)

              if (currentMember) {
                gsap.to(section, {
                  backgroundColor: currentMember.bgColor,
                  duration: 0.5,
                  ease: 'power2.inOut',
                })
              }
            },
          },
        })

        timelineRef.current = tl

        cards.forEach((card, index) => {
          if (weddingParty[index].isGhost) return

          const realIndex = realCards.findIndex(
            (m) => m.id === weddingParty[index].id
          )
          const startProgress = realIndex / realCards.length
          const endProgress = (realIndex + 1) / realCards.length

          tl.fromTo(
            card,
            {
              opacity: 0,
              y: 50,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            startProgress
          )

          if (realIndex < realCards.length - 1) {
            tl.to(
              card,
              {
                opacity: 0,
                y: -50,
                scale: 0.9,
                duration: 0.3,
                ease: 'power2.in',
              },
              endProgress - 0.05
            )
          }
        })
      } else {
        const totalWidth = cards.length * 500

        gsap.set(container, {
          width: totalWidth,
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              const realCards = weddingParty.filter((m) => !m.isGhost)
              const progressPercentage = self.progress * 100
              gsap.set(progress, { width: `${progressPercentage}%` })

              const scrollIndex = Math.floor(self.progress * realCards.length)
              const clampedIndex = Math.min(scrollIndex, realCards.length - 1)
              const currentMember = realCards[clampedIndex]

              setCurrentIndex(clampedIndex)

              if (currentMember) {
                gsap.to(section, {
                  backgroundColor: currentMember.bgColor,
                  duration: 0.5,
                  ease: 'power2.inOut',
                })
              }
            },
          },
        })

        timelineRef.current = tl

        tl.to(container, {
          x: () => -(totalWidth - window.innerWidth + 100),
          ease: 'none',
        })

        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
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
                trigger: card,
                containerAnimation: tl,
                start: 'left 80%',
                toggleActions: 'play none none reverse',
              },
            }
          )

          gsap.to(card, {
            y: -20,
            rotation: index % 2 === 0 ? 2 : -2,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${totalWidth}`,
              scrub: 2,
            },
          })
        })
      }

      const firstRealCard = weddingParty.find((m) => !m.isGhost)
      gsap.set(section, {
        backgroundColor: firstRealCard?.bgColor || '#F5E6D3',
      })

      const lenis = (window as { lenis?: any }).lenis
      if (lenis) {
        const handleScroll = () => ScrollTrigger.update()
        lenis.on('scroll', handleScroll)

        return () => {
          lenis.off('scroll', handleScroll)
        }
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="wedding-party"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-background transition-colors duration-500"
    >
      {/* Decorative Background */}
      <DecorativeBackground variant="light" density="medium" />

      <div className="flex h-screen flex-col">
        <div className="flex-shrink-0 px-6 pt-6 text-center lg:px-12 lg:pt-20">
          <h2 className="mb-8 font-serif text-4xl text-foreground/90 lg:text-6xl">
            Brides & Grooms
          </h2>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div
            ref={containerRef}
            className="flex h-full items-center gap-8 px-6 md:flex-row md:gap-12 md:px-12"
          >
            {weddingParty.map((member, index) => {
              if (member.isGhost) {
                return (
                  <div
                    key={member.id}
                    ref={(el) => {
                      cardsRef.current[index] = el
                    }}
                    className="h-[500px] w-full flex-shrink-0 md:w-[400px]"
                    aria-hidden="true"
                  />
                )
              }

              return (
                <div
                  key={member.id}
                  ref={(el) => {
                    cardsRef.current[index] = el
                  }}
                  className="flex h-[500px] w-full flex-shrink-0 flex-col rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm md:w-[400px]"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                        {member.side === 'bride' ? "Nicole's" : "James's"}
                      </p>
                      <p className="mt-1 font-serif text-2xl text-foreground">
                        {member.role}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="font-bold text-lg text-primary">
                        {index}
                      </span>
                    </div>
                  </div>

                  <div className="relative mb-6 flex-1 overflow-hidden rounded-xl">
                    <Image
                      src={member.image || ''}
                      alt={`${member.name} - ${member.role}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.story}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-between px-6 pb-6 lg:px-12">
          <div className="flex items-center">
            <div className="relative h-1 w-48 overflow-hidden rounded-full bg-black/10">
              <div
                ref={progressRef}
                className="h-full rounded-full bg-foreground/80 transition-all duration-300"
                style={{ width: '0%' }}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goToPrevious}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-foreground/20"
              aria-label={
                currentIndex === 0
                  ? 'Go to story section'
                  : 'Previous wedding party member'
              }
            >
              <svg
                className="h-4 w-4 text-foreground/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-foreground/20"
              aria-label={
                currentIndex === realCards.length - 1
                  ? 'Go to venue section'
                  : 'Next wedding party member'
              }
            >
              <svg
                className="h-4 w-4 text-foreground/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
