'use client'

import { Button } from '~/components/ui/button'

interface RsvpSectionProps {
  onRsvpClick: () => void
}

export default function RsvpSection({ onRsvpClick }: RsvpSectionProps) {
  return (
    <section className="px-8 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-12 font-serif text-4xl">RSVP</h2>
        <Button
          onClick={onRsvpClick}
          size="lg"
          className="bg-dusty-rose px-8 py-3 font-medium text-white hover:bg-dusty-rose/90"
        >
          Respond to Our Invitation
        </Button>
      </div>
    </section>
  )
}