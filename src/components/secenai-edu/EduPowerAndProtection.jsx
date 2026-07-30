import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { BatteryCharging, ShieldCheck, Zap, PlugZap } from 'lucide-react';
import { eduPowerProtectionData } from '../../data/secenaiEduData';

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

const powerIcons = [PlugZap, BatteryCharging, Zap, PlugZap, Zap, BatteryCharging, BatteryCharging];
const protectionIcons = [ShieldCheck, ShieldCheck, ShieldCheck, ShieldCheck, ShieldCheck, ShieldCheck];

/* ═══════════════════════════════════════════
   EDU POWER AND PROTECTION
   ═══════════════════════════════════════════ */

export default function EduPowerAndProtection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { power, protection } = eduPowerProtectionData;

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

        {/* ════════════════════════════════════
           POWER AREA
           ════════════════════════════════════ */}
        <motion.div
          className="mb-24 text-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.span
            className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 ${isDark ? 'text-neon/50' : 'text-emerald-600/70'
              }`}
            variants={fadeUp}
          >
            {eduPowerProtectionData.badge}
          </motion.span>

          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] max-w-2xl mx-auto ${isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
            variants={fadeUp}
          >
            {eduPowerProtectionData.title}
          </motion.h2>

          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] max-w-2xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'
              }`}
            variants={fadeUp}
          >
            {eduPowerProtectionData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-2xl mx-auto ${isDark
              ? 'bg-gradient-to-r from-transparent via-neon/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent'
              }`}
            variants={fadeUp}
          />

          {/* ── Power Sub-heading ── */}
          <motion.span
            className={`block text-[0.625rem] font-bold tracking-[0.2em] uppercase mb-4 ${isDark ? 'text-white/25' : 'text-gray-400'
              }`}
            variants={fadeUp}
          >
            Power System
          </motion.span>

          {/* Power feature cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
            variants={stagger}
          >
            {power.map((feat, i) => {
              const Icon = powerIcons[i % powerIcons.length];
              return (
                <motion.div
                  key={feat.title}
                  className="glass-card rounded-xl px-5 py-5 text-center flex flex-col items-center"
                  variants={fadeUp}
                >
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
                      }`}
                  >
                    <Icon size={18} className={isDark ? 'text-neon' : 'text-emerald-600'} />
                  </div>
                  <h3
                    className={`text-sm font-semibold leading-tight ${isDark ? 'text-white/90' : 'text-[#1e1b4b]'
                      }`}
                  >
                    {feat.title}
                  </h3>
                  <p
                    className={`mt-1.5 text-[0.75rem] leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-600'
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
           PROTECTION AREA
           ════════════════════════════════════ */}
        <motion.div
          className="text-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.span
            className={`block text-[0.625rem] font-bold tracking-[0.2em] uppercase mb-4 ${isDark ? 'text-white/25' : 'text-gray-400'
              }`}
            variants={fadeUp}
          >
            Electrical Protection
          </motion.span>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
            variants={stagger}
          >
            {protection.map((feat, i) => {
              const Icon = protectionIcons[i % protectionIcons.length];
              return (
                <motion.div
                  key={feat.title}
                  className="glass-card rounded-xl px-5 py-5 text-center flex flex-col items-center"
                  variants={fadeUp}
                >
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
                      }`}
                  >
                    <Icon size={18} className={isDark ? 'text-neon' : 'text-emerald-600'} />
                  </div>
                  <h3
                    className={`text-sm font-semibold leading-tight ${isDark ? 'text-white/90' : 'text-[#1e1b4b]'
                      }`}
                  >
                    {feat.title}
                  </h3>
                  <p
                    className={`mt-1.5 text-[0.75rem] leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-600'
                      }`}
                  >
                    {feat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
