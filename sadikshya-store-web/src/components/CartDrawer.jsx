import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, Lock, ArrowRight, CheckCircle2, PackageCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'checkout', 'success'
  const [formData, setFormData] = useState({
    name: 'Shrawan Shakya',
    email: 'curator@nepalacoustics.com',
    address: 'Lalitpur Heritage Quarter',
    city: 'Patan',
    country: 'Nepal',
    notes: 'Please include signed wax seal certificate of authenticity.'
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 400 || subtotal === 0 ? 0 : 35;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setCheckoutStep('success');
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // confetti fallback
    }
  };

  const handleDone = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(34, 26, 23, 0.6)',
      backdropFilter: 'blur(4px)'
    }}>
      {/* Background click to close */}
      <div style={{ position: 'absolute', inset: 0 }} onClick={onClose} />

      {/* Slide-in Panel */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        backgroundColor: '#fff8f6',
        height: '100%',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 210,
        borderLeft: '1px solid rgba(212, 163, 89, 0.5)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-outline-variant)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff'
        }}>
          <div>
            <h3 style={{ fontSize: '18px', color: 'var(--color-primary-dark)', margin: 0 }}>
              {checkoutStep === 'cart' && 'Sacred Instrument Cart'}
              {checkoutStep === 'checkout' && 'Secure Acquisition & Shipping'}
              {checkoutStep === 'success' && 'Order Consecrated!'}
            </h3>
            <div style={{ fontSize: '11px', color: 'var(--color-outline)', marginTop: '2px' }}>
              {cartItems.length} curated item{cartItems.length === 1 ? '' : 's'} in reserve
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            style={{ padding: '6px', color: 'var(--color-outline)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {/* STEP 1: CART ITEMS */}
          {checkoutStep === 'cart' && (
            <>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <PackageCheck size={48} style={{ color: 'var(--color-outline)', opacity: 0.6, marginBottom: '1rem' }} />
                  <h4 style={{ fontSize: '16px', color: 'var(--color-on-surface)', marginBottom: '6px' }}>
                    Your Collection is Empty
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-on-surface-muted)', marginBottom: '1.5rem' }}>
                    Explore our master-crafted Madals, Sarangis, and Singing Bowls to begin your acoustic journey.
                  </p>
                  <button onClick={onClose} className="btn-primary" style={{ fontSize: '13px' }}>
                    Explore Catalog
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        backgroundColor: '#fff',
                        borderRadius: '6px',
                        padding: '12px',
                        border: '1px solid var(--color-outline-variant)'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
                      />
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-on-surface)', lineHeight: 1.3 }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-secondary)', fontWeight: 600, margin: '2px 0' }}>
                          {item.timber.split('(')[0]}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                          {/* Quantity Controls */}
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              style={{ padding: '2px 8px', fontSize: '13px', color: 'var(--color-outline)' }}
                            >
                              -
                            </button>
                            <span style={{ fontSize: '12px', fontWeight: 600, padding: '0 8px' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              style={{ padding: '2px 8px', fontSize: '13px', color: 'var(--color-outline)' }}
                            >
                              +
                            </button>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-primary)' }}>
                              ${item.price * item.quantity}
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              style={{ color: '#ba1a1a', padding: '4px' }}
                              aria-label="Remove item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT FORM */}
          {checkoutStep === 'checkout' && (
            <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: 'rgba(212, 163, 89, 0.15)', padding: '10px 14px', borderRadius: '4px', border: '1px solid rgba(212, 163, 89, 0.4)', fontSize: '12px', color: 'var(--color-tertiary-dark)' }}>
                <Lock size={13} style={{ display: 'inline', marginRight: '6px' }} />
                Encrypted Heritage Order Confirmation
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-on-surface)' }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px 10px', marginTop: '4px', borderRadius: '4px', border: '1px solid var(--color-outline-variant)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-on-surface)' }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px 10px', marginTop: '4px', borderRadius: '4px', border: '1px solid var(--color-outline-variant)', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-on-surface)' }}>City / Valley</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px 10px', marginTop: '4px', borderRadius: '4px', border: '1px solid var(--color-outline-variant)', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-on-surface)' }}>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '8px 10px', marginTop: '4px', borderRadius: '4px', border: '1px solid var(--color-outline-variant)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-on-surface)' }}>Delivery Address</label>
                <textarea
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px 10px', marginTop: '4px', borderRadius: '4px', border: '1px solid var(--color-outline-variant)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-on-surface)' }}>Special Luthier Notes</label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '8px 10px', marginTop: '4px', borderRadius: '4px', border: '1px solid var(--color-outline-variant)', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="btn-secondary"
                  style={{ width: '40%', fontSize: '13px', padding: '10px' }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flexGrow: 1, fontSize: '13px', padding: '10px' }}
                >
                  Confirm Order (${total})
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS STATE */}
          {checkoutStep === 'success' && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                color: '#2e7d32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <CheckCircle2 size={36} />
              </div>

              <span className="brass-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>
                Order #SADIKSHYA-8821
              </span>
              <h3 style={{ fontSize: '22px', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
                Acoustic Piece Reserved
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
                Thank you, <strong>{formData.name}</strong>. Master Gyanendra Kul and our Patan atelier have received your acquisition order. A confirmation letter with luthier tuning certificate has been prepared for dispatch to <strong>{formData.city}, {formData.country}</strong>.
              </p>

              <button onClick={handleDone} className="btn-primary" style={{ width: '100%', fontSize: '14px' }}>
                Return to Gallery
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary Bar (Only in Cart Step) */}
        {checkoutStep === 'cart' && cartItems.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--color-outline-variant)',
            backgroundColor: '#fff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-on-surface-muted)', marginBottom: '6px' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600 }}>${subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-on-surface-muted)', marginBottom: '10px' }}>
              <span>Climate-Safe Courier</span>
              <span style={{ fontWeight: 600 }}>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 700, color: 'var(--color-primary-dark)', paddingTop: '8px', borderTop: '1px solid var(--color-outline-variant)', marginBottom: '1.25rem' }}>
              <span>Total</span>
              <span style={{ fontFamily: 'var(--font-serif)' }}>${total}</span>
            </div>

            <button
              onClick={handleProceedCheckout}
              className="btn-primary"
              style={{ width: '100%', fontSize: '14px', padding: '12px' }}
            >
              <span>Proceed to Sacred Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-outline)', marginTop: '10px' }}>
              <ShieldCheck size={14} style={{ color: 'var(--color-secondary)' }} />
              <span>Full Damage Transit Insurance & Authentic Heritage Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
