import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SkyLinkStarLink',
  description: 'Next-generation digital agency — web development, CRM, automation & lead generation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  )
}
