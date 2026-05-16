import React from 'react'
import { Link } from 'react-router-dom'

const stockConfig = {
  available: { label: '[+] AVAILABLE', color: '#BAFF39' },
  low_stock:  { label: '[!] LOW STOCK',  color: '#f59e0b' },
  depleted:   { label: '[x] DEPLETED',   color: '#ef4444' },
}

export default function ProductCard({ product, index = 0 }) {
  const stock = stockConfig[product.stock_status] || stockConfig.available

  return (
    <div style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
      <Link to={`/products/${product.id}`}
        className="group block"
        style={{ borderBottom: '1px solid #1e2e1e', paddingBottom: '24px', marginBottom: '24px' }}>
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '1', background: '#141e14', borderRadius: '2px', marginBottom: '12px' }}>
          {product.image_url
            ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            : <div className="w-full h-full flex items-center justify-center">
                <span className="font-heading text-4xl" style={{ color: 'rgba(244,247,242,0.07)' }}>N-P-K</span>
              </div>
          }

          {/* NPK hover overlay */}
          {product.npk_ratio && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'rgba(15,20,16,0.7)', backdropFilter: 'blur(4px)' }}>
              <span className="font-heading font-bold" style={{ fontSize: '2.5rem', color: 'rgba(186,255,57,0.85)', letterSpacing: '-0.04em' }}>
                {product.npk_ratio}
              </span>
            </div>
          )}

          {/* Batch */}
          {product.batch_number && (
            <span className="absolute bottom-2 right-2 font-mono" style={{ fontSize: '10px', color: 'rgba(244,247,242,0.3)' }}>
              BTH/{product.batch_number}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-sm font-semibold uppercase" style={{ color: '#F4F7F2', letterSpacing: '0.03em' }}>
              {product.name}
            </h3>
            <span className="font-heading text-sm font-bold whitespace-nowrap" style={{ color: '#BAFF39' }}>
              ₹{product.price?.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono uppercase" style={{ fontSize: '10px', color: '#4a5e4a' }}>
              {product.category} · {product.unit?.replace(/_/g, ' ')}
            </span>
            <span className="font-mono" style={{ fontSize: '10px', color: stock.color }}>
              {stock.label}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
