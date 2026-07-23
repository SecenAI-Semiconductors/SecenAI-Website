import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function PlaceholderPage({ title, description, parentLabel, parentHref }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`relative min-h-screen flex items-center justify-center py-32 px-6 ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'}`}>
      {/* Subtle background glow */}
      {isDark && (
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/3 blur-[180px]" />
      )}

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Back link */}
        {parentLabel && parentHref && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <Link
              to={parentHref}
              className={`inline-flex items-center gap-1.5 text-sm font-medium mb-8 transition-colors ${isDark ? 'text-neon/60 hover:text-neon' : 'text-emerald-600/70 hover:text-emerald-600'}`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {parentLabel}
            </Link>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          className={`font-[Outfit] text-4xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.5}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className={`text-lg md:text-xl leading-relaxed mb-10 ${isDark ? 'text-white/50' : 'text-gray-500'}`}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          {description}
        </motion.p>

        {/* Coming Soon Badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1.5}
        >
          <span
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wider uppercase ${isDark
              ? 'bg-white/5 text-white/40 border border-white/10'
              : 'bg-gray-100 text-gray-400 border border-gray-200'
              }`}
          >
            <span className={`h-2 w-2 rounded-full animate-pulse ${isDark ? 'bg-neon/60' : 'bg-emerald-400'}`} />
            Content coming soon
          </span>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className={`mx-auto mt-12 h-px w-32 ${isDark ? 'bg-gradient-to-r from-transparent via-neon/20 to-transparent' : 'bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent'}`}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
        />
      </div>
    </section>
  );
}
