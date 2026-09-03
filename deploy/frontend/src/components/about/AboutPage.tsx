import Link from 'next/link';
import { Heart, Gem, Sparkles, Store, Clock, MapPin } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import { SiteSettings } from '@/types';
import { whatsappLink, homepageWhatsAppMessage } from '@/lib/whatsapp';

const PROMISES = [
  {
    icon: Sparkles,
    title: 'Curated, never crowded',
    text: 'Every lehenga and jewel is chosen for craft, colour and how it photographs — not for filling a rack.',
  },
  {
    icon: Heart,
    title: 'Styled with you',
    text: 'In-store, we drape, pair jewellery and find the silhouette that feels like you on your wedding day.',
  },
  {
    icon: Gem,
    title: 'Buy or rent',
    text: 'Keep your bridal look as an heirloom, or rent a reception piece for one unforgettable evening.',
  },
  {
    icon: Store,
    title: 'A showroom you can trust',
    text: 'See the embroidery, feel the fabric, try the jewellery. The right look is decided in person.',
  },
];

const LOOKS = [
  { href: '/collections/bridal-lehengas', src: '/images/lehenga-maroon.jpg', title: 'Bridal Lehengas', caption: 'Pheras & portraits' },
  { href: '/collections', src: '/images/lehenga-gold.jpg', title: 'Reception Couture', caption: 'The grand entry' },
  { href: '/collections/jewellery', src: '/images/necklace.jpg', title: 'Wedding Jewellery', caption: 'Kundan, polki & gold' },
  { href: '/rental', src: '/images/rental.jpg', title: 'Rental Collection', caption: 'Wear it, love it' },
];

function Flourish({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3" aria-hidden>
      <span className={`h-px w-8 sm:w-12 ${light ? 'bg-champagne/70' : 'bg-gold/70'}`} />
      <span className={`h-1.5 w-1.5 rotate-45 ${light ? 'bg-champagne' : 'bg-gold'}`} />
      <span className={`h-px w-8 sm:w-12 ${light ? 'bg-champagne/70' : 'bg-gold/70'}`} />
    </div>
  );
}

export default function AboutPage({ settings }: { settings: SiteSettings }) {
  return (
    <div>
      <section className="relative h-[72svh] min-h-[440px] sm:h-[78svh] sm:min-h-[520px] lg:h-[85svh] overflow-hidden">
        <SmartImage
          src="/images/hero.jpg"
          alt="Bridal collection at Shri Krishna Wedding Collection"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/35 to-charcoal/15" />
        <div className="relative h-full container-wide flex flex-col justify-end pb-10 sm:pb-16 text-ivory">
          <p className="eyebrow text-champagne">Our Story</p>
          <h1 className="font-serif text-[2rem] leading-tight sm:text-5xl lg:text-6xl max-w-3xl mt-3">
            A house of bridal dreams
          </h1>
          <p className="mt-4 max-w-xl text-ivory/85 text-sm sm:text-lg">
            From the first drape to the final jewel — looks styled for the pheras, the portraits, and the moment you walk in.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-wide py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 text-center">
          {['Bridal Lehengas', 'Fine Jewellery', 'Purchase & Rental'].map((label, i) => (
            <div
              key={label}
              className={i < 2 ? 'sm:border-r sm:border-gold/25' : ''}
            >
              <p className="font-serif text-xl sm:text-2xl text-maroon">{label}</p>
              <p className="text-[11px] tracking-widest2 uppercase text-gold mt-2">
                {i === 0 ? 'Hand-finished couture' : i === 1 ? 'Heirloom-inspired' : 'Your occasion, your way'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wide py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="relative pr-6 sm:pr-10 pb-8">
            <div className="relative aspect-[3/4] overflow-hidden">
              <SmartImage
                src="/images/lehenga-maroon.jpg"
                alt="Maroon bridal lehenga"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 sm:-right-8 w-[42%] aspect-[3/4] overflow-hidden ring-[6px] ring-ivory shadow-lg">
              <SmartImage
                src="/images/necklace.jpg"
                alt="Bridal necklace"
                fill
                sizes="30vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:pl-4 pt-10 lg:pt-0">
            <Flourish />
            <p className="eyebrow mt-5">The Atelier</p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2 leading-tight">
              Where every wedding look is chosen with care
            </h2>
            <div className="mt-6 space-y-4 text-charcoal/75 leading-relaxed text-[15px] sm:text-base">
              <p>
                {settings.business_name} is a destination for brides and families who want their wedding wardrobe
                to feel as special as the day itself. Our showroom brings together hand-embroidered lehengas,
                wedding couture and jewellery — selected for craft, colour, and how they live in real light.
              </p>
              <p>
                A wedding look is not assembled from a screen. It is styled in person: the weight of the fabric,
                the fall of the dupatta, the way kundan sits against the neckline. That is why we welcome you to
                visit — to try, to feel, and to leave with a look that is entirely yours.
              </p>
              <p>
                Whether you are buying your bridal lehenga to keep, or renting a reception ensemble for one
                unforgettable evening, our team is here to guide you from the first enquiry to the final fitting.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/collections" className="btn-primary">Explore Collection</Link>
              <Link href="/book-appointment" className="btn-outline">Book a Styling Visit</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Flourish />
            <p className="eyebrow mt-5">Our Promise</p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2">What you can expect</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-8">
            {PROMISES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-ivory p-6 sm:p-8 border-l-2 border-gold">
                <Icon size={26} className="text-gold mb-4" strokeWidth={1.4} />
                <h3 className="font-serif text-xl mb-2">{title}</h3>
                <p className="text-sm text-charcoal/65 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-14 sm:py-20 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow">The Collection</p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2">Looks for every ceremony</h2>
          </div>
          <Link href="/collections" className="text-sm uppercase tracking-wide border-b border-charcoal/30 hover:border-maroon hover:text-maroon w-fit">
            View all collections
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {LOOKS.map((look) => (
            <Link key={look.title} href={look.href} className="group relative aspect-[3/4] overflow-hidden block">
              <SmartImage
                src={look.src}
                alt={look.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                <p className="font-serif text-ivory text-sm sm:text-xl leading-snug">{look.title}</p>
                <p className="text-[10px] sm:text-xs tracking-widest uppercase text-champagne mt-1">{look.caption}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[520px]">
          <SmartImage
            src="/images/gown-ivory.jpg"
            alt="Visit the showroom"
            fill
            sizes="50vw"
            className="object-cover object-top"
          />
        </div>
        <div className="bg-maroon text-ivory flex flex-col justify-center px-5 sm:px-10 lg:px-16 py-14 sm:py-16">
          <Flourish light />
          <p className="eyebrow text-champagne mt-5">Visit the Showroom</p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2 leading-tight max-w-md">
            Come try the look that photographs like a memory
          </h2>
          <p className="mt-5 text-ivory/80 max-w-md leading-relaxed">
            Walk in, or book a private styling hour. We will help you find the lehenga, the jewellery, and the
            finishing details for your celebration.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-ivory/90">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-champagne" />
              <span className="break-words">{settings.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-champagne" />
              <span>{settings.business_hours}</span>
            </li>
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <Link href="/book-appointment" className="btn-outline !border-ivory/50 !text-ivory hover:!border-ivory text-center">
              Book Appointment
            </Link>
            {settings.whatsapp_number && (
              <a
                href={whatsappLink(settings.whatsapp_number, homepageWhatsAppMessage)}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp text-center"
              >
                Chat on WhatsApp
              </a>
            )}
            {settings.google_maps_url && (
              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noreferrer"
                className="btn-outline !border-ivory/50 !text-ivory hover:!border-ivory text-center"
              >
                Get Directions
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
