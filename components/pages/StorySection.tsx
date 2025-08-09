'use client'

import { useEffect, useRef, useState } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const storyParts = [
  {
    id: 'part-1',
    title: 'The Beginning:',
    paragraph:
      "Every love story is unique, and Nicole and James's began in the most natural way. When they first met in 2019, neither of them expected anything more than friendship. But, as with many of life’s best surprises, something unexpected began to grow. The more time they spent together, the more they clicked. James was the first to catch feelings and made the bold move to ask Nicole on a date—to Disneyland, no less. On December 11, 2019, their lives became intertwined, and they’ve been inseparable ever since.  ",
    image: '/images/story-1.jpg',
    bgImage: '/images/bg-1.jpg',
    bgColor: '#2B4735',
  },
  {
    id: 'part-2',
    title: 'The Dating Chapter:',
    paragraph:
      'When they began dating, laughter quickly became the soundtrack of their days, and with every shared moment, their feelings for each other deepened. James found a true home within Nicole’s heart—and she found the same comfort in his. They grew closer than ever, inspiring one another to become the best versions of themselves. Opening their hearts fully, they discovered that together was the coziest place to be. Over time, they became not only partners but best friends, continuously uplifting and bettering each other along the way.',
    image: '/images/story-2.jpg',
    bgImage: '/images/bg-2.jpg',
    bgColor: '#3A5147',
  },
  {
    id: 'part-3',
    title: 'The Engagement: ',
    paragraph:
      'There wasn’t one single moment when James knew Nicole was the one—he just had a gut feeling that she was it. By 2021, the idea of proposing had started to take shape, and when James found out that Honne—an artist both he and Nicole deeply love—was coming to L.A., inspiration struck. He decided to take a leap of faith and reached out to the band to ask if they’d help with the proposal. To his surprise, they said yes. On May 21st. 2022, James had invited their closest friends and family to be there. During the concert, he was brought up on stage—and in front of everyone, he asked Nicole to marry him. She was completely shocked... and said yes! The crowd erupted in cheers, and it became a night they’ll both remember forever.',
    image: '/images/story-3.jpg',
    bgImage: '/images/bg-3.jpg',
    bgColor: '#4A6157',
  },
  {
    id: 'part-4',
    title: 'Where Are They Now: ',
    paragraph:
      'Fast forward a few years, and Nicole and James are finally ready to celebrate their wedding and begin this exciting new chapter together. More than anything, they’re thrilled to share this joyous moment with the people who mean the most to them. They can’t wait to see all of your beautiful faces as they celebrate a love that has grown stronger every day. No matter where life has led them, they’ve always found home in each other — and with your love and support, this next chapter will be the best one yet. From the bottom of their hearts, Nicole and James thank you for being part of their story and this unforgettable celebration.',
    image: '/images/story-4.jpg',
    bgImage: '/images/bg-4.jpg',
    bgColor: '#5A7167',
  },
]

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const currentPart = storyParts[currentPartIndex]

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const content = contentRef.current
      const bg = bgRef.current
      if (!section || !content || !bg) return

      const isMobile = window.innerWidth < 768

      // Create a timeline for smoother control
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '400%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Calculate which part should be showing based on progress
            const progress = self.progress
            let targetIndex = 0

            if (progress <= 0.25) {
              targetIndex = 0
            } else if (progress <= 0.5) {
              targetIndex = 1
            } else if (progress <= 0.75) {
              targetIndex = 2
            } else {
              targetIndex = 3
            }

            setCurrentPartIndex(targetIndex)
          },
        },
      })

      timelineRef.current = tl

      // Parallax effect for background
      gsap.to(bg, {
        y: isMobile ? '15%' : '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '400%',
          scrub: 1,
        },
      })

      // Set initial background
      bg.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${storyParts[0].bgImage}')`
      document.body.style.backgroundColor = storyParts[0].bgColor

      // Connect with Lenis for smooth scrolling
      const lenis = (window as { lenis?: any }).lenis
      if (lenis) {
        const handleScroll = () => ScrollTrigger.update()
        lenis.on('scroll', handleScroll)

        // Cleanup function to remove Lenis listener
        return () => {
          lenis.off('scroll', handleScroll)
        }
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      document.body.style.backgroundColor = ''
    }
  }, [])

  // Handle content and background transitions when currentPartIndex changes
  useEffect(() => {
    const content = contentRef.current
    const bg = bgRef.current
    if (!content || !bg) return

    const part = storyParts[currentPartIndex]

    // Animate content change
    gsap.to(content, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      },
    })

    // Update background color
    gsap.to(document.body, {
      backgroundColor: part.bgColor,
      duration: 0.5,
      ease: 'power2.inOut',
    })

    // Crossfade background image
    gsap.to(bg, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        bg.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${part.bgImage}')`
        gsap.to(bg, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        })
      },
    })
  }, [currentPartIndex])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: currentPart.bgColor }}
    >
      {/* Single Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          filter: 'blur(2px)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

      {/* Single Content Container */}
      <div className="relative z-20 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-6 md:gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Text Content */}
            <div className="order-2 text-white lg:order-1">
              <h2 className="mb-1 font-serif text-[#F5E6A3] text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                Part {currentPartIndex + 1}
              </h2>
              <h3 className="mb-3 font-serif text-3xl text-white leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {currentPart.title}
              </h3>
              <p className="text-base text-white/90 leading-relaxed sm:text-lg md:text-xl lg:text-2xl">
                {currentPart.paragraph}
              </p>
            </div>

            {/* Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative mx-auto aspect-[4/3] max-w-sm overflow-hidden rounded-xl shadow-2xl sm:aspect-[3/4] sm:rounded-2xl lg:max-w-none">
                <div className="absolute inset-0 animate-pulse bg-white/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center p-4 text-center text-lg text-white/60 sm:text-xl lg:text-2xl">
                  Story Image {currentPartIndex + 1}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="-translate-x-1/2 absolute bottom-8 left-1/2 z-30 animate-bounce">
        <div className="flex flex-col items-center text-white/70">
          <span className="mb-2 text-sm uppercase tracking-wider">
            Scroll{' '}
            {currentPartIndex < storyParts.length - 1 ? 'Down' : 'to Continue'}
          </span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-label="Scroll down arrow"
            role="img"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="-translate-x-1/2 absolute top-8 left-1/2 z-30 flex gap-2">
        {storyParts.map((part) => (
          <div
            key={part.id}
            className={`h-1 w-12 rounded-full transition-all duration-300 ${
              part.id === storyParts[currentPartIndex].id
                ? 'bg-white'
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
