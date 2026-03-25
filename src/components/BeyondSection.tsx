import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronDown, Leaf, Monitor, Users, Zap } from 'lucide-react';
import wasteWarriorsField from '../assets/waste-warriors-field.jpg';

const NGO_TABS = [
  {
    id: 'waste',
    icon: <Leaf className="h-5 w-5" />,
    title: 'Waste Collection Drives',
    desc: 'Joined cleanup drives and on-ground volunteer efforts focused on cleaner public spaces and community participation.',
  },
  {
    id: 'campaigns',
    icon: <Zap className="h-5 w-5" />,
    title: 'Awareness Campaigns',
    desc: 'Supported awareness sessions around sustainability, waste segregation, and responsible environmental action.',
  },
  {
    id: 'teaching',
    icon: <Users className="h-5 w-5" />,
    title: 'Teaching Children',
    desc: 'Contributed to sessions that made environmental education more practical and engaging for students.',
  },
];

const DDEV_TABS = [
  {
    id: 'events',
    icon: <Calendar className="h-5 w-5" />,
    title: 'Event Management',
    desc: 'Managed logistics for technical workshops and hackathons from setup to participant flow.',
  },
  {
    id: 'coord',
    icon: <Users className="h-5 w-5" />,
    title: 'Team Coordination',
    desc: 'Coordinated communication across design, development, and outreach teams to keep execution aligned.',
  },
  {
    id: 'planning',
    icon: <Zap className="h-5 w-5" />,
    title: 'Planning and Execution',
    desc: 'Helped shape timelines, priorities, and delivery plans so events moved smoothly from idea to launch.',
  },
  {
    id: 'community',
    icon: <Monitor className="h-5 w-5" />,
    title: 'Community Engagement',
    desc: 'Supported outreach and post-event engagement to strengthen the club community and participation.',
  },
];

const ExpandItem = ({
  item,
  accentColor,
  isOpen,
  onToggle,
}: {
  item: { id: string; icon: React.ReactNode; title: string; desc: string };
  accentColor: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-slate-800 last:border-0">
    <button
      className="group flex w-full items-center justify-between rounded px-1 py-3 text-left transition-colors hover:bg-white/3"
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        <span style={{ color: accentColor }}>{item.icon}</span>
        <span className="font-mono text-sm text-slate-200 transition-colors group-hover:text-white">
          {item.title}
        </span>
      </div>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
        <ChevronDown className="h-4 w-4 text-slate-500" />
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
          <p className="pb-3 pl-11 pr-8 text-sm leading-relaxed text-slate-400">{item.desc}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const BeyondSection = () => {
  const [openNgo, setOpenNgo] = useState<string | null>(null);
  const [openDev, setOpenDev] = useState<string | null>(null);

  const toggleNgo = (id: string) => {
    setOpenNgo((prev) => (prev === id ? null : id));
  };

  const toggleDev = (id: string) => {
    setOpenDev((prev) => (prev === id ? null : id));
  };

  return (
    <section id="beyond" className="relative z-10 w-full py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyber-secondary/30 bg-cyber-secondary/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-cyber-secondary animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyber-secondary">
              Beyond Code
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-mono font-bold text-slate-100 text-glow md:text-4xl">
            Beyond
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400">
            Community work, club management, and volunteer impact all stay visible here with the focus kept on real on-ground experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel relative overflow-hidden border border-green-500/20 p-7"
            style={{
              background: 'linear-gradient(135deg, rgba(16,40,24,0.82) 0%, rgba(6,10,16,0.94) 100%)',
            }}
          >
            <div className="relative z-10 mb-6 flex items-start gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/15">
                <Leaf className="h-7 w-7 text-green-400" />
              </div>
              <div>
                <h3 className="mb-1 text-xl font-mono font-bold text-slate-100">Waste Warriors NGO</h3>
                <span className="rounded border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-xs font-mono text-green-400">
                  Volunteer Contributor
                </span>
              </div>
            </div>

            <div className="relative z-10 mb-5 space-y-4">
              <div className="relative overflow-hidden rounded-xl border border-green-500/20 bg-[#030712]">
                <div className="aspect-video w-full">
                  <img
                    src={wasteWarriorsField}
                    alt="Waste Warriors field activity"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#02060d]/90 to-transparent" />
                <div className="absolute bottom-3 right-3 rounded border border-green-500/30 bg-black/60 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-green-300">
                  Field Work
                </div>
              </div>

              <div className="rounded-xl border border-green-500/20 bg-green-500/6 p-4">
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-green-300/80">
                  On-ground impact
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Cleanup drives, awareness sessions, and practical sustainability work at the community level.
                </p>
              </div>
            </div>

            <p className="relative z-10 mb-6 text-sm leading-relaxed text-slate-400">
              Grassroots environmental work stays in Beyond with the focus on volunteer contribution and community-level sustainability action.
            </p>

            <div className="relative z-10 space-y-0 overflow-hidden rounded-lg border border-green-500/15 bg-green-500/5 px-2">
              {NGO_TABS.map((tab) => (
                <ExpandItem
                  key={tab.id}
                  item={tab}
                  accentColor="#4ade80"
                  isOpen={openNgo === tab.id}
                  onToggle={() => toggleNgo(tab.id)}
                />
              ))}
            </div>

            <div className="relative z-10 mt-5 flex flex-wrap items-center gap-2">
              {['Community Impact', 'Volunteer', 'Sustainability'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-green-500/30 bg-green-500/8 px-3 py-1 text-xs font-mono text-green-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel relative overflow-hidden border border-cyber-secondary/20 p-7"
            style={{
              background: 'linear-gradient(135deg, rgba(30,20,60,0.8) 0%, rgba(6,10,16,0.9) 100%)',
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(129,140,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.5) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative z-10 mb-6 flex items-start gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-cyber-secondary/30 bg-cyber-secondary/15">
                <span className="text-2xl">DEV</span>
              </div>
              <div>
                <h3 className="mb-1 text-xl font-mono font-bold text-slate-100">Drive Dev Club</h3>
                <span className="rounded border border-cyber-secondary/20 bg-cyber-secondary/10 px-2 py-0.5 text-xs font-mono text-cyber-secondary">
                  Management Team Member
                </span>
              </div>
            </div>

            <p className="relative z-10 mb-6 text-sm leading-relaxed text-slate-400">
              Developer community management work stays here with planning, team coordination, and event execution highlights.
            </p>

            <div className="relative z-10 space-y-0 overflow-hidden rounded-lg border border-cyber-secondary/15 bg-cyber-secondary/3 px-2">
              {DDEV_TABS.map((tab) => (
                <ExpandItem
                  key={tab.id}
                  item={tab}
                  accentColor="#7b2ff7"
                  isOpen={openDev === tab.id}
                  onToggle={() => toggleDev(tab.id)}
                />
              ))}
            </div>

            <div className="relative z-10 mt-5 flex flex-wrap gap-2">
              {['Leadership', 'Team Management', 'Execution', 'Organizer'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-cyber-secondary/30 bg-cyber-secondary/8 px-3 py-1 text-xs font-mono text-cyber-secondary"
                >
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
