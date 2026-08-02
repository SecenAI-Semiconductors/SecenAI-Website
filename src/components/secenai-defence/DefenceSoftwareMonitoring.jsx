import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Code, Terminal, CheckCircle, Info, LineChart } from 'lucide-react';
import { defenceSoftwareData } from '../../data/secenaiDefenceData';
import { ZoomableImage } from '../ImageLightbox';

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
   DEFENCE SOFTWARE AND MONITORING
   ═══════════════════════════════════════════ */

export default function DefenceSoftwareMonitoring() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'}`}
    >
      {/* Ambient glow */}
      {isDark && (
        <div className="pointer-events-none absolute right-[15%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#6366f1]/[0.02] blur-[200px]" />
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
            {defenceSoftwareData.badge}
          </motion.span>

          {/* Heading */}
          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] text-center ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}
            variants={fadeUp}
          >
            {defenceSoftwareData.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] text-center max-w-3xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'}`}
            variants={fadeUp}
          >
            {defenceSoftwareData.description}
          </motion.p>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-3xl mx-auto ${isDark ? 'bg-gradient-to-r from-transparent via-neon/15 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'}`}
            variants={fadeUp}
          />

          <div className="flex flex-col gap-16 max-w-6xl mx-auto">
            
            {/* ── PART 1: SOFTWARE COMPATIBILITY ── */}
            <motion.div variants={stagger}>
              <div className="flex items-center gap-3 mb-6 justify-center">
                <Code size={20} className={isDark ? 'text-neon/80' : 'text-emerald-600'} />
                <h3 className={`text-xl font-bold font-[Outfit] tracking-wide uppercase ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
                  Open Autopilot Compatibility
                </h3>
              </div>

              {/* Platform Logos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {defenceSoftwareData.platforms.map((platform) => (
                  <motion.div key={platform.name} className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left" variants={fadeUp}>
                    <div className="h-20 w-40 shrink-0 bg-white/5 rounded-xl p-4 flex items-center justify-center">
                      <ZoomableImage
                        src={platform.logo}
                        alt={`${platform.name} Logo`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
                        {platform.name}
                      </h4>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        {platform.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Software Features & Disclaimer */}
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {defenceSoftwareData.softwareCapabilities.map((cap) => (
                      <motion.div key={cap} className="glass-card rounded-xl px-4 py-3 flex items-start gap-3" variants={fadeUp}>
                        <CheckCircle size={14} className={`mt-0.5 shrink-0 ${isDark ? 'text-neon/60' : 'text-emerald-500'}`} />
                        <span className={`text-xs font-medium leading-relaxed ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                          {cap}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="lg:w-1/3 flex flex-col gap-4">
                  {/* Ecosystem badges */}
                  <motion.div className="flex flex-wrap gap-2" variants={fadeUp}>
                    {defenceSoftwareData.ecosystemTools.map((tool) => (
                      <span key={tool} className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold border ${isDark ? 'border-white/15 text-white/90 bg-white/10 shadow-sm' : 'border-gray-300/80 text-gray-800 bg-white shadow-sm'}`}>
                        <Terminal size={12} className={isDark ? 'text-neon/70' : 'text-emerald-600'} />
                        {tool}
                      </span>
                    ))}
                  </motion.div>

                  {/* Validation Notice */}
                  <motion.div className={`rounded-xl p-4 border mt-2 flex gap-3 ${isDark ? 'bg-dark-800/50 border-white/10' : 'bg-orange-50 border-orange-200'}`} variants={fadeUp}>
                    <Info size={16} className={`mt-0.5 shrink-0 ${isDark ? 'text-white/40' : 'text-orange-500'}`} />
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-white/50' : 'text-orange-800'}`}>
                      {defenceSoftwareData.validationNotice}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ── PART 2: FLIGHT DATA AND SYSTEM MONITORING ── */}
            <motion.div variants={stagger} className="pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <LineChart size={20} className={isDark ? 'text-neon/80' : 'text-emerald-600'} />
                <h3 className={`text-xl font-bold font-[Outfit] tracking-wide uppercase ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
                  Flight Data and System Monitoring
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {defenceSoftwareData.monitoringCapabilities.map((item) => (
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

          </div>
        </motion.div>
      </div>
    </section>
  );
}
