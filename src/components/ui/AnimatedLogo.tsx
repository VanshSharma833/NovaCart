import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  return (
    <Link to="/" className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Animated Kinetic Geometric Logo Mark */}
      <motion.div
        whileHover={{ scale: 1.06, rotate: 3 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={`relative ${iconSizes[size]} rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-0.5 border border-white/20 shadow-lg shadow-black/30 overflow-hidden flex items-center justify-center`}
      >
        {/* Animated Moving Light Sheen across logo */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Minimalist SVG Icon: Kinetic Cart / Diamond Facet */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white relative z-10"
        >
          {/* Bag Body */}
          <motion.path
            d="M5 8H19L18 20H6L5 8Z"
            stroke="url(#logo-gradient)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 1 }}
            whileHover={{ pathLength: 1, strokeWidth: 2 }}
          />
          {/* Bag Handle */}
          <motion.path
            d="M9 8V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8"
            stroke="url(#logo-gradient-accent)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Geometric Diamond Spark */}
          <motion.circle
            cx="12"
            cy="14"
            r="1.75"
            fill="#38BDF8"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <defs>
            <linearGradient id="logo-gradient" x1="5" y1="8" x2="19" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="logo-gradient-accent" x1="9" y1="3" x2="15" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#818CF8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Typography with Subtle Shimmer Accent */}
      <div className="flex flex-col">
        <span className={`${textSizes[size]} font-black tracking-tight text-slate-900 group-hover:text-black transition-colors flex items-center`}>
          Nova<span className="text-slate-900 font-light">Cart</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 ml-1 inline-block animate-pulse" />
        </span>
      </div>
    </Link>
  );
};
