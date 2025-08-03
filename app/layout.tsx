import { Geist, Geist_Mono, Dancing_Script } from 'next/font/google'

import type { Metadata } from 'next'
import './globals.css'

import LayoutContent from '~/components/LayoutContent'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const dancingScript = Dancing_Script({
  variable: '--font-dancing-script',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Nicole & James Wedding | June 15, 2025',
  description:
    'Join us in celebrating our special day in the Philippines. RSVP for Nicole & James wedding on June 15, 2025.',
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
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased`}
      >
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  )
}
