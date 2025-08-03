'use client'

import { useEffect, useRef, useState } from 'react'

import { ANIMATION_CONFIG } from './config'

export function usePageLoad() {
  const [showLoader, setShowLoader] = useState(true)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const minLoadTime = ANIMATION_CONFIG.pageLoader.minLoadTime

    const checkPageReady = () => {
      const elapsed = Date.now() - startTimeRef.current
      const remainingTime = Math.max(0, minLoadTime - elapsed)

      // Wait for minimum load time before starting exit
      if (remainingTime > 0) {
        setTimeout(checkPageReady, remainingTime)
      }
    }

    // Start checking when page loads
    if (document.readyState === 'complete') {
      checkPageReady()
    } else {
      window.addEventListener('load', checkPageReady)
      return () => window.removeEventListener('load', checkPageReady)
    }
  }, [])

  const handleLoaderComplete = () => {
    // Remove loader from DOM after exit animation
    setTimeout(() => {
      setShowLoader(false)
    }, ANIMATION_CONFIG.pageLoader.exitDuration)
  }

  return {
    showLoader,
    handleLoaderComplete,
  }
}
