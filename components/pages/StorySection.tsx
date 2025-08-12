'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import DecorativeBackground from '@/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const storyParts = [
  {
    id: 'part-1',
    title: 'The Beginning',
    quote: '"Every love story is beautiful, but ours is my favorite"',
    paragraph:
      "Every love story is unique, and Nicole and James's began in the most natural way. When they first met in 2019, neither of them expected anything more than friendship. But, as with many of life's best surprises, something unexpected began to grow. The more time they spent together, the more they clicked. James was the first to catch feelings and made the bold move to ask Nicole on a date—to Disneyland, no less. On December 11, 2019, their lives became intertwined, and they've been inseparable ever since.",
    image: '/story/1.png',
    bgColor: '#F5E6D3',
    accentColor: '#E6D5F0',
  },
  {
    id: 'part-2',
    title: 'Growing Together',
    quote: '"Home is wherever I\'m with you"',
    paragraph:
      "When they began dating, laughter quickly became the soundtrack of their days, and with every shared moment, their feelings for each other deepened. James found a true home within Nicole's heart—and she found the same comfort in his. They grew closer than ever, inspiring one another to become the best versions of themselves. Opening their hearts fully, they discovered that together was the coziest place to be. Over time, they became not only partners but best friends, continuously uplifting and bettering each other along the way.",
    image: '/story/2.png',
    bgColor: '#E6D5F0',
    accentColor: '#F0D5D5',
  },
  {
    id: 'part-3',
    title: 'The Proposal',
    quote: '"She said yes!"',
    paragraph:
      "There wasn't one single moment when James knew Nicole was the one—he just had a gut feeling that she was it. By 2021, the idea of proposing had started to take shape, and when James found out that Honne—an artist both he and Nicole deeply love—was coming to L.A., inspiration struck. He decided to take a leap of faith and reached out to the band to ask if they'd help with the proposal. To his surprise, they said yes. On May 21st, 2022, James had invited their closest friends and family to be there. During the concert, he was brought up on stage—and in front of everyone, he asked Nicole to marry him. She was completely shocked... and said yes! The crowd erupted in cheers, and it became a night they'll both remember forever.",
    image: '/story/3.png',
    bgColor: '#F0D5D5',
    accentColor: '#D4E6D5',
  },
  {
    id: 'part-4',
    title: 'Our Next Chapter',
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
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const isTransitioning = useRef(false)

  const currentPart = storyParts[currentPartIndex]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: element,
          offsetY: 0,
        },
        ease: 'power2.inOut',
      })
    }
  }

  const goToNext = () => {
    if (isTransitioning.current) return
    if (currentPartIndex < storyParts.length - 1) {
      isTransitioning.current = true
      setCurrentPartIndex(currentPartIndex + 1)
      setTimeout(() => {
        isTransitioning.current = false
      }, 500)
    } else {
      scrollToSection('#wedding-party')
    }
  }

  const goToPrevious = () => {
    if (isTransitioning.current) return
    if (currentPartIndex > 0) {
      isTransitioning.current = true
      setCurrentPartIndex(currentPartIndex - 1)
      setTimeout(() => {
        isTransitioning.current = false
      }, 500)
    } else {
      scrollToSection('#hero')
    }
  }

  // Set initial background color
  useEffect(() => {
    document.body.style.backgroundColor = storyParts[0].bgColor
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [])

  // Animate content transitions
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const content = contentRef.current
    const image = imageRef.current
    if (!content || !image) return

    const part = storyParts[currentPartIndex]

    // Simple fade transition for text
    const textElements = content.querySelectorAll('.story-text')
    gsap.fromTo(
      textElements,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      }
    )

    // Simple scale animation for image
    gsap.fromTo(
      image,
      { scale: 0.98, opacity: 0.8 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }
    )

    // Update background color
    gsap.to(document.body, {
      backgroundColor: part.bgColor,
      duration: 0.6,
      ease: 'power2.inOut',
    })
  }, [currentPartIndex])

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: currentPart.bgColor }}
    >
      <DecorativeBackground variant="light" density="sparse" />

      {/* Simple Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="-left-20 -top-20 absolute opacity-5">
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
            />
          </svg>
        </div>
        <div className="-bottom-10 -right-10 absolute opacity-5">
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
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div ref={contentRef} className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Text Content */}
            <div className="story-content order-2 lg:order-1">
              {/* Title */}
              <div className="story-text mb-4 sm:mb-6">
                <h2 className="mb-2 font-serif text-2xl text-foreground sm:text-4xl lg:text-6xl">
                  {currentPart.title}
                </h2>
              </div>

              {/* Quote */}
              <div className="story-text mb-4 border-foreground/20 border-l-2 pl-4 sm:mb-6">
                <p className="font-serif text-foreground/60 text-sm italic sm:text-lg">
                  {currentPart.quote}
                </p>
              </div>

              {/* Main Paragraph */}
              <p className="story-text text-base text-foreground/80 leading-relaxed sm:text-base lg:text-lg">
                {currentPart.paragraph}
              </p>
            </div>

            {/* Image with Frame */}
            <div className="gstory-image relative order-1 lg:order-2">
              <div className="relative mx-auto max-w-[240px] sm:max-w-sm lg:max-w-none">
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
                  <div className="relative aspect-[4/3] sm:aspect-[3/4]">
                    <Image
                      src={currentPart.image}
                      alt={currentPart.title}
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

        {/* Navigation - Responsive for all devices */}
        <div className="mt-12">
          <div className="flex items-center justify-center gap-6 sm:gap-12">
            {/* Progress Dots */}
            <div className="flex gap-3">
              {storyParts.map((part, index) => (
                <Button
                  key={part.id}
                  variant="ghost"
                  onClick={() => {
                    if (!isTransitioning.current) {
                      isTransitioning.current = true
                      setCurrentPartIndex(index)
                      setTimeout(() => {
                        isTransitioning.current = false
                      }, 500)
                    }
                  }}
                  className={`group relative h-2 p-0 transition-all duration-300 ${
                    index === currentPartIndex ? 'w-12' : 'w-2'
                  } overflow-hidden rounded-full ${
                    index === currentPartIndex
                      ? 'bg-foreground/80'
                      : 'bg-foreground/20 hover:bg-foreground/40'
                  }`}
                  aria-label={`Go to ${part.title}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="group h-11 w-11 rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white sm:h-12 sm:w-12"
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
                className="group h-11 w-11 rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white sm:h-12 sm:w-12"
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
      </div>
    </section>
  )
}
