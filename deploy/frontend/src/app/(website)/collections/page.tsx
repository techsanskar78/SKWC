import { Suspense } from 'react';
import { Metadata } from 'next';
import { GoogleSheetsService } from '@/services/catalogue';
import CollectionsClient from '@/components/ui/CollectionsClient';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse our full range of bridal lehengas, wedding wear and jewellery.',
};

export default async function CollectionsPage() {
  const [products, categories] = await Promise.all([
    GoogleSheetsService.getProducts(),
    GoogleSheetsService.getCategories(),
  ]);

  return (
    <div>
      <PageHero
        src="/images/lehenga-green.jpg"
        eyebrow="Full Catalogue"
        title="Collections"
        subtitle="Bridal lehengas, wedding couture and jewellery — chosen for the ceremonies that matter."
      />
      <div className="container-wide page-pad">
        <Suspense fallback={null}>
          <CollectionsClient products={products} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
