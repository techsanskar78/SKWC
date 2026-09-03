import { Metadata } from 'next';
import SmartImage from '@/components/ui/SmartImage';
import { GoogleSheetsService } from '@/services/catalogue';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'A visual look at our bridal, jewellery and wedding collections.',
};

export default async function GalleryPage() {
  const items = await GoogleSheetsService.getGallery();

  return (
    <div>
      <PageHero
        src="/images/party-wear.jpg"
        eyebrow="Lookbook"
        title="Gallery"
        subtitle="A glimpse of bridal lehengas, jewellery and wedding looks from our collection."
      />
      <div className="container-wide page-pad">
        {items.length === 0 ? (
          <p className="text-charcoal/60">Gallery coming soon.</p>
        ) : (
          <div className="columns-2 sm:columns-3 gap-4 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="break-inside-avoid relative group overflow-hidden">
                <SmartImage
                  src={item.image_url}
                  alt={item.title}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent sm:from-transparent sm:bg-charcoal/0 sm:group-hover:bg-charcoal/40 transition-colors flex items-end p-3 sm:p-4 sm:opacity-0 sm:group-hover:opacity-100">
                  <p className="text-ivory text-xs sm:text-sm leading-snug">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
