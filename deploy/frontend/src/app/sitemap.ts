import { MetadataRoute } from 'next';
import { GoogleSheetsService } from '@/services/catalogue';
import { siteUrl } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    GoogleSheetsService.getProducts(),
    GoogleSheetsService.getCategories(),
  ]);

  const staticRoutes = [
    '', '/collections', '/rental', '/sale', '/gallery', '/about', '/contact', '/book-appointment',
  ].map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date() }));

  const categoryRoutes = categories.map((c) => ({
    url: `${siteUrl}/collections/${c.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products
    .filter((p) => p.status === 'active')
    .map((p) => ({ url: `${siteUrl}/products/${p.slug}`, lastModified: p.updated_at ? new Date(p.updated_at) : new Date() }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
