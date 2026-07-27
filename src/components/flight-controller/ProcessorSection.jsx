import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Cpu, Gauge, Activity, Radio } from 'lucide-react';

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
   FEATURE BLOCKS
   ═══════════════════════════════════════════ */

const featureBlocks = [
  {
    icon: Cpu,
    title: 'Arm Cortex-M7',
    description: 'High-performance 32-bit core with hardware FPU and L1 cache for deterministic real-time execution.',
  },
  {
    icon: Gauge,
    title: 'Up to 480 MHz',
    description: 'Industry-leading clock speed delivering the headroom for sensor fusion and advanced flight algorithms.',
  },
  {
    icon: Activity,
    title: 'Real-time flight processing',
    description: 'Sub-millisecond control-loop execution for precise attitude estimation and stabilisation.',
  },
  {
    icon: Radio,
    title: 'High-rate sensor acquisition',
    description: 'Dedicated DMA channels enable parallel readout of multiple sensors without CPU bottlenecks.',
  },
];

/* ═══════════════════════════════════════════
   PROCESSOR SECTION
   ═══════════════════════════════════════════ */

export default function ProcessorSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-[#f0f0f3]'
        }`}
    >
      {/* ── Ambient Glows ── */}
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

          {/* ─── Left: Processor Image Placeholder ─── */}
          <motion.div
            className="w-full lg:flex-1 max-w-lg lg:max-w-none order-2 lg:order-1"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeIn}
          >
            <div className={prefersReducedMotion ? '' : 'animate-float-delayed'}>
              <div
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${isDark
                  ? 'bg-dark-800 border border-white/[0.06]'
                  : 'bg-white border border-gray-200'
                  }`}
                style={{
                  boxShadow: isDark
                    ? '0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)'
                    : '0 25px 80px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
                }}
              >
                {/* Circuit-pattern background for the placeholder */}
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

                {/* Grid lines suggesting circuit traces */}
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

                {/* Centre chip icon */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
                  <div
                    className={`h-20 w-20 rounded-2xl flex items-center justify-center ${isDark ? 'bg-neon/[0.08] border border-neon/10' : 'bg-emerald-50 border border-emerald-200/40'
                      }`}
                  >
                    <Cpu
                      className={isDark ? 'text-neon/50' : 'text-emerald-500/60'}
                      size={32}
                      strokeWidth={1.5}
                    />
                  </div>
                  <span
                    className={`text-[0.6875rem] font-semibold tracking-[0.2em] uppercase ${isDark ? 'text-white/15' : 'text-gray-300'
                      }`}
                  >
                    Processor Macro Render
                  </span>
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
              className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 ${isDark ? 'text-neon/50' : 'text-emerald-600/70'
                }`}
              variants={fadeUp}
            >
              Processing Core
            </motion.span>

            {/* Heading */}
            <motion.h2
              className="font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12]"
              variants={fadeUp}
            >
              <span className={isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}>
                H7
              </span>
              <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>
                {' '}performance at the core
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] ${isDark ? 'text-white/50' : 'text-gray-600'
                }`}
              variants={fadeUp}
            >
              The SECENAI FC H743 V1 is powered by the STM32H743, built around an
              Arm Cortex-M7 core operating at up to 480 MHz. It provides the real-time
              processing performance required for high-rate sensor acquisition,
              flight-state estimation, control loops and autonomous UAV workloads.
            </motion.p>

            {/* Divider */}
            <motion.div
              className={`my-8 h-px w-full ${isDark
                ? 'bg-gradient-to-r from-neon/15 via-white/5 to-transparent'
                : 'bg-gradient-to-r from-emerald-300/30 via-gray-200 to-transparent'
                }`}
              variants={fadeUp}
            />

            {/* Feature Blocks — 2 × 2 grid */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3" variants={stagger}>
              {featureBlocks.map((block) => {
                const Icon = block.icon;
                return (
                  <motion.div
                    key={block.title}
                    className="glass-card rounded-xl px-5 py-5"
                    variants={fadeUp}
                  >
                    <div
                      className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
                        }`}
                    >
                      <Icon
                        size={16}
                        className={isDark ? 'text-neon' : 'text-emerald-600'}
                      />
                    </div>
                    <h3
                      className={`text-sm font-semibold leading-tight ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'
                        }`}
                    >
                      {block.title}
                    </h3>
                    <p
                      className={`mt-1.5 text-[0.75rem] leading-relaxed ${isDark ? 'text-white/35' : 'text-gray-500'
                        }`}
                    >
                      {block.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
