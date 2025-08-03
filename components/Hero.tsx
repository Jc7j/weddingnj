'use client'

import { Button } from '~/components/ui/button'

const imagePositions = [
  {
    id: 'decoration-1',
    desktop: { top: '10%', left: '5%', width: 200, height: 250, rotation: -5 },
    mobile: { top: '8%', left: '2%', width: 120, height: 150, rotation: -3 },
    alt: 'Wedding decoration',
  },
  {
    id: 'floral-1',
    desktop: { top: '5%', right: '8%', width: 180, height: 220, rotation: 3 },
    mobile: { top: '5%', right: '2%', width: 100, height: 130, rotation: 2 },
    alt: 'Floral arrangement',
  },
  {
    id: 'venue-1',
    desktop: {
      bottom: '15%',
      left: '3%',
      width: 220,
      height: 180,
      rotation: -3,
    },
    mobile: { bottom: '25%', left: '1%', width: 110, height: 90, rotation: -2 },
    alt: 'Wedding venue',
  },
  {
    id: 'sunset-1',
    desktop: {
      bottom: '10%',
      right: '5%',
      width: 240,
      height: 200,
      rotation: 5,
    },
    mobile: {
      bottom: '20%',
      right: '1%',
      width: 120,
      height: 100,
      rotation: 3,
    },
    alt: 'Sunset view',
  },
  {
    id: 'arch-1',
    desktop: { top: '50%', left: '12%', width: 160, height: 200, rotation: -8 },
    mobile: { top: '60%', left: '5%', width: 80, height: 100, rotation: -5 },
    alt: 'Wedding arch',
  },
  {
    id: 'garden-1',
    desktop: { top: '45%', right: '15%', width: 170, height: 210, rotation: 7 },
    mobile: { top: '55%', right: '5%', width: 85, height: 110, rotation: 4 },
    alt: 'Garden setting',
  },
]

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {imagePositions.map((position) => (
        <div key={position.id}>
          {/* Desktop Images */}
          <div
            className="absolute hidden lg:block"
            style={{
              top: position.desktop.top,
              bottom: position.desktop.bottom,
              left: position.desktop.left,
              right: position.desktop.right,
              transform: `rotate(${position.desktop.rotation}deg)`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              style={{
                width: position.desktop.width,
                height: position.desktop.height,
              }}
            >
              <div className="absolute inset-0 animate-pulse bg-muted" />
              <span className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
                {position.alt}
              </span>
            </div>
          </div>

          {/* Mobile Images */}
          <div
            className="absolute block opacity-60 lg:hidden"
            style={{
              top: position.mobile.top,
              bottom: position.mobile.bottom,
              left: position.mobile.left,
              right: position.mobile.right,
              transform: `rotate(${position.mobile.rotation}deg)`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-md shadow-md transition-transform duration-300"
              style={{
                width: position.mobile.width,
                height: position.mobile.height,
              }}
            >
              <div className="absolute inset-0 animate-pulse bg-muted" />
              <span className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
                {position.alt}
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="mb-8 space-y-2">
          <div className="flex items-center justify-center gap-4 text-lg text-muted-foreground tracking-[0.3em]">
            <span>05</span>
            <span className="text-2xl">.</span>
            <span>21</span>
            <span className="text-2xl">.</span>
            <span>2026</span>
          </div>
        </div>

        <h1 className="mb-6 font-serif text-6xl text-primary tracking-wider md:text-8xl lg:text-9xl">
          NICOLE & JAMES
        </h1>

        <p
          className="mb-12 font-light text-3xl text-muted-foreground italic md:text-4xl"
          style={{ fontFamily: 'serif' }}
        >
          Philippines
        </p>

        <Button size="lg" className="px-8">
          RSVP
        </Button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
