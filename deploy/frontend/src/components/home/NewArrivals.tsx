import Link from 'next/link';
import { Product } from '@/types';
import ProductGrid from '@/components/ui/ProductGrid';

export default function NewArrivals({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <section className="container-wide py-12 sm:py-16 lg:py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="eyebrow">Fresh In</p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2">New Arrivals</h2>
        </div>
        <Link href="/collections?filter=new" className="hidden sm:inline text-sm uppercase tracking-wide border-b border-charcoal/40 hover:border-maroon hover:text-maroon">
          View All New Arrivals
        </Link>
      </div>
      <ProductGrid products={products.slice(0, 8)} />
      <div className="mt-8 text-center sm:hidden">
        <Link href="/collections?filter=new" className="btn-outline">View All New Arrivals</Link>
      </div>
    </section>
  );
}
