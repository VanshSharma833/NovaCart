import React from 'react';
import { cn } from '../../lib/helpers';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'discount' | 'neutral' | 'brand' | 'success' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'discount',
  size = 'sm',
  className,
}) => {
  const variants = {
    discount: 'bg-[#171717] text-white font-bold',
    neutral: 'bg-[#FAF9F6] text-[#737373] border border-[#E7E5E4] font-medium',
    brand: 'bg-[#FAF9F6] text-[#6554D9] border border-[#E7E5E4] font-semibold',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium',
    outline: 'border border-[#E7E5E4] text-[#171717] bg-white font-medium',
  };

  const sizes = {
    sm: 'text-[9px] px-2 py-0.5 rounded leading-tight tracking-wider uppercase',
    md: 'text-xs px-2.5 py-1 rounded-md tracking-wider uppercase',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center select-none',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};
