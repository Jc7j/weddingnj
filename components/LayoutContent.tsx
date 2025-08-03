'use client'

import { createContext, useContext, useState } from 'react'

import {
  PageLoader,
  ScrollAnimations,
  usePageLoad,
} from '~/components/animations'
import { ConvexClientProvider } from '~/components/ConvexClientProvider'
import Header from '~/components/Header'
import RsvpForm from '~/components/RsvpForm'
import SmoothScrollProvider from '~/components/SmoothScrollProvider'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'

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
}: {
  children: React.ReactNode
}) {
  const { showLoader, handleLoaderComplete } = usePageLoad()
  const [isRsvpOpen, setIsRsvpOpen] = useState(false)

  const openRsvpDialog = () => setIsRsvpOpen(true)
  const closeRsvpDialog = () => setIsRsvpOpen(false)

  return (
    <>
      {showLoader && <PageLoader onComplete={handleLoaderComplete} />}
      <ConvexClientProvider>
        <SmoothScrollProvider>
          <RsvpDialogContext.Provider
            value={{ openRsvpDialog, closeRsvpDialog }}
          >
            <Header onRsvpClick={openRsvpDialog} />
            {children}
            <ScrollAnimations />

            <Dialog open={isRsvpOpen} onOpenChange={setIsRsvpOpen}>
              <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-center font-serif text-2xl">
                    Please Respond
                  </DialogTitle>
                </DialogHeader>
                <RsvpForm />
              </DialogContent>
            </Dialog>
          </RsvpDialogContext.Provider>
        </SmoothScrollProvider>
      </ConvexClientProvider>
    </>
  )
}
