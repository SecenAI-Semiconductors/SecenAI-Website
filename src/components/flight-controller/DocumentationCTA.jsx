import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { FileText, MapPin, BookOpen, Package, MessageSquare, ArrowRight } from 'lucide-react';
import { documentationData } from '../../data/secenaiFCH743V1Data';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
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
   RESOURCE CARD ICONS
   ═══════════════════════════════════════════ */

const resourceIcons = [FileText, MapPin, BookOpen, Package, MessageSquare];

/* ═══════════════════════════════════════════
   RESOURCE CARD
   ═══════════════════════════════════════════ */

function ResourceCard({ resource, index, isDark }) {
  const Icon = resourceIcons[index] || FileText;
  const isAction = !!resource.action;

  const inner = (
    <div
      className={`glass-card rounded-xl px-6 py-6 h-full flex flex-col transition-all duration-200 ${
        isAction
          ? isDark
            ? 'hover:border-neon/20 cursor-pointer'
            : 'hover:border-emerald-300 cursor-pointer'
          : ''
      }`}
    >
      {/* Icon */}
      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${
          isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
        }`}
      >
        <Icon size={17} className={isDark ? 'text-neon' : 'text-emerald-600'} />
      </div>

      {/* Title */}
      <h3
        className={`text-[0.9375rem] font-semibold mb-1.5 ${
          isDark ? 'text-white/80' : 'text-[#1e1b4b]'
        }`}
      >
        {resource.title}
      </h3>

      {/* Description */}
      <p
        className={`text-[0.75rem] leading-relaxed flex-1 ${
          isDark ? 'text-white/35' : 'text-gray-500'
        }`}
      >
        {resource.description}
      </p>

      {/* Status or Action */}
      <div className="mt-4">
        {resource.status && (
          <span
            className={`inline-flex items-center text-[0.625rem] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full ${
              isDark
                ? 'bg-white/[0.04] text-white/20 border border-white/[0.06]'
                : 'bg-gray-100 text-gray-400 border border-gray-200'
            }`}
          >
            {resource.status}
          </span>
        )}
        {resource.action && (
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
              isDark ? 'text-neon/70' : 'text-emerald-600'
            }`}
          >
            {resource.action.label}
            <ArrowRight size={12} />
          </span>
        )}
      </div>
    </div>
  );

  if (isAction) {
    return (
      <Link to={resource.action.href} className="block h-full">
        {inner}
      </Link>
    );
  }

  return inner;
}

/* ═══════════════════════════════════════════
   DOCUMENTATION CTA
   ═══════════════════════════════════════════ */

export default function DocumentationCTA() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${
        isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
      }`}
    >
      {/* Ambient glow */}
      {isDark && (
        <div className="pointer-events-none absolute right-[15%] top-[10%] h-[400px] w-[500px] rounded-full bg-neon/[0.02] blur-[180px]" />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── Resources heading ── */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.span
            className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 ${
              isDark ? 'text-neon/50' : 'text-emerald-600/70'
            }`}
            variants={fadeUp}
          >
            {documentationData.badge}
          </motion.span>

          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] max-w-xl ${
              isDark ? 'text-white' : 'text-[#1e1b4b]'
            }`}
            variants={fadeUp}
          >
            {documentationData.title}
          </motion.h2>

          {/* Divider */}
          <motion.div
            className={`my-8 h-px w-full max-w-xl ${
              isDark
                ? 'bg-gradient-to-r from-neon/15 via-white/5 to-transparent'
                : 'bg-gradient-to-r from-emerald-300/30 via-gray-200 to-transparent'
            }`}
            variants={fadeUp}
          />

          {/* ── Resource cards ── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-24"
            variants={stagger}
          >
            {documentationData.resources.map((resource, i) => (
              <motion.div key={resource.title} variants={fadeUp}>
                <ResourceCard resource={resource} index={i} isDark={isDark} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════
           FINAL CTA
           ════════════════════════════════════ */}
        <motion.div
          className={`rounded-2xl border px-8 py-14 sm:px-12 md:px-16 text-center ${
            isDark
              ? 'bg-gradient-to-br from-white/[0.02] via-white/[0.01] to-transparent border-white/[0.06]'
              : 'bg-gradient-to-br from-white via-gray-50 to-transparent border-gray-200'
          }`}
          style={{
            boxShadow: isDark
              ? '0 30px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)'
              : '0 30px 80px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {/* Ambient glow inside card */}
          {isDark && (
            <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[400px] rounded-full bg-neon/[0.03] blur-[120px]" />
            </div>
          )}

          <h3
            className={`relative z-10 font-[Outfit] text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.15] max-w-lg mx-auto ${
              isDark ? 'text-white' : 'text-[#1e1b4b]'
            }`}
          >
            {documentationData.cta.heading}
          </h3>

          <p
            className={`relative z-10 mt-5 text-[0.9375rem] leading-[1.75] max-w-lg mx-auto ${
              isDark ? 'text-white/45' : 'text-gray-600'
            }`}
          >
            {documentationData.cta.text}
          </p>

          {/* Buttons */}
          <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {documentationData.cta.buttons.map((btn) => (
              <Link
                key={btn.label}
                to={btn.href}
                className={`inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-all duration-200 ${
                  btn.primary
                    ? isDark
                      ? 'bg-neon text-dark-950 hover:bg-neon/90 shadow-lg shadow-neon/20'
                      : 'bg-[#538944] text-white hover:bg-[#466e3a] shadow-lg shadow-[#538944]/20'
                    : isDark
                      ? 'bg-white/[0.06] text-white/70 border border-white/[0.08] hover:bg-white/[0.1]'
                      : 'bg-white text-[#1e1b4b] border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {btn.label}
                <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
