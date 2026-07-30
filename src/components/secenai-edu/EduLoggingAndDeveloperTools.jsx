import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { HardDrive, Monitor, Wrench } from 'lucide-react';
import { eduLoggingDevData } from '../../data/secenaiEduData';

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
   FEATURE GROUP (reusable sub-component)
   ═══════════════════════════════════════════ */

function FeatureGroup({ title, icon: Icon, items, isDark }) {
  return (
    <div className="glass-card rounded-xl px-6 py-6">
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
            }`}
        >
          <Icon size={18} className={isDark ? 'text-neon' : 'text-emerald-600'} />
        </div>
        <h3
          className={`text-base font-semibold ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'
            }`}
        >
          {title}
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.title}>
            <span
              className={`block text-sm font-semibold ${isDark ? 'text-white/70' : 'text-[#1e1b4b]'
                }`}
            >
              {item.title}
            </span>
            <p
              className={`text-[0.75rem] leading-relaxed mt-0.5 ${isDark ? 'text-white/35' : 'text-gray-500'
                }`}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   EDU LOGGING AND DEVELOPER TOOLS
   ═══════════════════════════════════════════ */

export default function EduLoggingAndDeveloperTools() {
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
        <div className="pointer-events-none absolute left-[15%] top-[10%] h-[400px] w-[500px] rounded-full bg-neon/[0.02] blur-[180px]" />
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
            {eduLoggingDevData.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] text-center ${isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
            variants={fadeUp}
          >
            {eduLoggingDevData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] text-center max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'
              }`}
            variants={fadeUp}
          >
            {eduLoggingDevData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-3xl mx-auto ${isDark
              ? 'bg-linear-to-r from-transparent via-neon/15 to-transparent'
              : 'bg-linear-to-r from-transparent via-gray-200 to-transparent'
              }`}
            variants={fadeUp}
          />

          {/* ── Three Feature Groups ── */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <FeatureGroup
                title="Data Logging"
                icon={HardDrive}
                items={eduLoggingDevData.logging}
                isDark={isDark}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <FeatureGroup
                title="User Interface"
                icon={Monitor}
                items={eduLoggingDevData.userInterface}
                isDark={isDark}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <FeatureGroup
                title="Developer Features"
                icon={Wrench}
                items={eduLoggingDevData.developer}
                isDark={isDark}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
