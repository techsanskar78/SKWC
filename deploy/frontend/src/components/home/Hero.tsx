'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import { cn } from '@/utils';

const SLIDE_MS = 4000;

const SLIDES = [
  {
    src: '/images/hero.jpg',
    eyebrow: 'Bridal Lehengas',
    headline: 'Where Every Wedding Dream Finds Its Perfect Look',
    subtitle:
      'Hand-embroidered bridal lehengas in maroon and gold — crafted for the pheras, the portraits, and the moment you walk in.',
  },
  {
    src: '/images/lehenga-maroon.jpg',
    eyebrow: 'The Bridal Edit',
    headline: 'Royal Lehengas, Made for Your Most Beautiful Beginning',
    subtitle:
      'Heavy zari, kundan jewellery and a silhouette that photographs like a heirloom — visit the store to try the full bridal look.',
  },
  {
    src: '/images/lehenga-gold.jpg',
    eyebrow: 'Reception Lehengas',
    headline: 'Gold Couture for the Evening You Will Always Remember',
    subtitle:
      'Champagne and gold lehengas styled for receptions and grand entries — a look that feels as special as the celebration.',
  },
];

export default function Hero({
  headline,
  subtitle,
}: {
  headline: string;
  subtitle: string;
}) {
  const slides = [
    { ...SLIDES[0], headline: headline || SLIDES[0].headline, subtitle: subtitle || SLIDES[0].subtitle },
    SLIDES[1],
    SLIDES[2],
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(0);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(index + 1), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [index, paused, go]);

  const slide = slides[index];

  return (
    <section
      className="relative h-[100svh] min-h-[560px] max-h-[900px] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (dx > 40) go(index - 1);
        else if (dx < -40) go(index + 1);
        setPaused(false);
      }}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      {slides.map((item, i) => (
        <div
          key={item.src}
          className={cn(
            'absolute inset-0 transition-opacity duration-700 ease-in-out',
            i === index ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className={cn('absolute inset-0', i === index && 'hero-kenburns')}>
            <SmartImage
              src={item.src}
              alt={item.headline}
              fill
              priority={i === 0}
              sizes="100vw"
              quality={65}
              className="object-cover object-top"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/10" />
        </div>
      ))}

      <div className="relative h-full container-wide flex flex-col justify-end pb-20 sm:pb-24 text-ivory">
        <div key={slide.headline} className="transition-opacity duration-500">
          <p className="eyebrow text-champagne mb-3 sm:mb-4">{slide.eyebrow}</p>
          <h1 className="font-serif text-[1.7rem] leading-tight sm:text-5xl lg:text-6xl max-w-3xl">
            {slide.headline}
          </h1>
          <p className="mt-3 sm:mt-5 max-w-xl text-ivory/85 text-sm sm:text-lg">{slide.subtitle}</p>
        </div>

        <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4">
          <Link href="/collections" className="btn-primary w-full sm:w-auto">Explore Collection</Link>
          <Link href="/book-appointment" className="btn-outline w-full sm:w-auto !border-ivory/50 !text-ivory hover:!border-ivory">
            Book an Appointment
          </Link>
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className="flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/30 text-ivory backdrop-blur-sm hover:bg-charcoal/50 transition"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className="flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/30 text-ivory backdrop-blur-sm hover:bg-charcoal/50 transition"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((item, i) => (
          <button
            key={item.src}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={cn(
              'h-2 min-w-[8px] rounded-full transition-all duration-500',
              i === index ? 'w-8 sm:w-10 bg-ivory' : 'w-2 bg-ivory/40 hover:bg-ivory/70'
            )}
          />
        ))}
      </div>
    </section>
  );
}
