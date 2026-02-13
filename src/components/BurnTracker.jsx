import { useState, useEffect, useRef } from 'react';
import { useLang } from '../i18n/LanguageContext';

const TOTAL_SUPPLY = 1_000_000_000;
const INITIAL_BURNED = 42_150_000;
const DAILY_RATE = 850_000;

function randomHash() {
  const chars = '0123456789abcdef';
  let h = '0x';
  for (let i = 0; i < 8; i++) h += chars[Math.floor(Math.random() * 16)];
  return h + '...' + chars[Math.floor(Math.random() * 16)].repeat(4);
}

function randomAmount() {
  return (Math.random() * 50000 + 1000).toFixed(0);
}

export default function BurnTracker() {
  const { t } = useLang();
  const bt = t.burn || {};
  const [burned, setBurned] = useState(INITIAL_BURNED);
  const [events, setEvents] = useState([]);
  const counterRef = useRef(null);

  // Increment burn counter
  useEffect(() => {
    const iv = setInterval(() => {
      const inc = Math.floor(Math.random() * 8000) + 2000;
      setBurned(prev => prev + inc);
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  // Fake burn events
  useEffect(() => {
    const addEvent = () => {
      const amt = randomAmount();
      setEvents(prev => [{
        id: Date.now(),
        hash: randomHash(),
        amount: amt,
        time: 'just now',
      }, ...prev].slice(0, 8));
    };
    addEvent();
    const iv = setInterval(addEvent, 5000);
    return () => clearInterval(iv);
  }, []);

  // Age event times
  useEffect(() => {
    const iv = setInterval(() => {
      setEvents(prev => prev.map((e, i) => ({
        ...e,
        time: i === 0 ? 'just now' : `${(i * 5)}s ago`,
      })));
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const burnPct = ((burned / TOTAL_SUPPLY) * 100).toFixed(2);
  const remaining = TOTAL_SUPPLY - burned;
  const circumference = 2 * Math.PI * 90;
  const strokeDash = (burned / TOTAL_SUPPLY) * circumference;

  const formatNum = (n) => {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return n.toLocaleString();
  };

  return (
    <section className="section burn-section">
      <div className="section-header">
        <span className="section-tag">{bt.tag || '// Deflationary'}</span>
        <h2 className="section-title">{bt.title || 'The Furnace'}</h2>
        <p className="section-subtitle">{bt.subtitle || 'Watch $SWARM tokens being burned in real-time'}</p>
      </div>

      <div className="burn-container">
        {/* Left - SVG Ring + Counter */}
        <div className="burn-visual">
          <div className="burn-ring-wrapper">
            <svg className="burn-ring" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle
                cx="100" cy="100" r="90"
                fill="none"
                stroke="url(#burnGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - strokeDash}
                transform="rotate(-90 100 100)"
                className="burn-ring-progress"
              />
              <defs>
                <linearGradient id="burnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b35" />
                  <stop offset="50%" stopColor="#ff2d95" />
                  <stop offset="100%" stopColor="#ff8c00" />
                </linearGradient>
              </defs>
            </svg>
            <div className="burn-counter" ref={counterRef}>
              <span className="burn-counter-value">{formatNum(burned)}</span>
              <span className="burn-counter-label">{bt.burned || 'TOKENS BURNED'}</span>
            </div>
            {/* Fire particles */}
            <div className="burn-particles">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="burn-particle"
                  style={{
                    left: `${30 + Math.random() * 40}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right - Event Feed */}
        <div className="burn-feed">
          <div className="burn-feed-header">
            <span className="burn-feed-title">{bt.feedTitle || 'Live Burn Events'}</span>
            <span className="burn-feed-live">
              <span className="burn-live-dot" />
              LIVE
            </span>
          </div>
          <div className="burn-feed-list">
            {events.map((ev) => (
              <div key={ev.id} className="burn-event">
                <span className="burn-event-icon">🔥</span>
                <div className="burn-event-info">
                  <span className="burn-event-hash">{ev.hash}</span>
                  <span className="burn-event-time">{ev.time}</span>
                </div>
                <span className="burn-event-amount">-{Number(ev.amount).toLocaleString()} $SWARM</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="burn-stats">
        <div className="burn-stat">
          <span className="burn-stat-value">{formatNum(burned)}</span>
          <span className="burn-stat-label">{bt.totalBurned || 'Total Burned'}</span>
        </div>
        <div className="burn-stat">
          <span className="burn-stat-value">{formatNum(DAILY_RATE)}</span>
          <span className="burn-stat-label">{bt.dailyRate || 'Daily Burn Rate'}</span>
        </div>
        <div className="burn-stat">
          <span className="burn-stat-value">{formatNum(remaining)}</span>
          <span className="burn-stat-label">{bt.remaining || 'Remaining Supply'}</span>
        </div>
        <div className="burn-stat">
          <span className="burn-stat-value burn-stat-pct">{burnPct}%</span>
          <span className="burn-stat-label">{bt.supplyBurned || 'Supply Burned'}</span>
        </div>
      </div>
    </section>
  );
}
