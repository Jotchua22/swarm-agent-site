import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useLang } from '../i18n/LanguageContext';
import LangSwitcher from './LangSwitcher';
import WalletButton from './WalletButton';

export default function Navbar() {
  const { t } = useLang();
  const { isConnected } = useAccount();

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="navbar-logo">SUBAGENT SWARM</div>
      {!isConnected && (
        <ul className="navbar-links">
          <li><a href="#features">{t.nav.features}</a></li>
          <li><a href="#how-it-works">{t.nav.howItWorks}</a></li>
          <li><a href="#cta">{t.nav.getStarted}</a></li>
        </ul>
      )}
      <div className="navbar-right">
        <WalletButton />
        <LangSwitcher />
      </div>
    </motion.nav>
  );
}
