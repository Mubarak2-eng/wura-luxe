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
    'Hello! I visited your website and I would like to enquire about your fragrances. 🌸'
  )

/**
 * Cart order link — formats the cart as a WhatsApp message
 */
export const whatsAppOrderLink = (cartItems, total) => {
  const lines = cartItems.map(
    (item) => `• ${item.name} (${item.volume}) × ${item.quantity}`
  )

  const message = [
    '🌟 *New Order from Wura Luxe & Scents Website*',
    '',
    '*Items Ordered:*',
    ...lines,
    '',
    `*Total: ₦${total.toLocaleString()}*`,
    '',
    'Please confirm availability and share payment details. Thank you! 🙏',
  ].join('\n')

  return buildWhatsAppLink(message)
}

/**
 * Product enquiry link
 */
export const whatsAppProductEnquiry = (productName) =>
  buildWhatsAppLink(
    `Hello! I'm interested in *${productName}* from your website. Could you please provide more details? 🌸`
  )
