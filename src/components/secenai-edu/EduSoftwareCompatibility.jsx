import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, Info } from 'lucide-react';
import { eduSoftwareData } from '../../data/secenaiEduData';

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
   EDU SOFTWARE COMPATIBILITY
   ═══════════════════════════════════════════ */

export default function EduSoftwareCompatibility() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
        }`}
    >
      {/* Ambient glow */}
      {isDark && (
        <>
          <div className="pointer-events-none absolute right-[10%] top-[15%] h-[400px] w-[450px] rounded-full bg-neon/[0.02] blur-[180px]" />
          <div className="pointer-events-none absolute left-[5%] bottom-[10%] h-[350px] w-[400px] rounded-full bg-[#6366f1]/[0.02] blur-[160px]" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          className="text-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {/* Eyebrow */}
          <motion.span
            className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 ${isDark ? 'text-neon/50' : 'text-emerald-600/70'
              }`}
            variants={fadeUp}
          >
            {eduSoftwareData.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] max-w-2xl mx-auto ${isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
            variants={fadeUp}
          >
            {eduSoftwareData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] max-w-2xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'
              }`}
            variants={fadeUp}
          >
            {eduSoftwareData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-2xl mx-auto ${isDark
              ? 'bg-gradient-to-r from-transparent via-neon/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent'
              }`}
            variants={fadeUp}
          />

          {/* ── Platform Cards ── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8"
            variants={stagger}
          >
            {eduSoftwareData.platforms.map((platform) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl px-6 py-8 block text-center group/fw transition-all duration-300 hover:scale-[1.02]"
                variants={fadeUp}
              >
                {/* Logo */}
                <div className="mb-6 flex h-14 w-full items-center justify-center">
                  <img
                    src={platform.logo}
                    alt={`${platform.name} logo`}
                    className="h-12 w-auto max-w-[170px]"
                    style={{ objectFit: 'contain' }}
                  />
                </div>

                <h3
                  className={`text-xl font-bold font-[Outfit] ${isDark ? 'text-white/90' : 'text-[#1e1b4b]'
                    }`}
                >
                  {platform.name}
                </h3>
                <p
                  className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-600'
                    }`}
                >
                  {platform.description}
                </p>

                {/* External link hint */}
                <span
                  className={`mt-4 inline-flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors ${isDark
                    ? 'text-neon/70 group-hover/fw:text-neon'
                    : 'text-emerald-600 group-hover/fw:text-emerald-700'
                    }`}
                >
                  Visit {platform.name} →
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* ── Ecosystem Tools ── */}
          <motion.div className="mt-8" variants={fadeUp}>
            <span
              className={`block text-[0.625rem] font-bold tracking-[0.2em] uppercase mb-3 ${isDark ? 'text-white/25' : 'text-gray-400'
                }`}
            >
              Ecosystem Tools
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {eduSoftwareData.ecosystemTools.map((tool) => (
                <span
                  key={tool}
                  className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold border ${isDark
                    ? 'border-white/15 text-white/90 bg-white/10 shadow-sm'
                    : 'border-gray-300/80 text-gray-800 bg-white shadow-sm'
                    }`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Validation Notice ── */}
          <motion.div
            className={`mt-8 flex items-center justify-center gap-3 rounded-xl border px-5 py-4 max-w-2xl mx-auto ${isDark
              ? 'bg-white/10 border-white/20 text-white/90 shadow-md'
              : 'bg-white border-gray-300 text-gray-800 shadow-md'
              }`}
            variants={fadeUp}
          >
            <Info size={16} className={`shrink-0 ${isDark ? 'text-neon/70' : 'text-emerald-600'}`} />
            <span className={`text-xs leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              {eduSoftwareData.validationNotice}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
