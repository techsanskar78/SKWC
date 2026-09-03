import Link from 'next/link';
import { Product } from '@/types';
import ProductGrid from '@/components/ui/ProductGrid';

export default function JewellerySection({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow">Timeless Pieces</p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2">Jewellery Collection</h2>
          </div>
          <Link href="/collections/jewellery" className="hidden sm:inline text-sm uppercase tracking-wide border-b border-charcoal/40 hover:border-maroon hover:text-maroon">
            Explore Jewellery
          </Link>
        </div>
        <ProductGrid products={products.slice(0, 4)} />
        <div className="mt-8 text-center sm:hidden">
          <Link href="/collections/jewellery" className="btn-outline">Explore Jewellery</Link>
        </div>
      </div>
    </section>
  );
}
