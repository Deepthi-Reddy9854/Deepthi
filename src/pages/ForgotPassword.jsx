import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, Mail } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F1410', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      
      {/* Logo & Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Leaf size={24} color="#BAFF39" />
          <span className="font-heading font-bold text-2xl" style={{ color: '#F4F7F2', letterSpacing: '-0.02em' }}>
            TERRA<span style={{ color: '#BAFF39' }}>SYNTH</span>
          </span>
        </div>
        <p className="font-body" style={{ color: '#6b7c6b', fontSize: '14px' }}>
          Reset your password
        </p>
      </div>

      {/* Card */}
      <div style={{ background: '#FFFFFF', borderRadius: '4px', width: '100%', maxWidth: '440px', padding: '2.5rem 2rem' }}>
        
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <h3 className="font-heading font-bold" style={{ color: '#0F1410', fontSize: '18px', marginBottom: '1rem' }}>Check your email</h3>
            <p className="font-body" style={{ color: '#6b7c6b', fontSize: '14px', lineHeight: 1.6, marginBottom: '2rem' }}>
              We've sent a password reset link to <br/><strong>{email}</strong>
            </p>
            <Link to="/login" className="font-heading" style={{ display: 'inline-block', width: '100%', background: '#BAFF39', color: '#0F1410', padding: '0.875rem', borderRadius: '4px', fontWeight: 700, fontSize: '13px', textDecoration: 'none', letterSpacing: '0.05em' }}>
              RETURN TO SIGN IN
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <p className="font-body" style={{ color: '#6b7c6b', fontSize: '13px', lineHeight: 1.5 }}>
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>

            {/* Email */}
            <div>
              <label className="font-heading" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#0F1410', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                EMAIL
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7c6b', display: 'flex', alignItems: 'center' }}>
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', background: '#F4F7F2', border: '1px solid #e2e8f0', color: '#0F1410', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '4px', fontSize: '14px', fontFamily: "'Inter', sans-serif" }}
                />
              </div>
            </div>

            {/* Send Link Button */}
            <button type="submit" className="font-heading" style={{ width: '100%', background: '#BAFF39', color: '#0F1410', padding: '0.875rem', borderRadius: '4px', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', letterSpacing: '0.05em', marginTop: '0.5rem' }}>
              SEND RESET LINK
            </button>
          </form>
        )}

        {/* Footer */}
        {!submitted && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p className="font-body" style={{ fontSize: '13px', color: '#6b7c6b' }}>
              Remembered your password? <Link to="/login" style={{ color: '#84cc16', textDecoration: 'none' }}>Sign in</Link>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
