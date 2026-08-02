import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { CheckCircle, Shield, ArrowRight } from 'lucide-react';
import { defenceApplicationsData } from '../../data/secenaiDefenceData';

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
   DEFENCE APPLICATIONS
   ═══════════════════════════════════════════ */

export default function DefenceApplications() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-[#f0f0f3]'}`}
    >
      {/* Ambient glow */}
      {isDark && (
        <>
          <div className="pointer-events-none absolute left-[15%] top-[10%] h-[400px] w-[500px] rounded-full bg-neon/[0.015] blur-[200px]" />
          <div className="pointer-events-none absolute right-[10%] bottom-0 h-[300px] w-[400px] rounded-full bg-[#6366f1]/[0.015] blur-[150px]" />
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
            className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 text-center w-full ${isDark ? 'text-neon/50' : 'text-emerald-600/70'}`}
            variants={fadeUp}
          >
            {defenceApplicationsData.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] text-center ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}
            variants={fadeUp}
          >
            {defenceApplicationsData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] text-center max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'}`}
            variants={fadeUp}
          >
            {defenceApplicationsData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-3xl mx-auto ${isDark ? 'bg-gradient-to-r from-transparent via-neon/15 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'}`}
            variants={fadeUp}
          />

          {/* ── Applications and Vehicle Types ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            <motion.div className="glass-card rounded-2xl p-8" variants={fadeUp}>
              <h3 className={`text-xl font-bold mb-6 font-[Outfit] ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
                Application Areas
              </h3>
              <div className="grid gap-3">
                {defenceApplicationsData.applicationAreas.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={16} className={`mt-0.5 shrink-0 ${isDark ? 'text-neon/70' : 'text-emerald-500'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="glass-card rounded-2xl p-8" variants={fadeUp}>
              <h3 className={`text-xl font-bold mb-6 font-[Outfit] ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
                Vehicle Categories
              </h3>
              <div className="grid gap-3">
                {defenceApplicationsData.vehicleCategories.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={16} className={`mt-0.5 shrink-0 ${isDark ? 'text-neon/70' : 'text-emerald-500'}`} />
                    <span className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Why SECENAI Defence? ── */}
          <motion.div variants={stagger} className="max-w-6xl mx-auto mb-16">
            <motion.h3 
              className={`text-2xl font-bold text-center mb-8 font-[Outfit] ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}
              variants={fadeUp}
            >
              Why SECENAI Defence?
            </motion.h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {defenceApplicationsData.whyDefence.map((item) => (
                <motion.div key={item.title} className="glass-card rounded-xl px-5 py-4" variants={fadeUp}>
                  <span className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-white/90' : 'text-[#1e1b4b]'}`}>
                    {item.title}
                  </span>
                  <p className={`text-[0.75rem] leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Bottom CTA ── */}
          <motion.div 
            className={`glass-card rounded-2xl p-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-6 ${isDark ? 'border-neon/20 shadow-[0_0_50px_rgba(204,255,0,0.05)]' : 'border-emerald-200 shadow-xl'}`}
            variants={fadeUp}
          >
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl mb-2 ${isDark ? 'bg-neon/10 border border-neon/20' : 'bg-emerald-50 border border-emerald-200'}`}>
              <Shield size={32} className={isDark ? 'text-neon' : 'text-emerald-600'} />
            </div>
            
            <h3 className={`text-2xl md:text-3xl font-bold font-[Outfit] leading-tight max-w-2xl ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
              {defenceApplicationsData.tagline}
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link
                to="/contact"
                className={`group inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-full text-sm transition-all duration-300 ${isDark ? 'bg-neon text-dark-950 hover:shadow-lg hover:shadow-neon/20' : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20'}`}
              >
                Contact Engineering
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-full text-sm border transition-all duration-300 ${isDark ? 'border-white/20 bg-white/10 text-white hover:border-neon/40 hover:text-neon hover:bg-white/15' : 'border-gray-300 bg-gray-50 text-gray-800 shadow-sm hover:border-emerald-500 hover:text-emerald-700 hover:shadow-md'}`}
              >
                Request Product Details
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
