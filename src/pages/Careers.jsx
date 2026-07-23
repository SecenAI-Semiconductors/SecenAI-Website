import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Briefcase, ChevronRight } from 'lucide-react';
import OpenPositions from '../sections/OpenPositions';
import WhyWorkHere from '../sections/WhyWorkHere';

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

export default function Careers() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: isDark ? '#030303' : '#e4e2d8',
        color: isDark ? '#ffffff' : '#1f2937',
        transition: 'background-color 0.4s ease, color 0.4s ease',
      }}
    >
      {/* ═══════════════════════════════════════════
          JOIN OUR TEAM HERO
          ═══════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          paddingTop: '110px',
          paddingBottom: '40px',
          paddingLeft: 'clamp(24px, 5vw, 96px)',
          paddingRight: 'clamp(24px, 5vw, 96px)',
          overflow: 'hidden',
        }}
      >
        {/* Background ambient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            filter: 'blur(120px)',
            opacity: 0.15,
            pointerEvents: 'none',
            background: isDark
              ? 'radial-gradient(circle, rgba(204,255,0,0.5), transparent 60%)'
              : 'radial-gradient(circle, rgba(83,137,68,0.25), transparent 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '5%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            filter: 'blur(100px)',
            opacity: 0.1,
            pointerEvents: 'none',
            background: isDark
              ? 'radial-gradient(circle, rgba(139,92,246,0.4), transparent 60%)'
              : 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 60%)',
          }}
        />

        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: isDark
              ? 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)'
              : 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span
              style={{
                display: 'inline-block',
                padding: '8px 20px',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '28px',
                border: isDark
                  ? '1px solid rgba(255,255,255,0.08)'
                  : '1px solid rgba(0,0,0,0.08)',
                background: isDark
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(0,0,0,0.03)',
                color: isDark ? 'rgba(255,255,255,0.5)' : '#374151',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Briefcase
                size={13}
                style={{ display: 'inline', marginRight: '8px', verticalAlign: '-2px' }}
              />
              We're Hiring
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: '24px',
            }}
          >
            <span style={{ color: isDark ? '#ffffff' : '#000000ff' }}>
              Join Our{' '}
            </span>
            <span className={isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}>
              Team
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.7,
              maxWidth: '600px',
              color: isDark ? 'rgba(255,255,255,0.55)' : '#374151',
            }}
          >
            Build the future with us. We are looking for passionate engineers and
            innovators to join our growing team.
          </motion.p>

          {/* Scroll CTA */}
          <motion.div variants={fadeUp} style={{ marginTop: '44px' }}>
            <a
              href="#open-positions"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 32px',
                borderRadius: '14px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                color: isDark ? '#030303' : '#ffffff',
                background: isDark ? '#CCFF00' : '#538944',
                transition: 'all 0.3s ease',
                boxShadow: isDark
                  ? '0 8px 30px rgba(204,255,0,0.2)'
                  : '0 8px 30px rgba(83,137,68,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = isDark
                  ? '0 14px 40px rgba(204,255,0,0.3)'
                  : '0 14px 40px rgba(83,137,68,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isDark
                  ? '0 8px 30px rgba(204,255,0,0.2)'
                  : '0 8px 30px rgba(83,137,68,0.2)';
              }}
            >
              View Open Positions
              <ChevronRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      <OpenPositions />
      <WhyWorkHere />
    </div>
  );
}
