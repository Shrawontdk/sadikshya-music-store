import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Music, ShieldCheck } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, cartCount, openCart, onSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Instruments Catalog' },
    { id: 'masterpiece', label: 'Master Grade Madal' },
    { id: 'provenance', label: 'Luthier Provenance' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255, 248, 246, 0.96)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(138, 113, 114, 0.2)'
    }}>
      {/* Top Notice Banner */}
      <div style={{
        backgroundColor: 'var(--color-primary)',
        color: '#fff',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.03em',
        padding: '5px 0.75rem',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        lineHeight: 1.3
      }}>
        <ShieldCheck size={13} style={{ color: 'var(--color-tertiary)', flexShrink: 0 }} />
        <span>Authentic Kathmandu Valley Luthier Provenance • Insured Worldwide Shipping</span>
      </div>

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-tertiary)',
            border: '1px solid var(--color-tertiary)',
            flexShrink: 0
          }}>
            <Music size={20} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              color: 'var(--color-primary-dark)',
              lineHeight: 1.1,
              whiteSpace: 'nowrap'
            }}>
              SADIKSHYA
            </div>
            <div style={{
              fontSize: '9px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-secondary)',
              fontWeight: 700,
              whiteSpace: 'nowrap'
            }}>
              Master Luthiers
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-muted)',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'color 0.2s'
                }}
              >
                {link.label}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--color-secondary)'
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Desktop Search */}
          <div className="search-bar-wrap-desktop" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--color-outline)' }} />
            <input
              type="text"
              placeholder="Search instruments..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                padding: '7px 12px 7px 34px',
                fontSize: '13px',
                borderRadius: '4px',
                border: '1px solid var(--color-outline-variant)',
                backgroundColor: '#fff',
                width: '180px',
                color: 'var(--color-on-surface)',
                outline: 'none'
              }}
            />
          </div>

          {/* Mobile Search Icon Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="mobile-search-toggle"
            aria-label="Toggle search"
            style={{
              display: 'none',
              padding: '7px',
              borderRadius: '4px',
              border: '1px solid var(--color-outline-variant)',
              backgroundColor: searchOpen ? 'var(--color-surface-low)' : '#fff',
              color: 'var(--color-primary)'
            }}
          >
            <Search size={18} />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            aria-label="Open Cart"
            style={{
              position: 'relative',
              padding: '7px 12px',
              backgroundColor: 'var(--color-surface-low)',
              border: '1px solid var(--color-outline-variant)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-primary-dark)',
              fontWeight: 600,
              fontSize: '13px',
              flexShrink: 0
            }}
          >
            <ShoppingBag size={17} />
            <span className="cart-text">Cart</span>
            {cartCount > 0 && (
              <span style={{
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
                borderRadius: '9999px',
                fontSize: '10px',
                fontWeight: 700,
                padding: '1px 5px',
                minWidth: '16px',
                textAlign: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            style={{
              padding: '7px',
              borderRadius: '4px',
              border: '1px solid var(--color-outline-variant)',
              backgroundColor: mobileMenuOpen ? 'var(--color-surface-low)' : '#fff',
              color: 'var(--color-primary-dark)',
              display: 'none',
              flexShrink: 0
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown Bar */}
      {searchOpen && (
        <div style={{
          padding: '8px 1rem',
          backgroundColor: '#fff',
          borderBottom: '1px solid var(--color-outline-variant)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }} className="mobile-search-bar">
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
            <input
              type="text"
              placeholder="Search Madal, Sarangi, Timber..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              style={{
                width: '100%',
                padding: '7px 10px 7px 32px',
                fontSize: '13px',
                borderRadius: '4px',
                border: '1px solid var(--color-outline-variant)',
                outline: 'none',
                backgroundColor: 'var(--color-surface)'
              }}
            />
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            style={{ fontSize: '12px', color: 'var(--color-outline)', padding: '6px' }}
          >
            Done
          </button>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#fff8f6',
          borderBottom: '1px solid var(--color-outline-variant)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          boxShadow: 'var(--shadow-md)'
        }}>
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: activeTab === link.id ? 700 : 500,
                color: activeTab === link.id ? 'var(--color-primary)' : 'var(--color-on-surface)',
                padding: '10px 12px',
                borderRadius: '4px',
                backgroundColor: activeTab === link.id ? 'var(--color-surface-low)' : 'transparent',
                borderLeft: activeTab === link.id ? '3px solid var(--color-primary)' : '3px solid transparent'
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <div className="nepali-border-divider" />

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .search-bar-wrap-desktop { display: none !important; }
          .mobile-search-toggle { display: flex !important; }
          .mobile-menu-btn { display: flex !important; }
          .cart-text { display: none; }
        }
      `}</style>
    </header>
  );
}
