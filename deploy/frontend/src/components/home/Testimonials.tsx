import { Star } from 'lucide-react';
import { Testimonial } from '@/types';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="eyebrow">Kind Words</p>
          <h2 className="font-serif text-3xl sm:text-4xl mt-2">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((t) => (
            <div key={t.id} className="bg-ivory p-5 sm:p-7">
              <div className="flex gap-1 mb-3 text-gold">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-sm text-charcoal/75 leading-relaxed">&ldquo;{t.testimonial}&rdquo;</p>
              <p className="mt-4 font-serif text-sm">{t.customer_name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
