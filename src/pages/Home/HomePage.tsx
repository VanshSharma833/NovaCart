import React from 'react';
import { HeroSection } from '../../components/home/HeroSection';
import { BrandMarquee } from '../../components/home/BrandMarquee';
import { CategorySlider } from '../../components/home/CategorySlider';
import { CuratedApparelSection } from '../../components/home/CuratedApparelSection';
import { TrendingNow } from '../../components/home/TrendingNow';
import { PromoBanner } from '../../components/home/PromoBanner';
import { BestSellers } from '../../components/home/BestSellers';
import { JustDropped } from '../../components/home/JustDropped';
import { EditorialSection } from '../../components/home/EditorialSection';
import { CustomerReviews } from '../../components/home/CustomerReviews';

interface HomePageProps {
  onOpenContact?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenContact }) => {
  return (
    <div className="min-h-screen">
      <HeroSection onOpenContact={onOpenContact} />
      <BrandMarquee />
      <CategorySlider />
      <CuratedApparelSection />
      <TrendingNow />
      <PromoBanner />
      <BestSellers />
      <EditorialSection />
      <JustDropped />
      <CustomerReviews />
    </div>
  );
};
