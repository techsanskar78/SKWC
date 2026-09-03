import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import ContactForm from '@/components/forms/ContactForm';
import { SiteSettings } from '@/types';
import { whatsappLink, homepageWhatsAppMessage } from '@/lib/whatsapp';

function Flourish({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3" aria-hidden>
      <span className={`h-px w-8 sm:w-12 ${light ? 'bg-champagne/70' : 'bg-gold/70'}`} />
      <span className={`h-1.5 w-1.5 rotate-45 ${light ? 'bg-champagne' : 'bg-gold'}`} />
      <span className={`h-px w-8 sm:w-12 ${light ? 'bg-champagne/70' : 'bg-gold/70'}`} />
    </div>
  );
}

export default function ContactPage({ settings }: { settings: SiteSettings }) {
  const details = [
    {
      icon: Phone,
      label: 'Call us',
      value: settings.phone,
      href: settings.phone ? `tel:${settings.phone}` : undefined,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat with our team',
      href: settings.whatsapp_number
        ? whatsappLink(settings.whatsapp_number, homepageWhatsAppMessage)
        : undefined,
      external: true,
    },
    {
      icon: Mail,
      label: 'Email',
      value: settings.email,
      href: settings.email ? `mailto:${settings.email}` : undefined,
      breakAll: true,
    },
    {
      icon: MapPin,
      label: 'Showroom',
      value: settings.address,
    },
    {
      icon: Clock,
      label: 'Hours',
      value: settings.business_hours,
    },
  ];

  return (
    <div>
      <section className="relative h-[56svh] min-h-[380px] sm:h-[62svh] sm:min-h-[440px] lg:h-[68svh] overflow-hidden">
        <SmartImage
          src="/images/lehenga-gold.jpg"
          alt="Visit Shri Krishna Wedding Collection"
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/20" />
        <div className="relative h-full container-wide flex flex-col justify-end pb-10 sm:pb-14 text-ivory">
          <p className="eyebrow text-champagne">Get in Touch</p>
          <h1 className="font-serif text-[2rem] leading-tight sm:text-5xl lg:text-6xl max-w-3xl mt-3">
            Let us style your celebration
          </h1>
          <p className="mt-4 max-w-xl text-ivory/85 text-sm sm:text-lg">
            Write to us, visit the showroom, or start on WhatsApp — we are here to help you find the look.
          </p>
        </div>
      </section>

      <section className="container-wide py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <Flourish />
            <p className="eyebrow mt-5">Message Us</p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2 leading-tight">
              Tell us what you are looking for
            </h2>
            <p className="mt-4 mb-8 text-charcoal/65 max-w-md leading-relaxed">
              Share your occasion, date and style — our team will get back with collection suggestions
              and a time to visit.
            </p>
            <ContactForm />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden">
              <SmartImage
                src="/images/necklace.jpg"
                alt="Wedding jewellery at the showroom"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {details
                .filter((d) => d.label !== 'WhatsApp' || settings.whatsapp_number)
                .map(({ icon: Icon, label, value, href, external, breakAll }) => {
                const inner = (
                  <>
                    <Icon size={18} className="text-gold shrink-0 mt-0.5" strokeWidth={1.6} />
                    <span className="min-w-0">
                      <span className="block text-[10px] tracking-widest2 uppercase text-gold">{label}</span>
                      <span className={`block mt-1 text-sm text-charcoal leading-snug ${breakAll ? 'break-all' : 'break-words'}`}>
                        {value}
                      </span>
                    </span>
                  </>
                );
                const className = 'flex items-start gap-3 bg-cream p-4 sm:p-5 h-full';
                if (href) {
                  return (
                    <a
                      key={label}
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className={`${className} hover:bg-champagne/40 transition-colors`}
                    >
                      {inner}
                    </a>
                  );
                }
                return (
                  <div key={label} className={className}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[260px] sm:min-h-[360px] lg:min-h-[480px]">
          <SmartImage
            src="/images/lehenga-maroon.jpg"
            alt="Book a styling appointment"
            fill
            sizes="50vw"
            className="object-cover object-top"
          />
        </div>
        <div className="bg-maroon text-ivory flex flex-col justify-center px-5 sm:px-10 lg:px-16 py-14 sm:py-16">
          <Flourish light />
          <p className="eyebrow text-champagne mt-5">Visit the Showroom</p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2 leading-tight max-w-md">
            Prefer to try the look in person?
          </h2>
          <p className="mt-5 text-ivory/80 max-w-md leading-relaxed">
            Book a private styling hour. We will help you drape, pair jewellery, and leave with a look
            that feels like you.
          </p>
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
                WhatsApp Us
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
