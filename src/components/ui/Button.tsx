import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/helpers';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-[#171717] disabled:opacity-50 disabled:cursor-not-allowed select-none';

    const variants = {
      primary:
        'bg-[#171717] hover:bg-black text-white active:bg-neutral-900 shadow-2xs',
      secondary:
        'bg-[#FAF9F6] hover:bg-white text-[#171717] border border-[#E7E5E4] hover:border-[#171717]',
      dark:
        'bg-[#171717] hover:bg-black text-white',
      outline:
        'border border-[#E7E5E4] hover:border-[#171717] bg-white hover:bg-[#FAF9F6] text-[#171717]',
      ghost:
        'bg-transparent hover:bg-[#FAF9F6] text-[#737373] hover:text-[#171717]',
      danger:
        'bg-red-600 hover:bg-red-700 text-white',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-md',
      md: 'text-xs sm:text-sm px-4 py-2.5 gap-2 rounded-lg',
      lg: 'text-sm sm:text-base px-6 py-3.5 gap-2.5 rounded-lg font-medium',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
