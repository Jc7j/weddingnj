'use client'

import { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const decorativeImages = [
  {
    id: 'love-story-1',
    desktop: { top: '10%', left: '2%', width: 160, height: 120, rotation: -8 },
    mobile: { top: '5%', left: '2%', width: 100, height: 80, rotation: -5 },
    alt: 'First Date Photo',
  },
  {
    id: 'love-story-2',
    desktop: { top: '15%', right: '2%', width: 140, height: 180, rotation: 12 },
    mobile: { top: '3%', right: '3%', width: 90, height: 120, rotation: 8 },
    alt: 'Anniversary Dinner',
  },
  {
    id: 'love-story-3',
    desktop: {
      top: '5%',
      right: '15%',
      width: 180,
      height: 140,
      rotation: -5,
    },
    mobile: { bottom: '40%', left: '5%', width: 110, height: 90, rotation: -3 },
    alt: 'Vacation Together',
  },
  {
    id: 'love-story-4',
    desktop: {
      bottom: '20%',
      left: '3%',
      width: 150,
      height: 120,
      rotation: 6,
    },
    mobile: { bottom: '25%', right: '3%', width: 95, height: 75, rotation: 4 },
    alt: 'Holiday Memories',
  },
  {
    id: 'love-story-5',
    desktop: {
      bottom: '25%',
      right: '3%',
      width: 130,
      height: 160,
      rotation: -10,
    },
    mobile: { bottom: '10%', left: '8%', width: 80, height: 100, rotation: -6 },
    alt: 'Weekend Adventure',
  },
  {
    id: 'love-story-6',
    desktop: { top: '35%', left: '8%', width: 120, height: 100, rotation: 15 },
    mobile: { top: '20%', right: '10%', width: 70, height: 60, rotation: 10 },
    alt: 'Cozy Evening',
  },
  {
    id: 'love-story-7',
    desktop: {
      bottom: '10%',
      right: '18%',
      width: 140,
      height: 110,
      rotation: -12,
    },
    mobile: { bottom: '5%', right: '15%', width: 85, height: 70, rotation: -8 },
    alt: 'Engagement Day',
  },
]

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const decorativeImagesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 50 })
      gsap.set(decorativeImagesRef.current, { opacity: 0, scale: 0.8 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(decorativeImagesRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.7)',
        stagger: 0.2,
      }).to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.6'
      )

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
      className="relative min-h-screen w-full overflow-hidden py-16 lg:py-24"
      style={{ backgroundColor: '#2B4735' }}
    >
      {/* Decorative Images - Only these are absolutely positioned */}
      {decorativeImages.map((image, index) => (
        <div
          key={image.id}
          ref={(el) => {
            if (el) decorativeImagesRef.current[index] = el
          }}
          className="absolute opacity-30 lg:opacity-100"
          style={{
            top: image.desktop.top,
            bottom: image.desktop.bottom,
            left: image.desktop.left,
            right: image.desktop.right,
            zIndex: 1,
          }}
        >
          <div
            className="relative overflow-hidden rounded-lg shadow-xl"
            style={{
              width: `${image.desktop.width}px`,
              height: `${image.desktop.height}px`,
            }}
          >
            <div className="absolute inset-0 animate-pulse bg-white/20" />
            <span className="absolute inset-0 flex items-center justify-center text-white/60 text-xs lg:text-sm">
              {image.alt}
            </span>
          </div>
        </div>
      ))}

      {/* Main Content - Centered and protected from image overlap */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6"
      >
        {/* Text Content */}
        <div className="mb-12 text-center text-white lg:mb-16">
          <h2 className="mb-6 font-serif text-3xl text-[#F5E6A3] leading-tight sm:text-4xl lg:text-5xl xl:text-6xl">
            Our Story
          </h2>

          <div className="mx-auto max-w-4xl space-y-6 text-base text-white/90 leading-relaxed sm:text-lg lg:mx-0 lg:text-xl">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim,
              vitae porta erat erat nec urna. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Mauris dictum, enim at dictum placerat, enim urna facilisis
              lectus, nec dictum enim urna at erat.
            </p>

            <p>
              Etiam euismod, justo at facilisis cursus, enim urna tincidunt
              enim, vitae dictum enim urna at enim. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed
              non neque elit. Sed ut imperdiet nisi.
            </p>

            <p>
              Integer facilisis, enim at dictum placerat, enim urna facilisis
              lectus, nec dictum enim urna at erat. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Suspendisse potenti. Etiam euismod, justo at facilisis cursus,
              enim urna tincidunt enim, vitae dictum enim urna at enim.
            </p>

            <p>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae; Proin vel ante a orci tempus eleifend ut et
              magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas.
            </p>
          </div>

          <p className="mt-8 cursor-pointer font-script text-lg text-yellow-200 transition-colors hover:text-yellow-100">
            – Share Our Joy, May 21st, 2026
          </p>
        </div>

        {/* Main Image */}
        <div className="flex justify-center">
          <div className="relative h-96 w-80 overflow-hidden rounded-2xl shadow-2xl sm:h-[28rem] sm:w-96 lg:h-[500px] lg:w-[400px]">
            <div className="absolute inset-0 animate-pulse bg-white/10" />
            <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-white/60">
              Nicole & James
              <br />
              Engagement Photo
              <br />
              <span className="mt-2 block text-xs">
                Mountain Summit, Fall 2022
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
