import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */
const perks = [
  {
    icon: Sparkles,
    title: 'Innovation First',
    description:
      'Work on cutting-edge AI and semiconductor technologies that define the industry.',
    accent: '#8b5cf6',
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    description:
      'Continuous learning opportunities, conference budgets, and tuition reimbursement.',
    accent: '#10b981',
  },
  {
    icon: Users,
    title: 'Collaborative Culture',
    description:
      'Small, high-impact teams where your voice matters and ideas ship fast.',
    accent: '#f59e0b',
  },
  {
    icon: Zap,
    title: 'Impact',
    description:
      'Your work directly powers autonomous systems used across agriculture, logistics, and smart cities.',
    accent: '#06b6d4',
  },
];

/* ──────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ──────────────────────────────────────────────
   PERK CARD
   ────────────────────────────────────────────── */
function PerkCard({ perk, isDark }) {
  const Icon = perk.icon;

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        borderRadius: '20px',
        padding: '36px 32px',
        background: isDark
          ? 'rgba(255,255,255,0.03)'
          : 'rgba(255,255,255,0.8)',
        border: isDark
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid rgba(0,0,0,0.06)',
        backdropFilter: 'blur(20px)',
        cursor: 'default',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        card.style.borderColor = isDark
          ? `${perk.accent}33`
          : `${perk.accent}25`;
        card.style.boxShadow = `0 16px 48px ${perk.accent}15`;
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget;
        card.style.borderColor = isDark
          ? 'rgba(255,255,255,0.06)'
          : 'rgba(0,0,0,0.06)';
        card.style.boxShadow = 'none';
      }}
    >
      {/* Subtle gradient background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${perk.accent}10, transparent 70%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon */}
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            background: `${perk.accent}15`,
            transition: 'all 0.3s ease',
          }}
        >
          <Icon size={24} style={{ color: perk.accent }} />
        </div>

        <h3
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.2rem',
            fontWeight: 700,
            marginBottom: '10px',
            color: isDark ? '#ffffff' : '#1e1b4b',
          }}
        >
          {perk.title}
        </h3>

        <p
          style={{
            fontSize: '0.875rem',
            lineHeight: 1.7,
            color: isDark ? 'rgba(255,255,255,0.45)' : '#6b7280',
          }}
        >
          {perk.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   WHY WORK HERE SECTION
   ────────────────────────────────────────────── */
export default function WhyWorkHere() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      style={{
        paddingTop: '80px',
        paddingBottom: '120px',
        paddingLeft: 'clamp(24px, 5vw, 96px)',
        paddingRight: 'clamp(24px, 5vw, 96px)',
        position: 'relative',
      }}
    >
      {/* Ambient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(180deg, transparent 0%, rgba(204,255,0,0.015) 50%, transparent 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.03) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '14px',
              color: isDark ? '#ffffff' : '#1e1b4b',
            }}
          >
            Why Work{' '}
            <span className="text-gradient-emerald">
              Here?
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: '1rem',
              maxWidth: '500px',
              margin: '0 auto',
              color: isDark ? 'rgba(255,255,255,0.45)' : '#6b7280',
            }}
          >
            We believe great work comes from great culture.
          </motion.p>
        </motion.div>

        {/* Perks Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {perks.map((perk) => (
            <PerkCard key={perk.title} perk={perk} isDark={isDark} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
