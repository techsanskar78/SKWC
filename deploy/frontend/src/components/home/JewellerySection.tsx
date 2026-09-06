import Link from 'next/link';
import { Product } from '@/types';
import ProductGrid from '@/components/ui/ProductGrid';
import { RevealText } from '@/components/ui/RevealText';

export default function JewellerySection({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10 min-w-0">
          <div>
            <RevealText as="p" text="Timeless Pieces" className="eyebrow" />
            <RevealText
              as="h2"
              delay={0.08}
              text="Jewellery Collection"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2"
            />
          </div>
          <Link href="/collections/jewellery" className="hidden sm:inline text-sm uppercase tracking-wide border-b border-charcoal/40 hover:border-maroon hover:text-maroon">
            Explore Jewellery
          </Link>
        </div>
        <ProductGrid products={products.slice(0, 4)} />
        <div className="mt-8 text-center sm:hidden">
          <Link href="/collections/jewellery" className="btn-outline w-full">Explore Jewellery</Link>
        </div>
      </div>
    </section>
  );
}
