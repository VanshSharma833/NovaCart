import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Check } from 'lucide-react';
import { Product } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { RatingStars } from '../ui/RatingStars';
import { formatPrice } from '../../lib/formatPrice';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const isFavorited = isInWishlist(product.id);
  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    showToast(`Added ${product.name} to cart!`, 'success', 'View Cart', () => setIsCartOpen(true));
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    onClose();
    navigate('/checkout');
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    showToast(
      isFavorited ? `Removed from wishlist` : `Added ${product.name} to wishlist!`,
      'info'
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start p-2">
        {/* Left: Gallery */}
        <div className="space-y-3">
          <div className="aspect-square bg-[#FAF9F6] border border-[#E7E5E4] rounded-xl overflow-hidden flex items-center justify-center p-4">
            <img
              src={gallery[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 rounded-lg border overflow-hidden shrink-0 transition-all ${
                    selectedImage === idx
                      ? 'border-[#171717] ring-1 ring-[#171717]'
                      : 'border-[#E7E5E4] hover:border-neutral-400 bg-[#FAF9F6]'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#737373] uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="text-[#E7E5E4]">•</span>
              <span className="text-xs text-[#737373] capitalize">{product.category}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#171717] tracking-tight">
              {product.name}
            </h2>

            <div className="mt-2 flex items-center gap-3">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
              <span className="text-xs text-[#E7E5E4]">•</span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> In Stock
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pt-1 border-t border-[#E7E5E4]">
            <span className="text-2xl sm:text-3xl font-black text-[#171717]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-[#737373] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discount > 0 && (
              <Badge variant="discount">{product.discount}% OFF</Badge>
            )}
          </div>

          <p className="text-xs text-[#737373] leading-relaxed line-clamp-3">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#171717] block mb-1.5">
                Color: <span className="font-semibold text-[#737373]">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    className={`w-6 h-6 rounded-full border transition-all ${
                      selectedColor === color.name
                        ? 'ring-2 ring-[#171717] border-white scale-105'
                        : 'border-[#E7E5E4] hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#171717] block mb-1.5">
                Size: <span className="font-semibold text-[#737373]">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-all ${
                      selectedSize === size
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-white text-[#171717] border-[#E7E5E4] hover:border-[#171717]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-[#E7E5E4] rounded-lg bg-[#FAF9F6] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 flex items-center justify-center text-[#171717] hover:bg-white rounded text-sm font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#171717]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center text-[#171717] hover:bg-white rounded text-sm font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleWishlist}
                className={`p-2.5 rounded-lg border transition-colors ${
                  isFavorited
                    ? 'border-[#171717] bg-white text-rose-600'
                    : 'border-[#E7E5E4] text-[#737373] hover:text-[#171717]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
              </button>

              <Button
                variant="primary"
                size="md"
                className="flex-1 bg-[#171717] hover:bg-black text-white rounded-lg font-bold"
                onClick={handleAddToCart}
                leftIcon={<ShoppingBag className="w-4 h-4" />}
              >
                Add to Cart
              </Button>
            </div>

            <Button
              variant="outline"
              size="md"
              className="w-full border-[#E7E5E4] hover:border-[#171717] rounded-lg font-semibold"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

          {/* Full Details link */}
          <div className="pt-2 text-center">
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="text-xs font-medium text-[#171717] hover:text-[#6554D9] underline"
            >
              View Full Product Page →
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};
