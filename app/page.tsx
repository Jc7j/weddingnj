'use client'

import { useRsvpDialog } from '~/components/LayoutContent'
import BridesAndGroomsSection from '~/components/pages/BridesAndGrooms'
import DetailsSection from '~/components/pages/DetailsSection'
import HeroSection from '~/components/pages/HeroSection'
import QASection from '~/components/pages/QASection'
import RsvpSection from '~/components/pages/RsvpSection'
import StorySection from '~/components/pages/StorySection'
import VenueSection from '~/components/pages/VenueSection'

export default function Home() {
  const { openRsvpDialog } = useRsvpDialog()

  return (
    <main className="min-h-screen">
      <HeroSection onRsvpClick={openRsvpDialog} />
      <StorySection />
      <BridesAndGroomsSection />
      <VenueSection />
      <DetailsSection />
      <QASection />
      <RsvpSection onRsvpClick={openRsvpDialog} />
    </main>
  )
}
