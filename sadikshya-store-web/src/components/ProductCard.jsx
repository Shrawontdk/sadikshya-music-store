import React, { useState } from 'react';
import { Volume2, ShoppingBag, Eye, Star, Award, Check } from 'lucide-react';
import { soundSampler } from '../utils/soundSampler';

export default function ProductCard({ product, onSelectProduct, onAddToCart }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const handlePlaySound = (e) => {
    e.stopPropagation();
    setIsPlaying(true);
    let type = "percussive";
    if (product.category === "Acoustics") type = "singing_bowl";
    if (product.category === "Wind") type = "wind";

    soundSampler.playFrequencies(product.soundSampleFrequency, 1.8, type);
    setTimeout(() => {
      setIsPlaying(false);
    }, 1800);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  return (
    <div 
      onClick={() => onSelectProduct(product)}
      style={{
        backgroundColor: '#fff',
        border: '1px solid var(--color-outline-variant)',
        borderRadius: '6px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: 'var(--shadow-sm)'
      }}
      className="product-card"
    >
      {/* Image Container with Badges */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '210px',
        backgroundColor: '#f6ece6',
        overflow: 'hidden'
      }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="product-img"
        />

        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <span className="crimson-badge">{product.badge}</span>
        </div>

        {/* Origin Seal */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          backgroundColor: 'rgba(255, 248, 246, 0.92)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(212, 163, 89, 0.6)',
          borderRadius: '4px',
          padding: '2px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--color-tertiary-dark)'
        }}>
          <Award size={13} style={{ color: 'var(--color-tertiary)' }} />
          <span>{product.origin.split(',')[0]}</span>
        </div>

        {/* Quick Audio Sampler Button */}
        <button
          onClick={handlePlaySound}
          title="Play Acoustic Sample"
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            backgroundColor: isPlaying ? 'var(--color-primary)' : 'rgba(38, 30, 27, 0.88)',
            color: '#fff',
            borderRadius: '9999px',
            padding: '5px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11px',
            fontWeight: 600,
            border: '1px solid var(--color-tertiary)',
            backdropFilter: 'blur(6px)',
            transition: 'all 0.2s ease',
            boxShadow: isPlaying ? '0 0 12px rgba(128, 24, 42, 0.6)' : 'none'
          }}
        >
          <Volume2 size={13} className={isPlaying ? 'pulse-icon' : ''} />
          <span>{isPlaying ? 'Resonating...' : 'Listen Sample'}</span>
        </button>
      </div>

      {/* Card Content */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-secondary)', fontWeight: 700 }}>
            {product.category}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', color: '#8a6500', fontWeight: 600 }}>
            <Star size={12} fill="#d4a359" stroke="#d4a359" />
            <span>{product.rating}</span>
            <span style={{ color: 'var(--color-outline)', fontWeight: 400 }}>({product.reviewsCount})</span>
          </div>
        </div>

        <h3 style={{
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: 1.3,
          marginBottom: '4px',
          color: 'var(--color-on-surface)'
        }}>
          {product.title}
        </h3>

        <p style={{
          fontSize: '12px',
          color: 'var(--color-on-surface-muted)',
          lineHeight: 1.4,
          marginBottom: '10px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.subtitle}
        </p>

        {/* Spec Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
          <span className="terracotta-badge">{product.timber.split('(')[0]}</span>
          <span style={{
            fontSize: '10px',
            backgroundColor: 'var(--color-surface-low)',
            color: 'var(--color-outline)',
            padding: '2px 6px',
            borderRadius: '4px',
            border: '1px solid var(--color-outline-variant)'
          }}>
            {product.frequencyRange}
          </span>
        </div>

        {/* Bottom Pricing & Actions */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '10px',
          borderTop: '1px solid var(--color-outline-variant)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
              ${product.price}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--color-outline)' }}>
              {product.localPrice}
            </div>
          </div>

          <button
            onClick={handleAdd}
            style={{
              backgroundColor: addedAnim ? '#2e7d32' : 'var(--color-primary)',
              color: '#fff',
              borderRadius: '4px',
              padding: '7px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '12px',
              fontWeight: 600,
              boxShadow: '0 2px 5px rgba(128, 24, 42, 0.2)'
            }}
          >
            {addedAnim ? <Check size={14} /> : <ShoppingBag size={14} />}
            <span>{addedAnim ? 'Added!' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: rgba(212, 163, 89, 0.6);
        }
        .product-card:hover .product-img {
          transform: scale(1.04);
        }
        .pulse-icon {
          animation: pulseAnim 1s infinite alternate;
        }
        @keyframes pulseAnim {
          from { transform: scale(1); }
          to { transform: scale(1.25); color: #ffdada; }
        }
      `}</style>
    </div>
  );
}
