'use client'

import { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const decorativeImages = [
  {
    id: 'love-story-1',
    desktop: { top: '5%', left: '3%', width: 140, height: 110, rotation: -8 },
    mobile: { top: '3%', left: '2%', width: 80, height: 60, rotation: -5 },
    alt: 'Wedding memory 1',
  },
  {
    id: 'love-story-2',
    desktop: { top: '15%', left: '15%', width: 120, height: 160, rotation: 12 },
    mobile: { top: '8%', left: '15%', width: 70, height: 90, rotation: 8 },
    alt: 'Wedding memory 2',
  },
  {
    id: 'love-story-3',
    desktop: { top: '8%', right: '8%', width: 160, height: 120, rotation: -5 },
    mobile: { top: '5%', right: '5%', width: 90, height: 70, rotation: -3 },
    alt: 'Wedding memory 3',
  },
  {
    id: 'love-story-4',
    desktop: {
      bottom: '15%',
      left: '8%',
      width: 130,
      height: 100,
      rotation: 6,
    },
    mobile: { bottom: '10%', left: '5%', width: 75, height: 60, rotation: 4 },
    alt: 'Wedding memory 4',
  },
  {
    id: 'love-story-5',
    desktop: {
      bottom: '25%',
      right: '2%',
      width: 110,
      height: 140,
      rotation: -10,
    },
    mobile: { bottom: '15%', right: '2%', width: 65, height: 80, rotation: -6 },
    alt: 'Wedding memory 5',
  },
]

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const linkRef = useRef<HTMLParagraphElement>(null)
  const mainImageRef = useRef<HTMLDivElement>(null)
  const decorativeImagesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          paragraphRef.current,
          linkRef.current,
        ],
        {
          opacity: 0,
          y: 50,
        }
      )

      gsap.set(mainImageRef.current, {
        opacity: 0,
        scale: 0.9,
        x: 50,
      })

      gsap.set(decorativeImagesRef.current, {
        opacity: 0,
        scale: 0.8,
        rotation: (i) =>
          (decorativeImages[i]?.desktop.rotation || 0) +
          Math.random() * 20 -
          10,
      })

      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      // Animate decorative images first
      tl.to(decorativeImagesRef.current, {
        opacity: 1,
        scale: 1,
        rotation: (i) => decorativeImages[i]?.desktop.rotation || 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        stagger: {
          amount: 0.8,
          from: 'random',
        },
      })

        // Animate text content
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.6'
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .to(
          paragraphRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .to(
          linkRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )

        // Animate main image
        .to(
          mainImageRef.current,
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=1'
        )

      // Add floating animation to decorative images
      decorativeImagesRef.current.forEach((img) => {
        if (img) {
          gsap.to(img, {
            y: '+=15',
            duration: 3 + Math.random() * 2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 2,
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center overflow-hidden"
      style={{ backgroundColor: '#2B4735' }}
    >
      {/* Decorative Images */}
      {decorativeImages.map((image, index) => (
        <div key={image.id}>
          {/* Desktop Images */}
          <div
            ref={(el) => {
              if (el) decorativeImagesRef.current[index] = el
            }}
            className="absolute hidden lg:block"
            style={{
              top: image.desktop.top,
              bottom: image.desktop.bottom,
              left: image.desktop.left,
              right: image.desktop.right,
              transform: `rotate(${image.desktop.rotation}deg)`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
              style={{
                width: image.desktop.width,
                height: image.desktop.height,
              }}
            >
              <div className="absolute inset-0 animate-pulse bg-white/20" />
              <span className="absolute inset-0 flex items-center justify-center text-white/60 text-xs">
                {image.alt}
              </span>
            </div>
          </div>

          {/* Mobile Images */}
          <div
            className="absolute block opacity-40 lg:hidden"
            style={{
              top: image.mobile.top,
              bottom: image.mobile.bottom,
              left: image.mobile.left,
              right: image.mobile.right,
              transform: `rotate(${image.mobile.rotation}deg)`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-md shadow-lg"
              style={{
                width: image.mobile.width,
                height: image.mobile.height,
              }}
            >
              <div className="absolute inset-0 animate-pulse bg-white/20" />
            </div>
          </div>
        </div>
      ))}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6 py-8 text-white lg:py-0">
            <div className="space-y-4 lg:space-y-6">
              <h2
                ref={titleRef}
                className="font-serif text-3xl text-[#F5E6A3] leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </h2>

              <p
                ref={subtitleRef}
                className="max-w-2xl text-base text-white/90 leading-relaxed sm:text-lg md:text-xl"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <p
              ref={linkRef}
              className="cursor-pointer font-script text-base text-yellow-200 transition-colors hover:text-yellow-100 sm:text-lg"
            >
              – Our Story
            </p>
          </div>

          {/* Right Content - Main Image */}
          <div className="flex items-center justify-center py-8 lg:justify-end lg:py-0">
            <div
              ref={mainImageRef}
              className="relative h-96 w-80 overflow-hidden rounded-2xl shadow-2xl sm:h-[28rem] sm:w-96 lg:h-[500px] lg:w-[400px]"
            >
              <div className="absolute inset-0 animate-pulse bg-white/10" />
              <span className="absolute inset-0 flex items-center justify-center text-sm text-white/60">
                Nicole & James - Main Photo
              </span>

              {/* Optional overlay for better text readability if we had a real image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
