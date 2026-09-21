import React from 'react';
import { Award, Compass, ShieldCheck, Hammer, BookOpen } from 'lucide-react';
import { ARTISAN_STORY } from '../data/artisanStory';

export default function ProvenanceSection({ onExploreCatalog }) {
  const steps = [
    {
      number: "01",
      title: "Wild Timber Seasoning",
      desc: "Logs of wild Saaj, Khayar, and Himalayan Cedar are air-cured for upwards of two decades in natural mountain climates to crystallize sap and stabilize internal acoustic resonance."
    },
    {
      number: "02",
      title: "Hereditary Single-Log Lathing",
      desc: "Each madal barrel and sarangi belly is hollowed by hand from a single solid log—never joined or spliced—ensuring uninterrupted soundwave propagation and organic resonance."
    },
    {
      number: "03",
      title: "Sacred Khari Masa Application",
      desc: "The black tuning compound applied to drum heads is layered manually using iron slag, boiled rice paste, and sacred incense ash, micro-calibrated to pure harmonic pitch."
    },
    {
      number: "04",
      title: "Temple Consecration & Seal",
      desc: "Before dispatch, each master instrument receives an authentic wax-embossed guild medallion and official provenance documentation signed by the master builder."
    }
  ];

  return (
    <section style={{
      backgroundColor: '#f8efe9',
      padding: '5rem 0',
      borderTop: '1px solid rgba(138, 113, 114, 0.15)',
      borderBottom: '1px solid rgba(138, 113, 114, 0.15)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem auto' }}>
          <span className="brass-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>
            Hereditary Guild Lineage
          </span>
          <h2 style={{ fontSize: '36px', color: 'var(--color-primary-dark)', marginBottom: '12px' }}>
            The Art of Newar & Gandharva Lutherie
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--color-on-surface-muted)', lineHeight: 1.7 }}>
            In an era of mass-manufactured acoustics, our instruments are handcrafted with reverent adherence to Vedic and Tantric treatises codified across seven centuries in Patan and Bhaktapur.
          </p>
        </div>

        {/* Master Artisan Spotlight */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid rgba(212, 163, 89, 0.5)',
          boxShadow: 'var(--shadow-md)',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
          marginBottom: '4.5rem'
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '340px', margin: '0 auto' }}>
            <div style={{
              width: '100%',
              paddingBottom: '100%',
              position: 'relative',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '2px solid var(--color-tertiary)'
            }}>
              <img
                src={ARTISAN_STORY.avatar}
                alt={ARTISAN_STORY.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-12px',
              right: '-12px',
              backgroundColor: 'var(--color-primary)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.05em'
            }}>
              Master Curator
            </div>
          </div>

          <div>
            <span className="terracotta-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>
              Master Craftsman Profile
            </span>
            <h3 style={{ fontSize: '26px', color: 'var(--color-primary-dark)', marginBottom: '4px' }}>
              {ARTISAN_STORY.name}
            </h3>
            <div style={{ fontSize: '13px', color: 'var(--color-secondary)', fontWeight: 600, marginBottom: '1rem' }}>
              {ARTISAN_STORY.title} • {ARTISAN_STORY.location}
            </div>

            <blockquote style={{
              fontStyle: 'italic',
              fontSize: '16px',
              lineHeight: 1.6,
              color: 'var(--color-on-surface)',
              borderLeft: '3px solid var(--color-tertiary)',
              paddingLeft: '1rem',
              marginBottom: '1.25rem'
            }}>
              "{ARTISAN_STORY.quote}"
            </blockquote>

            <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-on-surface-muted)', marginBottom: '1.5rem' }}>
              {ARTISAN_STORY.bio}
            </p>

            <button onClick={onExploreCatalog} className="btn-primary" style={{ fontSize: '13px' }}>
              <span>View Guild Catalog</span>
            </button>
          </div>
        </div>

        {/* 4 Lutherie Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem'
        }}>
          {steps.map(step => (
            <div
              key={step.number}
              style={{
                backgroundColor: '#fff',
                padding: '1.75rem',
                borderRadius: '6px',
                border: '1px solid var(--color-outline-variant)',
                position: 'relative'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--color-tertiary)',
                marginBottom: '10px'
              }}>
                {step.number}
              </div>
              <h4 style={{ fontSize: '17px', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
                {step.title}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-muted)', lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
