import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ShieldAlert, ArrowRight, CheckCircle } from 'lucide-react';
import { defenceFaultData } from '../../data/secenaiDefenceData';

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
   DEFENCE FAULT MANAGEMENT
   ═══════════════════════════════════════════ */

export default function DefenceFaultManagement() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'}`}
    >
      {/* Ambient glow */}
      {isDark && (
        <>
          <div className="pointer-events-none absolute right-[10%] top-[15%] h-[400px] w-[500px] rounded-full bg-neon/[0.02] blur-[180px]" />
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
            {defenceFaultData.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] text-center ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}
            variants={fadeUp}
          >
            {defenceFaultData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] text-center max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'}`}
            variants={fadeUp}
          >
            {defenceFaultData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-3xl mx-auto ${isDark ? 'bg-gradient-to-r from-transparent via-neon/20 to-transparent' : 'bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent'}`}
            variants={fadeUp}
          />

          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            {/* ── Conceptual Process Flow ── */}
            <motion.div className="w-full lg:w-5/12 order-2 lg:order-1" variants={fadeUp}>
              <div className={`glass-card rounded-2xl p-8 shadow-lg flex flex-col items-center justify-center gap-2`}>
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${isDark ? 'bg-neon/10 border border-neon/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                  <ShieldAlert size={28} className={isDark ? 'text-neon/80' : 'text-emerald-600'} />
                </div>
                
                {defenceFaultData.flowSteps.map((step, index) => (
                  <div key={step} className="flex flex-col items-center gap-2 w-full">
                    {index > 0 && (
                      <ArrowRight size={16} className={`rotate-90 ${isDark ? 'text-white/20' : 'text-gray-300'}`} />
                    )}
                    <div className={`w-full py-3 px-4 rounded-xl text-center transition-colors ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
                      <span className={`text-xs font-bold uppercase tracking-wider ${index === defenceFaultData.flowSteps.length - 1 ? (isDark ? 'text-neon' : 'text-emerald-700') : (isDark ? 'text-white/70' : 'text-gray-700')}`}>
                        {step}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Capabilities List ── */}
            <motion.div className="w-full lg:w-7/12 order-1 lg:order-2" variants={stagger}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {defenceFaultData.capabilities.map((cap) => (
                  <motion.div
                    key={cap}
                    className="flex items-start gap-3 p-2"
                    variants={fadeUp}
                  >
                    <CheckCircle size={16} className={`mt-0.5 shrink-0 ${isDark ? 'text-neon/60' : 'text-emerald-500'}`} />
                    <span className={`text-sm font-medium leading-relaxed ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
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
