'use client';

import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { whatsappLink, homepageWhatsAppMessage } from '@/lib/whatsapp';

export default function WhatsAppButton({ number }: { number: string }) {
  const pathname = usePathname();
  if (!number) return null;
  if (pathname?.startsWith('/products/')) return null;

  return (
    <a
      href={whatsappLink(number, homepageWhatsAppMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-4 sm:right-5 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-lg px-3.5 py-3 sm:px-4 sm:py-3.5 hover:brightness-95 transition mb-[env(safe-area-inset-bottom)]"
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline text-sm font-medium pr-1">Chat with us</span>
    </a>
  );
}
