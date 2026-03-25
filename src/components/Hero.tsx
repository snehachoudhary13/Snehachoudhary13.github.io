import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Download, ChevronDown } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/sounds';
import heroProfile from '../assets/hero-profile.jpeg';

export const Hero = () => {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyber-primary/30 bg-cyber-primary/10 px-3 py-1 text-cyber-primary">
              <Terminal className="h-4 w-4" />
              <span className="text-sm font-mono">SYSTEM.READY</span>
            </div>

            <h1 className="mb-4 text-5xl font-bold font-mono md:text-7xl">
              <span
                className="glitch bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent text-glow"
                data-text="Sneha Choudhary"
              >
                Sneha Choudhary
              </span>
            </h1>

            <h2 className="mb-6 text-xl font-mono text-slate-300 md:text-2xl">
              B.Tech CSE Student | <span className="text-cyber-accent">Cybersecurity Enthusiast</span>
            </h2>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-400">
              Passionate about exploring cybersecurity concepts like reconnaissance, OSINT, and web security. Focused on creating secure, scalable, and user-friendly systems.
            </p>

            <div className="mb-8 flex flex-wrap gap-4 text-sm md:text-base">
              <a
                href="https://pdflink.to/13d6cdd8/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="flex items-center gap-2 rounded border border-cyber-primary bg-cyber-primary/10 px-6 py-3 font-mono font-medium text-cyber-primary shadow-glow-primary transition-all duration-300 hover:bg-cyber-primary hover:text-cyber-bg"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/snehachoudhary13"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors duration-300 hover:text-cyber-primary"
              >
                <Github className="h-7 w-7" />
              </a>
              <a
                href="https://www.linkedin.com/in/sneha-choudhary-s1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors duration-300 hover:text-cyber-primary"
              >
                <Linkedin className="h-7 w-7" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 hidden items-center justify-center lg:flex"
          >
            <div className="relative h-80 w-80">
              <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full border-2 border-cyber-primary opacity-20" />
              <div className="absolute inset-8 animate-[spin_15s_linear_infinite_reverse] rounded-full border-2 border-dashed border-cyber-secondary opacity-40" />
              <div className="absolute inset-16 animate-pulse rounded-full border border-cyber-accent opacity-30" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-cyber-primary/70 bg-cyber-bg/50 shadow-glow-primary backdrop-blur-md">
                  <div className="absolute inset-0 rounded-full border border-cyber-primary/30" />
                  <div className="absolute left-0 top-0 h-1 w-full animate-[bounce_3s_infinite] rounded-full bg-cyber-primary shadow-[0_0_10px_#38bdf8]" />
                  <div className="absolute inset-[14px] overflow-hidden rounded-full border-2 border-cyber-accent/70 shadow-[0_0_24px_rgba(45,212,191,0.35)]">
                    <img
                      src={heroProfile}
                      alt="Sneha Choudhary profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-10 top-0 h-4 w-4 rounded-full bg-cyber-accent shadow-glow-accent"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-10 right-0 h-3 w-3 rounded-full bg-cyber-primary shadow-glow-primary"
              />
              <motion.div
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -left-8 top-1/2 h-5 w-5 rounded-full bg-cyber-secondary shadow-glow-secondary"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-2 text-cyber-primary/70"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
