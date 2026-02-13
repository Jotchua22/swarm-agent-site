import { motion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';

export default function CtaSection() {
  const { t } = useLang();

  return (
    <section className="section cta-section" id="cta">
      <motion.div
        className="cta-box"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="cta-title">{t.cta.title}</h2>
        <p className="cta-desc">{t.cta.desc}</p>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >{t.cta.btn}</a>
      </motion.div>
    </section>
  );
}
