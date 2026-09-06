'use client';

import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';
import { Heart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, cn } from '@/utils';
import { useWishlist } from '@/hooks/use-wishlist';
import Badge from './Badge';

export default function ProductCard({ product, onQuickView }: { product: Product; onQuickView?: (p: Product) => void }) {
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const displayPrice = product.rental_available
    ? `${formatPrice(product.rental_price)} / rental`
    : product.sale && product.sale_price
    ? formatPrice(product.sale_price)
    : formatPrice(product.price);

  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        <Link href={`/products/${product.slug}`} className="block absolute inset-0">
          <SmartImage
            src={product.main_image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-top"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.new_arrival && <Badge variant="new">New</Badge>}
            {product.sale && <Badge variant="sale">Sale</Badge>}
            {product.rental_available && <Badge variant="rental">Rental</Badge>}
          </div>
        </Link>

        <button
          aria-label="Toggle wishlist"
          onClick={() => toggle(product.id)}
          className="absolute top-3 right-3 z-10 bg-ivory/90 p-2 rounded-full hover:bg-ivory transition"
        >
          <Heart size={16} className={cn(wishlisted ? 'fill-maroon text-maroon' : 'text-charcoal')} />
        </button>

        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-2 sm:bottom-3 left-1/2 z-10 -translate-x-1/2 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 bg-ivory/95 text-charcoal text-[10px] sm:text-xs tracking-wide uppercase px-2.5 py-1.5 sm:px-4 sm:py-2 flex items-center gap-1.5"
          >
            <Eye size={14} /> View
          </button>
        )}
      </div>

      <div className="mt-2 sm:mt-3 space-y-0.5 sm:space-y-1">
        <p className="text-[10px] sm:text-[11px] tracking-widest2 uppercase text-charcoal/50 truncate">{product.category.replace(/-/g, ' ')}</p>
        <Link href={`/products/${product.slug}`} className="block font-serif text-sm sm:text-base text-charcoal hover:text-maroon transition-colors leading-snug line-clamp-2">
          {product.name}
        </Link>
        <p className="text-sm text-charcoal/80">
          {displayPrice}
          {product.sale && product.price && (
            <span className="ml-2 text-charcoal/40 line-through">{formatPrice(product.price)}</span>
          )}
        </p>
      </div>
    </div>
  );
}
