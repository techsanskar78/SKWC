import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';
import { Category } from '@/types';

export default function FeaturedCategories({ categories }: { categories: Category[] }) {
  if (!categories.length) return null;

  return (
    <section className="container-wide py-12 sm:py-16 lg:py-20">
      <div className="mb-10 text-center">
        <p className="eyebrow">Shop the Collection</p>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2">Curated Categories</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((c) => (
          <Link key={c.id} href={`/collections/${c.slug}`} className="group relative aspect-[3/4] overflow-hidden block">
            {c.image && (
              <SmartImage
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/40 transition-colors" />
            <div className="absolute inset-0 flex items-end p-3 sm:p-5">
              <h3 className="font-serif text-sm sm:text-lg lg:text-xl text-ivory leading-snug">{c.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
