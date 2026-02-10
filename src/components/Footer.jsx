import { useLang } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <p className="footer-text">
        © 2025 <span>SubAgent Swarm</span> — {t.footer}
      </p>
    </footer>
  );
}
