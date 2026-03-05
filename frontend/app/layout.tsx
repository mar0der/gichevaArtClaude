import './globals.css'
import Script from 'next/script'
import Navigation from '@/components/Navigation'

const GA_MEASUREMENT_ID = 'G-RR5CMERQWR'

export const metadata = {
  title: 'Gicheva Art - Contemporary Abstract Paintings',
  description: 'Explore the vibrant abstract paintings of Radka Gicheva. Original artworks featuring bold colors and expressive forms. International shipping available.',
  keywords: 'abstract art, contemporary painting, Radka Gicheva, Bulgarian artist, original artwork',
  openGraph: {
    title: 'Gicheva Art - Contemporary Abstract Paintings',
    description: 'Explore the vibrant abstract paintings of Radka Gicheva',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="pt-20">
          {children}
        </main>
      </body>
    </html>
  )
}
