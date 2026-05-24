import type { Metadata, Viewport } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { ChatbotWidget } from '@/components/chatbot-widget'
import './globals.css'

const _inter = Inter({ subsets: ['latin'] })
const _dmSans = DM_Sans({ subsets: ['latin'], weight: ['500', '600', '700'] })

export const viewport: Viewport = {
  themeColor: '#dc2626',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'BloodBridge - Find Blood Donors Across India',
  description:
    'India\'s blood donor network. Register as a donor or find the nearest available blood donor in your state and city. Covering 36 states & UTs and 500+ cities.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <ChatbotWidget />
        <Toaster richColors position="top-center" />
        <Analytics />
      </body>
    </html>
  )
}
