import React from 'react'

const stats = [
  { value: '500+', label: 'Products' },
  { value: '12K+', label: 'Farmers Served' },
  { value: '98%',  label: 'Delivery Rate' },
  { value: '50+',  label: 'Districts' },
]

export default function StatsBar() {
  return (
    <section style={{ borderTop: '1px solid #1e2e1e', borderBottom: '1px solid #1e2e1e', background: '#0F1410' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="py-8 md:py-12 text-center"
              style={{ borderRight: i < 3 ? '1px solid #1e2e1e' : 'none' }}>
              <div className="font-heading font-bold text-2xl md:text-3xl" style={{ color: '#BAFF39' }}>{s.value}</div>
              <div className="font-mono text-[10px] tracking-widest mt-1 uppercase" style={{ color: '#4a5e4a' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
