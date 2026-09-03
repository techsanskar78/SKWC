import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';
import { whatsappLink, homepageWhatsAppMessage } from '@/lib/whatsapp';

export default function StoreCTA({ whatsappNumber, mapsUrl }: { whatsappNumber: string; mapsUrl?: string }) {
  return (
    <section className="relative overflow-hidden text-ivory py-20 sm:py-28 px-4">
      <div className="absolute inset-0 hero-kenburns">
        <SmartImage
          src="/images/lehenga-gold.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 bg-charcoal/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/55" />
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light bg-[radial-gradient(ellipse_at_center,rgba(183,138,60,0.35),transparent_65%)]" />
      <div className="cta-shimmer pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-ivory/15 to-transparent" />

      <div className="relative z-10 container-wide text-center">
        <p className="eyebrow text-champagne">Visit Us</p>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl mt-3 drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
          Your Perfect Wedding Look Awaits
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-ivory/80 text-sm sm:text-base">
          Step into the showroom — try the lehenga, pair the jewellery, and leave with a look that feels like you.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <Link href="/book-appointment" className="btn-primary w-full sm:w-auto">
            Book an Appointment
          </Link>
          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline w-full sm:w-auto !border-ivory/50 !text-ivory hover:!border-ivory"
            >
              Get Directions
            </a>
          )}
          {whatsappNumber && (
            <a
              href={whatsappLink(whatsappNumber, homepageWhatsAppMessage)}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp w-full sm:w-auto"
            >
              Chat on WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
