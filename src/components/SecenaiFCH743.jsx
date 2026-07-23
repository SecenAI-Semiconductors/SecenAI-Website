import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Zap, Layers, Gauge, Cable, Code2, Network } from 'lucide-react';
import fcH743Img from '../assets/fc-h743.png';

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

/* ═══════════════════════════════════════════
   KEY FEATURES DATA
   ═══════════════════════════════════════════ */

const features = [
  { icon: Zap, text: 'High-Speed STM32H743 Processor' },
  { icon: Layers, text: 'Triple IMU Redundancy' },
  { icon: Gauge, text: 'Dual Barometric Sensors' },
  { icon: Cable, text: 'Extensive Connectivity - CAN, UART, I2C' },
  { icon: Code2, text: 'ArduPilot & PX4 Compatible' },
  { icon: Network, text: 'DroneCAN Ready' },
];

/* ═══════════════════════════════════════════
   SECENAI FC H743 COMPONENT
   ═══════════════════════════════════════════ */

export default function SecenaiFCH743() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="secenai-fc-h743"
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-[#f0f0f3]'
        }`}
    >
      {/* Background ambient glow */}
      {isDark && (
        <>
          <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[600px] rounded-full bg-neon/[0.025] blur-[200px]" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[#6366f1]/[0.02] blur-[160px]" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: Product Image ── */}
          <motion.div
            className="w-full lg:flex-1 max-w-lg lg:max-w-none"
            initial={{ opacity: 0, x: -50, scale: 0.96 }}
            animate={
              inView
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: -50, scale: 0.96 }
            }
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div
              className="relative rounded-2xl overflow-hidden group"
              style={{
                boxShadow: isDark
                  ? '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)'
                  : '0 25px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
              }}
            >
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(204,255,0,0.05) 0%, transparent 50%, rgba(99,102,241,0.04) 100%)'
                    : 'linear-gradient(135deg, rgba(83,137,68,0.06) 0%, transparent 50%, rgba(99,102,241,0.04) 100%)',
                }}
              />

              <img
                src={fcH743Img}
                alt="SECENAI FC H743 Flight Controller"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ display: 'block' }}
              />
            </div>
          </motion.div>

          {/* ── Right: Text Content ── */}
          <motion.div
            className="flex-1 max-w-xl"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            {/* Tag */}
            <motion.span
              className={`inline-block text-xs font-bold tracking-[0.25em] uppercase mb-4 ${isDark ? 'text-neon/70' : 'text-emerald-600'
                }`}
              variants={fadeUp}
            >
              Flight Controller
            </motion.span>

            {/* Title */}
            <motion.h2
              className="font-[Outfit] text-3xl md:text-5xl font-bold leading-[1.15]"
              variants={fadeUp}
            >
              <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>
                SECENAI{' '}
              </span>
              <span className={isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}>
                FC H743 V1
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className={`mt-2 text-base md:text-lg font-medium ${isDark ? 'text-white/40' : 'text-gray-400'
                }`}
              variants={fadeUp}
            >
              High-performance flight control for advanced UAV systems.
            </motion.p>

            {/* Overview */}
            <motion.p
              className={`mt-5 text-base leading-relaxed ${isDark ? 'text-white/55' : 'text-gray-500'
                }`}
              variants={fadeUp}
            >
              SECENAI's FC is an STM32H743-based flight controller designed for
              reliable processing, flexible integration, and advanced UAV development.
            </motion.p>

            {/* Divider */}
            <motion.div
              className={`my-8 h-px w-full ${isDark
                ? 'bg-gradient-to-r from-neon/15 via-white/5 to-transparent'
                : 'bg-gradient-to-r from-emerald-300/30 via-gray-200 to-transparent'
                }`}
              variants={fadeUp}
            />

            {/* Key Features heading */}
            <motion.h3
              className={`text-xs font-bold tracking-[0.2em] uppercase mb-5 ${isDark ? 'text-white/30' : 'text-gray-400'
                }`}
              variants={fadeUp}
            >
              Key Features
            </motion.h3>

            {/* Feature list */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              variants={stagger}
            >
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.text}
                    className={`glass-card flex items-start gap-3 rounded-xl px-4 py-3.5 ${isDark ? '' : ''
                      }`}
                    variants={fadeUp}
                  >
                    <div
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${isDark ? 'bg-neon/10' : 'bg-emerald-50'
                        }`}
                    >
                      <Icon
                        size={14}
                        className={isDark ? 'text-neon' : 'text-emerald-600'}
                      />
                    </div>
                    <span
                      className={`text-sm leading-snug ${isDark ? 'text-white/60' : 'text-gray-600'
                        }`}
                    >
                      {feat.text}
                    </span>
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
