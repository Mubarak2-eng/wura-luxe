/**
 * Format a price in Nigerian Naira (₦)
 */
export const formatPrice = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) return '₦0'
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Calculate genuine discount percentage
 */
export const discountPercent = (original, sale) => {
  if (!original || original <= sale) return 0
  return Math.round(((original - sale) / original) * 100)
}

/**
 * Truncate text to a given length
 */
export const truncate = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '…'
}

/**
 * Format date string to readable format
 */
export const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

/**
 * Generate a Mama Fragrance order tracking number (e.g., MF-98241)
 */
export const generateOrderNumber = () => {
  const randomDigits = Math.floor(10000 + Math.random() * 90000)
  return `MF-${randomDigits}`
}

/**
 * Scroll to top of page smoothly
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Clamp a number between min and max
 */
export const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max)
