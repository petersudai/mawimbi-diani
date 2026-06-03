import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://mawimbi.energy'),
  title: 'MAWIMBI | Unleash The Tide Within',
  description: 'Mawimbi Energy. An energy drink crafted at the edge of the Indian Ocean in Diani Beach, Kenya. Marine minerals, baobab, zero sugar.',
  openGraph: {
    title: 'MAWIMBI | Unleash The Tide Within',
    description: 'Coastal energy, born from the tide. Diani Beach, Kenya.',
    images: ['/photos/diani-hero.jpg'],
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
