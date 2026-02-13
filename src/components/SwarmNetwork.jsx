import { useState, useEffect, useRef, useCallback } from 'react';
import { useLang } from '../i18n/LanguageContext';

const AGENT_TYPES = [
  'Social Bot', 'Data Miner', 'Code Agent', 'Monitor',
  'Trader', 'Analyst', 'Scraper', 'Validator',
  'Bridge', 'Deployer', 'Scanner', 'Oracle',
  'Relay', 'Indexer', 'Router', 'Executor',
];

const ORBITS = [
  { radius: 100, count: 5, speed: 0.008 },
  { radius: 160, count: 6, speed: -0.005 },
  { radius: 220, count: 5, speed: 0.003 },
];

function generateNodes() {
  const nodes = [];
  let idx = 0;
  ORBITS.forEach((orbit, oi) => {
    for (let i = 0; i < orbit.count; i++) {
      const angle = (2 * Math.PI * i) / orbit.count;
      nodes.push({
        id: idx,
        orbit: oi,
        baseAngle: angle,
        radius: orbit.radius,
        speed: orbit.speed,
        type: AGENT_TYPES[idx % AGENT_TYPES.length],
        status: Math.random() > 0.15 ? 'active' : 'idle',
      });
      idx++;
    }
  });
  return nodes;
}

export default function SwarmNetwork() {
  const { t } = useLang();
  const sn = t.swarmNet || {};
  const svgRef = useRef(null);
  const [nodes] = useState(generateNodes);
  const [time, setTime] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dataFlows, setDataFlows] = useState([]);
  const [stats, setStats] = useState({
    agents: 16,
    tasks: 847,
    efficiency: 99.2,
    uptime: 99.97,
  });

  const cx = 280;
  const cy = 280;

  // Animation loop
  useEffect(() => {
    let raf;
    const animate = () => {
      setTime(t => t + 1);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Data flow particles
  useEffect(() => {
    const iv = setInterval(() => {
      if (nodes.length === 0) return;
      const src = nodes[Math.floor(Math.random() * nodes.length)];
      const dst = Math.random() > 0.5
        ? { id: 'center' }
        : nodes[Math.floor(Math.random() * nodes.length)];
      if (src.id === dst.id) return;
      setDataFlows(prev => [...prev.slice(-8), {
        id: Date.now() + Math.random(),
        srcId: src.id,
        dstId: dst.id,
        progress: 0,
      }]);
    }, 800);
    return () => clearInterval(iv);
  }, [nodes]);

  // Advance flow progress
  useEffect(() => {
    const iv = setInterval(() => {
      setDataFlows(prev => prev
        .map(f => ({ ...f, progress: f.progress + 0.05 }))
        .filter(f => f.progress <= 1)
      );
    }, 50);
    return () => clearInterval(iv);
  }, []);

  // Update stats
  useEffect(() => {
    const iv = setInterval(() => {
      setStats(prev => ({
        agents: 14 + Math.floor(Math.random() * 5),
        tasks: prev.tasks + Math.floor(Math.random() * 3),
        efficiency: +(98.5 + Math.random() * 1.5).toFixed(1),
        uptime: +(99.9 + Math.random() * 0.09).toFixed(2),
      }));
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  const getNodePos = useCallback((node) => {
    const angle = node.baseAngle + time * node.speed;
    return {
      x: cx + Math.cos(angle) * node.radius,
      y: cy + Math.sin(angle) * node.radius,
    };
  }, [time, cx, cy]);

  const handleMouseMove = useCallback((e) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, []);

  return (
    <section className="section swarm-net-section">
      <div className="section-header">
        <span className="section-tag">{sn.tag || '// Live Network'}</span>
        <h2 className="section-title">{sn.title || 'The Hive Mind'}</h2>
        <p className="section-subtitle">{sn.subtitle || 'Real-time visualization of the autonomous agent swarm'}</p>
      </div>

      <div className="swarm-net-container">
        <svg
          ref={svgRef}
          className="swarm-net-svg"
          viewBox="0 0 560 560"
          onMouseMove={handleMouseMove}
        >
          {/* Orbit rings */}
          {ORBITS.map((orbit, i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={orbit.radius}
              fill="none"
              stroke="rgba(0,229,255,0.06)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
          ))}

          {/* Connection lines */}
          {nodes.map(node => {
            const pos = getNodePos(node);
            return (
              <line
                key={`line-${node.id}`}
                x1={cx} y1={cy}
                x2={pos.x} y2={pos.y}
                stroke="rgba(0,229,255,0.08)"
                strokeWidth="0.5"
              />
            );
          })}

          {/* Data flow particles */}
          {dataFlows.map(flow => {
            const srcPos = flow.srcId === 'center'
              ? { x: cx, y: cy }
              : getNodePos(nodes[flow.srcId]);
            const dstPos = flow.dstId === 'center'
              ? { x: cx, y: cy }
              : getNodePos(nodes[flow.dstId]);
            if (!srcPos || !dstPos) return null;
            const px = srcPos.x + (dstPos.x - srcPos.x) * flow.progress;
            const py = srcPos.y + (dstPos.y - srcPos.y) * flow.progress;
            return (
              <circle
                key={flow.id}
                cx={px} cy={py} r="2.5"
                fill="#00e5ff"
                opacity={1 - flow.progress}
              >
                <animate
                  attributeName="r"
                  values="2;3.5;2"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}

          {/* Center node */}
          <g>
            <circle cx={cx} cy={cy} r="28" fill="rgba(0,229,255,0.1)" stroke="rgba(0,229,255,0.3)" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="18" fill="rgba(0,229,255,0.15)" stroke="#00e5ff" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="5" fill="#00e5ff">
              <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x={cx} y={cy + 44} textAnchor="middle" fill="#00e5ff" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1.5">
              MAIN AGENT
            </text>
          </g>

          {/* Satellite nodes */}
          {nodes.map(node => {
            const pos = getNodePos(node);
            const isActive = node.status === 'active';
            const isHovered = hovered === node.id;
            const color = isActive ? '#00e5ff' : '#4a4e69';
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                {isHovered && (
                  <circle cx={pos.x} cy={pos.y} r="16" fill="rgba(0,229,255,0.08)" />
                )}
                <circle
                  cx={pos.x} cy={pos.y} r="8"
                  fill={`${color}22`}
                  stroke={color}
                  strokeWidth={isHovered ? 2 : 1}
                />
                <circle cx={pos.x} cy={pos.y} r="3" fill={color}>
                  {isActive && (
                    <animate attributeName="opacity" values="1;0.5;1" dur={`${1.5 + Math.random()}s`} repeatCount="indefinite" />
                  )}
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hovered !== null && (
          <div
            className="swarm-net-tooltip"
            style={{
              left: mousePos.x + 15,
              top: mousePos.y - 10,
            }}
          >
            <div className="swarm-net-tooltip-type">{nodes[hovered].type}</div>
            <div className={`swarm-net-tooltip-status ${nodes[hovered].status}`}>
              {nodes[hovered].status === 'active' ? (sn.active || 'Active') : (sn.idle || 'Idle')}
            </div>
          </div>
        )}
      </div>

      {/* Bottom stats */}
      <div className="swarm-net-stats">
        <div className="swarm-net-stat">
          <span className="swarm-net-stat-value">{stats.agents}</span>
          <span className="swarm-net-stat-label">{sn.statAgents || 'Active Agents'}</span>
        </div>
        <div className="swarm-net-stat">
          <span className="swarm-net-stat-value">{stats.tasks.toLocaleString()}</span>
          <span className="swarm-net-stat-label">{sn.statTasks || 'Tasks / Sec'}</span>
        </div>
        <div className="swarm-net-stat">
          <span className="swarm-net-stat-value">{stats.efficiency}%</span>
          <span className="swarm-net-stat-label">{sn.statEfficiency || 'Efficiency'}</span>
        </div>
        <div className="swarm-net-stat">
          <span className="swarm-net-stat-value">{stats.uptime}%</span>
          <span className="swarm-net-stat-label">{sn.statUptime || 'Uptime'}</span>
        </div>
      </div>
    </section>
  );
}
