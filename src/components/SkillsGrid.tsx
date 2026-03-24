import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SKILL_SPOTS = [
  { id: 0, x: 18, y: 28, category: 'Programming', skills: ['C', 'C++', 'Python'], color: '#00d4ff' },
  { id: 1, x: 42, y: 55, category: 'Tools & Platforms', skills: ['Git', 'GitHub', 'VS Code', 'Kali Linux'], color: '#818cf8' },
  { id: 2, x: 65, y: 32, category: 'Core Concepts', skills: ['DSA', 'OOPS', 'DBMS', 'OS', 'Networks'], color: '#2dd4bf' },
  { id: 3, x: 80, y: 62, category: 'Cybersecurity', skills: ['Nmap', 'Wireshark', 'Metasploit', 'OSINT'], color: '#f59e0b' },
  { id: 4, x: 30, y: 75, category: 'Soft Skills', skills: ['Adaptability', 'Team Player', 'Discipline', 'Leadership'], color: '#e879f9' },
];

// SVG Camera mounted on wall bracket
const CCTVCamera = ({ angle }: { angle: number }) => (
  <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 0 12px rgba(0,212,255,0.4))' }}>
    {/* Wall plate */}
    <rect x="85" y="10" width="28" height="60" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
    {/* Bracket arm */}
    <rect x="65" y="38" width="24" height="6" rx="3" fill="#334155" />
    {/* Camera body - rotates */}
    <g transform={`rotate(${angle}, 62, 42)`}>
      <rect x="15" y="32" width="52" height="20" rx="6" fill="#1e293b" stroke="#00d4ff" strokeWidth="1" />
      {/* Lens housing */}
      <circle cx="20" cy="42" r="10" fill="#0a0f16" stroke="#00d4ff" strokeWidth="1.5" />
      {/* Lens */}
      <circle cx="20" cy="42" r="6" fill="#060a10" />
      <circle cx="20" cy="42" r="4" fill="#00d4ff" opacity="0.15" />
      <circle cx="20" cy="42" r="2" fill="#00d4ff" opacity="0.5" />
      {/* IR LEDs */}
      {[0, 1, 2, 3].map(i => (
        <circle key={i} cx={32 + i * 8} cy={36} r={2} fill="#ff4444" opacity={0.7}>
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Status light */}
      <circle cx="60" cy="42" r="2.5" fill="#22c55e">
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

export const SkillsGrid = () => {
  const [activeSpot, setActiveSpot] = useState<number | null>(null);
  const [cameraAngle, setCameraAngle] = useState(0);
  const arenaRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number } | null>(null);

  const handleSpotClick = (spot: typeof SKILL_SPOTS[0]) => {
    if (activeSpot === spot.id) {
      setActiveSpot(null);
      setSpotlight(null);
      setCameraAngle(0);
      return;
    }
    // Camera pans toward the spot: map x% to angle range -25..+25
    const targetAngle = ((spot.x - 50) / 50) * 22;
    setCameraAngle(targetAngle);
    setActiveSpot(spot.id);
    setSpotlight({ x: spot.x, y: spot.y });
  };

  const activeSkill = SKILL_SPOTS.find(s => s.id === activeSpot);

  return (
    <section id="skills" className="py-20 relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-xs text-red-400 tracking-widest uppercase">CCTV Surveillance Active</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-slate-100 text-glow glitch mb-2" data-text="Skills">Skills</h2>
          <p className="text-slate-500 font-mono text-sm">Target the red dots to reveal classified skill data</p>
        </motion.div>

        {/* Main Arena */}
        <div className="relative">
          {/* Camera mounted top-right */}
          <div className="absolute -top-6 right-4 z-30">
            <motion.div animate={{ rotate: cameraAngle }} transition={{ type: 'spring', stiffness: 60, damping: 12 }}
              style={{ transformOrigin: '88px 42px' }}>
              <CCTVCamera angle={0} />
            </motion.div>
            {/* Camera scan line */}
            <motion.div
              className="absolute top-10 right-14 w-px opacity-20"
              style={{ height: '200px', background: 'linear-gradient(to bottom, #00d4ff, transparent)' }}
              animate={{ rotate: [-15 + cameraAngle, 15 + cameraAngle, -15 + cameraAngle] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Dark arena */}
          <div
            ref={arenaRef}
            className="relative w-full overflow-hidden rounded-xl border border-slate-800"
            style={{ minHeight: '420px', background: '#020509' }}
          >
            {/* Scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 opacity-10"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }} />

            {/* CCTV timestamp */}
            <div className="absolute top-3 left-4 font-mono text-xs text-red-500/70 z-20 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
              REC ● CAM-01 · {new Date().toLocaleTimeString()}
            </div>

            {/* Spotlight that follows cursor/click */}
            <AnimatePresence>
              {spotlight && (
                <motion.div
                  key="spotlight"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute pointer-events-none z-10 rounded-full"
                  style={{
                    left: `${spotlight.x}%`,
                    top: `${spotlight.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: '260px',
                    height: '260px',
                    background: `radial-gradient(circle, ${activeSkill?.color ?? '#00d4ff'}25 0%, ${activeSkill?.color ?? '#00d4ff'}08 40%, transparent 70%)`,
                    boxShadow: `0 0 60px ${activeSkill?.color ?? '#00d4ff'}30`,
                  }}
                />
              )}
            </AnimatePresence>

            {/* Red dot target spots */}
            {SKILL_SPOTS.map((spot) => (
              <motion.button
                key={spot.id}
                className="absolute z-20 group cursor-crosshair"
                style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
                onClick={() => handleSpotClick(spot)}
                whileHover={{ scale: 1.2 }}
              >
                {/* Outer ring pulse */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'transparent', border: `2px solid ${activeSpot === spot.id ? spot.color : '#ef4444'}` }}
                  animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Red dot core */}
                <div
                  className="w-4 h-4 rounded-full relative z-10 transition-all duration-300"
                  style={{
                    background: activeSpot === spot.id ? spot.color : '#ef4444',
                    boxShadow: activeSpot === spot.id
                      ? `0 0 16px ${spot.color}, 0 0 32px ${spot.color}60`
                      : '0 0 8px #ef4444, 0 0 16px #ef444460',
                  }}
                />
                {/* Crosshair lines */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-px bg-red-400 absolute -translate-x-1/2 -translate-y-1/2" />
                  <div className="w-px h-8 bg-red-400 absolute -translate-x-1/2 -translate-y-1/2" />
                </div>
                {/* Category label on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 bg-black/70 px-2 py-0.5 rounded pointer-events-none">
                  {spot.category}
                </div>
              </motion.button>
            ))}

            {/* Skill card that appears on click */}
            <AnimatePresence>
              {activeSpot !== null && activeSkill && (
                <motion.div
                  key={activeSpot}
                  initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="absolute z-30 glass-panel p-6 shadow-2xl"
                  style={{
                    left: `${Math.min(Math.max(activeSkill.x, 15), 65)}%`,
                    top: `${Math.min(Math.max(activeSkill.y + 12, 10), 60)}%`,
                    transform: 'translate(-50%, 0)',
                    borderColor: `${activeSkill.color}60`,
                    minWidth: '200px',
                    boxShadow: `0 0 30px ${activeSkill.color}30, inset 0 0 20px ${activeSkill.color}08`,
                  }}
                >
                  <div className="font-mono text-xs mb-3 flex items-center gap-2" style={{ color: activeSkill.color }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: activeSkill.color }} />
                    {activeSkill.category.toUpperCase()}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeSkill.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="px-3 py-1.5 rounded font-mono text-sm border"
                        style={{ borderColor: `${activeSkill.color}50`, color: activeSkill.color, background: `${activeSkill.color}10` }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Center hint when nothing active */}
            {activeSpot === null && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <motion.p
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="font-mono text-xs text-slate-600 tracking-widest uppercase"
                >
                  ▶ Click the red dots to reveal skills
                </motion.p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
