import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { productsApi } from '../api/products';
import { categoriesApi } from '../api/categories';
import { formatApiError } from '../utils/errorHandler';
import { Search, SlidersHorizontal, Music2, RefreshCcw, AlertCircle } from 'lucide-react';

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');

  // Load categories
  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const catRes = await categoriesApi.getAll();
        if (isMounted && Array.isArray(catRes)) {
          setCategories(catRes);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    }
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Determine categoryId for backend filtering if numeric or mapped
  const activeCategoryId = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all' || selectedCategory === 'traditional') {
      return null;
    }
    // Check if selectedCategory is an ID or name in categories
    const found = categories.find(
      (c) =>
        String(c.id) === String(selectedCategory) ||
        c.name?.toLowerCase().includes(selectedCategory.toLowerCase())
    );
    return found ? found.id : null;
  }, [selectedCategory, categories]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const prodRes = await productsApi.getAll(activeCategoryId);
        if (!isMounted) return;
        setProducts(Array.isArray(prodRes) ? prodRes : []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        if (isMounted) {
          setError(formatApiError(err, 'Failed to fetch instruments from server.'));
          setProducts([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [activeCategoryId]);

  // Filtered & Sorted items
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'all') {
        const pCat = (p.categoryName || p.category || '').toLowerCase();
        const sel = selectedCategory.toLowerCase();
        
        if (sel === 'traditional') {
          const isTrad = ['madal', 'sarangi', 'dhime', 'dhamphu', 'murchunga', 'flute', 'percussion'].some(k => pCat.includes(k));
          if (!isTrad) return false;
        } else if (!pCat.includes(sel)) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const name = (p.name || p.title || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        const cat = (p.categoryName || p.category || '').toLowerCase();
        if (!name.includes(q) && !desc.includes(q) && !cat.includes(q)) {
          return false;
        }
      }

      // Price filter
      const price = Number(p.price) || 0;
      if (priceRange === 'under100' && price >= 100) return false;
      if (priceRange === '100to300' && (price < 100 || price > 300)) return false;
      if (priceRange === 'over300' && price <= 300) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return (Number(a.price) || 0) - (Number(b.price) || 0);
      if (sortBy === 'price-high') return (Number(b.price) || 0) - (Number(a.price) || 0);
      if (sortBy === 'name') return (a.name || a.title || '').localeCompare(b.name || b.title || '');
      return 0; // featured default
    });
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  const handleCategorySelect = (catKey) => {
    setSelectedCategory(catKey);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (catKey && catKey !== 'all') {
        next.set('category', catKey);
      } else {
        next.delete('category');
      }
      return next;
    });
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setSortBy('featured');
    setPriceRange('all');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="bg-[#f9ede7] border border-[#d4a359]/30 rounded-3xl p-8 mb-10 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#80182a]/10 text-[#80182a] text-xs font-semibold uppercase tracking-wider mb-2">
            <Music2 className="w-3.5 h-3.5 text-[#c85a32]" />
            <span>Complete Collection</span>
          </div>
          <h1 className="font-heritage text-3xl sm:text-4xl font-bold text-[#80182a]">
            Instruments & Mastercrafts
          </h1>
          <p className="mt-2 text-sm text-[#624f4b]">
            Browse traditional Nepali instruments and western precision guitars, keyboards, and lutherie equipment.
          </p>
        </div>

        {/* Filter controls row */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, wood, tuning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#d4a359]/40 rounded-xl focus:outline-hidden focus:border-[#80182a] text-[#1f1412]"
            />
            <Search className="w-4 h-4 text-[#624f4b] absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategorySelect(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#d4a359]/40 rounded-xl focus:outline-hidden focus:border-[#80182a] text-[#1f1412]"
            >
              <option value="">All Categories</option>
              {categories.length > 0 ? (
                categories.map((c) => (
                  <option key={c.id} value={String(c.id)}>
                    {c.name}
                  </option>
                ))
              ) : (
                <>
                  <option value="madal">Madal</option>
                  <option value="sarangi">Sarangi</option>
                  <option value="dhime">Dhime</option>
                  <option value="guitar">Guitars</option>
                </>
              )}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#d4a359]/40 rounded-xl focus:outline-hidden focus:border-[#80182a] text-[#1f1412]"
            >
              <option value="all">All Prices</option>
              <option value="under100">Under $100</option>
              <option value="100to300">$100 - $300</option>
              <option value="over300">Above $300</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#d4a359]/40 rounded-xl focus:outline-hidden focus:border-[#80182a] text-[#1f1412]"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Instrument Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips & Reset */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[#d4a359]/20 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#624f4b] font-medium">
              Showing <strong>{filteredProducts.length}</strong> instruments
            </span>
            {(selectedCategory || searchQuery || priceRange !== 'all') && (
              <span className="px-2 py-0.5 rounded-full bg-[#80182a]/10 text-[#80182a] font-semibold">
                Filters Active
              </span>
            )}
          </div>

          {(selectedCategory || searchQuery || priceRange !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[#80182a] hover:text-[#c85a32] font-semibold"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#d4a359]/30 p-8">
          <SlidersHorizontal className="w-12 h-12 text-[#d4a359] mx-auto mb-3" />
          <h3 className="font-heritage text-lg font-bold text-[#80182a]">
            No matching instruments found
          </h3>
          <p className="mt-1 text-sm text-[#624f4b]">
            Try altering your search keywords or resetting your category and price filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-6 py-2 rounded-full bg-[#80182a] text-white text-xs font-semibold hover:bg-[#580d1b] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
