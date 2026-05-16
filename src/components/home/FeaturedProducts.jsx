import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'

export default function FeaturedProducts({ products }) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12" style={{ borderBottom: '1px solid #1e2e1e', paddingBottom: '1.5rem' }}>
          <div>
            <span className="font-mono" style={{ fontSize: '10px', color: '#BAFF39', letterSpacing: '0.15em' }}>001 / FEATURED</span>
            <h2 className="font-heading font-bold uppercase mt-2 text-2xl md:text-3xl" style={{ color: '#F4F7F2', letterSpacing: '-0.02em' }}>
              Top Formulations
            </h2>
          </div>
          <Link to="/products" className="font-heading text-xs tracking-widest flex items-center gap-1" style={{ color: '#4a5e4a' }}>
            VIEW ALL <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6">
          {products.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
