import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { GoogleSheetsService } from '@/services/catalogue';
import { siteUrl } from '@/lib/config';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await GoogleSheetsService.getSettings();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${settings.business_name} | Bridal Lehengas, Wedding Wear & Jewellery`,
      template: `%s | ${settings.business_name}`,
    },
    description: settings.homepage_subtitle,
    openGraph: {
      title: settings.business_name,
      description: settings.homepage_subtitle,
      type: 'website',
      locale: 'en_IN',
    },
    icons: {
      icon: [{ url: settings.favicon || '/favicon.png', type: 'image/png' }],
      shortcut: '/favicon.png',
      apple: '/apple-touch-icon.png',
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover' as const,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} font-sans`}>{children}</body>
    </html>
  );
}
