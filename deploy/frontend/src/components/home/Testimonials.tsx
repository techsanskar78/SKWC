import { Star } from 'lucide-react';
import { demoTestimonials } from 'skwc-backend';
import { RevealIn, RevealText } from '@/components/ui/RevealText';
import { Testimonial } from '@/types';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const fromProps = testimonials.filter((t) => t.status === 'active');
  const featured = (fromProps.length ? fromProps : demoTestimonials).slice(0, 5);
  if (!featured.length) return null;

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <div className="text-center mb-10 sm:mb-14">
          <RevealText as="p" text="Google Reviews" className="eyebrow" />
          <RevealText
            as="h2"
            delay={0.08}
            text="What Our Customers Say"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2"
          />
          <RevealText
            as="p"
            delay={0.18}
            text="Real words from brides and families who found their wedding look with us."
            className="mt-3 text-sm sm:text-base text-charcoal/60 max-w-xl mx-auto"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {featured.map((t, i) => (
            <RevealIn
              key={t.id}
              delay={i * 0.07}
              className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)]"
            >
            <article
              className="h-full bg-ivory p-6 sm:p-7 shadow-[0_12px_40px_-20px_rgba(28,23,18,0.35)] border border-charcoal/5"
            >
              <p className="font-serif text-4xl leading-none text-gold/70 mb-2" aria-hidden>
                “
              </p>
              <div className="flex gap-0.5 mb-3 text-gold" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm sm:text-[15px] text-charcoal/80 leading-relaxed">&ldquo;{t.testimonial}&rdquo;</p>
              <div className="mt-5 pt-4 border-t border-charcoal/8">
                <p className="font-serif text-base text-charcoal">{t.customer_name}</p>
                <p className="text-[11px] tracking-[0.14em] uppercase text-gold mt-1">Google Review</p>
              </div>
            </article>
            </RevealIn>
          ))}
        </div>
      </div>
    </section>
  );
}
