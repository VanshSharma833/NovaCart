/**
 * Utility helper to merge class names conditionally
 */
export function cn(...classes: (string | boolean | number | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Generate a realistic Order ID
 */
export function generateOrderId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `NC${num}`;
}

/**
 * Format date nicely
 */
export function formatDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Safe fallback image SVG data URL for products whose remote image fails to load
 */
export const PRODUCT_FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" fill="%23FAF9F6"><rect width="600" height="600" fill="%23FAF9F6"/><g fill="%23737373" opacity="0.4" transform="translate(260, 260)"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="%23171717" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g><text x="50%" y="62%" dominant-baseline="middle" text-anchor="middle" fill="%23737373" font-family="system-ui, sans-serif" font-size="14" font-weight="500" letter-spacing="1">NOVACART STUDIO</text></svg>';
