import { motion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';

const icons = ['🌐', '⚡', '🔍', '🔄'];
const colors = ['#00e5ff', '#ff2d95', '#7b2ff7', '#00e5ff'];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Features() {
  const { t } = useLang();

  return (
    <section className="section features" id="features">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">{t.features.tag}</span>
        <h2 className="section-title">{t.features.title}</h2>
        <p className="section-subtitle">{t.features.subtitle}</p>
      </motion.div>

      <div className="features-grid">
        {t.features.cards.map((card, i) => (
          <motion.div
            key={i}
            className="feature-card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <div className="feature-card-glow" style={{ background: colors[i] }} />
            <div
              className="feature-icon"
              style={{ background: `${colors[i]}15`, border: `1px solid ${colors[i]}30` }}
            >
              {icons[i]}
            </div>
            <h3 className="feature-card-title">{card.title}</h3>
            <p className="feature-card-desc">{card.desc}</p>
            <span className="feature-card-tag">{card.tag}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
