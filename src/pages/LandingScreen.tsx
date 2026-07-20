import { useState, useEffect, useRef } from 'react';
import { useStore } from '../lib/store';
import { resumeAudio } from '../lib/sounds';

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function go(setScreen: (s: any) => void, s: 'login' | 'register') {
  resumeAudio();
  setScreen(s);
}

/** Scroll-reveal hook — returns ref + visible flag */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/** Number counter animation */
function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    let cur = 0;
    const total = 1400;
    const step = to / (total / 16);
    const t = setInterval(() => {
      cur = Math.min(cur + step, to);
      setVal(Math.floor(cur));
      if (cur >= to) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [visible, to]);
  return <span ref={ref}>{prefix}{val.toLocaleString('ar-EG')}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   Static data
───────────────────────────────────────────── */
const FEATURES = [
  {
    color: '#00D68F',
    bg: 'rgba(0,214,143,.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    title: 'أسعار السوق الحقيقية',
    desc: 'بيانات مباشرة من بورصة Binance والأسواق العالمية — لا أدوات OTC اصطناعية.',
  },
  {
    color: '#3B82F6',
    bg: 'rgba(59,130,246,.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'تنفيذ فوري خلال 100ms',
    desc: 'تأكيد الصفقات في أقل من 100 ميلي ثانية مع وقت تشغيل 99.9٪.',
  },
  {
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'معتمد ISO 27001',
    desc: 'أمان بمستوى البنوك. حسابك وأموالك محمية على مدار الساعة.',
  },
  {
    color: '#F59E0B',
    bg: 'rgba(245,158,11,.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: 'عائد 82٪ على كل صفقة',
    desc: 'أعلى معدل عوائد في الصناعة على التوقعات الصحيحة، يُصرف فوراً.',
  },
  {
    color: '#EC4899',
    bg: 'rgba(236,72,153,.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    title: '+100 أصل متاح للتداول',
    desc: 'عملات رقمية، فوركس، ذهب — تداول في أي سوق عالمي، في أي وقت.',
  },
  {
    color: '#10B981',
    bg: 'rgba(16,185,129,.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'حساب تجريبي $10,000',
    desc: 'تدرّب مجاناً بأموال افتراضية. لا يلزم إيداع أي رصيد.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'أنشئ حسابك',
    desc: 'سجّل بريدك الإلكتروني وكلمة المرور في أقل من 30 ثانية — مجاناً تماماً.',
    color: '#00D68F',
  },
  {
    num: '02',
    title: 'أودع رصيداً',
    desc: 'اختر طريقة الدفع المفضلة لديك: بطاقة، تحويل بنكي، أو عملة رقمية.',
    color: '#3B82F6',
  },
  {
    num: '03',
    title: 'اختر الأصل',
    desc: 'تصفّح +100 أصل في الفوركس والكريبتو والذهب واختر ما يناسبك.',
    color: '#8B5CF6',
  },
  {
    num: '04',
    title: 'ابدأ التداول',
    desc: 'توقّع صعود أو هبوط السعر، ضع الصفقة، واستلم أرباحك فوراً.',
    color: '#F59E0B',
  },
];

const FAQS = [
  {
    q: 'ما هو الحد الأدنى للإيداع؟',
    a: 'الحد الأدنى للإيداع في OXIER هو $10 فقط. نؤمن بأن التداول يجب أن يكون في متناول الجميع.',
  },
  {
    q: 'كم من الوقت يستغرق سحب الأرباح؟',
    a: 'تُعالَج طلبات السحب خلال 1-3 أيام عمل. يسعى فريقنا دائماً لإتمام السحوبات في أسرع وقت ممكن.',
  },
  {
    q: 'هل أسعار OXIER حقيقية أم اصطناعية؟',
    a: 'جميع الأسعار على منصة OXIER مباشرة من الأسواق العالمية (Binance وما شابهها) — لا توجد أدوات OTC اصطناعية على الإطلاق.',
  },
  {
    q: 'هل المنصة آمنة؟',
    a: 'نعم. OXIER معتمدة وفق معيار ISO 27001 للأمن المعلوماتي، مع تشفير كامل للبيانات وحماية متعددة الطبقات لحسابك.',
  },
  {
    q: 'هل يمكنني تجربة المنصة قبل الإيداع؟',
    a: 'بالتأكيد! يمكنك فتح حساب تجريبي مجاني برصيد افتراضي $10,000 لتتعلم وتتدرب دون أي مخاطرة.',
  },
  {
    q: 'ما هي الأصول المتاحة للتداول؟',
    a: 'نوفر أكثر من 100 أصل تشمل: العملات الرقمية (BTC, ETH, …)، الفوركس (EUR/USD, GBP/USD, …)، المعادن (الذهب، الفضة)، والمؤشرات العالمية.',
  },
];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`lp-faq-item${open ? ' open' : ''}`} onClick={() => setOpen(v => !v)}>
      <div className="lp-faq-q">
        <span>{q}</span>
        <div className={`lp-faq-icon${open ? ' open' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
      {open && <div className="lp-faq-a">{a}</div>}
    </div>
  );
}

/** Animated mini chart for hero */
function HeroChart() {
  return (
    <div className="lp-hero-chart" aria-hidden>
      <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {/* Grid lines */}
        {[28, 56, 84, 112].map(y => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="rgba(255,255,255,.04)" strokeWidth="1"/>
        ))}
        {/* Area fill */}
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D68F" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#00D68F" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00B87A"/>
            <stop offset="100%" stopColor="#00D68F"/>
          </linearGradient>
        </defs>
        <path
          d="M0 110 L30 95 L60 100 L90 80 L120 85 L150 60 L180 70 L210 45 L240 55 L270 30 L300 40 L330 20 L360 28 L360 140 L0 140 Z"
          fill="url(#chartGrad)"
        />
        {/* Line */}
        <path
          d="M0 110 L30 95 L60 100 L90 80 L120 85 L150 60 L180 70 L210 45 L240 55 L270 30 L300 40 L330 20 L360 28"
          stroke="url(#lineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lp-chart-line"
        />
        {/* Last point dot */}
        <circle cx="360" cy="28" r="4" fill="#00D68F" opacity="0.9"/>
        <circle cx="360" cy="28" r="8" fill="#00D68F" opacity="0.15" className="lp-chart-pulse"/>
        {/* Candle stubs */}
        {[
          { x: 30, h: 30, t: 80, c: '#00D68F' },
          { x: 70, h: 25, t: 88, c: '#FF3A4E' },
          { x: 110, h: 28, t: 68, c: '#00D68F' },
          { x: 150, h: 32, t: 44, c: '#00D68F' },
          { x: 190, h: 22, t: 55, c: '#FF3A4E' },
          { x: 230, h: 30, t: 38, c: '#00D68F' },
          { x: 270, h: 26, t: 17, c: '#00D68F' },
        ].map((c, i) => (
          <g key={i}>
            <rect x={c.x - 5} y={c.t} width="10" height={c.h} rx="2" fill={c.c} opacity="0.35"/>
            <line x1={c.x} y1={c.t - 6} x2={c.x} y2={c.t + c.h + 6} stroke={c.c} strokeWidth="1.5" opacity="0.5"/>
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Floating platform preview mockup */
function PlatformPreview() {
  return (
    <div className="lp-preview-frame">
      {/* Topbar */}
      <div className="lp-pv-topbar">
        <div className="lp-pv-logo">
          <div className="lp-pv-logo-ico"/>
          <span>OXIER</span>
        </div>
        <div className="lp-pv-balance">
          <div className="lp-pv-dot"/>
          <span>$10,245.80</span>
        </div>
      </div>
      {/* Asset strip */}
      <div className="lp-pv-assetbar">
        <div className="lp-pv-asset active">
          <span className="lp-pv-aname">BTC/USD</span>
          <span className="lp-pv-aprice up">65,420.10</span>
        </div>
        <div className="lp-pv-asset">
          <span className="lp-pv-aname">EUR/USD</span>
          <span className="lp-pv-aprice down">1.0842</span>
        </div>
        <div className="lp-pv-asset">
          <span className="lp-pv-aname">GOLD</span>
          <span className="lp-pv-aprice up">2,318.5</span>
        </div>
      </div>
      {/* Mini chart */}
      <div className="lp-pv-chart">
        <svg viewBox="0 0 300 100" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D68F" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#00D68F" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {[20, 40, 60, 80].map(y => (
            <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
          ))}
          <path d="M0 80 L25 68 L50 72 L75 55 L100 60 L125 40 L150 48 L175 28 L200 35 L225 18 L250 25 L275 12 L300 16 L300 100 L0 100Z" fill="url(#pvGrad)"/>
          <path d="M0 80 L25 68 L50 72 L75 55 L100 60 L125 40 L150 48 L175 28 L200 35 L225 18 L250 25 L275 12 L300 16" stroke="#00D68F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Green candles */}
          {[[25,55,18],[75,43,16],[125,28,14],[175,16,14],[225,8,12]].map(([x,y,h],i) => (
            <rect key={i} x={x-4} y={y} width="8" height={h} rx="1.5" fill="#00D68F" opacity="0.4"/>
          ))}
          {/* Red candle */}
          {[[50,62,12],[200,27,10]].map(([x,y,h],i) => (
            <rect key={i} x={x-4} y={y} width="8" height={h} rx="1.5" fill="#FF3A4E" opacity="0.4"/>
          ))}
        </svg>
      </div>
      {/* Trade controls */}
      <div className="lp-pv-controls">
        <div className="lp-pv-amount">
          <span className="lp-pv-albl">المبلغ</span>
          <span className="lp-pv-aval">$100</span>
        </div>
        <div className="lp-pv-time">
          <span className="lp-pv-albl">المدة</span>
          <span className="lp-pv-aval">5:00</span>
        </div>
      </div>
      <div className="lp-pv-btns">
        <button className="lp-pv-btn buy">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"/></svg>
          شراء
        </button>
        <button className="lp-pv-btn sell">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
          بيع
        </button>
      </div>
      {/* Floating profit badge */}
      <div className="lp-pv-profit">+$82.00 <span>+82%</span></div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function LandingScreen() {
  const setScreen = useStore(s => s.setScreen);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll spy for nav highlight
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = document.querySelector('.lp-root') as HTMLElement | null;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 40);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal refs
  const trustReveal    = useReveal(0.2);
  const aboutReveal    = useReveal(0.15);
  const featReveal     = useReveal(0.1);
  const stepsReveal    = useReveal(0.1);
  const previewReveal  = useReveal(0.15);
  const faqReveal      = useReveal(0.1);
  const ctaReveal      = useReveal(0.2);

  return (
    <div className="lp-root" dir="rtl" lang="ar">
      {/* ── Background ── */}
      <div className="lp-bg" aria-hidden/>
      <div className="lp-grid" aria-hidden/>

      {/* ══════════════════════════════════
          NAV
      ══════════════════════════════════ */}
      <nav className={`lp-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="lp-nav-logo">
          <div className="lp-logo-ico">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <line x1="2" y1="2" x2="16" y2="16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="16" y1="2" x2="2" y2="16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="lp-logo-text">OXIER</span>
        </div>

        {/* Desktop links */}
        <div className="lp-nav-links">
          <a href="#about" className="lp-nav-link">من نحن</a>
          <a href="#features" className="lp-nav-link">المميزات</a>
          <a href="#how" className="lp-nav-link">كيف تبدأ</a>
          <a href="#faq" className="lp-nav-link">الأسئلة الشائعة</a>
        </div>

        <div className="lp-nav-actions">
          <button className="lp-nav-login" onClick={() => go(setScreen, 'login')}>تسجيل الدخول</button>
          <button className="lp-nav-register" onClick={() => go(setScreen, 'register')}>إنشاء حساب</button>
        </div>

        {/* Mobile hamburger */}
        <button className="lp-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="القائمة">
          <span className={`lp-ham-line${menuOpen ? ' open' : ''}`}/>
          <span className={`lp-ham-line${menuOpen ? ' open' : ''}`}/>
          <span className={`lp-ham-line${menuOpen ? ' open' : ''}`}/>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lp-mobile-menu">
          <a href="#about"    className="lp-mm-link" onClick={() => setMenuOpen(false)}>من نحن</a>
          <a href="#features" className="lp-mm-link" onClick={() => setMenuOpen(false)}>المميزات</a>
          <a href="#how"      className="lp-mm-link" onClick={() => setMenuOpen(false)}>كيف تبدأ</a>
          <a href="#faq"      className="lp-mm-link" onClick={() => setMenuOpen(false)}>الأسئلة الشائعة</a>
          <div className="lp-mm-btns">
            <button className="lp-nav-login full" onClick={() => { setMenuOpen(false); go(setScreen, 'login'); }}>تسجيل الدخول</button>
            <button className="lp-nav-register full" onClick={() => { setMenuOpen(false); go(setScreen, 'register'); }}>إنشاء حساب</button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="lp-hero">
        <div className="lp-hero-content">
          <div className="lp-hero-badge">
            <span className="lp-badge-dot"/>
            أسعار حقيقية · بدون OTC · منذ 2019
          </div>

          <h1 className="lp-hero-h1">
            تداول الأصول الحقيقية<br/>
            <span className="lp-accent">واربح أرباحاً حقيقية.</span>
          </h1>

          <p className="lp-hero-sub">
            انضم إلى أكثر من 50,000 متداول حول العالم. أسعار مباشرة من الأسواق العالمية — ليست بيانات OTC اصطناعية.
          </p>

          <div className="lp-hero-btns">
            <button className="lp-btn-primary" onClick={() => go(setScreen, 'register')}>
              ابدأ التداول الآن — مجاناً
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button className="lp-btn-ghost" onClick={() => go(setScreen, 'login')}>
              لديك حساب؟ سجّل الدخول
            </button>
          </div>

          <div className="lp-hero-trust">
            <div className="lp-trust-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              لا يلزم إيداع فوري
            </div>
            <div className="lp-trust-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              حساب تجريبي $10,000
            </div>
            <div className="lp-trust-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              تسجيل في 30 ثانية
            </div>
          </div>
        </div>

        <div className="lp-hero-visual">
          <HeroChart/>
          <div className="lp-hero-ticker-row">
            {[
              { name: 'BTC/USD', price: '65,420', change: '+2.4%', up: true },
              { name: 'EUR/USD', price: '1.0842', change: '-0.3%', up: false },
              { name: 'GOLD',   price: '2,318',  change: '+1.1%', up: true },
              { name: 'ETH/USD', price: '3,215', change: '+3.2%', up: true },
            ].map((t, i) => (
              <div key={i} className="lp-ticker">
                <span className="lp-ticker-name">{t.name}</span>
                <span className="lp-ticker-price">{t.price}</span>
                <span className={`lp-ticker-change ${t.up ? 'up' : 'down'}`}>{t.change}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          TRUST BAR
      ══════════════════════════════════ */}
      <div ref={trustReveal.ref} className={`lp-trustbar${trustReveal.visible ? ' revealed' : ''}`}>
        {[
          { val: 50000,  suffix: '+', label: 'متداول نشط' },
          { val: 100,    suffix: '+', label: 'أصل للتداول' },
          { val: 82,     suffix: '٪', label: 'معدل العائد' },
          { val: 2019,   suffix: '',  label: 'سنة التأسيس' },
        ].map((s, i) => (
          <div key={i} className="lp-trustbar-item">
            <div className="lp-trustbar-val">
              {trustReveal.visible ? <Counter to={s.val} suffix={s.suffix}/> : '—'}
            </div>
            <div className="lp-trustbar-lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════
          ABOUT
      ══════════════════════════════════ */}
      <section id="about" ref={aboutReveal.ref} className={`lp-section lp-about${aboutReveal.visible ? ' revealed' : ''}`}>
        <div className="lp-section-inner">
          <div className="lp-about-text">
            <span className="lp-label-chip blue">من نحن</span>
            <h2 className="lp-section-h2">مبنيّة للمتداولين الجادّين</h2>
            <p className="lp-section-p">
              تأسست OXIER عام 2019 بهدف واحد: توفير تجربة تداول خيارات ثنائية مدعومة ببيانات سوق حقيقية. على عكس المنصات الأخرى التي تعتمد على أدوات OTC اصطناعية، تعكس كل أصول OXIER الأسعار المباشرة من البورصات العالمية في الوقت الفعلي.
            </p>
            <p className="lp-section-p">
              معتمدة وفق معيار ISO 27001، تخدم OXIER متداولين في مصر والإمارات والمملكة العربية السعودية ومنطقة MENA الواسعة — مع دعم كامل للغتين العربية والإنجليزية.
            </p>
            <div className="lp-cert-row">
              {[
                { icon: '🔒', label: 'ISO 27001' },
                { icon: '✓',  label: 'أسعار حقيقية' },
                { icon: '🌍', label: 'منطقة MENA' },
                { icon: '⚡', label: 'منذ 2019' },
                { icon: '🎧', label: 'دعم 24/7' },
              ].map((c, i) => (
                <div key={i} className="lp-cert-badge">{c.icon} {c.label}</div>
              ))}
            </div>
          </div>

          <div className="lp-about-cards">
            {[
              { val: '99.9٪', label: 'وقت التشغيل', color: '#00D68F' },
              { val: '<100ms', label: 'سرعة التنفيذ', color: '#3B82F6' },
              { val: '24/7', label: 'دعم العملاء', color: '#8B5CF6' },
              { val: '$1M+', label: 'حجم تداول يومي', color: '#F59E0B' },
            ].map((c, i) => (
              <div key={i} className="lp-about-card" style={{ '--accent': c.color } as any}>
                <div className="lp-about-card-val" style={{ color: c.color }}>{c.val}</div>
                <div className="lp-about-card-lbl">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FEATURES
      ══════════════════════════════════ */}
      <section id="features" ref={featReveal.ref} className={`lp-section lp-features-sec${featReveal.visible ? ' revealed' : ''}`}>
        <div className="lp-section-header">
          <span className="lp-label-chip green">المميزات</span>
          <h2 className="lp-section-h2">لماذا تختار OXIER؟</h2>
          <p className="lp-section-sub">كل ما تحتاجه لتتداول بثقة وأمان في مكان واحد.</p>
        </div>
        <div className="lp-features-grid">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="lp-feature-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="lp-feature-ico" style={{ background: f.bg, color: f.color }}>
                {f.icon}
              </div>
              <h3 className="lp-feature-title">{f.title}</h3>
              <p className="lp-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════ */}
      <section id="how" ref={stepsReveal.ref} className={`lp-section lp-how${stepsReveal.visible ? ' revealed' : ''}`}>
        <div className="lp-section-header">
          <span className="lp-label-chip purple">كيف تبدأ</span>
          <h2 className="lp-section-h2">أربع خطوات وستبدأ التداول</h2>
          <p className="lp-section-sub">العملية بسيطة وسريعة — من التسجيل إلى أول صفقة في دقائق.</p>
        </div>
        <div className="lp-steps">
          {STEPS.map((s, i) => (
            <div key={i} className="lp-step" style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="lp-step-num" style={{ color: s.color, borderColor: s.color, boxShadow: `0 0 20px ${s.color}22` }}>
                {s.num}
              </div>
              {i < STEPS.length - 1 && <div className="lp-step-connector"/>}
              <h3 className="lp-step-title">{s.title}</h3>
              <p className="lp-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          PLATFORM PREVIEW
      ══════════════════════════════════ */}
      <section ref={previewReveal.ref} className={`lp-section lp-preview-sec${previewReveal.visible ? ' revealed' : ''}`}>
        <div className="lp-preview-inner">
          <div className="lp-preview-text">
            <span className="lp-label-chip green">المنصة</span>
            <h2 className="lp-section-h2">واجهة تداول احترافية وسهلة الاستخدام</h2>
            <p className="lp-section-p">
              صُمِّمت منصة OXIER لتقديم تجربة تداول سلسة وسريعة على جميع الأجهزة. شارت احترافي، مؤشرات متقدمة، وأدوات رسم متكاملة — كل شيء في متناول يدك.
            </p>
            <ul className="lp-preview-list">
              {[
                'شارت متعدد الأطر الزمنية مع 15+ مؤشر',
                'إشارات تداول ذكية في الوقت الفعلي',
                'سجل صفقات مفصّل مع إحصائيات',
                'واجهة داكنة وفاتحة — اختر ما يريحك',
              ].map((item, i) => (
                <li key={i} className="lp-preview-li">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {item}
                </li>
              ))}
            </ul>
            <button className="lp-btn-primary" style={{ marginTop: 24 }} onClick={() => go(setScreen, 'register')}>
              جرّب المنصة مجاناً
            </button>
          </div>
          <div className="lp-preview-mockup">
            <div className="lp-preview-glow" aria-hidden/>
            <PlatformPreview/>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FAQ
      ══════════════════════════════════ */}
      <section id="faq" ref={faqReveal.ref} className={`lp-section lp-faq-sec${faqReveal.visible ? ' revealed' : ''}`}>
        <div className="lp-section-header">
          <span className="lp-label-chip yellow">الأسئلة الشائعة</span>
          <h2 className="lp-section-h2">كل ما تريد معرفته</h2>
          <p className="lp-section-sub">لم تجد إجابتك؟ فريق الدعم متاح 24/7 للمساعدة.</p>
        </div>
        <div className="lp-faq-list">
          {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a}/>)}
        </div>
      </section>

      {/* ══════════════════════════════════
          FINAL CTA
      ══════════════════════════════════ */}
      <section ref={ctaReveal.ref} className={`lp-final-cta${ctaReveal.visible ? ' revealed' : ''}`}>
        <div className="lp-final-glow" aria-hidden/>
        <div className="lp-final-inner">
          <h2 className="lp-final-h2">هل أنت مستعد للبدء؟</h2>
          <p className="lp-final-p">أنشئ حسابك المجاني في أقل من 30 ثانية وابدأ التداول اليوم.</p>
          <div className="lp-final-btns">
            <button className="lp-btn-primary large" onClick={() => go(setScreen, 'register')}>
              إنشاء حساب مجاني
            </button>
            <button className="lp-btn-ghost" onClick={() => go(setScreen, 'login')}>
              تسجيل الدخول
            </button>
          </div>
          <p className="lp-final-note">لا بيانات بنكية مطلوبة · حساب تجريبي فوري · $0 رسوم اشتراك</p>
        </div>
      </section>

      {/* ══════════════════════════════════
          FOOTER
      ══════════════════════════════════ */}
      <footer className="lp-footer">
        <div className="lp-footer-top">
          <div className="lp-footer-brand">
            <div className="lp-footer-logo">
              <div className="lp-logo-ico small">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <line x1="1" y1="1" x2="11" y2="11" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="11" y1="1" x2="1" y2="11" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span>OXIER</span>
            </div>
            <p className="lp-footer-tagline">منصة التداول الأكثر شفافية في منطقة MENA.</p>
            <div className="lp-footer-socials">
              {/* Telegram */}
              <a href="#" className="lp-social-btn" aria-label="Telegram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
              </a>
              {/* Twitter / X */}
              <a href="#" className="lp-social-btn" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="lp-social-btn" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          <div className="lp-footer-links-group">
            <h4 className="lp-footer-links-title">المنصة</h4>
            <a href="#" className="lp-footer-link" onClick={() => go(setScreen, 'register')}>إنشاء حساب</a>
            <a href="#" className="lp-footer-link" onClick={() => go(setScreen, 'login')}>تسجيل الدخول</a>
            <a href="#features" className="lp-footer-link">المميزات</a>
            <a href="#how" className="lp-footer-link">كيف تبدأ</a>
          </div>

          <div className="lp-footer-links-group">
            <h4 className="lp-footer-links-title">الشركة</h4>
            <a href="#about" className="lp-footer-link">من نحن</a>
            <a href="#faq" className="lp-footer-link">الأسئلة الشائعة</a>
            <a href="#" className="lp-footer-link">المدونة</a>
            <a href="#" className="lp-footer-link">اتصل بنا</a>
          </div>

          <div className="lp-footer-links-group">
            <h4 className="lp-footer-links-title">قانوني</h4>
            <a href="#" className="lp-footer-link">سياسة الخصوصية</a>
            <a href="#" className="lp-footer-link">الشروط والأحكام</a>
            <a href="#" className="lp-footer-link">سياسة AML</a>
            <a href="#" className="lp-footer-link">تحذير المخاطر</a>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <p>© 2019–2026 OXIER Trading. جميع الحقوق محفوظة.</p>
          <p className="lp-footer-risk">
            تنبيه المخاطر: التداول ينطوي على مخاطر. الأداء السابق ليس مؤشراً على النتائج المستقبلية. لا تستثمر أكثر مما تستطيع تحمّل خسارته.
          </p>
        </div>
      </footer>
    </div>
  );
}
