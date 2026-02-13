import { useState, useEffect } from 'react';
import { useLang } from '../i18n/LanguageContext';

const SWARM_PRICE = 0.00847;
const UNISWAP_URL = 'https://app.uniswap.org/swap?chain=base&outputCurrency=0x21C1EdBDd48468a59E00CA71F0B40b3c5918F7a3';

export default function BuyWidget() {
  const { t } = useLang();
  const bw = t.buyWidget || {};
  const [open, setOpen] = useState(false);
  const [ethAmount, setEthAmount] = useState('');
  const [price, setPrice] = useState(SWARM_PRICE);
  const [slippage, setSlippage] = useState(0.5);

  // Simulate price fluctuation
  useEffect(() => {
    const iv = setInterval(() => {
      setPrice(p => {
        const delta = (Math.random() - 0.35) * 0.0002;
        return Math.max(0.001, +(p + delta).toFixed(5));
      });
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const ethPrice = 3245.67; // Simulated ETH price
  const swarmOut = ethAmount ? ((parseFloat(ethAmount) * ethPrice) / price).toFixed(0) : '0';
  const minReceived = ethAmount
    ? (parseFloat(swarmOut) * (1 - slippage / 100)).toFixed(0)
    : '0';

  return (
    <div className={`buy-widget ${open ? 'buy-widget--open' : ''}`}>
      {/* Collapsed: pulsing pill */}
      {!open && (
        <button className="buy-pill" onClick={() => setOpen(true)}>
          <span className="buy-pill-pulse" />
          <span className="buy-pill-text">{bw.buyBtn || 'BUY $SWARM'}</span>
          <span className="buy-pill-price">${price.toFixed(5)}</span>
        </button>
      )}

      {/* Expanded: swap card */}
      {open && (
        <div className="buy-card">
          <div className="buy-card-header">
            <span className="buy-card-title">{bw.swapTitle || 'Quick Swap'}</span>
            <button className="buy-card-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* From ETH */}
          <div className="buy-input-group">
            <div className="buy-input-label">
              <span>{bw.from || 'From'}</span>
              <span className="buy-input-token">ETH</span>
            </div>
            <input
              type="number"
              className="buy-input"
              placeholder="0.0"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div className="buy-swap-arrow">↓</div>

          {/* To SWARM */}
          <div className="buy-input-group">
            <div className="buy-input-label">
              <span>{bw.to || 'To (estimated)'}</span>
              <span className="buy-input-token">$SWARM</span>
            </div>
            <div className="buy-output">{Number(swarmOut).toLocaleString()}</div>
          </div>

          {/* Details */}
          <div className="buy-details">
            <div className="buy-detail-row">
              <span>{bw.priceLabel || 'Price'}</span>
              <span>1 $SWARM = ${price.toFixed(5)}</span>
            </div>
            <div className="buy-detail-row">
              <span>{bw.slippage || 'Slippage'}</span>
              <div className="buy-slippage-btns">
                {[0.5, 1, 3].map(s => (
                  <button
                    key={s}
                    className={`buy-slippage-btn ${slippage === s ? 'active' : ''}`}
                    onClick={() => setSlippage(s)}
                  >{s}%</button>
                ))}
              </div>
            </div>
            <div className="buy-detail-row">
              <span>{bw.minReceived || 'Min. Received'}</span>
              <span>{Number(minReceived).toLocaleString()} $SWARM</span>
            </div>
          </div>

          {/* Swap button */}
          <a
            href={UNISWAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="buy-swap-btn"
          >
            {bw.swapBtn || 'Swap on Uniswap'} ↗
          </a>

          <div className="buy-card-footer">
            <span className="buy-chain-badge">
              <span className="buy-chain-dot" />
              Base Network
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
