import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { CheckCircle } from 'lucide-react';
import { eduOverviewData } from '../../data/secenaiEduData';

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
   EDU OVERVIEW
   ═══════════════════════════════════════════ */

export default function EduOverview() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="edu-overview"
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-[#f0f0f3]'
        }`}
    >
      {/* Ambient glow */}
      {isDark && (
        <>
          <div className="pointer-events-none absolute left-[15%] top-[15%] h-112.5 w-125 rounded-full bg-neon/2 blur-[180px]" />
          <div className="pointer-events-none absolute right-[5%] bottom-[10%] h-87.5 w-100 rounded-full bg-[#6366f1]/2 blur-[160px]" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          className="text-center"
        >
          {/* Eyebrow */}
          <motion.span
            className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 ${isDark ? 'text-neon/50' : 'text-emerald-600/70'
              }`}
            variants={fadeUp}
          >
            {eduOverviewData.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] ${isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
            variants={fadeUp}
          >
            {eduOverviewData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'
              }`}
            variants={fadeUp}
          >
            {eduOverviewData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-3xl mx-auto ${isDark
              ? 'bg-linear-to-r from-transparent via-neon/15 to-transparent'
              : 'bg-linear-to-r from-transparent via-gray-200 to-transparent'
              }`}
            variants={fadeUp}
          />

          {/* ── Specification Strip ── */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto"
            variants={stagger}
          >
            {eduOverviewData.specStrip.map((spec) => (
              <motion.div
                key={spec.label}
                className="glass-card rounded-xl px-4 py-4"
                variants={fadeUp}
              >
                <span
                  className={`block text-[0.8125rem] font-bold tracking-wide leading-tight ${isDark ? 'text-neon' : 'text-emerald-600'
                    }`}
                >
                  {spec.value}
                </span>
                <span
                  className={`mt-1.5 block text-[0.6875rem] leading-snug ${isDark ? 'text-white/40' : 'text-gray-500'
                    }`}
                >
                  {spec.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── PCB Design Highlights ── */}
          <motion.div className="mt-12" variants={fadeUp}>
            <span
              className={`block text-[0.625rem] font-bold tracking-[0.2em] uppercase mb-4 ${isDark ? 'text-white/25' : 'text-gray-400'
                }`}
            >
              PCB Design
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {eduOverviewData.pcbHighlights.map((item) => (
                <span
                  key={item}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold border ${isDark
                    ? 'border-white/15 text-white/90 bg-white/10 shadow-sm'
                    : 'border-gray-300/80 text-gray-800 bg-white shadow-sm'
                    }`}
                >
                  <CheckCircle size={11} className={isDark ? 'text-neon/60' : 'text-emerald-500'} />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
