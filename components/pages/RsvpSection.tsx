'use client'

import { Button } from '~/components/ui/button'
import DecorativeBackground from '~/components/ui/decorative-background'

interface RsvpSectionProps {
  onRsvpClick: () => void
}

export default function RsvpSection({ onRsvpClick }: RsvpSectionProps) {
  return (
    <section id="rsvp" className="relative bg-background py-20 lg:py-32">
      <DecorativeBackground variant="light" density="dense" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          className="mb-4 font-serif text-3xl sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ color: '#2B4735' }}
        >
          RSVP
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:mb-10 sm:text-lg md:text-xl">
          Join us for our special day. We can't wait to celebrate with you!
        </p>
        <Button
          onClick={onRsvpClick}
          size="lg"
          className="px-6 py-2.5 font-medium text-base text-white transition-colors hover:opacity-90 sm:px-8 sm:py-3 sm:text-lg"
          style={{ backgroundColor: '#2B4735' }}
        >
          Respond to Our Invitation
        </Button>
      </div>
    </section>
  )
}
