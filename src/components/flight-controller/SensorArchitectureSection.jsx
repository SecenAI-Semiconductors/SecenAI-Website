import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck } from 'lucide-react';
import { sensorArchitectureData, tripleIMUData, dualBarometerData } from '../../data/secenaiFCH743V1Data';

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
   ANIMATED SIGNAL LINE
   ═══════════════════════════════════════════ */

function SignalLine({ direction = 'down', length = 28, isDark, prefersReducedMotion }) {
  const color = isDark ? 'rgba(204,255,0,0.3)' : 'rgba(83,137,68,0.35)';
  const isHorizontal = direction === 'right';

  if (isHorizontal) {
    return (
      <svg width={length} height="2" className="shrink-0">
        <line x1="0" y1="1" x2={length} y2="1" stroke={color} strokeWidth="2"
          strokeDasharray={prefersReducedMotion ? 'none' : '4 3'}
        >
          {!prefersReducedMotion && (
            <animate attributeName="stroke-dashoffset" values="7;0" dur="1.5s" repeatCount="indefinite" />
          )}
        </line>
      </svg>
    );
  }

  return (
    <svg width="2" height={length} className="shrink-0 mx-auto">
      <line x1="1" y1="0" x2="1" y2={length} stroke={color} strokeWidth="2"
        strokeDasharray={prefersReducedMotion ? 'none' : '4 3'}
      >
        {!prefersReducedMotion && (
          <animate attributeName="stroke-dashoffset" values="7;0" dur="1.5s" repeatCount="indefinite" />
        )}
      </line>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   PIPELINE NODE
   ═══════════════════════════════════════════ */

function PipelineNode({ label, type, isDark }) {
  const styles = {
    data: isDark
      ? 'bg-dark-800 border-white/12 text-white/70 shadow-md'
      : 'bg-white border-gray-300 text-gray-700 shadow-md',
    process: isDark
      ? 'bg-white/[0.05] border-neon/20 text-white/70 shadow-md'
      : 'bg-white border-emerald-300/70 text-gray-700 shadow-md',
    output: isDark
      ? 'bg-neon/[0.08] border-neon/30 text-neon/90 shadow-md'
      : 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-md',
  };

  return (
    <div className={`rounded-lg border px-4 py-2.5 text-center text-xs font-semibold ${styles[type] || styles.data}`}>
      {label}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SENSOR SOURCE NODE
   ═══════════════════════════════════════════ */

function SensorNode({ name, isDark }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 text-[0.6875rem] font-medium whitespace-nowrap ${isDark
          ? 'bg-dark-800 border-white/12 text-white/70 shadow-md'
          : 'bg-white border-gray-300 text-gray-700 shadow-md'
        }`}
    >
      {name}
    </div>
  );
}

/* ═══════════════════════════════════════════
   ARCHITECTURE DIAGRAM
   ═══════════════════════════════════════════ */

function ArchitectureDiagram({ isDark, prefersReducedMotion }) {
  const labelDim = isDark ? 'text-white/25' : 'text-gray-400';
  const imuSensors = tripleIMUData.sensors;
  const baroSensors = dualBarometerData.sensors;
  const imuPipeline = sensorArchitectureData.imuPipeline;
  const baroPipeline = sensorArchitectureData.baroPipeline;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* ── IMU Pipeline ── */}
      <div className="mb-2">
        <span className={`block text-[0.5625rem] font-bold tracking-[0.2em] uppercase mb-3 ${labelDim}`}>
          Inertial Pipeline
        </span>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0">
          {/* Sensor sources */}
          <div className="flex flex-col gap-2 shrink-0">
            {imuSensors.map((s, i) => (
              <SensorNode key={`imu-${i}`} name={s.name} isDark={isDark} />
            ))}
          </div>

          {/* Arrow */}
          <div className="hidden sm:block px-1">
            <SignalLine direction="right" length={24} isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
          </div>
          <div className="sm:hidden">
            <SignalLine direction="down" length={20} isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
          </div>

          {/* Pipeline nodes */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 flex-1">
            {imuPipeline.map((node, i) => (
              <div key={node.label} className="flex flex-col sm:flex-row items-center">
                <PipelineNode label={node.label} type={node.type} isDark={isDark} />
                {i < imuPipeline.length - 1 && (
                  <>
                    <div className="hidden sm:block px-1">
                      <SignalLine direction="right" length={16} isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
                    </div>
                    <div className="sm:hidden">
                      <SignalLine direction="down" length={16} isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Separator ── */}
      <div className={`my-8 h-px w-full ${isDark ? 'bg-white/[0.04]' : 'bg-gray-200/60'}`} />

      {/* ── Barometer Pipeline ── */}
      <div>
        <span className={`block text-[0.5625rem] font-bold tracking-[0.2em] uppercase mb-3 ${labelDim}`}>
          Barometric Pipeline
        </span>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0">
          {/* Sensor sources */}
          <div className="flex flex-col gap-2 shrink-0">
            {baroSensors.map((s, i) => (
              <SensorNode key={`baro-${i}`} name={`${s.label} — ${s.name}`} isDark={isDark} />
            ))}
          </div>

          {/* Arrow */}
          <div className="hidden sm:block px-1">
            <SignalLine direction="right" length={24} isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
          </div>
          <div className="sm:hidden">
            <SignalLine direction="down" length={20} isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
          </div>

          {/* Pipeline nodes */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 flex-1">
            {baroPipeline.map((node, i) => (
              <div key={node.label} className="flex flex-col sm:flex-row items-center">
                <PipelineNode label={node.label} type={node.type} isDark={isDark} />
                {i < baroPipeline.length - 1 && (
                  <>
                    <div className="hidden sm:block px-1">
                      <SignalLine direction="right" length={16} isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
                    </div>
                    <div className="sm:hidden">
                      <SignalLine direction="down" length={16} isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SENSOR ARCHITECTURE SECTION
   ═══════════════════════════════════════════ */

export default function SensorArchitectureSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="sensor-architecture"
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
        }`}
    >
      {/* Ambient glow */}
      {isDark && (
        <>
          <div className="pointer-events-none absolute left-[10%] top-[15%] h-[400px] w-[500px] rounded-full bg-neon/[0.02] blur-[180px]" />
          <div className="pointer-events-none absolute right-[10%] bottom-[10%] h-[300px] w-[400px] rounded-full bg-[#6366f1]/[0.02] blur-[160px]" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ─── Header ─── */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.span
            className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 ${isDark ? 'text-neon/50' : 'text-emerald-600/70'
              }`}
            variants={fadeUp}
          >
            {sensorArchitectureData.badge}
          </motion.span>

          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] ${isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
            variants={fadeUp}
          >
            {sensorArchitectureData.title}
          </motion.h2>

          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] ${isDark ? 'text-white/50' : 'text-gray-600'
              }`}
            variants={fadeUp}
          >
            {sensorArchitectureData.description}
          </motion.p>
        </motion.div>

        {/* ─── Architecture Diagram ─── */}
        <motion.div
          className={`glass-card rounded-2xl p-6 sm:p-8 md:p-10 ${isDark ? '' : ''
            }`}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <ArchitectureDiagram isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
        </motion.div>

        {/* ─── Bus Note ─── */}
        <motion.p
          className={`mt-8 text-center text-[0.8125rem] leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-white/30' : 'text-gray-400'
            }`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {sensorArchitectureData.busNote}
        </motion.p>

        {/* ─── Mechanical Isolation Features ─── */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {sensorArchitectureData.mechanicalIsolation.map((feature) => (
            <motion.div
              key={feature}
              className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-semibold border ${isDark
                  ? 'border-white/15 text-white/90 bg-white/10 shadow-sm'
                  : 'border-gray-300/80 text-gray-800 bg-white shadow-sm'
                }`}
              variants={fadeUp}
            >
              <ShieldCheck size={14} className={isDark ? 'text-neon' : 'text-emerald-600'} />
              {feature}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
