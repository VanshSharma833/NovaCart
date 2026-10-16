export interface HeroBannerData {
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  featuredProductsCount: string;
  activeShoppers: string;
  ratingScore: string;
}

export const heroBannerData: HeroBannerData = {
  badge: 'NEW SEASON 2026',
  headline: 'Everything You Love.\nOne Cart.',
  subheadline: 'The Ultimate Lifestyle & Tech Destination',
  description: 'Discover premium products, top brands, and unbeatable deals across fashion, electronics, sneakers, home, and beauty.',
  primaryCtaText: 'Shop Now',
  primaryCtaLink: '/shop',
  secondaryCtaText: 'Explore Deals',
  secondaryCtaLink: '/shop?category=deals',
  featuredProductsCount: '25,000+ Items',
  activeShoppers: '180K+ Happy Shoppers',
  ratingScore: '4.9 ★ Average Review',
};

export interface PromoBannerData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  code: string;
  discount: string;
  validTill: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
}

export const promoBanners: PromoBannerData[] = [
  {
    id: 'spring-vip',
    title: 'Mid-Season Luxury Festival',
    tagline: 'EXCLUSIVE PREVIEW',
    description: 'Enjoy an instant flat 15% discount on all flagship electronics, designer streetwear, and artisanal decor.',
    code: 'NOVA15',
    discount: '15% OFF',
    validTill: 'Limited Time Offer',
    ctaText: 'Claim Your Discount',
    ctaLink: '/shop',
    bgGradient: 'from-indigo-900 via-slate-900 to-violet-950',
  },
  {
    id: 'sneaker-drop',
    title: 'Sneakerhead Weekend Rush',
    tagline: 'HYPED RELEASES',
    description: 'Grab authentic pairs of Nike Air Force, Sambas, and Pegasus with free express shipping across India.',
    code: 'KICKS10',
    discount: 'UP TO 50% OFF',
    validTill: 'Until Sunday Midnight',
    ctaText: 'Shop Sneakers Now',
    ctaLink: '/shop?category=sneakers',
    bgGradient: 'from-blue-950 via-slate-900 to-indigo-950',
  }
];
