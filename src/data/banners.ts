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
  badge: 'AUTUMN / WINTER 2026',
  headline: 'Essential Form.\nTimeless Function.',
  subheadline: 'The Curated Lifestyle & Design Destination',
  description: 'Carefully considered garments, acoustic hardware, and minimalist living essentials crafted for longevity.',
  primaryCtaText: 'Shop the Collection',
  primaryCtaLink: '/shop',
  secondaryCtaText: 'Explore Lookbook',
  secondaryCtaLink: '/shop?category=fashion',
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
}

export const promoBanners: PromoBannerData[] = [
  {
    id: 'spring-vip',
    title: 'Mid-Season Curations',
    tagline: 'PRIVATE PREVIEW',
    description: 'Enjoy 15% off flagship audio hardware, designer textiles, and artisanal living objects.',
    code: 'NOVA15',
    discount: '15% OFF',
    validTill: 'Limited Time',
    ctaText: 'Claim Your Discount',
    ctaLink: '/shop',
  },
  {
    id: 'sneaker-drop',
    title: 'Minimalist Footwear Archive',
    tagline: 'SELECT RELEASES',
    description: 'Authentic silhouettes featuring premium full-grain leathers and vulcanized natural rubber soles.',
    code: 'KICKS10',
    discount: 'UP TO 50% OFF',
    validTill: 'Until Sunday',
    ctaText: 'Shop Footwear',
    ctaLink: '/shop?category=sneakers',
  }
];
