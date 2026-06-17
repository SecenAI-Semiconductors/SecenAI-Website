import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ContactForm from '../components/ContactForm';


export default function Contact() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: '140px',
        paddingBottom: '80px',
        paddingLeft: 'clamp(24px, 5vw, 96px)',
        paddingRight: 'clamp(24px, 5vw, 96px)',
        backgroundColor: isDark ? '#030303' : '#f9fafb',
        color: isDark ? '#ffffff' : '#1f2937',
        transition: 'background-color 0.4s ease, color 0.4s ease',
      }}
    >
      {/* Container */}
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>

        {/* 1. Header Section - Left Aligned */}
        <div style={{ position: 'relative', marginBottom: '80px' }}>
          {/* Decorative background orb */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '30%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              height: '250px',
              borderRadius: '9999px',
              filter: 'blur(100px)',
              opacity: 0.2,
              pointerEvents: 'none',
              background: isDark
                ? 'radial-gradient(circle, rgba(204,255,0,0.3) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
            }}
          />

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              color: isDark ? '#ffffff' : '#1e1b4b',
            }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: '1.125rem',
              maxWidth: '36rem',
              color: isDark ? 'rgba(255,255,255,0.6)' : '#6b7280',
            }}
          >
            Have a project in mind? Let's discuss how we can help.
          </motion.p>
        </div>

        {/* 2. Body - Two Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '96px',
            alignItems: 'start',
          }}
        >

          {/* Left Column - Get In Touch Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Get in Touch heading */}
            <div style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: isDark ? '#ffffff' : '#1e1b4b',
                }}
              >
                Get in Touch
              </h2>
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: isDark ? 'rgba(255,255,255,0.5)' : '#6b7280',
                }}
              >
                Fill out the form and our team will get back to you within 24 hours.
              </p>
            </div>

            {/* Headquarters */}
            <div style={{ marginBottom: '40px' }}>
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  marginBottom: '16px',
                  color: isDark ? '#CCFF00' : '#059669',
                }}
              >
                Headquarters
              </h3>
              <div
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  color: isDark ? 'rgba(255,255,255,0.45)' : '#4b5563',
                }}
              >
                <p style={{ fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.02em', color: isDark ? 'rgba(255,255,255,0.85)' : '#1f2937', marginBottom: '4px' }}>
                  SECENAI SEMICONDUCTORS AND TEST SOLUTIONS PRIVATE LIMITED.
                </p>
                <p>Hatchlab Research Centre, SRM University AP</p>
                <p>Mangalagiri, Mangalagiri, Guntur- 522503, Andhra Pradesh</p>
              </div>
            </div>

            {/* Email */}
            <div>
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: isDark ? '#CCFF00' : '#059669',
                }}
              >
                Email
              </h3>
              <a
                href="mailto:secen.semiconductor@gmail.com"
                style={{
                  fontSize: '0.9rem',
                  color: isDark ? 'rgba(255,255,255,0.6)' : '#4b5563',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = isDark ? '#CCFF00' : '#059669')}
                onMouseLeave={(e) => (e.target.style.color = isDark ? 'rgba(255,255,255,0.6)' : '#4b5563')}
              >
                secen.semiconductor@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </div>
  );
}