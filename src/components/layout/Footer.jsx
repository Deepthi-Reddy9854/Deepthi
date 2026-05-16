import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#0F1410', borderTop: '1px solid #1e2e1e' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf size={18} color="#BAFF39" />
              <span className="font-heading font-bold" style={{ color: '#F4F7F2' }}>
                TERRA<span style={{ color: '#BAFF39' }}>SYNTH</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#6b7c6b' }}>
              Precision nutrient solutions for modern agriculture. Maximizing yield through science.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xs tracking-widest mb-4" style={{ color: '#F4F7F2' }}>NAVIGATE</h4>
            {['/', '/products', '/cart', '/orders'].map((p, i) => (
              <Link key={p} to={p} className="block text-sm mb-2 transition-colors hover:text-[#BAFF39]"
                style={{ color: '#6b7c6b' }}>
                {['Home', 'Products', 'Cart', 'Orders'][i]}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="font-heading text-xs tracking-widest mb-4" style={{ color: '#F4F7F2' }}>CATEGORIES</h4>
            {['nitrogen', 'phosphorus', 'potassium', 'organic', 'compound'].map(c => (
              <Link key={c} to={`/products?category=${c}`}
                className="block text-sm mb-2 capitalize transition-colors hover:text-[#BAFF39]"
                style={{ color: '#6b7c6b' }}>
                {c}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e2e1e' }} className="mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs" style={{ color: '#4a5e4a' }}>© 2026 TERRASYNTH. ALL RIGHTS RESERVED.</p>
          <p className="font-mono text-xs" style={{ color: '#4a5e4a' }}>PRECISION AGRICULTURE SOLUTIONS</p>
        </div>
      </div>
    </footer>
  )
}
