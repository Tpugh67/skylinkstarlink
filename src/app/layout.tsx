import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://skylinkstarlink.com'),
  title: 'SkyLinkStarLink',
  description: 'Next-generation digital agency — web development, CRM, automation & lead generation',
  openGraph: {
    title: 'SkyLinkStarLink',
    description: 'Next-generation digital agency — web development, CRM, automation & lead generation',
    siteName: 'SkyLinkStarLink',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SkyLinkStarLink' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkyLinkStarLink',
    description: 'Next-generation digital agency — web development, CRM, automation & lead generation',
    images: ['/og-image.png'],
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-slate-900">
        {children}
      </body>

      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
              ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
            `}
          </Script>
        </>
      )}
    </html>
  )
}
