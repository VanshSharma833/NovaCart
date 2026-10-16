export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'fashion' | 'sneakers' | 'electronics' | 'gadgets' | 'beauty' | 'home' | 'accessories';
  subcategory?: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  colors?: ProductColor[];
  sizes?: string[];
  inStock: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  sku?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  subtext: string;
  description: string;
}

export interface CartItem {
  id: string; // unique cart line item id, e.g. `${product.id}-${color}-${size}`
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName?: string;
}

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  address: Address;
  paymentMethod: 'UPI' | 'Card' | 'Cash on Delivery';
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface FilterState {
  searchQuery: string;
  category: string;
  brands: string[];
  minPrice: number;
  maxPrice: number;
  rating: number;
  sizes: string[];
  inStockOnly: boolean;
}
