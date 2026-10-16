import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-8 h-8',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <Link to="/" className={`flex items-center gap-2 group select-none ${className}`}>
      {/* Clean Minimalist Logo Mark */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`relative ${iconSizes[size]} rounded-lg bg-[#171717] flex items-center justify-center text-white shadow-xs`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-white"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </motion.div>

      {/* Editorial Typography */}
      <span className={`${textSizes[size]} font-medium tracking-tight text-[#171717] flex items-center`}>
        NovaCart
        <span className="w-1.5 h-1.5 rounded-full bg-[#6554D9] ml-1 inline-block" />
      </span>
    </Link>
  );
};
