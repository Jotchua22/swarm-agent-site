import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';

const agentTypes = [
  { id: 'social', icon: '🌐', color: '#00e5ff' },
  { id: 'dev', icon: '⚡', color: '#ff2d95' },
  { id: 'data', icon: '🔍', color: '#7b2ff7' },
  { id: 'workflow', icon: '🔄', color: '#00e5ff' },
];

export default function SwarmDeployer() {
  const { t } = useLang();
  const [selected, setSelected] = useState('social');
  const [count, setCount] = useState(25);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const handleDeploy = () => {
    setDeploying(true);
    setDeployed(false);
    setTimeout(() => {
      setDeploying(false);
      setDeployed(true);
      setTimeout(() => setDeployed(false), 3000);
    }, 2000);
  };

  return (
    <motion.div
      className="dash-card dash-deployer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="dash-card-title">
        <span className="dash-card-icon">🐝</span>
        {t.dashboard.deployer.title}
      </h2>

      <div className="deployer-types">
        {agentTypes.map((at) => (
          <button
            key={at.id}
            className={`deployer-type ${selected === at.id ? 'deployer-type--active' : ''}`}
            style={selected === at.id ? { borderColor: at.color, boxShadow: `0 0 12px ${at.color}30` } : {}}
            onClick={() => setSelected(at.id)}
          >
            <span className="deployer-type-icon">{at.icon}</span>
            <span className="deployer-type-label">{t.dashboard.deployer.types[at.id]}</span>
          </button>
        ))}
      </div>

      <div className="deployer-slider">
        <div className="deployer-slider-header">
          <span className="deployer-slider-label">{t.dashboard.deployer.count}</span>
          <span className="deployer-slider-value">{count}</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="deployer-range"
        />
        <div className="deployer-slider-minmax">
          <span>1</span>
          <span>100</span>
        </div>
      </div>

      <button
        className="deployer-btn"
        onClick={handleDeploy}
        disabled={deploying}
      >
        {deploying ? (
          <>{t.dashboard.deployer.deploying}<span className="deployer-spinner" /></>
        ) : deployed ? (
          <>{t.dashboard.deployer.deployed}</>
        ) : (
          <>{t.dashboard.deployer.deploy} ({count} {t.dashboard.deployer.agents})</>
        )}
      </button>
    </motion.div>
  );
}
