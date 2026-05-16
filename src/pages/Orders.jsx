import React from 'react'
import { useCart } from '@/App'
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'
import { format } from 'date-fns'

const statusConfig = {
  pending:   { label: 'PENDING',   Icon: Clock,        color: '#f59e0b' },
  confirmed: { label: 'CONFIRMED', Icon: Package,      color: '#BAFF39' },
  shipped:   { label: 'SHIPPED',   Icon: Truck,        color: '#3b82f6' },
  delivered: { label: 'DELIVERED', Icon: CheckCircle,  color: '#22c55e' },
  cancelled: { label: 'CANCELLED', Icon: XCircle,      color: '#ef4444' },
}

export default function Orders() {
  const { orders, clearOrders } = useCart()

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ background: '#0a120a', borderBottom: '1px solid #1e2e1e', padding: '3rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <span className="font-mono" style={{ fontSize: '10px', color: '#BAFF39', letterSpacing: '0.15em' }}>FIELD LOGISTICS</span>
            <h1 className="font-heading font-bold uppercase mt-2 text-3xl md:text-4xl" style={{ color: '#F4F7F2', letterSpacing: '-0.02em' }}>My Orders</h1>
          </div>
          {orders.length > 0 && (
            <button 
              onClick={() => { if(window.confirm('Are you sure you want to clear your order history?')) clearOrders() }}
              className="font-heading text-xs tracking-widest" 
              style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '2px', cursor: 'pointer' }}>
              CLEAR HISTORY
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '2rem 1rem' }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <Package size={48} style={{ margin: '0 auto 1rem', color: 'rgba(244,247,242,0.1)' }} />
            <p className="font-heading" style={{ color: '#4a5e4a' }}>No orders yet</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map(order => {
              const status = statusConfig[order.status] || statusConfig.pending
              const { Icon } = status
              return (
                <div key={order.id} style={{ border: '1px solid #1e2e1e', borderRadius: '2px', padding: '1.5rem', background: '#0a120a' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <p className="font-mono" style={{ fontSize: '10px', color: '#4a5e4a' }}>ORDER #{order.id.slice(-8).toUpperCase()}</p>
                      <p className="font-mono text-xs mt-1" style={{ color: '#4a5e4a' }}>
                        {format(new Date(order.created_date), 'MMM d, yyyy · HH:mm')}
                      </p>
                    </div>
                    <span className="font-mono inline-flex items-center gap-1" style={{ fontSize: '10px', color: status.color, border: `1px solid ${status.color}33`, padding: '3px 10px', borderRadius: '2px', height: 'fit-content' }}>
                      <Icon size={12} /> {status.label}
                    </span>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    {order.items?.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '3px 0', color: 'rgba(244,247,242,0.75)' }}>
                        <span>{item.product_name} × {item.quantity}</span>
                        <span className="font-mono">₹{(item.unit_price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid #1e2e1e', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="font-heading text-xs" style={{ color: '#4a5e4a' }}>TOTAL</span>
                    <span className="font-heading text-lg font-bold" style={{ color: '#BAFF39' }}>₹{order.total_amount?.toLocaleString()}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

