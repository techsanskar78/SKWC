import { z } from 'zod';
import { GoogleSheetsService } from '../services/sheets.service';

const EnquirySchema = z.object({
  customer_name: z.string().trim().min(2).max(120),
  mobile: z.string().trim().min(7).max(20),
  email: z.string().trim().email().optional().or(z.literal('')),
  product_id: z.string().optional(),
  product_name: z.string().optional(),
  message: z.string().trim().max(2000).optional().default(''),
  source: z.string().optional().default('website'),
});

export async function handleCreateEnquiry(body: unknown): Promise<{ status: number; body: object }> {
  const parsed = EnquirySchema.safeParse(body);
  if (!parsed.success) {
    return { status: 400, body: { error: 'Invalid input', details: parsed.error.flatten() } };
  }

  const data = parsed.data;

  try {
    await GoogleSheetsService.createEnquiry({
      enquiry_id: `ENQ-${Date.now()}`,
      customer_name: data.customer_name,
      mobile: data.mobile,
      email: data.email || '',
      product_id: data.product_id || '',
      product_name: data.product_name || '',
      message: data.message,
      source: data.source,
      created_at: new Date().toISOString(),
      status: 'New',
      admin_notes: '',
    });
    return { status: 200, body: { ok: true } };
  } catch (err) {
    console.error('Failed to save enquiry', err);
    return {
      status: 500,
      body: { error: (err as Error).message || 'Something went wrong. Please try again.' },
    };
  }
}
