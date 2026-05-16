import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const items = [
  { title: 'SOIL NUTRITION', desc: 'Base amendments for healthy substrate', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80', link: '/products?category=organic' },
  { title: 'CROP SPECIFIC', desc: 'Targeted formulas for maximum yield', img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80', link: '/products?category=compound' },
]

export default function CategoryBanner() {
  return (
    <section className="py-16 md:py-24" style={{ background: '#0a120a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12" style={{ borderBottom: '1px solid #1e2e1e', paddingBottom: '1.5rem' }}>
          <span className="font-mono" style={{ fontSize: '10px', color: '#BAFF39', letterSpacing: '0.15em' }}>002 / SOLUTIONS</span>
          <h2 className="font-heading font-bold uppercase mt-2 text-2xl md:text-3xl" style={{ color: '#F4F7F2', letterSpacing: '-0.02em' }}>
            By Application
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <Link key={item.title} to={item.link}
              className="group relative block overflow-hidden"
              style={{ aspectRatio: '16/9', borderRadius: '2px' }}>
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0F1410 0%, rgba(15,20,16,0.3) 60%, transparent)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                <span className="font-mono" style={{ fontSize: '10px', color: '#BAFF39', letterSpacing: '0.15em' }}>0{i + 1}</span>
                <h3 className="font-heading font-bold text-xl md:text-2xl mt-1" style={{ color: '#F4F7F2' }}>{item.title}</h3>
                <p className="text-sm mt-1" style={{ color: '#6b7c6b' }}>{item.desc}</p>
                <div className="flex items-center gap-2 mt-3 font-heading text-xs tracking-widest" style={{ color: '#BAFF39' }}>
                  EXPLORE <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
