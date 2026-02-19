'use client'

import { useRsvpDialog } from '~/components/LayoutContent'
import AttireSection from '~/components/pages/AttireSection'
import BridalPartyProcession from '~/components/pages/BridalPartyProcession'
// import DetailsSection from '~/components/pages/DetailsSection'
import HeroSection from '~/components/pages/HeroSection'
import QASection from '~/components/pages/QASection'
import RsvpSection from '~/components/pages/RsvpSection'
import StaySection from '~/components/pages/StaySection'
import StorySection from '~/components/pages/StorySection'
import VenueSection from '~/components/pages/VenueSection'

export default function AuthenticatedContent() {
  const { openRsvpDialog } = useRsvpDialog()

  return (
    <main className="min-h-screen">
      <HeroSection onRsvpClick={openRsvpDialog} />
      <StorySection />
      <VenueSection />
      {/* <DetailsSection /> */}
      <AttireSection />
      <StaySection />
      <BridalPartyProcession />
      <QASection />
      <RsvpSection onRsvpClick={openRsvpDialog} />
    </main>
  )
}
