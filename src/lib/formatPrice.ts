/**
 * Formats a numeric price into INR currency string (₹).
 * Example: 7995 -> "₹7,995"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}
