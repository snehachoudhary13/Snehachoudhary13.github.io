import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, MessageCircle } from 'lucide-react';
import { SiLeetcode, SiGithub, SiGmail } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

const contacts = [
  {
    label: 'Email',
    value: 'simmi121412@gmail.com',
    sub: 'Drop me a message anytime',
    href: 'mailto:simmi121412@gmail.com',
    Icon: SiGmail,
    color: '#EA4335',
    glow: 'rgba(234,67,53,0.3)',
    hoverBorder: 'group-hover:border-[#EA4335]/50',
  },
  {
    label: 'LinkedIn',
    value: 'sneha-choudhary-s1',
    sub: 'Connect professionally',
    href: 'https://www.linkedin.com/in/sneha-choudhary-s1/',
    Icon: FaLinkedinIn,
    color: '#0A66C2',
    glow: 'rgba(10,102,194,0.3)',
    hoverBorder: 'group-hover:border-[#0A66C2]/50',
  },
  {
    label: 'GitHub',
    value: 'snehachoudhary13',
    sub: 'Browse my source code',
    href: 'https://github.com/snehachoudhary13',
    Icon: SiGithub,
    color: '#ffffff',
    glow: 'rgba(255,255,255,0.15)',
    hoverBorder: 'group-hover:border-white/40',
  },
  {
    label: 'LeetCode',
    value: 'sneha-choudhary',
    sub: '350+ problems solved',
    href: 'https://leetcode.com',
    Icon: SiLeetcode,
    color: '#FFA116',
    glow: 'rgba(255,161,22,0.3)',
    hoverBorder: 'group-hover:border-[#FFA116]/50',
  },
];

const ContactCard = ({
  contact,
  index,
  paused,
  onToggle,
}: {
  contact: (typeof contacts)[number];
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
    <div className="contact-space-item" style={{ '--position': index + 1 } as CSSProperties}>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={paused}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        className={`contact-space-card glass-panel group ${contact.hoverBorder}`}
      >
        <div
          className="contact-space-card-glow"
          style={{ background: `radial-gradient(circle at 50% 0%, ${contact.glow} 0%, transparent 72%)` }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between" style={{ transformStyle: 'preserve-3d' }}>
          <div className="flex items-start justify-between gap-3" style={{ transform: 'translateZ(52px)' }}>
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${contact.color}15`, borderColor: `${contact.color}45` }}
            >
              <contact.Icon style={{ color: contact.color, width: '2.6rem', height: '2.6rem' }} />
            </div>
            <div
              className="rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em]"
              style={{
                borderColor: `${contact.color}55`,
                background: `${contact.color}14`,
                color: contact.color,
              }}
            >
              {paused ? 'Paused' : 'Live'}
            </div>
          </div>

          <div className="relative z-10 mt-6 text-left" style={{ transform: 'translateZ(36px)' }}>
            <p className="mb-2 text-xs font-mono uppercase tracking-[0.28em] text-slate-500">{contact.label}</p>
            <p className="break-all font-mono text-lg font-semibold text-white">{contact.value}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{contact.sub}</p>
          </div>

          <div
            className="relative z-10 mt-6 flex items-center justify-end gap-3 border-t border-slate-800/90 pt-4"
            style={{ transform: 'translateZ(22px)' }}
          >
            <a
              href={contact.href}
              target={contact.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-full border border-cyber-primary/30 bg-cyber-primary/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-cyber-primary transition-colors hover:bg-cyber-primary hover:text-black"
            >
              Open <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage = () => {
  const [orbitPaused, setOrbitPaused] = useState(false);

  return (
    <section id="contact" className="relative z-10 w-full py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <MessageCircle className="h-8 w-8 text-cyber-primary" />
            <h2 className="text-3xl font-mono font-bold text-slate-100 text-glow md:text-4xl">
              Let's Connect
            </h2>
          </div>
        </motion.div>

        <div className="contact-space-stage">
          <div className="contact-space-grid" />
          <div className="contact-space-glow contact-space-glow--one" />
          <div className="contact-space-glow contact-space-glow--two" />
          <div className="contact-space-core" />

          <div
            className="contact-space-ring"
            style={{
              '--quantity': contacts.length,
              animationPlayState: orbitPaused ? 'paused' : 'running',
            } as CSSProperties}
          >
            {contacts.map((contact, idx) => (
              <ContactCard
                key={contact.label}
                contact={contact}
                index={idx}
                paused={orbitPaused}
                onToggle={() => setOrbitPaused((prev) => !prev)}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="mb-4 font-mono text-slate-400">Prefer email? Send directly:</p>
          <a
            href="mailto:simmi121412@gmail.com"
            className="group inline-flex items-center gap-3 rounded-xl border border-cyber-primary bg-cyber-primary/10 px-10 py-5 text-lg font-bold tracking-wider text-cyber-primary shadow-glow-primary transition-all duration-300 hover:bg-cyber-primary hover:text-black"
          >
            <Mail size={22} className="transition-transform group-hover:scale-110" />
            simmi121412@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
};
