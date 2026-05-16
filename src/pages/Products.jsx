import React, { useState, useMemo } from 'react'
import { PRODUCTS } from '@/data/products'
import { Search, X } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'

const CATS = [
  { value: 'all', label: 'ALL' },
  { value: 'nitrogen', label: 'NITROGEN' },
  { value: 'phosphorus', label: 'PHOSPHORUS' },
  { value: 'potassium', label: 'POTASSIUM' },
  { value: 'organic', label: 'ORGANIC' },
  { value: 'compound', label: 'COMPOUND' },
  { value: 'micronutrient', label: 'MICRONUTRIENT' },
  { value: 'liquid', label: 'LIQUID' },
]

export default function Products() {
  const urlCat = new URLSearchParams(window.location.search).get('category') || 'all'
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(urlCat)

  const filtered = useMemo(() =>
    PRODUCTS.filter(p => {
      const mc = category === 'all' || p.category === category
      const ms = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.npk_ratio?.includes(search)
      return mc && ms
    }),
    [search, category]
  )

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#0a120a', borderBottom: '1px solid #1e2e1e', padding: '3rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-mono" style={{ fontSize: '10px', color: '#BAFF39', letterSpacing: '0.15em' }}>NUTRIENT MATRIX</span>
          <h1 className="font-heading font-bold uppercase mt-2 text-3xl md:text-4xl" style={{ color: '#F4F7F2', letterSpacing: '-0.02em' }}>
            All Products
          </h1>
          <p className="mt-2 max-w-lg" style={{ color: '#6b7c6b' }}>Browse our complete range of precision nutrient formulations.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#4a5e4a' }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products or NPK ratio..."
            style={{ width: '100%', background: '#141e14', border: '1px solid #1e2e1e', color: '#F4F7F2', padding: '0.6rem 2.5rem', borderRadius: '2px', fontFamily: 'Inter', fontSize: '14px' }} />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={14} style={{ color: '#4a5e4a' }} /></button>}
        </div>

        {/* Category pills */}
        <div className="flex gap-1 overflow-x-auto pb-4 mb-6" style={{ borderBottom: '1px solid #1e2e1e' }}>
          {CATS.map(c => (
            <button key={c.value} onClick={() => setCategory(c.value)}
              className="font-heading text-[11px] tracking-widest px-4 py-2 whitespace-nowrap transition-colors"
              style={{ background: category === c.value ? '#BAFF39' : 'transparent', color: category === c.value ? '#0F1410' : '#4a5e4a', borderRadius: '2px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              {c.label}
            </button>
          ))}
        </div>

        <p className="font-mono text-xs mb-6" style={{ color: '#4a5e4a' }}>{filtered.length} RESULTS</p>

        {filtered.length === 0
          ? <div className="text-center py-20">
              <p className="font-heading" style={{ color: '#4a5e4a' }}>No products found</p>
              <button onClick={() => { setSearch(''); setCategory('all') }}
                className="font-heading text-xs tracking-wider mt-4 px-6 py-2"
                style={{ border: '1px solid #1e2e1e', color: '#F4F7F2', borderRadius: '2px', cursor: 'pointer', background: 'transparent' }}>
                CLEAR FILTERS
              </button>
            </div>
          : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
        }
      </div>
    </div>
  )
}
