import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Layers, ShieldCheck, Vote, AlertTriangle } from 'lucide-react';
import { tripleIMUData } from '../../data/secenaiFCH743V1Data';

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
   FEATURE ICONS
   ═══════════════════════════════════════════ */

const featureIcons = {
  'Automatic IMU failover': ShieldCheck,
  'Sensor voting': Vote,
  'IMU fault isolation': AlertTriangle,
};

/* ═══════════════════════════════════════════
   SPI BUS TOPOLOGY DIAGRAM
   ═══════════════════════════════════════════ */

function BusTopologyDiagram({ isDark, prefersReducedMotion }) {
  const lineColor = isDark ? 'rgba(204,255,0,0.35)' : 'rgba(83,137,68,0.4)';
  const lineColorDim = isDark ? 'rgba(204,255,0,0.15)' : 'rgba(83,137,68,0.2)';
  const nodeText = isDark ? 'text-white/70' : 'text-gray-700';
  const nodeTextDim = isDark ? 'text-white/40' : 'text-gray-500';
  const nodeBg = isDark ? 'bg-dark-800 border-white/[0.08]' : 'bg-white border-gray-200';
  const accentBg = isDark ? 'bg-neon/[0.08] border-neon/20' : 'bg-emerald-50 border-emerald-200/50';
  const outputBg = isDark ? 'bg-neon/[0.06] border-neon/15' : 'bg-emerald-50/80 border-emerald-200/40';

  return (
    <div className="relative mt-10">
      {/* Responsive stacked layout */}
      <div className="flex flex-col items-center gap-3">
        {/* SPI Bus A — shared */}
        <div className={`w-full max-w-md rounded-xl border px-5 py-4 ${nodeBg}`}>
          <span className={`block text-[0.625rem] font-bold tracking-[0.2em] uppercase mb-2.5 ${nodeTextDim}`}>
            SPI Bus A — Shared
          </span>
          <div className="flex gap-3">
            {tripleIMUData.sensors.slice(0, 2).map((s, i) => (
              <div key={i} className={`flex-1 rounded-lg border px-3 py-2.5 ${accentBg}`}>
                <span className={`block text-xs font-semibold ${isDark ? 'text-neon' : 'text-emerald-600'}`}>
                  {s.name}
                </span>
                <span className={`block text-[0.625rem] mt-0.5 ${nodeTextDim}`}>{s.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connector lines */}
        <svg width="2" height="20" className="shrink-0">
          <line x1="1" y1="0" x2="1" y2="20" stroke={lineColor} strokeWidth="2" strokeDasharray={prefersReducedMotion ? 'none' : '4 3'}>
            {!prefersReducedMotion && (
              <animate attributeName="stroke-dashoffset" values="7;0" dur="1.5s" repeatCount="indefinite" />
            )}
          </line>
        </svg>

        {/* SPI Bus B — separate */}
        <div className={`w-full max-w-md rounded-xl border px-5 py-4 ${nodeBg}`}>
          <span className={`block text-[0.625rem] font-bold tracking-[0.2em] uppercase mb-2.5 ${nodeTextDim}`}>
            SPI Bus B — Separate
          </span>
          <div className={`rounded-lg border px-3 py-2.5 max-w-[50%] ${accentBg}`}>
            <span className={`block text-xs font-semibold ${isDark ? 'text-neon' : 'text-emerald-600'}`}>
              {tripleIMUData.sensors[2].name}
            </span>
            <span className={`block text-[0.625rem] mt-0.5 ${nodeTextDim}`}>{tripleIMUData.sensors[2].role}</span>
          </div>
        </div>

        {/* Connector lines */}
        <svg width="2" height="24" className="shrink-0">
          <line x1="1" y1="0" x2="1" y2="24" stroke={lineColor} strokeWidth="2" strokeDasharray={prefersReducedMotion ? 'none' : '4 3'}>
            {!prefersReducedMotion && (
              <animate attributeName="stroke-dashoffset" values="7;0" dur="1.5s" repeatCount="indefinite" />
            )}
          </line>
        </svg>

        {/* Output node */}
        <div className={`w-full max-w-md rounded-xl border px-5 py-4 text-center ${outputBg}`}>
          <span className={`text-sm font-semibold ${isDark ? 'text-neon/80' : 'text-emerald-600'}`}>
            Flight-State Estimation
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TRIPLE IMU SECTION
   ═══════════════════════════════════════════ */

export default function TripleIMUSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${
        isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
      }`}
    >
      {/* Ambient glow */}
      {isDark && (
        <>
          <div className="pointer-events-none absolute left-[20%] top-[10%] h-[400px] w-[500px] rounded-full bg-neon/[0.02] blur-[180px]" />
          <div className="pointer-events-none absolute right-[5%] bottom-[10%] h-[350px] w-[400px] rounded-full bg-[#6366f1]/[0.02] blur-[150px]" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">

          {/* ─── Left: Text + Sensor Cards ─── */}
          <motion.div
            className="flex-1 max-w-xl"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            {/* Eyebrow */}
            <motion.span
              className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 ${
                isDark ? 'text-neon/50' : 'text-emerald-600/70'
              }`}
              variants={fadeUp}
            >
              {tripleIMUData.badge}
            </motion.span>

            {/* Heading */}
            <motion.h2
              className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] ${
                isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
              variants={fadeUp}
            >
              {tripleIMUData.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] ${
                isDark ? 'text-white/50' : 'text-gray-600'
              }`}
              variants={fadeUp}
            >
              {tripleIMUData.description}
            </motion.p>

            {/* Divider */}
            <motion.div
              className={`my-8 h-px w-full ${
                isDark
                  ? 'bg-gradient-to-r from-neon/15 via-white/5 to-transparent'
                  : 'bg-gradient-to-r from-emerald-300/30 via-gray-200 to-transparent'
              }`}
              variants={fadeUp}
            />

            {/* Sensor Cards */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-3" variants={stagger}>
              {tripleIMUData.sensors.map((sensor, i) => (
                <motion.div
                  key={`${sensor.name}-${i}`}
                  className="glass-card rounded-xl px-4 py-5"
                  variants={fadeUp}
                >
                  <div
                    className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${
                      isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
                    }`}
                  >
                    <Layers size={14} className={isDark ? 'text-neon' : 'text-emerald-600'} />
                  </div>
                  <h3 className={`text-sm font-semibold ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'}`}>
                    {sensor.name}
                  </h3>
                  <p className={`mt-1 text-[0.6875rem] leading-relaxed ${isDark ? 'text-white/35' : 'text-gray-500'}`}>
                    {sensor.axes}
                  </p>
                  <span
                    className={`mt-2.5 inline-block text-[0.5625rem] font-semibold tracking-[0.15em] uppercase px-2 py-1 rounded-md ${
                      sensor.spiBus.includes('Shared')
                        ? isDark
                          ? 'bg-white/[0.04] text-white/30'
                          : 'bg-gray-100 text-gray-400'
                        : isDark
                          ? 'bg-neon/[0.06] text-neon/50'
                          : 'bg-emerald-50 text-emerald-500/70'
                    }`}
                  >
                    {sensor.spiBus}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Feature badges */}
            <motion.div className="mt-8 flex flex-wrap gap-3" variants={stagger}>
              {tripleIMUData.features.map((feat) => {
                const Icon = featureIcons[feat] || ShieldCheck;
                return (
                  <motion.div
                    key={feat}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium border ${
                      isDark
                        ? 'border-white/[0.06] text-white/50 bg-white/[0.02]'
                        : 'border-gray-200 text-gray-500 bg-gray-50'
                    }`}
                    variants={fadeUp}
                  >
                    <Icon size={12} className={isDark ? 'text-neon/60' : 'text-emerald-500'} />
                    {feat}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ─── Right: Bus Topology Diagram ─── */}
          <motion.div
            className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <BusTopologyDiagram isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
