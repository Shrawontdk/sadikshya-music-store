import React, { useState } from 'react';
import { categoriesApi } from '../../api/categories';
import { Plus, Tag, FolderPlus, Check, AlertCircle } from 'lucide-react';

export default function ManageCategoriesTab({ categories, onRefresh }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await categoriesApi.create({
        name: name.trim(),
        description: description.trim(),
      });
      setName('');
      setDescription('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Failed to create category:', err);
      // If backend is offline, update parent's local list so UI reflects change
      if (!err.response || err.code === 'ERR_NETWORK') {
        categories.push({
          id: 'cat-' + Date.now(),
          name: name.trim(),
          description: description.trim(),
        });
        setName('');
        setDescription('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(err.response?.data?.message || 'Error creating category.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Create Category Form */}
      <div className="bg-white rounded-2xl border border-[#d4a359]/30 p-6 shadow-xs">
        <h3 className="font-heritage text-lg font-bold text-[#80182a] mb-1 flex items-center gap-2">
          <FolderPlus className="w-5 h-5 text-[#c85a32]" />
          <span>Add New Instrument Category</span>
        </h3>
        <p className="text-xs text-[#624f4b] mb-4">
          Calls <code>POST /api/categories</code> (Admin authenticated).
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>Category added successfully!</span>
          </div>
        )}

        <form onSubmit={handleCreateCategory} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Traditional Flutes (Bansuri)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl focus:outline-hidden focus:border-[#80182a] text-[#1f1412]"
            />
          </div>

          <div className="md:col-span-6">
            <label className="block text-xs font-bold uppercase text-[#624f4b] mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="Himalayan bamboo wind instruments..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-[#fff8f5] border border-[#d4a359]/40 rounded-xl focus:outline-hidden focus:border-[#80182a] text-[#1f1412]"
            />
          </div>

          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-[#80182a] hover:bg-[#580d1b] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Create</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Existing Categories Table */}
      <div className="bg-white rounded-2xl border border-[#d4a359]/30 overflow-hidden shadow-xs">
        <div className="px-6 py-4 bg-[#f9ede7] border-b border-[#d4a359]/20 flex items-center justify-between">
          <h4 className="font-heritage text-sm font-bold text-[#80182a] flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#c85a32]" />
            <span>Active Categories ({categories.length})</span>
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#d4a359]/20 text-xs">
            <thead className="bg-[#fff8f5]">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-[#80182a] uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left font-bold text-[#80182a] uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left font-bold text-[#80182a] uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d4a359]/10">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-[#624f4b]">
                    No categories registered yet.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#f9ede7]/40 transition-colors">
                    <td className="px-6 py-3.5 font-mono text-[#624f4b]">{cat.id}</td>
                    <td className="px-6 py-3.5 font-bold text-[#1f1412]">{cat.name}</td>
                    <td className="px-6 py-3.5 text-[#624f4b]">{cat.description || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
