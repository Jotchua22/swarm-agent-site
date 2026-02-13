import { useState, useCallback } from 'react';
import { useLang } from '../i18n/LanguageContext';

const CONTRACT_ADDRESS = '0x21C1EdBDd48468a59E00CA71F0B40b3c5918F7a3';

export default function TickerBar() {
  const { t } = useLang();
  const tk = t.ticker || {};
  const [copied, setCopied] = useState(false);

  const copyCA = useCallback(() => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <div className="ticker-bar">
      <div className="ticker-ca-strip">
        <span className="ticker-ca-label">CA</span>
        <span className="ticker-ca-addr">{CONTRACT_ADDRESS}</span>
        <button className="ticker-copy-btn" onClick={copyCA} title={tk.copyCA || 'Copy Contract Address'}>
          {copied ? (
            <span className="ticker-copied-text">{tk.copied || 'Copied!'}</span>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
