'use client'

import { useEffect, useRef } from 'react'

import { ANIMATION_CONFIG } from './config'

import { gsap } from 'gsap'

interface PageLoaderProps {
  onComplete: () => void
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Skip animation for users who prefer reduced motion
      setTimeout(onComplete, 500)
      return
    }

    // Store callback in ref to avoid dependency issues
    const completeCallback = onComplete

    // Set initial states immediately
    gsap.set([titleRef.current, dateRef.current, progressRef.current], {
      opacity: 0,
      y: 30,
    })
    gsap.set(progressBarRef.current, { scaleX: 0 })

    // Create main animation timeline
    const tl = gsap.timeline({
      delay: ANIMATION_CONFIG.pageLoader.initialDelay / 1000,
      onComplete: () => {
        // Start exit animation and immediately trigger content reveal
        completeCallback()

        // Exit animation
        gsap.to(loaderRef.current, {
          y: '-100%',
          duration: ANIMATION_CONFIG.pageLoader.exitDuration / 1000,
          ease: ANIMATION_CONFIG.easing.slide,
        })
      },
    })

    // Animation sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: ANIMATION_CONFIG.easing.smooth,
    })
      .to(
        dateRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: ANIMATION_CONFIG.easing.smooth,
        },
        '-=0.3'
      )
      .to(
        progressRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: ANIMATION_CONFIG.easing.smooth,
        },
        '-=0.2'
      )
      .to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: 1.8,
          ease: 'power2.inOut',
        },
        '-=0.3'
      )
      .to({}, { duration: 0.3 })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#F5E6D3] to-[#E6D5F0]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="-top-40 -right-40 absolute h-80 w-80 rounded-full bg-[#D4E6D5] opacity-20 blur-3xl" />
        <div className="-bottom-40 -left-40 absolute h-80 w-80 rounded-full bg-[#F0D5D5] opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        <div ref={titleRef} className="mb-6">
          <h1 className="font-serif text-6xl text-[#3A3A3A] leading-none md:text-8xl">
            You're <span className="text-[#8B5A5A]">Invited</span>
          </h1>
        </div>
        <div ref={dateRef} className="mb-12">
          <p className="font-light text-[#6B5B73] text-xl tracking-wide md:text-2xl">
            May 21st, 2026
          </p>
        </div>

        <div ref={progressRef} className="mx-auto w-64">
          <div className="relative h-px overflow-hidden rounded-full bg-[#3A3A3A] bg-opacity-20">
            <div
              ref={progressBarRef}
              className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-[#8B5A5A] to-[#6B5B73]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
