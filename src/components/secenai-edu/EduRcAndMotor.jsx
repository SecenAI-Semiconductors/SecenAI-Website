import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Radio, Cog, CheckCircle } from 'lucide-react';
import { eduRcMotorData } from '../../data/secenaiEduData';

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
   EDU RC AND MOTOR
   ═══════════════════════════════════════════ */

export default function EduRcAndMotor() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { rcProtocols, motorOutputs } = eduRcMotorData;

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
        }`}
    >
      {/* Ambient glow */}
      {isDark && (
        <>
          <div className="pointer-events-none absolute left-[10%] top-[15%] h-[400px] w-[450px] rounded-full bg-neon/[0.02] blur-[180px]" />
          <div className="pointer-events-none absolute right-[5%] bottom-[10%] h-[350px] w-[400px] rounded-full bg-[#6366f1]/[0.02] blur-[160px]" />
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
            {eduRcMotorData.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] text-center ${isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
            variants={fadeUp}
          >
            {eduRcMotorData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] text-center max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'
              }`}
            variants={fadeUp}
          >
            {eduRcMotorData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-3xl mx-auto ${isDark
              ? 'bg-linear-to-r from-transparent via-neon/15 to-transparent'
              : 'bg-linear-to-r from-transparent via-gray-200 to-transparent'
              }`}
            variants={fadeUp}
          />

          {/* ── Two-column: RC + Motor ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">

            {/* RC Receiver Support */}
            <motion.div className="glass-card rounded-xl px-6 py-6" variants={fadeUp}>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
                    }`}
                >
                  <Radio size={18} className={isDark ? 'text-neon' : 'text-emerald-600'} />
                </div>
                <h3
                  className={`text-base font-semibold ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'
                    }`}
                >
                  RC Receiver Support
                </h3>
              </div>
              <div className="space-y-2">
                {rcProtocols.map((protocol) => (
                  <div key={protocol.name} className="flex items-center gap-2.5">
                    <CheckCircle size={12} className={isDark ? 'text-neon/50' : 'text-emerald-500'} />
                    <span
                      className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-700'}`}
                    >
                      {protocol.name}
                      {protocol.via && (
                        <span className={`ml-1 text-[0.6875rem] ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                          (via {protocol.via})
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Motor & Servo Output */}
            <motion.div className="glass-card rounded-xl px-6 py-6" variants={fadeUp}>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
                    }`}
                >
                  <Cog size={18} className={isDark ? 'text-neon' : 'text-emerald-600'} />
                </div>
                <h3
                  className={`text-base font-semibold ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'
                    }`}
                >
                  Motor & Servo Output
                </h3>
              </div>

              {/* Count */}
              <div className="flex items-baseline gap-2 mb-4">
                <span
                  className={`text-3xl font-bold font-[Outfit] ${isDark ? 'text-neon' : 'text-emerald-600'
                    }`}
                >
                  {motorOutputs.count}×
                </span>
                <span
                  className={`text-sm font-medium ${isDark ? 'text-white/60' : 'text-gray-700'
                    }`}
                >
                  {motorOutputs.type}
                </span>
              </div>

              {/* Protocols */}
              <div className="flex flex-wrap gap-2 mb-4">
                {motorOutputs.protocols.map((proto) => (
                  <span
                    key={proto}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[0.6875rem] font-semibold border ${isDark
                      ? 'border-white/15 text-white/80 bg-white/10'
                      : 'border-gray-300/80 text-gray-700 bg-white shadow-xs'
                      }`}
                  >
                    {proto}
                  </span>
                ))}
              </div>

              {/* Servo support */}
              {motorOutputs.servoSupport && (
                <div className="flex items-center gap-2">
                  <CheckCircle size={12} className={isDark ? 'text-neon/50' : 'text-emerald-500'} />
                  <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
                    Servo output support
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
