import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, totalCount } = useCart();
  const navigate = useNavigate();

  const formattedSubtotal = subtotal.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const estimatedShipping = subtotal > 0 ? (subtotal > 300 ? 0 : 25) : 0;
  const grandTotal = subtotal + estimatedShipping;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-[#f9ede7] rounded-full flex items-center justify-center mx-auto mb-6 text-[#80182a]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-heritage text-3xl font-bold text-[#80182a]">Your Cart is Empty</h2>
        <p className="mt-2 text-sm text-[#624f4b] max-w-md mx-auto">
          Explore our handcrafted Nepalese folk instruments and premium Western collections to find your sound.
        </p>
        <Link
          to="/browse"
          className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#80182a] to-[#c85a32] text-white text-sm font-bold shadow-md hover:brightness-110 transition-all"
        >
          <span>Browse Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heritage text-3xl font-bold text-[#80182a]">
            Shopping Cart
          </h1>
          <p className="text-xs text-[#624f4b] mt-1">
            {totalCount} item{totalCount > 1 ? 's' : ''} in your order bag
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-700 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Cart Items Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-[#d4a359]/30 overflow-hidden shadow-xs">
            <div className="divide-y divide-[#d4a359]/15">
              {items.map((item) => {
                const itemPrice = Number(item.price) || 0;
                const lineTotal = itemPrice * item.quantity;
                const defaultImg = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80';
                const img = item.imageUrl || item.image || defaultImg;

                return (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row items-center gap-5">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#f9ede7] shrink-0 border border-[#d4a359]/20">
                      <img src={img} alt={item.name || item.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#c85a32]">
                        {item.categoryName || item.category || 'Instrument'}
                      </span>
                      <h4 className="font-heritage text-base font-bold text-[#1f1412]">
                        {item.name || item.title}
                      </h4>
                      <p className="text-xs text-[#624f4b]">
                        Unit Price: ${itemPrice.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#d4a359]/40 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-[#f9ede7] text-[#1f1412] transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#1f1412]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-[#f9ede7] text-[#1f1412] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="text-right min-w-[90px]">
                      <span className="font-heritage text-base font-bold text-[#80182a]">
                        ${lineTotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-[#624f4b] hover:text-red-600 transition-colors"
                      title="Remove instrument"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#80182a] hover:text-[#c85a32] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue browsing instruments</span>
            </Link>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-[#d4a359]/30 p-6 shadow-md space-y-5 sticky top-28">
            <h3 className="font-heritage text-lg font-bold text-[#80182a] pb-3 border-b border-[#d4a359]/20">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm text-[#624f4b]">
              <div className="flex justify-between">
                <span>Subtotal ({totalCount} items)</span>
                <span className="font-semibold text-[#1f1412]">{formattedSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Padded Flight Casing / Shipping</span>
                <span className="font-semibold text-[#1f1412]">
                  {estimatedShipping === 0 ? (
                    <span className="text-emerald-700">Free (Over $300)</span>
                  ) : (
                    `$${estimatedShipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-xs text-[#624f4b]">
                <span>Artisan Inspection & Calibration</span>
                <span className="text-emerald-700 font-semibold">Included</span>
              </div>

              <div className="pt-3 border-t border-[#d4a359]/20 flex justify-between items-baseline">
                <span className="font-bold text-base text-[#1f1412]">Estimated Total</span>
                <span className="font-heritage text-2xl font-bold text-[#80182a]">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#80182a] to-[#c85a32] text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 pt-2 text-[11px] text-[#624f4b]">
              <ShieldCheck className="w-4 h-4 text-[#d4a359] shrink-0" />
              <span>Authenticated ASP.NET Core Orders API & JWT Protection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
