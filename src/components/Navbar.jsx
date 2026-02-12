import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';
import LangSwitcher from './LangSwitcher';
import WalletButton from './WalletButton';

export default function Navbar() {
  const { t } = useLang();
  const { isConnected } = useAccount();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link to="/" className="navbar-logo">SUBAGENT SWARM</Link>
      <ul className="navbar-links">
        {isLanding && !isConnected && (
          <>
            <li><a href="#features">{t.nav.features}</a></li>
            <li><a href="#how-it-works">{t.nav.howItWorks}</a></li>
          </>
        )}
        <li><Link to="/tokenomics" className={location.pathname === '/tokenomics' ? 'nav-active' : ''}>{t.nav.tokenomics}</Link></li>
        <li><Link to="/whitepaper" className={location.pathname === '/whitepaper' ? 'nav-active' : ''}>{t.nav.whitepaper}</Link></li>
      </ul>
      <div className="navbar-right">
        <WalletButton />
        <LangSwitcher />
      </div>
    </motion.nav>
  );
}
