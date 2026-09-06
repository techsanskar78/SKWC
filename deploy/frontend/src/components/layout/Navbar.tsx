'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { SiteSettings } from '@/types';
import { cn } from '@/utils';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/collections', label: 'Collections' },
  { href: '/collections/bridal-lehengas', label: 'Lehengas' },
  { href: '/collections/jewellery', label: 'Jewellery' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/rental', label: 'Rental' },
  { href: '/sale', label: 'Sale' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  if (href === '/collections') return pathname === '/collections';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isOverlayPage(pathname: string) {
  if (
    pathname === '/' ||
    pathname === '/about' ||
    pathname === '/contact' ||
    pathname === '/collections' ||
    pathname === '/rental' ||
    pathname === '/sale' ||
    pathname === '/gallery' ||
    pathname === '/book-appointment' ||
    pathname === '/accessories'
  ) {
    return true;
  }
  return pathname.startsWith('/collections/');
}

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const pathname = usePathname();
  const currentPath = pendingHref || pathname;
  const overlayPage = isOverlayPage(pathname);
  const overHero = overlayPage && !scrolled && !open;

  useEffect(() => {
    setOpen(false);
    setScrolled(false);
    setPendingHref(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300',
          overHero
            ? 'bg-gradient-to-b from-charcoal/55 via-charcoal/20 to-transparent'
            : 'bg-ivory/95 backdrop-blur-md shadow-[0_12px_40px_-16px_rgba(28,23,18,0.28)]'
        )}
      >
        <div className="container-wide flex items-center justify-between gap-3 h-[72px] sm:h-[88px] lg:h-[96px]">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0" onClick={() => { setOpen(false); setPendingHref('/'); }}>
            <span
              className={cn(
                'relative h-12 w-12 sm:h-[68px] sm:w-[68px] lg:h-[76px] lg:w-[76px] shrink-0 overflow-hidden rounded-full shadow-sm ring-2 transition-colors',
                overHero ? 'ring-ivory/50' : 'ring-gold/70'
              )}
            >
              <Image
                src="/images/logo.jpg"
                alt={settings.business_name}
                fill
              sizes="76px"
              priority
              quality={70}
                className="object-cover"
              />
            </span>
            <span className="flex flex-col min-w-0">
              <span
                className={cn(
                  'font-serif text-[15px] sm:text-lg lg:text-xl leading-tight truncate transition-colors',
                  overHero ? 'text-ivory' : 'text-maroon'
                )}
              >
                Shri Krishna
              </span>
              <span
                className={cn(
                  'text-[9px] sm:text-[10px] lg:text-[11px] tracking-[0.14em] sm:tracking-[0.22em] uppercase truncate transition-colors',
                  overHero ? 'text-champagne' : 'text-gold'
                )}
              >
                Wedding Collection
              </span>
            </span>
          </Link>

          <nav className="hidden 2xl:flex items-center gap-4 min-w-0">
            {LINKS.map((link) => {
              const active = isActive(currentPath, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch
                  onClick={() => setPendingHref(link.href)}
                  className={cn(
                    'relative text-[11px] tracking-[0.14em] uppercase transition-colors pb-1 outline-none whitespace-nowrap',
                    overHero
                      ? active
                        ? 'text-ivory'
                        : 'text-ivory/75 hover:text-ivory'
                      : active
                        ? 'text-maroon'
                        : 'text-charcoal/70 hover:text-maroon'
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute left-0 right-0 -bottom-0.5 h-px bg-gold transition-opacity',
                      active ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle menu"
              className={cn(
                '2xl:hidden p-2 -mr-1 min-h-11 min-w-11 inline-flex items-center justify-center transition-colors',
                overHero ? 'text-ivory' : 'text-charcoal'
              )}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            '2xl:hidden overflow-hidden transition-[max-height] duration-300',
            open ? 'max-h-[min(80vh,640px)] overflow-y-auto bg-ivory' : 'max-h-0'
          )}
        >
          <nav className="flex flex-col px-5 py-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                onClick={() => {
                  setOpen(false);
                  setPendingHref(link.href);
                }}
                className={cn(
                  'py-3 text-sm tracking-wide uppercase border-b border-charcoal/5',
                  isActive(currentPath, link.href) ? 'text-maroon' : 'text-charcoal/80'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {!overlayPage && (
        <div className="h-[72px] sm:h-[88px] lg:h-[96px]" aria-hidden />
      )}
    </>
  );
}
