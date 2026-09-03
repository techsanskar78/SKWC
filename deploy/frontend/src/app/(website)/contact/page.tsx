import { Metadata } from 'next';
import { GoogleSheetsService } from '@/services/catalogue';
import ContactPage from '@/components/contact/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Visit Shri Krishna Wedding Collection, write to us, or chat on WhatsApp for bridal lehengas, jewellery and styling.',
};

export default async function Contact() {
  const settings = await GoogleSheetsService.getSettings();
  return <ContactPage settings={settings} />;
}
