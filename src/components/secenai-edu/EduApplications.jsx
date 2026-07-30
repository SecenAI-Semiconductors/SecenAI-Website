import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Users, Plane, CheckCircle, ArrowRight } from 'lucide-react';
import { eduApplicationsData } from '../../data/secenaiEduData';

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
   EDU APPLICATIONS
   ═══════════════════════════════════════════ */

export default function EduApplications() {
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
            {eduApplicationsData.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] text-center ${isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
            variants={fadeUp}
          >
            {eduApplicationsData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] text-center max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'
              }`}
            variants={fadeUp}
          >
            {eduApplicationsData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-3xl mx-auto ${isDark
              ? 'bg-linear-to-r from-transparent via-neon/15 to-transparent'
              : 'bg-linear-to-r from-transparent via-gray-200 to-transparent'
              }`}
            variants={fadeUp}
          />

          {/* ── Two-column: Target Users + Platforms ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">

            {/* Target Users */}
            <motion.div className="glass-card rounded-xl px-6 py-6" variants={fadeUp}>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
                    }`}
                >
                  <Users size={18} className={isDark ? 'text-neon' : 'text-emerald-600'} />
                </div>
                <h3
                  className={`text-base font-semibold ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'
                    }`}
                >
                  Target Users
                </h3>
              </div>
              <div className="space-y-2">
                {eduApplicationsData.targetUsers.map((user) => (
                  <div key={user} className="flex items-center gap-2.5">
                    <CheckCircle size={12} className={isDark ? 'text-neon/50' : 'text-emerald-500'} />
                    <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                      {user}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Suitable Platforms */}
            <motion.div className="glass-card rounded-xl px-6 py-6" variants={fadeUp}>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
                    }`}
                >
                  <Plane size={18} className={isDark ? 'text-neon' : 'text-emerald-600'} />
                </div>
                <h3
                  className={`text-base font-semibold ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'
                    }`}
                >
                  Suitable Platforms
                </h3>
              </div>
              <div className="space-y-2">
                {eduApplicationsData.platforms.map((platform) => (
                  <div key={platform} className="flex items-center gap-2.5">
                    <CheckCircle size={12} className={isDark ? 'text-neon/50' : 'text-emerald-500'} />
                    <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                      {platform}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ════════════════════════════════════
             WHY SECENAI EDU?
             ════════════════════════════════════ */}
          <motion.div className="mt-16 text-center" variants={fadeUp}>
            <motion.h3
              className={`font-[Outfit] text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#1e1b4b]'
                }`}
              variants={fadeUp}
            >
              Why SECENAI EDU?
            </motion.h3>

            <motion.div
              className={`my-6 h-px w-full max-w-md mx-auto ${isDark
                ? 'bg-gradient-to-r from-transparent via-neon/20 to-transparent'
                : 'bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent'
                }`}
              variants={fadeUp}
            />

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
              variants={stagger}
            >
              {eduApplicationsData.whyEdu.map((item) => (
                <motion.div
                  key={item.title}
                  className="glass-card rounded-xl px-5 py-5 text-center"
                  variants={fadeUp}
                >
                  <h4
                    className={`text-sm font-semibold leading-tight mb-2 ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'
                      }`}
                  >
                    {item.title}
                  </h4>
                  <p
                    className={`text-[0.75rem] leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-600'
                      }`}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Bottom CTA ── */}
          <motion.div
            className={`mt-16 rounded-2xl border px-8 py-10 sm:px-12 sm:py-12 text-center max-w-3xl mx-auto ${isDark
              ? 'bg-dark-800/80 border-white/12 shadow-2xl shadow-black/40'
              : 'bg-white border-gray-300 shadow-xl'
              }`}
            variants={fadeUp}
          >
            <h3
              className={`font-[Outfit] text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-[#1e1b4b]'
                }`}
            >
              Ready to build with SECENAI EDU?
            </h3>
            <p
              className={`mt-3 text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'
                }`}
            >
              Get in touch with SecenAI to discuss flight-controller integration, educational programmes, and product availability.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-all duration-200 ${isDark
                  ? 'bg-neon text-dark-950 hover:bg-neon/90 shadow-lg shadow-neon/20'
                  : 'bg-[#538944] text-white hover:bg-[#466e3a] shadow-lg shadow-[#538944]/20'
                  }`}
              >
                Request Product Details
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-all duration-200 ${isDark
                  ? 'bg-white/[0.06] text-white/70 border border-white/[0.08] hover:bg-white/[0.1]'
                  : 'bg-gray-50 text-[#1e1b4b] border border-gray-300 shadow-sm hover:bg-gray-100'
                  }`}
              >
                Contact Engineering
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
