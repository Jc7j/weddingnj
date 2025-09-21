import { Dancing_Script, Geist, Geist_Mono } from 'next/font/google'

import type { Metadata } from 'next'
import './globals.css'
import { ConvexClientProvider } from '~/components/ConvexClientProvider'

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
  title: 'Nicole & James Wedding | May 21st, 2026',
  description:
    'Join us in celebrating our special day in the Philippines. RSVP for Nicole & James wedding on May 21st, 2026.',
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
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  )
}
