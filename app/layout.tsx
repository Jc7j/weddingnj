import { Cormorant_Garamond } from 'next/font/google'
import localFont from 'next/font/local'

import type { Metadata } from 'next'
import './globals.css'

import Script from 'next/script'

import { ConvexClientProvider } from '~/components/ConvexClientProvider'

const billionMiracles = localFont({
  src: '../fonts/Billion Miracles Personal Use Only.ttf',
  variable: '--font-heading',
})

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
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
      <head>
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body
        className={`${billionMiracles.variable} ${cormorantGaramond.variable} antialiased`}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  )
}
