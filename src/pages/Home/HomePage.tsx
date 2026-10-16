import React from 'react';
import { HeroSection } from '../../components/home/HeroSection';
import { BrandMarquee } from '../../components/home/BrandMarquee';
import { CategorySlider } from '../../components/home/CategorySlider';
import { TrendingNow } from '../../components/home/TrendingNow';
import { PromoBanner } from '../../components/home/PromoBanner';
import { BestSellers } from '../../components/home/BestSellers';
import { EditorialSection } from '../../components/home/EditorialSection';
import { JustDropped } from '../../components/home/JustDropped';

interface HomePageProps {
  onOpenContact?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenContact }) => {
  return (
    <div className="min-h-screen bg-[#070A12] text-white selection:bg-white selection:text-slate-950">
      <HeroSection onOpenContact={onOpenContact} />
      <BrandMarquee />
      <CategorySlider />
      <TrendingNow />
      <PromoBanner />
      <BestSellers />
      <EditorialSection />
      <JustDropped />
    </div>
  );
};
