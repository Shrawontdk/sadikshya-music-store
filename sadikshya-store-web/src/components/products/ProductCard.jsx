import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Volume2, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { soundSampler } from '../../utils/soundSampler';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const handlePlayTone = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Choose synth profile based on category or name
    const cat = (product.categoryName || product.category || '').toLowerCase();
    let type = 'percussive';
    let freqs = [320, 110, 440];

    if (cat.includes('sarangi') || cat.includes('string') || cat.includes('guitar')) {
      type = 'string';
      freqs = [261.6, 392.0, 523.2];
    } else if (cat.includes('flute') || cat.includes('wind') || cat.includes('bansuri')) {
      type = 'wind';
      freqs = [440, 554.3, 659.2];
    } else if (cat.includes('bowl') || cat.includes('bell')) {
      type = 'singing_bowl';
      freqs = [528, 1056];
    }

    soundSampler.playFrequencies(freqs, 1.6, type);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const formattedPrice = Number(product.price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // Fallback image if missing
  const defaultImage = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80';
  const displayImage = product.imageUrl || product.image || defaultImage;

  return (
    <div className="group bg-white rounded-2xl border border-[#d4a359]/30 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#c85a32]/60 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Image & Badges */}
        <div className="relative aspect-4/3 overflow-hidden bg-[#f9ede7]">
          <img
            src={displayImage}
            alt={product.name || product.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Category Tag */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-[#580d1b]/90 backdrop-blur-xs text-[#f4e5c4] rounded-full text-xs font-semibold tracking-wide">
              {product.categoryName || product.category || 'Instrument'}
            </span>
          </div>

          {/* Sound Audition Button */}
          <button
            onClick={handlePlayTone}
            title="Preview Instrument Acoustic Resonance"
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#80182a] hover:bg-[#80182a] hover:text-white transition-all shadow-md active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Stock Tag */}
          {product.stock !== undefined && (
            <div className="absolute bottom-3 left-3">
              {product.stock > 0 ? (
                <span className="px-2 py-0.5 bg-emerald-900/85 backdrop-blur-xs text-emerald-200 text-[11px] rounded-md font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {product.stock} in stock
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-rose-900/85 backdrop-blur-xs text-rose-200 text-[11px] rounded-md font-medium">
                  Out of Stock
                </span>
              )}
            </div>
          )}
        </div>

        {/* Product Content */}
        <div className="p-5">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-heritage text-base md:text-lg font-bold text-[#1f1412] group-hover:text-[#80182a] transition-colors line-clamp-1">
              {product.name || product.title}
            </h3>
          </Link>

          <p className="mt-1 text-xs text-[#624f4b] line-clamp-2 leading-relaxed">
            {product.description || 'Mastercrafted traditional instrument forged with seasoned tone-woods.'}
          </p>
        </div>
      </div>

      {/* Footer Price & Add To Cart */}
      <div className="px-5 pb-5 pt-2 border-t border-[#d4a359]/15 flex items-center justify-between mt-2">
        <div>
          <span className="text-xs text-[#624f4b] block">Price</span>
          <span className="text-lg font-bold text-[#80182a] font-heritage">
            {formattedPrice}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/product/${product.id}`}
            className="px-3 py-1.5 text-xs font-semibold text-[#80182a] hover:bg-[#f9ede7] rounded-lg transition-colors"
          >
            Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="p-2.5 rounded-xl bg-gradient-to-r from-[#80182a] to-[#c85a32] text-white hover:brightness-110 active:scale-95 transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
