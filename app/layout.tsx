import { Geist, Geist_Mono } from 'next/font/google'

import type { Metadata } from 'next'
import './globals.css'

import { ConvexClientProvider } from '~/components/ConvexClientProvider'
import SmoothScrollProvider from '~/components/SmoothScrollProvider'
import Header from '~/components/Header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Nicole & James Wedding | June 15, 2025',
  description: 'Join us in celebrating our special day in the Philippines. RSVP for Nicole & James wedding on June 15, 2025.',
  icons: {
    icon: '/convex.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          <SmoothScrollProvider>
            <Header />
            {children}
          </SmoothScrollProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
