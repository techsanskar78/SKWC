import { Metadata } from 'next';
import AppointmentForm from '@/components/forms/AppointmentForm';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Book a personal styling appointment at our store.',
};

export default function BookAppointmentPage() {
  return (
    <div>
      <PageHero
        src="/images/gown-ivory.jpg"
        eyebrow="Visit Us"
        title="Book an appointment"
        subtitle="Reserve a personal styling session. We will confirm your slot by phone or WhatsApp."
      />
      <div className="container-wide page-pad">
        <AppointmentForm />
      </div>
    </div>
  );
}
