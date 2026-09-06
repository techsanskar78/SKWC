'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { Product, Category } from '@/types';
import ProductGrid from './ProductGrid';
import { cn } from '@/utils';

type Sort = 'featured' | 'newest' | 'price_low' | 'price_high';

export default function CollectionsClient({
  products,
  categories,
  initialCategory,
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get('filter');

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory || '');
  const [occasion, setOccasion] = useState('');
  const [onlyRental, setOnlyRental] = useState(initialFilter === 'rental');
  const [onlySale, setOnlySale] = useState(initialFilter === 'sale');
  const [onlyNew, setOnlyNew] = useState(initialFilter === 'new');
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [sort, setSort] = useState<Sort>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const occasions = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.occasion || []))).filter(Boolean),
    [products]
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.status === 'active');

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.product_code.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    if (category) list = list.filter((p) => p.category === category);
    if (occasion) list = list.filter((p) => (p.occasion || []).includes(occasion));
    if (onlyRental) list = list.filter((p) => p.rental_available);
    if (onlySale) list = list.filter((p) => p.sale);
    if (onlyNew) list = list.filter((p) => p.new_arrival);
    if (onlyFeatured) list = list.filter((p) => p.featured);

    switch (sort) {
      case 'newest':
        list = [...list].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
        break;
      case 'price_low':
        list = [...list].sort((a, b) => (a.sale_price ?? a.price ?? 0) - (b.sale_price ?? b.price ?? 0));
        break;
      case 'price_high':
        list = [...list].sort((a, b) => (b.sale_price ?? b.price ?? 0) - (a.sale_price ?? a.price ?? 0));
        break;
      default:
        list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [products, query, category, occasion, onlyRental, onlySale, onlyNew, onlyFeatured, sort]);

  const clearAll = () => {
    setQuery(''); setCategory(''); setOccasion('');
    setOnlyRental(false); setOnlySale(false); setOnlyNew(false); setOnlyFeatured(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mb-6 min-w-0">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, code, category…"
          className="w-full min-w-0 sm:flex-1 sm:min-w-[180px] border border-charcoal/20 px-4 py-2.5 text-sm bg-transparent"
        />
        <div className="flex gap-3 min-w-0">
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="min-w-0 flex-1 sm:flex-none border border-charcoal/20 px-3 py-2.5 text-sm bg-ivory">
            <option value="featured">Sort: Featured</option>
            <option value="newest">Sort: Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
          <button onClick={() => setFiltersOpen((o) => !o)} className="btn-outline !px-4 !py-2.5 text-xs flex items-center gap-2 whitespace-nowrap shrink-0">
            <SlidersHorizontal size={14} /> Filters
          </button>
        </div>
      </div>

      <div className={cn('flex flex-wrap gap-2.5 sm:gap-3 mb-8', filtersOpen ? 'flex' : 'hidden')}>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full min-w-0 sm:w-auto border border-charcoal/20 px-3 py-2 text-sm bg-ivory">
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </select>
        <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="w-full min-w-0 sm:w-auto border border-charcoal/20 px-3 py-2 text-sm bg-ivory">
          <option value="">All Occasions</option>
          {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {[
          { label: 'New Arrivals', value: onlyNew, set: setOnlyNew },
          { label: 'Sale', value: onlySale, set: setOnlySale },
          { label: 'Rental', value: onlyRental, set: setOnlyRental },
          { label: 'Featured', value: onlyFeatured, set: setOnlyFeatured },
        ].map(({ label, value, set }) => (
          <button
            key={label}
            onClick={() => set(!value)}
            className={cn('flex-1 sm:flex-none px-3 py-2 text-sm border min-w-[46%]', value ? 'bg-maroon text-ivory border-maroon' : 'border-charcoal/20 text-charcoal/70')}
          >
            {label}
          </button>
        ))}
        <button onClick={clearAll} className="px-3 py-2 text-sm text-charcoal/50 flex items-center gap-1">
          <X size={14} /> Clear
        </button>
      </div>

      <p className="text-sm text-charcoal/50 mb-6">{filtered.length} products</p>
      <ProductGrid products={filtered} />
    </div>
  );
}
