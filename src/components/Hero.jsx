import { motion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const statValues = ['1000+', '< 5min', '99.9%', '∞'];

export default function Hero() {
  const { t } = useLang();
  const statLabels = [t.hero.stats.agents, t.hero.stats.completion, t.hero.stats.uptime, t.hero.stats.scale];

  return (
    <section className="hero">
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-glow hero-glow-3" />

      <motion.div className="hero-badge" custom={0} variants={fadeUp} initial="hidden" animate="visible">
        <span className="hero-badge-dot" />
        {t.hero.badge}
      </motion.div>

      <motion.h1 className="hero-title" custom={1} variants={fadeUp} initial="hidden" animate="visible">
        <span className="hero-title-line1">SubAgent</span>
        <span className="hero-title-line2">Swarm</span>
      </motion.h1>

      <motion.p className="hero-description" custom={2} variants={fadeUp} initial="hidden" animate="visible">
        {t.hero.desc}
      </motion.p>

      <motion.div className="hero-buttons" custom={3} variants={fadeUp} initial="hidden" animate="visible">
        <button className="btn-primary">{t.hero.btnPrimary}</button>
        <button className="btn-secondary">{t.hero.btnSecondary}</button>
      </motion.div>

      <motion.div className="hero-stats" custom={4} variants={fadeUp} initial="hidden" animate="visible">
        {statValues.map((val, i) => (
          <div key={i} className="hero-stat">
            <div className="hero-stat-value">{val}</div>
            <div className="hero-stat-label">{statLabels[i]}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
