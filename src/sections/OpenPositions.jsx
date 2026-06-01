import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  MapPin,
  Clock,
  ChevronRight,
  ArrowUpRight,
  Building2,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */
const openPositions = [
  {
    id: 1,
    title: 'AI/ML Engineer',
    department: 'Engineering',
    location: 'Hybrid — Mangalagiri, AP',
    type: 'Full-Time',
    description:
      'Design and deploy machine learning models for drone-based image analytics, crop disease detection, and real-time object recognition across our platform.',
    requirements: [
      'MS/PhD in CS, EE, or related field',
      '3+ years experience with PyTorch / TensorFlow',
      'Experience with computer vision & edge deployment',
    ],
  },
  {
    id: 2,
    title: 'Embedded Systems Engineer',
    department: 'Hardware',
    location: 'On-Site — Mangalagiri, AP',
    type: 'Full-Time',
    description:
      'Build firmware for FPGA-based drone controllers, sensor fusion modules, and custom semiconductor test platforms powering next-gen autonomous systems.',
    requirements: [
      'BS/MS in ECE or related field',
      'Proficiency in C/C++, Verilog / VHDL',
      'Experience with FPGA design & SoC architectures',
    ],
  },
  {
    id: 3,
    title: 'Full-Stack Developer',
    department: 'Platform',
    location: 'Remote / Hybrid',
    type: 'Full-Time',
    description:
      'Architect and ship features across our cloud-based drone intelligence dashboard — real-time telemetry visualization, analytics, and IoT integrations.',
    requirements: [
      'Strong proficiency with React, Node.js, and TypeScript',
      'Experience with WebSocket / real-time data streams',
      'Familiarity with AWS / GCP cloud services',
    ],
  },
  {
    id: 4,
    title: 'Product Design Intern',
    department: 'Design',
    location: 'Remote',
    type: 'Internship',
    description:
      'Collaborate with engineering and product to shape the UI/UX of our platform — from wireframes to high-fidelity prototypes and design-system components.',
    requirements: [
      'Currently pursuing a degree in Design, HCI, or related',
      'Portfolio demonstrating strong visual & interaction design',
      'Familiarity with Figma and prototyping tools',
    ],
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

/* ──────────────────────────────────────────────
   JOB CARD
   ────────────────────────────────────────────── */
function JobCard({ job, isDark, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      layout
      className="group relative"
      style={{ zIndex: expanded ? 10 : 1 }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: 'pointer',
          borderRadius: '20px',
          padding: '2px',
          background: expanded
            ? isDark
              ? 'linear-gradient(135deg, rgba(204,255,0,0.4), rgba(204,255,0,0.05))'
              : 'linear-gradient(135deg, rgba(16,185,129,0.4), rgba(16,185,129,0.05))'
            : 'transparent',
          transition: 'background 0.4s ease',
        }}
      >
        <div
          style={{
            borderRadius: '18px',
            padding: '28px 32px',
            background: isDark
              ? expanded
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(255,255,255,0.02)'
              : expanded
                ? 'rgba(255,255,255,0.95)'
                : 'rgba(255,255,255,0.7)',
            border: isDark
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid rgba(0,0,0,0.06)',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: expanded
              ? isDark
                ? '0 20px 60px rgba(204,255,0,0.06), 0 0 0 1px rgba(204,255,0,0.08)'
                : '0 20px 60px rgba(16,185,129,0.08), 0 0 0 1px rgba(16,185,129,0.1)'
              : 'none',
          }}
        >
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            {/* Left: Number badge + Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
              {/* Index Badge */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  flexShrink: 0,
                  background: isDark ? 'rgba(204,255,0,0.1)' : 'rgba(16,185,129,0.1)',
                  color: isDark ? '#CCFF00' : '#059669',
                  transition: 'all 0.3s ease',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Title + Meta */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                    fontWeight: 700,
                    marginBottom: '6px',
                    color: isDark ? '#ffffff' : '#1e1b4b',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {job.title}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    color: isDark ? 'rgba(255,255,255,0.45)' : '#6b7280',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Building2 size={13} />
                    {job.department}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={13} />
                    {job.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={13} />
                    {job.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Expand arrow */}
            <motion.div
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                color: isDark ? 'rgba(255,255,255,0.5)' : '#6b7280',
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
            >
              <ChevronRight size={18} />
            </motion.div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  style={{
                    paddingTop: '24px',
                    marginTop: '24px',
                    borderTop: isDark
                      ? '1px solid rgba(255,255,255,0.06)'
                      : '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.75,
                      marginBottom: '20px',
                      color: isDark ? 'rgba(255,255,255,0.6)' : '#4b5563',
                    }}
                  >
                    {job.description}
                  </p>

                  <h4
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                      color: isDark ? '#CCFF00' : '#059669',
                    }}
                  >
                    Requirements
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0' }}>
                    {job.requirements.map((req, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '0.85rem',
                          lineHeight: 1.6,
                          marginBottom: '8px',
                          color: isDark ? 'rgba(255,255,255,0.5)' : '#4b5563',
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: isDark ? '#CCFF00' : '#059669',
                            marginTop: '8px',
                            flexShrink: 0,
                          }}
                        />
                        {req}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="mailto:secen.semiconductor@gmail.com?subject=Application: "
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 28px',
                      borderRadius: '12px',
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      color: isDark ? '#030303' : '#ffffff',
                      background: isDark ? '#CCFF00' : '#059669',
                      transition: 'all 0.3s ease',
                      boxShadow: isDark
                        ? '0 8px 24px rgba(204,255,0,0.2)'
                        : '0 8px 24px rgba(16,185,129,0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = isDark
                        ? '0 12px 32px rgba(204,255,0,0.3)'
                        : '0 12px 32px rgba(16,185,129,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = isDark
                        ? '0 8px 24px rgba(204,255,0,0.2)'
                        : '0 8px 24px rgba(16,185,129,0.2)';
                    }}
                  >
                    Apply Now
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   OPEN POSITIONS SECTION
   ────────────────────────────────────────────── */
export default function OpenPositions() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="open-positions"
      ref={sectionRef}
      style={{
        paddingTop: '80px',
        paddingBottom: '100px',
        paddingLeft: 'clamp(24px, 5vw, 96px)',
        paddingRight: 'clamp(24px, 5vw, 96px)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          style={{ marginBottom: '56px' }}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '12px',
              color: isDark ? '#ffffff' : '#1e1b4b',
            }}
          >
            Open Positions
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: '1rem',
              color: isDark ? 'rgba(255,255,255,0.45)' : '#6b7280',
            }}
          >
            Browse our current openings and apply today.
          </motion.p>
        </motion.div>

        {/* Job Cards */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {openPositions.map((job, i) => (
            <JobCard key={job.id} job={job} isDark={isDark} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
