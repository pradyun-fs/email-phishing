import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Email Phishing detection',
  description: 'Created with purpose',
  generator: 'pradyun',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
