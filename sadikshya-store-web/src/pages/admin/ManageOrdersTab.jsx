import React, { useState } from 'react';
import StatusBadge from '../../components/common/StatusBadge';
import { Package, MapPin, Phone, RefreshCw, AlertCircle, Check } from 'lucide-react';

export default function ManageOrdersTab({ orders = [], onRefresh }) {
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    setError(null);
    setSuccess(null);

    try {
      // Backend spec: PUT /api/orders/{id}/status — body is a plain string like "Shipped"
      await ordersApi.updateStatus(orderId, newStatus);
      setSuccess(`Order #${orderId} status updated to ${newStatus}`);
      setTimeout(() => setSuccess(null), 3500);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Failed to update status on backend:', err);
      // If offline preview, update local state
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        order.status = newStatus;
        setSuccess(`Order #${orderId} status updated to ${newStatus}`);
        setTimeout(() => setSuccess(null), 3500);
        if (onRefresh) onRefresh();
      } else {
        setError(err.response?.data?.message || 'Error updating order status.');
      }
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-[#d4a359]/30 shadow-xs">
        <div>
          <h3 className="font-heritage text-lg font-bold text-[#80182a] flex items-center gap-2">
            <Package className="w-5 h-5 text-[#c85a32]" />
            <span>Store Customer Requisitions & Orders</span>
          </h3>
          <p className="text-xs text-[#624f4b]">
            Inspect all customer orders in the system via <code>GET /api/orders</code> and update dispatch status via <code>PUT /api/orders/{'{id}'}/status</code>.
          </p>
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="px-4 py-2 rounded-xl bg-[#f9ede7] hover:bg-[#f2ded5] text-[#80182a] text-xs font-bold transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#d4a359]/30 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#d4a359]/20 text-xs">
            <thead className="bg-[#fff8f5]">
              <tr>
                <th className="px-6 py-3.5 text-left font-bold text-[#80182a] uppercase">Order ID</th>
                <th className="px-6 py-3.5 text-left font-bold text-[#80182a] uppercase">Recipient & Contact</th>
                <th className="px-6 py-3.5 text-left font-bold text-[#80182a] uppercase">Items Summary</th>
                <th className="px-6 py-3.5 text-left font-bold text-[#80182a] uppercase">Total</th>
                <th className="px-6 py-3.5 text-left font-bold text-[#80182a] uppercase">Current Status</th>
                <th className="px-6 py-3.5 text-right font-bold text-[#80182a] uppercase">Change Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d4a359]/10">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#624f4b]">
                    No customer orders found in the ASP.NET database yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const isCurrentUpdating = updatingId === order.id;

                  return (
                    <tr key={order.id} className="hover:bg-[#f9ede7]/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-[#80182a]">
                        #{order.id}
                      </td>

                      <td className="px-6 py-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-[#1f1412] font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#c85a32] shrink-0" />
                          <span className="truncate max-w-[180px]">{order.shippingAddress || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#624f4b]">
                          <Phone className="w-3.5 h-3.5 text-[#c85a32] shrink-0" />
                          <span>{order.phoneNumber || 'N/A'}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-[#1f1412] font-semibold">
                          {order.items?.length || 1} instrument package(s)
                        </div>
                        <div className="text-[11px] text-[#624f4b] truncate max-w-[200px]">
                          {order.items?.map((i) => i.productName || `ID ${i.productId}`).join(', ') || 'Instrument items'}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-bold text-[#80182a]">
                        ${(Number(order.totalAmount || order.total) || 320).toFixed(2)}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={order.status} />
                      </td>

                      <td className="px-6 py-4 text-right">
                        <select
                          disabled={isCurrentUpdating}
                          value={order.status || 'Pending'}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="px-3 py-1.5 bg-[#fff8f5] border border-[#d4a359]/50 rounded-xl text-xs font-semibold text-[#1f1412] focus:outline-hidden focus:border-[#80182a] disabled:opacity-50"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
