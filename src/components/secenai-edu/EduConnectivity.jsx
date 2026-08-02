import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  Cable, Network, Cpu, Usb, SatelliteDish, Radio,
} from 'lucide-react';
import { eduConnectivityData } from '../../data/secenaiEduData';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
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
   ICON MAP
   ═══════════════════════════════════════════ */

const iconMap = {
  Cable, Network, Cpu, Usb, SatelliteDish, Radio,
};

function getIcon(name) {
  return iconMap[name] || Cable;
}

/* ═══════════════════════════════════════════
   EDU CONNECTIVITY
   ═══════════════════════════════════════════ */

export default function EduConnectivity() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
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
        >
          {/* Eyebrow */}
          <motion.span
            className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 text-center w-full ${isDark ? 'text-neon/50' : 'text-emerald-600/70'
              }`}
            variants={fadeUp}
          >
            {eduConnectivityData.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] text-center ${isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
            variants={fadeUp}
          >
            {eduConnectivityData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] text-center max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'
              }`}
            variants={fadeUp}
          >
            {eduConnectivityData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-3xl mx-auto ${isDark
              ? 'bg-linear-to-r from-transparent via-neon/15 to-transparent'
              : 'bg-linear-to-r from-transparent via-gray-200 to-transparent'
              }`}
            variants={fadeUp}
          />

          {/* ── Interface Count Cards ── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto"
            variants={stagger}
          >
            {eduConnectivityData.interfaces.map((iface) => {
              const Icon = getIcon(iface.icon);
              return (
                <motion.div
                  key={iface.name}
                  className="glass-card rounded-xl px-5 py-5"
                  variants={fadeUp}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isDark ? 'bg-neon/8' : 'bg-emerald-50'
                        }`}
                    >
                      <Icon size={15} className={isDark ? 'text-neon' : 'text-emerald-600'} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-2xl font-bold font-[Outfit] leading-none ${isDark ? 'text-neon' : 'text-emerald-600'
                            }`}
                        >
                          {iface.count}×
                        </span>
                        <span
                          className={`text-sm font-semibold ${isDark ? 'text-white/70' : 'text-[#1e1b4b]'
                            }`}
                        >
                          {iface.name}
                        </span>
                      </div>
                      <p
                        className={`mt-1.5 text-[0.6875rem] leading-relaxed ${isDark ? 'text-white/35' : 'text-gray-500'
                          }`}
                      >
                        {iface.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Connectivity Diagram ── */}
          <motion.div className="mt-14 flex justify-center" variants={fadeUp}>
            <div className="w-full max-w-2xl">
              <div
                className={`relative rounded-2xl overflow-hidden px-6 py-10 sm:px-10 sm:py-12 ${isDark
                  ? 'bg-dark-800 border border-white/6'
                  : 'bg-white border border-gray-200'
                  }`}
                style={{
                  boxShadow: isDark
                    ? '0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)'
                    : '0 25px 80px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
                }}
              >
                {/* Grid trace pattern */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: isDark
                      ? `linear-gradient(rgba(204,255,0,0.025) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(204,255,0,0.025) 1px, transparent 1px)`
                      : `linear-gradient(rgba(83,137,68,0.035) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(83,137,68,0.035) 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                  }}
                />

                {/* Centre label */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`rounded-xl px-6 py-4 mb-8 border ${isDark
                      ? 'bg-neon/[0.06] border-neon/15'
                      : 'bg-emerald-50 border-emerald-200/40'
                      }`}
                  >
                    <span
                      className={`text-sm font-bold font-[Outfit] ${isDark ? 'text-neon' : 'text-emerald-600'
                        }`}
                    >
                      SECENAI EDU
                    </span>
                  </div>

                  {/* Peripheral tags in a wrapped grid */}
                  <div className="flex flex-wrap justify-center gap-2 max-w-md">
                    {eduConnectivityData.peripherals.map((peripheral) => (
                      <span
                        key={peripheral}
                        className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold border ${isDark
                          ? 'border-white/15 text-white/70 bg-white/10'
                          : 'border-gray-300/80 text-gray-700 bg-white shadow-xs'
                          }`}
                      >
                        {peripheral}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
