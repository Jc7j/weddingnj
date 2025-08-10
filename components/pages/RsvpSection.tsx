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
          className="mb-6 font-serif text-4xl sm:text-5xl lg:text-6xl"
          style={{ color: '#2B4735' }}
        >
          RSVP
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Join us for our special day. We can't wait to celebrate with you!
        </p>
        <Button
          onClick={onRsvpClick}
          size="lg"
          className="px-8 py-3 font-medium text-lg text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: '#2B4735' }}
        >
          Respond to Our Invitation
        </Button>
      </div>
    </section>
  )
}
