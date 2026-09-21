import React, { useState } from 'react';
import { Volume2, ShoppingBag, ShieldCheck, ArrowLeft, Star, Check, Award, Truck, Radio } from 'lucide-react';
import { soundSampler } from '../utils/soundSampler';

export default function ProductDetailView({ product, onBack, onAddToCart }) {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [isPlaying, setIsPlaying] = useState(false);
  const [added, setAdded] = useState(false);

  const handlePlayAudio = () => {
    setIsPlaying(true);
    let type = "percussive";
    if (product.category === "Acoustics") type = "singing_bowl";
    if (product.category === "Wind") type = "wind";

    soundSampler.playFrequencies(product.soundSampleFrequency, 2.5, type);
    setTimeout(() => {
      setIsPlaying(false);
    }, 2500);
  };

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section style={{ padding: '1.25rem 0 3.5rem 0', minHeight: '85vh' }}>
      <div className="container">
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: 'var(--color-primary)',
            fontWeight: 600,
            marginBottom: '1rem',
            padding: '4px 0'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Instruments</span>
        </button>

        {/* Main Product Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Gallery & Audio Player Strip */}
          <div>
            {/* Main Stage Image */}
            <div style={{
              backgroundColor: '#fff',
              border: '1px solid var(--color-outline-variant)',
              borderRadius: '6px',
              overflow: 'hidden',
              height: '320px',
              position: 'relative',
              boxShadow: 'var(--shadow-sm)'
            }} className="product-detail-img-box">
              <img
                src={selectedImage}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Top Provenance Badge */}
              <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                <span className="crimson-badge">{product.badge}</span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.gallery && product.gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      border: selectedImage === img ? '2px solid var(--color-primary)' : '1px solid var(--color-outline-variant)',
                      padding: 0,
                      opacity: selectedImage === img ? 1 : 0.7
                    }}
                  >
                    <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Interactive Acoustic Audio Strip Component */}
            <div style={{
              marginTop: '1.25rem',
              backgroundColor: '#fff',
              border: '1px solid rgba(212, 163, 89, 0.6)',
              borderRadius: '6px',
              padding: '1rem',
              boxShadow: 'var(--shadow-brass)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Radio size={16} style={{ color: 'var(--color-secondary)' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary-dark)', textTransform: 'uppercase' }}>
                    Studio Acoustic Playback
                  </span>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--color-outline)', fontWeight: 600 }}>
                  432Hz Chamber
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={handlePlayAudio}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: isPlaying ? 'var(--color-secondary)' : 'var(--color-primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 3px 8px rgba(128, 24, 42, 0.25)',
                    flexShrink: 0
                  }}
                  aria-label="Play acoustic tone"
                >
                  <Volume2 size={18} className={isPlaying ? 'wave-pulse' : ''} />
                </button>

                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  {/* Waveform simulator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '24px' }}>
                    {[10, 20, 15, 24, 12, 18, 14, 22, 26, 18, 12, 20, 15, 8, 20, 24, 16, 10, 18, 12].map((h, i) => (
                      <span
                        key={i}
                        style={{
                          flexGrow: 1,
                          height: isPlaying ? `${Math.max(6, (h + (i % 3) * 5))}px` : `${h}px`,
                          backgroundColor: isPlaying ? 'var(--color-secondary)' : 'var(--color-outline-variant)',
                          borderRadius: '2px',
                          transition: 'height 0.2s ease, background-color 0.2s ease'
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-on-surface-muted)', marginTop: '3px' }}>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.frequencyRange}</span>
                    <span style={{ whiteSpace: 'nowrap' }}>{isPlaying ? 'Resonating...' : 'Click to test tone'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Purchase */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Badges */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="brass-badge">{product.category}</span>
              <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>•</span>
              <span style={{ fontSize: '11px', color: 'var(--color-secondary)', fontWeight: 600 }}>
                {product.origin}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h1 style={{ fontSize: 'clamp(22px, 5vw, 30px)', color: 'var(--color-primary-dark)', lineHeight: 1.2, marginBottom: '4px' }}>
                {product.title}
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-muted)', fontStyle: 'italic' }}>
                {product.subtitle}
              </p>
            </div>

            {/* Rating Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-outline-variant)' }}>
              <div style={{ display: 'flex', color: 'var(--color-tertiary)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="var(--color-tertiary)" stroke="var(--color-tertiary)" />
                ))}
              </div>
              <span style={{ fontWeight: 700, fontSize: '12px' }}>{product.rating}</span>
              <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>({product.reviewsCount} reviews)</span>
            </div>

            {/* Price Box */}
            <div style={{
              backgroundColor: '#fff',
              border: '1px solid var(--color-outline-variant)',
              borderRadius: '6px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-outline)' }}>
                  Luthier Direct Price
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  ${product.price}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Local Currency</span>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-on-surface)' }}>
                  {product.localPrice}
                </div>
              </div>
            </div>

            {/* Add to Cart / Buy Button */}
            <button
              onClick={handleAdd}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '14px' }}
            >
              {added ? <Check size={18} /> : <ShoppingBag size={18} />}
              <span>{added ? 'Added to Sacred Collection!' : 'Acquire Instrument'}</span>
            </button>

            {/* Description */}
            <div>
              <h3 style={{ fontSize: '15px', color: 'var(--color-primary)', marginBottom: '6px' }}>
                Luthier Description
              </h3>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-on-surface-muted)' }}>
                {product.description}
              </p>
            </div>

            {/* Technical Specification Table */}
            <div style={{
              backgroundColor: '#fff',
              border: '1px solid var(--color-outline-variant)',
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
              <div style={{
                backgroundColor: 'var(--color-surface-low)',
                padding: '8px 12px',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--color-primary-dark)',
                borderBottom: '1px solid var(--color-outline-variant)'
              }}>
                Acoustic & Material Specifications
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
                    <td style={{ padding: '8px 12px', color: 'var(--color-outline)', width: '38%' }}>Timber</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{product.timber}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
                    <td style={{ padding: '8px 12px', color: 'var(--color-outline)' }}>Membrane</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{product.membrane}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
                    <td style={{ padding: '8px 12px', color: 'var(--color-outline)' }}>Dimensions</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{product.dimensions}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
                    <td style={{ padding: '8px 12px', color: 'var(--color-outline)' }}>Weight</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{product.weight}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 12px', color: 'var(--color-outline)' }}>Artisan</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--color-secondary)' }}>{product.artisan}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Authenticity Guarantee Card */}
            <div style={{
              backgroundColor: 'rgba(212, 163, 89, 0.12)',
              border: '1px solid rgba(212, 163, 89, 0.5)',
              borderRadius: '6px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Award size={26} style={{ color: 'var(--color-tertiary-dark)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-tertiary-dark)' }}>
                  {product.provenanceSeal}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-on-surface-muted)' }}>
                  Certificate with wax seal and luthier signature included.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .product-detail-img-box {
            height: 250px !important;
          }
        }
      `}</style>
    </section>
  );
}
