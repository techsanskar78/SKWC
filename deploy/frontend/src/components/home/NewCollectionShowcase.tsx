'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import SmartImage from '@/components/ui/SmartImage';

const LOOKS = [
  { src: '/images/lehenga-green.jpg', alt: 'Emerald sangeet lehenga', href: '/collections', label: 'Sangeet' },
  { src: '/images/lehenga-maroon.jpg', alt: 'Maroon bridal lehenga', href: '/collections/bridal-lehengas', label: 'Bridal' },
  { src: '/images/lehenga-gold.jpg', alt: 'Gold reception lehenga', href: '/collections', label: 'Reception' },
  { src: '/images/gown-ivory.jpg', alt: 'Ivory engagement gown', href: '/collections', label: 'Engagement' },
  { src: '/images/rental.jpg', alt: 'Rental wedding look', href: '/rental', label: 'Rental' },
];

const TITLE = 'New Collection';
const EASE = [0.22, 1, 0.36, 1] as const;

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
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-[#F6EEE4] pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32"
      aria-label="New collection"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 55% 45% at 8% 20%, rgba(92,10,34,0.05), transparent 62%), radial-gradient(ellipse 40% 35% at 92% 15%, rgba(183,138,60,0.10), transparent 60%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(80,52,36,0.06), transparent 70%)',
        }}
      />

      <div className="relative mb-8 sm:mb-14 text-center px-4">
        <Flourish />
        <motion.p
          className="eyebrow mt-5"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Just Arrived
        </motion.p>
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <div className="no-scrollbar flex items-end justify-start gap-3 overflow-x-auto overflow-y-visible px-4 snap-x snap-mandatory sm:gap-5 sm:px-8 md:justify-center md:overflow-visible lg:gap-7">
          {LOOKS.map((look, i) => (
            <motion.div
              key={look.src}
              className="relative w-[38vw] min-w-[132px] max-w-[200px] shrink-0 snap-center md:w-[18.8%] md:min-w-0 md:max-w-[230px] md:shrink"
              initial={reduce ? false : { opacity: 0, y: 56, scale: 0.94 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            >
              <Link
                href={look.href}
                className="group relative block aspect-[10/16] overflow-hidden rounded-t-[999px] bg-champagne shadow-[0_18px_40px_-18px_rgba(28,23,18,0.45)] ring-1 ring-charcoal/10 transition duration-500 md:aspect-[10/17] md:hover:-translate-y-2 md:hover:shadow-[0_28px_55px_-16px_rgba(92,10,34,0.35)] md:hover:ring-gold/70"
              >
                <SmartImage
                  src={look.src}
                  alt={look.alt}
                  fill
                  sizes="(max-width: 768px) 40vw, 230px"
                  className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-80" />
                <span className="pointer-events-none absolute inset-[4px] rounded-t-[999px] ring-1 ring-ivory/20 sm:inset-[5px]" />
                <span className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-1 pb-2.5 sm:px-1.5 sm:pb-5">
                  <span className="text-[9px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.22em] uppercase text-champagne">
                    {look.label}
                  </span>
                  <span className="mt-1 h-px w-5 bg-gold/80 md:w-0 md:bg-gold md:transition-all md:duration-500 md:group-hover:w-8" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <h2 className="relative z-10 mt-6 px-3 text-center font-serif font-normal leading-[0.9] text-charcoal sm:mt-8 md:pointer-events-none md:absolute md:-bottom-5 md:left-0 md:right-0 md:mt-0 lg:-bottom-6">
          <span className="sr-only">{TITLE}</span>
          <span
            aria-hidden
            className="inline-flex flex-wrap justify-center text-[clamp(1.85rem,11vw,7.25rem)]"
          >
            {Array.from(TITLE).map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  className="relative inline-block"
                  initial={reduce ? false : { y: '120%' }}
                  whileInView={reduce ? undefined : { y: '0%' }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.75, delay: 0.42 + i * 0.04, ease: EASE }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                  {ch === 'i' && (
                    <span className="absolute -top-1.5 left-1/2 h-2 w-2 -translate-x-1/2 text-gold sm:-top-3 sm:h-3.5 sm:w-3.5">
                      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                        <path d="M8 0l1.2 6.2L16 8l-6.8 1.8L8 16l-1.2-6.2L0 8l6.8-1.8z" />
                      </svg>
                    </span>
                  )}
                </motion.span>
              </span>
            ))}
          </span>
        </h2>
      </div>

      <motion.div
        className="relative z-10 mt-8 flex justify-center px-4 sm:mt-16 md:mt-20"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
      >
        <Link
          href="/collections?filter=new"
          className="text-[11px] sm:text-xs tracking-[0.22em] uppercase text-maroon border-b border-maroon/30 pb-0.5 hover:border-maroon transition-colors"
        >
          Explore the edit
        </Link>
      </motion.div>
    </section>
  );
}
