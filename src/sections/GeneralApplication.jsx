import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Mail } from 'lucide-react';

export default function GeneralApplication() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      style={{
        paddingTop: '60px',
        paddingBottom: '80px',
        paddingLeft: 'clamp(24px, 5vw, 96px)',
        paddingRight: 'clamp(24px, 5vw, 96px)',
        borderTop: isDark
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(0,0,0,0.08)',
        borderBottom: isDark
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(0,0,0,0.08)',
        background: isDark ? 'transparent' : 'rgba(0,0,0,0.02)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '1100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 700,
            color: isDark ? '#ffffff' : '#0d0d0d',
            marginBottom: '32px',
            letterSpacing: '-0.02em',
          }}
        >
          Don't see a role that fits just yet?
        </h2>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
          <div
            style={{
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Mail
              size={36}
              strokeWidth={1.5}
              style={{ color: isDark ? '#a1a1aa' : '#52525b' }}
            />
          </div>
          <div style={{ paddingTop: '2px' }}>
            <p
              style={{
                fontSize: '1.15rem',
                lineHeight: 1.6,
                color: isDark ? 'rgba(255,255,255,0.75)' : '#4b5563',
                margin: 0,
                maxWidth: '900px',
                fontWeight: 400,
              }}
            >
              We're always on the lookout for passionate minds. Share your latest CV and areas of interest with us at
              <br />
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=careers@secenai.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: isDark ? '#CCFF00' : '#3f6f35',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '1.2rem',
                  display: 'inline-block',
                  marginTop: '8px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = 'underline')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = 'none')
                }
              >
                careers@secenai.com
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
