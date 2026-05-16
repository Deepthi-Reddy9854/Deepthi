import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '@/App'
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react'

export default function Cart() {
  const { cart, updateQty, removeItem } = useCart()
  const subtotal = cart.reduce((s, i) => s + i.unit_price * i.quantity, 0)

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ background: '#0a120a', borderBottom: '1px solid #1e2e1e', padding: '3rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-mono" style={{ fontSize: '10px', color: '#BAFF39', letterSpacing: '0.15em' }}>FIELD LOGISTICS</span>
          <h1 className="font-heading font-bold uppercase mt-2 text-3xl md:text-4xl" style={{ color: '#F4F7F2', letterSpacing: '-0.02em' }}>Your Cart</h1>
        </div>
      </div>

      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '2rem 1rem' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <ShoppingCart size={48} style={{ margin: '0 auto 1rem', color: 'rgba(244,247,242,0.1)' }} />
            <p className="font-heading" style={{ color: '#4a5e4a', marginBottom: '1.5rem' }}>Your cart is empty</p>
            <Link to="/products" className="font-heading text-xs tracking-widest inline-flex items-center gap-2"
              style={{ background: '#BAFF39', color: '#0F1410', padding: '0.75rem 1.5rem', borderRadius: '2px', fontWeight: 700 }}>
              BROWSE PRODUCTS <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 py-5" style={{ borderBottom: '1px solid #1e2e1e' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '2px', overflow: 'hidden', background: '#0a120a', flexShrink: 0 }}>
                  {item.image_url ? <img src={item.image_url} alt={item.product_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="font-heading text-sm font-semibold uppercase" style={{ color: '#F4F7F2' }}>{item.product_name}</p>
                  <p className="font-mono text-xs mt-1" style={{ color: '#4a5e4a' }}>₹{item.unit_price?.toLocaleString()} each</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #1e2e1e', borderRadius: '2px' }}>
                  <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#F4F7F2' }}><Minus size={12} /></button>
                  <span className="font-mono text-sm" style={{ padding: '0 0.75rem', color: '#F4F7F2' }}>{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#F4F7F2' }}><Plus size={12} /></button>
                </div>
                <span className="font-heading text-sm font-bold" style={{ color: '#F4F7F2', minWidth: '5rem', textAlign: 'right' }}>
                  ₹{(item.unit_price * item.quantity).toLocaleString()}
                </span>
                <button onClick={() => removeItem(item.id)} style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#4a5e4a' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <div style={{ border: '1px solid #1e2e1e', borderRadius: '2px', padding: '1.5rem', marginTop: '2rem', background: '#0a120a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="font-heading text-xs tracking-widest" style={{ color: '#4a5e4a' }}>SUBTOTAL</span>
                <span className="font-heading text-xl font-bold" style={{ color: '#F4F7F2' }}>₹{subtotal.toLocaleString()}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#4a5e4a', marginBottom: '1.5rem' }}>Shipping calculated at checkout</p>
              <Link to="/checkout" className="font-heading text-xs tracking-widest flex items-center justify-center gap-2"
                style={{ background: '#BAFF39', color: '#0F1410', padding: '0.75rem', borderRadius: '2px', fontWeight: 700, height: '48px' }}>
                PROCEED TO CHECKOUT <ArrowRight size={14} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

