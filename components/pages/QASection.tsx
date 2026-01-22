'use client'

import { useEffect, useRef } from 'react'

import DecorativeBackground from '@/components/ui/decorative-background'

import type { ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const questions: Array<{ q: string; a: ReactNode }> = [
  {
    q: 'How do I RSVP?',
    a: (
      <>
        <a
          href="#rsvp"
          className="text-foreground/90 underline underline-offset-2 transition-colors hover:text-foreground"
        >
          Fill out the RSVP form
        </a>{' '}
        and select the guests that you'll be bringing. Add your email so you can
        be notified of any updates.
        <br />
        <br />
        If you do not RSVP by March 1st, you'll
        unfortunately be marked as a "No". We apologize for the inconvenience
        but this is to ensure we have an accurate headcount for the wedding.
      </>
    ),
  },
  {
    q: 'When is the RSVP deadline?',
    a: 'Please RSVP by Sunday, March 1st 2026.',
  },
  {
    q: 'What should I do if I cannot make it?',
    a: 'We\'re sorry that you can\'t make it to our wedding, we understand traveling can be difficult. Please let us know as soon as possible and RSVP "no" so we can plan accordingly. If there are any changes about your RSVP, contact James or Nicole.',
  },
  {
    q: 'Can I bring a plus one or children?',
    a: 'Only guests listed on your invitation are invited due to limited capacity. We appreciate your understanding.',
  },
  {
    q: 'What time should guests arrive?',
    a: 'Please arrive 15-30 minutes before the ceremony so you can settle in and enjoy the garden setting.',
  },
  {
    q: 'Is there a dress code?',
    a: "Garden-formal or semi-formal. Attire examples are available above. The entire event will be outdoors so please dress accordingly. Please don't wear white.",
  },
  {
    q: "What's the weather like?",
    a: "Typical daytime temperatures will be hot and humid, but in the evening, it'll be warm with a slight breeze. Hand fans and water will be available.",
  },
  {
    q: 'What happens if it rains?',
    a: 'We have a weather-appropriate backup within the garden to keep guests comfortable.',
  },
  {
    q: 'Is there parking available?',
    a: "Yes, Imelda's Garden has on-site parking.",
  },
  {
    q: 'What should I gift?',
    a: 'Your presence is the greatest gift! However, if you want to gift us something then we kindly request funds for our honeymoon.',
  },
  {
    q: 'Can I take photos during the ceremony?',
    a: "We kindly request an unplugged ceremony since we'll have professional photographers during the event. However, after the ceremony you can take all the photos you want.",
  },
  {
    q: 'Who should I contact if I have questions?',
    a: "If you have additional questions that aren't listed above, please contact James or Nicole.",
  },
]

export default function QASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const items = listRef.current?.querySelectorAll('.qa-item')
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
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
      id="qa"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background py-12 lg:py-16"
    >
      <DecorativeBackground variant="light" density="sparse" />

      <div className="container relative z-10 mx-auto max-w-4xl px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-12 text-center">
          <p className="mb-4 font-medium text-muted-foreground text-xs tracking-[0.3em]">
            QUESTIONS
          </p>
          <h2 className="font-serif text-4xl text-foreground/90 lg:text-6xl">
            FAQ
          </h2>
        </div>

        {/* Q&A List - Editorial Style */}
        <div
          ref={listRef}
          className="overflow-hidden rounded-xl bg-white/30 backdrop-blur-sm"
        >
          {questions.map((item, index) => {
            const isLast = index === questions.length - 1
            const number = String(index + 1).padStart(2, '0')

            return (
              <div
                key={item.q}
                className={`qa-item group px-5 py-5 transition-colors hover:bg-white/40 lg:px-6 ${
                  !isLast ? 'border-muted/20 border-b' : ''
                }`}
              >
                <div className="flex gap-4 lg:gap-6">
                  {/* Number indicator */}
                  <span className="shrink-0 font-serif text-lg text-muted-foreground/40 tabular-nums">
                    {number}
                  </span>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h4 className="mb-2 font-serif text-base text-foreground/90 lg:text-lg">
                      {item.q}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed lg:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
