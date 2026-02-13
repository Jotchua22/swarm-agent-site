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

  const launchBtnStyle = {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #00f0ff',
    color: '#00f0ff',
    textShadow: '0 0 8px rgba(0,240,255,0.9), 0 0 16px rgba(0,240,255,0.45)',
    boxShadow: '0 0 10px rgba(0,240,255,0.6)',
    transition: 'all 0.3s ease',
    textDecoration: 'none'
  };

  const launchBtnHover = {
    boxShadow:
      '0 0 10px rgba(0,240,255,0.75), 0 0 24px rgba(0,240,255,0.5), 0 0 40px rgba(0,240,255,0.3)',
    textShadow: '0 0 10px rgba(0,240,255,1), 0 0 20px rgba(0,240,255,0.7), 0 0 30px rgba(0,240,255,0.45)',
    transform: 'translateY(-2px)'
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link to="/" className="navbar-logo">SUBAGENT SWARM</Link>
      <ul className="navbar-links">
        <li>
          {isLanding ? (
            <a href="#features">{t.nav.features}</a>
          ) : (
            <Link to="/#features">{t.nav.features}</Link>
          )}
        </li>
        <li>
          {isLanding ? (
            <a href="#how-it-works">{t.nav.howItWorks}</a>
          ) : (
            <Link to="/#how-it-works">{t.nav.howItWorks}</Link>
          )}
        </li>
        <li>
          <Link
            to="/tokenomics"
            className={location.pathname === '/tokenomics' ? 'nav-active' : ''}
          >
            {t.nav.tokenomics}
          </Link>
        </li>
        <li>
          <Link
            to="/whitepaper"
            className={location.pathname === '/whitepaper' ? 'nav-active' : ''}
          >
            {t.nav.whitepaper}
          </Link>
        </li>

        {isConnected && (
          <li>
            <Link
              to="/dashboard"
              style={launchBtnStyle}
              onMouseEnter={(e) => {
                Object.assign(e.target.style, launchBtnHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, launchBtnStyle);
              }}
            >
              {t.nav.launchApp}
            </Link>
          </li>
        )}
      </ul>
      <div className="navbar-right">
        <WalletButton />
        <LangSwitcher />
      </div>
    </motion.nav>
  );
}
