import { useStore } from '../lib/store';
import { resumeAudio } from '../lib/sounds';

function go(setScreen: (s: any) => void, s: 'login' | 'register') {
  resumeAudio();
  setScreen(s);
}

const FEATURES = [
  {
    color: '#00D68F',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    title: 'Real Market Prices',
    desc: 'Live data from Binance & global exchanges. No synthetic OTC instruments.',
  },
  {
    color: '#3B82F6',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: 'Instant Execution',
    desc: 'Trades confirmed in under 100ms with 99.9% platform uptime.',
  },
  {
    color: '#8B5CF6',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'ISO 27001 Certified',
    desc: 'Bank-grade security. Your account and funds are always protected.',
  },
  {
    color: '#F59E0B',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
    title: '82% Payout Rate',
    desc: 'Industry-leading returns on correct predictions, paid instantly.',
  },
  {
    color: '#EC4899',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    title: '100+ Instruments',
    desc: 'Crypto, Forex, Gold — trade any global market, any time.',
  },
  {
    color: '#10B981',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    title: '$10,000 Demo Account',
    desc: 'Practice completely free with virtual funds. No deposit required.',
  },
];

export default function LandingScreen() {
  const setScreen = useStore(s => s.setScreen);

  return (
    <div className="landing">
      <div className="landing-bg" />
      <div className="landing-grid" />

      {/* ── Nav ── */}
      <nav className="landing-nav">
        <div className="landing-logo">
          <div className="landing-logo-ico">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="2" y1="2" x2="16" y2="16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="16" y1="2" x2="2" y2="16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="landing-logo-text">OXIER</span>
        </div>
        <button className="landing-nav-btn" onClick={() => go(setScreen, 'login')}>Sign In</button>
      </nav>

      {/* ── Hero ── */}
      <div className="landing-hero">
        <div className="landing-badge">
          <span className="landing-badge-dot" />
          Real Prices · No OTC · Est. 2019
        </div>
        <h1 className="landing-h1">
          Trade Real Assets.<br/>
          <span className="landing-h1-accent">Earn Real Profits.</span>
        </h1>
        <p className="landing-sub">
          Join 50,000+ traders worldwide. Live prices from global exchanges — not synthetic OTC data.
        </p>
        <button className="landing-cta-primary" onClick={() => go(setScreen, 'register')}>
          Start Trading Free
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <p className="landing-demo-link" onClick={() => go(setScreen, 'login')}>
          Already have an account? <span>Sign in →</span>
        </p>
      </div>

      {/* ── Stats ── */}
      <div className="landing-stats">
        {[
          { val: '2019', lbl: 'Est.' },
          { val: '50K+', lbl: 'Traders' },
          { val: '82%',  lbl: 'Payout' },
          { val: '100+', lbl: 'Assets' },
        ].map((s, i) => (
          <div key={i} className="landing-stat">
            <div className="landing-stat-val">{s.val}</div>
            <div className="landing-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── Features ── */}
      <div className="landing-section">
        <div className="landing-section-label">Why Trade with OXIER</div>
        <div className="landing-features">
          {FEATURES.map((f, i) => (
            <div key={i} className="landing-feature-card" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="landing-feature-ico" style={{ background: `${f.color}18`, color: f.color }}>
                {f.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div className="landing-feature-title">{f.title}</div>
                <div className="landing-feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <div className="landing-about">
        <div className="landing-about-badge">About Us</div>
        <h2 className="landing-about-title">Built for Serious Traders</h2>
        <p className="landing-about-body">
          OXIER was founded in 2019 with one mission: deliver a binary-options trading experience backed by real market data. Unlike other platforms that use synthetic OTC instruments, every asset on OXIER reflects live prices from global exchanges in real time.
        </p>
        <p className="landing-about-body" style={{ marginTop: 10 }}>
          ISO 27001 certified and processing millions in daily trading volume, we serve traders across Egypt, UAE, Saudi Arabia, and the wider MENA region — with full Arabic &amp; English support.
        </p>
        <div className="landing-badges-row">
          {['🔒 ISO 27001', '✓ Real Prices', '📍 MENA Region', '⚡ Since 2019'].map((b, i) => (
            <div key={i} className="landing-cert-badge">{b}</div>
          ))}
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div className="landing-final-cta">
        <h2 className="landing-final-title">Ready to Start?</h2>
        <p className="landing-final-sub">Create a free account in under 30 seconds.</p>
        <button className="landing-cta-primary" onClick={() => go(setScreen, 'register')}>
          Create Free Account
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <button className="landing-cta-secondary" onClick={() => go(setScreen, 'login')}>
          Sign In to Existing Account
        </button>
      </div>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="landing-footer-logo">
          <div className="landing-logo-ico" style={{ width: 22, height: 22, borderRadius: 6 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="1" y1="1" x2="11" y2="11" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <line x1="11" y1="1" x2="1" y2="11" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontWeight: 800, letterSpacing: 2, fontSize: 13, color: 'var(--t2)' }}>OXIER</span>
        </div>
        <p className="landing-footer-text">© 2019–2026 OXIER Trading. All rights reserved.</p>
        <p className="landing-footer-text" style={{ marginTop: 4 }}>
          Trading involves risk. Past performance is not indicative of future results.
        </p>
      </footer>
    </div>
  );
}
