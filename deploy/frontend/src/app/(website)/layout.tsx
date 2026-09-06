import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import NavigationProgress from '@/components/layout/NavigationProgress';
import { GoogleSheetsService } from '@/services/catalogue';

export const dynamic = 'force-dynamic';
export const revalidate = 180;

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await GoogleSheetsService.getSettings();

  return (
    <>
      <NavigationProgress />
      <Navbar settings={settings} />
      <main className="min-w-0 max-w-[100vw] overflow-x-hidden">{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton number={settings.whatsapp_number} />
    </>
  );
}
