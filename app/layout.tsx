import './globals.css'

export const metadata = {
  title: 'Gicheva Art',
  description: 'Abstract Art by Radka Gicheva',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}