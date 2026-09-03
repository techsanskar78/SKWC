import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';

export default function BridalSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
      <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
        <SmartImage
          src="/images/lehenga-maroon.jpg"
          alt="Bridal collection"
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="bg-maroon text-ivory flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-12 sm:py-16">
        <p className="eyebrow text-champagne">The Bridal Edit</p>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-3 max-w-md leading-tight">
          Made for Your Most Beautiful Beginning
        </h2>
        <p className="mt-5 text-ivory/80 max-w-md">
          A collection of hand-finished bridal lehengas, wedding couture and heirloom-inspired jewellery — designed for the moments you'll remember forever.
        </p>
        <Link href="/collections/bridal-lehengas" className="btn-outline !border-ivory/50 !text-ivory hover:!border-ivory mt-8 w-full sm:w-fit text-center">
          Explore Bridal Collection
        </Link>
      </div>
    </section>
  );
}
