import { Metadata } from 'next';
import { GoogleSheetsService } from '@/services/catalogue';
import AboutPage from '@/components/about/AboutPage';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'The story of Shri Krishna Wedding Collection — bridal lehengas, wedding jewellery, and personal styling in our showroom.',
};

export default async function About() {
  const settings = await GoogleSheetsService.getSettings();
  return <AboutPage settings={settings} />;
}
