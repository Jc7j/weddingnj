'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import DecorativeBackground from '@/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const storyParts = [
  {
    id: 'part-1',
    chapter: 'Chapter One',
    title: 'The Beginning',
    year: '2019',
    date: 'December 11',
    icon: '💕',
    quote: '"Every love story is beautiful, but ours is my favorite"',
    paragraph:
      "Every love story is unique, and Nicole and James's began in the most natural way. When they first met in 2019, neither of them expected anything more than friendship. But, as with many of life's best surprises, something unexpected began to grow. The more time they spent together, the more they clicked. James was the first to catch feelings and made the bold move to ask Nicole on a date—to Disneyland, no less. On December 11, 2019, their lives became intertwined, and they've been inseparable ever since.",
    image: '/story/1.png',
    bgColor: '#F5E6D3',
    accentColor: '#E6D5F0',
  },
  {
    id: 'part-2',
    chapter: 'Chapter Two',
    title: 'Growing Together',
    year: '2019-2021',
    date: 'The Dating Years',
    icon: '🌹',
    quote: '"Home is wherever I\'m with you"',
    paragraph:
      "When they began dating, laughter quickly became the soundtrack of their days, and with every shared moment, their feelings for each other deepened. James found a true home within Nicole's heart—and she found the same comfort in his. They grew closer than ever, inspiring one another to become the best versions of themselves. Opening their hearts fully, they discovered that together was the coziest place to be. Over time, they became not only partners but best friends, continuously uplifting and bettering each other along the way.",
    image: '/story/2.png',
    bgColor: '#E6D5F0',
    accentColor: '#F0D5D5',
  },
  {
    id: 'part-3',
    chapter: 'Chapter Three',
    title: 'The Proposal',
    year: '2022',
    date: 'May 21',
    icon: '💍',
    quote: '"She said yes!"',
    paragraph:
      "There wasn't one single moment when James knew Nicole was the one—he just had a gut feeling that she was it. By 2021, the idea of proposing had started to take shape, and when James found out that Honne—an artist both he and Nicole deeply love—was coming to L.A., inspiration struck. He decided to take a leap of faith and reached out to the band to ask if they'd help with the proposal. To his surprise, they said yes. On May 21st, 2022, James had invited their closest friends and family to be there. During the concert, he was brought up on stage—and in front of everyone, he asked Nicole to marry him. She was completely shocked... and said yes! The crowd erupted in cheers, and it became a night they'll both remember forever.",
    image: '/story/3.png',
    bgColor: '#F0D5D5',
    accentColor: '#D4E6D5',
  },
  {
    id: 'part-4',
    chapter: 'Chapter Four',
    title: 'Our Next Chapter',
    year: '2025',
    date: 'June 15',
    icon: '🎊',
    quote: '"And so the adventure begins..."',
    paragraph:
      "Fast forward a few years, and Nicole and James are finally ready to celebrate their wedding and begin this exciting new chapter together. More than anything, they're thrilled to share this joyous moment with the people who mean the most to them. They can't wait to see all of your beautiful faces as they celebrate a love that has grown stronger every day. No matter where life has led them, they've always found home in each other — and with your love and support, this next chapter will be the best one yet. From the bottom of their hearts, Nicole and James thank you for being part of their story and this unforgettable celebration.",
    image: '/story/4.png',
    bgColor: '#D4E6D5',
    accentColor: '#F5E6D3',
  },
]

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const currentPart = storyParts[currentPartIndex]

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
    if (currentPartIndex < storyParts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1)
    } else {
      scrollToSection('#wedding-party')
    }
  }

  const goToPrevious = () => {
    if (currentPartIndex > 0) {
      setCurrentPartIndex(currentPartIndex - 1)
    } else {
      scrollToSection('#hero')
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const content = contentRef.current
      if (!section || !content) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '400%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
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

      document.body.style.backgroundColor = storyParts[0].bgColor

      const lenis = (
        window as Window & { lenis?: { on: Function; off: Function } }
      ).lenis
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
      document.body.style.backgroundColor = ''
    }
  }, [])

  useEffect(() => {
    const content = contentRef.current
    const image = imageRef.current
    const decor = decorRef.current
    if (!content || !image) return

    const part = storyParts[currentPartIndex]

    // Animate content change with stagger
    const textElements = content.querySelectorAll('.story-text')
    gsap.to(textElements, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(textElements, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
        })
      },
    })

    // Animate image with scale and rotation
    gsap.to(image, {
      scale: 0.95,
      rotation: -2,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(image, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.8)',
        })
      },
    })

    // Animate decorative elements
    if (decor) {
      gsap.to(decor, {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
      })
    }

    // Update background color with gradient
    gsap.to(document.body, {
      backgroundColor: part.bgColor,
      duration: 0.8,
      ease: 'power2.inOut',
    })
  }, [currentPartIndex])

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: currentPart.bgColor }}
    >
      <DecorativeBackground variant="light" density="sparse" />

      {/* Floating Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div ref={decorRef} className="-left-20 -top-20 absolute opacity-10">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="text-foreground"
          >
            <title>Decorative circle pattern</title>
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="5,5"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="3,7"
            />
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="2,8"
            />
          </svg>
        </div>
        <div className="-bottom-10 -right-10 absolute opacity-10">
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            className="text-foreground"
          >
            <title>Decorative leaf pattern</title>
            <path
              d="M75,30 Q50,50 50,75 T75,120 Q100,100 100,75 T75,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Text Content */}
            <div className="story-content order-2 lg:order-1">
              {/* Chapter Badge */}
              <div className="story-text mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <span className="text-2xl">{currentPart.icon}</span>
                <span className="font-medium text-foreground/70 text-xs tracking-wider">
                  {currentPart.chapter}
                </span>
              </div>

              {/* Title and Date */}
              <div className="story-text mb-6">
                <h2 className="mb-2 font-serif text-4xl text-foreground lg:text-6xl">
                  {currentPart.title}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-foreground/50 text-sm">
                    {currentPart.year}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-foreground/30" />
                  <span className="font-medium text-foreground/50 text-sm">
                    {currentPart.date}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <div className="story-text mb-6 border-foreground/20 border-l-2 pl-4">
                <p className="font-serif text-foreground/60 text-lg italic">
                  {currentPart.quote}
                </p>
              </div>

              {/* Main Paragraph */}
              <p className="story-text text-base text-foreground/80 leading-relaxed lg:text-lg">
                {currentPart.paragraph}
              </p>
            </div>

            {/* Image with Frame */}
            <div className="story-image relative order-1 lg:order-2">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative Frame */}
                <div
                  className="-inset-4 absolute rounded-2xl opacity-20"
                  style={{ backgroundColor: currentPart.accentColor }}
                />
                <div className="-inset-2 absolute rounded-2xl border-2 border-white/30" />

                {/* Main Image Container */}
                <div
                  ref={imageRef}
                  className="relative overflow-hidden rounded-xl shadow-2xl"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={currentPart.image}
                      alt={`${currentPart.title} - ${currentPart.year}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={currentPartIndex === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  {/* Image Label */}
                  <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="font-medium text-sm text-white">
                      Part {currentPartIndex + 1} of 4
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <div className="absolute inset-x-0 bottom-0 z-30 px-6 pb-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Progress Dots */}
          <div className="flex gap-3">
            {storyParts.map((part, index) => (
              <Button
                key={part.id}
                variant="ghost"
                onClick={() => setCurrentPartIndex(index)}
                className={`group relative h-2 p-0 transition-all duration-300 ${
                  index === currentPartIndex ? 'w-12' : 'w-2'
                } overflow-hidden rounded-full ${
                  index === currentPartIndex
                    ? 'bg-foreground/80'
                    : 'bg-foreground/20 hover:bg-foreground/40'
                }`}
                aria-label={`Go to ${part.title}`}
              >
                {index === currentPartIndex && (
                  <div className="absolute inset-0 animate-pulse bg-white/30" />
                )}
              </Button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="group h-12 w-12 rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
              aria-label={
                currentPartIndex === 0
                  ? 'Go to hero section'
                  : 'Previous story part'
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
              className="group h-12 w-12 rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
              aria-label={
                currentPartIndex === storyParts.length - 1
                  ? 'Go to wedding party section'
                  : 'Next story part'
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

      {/* Scroll Hint */}
      {currentPartIndex < storyParts.length - 1 && (
        <div className="-translate-x-1/2 absolute bottom-20 left-1/2 z-30 animate-bounce">
          <div className="flex flex-col items-center text-foreground/40">
            <span className="mb-2 text-xs uppercase tracking-wider">
              Scroll for more
            </span>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Scroll down arrow</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  )
}
