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
        <Button
          onClick={onRsvpClick}
          size="lg"
          className="px-6 py-2.5 font-medium text-base text-white transition-colors hover:opacity-90 sm:px-8 sm:py-3 sm:text-lg"
        >
          Respond to Our Invitation
        </Button>
      </div>
    </section>
  )
}
