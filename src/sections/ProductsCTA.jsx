import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MonitorSmartphone } from 'lucide-react';

export default function ProductsCTA({ isDark }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-20 md:py-28 ${
        isDark
          ? 'bg-gradient-to-br from-dark-800 via-dark-900 to-dark-950'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      {/* Glow */}
      {isDark && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/8 blur-[150px]" />
      )}
      {!isDark && (
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 60%)' }}
        />
      )}

      <div className={`grid-bg pointer-events-none absolute inset-0 ${isDark ? 'opacity-40' : 'opacity-15'}`} />

      <motion.div
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Badge */}
        <span
          className={`mb-8 inline-block rounded-full border px-4 py-1.5 text-xs font-medium tracking-[0.2em] ${
            isDark
              ? 'border-neon/30 bg-neon/5 text-neon'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700'
          }`}
        >
          READY TO DEPLOY
        </span>

        {/* Heading */}
        <h2
          className={`mb-6 font-[Outfit] text-4xl font-bold leading-tight md:text-6xl ${
            isDark ? 'text-white' : 'text-[#1e1b4b]'
          }`}
        >
          Find Your Perfect
          <br />
          <span className={isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}>
            Drone Platform
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className={`mx-auto mb-10 max-w-2xl text-lg leading-relaxed ${
            isDark ? 'text-white/40' : 'text-gray-500'
          }`}
        >
          Talk to our solutions team to find the right configuration —
          Quadcopter or Hexacopter — for your specific industry, scale,
          and mission requirements.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.a
            href="/contact"
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-4 font-semibold transition-all ${
              isDark
                ? 'bg-neon text-dark-950 hover:shadow-xl hover:shadow-neon/30'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Request a Demo
            <ArrowRight className="h-4 w-4" />
          </motion.a>

          <motion.a
            href="/contact"
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-8 py-4 transition-all ${
              isDark
                ? 'border-white/20 text-white hover:border-white/40 hover:bg-white/5'
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <MonitorSmartphone className="h-4 w-4" />
            Contact Sales
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
