import { Metadata } from 'next';
import { GoogleSheetsService } from '@/services/catalogue';
import ProductGrid from '@/components/ui/ProductGrid';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Sale Collection',
  description: 'Curated pieces from our collection, now at special prices.',
};

export default async function SalePage() {
  const products = await GoogleSheetsService.getProducts();
  const sale = products.filter((p) => p.status === 'active' && p.sale);

  return (
    <div>
      <PageHero
        src="/images/sale.jpg"
        eyebrow="Sale Collection"
        title="Timeless pieces, special prices"
        subtitle="Selected lehengas and jewellery from our collection, now at a kinder price."
      />
      <div className="container-wide page-pad">
        <ProductGrid products={sale} />
      </div>
    </div>
  );
}
