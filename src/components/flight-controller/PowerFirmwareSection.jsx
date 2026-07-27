import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { BatteryCharging, PlugZap, ShieldCheck, ArrowLeftRight, Info } from 'lucide-react';
import { powerFirmwareData } from '../../data/secenaiFCH743V1Data';

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
   POWER FEATURE ICONS
   ═══════════════════════════════════════════ */

const powerIcons = [BatteryCharging, PlugZap, ShieldCheck, ArrowLeftRight];

/* ═══════════════════════════════════════════
   POWER FIRMWARE SECTION
   ═══════════════════════════════════════════ */

export default function PowerFirmwareSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { power, firmware } = powerFirmwareData;

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${
        isDark ? 'bg-dark-900' : 'bg-[#f0f0f3]'
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

        {/* ════════════════════════════════════
           POWER AREA
           ════════════════════════════════════ */}
        <motion.div
          className="mb-24"
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
            {power.badge}
          </motion.span>

          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] max-w-2xl ${
              isDark ? 'text-white' : 'text-[#1e1b4b]'
            }`}
            variants={fadeUp}
          >
            {power.title}
          </motion.h2>

          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] max-w-2xl ${
              isDark ? 'text-white/50' : 'text-gray-600'
            }`}
            variants={fadeUp}
          >
            {power.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-2xl ${
              isDark
                ? 'bg-gradient-to-r from-neon/15 via-white/5 to-transparent'
                : 'bg-gradient-to-r from-emerald-300/30 via-gray-200 to-transparent'
            }`}
            variants={fadeUp}
          />

          {/* Power feature cards */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" variants={stagger}>
            {power.features.map((feat, i) => {
              const Icon = powerIcons[i] || BatteryCharging;
              return (
                <motion.div
                  key={feat.title}
                  className="glass-card rounded-xl px-5 py-5"
                  variants={fadeUp}
                >
                  <div
                    className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${
                      isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
                    }`}
                  >
                    <Icon size={16} className={isDark ? 'text-neon' : 'text-emerald-600'} />
                  </div>
                  <h3
                    className={`text-sm font-semibold leading-tight ${
                      isDark ? 'text-white/80' : 'text-[#1e1b4b]'
                    }`}
                  >
                    {feat.title}
                  </h3>
                  <p
                    className={`mt-1.5 text-[0.75rem] leading-relaxed ${
                      isDark ? 'text-white/35' : 'text-gray-500'
                    }`}
                  >
                    {feat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════
           FIRMWARE AREA
           ════════════════════════════════════ */}
        <motion.div
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
            {firmware.badge}
          </motion.span>

          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] max-w-2xl ${
              isDark ? 'text-white' : 'text-[#1e1b4b]'
            }`}
            variants={fadeUp}
          >
            {firmware.title}
          </motion.h2>

          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] max-w-2xl ${
              isDark ? 'text-white/50' : 'text-gray-600'
            }`}
            variants={fadeUp}
          >
            {firmware.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-2xl ${
              isDark
                ? 'bg-gradient-to-r from-neon/15 via-white/5 to-transparent'
                : 'bg-gradient-to-r from-emerald-300/30 via-gray-200 to-transparent'
            }`}
            variants={fadeUp}
          />

          {/* Firmware platform cards */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl" variants={stagger}>
            {firmware.platforms.map((platform) => (
              <motion.div
                key={platform.name}
                className="glass-card rounded-xl px-6 py-6"
                variants={fadeUp}
              >
                <h3
                  className={`text-lg font-bold font-[Outfit] ${
                    isDark ? 'text-white/80' : 'text-[#1e1b4b]'
                  }`}
                >
                  {platform.name}
                </h3>
                <p
                  className={`mt-2 text-[0.8125rem] leading-relaxed ${
                    isDark ? 'text-white/40' : 'text-gray-500'
                  }`}
                >
                  {platform.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Platform tags */}
          <motion.div className="mt-8" variants={fadeUp}>
            <span
              className={`block text-[0.625rem] font-bold tracking-[0.2em] uppercase mb-3 ${
                isDark ? 'text-white/25' : 'text-gray-400'
              }`}
            >
              Supported platforms
            </span>
            <div className="flex flex-wrap gap-2">
              {firmware.platformTags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[0.6875rem] font-medium border ${
                    isDark
                      ? 'border-white/[0.06] text-white/40 bg-white/[0.02]'
                      : 'border-gray-200 text-gray-500 bg-gray-50'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Validation notice */}
          <motion.div
            className={`mt-8 flex items-start gap-3 rounded-xl border px-5 py-4 max-w-2xl ${
              isDark
                ? 'bg-white/[0.02] border-white/[0.06]'
                : 'bg-gray-50 border-gray-200'
            }`}
            variants={fadeUp}
          >
            <Info size={15} className={`mt-0.5 shrink-0 ${isDark ? 'text-neon/40' : 'text-emerald-500/60'}`} />
            <span className={`text-xs leading-relaxed ${isDark ? 'text-white/35' : 'text-gray-400'}`}>
              {firmware.validationNotice}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
