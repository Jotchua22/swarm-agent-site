import { useState, useEffect, useCallback } from 'react';
import { useLang } from '../i18n/LanguageContext';

const CONTRACT_ADDRESS = '0x21C1...F7a3';
const FULL_CA = '0x21C1EdBDd48468a59E00CA71F0B40b3c5918F7a3';

export default function TickerBar() {
  const { t } = useLang();
  const tk = t.ticker || {};

  const [price, setPrice] = useState(0.00847);
  const [change24h, setChange24h] = useState(12.4);
  const [mcap, setMcap] = useState(8470000);
  const [holders, setHolders] = useState(4821);
  const [burned, setBurned] = useState(42150000);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setPrice(p => {
        const delta = (Math.random() - 0.35) * 0.0002;
        return Math.max(0.001, +(p + delta).toFixed(5));
      });
      setChange24h(c => {
        const delta = (Math.random() - 0.4) * 0.3;
        return +(c + delta).toFixed(1);
      });
      setMcap(m => {
        const delta = (Math.random() - 0.35) * 15000;
        return Math.max(100000, Math.round(m + delta));
      });
      setHolders(h => {
        if (Math.random() > 0.7) return h + 1;
        return h;
      });
      setBurned(b => {
        if (Math.random() > 0.5) return b + Math.floor(Math.random() * 5000);
        return b;
      });
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  const copyCA = useCallback(() => {
    navigator.clipboard.writeText(FULL_CA).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const formatNum = (n) => {
    if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return n.toLocaleString();
  };

  const items = (
    <>
      <div className="ticker-item">
        <span className="ticker-label">{tk.price || '$SWARM'}</span>
        <span className="ticker-value ticker-price">${price.toFixed(5)}</span>
      </div>
      <div className="ticker-sep">|</div>
      <div className="ticker-item">
        <span className="ticker-label">{tk.change || '24H'}</span>
        <span className={`ticker-value ${change24h >= 0 ? 'ticker-green' : 'ticker-red'}`}>
          {change24h >= 0 ? '+' : ''}{change24h}%
        </span>
      </div>
      <div className="ticker-sep">|</div>
      <div className="ticker-item">
        <span className="ticker-label">{tk.mcap || 'MCap'}</span>
        <span className="ticker-value">${formatNum(mcap)}</span>
      </div>
      <div className="ticker-sep">|</div>
      <div className="ticker-item">
        <span className="ticker-label">{tk.holders || 'Holders'}</span>
        <span className="ticker-value ticker-green">{formatNum(holders)}</span>
      </div>
      <div className="ticker-sep">|</div>
      <div className="ticker-item">
        <span className="ticker-label">{tk.burned || 'Burned'}</span>
        <span className="ticker-value ticker-orange">{formatNum(burned)}</span>
      </div>
      <div className="ticker-sep">|</div>
      <button className="ticker-ca" onClick={copyCA} title={tk.copyCA || 'Copy Contract Address'}>
        <span className="ticker-ca-label">CA</span>
        <span className="ticker-ca-addr">{CONTRACT_ADDRESS}</span>
        <span className={`ticker-copied ${copied ? 'show' : ''}`}>{tk.copied || 'Copied!'}</span>
        {!copied && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        )}
      </button>
      <div className="ticker-sep">|</div>
      <div className="ticker-item ticker-chain">
        <span className="ticker-chain-dot" />
        <span className="ticker-label">Base</span>
      </div>
    </>
  );

  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        <div className="ticker-content">
          {items}
        </div>
        <div className="ticker-content ticker-clone" aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
}
