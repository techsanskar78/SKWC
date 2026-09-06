import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { RevealText } from '@/components/ui/RevealText';
import { SiteSettings } from '@/types';

function GoogleMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.6 12.23c0-.74-.07-1.45-.2-2.13H12v4.03h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.99-4.3 2.99-7.42z" />
      <path d="M12 22c2.7 0 4.96-.9 6.62-2.35l-3.23-2.5c-.9.6-2.05.96-3.39.96-2.6 0-4.81-1.76-5.6-4.12H3.06v2.58A10 10 0 0 0 12 22z" />
      <path d="M6.4 13.99A6.01 6.01 0 0 1 6.08 12c0-.69.12-1.36.32-1.99V7.43H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.57l3.34-2.58z" />
      <path d="M12 5.89c1.47 0 2.79.5 3.82 1.5l2.87-2.87C16.95 2.9 14.7 2 12 2A10 10 0 0 0 3.06 7.43l3.34 2.58C7.19 7.65 9.4 5.89 12 5.89z" />
    </svg>
  );
}

function Flourish() {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-10 sm:w-14 bg-gold/70" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-10 sm:w-14 bg-gold/70" />
    </div>
  );
}

export default function SocialBar({ settings }: { settings: SiteSettings }) {
  const items = [
    { name: 'Facebook', href: settings.facebook_url, icon: Facebook },
    { name: 'Instagram', href: settings.instagram_url, icon: Instagram },
    { name: 'Google', href: settings.google_url || settings.google_maps_url, icon: GoogleMark },
    { name: 'LinkedIn', href: settings.linkedin_url, icon: Linkedin },
  ];

  return (
    <section className="bg-cream" aria-label="Find us on social media">
      <div className="container-wide py-14 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <Flourish />
          <p className="eyebrow mt-5">Follow the Collection</p>
          <RevealText
            as="h2"
            text="See the looks as they arrive"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl mt-2"
          />
          <p className="mt-3 text-sm sm:text-base text-charcoal/60">
            Bridal lehengas, jewellery and wedding stories — follow us for the latest from the showroom.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map(({ name, href, icon: Icon }) => {
            const className =
              'group flex flex-col items-center text-center bg-ivory px-4 py-8 sm:py-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(92,10,34,0.35)]';
            const inner = (
              <>
                <span className="relative h-[72px] w-[72px] sm:h-20 sm:w-20">
                  <span className="absolute inset-2 rotate-45 border border-gold bg-ivory group-hover:bg-maroon group-hover:border-maroon transition-colors duration-300" />
                  <span className="absolute inset-0 flex items-center justify-center text-maroon group-hover:text-ivory transition-colors duration-300">
                    <Icon size={22} />
                  </span>
                </span>
                <span className="mt-5 font-serif text-base sm:text-lg text-charcoal group-hover:text-maroon transition-colors">
                  {name}
                </span>
                <span className="mt-1 text-[10px] sm:text-[11px] tracking-widest2 uppercase text-gold">
                  Follow us
                </span>
              </>
            );

            if (href) {
              return (
                <a key={name} href={href} target="_blank" rel="noreferrer" className={className}>
                  {inner}
                </a>
              );
            }

            return (
              <div key={name} className={className}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
