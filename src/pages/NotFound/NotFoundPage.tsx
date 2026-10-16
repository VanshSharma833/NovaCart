import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 text-center bg-[#FAF9F6]">
      <div className="max-w-md w-full space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-white border border-[#E7E5E4] text-[#171717] flex items-center justify-center mx-auto shadow-2xs">
          <span className="text-2xl font-medium tracking-tight">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-medium text-[#171717] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#737373]">
            The page you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link to="/">
            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-auto font-medium"
              leftIcon={<ShoppingBag className="w-4 h-4" />}
            >
              Back to Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button
              variant="outline"
              size="md"
              className="w-full sm:w-auto font-medium"
              leftIcon={<Search className="w-4 h-4" />}
            >
              Search Catalog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
