import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Ruler, ShieldCheck, Box, ArrowDownToLine, Cpu } from 'lucide-react';
import { mechanicalData } from '../../data/secenaiFCH743V1Data';
import { ZoomableImage } from '../ImageLightbox';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
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
   FEATURE ICONS
   ═══════════════════════════════════════════ */

const featureIcons = {
  'M2.5 mounting holes': Ruler,
  'PCB vibration isolation': ShieldCheck,
  'Enclosure vibration isolation': Box,
  'Connector clearance': ArrowDownToLine,
};

/* ═══════════════════════════════════════════
   IMAGE PLACEHOLDER
   ═══════════════════════════════════════════ */

function ImagePlaceholder({ label, isDark }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl border aspect-4/3 ${isDark
        ? 'bg-dark-800 border-white/12 shadow-lg'
        : 'bg-white border-gray-300 shadow-md'
        }`}
      style={{
        boxShadow: isDark
          ? '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)'
          : '0 20px 60px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)',
      }}
    >
      {/* Grid trace pattern */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(204,255,0,0.02) 1px, transparent 1px),
               linear-gradient(90deg, rgba(204,255,0,0.02) 1px, transparent 1px)`
            : `linear-gradient(rgba(83,137,68,0.025) 1px, transparent 1px),
               linear-gradient(90deg, rgba(83,137,68,0.025) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="text-center relative z-10">
        <div
          className={`mx-auto mb-3 h-12 w-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-neon/6 border border-neon/10' : 'bg-emerald-50 border border-emerald-200/30'
            }`}
        >
          <Cpu size={20} className={isDark ? 'text-neon/25' : 'text-emerald-400/35'} strokeWidth={1.5} />
        </div>
        <span
          className={`text-[0.625rem] font-semibold tracking-[0.15em] uppercase ${isDark ? 'text-white/20' : 'text-gray-400'
            }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MECHANICAL DESIGN SECTION
   ═══════════════════════════════════════════ */

export default function MechanicalDesignSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const viewLabels = [
    { key: 'top', label: 'Top View' },
    { key: 'bottom', label: 'Bottom View' },
    { key: 'side', label: 'Side View' },
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
        }`}
    >
      {/* Ambient glow */}
      {isDark && (
        <>
          <div className="pointer-events-none absolute left-[10%] top-[20%] h-100 w-112.5 rounded-full bg-neon/2 blur-[180px]" />
          <div className="pointer-events-none absolute right-[10%] bottom-[15%] h-87.5 w-100 rounded-full bg-[#6366f1]/1.5 blur-[160px]" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {/* ── Header ── */}
          <motion.span
            className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 ${isDark ? 'text-neon/50' : 'text-emerald-600/70'
              }`}
            variants={fadeUp}
          >
            {mechanicalData.badge}
          </motion.span>

          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] max-w-2xl ${isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
            variants={fadeUp}
          >
            {mechanicalData.title}
          </motion.h2>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-2xl ${isDark
              ? 'bg-linear-to-r from-neon/15 via-white/5 to-transparent'
              : 'bg-linear-to-r from-emerald-300/30 via-gray-200 to-transparent'
              }`}
            variants={fadeUp}
          />

          {/* ── Image placeholders ── */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12" variants={stagger}>
            {viewLabels.map(({ key, label }) => (
              <motion.div key={key} variants={fadeUp}>
                {mechanicalData.images[key] ? (
                  <ZoomableImage
                    src={mechanicalData.images[key]}
                    alt={`SECENAI FC H743 V1 flight controller PCB — ${label.toLowerCase()} showing board outline, mounting holes and component placement`}
                    className="w-full rounded-xl object-contain"
                    loading="lazy"
                  />
                ) : (
                  <ImagePlaceholder label={label} isDark={isDark} />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* ── Two-column: Features + Dimensions ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Features */}
            <motion.div variants={fadeUp}>
              <span
                className={`block text-[0.625rem] font-bold tracking-[0.2em] uppercase mb-4 ${isDark ? 'text-white/25' : 'text-gray-400'
                  }`}
              >
                Confirmed features
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mechanicalData.features.map((feat) => {
                  const Icon = featureIcons[feat] || ShieldCheck;
                  return (
                    <div key={feat} className="glass-card rounded-xl px-5 py-4 flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isDark ? 'bg-neon/8' : 'bg-emerald-50'
                          }`}
                      >
                        <Icon size={14} className={isDark ? 'text-neon' : 'text-emerald-600'} />
                      </div>
                      <span
                        className={`text-sm font-semibold leading-snug pt-1 ${isDark ? 'text-white/80' : 'text-gray-800'
                          }`}
                      >
                        {feat}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Dimensions table */}
            <motion.div variants={fadeUp}>
              <span
                className={`block text-[0.625rem] font-bold tracking-[0.2em] uppercase mb-4 ${isDark ? 'text-white/25' : 'text-gray-400'
                  }`}
              >
                Dimensions
              </span>
              <div
                className={`rounded-xl border overflow-hidden ${isDark
                  ? 'border-white/12 bg-dark-800/80 shadow-md'
                  : 'border-gray-300/80 bg-white shadow-md'
                  }`}
              >
                <table className="w-full">
                  <tbody>
                    {[
                      ['Board dimensions', mechanicalData.dimensions.boardDimensions],
                      ['Mounting-hole spacing', mechanicalData.dimensions.mountingHoleSpacing],
                      ['PCB thickness', mechanicalData.dimensions.pcbThickness],
                      ['Weight', mechanicalData.dimensions.weight],
                    ].map(([label, value], i, arr) => (
                      <tr
                        key={label}
                        className={
                          i < arr.length - 1
                            ? isDark
                              ? 'border-b border-white/6'
                              : 'border-b border-gray-200/80'
                            : ''
                        }
                      >
                        <td
                          className={`px-5 py-3 text.8125rem] font-semibold ${isDark ? 'text-white/70' : 'text-gray-800'
                            }`}
                        >
                          {label}
                        </td>
                        <td
                          className={`px-5 py-3 text-[0.8125rem] text-right font-medium ${value === 'TBD'
                            ? isDark
                              ? 'text-white/30 italic'
                              : 'text-gray-400 italic'
                            : isDark
                              ? 'text-white/90'
                              : 'text-[#1e1b4b]'
                            }`}
                        >
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* ── Dimension notice ── */}
          <motion.p
            className={`text-[0.8125rem] italic mb-8 ${isDark ? 'text-white/25' : 'text-gray-400'
              }`}
            variants={fadeUp}
          >
            {mechanicalData.dimensionNotice}
          </motion.p>

          {/* ── Download button (disabled) ── */}
          <motion.div variants={fadeUp}>
            <button
              disabled
              className={`inline-flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold transition-colors cursor-not-allowed ${isDark
                ? 'bg-white/10 text-white/40 border border-white/15'
                : 'bg-white text-gray-500 border border-gray-300 shadow-xs'
                }`}
              aria-label={`${mechanicalData.downloadButton.label} — ${mechanicalData.downloadButton.disabledLabel}`}
            >
              <ArrowDownToLine size={14} />
              {mechanicalData.downloadButton.label}
              <span
                className={`ml-1 text-[0.625rem] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${isDark ? 'bg-white/10 text-white/30' : 'bg-gray-100 text-gray-500'
                  }`}
              >
                {mechanicalData.downloadButton.disabledLabel}
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
