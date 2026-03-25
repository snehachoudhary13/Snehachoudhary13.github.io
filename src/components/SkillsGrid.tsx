import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Boxes,
  Code2,
  Cpu,
  Pause,
  Play,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';

const SKILL_CARDS: Array<{
  category: string;
  tag: string;
  color: string;
  Icon: LucideIcon;
  skills: string[];
}> = [
  {
    category: 'Languages',
    tag: 'Code',
    color: '#00d4ff',
    Icon: Code2,
    skills: ['Java', 'C', 'C++', 'Python'],
  },
  {
    category: 'Tools & Platforms',
    tag: 'Toolkit',
    color: '#818cf8',
    Icon: Boxes,
    skills: ['Git', 'GitHub', 'VS Code', 'Kali Linux', 'Cisco Packet Tracer'],
  },
  {
    category: 'Others',
    tag: 'Systems',
    color: '#2dd4bf',
    Icon: Cpu,
    skills: ['Data Structures & Algorithms', 'OOPS', 'DBMS', 'Operating System', 'Computer Networking'],
  },
  {
    category: 'Cybersecurity',
    tag: 'Security',
    color: '#f59e0b',
    Icon: ShieldCheck,
    skills: ['Nmap', 'Wireshark', 'Burp Suite', 'TryHackMe', 'OSINT'],
  },
  {
    category: 'Soft Skills',
    tag: 'Collab',
    color: '#e879f9',
    Icon: Users,
    skills: ['Problem-Solving', 'Adaptability', 'Team Player'],
  },
];

const SkillOrbitCard = ({
  card,
  index,
  paused,
  onToggle,
}: {
  card: (typeof SKILL_CARDS)[number];
  index: number;
  paused: boolean;
  onToggle: () => void;
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <div className="skill-space-item" style={{ '--position': index + 1 } as CSSProperties}>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={paused}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        className="skill-space-card glass-panel group"
      >
        <div
          className="skill-space-card-glow"
          style={{ background: `radial-gradient(circle at 50% 0%, ${card.color}40 0%, transparent 72%)` }}
        />

        <div className="relative z-10 flex h-full flex-col" style={{ transformStyle: 'preserve-3d' }}>
          <div className="flex items-start justify-between gap-3" style={{ transform: 'translateZ(52px)' }}>
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${card.color}15`, borderColor: `${card.color}50` }}
            >
              <card.Icon style={{ color: card.color, width: '2.5rem', height: '2.5rem' }} />
            </div>
            <div
              className="rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em]"
              style={{
                borderColor: `${card.color}55`,
                background: `${card.color}12`,
                color: card.color,
              }}
            >
              {card.tag}
            </div>
          </div>

          <div className="mt-6" style={{ transform: 'translateZ(38px)' }}>
            <p className="mb-2 text-xs font-mono uppercase tracking-[0.28em] text-slate-500">Skill Cluster</p>
            <h3 className="font-mono text-xl font-bold text-white">{card.category}</h3>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" style={{ transform: 'translateZ(28px)' }}>
            {card.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border px-3 py-1.5 font-mono text-xs"
                style={{
                  borderColor: `${card.color}50`,
                  color: card.color,
                  background: `${card.color}10`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          <div
            className="mt-auto pt-5 text-[11px] font-mono uppercase tracking-[0.22em] text-slate-500"
            style={{ transform: 'translateZ(18px)' }}
          >
            Click card to {paused ? 'resume orbit' : 'pause orbit'}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkillsGrid = () => {
  const [orbitPaused, setOrbitPaused] = useState(false);

  return (
    <section id="skills" className="relative z-10 w-full overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="glitch mb-2 text-3xl font-mono font-bold text-slate-100 text-glow md:text-4xl" data-text="Skills">
            Skills
          </h2>
        </motion.div>

        <div className="skill-space-stage">
          <div className="skill-space-grid" />
          <div className="skill-space-glow skill-space-glow--one" />
          <div className="skill-space-glow skill-space-glow--two" />
          <div className="skill-space-core">
            <div className="skill-space-core-ring skill-space-core-ring--outer" />
            <div className="skill-space-core-ring skill-space-core-ring--inner" />
            <div className="skill-space-core-indicator">
              {orbitPaused ? <Play className="h-6 w-6" /> : <Pause className="h-6 w-6" />}
            </div>
          </div>

          <div
            className="skill-space-ring"
            style={{
              '--quantity': SKILL_CARDS.length,
              animationPlayState: orbitPaused ? 'paused' : 'running',
            } as CSSProperties}
          >
            {SKILL_CARDS.map((card, idx) => (
              <SkillOrbitCard
                key={card.category}
                card={card}
                index={idx}
                paused={orbitPaused}
                onToggle={() => setOrbitPaused((prev) => !prev)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
