import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';
import { RevealIn, RevealText } from '@/components/ui/RevealText';
import { Category } from '@/types';
import { CORE_CATEGORY_SLUGS } from '@/lib/trousseau';

export default function FeaturedCategories({ categories }: { categories: Category[] }) {
  const core = categories.filter((c) => CORE_CATEGORY_SLUGS.includes(c.slug));
  const visible = core.length ? core : categories.filter((c) => c.slug !== 'party-wear').slice(0, 6);
  if (!visible.length) return null;

  return (
    <section className="container-wide py-12 sm:py-16 lg:py-20">
      <div className="mb-10 text-center">
        <RevealText as="p" text="Shop the Collection" className="eyebrow" />
        <RevealText
          as="h2"
          delay={0.08}
          text="Curated Categories"
          className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2"
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {visible.map((c, i) => (
          <RevealIn key={c.id} delay={i * 0.06} className="min-w-0">
          <Link href={`/collections/${c.slug}`} className="group relative aspect-[3/4] overflow-hidden block min-w-0">
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
              <h3 className="font-serif text-sm sm:text-lg lg:text-xl text-ivory leading-snug line-clamp-2">{c.name}</h3>
            </div>
          </Link>
          </RevealIn>
        ))}
      </div>
    </section>
  );
}
