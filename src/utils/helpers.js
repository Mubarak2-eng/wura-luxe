/**
 * Format a price in Naira
 */
export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Calculate discount percentage
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
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

/**
 * Generate a simple order number
 */
export const generateOrderNumber = () => {
  return 'WLS-' + Date.now().toString(36).toUpperCase()
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
