import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';

const statusColors = {
  success: '#00e5ff',
  running: '#7b2ff7',
  warning: '#ffb300',
};

const initialEvents = [
  { id: 1, agent: 'Agent-0x7A3', task: 'twitter_post', status: 'success', time: '2s ago' },
  { id: 2, agent: 'Agent-0xB91', task: 'data_scrape', status: 'running', time: '5s ago' },
  { id: 3, agent: 'Agent-0xF42', task: 'code_review', status: 'success', time: '12s ago' },
  { id: 4, agent: 'Agent-0x1D8', task: 'discord_mod', status: 'success', time: '18s ago' },
  { id: 5, agent: 'Agent-0xC55', task: 'api_test', status: 'warning', time: '25s ago' },
  { id: 6, agent: 'Agent-0x3E9', task: 'deploy_check', status: 'running', time: '31s ago' },
];

const randomTasks = ['twitter_post', 'data_scrape', 'code_review', 'discord_mod', 'api_test', 'deploy_check', 'tg_monitor', 'ci_pipeline'];
const randomStatuses = ['success', 'success', 'success', 'running', 'warning'];

function randomHex() {
  return Math.random().toString(16).slice(2, 5).toUpperCase();
}

export default function AgentActivityFeed() {
  const { t } = useLang();
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = {
        id: Date.now(),
        agent: `Agent-0x${randomHex()}`,
        task: randomTasks[Math.floor(Math.random() * randomTasks.length)],
        status: randomStatuses[Math.floor(Math.random() * randomStatuses.length)],
        time: 'just now',
      };
      setEvents((prev) => [newEvent, ...prev.slice(0, 7)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="dash-card dash-feed"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="dash-card-title">
        <span className="dash-card-icon">📡</span>
        {t.dashboard.feed.title}
        <span className="feed-live-dot" />
      </h2>

      <div className="feed-list">
        <AnimatePresence initial={false}>
          {events.map((ev) => (
            <motion.div
              key={ev.id}
              className="feed-item"
              initial={{ opacity: 0, height: 0, x: -20 }}
              animate={{ opacity: 1, height: 'auto', x: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="feed-item-dot" style={{ background: statusColors[ev.status] }} />
              <div className="feed-item-content">
                <span className="feed-agent">{ev.agent}</span>
                <span className="feed-task">{ev.task}</span>
              </div>
              <span className="feed-status" style={{ color: statusColors[ev.status] }}>
                {t.dashboard.feed.statuses[ev.status]}
              </span>
              <span className="feed-time">{ev.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
