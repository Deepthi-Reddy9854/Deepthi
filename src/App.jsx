import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import Orders from '@/pages/Orders'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ForgotPassword from '@/pages/ForgotPassword'

// ── Auth context (global state with localStorage) ──────────────────────────────
export const AuthContext = React.createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    return localStorage.getItem('ts_auth') === 'true'
  })

  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem('ts_auth', 'true')
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('ts_auth')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return React.useContext(AuthContext) }

// ── Cart context (global state with localStorage) ──────────────────────────────
export const CartContext = React.createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('ts_cart') || '[]') } catch { return [] }
  })
  const [orders, setOrders] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('ts_orders') || '[]') } catch { return [] }
  })

  const save = (items) => {
    setCart(items)
    localStorage.setItem('ts_cart', JSON.stringify(items))
  }

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product_id === product.id)
      const updated = existing
        ? prev.map(i => i.product_id === product.id ? { ...i, quantity: i.quantity + qty } : i)
        : [...prev, { id: Date.now().toString(), product_id: product.id, product_name: product.name, quantity: qty, unit_price: product.price, image_url: product.image_url }]
      localStorage.setItem('ts_cart', JSON.stringify(updated))
      return updated
    })
  }

  const updateQty = (id, qty) => {
    const updated = cart.map(i => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)
    save(updated)
  }

  const removeItem = (id) => {
    const updated = cart.filter(i => i.id !== id)
    save(updated)
  }

  const clearCart = () => { save([]) }

  const clearOrders = () => {
    setOrders([])
    localStorage.removeItem('ts_orders')
  }

  const placeOrder = (address, phone, notes) => {
    const order = {
      id: Date.now().toString(),
      items: cart.map(i => ({ ...i })),
      total_amount: cart.reduce((s, i) => s + i.unit_price * i.quantity, 0),
      shipping_address: address, phone, notes,
      status: 'confirmed',
      created_date: new Date().toISOString(),
    }
    const updated = [order, ...orders]
    setOrders(updated)
    localStorage.setItem('ts_orders', JSON.stringify(updated))
    clearCart()
    return order
  }

  return (
    <CartContext.Provider value={{ cart, orders, addToCart, updateQty, removeItem, clearCart, placeOrder, clearOrders }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() { return React.useContext(CartContext) }

// ── App ────────────────────────────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
            </Route>
            <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-[#F4F7F2]"><p className="font-heading text-2xl">404 — PAGE NOT FOUND</p></div>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}
