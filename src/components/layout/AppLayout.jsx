import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function AppLayout() {
  return (
    <div style={{ minHeight: '100vh', background: '#0F1410', color: '#F4F7F2', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '64px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
