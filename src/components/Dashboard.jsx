import { motion } from 'framer-motion';
import DashboardHeader from './DashboardHeader';
import SwarmDeployer from './SwarmDeployer';
import AgentActivityFeed from './AgentActivityFeed';

export default function Dashboard() {
  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <DashboardHeader />
      <div className="dash-grid">
        <SwarmDeployer />
        <AgentActivityFeed />
      </div>
    </motion.div>
  );
}
