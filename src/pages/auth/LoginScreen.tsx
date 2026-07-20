import { useState } from 'react';
import { useStore } from '../../lib/store';
import { resumeAudio } from '../../lib/sounds';

const BACKEND = 'https://oxier-backend-production.up.railway.app';

export default function LoginScreen() {
  const setScreen  = useStore(s => s.setScreen);
  const setUserInfo = useStore(s => s.setUserInfo);
  const showToast  = useStore(s => s.showToast);

  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr]         = useState('');

  async function handleLogin() {
    if (!email.trim() || !password.trim()) { setErr('Please fill all fields'); return; }
    setErr(''); setLoading(true); resumeAudio();
    try {
      const res = await fetch(`${BACKEND}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setUserInfo({ email: email.trim().toLowerCase(), name: data.name || email.split('@')[0], token: data.token });
        setScreen('trading');
      } else {
        setErr(data.message || data.error || 'Login failed — check your credentials');
      }
    } catch { setErr('Connection error — check your network'); }
    finally { setLoading(false); }
  }

  function demoLogin() {
    resumeAudio();
    setUserInfo({ email: 'demo@oxier.com', name: 'Demo Trader', token: 'demo' });
    setScreen('trading');
  }

  return (
    <div className="auth-screen">
      {/* Animated background */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', top: '-30%', left: '-20%', width: '140%', height: '80%',
          background: 'radial-gradient(ellipse, rgba(0,214,143,.07) 0%, transparent 60%)',
          animation: 'glowPulse 6s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-20%', width: '80%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(59,130,246,.05) 0%, transparent 60%)',
        }} />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: .03,
          backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Hero */}
      <div className="auth-hero" style={{ paddingTop: 56 }}>
        <div className="auth-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <line x1="4" y1="4" x2="24" y2="24" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
            <line x1="24" y1="4" x2="4" y2="24" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>
        <h1>Welcome back</h1>
        <p>Sign in to your OXIER trading account</p>
      </div>

      {/* Body */}
      <div className="auth-body" style={{ position: 'relative' }}>
        {err && (
          <div className="auth-error" style={{ animation: 'fadeDown .3s both' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {' '}{err}
          </div>
        )}

        <div className="auth-field" style={{ animationDelay: '.05s' }}>
          <label>Email Address</label>
          <input
            className="auth-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </div>

        <div className="auth-field" style={{ animationDelay: '.12s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>Password</label>
            <span
              style={{ fontSize: 11, color: 'var(--g0)', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => showToast('Password reset link sent!')}
            >Forgot password?</span>
          </div>
          <div className="auth-pw-wrap">
            <input
              className="auth-input"
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{ paddingRight: 44 }}
            />
            <button className="auth-pw-eye" onClick={() => setShowPw(v => !v)} type="button">
              {showPw
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              }
            </button>
          </div>
        </div>

        <button
          className={`auth-btn ${loading ? 'loading' : ''}`}
          onClick={handleLogin}
          disabled={loading}
          style={{ animationDelay: '.2s', marginTop: 4 }}
        >
          {loading
            ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                Signing in…
              </span>
            : 'Sign In'
          }
        </button>

        <div className="auth-divider" style={{ animationDelay: '.28s' }}>or</div>

        <button
          className="auth-btn"
          onClick={demoLogin}
          style={{
            background: 'var(--bg2)', color: 'var(--t2)',
            border: '1.5px solid var(--border2)', boxShadow: 'none',
            animationDelay: '.32s',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            Try Demo Account
          </span>
        </button>

        <div className="auth-link" style={{ animationDelay: '.38s' }}>
          Don't have an account?{' '}
          <span onClick={() => setScreen('register')}>Create account</span>
        </div>

        <div
          style={{ textAlign: 'center', animationDelay: '.44s', animation: 'fadeUp .4s .44s both' }}
          onClick={() => setScreen('landing')}
        >
          <span style={{ fontSize: 11, color: 'var(--t4)', cursor: 'pointer' }}>← Back to home</span>
        </div>
      </div>
    </div>
  );
}
