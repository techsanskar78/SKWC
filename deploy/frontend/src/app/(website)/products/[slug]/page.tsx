import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { GoogleSheetsService } from '@/services/catalogue';
import ProductDetailClient from '@/components/ui/ProductDetailClient';
import { siteUrl } from '@/lib/config';

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await GoogleSheetsService.getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.short_description || product.description?.slice(0, 155),
    alternates: { canonical: `${siteUrl}/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: product.main_image ? [product.main_image] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const [product, settings] = await Promise.all([
    GoogleSheetsService.getProductBySlug(params.slug),
    GoogleSheetsService.getSettings(),
  ]);

  if (!product || product.status !== 'active') notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.main_image,
    description: product.short_description,
    sku: product.product_code,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.sale_price ?? product.price ?? product.rental_price ?? 0,
      availability: product.status === 'active' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailClient product={product} settings={settings} />
    </>
  );
}
