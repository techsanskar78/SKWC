import { Metadata } from 'next';
import { GoogleSheetsService } from '@/services/catalogue';
import ProductGrid from '@/components/ui/ProductGrid';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Rental Collection',
  description: 'Rent premium bridal and wedding wear without the commitment of purchase.',
};

export default async function RentalPage() {
  const products = await GoogleSheetsService.getProducts();
  const rental = products.filter((p) => p.status === 'active' && p.rental_available);

  return (
    <div>
      <PageHero
        src="/images/rental.jpg"
        eyebrow="Rental Collection"
        title="Wear it, love it, return it"
        subtitle="Your perfect wedding look, without the commitment of purchase."
      />
      <div className="container-wide page-pad">
        <ProductGrid products={rental} />
      </div>
    </div>
  );
}
