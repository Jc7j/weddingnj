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
    return null
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
