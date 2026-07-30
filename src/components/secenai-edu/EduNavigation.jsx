import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Activity, Gauge, SatelliteDish, Compass } from 'lucide-react';
import { eduNavigationData } from '../../data/secenaiEduData';

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
   EDU NAVIGATION
   ═══════════════════════════════════════════ */

export default function EduNavigation() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { imu, barometer, gps } = eduNavigationData;

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-[#f0f0f3]'
        }`}
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
            className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 text-center w-full ${isDark ? 'text-neon/50' : 'text-emerald-600/70'
              }`}
            variants={fadeUp}
          >
            {eduNavigationData.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] text-center ${isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
            variants={fadeUp}
          >
            {eduNavigationData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] text-center max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'
              }`}
            variants={fadeUp}
          >
            {eduNavigationData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-3xl mx-auto ${isDark
              ? 'bg-linear-to-r from-transparent via-neon/15 to-transparent'
              : 'bg-linear-to-r from-transparent via-gray-200 to-transparent'
              }`}
            variants={fadeUp}
          />

          {/* ── Sensor Cards: IMU + Barometer + GPS ── */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
            variants={stagger}
          >
            {/* IMU Card */}
            <motion.div className="glass-card rounded-xl px-6 py-6" variants={fadeUp}>
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
                  }`}
              >
                <Activity size={18} className={isDark ? 'text-neon' : 'text-emerald-600'} />
              </div>
              <span
                className={`block text-[0.625rem] font-bold tracking-[0.15em] uppercase mb-1 ${isDark ? 'text-neon/50' : 'text-emerald-600/70'
                  }`}
              >
                1× {imu.name}
              </span>
              <h3
                className={`text-sm font-semibold mb-2 ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'
                  }`}
              >
                {imu.role}
              </h3>
              <p
                className={`text-[0.75rem] leading-relaxed mb-2 ${isDark ? 'text-white/40' : 'text-gray-600'
                  }`}
              >
                {imu.axes}
              </p>
              <p
                className={`text-[0.6875rem] leading-relaxed ${isDark ? 'text-white/30' : 'text-gray-500'
                  }`}
              >
                {imu.note}
              </p>
            </motion.div>

            {/* Barometer Card */}
            <motion.div className="glass-card rounded-xl px-6 py-6" variants={fadeUp}>
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
                  }`}
              >
                <Gauge size={18} className={isDark ? 'text-neon' : 'text-emerald-600'} />
              </div>
              <span
                className={`block text-[0.625rem] font-bold tracking-[0.15em] uppercase mb-1 ${isDark ? 'text-neon/50' : 'text-emerald-600/70'
                  }`}
              >
                1× {barometer.name}
              </span>
              <h3
                className={`text-sm font-semibold mb-2 ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'
                  }`}
              >
                {barometer.role}
              </h3>
              <p
                className={`text-[0.75rem] leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-600'
                  }`}
              >
                {barometer.note}
              </p>
            </motion.div>

            {/* GPS Card */}
            <motion.div className="glass-card rounded-xl px-6 py-6" variants={fadeUp}>
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
                  }`}
              >
                <SatelliteDish size={18} className={isDark ? 'text-neon' : 'text-emerald-600'} />
              </div>
              <span
                className={`block text-[0.625rem] font-bold tracking-[0.15em] uppercase mb-1 ${isDark ? 'text-neon/50' : 'text-emerald-600/70'
                  }`}
              >
                {gps.port}
              </span>
              <h3
                className={`text-sm font-semibold mb-2 ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'
                  }`}
              >
                GPS & External Compass
              </h3>
              <p
                className={`text-[0.75rem] leading-relaxed mb-2 ${isDark ? 'text-white/40' : 'text-gray-600'
                  }`}
              >
                {gps.note}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {gps.compatibility.map((sys) => (
                  <span
                    key={sys}
                    className={`inline-block rounded-full px-2.5 py-1 text-[0.625rem] font-semibold ${isDark
                      ? 'bg-white/10 text-white/60 border border-white/10'
                      : 'bg-white text-gray-700 border border-gray-200 shadow-xs'
                      }`}
                  >
                    {sys}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Note: Single sensor architecture ── */}
          <motion.div
            className={`mt-8 flex items-center justify-center gap-2.5 rounded-xl border px-5 py-3.5 max-w-md mx-auto ${isDark
              ? 'bg-white/3 border-white/12 shadow-sm'
              : 'bg-white border-gray-300 shadow-sm'
              }`}
            variants={fadeUp}
          >
            <Compass size={14} className={isDark ? 'text-neon/40' : 'text-emerald-500/60'} />
            <span className={`text-xs font-medium ${isDark ? 'text-white/35' : 'text-gray-400'}`}>
              Single IMU · Single barometer · External compass via GPS module
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
