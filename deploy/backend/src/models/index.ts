export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id: string;
  product_code: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  collection?: string;
  description: string;
  short_description?: string;
  price?: number;
  sale_price?: number;
  rental_price?: number;
  rental_available: boolean;
  purchase_available: boolean;
  sizes?: string[];
  colors?: string[];
  material?: string;
  fabric?: string;
  occasion?: string[];
  tags?: string[];
  main_image: string;
  gallery_images?: string[];
  featured: boolean;
  new_arrival: boolean;
  sale: boolean;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  status: ProductStatus;
  display_order: number;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Closed';

export interface Enquiry {
  enquiry_id: string;
  customer_name: string;
  mobile: string;
  email?: string;
  product_id?: string;
  product_name?: string;
  message: string;
  source: string;
  created_at: string;
  status: EnquiryStatus;
  admin_notes?: string;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Rescheduled' | 'Completed' | 'Cancelled';

export interface Appointment {
  appointment_id: string;
  customer_name: string;
  mobile: string;
  email?: string;
  appointment_date: string;
  preferred_time: string;
  occasion?: string;
  product?: string;
  requirement?: string;
  created_at: string;
  status: AppointmentStatus;
  admin_notes?: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  testimonial: string;
  rating: number;
  image?: string;
  status: ProductStatus;
  display_order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description?: string;
  display_order: number;
  status: ProductStatus;
}

export interface SiteSettings {
  business_name: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  address: string;
  google_maps_url: string;
  business_hours: string;
  instagram_url?: string;
  facebook_url?: string;
  linkedin_url?: string;
  google_url?: string;
  logo?: string;
  favicon?: string;
  homepage_headline: string;
  homepage_subtitle: string;
}
