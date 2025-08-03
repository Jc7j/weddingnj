'use client'

import Hero from '~/components/Hero'
import { useRsvpDialog } from '~/components/LayoutContent'
import { Button } from '~/components/ui/button'

export default function Home() {
  const { openRsvpDialog } = useRsvpDialog()

  return (
    <main className="min-h-screen">
      <Hero onRsvpClick={openRsvpDialog} />

      <section className="px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-12 font-serif text-4xl">RSVP</h2>
          <Button
            onClick={openRsvpDialog}
            size="lg"
            className="bg-dusty-rose px-8 py-3 font-medium text-white hover:bg-dusty-rose/90"
          >
            Respond to Our Invitation
          </Button>
        </div>
      </section>
    </main>
  )
}
