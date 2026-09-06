import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SiteSettings } from '@/types';

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-charcoal text-ivory/80 mt-16 sm:mt-24">
      <div className="container-wide py-10 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <span className="relative h-16 w-16 overflow-hidden rounded-full ring-1 ring-gold/50">
              <Image src="/images/logo.jpg" alt={settings.business_name} fill sizes="64px" className="object-cover" />
            </span>
            <span>
              <span className="block font-serif text-xl text-ivory">Shri Krishna</span>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-gold">Wedding Collection</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-ivory/60">{settings.homepage_subtitle}</p>
          <div className="flex gap-4 mt-5">
            {settings.instagram_url && (
              <a href={settings.instagram_url} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            )}
            {settings.facebook_url && (
              <a href={settings.facebook_url} target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            )}
            {settings.linkedin_url && (
              <a href={settings.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: 'Home', href: '/' },
              { label: 'Collections', href: '/collections' },
              { label: 'Jewellery', href: '/collections/jewellery' },
              { label: 'Accessories', href: '/accessories' },
              { label: 'Rental', href: '/rental' },
              { label: 'Sale', href: '/sale' },
              { label: 'Gallery', href: '/gallery' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="hover:text-ivory transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Contact</h4>
          <ul className="space-y-3 text-sm break-words">
            <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5 shrink-0" /><span>{settings.phone}</span></li>
            <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5 shrink-0" /><span className="break-all">{settings.email}</span></li>
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /><span>{settings.address}</span></li>
            <li className="flex items-start gap-2"><Clock size={16} className="mt-0.5 shrink-0" /><span>{settings.business_hours}</span></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy-policy" className="hover:text-ivory transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-ivory transition-colors">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-6 pb-24 sm:pb-6 text-center text-xs text-ivory/40 px-4">
        © {new Date().getFullYear()} {settings.business_name}. All rights reserved.
      </div>
    </footer>
  );
}
