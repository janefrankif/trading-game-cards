import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Trading Card Game Shop',
  description: 'An online trading card shop featuring dedicated separated pages for Home, Shop Catalog, Featured Grails, About Us & Escrow, Collector Blog, FAQs, and Contact with bilateral trade escrow.',
  openGraph: {
    title: 'Trading Card Game Shop',
    description: 'An online trading card shop featuring dedicated separated pages for Home, Shop Catalog, Featured Grails, About Us & Escrow, Collector Blog, FAQs, and Contact with bilateral trade escrow.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trading Card Game Shop',
    description: 'An online trading card shop featuring dedicated separated pages for Home, Shop Catalog, Featured Grails, About Us & Escrow, Collector Blog, FAQs, and Contact with bilateral trade escrow.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
