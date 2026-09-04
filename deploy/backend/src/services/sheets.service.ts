import { unstable_cache } from 'next/cache';
import { getSheetsClient, SPREADSHEET_ID } from '../database/sheets-client';
import { isSheetsConfigured } from '../config/env';
import { toDisplayImageUrl } from '../utils/drive';
import {
  demoProducts,
  demoCategories,
  demoGallery,
  demoTestimonials,
  demoSettings,
} from '../utils/demo-data';
import {
  Product,
  Category,
  Enquiry,
  Appointment,
  Testimonial,
  GalleryItem,
  SiteSettings,
} from '../models';

/**
 * GoogleSheetsService
 * ---------------------------------------------------------------
 * Central data-access layer. All reads/writes to the business data
 * store go through here — nothing else in the app should call the
 * Sheets API directly.
 *
 * When Google credentials are not configured (local dev / first
 * run), every read method transparently falls back to in-memory
 * demo data so the app is fully browsable. Writes throw until a
 * spreadsheet is connected so enquiry / appointment / product data
 * is never silently lost.
 *
 * Sheet tabs expected in the spreadsheet (see README for full
 * column reference): PRODUCTS, CATEGORIES, ENQUIRIES, APPOINTMENTS,
 * TESTIMONIALS, GALLERY, SETTINGS.
 */

const PRODUCTS_HEADER = [
  'id', 'product_code', 'name', 'slug', 'category', 'subcategory', 'collection',
  'description', 'short_description', 'price', 'sale_price', 'rental_price',
  'rental_available', 'purchase_available', 'sizes', 'colors', 'material',
  'fabric', 'occasion', 'tags', 'main_image', 'gallery_images', 'featured',
  'new_arrival', 'sale', 'status', 'created_at', 'updated_at',
];

const CATEGORIES_HEADER = ['id', 'name', 'slug', 'description', 'image', 'status', 'display_order'];

const ENQUIRIES_HEADER = [
  'enquiry_id', 'customer_name', 'mobile', 'email', 'product_id', 'product_name',
  'message', 'source', 'created_at', 'status', 'admin_notes',
];

const APPOINTMENTS_HEADER = [
  'appointment_id', 'customer_name', 'mobile', 'email', 'appointment_date',
  'preferred_time', 'occasion', 'product', 'requirement', 'created_at', 'status', 'admin_notes',
];

const TESTIMONIALS_HEADER = ['id', 'customer_name', 'testimonial', 'rating', 'image', 'status', 'display_order'];

const GALLERY_HEADER = ['id', 'title', 'category', 'image_url', 'description', 'display_order', 'status'];

const SHEETS_REVALIDATE = 180;
const SHEETS_TIMEOUT_MS = 8000;

function withTimeout<T>(promise: Promise<T>, ms = SHEETS_TIMEOUT_MS): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error('Google Sheets request timed out')), ms);
    }),
  ]);
}

async function loadProducts(): Promise<Product[]> {
  if (!isSheetsConfigured()) return demoProducts;
  try {
    const rows = await withTimeout(readSheet('PRODUCTS'));
    return rows.filter((r) => r[0]).map(rowToProduct);
  } catch {
    return demoProducts;
  }
}

async function loadCategories(): Promise<Category[]> {
  if (!isSheetsConfigured()) return demoCategories;
  try {
    const rows = await withTimeout(readSheet('CATEGORIES'));
    return rows.filter((r) => r[0]).map(rowToCategory).sort((a, b) => a.display_order - b.display_order);
  } catch {
    return demoCategories;
  }
}

async function loadTestimonials(): Promise<Testimonial[]> {
  if (!isSheetsConfigured()) return demoTestimonials;
  try {
    const rows = await withTimeout(readSheet('TESTIMONIALS'));
    return rows.filter((r) => r[0] && r[5] === 'active').map(rowToTestimonial)
      .sort((a, b) => a.display_order - b.display_order);
  } catch {
    return demoTestimonials;
  }
}

async function loadGallery(): Promise<GalleryItem[]> {
  if (!isSheetsConfigured()) return demoGallery;
  try {
    const rows = await withTimeout(readSheet('GALLERY'));
    return rows.filter((r) => r[0] && r[6] === 'active').map(rowToGallery)
      .sort((a, b) => a.display_order - b.display_order);
  } catch {
    return demoGallery;
  }
}

async function loadSettings(): Promise<SiteSettings> {
  if (!isSheetsConfigured()) return demoSettings;
  try {
    const sheets = getSheetsClient();
    const res = await withTimeout(sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'SETTINGS!A2:B50',
    }));
    const rows = (res.data.values as string[][]) || [];
    const map = Object.fromEntries(rows.map(([k, v]) => [k, v]));
    return {
      business_name: map.business_name || demoSettings.business_name,
      phone: map.phone || '',
      whatsapp_number: map.whatsapp_number || demoSettings.whatsapp_number,
      email: map.email || '',
      address: map.address || '',
      google_maps_url: map.google_maps_url || '',
      business_hours: map.business_hours || '',
      instagram_url: map.instagram_url || '',
      facebook_url: map.facebook_url || '',
      linkedin_url: map.linkedin_url || '',
      google_url: map.google_url || '',
      logo: map.logo || '',
      favicon: map.favicon || '',
      homepage_headline: map.homepage_headline || demoSettings.homepage_headline,
      homepage_subtitle: map.homepage_subtitle || demoSettings.homepage_subtitle,
    };
  } catch {
    return demoSettings;
  }
}

const cachedProducts = unstable_cache(loadProducts, ['skwc-products'], { revalidate: SHEETS_REVALIDATE });
const cachedCategories = unstable_cache(loadCategories, ['skwc-categories'], { revalidate: SHEETS_REVALIDATE });
const cachedTestimonials = unstable_cache(loadTestimonials, ['skwc-testimonials'], { revalidate: SHEETS_REVALIDATE });
const cachedGallery = unstable_cache(loadGallery, ['skwc-gallery'], { revalidate: SHEETS_REVALIDATE });
const cachedSettings = unstable_cache(loadSettings, ['skwc-settings'], { revalidate: SHEETS_REVALIDATE });

// ---- low level row helpers -------------------------------------------------

async function readSheet(tab: string): Promise<string[][]> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${tab}!A2:Z10000`,
  });
  return (res.data.values as string[][]) || [];
}

async function appendRow(tab: string, row: (string | number | boolean)[]) {
  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${tab}!A:A`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });
}

async function findRowIndexById(tab: string, idColumnIndex: number, id: string): Promise<number> {
  const rows = await readSheet(tab);
  const idx = rows.findIndex((r) => r[idColumnIndex] === id);
  return idx === -1 ? -1 : idx + 2; // +2 => header row + 1-indexed
}

async function updateRow(tab: string, rowNumber: number, header: string[], row: (string | number | boolean)[]) {
  const sheets = getSheetsClient();
  const lastCol = String.fromCharCode('A'.charCodeAt(0) + header.length - 1);
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${tab}!A${rowNumber}:${lastCol}${rowNumber}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

// ---- mapping helpers ---------------------------------------------------

const toBool = (v: string) => String(v).toLowerCase() === 'true';
const toArr = (v: string) => (v ? String(v).split('|').map((s) => s.trim()).filter(Boolean) : []);
const fromArr = (v?: string[]) => (v || []).join('|');
const toNum = (v: string) => (v === '' || v === undefined ? undefined : Number(v));
const toImg = (v: string) => toDisplayImageUrl(v);
const toImgArr = (v: string) => toArr(v).map(toDisplayImageUrl);

function requireSheets() {
  if (!isSheetsConfigured()) {
    throw new Error(
      'Google Spreadsheet is not connected. Add GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in backend/.env, then share the sheet with the service account email.'
    );
  }
}

function rowToProduct(r: string[]): Product {
  return {
    id: r[0], product_code: r[1], name: r[2], slug: r[3], category: r[4],
    subcategory: r[5] || undefined, collection: r[6] || undefined,
    description: r[7] || '', short_description: r[8] || '',
    price: toNum(r[9]), sale_price: toNum(r[10]), rental_price: toNum(r[11]),
    rental_available: toBool(r[12]), purchase_available: r[13] === '' ? true : toBool(r[13]),
    sizes: toArr(r[14]), colors: toArr(r[15]), material: r[16] || '', fabric: r[17] || '',
    occasion: toArr(r[18]), tags: toArr(r[19]), main_image: toImg(r[20] || ''),
    gallery_images: toImgArr(r[21]), featured: toBool(r[22]), new_arrival: toBool(r[23]),
    sale: toBool(r[24]), status: (r[25] as any) || 'active', created_at: r[26] || '', updated_at: r[27] || '',
  };
}

function productToRow(p: Product): (string | number | boolean)[] {
  return [
    p.id, p.product_code, p.name, p.slug, p.category, p.subcategory || '', p.collection || '',
    p.description, p.short_description || '', p.price ?? '', p.sale_price ?? '', p.rental_price ?? '',
    p.rental_available, p.purchase_available, fromArr(p.sizes), fromArr(p.colors), p.material || '',
    p.fabric || '', fromArr(p.occasion), fromArr(p.tags), p.main_image, fromArr(p.gallery_images),
    p.featured, p.new_arrival, p.sale, p.status, p.created_at, p.updated_at,
  ];
}

function rowToCategory(r: string[]): Category {
  return {
    id: r[0], name: r[1], slug: r[2], description: r[3] || '', image: toImg(r[4] || ''),
    status: (r[5] as any) || 'active', display_order: Number(r[6] || 0),
  };
}

function rowToEnquiry(r: string[]): Enquiry {
  return {
    enquiry_id: r[0], customer_name: r[1], mobile: r[2], email: r[3] || '',
    product_id: r[4] || '', product_name: r[5] || '', message: r[6] || '',
    source: r[7] || 'website', created_at: r[8], status: (r[9] as any) || 'New', admin_notes: r[10] || '',
  };
}

function enquiryToRow(e: Enquiry): (string | number)[] {
  return [
    e.enquiry_id, e.customer_name, e.mobile, e.email || '', e.product_id || '',
    e.product_name || '', e.message, e.source, e.created_at, e.status, e.admin_notes || '',
  ];
}

function rowToAppointment(r: string[]): Appointment {
  return {
    appointment_id: r[0], customer_name: r[1], mobile: r[2], email: r[3] || '',
    appointment_date: r[4], preferred_time: r[5], occasion: r[6] || '', product: r[7] || '',
    requirement: r[8] || '', created_at: r[9], status: (r[10] as any) || 'Pending', admin_notes: r[11] || '',
  };
}

function appointmentToRow(a: Appointment): (string | number)[] {
  return [
    a.appointment_id, a.customer_name, a.mobile, a.email || '', a.appointment_date,
    a.preferred_time, a.occasion || '', a.product || '', a.requirement || '',
    a.created_at, a.status, a.admin_notes || '',
  ];
}

function rowToTestimonial(r: string[]): Testimonial {
  return {
    id: r[0], customer_name: r[1], testimonial: r[2], rating: Number(r[3] || 5),
    image: toImg(r[4] || ''), status: (r[5] as any) || 'active', display_order: Number(r[6] || 0),
  };
}

function rowToGallery(r: string[]): GalleryItem {
  return {
    id: r[0], title: r[1], category: r[2], image_url: toImg(r[3]), description: r[4] || '',
    display_order: Number(r[5] || 0), status: (r[6] as any) || 'active',
  };
}

export const SHEET_HEADERS = {
  PRODUCTS: PRODUCTS_HEADER,
  CATEGORIES: CATEGORIES_HEADER,
  ENQUIRIES: ENQUIRIES_HEADER,
  APPOINTMENTS: APPOINTMENTS_HEADER,
  TESTIMONIALS: TESTIMONIALS_HEADER,
  GALLERY: GALLERY_HEADER,
  SETTINGS: ['key', 'value'],
};

// ---- public service ------------------------------------------------------

export const GoogleSheetsService = {
  // PRODUCTS
  async getProducts(): Promise<Product[]> {
    return cachedProducts();
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find((p) => p.slug === slug) || null;
  },

  async createProduct(product: Product): Promise<void> {
    requireSheets();
    await appendRow('PRODUCTS', productToRow(product));
  },

  async updateProduct(id: string, product: Product): Promise<void> {
    requireSheets();
    const rowNumber = await findRowIndexById('PRODUCTS', 0, id);
    if (rowNumber === -1) throw new Error(`Product ${id} not found`);
    await updateRow('PRODUCTS', rowNumber, PRODUCTS_HEADER, productToRow(product));
  },

  async setProductStatus(id: string, status: 'active' | 'inactive'): Promise<void> {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) throw new Error(`Product ${id} not found`);
    await this.updateProduct(id, { ...product, status, updated_at: new Date().toISOString() });
  },

  // CATEGORIES
  async getCategories(): Promise<Category[]> {
    return cachedCategories();
  },

  async createCategory(category: Category): Promise<void> {
    requireSheets();
    await appendRow('CATEGORIES', [
      category.id, category.name, category.slug, category.description || '',
      category.image || '', category.status, category.display_order,
    ]);
  },

  // ENQUIRIES
  async getEnquiries(): Promise<Enquiry[]> {
    if (!isSheetsConfigured()) return [];
    const rows = await readSheet('ENQUIRIES');
    return rows.filter((r) => r[0]).map(rowToEnquiry).reverse();
  },

  async createEnquiry(enquiry: Enquiry): Promise<void> {
    requireSheets();
    await appendRow('ENQUIRIES', enquiryToRow(enquiry));
  },

  async updateEnquiryStatus(id: string, status: Enquiry['status'], admin_notes?: string): Promise<void> {
    requireSheets();
    const rowNumber = await findRowIndexById('ENQUIRIES', 0, id);
    if (rowNumber === -1) throw new Error(`Enquiry ${id} not found`);
    const enquiries = await this.getEnquiries();
    const enquiry = enquiries.find((e) => e.enquiry_id === id)!;
    await updateRow('ENQUIRIES', rowNumber, ENQUIRIES_HEADER, enquiryToRow({
      ...enquiry, status, admin_notes: admin_notes ?? enquiry.admin_notes,
    }));
  },

  // APPOINTMENTS
  async getAppointments(): Promise<Appointment[]> {
    if (!isSheetsConfigured()) return [];
    const rows = await readSheet('APPOINTMENTS');
    return rows.filter((r) => r[0]).map(rowToAppointment).reverse();
  },

  async createAppointment(appointment: Appointment): Promise<void> {
    requireSheets();
    await appendRow('APPOINTMENTS', appointmentToRow(appointment));
  },

  async updateAppointmentStatus(id: string, status: Appointment['status'], admin_notes?: string): Promise<void> {
    requireSheets();
    const rowNumber = await findRowIndexById('APPOINTMENTS', 0, id);
    if (rowNumber === -1) throw new Error(`Appointment ${id} not found`);
    const appointments = await this.getAppointments();
    const appointment = appointments.find((a) => a.appointment_id === id)!;
    await updateRow('APPOINTMENTS', rowNumber, APPOINTMENTS_HEADER, appointmentToRow({
      ...appointment, status, admin_notes: admin_notes ?? appointment.admin_notes,
    }));
  },

  // TESTIMONIALS
  async getTestimonials(): Promise<Testimonial[]> {
    return cachedTestimonials();
  },

  // GALLERY
  async getGallery(): Promise<GalleryItem[]> {
    return cachedGallery();
  },

  async getAllGallery(): Promise<GalleryItem[]> {
    if (!isSheetsConfigured()) return demoGallery;
    const rows = await readSheet('GALLERY');
    return rows.filter((r) => r[0]).map(rowToGallery).sort((a, b) => a.display_order - b.display_order);
  },

  async createGalleryItem(item: GalleryItem): Promise<void> {
    requireSheets();
    await appendRow('GALLERY', [
      item.id, item.title, item.category, item.image_url, item.description || '',
      item.display_order, item.status,
    ]);
  },

  async setGalleryStatus(id: string, status: 'active' | 'inactive'): Promise<void> {
    requireSheets();
    const rowNumber = await findRowIndexById('GALLERY', 0, id);
    if (rowNumber === -1) throw new Error(`Gallery item ${id} not found`);
    const items = await this.getAllGallery();
    const item = items.find((g) => g.id === id)!;
    await updateRow('GALLERY', rowNumber, GALLERY_HEADER, [
      item.id, item.title, item.category, item.image_url, item.description || '', item.display_order, status,
    ]);
  },

  // SETTINGS (single row, key/value pairs in columns A/B)
  async getSettings(): Promise<SiteSettings> {
    return cachedSettings();
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<void> {
    requireSheets();
    const sheets = getSheetsClient();
    const current = await this.getSettings();
    const merged = { ...current, ...settings };
    const rows = Object.entries(merged).map(([k, v]) => [k, String(v ?? '')]);
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `SETTINGS!A2:B${rows.length + 1}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: rows },
    });
  },

  async ensureSetup(): Promise<{ createdTabs: string[] }> {
    requireSheets();
    const sheets = getSheetsClient();
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const existing = new Set((meta.data.sheets || []).map((s) => s.properties?.title).filter(Boolean) as string[]);
    const needed = Object.keys(SHEET_HEADERS);
    const createdTabs = needed.filter((title) => !existing.has(title));

    if (createdTabs.length) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: createdTabs.map((title) => ({ addSheet: { properties: { title } } })),
        },
      });
    }

    for (const [tab, header] of Object.entries(SHEET_HEADERS)) {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${tab}!A1:Z1`,
      });
      const row = (res.data.values?.[0] || []) as string[];
      if (!row.length) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${tab}!A1`,
          valueInputOption: 'RAW',
          requestBody: { values: [header] },
        });
      }
    }

    const settingsRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'SETTINGS!A2:B2',
    });
    if (!settingsRes.data.values?.length) {
      await this.updateSettings(demoSettings);
    }

    return { createdTabs };
  },

  async seedDemoCatalogue(): Promise<{ products: number; categories: number; gallery: number }> {
    requireSheets();
    const existing = await this.getProducts();
    if (existing.length) {
      return { products: 0, categories: 0, gallery: 0 };
    }
    for (const category of demoCategories) {
      await this.createCategory(category);
    }
    for (const item of demoProducts) {
      await this.createProduct(item);
    }
    for (const item of demoGallery) {
      await this.createGalleryItem(item);
    }
    return { products: demoProducts.length, categories: demoCategories.length, gallery: demoGallery.length };
  },
};
