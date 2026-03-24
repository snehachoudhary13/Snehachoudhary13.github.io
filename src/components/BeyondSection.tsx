import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Leaf, Monitor, Users, Calendar, Zap, Heart } from 'lucide-react';

// ── Waste Warriors Data ──────────────────────────────────────────────────────
const NGO_MODULES = [
  { id: 'waste', icon: <Leaf className="w-5 h-5" />, title: 'Waste Collection Drives', desc: 'Participated in community-wide waste pickup drives, coordinating with volunteers to clean public spaces and promote responsible disposal.' },
  { id: 'campaigns', icon: <Zap className="w-5 h-5" />, title: 'Awareness Campaigns', desc: 'Designed and conducted public awareness sessions on waste segregation, plastic reduction, and sustainable living practices.' },
  { id: 'teaching', icon: <Users className="w-5 h-5" />, title: 'Teaching Children', desc: 'Led interactive environmental education sessions for school children — making sustainability fun, relatable, and actionable.' },
  { id: 'sustainability', icon: <Leaf className="w-5 h-5" />, title: 'Sustainability Initiatives', desc: 'Collaborated on tree plantation drives and composting pilot programs to build long-term ecological impact in local communities.' },
  { id: 'mental', icon: <Heart className="w-5 h-5" />, title: 'Mental Health Sessions', desc: 'Supported team-run mental wellness workshops, recognizing the link between environmental well-being and human mental health.' },
];

// ── Drive Dev Club Data ──────────────────────────────────────────────────────
const DDEV_TABS = [
  { id: 'events', icon: <Calendar className="w-5 h-5" />, title: 'Event Management', desc: 'Managed end-to-end logistics for technical workshops and hackathons — from venue setup to participant onboarding and session facilitation.' },
  { id: 'coord', icon: <Users className="w-5 h-5" />, title: 'Team Coordination', desc: 'Acted as liaison between sub-teams, ensuring smooth communication and task delegation across design, dev, and outreach verticals.' },
  { id: 'planning', icon: <Zap className="w-5 h-5" />, title: 'Planning & Execution', desc: 'Contributed to strategic planning sessions, building timelines, defining goals, and following through to ensure consistent execution quality.' },
  { id: 'community', icon: <Monitor className="w-5 h-5" />, title: 'Community Engagement', desc: 'Drove community engagement via social media coordination and post-event follow-ups to grow the club\'s active member base.' },
];

// ── Expandable Item ──────────────────────────────────────────────────────────
const ExpandItem = ({ item, accentColor, isOpen, onToggle }: {
  item: { id: string; icon: React.ReactNode; title: string; desc: string };
  accentColor: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-slate-800 last:border-0">
    <button
      className="w-full flex items-center justify-between py-3 px-1 text-left group hover:bg-white/3 transition-colors rounded"
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        <span style={{ color: accentColor }}>{item.icon}</span>
        <span className="font-mono text-sm text-slate-200 group-hover:text-white transition-colors">{item.title}</span>
      </div>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
        <ChevronDown className="w-4 h-4 text-slate-500" />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="text-slate-400 font-sans text-sm leading-relaxed pb-3 px-8 pl-11">{item.desc}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export const BeyondSection = () => {
  const [openNgo, setOpenNgo] = useState<string | null>(null);
  const [openDev, setOpenDev] = useState<string | null>(null);

  const toggleNgo = (id: string) => setOpenNgo(prev => prev === id ? null : id);
  const toggleDev = (id: string) => setOpenDev(prev => prev === id ? null : id);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="beyond" className="py-20 relative z-10 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-cyber-accent/10 border border-cyber-accent/30 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
            <span className="font-mono text-xs text-cyber-accent tracking-widest uppercase">Beyond Code</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-slate-100 text-glow mb-4">Beyond</h2>
          <motion.blockquote
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="text-slate-400 font-sans italic text-base max-w-xl mx-auto border-l-2 border-cyber-accent/40 pl-4 text-left"
          >
            "Beyond code, I build communities and create impact."
          </motion.blockquote>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── Card 1: Waste Warriors NGO ── */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ rotateY: 2, rotateX: -1, scale: 1.01, boxShadow: '0 0 40px rgba(34,197,94,0.2)' }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="glass-panel p-7 border border-green-500/20 relative overflow-hidden flex flex-col"
            style={{ background: 'linear-gradient(135deg, rgba(16,40,24,0.8) 0%, rgba(6,10,16,0.9) 100%)' }}
          >
            {/* Floating leaf decorations */}
            {['🍃', '🌿', '🍀'].map((leaf, i) => (
              <motion.span
                key={leaf}
                className="absolute text-xl pointer-events-none select-none opacity-10"
                style={{ top: `${20 + i * 28}%`, right: `${8 + i * 5}%` }}
                animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
              >
                {leaf}
              </motion.span>
            ))}

            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🌍</span>
              </div>
              <div>
                <h3 className="text-xl font-mono font-bold text-slate-100 mb-1">Waste Warriors NGO</h3>
                <span className="font-mono text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded">
                  Volunteer / Field Contributor
                </span>
              </div>
            </div>

            <p className="text-slate-400 font-sans text-sm leading-relaxed mb-6">
              Active involvement in grassroots-level environmental and social initiatives — driving real community change through collective action.
            </p>

            {/* Expandable modules */}
            <div className="flex-1 space-y-0 rounded-lg border border-green-500/15 overflow-hidden bg-green-500/3 px-2">
              {NGO_MODULES.map(m => (
                <ExpandItem key={m.id} item={m} accentColor="#22c55e" isOpen={openNgo === m.id} onToggle={() => toggleNgo(m.id)} />
              ))}
            </div>

            {/* Impact tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {['Community Impact', 'Environmental Action', 'Volunteer'].map(tag => (
                <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full border border-green-500/30 text-green-400 bg-green-500/8">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Card 2: Drive Dev Club ── */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            whileHover={{ rotateY: -2, rotateX: -1, scale: 1.01, boxShadow: '0 0 40px rgba(129,140,248,0.25)' }}
            className="glass-panel p-7 border border-cyber-secondary/20 relative overflow-hidden flex flex-col"
            style={{ background: 'linear-gradient(135deg, rgba(30,20,60,0.8) 0%, rgba(6,10,16,0.9) 100%)' }}
          >
            {/* Neon grid background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(rgba(129,140,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            {/* Header */}
            <div className="flex items-start gap-4 mb-6 relative z-10">
              <div className="w-14 h-14 rounded-xl bg-cyber-secondary/15 border border-cyber-secondary/30 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚙️</span>
              </div>
              <div>
                <h3 className="text-xl font-mono font-bold text-slate-100 mb-1">Drive Dev Club</h3>
                <span className="font-mono text-xs text-cyber-secondary bg-cyber-secondary/10 border border-cyber-secondary/20 px-2 py-0.5 rounded">
                  Management Team Member
                </span>
              </div>
            </div>

            <p className="text-slate-400 font-sans text-sm leading-relaxed mb-6 relative z-10">
              Working on the management side of a developer community — organizing, coordinating, and executing technical events with precision.
            </p>

            {/* Expandable tabs */}
            <div className="flex-1 space-y-0 rounded-lg border border-cyber-secondary/15 overflow-hidden bg-cyber-secondary/3 px-2 relative z-10">
              {DDEV_TABS.map(t => (
                <ExpandItem key={t.id} item={t} accentColor="#7b2ff7" isOpen={openDev === t.id} onToggle={() => toggleDev(t.id)} />
              ))}
            </div>

            {/* Impact tags */}
            <div className="flex flex-wrap gap-2 mt-5 relative z-10">
              {['Leadership', 'Team Management', 'Execution', 'Organizer'].map(tag => (
                <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full border border-cyber-secondary/30 text-cyber-secondary bg-cyber-secondary/8">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
