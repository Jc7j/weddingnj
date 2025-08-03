'use client'

import RsvpForm from '~/components/RsvpForm'
import Hero from '~/components/Hero'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <section className="px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center font-serif text-4xl">RSVP</h2>
          <RsvpForm />
        </div>
      </section>
    </main>
  )
}
