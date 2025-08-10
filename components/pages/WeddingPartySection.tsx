'use client'

import { useEffect, useRef } from 'react'

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
    name: 'Sarah Johnson',
    role: 'Maid of Honor',
    side: 'bride',
    story:
      "Nicole's sister and lifelong best friend. From childhood adventures to late-night talks, Sarah has been there through it all.",
    bgColor: '#F0D5D5',
  },
  {
    id: 'best-man',
    name: 'Michael Chen',
    role: 'Best Man',
    side: 'groom',
    story:
      "James's brother and partner in crime since day one. They've shared countless memories from family vacations to college shenanigans.",
    bgColor: '#D5E0E6',
  },
  {
    id: 'bridesmaid-1',
    name: 'Emily Rodriguez',
    role: 'Bridesmaid',
    side: 'bride',
    story:
      'College roommate turned soul sister. Emily and Nicole bonded over coffee runs and study sessions that turned into lifelong friendship.',
    bgColor: '#E6D5F0',
  },
  {
    id: 'groomsman-1',
    name: 'David Park',
    role: 'Groomsman',
    side: 'groom',
    story:
      "High school buddy who's been there through thick and thin. David and James have traveled the world together, one adventure at a time.",
    bgColor: '#D4E6D5',
  },
  {
    id: 'bridesmaid-2',
    name: 'Ashley Thompson',
    role: 'Bridesmaid',
    side: 'bride',
    story:
      'Work colleague who became family. Ashley helped Nicole find her confidence and celebrate every milestone along the way.',
    bgColor: '#F0E6D5',
  },
  {
    id: 'groomsman-2',
    name: 'Ryan Martinez',
    role: 'Groomsman',
    side: 'groom',
    story:
      "The friend who introduced James to his favorite hobbies. Ryan's enthusiasm for life has always inspired James to try new things.",
    bgColor: '#F5DDD5',
  },
  {
    id: 'bridesmaid-3',
    name: 'Jessica Lee',
    role: 'Bridesmaid',
    side: 'bride',
    story:
      "Childhood friend who knows all the secrets. Jessica and Nicole have grown up together, supporting each other's dreams.",
    bgColor: '#D5E6F0',
  },
  {
    id: 'groomsman-3',
    name: 'Kevin Wu',
    role: 'Groomsman',
    side: 'groom',
    story:
      'The voice of reason in the group. Kevin has always been there with wise advice and genuine support for James.',
    bgColor: '#E6D5F0',
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

export default function WeddingPartySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)

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

              const currentIndex = Math.floor(self.progress * realCards.length)
              const clampedIndex = Math.min(currentIndex, realCards.length - 1)
              const currentMember = realCards[clampedIndex]

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

              const currentIndex = Math.floor(self.progress * realCards.length)
              const clampedIndex = Math.min(currentIndex, realCards.length - 1)
              const currentMember = realCards[clampedIndex]

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
      <div className="flex h-screen flex-col">
        <div className="flex-shrink-0 px-6 pt-12 text-center lg:px-12 lg:pt-20">
          <h2 className="mb-2 font-serif text-4xl text-foreground/90 lg:text-6xl">
            The Wedding Party
          </h2>
          <p className="mx-auto max-w-2xl text-base text-foreground/70 lg:text-lg">
            The amazing people who have supported our journey and will stand by
            our side
          </p>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div
            ref={containerRef}
            className="flex h-full items-center gap-8 px-6 py-8 md:flex-row md:gap-12 md:px-12"
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

                  <div className="relative mb-6 flex-1 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <div className="mb-3 h-32 w-32 rounded-full bg-white/50" />
                        <span className="text-muted-foreground text-sm">
                          Photo Coming Soon
                        </span>
                      </div>
                    </div>
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

        <div className="flex justify-between px-6 pb-8 lg:px-12">
          <div className="flex items-center">
            <div className="relative h-1 w-48 overflow-hidden rounded-full bg-black/10">
              <div
                ref={progressRef}
                className="h-full rounded-full bg-foreground/80 transition-all duration-300"
                style={{ width: '0%' }}
              />
            </div>
          </div>

          <div className="animate-pulse">
            <p className="flex items-center gap-2 text-foreground/60 text-sm">
              <span className="md:hidden">Scroll down</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
