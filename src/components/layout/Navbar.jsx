import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react'
import { useCart, useAuth } from '@/App'

const navLinks = [
  { label: 'HOME', path: '/' },
  { label: 'PRODUCTS', path: '/products' },
  { label: 'ORDERS', path: '/orders' },
]

export default function Navbar() {
  const location = useLocation()
  const { cart } = useCart()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  return (
    <nav style={{ background: 'rgba(15,20,16,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1e2e1e' }}
      className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Leaf size={22} color="#BAFF39" />
            <span className="font-heading font-bold text-lg" style={{ color: '#F4F7F2', letterSpacing: '-0.02em' }}>
              TERRA<span style={{ color: '#BAFF39' }}>SYNTH</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}
                className="font-heading text-xs tracking-widest transition-colors"
                style={{ color: location.pathname === link.path ? '#BAFF39' : 'rgba(244,247,242,0.55)' }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart + Mobile */}
          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart size={20} color="#F4F7F2" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full font-mono text-[10px] font-bold"
                  style={{ background: '#BAFF39', color: '#0F1410' }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={logout} className="font-heading text-[10px] tracking-widest hidden md:block" style={{ color: '#ef4444', background: 'transparent', border: '1px solid #ef4444', padding: '4px 8px', borderRadius: '2px', cursor: 'pointer' }}>
              LOGOUT
            </button>
            <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
              {open ? <X size={20} color="#F4F7F2" /> : <Menu size={20} color="#F4F7F2" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: '#0F1410', borderTop: '1px solid #1e2e1e' }} className="md:hidden px-4 py-6 flex flex-col gap-5">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setOpen(false)}
              className="font-heading text-sm tracking-widest"
              style={{ color: location.pathname === link.path ? '#BAFF39' : 'rgba(244,247,242,0.6)' }}>
              {link.label}
            </Link>
          ))}
          <button onClick={logout} className="font-heading text-sm tracking-widest text-left mt-4" style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            LOGOUT
          </button>
        </div>
      )}
    </nav>
  )
}
