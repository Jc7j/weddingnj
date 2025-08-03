'use client'

import { useRsvpDialog } from '~/components/LayoutContent'
import HeroSection from '~/components/pages/HeroSection'
import RsvpSection from '~/components/pages/RsvpSection'
import StorySection from '~/components/pages/StorySection'

export default function Home() {
  const { openRsvpDialog } = useRsvpDialog()

  return (
    <main className="min-h-screen">
      <HeroSection onRsvpClick={openRsvpDialog} />
      <StorySection />
      <RsvpSection onRsvpClick={openRsvpDialog} />
    </main>
  )
}
