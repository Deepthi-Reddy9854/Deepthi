import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/App'
import { ArrowLeft, CheckCircle, Banknote } from 'lucide-react'

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, placeOrder } = useCart()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const subtotal = cart.reduce((s, i) => s + i.unit_price * i.quantity, 0)

  if (orderConfirmed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', background: '#0F1410', padding: '2rem' }}>
        <div style={{ width: '64px', height: '64px', background: '#BAFF39', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <CheckCircle size={32} color="#0F1410" />
        </div>
        <h2 className="font-heading font-bold text-2xl" style={{ color: '#F4F7F2' }}>ORDER CONFIRMED</h2>
        <p className="font-body text-center" style={{ color: '#6b7c6b', maxWidth: '400px' }}>
          Thank you for your purchase! Your precision fertilizers are being prepared for shipment.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Link to="/orders" className="font-heading text-xs tracking-widest" style={{ background: '#1e2e1e', color: '#F4F7F2', padding: '0.75rem 1.5rem', borderRadius: '2px', textDecoration: 'none' }}>
            VIEW ORDERS
          </Link>
          <Link to="/products" className="font-heading text-xs tracking-widest" style={{ background: '#BAFF39', color: '#0F1410', padding: '0.75rem 1.5rem', borderRadius: '2px', textDecoration: 'none', fontWeight: 'bold' }}>
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    )
  }

  if (cart.length === 0) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <p className="font-heading" style={{ color: '#4a5e4a' }}>Your cart is empty</p>
      <Link to="/products" style={{ color: '#BAFF39' }}>Browse Products</Link>
    </div>
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!address.trim()) { setError('Please enter a shipping address'); return }
    if (!phone.trim()) { setError('Please enter a phone number'); return }
    if (!name.trim()) { setError('Please enter your full name'); return }
    setSubmitting(true)
    setTimeout(() => {
      placeOrder(address, phone, notes) // Context will store this order
      setOrderConfirmed(true)
      setSubmitting(false)
    }, 800)
  }

  const inputStyle = { width: '100%', background: '#0a120a', border: '1px solid #1e2e1e', color: '#F4F7F2', padding: '0.65rem 0.75rem', borderRadius: '2px', fontFamily: 'Inter', fontSize: '14px', marginTop: '0.5rem' }
  const labelStyle = { display: 'block', fontFamily: "'Space Grotesk'", fontSize: '11px', letterSpacing: '0.1em', color: '#4a5e4a', fontWeight: 700 }

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ background: '#0a120a', borderBottom: '1px solid #1e2e1e', padding: '3rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/cart" className="inline-flex items-center gap-2 font-mono text-xs mb-4" style={{ color: '#4a5e4a', display: 'flex' }}>
            <ArrowLeft size={12} /> BACK TO CART
          </Link>
          <span className="font-mono" style={{ fontSize: '10px', color: '#BAFF39', letterSpacing: '0.15em', display: 'block' }}>FIELD LOGISTICS</span>
          <h1 className="font-heading font-bold uppercase mt-2 text-3xl" style={{ color: '#F4F7F2', letterSpacing: '-0.02em' }}>Checkout</h1>
        </div>
      </div>

      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Summary */}
        <div style={{ border: '1px solid #1e2e1e', borderRadius: '2px', padding: '1.5rem', marginBottom: '2rem', background: '#0a120a' }}>
          <h3 className="font-heading text-xs tracking-widest mb-4" style={{ color: '#4a5e4a' }}>ORDER SUMMARY</h3>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1e2e1e', fontSize: '14px' }}>
              <span style={{ color: '#F4F7F2' }}>{item.product_name} × {item.quantity}</span>
              <span className="font-mono" style={{ color: '#F4F7F2' }}>₹{(item.unit_price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', marginTop: '0.5rem' }}>
            <span className="font-heading text-sm font-semibold" style={{ color: '#F4F7F2' }}>TOTAL</span>
            <span className="font-heading text-lg font-bold" style={{ color: '#BAFF39' }}>₹{subtotal.toLocaleString()}</span>
          </div>
        </div>

        {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '0.75rem', borderRadius: '2px', marginBottom: '1rem', fontSize: '14px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 className="font-heading text-xs tracking-widest" style={{ color: '#4a5e4a' }}>SHIPPING DETAILS</h3>
          <div>
            <label style={labelStyle}>FULL NAME *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>PHONE NUMBER *</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone number" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>SHIPPING ADDRESS *</label>
            <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter your full delivery address"
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} />
          </div>

          <h3 className="font-heading text-xs tracking-widest mt-4" style={{ color: '#4a5e4a' }}>PAYMENT METHOD</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            {['Cash on Delivery', 'PhonePe', 'Google Pay', 'UPI ID'].map((method, idx) => {
              const val = method.toLowerCase().replace(/ /g, '_');
              const isSelected = paymentMethod === val;
              
              let Logo;
              if (val === 'cash_on_delivery') Logo = <Banknote size={28} color={isSelected ? '#BAFF39' : '#6b7c6b'} />;
              if (val === 'phonepe') Logo = <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" style={{ height: '24px' }} />;
              if (val === 'google_pay') Logo = <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" style={{ height: '24px' }} />;
              if (val === 'upi_id') Logo = <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" style={{ height: '24px' }} />;

              return (
                <div 
                  key={idx} 
                  onClick={() => setPaymentMethod(val)}
                  style={{ 
                    border: `1px solid ${isSelected ? '#BAFF39' : '#1e2e1e'}`, 
                    background: isSelected ? 'rgba(186,255,57,0.05)' : '#0a120a', 
                    color: isSelected ? '#BAFF39' : '#F4F7F2',
                    padding: '1.25rem 1rem', 
                    borderRadius: '2px', 
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '32px' }}>
                    {Logo}
                  </div>
                  <span className="font-heading text-xs tracking-widest">{method}</span>
                </div>
              );
            })}
          </div>

          {paymentMethod !== 'cash_on_delivery' && (
            <div>
              <label style={labelStyle}>ENTER YOUR {paymentMethod === 'upi_id' ? 'UPI ID' : paymentMethod === 'phonepe' ? 'PHONEPE NUMBER' : 'GOOGLE PAY NUMBER'} *</label>
              <input type="text" placeholder={`e.g. ${paymentMethod === 'upi_id' ? 'username@upi' : '9876543210'}`} style={inputStyle} />
            </div>
          )}

          <div>
            <label style={labelStyle}>ORDER NOTES</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any special delivery instructions..."
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
          </div>
          <button type="submit" disabled={submitting}
            className="font-heading text-xs tracking-widest inline-flex items-center justify-center gap-2"
            style={{ background: submitting ? '#1e2e1e' : '#BAFF39', color: submitting ? '#BAFF39' : '#0F1410', padding: '0.9rem', borderRadius: '2px', fontWeight: 700, border: 'none', cursor: 'pointer', height: '48px', marginTop: '1rem' }}>
            {submitting ? 'PLACING ORDER...' : <><CheckCircle size={16} /> PLACE ORDER · ₹{subtotal.toLocaleString()}</>}
          </button>
        </form>
      </div>
    </div>
  )
}

