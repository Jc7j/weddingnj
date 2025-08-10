'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
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
    relationship: 'Best Friend',
    story:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    bgColor: '#F0D5D5',
    accentColor: '#E6D5F0',
    image: '/dogs/choco.png',
  },
  {
    id: 'best-man',
    name: 'Dolor Sit',
    role: 'Best Man',
    side: 'groom',
    relationship: 'Brother',
    story:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    bgColor: '#D5E0E6',
    accentColor: '#D4E6D5',
    image: '/dogs/fish.png',
  },
  {
    id: 'bridesmaid-1',
    name: 'Consectetur Adipiscing',
    role: 'Bridesmaid',
    side: 'bride',
    relationship: 'College Friend',
    story:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    bgColor: '#E6D5F0',
    accentColor: '#F0D5D5',
    image: '/dogs/kobe.png',
  },
  {
    id: 'groomsman-1',
    name: 'Eiusmod Tempor',
    role: 'Groomsman',
    side: 'groom',
    relationship: 'Childhood Friend',
    story:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    bgColor: '#D4E6D5',
    accentColor: '#D5E0E6',
    image: '/dogs/molly.png',
  },
  {
    id: 'bridesmaid-2',
    name: 'Incididunt Labore',
    role: 'Bridesmaid',
    side: 'bride',
    relationship: 'Sister',
    story:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    bgColor: '#F0E6D5',
    accentColor: '#E6D5F0',
    image: '/dogs/choco.png',
  },
  {
    id: 'groomsman-2',
    name: 'Magna Aliqua',
    role: 'Groomsman',
    side: 'groom',
    relationship: 'Cousin',
    story:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
    bgColor: '#F5DDD5',
    accentColor: '#D4E6D5',
    image: '/dogs/fish.png',
  },
  {
    id: 'bridesmaid-3',
    name: 'Veniam Quis',
    role: 'Bridesmaid',
    side: 'bride',
    relationship: 'Work Friend',
    story:
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    bgColor: '#D5E6F0',
    accentColor: '#F0D5D5',
    image: '/dogs/kobe.png',
  },
  {
    id: 'groomsman-3',
    name: 'Nostrud Exercitation',
    role: 'Groomsman',
    side: 'groom',
    relationship: 'College Roommate',
    story:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.',
    bgColor: '#E6D5F0',
    accentColor: '#D5E0E6',
    image: '/dogs/molly.png',
  },
  {
    id: 'bridesmaid-4',
    name: 'Ullamco Laboris',
    role: 'Bridesmaid',
    side: 'bride',
    relationship: 'Childhood Friend',
    story:
      'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.',
    bgColor: '#D5E6F0',
    accentColor: '#E6D5F0',
    image: '/dogs/choco.png',
  },
  {
    id: 'groomsman-4',
    name: 'Aliquip Commodo',
    role: 'Groomsman',
    side: 'groom',
    relationship: 'Brother',
    story:
      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.',
    bgColor: '#F5DDD5',
    accentColor: '#D4E6D5',
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
      <DecorativeBackground variant="light" density="medium" />

      {/* Floating Hearts Animation */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={`floating-heart-${Date.now()}-${i}`}
            className="absolute animate-float"
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + i * 3}s`,
            }}
          >
            <span className="text-2xl opacity-10">💕</span>
          </div>
        ))}
      </div>

      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-6 pt-6 text-center lg:px-12 lg:pt-20">
          <p className="mb-2 font-medium text-muted-foreground/70 text-xs tracking-[0.3em]">
            WEDDING PARTY
          </p>
          <h2 className="mb-2 font-serif text-4xl text-foreground/90 lg:text-6xl">
            Bridesmaids & Groomsmen
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-sm">
            The special people who have supported our journey
          </p>
        </div>

        {/* Cards Container */}
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
                    className="h-[550px] w-full flex-shrink-0 md:w-[420px]"
                    aria-hidden="true"
                  />
                )
              }

              const realIndex = realCards.findIndex((m) => m.id === member.id)

              return (
                <div
                  key={member.id}
                  ref={(el) => {
                    cardsRef.current[index] = el
                  }}
                  className="group relative h-[550px] w-full flex-shrink-0 md:w-[420px]"
                >
                  {/* Card Background with Pattern */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-30"
                    style={{ backgroundColor: member.accentColor }}
                  />

                  {/* Main Card */}
                  <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/95 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-3xl">
                    {/* Card Header */}
                    <div
                      className="relative px-8 pt-8 pb-4"
                      style={{ backgroundColor: `${member.bgColor}40` }}
                    >
                      {/* Name and Role */}
                      <h3 className="mb-1 font-serif text-2xl text-foreground">
                        {member.name}
                      </h3>
                      <p className="font-medium text-foreground/60 text-sm">
                        {member.role}
                      </p>
                      {member.relationship && (
                        <p className="mt-1 text-foreground/50 text-xs">
                          {member.relationship}
                        </p>
                      )}
                    </div>

                    {/* Image Container */}
                    <div className="relative mx-6 mb-6 flex-1 overflow-hidden rounded-2xl shadow-inner">
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{ backgroundColor: member.accentColor }}
                      />
                      <Image
                        src={member.image || ''}
                        alt={`${member.name} - ${member.role}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 420px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Story */}
                    <div className="px-8 pb-8">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {member.story}
                      </p>
                    </div>

                    {/* Decorative Elements */}
                    <div
                      className="absolute right-0 bottom-0 left-0 h-1"
                      style={{ backgroundColor: member.accentColor }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer with Progress */}
        <div className="flex items-center justify-between px-6 pb-6 lg:px-12">
          {/* Progress Bar */}
          <div className="flex flex-1 items-center gap-4">
            <span className="font-medium text-foreground/50 text-xs">
              {currentIndex + 1} / {realCards.length}
            </span>
            <div className="relative h-1 max-w-xs flex-1 overflow-hidden rounded-full bg-black/10">
              <div
                ref={progressRef}
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: '0%' }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="group h-11 w-11 rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
              aria-label={
                currentIndex === 0
                  ? 'Go to story section'
                  : 'Previous wedding party member'
              }
            >
              <svg
                className="group-hover:-translate-x-0.5 h-5 w-5 text-foreground/70 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Previous arrow</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="group h-11 w-11 rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
              aria-label={
                currentIndex === realCards.length - 1
                  ? 'Go to venue section'
                  : 'Next wedding party member'
              }
            >
              <svg
                className="h-5 w-5 text-foreground/70 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Next arrow</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-30px) translateX(10px);
          }
          66% {
            transform: translateY(-15px) translateX(-10px);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  )
}
