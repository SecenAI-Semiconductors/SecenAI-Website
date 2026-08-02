import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Cpu, ArrowRight } from 'lucide-react';
import { defenceProcessingData } from '../../data/secenaiDefenceData';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════
   DEFENCE PROCESSING
   ═══════════════════════════════════════════ */

export default function DefenceProcessing() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'}`}
    >
      {/* Ambient Glows */}
      {isDark ? (
        <>
          <div className="pointer-events-none absolute right-[10%] top-[15%] h-[400px] w-[500px] rounded-full bg-neon/[0.02] blur-[180px]" />
          <div className="pointer-events-none absolute left-0 bottom-0 h-[350px] w-[400px] rounded-full bg-[#6366f1]/[0.02] blur-[160px]" />
        </>
      ) : (
        <div className="pointer-events-none absolute right-[10%] top-[15%] h-[350px] w-[400px] rounded-full bg-emerald-400/[0.05] blur-[160px]" />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* ─── Left: Processor Visual ─── */}
          <motion.div
            className="w-full lg:flex-1 max-w-lg lg:max-w-none order-2 lg:order-1"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeIn}
          >
            <div className={prefersReducedMotion ? '' : 'animate-float-delayed'}>
              <div
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden p-8 flex flex-col items-center justify-center ${isDark ? 'bg-dark-800 border border-white/[0.06]' : 'bg-white border border-gray-200'}`}
                style={{
                  boxShadow: isDark
                    ? '0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)'
                    : '0 25px 80px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
                }}
              >
                {/* Circuit-pattern background */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: isDark
                      ? `radial-gradient(circle at 25% 35%, rgba(204,255,0,0.04) 0%, transparent 50%),
                         radial-gradient(circle at 75% 65%, rgba(99,102,241,0.03) 0%, transparent 50%)`
                      : `radial-gradient(circle at 25% 35%, rgba(83,137,68,0.05) 0%, transparent 50%),
                         radial-gradient(circle at 75% 65%, rgba(99,102,241,0.03) 0%, transparent 50%)`,
                  }}
                />

                {/* Grid lines */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: isDark
                      ? `linear-gradient(rgba(204,255,0,0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(204,255,0,0.03) 1px, transparent 1px)`
                      : `linear-gradient(rgba(83,137,68,0.04) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(83,137,68,0.04) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Conceptual Flow */}
                <div className="relative z-10 w-full flex flex-col items-center justify-center gap-4 text-center">
                  {defenceProcessingData.flowSteps.map((step, index) => (
                    <div key={step} className="flex flex-col items-center gap-4 w-full">
                      {index === 1 ? (
                        /* The central processor */
                        <div className={`w-full max-w-xs rounded-xl p-4 flex flex-col items-center justify-center gap-3 border ${isDark ? 'bg-neon/[0.08] border-neon/20 shadow-[0_0_30px_rgba(204,255,0,0.1)]' : 'bg-emerald-50 border-emerald-200 shadow-md'}`}>
                          <Cpu className={isDark ? 'text-neon/70' : 'text-emerald-600'} size={28} strokeWidth={1.5} />
                          <span className={`text-sm font-bold font-[Outfit] ${isDark ? 'text-white' : 'text-emerald-900'}`}>
                            {step}
                          </span>
                        </div>
                      ) : (
                        /* Normal step */
                        <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                          {step}
                        </span>
                      )}
                      
                      {index < defenceProcessingData.flowSteps.length - 1 && (
                        <div className={`h-6 w-px ${isDark ? 'bg-gradient-to-b from-transparent via-neon/30 to-transparent' : 'bg-gradient-to-b from-transparent via-emerald-400/40 to-transparent'}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Right: Text Content ─── */}
          <motion.div
            className="flex-1 max-w-xl order-1 lg:order-2"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            {/* Eyebrow */}
            <motion.span
              className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 ${isDark ? 'text-neon/50' : 'text-emerald-600/70'}`}
              variants={fadeUp}
            >
              {defenceProcessingData.badge}
            </motion.span>

            {/* Heading */}
            <motion.h2
              className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}
              variants={fadeUp}
            >
              {defenceProcessingData.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] ${isDark ? 'text-white/50' : 'text-gray-600'}`}
              variants={fadeUp}
            >
              {defenceProcessingData.description}
            </motion.p>

            {/* Divider */}
            <motion.div
              className={`my-8 h-px w-full ${isDark ? 'bg-gradient-to-r from-neon/15 via-white/5 to-transparent' : 'bg-gradient-to-r from-emerald-300/30 via-gray-200 to-transparent'}`}
              variants={fadeUp}
            />

            {/* Capability cards — 2 × grid */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3" variants={stagger}>
              {defenceProcessingData.capabilities.map((cap) => (
                <motion.div
                  key={cap}
                  className="glass-card rounded-xl px-4 py-3"
                  variants={fadeUp}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center`}>
                      <ArrowRight size={12} className={isDark ? 'text-neon/70' : 'text-emerald-600'} />
                    </div>
                    <span className={`block text-xs font-medium leading-relaxed ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                      {cap}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
