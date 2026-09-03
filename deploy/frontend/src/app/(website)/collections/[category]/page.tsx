import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { GoogleSheetsService } from '@/services/catalogue';
import CollectionsClient from '@/components/ui/CollectionsClient';
import PageHero from '@/components/ui/PageHero';

const HERO_BY_SLUG: Record<string, string> = {
  'bridal-lehengas': '/images/lehenga-maroon.jpg',
  'wedding-wear': '/images/gown-ivory.jpg',
  'party-wear': '/images/party-wear.jpg',
  jewellery: '/images/necklace.jpg',
  'bridal-jewellery': '/images/tikka.jpg',
  rental: '/images/rental.jpg',
  sale: '/images/sale.jpg',
};

export async function generateStaticParams() {
  const categories = await GoogleSheetsService.getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categories = await GoogleSheetsService.getCategories();
  const category = categories.find((c) => c.slug === params.category);
  return {
    title: category ? category.name : 'Collection',
    description: category?.description || `Shop our ${params.category.replace(/-/g, ' ')} collection.`,
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const [products, categories] = await Promise.all([
    GoogleSheetsService.getProducts(),
    GoogleSheetsService.getCategories(),
  ]);

  const category = categories.find((c) => c.slug === params.category);
  const matchingProducts = products.filter((p) => p.category === params.category);

  if (!category && matchingProducts.length === 0) notFound();

  const title = category?.name || params.category.replace(/-/g, ' ');
  const heroSrc = category?.image || HERO_BY_SLUG[params.category] || '/images/hero.jpg';

  return (
    <div>
      <PageHero
        src={heroSrc}
        eyebrow="Collection"
        title={title}
        subtitle={
          category?.description ||
          `Explore our ${title.toLowerCase()} — visit the showroom to try the look in person.`
        }
      />
      <div className="container-wide page-pad">
        <Suspense fallback={null}>
          <CollectionsClient products={products} categories={categories} initialCategory={params.category} />
        </Suspense>
      </div>
    </div>
  );
}
