import { CartItem } from '../types';

export const FREE_SHIPPING_THRESHOLD = 999;
export const STANDARD_SHIPPING_FEE = 99;

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function calculateOriginalTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
}

export function calculateTotalSavings(items: CartItem[], couponDiscount: number = 0): number {
  const catalogSavings = items.reduce(
    (sum, item) => sum + (item.product.originalPrice - item.product.price) * item.quantity,
    0
  );
  return catalogSavings + couponDiscount;
}

export function calculateShipping(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
}

export function calculateFinalTotal(subtotal: number, couponDiscount: number = 0, shipping: number = 0): number {
  return Math.max(0, subtotal - couponDiscount + shipping);
}
