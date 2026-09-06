import Hero from '@/components/home/Hero';
import NewCollectionShowcase from '@/components/home/NewCollectionShowcase';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import CompleteTheLook from '@/components/home/CompleteTheLook';
import NewArrivals from '@/components/home/NewArrivals';
import BridalSection from '@/components/home/BridalSection';
import JewellerySection from '@/components/home/JewellerySection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import StoreCTA from '@/components/home/StoreCTA';
import SocialBar from '@/components/home/SocialBar';
import { GoogleSheetsService } from '@/services/catalogue';
import { JEWELLERY_SLUGS } from '@/lib/trousseau';

export const revalidate = 180;

export default async function HomePage() {
  const [products, categories, testimonials, settings] = await Promise.all([
    GoogleSheetsService.getProducts(),
    GoogleSheetsService.getCategories(),
    GoogleSheetsService.getTestimonials(),
    GoogleSheetsService.getSettings(),
  ]);

  const active = products.filter((p) => p.status === 'active');
  const newArrivals = active.filter((p) => p.new_arrival);
  const jewellery = active.filter((p) => JEWELLERY_SLUGS.includes(p.category));

  return (
    <>
      <Hero headline={settings.homepage_headline} subtitle={settings.homepage_subtitle} />
      <NewCollectionShowcase />
      <FeaturedCategories categories={categories} />
      <CompleteTheLook />
      <NewArrivals products={newArrivals.length ? newArrivals : active} />
      <BridalSection />
      <JewellerySection products={jewellery} />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <SocialBar settings={settings} />
      <StoreCTA whatsappNumber={settings.whatsapp_number} mapsUrl={settings.google_maps_url} />
    </>
  );
}
