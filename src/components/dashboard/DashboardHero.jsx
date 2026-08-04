import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ArrowUpRight, LayoutDashboard } from 'lucide-react';
import {
  dashboardHeroData,
  dashboardHighlights,
  dashboardCapabilities,
} from '../../data/dashboardData';

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
   DASHBOARD PREVIEW IMAGE
   Place your screenshot at:
     public/images/secenai-agriculture-dashboard.webp
   It will be served at /images/secenai-agriculture-dashboard.webp
   ═══════════════════════════════════════════ */
const DASHBOARD_SCREENSHOT = '/images/secenai-agriculture-dashboard.webp';

/* ═══════════════════════════════════════════
   DASHBOARD HERO
   ═══════════════════════════════════════════ */

export default function DashboardHero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true, margin: '-60px' });
  const imgRef = useRef(null);

  /* Parallax for the preview panel */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const glowScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.25]);

  /* Try loading the screenshot; fall back to placeholder on error */
  const handleImgError = () => {
    if (imgRef.current) imgRef.current.style.display = 'none';
    const fallback = imgRef.current?.nextElementSibling;
    if (fallback) fallback.style.display = 'flex';
  };

  return (
    <>
      {/* ════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className={`relative min-h-screen flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
          }`}
      >
        {/* ── Ambient Background Glows ── */}
        {isDark ? (
          <>
            <motion.div
              className="pointer-events-none absolute left-[15%] top-[20%] h-137.5 w-137.5 rounded-full blur-[200px]"
              style={{
                scale: prefersReducedMotion ? 1 : glowScale,
                background: 'rgba(var(--accent-rgb), 0.03)',
              }}
            />
            <div
              className="pointer-events-none absolute -right-20 bottom-[10%] h-100 w-112.5 rounded-full bg-[#6366f1]/2.5 blur-[180px]"
            />
            <div
              className="pointer-events-none absolute left-[40%] bottom-0 h-75 w-150 rounded-full blur-[160px]"
              style={{ background: 'rgba(var(--accent-rgb), 0.015)' }}
            />
          </>
        ) : (
          <>
            <motion.div
              className="pointer-events-none absolute left-[15%] top-[20%] h-112.5 w-112.5 rounded-full blur-[180px]"
              style={{
                scale: prefersReducedMotion ? 1 : glowScale,
                background: 'rgba(var(--accent-rgb), 0.07)',
              }}
            />
            <div
              className="pointer-events-none absolute -right-10 bottom-[15%] h-87.5 w-100 rounded-full blur-[150px]"
              style={{ background: 'rgba(var(--accent-rgb), 0.05)' }}
            />
          </>
        )}

        {/* ── Grid overlay ── */}
        <div className={`absolute inset-0 z-1 grid-bg ${isDark ? 'opacity-30' : 'opacity-15'}`} />

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
                className="inline-block text-[0.6875rem] font-bold tracking-[0.3em] uppercase mb-5"
                style={{ color: isDark ? 'rgba(var(--accent-rgb), 0.6)' : 'var(--accent)' }}
                variants={fadeUp}
              >
                {dashboardHeroData.eyebrow}
              </motion.span>

              {/* Multi-line Heading */}
              <motion.h1
                className="font-[Outfit] text-4xl sm:text-5xl md:text-[3.5rem] font-bold leading-[1.08] tracking-tight"
                variants={fadeUp}
              >
                {dashboardHeroData.headingLines.map((line, i) => (
                  <span
                    key={i}
                    className={`block ${line.accent
                      ? 'text-gradient-accent'
                      : isDark
                        ? 'text-white'
                        : 'text-[#1e1b4b]'
                      }`}
                  >
                    {line.text}
                  </span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className={`mt-5 text-lg md:text-xl font-medium leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-700'
                  }`}
                variants={fadeUp}
              >
                {dashboardHeroData.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                className={`mt-3 text-[0.9375rem] md:text-base leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'
                  }`}
                variants={fadeUp}
              >
                {dashboardHeroData.description}
              </motion.p>

              {/* Divider */}
              <motion.div
                className="my-8 h-px w-full"
                style={{
                  background: isDark
                    ? 'linear-gradient(to right, rgba(var(--accent-rgb), 0.2), rgba(255,255,255,0.05), transparent)'
                    : 'linear-gradient(to right, rgba(var(--accent-rgb), 0.4), rgba(0,0,0,0.06), transparent)',
                }}
                variants={fadeUp}
              />

              {/* ── Feature Badges ── */}
              <motion.div className="flex flex-wrap gap-2 mb-8" variants={stagger}>
                {dashboardHeroData.badges.map((badge) => (
                  <motion.span
                    key={badge}
                    className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold border ${isDark
                      ? 'border-white/15 text-white/90 bg-white/10 shadow-sm'
                      : 'border-gray-300/80 text-gray-800 bg-white shadow-sm'
                      }`}
                    variants={fadeUp}
                  >
                    {badge}
                  </motion.span>
                ))}
              </motion.div>

              {/* ── Highlight Cards (Farmer + Admin) ── */}
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-9" variants={stagger}>
                {dashboardHighlights.map(({ title, description, Icon }) => (
                  <motion.div
                    key={title}
                    className="glass-card rounded-xl px-5 py-5"
                    variants={fadeUp}
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div
                        className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: isDark
                            ? 'rgba(var(--accent-rgb), 0.08)'
                            : 'rgba(var(--accent-rgb), 0.08)',
                          border: isDark
                            ? '1px solid rgba(var(--accent-rgb), 0.1)'
                            : '1px solid rgba(var(--accent-rgb), 0.2)',
                        }}
                      >
                        <Icon
                          style={{ color: isDark ? 'rgba(var(--accent-rgb), 0.7)' : 'var(--accent)' }}
                          size={18}
                          strokeWidth={1.5}
                        />
                      </div>
                      <span
                        className="text-sm font-bold tracking-wide"
                        style={{ color: 'var(--accent)' }}
                      >
                        {title}
                      </span>
                    </div>
                    <p
                      className={`text-[0.8125rem] leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'
                        }`}
                    >
                      {description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ─── Right: Dashboard Preview ─── */}
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
                      ? `0 30px 100px rgba(0,0,0,0.5), 0 0 80px rgba(var(--accent-rgb), 0.04), 0 0 0 1px rgba(255,255,255,0.06)`
                      : `0 30px 100px rgba(0,0,0,0.07), 0 0 60px rgba(var(--accent-rgb), 0.06), 0 0 0 1px rgba(0,0,0,0.04)`,
                  }}
                >
                  {/* Ambient gradient overlay */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(var(--accent-rgb), 0.06) 0%, transparent 50%, rgba(99,102,241,0.04) 100%)'
                        : 'linear-gradient(135deg, rgba(var(--accent-rgb), 0.07) 0%, transparent 50%, rgba(99,102,241,0.04) 100%)',
                    }}
                  />

                  {/* Dashboard screenshot — displays when image exists */}
                  <img
                    ref={imgRef}
                    src={DASHBOARD_SCREENSHOT}
                    alt="SECENAI Agriculture Dashboard interface"
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ display: 'block' }}
                    onError={handleImgError}
                  />

                  {/* Fallback placeholder — shown only when screenshot is missing */}
                  <div
                    className={`items-center justify-center aspect-[4/3] ${isDark ? 'bg-dark-800' : 'bg-gray-100'
                      }`}
                    style={{ display: 'none' }}
                  >
                    {/* Grid pattern background */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: isDark
                          ? `radial-gradient(circle at 25% 35%, rgba(var(--accent-rgb), 0.04) 0%, transparent 50%),
                             radial-gradient(circle at 75% 65%, rgba(99,102,241,0.03) 0%, transparent 50%)`
                          : `radial-gradient(circle at 25% 35%, rgba(var(--accent-rgb), 0.05) 0%, transparent 50%),
                             radial-gradient(circle at 75% 65%, rgba(99,102,241,0.03) 0%, transparent 50%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: isDark
                          ? `linear-gradient(rgba(var(--accent-rgb), 0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(var(--accent-rgb), 0.03) 1px, transparent 1px)`
                          : `linear-gradient(rgba(var(--accent-rgb), 0.04) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(var(--accent-rgb), 0.04) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                      }}
                    />
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div
                        className="h-20 w-20 rounded-2xl flex items-center justify-center"
                        style={{
                          background: 'rgba(var(--accent-rgb), 0.08)',
                          border: '1px solid rgba(var(--accent-rgb), 0.1)',
                        }}
                      >
                        <LayoutDashboard
                          style={{ color: isDark ? 'rgba(var(--accent-rgb), 0.5)' : 'rgba(var(--accent-rgb), 0.6)' }}
                          size={32}
                          strokeWidth={1.5}
                        />
                      </div>
                      <span
                        className={`text-[0.6875rem] font-semibold tracking-[0.2em] uppercase ${isDark ? 'text-white/15' : 'text-gray-300'
                          }`}
                      >
                        Platform Preview
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── CTA — below preview, centered ── */}
              <motion.div
                className="mt-6 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  inView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              >
                <a
                  href={dashboardHeroData.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 font-semibold px-9 py-4 rounded-full text-base transition-all duration-300 w-full sm:w-auto"
                  style={{
                    background: 'var(--accent)',
                    color: isDark ? '#030303' : '#ffffff',
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent-hover)';
                    e.currentTarget.style.boxShadow = `0 10px 25px rgba(var(--accent-rgb), 0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--accent)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {dashboardHeroData.ctaText}
                  <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CAPABILITY CARDS SECTION
          ════════════════════════════════════ */}
      <section
        className={`relative py-16 md:py-24 overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
          }`}
      >
        {/* Grid overlay */}
        <div className={`absolute inset-0 z-1 grid-bg ${isDark ? 'opacity-30' : 'opacity-15'}`} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
          {/* Section header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="inline-block text-[0.6875rem] font-bold tracking-[0.3em] uppercase mb-4"
              style={{ color: isDark ? 'rgba(var(--accent-rgb), 0.6)' : 'var(--accent)' }}
            >
              Platform Capabilities
            </span>
            <h2
              className={`font-[Outfit] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#1e1b4b]'
                }`}
            >
              Everything in{' '}
              <span className="text-gradient-accent">One Platform</span>
            </h2>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {dashboardCapabilities.map(({ title, description, Icon }) => (
              <motion.div
                key={title}
                className="glass-card rounded-xl px-5 py-6"
                variants={fadeUp}
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: 'rgba(var(--accent-rgb), 0.08)',
                    border: isDark
                      ? '1px solid rgba(var(--accent-rgb), 0.1)'
                      : '1px solid rgba(var(--accent-rgb), 0.2)',
                  }}
                >
                  <Icon
                    style={{ color: isDark ? 'rgba(var(--accent-rgb), 0.7)' : 'var(--accent)' }}
                    size={20}
                    strokeWidth={1.5}
                  />
                </div>
                <h3
                  className="text-sm font-bold tracking-wide mb-2"
                  style={{ color: 'var(--accent)' }}
                >
                  {title}
                </h3>
                <p
                  className={`text-[0.8125rem] leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'
                    }`}
                >
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
