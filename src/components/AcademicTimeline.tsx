import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

const MILESTONES = [
  {
    id: 0,
    icon: '📘',
    tag: 'Foundation Years',
    degree: 'Matriculation (10th)',
    school: 'Tripta Public School',
    location: 'India',
    years: '– 2021',
    highlights: ['Academic Honours'],
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.4)',
    avatarScale: 0.7,
  },
  {
    id: 1,
    icon: '🔬',
    tag: 'Exploration Phase',
    degree: 'Intermediate (12th)',
    school: 'Tripta Public School',
    location: 'India',
    years: '2021 – 2023',
    stream: 'Science',
    highlights: ['Student Council Member'],
    color: '#818cf8',
    glow: 'rgba(129,140,248,0.4)',
    avatarScale: 0.85,
  },
  {
    id: 2,
    icon: '💻',
    tag: 'Specialization & Growth',
    degree: 'B.Tech — Computer Science & Engineering',
    school: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    years: '2023 – Present',
    cgpa: '8.52 / 10',
    highlights: ['Cybersecurity Club', 'Hackathon Finalist', 'DSA & Networks'],
    color: '#2dd4bf',
    glow: 'rgba(45,212,191,0.4)',
    avatarScale: 1.0,
  },
];

// SVG avatar at different growth stages
const AvatarSVG = ({ scale, color, jumping }: { scale: number; color: string; jumping: boolean }) => {
  const headR = 10 * scale;
  const bodyH = 16 * scale;
  const bodyW = 12 * scale;
  const legH = 12 * scale;
  const armH = 10 * scale;
  const totalH = headR * 2 + bodyH + legH + 4;
  const cx = 24;
  const headY = headR + 2;
  const bodyY = headY + headR;
  const armY = bodyY + 4 * scale;
  const legY = bodyY + bodyH;

  return (
    <svg width="48" height={totalH + 8} viewBox={`0 0 48 ${totalH + 8}`} fill="none" style={{ filter: `drop-shadow(0 0 8px ${color})` }}>
      {/* Glow ring when jumping */}
      {jumping && (
        <circle cx={cx} cy={totalH + 4} r={8} fill={color} opacity={0.3}>
          <animate attributeName="r" from="8" to="16" dur="0.4s" repeatCount="1" />
          <animate attributeName="opacity" from="0.4" to="0" dur="0.4s" repeatCount="1" />
        </circle>
      )}
      {/* Head */}
      <circle cx={cx} cy={headY} r={headR} fill={color} opacity={0.9} />
      {/* Eyes */}
      <circle cx={cx - headR * 0.3} cy={headY - 1} r={headR * 0.15} fill="#0a0f16" />
      <circle cx={cx + headR * 0.3} cy={headY - 1} r={headR * 0.15} fill="#0a0f16" />
      {/* Smile */}
      <path d={`M${cx - headR * 0.3} ${headY + 2} Q${cx} ${headY + 4} ${cx + headR * 0.3} ${headY + 2}`} stroke="#0a0f16" strokeWidth="1.2" fill="none" />
      {/* Body */}
      <rect x={cx - bodyW / 2} y={bodyY} width={bodyW} height={bodyH} rx={3} fill={color} opacity={0.7} />
      {/* Arms */}
      <line x1={cx - bodyW / 2} y1={armY} x2={cx - bodyW / 2 - armH} y2={armY + (jumping ? -4 : 4)} stroke={color} strokeWidth={3 * scale} strokeLinecap="round" />
      <line x1={cx + bodyW / 2} y1={armY} x2={cx + bodyW / 2 + armH} y2={armY + (jumping ? -4 : 4)} stroke={color} strokeWidth={3 * scale} strokeLinecap="round" />
      {/* Legs */}
      <line x1={cx - bodyW / 4} y1={legY} x2={cx - bodyW / 4 - 2} y2={legY + legH} stroke={color} strokeWidth={3 * scale} strokeLinecap="round" />
      <line x1={cx + bodyW / 4} y1={legY} x2={cx + bodyW / 4 + 2} y2={legY + legH} stroke={color} strokeWidth={3 * scale} strokeLinecap="round" />
    </svg>
  );
};

// Particle burst on landing
const LandingParticles = ({ color, active }: { color: string; active: boolean }) => {
  if (!active) return null;
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const dx = Math.cos(angle) * 30;
        const dy = Math.sin(angle) * 20;
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute w-2 h-2 rounded-full"
            style={{ background: color, bottom: 0, left: 0, boxShadow: `0 0 6px ${color}` }}
          />
        );
      })}
    </div>
  );
};

export const AcademicTimeline = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [landed, setLanded] = useState(false);
  const [wakeUp, setWakeUp] = useState(true);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<number[]>([]);

  // Measure node positions for avatar X
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackRect = trackRef.current.getBoundingClientRect();
      const positions = nodeRefs.current.map(ref => {
        if (!ref) return 0;
        const r = ref.getBoundingClientRect();
        return r.left - trackRect.left + r.width / 2;
      });
      setNodePositions(positions);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Wake-up animation
  useEffect(() => {
    const t = setTimeout(() => setWakeUp(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const goTo = (idx: number) => {
    if (idx === activeIdx || jumping) return;
    setPrevIdx(activeIdx);
    setJumping(true);
    setLanded(false);
    setTimeout(() => {
      setActiveIdx(idx);
      setJumping(false);
      setLanded(true);
      setTimeout(() => setLanded(false), 600);
    }, 400);
  };

  const current = MILESTONES[activeIdx];
  const avatarX = nodePositions[activeIdx] ?? (activeIdx === 0 ? 60 : activeIdx === 1 ? 200 : 340);
  const progressPct = activeIdx === 0 ? 0 : activeIdx === 1 ? 50 : 100;

  return (
    <section id="education" className="py-20 relative z-10 w-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-cyber-primary/10 border border-cyber-primary/30 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyber-primary animate-pulse" />
            <span className="font-mono text-xs text-cyber-primary tracking-widest uppercase">Academic Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-slate-100 text-glow mb-2">The Growth Path</h2>
          <p className="text-slate-400 font-mono text-sm">Click a milestone to watch the journey unfold</p>
        </motion.div>

        {/* ─── DESKTOP HORIZONTAL TIMELINE ─── */}
        <div className="hidden md:block">
          {/* Avatar track */}
          <div className="relative mb-4" ref={trackRef}>
            {/* Progress road */}
            <div className="relative h-2 bg-slate-800 rounded-full mx-10 mb-8 overflow-visible">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: `linear-gradient(90deg, ${MILESTONES[0].color}, ${MILESTONES[1].color}, ${MILESTONES[2].color})`, boxShadow: `0 0 12px ${current.glow}` }}
                animate={{ width: `${progressPct}%` }}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              />
              {/* Milestone nodes */}
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.id}
                  ref={el => { nodeRefs.current[i] = el; }}
                  className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${i === 0 ? 0 : i === 1 ? 50 : 100}%`, marginLeft: i === 0 ? 0 : i === 1 ? '-16px' : '-32px' }}
                  onClick={() => goTo(i)}
                  whileHover={{ scale: 1.3 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center border-2 relative z-10"
                    animate={{
                      borderColor: activeIdx >= i ? m.color : '#334155',
                      background: activeIdx >= i ? `${m.color}20` : '#0a0f16',
                      boxShadow: activeIdx >= i ? `0 0 16px ${m.glow}` : 'none',
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-sm">{m.icon}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Animated Avatar */}
            {nodePositions.length > 0 && (
              <motion.div
                className="absolute pointer-events-none"
                style={{ bottom: '28px' }}
                animate={{ x: avatarX - 24 }}
                transition={{ type: 'spring', stiffness: 80, damping: 14 }}
              >
                <motion.div
                  animate={jumping
                    ? { y: [-0, -50, 0], rotate: [0, 10, -10, 0] }
                    : wakeUp
                    ? { y: [10, 0], opacity: [0, 1] }
                    : { y: 0 }
                  }
                  transition={jumping
                    ? { duration: 0.4, ease: 'easeInOut' }
                    : { duration: 0.6, type: 'spring' }
                  }
                >
                  <AvatarSVG scale={current.avatarScale} color={current.color} jumping={jumping} />
                </motion.div>
                <LandingParticles color={current.color} active={landed} />
              </motion.div>
            )}
          </div>

          {/* Milestone labels below track */}
          <div className="flex justify-between px-6 mb-10 gap-2">
            {MILESTONES.map((m, i) => (
              <button
                key={m.id}
                onClick={() => goTo(i)}
                className={`flex-1 text-center transition-all duration-300 ${activeIdx === i ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
              >
                <div className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: m.color }}>{m.tag}</div>
                <div className="text-slate-300 text-sm font-semibold">{m.degree.split('—')[0].trim()}</div>
                <div className="text-slate-500 text-xs">{m.years}</div>
              </button>
            ))}
          </div>

          {/* Detail Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="glass-panel p-8 border-l-4"
              style={{ borderLeftColor: current.color, boxShadow: `0 0 30px ${current.glow}` }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="text-6xl">{current.icon}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-2xl font-mono font-bold text-slate-100">{current.degree}</h3>
                    <span className="px-3 py-1 text-xs font-mono rounded-full border" style={{ borderColor: `${current.color}60`, color: current.color, background: `${current.color}10` }}>
                      {current.tag}
                    </span>
                  </div>
                  <p className="font-mono text-base mb-1" style={{ color: current.color }}>{current.school}</p>
                  <p className="text-slate-500 text-sm mb-4">{current.location} · {current.years}</p>
                  {'cgpa' in current && (
                    <p className="text-sm font-mono text-cyber-warning mb-4">CGPA: {current.cgpa}</p>
                  )}
                  {'stream' in current && (
                    <p className="text-sm font-mono text-slate-400 mb-4">Stream: {current.stream}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {current.highlights.map(h => (
                      <span key={h} className="text-xs font-mono px-3 py-1.5 rounded border border-slate-700 text-slate-400"
                        style={{ borderColor: `${current.color}40`, background: `${current.color}08` }}>
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => goTo(Math.max(0, activeIdx - 1))}
              disabled={activeIdx === 0}
              className="px-5 py-2 font-mono text-sm border rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800"
              style={{ borderColor: current.color, color: current.color }}
            >
              ← Prev
            </button>
            <div className="flex gap-2 items-center">
              {MILESTONES.map((m, i) => (
                <motion.button key={i} onClick={() => goTo(i)}
                  animate={{ width: activeIdx === i ? 24 : 8, background: activeIdx === i ? m.color : '#334155' }}
                  className="h-2 rounded-full transition-colors"
                />
              ))}
            </div>
            <button
              onClick={() => goTo(Math.min(MILESTONES.length - 1, activeIdx + 1))}
              disabled={activeIdx === MILESTONES.length - 1}
              className="px-5 py-2 font-mono text-sm border rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800"
              style={{ borderColor: current.color, color: current.color }}
            >
              Next →
            </button>
          </div>

          {/* Future placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 glass-panel p-5 border border-dashed border-slate-700 flex items-center gap-4 opacity-50"
          >
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center text-2xl">❓</div>
            <div>
              <p className="font-mono text-slate-400 text-sm">Future Milestone</p>
              <p className="font-mono text-xs text-slate-600 mt-1">Next chapter loading… stay tuned</p>
            </div>
          </motion.div>
        </div>

        {/* ─── MOBILE VERTICAL TIMELINE ─── */}
        <div className="md:hidden space-y-0">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative pl-12"
            >
              {/* Connector line */}
              {i < MILESTONES.length - 1 && (
                <div className="absolute left-[22px] top-10 bottom-0 w-0.5" style={{ background: `linear-gradient(to bottom, ${m.color}, ${MILESTONES[i + 1].color})` }} />
              )}
              {/* Node */}
              <div className="absolute left-0 top-2 w-11 h-11 rounded-full flex items-center justify-center border-2 z-10"
                style={{ borderColor: m.color, background: '#0a0f16', boxShadow: `0 0 12px ${m.glow}` }}>
                <span className="text-lg">{m.icon}</span>
              </div>
              {/* Card */}
              <div className="glass-panel p-5 mb-6 border-l-2" style={{ borderLeftColor: m.color }}>
                <div className="font-mono text-xs mb-2" style={{ color: m.color }}>{m.tag}</div>
                <h3 className="text-lg font-mono font-bold text-slate-100 mb-1">{m.degree}</h3>
                <p className="text-sm font-mono mb-1" style={{ color: m.color }}>{m.school}</p>
                <p className="text-xs text-slate-500 mb-3">{m.location} · {m.years}</p>
                {'cgpa' in m && <p className="text-xs text-cyber-warning mb-3">CGPA: {m.cgpa}</p>}
                <div className="flex flex-wrap gap-2">
                  {m.highlights.map(h => (
                    <span key={h} className="text-xs font-mono px-2 py-1 rounded border"
                      style={{ borderColor: `${m.color}40`, color: m.color, background: `${m.color}08` }}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          {/* Mobile future */}
          <div className="relative pl-12">
            <div className="absolute left-0 top-2 w-11 h-11 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center">❓</div>
            <div className="glass-panel p-5 border border-dashed border-slate-700 opacity-50">
              <p className="font-mono text-slate-400 text-sm">Future Milestone</p>
              <p className="text-xs text-slate-600 mt-1">Next chapter loading…</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
