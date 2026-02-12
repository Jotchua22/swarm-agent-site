import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">SUBAGENT SWARM</div>
          <p className="footer-tagline">{t.footer.tagline}</p>
        </div>
        <div className="footer-links">
          <Link to="/tokenomics">$SWARM</Link>
          <Link to="/whitepaper">{t.nav.whitepaper}</Link>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter/X</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-text">
          &copy; 2026 <span>SubAgent Swarm</span> &mdash; {t.footer.built}
        </p>
      </div>
    </footer>
  );
}
