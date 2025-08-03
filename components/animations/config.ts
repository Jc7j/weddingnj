export const ANIMATION_CONFIG = {
  pageLoader: {
    minLoadTime: 3000, // Minimum time to show loader
    exitDuration: 1200, // Slide-up animation duration
    initialDelay: 300, // Initial delay before animations start
  },

  durations: {
    short: 300,
    medium: 600,
    long: 1200,
  },

  easing: {
    smooth: 'power2.out',
    bounce: 'back.out(1.7)',
    slide: 'power3.inOut',
  },
} as const
