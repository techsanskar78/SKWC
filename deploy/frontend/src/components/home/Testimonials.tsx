import { Star } from 'lucide-react';
import { Testimonial } from '@/types';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const featured = testimonials.filter((t) => t.status === 'active').slice(0, 5);
  if (!featured.length) return null;

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <div className="text-center mb-10 sm:mb-14">
          <p className="eyebrow">Google Reviews</p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2">What Our Customers Say</h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal/60 max-w-xl mx-auto">
            Real words from brides and families who found their wedding look with us.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {featured.map((t) => (
            <article
              key={t.id}
              className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)] bg-ivory p-6 sm:p-7 shadow-[0_12px_40px_-20px_rgba(28,23,18,0.35)] border border-charcoal/5"
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
          ))}
        </div>
      </div>
    </section>
  );
}
