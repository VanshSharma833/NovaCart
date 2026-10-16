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
