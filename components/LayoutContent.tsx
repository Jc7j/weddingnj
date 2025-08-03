'use client'

import { ConvexClientProvider } from '~/components/ConvexClientProvider'
import Header from '~/components/Header'
import SmoothScrollProvider from '~/components/SmoothScrollProvider'
import { PageLoader, ScrollAnimations, usePageLoad } from '~/components/animations'

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { showLoader, handleLoaderComplete } = usePageLoad()

  return (
    <>
      {showLoader && <PageLoader onComplete={handleLoaderComplete} />}
      <ConvexClientProvider>
        <SmoothScrollProvider>
          <Header />
          {children}
          <ScrollAnimations />
        </SmoothScrollProvider>
      </ConvexClientProvider>
    </>
  )
}