'use client';

import { useEffect } from 'react';
import SmartImage from '@/components/ui/SmartImage';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/utils';

export default function QuickViewModal({
  product,
  onClose,
  onEnquire,
}: {
  product: Product | null;
  onClose: () => void;
  onEnquire: (p: Product) => void;
}) {
  useEffect(() => {
    if (!product) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [product]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal/60 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-ivory max-w-3xl w-full grid grid-cols-1 sm:grid-cols-2 relative max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 z-10 bg-ivory/90 p-1.5 rounded-full">
          <X size={18} />
        </button>
        <div className="relative w-full h-[40vh] sm:h-auto sm:aspect-[3/4]">
          <SmartImage src={product.main_image} alt={product.name} fill className="object-cover object-top" />
        </div>
        <div className="p-6 sm:p-8 flex flex-col">
          <p className="eyebrow">{product.category.replace(/-/g, ' ')}</p>
          <h3 className="font-serif text-2xl mt-2">{product.name}</h3>
          <p className="text-charcoal/80 mt-3 text-sm leading-relaxed">{product.short_description}</p>
          <p className="mt-4 text-lg">{formatPrice(product.sale_price ?? product.price)}</p>
          <div className="mt-auto pt-6 flex flex-col gap-3">
            <button onClick={() => onEnquire(product)} className="btn-primary">Enquire Now</button>
            <Link href={`/products/${product.slug}`} className="btn-outline text-center">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
