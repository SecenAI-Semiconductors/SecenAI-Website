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
                ? 'bg-white/10 text-white/50 border border-white/15'
                : 'bg-white text-gray-600 border border-gray-300 shadow-xs'
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
        isDark ? 'bg-dark-900' : 'bg-[#f0f0f3]'
      }`}
    >
      {/* Ambient glow */}
      {isDark && (
        <div className="pointer-events-none absolute left-[15%] top-[10%] h-[400px] w-[500px] rounded-full bg-neon/[0.02] blur-[180px]" />
      )}

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          className="text-center mb-16"
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
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] ${
              isDark ? 'text-white' : 'text-[#1e1b4b]'
            }`}
            variants={fadeUp}
          >
            {documentationData.title}
          </motion.h2>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {documentationData.resources.map((res, i) => (
            <motion.div key={res.title} variants={fadeUp}>
              <ResourceCard resource={res} index={i} isDark={isDark} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Banner */}
        <motion.div
          className={`rounded-2xl border px-8 py-10 sm:px-12 sm:py-12 text-center ${
            isDark
              ? 'bg-dark-800/80 border-white/12 shadow-2xl shadow-black/40'
              : 'bg-white border-gray-300 shadow-xl'
          }`}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <h3
            className={`font-[Outfit] text-2xl sm:text-3xl font-bold ${
              isDark ? 'text-white' : 'text-[#1e1b4b]'
            }`}
          >
            {documentationData.cta.heading}
          </h3>
          <p
            className={`mt-3 text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${
              isDark ? 'text-white/50' : 'text-gray-600'
            }`}
          >
            {documentationData.cta.text}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
                      : 'bg-gray-50 text-[#1e1b4b] border border-gray-300 shadow-sm hover:bg-gray-100'
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
