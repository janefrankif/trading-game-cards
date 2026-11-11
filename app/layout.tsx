import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'VaultCards TCG - Premier Collectible Trading Card Shop & Escrow Exchange',
  description: 'An online trading card shop featuring authentic PSA, BGS, and CGC slabs, sealed booster boxes, and bilateral trade escrow with 72-hour physical inspection.',
  icons: {
    icon: '/site-icon.jpg',
    shortcut: '/site-icon.jpg',
    apple: '/site-icon.jpg',
  },
  openGraph: {
    title: 'VaultCards TCG - Premier Collectible Trading Card Shop & Escrow Exchange',
    description: 'An online trading card shop featuring authentic PSA, BGS, and CGC slabs, sealed booster boxes, and bilateral trade escrow with 72-hour physical inspection.',
    type: 'website',
    images: [
      {
        url: '/featured-image.jpg',
        width: 1200,
        height: 675,
        alt: 'VaultCards TCG - Investment Grade Collectibles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VaultCards TCG - Premier Collectible Trading Card Shop & Escrow Exchange',
    description: 'An online trading card shop featuring authentic PSA, BGS, and CGC slabs, sealed booster boxes, and bilateral trade escrow with 72-hour physical inspection.',
    images: ['/featured-image.jpg'],
  },
};

import { ThemeProvider } from '@/lib/theme-context';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-white text-zinc-900 antialiased min-h-screen selection:bg-amber-400 selection:text-black" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
