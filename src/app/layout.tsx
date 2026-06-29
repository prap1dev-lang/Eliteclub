import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'Elite Club — Reserved for Rare',
  description:
    "India's Premier Luxury Talent & Brand Collaboration Platform. Discover, verify, promote, and connect India's finest influencers with premium brands. ₹23 Lakh National Championship.",
  keywords: [
    'Elite Club', 'luxury influencer platform India', 'talent collaboration',
    'influencer championship', 'photographer videographer hire', 'brand collaboration',
  ],
  openGraph: {
    title: 'Elite Club — Reserved for Rare',
    description: "India's Premier Luxury Talent & Brand Collaboration Platform.",
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1c150d',
              color: '#f5efe2',
              border: '1px solid rgba(201,168,76,0.3)',
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '16px',
            },
            success: { iconTheme: { primary: '#c9a84c', secondary: '#1c150d' } },
          }}
        />
      </body>
    </html>
  )
}
