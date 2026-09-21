import React from 'react';
import { Music, ShieldCheck, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer({ onNavClick }) {
  return (
    <footer style={{
      backgroundColor: '#261e1b',
      color: '#fdede8',
      padding: '4.5rem 0 2rem 0',
      borderTop: '3px solid var(--color-primary)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '4px',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-tertiary)',
                border: '1px solid var(--color-tertiary)'
              }}>
                <Music size={20} />
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#fff' }}>
                SADIKSHYA
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#c9b8b5', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Preserving and commissioning master-grade traditional Nepali acoustic instruments directly from hereditary luthier workshops of Patan, Bhaktapur, and Pokhara.
            </p>
            <div style={{ fontSize: '12px', color: 'var(--color-tertiary)' }}>
              ✦ UNESCO World Heritage Living Traditions
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-tertiary)', marginBottom: '1.25rem' }}>
              Sacred Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li>
                <button onClick={() => onNavClick('catalog')} style={{ color: '#c9b8b5', textAlign: 'left' }}>
                  Concert Madals (Patan & Dhankuta)
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('catalog')} style={{ color: '#c9b8b5', textAlign: 'left' }}>
                  Gandharva Soloist Sarangi
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('catalog')} style={{ color: '#c9b8b5', textAlign: 'left' }}>
                  7-Metal Hand-Beaten Singing Bowls
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('catalog')} style={{ color: '#c9b8b5', textAlign: 'left' }}>
                  Himalayan Cedar Tungna Lutes
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('catalog')} style={{ color: '#c9b8b5', textAlign: 'left' }}>
                  Assam Hill Bamboo Bansuris
                </button>
              </li>
            </ul>
          </div>

          {/* Guild Heritage */}
          <div>
            <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-tertiary)', marginBottom: '1.25rem' }}>
              Artisan Guild
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#c9b8b5' }}>
              <li>
                <button onClick={() => onNavClick('provenance')} style={{ color: '#c9b8b5', textAlign: 'left' }}>
                  Timber Aging & Khari Formulation
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('masterpiece')} style={{ color: '#c9b8b5', textAlign: 'left' }}>
                  Flagship Master Madal
                </button>
              </li>
              <li>Hereditary Luthier Registry</li>
              <li>Custom Concert Pitch Commissioning</li>
              <li>Worldwide Museum Packaging</li>
            </ul>
          </div>

          {/* Atelier Contact & Hours */}
          <div>
            <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-tertiary)', marginBottom: '1.25rem' }}>
              Patan Atelier
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#c9b8b5' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={16} style={{ color: 'var(--color-secondary)', flexShrink: 0, marginTop: '2px' }} />
                <span>Kwalkhu Tole, Royal Square, Patan (Lalitpur), Kathmandu Valley, Nepal</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Phone size={16} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                <span>+977 1 552 8840 / +977 984 100 2341</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Mail size={16} style={{ color: 'var(--color-secondary)', flexShrink: 0 }} />
                <span>curator@sadikshyamusic.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '12px',
          color: '#a38f8b'
        }}>
          <div>
            © {new Date().getFullYear()} Sadikshya Music Store. Handcrafted with reverence for Himalayan acoustic traditions.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Made with devotion for Nepali arts & luthiers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
