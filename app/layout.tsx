import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://mawimbi.energy'),
  title: 'MAWIMBI | Unleash The Tide Within',
  description: 'An energy drink crafted at the edge of the Indian Ocean. Marine minerals, baobab, zero sugar. Born in Diani Beach, Kenya.',
  openGraph: {
    title: 'MAWIMBI | Unleash The Tide Within',
    description: 'Coastal energy, born from the tide. Marine minerals, baobab, zero sugar. Diani Beach, Kenya.',
    url: 'https://mawimbi.energy',
    siteName: 'MAWIMBI Energy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAWIMBI | Unleash The Tide Within',
    description: 'Coastal energy, born from the tide. Diani Beach, Kenya.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-abyss text-white antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
