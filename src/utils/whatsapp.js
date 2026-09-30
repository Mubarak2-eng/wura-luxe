// Replace with the actual WhatsApp business number (include country code, no + or spaces)
export const WHATSAPP_NUMBER = '2348000000000'

/**
 * Build a WhatsApp link with a pre-filled message
 */
export const buildWhatsAppLink = (message) => {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}

/**
 * General "Hi, I need help" chat link
 */
export const whatsAppChatLink = () =>
  buildWhatsAppLink(
    'Hello Mama Fragrance! 🌸 I visited your website and I want to order some perfumes. "Smell as good as you look!" ✨'
  )

/**
 * Cart order link — formats the cart as a WhatsApp message
 */
export const whatsAppOrderLink = (cartItems, total) => {
  const lines = cartItems.map(
    (item) => `• ${item.name} (${item.volume}) × ${item.quantity}`
  )

  const message = [
    '✨ *New Order from Mama Fragrance*',
    '_Smell as good as you look!_',
    '',
    '*Selected Fragrances:*',
    ...lines,
    '',
    `*Total: ₦${total.toLocaleString()}*`,
    '',
    'Please confirm stock availability and send payment / delivery details. Thank you! 👑✨',
  ].join('\n')

  return buildWhatsAppLink(message)
}

/**
 * Product enquiry link
 */
export const whatsAppProductEnquiry = (productName) =>
  buildWhatsAppLink(
    `Hello Mama Fragrance! 🌸 I am interested in *${productName}*. Please let me know if it is currently in stock! ✨`
  )
