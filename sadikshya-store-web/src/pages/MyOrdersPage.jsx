import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersApi } from '../api/orders';
import { formatApiError } from '../utils/errorHandler';
import StatusBadge from '../components/common/StatusBadge';
import { Package, Calendar, MapPin, Phone, ArrowRight, AlertCircle } from 'lucide-react';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchOrders() {
      setLoading(true);
      setError(null);
      try {
        const data = await ordersApi.getMy();
        if (isMounted) {
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Could not fetch orders from backend:', err);
        if (isMounted) {
          setError(formatApiError(err, 'Failed to retrieve your orders.'));
          setOrders([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-heritage text-3xl font-bold text-[#80182a]">
          My Order History
        </h1>
        <p className="text-xs text-[#624f4b] mt-1">
          Track and inspect your handcrafted instrument orders and dispatch milestones.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-40 bg-gray-200 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#d4a359]/30 p-8">
          <Package className="w-12 h-12 text-[#d4a359] mx-auto mb-3" />
          <h3 className="font-heritage text-lg font-bold text-[#80182a]">
            No Orders Placed Yet
          </h3>
          <p className="mt-1 text-sm text-[#624f4b]">
            You haven't placed any musical instrument orders yet.
          </p>
          <Link
            to="/browse"
            className="mt-4 inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#80182a] text-white text-xs font-semibold hover:bg-[#580d1b] transition-colors"
          >
            <span>Browse Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const orderDate = order.createdAt 
              ? new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : 'Recent Order';

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-[#d4a359]/30 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
              >
                {/* Order Top Bar */}
                <div className="p-5 bg-[#f9ede7]/70 border-b border-[#d4a359]/20 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[#624f4b]">Order ID</span>
                    <p className="font-mono font-bold text-[#80182a] text-sm">
                      #{order.id}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#624f4b] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Date Placed
                    </span>
                    <p className="font-semibold text-[#1f1412]">{orderDate}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#624f4b]">Fulfillment Status</span>
                    <div>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>

                  <div className="space-y-1 text-right">
                    <span className="text-[#624f4b]">Order Total</span>
                    <p className="font-heritage text-base font-bold text-[#80182a]">
                      ${(Number(order.totalAmount || order.total) || 0).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Items & Shipping Content */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-8 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#80182a]">
                      Items in Package
                    </h4>
                    <div className="divide-y divide-[#d4a359]/10">
                      {(order.items || []).map((item, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            {item.imageUrl && (
                              <img
                                src={item.imageUrl}
                                alt=""
                                className="w-12 h-12 rounded-lg object-cover bg-[#f9ede7] border border-[#d4a359]/20"
                              />
                            )}
                            <div>
                              <span className="font-semibold text-[#1f1412]">
                                {item.productName || item.product?.name || `Instrument #${item.productId}`}
                              </span>
                              <span className="text-[#624f4b] block">
                                Quantity: {item.quantity}
                              </span>
                            </div>
                          </div>
                          <span className="font-bold text-[#1f1412]">
                            ${(Number(item.price || item.unitPrice || 0) * (item.quantity || 1)).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-4 bg-[#fff8f5] p-4 rounded-xl border border-[#d4a359]/20 text-xs space-y-2">
                    <h4 className="font-bold uppercase tracking-wider text-[#80182a]">
                      Delivery Coordinates
                    </h4>
                    <p className="text-[#1f1412] flex items-start gap-1.5 leading-relaxed">
                      <MapPin className="w-4 h-4 text-[#c85a32] shrink-0 mt-0.5" />
                      <span>{order.shippingAddress || 'Standard Atelier Address'}</span>
                    </p>
                    <p className="text-[#1f1412] flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-[#c85a32] shrink-0" />
                      <span>{order.phoneNumber || 'N/A'}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
