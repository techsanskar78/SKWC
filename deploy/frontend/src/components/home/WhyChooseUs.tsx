import { Sparkles, Gem, Users, Repeat, Headphones, Store } from 'lucide-react';
import { RevealIn, RevealText } from '@/components/ui/RevealText';

const POINTS = [
  { icon: Sparkles, title: 'Curated Wedding Collection', text: 'Handpicked lehengas, wedding wear and jewellery for every ceremony.' },
  { icon: Gem, title: 'Premium Quality', text: 'Fine fabrics and craftsmanship, chosen with care.' },
  { icon: Users, title: 'Personal Styling', text: 'In-store guidance to find the look that suits you.' },
  { icon: Repeat, title: 'Purchase & Rental Options', text: 'Buy to keep, or rent for your special occasion.' },
  { icon: Headphones, title: 'Customer Support', text: 'We are with you from enquiry to appointment.' },
  { icon: Store, title: 'In-store Experience', text: 'Visit us to see and try the collection in person.' },
];

export default function WhyChooseUs() {
  return (
    <section className="container-wide py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-12">
        <RevealText as="p" text="Why Shri Krishna Wedding Collection" className="eyebrow" />
        <RevealText
          as="h2"
          delay={0.08}
          text="Crafted for Your Celebration"
          className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {POINTS.map(({ icon: Icon, title, text }, i) => (
          <RevealIn key={title} delay={i * 0.06} className="flex flex-col items-start">
            <Icon size={28} className="text-gold mb-4" strokeWidth={1.5} />
            <h3 className="font-serif text-lg mb-1.5">{title}</h3>
            <p className="text-sm text-charcoal/65 leading-relaxed">{text}</p>
          </RevealIn>
        ))}
      </div>
    </section>
  );
}
