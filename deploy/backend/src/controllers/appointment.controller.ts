import { z } from 'zod';
import { GoogleSheetsService } from '../services/sheets.service';

const AppointmentSchema = z.object({
  customer_name: z.string().trim().min(2).max(120),
  mobile: z.string().trim().min(7).max(20),
  email: z.string().trim().email().optional().or(z.literal('')),
  appointment_date: z.string().trim().min(4),
  preferred_time: z.string().trim().min(1),
  occasion: z.string().optional().default(''),
  product: z.string().optional().default(''),
  requirement: z.string().max(2000).optional().default(''),
});

export async function handleCreateAppointment(body: unknown): Promise<{ status: number; body: object }> {
  const parsed = AppointmentSchema.safeParse(body);
  if (!parsed.success) {
    return { status: 400, body: { error: 'Invalid input', details: parsed.error.flatten() } };
  }
  const data = parsed.data;

  try {
    await GoogleSheetsService.createAppointment({
      appointment_id: `APT-${Date.now()}`,
      customer_name: data.customer_name,
      mobile: data.mobile,
      email: data.email || '',
      appointment_date: data.appointment_date,
      preferred_time: data.preferred_time,
      occasion: data.occasion,
      product: data.product,
      requirement: data.requirement,
      created_at: new Date().toISOString(),
      status: 'Pending',
      admin_notes: '',
    });
    return { status: 200, body: { ok: true } };
  } catch (err) {
    console.error('Failed to save appointment', err);
    return {
      status: 500,
      body: { error: (err as Error).message || 'Something went wrong. Please try again.' },
    };
  }
}
