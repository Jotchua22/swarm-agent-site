import { motion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const tocIds = ['abstract', 'problem', 'solution', 'architecture', 'token', 'roadmap'];

export default function Whitepaper() {
  const { t } = useLang();
  const wp = t.whitepaper;
  const [activeSection, setActiveSection] = useState('abstract');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      for (const id of [...tocIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="page-hero wp-hero">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <motion.div className="hero-badge" custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="hero-badge-dot" />
          {wp.badge}
        </motion.div>

        <motion.h1 className="page-hero-title" custom={1} variants={fadeUp} initial="hidden" animate="visible">
          <span className="hero-title-line1">{wp.heroTitle1}</span>
          <span className="hero-title-line2">{wp.heroTitle2}</span>
        </motion.h1>

        <motion.p className="hero-description" custom={2} variants={fadeUp} initial="hidden" animate="visible">
          {wp.heroDesc}
        </motion.p>

        <motion.div className="wp-version" custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <span>{wp.version}</span>
          <span className="wp-version-sep">|</span>
          <span>{wp.date}</span>
        </motion.div>
      </section>

      {/* Content with ToC sidebar */}
      <div className="wp-layout">
        {/* Table of Contents - Sidebar */}
        <aside className="wp-toc">
          <div className="wp-toc-sticky">
            <div className="wp-toc-title">{wp.tocTitle}</div>
            {tocIds.map((id, i) => (
              <button
                key={id}
                className={`wp-toc-item ${activeSection === id ? 'active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                <span className="wp-toc-num">{String(i + 1).padStart(2, '0')}</span>
                {wp.toc[id]}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="wp-content">
          {/* 01 - Abstract */}
          <motion.section
            id="abstract"
            className="wp-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="wp-section-num">01</div>
            <h2 className="wp-section-title">{wp.toc.abstract}</h2>
            <div className="wp-text">{wp.abstract.p1}</div>
            <div className="wp-text">{wp.abstract.p2}</div>
            <div className="wp-highlight-box">
              <div className="wp-highlight-title">{wp.abstract.highlightTitle}</div>
              <div className="wp-highlight-text">{wp.abstract.highlightText}</div>
            </div>
          </motion.section>

          {/* 02 - Problem */}
          <motion.section
            id="problem"
            className="wp-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="wp-section-num">02</div>
            <h2 className="wp-section-title">{wp.toc.problem}</h2>
            <div className="wp-text">{wp.problem.p1}</div>
            <div className="wp-problem-grid">
              {wp.problem.points.map((pt, i) => (
                <div key={i} className="wp-problem-card">
                  <div className="wp-problem-icon">{pt.icon}</div>
                  <h4 className="wp-problem-title">{pt.title}</h4>
                  <p className="wp-problem-desc">{pt.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 03 - Solution */}
          <motion.section
            id="solution"
            className="wp-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="wp-section-num">03</div>
            <h2 className="wp-section-title">{wp.toc.solution}</h2>
            <div className="wp-text">{wp.solution.p1}</div>
            <div className="wp-solution-features">
              {wp.solution.features.map((f, i) => (
                <div key={i} className="wp-solution-feature">
                  <div className="wp-solution-feature-num">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <h4 className="wp-solution-feature-title">{f.title}</h4>
                    <p className="wp-solution-feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 04 - Architecture */}
          <motion.section
            id="architecture"
            className="wp-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="wp-section-num">04</div>
            <h2 className="wp-section-title">{wp.toc.architecture}</h2>
            <div className="wp-text">{wp.architecture.p1}</div>

            <div className="wp-arch-diagram">
              {wp.architecture.layers.map((layer, i) => (
                <div key={i} className="wp-arch-layer">
                  <div className="wp-arch-layer-label">{layer.label}</div>
                  <div className="wp-arch-layer-box" style={{ borderColor: layer.color }}>
                    <div className="wp-arch-layer-items">
                      {layer.items.map((item, j) => (
                        <span key={j} className="wp-arch-item" style={{ color: layer.color }}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 05 - Token */}
          <motion.section
            id="token"
            className="wp-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="wp-section-num">05</div>
            <h2 className="wp-section-title">{wp.toc.token}</h2>
            <div className="wp-text">{wp.token.p1}</div>
            <div className="wp-token-flows">
              {wp.token.flows.map((flow, i) => (
                <div key={i} className="wp-token-flow">
                  <div className="wp-token-flow-icon">{flow.icon}</div>
                  <div className="wp-token-flow-arrow">{'\u2192'}</div>
                  <div>
                    <div className="wp-token-flow-title">{flow.title}</div>
                    <div className="wp-token-flow-desc">{flow.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="wp-text wp-cta-inline">
              <Link to="/tokenomics" className="wp-inline-link">{wp.token.linkText} &rarr;</Link>
            </div>
          </motion.section>

          {/* 06 - Roadmap */}
          <motion.section
            id="roadmap"
            className="wp-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="wp-section-num">06</div>
            <h2 className="wp-section-title">{wp.toc.roadmap}</h2>
            <div className="wp-roadmap">
              {wp.roadmap.phases.map((phase, i) => (
                <div key={i} className={`wp-roadmap-phase ${i === 0 ? 'active' : ''}`}>
                  <div className="wp-roadmap-phase-header">
                    <div className="wp-roadmap-phase-dot" />
                    <div className="wp-roadmap-phase-label">{phase.label}</div>
                    <div className="wp-roadmap-phase-title">{phase.title}</div>
                  </div>
                  <ul className="wp-roadmap-items">
                    {phase.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Disclaimer */}
          <motion.div
            className="wp-disclaimer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4>{wp.disclaimer.title}</h4>
            <p>{wp.disclaimer.text}</p>
          </motion.div>
        </main>
      </div>

      {/* Bottom CTA */}
      <section className="section">
        <motion.div
          className="cta-box"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">{wp.ctaTitle}</h2>
          <p className="cta-desc">{wp.ctaDesc}</p>
          <div className="hero-buttons">
            <Link to="/tokenomics" className="btn-primary">{wp.ctaBtn1}</Link>
            <Link to="/" className="btn-secondary">{wp.ctaBtn2}</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
