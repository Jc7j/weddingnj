'use client'

import { useEffect, useRef } from 'react'

import DecorativeBackground from '@/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const accommodations = [
  {
    name: 'Joane Suites by Hotel Cara',
    pricePerNight: 47,
    priceCategory: '$',
    driveTime: '30 minutes (depends on traffic)',
    distance: '9.2 miles from venue',
    airportTime: '1 hour 15 minutes from International Airport',
    description: 'Decent for price, mid looking hotel',
    link: 'https://www.google.com/travel/search?q=imelda%27s%20garden%20cuenca&g2lb=4965990%2C72317059%2C72414906%2C72471280%2C72472051%2C72485658%2C72560029%2C72573224%2C72616120%2C72647020%2C72686036%2C72803964%2C72882230%2C72958624%2C72959983%2C73053698%2C73059275%2C73064764%2C73107089%2C73125229%2C73127086%2C73148426&hl=en-US&gl=us&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaaQpLEkcKDS9nLzExc2RweXptOWwyJTB4MzNiZDBkNWNkMmZlYjVmZDoweDFlYmRlYThjMTQyYzU1OTA6D0ltZWxkYSdzIEdhcmRlbhoAEhoSFAoHCOoPEAUYFBIHCOoPEAUYFhgCMgIIASoJCgU6A1VTRBoA&qs=CAEgASgAMihDaG9JNUs2a29JZW5pclNzQVJvTkwyY3ZNVEY1Tlhaa05USm5heEFCOA1IAA&ap=KigKEgneHkLfIdMrQBHMy2E_WUdeQBISCTox7a1B9ytAEczLYScRTV5AMABIAWgBugEIb3ZlcnZpZXc&ictx=111&ved=0CAAQ5JsGahcKEwjwgPHK69yQAxUAAAAAHQAAAAAQBA',
    type: 'hotel',
  },
  {
    name: 'Solano Hotel',
    pricePerNight: 78,
    priceCategory: '$',
    driveTime: '45 minutes (depends on traffic)',
    distance: '9.3 miles from venue',
    airportTime: '1 hour 20 minutes from International Airport',
    description: 'Nice looking hotel',
    link: 'https://www.google.com/travel/search?q=imelda%27s%20garden%20cuenca&g2lb=4965990%2C72317059%2C72414906%2C72471280%2C72472051%2C72485658%2C72560029%2C72573224%2C72616120%2C72647020%2C72686036%2C72803964%2C72882230%2C72958624%2C72959983%2C73053698%2C73059275%2C73064764%2C73107089%2C73125229%2C73127086%2C73148426&hl=en-US&gl=us&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaaQpLEkcKDS9nLzExc2RweXptOWwyJTB4MzNiZDBkNWNkMmZlYjVmZDoweDFlYmRlYThjMTQyYzU1OTA6D0ltZWxkYSdzIEdhcmRlbhoAEhoSFAoHCOoPEAUYFBIHCOoPEAUYFhgCMgIIASoJCgU6A1VTRBoA&qs=CAEgASgAMidDaGtJMi1UZWhJakR2dEU4R2cwdlp5OHhNVzVzWW5GM1gzaDRFQUU4DUgA&ap=KigKEgn55LyaIsMrQBHMy2EP5kReQBISCYeJTeRhCyxAEczLYd9VUF5AMABIAWgB&ictx=111&ved=0CAAQ5JsGahcKEwjolrbJ69yQAxUAAAAAHQAAAAAQBA',
    type: 'hotel',
  },
  {
    name: 'Sefriya Farm & Orchard',
    pricePerNight: 100,
    priceCategory: '$$',
    driveTime: '17 minutes (depends on traffic)',
    distance: '4.4 miles from venue',
    airportTime: '1 hour 30 minutes from International Airport',
    description: 'Farm and orchard accommodation near venue',
    link: 'https://www.sefriya.com/',
    type: 'farm',
  },
  {
    name: 'Cuenca Summer House',
    pricePerNight: 254,
    priceCategory: '$$',
    driveTime: '15 minutes',
    distance: 'Close to venue',
    airportTime: '1 hour 45 minutes from International Airport',
    description:
      'Can split with people if want to room together, different families etc.',
    capacity: 'Fits up to 14 people',
    details: '3 bedrooms, 14 beds, 3 baths',
    link: 'https://www.airbnb.com/s/Cuenca--Batangas--Philippines/homes?place_id=ChIJPUhDMAoNvTMRBORz6JHh2GQ&refinement_paths[]=%2Fhomes&checkin=2026-05-21&checkout=2026-05-22&date_picker_type=calendar&adults=5&guests=5',
    type: 'rental',
  },
  {
    name: 'Palms Dream Beach Resort',
    pricePerNight: 339,
    priceCategory: '$$',
    driveTime: '~15 minutes',
    distance: 'Close to venue',
    airportTime: '1 hour 35 minutes from International Airport',
    description:
      'Can split with people if want to room together, different families etc.',
    capacity: 'Fits 15 guests',
    details: '3 bedrooms, 7 beds',
    note: "Can't find directions for certain so rough estimate",
    link: 'https://www.airbnb.com/s/Cuenca--Batangas--Philippines/homes?place_id=ChIJPUhDMAoNvTMRBORz6JHh2GQ&refinement_paths[]=%2Fhomes&checkin=2026-05-21&checkout=2026-05-22&date_picker_type=calendar&adults=5&guests=5',
    type: 'rental',
  },
]

export default function StaySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const accommodationsRef = useRef<HTMLDivElement>(null)
  const airbnbRef = useRef<HTMLDivElement>(null)
  const grabRef = useRef<HTMLDivElement>(null)

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

      const accommodationCards = accommodationsRef.current?.querySelectorAll(
        '.accommodation-card'
      )
      if (accommodationCards) {
        gsap.fromTo(
          accommodationCards,
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
              trigger: accommodationsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      gsap.fromTo(
        airbnbRef.current,
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
            trigger: airbnbRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        grabRef.current,
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
            trigger: grabRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="stay"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background py-8 lg:py-12"
    >
      <DecorativeBackground variant="light" density="sparse" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className="mb-4 font-medium text-muted-foreground text-xs tracking-[0.3em]">
            ACCOMMODATION
          </p>
          <h2 className="mb-4 font-serif text-4xl text-foreground/90 lg:text-6xl">
            Where to Stay
          </h2>
        </div>

        {/* Grab Transportation Info */}
        <div
          ref={grabRef}
          className="mb-12 rounded-lg border border-muted/30 bg-muted/10 px-6 py-4"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg">🚗</span>
            <div className="text-sm">
              <span className="font-medium text-foreground">
                Getting Around:{' '}
              </span>
              <span className="text-muted-foreground">
                Use Grab (like Uber) for rides, food, and groceries—the safest
                way to travel locally.
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Accommodations List */}
          <div ref={accommodationsRef} className="space-y-6">
            {accommodations.map((accommodation) => (
              <div
                key={accommodation.name}
                className="accommodation-card rounded-xl bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl lg:p-8"
              >
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="font-serif text-foreground text-xl lg:text-2xl">
                    {accommodation.name}
                  </h3>
                  <span className="rounded bg-primary/10 px-2 py-1 font-medium text-primary text-xs">
                    {accommodation.priceCategory}
                  </span>
                </div>

                <p className="mb-4 text-muted-foreground text-sm">
                  {accommodation.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-xs">💰</span>
                    <span className="font-medium">
                      ${accommodation.pricePerNight}/night
                    </span>
                  </div>

                  {accommodation.capacity && (
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 text-xs">👥</span>
                      <span className="text-muted-foreground">
                        {accommodation.capacity}
                      </span>
                    </div>
                  )}

                  {accommodation.details && (
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 text-xs">🏠</span>
                      <span className="text-muted-foreground">
                        {accommodation.details}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-xs">🚗</span>
                    <span className="text-muted-foreground">
                      {accommodation.driveTime} - {accommodation.distance}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-xs">✈️</span>
                    <span className="text-muted-foreground">
                      {accommodation.airportTime}
                      {accommodation.note &&
                        ' (depending on traffic, might be higher)'}
                    </span>
                  </div>

                  {accommodation.note && (
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 text-xs">ℹ️</span>
                      <span className="text-muted-foreground text-xs italic">
                        {accommodation.note}
                      </span>
                    </div>
                  )}
                </div>

                <a
                  href={accommodation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-primary underline-offset-2 hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  View Details
                </a>
              </div>
            ))}
          </div>

          {/* Airbnb Search Section */}
          <div
            ref={airbnbRef}
            className="rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 p-8 lg:p-12"
          >
            <h3 className="mb-4 font-serif text-2xl text-foreground lg:text-3xl">
              Browse More Options on Airbnb
            </h3>
            <p className="mb-6 text-muted-foreground">
              You can also look around on your own. A few available
              spots—figured we'd let you decide what works best for you.
            </p>

            <div className="mb-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">Search Filters:</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">📅</span>
                <span className="text-muted-foreground">1 night</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">👥</span>
                <span className="text-muted-foreground">5 guests</span>
              </div>
            </div>

            <a
              href="https://www.airbnb.com/s/Cuenca--Batangas--Philippines/homes?place_id=ChIJPUhDMAoNvTMRBORz6JHh2GQ&refinement_paths[]=%2Fhomes&checkin=2026-05-21&checkout=2026-05-22&date_picker_type=calendar&adults=5&guests=5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Globe className="h-5 w-5" />
              Search Airbnb
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
