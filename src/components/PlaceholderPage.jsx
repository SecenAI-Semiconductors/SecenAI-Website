import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function PlaceholderPage({
  title,
  subtitle,
  description,
  parentLabel,
  parentHref,
  backgroundImage,
  badgeText = "EXPLORE PLATFORM",
  titleSize = "text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl",
  titleBlock = false,
}) {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  // Helper to split title into primary white text & gradient highlight text if needed
  const words = title ? title.trim().split(' ') : [];
  const titleMain = words.length > 1 ? words.slice(0, -1).join(' ') : title;
  const titleHighlight = words.length > 1 ? words[words.length - 1] : '';

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center pb-20 pt-16"
    >
      {/* Parallax Background */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 z-0 flex items-center justify-center"
          style={{ y: backgroundY }}
        >
          <img
            src={backgroundImage}
            alt={title}
            className="w-full h-[120%] object-cover object-center"
          />
        </motion.div>
      )}

      {/* Overlay */}
      <motion.div
        className={`absolute inset-0 z-[1] ${
          isDark
            ? 'bg-gradient-to-b from-dark-950/90 via-dark-950/75 to-dark-950'
            : 'bg-gradient-to-b from-white/90 via-white/80 to-white/95'
        }`}
        style={{ opacity: overlayOpacity }}
      />

      {/* Grid Overlay */}
      <div className={`absolute inset-0 z-[2] grid-bg ${isDark ? 'opacity-40' : 'opacity-20'}`} />

      {/* Glow Effects — dark mode only */}
      {isDark && (
        <>
          <div className="absolute top-1/4 -right-20 z-[3] h-96 w-96 rounded-full bg-neon/10 blur-[120px] animate-float pointer-events-none" />
          <div className="absolute bottom-1/3 -left-10 z-[3] h-64 w-64 rounded-full bg-neon/5 blur-[100px] animate-float-delayed pointer-events-none" />
        </>
      )}

      {/* Light mode accent orb */}
      {!isDark && (
        <div
          className="absolute top-1/4 right-10 z-[3] h-96 w-96 rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(83,137,68,0.12), transparent 60%)' }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center min-h-screen justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Back link if supplied */}
          {parentLabel && parentHref && (
            <motion.div variants={fadeSlideUp}>
              <Link
                to={parentHref}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-4 transition-colors ${
                  isDark ? 'text-neon/70 hover:text-neon' : 'text-emerald-600/80 hover:text-emerald-600'
                }`}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {parentLabel}
              </Link>
            </motion.div>
          )}

          {/* Badge (matching Home Hero pill style) */}
          <motion.div variants={fadeSlideUp}>
            <span
              className={`mb-8 inline-block rounded-full border px-4 py-1.5 text-xs tracking-[0.2em] backdrop-blur-sm ${
                isDark
                  ? 'border-white/15 bg-white/10 text-white/80'
                  : 'border-gray-300 bg-white/70 text-gray-600'
              }`}
            >
              {badgeText}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeSlideUp}
            className={`mb-6 font-[Outfit] leading-tight ${titleSize}`}
          >
            <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>
              {titleMain}{' '}
            </span>
            {titleHighlight && (
              <span className={`${titleBlock ? 'block' : 'inline-block'} ${isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}`}>
                {titleHighlight}
              </span>
            )}
          </motion.h1>

          {/* Description (matching Home Hero max-width, text size & color) */}
          <motion.p
            variants={fadeSlideUp}
            className={`mb-10 max-w-4xl text-base leading-relaxed sm:text-lg md:text-xl ${
              isDark ? 'text-white/80' : 'text-gray-700'
            }`}
          >
            {description}
          </motion.p>

          {/* Status Badge */}
          <motion.div variants={fadeSlideUp}>
            <span
              className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-xs font-semibold tracking-wider uppercase backdrop-blur-md ${
                isDark
                  ? 'bg-white/10 text-white/70 border border-white/15'
                  : 'bg-white/80 text-gray-600 border border-gray-300'
              }`}
            >
              <span className={`h-2 w-2 rounded-full animate-pulse ${isDark ? 'bg-neon' : 'bg-emerald-500'}`} />
              Content coming soon
            </span>
          </motion.div>

          {/* Decorative bottom line */}
          <motion.div
            className={`mx-auto mt-12 h-px w-36 ${
              isDark
                ? 'bg-gradient-to-r from-transparent via-neon/30 to-transparent'
                : 'bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent'
            }`}
            variants={fadeSlideUp}
          />
        </motion.div>
      </div>
    </section>
  );
}
