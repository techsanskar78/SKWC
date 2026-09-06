'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '@/types';

export default function EnquiryModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!product) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [product]);

  if (!product) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.get('name'),
          mobile: form.get('mobile'),
          email: form.get('email'),
          message: form.get('message'),
          product_id: product!.id,
          product_name: product!.name,
          source: 'product_page',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError((err as Error).message || 'Something went wrong. Please try again or reach us on WhatsApp.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/60 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="bg-ivory max-w-md w-full p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-none" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Close" onClick={onClose} className="absolute top-3 right-3 p-1.5"><X size={18} /></button>

        {status === 'success' ? (
          <div className="py-8 text-center">
            <h3 className="font-serif text-xl mb-2">Thank you.</h3>
            <p className="text-charcoal/70 text-sm">Our team will contact you shortly.</p>
            <button onClick={onClose} className="btn-outline mt-6">Close</button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Enquire about</p>
            <h3 className="font-serif text-xl mt-1 mb-6 pr-6 break-words">{product.name}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" required placeholder="Your Name" className="w-full border border-charcoal/20 px-4 py-3 text-sm bg-transparent" />
              <input name="mobile" required placeholder="Mobile Number" className="w-full border border-charcoal/20 px-4 py-3 text-sm bg-transparent" />
              <input name="email" type="email" placeholder="Email (optional)" className="w-full border border-charcoal/20 px-4 py-3 text-sm bg-transparent" />
              <textarea name="message" rows={3} placeholder="Your message" className="w-full border border-charcoal/20 px-4 py-3 text-sm bg-transparent" />
              {error && <p className="text-sm text-maroon">{error}</p>}
              <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-60">
                {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
