'use client'

import { usePathname } from 'next/navigation'
import { createContext, useContext, useState } from 'react'

import {
  PageLoader,
  ScrollAnimations,
  usePageLoad,
} from '~/components/animations'
import RsvpForm from '~/components/RsvpForm'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '~/components/ui/dialog'

import FooterSection from './pages/FooterSection'
import Header from './pages/Header'

interface RsvpDialogContextType {
  openRsvpDialog: () => void
  closeRsvpDialog: () => void
}

const RsvpDialogContext = createContext<RsvpDialogContextType | undefined>(
  undefined
)

export function useRsvpDialog() {
  const context = useContext(RsvpDialogContext)
  if (!context) {
    throw new Error('useRsvpDialog must be used within LayoutContent')
  }
  return context
}

export default function LayoutContent({
  children,
  hideHeader = false,
}: {
  children: React.ReactNode
  hideHeader?: boolean
}) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  const { showLoader, handleLoaderComplete } = usePageLoad()
  const [isRsvpOpen, setIsRsvpOpen] = useState(false)

  const openRsvpDialog = () => setIsRsvpOpen(true)
  const closeRsvpDialog = () => setIsRsvpOpen(false)

  // For admin pages, only provide basic layout without decorative elements
  if (isAdminPage) {
    return children
  }

  // For main wedding site, include all decorative elements
  return (
    <>
      {showLoader && <PageLoader onComplete={handleLoaderComplete} />}
      <RsvpDialogContext.Provider value={{ openRsvpDialog, closeRsvpDialog }}>
        {!hideHeader && <Header onRsvpClick={openRsvpDialog} />}
        {children}
        <FooterSection />
        <ScrollAnimations />

        <Dialog open={isRsvpOpen} onOpenChange={setIsRsvpOpen}>
          <DialogContent className="sm:max-w-4xl">
            <DialogTitle className="sr-only">RSVP Form</DialogTitle>
            <RsvpForm />
          </DialogContent>
        </Dialog>
      </RsvpDialogContext.Provider>
    </>
  )
}
