'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import SmartImage from '@/components/ui/SmartImage';
import { RevealText } from '@/components/ui/RevealText';
import { TROUSSEAU } from '@/lib/trousseau';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CompleteTheLook() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-ivory py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <div className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
          <RevealText as="p" text="The Complete Trousseau" className="eyebrow" />
          <RevealText
            as="h2"
            delay={0.08}
            text="Every Detail, Styled"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2"
          />
          <p className="mt-3 text-sm sm:text-base text-charcoal/60">
            Potli, kaleere, blouse, jewellery and more — finish the bridal look in one visit.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {TROUSSEAU.map((item, i) => (
            <motion.div
              key={item.slug}
              className="min-w-0"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.04, ease: EASE }}
            >
              <Link
                href={`/collections/${item.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-cream"
              >
                <SmartImage
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <span className="absolute inset-0 flex flex-col justify-end p-2.5 sm:p-5">
                  <span className="text-[8px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-champagne">
                    {item.tag}
                  </span>
                  <span className="font-serif text-[13px] sm:text-xl text-ivory leading-snug mt-1 line-clamp-2">
                    {item.name}
                  </span>
                  <span className="mt-1.5 text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-gold sm:opacity-0 sm:translate-y-1 sm:transition-all sm:duration-300 sm:group-hover:opacity-100 sm:group-hover:translate-y-0">
                    View
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <Link href="/accessories" className="btn-outline w-full sm:w-auto">
            View all extras
          </Link>
        </div>
      </div>
    </section>
  );
}
