import React from 'react';
import { Volume2, Award, ChevronRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { soundSampler } from '../utils/soundSampler';

export default function HeroSection({ onExplore, onSelectMasterpiece }) {
  const handlePlayHeroSample = () => {
    soundSampler.playFrequencies([320, 110, 440], 2.2, "percussive");
  };

  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(175deg, #fff8f6 0%, #f7ece6 50%, #f0ded6 100%)',
      padding: '2.5rem 0 3.5rem 0',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(138, 113, 114, 0.15)'
    }}>
      {/* Background Decorative Accent Ring */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '-10%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 163, 89, 0.12) 0%, rgba(200, 90, 50, 0.05) 50%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Editorial Headline & Story */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="brass-badge">UNESCO Kathmandu Valley Lutherie</span>
              <span style={{ fontSize: '11px', color: 'var(--color-secondary)', fontWeight: 600 }}>• Est. 1864</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3.4rem)',
              lineHeight: 1.15,
              fontWeight: 700,
              color: 'var(--color-primary-dark)',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              Where Sacred Timber <br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-secondary)', fontWeight: 500 }}>
                Resonates Eternity.
              </span>
            </h1>

            <p style={{
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'var(--color-on-surface-muted)',
              marginBottom: '1.5rem',
              maxWidth: '520px'
            }}>
              Handcrafted in the royal courtyards of Patan and Bhaktapur. Hewn from slow-cured Himalayan timber and cast with sacred bell alloys for virtuoso acoustics.
            </p>

            {/* CTA Group */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '2rem' }}>
              <button 
                onClick={onExplore}
                className="btn-primary"
                style={{ padding: '0.75rem 1.4rem', fontSize: '14px' }}
              >
                <span>Explore Catalog</span>
                <ChevronRight size={16} />
              </button>

              <button 
                onClick={handlePlayHeroSample}
                className="btn-brass"
                style={{ padding: '0.75rem 1.3rem', fontSize: '13px' }}
              >
                <Volume2 size={16} />
                <span>Hear Concert Madal</span>
              </button>
            </div>

            {/* Provenance Metrics / Trust Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(138, 113, 114, 0.25)'
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  160+
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-on-surface-muted)' }}>Years Heritage</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  25 Yrs
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-on-surface-muted)' }}>Cured Timber</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  100%
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-on-surface-muted)' }}>Authentic Guild</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Card */}
          <div style={{ position: 'relative' }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '6px',
              border: '1px solid rgba(212, 163, 89, 0.5)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80"
                  alt="Patan Master Grade Madal"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(34,26,23,0.1) 0%, rgba(34,26,23,0.75) 100%)'
                }} />

                {/* Floating Seal */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(255, 248, 246, 0.95)',
                  border: '1px solid var(--color-tertiary)',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--color-primary-dark)'
                }}>
                  <Sparkles size={13} style={{ color: 'var(--color-tertiary)' }} />
                  <span>Curator's Pick</span>
                </div>

                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', color: '#fff' }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-tertiary)' }}>
                    Flagship Masterpiece
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '2px' }}>
                    Patan Master Grade Madal
                  </h2>
                  <p style={{ fontSize: '11px', opacity: 0.9 }}>
                    Aged Saaj timber • Concert Pitch G# • Hand-layered Khari
                  </p>
                </div>
              </div>

              {/* Bottom Spotlight Info */}
              <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fdfbf9' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--color-outline)', textTransform: 'uppercase' }}>
                    Bespoke Unit
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', fontWeight: 700, color: 'var(--color-primary)' }}>
                    $320 <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--color-outline)' }}>/ NPR 42,500</span>
                  </div>
                </div>

                <button
                  onClick={onSelectMasterpiece}
                  className="btn-primary"
                  style={{ fontSize: '12px', padding: '0.5rem 1rem' }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
