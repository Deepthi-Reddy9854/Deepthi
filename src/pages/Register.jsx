import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, Mail, Lock, User, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/App'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showGoogleConsent, setShowGoogleConsent] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleRegister = (e) => {
    e.preventDefault()
    setShowOTP(true)
  }

  const handleVerifyOTP = () => {
    setShowOTP(false)
    login()
    navigate('/')
  }

  const handleGoogleClick = () => {
    setShowGoogleConsent(true)
  }

  const handleGoogleAllow = () => {
    setShowGoogleConsent(false)
    login()
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F1410', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' }}>
      
      {/* Google Consent Modal */}
      {showGoogleConsent && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,20,16,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#FFFFFF', borderRadius: '8px', width: '100%', maxWidth: '400px', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '24px', height: '24px' }} />
              <div style={{ width: '16px', height: '2px', background: '#e2e8f0' }}></div>
              <Leaf size={24} color="#BAFF39" />
            </div>
            
            <h3 className="font-heading font-bold text-center" style={{ color: '#0F1410', fontSize: '18px', marginBottom: '0.5rem' }}>
              Sign in with Google
            </h3>
            <p className="font-body text-center" style={{ color: '#6b7c6b', fontSize: '14px', marginBottom: '1.5rem' }}>
              TerraSynth wants to access your Google Account.
            </p>

            <div style={{ background: '#F4F7F2', borderRadius: '4px', padding: '1rem', marginBottom: '2rem' }}>
              <p className="font-heading font-semibold" style={{ color: '#0F1410', fontSize: '12px', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>THIS WILL ALLOW TERRASYNTH TO:</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4a5e4a', fontSize: '13px' }}>
                  <CheckCircle2 size={16} color="#84cc16" /> View your email address
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4a5e4a', fontSize: '13px' }}>
                  <CheckCircle2 size={16} color="#84cc16" /> View your basic profile info
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setShowGoogleConsent(false)} className="font-heading" style={{ flex: 1, background: 'transparent', border: '1px solid #e2e8f0', color: '#6b7c6b', padding: '0.75rem', borderRadius: '4px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', letterSpacing: '0.05em' }}>
                CANCEL
              </button>
              <button onClick={handleGoogleAllow} className="font-heading" style={{ flex: 1, background: '#BAFF39', border: 'none', color: '#0F1410', padding: '0.75rem', borderRadius: '4px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', letterSpacing: '0.05em' }}>
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOTP && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,20,16,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#FFFFFF', borderRadius: '8px', width: '100%', maxWidth: '400px', padding: '2.5rem 2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', background: '#F4F7F2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Mail size={24} color="#84cc16" />
            </div>
            
            <h3 className="font-heading font-bold" style={{ color: '#0F1410', fontSize: '20px', marginBottom: '0.5rem' }}>
              Verify your email
            </h3>
            <p className="font-body" style={{ color: '#6b7c6b', fontSize: '14px', marginBottom: '2rem' }}>
              We sent a verification code to <br/><strong style={{color: '#0F1410'}}>{email || 'your email'}</strong>
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[idx] = e.target.value;
                    setOtp(newOtp);
                    if (e.target.value && idx < 5) {
                      document.getElementById(`otp-${idx + 1}`)?.focus();
                    }
                  }}
                  id={`otp-${idx}`}
                  style={{ width: '40px', height: '48px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', border: '1px solid #e2e8f0', borderRadius: '4px', background: '#F4F7F2', color: '#0F1410' }}
                />
              ))}
            </div>

            <button onClick={handleVerifyOTP} className="font-heading" style={{ width: '100%', background: '#BAFF39', border: 'none', color: '#0F1410', padding: '0.875rem', borderRadius: '4px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', letterSpacing: '0.05em' }}>
              VERIFY & CONTINUE
            </button>
            
            <p className="font-body" style={{ color: '#6b7c6b', fontSize: '13px', marginTop: '1.5rem' }}>
              Didn't receive the code? <button style={{background:'none',border:'none',color:'#84cc16',cursor:'pointer',padding:0}}>Resend</button>
            </p>
          </div>
        </div>
      )}

      {/* Logo & Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Leaf size={24} color="#BAFF39" />
          <span className="font-heading font-bold text-2xl" style={{ color: '#F4F7F2', letterSpacing: '-0.02em' }}>
            TERRA<span style={{ color: '#BAFF39' }}>SYNTH</span>
          </span>
        </div>
        <p className="font-body" style={{ color: '#6b7c6b', fontSize: '14px' }}>
          Create a new account
        </p>
      </div>

      {/* Card */}
      <div style={{ background: '#FFFFFF', borderRadius: '4px', width: '100%', maxWidth: '440px', padding: '2.5rem 2rem' }}>
        
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* First Name */}
            <div style={{ flex: 1 }}>
              <label className="font-heading" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#0F1410', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                FIRST NAME
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7c6b', display: 'flex', alignItems: 'center' }}>
                  <User size={16} />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="Jane"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%', background: '#F4F7F2', border: '1px solid #e2e8f0', color: '#0F1410', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '4px', fontSize: '14px', fontFamily: "'Inter', sans-serif" }}
                />
              </div>
            </div>

            {/* Last Name */}
            <div style={{ flex: 1 }}>
              <label className="font-heading" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#0F1410', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                LAST NAME
              </label>
              <input 
                type="text" 
                required
                placeholder="Doe"
                style={{ width: '100%', background: '#F4F7F2', border: '1px solid #e2e8f0', color: '#0F1410', padding: '0.75rem 1rem 0.75rem 1rem', borderRadius: '4px', fontSize: '14px', fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          </div>

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

          {/* Password */}
          <div>
            <label className="font-heading" style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#0F1410', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7c6b', display: 'flex', alignItems: 'center' }}>
                <Lock size={16} />
              </div>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', background: '#F4F7F2', border: '1px solid #e2e8f0', color: '#0F1410', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '4px', fontSize: '14px', fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button type="submit" className="font-heading" style={{ width: '100%', background: '#BAFF39', color: '#0F1410', padding: '0.875rem', borderRadius: '4px', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', letterSpacing: '0.05em', marginTop: '0.5rem' }}>
            CREATE ACCOUNT
          </button>

          {/* OR divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
            <span className="font-body" style={{ fontSize: '12px', color: '#6b7c6b' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          </div>

          {/* Google Button */}
          <button type="button" onClick={handleGoogleClick} className="font-heading" style={{ width: '100%', background: '#FFFFFF', border: '1px solid #e2e8f0', color: '#0F1410', padding: '0.875rem', borderRadius: '4px', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', cursor: 'pointer', letterSpacing: '0.05em' }}>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
            CONTINUE WITH GOOGLE
          </button>
        </form>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p className="font-body" style={{ fontSize: '13px', color: '#6b7c6b' }}>
            Already have an account? <Link to="/login" style={{ color: '#84cc16', textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>

      </div>
    </div>
  )
}
