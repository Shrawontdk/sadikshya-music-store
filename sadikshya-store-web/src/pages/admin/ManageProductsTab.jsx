import React, { useState } from 'react';
import { productsApi } from '../../api/products';
import { formatApiError } from '../../utils/errorHandler';
import Modal from '../../components/common/Modal';
import { Plus, Edit2, Trash2, PlusCircle, MinusCircle, AlertCircle, Package } from 'lucide-react';

export default function ManageProductsTab({ products = [], categories = [], onRefresh }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  // Dynamic specs: array of { key, value }
  const [specRows, setSpecRows] = useState([
    { key: 'Origin', value: 'Patan, Nepal' },
    { key: 'Material', value: 'Seasoned Hardwood' },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const openCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setImageUrl('');
    setCategoryId(categories[0]?.id || '');
    setSpecRows([
      { key: 'Origin', value: 'Patan, Nepal' },
      { key: 'Material', value: 'Seasoned Saaj Wood' },
      { key: 'Tuning', value: 'Concert Pitch G#' },
    ]);
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingProduct(p);
    setName(p.name || p.title || '');
    setDescription(p.description || '');
    setPrice(String(p.price || ''));
    setStock(String(p.stock ?? 5));
    setImageUrl(p.imageUrl || p.image || '');
    setCategoryId(p.categoryId || categories[0]?.id || '');

    // Convert details object into specRows
    if (p.details && typeof p.details === 'object') {
      const rows = Object.entries(p.details).map(([k, v]) => ({ key: k, value: String(v) }));
      setSpecRows(rows.length > 0 ? rows : [{ key: 'Material', value: '' }]);
    } else {
      setSpecRows([
        { key: 'Origin', value: p.origin || 'Nepal' },
        { key: 'Material', value: p.timber || '' },
      ]);
    }

    setError(null);
    setModalOpen(true);
  };

  const handleAddSpecRow = () => {
    setSpecRows([...specRows, { key: '', value: '' }]);
  };

  const handleRemoveSpecRow = (idx) => {
    setSpecRows(specRows.filter((_, i) => i !== idx));
  };

  const handleSpecChange = (idx, field, val) => {
    const updated = [...specRows];
    updated[idx][field] = val;
    setSpecRows(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Build details dictionary from spec rows
    const detailsObj = {};
    specRows.forEach((r) => {
      if (r.key.trim()) {
        detailsObj[r.key.trim()] = r.value.trim();
      }
    });

    const payload = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0,
      imageUrl: imageUrl.trim(),
      categoryId: categoryId || (categories[0]?.id ?? 1),
      details: detailsObj,
    };

    try {
      if (editingProduct) {
        await productsApi.update(editingProduct.id, payload);
      } else {
        await productsApi.create(payload);
      }
      setModalOpen(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Failed to save product via API:', err);
      setError(formatApiError(err, 'Failed to save product. Please check requirements.'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to soft-delete this instrument? (Calls DELETE /api/products/{id})')) {
      return;
    }

    try {
      await productsApi.delete(id);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Delete product error:', err);
      alert(formatApiError(err, 'Failed to delete instrument.'));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#d4a359]/30 shadow-xs">
        <div>
          <h3 className="font-heritage text-lg font-bold text-[#80182a] flex items-center gap-2">
            <Package className="w-5 h-5 text-[#c85a32]" />
            <span>Master Inventory Management</span>
          </h3>
          <p className="text-xs text-[#624f4b]">
            Create and edit instruments with dynamic key-value specification attributes.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-[#80182a] hover:bg-[#580d1b] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Product (POST /api/products)</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#d4a359]/30 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#d4a359]/20 text-xs">
            <thead className="bg-[#fff8f5]">
              <tr>
                <th className="px-6 py-3.5 text-left font-bold text-[#80182a] uppercase">Product</th>
                <th className="px-6 py-3.5 text-left font-bold text-[#80182a] uppercase">Category</th>
                <th className="px-6 py-3.5 text-left font-bold text-[#80182a] uppercase">Price</th>
                <th className="px-6 py-3.5 text-left font-bold text-[#80182a] uppercase">Stock</th>
                <th className="px-6 py-3.5 text-left font-bold text-[#80182a] uppercase">Specs (Key-Value)</th>
                <th className="px-6 py-3.5 text-right font-bold text-[#80182a] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d4a359]/10">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#624f4b]">
                    No instruments in catalog. Click "New Product" to add one.
                  </td>
                </tr>
              ) : (
                products.map((p) => {
                  const specsCount = p.details ? Object.keys(p.details).length : 0;
                  return (
                    <tr key={p.id} className="hover:bg-[#f9ede7]/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imageUrl || p.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&q=80'}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-[#f9ede7] border border-[#d4a359]/20 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-[#1f1412] block">
                              {p.name || p.title}
                            </span>
                            <span className="text-[#624f4b] font-mono text-[10px]">
                              ID: {p.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-[#624f4b] font-medium">
                        {p.categoryName || p.category || 'Instrument'}
                      </td>

                      <td className="px-6 py-4 font-bold text-[#80182a]">
                        ${(Number(p.price) || 0).toFixed(2)}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          (p.stock ?? 5) > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {p.stock ?? 5} units
                        </span>
                      </td>

                      <td className="px-6 py-4 text-[#624f4b]">
                        <span className="px-2 py-0.5 rounded-md bg-[#f9ede7] text-[#80182a] font-semibold text-[11px]">
                          {specsCount} dynamic keys
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 rounded-lg text-[#80182a] hover:bg-[#80182a]/10 transition-colors"
                            title="Edit Product (PUT)"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Soft Delete Product (DELETE)"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal with dynamic key-value details */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? `Edit Instrument: ${editingProduct.name || editingProduct.title}` : 'Add New Instrument'}
        maxWidth="max-w-3xl"
      >
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1">
                Instrument Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Patan Master Grade Madal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl text-[#1f1412] focus:outline-hidden focus:border-[#80182a]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1">
                Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl text-[#1f1412] focus:outline-hidden focus:border-[#80182a]"
              >
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="1">Traditional Nepali Percussion</option>
                    <option value="2">String Instruments</option>
                    <option value="3">Western Guitars</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1">
                Price (USD) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="299.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl text-[#1f1412] focus:outline-hidden focus:border-[#80182a]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                placeholder="5"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl text-[#1f1412] focus:outline-hidden focus:border-[#80182a]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1">
                Image URL
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl text-[#1f1412] focus:outline-hidden focus:border-[#80182a]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Handcrafted details, timber curing, acoustic sound profile..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl text-[#1f1412] focus:outline-hidden focus:border-[#80182a]"
            />
          </div>

          {/* Dynamic Details Spec Builder */}
          <div className="pt-2 border-t border-[#d4a359]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#80182a]">
                Dynamic Specifications Details (key: value)
              </span>
              <button
                type="button"
                onClick={handleAddSpecRow}
                className="text-xs font-semibold text-[#c85a32] hover:text-[#80182a] flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Spec Row</span>
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {specRows.map((row, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Spec Name (e.g. Material)"
                    value={row.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    className="w-1/3 px-3 py-1.5 text-xs bg-white border border-[#d4a359]/40 rounded-lg text-[#1f1412]"
                  />
                  <input
                    type="text"
                    placeholder="Spec Value (e.g. Aged Saaj Wood)"
                    value={row.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#d4a359]/40 rounded-lg text-[#1f1412]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecRow(idx)}
                    className="text-rose-600 hover:text-rose-800 p-1"
                  >
                    <MinusCircle className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#d4a359]/20 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#80182a] to-[#c85a32] text-white text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-md disabled:opacity-50"
            >
              {loading ? 'Transmitting to API...' : editingProduct ? 'Save Changes (PUT)' : 'Create Instrument (POST)'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
