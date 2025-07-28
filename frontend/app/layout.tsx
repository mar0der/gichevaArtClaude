import './globals.css'
import Navigation from '@/components/Navigation'

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