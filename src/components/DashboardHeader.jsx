import { useAccount, useBalance } from 'wagmi';
import { motion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';

export default function DashboardHeader() {
  const { address } = useAccount();
  const { t } = useLang();
  const { data: balance } = useBalance({
    address,
    query: { refetchInterval: 4000 },
  });

  const shortAddr = address
    ? `${address.slice(0, 6)}...${address.slice(-6)}`
    : '';

  return (
    <motion.div
      className="dash-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dash-header-left">
        <h1 className="dash-title">{t.dashboard.title}</h1>
        <p className="dash-subtitle">{t.dashboard.subtitle}</p>
      </div>
      <div className="dash-header-right">
        <div className="dash-wallet-info">
          <div className="dash-wallet-addr">
            <span className="dash-wallet-dot" />
            {shortAddr}
          </div>
          <div className="dash-wallet-balance">
            {balance ? (
              <>{parseFloat(balance.formatted).toFixed(4)} <span className="dash-eth">ETH</span></>
            ) : (
              <span className="dash-loading">{t.dashboard.loading}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
