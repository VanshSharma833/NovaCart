import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { cn } from '../../lib/helpers';

export const MobileNav: React.FC = () => {
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();

  const navItems = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'Shop', to: '/shop', icon: Compass },
    { label: 'Wishlist', to: '/wishlist', icon: Heart, badge: wishlistCount },
    { label: 'Cart', to: '/cart', icon: ShoppingBag, badge: totalItemCount },
    { label: 'Account', to: '/account', icon: User },
  ];

  return (
    <nav aria-label="Mobile Bottom Navigation" className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E7E5E4] sm:hidden pb-safe">
      <div className="grid grid-cols-5 h-16 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center h-full text-[10px] font-medium transition-colors relative',
                  isActive ? 'text-[#171717] font-bold' : 'text-[#737373] hover:text-[#171717]'
                )
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5 mb-0.5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#171717] text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
