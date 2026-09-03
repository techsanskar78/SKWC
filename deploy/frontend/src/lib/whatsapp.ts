export function whatsappLink(number: string, message: string) {
  const digits = number.replace(/[^0-9]/g, '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}

export const homepageWhatsAppMessage = 'Hi, I would like to know more about your wedding collection.';

export const productWhatsAppMessage = (productName: string) =>
  `Hi, I am interested in ${productName}. Please share more details.`;
