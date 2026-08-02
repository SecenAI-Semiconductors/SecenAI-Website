import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { CheckCircle } from 'lucide-react';
import { defenceConnectivityData } from '../../data/secenaiDefenceData';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════
   DEFENCE CONNECTIVITY
   ═══════════════════════════════════════════ */

export default function DefenceConnectivity() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'}`}
    >
      {/* Ambient glow */}
      {isDark && (
        <div className="pointer-events-none absolute right-[20%] top-[20%] h-[400px] w-[500px] rounded-full bg-neon/[0.02] blur-[180px]" />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {/* Eyebrow */}
          <motion.span
            className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 text-center w-full ${isDark ? 'text-neon/50' : 'text-emerald-600/70'}`}
            variants={fadeUp}
          >
            {defenceConnectivityData.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] text-center ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}
            variants={fadeUp}
          >
            {defenceConnectivityData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] text-center max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'}`}
            variants={fadeUp}
          >
            {defenceConnectivityData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-3xl mx-auto ${isDark ? 'bg-gradient-to-r from-transparent via-neon/15 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'}`}
            variants={fadeUp}
          />

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* ── Conceptual Layout Diagram ── */}
            <motion.div className="w-full lg:w-1/2 flex justify-center" variants={fadeIn}>
              <div className={`relative flex flex-col items-center justify-center p-8 lg:p-12 w-full max-w-md ${isMobile ? 'gap-4' : 'aspect-square'} rounded-full`}>
                
                {/* Central Node */}
                <div className={`relative z-10 flex items-center justify-center h-28 w-28 md:h-32 md:w-32 rounded-full border-4 ${isDark ? 'bg-dark-800 border-neon/30 shadow-[0_0_50px_rgba(204,255,0,0.15)]' : 'bg-white border-emerald-400 shadow-xl'}`}>
                  <div className="text-center">
                    <span className={`block font-[Outfit] font-bold text-[0.65rem] md:text-xs tracking-widest ${isDark ? 'text-white' : 'text-emerald-900'}`}>SECENAI</span>
                    <span className={`block font-[Outfit] font-bold text-[0.8rem] md:text-sm tracking-wider ${isDark ? 'text-neon' : 'text-emerald-600'}`}>DEFENCE</span>
                  </div>
                </div>

                {/* Connecting lines & tags (Desktop layout) */}
                {!isMobile && (
                  <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                    {/* Horizontal lines */}
                    <div className={`absolute w-full h-px ${isDark ? 'bg-neon/10' : 'bg-emerald-200/50'}`} />
                    <div className={`absolute h-full w-px ${isDark ? 'bg-neon/10' : 'bg-emerald-200/50'}`} />
                    {/* Diagonal lines */}
                    <div className={`absolute w-full h-px rotate-45 ${isDark ? 'bg-neon/10' : 'bg-emerald-200/50'}`} />
                    <div className={`absolute w-full h-px -rotate-45 ${isDark ? 'bg-neon/10' : 'bg-emerald-200/50'}`} />

                    {/* Tags positioned around a circle */}
                    {defenceConnectivityData.peripherals.map((peripheral, idx) => {
                      const total = defenceConnectivityData.peripherals.length;
                      // Start at -90deg (top) and go clockwise
                      const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / total;
                      const radius = 140; // Desktop radius
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;

                      return (
                        <div
                          key={peripheral}
                          className="absolute pointer-events-auto transition-transform hover:scale-105"
                          style={{
                            transform: `translate(${x}px, ${y}px)`,
                          }}
                        >
                          <span className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-wider shadow-sm ${isDark ? 'bg-dark-900 text-white/80 border border-white/10' : 'bg-white text-gray-700 border border-gray-200'}`}>
                            {peripheral}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Mobile tags (Stacked layout) */}
                {isMobile && (
                  <div className="flex flex-wrap justify-center gap-2 mt-4 relative z-10">
                    {defenceConnectivityData.peripherals.map((peripheral) => (
                      <span key={peripheral} className={`rounded-full px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-wider border ${isDark ? 'bg-dark-800 text-white/80 border-white/10' : 'bg-white text-gray-700 border-gray-200 shadow-sm'}`}>
                        {peripheral}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* ── Capabilities List ── */}
            <motion.div className="w-full lg:w-1/2" variants={stagger}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {defenceConnectivityData.capabilities.map((cap) => (
                  <motion.div
                    key={cap}
                    className="glass-card rounded-xl px-4 py-3 flex items-start gap-3"
                    variants={fadeUp}
                  >
                    <CheckCircle size={14} className={`mt-0.5 shrink-0 ${isDark ? 'text-neon/60' : 'text-emerald-500'}`} />
                    <span className={`text-xs font-medium leading-relaxed ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                      {cap}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
