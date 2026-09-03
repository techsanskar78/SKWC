'use client';

import { useState } from 'react';

export default function AppointmentForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form.entries())),
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
      <div className="text-center py-12">
        <h3 className="font-serif text-2xl mb-2">Appointment Requested</h3>
        <p className="text-charcoal/70">We'll confirm your visit shortly by phone or WhatsApp.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
      <input name="customer_name" required placeholder="Full Name" className="border border-charcoal/20 px-4 py-3 text-sm bg-transparent" />
      <input name="mobile" required placeholder="Mobile Number" className="border border-charcoal/20 px-4 py-3 text-sm bg-transparent" />
      <input name="email" type="email" placeholder="Email (optional)" className="border border-charcoal/20 px-4 py-3 text-sm bg-transparent" />
      <input name="appointment_date" type="date" required className="border border-charcoal/20 px-4 py-3 text-sm bg-transparent" />
      <input name="preferred_time" required placeholder="Preferred Time" className="border border-charcoal/20 px-4 py-3 text-sm bg-transparent" />
      <select name="occasion" className="border border-charcoal/20 px-4 py-3 text-sm bg-transparent">
        <option value="">Occasion</option>
        <option>Bridal</option>
        <option>Engagement</option>
        <option>Reception</option>
        <option>Sangeet</option>
        <option>Mehendi</option>
        <option>Party</option>
      </select>
      <input name="product" placeholder="Product / Collection of interest" className="border border-charcoal/20 px-4 py-3 text-sm bg-transparent sm:col-span-2" />
      <textarea name="requirement" rows={3} placeholder="Tell us about your requirement" className="border border-charcoal/20 px-4 py-3 text-sm bg-transparent sm:col-span-2" />
      {status === 'error' && <p className="text-sm text-maroon sm:col-span-2">Something went wrong — please try again or call us directly.</p>}
      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full sm:col-span-2 disabled:opacity-60">
        {status === 'submitting' ? 'Submitting…' : 'Book Appointment'}
      </button>
    </form>
  );
}
