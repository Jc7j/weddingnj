'use client'

import { useRsvpDialog } from '~/components/LayoutContent'
import { Hero, RsvpSection } from '~/components/pages'

export default function Home() {
  const { openRsvpDialog } = useRsvpDialog()

  return (
    <main className="min-h-screen">
      <Hero onRsvpClick={openRsvpDialog} />
      <RsvpSection onRsvpClick={openRsvpDialog} />
    </main>
  )
}
