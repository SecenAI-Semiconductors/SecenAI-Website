import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown } from 'lucide-react';
import { technicalSpecsData } from '../../data/secenaiFCH743V1Data';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
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
   ACCORDION GROUP
   ═══════════════════════════════════════════ */

function SpecGroup({ group, isDark, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-xl border transition-colors duration-200 ${
        isDark
          ? `border-white/[0.06] ${isOpen ? 'bg-white/[0.02]' : 'bg-transparent'}`
          : `border-gray-200 ${isOpen ? 'bg-white' : 'bg-transparent'}`
      }`}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-4 sm:px-6 text-left cursor-pointer transition-colors duration-200 rounded-xl ${
          isDark
            ? 'hover:bg-white/[0.02]'
            : 'hover:bg-gray-50'
        }`}
        aria-expanded={isOpen}
      >
        <span
          className={`text-sm font-semibold ${
            isDark
              ? isOpen ? 'text-neon/80' : 'text-white/60'
              : isOpen ? 'text-emerald-600' : 'text-[#1e1b4b]'
          }`}
        >
          {group.name}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          } ${isDark ? 'text-white/30' : 'text-gray-400'}`}
        />
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <table className="w-full">
                <tbody>
                  {group.specs.map((spec, i) => (
                    <tr
                      key={spec.label}
                      className={
                        i < group.specs.length - 1
                          ? isDark
                            ? 'border-b border-white/[0.04]'
                            : 'border-b border-gray-100'
                          : ''
                      }
                    >
                      <td
                        className={`py-2.5 pr-4 text-[0.8125rem] font-medium whitespace-nowrap ${
                          isDark ? 'text-white/40' : 'text-gray-500'
                        }`}
                      >
                        {spec.label}
                      </td>
                      <td
                        className={`py-2.5 text-[0.8125rem] text-right ${
                          isDark ? 'text-white/70' : 'text-[#1e1b4b]'
                        }`}
                      >
                        {spec.value || (
                          <span className={isDark ? 'text-white/20 italic' : 'text-gray-300 italic'}>
                            TBD
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TECHNICAL SPECIFICATIONS
   ═══════════════════════════════════════════ */

export default function TechnicalSpecifications() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  /* Open all groups by default on desktop, first only on mobile */
  const [openGroups, setOpenGroups] = useState(() =>
    technicalSpecsData.categories.map((_, i) => i === 0)
  );

  const toggleGroup = (index) => {
    setOpenGroups((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const expandAll = () => setOpenGroups(technicalSpecsData.categories.map(() => true));
  const collapseAll = () => setOpenGroups(technicalSpecsData.categories.map(() => false));

  const allOpen = openGroups.every(Boolean);

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${
        isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
      }`}
    >
      {/* Ambient glow */}
      {isDark && (
        <div className="pointer-events-none absolute left-[15%] top-[10%] h-[400px] w-[500px] rounded-full bg-neon/[0.02] blur-[180px]" />
      )}

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* ── Header ── */}
        <motion.div
          className="mb-12"
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
            {technicalSpecsData.badge}
          </motion.span>

          <motion.h2
            className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] ${
              isDark ? 'text-white' : 'text-[#1e1b4b]'
            }`}
            variants={fadeUp}
          >
            {technicalSpecsData.title}
          </motion.h2>

          <motion.p
            className={`mt-3 text-[0.9375rem] ${
              isDark ? 'text-white/40' : 'text-gray-500'
            }`}
            variants={fadeUp}
          >
            {technicalSpecsData.subtitle}
          </motion.p>

          {/* Expand / Collapse toggle */}
          <motion.div className="mt-6" variants={fadeUp}>
            <button
              onClick={allOpen ? collapseAll : expandAll}
              className={`text-xs font-semibold tracking-wide cursor-pointer transition-colors ${
                isDark
                  ? 'text-neon/50 hover:text-neon/80'
                  : 'text-emerald-500 hover:text-emerald-700'
              }`}
            >
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </motion.div>
        </motion.div>

        {/* ── Accordion Groups ── */}
        <motion.div
          className="flex flex-col gap-3"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {technicalSpecsData.categories.map((group, i) => (
            <motion.div key={group.name} variants={fadeUp}>
              <SpecGroup
                group={group}
                isDark={isDark}
                isOpen={openGroups[i]}
                onToggle={() => toggleGroup(i)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
