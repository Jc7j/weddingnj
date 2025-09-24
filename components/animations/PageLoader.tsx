'use client'

import { useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'

interface PageLoaderProps {
  onComplete: () => void
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const [textChars, setTextChars] = useState<HTMLSpanElement[]>([])

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsMobile(mobile)
      setIsTouchDevice(touch)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Framer Motion springs for smooth mouse tracking
  const mouseX = useSpring(0, { stiffness: 100, damping: 15 })
  const mouseY = useSpring(0, { stiffness: 100, damping: 15 })

  // Transform values for parallax layers
  const bgX = useTransform(mouseX, [-1, 1], [-20, 20])
  const bgY = useTransform(mouseY, [-1, 1], [-20, 20])
  const textX = useTransform(mouseX, [-1, 1], [-10, 10])
  const textY = useTransform(mouseY, [-1, 1], [-10, 10])

  // Split text into individual characters
  useEffect(() => {
    if (textContainerRef.current) {
      const text = "You're Invited"
      const chars: HTMLSpanElement[] = []
      textContainerRef.current.innerHTML = ''

      text.split('').forEach((char) => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        chars.push(span)
        textContainerRef.current?.appendChild(span)
      })

      setTextChars(chars)
    }
  }, [])

  // Mouse tracking (disabled on touch devices)
  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, isTouchDevice])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setTimeout(onComplete, 500)
      return
    }

    if (textChars.length === 0) return

    // Create floating particles
    const createParticles = () => {
      if (!particlesRef.current) return

      const particleCount = isMobile ? 12 : 30
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute rounded-full'
        const size = gsap.utils.random(2, 6)
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.left = `${gsap.utils.random(0, 100)}%`
        particle.style.top = `${gsap.utils.random(0, 100)}%`
        particle.style.background = gsap.utils.random([
          'rgba(230, 213, 240, 0.6)',
          'rgba(212, 230, 213, 0.6)',
          'rgba(240, 213, 213, 0.5)',
          'rgba(213, 224, 230, 0.5)',
        ])
        particlesRef.current.appendChild(particle)
      }
    }

    createParticles()

    // GSAP Timeline - Total duration under 2 seconds
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          scale: 0.95,
          filter: 'blur(10px)',
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete,
        })
      },
    })

    // Initial setup
    gsap.set(textChars, {
      y: 100,
      opacity: 0,
      scale: 0,
      rotation: () => gsap.utils.random(isMobile ? -90 : -180, isMobile ? 90 : 180),
    })

    // Particle floating animation (background) - limited duration
    const particleAnimation = gsap.to(particlesRef.current?.children || [], {
      y: () => gsap.utils.random(-200, -100),
      x: () => gsap.utils.random(-50, 50),
      opacity: () => gsap.utils.random(0.3, 0.8),
      scale: () => gsap.utils.random(0.5, 1.5),
      duration: 2,
      ease: 'none',
      repeat: 1,
      yoyo: true,
      stagger: {
        each: 0.05,
        from: 'random',
      },
    })

    // Main animation sequence
    tl
      // Characters explosion entrance (0-0.8s)
      .to(
        textChars,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: isMobile ? 0.5 : 0.6,
          ease: 'back.out(2)',
          stagger: {
            each: 0.03,
            from: 'center',
          },
        },
        0
      )
      // Subtle pulse on complete (1-1.5s)
      .to(
        textChars,
        {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.inOut',
          stagger: {
            each: 0.01,
            from: 'center',
            yoyo: true,
            repeat: 1,
          },
        },
        1
      )
      // Hold for a moment
      .to({}, { duration: 0.2 })

    return () => {
      tl.kill()
      particleAnimation?.kill()
    }
  }, [onComplete, textChars, isMobile])

  return (
    <AnimatePresence>
      <motion.div
        ref={loaderRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Dynamic gradient background with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: bgX,
            y: bgY,
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(230, 213, 240, 0.4) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(212, 230, 213, 0.4) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(240, 213, 213, 0.3) 0%, transparent 70%),
              linear-gradient(135deg, #F5E6D3 0%, #E6D5F0 25%, #D4E6D5 50%, #F0D5D5 75%, #D5E0E6 100%)
            `,
          }}
        />

        {/* Animated particles */}
        <div
          ref={particlesRef}
          className="pointer-events-none absolute inset-0"
        />

        {/* Main content with Framer Motion */}
        <motion.div
          className="relative z-10 text-center"
          style={{ x: textX, y: textY }}
        >
          {/* Main text with GSAP animation */}
          <div
            ref={textContainerRef}
            className={`text-center ${isMobile ? 'mb-2' : 'mb-6'}`}
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: isMobile ? 'clamp(2.5rem, 10vw, 5rem)' : 'clamp(3rem, 10vw, 10rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              ...(isMobile || isTouchDevice ? {
                // Mobile fallback: solid color for better compatibility
                color: '#3A3A3A',
                textShadow: '0 2px 8px rgba(230, 213, 240, 0.4)',
              } : {
                // Desktop: premium gradient effect
                color: 'transparent',
                background: 'linear-gradient(135deg, #3A3A3A 0%, #6B5B73 50%, #3A3A3A 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                textShadow: '0 0 40px rgba(230, 213, 240, 0.3)',
                filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))',
              })
            }}
          />
        </motion.div>

        {/* Animated overlay patterns */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.03) 10px,
                rgba(255,255,255,0.03) 20px
              )
            `,
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
