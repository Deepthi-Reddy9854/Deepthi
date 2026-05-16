import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const HERO_IMG = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80'

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#0F1410' }}>
      {/* BG Image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={HERO_IMG} alt="Aerial crop field" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0F1410 30%, rgba(15,20,16,0.6) 70%, transparent)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem 5rem', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '2rem', alignItems: 'flex-end' }}
          className="lg:grid-cols-5">

          {/* Left */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs tracking-widest" style={{ color: '#BAFF39' }}>
              PRECISION AGRICULTURE · EST. 2026
            </span>
            <h1 className="font-heading font-bold uppercase mt-4" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)', lineHeight: 0.95, letterSpacing: '-0.03em', color: '#F4F7F2' }}>
              Feed the<br />
              <span style={{ color: '#BAFF39' }}>Earth.</span><br />
              Grow the<br />
              <span style={{ color: '#BAFF39' }}>Future.</span>
            </h1>
            <p style={{ color: '#6b7c6b', marginTop: '1.5rem', maxWidth: '480px', lineHeight: 1.7 }}>
              Premium fertilizers engineered for maximum yield. Scientific formulations trusted by growers across the nation.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
              <Link to="/products"
                className="font-heading text-xs tracking-widest inline-flex items-center gap-2"
                style={{ background: '#BAFF39', color: '#0F1410', padding: '0.75rem 2rem', fontWeight: 700, borderRadius: '2px' }}>
                EXPLORE PRODUCTS <ArrowRight size={16} />
              </Link>
              <Link to="/products?category=organic"
                className="font-heading text-xs tracking-widest inline-flex items-center"
                style={{ border: '1px solid rgba(244,247,242,0.2)', color: '#F4F7F2', padding: '0.75rem 2rem', fontWeight: 600, borderRadius: '2px' }}>
                ORGANIC RANGE
              </Link>
            </div>
          </div>

          {/* Right widget */}
          <div className="lg:col-span-2" style={{ border: '1px solid rgba(244,247,242,0.1)', borderRadius: '2px', padding: '1.5rem', background: 'rgba(15,20,16,0.85)', backdropFilter: 'blur(10px)' }}>
            <h3 className="font-heading text-xs tracking-widest mb-5" style={{ color: '#4a5e4a' }}>NUTRIENT CATEGORIES</h3>
            {[
              { code: 'N',   label: 'NITROGEN SERIES',   desc: 'Growth & chlorophyll', cat: 'nitrogen' },
              { code: 'P',   label: 'PHOSPHORUS SERIES', desc: 'Root & bloom',         cat: 'phosphorus' },
              { code: 'K',   label: 'POTASSIUM SERIES',  desc: 'Strength & resistance',cat: 'potassium' },
              { code: 'ORG', label: 'ORGANIC RANGE',     desc: 'Natural composites',   cat: 'organic' },
              { code: 'NPK', label: 'COMPOUND BLENDS',   desc: 'Balanced formulas',    cat: 'compound' },
            ].map(item => (
              <Link key={item.code} to={`/products?category=${item.cat}`}
                className="flex items-center justify-between py-3 group"
                style={{ borderTop: '1px solid rgba(244,247,242,0.07)' }}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs" style={{ color: '#BAFF39', width: '2.5rem' }}>{item.code}</span>
                  <div>
                    <div className="font-heading text-xs tracking-wider" style={{ color: '#F4F7F2' }}>{item.label}</div>
                    <div style={{ fontSize: '11px', color: '#4a5e4a' }}>{item.desc}</div>
                  </div>
                </div>
                <ArrowRight size={12} color="#4a5e4a" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Horizon line */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(186,255,57,0.15)' }} />
    </section>
  )
}
