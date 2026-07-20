import { useStore } from '../../lib/store';
import { playClick, resumeAudio } from '../../lib/sounds';

function IconDeposit() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 7l-5-5-5 5M17 17l-5 5-5-5"/></svg>;
}
function IconWithdraw() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function IconHistory() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
function IconProfile() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function IconIndicators() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
}
function IconSignals() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
}
function IconEvents() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}
function IconSupport() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
}
function IconLogout() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
}

export default function PanelOverlay() {
  const setOverlay  = useStore(s => s.setOverlay);
  const userInfo    = useStore(s => s.userInfo);
  const setUserInfo = useStore(s => s.setUserInfo);
  const setScreen   = useStore(s => s.setScreen);
  const demoBalance = useStore(s => s.demoBalance);
  const realBalance = useStore(s => s.realBalance);
  const trades      = useStore(s => s.trades);
  const showConfirm = useStore(s => s.showConfirm);

  const resolved    = trades.filter(t => t.resolved);
  const wins        = resolved.filter(t => t.won);
  const totalProfit = wins.reduce((a, t) => a + (t.profit || 0), 0);
  const winRate     = resolved.length ? ((wins.length / resolved.length) * 100).toFixed(0) : '0';
  const name        = userInfo?.name || 'Trader';
  const email       = userInfo?.email || '';
  const initials    = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();

  function go(ov: string) { resumeAudio(); playClick(); setOverlay(ov as any); }
  function logout() {
    showConfirm('Sign Out', 'Are you sure you want to sign out?', () => {
      setUserInfo(null); setScreen('landing');
    });
  }

  const MENU = [
    { icon: <IconDeposit />,    color: '#00D68F', bg: 'rgba(0,214,143,.12)',  title: 'Deposit',       sub: 'Add funds to your account',     action: () => go('deposit') },
    { icon: <IconWithdraw />,   color: '#3B82F6', bg: 'rgba(59,130,246,.12)', title: 'Transfers',     sub: 'Withdraw or transfer funds',     action: () => go('transfers') },
    { icon: <IconHistory />,    color: '#F59E0B', bg: 'rgba(245,158,11,.12)', title: 'Trade History', sub: 'View all your past trades',      action: () => go('history') },
    { icon: <IconProfile />,    color: '#8B5CF6', bg: 'rgba(139,92,246,.12)', title: 'My Profile',    sub: 'Account details & settings',     action: () => go('profile') },
    { icon: <IconIndicators />, color: '#06B6D4', bg: 'rgba(6,182,212,.12)',  title: 'Indicators',    sub: 'Manage chart indicators',        action: () => go('indicators') },
    { icon: <IconSignals />,    color: '#EC4899', bg: 'rgba(236,72,153,.12)', title: 'Trade Signals', sub: 'AI-powered market signals',      action: () => go('signals') },
    { icon: <IconEvents />,     color: '#F97316', bg: 'rgba(249,115,22,.12)', title: 'Events',        sub: 'Promotions & bonus offers',      action: () => go('events') },
    { icon: <IconSupport />,    color: '#10B981', bg: 'rgba(16,185,129,.12)', title: 'Support',       sub: '24/7 customer service',          action: () => go('events') },
  ];

  return (
    <div className="overlay-bg" onClick={() => setOverlay('none')}>
      <div className="overlay-sheet" style={{ maxHeight: '92vh' }} onClick={e => e.stopPropagation()}>
        <div className="overlay-handle" />

        {/* Header */}
        <div className="overlay-header">
          <span className="overlay-title">Account</span>
          <button className="overlay-close" onClick={() => setOverlay('none')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="overlay-body">
          {/* ── Avatar + name ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: 20, paddingTop: 4 }}>
            {/* Outer glow ring */}
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(0,214,143,.4) 0%, rgba(0,100,255,.3) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 32px rgba(0,214,143,.2)',
              animation: 'glowPulse 3s infinite',
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, #00D68F 0%, #0055EE 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, fontWeight: 900, color: '#fff',
                letterSpacing: -1, userSelect: 'none',
              }}>{initials}</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--t1)', marginTop: 2 }}>{name}</div>
            <div style={{ fontSize: 12, color: 'var(--t4)', fontWeight: 500 }}>{email}</div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 0, marginTop: 8, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--r2)', overflow: 'hidden', width: '100%' }}>
              {[
                { val: resolved.length, lbl: 'Trades' },
                { val: `${winRate}%`,   lbl: 'Win Rate' },
                { val: `${totalProfit >= 0 ? '+' : ''}$${Math.abs(totalProfit).toFixed(0)}`, lbl: 'P&L', color: totalProfit >= 0 ? 'var(--g0)' : 'var(--red)' },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: 1, padding: '12px 4px', textAlign: 'center',
                  borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: (s as any).color || 'var(--t1)', fontFamily: 'JetBrains Mono' }}>{s.val}</div>
                  <div style={{ fontSize: 9, color: 'var(--t4)', fontWeight: 600, marginTop: 3, textTransform: 'uppercase', letterSpacing: .5 }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Balance cards ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,.1) 0%, rgba(245,158,11,.05) 100%)',
              border: '1px solid rgba(245,158,11,.2)', borderRadius: 'var(--r2)', padding: '14px 16px',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#F59E0B', letterSpacing: .5, marginBottom: 4, textTransform: 'uppercase' }}>Demo Balance</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#F59E0B', fontFamily: 'JetBrains Mono' }}>${demoBalance.toFixed(2)}</div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(0,214,143,.1) 0%, rgba(0,214,143,.05) 100%)',
              border: '1px solid rgba(0,214,143,.2)', borderRadius: 'var(--r2)', padding: '14px 16px',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--g0)', letterSpacing: .5, marginBottom: 4, textTransform: 'uppercase' }}>Real Balance</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--g0)', fontFamily: 'JetBrains Mono' }}>${realBalance.toFixed(2)}</div>
            </div>
          </div>

          {/* ── Menu ── */}
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--t4)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Quick Actions</div>
          <div className="panel-menu">
            {MENU.map((item, i) => (
              <div key={i} className="panel-menu-item" onClick={item.action} style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="panel-menu-ico" style={{ background: item.bg, color: item.color }}>{item.icon}</div>
                <div className="panel-menu-info">
                  <div className="panel-menu-title">{item.title}</div>
                  <div className="panel-menu-sub">{item.sub}</div>
                </div>
                <svg className="panel-menu-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            ))}
          </div>

          {/* ── Logout ── */}
          <button
            onClick={logout}
            style={{
              width: '100%', marginTop: 8, padding: '13px',
              background: 'rgba(255,58,78,.07)', border: '1px solid rgba(255,58,78,.18)',
              borderRadius: 'var(--r2)', color: 'var(--red)',
              fontWeight: 700, fontSize: 14, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: 'inherit', transition: 'background .2s',
            }}
          >
            <IconLogout /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
