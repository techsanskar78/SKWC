export const TROUSSEAU = [
  { name: 'Potli', slug: 'potli', image: '/images/potli.jpg', tag: 'Accessories' },
  { name: 'Kaleere', slug: 'kaleere', image: '/images/kaleere.jpg', tag: 'Accessories' },
  { name: 'Dupatta', slug: 'dupatta', image: '/images/dupatta.jpg', tag: 'Accessories' },
  { name: 'Designer Blouse', slug: 'designer-blouse', image: '/images/designer-blouse.jpg', tag: 'Styling' },
  { name: 'Reversible Stone', slug: 'reversible-stone-jewellery', image: '/images/reversible-stone.jpg', tag: 'Jewellery' },
  { name: 'Antique Temple', slug: 'antique-temple-jewellery', image: '/images/antique-temple.jpg', tag: 'Jewellery' },
  { name: 'American Diamond', slug: 'american-diamond-jewellery', image: '/images/american-diamond.jpg', tag: 'Jewellery' },
  { name: 'Bridal Jewellery', slug: 'bridal-jewellery', image: '/images/bridal-jewellery-set.jpg', tag: 'Jewellery' },
  { name: 'Nose Ring', slug: 'nose-ring', image: '/images/nose-ring.jpg', tag: 'Jewellery' },
  { name: 'Rings', slug: 'rings', image: '/images/rings.jpg', tag: 'Jewellery' },
  { name: 'Bracelets', slug: 'bracelets', image: '/images/bracelets.jpg', tag: 'Jewellery' },
  { name: 'Crop Tops & Skirts', slug: 'crop-tops-skirts', image: '/images/crop-top-skirt.jpg', tag: 'Occasion Wear' },
] as const;

export const TROUSSEAU_SLUGS = TROUSSEAU.map((item) => item.slug);

export const JEWELLERY_SLUGS = [
  'jewellery',
  'bridal-jewellery',
  'reversible-stone-jewellery',
  'antique-temple-jewellery',
  'american-diamond-jewellery',
  'nose-ring',
  'rings',
  'bracelets',
];

export const CORE_CATEGORY_SLUGS = [
  'bridal-lehengas',
  'wedding-wear',
  'jewellery',
  'bridal-jewellery',
  'rental',
  'sale',
];
