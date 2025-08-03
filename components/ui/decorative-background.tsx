'use client'

import { useEffect, useRef } from 'react'

import { gsap } from 'gsap'

interface DecorativeBackgroundProps {
  variant?: 'light' | 'dark'
  density?: 'sparse' | 'medium' | 'dense'
  className?: string
}

export default function DecorativeBackground({
  variant = 'light',
  density = 'medium',
  className = '',
}: DecorativeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLDivElement[]>([])

  const palmCount = density === 'sparse' ? 2 : density === 'medium' ? 4 : 6
  const flowerCount = density === 'sparse' ? 6 : density === 'medium' ? 10 : 15
  const waveCount = density === 'sparse' ? 1 : density === 'medium' ? 2 : 3

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      elementsRef.current.forEach((element) => {
        if (element) {
          const isPalm = element.classList.contains('palm')
          const isFlower = element.classList.contains('flower')
          const isWave = element.classList.contains('wave')

          if (isPalm) {
            gsap.to(element, {
              rotation: '+=5',
              duration: 6 + Math.random() * 4,
              ease: 'power2.inOut',
              yoyo: true,
              repeat: -1,
              delay: Math.random() * 3,
            })

            gsap.to(element, {
              y: '+=15',
              duration: 8 + Math.random() * 4,
              ease: 'power2.inOut',
              yoyo: true,
              repeat: -1,
              delay: Math.random() * 2,
            })
          }

          if (isFlower) {
            gsap.to(element, {
              opacity: 0.4,
              duration: 3 + Math.random() * 2,
              ease: 'power2.inOut',
              yoyo: true,
              repeat: -1,
              delay: Math.random() * 4,
            })

            gsap.to(element, {
              scale: 0.9,
              rotation: '+=10',
              duration: 4 + Math.random() * 2,
              ease: 'power2.inOut',
              yoyo: true,
              repeat: -1,
              delay: Math.random() * 2,
            })
          }

          if (isWave) {
            gsap.to(element, {
              x: '+=30',
              duration: 12 + Math.random() * 8,
              ease: 'power2.inOut',
              yoyo: true,
              repeat: -1,
              delay: Math.random() * 3,
            })
          }
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const palmColor =
    variant === 'light' ? 'rgba(34, 139, 34, 0.2)' : 'rgba(144, 238, 144, 0.3)'
  const flowerColor =
    variant === 'light'
      ? 'rgba(255, 182, 193, 0.4)'
      : 'rgba(255, 255, 255, 0.5)'
  const waveColor =
    variant === 'light' ? 'rgba(64, 224, 208, 0.2)' : 'rgba(173, 216, 230, 0.3)'

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Palm Fronds */}
      {Array.from({ length: palmCount }).map((_, index) => (
        <div
          key={`palm-${Math.random()}-${index}`}
          ref={(el) => {
            if (el) elementsRef.current.push(el)
          }}
          className="palm absolute"
          style={{
            top: `${Math.random() * 70 + 15}%`,
            left: `${Math.random() * 80 + 10}%`,
            opacity: 0.6 + Math.random() * 0.4,
          }}
        >
          <svg
            width={80 + Math.random() * 60}
            height={100 + Math.random() * 80}
            viewBox="0 0 120 160"
            fill="none"
            aria-hidden="true"
          >
            {/* Palm frond */}
            <path
              d="M60 150 Q45 120, 30 90 Q20 70, 15 50 Q10 30, 20 15 Q30 5, 45 10 Q55 15, 60 25"
              stroke={palmColor}
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M60 150 Q75 120, 90 90 Q100 70, 105 50 Q110 30, 100 15 Q90 5, 75 10 Q65 15, 60 25"
              stroke={palmColor}
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M60 25 Q50 15, 40 5 M60 25 Q70 15, 80 5 M60 45 Q45 35, 30 25 M60 45 Q75 35, 90 25 M60 65 Q40 55, 25 45 M60 65 Q80 55, 95 45"
              stroke={palmColor}
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      ))}

      {/* Tropical Flowers */}
      {Array.from({ length: flowerCount }).map((_, index) => (
        <div
          key={`flower-${Math.random()}-${index}`}
          ref={(el) => {
            if (el) elementsRef.current.push(el)
          }}
          className="flower absolute"
          style={{
            top: `${Math.random() * 90 + 5}%`,
            left: `${Math.random() * 90 + 5}%`,
            opacity: 0.5 + Math.random() * 0.5,
          }}
        >
          <svg
            width={20 + Math.random() * 25}
            height={20 + Math.random() * 25}
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            {/* Hibiscus-style flower */}
            <circle cx="20" cy="20" r="8" fill={flowerColor} />
            <circle cx="20" cy="12" r="6" fill={flowerColor} />
            <circle cx="28" cy="20" r="6" fill={flowerColor} />
            <circle cx="20" cy="28" r="6" fill={flowerColor} />
            <circle cx="12" cy="20" r="6" fill={flowerColor} />
            <circle
              cx="20"
              cy="20"
              r="3"
              fill={
                variant === 'light'
                  ? 'rgba(255, 140, 0, 0.6)'
                  : 'rgba(255, 215, 0, 0.8)'
              }
            />
          </svg>
        </div>
      ))}

      {/* Wave Patterns */}
      {Array.from({ length: waveCount }).map((_, index) => (
        <div
          key={`wave-${Math.random()}-${index}`}
          ref={(el) => {
            if (el) elementsRef.current.push(el)
          }}
          className="wave absolute"
          style={{
            bottom: index === 0 ? '10%' : index === 1 ? '60%' : '80%',
            left: 0,
            right: 0,
            opacity: 0.3 + Math.random() * 0.3,
          }}
        >
          <svg
            width="100%"
            height={30 + Math.random() * 20}
            viewBox="0 0 400 50"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 25 Q100 15, 200 25 Q300 35, 400 25"
              stroke={waveColor}
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0 30 Q100 20, 200 30 Q300 40, 400 30"
              stroke={waveColor}
              strokeWidth="1.5"
              fill="none"
              opacity="0.7"
            />
          </svg>
        </div>
      ))}

      {/* Traditional Filipino Sun Pattern */}
      <div
        ref={(el) => {
          if (el) elementsRef.current.push(el)
        }}
        className="flower absolute"
        style={{
          top: `${20 + Math.random() * 20}%`,
          right: `${10 + Math.random() * 10}%`,
          opacity: 0.15,
        }}
      >
        <svg
          width={60}
          height={60}
          viewBox="0 0 80 80"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="40"
            cy="40"
            r="15"
            fill={
              variant === 'light'
                ? 'rgba(255, 215, 0, 0.3)'
                : 'rgba(255, 255, 0, 0.4)'
            }
          />
          {Array.from({ length: 8 }).map((_, rayIndex) => (
            <line
              key={`ray-${Math.random()}-${rayIndex}`}
              x1="40"
              y1="40"
              x2={40 + 25 * Math.cos((rayIndex * Math.PI) / 4)}
              y2={40 + 25 * Math.sin((rayIndex * Math.PI) / 4)}
              stroke={
                variant === 'light'
                  ? 'rgba(255, 215, 0, 0.4)'
                  : 'rgba(255, 255, 0, 0.5)'
              }
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
