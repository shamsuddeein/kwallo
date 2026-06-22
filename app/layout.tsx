import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/lib/lang-context'
import { PwaRegister } from '@/components/pwa-register'

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kwallo - Nigeria\'s #1 Football Platform',
  description:
    'Live scores for NPFL, EPL, UCL and the Super Eagles. Predict matches, earn points, and share match cards on WhatsApp. In English and Hausa.',
  keywords: ['Nigeria football', 'NPFL', 'EPL scores', 'Super Eagles', 'live football scores', 'Hausa football'],
  openGraph: {
    title: 'Kwallo - Nigeria\'s #1 Football Platform',
    description: 'Live scores, predictions, and match cards for Nigerian fans. In English and Hausa.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'Kwallo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kwallo - Nigeria\'s #1 Football Platform',
    description: 'Live scores, NPFL, EPL, UCL, predictions, and match cards.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1B5E38',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable} bg-[#F7F5F0]`}
    >
      <body className="font-sans antialiased">
        <AppProvider>{children}</AppProvider>
        <PwaRegister />
      </body>
    </html>
  )
}
