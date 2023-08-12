
import '../styles/globals.css'


export const metadata = {
  title: 'Almost Done',
  description: 'Photo gallery',
}

export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
