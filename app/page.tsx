'use client'

import { useEffect, useState } from 'react'

import AuthenticatedContent from '~/components/AuthenticatedContent'
import LayoutContent from '~/components/LayoutContent'
import PasswordGate from '~/components/PasswordGate'
import { checkAuthentication } from '~/lib/auth'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const authenticated = checkAuthentication()
    setIsAuthenticated(authenticated)
  }, [])

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
  }

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <LayoutContent hideHeader={true}>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-primary/20 to-secondary/20">
          <div className="text-center">
            <h1 className="mb-4 font-serif text-4xl text-foreground">
              Nicole & James
            </h1>
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        </div>
      </LayoutContent>
    )
  }

  // Show password gate if not authenticated (hide header)
  if (!isAuthenticated) {
    return (
      <LayoutContent hideHeader={true}>
        <PasswordGate onAuthenticated={handleAuthenticated} />
      </LayoutContent>
    )
  }

  // Show wedding content if authenticated (show header)
  return (
    <LayoutContent>
      <AuthenticatedContent />
    </LayoutContent>
  )
}
