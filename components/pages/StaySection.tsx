'use client'

import { useEffect, useRef } from 'react'

import DecorativeBackground from '@/components/ui/decorative-background'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Globe } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const accommodations = [
  {
    name: 'Joane Suites by Hotel Cara',
    pricePerNight: 47,
    priceCategory: '$',
    driveTime: '30 min drive',
    distance: '9.2 mi from venue',
    description: 'Decent for price, mid looking hotel',
    link: 'https://www.google.com/travel/search?q=imelda%27s%20garden%20cuenca&g2lb=4965990%2C72317059%2C72414906%2C72471280%2C72472051%2C72485658%2C72560029%2C72573224%2C72616120%2C72647020%2C72686036%2C72803964%2C72882230%2C72958624%2C72959983%2C73053698%2C73059275%2C73064764%2C73107089%2C73125229%2C73127086%2C73148426&hl=en-US&gl=us&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaaQpLEkcKDS9nLzExc2RweXptOWwyJTB4MzNiZDBkNWNkMmZlYjVmZDoweDFlYmRlYThjMTQyYzU1OTA6D0ltZWxkYSdzIEdhcmRlbhoAEhoSFAoHCOoPEAUYFBIHCOoPEAUYFhgCMgIIASoJCgU6A1VTRBoA&qs=CAEgASgAMihDaG9JNUs2a29JZW5pclNzQVJvTkwyY3ZNVEZ5Tlhaa05USm5heEFCOA1IAA&ap=KigKEgneHkLfIdMrQBHMy2E_WUdeQBISCTox7a1B9ytAEczLYScRTV5AMABIAWgBugEIb3ZlcnZpZXc&ictx=111&ved=0CAAQ5JsGahcKEwjwgPHK69yQAxUAAAAAHQAAAAAQBA',
  },
  {
    name: 'Solano Hotel',
    pricePerNight: 78,
    priceCategory: '$',
    driveTime: '45 min drive',
    distance: '9.3 mi from venue',
    description: 'Nice looking hotel',
    link: 'https://www.google.com/travel/search?q=imelda%27s%20garden%20cuenca&g2lb=4965990%2C72317059%2C72414906%2C72471280%2C72472051%2C72485658%2C72560029%2C72573224%2C72616120%2C72647020%2C72686036%2C72803964%2C72882230%2C72958624%2C72959983%2C73053698%2C73059275%2C73064764%2C73107089%2C73125229%2C73127086%2C73148426&hl=en-US&gl=us&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaaQpLEkcKDS9nLzExc2RweXptOWwyJTB4MzNiZDBkNWNkMmZlYjVmZDoweDFlYmRlYThjMTQyYzU1OTA6D0ltZWxkYSdzIEdhcmRlbhoAEhoSFAoHCOoPEAUYFBIHCOoPEAUYFhgCMgIIASoJCgU6A1VTRBoA&qs=CAEgASgAMidDaGtJMi1UZWhJakR2dEU4R2cwdlp5OHhNVzVzWW5GM1gzaDRFQUU4DUgA&ap=KigKEgn55LyaIsMrQBHMy2EP5kReQBISCYeJTeRhCyxAEczLYd9VUF5AMABIAWgB&ictx=111&ved=0CAAQ5JsGahcKEwjolrbJ69yQAxUAAAAAHQAAAAAQBA',
  },
  {
    name: 'Sefriya Farm & Orchard',
    pricePerNight: 100,
    priceCategory: '$$',
    driveTime: '17 min drive',
    distance: '4.4 mi from venue',
    description: 'Farm and orchard accommodation near venue',
    link: 'https://www.sefriya.com/',
  },
  {
    name: 'Cuenca Summer House',
    pricePerNight: 254,
    priceCategory: '$$',
    driveTime: '15 min drive',
    distance: 'Close to venue',
    description: 'Great for groups — fits 14 people, 3 beds, 3 baths',
    link: 'https://www.airbnb.com/s/Cuenca--Batangas--Philippines/homes?place_id=ChIJPUhDMAoNvTMRBORz6JHh2GQ&refinement_paths[]=%2Fhomes&checkin=2026-05-21&checkout=2026-05-22&date_picker_type=calendar&adults=5&guests=5',
  },
  {
    name: 'Palms Dream Beach Resort',
    pricePerNight: 339,
    priceCategory: '$$',
    driveTime: '~15 min drive',
    distance: 'Close to venue',
    description: 'Beach resort for groups — fits 15 guests, 7 beds',
    link: 'https://www.airbnb.com/s/Cuenca--Batangas--Philippines/homes?place_id=ChIJPUhDMAoNvTMRBORz6JHh2GQ&refinement_paths[]=%2Fhomes&checkin=2026-05-21&checkout=2026-05-22&date_picker_type=calendar&adults=5&guests=5',
  },
]

export default function StaySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        grabRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grabRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const items = listRef.current?.querySelectorAll('.accommodation-item')
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      gsap.fromTo(
        airbnbRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: airbnbRef.current,
            start: 'top 85%',
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

      <div className="container relative z-10 mx-auto max-w-4xl px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-12 text-center">
          <p className="mb-4 font-medium text-muted-foreground text-xs tracking-[0.3em]">
            ACCOMMODATION
          </p>
          <h2 className="font-serif text-4xl text-foreground/90 lg:text-6xl">
            Where to Stay
          </h2>
        </div>

        {/* Grab Transportation Info */}
        <div
          ref={grabRef}
          className="mb-10 rounded-lg border border-muted/30 bg-white/40 px-5 py-3 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-base">🚗</span>
            <p className="text-sm">
              <span className="font-medium text-foreground">
                Getting Around:{' '}
              </span>
              <span className="text-muted-foreground">
                Use Grab (like Uber) for rides—the safest way to travel locally.
              </span>
            </p>
          </div>
        </div>

        {/* Accommodations List - Editorial Style */}
        <div
          ref={listRef}
          className="mb-10 overflow-hidden rounded-xl bg-white/30 backdrop-blur-sm"
        >
          {accommodations.map((accommodation, index) => {
            const isLast = index === accommodations.length - 1
            return (
              <a
                key={accommodation.name}
                href={accommodation.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`accommodation-item group flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-white/50 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-6 ${
                  !isLast ? 'border-muted/20 border-b' : ''
                }`}
              >
                {/* Left: Name + Price */}
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-foreground text-lg">
                    {accommodation.name}
                  </h3>
                  <span className="whitespace-nowrap rounded bg-primary/10 px-2 py-0.5 font-medium text-primary text-xs">
                    ${accommodation.pricePerNight}/night{' '}
                    {accommodation.priceCategory}
                  </span>
                </div>

                {/* Middle: Distance + Description */}
                <div className="flex-1 lg:text-center">
                  <p className="text-muted-foreground text-sm">
                    {accommodation.driveTime} · {accommodation.distance}
                  </p>
                  <p className="text-muted-foreground/80 text-xs">
                    {accommodation.description}
                  </p>
                </div>

                {/* Right: View Link */}
                <div className="mt-2 flex items-center gap-1 text-primary text-sm lg:mt-0">
                  <span className="group-hover:underline">View</span>
                  <ArrowUpRight className="group-hover:-translate-y-0.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </a>
            )
          })}
        </div>

        {/* Airbnb Search Section */}
        <div
          ref={airbnbRef}
          className="rounded-xl bg-white/30 p-6 backdrop-blur-sm lg:p-8"
        >
          <h3 className="mb-2 font-serif text-foreground text-xl lg:text-2xl">
            Browse More Options
          </h3>
          <p className="mb-4 text-muted-foreground text-sm">
            Search Airbnb for more places in Cuenca, Batangas.
          </p>
          <a
            href="https://www.airbnb.com/s/Cuenca--Batangas--Philippines/homes?place_id=ChIJPUhDMAoNvTMRBORz6JHh2GQ&refinement_paths[]=%2Fhomes&checkin=2026-05-21&checkout=2026-05-22&date_picker_type=calendar&adults=5&guests=5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <Globe className="h-4 w-4" />
            Search Airbnb
          </a>
        </div>
      </div>
    </section>
  )
}
