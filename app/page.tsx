'use client'

import { useRsvpDialog } from '~/components/LayoutContent'
import { Hero, LoveStory, RsvpSection } from '~/components/pages'

export default function Home() {
  const { openRsvpDialog } = useRsvpDialog()

  return (
    <main className="min-h-screen">
      <Hero onRsvpClick={openRsvpDialog} />
      <LoveStory />
      <RsvpSection onRsvpClick={openRsvpDialog} />
    </main>
  )
}
