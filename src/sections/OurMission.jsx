import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Rocket, Eye, Heart, Shield } from 'lucide-react';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════
   PILLARS DATA
   ═══════════════════════════════════════════ */

const pillars = [
  {
    icon: Rocket,
    title: 'Our Mission',
    description:
      'To empower the agricultural ecosystem with intelligent, AI-driven solutions that optimize every stage of crop lifecycle, from seed quality assessment to market distribution, ensuring food security and sustainable farming for future generations.',
    accent: '#8b5cf6',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'To become the global leader in AI-powered agricultural technology, creating a world where every farmer has access to precision tools that maximize yield, minimize waste, and promote environmental stewardship.',
    accent: '#06b6d4',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description:
      'Innovation, sustainability, and farmer empowerment are at the heart of everything we do. We believe technology should serve people by bridging the gap between advanced AI research and real-world agricultural impact.',
    accent: '#10b981',
  },
  {
    icon: Shield,
    title: 'Our Commitment',
    description:
      'We are committed to building transparent, reliable, and accessible AI solutions. Every product we ship undergoes rigorous testing and validation to ensure it delivers measurable improvements for farming communities.',
    accent: '#f59e0b',
  },
];

/* ═══════════════════════════════════════════
   OUR MISSION COMPONENT
   ═══════════════════════════════════════════ */

export default function OurMission() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="our-mission"
      ref={sectionRef}
      className={`relative py-20 md:py-28 overflow-hidden ${
        isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
      }`}
    >
      {/* Background effects */}
      <div
        className={`absolute inset-0 grid-bg ${
          isDark ? 'opacity-30' : 'opacity-15'
        }`}
      />

      {isDark && (
        <>
          <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#8b5cf6]/[0.03] blur-[200px]" />
          <div className="pointer-events-none absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#06b6d4]/[0.03] blur-[160px]" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.span
            className={`inline-block text-xs font-bold tracking-[0.25em] uppercase mb-4 ${
              isDark ? 'text-neon/70' : 'text-emerald-600'
            }`}
            variants={fadeUp}
          >
            Who We Are
          </motion.span>

          <motion.h2
            className="font-[Outfit] text-4xl font-bold md:text-6xl"
            variants={fadeUp}
          >
            <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>
              Driving{' '}
            </span>
            <span
              className={
                isDark ? 'text-gradient-neon' : 'text-gradient-emerald'
              }
            >
              Purpose
            </span>
          </motion.h2>

          <motion.p
            className={`mx-auto mt-6 max-w-3xl text-lg leading-relaxed ${
              isDark ? 'text-white/50' : 'text-gray-500'
            }`}
            variants={fadeUp}
          >
            Built on a foundation of innovation and driven by a passion for
            sustainable agriculture, SecenAI is redefining how technology serves
            the farming community.
          </motion.p>

          <motion.div
            className={`mx-auto mt-8 h-0.5 w-24 rounded-full ${
              isDark ? 'bg-neon' : 'bg-emerald-500'
            }`}
            variants={fadeUp}
          />
        </motion.div>

        {/* Pillars grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const variant = i % 2 === 0 ? fadeRight : fadeLeft;

            return (
              <motion.div
                key={pillar.title}
                variants={variant}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative group"
                style={{
                  borderRadius: '24px',
                  padding: '40px 36px',
                  background: isDark
                    ? 'rgba(255,255,255,0.03)'
                    : 'rgba(255,255,255,0.8)',
                  border: isDark
                    ? '1px solid rgba(255,255,255,0.06)'
                    : '1px solid rgba(0,0,0,0.06)',
                  backdropFilter: 'blur(20px)',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  card.style.borderColor = isDark
                    ? `${pillar.accent}33`
                    : `${pillar.accent}25`;
                  card.style.boxShadow = `0 16px 48px ${pillar.accent}15`;
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.borderColor = isDark
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(0,0,0,0.06)';
                  card.style.boxShadow = 'none';
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute top-0 right-0 w-44 h-44 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, ${pillar.accent}12, transparent 70%)`,
                    filter: 'blur(40px)',
                  }}
                />

                <div className="relative z-10">
                  {/* Top accent bar */}
                  <div
                    className="w-12 h-1 rounded-full mb-6"
                    style={{ background: pillar.accent }}
                  />

                  {/* Icon */}
                  <div
                    className="mb-5 w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: `${pillar.accent}15` }}
                  >
                    <Icon size={26} style={{ color: pillar.accent }} />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-[Outfit] text-xl font-bold mb-3"
                    style={{ color: isDark ? '#ffffff' : '#1e1b4b' }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: isDark ? 'rgba(255,255,255,0.50)' : '#6b7280',
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
