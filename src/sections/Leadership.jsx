import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Linkedin, ExternalLink } from 'lucide-react';


import DakshishImg from '../assets/Dakshish.jpg';
import KishoreImg from '../assets/Kishore.jpg';
import JoseImg from '../assets/Jose.jpeg';
import BhaskarImg from '../assets/Bhaskar.jpeg';
import PrateekImg from '../assets/Prateek.jpg';
import ShivaImg from '../assets/Shiva.jpg';
import SumanthImg from '../assets/Sumanth.jpg';
import VinodImg from '../assets/Vinod.jpg';
import Akhil from '../assets/Akhil.jpg';
import RameshImg from '../assets/Ramesh.jpg';
import sivasankarImg from '../assets/sivasankar.jpg';
/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════
   LEADERSHIP DATA
   ═══════════════════════════════════════════ */

const leaders = [
  {
    name: 'Dr. Ramesh Vaddi',
    role: 'Founder',
    qualifications: 'Professor EECE & Director Core Engineering GITAM University Hyderabad',
    linkedin: 'https://www.linkedin.com/in/dr-ramesh-vaddi-b0052620',
    avatar: RameshImg,
    accent: '#2563eb',
    initials: 'RV',
  },
  {
    name: 'Prof. Siva Shankar Y',
    role: 'Founder',
    qualifications: '',
    linkedin: 'https://www.linkedin.com/in/y-siva-shankar-75a48b29/',
    avatar: sivasankarImg,
    accent: '#08fabd',
    initials: 'YS',
  },
  {
    name: 'Dr. Vinod Kumar Ancha',
    role: 'Co Founder',
    qualifications: 'Assistant Professor (CS & AI)',
    linkedin: 'https://www.linkedin.com/in/dr-vinod-kumar-ancha-22dec2025',
    avatar: VinodImg,
    accent: '#10b981',
    initials: 'VA',
  },
  {
    name: 'K Bhaskar',
    role: 'HR Director',
    qualifications: 'Professor SRM AP',
    linkedin: 'https://www.linkedin.com/in/bhaskar-k-064b26313',
    avatar: BhaskarImg,
    accent: '#c2410c',
    initials: 'KB',
  },
  {
    name: 'Jose Pramod Kommini',
    role: 'Consultant',
    qualifications: 'M.tech Embedded Systems & IoT Engineer',
    linkedin: 'https://www.linkedin.com/in/jose-pramod-kommini-24b499157',
    avatar: JoseImg,
    accent: '#23ff65',
    initials: 'JPK',
  },
  {
    name: 'Sabba Dakshish',
    role: 'Drone Intern',
    qualifications: 'B.Tech in Aerospace Engineering',
    linkedin: 'https://www.linkedin.com/in/sabba-dakshish-926a1a214',
    avatar: DakshishImg,
    accent: '#06b6d4',
    initials: 'SD',
  },
  {
    name: 'Gajula Prateek',
    role: 'Drone Intern',
    qualifications: 'B.Tech in  Aerospace Engineering',
    linkedin: 'http://linkedin.com/in/prateek-gajula-a0339b321',
    avatar: PrateekImg,
    accent: '#f59e0b',
    initials: 'GP',
  },
  {
    name: 'Sai Shivaram Chary Medoju',
    role: 'Drone Intern',
    qualifications: 'B.Tech in Aerospace Engineering',
    linkedin: 'https://www.linkedin.com/in/sai-shivaram-chary-medoju-7a657a275/',
    avatar: ShivaImg,
    accent: '#ef4444',
    initials: 'SM',
  },
  {
    name: 'Borra Sumanth Raj',
    role: 'Drone Intern',
    qualifications: 'B.Tech in  Aerospace Engineering',
    linkedin: 'https://www.linkedin.com/in/borra-sumanth-raj',
    avatar: SumanthImg,
    accent: '#ec4899',
    initials: 'BR',
  },
  {
    name: 'K Akhil Varma',
    role: 'Development Intern',
    qualifications: 'B.Tech in Information Technology',
    linkedin: 'https://www.linkedin.com/in/akhil-varma-56a780292/',
    avatar: Akhil,
    accent: '#f59e0b',
    initials: 'AY',
  },
  {
    name: 'N Sai Kishore',
    role: 'Development Intern',
    qualifications: 'B.Tech in CSD',
    linkedin: 'https://www.linkedin.com/in/saikishore30',
    avatar: KishoreImg,
    accent: '#8b5cf6',
    initials: 'SK',
  },
];
/* ═══════════════════════════════════════════
   LEADER CARD COMPONENT
   ═══════════════════════════════════════════ */

function LeaderCard({ leader, isDark, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        background: isDark
          ? 'rgba(255,255,255,0.03)'
          : 'rgba(255,255,255,0.9)',
        border: isDark
          ? `1px solid ${isHovered ? `${leader.accent}40` : 'rgba(255,255,255,0.06)'}`
          : `1px solid ${isHovered ? `${leader.accent}30` : 'rgba(0,0,0,0.06)'}`,
        backdropFilter: 'blur(20px)',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: isHovered
          ? `0 20px 60px ${leader.accent}15, 0 0 0 1px ${leader.accent}10`
          : isDark
            ? '0 4px 20px rgba(0,0,0,0.2)'
            : '0 4px 20px rgba(0,0,0,0.04)',
      }}
    >
      {/* Top accent gradient bar */}
      <div
        style={{
          height: '4px',
          background: `linear-gradient(90deg, ${leader.accent}, ${leader.accent}88, ${leader.accent}44)`,
          transition: 'opacity 0.3s ease',
          opacity: isHovered ? 1 : 0.5,
        }}
      />

      {/* Background glow on hover */}
      <div
        style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${leader.accent}${isHovered ? '15' : '05'}, transparent 70%)`,
          filter: 'blur(50px)',
          pointerEvents: 'none',
          transition: 'all 0.5s ease',
        }}
      />

      <div style={{ padding: '32px 28px 28px', position: 'relative', zIndex: 1 }}>
        {/* Avatar */}
        <div
          style={{
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            margin: '0 auto 20px',
            position: 'relative',
          }}
        >
          {/* Outer ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-3px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${leader.accent}, ${leader.accent}44)`,
              opacity: isHovered ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
            }}
          />
          {/* Avatar inner */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isDark
                ? `linear-gradient(135deg, ${leader.accent}25, ${leader.accent}10)`
                : `linear-gradient(135deg, ${leader.accent}20, ${leader.accent}08)`,
              border: isDark
                ? '2px solid rgba(255,255,255,0.1)'
                : '2px solid rgba(255,255,255,1)',
              overflow: 'hidden',
            }}
          >
            {leader.avatar ? (
              <img
                src={leader.avatar}
                alt={leader.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: leader.accent,
                  letterSpacing: '0.05em',
                }}
              >
                {leader.initials}
              </span>
            )}
          </div>
        </div>

        {/* Name */}
        <h3
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.15rem',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '6px',
            color: isDark ? '#ffffff' : '#1e1b4b',
            lineHeight: 1.3,
          }}
        >
          {leader.name}
        </h3>

        {/* Role */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.03em',
            marginBottom: '8px',
            color: leader.accent,
          }}
        >
          {leader.role}
        </p>

        {/* Qualifications */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            lineHeight: 1.5,
            marginBottom: '20px',
            color: isDark ? 'rgba(255,255,255,0.40)' : '#9ca3af',
          }}
        >
          {leader.qualifications}
        </p>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: isDark
              ? 'rgba(255,255,255,0.06)'
              : 'rgba(0,0,0,0.06)',
            marginBottom: '16px',
          }}
        />

        {/* LinkedIn */}
        <a
          href={leader.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '0.8rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            background: isHovered
              ? `${leader.accent}15`
              : isDark
                ? 'rgba(255,255,255,0.04)'
                : 'rgba(0,0,0,0.03)',
            color: isHovered
              ? leader.accent
              : isDark
                ? 'rgba(255,255,255,0.50)'
                : '#6b7280',
            border: `1px solid ${isHovered ? `${leader.accent}25` : 'transparent'}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${leader.accent}20`;
            e.currentTarget.style.color = leader.accent;
            e.currentTarget.style.borderColor = `${leader.accent}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isDark
              ? 'rgba(255,255,255,0.04)'
              : 'rgba(0,0,0,0.03)';
            e.currentTarget.style.color = isDark
              ? 'rgba(255,255,255,0.50)'
              : '#6b7280';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <Linkedin size={16} />
          <span>Connect on LinkedIn</span>
          <ExternalLink size={12} style={{ opacity: 0.6 }} />
        </a>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   LEADERSHIP SECTION EXPORT
   ═══════════════════════════════════════════ */

export default function Leadership() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="leadership"
      ref={sectionRef}
      className={`relative py-14 md:py-20 overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-white'
        }`}
    >
      {/* Background effects */}
      {isDark && (
        <>
          <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#8b5cf6]/[0.02] blur-[200px]" />
          <div className="pointer-events-none absolute left-1/3 bottom-0 h-[400px] w-[400px] rounded-full bg-neon/[0.02] blur-[160px]" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          className="mb-10 text-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.span
            className={`inline-block text-xs font-bold tracking-[0.25em] uppercase mb-4 ${isDark ? 'text-neon/70' : 'text-emerald-600'
              }`}
            variants={fadeUp}
          >
            Our Team
          </motion.span>

          <motion.h2
            className="font-[Outfit] text-4xl font-bold md:text-6xl"
            variants={fadeUp}
          >
            <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>
              Meet the{' '}
            </span>
            <span
              className={
                isDark ? 'text-gradient-neon' : 'text-gradient-emerald'
              }
            >
              Leadership
            </span>
          </motion.h2>

          <motion.p
            className={`mx-auto mt-6 max-w-3xl text-lg leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-500'
              }`}
            variants={fadeUp}
          >
            Guided by a team of visionary leaders, researchers, and engineers
            committed to transforming agriculture through cutting-edge AI innovation.
          </motion.p>

          <motion.div
            className={`mx-auto mt-8 h-0.5 w-24 rounded-full ${isDark ? 'bg-neon' : 'bg-emerald-500'
              }`}
            variants={fadeUp}
          />
        </motion.div>

        {/* Leaders grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {leaders.map((leader, i) => (
            <LeaderCard
              key={leader.name}
              leader={leader}
              isDark={isDark}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
