import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Gauge } from 'lucide-react';
import { dualBarometerData } from '../../data/secenaiFCH743V1Data';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════
   PRESSURE WAVE ANIMATION
   ═══════════════════════════════════════════ */

function PressureWaves({ isDark, prefersReducedMotion }) {
  const lineColor = isDark ? 'rgba(204,255,0,0.12)' : 'rgba(83,137,68,0.15)';

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0.3, 0.5, 0.7].map((pos, i) => (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{
              top: `${pos * 100}%`,
              height: '1px',
              background: lineColor,
              opacity: 0.5,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0"
          style={{
            height: '1px',
            background: `linear-gradient(90deg, transparent 0%, ${lineColor} 30%, ${lineColor} 70%, transparent 100%)`,
          }}
          initial={{ top: '100%', opacity: 0 }}
          animate={{
            top: '-5%',
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: 6,
            delay: i * 1.2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   DUAL BAROMETER SECTION
   ═══════════════════════════════════════════ */

export default function DualBarometerSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${
        isDark ? 'bg-dark-900' : 'bg-[#f0f0f3]'
      }`}
    >
      {/* Ambient glow */}
      {isDark ? (
        <div className="pointer-events-none absolute right-[15%] top-[20%] h-[400px] w-[450px] rounded-full bg-[#6366f1]/[0.025] blur-[180px]" />
      ) : (
        <div className="pointer-events-none absolute right-[15%] top-[20%] h-[350px] w-[400px] rounded-full bg-emerald-300/[0.05] blur-[160px]" />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ─── Header ─── */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.span
            className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 ${
              isDark ? 'text-neon/50' : 'text-emerald-600/70'
            }`}
            variants={fadeUp}
          >
            {dualBarometerData.badge}
          </motion.span>

          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] ${
              isDark ? 'text-white' : 'text-[#1e1b4b]'
            }`}
            variants={fadeUp}
          >
            {dualBarometerData.title}
          </motion.h2>

          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] ${
              isDark ? 'text-white/50' : 'text-gray-600'
            }`}
            variants={fadeUp}
          >
            {dualBarometerData.description}
          </motion.p>
        </motion.div>

        {/* ─── Barometer Card Layout ─── */}
        <motion.div
          className="flex flex-col md:flex-row items-stretch justify-center gap-6 max-w-4xl mx-auto"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {/* BARO1 card */}
          <motion.div
            className="glass-card relative flex-1 rounded-2xl overflow-hidden"
            variants={fadeUp}
          >
            <PressureWaves isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
            <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10">
              <span
                className={`inline-block text-[0.5625rem] font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-md mb-5 ${
                  isDark ? 'bg-neon/[0.08] text-neon/60' : 'bg-emerald-50 text-emerald-500/80'
                }`}
              >
                {dualBarometerData.sensors[0].label}
              </span>
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
              }`}>
                <Gauge size={18} className={isDark ? 'text-neon' : 'text-emerald-600'} />
              </div>
              <h3 className={`text-xl font-bold font-[Outfit] ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'}`}>
                {dualBarometerData.sensors[0].name}
              </h3>
              <p className={`mt-1.5 text-sm leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                {dualBarometerData.sensors[0].description}
              </p>
              <span className={`mt-3 inline-block text-[0.625rem] font-medium tracking-wide ${isDark ? 'text-white/25' : 'text-gray-400'}`}>
                {dualBarometerData.sensors[0].spiBus}
              </span>
            </div>
          </motion.div>

          {/* Central cross-check label */}
          <motion.div
            className="flex flex-col items-center justify-center py-4 md:py-0 md:px-2"
            variants={fadeUp}
          >
            {/* Top connector */}
            <svg width="2" height="24" className="shrink-0 md:hidden">
              <line x1="1" y1="0" x2="1" y2="24"
                stroke={isDark ? 'rgba(204,255,0,0.3)' : 'rgba(83,137,68,0.35)'}
                strokeWidth="2"
                strokeDasharray={prefersReducedMotion ? 'none' : '4 3'}
              >
                {!prefersReducedMotion && (
                  <animate attributeName="stroke-dashoffset" values="7;0" dur="1.5s" repeatCount="indefinite" />
                )}
              </line>
            </svg>
            {/* Horizontal connectors (desktop) */}
            <div className="hidden md:flex items-center gap-0 w-full">
              <svg width="32" height="2" className="shrink-0">
                <line x1="0" y1="1" x2="32" y2="1"
                  stroke={isDark ? 'rgba(204,255,0,0.3)' : 'rgba(83,137,68,0.35)'}
                  strokeWidth="2"
                  strokeDasharray={prefersReducedMotion ? 'none' : '4 3'}
                >
                  {!prefersReducedMotion && (
                    <animate attributeName="stroke-dashoffset" values="7;0" dur="1.5s" repeatCount="indefinite" />
                  )}
                </line>
              </svg>

              <div
                className={`rounded-xl border px-5 py-4 text-center whitespace-nowrap ${
                  isDark
                    ? 'bg-neon/[0.05] border-neon/15'
                    : 'bg-emerald-50/80 border-emerald-200/40'
                }`}
              >
                <span className={`text-[0.625rem] font-bold tracking-[0.15em] uppercase block mb-0.5 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                  Firmware
                </span>
                <span className={`text-xs font-semibold ${isDark ? 'text-neon/70' : 'text-emerald-600'}`}>
                  {dualBarometerData.crossCheck}
                </span>
              </div>

              <svg width="32" height="2" className="shrink-0">
                <line x1="0" y1="1" x2="32" y2="1"
                  stroke={isDark ? 'rgba(204,255,0,0.3)' : 'rgba(83,137,68,0.35)'}
                  strokeWidth="2"
                  strokeDasharray={prefersReducedMotion ? 'none' : '4 3'}
                >
                  {!prefersReducedMotion && (
                    <animate attributeName="stroke-dashoffset" values="7;0" dur="1.5s" repeatCount="indefinite" />
                  )}
                </line>
              </svg>
            </div>

            {/* Mobile: central badge */}
            <div
              className={`md:hidden rounded-xl border px-5 py-4 text-center ${
                isDark
                  ? 'bg-neon/[0.05] border-neon/15'
                  : 'bg-emerald-50/80 border-emerald-200/40'
              }`}
            >
              <span className={`text-[0.625rem] font-bold tracking-[0.15em] uppercase block mb-0.5 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                Firmware
              </span>
              <span className={`text-xs font-semibold ${isDark ? 'text-neon/70' : 'text-emerald-600'}`}>
                {dualBarometerData.crossCheck}
              </span>
            </div>

            {/* Bottom connector */}
            <svg width="2" height="24" className="shrink-0 md:hidden">
              <line x1="1" y1="0" x2="1" y2="24"
                stroke={isDark ? 'rgba(204,255,0,0.3)' : 'rgba(83,137,68,0.35)'}
                strokeWidth="2"
                strokeDasharray={prefersReducedMotion ? 'none' : '4 3'}
              >
                {!prefersReducedMotion && (
                  <animate attributeName="stroke-dashoffset" values="7;0" dur="1.5s" repeatCount="indefinite" />
                )}
              </line>
            </svg>
          </motion.div>

          {/* BARO2 card */}
          <motion.div
            className="glass-card relative flex-1 rounded-2xl overflow-hidden"
            variants={fadeUp}
          >
            <PressureWaves isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
            <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10">
              <span
                className={`inline-block text-[0.5625rem] font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-md mb-5 ${
                  isDark ? 'bg-neon/[0.08] text-neon/60' : 'bg-emerald-50 text-emerald-500/80'
                }`}
              >
                {dualBarometerData.sensors[1].label}
              </span>
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
              }`}>
                <Gauge size={18} className={isDark ? 'text-neon' : 'text-emerald-600'} />
              </div>
              <h3 className={`text-xl font-bold font-[Outfit] ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'}`}>
                {dualBarometerData.sensors[1].name}
              </h3>
              <p className={`mt-1.5 text-sm leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                {dualBarometerData.sensors[1].description}
              </p>
              <span className={`mt-3 inline-block text-[0.625rem] font-medium tracking-wide ${isDark ? 'text-white/25' : 'text-gray-400'}`}>
                {dualBarometerData.sensors[1].spiBus}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
