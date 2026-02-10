import { motion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';
import LangSwitcher from './LangSwitcher';

export default function Navbar() {
  const { t } = useLang();

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="navbar-logo">SUBAGENT SWARM</div>
      <ul className="navbar-links">
        <li><a href="#features">{t.nav.features}</a></li>
        <li><a href="#how-it-works">{t.nav.howItWorks}</a></li>
        <li><a href="#cta">{t.nav.getStarted}</a></li>
      </ul>
      <div className="navbar-right">
        <button className="navbar-cta">{t.nav.launchApp}</button>
        <LangSwitcher />
      </div>
    </motion.nav>
  );
}
