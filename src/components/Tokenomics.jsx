import { motion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const tokenDistribution = [
  { key: 'community', pct: 40, color: '#00e5ff', offset: 0 },
  { key: 'development', pct: 15, color: '#7b2ff7', offset: 40 },
  { key: 'liquidity', pct: 15, color: '#ff2d95', offset: 55 },
  { key: 'team', pct: 15, color: '#00ff88', offset: 70 },
  { key: 'marketing', pct: 15, color: '#ffaa00', offset: 85 },
];

const vestingData = [
  { key: 'community', cliff: '0', vesting: '24', tge: '10%' },
  { key: 'development', cliff: '6', vesting: '36', tge: '0%' },
  { key: 'liquidity', cliff: '0', vesting: '0', tge: '100%' },
  { key: 'team', cliff: '12', vesting: '36', tge: '0%' },
  { key: 'marketing', cliff: '3', vesting: '18', tge: '5%' },
];

export default function Tokenomics() {
  const { t } = useLang();
  const tk = t.tokenomics;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <motion.div className="hero-badge" custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="hero-badge-dot" />
          {tk.badge}
        </motion.div>

        <motion.h1 className="page-hero-title" custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <span className="hero-title-line2">$SWARM</span>
        </motion.h1>

        <motion.p className="hero-description" custom={2} variants={fadeUp} initial="hidden" animate="visible">
          {tk.heroDesc}
        </motion.p>

        {/* Token Metrics */}
        <motion.div className="token-metrics" custom={3} variants={fadeUp} initial="hidden" animate="visible">
          {tk.metrics.map((m, i) => (
            <div key={i} className="token-metric">
              <div className="token-metric-value">{m.value}</div>
              <div className="token-metric-label">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Distribution */}
      <section className="section">
        <div className="section-header">
          <span className="section-tag">{tk.distTag}</span>
          <h2 className="section-title">{tk.distTitle}</h2>
          <p className="section-subtitle">{tk.distSubtitle}</p>
        </div>

        <div className="tokenomics-layout">
          {/* Donut Chart */}
          <motion.div
            className="donut-container"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <svg viewBox="0 0 200 200" className="donut-chart">
              {tokenDistribution.map((seg, i) => {
                const circumference = 2 * Math.PI * 70;
                const strokeLen = (seg.pct / 100) * circumference;
                const strokeOffset = -((seg.offset / 100) * circumference);
                return (
                  <circle
                    key={i}
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="24"
                    strokeDasharray={`${strokeLen} ${circumference - strokeLen}`}
                    strokeDashoffset={strokeOffset}
                    className="donut-segment"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                );
              })}
              <text x="100" y="92" textAnchor="middle" className="donut-center-text">1B</text>
              <text x="100" y="115" textAnchor="middle" className="donut-center-label">$SWARM</text>
            </svg>
          </motion.div>

          {/* Legend */}
          <div className="dist-legend">
            {tokenDistribution.map((seg, i) => (
              <motion.div
                key={i}
                className="dist-legend-item"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="dist-legend-color" style={{ background: seg.color }} />
                <div className="dist-legend-info">
                  <div className="dist-legend-name">{tk.dist[seg.key]}</div>
                  <div className="dist-legend-desc">{tk.distDesc[seg.key]}</div>
                </div>
                <div className="dist-legend-pct">{seg.pct}%</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Token Utility */}
      <section className="section">
        <div className="section-header">
          <span className="section-tag">{tk.utilityTag}</span>
          <h2 className="section-title">{tk.utilityTitle}</h2>
          <p className="section-subtitle">{tk.utilitySubtitle}</p>
        </div>

        <div className="utility-grid">
          {tk.utilities.map((util, i) => (
            <motion.div
              key={i}
              className="utility-card"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="utility-icon">{util.icon}</div>
              <h3 className="utility-title">{util.title}</h3>
              <p className="utility-desc">{util.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vesting Schedule */}
      <section className="section">
        <div className="section-header">
          <span className="section-tag">{tk.vestingTag}</span>
          <h2 className="section-title">{tk.vestingTitle}</h2>
        </div>

        <motion.div
          className="vesting-table-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <table className="vesting-table">
            <thead>
              <tr>
                <th>{tk.vestingHeaders[0]}</th>
                <th>{tk.vestingHeaders[1]}</th>
                <th>{tk.vestingHeaders[2]}</th>
                <th>{tk.vestingHeaders[3]}</th>
                <th>{tk.vestingHeaders[4]}</th>
              </tr>
            </thead>
            <tbody>
              {vestingData.map((row, i) => {
                const seg = tokenDistribution.find(s => s.key === row.key);
                return (
                  <tr key={i}>
                    <td>
                      <span className="vesting-dot" style={{ background: seg.color }} />
                      {tk.dist[row.key]}
                    </td>
                    <td>{seg.pct}%</td>
                    <td>{row.tge}</td>
                    <td>{row.cliff === '0' ? tk.vestingNone : `${row.cliff} ${tk.vestingMonths}`}</td>
                    <td>{row.vesting === '0' ? tk.vestingImmediate : `${row.vesting} ${tk.vestingMonths}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="section">
        <motion.div
          className="cta-box tokenomics-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">{tk.ctaTitle}</h2>
          <p className="cta-desc">{tk.ctaDesc}</p>
          <div className="hero-buttons">
            <Link to="/whitepaper" className="btn-primary">{tk.ctaBtn1}</Link>
            <Link to="/" className="btn-secondary">{tk.ctaBtn2}</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
