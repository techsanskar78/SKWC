'use client';

import { useState } from 'react';
import SmartImage from '@/components/ui/SmartImage';
import { Heart, Phone } from 'lucide-react';
import { Product, SiteSettings } from '@/types';
import { formatPrice } from '@/utils';
import { whatsappLink, productWhatsAppMessage } from '@/lib/whatsapp';
import { useWishlist } from '@/hooks/use-wishlist';
import EnquiryModal from '@/components/forms/EnquiryModal';

export default function ProductDetailClient({ product, settings }: { product: Product; settings: SiteSettings }) {
  const images = [product.main_image, ...(product.gallery_images || [])].filter(Boolean);
  const [activeImage, setActiveImage] = useState(images[0] || '/images/lehenga-maroon.jpg');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const { isWishlisted, toggle } = useWishlist();

  return (
    <div className="container-wide py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pb-28 lg:pb-10">
      {/* Gallery */}
      <div>
        <div className="relative aspect-[3/4] bg-cream overflow-hidden">
          <SmartImage src={activeImage} alt={product.name} fill className="object-cover object-top" priority />
        </div>
        {images.length > 1 && (
          <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
            {images.map((img) => (
              <button
                key={img}
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-24 shrink-0 border-2 ${activeImage === img ? 'border-maroon' : 'border-transparent'}`}
              >
                <SmartImage src={img} alt={product.name} fill className="object-cover object-top" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <p className="eyebrow">{product.category.replace(/-/g, ' ')}</p>
        <div className="flex items-start justify-between gap-4 mt-2">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight break-words min-w-0">{product.name}</h1>
          <button aria-label="Toggle wishlist" onClick={() => toggle(product.id)} className="shrink-0 p-2 border border-charcoal/20">
            <Heart size={18} className={isWishlisted(product.id) ? 'fill-maroon text-maroon' : ''} />
          </button>
        </div>
        <p className="text-charcoal/50 text-sm mt-1">Code: {product.product_code}</p>

        <div className="mt-5 flex items-baseline gap-3">
          {product.rental_available ? (
            <span className="text-2xl font-serif">{formatPrice(product.rental_price)} <span className="text-sm text-charcoal/50">/ rental</span></span>
          ) : (
            <>
              <span className="text-2xl font-serif">{formatPrice(product.sale && product.sale_price ? product.sale_price : product.price)}</span>
              {product.sale && product.price && (
                <span className="text-charcoal/40 line-through">{formatPrice(product.price)}</span>
              )}
            </>
          )}
        </div>

        {product.description && <p className="mt-6 text-charcoal/75 leading-relaxed">{product.description}</p>}

        <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm break-words">
          {product.material && <><dt className="text-charcoal/50">Material</dt><dd>{product.material}</dd></>}
          {product.fabric && <><dt className="text-charcoal/50">Fabric</dt><dd>{product.fabric}</dd></>}
          {!!product.colors?.length && <><dt className="text-charcoal/50">Colours</dt><dd>{product.colors.join(', ')}</dd></>}
          {!!product.occasion?.length && <><dt className="text-charcoal/50">Occasion</dt><dd>{product.occasion.join(', ')}</dd></>}
        </dl>

        {!!product.sizes?.length && (
          <div className="mt-6">
            <p className="text-sm text-charcoal/50 mb-2">Available Sizes</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <span key={s} className="px-3 py-1.5 border border-charcoal/20 text-sm">{s}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 hidden lg:grid grid-cols-2 gap-3">
          <button onClick={() => setEnquiryOpen(true)} className="btn-primary">Enquire Now</button>
          <a href="/book-appointment" className="btn-outline text-center">Book Appointment</a>
          {settings.whatsapp_number && (
            <a href={whatsappLink(settings.whatsapp_number, productWhatsAppMessage(product.name))} target="_blank" rel="noreferrer" className="btn-whatsapp">
              Chat on WhatsApp
            </a>
          )}
          {settings.phone && (
            <a href={`tel:${settings.phone}`} className="btn-outline flex items-center justify-center gap-2">
              <Phone size={16} /> Call Now
            </a>
          )}
        </div>
      </div>

      <EnquiryModal product={enquiryOpen ? product : null} onClose={() => setEnquiryOpen(false)} />

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-ivory/95 backdrop-blur border-t border-charcoal/10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex gap-2">
        <button onClick={() => setEnquiryOpen(true)} className="btn-primary flex-1 !py-3">Enquire Now</button>
        {settings.whatsapp_number && (
          <a href={whatsappLink(settings.whatsapp_number, productWhatsAppMessage(product.name))} target="_blank" rel="noreferrer" className="btn-whatsapp flex-1 !py-3">
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
