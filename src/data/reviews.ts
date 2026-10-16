import { Review } from '../types';

export const customerReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Aarav Mehta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '3 days ago',
    title: 'Flawless packaging & lightning delivery',
    comment: 'Ordered the Nike Air Force 1 and Sony XM5 headphones. Both arrived within 48 hours in immaculate condition with genuine brand warranty cards. The unboxing experience was truly top-tier.',
    verified: true,
    productName: "Nike Air Force 1 '07",
  },
  {
    id: 'rev-2',
    author: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '1 week ago',
    title: 'The cleanest shopping UI I have ever seen',
    comment: 'NovaCart feels like a modern tech boutique! Smooth page transitions, instant wishlist saving, and crystal-clear pricing with zero hidden surcharges at checkout.',
    verified: true,
    productName: 'The Ordinary Daily Glow Skincare Routine',
  },
  {
    id: 'rev-3',
    author: 'Rohan Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '2 weeks ago',
    title: 'Superior quality & easy size exchange',
    comment: 'Got Levi’s Oversized Hoodie in Medium. The French terry fabric weight is extraordinary. Fits boxy and relaxed exactly as pictured on the models.',
    verified: true,
    productName: "Levi's Oversized Heavyweight Hoodie",
  },
  {
    id: 'rev-4',
    author: 'Ananya Roy',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '3 weeks ago',
    title: 'Everything in one cart without any hassle',
    comment: 'Bought home decor together with a pair of Adidas Sambas and skincare essentials. Tracking my order and receiving automated shipment notifications was effortlessly simple.',
    verified: true,
    productName: 'Aura Sculptural Matte Ceramic Table Lamp',
  }
];
