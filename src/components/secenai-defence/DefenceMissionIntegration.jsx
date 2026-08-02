import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Navigation, Network, CheckCircle } from 'lucide-react';
import { defenceMissionData } from '../../data/secenaiDefenceData';

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

/* ═══════════════════════════════════════════
   DEFENCE MISSION INTEGRATION
   ═══════════════════════════════════════════ */

export default function DefenceMissionIntegration() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-[#f0f0f3]'}`}
    >
      {/* Ambient glow */}
      {isDark && (
        <div className="pointer-events-none absolute left-[15%] top-[25%] h-[400px] w-[500px] rounded-full bg-neon/[0.02] blur-[180px]" />
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
            {defenceMissionData.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] text-center ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}
            variants={fadeUp}
          >
            {defenceMissionData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] text-center max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'}`}
            variants={fadeUp}
          >
            {defenceMissionData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-3xl mx-auto ${isDark ? 'bg-gradient-to-r from-transparent via-neon/15 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'}`}
            variants={fadeUp}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* ── Navigation Integration ── */}
            <motion.div className="glass-card rounded-2xl p-8" variants={fadeUp}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-neon/10 border border-neon/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                  <Navigation size={24} className={isDark ? 'text-neon' : 'text-emerald-600'} />
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
                  Navigation Systems
                </h3>
              </div>
              <div className="grid gap-3">
                {defenceMissionData.navigation.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={16} className={`shrink-0 ${isDark ? 'text-neon/70' : 'text-emerald-500'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Mission Systems Integration ── */}
            <motion.div className="glass-card rounded-2xl p-8" variants={fadeUp}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? 'bg-neon/10 border border-neon/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                  <Network size={24} className={isDark ? 'text-neon' : 'text-emerald-600'} />
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
                  Mission Systems
                </h3>
              </div>
              <div className="grid gap-3">
                {defenceMissionData.mission.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={16} className={`shrink-0 ${isDark ? 'text-neon/70' : 'text-emerald-500'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
