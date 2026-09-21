import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ordersApi } from '../api/orders';
import { ShieldCheck, MapPin, Phone, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

import { formatApiError } from '../utils/errorHandler';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successOrder, setSuccessOrder] = useState(null);

  if (items.length === 0 && !successOrder) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!shippingAddress.trim() || !phoneNumber.trim()) {
      setError('Please provide your complete shipping address and reachable phone number.');
      return;
    }

    setLoading(true);
    setError(null);

    // Payload according to backend spec:
    // { shippingAddress, phoneNumber, items: [{ productId, quantity }] }
    const orderPayload = {
      shippingAddress: shippingAddress.trim(),
      phoneNumber: phoneNumber.trim(),
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await ordersApi.create(orderPayload);
      clearCart();
      setSuccessOrder(response || { id: 'ORD-' + Math.floor(Math.random() * 90000 + 10000) });
    } catch (err) {
      console.error('Order placement error:', err);
      setError(formatApiError(err, 'Failed to place order. Please verify your details and try again.'));
    } finally {
      setLoading(false);
    }
  };

  if (successOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="font-heritage text-3xl font-bold text-[#80182a]">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-sm text-[#624f4b]">
          Thank you for choosing Sadikshya Music Store. Our luthiers have received your requisition and are preparing your instruments.
        </p>

        <div className="mt-6 p-6 rounded-2xl bg-white border border-[#d4a359]/30 text-left space-y-2">
          <div className="flex justify-between text-xs text-[#624f4b]">
            <span>Order Reference:</span>
            <span className="font-bold text-[#1f1412]">{successOrder.id || successOrder.orderId}</span>
          </div>
          <div className="flex justify-between text-xs text-[#624f4b]">
            <span>Delivery Destination:</span>
            <span className="font-bold text-[#1f1412]">{shippingAddress}</span>
          </div>
          <div className="flex justify-between text-xs text-[#624f4b]">
            <span>Contact Phone:</span>
            <span className="font-bold text-[#1f1412]">{phoneNumber}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/my-orders"
            className="px-6 py-3 rounded-full bg-[#80182a] text-white text-xs font-bold hover:bg-[#580d1b] transition-all shadow-md"
          >
            View Order History
          </Link>
          <Link
            to="/browse"
            className="px-6 py-3 rounded-full border border-[#80182a] text-[#80182a] text-xs font-bold hover:bg-[#f9ede7] transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const estimatedShipping = subtotal > 300 ? 0 : 25;
  const grandTotal = subtotal + estimatedShipping;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heritage text-3xl font-bold text-[#80182a] mb-2">
        Secure Checkout
      </h1>
      <p className="text-xs text-[#624f4b] mb-8">
        Complete your shipping details to transmit your order to our Patan workshop.
      </p>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Shipping Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handlePlaceOrder} className="bg-white rounded-2xl border border-[#d4a359]/30 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-[#d4a359]/20 text-sm font-bold text-[#80182a]">
              <MapPin className="w-4 h-4 text-[#c85a32]" />
              <span>1. Delivery Destination & Contact</span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1.5">
                Shipping Address *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Street Address, Ward No, City/Town, Postal Code, District (e.g. Jhamsikhel, Ward 3, Lalitpur)"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl focus:outline-hidden focus:border-[#80182a] text-[#1f1412]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1.5">
                Contact Phone Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="+977 98XXXXXXXX or International Format"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl focus:outline-hidden focus:border-[#80182a] text-[#1f1412]"
                />
                <Phone className="w-4 h-4 text-[#624f4b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f9ede7] border border-[#d4a359]/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#80182a]">
                <Truck className="w-4 h-4 text-[#c85a32]" />
                <span>Specialized Musical Courier Handling</span>
              </div>
              <p className="text-[11px] text-[#624f4b] leading-relaxed">
                All acoustic folk instruments (Madal, Sarangi, Dhime) are de-tensioned slightly during transit to prevent humidity cracking and wrapped in double heavy-gauge bubble padding.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#80182a] to-[#c85a32] text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Placing Order via ASP.NET API...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Order (${grandTotal.toFixed(2)})</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-[#d4a359]/30 p-6 shadow-xs space-y-4">
            <h3 className="font-heritage text-base font-bold text-[#80182a] pb-2 border-b border-[#d4a359]/20">
              Items in Requisition ({items.length})
            </h3>

            <div className="divide-y divide-[#d4a359]/10 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#1f1412] block">
                      {item.name || item.title}
                    </span>
                    <span className="text-[#624f4b]">
                      Qty: {item.quantity} × ${(Number(item.price) || 0).toFixed(2)}
                    </span>
                  </div>
                  <span className="font-bold text-[#80182a]">
                    ${((Number(item.price) || 0) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#d4a359]/20 space-y-2 text-xs text-[#624f4b]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1f1412]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Flight Case Shipping</span>
                <span className="font-semibold text-[#1f1412]">
                  {estimatedShipping === 0 ? 'FREE' : `$${estimatedShipping.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#d4a359]/10 flex justify-between items-baseline">
                <span className="font-bold text-sm text-[#1f1412]">Total to Pay</span>
                <span className="font-heritage text-xl font-bold text-[#80182a]">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
