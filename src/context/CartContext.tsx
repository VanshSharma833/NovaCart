import React, { createContext, useContext, useState, useMemo } from 'react';
import { Product, CartItem } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  calculateSubtotal,
  calculateOriginalTotal,
  calculateTotalSavings,
  calculateShipping,
  calculateFinalTotal,
} from '../lib/cartUtils';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  couponCode: string;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  originalTotal: number;
  totalSavings: number;
  shippingFee: number;
  finalTotal: number;
  totalItemCount: number;
  lastAddedItem: CartItem | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial sample preloaded cart items to give immediate rich demo fidelity matching Image 1
const initialSampleCart: CartItem[] = [
  {
    id: 'nike-af1-07-Triple White-UK 8',
    product: {
      id: 'nike-af1-07',
      name: "Nike Air Force 1 '07",
      brand: 'Nike',
      category: 'sneakers',
      price: 7995,
      originalPrice: 10995,
      discount: 27,
      rating: 4.8,
      reviewCount: 2410,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'],
      description: 'Classic style meets modern comfort.',
      features: ['Real and synthetic stitched leather overlays'],
      inStock: true,
      sku: 'NK-AF1-07-WHT',
    },
    quantity: 1,
    selectedColor: 'Triple White',
    selectedSize: 'UK 8',
  },
  {
    id: 'apple-airpods-pro-2-White',
    product: {
      id: 'apple-airpods-pro-2',
      name: 'Apple AirPods Pro (2nd Gen)',
      brand: 'Apple',
      category: 'electronics',
      price: 24900,
      originalPrice: 26900,
      discount: 10,
      rating: 4.7,
      reviewCount: 1820,
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80'],
      description: 'Personalized Spatial Audio with dynamic head tracking.',
      features: ['Apple H2 headphone chip'],
      inStock: true,
      sku: 'APL-APP2-USBC',
    },
    quantity: 1,
    selectedColor: 'White',
  },
  {
    id: 'levis-oversized-hoodie-Washed Black-L',
    product: {
      id: 'levis-oversized-hoodie',
      name: "Levi's Oversized Heavyweight Hoodie",
      brand: "Levi's",
      category: 'fashion',
      price: 2499,
      originalPrice: 3499,
      discount: 30,
      rating: 4.6,
      reviewCount: 986,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'],
      description: 'Cut with a relaxed, modern drape from plush French terry cotton.',
      features: ['100% Organic Cotton French Terry'],
      inStock: true,
      sku: 'LEV-HD-BLK-01',
    },
    quantity: 1,
    selectedColor: 'Washed Black',
    selectedSize: 'L',
  },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>('novacart_cart_v1', initialSampleCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useLocalStorage<string>('novacart_coupon_v1', '');
  const [couponDiscount, setCouponDiscount] = useLocalStorage<number>('novacart_coupon_disc_v1', 0);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  const subtotal = useMemo(() => calculateSubtotal(items), [items]);
  const originalTotal = useMemo(() => calculateOriginalTotal(items), [items]);
  const totalSavings = useMemo(() => calculateTotalSavings(items, couponDiscount), [items, couponDiscount]);
  const shippingFee = useMemo(() => calculateShipping(subtotal), [subtotal]);
  const finalTotal = useMemo(() => calculateFinalTotal(subtotal, couponDiscount, shippingFee), [subtotal, couponDiscount, shippingFee]);
  const totalItemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    const selectedColor = color || (product.colors && product.colors[0]?.name) || undefined;
    const selectedSize = size || (product.sizes && product.sizes[0]) || undefined;
    const itemKey = `${product.id}-${selectedColor || 'def'}-${selectedSize || 'def'}`;

    let updatedItem: CartItem;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const copy = [...prevItems];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + quantity,
        };
        updatedItem = copy[existingIndex];
        return copy;
      } else {
        const newItem: CartItem = {
          id: itemKey,
          product,
          quantity,
          selectedColor,
          selectedSize,
        };
        updatedItem = newItem;
        return [...prevItems, newItem];
      }
    });

    setLastAddedItem({
      id: itemKey,
      product,
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setCouponDiscount(0);
  };

  const applyCoupon = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'NOVA15' || cleaned === 'NOVA') {
      const discountAmount = Math.round(subtotal * 0.15);
      setCouponCode(cleaned);
      setCouponDiscount(discountAmount);
      return { success: true, message: `Promo code applied! You saved 15%.` };
    } else if (cleaned === 'KICKS10') {
      const discountAmount = Math.round(subtotal * 0.1);
      setCouponCode(cleaned);
      setCouponDiscount(discountAmount);
      return { success: true, message: `Promo code applied! You saved 10%.` };
    } else {
      return { success: false, message: 'Invalid or expired coupon code. Try NOVA15' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        couponCode,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        subtotal,
        originalTotal,
        totalSavings,
        shippingFee,
        finalTotal,
        totalItemCount,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
