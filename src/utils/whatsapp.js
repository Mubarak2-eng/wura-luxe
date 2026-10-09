// Mama Fragrance WhatsApp Business Number (with country code, no + or spaces)
export const WHATSAPP_NUMBER = '2347064160841'

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
    'Hello Mama Fragrance! 🌸 I visited your website and I would like to enquire about your fragrances. "Smell as good as you look!" ✨'
  )

/**
 * Full invoice link — formats the complete order as a structured WhatsApp invoice message.
 * This is what customers send after checkout to complete their order and arrange payment.
 */
export const whatsAppInvoiceLink = ({ orderNumber, customerName, phone, address, city, state, items, subtotal, shipping, discount, total, deliveryMethod }) => {
  const itemLines = items.map(
    (item, i) =>
      `${i + 1}. *${item.name}*${item.volume ? ` (${item.volume})` : ''} × ${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}`
  )

  const lines = [
    `🧾 *ORDER INVOICE — MAMA FRAGRANCE*`,
    `_"Smell as good as you look."_ ✨`,
    ``,
    `📋 *Order Reference:* ${orderNumber}`,
    `👤 *Customer Name:* ${customerName}`,
    `📞 *Phone:* ${phone}`,
    `📍 *Delivery Address:*`,
    `   ${address}`,
    `   ${city}${state ? `, ${state}` : ''}`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🛍️ *Items Ordered:*`,
    ...itemLines,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📦 *Delivery Method:* ${deliveryMethod || 'Standard Delivery'}`,
    discount > 0 ? `🏷️ *Discount:* -₦${discount.toLocaleString()}` : null,
    `🚚 *Shipping:* ${shipping === 0 ? 'FREE' : `₦${shipping.toLocaleString()}`}`,
    ``,
    `💰 *TOTAL AMOUNT DUE: ₦${total.toLocaleString()}*`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Please confirm my order and send payment details. Thank you! 🙏👑`,
  ]
    .filter((l) => l !== null)
    .join('\n')

  return buildWhatsAppLink(lines)
}

/**
 * Simple cart order link (used from CartDrawer)
 */
export const whatsAppOrderLink = (cartItems, total) => {
  const lines = cartItems.map(
    (item) => `• ${item.name}${item.volume ? ` (${item.volume})` : ''} × ${item.quantity}`
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
    'Please confirm stock availability and send payment details. Thank you! 👑✨',
  ].join('\n')

  return buildWhatsAppLink(message)
}

/**
 * Product enquiry link
 */
export const whatsAppProductEnquiry = (productName) =>
  buildWhatsAppLink(
    `Hello Mama Fragrance! 🌸 I am interested in *${productName}*. Is it currently in stock? ✨`
  )
