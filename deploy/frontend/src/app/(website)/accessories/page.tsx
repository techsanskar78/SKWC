import Link from 'next/link';
import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import SmartImage from '@/components/ui/SmartImage';
import { TROUSSEAU } from '@/lib/trousseau';

export const metadata: Metadata = {
  title: 'Accessories & Jewellery',
  description:
    'Potli, kaleere, dupatta, designer blouse, temple jewellery, American diamond, rings, bracelets and more.',
};

export default function AccessoriesPage() {
  return (
    <div>
      <PageHero
        src="/images/bridal-jewellery-set.jpg"
        eyebrow="Complete the Look"
        title="Accessories & Jewellery"
        subtitle="From potli and kaleere to antique temple sets — every finishing piece for the wedding."
      />
      <section className="container-wide page-pad">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {TROUSSEAU.map((item) => (
            <Link
              key={item.slug}
              href={`/collections/${item.slug}`}
              className="group relative block aspect-[4/5] min-w-0 overflow-hidden bg-cream"
            >
              <SmartImage
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-transparent" />
              <span className="absolute inset-0 flex flex-col justify-end p-2.5 sm:p-5">
                <span className="text-[8px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-champagne">
                  {item.tag}
                </span>
                <span className="font-serif text-[13px] sm:text-xl text-ivory leading-snug mt-1 line-clamp-2">
                  {item.name}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
