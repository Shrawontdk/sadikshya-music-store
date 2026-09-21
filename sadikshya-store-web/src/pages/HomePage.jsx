import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import CategoryTiles from '../components/home/CategoryTiles';
import FeaturedProducts from '../components/home/FeaturedProducts';
import { productsApi } from '../api/products';
import { categoriesApi } from '../api/categories';
import { formatApiError } from '../utils/errorHandler';
import { ShieldAlert, Compass, Sparkles, Truck, RefreshCw, AlertCircle } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      setLoading(true);
      setError(null);
      try {
        const [prodData, catData] = await Promise.all([
          productsApi.getAll(),
          categoriesApi.getAll(),
        ]);

        if (!isMounted) return;

        setProducts(Array.isArray(prodData) ? prodData : []);
        setCategories(Array.isArray(catData) ? catData : []);
      } catch (err) {
        console.error('Error fetching home page data:', err);
        if (isMounted) {
          setError(formatApiError(err, 'Failed to load catalog from server.'));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-0">
      {/* API error notice */}
      {error && (
        <div className="bg-rose-50 border-b border-rose-200 px-4 py-3 text-xs text-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-5xl mx-auto">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection />

      {/* Trust & Craftsmanship Pillars */}
      <section className="bg-white border-b border-[#d4a359]/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-3">
              <div className="w-12 h-12 rounded-xl bg-[#80182a]/10 text-[#80182a] flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6 text-[#80182a]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1f1412]">Ancient Roots</h4>
                <p className="text-xs text-[#624f4b]">Direct lineage craft from Newar and Gandharva masters.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3">
              <div className="w-12 h-12 rounded-xl bg-[#c85a32]/10 text-[#c85a32] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-[#c85a32]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1f1412]">Concert Tuned</h4>
                <p className="text-xs text-[#624f4b]">Acoustically calibrated frequencies and resonance tested.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3">
              <div className="w-12 h-12 rounded-xl bg-[#d4a359]/20 text-[#80182a] flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-[#80182a]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1f1412]">Padded Flight Cases</h4>
                <p className="text-xs text-[#624f4b]">Climate-controlled protective packaging for global delivery.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3">
              <div className="w-12 h-12 rounded-xl bg-[#80182a]/10 text-[#80182a] flex items-center justify-center shrink-0">
                <RefreshCw className="w-6 h-6 text-[#80182a]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1f1412]">Artisan Guarantee</h4>
                <p className="text-xs text-[#624f4b]">Lifetime luthier support and authenticity seal included.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tiles */}
      <CategoryTiles categories={categories} />

      {/* Featured Products */}
      <FeaturedProducts products={products} loading={loading} />

      {/* Provenance Narrative Banner */}
      <section className="py-20 bg-gradient-to-r from-[#580d1b] via-[#80182a] to-[#580d1b] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#d4a359] font-bold">
            The Living Art of Newar & Gandharva Guilds
          </span>
          <h2 className="font-heritage text-3xl sm:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight">
            Every Instrument Carries the Echo of the Himalayas
          </h2>
          <p className="text-sm sm:text-base text-[#f4e5c4]/80 max-w-2xl mx-auto font-light leading-relaxed">
            From the resonant black khari masa circles forged from iron filings and rice paste, to the hollowed wild acacia bodies carved by hand with chisels handed down across four generations.
          </p>
          <div className="pt-4">
            <a
              href="/browse"
              className="inline-block px-8 py-3.5 rounded-full bg-[#d4a359] hover:bg-[#c85a32] text-[#1f1412] hover:text-white font-bold text-sm transition-all shadow-lg"
            >
              Explore the Collection
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
