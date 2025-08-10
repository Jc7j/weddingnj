'use client'

import { useEffect, useRef } from 'react'

import DecorativeBackground from '@/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Bed, Car, Globe, MapPin, Phone, Wifi } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Convert PHP to USD (approximate rate: 1 USD = 58 PHP)
const convertToUSD = (pesoRange: string) => {
  const matches = pesoRange.match(/₱([\d,]+)\s*-\s*₱([\d,]+)/)
  if (!matches) return ''
  
  const min = parseInt(matches[1].replace(/,/g, ''))
  const max = parseInt(matches[2].replace(/,/g, ''))
  
  const minUSD = Math.round(min / 58)
  const maxUSD = Math.round(max / 58)
  
  return `$${minUSD} - $${maxUSD}`
}

const hotelFeatures = [
  { icon: Bed, label: 'Comfortable Rooms' },
  { icon: Wifi, label: 'Free Wi-Fi' },
  { icon: Car, label: 'Free Parking' },
]

const nearbyOptions = [
  {
    type: 'Hotels',
    description: 'Several hotels available in Lipa City',
    distance: '20 minutes away',
    priceRange: '₱2,000 - ₱5,000/night',
  },
  {
    type: 'Resorts',
    description: 'Beach resorts in Batangas City',
    distance: '30 minutes away',
    priceRange: '₱3,000 - ₱8,000/night',
  },
  {
    type: 'Airbnb',
    description: 'Local homes and condos near the venue',
    distance: '5-15 minutes away',
    priceRange: '₱1,500 - ₱4,000/night',
  },
]

export default function StaySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const hotelCardRef = useRef<HTMLDivElement>(null)
  const alternativesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        hotelCardRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: hotelCardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const alternativeCards =
        alternativesRef.current?.querySelectorAll('.alternative-card')
      if (alternativeCards) {
        gsap.fromTo(
          alternativeCards,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: alternativesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="stay"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-secondary/10 py-20 lg:py-32"
    >
      <DecorativeBackground variant="light" density="sparse" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className="mb-4 font-medium text-muted-foreground text-xs tracking-[0.3em]">
            ACCOMMODATION
          </p>
          <h2 className="mb-4 font-serif text-4xl text-foreground/90 lg:text-6xl">
            Where you can stay
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            We've arranged special rates at Imelda's Garden Hotel, or explore
            other nearby accommodations that suit your preferences and budget.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Primary Hotel Recommendation */}
          <div ref={hotelCardRef} className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 lg:p-12">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 font-serif text-2xl text-foreground lg:text-3xl">
                      Imelda's Garden Hotel
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      Our recommended accommodation - Same venue as the wedding!
                    </p>

                    <div className="mb-6 space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Cuenca, Batangas, Philippines</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>Contact hotel directly for reservations</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <a
                          href="https://www.facebook.com/p/Imeldas-Garden-Hotel-Restaurant-100054628622162/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline-offset-2 hover:underline"
                        >
                          View on Facebook
                        </a>
                      </div>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-4">
                      {hotelFeatures.map((feature) => (
                        <div
                          key={feature.label}
                          className="flex items-center gap-2"
                        >
                          <feature.icon className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground text-sm">
                            {feature.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg bg-primary/5 p-4">
                      <p className="font-medium text-foreground text-sm">
                        Special Wedding Rate
                      </p>
                      <p className="mt-1 text-muted-foreground text-xs">
                        Mention "Nicole & James Wedding" when booking for
                        special rates
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Accommodations */}
          <div>
            <h3 className="mb-8 text-center font-serif text-2xl text-foreground">
              Alternative Accommodations
            </h3>

            <div ref={alternativesRef} className="grid gap-6 md:grid-cols-3">
              {nearbyOptions.map((option) => (
                <div
                  key={option.type}
                  className="alternative-card rounded-xl bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <h4 className="mb-2 font-semibold text-foreground text-lg">
                    {option.type}
                  </h4>
                  <p className="mb-3 text-muted-foreground text-sm">
                    {option.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">📍</span>
                      <span className="text-muted-foreground">
                        {option.distance}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">💰</span>
                      <span className="text-muted-foreground">
                        {option.priceRange} ({convertToUSD(option.priceRange)})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="mb-4 text-muted-foreground">
                Search for more options on popular booking platforms:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.airbnb.com/s/Cuenca--Batangas--Philippines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-foreground/20 px-4 py-2 text-sm transition-all duration-200 hover:bg-foreground/5"
                >
                  Airbnb
                </a>
                <a
                  href="https://www.booking.com/searchresults.html?ss=Cuenca%2C+Batangas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-foreground/20 px-4 py-2 text-sm transition-all duration-200 hover:bg-foreground/5"
                >
                  Booking.com
                </a>
                <a
                  href="https://www.agoda.com/search?city=18502"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-foreground/20 px-4 py-2 text-sm transition-all duration-200 hover:bg-foreground/5"
                >
                  Agoda
                </a>
              </div>
            </div>
          </div>

          {/* Travel Tip */}
          <div className="mx-auto max-w-2xl rounded-xl bg-accent/10 p-6 text-center">
            <p className="mb-2 font-medium text-lg">💡 Travel Tip</p>
            <p className="text-muted-foreground text-sm">
              Book your accommodation early! May is a beautiful travel season in
              the Philippines. We recommend securing your stay at least 2 months
              in advance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
