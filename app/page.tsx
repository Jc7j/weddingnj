'use client'

import { useRsvpDialog } from '~/components/LayoutContent'
import DetailsSection from '~/components/pages/DetailsSection'
import HeroSection from '~/components/pages/HeroSection'
import RsvpSection from '~/components/pages/RsvpSection'
import StorySection from '~/components/pages/StorySection'
import VenueSection from '~/components/pages/VenueSection'
import WeddingPartySection from '~/components/pages/WeddingPartySection'

export default function Home() {
  const { openRsvpDialog } = useRsvpDialog()

  return (
    <main className="min-h-screen">
      <HeroSection onRsvpClick={openRsvpDialog} />
      <StorySection />
      <VenueSection />
      <DetailsSection />
      <WeddingPartySection />
      <RsvpSection onRsvpClick={openRsvpDialog} />
    </main>
  )
}
