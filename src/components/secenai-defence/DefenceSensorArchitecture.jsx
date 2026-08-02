import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Activity, ArrowRight, CheckCircle } from 'lucide-react';
import { defenceSensorData } from '../../data/secenaiDefenceData';

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
   DEFENCE SENSOR ARCHITECTURE
   ═══════════════════════════════════════════ */

export default function DefenceSensorArchitecture() {
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
        <>
          <div className="pointer-events-none absolute right-[10%] top-[10%] h-[400px] w-[450px] rounded-full bg-neon/[0.02] blur-[180px]" />
          <div className="pointer-events-none absolute left-[5%] bottom-[10%] h-[350px] w-[400px] rounded-full bg-[#6366f1]/[0.02] blur-[160px]" />
        </>
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
            {defenceSensorData.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] text-center ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}
            variants={fadeUp}
          >
            {defenceSensorData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] text-center max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'}`}
            variants={fadeUp}
          >
            {defenceSensorData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-3xl mx-auto ${isDark ? 'bg-gradient-to-r from-transparent via-neon/15 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'}`}
            variants={fadeUp}
          />

          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            {/* ── Capabilities List ── */}
            <motion.div className="flex-1" variants={stagger}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {defenceSensorData.capabilities.map((cap) => (
                  <motion.div
                    key={cap}
                    className="glass-card rounded-xl px-4 py-3 flex items-center gap-3"
                    variants={fadeUp}
                  >
                    <CheckCircle size={14} className={isDark ? 'text-neon/60 shrink-0' : 'text-emerald-500 shrink-0'} />
                    <span className={`text-xs font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                      {cap}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Conceptual Flow ── */}
            <motion.div className="flex-1 flex justify-center lg:justify-end" variants={fadeUp}>
              <div className={`w-full max-w-md rounded-2xl p-8 flex flex-col items-center justify-center gap-6 ${isDark ? 'bg-dark-800/80 border border-white/[0.06] shadow-xl' : 'bg-white border border-gray-200 shadow-md'}`}>
                
                {/* Inertial Sensors (Abstract blocks) */}
                <div className="flex justify-center gap-3 w-full">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className={`flex-1 aspect-square max-w-[80px] rounded-xl border flex items-center justify-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                      <Activity size={20} className={isDark ? 'text-white/30' : 'text-gray-400'} />
                    </div>
                  ))}
                </div>
                
                {/* Steps */}
                <div className="flex flex-col items-center gap-4 w-full">
                  {defenceSensorData.flowSteps.map((step, index) => (
                    <div key={step} className="flex flex-col items-center gap-4 w-full">
                      {index > 0 && (
                        <ArrowRight size={16} className={`rotate-90 ${isDark ? 'text-neon/50' : 'text-emerald-500/70'}`} />
                      )}
                      <div className={`w-full py-3 px-4 rounded-lg text-center ${index === defenceSensorData.flowSteps.length - 1 ? (isDark ? 'bg-neon/10 border border-neon/20' : 'bg-emerald-50 border border-emerald-200') : (isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200')}`}>
                        <span className={`text-xs font-bold uppercase tracking-wider ${index === defenceSensorData.flowSteps.length - 1 ? (isDark ? 'text-neon' : 'text-emerald-700') : (isDark ? 'text-white/60' : 'text-gray-600')}`}>
                          {step}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
