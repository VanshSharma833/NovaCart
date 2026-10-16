import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/helpers';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviewCount,
  showCount = true,
  size = 'sm',
  className,
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const formattedCount = reviewCount
    ? reviewCount >= 1000
      ? `${(reviewCount / 1000).toFixed(1)}k`
      : reviewCount
    : null;

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center text-amber-400">
        <Star className={cn(iconSizes[size], 'fill-amber-400')} />
      </div>
      <span className={cn('font-bold text-slate-900', textSizes[size])}>
        {rating.toFixed(1)}
      </span>
      {showCount && formattedCount && (
        <span className={cn('text-slate-500 font-normal', textSizes[size])}>
          ({formattedCount})
        </span>
      )}
    </div>
  );
};
