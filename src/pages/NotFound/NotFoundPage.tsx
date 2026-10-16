import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
          <span className="text-4xl font-black">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500">
            The page you're searching for seems to have moved, been deleted, or never existed in the catalog.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link to="/">
            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-auto font-bold"
              leftIcon={<ShoppingBag className="w-4 h-4" />}
            >
              Back to Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button
              variant="outline"
              size="md"
              className="w-full sm:w-auto"
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
