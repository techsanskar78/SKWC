'use client';

import { useState } from 'react';

const fieldClass =
  'w-full bg-transparent border-0 border-b border-charcoal/20 px-0 py-3 text-sm text-charcoal placeholder:text-charcoal/40 outline-none focus:border-gold transition-colors';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
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
          source: 'contact_page',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed');
      }
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-cream px-6 py-10 text-center">
        <p className="eyebrow">Received</p>
        <h3 className="font-serif text-2xl mt-2 mb-2">Thank you.</h3>
        <p className="text-charcoal/70 text-sm max-w-sm mx-auto">
          Our team will contact you shortly to help with your collection and visit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <div>
        <label htmlFor="contact-name" className="block text-[10px] tracking-widest2 uppercase text-gold mb-1">
          Your Name
        </label>
        <input id="contact-name" name="name" required placeholder="Full name" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="contact-mobile" className="block text-[10px] tracking-widest2 uppercase text-gold mb-1">
          Mobile Number
        </label>
        <input id="contact-mobile" name="mobile" required placeholder="WhatsApp number" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-[10px] tracking-widest2 uppercase text-gold mb-1">
          Email
        </label>
        <input id="contact-email" name="email" type="email" placeholder="Optional" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-[10px] tracking-widest2 uppercase text-gold mb-1">
          Your Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="Occasion, date, and what you would like to see…"
          className={`${fieldClass} resize-none`}
        />
      </div>
      {status === 'error' && <p className="text-sm text-maroon">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full sm:w-auto disabled:opacity-60">
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
