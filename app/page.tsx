'use client'

import RsvpForm from '~/components/RsvpForm'

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 font-serif text-6xl">Nicole & James</h1>
          <p className="text-xl">June 15, 2025</p>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center font-serif text-4xl">RSVP</h2>
          <RsvpForm />
        </div>
      </section>
    </main>
  )
}
