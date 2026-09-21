import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import { Award, ArrowRight } from 'lucide-react';

export default function FeaturedProducts({ products = [], loading = false }) {
  if (loading) {
    return (
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-80 bg-gray-200 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      </section>
    );
  }

  const displayList = products.slice(0, 8);

  return (
    <section className="py-16 bg-[#f9ede7]/50 border-y border-[#d4a359]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c85a32]/10 text-[#c85a32] text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Artisan Masterworks</span>
            </div>
            <h2 className="font-heritage text-3xl font-bold text-[#80182a]">
              Featured Instruments
            </h2>
            <p className="mt-1 text-sm text-[#624f4b]">
              Concert-tested instruments inspected for tonal resonance, wood density, and tuning accuracy.
            </p>
          </div>

          <Link
            to="/browse"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#80182a] hover:text-[#c85a32] transition-colors"
          >
            <span>View Complete Inventory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {displayList.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#d4a359]/30">
            <p className="text-sm text-[#624f4b]">No featured instruments available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayList.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
