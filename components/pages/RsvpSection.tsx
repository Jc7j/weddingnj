'use client'

import { Button } from '~/components/ui/button'

interface RsvpSectionProps {
  onRsvpClick: () => void
}

export default function RsvpSection({ onRsvpClick }: RsvpSectionProps) {
  return (
    <section className="flex h-screen items-center justify-center bg-background">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-8 font-serif text-4xl text-primary sm:text-5xl lg:text-6xl">
          RSVP
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Join us for our special day. We can't wait to celebrate with you!
        </p>
        <Button
          onClick={onRsvpClick}
          size="lg"
          className="px-8 py-3 font-medium text-lg"
        >
          Respond to Our Invitation
        </Button>
      </div>
    </section>
  )
}
