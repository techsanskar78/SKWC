import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';

const LOOKS = [
  { src: '/images/lehenga-green.jpg', alt: 'Emerald sangeet lehenga', href: '/collections', label: 'Sangeet' },
  { src: '/images/lehenga-maroon.jpg', alt: 'Maroon bridal lehenga', href: '/collections/bridal-lehengas', label: 'Bridal' },
  { src: '/images/lehenga-gold.jpg', alt: 'Gold reception lehenga', href: '/collections', label: 'Reception' },
  { src: '/images/gown-ivory.jpg', alt: 'Ivory engagement gown', href: '/collections', label: 'Engagement' },
  { src: '/images/rental.jpg', alt: 'Rental wedding look', href: '/rental', label: 'Rental' },
];

const TITLE = 'New Collection';

function Flourish() {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-8 sm:w-12 bg-gold/60" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-8 sm:w-12 bg-gold/60" />
    </div>
  );
}

export default function NewCollectionShowcase() {
  return (
    <section
      className="relative overflow-hidden bg-[#F6EEE4] pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32"
      aria-label="New collection"
    >
      <div className="relative mb-8 sm:mb-14 text-center px-4">
        <Flourish />
        <p className="eyebrow mt-5">Just Arrived</p>
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <div className="no-scrollbar flex items-end justify-start gap-3 overflow-x-auto overflow-y-visible px-4 snap-x snap-mandatory sm:gap-5 sm:px-8 md:justify-center md:overflow-visible lg:gap-7">
          {LOOKS.map((look) => (
            <div
              key={look.src}
              className="relative w-[38vw] min-w-[132px] max-w-[200px] shrink-0 snap-center md:w-[18.8%] md:min-w-0 md:max-w-[230px] md:shrink"
            >
              <Link
                href={look.href}
                className="group relative block aspect-[10/16] overflow-hidden rounded-t-[999px] bg-champagne shadow-[0_18px_40px_-18px_rgba(28,23,18,0.45)] ring-1 ring-charcoal/10 transition duration-300 md:aspect-[10/17] md:hover:-translate-y-1 md:hover:ring-gold/70"
              >
                <SmartImage
                  src={look.src}
                  alt={look.alt}
                  fill
                  sizes="(max-width: 768px) 40vw, 230px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-80" />
                <span className="pointer-events-none absolute inset-[4px] rounded-t-[999px] ring-1 ring-ivory/20 sm:inset-[5px]" />
                <span className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-1 pb-2.5 sm:px-1.5 sm:pb-5">
                  <span className="text-[9px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.22em] uppercase text-champagne">
                    {look.label}
                  </span>
                  <span className="mt-1 h-px w-5 bg-gold/80" />
                </span>
              </Link>
            </div>
          ))}
        </div>

        <h2 className="relative z-10 mt-6 px-3 text-center font-serif font-normal leading-[0.9] text-charcoal sm:mt-8 md:pointer-events-none md:absolute md:-bottom-5 md:left-0 md:right-0 md:mt-0 lg:-bottom-6">
          <span className="sr-only">{TITLE}</span>
          <span aria-hidden className="inline-flex flex-wrap justify-center text-[clamp(1.85rem,11vw,7.25rem)]">
            {Array.from(TITLE).map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span className="letter-up relative inline-block" style={{ animationDelay: `${i * 40}ms` }}>
                  {ch === ' ' ? '\u00A0' : ch}
                  {ch === 'i' && (
                    <span className="absolute -top-1.5 left-1/2 h-2 w-2 -translate-x-1/2 text-gold sm:-top-3 sm:h-3.5 sm:w-3.5">
                      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                        <path d="M8 0l1.2 6.2L16 8l-6.8 1.8L8 16l-1.2-6.2L0 8l6.8-1.8z" />
                      </svg>
                    </span>
                  )}
                </span>
              </span>
            ))}
          </span>
        </h2>
      </div>

      <div className="relative z-10 mt-8 flex justify-center px-4 sm:mt-16 md:mt-20">
        <Link
          href="/collections?filter=new"
          className="text-[11px] sm:text-xs tracking-[0.22em] uppercase text-maroon border-b border-maroon/30 pb-0.5 hover:border-maroon transition-colors"
        >
          Explore the edit
        </Link>
      </div>
    </section>
  );
}
