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
    discount: 'bg-emerald-500 text-white font-bold',
    neutral: 'bg-slate-100 text-slate-700 font-medium',
    brand: 'bg-indigo-600 text-white font-semibold',
    success: 'bg-emerald-100 text-emerald-800 font-semibold',
    outline: 'border border-slate-200 text-slate-700 bg-white font-medium',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md leading-tight tracking-tight',
    md: 'text-xs px-2.5 py-1 rounded-lg',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center select-none uppercase tracking-wider',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};
