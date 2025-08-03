'use client'

import { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ScrollAnimations() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    // RSVP Section Animation - use data attributes for better targeting
    const rsvpElements = document.querySelectorAll('[data-animate="fade-up"]')

    rsvpElements.forEach((element, index) => {
      gsap.set(element, {
        opacity: 0,
        y: 60,
      })

      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: index * 0.2,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    // Parallax effect for elements with data attribute
    const parallaxElements = document.querySelectorAll('[data-parallax]')

    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.getAttribute('data-parallax') || '0.5')

      gsap.to(element, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    // Smooth fade-in for form elements
    const formElements = document.querySelectorAll(
      'input, textarea, button[type="submit"]'
    )

    formElements.forEach((element, index) => {
      gsap.set(element, {
        opacity: 0,
        y: 20,
      })

      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return null
}
