import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/products';
import { SlidersHorizontal, ArrowUpDown, Music, CheckCircle2, Filter } from 'lucide-react';

export default function CatalogView({ products, searchQuery, onSelectProduct, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All Instruments");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedWood, setSelectedWood] = useState("all");
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const woodTypes = ["all", "Saaj", "Khayar", "Bamboo", "Mango", "Bronze Alloy"];

  // Filter products
  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === "All Instruments" || item.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.timber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWood = selectedWood === "all" || item.timber.toLowerCase().includes(selectedWood.toLowerCase());

    return matchesCategory && matchesSearch && matchesWood;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // featured default
  });

  return (
    <section style={{ padding: '2rem 0 4rem 0', minHeight: '80vh' }} className="catalog-section">
      <div className="container">
        {/* Catalog Header */}
        <div style={{ marginBottom: '1.5rem', textAlign: 'center', maxWidth: '720px', margin: '0 auto 1.5rem auto' }}>
          <span className="brass-badge" style={{ marginBottom: '6px', display: 'inline-block' }}>
            Acoustic Treasury
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', color: 'var(--color-primary-dark)', marginBottom: '6px' }}>
            Master-Crafted Instruments
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-muted)', lineHeight: 1.5, padding: '0 0.5rem' }}>
            Individually tuned, seasoned with sacred minerals, and hallmarked by hereditary master luthiers of Patan and Bhaktapur.
          </p>
        </div>

        {/* Horizontal Category Scroll Bar (Mobile Native Touch Scroll) */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '10px',
          marginBottom: '1rem',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }} className="category-scroll-strip">
          {CATEGORIES.map(cat => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 14px',
                  fontSize: '13px',
                  fontWeight: active ? 600 : 500,
                  borderRadius: '4px',
                  backgroundColor: active ? 'var(--color-primary)' : '#fff',
                  color: active ? '#fff' : 'var(--color-on-surface)',
                  border: `1px solid ${active ? 'var(--color-primary)' : 'var(--color-outline-variant)'}`,
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filter Controls Bar (Mobile Optimized) */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid var(--color-outline-variant)',
          borderRadius: '6px',
          padding: '10px 14px',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {/* Wood quick pill filters or mobile drawer button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }} className="desktop-wood-filters">
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-outline)' }}>
              Material:
            </span>
            {woodTypes.map(wood => (
              <button
                key={wood}
                onClick={() => setSelectedWood(wood)}
                style={{
                  fontSize: '11px',
                  textTransform: 'capitalize',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  backgroundColor: selectedWood === wood ? 'var(--color-secondary)' : 'transparent',
                  color: selectedWood === wood ? '#fff' : 'var(--color-on-surface-muted)',
                  border: `1px solid ${selectedWood === wood ? 'var(--color-secondary)' : 'var(--color-outline-variant)'}`
                }}
              >
                {wood === 'all' ? 'All' : wood}
              </button>
            ))}
          </div>

          {/* Sort Select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
            <ArrowUpDown size={14} style={{ color: 'var(--color-outline)', flexShrink: 0 }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort instruments"
              style={{
                padding: '6px 8px',
                borderRadius: '4px',
                border: '1px solid var(--color-outline-variant)',
                fontSize: '12px',
                backgroundColor: '#fff',
                color: 'var(--color-on-surface)',
                outline: 'none'
              }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Results Count & Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '6px', fontSize: '12px' }}>
          <div style={{ color: 'var(--color-on-surface-muted)' }}>
            Showing <strong>{filteredProducts.length}</strong> instruments
            {searchQuery && <span> for "<strong>{searchQuery}</strong>"</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-secondary)' }}>
            <CheckCircle2 size={14} />
            <span>Tuning Certificate & Hard Case Included</span>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            backgroundColor: '#fff',
            borderRadius: '6px',
            border: '1px dashed var(--color-outline)'
          }}>
            <Music size={36} style={{ color: 'var(--color-outline)', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '16px', color: 'var(--color-on-surface)', marginBottom: '4px' }}>
              No Instruments Match Your Criteria
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-on-surface-muted)', marginBottom: '1.25rem' }}>
              Try selecting another category or timber filter.
            </p>
            <button
              onClick={() => { setSelectedCategory("All Instruments"); setSelectedWood("all"); }}
              className="btn-primary"
              style={{ fontSize: '12px', padding: '8px 16px' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .category-scroll-strip::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 600px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .desktop-wood-filters {
            width: 100%;
            overflow-x: auto;
            white-space: nowrap;
            padding-bottom: 4px;
          }
        }
      `}</style>
    </section>
  );
}
