import React, { useState, useEffect } from 'react';
import { categoriesApi } from '../../api/categories';
import { productsApi } from '../../api/products';
import { ordersApi } from '../../api/orders';
import { formatApiError } from '../../utils/errorHandler';
import ManageCategoriesTab from './ManageCategoriesTab';
import ManageProductsTab from './ManageProductsTab';
import ManageOrdersTab from './ManageOrdersTab';
import { ShieldCheck, Tag, Package, ShoppingCart, RefreshCw, AlertCircle } from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('products'); // 'categories', 'products', 'orders'

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAllAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [catRes, prodRes, ordRes] = await Promise.all([
        categoriesApi.getAll(),
        productsApi.getAll(),
        ordersApi.getAll(),
      ]);

      setCategories(Array.isArray(catRes) ? catRes : []);
      setProducts(Array.isArray(prodRes) ? prodRes : []);
      setOrders(Array.isArray(ordRes) ? ordRes : []);
    } catch (err) {
      console.error('Admin data load failed:', err);
      setError(formatApiError(err, 'Failed to sync administrative data from backend API.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-[#580d1b] to-[#80182a] p-8 rounded-3xl text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4a359]/20 text-[#f4e5c4] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4a359]" />
            <span>Admin Control Panel (role: Admin)</span>
          </div>
          <h1 className="font-heritage text-2xl sm:text-3xl font-bold">
            Sadikshya Atelier Store Manager
          </h1>
          <p className="text-xs text-[#f4e5c4]/80">
            Authenticated interface connecting to ASP.NET Core Web API at <code>https://localhost:7105/api</code>
          </p>
        </div>

        <button
          onClick={loadAllAdminData}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-[#d4a359]/30 text-[#f4e5c4] text-xs font-bold transition-all flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync API Data</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-[#d4a359]/30 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'products'
              ? 'border-[#80182a] text-[#80182a] bg-[#80182a]/5'
              : 'border-transparent text-[#624f4b] hover:text-[#1f1412]'
          }`}
        >
          <Package className="w-4 h-4 text-[#c85a32]" />
          <span>Manage Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'categories'
              ? 'border-[#80182a] text-[#80182a] bg-[#80182a]/5'
              : 'border-transparent text-[#624f4b] hover:text-[#1f1412]'
          }`}
        >
          <Tag className="w-4 h-4 text-[#c85a32]" />
          <span>Manage Categories ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-[#80182a] text-[#80182a] bg-[#80182a]/5'
              : 'border-transparent text-[#624f4b] hover:text-[#1f1412]'
          }`}
        >
          <ShoppingCart className="w-4 h-4 text-[#c85a32]" />
          <span>Customer Orders ({orders.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'products' && (
          <ManageProductsTab
            products={products}
            categories={categories}
            onRefresh={loadAllAdminData}
          />
        )}

        {activeTab === 'categories' && (
          <ManageCategoriesTab
            categories={categories}
            onRefresh={loadAllAdminData}
          />
        )}

        {activeTab === 'orders' && (
          <ManageOrdersTab
            orders={orders}
            onRefresh={loadAllAdminData}
          />
        )}
      </div>
    </div>
  );
}
