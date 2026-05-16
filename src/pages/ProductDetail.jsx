import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '@/data/products'
import { ArrowLeft, ShoppingCart, Minus, Plus, Calculator } from 'lucide-react'
import { useCart } from '@/App'

const stockConfig = {
  available: { label: '[+] AVAILABLE', color: '#BAFF39' },
  low_stock:  { label: '[!] LOW STOCK',  color: '#f59e0b' },
  depleted:   { label: '[x] DEPLETED',   color: '#ef4444' },
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [acreage, setAcreage] = useState('')
  const [added, setAdded] = useState(false)

  const product = PRODUCTS.find(p => p.id === id)
  if (!product) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <p className="font-heading" style={{ color: '#6b7c6b' }}>Product not found</p>
      <Link to="/products" style={{ color: '#BAFF39' }}>← Back to Products</Link>
    </div>
  )

  const stock = stockConfig[product.stock_status]
  const bagsNeeded = acreage ? Math.ceil(parseFloat(acreage) * parseFloat(product.application_rate || 2)) : null

  const getBenefitsAndUses = (category) => {
    switch(category) {
      case 'nitrogen': return {
        why: 'Nitrogen is the primary building block for plant protoplasm, essential for rapid vegetative growth and intense green color.',
        uses: ['Pre-planting soil application', 'Top dressing during rapid growth', 'Post-harvest recovery'],
        benefits: ['Accelerates leaf and stem growth', 'Increases protein content in grain', 'Improves overall crop vigor']
      };
      case 'phosphorus': return {
        why: 'Phosphorus is crucial for root development, seed formation, and energy transfer within the plant system.',
        uses: ['Basal application before sowing', 'Transplanting establishment', 'Pre-flowering application'],
        benefits: ['Stimulates early root growth', 'Hastens crop maturity', 'Improves winter hardiness']
      };
      case 'potassium': return {
        why: 'Potassium regulates stomatal opening, water use efficiency, and the activation of over 60 different plant enzymes.',
        uses: ['Fruit setting stage', 'Drought stress preparation', 'Late season bulking'],
        benefits: ['Enhances disease resistance', 'Improves fruit size and quality', 'Increases stalk strength']
      };
      case 'compound': return {
        why: 'Compound fertilizers provide a balanced, synchronized release of multiple primary nutrients in a single application.',
        uses: ['General maintenance feeding', 'Broad-acre base application', 'Mid-season nutrient correction'],
        benefits: ['Reduces application passes', 'Ensures uniform nutrient distribution', 'Prevents nutrient lock-out']
      };
      case 'organic': return {
        why: 'Organic inputs build soil organic matter, feed beneficial microbial life, and improve long-term soil structure.',
        uses: ['Soil conditioning', 'Pre-season bed preparation', 'Sustainable farming programs'],
        benefits: ['Improves water holding capacity', 'Releases nutrients slowly', 'Enhances soil biodiversity']
      };
      case 'micronutrient': return {
        why: 'Micronutrients are required in trace amounts but are absolutely critical for specific enzymatic and physiological functions.',
        uses: ['Foliar deficiency correction', 'High-pH soil applications', 'Yield-maximization programs'],
        benefits: ['Prevents chlorosis/yellowing', 'Optimizes macro-nutrient uptake', 'Corrects specific local deficiencies']
      };
      case 'liquid': return {
        why: 'Liquid formulations offer immediate nutrient availability and precise dosing through irrigation systems or foliar sprays.',
        uses: ['Fertigation (drip/sprinkler)', 'Foliar rescue sprays', 'Seedling drenching'],
        benefits: ['100% water solubility', 'Immediate plant uptake', 'No residue buildup in pipes']
      };
      default: return {
        why: 'A specialized agricultural input designed to maximize crop yield and quality.',
        uses: ['General agricultural application', 'Yield improvement', 'Soil maintenance'],
        benefits: ['Improves crop health', 'Increases harvestable yield', 'High return on investment']
      }
    }
  }

  const { why, uses, benefits } = getBenefitsAndUses(product.category)

  const handleAdd = () => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ background: '#0a120a', borderBottom: '1px solid #1e2e1e', padding: '1rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center gap-2 font-mono text-xs" style={{ color: '#4a5e4a' }}>
            <ArrowLeft size={12} /> BACK TO PRODUCTS
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="lg:sticky lg:top-24 lg:self-start" style={{ aspectRatio: '1', borderRadius: '2px', overflow: 'hidden', background: '#0a120a', position: 'relative' }}>
            {product.image_url
              ? <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="font-heading" style={{ fontSize: '4rem', color: 'rgba(244,247,242,0.05)' }}>N-P-K</span>
                </div>
            }
            {product.batch_number && (
              <span className="absolute bottom-3 right-3 font-mono" style={{ fontSize: '10px', color: 'rgba(244,247,242,0.3)', background: 'rgba(15,20,16,0.7)', padding: '2px 6px', borderRadius: '2px' }}>
                BTH/{product.batch_number}
              </span>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="font-mono" style={{ fontSize: '10px', color: '#BAFF39', letterSpacing: '0.15em' }}>
              {product.category?.toUpperCase()}
            </span>
            <h1 className="font-heading font-bold uppercase mt-2 text-3xl md:text-4xl" style={{ color: '#F4F7F2', letterSpacing: '-0.02em' }}>
              {product.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
              <span className="font-heading font-bold text-2xl" style={{ color: '#BAFF39' }}>₹{product.price?.toLocaleString()}</span>
              <span className="font-mono text-xs" style={{ color: '#4a5e4a' }}>/ {product.unit?.replace(/_/g, ' ')}</span>
              <span className="font-mono text-xs" style={{ color: stock.color }}>{stock.label}</span>
            </div>

            {/* NPK */}
            {(product.nitrogen || product.phosphorus || product.potassium) > 0 && (
              <div style={{ border: '1px solid #1e2e1e', borderRadius: '2px', padding: '1rem', marginTop: '2rem', background: '#0a120a' }}>
                <h3 className="font-heading text-xs tracking-widest mb-4" style={{ color: '#4a5e4a' }}>COMPOSITION</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[['N', product.nitrogen, 'Nitrogen'], ['P', product.phosphorus, 'Phosphorus'], ['K', product.potassium, 'Potassium']].map(([l, v, n]) => (
                    <div key={l}>
                      <div className="font-heading font-bold text-2xl" style={{ color: '#BAFF39' }}>{v || 0}%</div>
                      <div className="font-mono" style={{ fontSize: '10px', color: '#4a5e4a', marginTop: '4px' }}>{n}</div>
                    </div>
                  ))}
                </div>
                {product.npk_ratio && (
                  <div style={{ borderTop: '1px solid #1e2e1e', marginTop: '0.75rem', paddingTop: '0.75rem', textAlign: 'center' }}>
                    <span className="font-mono text-sm" style={{ color: '#F4F7F2' }}>NPK: {product.npk_ratio}</span>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 className="font-heading text-xs tracking-widest mb-2" style={{ color: '#4a5e4a' }}>DESCRIPTION</h3>
                <p style={{ color: 'rgba(244,247,242,0.75)', lineHeight: 1.7 }}>{product.description}</p>
              </div>
            )}

            {/* Crops */}
            {product.suitable_crops?.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 className="font-heading text-xs tracking-widest mb-3" style={{ color: '#4a5e4a' }}>SUITABLE CROPS</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.suitable_crops.map(c => (
                    <span key={c} className="font-mono text-xs" style={{ border: '1px solid #8C7355', color: '#8C7355', padding: '2px 10px', borderRadius: '2px' }}>{c}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Calculator */}
            <div style={{ border: '1px solid rgba(186,255,57,0.2)', borderRadius: '2px', padding: '1rem', marginTop: '2rem', background: 'rgba(186,255,57,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Calculator size={16} color="#BAFF39" />
                <span className="font-heading text-xs tracking-widest" style={{ color: '#BAFF39' }}>APPLICATION CALCULATOR</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input type="number" placeholder="Enter acreage" value={acreage} onChange={e => setAcreage(e.target.value)}
                  style={{ width: '160px', background: '#0F1410', border: '1px solid #1e2e1e', color: '#F4F7F2', padding: '0.5rem 0.75rem', borderRadius: '2px', fontFamily: 'Inter', fontSize: '14px' }} />
                <span style={{ color: '#4a5e4a', fontSize: '14px' }}>acres</span>
              </div>
              {bagsNeeded && (
                <p className="font-mono text-sm mt-3" style={{ color: '#BAFF39' }}>
                  ≈ {bagsNeeded} bags needed · ₹{(bagsNeeded * product.price).toLocaleString()} total
                </p>
              )}
            </div>

            {/* Why Use & Benefits */}
            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 className="font-heading text-xs tracking-widest mb-2" style={{ color: '#4a5e4a' }}>WHY USE THIS PRODUCT?</h3>
                <p style={{ color: 'rgba(244,247,242,0.75)', lineHeight: 1.7, fontSize: '14px' }}>{why}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading text-xs tracking-widest mb-3" style={{ color: '#4a5e4a' }}>PRIMARY USES</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {uses.map((u, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(244,247,242,0.75)', fontSize: '13px' }}>
                        <span style={{ color: '#8C7355', marginTop: '2px' }}>▹</span> {u}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading text-xs tracking-widest mb-3" style={{ color: '#4a5e4a' }}>KEY BENEFITS</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {benefits.map((b, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(244,247,242,0.75)', fontSize: '13px' }}>
                        <span style={{ color: '#BAFF39', marginTop: '2px' }}>+</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #1e2e1e', borderRadius: '2px' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '0.75rem', background: 'transparent', border: 'none', cursor: 'pointer', color: '#F4F7F2' }}><Minus size={16} /></button>
                <span className="font-mono text-sm" style={{ padding: '0 1rem', color: '#F4F7F2', minWidth: '3rem', textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ padding: '0.75rem', background: 'transparent', border: 'none', cursor: 'pointer', color: '#F4F7F2' }}><Plus size={16} /></button>
              </div>
              <button onClick={handleAdd} disabled={product.stock_status === 'depleted'}
                className="flex-1 font-heading text-xs tracking-wider inline-flex items-center justify-center gap-2"
                style={{ background: added ? '#1e2e1e' : (product.stock_status === 'depleted' ? '#1e2e1e' : '#BAFF39'), color: added ? '#BAFF39' : '#0F1410', padding: '0.75rem 1.5rem', borderRadius: '2px', fontWeight: 700, border: 'none', cursor: 'pointer', height: '48px' }}>
                <ShoppingCart size={16} />
                {added ? 'ADDED ✓' : product.stock_status === 'depleted' ? 'OUT OF STOCK' : `ADD TO CART · ₹${(product.price * qty).toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
