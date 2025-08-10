'use client'

import { useEffect, useRef } from 'react'

import { ANIMATION_CONFIG } from './config'

import { gsap } from 'gsap'

interface PageLoaderProps {
  onComplete: () => void
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const envelopeRef = useRef<SVGSVGElement>(null)
  const flapRef = useRef<SVGPathElement>(null)
  const sealRef = useRef<SVGCircleElement>(null)
  const cardRef = useRef<SVGGElement>(null)
  const cardTextRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setTimeout(onComplete, 500)
      return
    }

    const completeCallback = onComplete

    // Set initial states
    gsap.set(envelopeRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 20,
    })
    gsap.set(flapRef.current, {
      transformOrigin: 'center top',
    })
    gsap.set(sealRef.current, {
      scale: 1,
      opacity: 1,
    })
    gsap.set(cardRef.current, {
      y: 0,
      opacity: 0,
    })
    gsap.set(cardTextRef.current, {
      opacity: 0,
    })

    // Create main animation timeline
    const tl = gsap.timeline({
      delay: ANIMATION_CONFIG.pageLoader.initialDelay / 1000,
      onComplete: () => {
        completeCallback()

        // Exit animation - entire loader fades and moves up
        gsap.to(loaderRef.current, {
          opacity: 0,
          y: -50,
          duration: ANIMATION_CONFIG.pageLoader.exitDuration / 1000,
          ease: ANIMATION_CONFIG.easing.slide,
        })
      },
    })

    // Animation sequence
    tl.to(envelopeRef.current, {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
      // Break the seal
      .to(
        sealRef.current,
        {
          scale: 1.2,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        },
        '+=0.3'
      )
      // Open the flap
      .to(
        flapRef.current,
        {
          rotationX: -180,
          duration: 0.8,
          ease: 'power2.inOut',
          transformPerspective: 800,
        },
        '-=0.2'
      )
      // Reveal the card - slide it up and out of the envelope
      .to(
        cardRef.current,
        {
          y: -250,
          scale: 1.08,
          opacity: 1,
          duration: 1.0,
          ease: 'back.out(1.2)',
        },
        '-=0.4'
      )
      // Show card text with stagger effect
      .to(
        cardTextRef.current,
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      .to({}, { duration: 0.8 })

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

      <svg
        ref={envelopeRef}
        className="relative z-10 w-80 md:w-96 lg:w-[420px] xl:w-[480px]"
        viewBox="0 0 320 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ perspective: '800px', overflow: 'visible' }}
        aria-label="Wedding invitation envelope animation"
      >
        {/* Envelope shadow */}
        <ellipse
          cx="160"
          cy="320"
          rx="100"
          ry="10"
          fill="#000000"
          opacity="0.1"
        />

        {/* Envelope body */}
        <path
          d="M40 180 L280 180 L280 300 L40 300 Z"
          fill="#FFF9F0"
          stroke="#E6D5F0"
          strokeWidth="2"
        />

        {/* Inner shadow for depth */}
        <path
          d="M40 180 L280 180 L280 300 L40 300 Z"
          fill="url(#envelopeGradient)"
          opacity="0.3"
        />

        {/* Card inside envelope */}
        <g ref={cardRef}>
          <rect
            x="60"
            y="220"
            width="200"
            height="120"
            rx="4"
            fill="#FFFFFF"
            stroke="#F0D5D5"
            strokeWidth="1"
          />
          <g ref={cardTextRef}>
            <text
              x="160"
              y="255"
              textAnchor="middle"
              className="fill-[#8B5A5A]"
              style={{
                fontSize: '22px',
                fontFamily: 'serif',
                fontWeight: 'bold',
              }}
            >
              You're Invited
            </text>
            <text
              x="160"
              y="280"
              textAnchor="middle"
              className="fill-[#6B5B73]"
              style={{ fontSize: '16px', fontFamily: 'sans-serif' }}
            >
              Nicole & James
            </text>
            <text
              x="160"
              y="305"
              textAnchor="middle"
              className="fill-[#6B5B73]"
              style={{ fontSize: '14px', fontFamily: 'sans-serif' }}
            >
              May 21st, 2026
            </text>
          </g>
        </g>

        {/* Envelope flap (will rotate) */}
        <path
          ref={flapRef}
          d="M40 180 L160 240 L280 180 Z"
          fill="#FFF9F0"
          stroke="#E6D5F0"
          strokeWidth="2"
        />

        {/* Wax seal */}
        <circle
          ref={sealRef}
          cx="160"
          cy="210"
          r="25"
          fill="#8B5A5A"
          stroke="#6B5B73"
          strokeWidth="1"
        />
        <text
          x="160"
          y="215"
          textAnchor="middle"
          className="pointer-events-none fill-white"
          style={{ fontSize: '16px', fontFamily: 'serif' }}
        >
          N&J
        </text>

        {/* Gradients */}
        <defs>
          <linearGradient
            id="envelopeGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#E6D5F0" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
