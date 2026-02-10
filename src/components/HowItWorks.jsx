import { motion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';

const stepIcons = ['🧠', '✂️', '🐝', '⚡', '📦'];
const stepNums = ['01', '02', '03', '04', '05'];

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function HowItWorks() {
  const { t } = useLang();

  return (
    <section className="section how-it-works" id="how-it-works">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">{t.howItWorks.tag}</span>
        <h2 className="section-title">{t.howItWorks.title}</h2>
        <p className="section-subtitle">{t.howItWorks.subtitle}</p>
      </motion.div>

      <div className="flow-container">
        <div className="flow-line" />
        <div className="flow-line-glow" />

        {t.howItWorks.steps.map((step, i) => (
          <motion.div
            key={i}
            className="flow-step"
            custom={i}
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
          >
            <div className="flow-step-indicator" style={{ background: 'var(--bg-primary)' }}>
              {stepNums[i]}
            </div>
            <div className="flow-step-content">
              <h3 className="flow-step-title">
                <span className="flow-step-icon">{stepIcons[i]}</span>
                {step.title}
              </h3>
              <p className="flow-step-desc">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
