'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onSelectProduct, 
  isFavourite = false, 
  onToggleFavourite 
}) {
  const router = useRouter();
  if (!product) return null;

  const firstVariant = product.types?.[0]?.variants?.[0] || { price: 599, original: 799 };
  const price = firstVariant.price;
  const original = firstVariant.original;
  const discountPercent = original ? Math.round((1 - price / original) * 100) : 0;

  // Prefetch route immediately on hover or touchStart for 0ms transition lag
  const handlePrefetch = () => {
    try {
      if (product?.id) {
        router.prefetch(`/product/${product.id}`);
      }
    } catch (e) {}
  };

  const handleOpenProduct = (e) => {
    if (isSoldOut) return;
    
    // Instantaneous memory cache so product detail renders on frame 0
    if (typeof window !== 'undefined') {
      window.__PRELOADED_PRODUCT = product;
      try {
        sessionStorage.setItem('giftportal_active_product', JSON.stringify(product));
      } catch (err) {}
    }

    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  // Formats delivery text matching Screenshot 2:
  // "Earliest Delivery: Today" or "Earliest Delivery: 11 - Sep"
  const deliveryDisplay = product.earliestDelivery 
    ? product.earliestDelivery 
    : (product.deliveryDays === 0 || product.deliveryDays === undefined)
      ? 'Today'
      : `${new Date(Date.now() + (product.deliveryDays || 2) * 86400000).getDate()} - ${new Date(Date.now() + (product.deliveryDays || 2) * 86400000).toLocaleString('en-IN', { month: 'short' })}`;

  const isSoldOut = Boolean(product.isSoldOut || (product.stock !== undefined && Number(product.stock) <= 0));

  return (
    <motion.div
      whileHover={!isSoldOut ? { y: -3 } : {}}
      whileTap={!isSoldOut ? { scale: 0.97 } : {}}
      onMouseEnter={handlePrefetch}
      onTouchStart={handlePrefetch}
      onClick={handleOpenProduct}
      style={{ touchAction: 'manipulation' }}
      className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-2xs hover:shadow-card-hover active:shadow-inner transition-all duration-150 flex flex-col justify-between overflow-hidden group cursor-pointer select-none"
    >
      <div>
        {/* Product Image Container matching Screenshot 2 */}
        <div className="relative aspect-square w-full overflow-hidden bg-slate-50 rounded-t-xl sm:rounded-t-2xl">
          <img
            src={product.img}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isSoldOut ? 'grayscale-[60%]' : 'group-hover:scale-104'
            }`}
            loading="lazy"
          />

          {/* Rating or Special Tag Badge */}
          {product.rating && (
            <div className="absolute top-2 left-2 bg-slate-950/75 backdrop-blur-xs text-amber-300 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs pointer-events-none">
              <Star size={8} className="fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          )}

          {/* Sold out overlay */}
          {isSoldOut && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
              <span className="bg-rose-600 text-white font-black text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-md">
                Sold Out
              </span>
            </div>
          )}

          {/* Wishlist Heart Icon at Bottom-Right of Image matching Screenshot 2 */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleFavourite) onToggleFavourite(product);
            }}
            className={`absolute bottom-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white shadow-md flex items-center justify-center transition-all cursor-pointer border border-slate-100 hover:scale-110 active:scale-90 ${
              isFavourite ? 'text-rose-600' : 'text-slate-400 hover:text-rose-500'
            }`}
            aria-label={isFavourite ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              size={13} 
              className={`transition-colors ${isFavourite ? 'fill-rose-600 text-rose-600' : 'stroke-[1.8]'}`} 
            />
          </button>
        </div>

        {/* Product Details matching Screenshot 2 */}
        <div className="p-2.5 sm:p-3 space-y-0.5 sm:space-y-1">
          {/* Product Title */}
          <h3 className="font-sans font-medium text-xs sm:text-[13px] text-slate-800 group-hover:text-rose-700 transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Price display matching Screenshot 2: "₹ 2,799" */}
          <div className="flex items-baseline gap-1.5 pt-0.5">
            <span className="font-sans font-bold text-xs sm:text-sm md:text-base text-slate-900">
              ₹ {price.toLocaleString('en-IN')}
            </span>
            {original && original > price && (
              <span className="text-[10px] text-slate-400 line-through font-normal">
                ₹{original.toLocaleString('en-IN')}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* B2B Wholesale Tag */}
          {product.b2bPrice && (
            <div className="flex items-center gap-1 pt-0.5">
              <span className="text-[8.5px] font-black uppercase text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-1.5 py-0.5 rounded">
                🏢 B2B: ₹{product.b2bPrice} (MOQ {product.b2bMoq || 1})
              </span>
            </div>
          )}

          {/* Earliest Delivery Display matching Screenshot 2: "Earliest Delivery: Today" (in green) */}
          <p className="text-[10px] sm:text-[11px] text-slate-500 font-normal pt-0.5">
            Earliest Delivery:{' '}
            <span className="text-[#16a34a] font-bold">
              {deliveryDisplay}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
