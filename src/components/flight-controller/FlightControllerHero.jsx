import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { heroData } from '../../data/secenaiFCH743V1Data';
import { ZoomableImage } from '../ImageLightbox';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════
   SPEC HIGHLIGHTS
   ═══════════════════════════════════════════ */

const specHighlights = [
  { value: 'STM32H743', label: 'Cortex-M7 processing up to 480 MHz' },
  { value: '3× IMUs', label: '2× ICM-42688-P + 1× ICM-42605' },
  { value: '2× BMP581', label: 'Independent dual barometric sensing' },
  { value: '5–36 V', label: 'Protected redundant power inputs' },
];

/* ═══════════════════════════════════════════
   FLIGHT CONTROLLER HERO
   ═══════════════════════════════════════════ */

export default function FlightControllerHero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true, margin: '-60px' });

  /* Parallax for the product image */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const glowScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.25]);

  /* Smooth-scroll handler for the CTA */
  const handleScrollToArchitecture = (e) => {
    e.preventDefault();
    const el = document.getElementById('sensor-architecture');
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
        }`}
    >
      {/* ── Ambient Background Glows ── */}
      {isDark ? (
        <>
          <motion.div
            className="pointer-events-none absolute left-[15%] top-[20%] h-[550px] w-[550px] rounded-full bg-neon/[0.03] blur-[200px]"
            style={{ scale: prefersReducedMotion ? 1 : glowScale }}
          />
          <div className="pointer-events-none absolute -right-20 bottom-[10%] h-[400px] w-[450px] rounded-full bg-[#6366f1]/[0.025] blur-[180px]" />
          <div className="pointer-events-none absolute left-[40%] bottom-0 h-[300px] w-[600px] rounded-full bg-neon/[0.015] blur-[160px]" />
        </>
      ) : (
        <>
          <motion.div
            className="pointer-events-none absolute left-[15%] top-[20%] h-[450px] w-[450px] rounded-full bg-emerald-400/[0.07] blur-[180px]"
            style={{ scale: prefersReducedMotion ? 1 : glowScale }}
          />
          <div className="pointer-events-none absolute -right-10 bottom-[15%] h-[350px] w-[400px] rounded-full bg-emerald-300/[0.05] blur-[150px]" />
        </>
      )}

      {/* ── Grid overlay ── */}
      <div className={`absolute inset-0 z-[1] grid-bg ${isDark ? 'opacity-30' : 'opacity-15'}`} />

      {/* ── Content ── */}
      <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ─── Left: Text ─── */}
          <motion.div
            className="flex-1 max-w-2xl"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            {/* Eyebrow */}
            <motion.span
              className={`inline-block text-[0.6875rem] font-bold tracking-[0.3em] uppercase mb-5 ${isDark ? 'text-neon/60' : 'text-emerald-600'
                }`}
              variants={fadeUp}
            >
              SECENAI Flight Systems
            </motion.span>

            {/* Title */}
            <motion.h1
              className="font-[Outfit] text-4xl sm:text-5xl md:text-[3.5rem] font-bold leading-[1.08] tracking-tight"
              variants={fadeUp}
            >
              <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>SECENAI </span>
              <span className={isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}>
                FC H743 V1
              </span>
            </motion.h1>

            {/* Main statement */}
            <motion.p
              className={`mt-5 text-lg md:text-xl font-medium leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-700'
                }`}
              variants={fadeUp}
            >
              High-performance flight controller with multi-sensor redundancy.
            </motion.p>

            {/* Supporting text */}
            <motion.p
              className={`mt-3 text-[0.9375rem] md:text-base leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'
                }`}
              variants={fadeUp}
            >
              Powered by STM32H743 processing, triple inertial sensing, dual barometric
              pressure measurement and extensive UAV connectivity for advanced autonomous
              platforms.
            </motion.p>

            {/* Divider */}
            <motion.div
              className={`my-8 h-px w-full ${isDark
                ? 'bg-gradient-to-r from-neon/20 via-white/5 to-transparent'
                : 'bg-gradient-to-r from-emerald-300/40 via-gray-200 to-transparent'
                }`}
              variants={fadeUp}
            />

            {/* ── Spec Highlights ── */}
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-3" variants={stagger}>
              {specHighlights.map((spec) => (
                <motion.div
                  key={spec.value}
                  className="glass-card rounded-xl px-4 py-4"
                  variants={fadeUp}
                >
                  <span
                    className={`block text-[0.8125rem] font-bold tracking-wide leading-tight ${isDark ? 'text-neon' : 'text-emerald-600'
                      }`}
                  >
                    {spec.value}
                  </span>
                  <span
                    className={`mt-1.5 block text-[0.6875rem] leading-snug ${isDark ? 'text-white/40' : 'text-gray-500'
                      }`}
                  >
                    {spec.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* ── CTAs ── */}
            <motion.div className="mt-9 flex flex-wrap gap-4" variants={fadeUp}>
              <button
                onClick={handleScrollToArchitecture}
                className={`group inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-full text-sm transition-all duration-300 cursor-pointer ${isDark
                  ? 'bg-neon text-dark-950 hover:shadow-lg hover:shadow-neon/20'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20'
                  }`}
              >
                Explore the Architecture
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>

              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-full text-sm border transition-all duration-300 ${isDark
                  ? 'border-white/20 bg-white/10 text-white hover:border-neon/40 hover:text-neon hover:bg-white/15'
                  : 'border-gray-300 bg-gray-50 text-gray-800 shadow-sm hover:border-emerald-500 hover:text-emerald-700 hover:shadow-md'
                  }`}
              >
                Contact Engineering
              </Link>
            </motion.div>
          </motion.div>

          {/* ─── Right: Product Image ─── */}
          <motion.div
            className="flex-1 w-full max-w-md lg:max-w-lg xl:max-w-xl"
            initial={{ opacity: 0, x: 50, scale: 0.96 }}
            animate={
              inView
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 50, scale: 0.96 }
            }
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            style={{ y: prefersReducedMotion ? 0 : imageY }}
          >
            <div className={prefersReducedMotion ? '' : 'animate-float'}>
              <div
                className="relative rounded-2xl overflow-hidden group"
                style={{
                  boxShadow: isDark
                    ? '0 30px 100px rgba(0,0,0,0.5), 0 0 80px rgba(204,255,0,0.04), 0 0 0 1px rgba(255,255,255,0.06)'
                    : '0 30px 100px rgba(0,0,0,0.07), 0 0 60px rgba(83,137,68,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
                }}
              >
                {/* Ambient gradient overlay */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(204,255,0,0.06) 0%, transparent 50%, rgba(99,102,241,0.04) 100%)'
                      : 'linear-gradient(135deg, rgba(83,137,68,0.07) 0%, transparent 50%, rgba(99,102,241,0.04) 100%)',
                  }}
                />

                {heroData.productImage ? (
                  <ZoomableImage
                    src={heroData.productImage}
                    alt="SECENAI FC H743 V1 Flight Controller"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ display: 'block' }}
                  />
                ) : (
                  /* Styled placeholder until real image is available */
                  <div
                    className={`flex items-center justify-center aspect-square ${isDark ? 'bg-dark-800' : 'bg-gray-100'
                      }`}
                  >
                    <span
                      className={`text-xs font-semibold tracking-widest uppercase ${isDark ? 'text-white/10' : 'text-gray-300'
                        }`}
                    >
                      Product Image
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
