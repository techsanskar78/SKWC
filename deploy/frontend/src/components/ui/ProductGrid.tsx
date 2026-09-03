'use client';

import { useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import EnquiryModal from '@/components/forms/EnquiryModal';

export default function ProductGrid({ products }: { products: Product[] }) {
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [enquiry, setEnquiry] = useState<Product | null>(null);

  if (!products.length) {
    return <p className="text-center text-charcoal/60 py-16">No products found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-10">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
        ))}
      </div>
      <QuickViewModal
        product={quickView}
        onClose={() => setQuickView(null)}
        onEnquire={(p) => {
          setQuickView(null);
          setEnquiry(p);
        }}
      />
      <EnquiryModal product={enquiry} onClose={() => setEnquiry(null)} />
    </>
  );
}
