import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ProductsHero({ isDark }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] overflow-hidden flex items-center justify-center"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1920&q=80"
          alt="SecenAI Products"
          className="w-full h-[120%] object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div
        className={`absolute inset-0 z-[1] ${
          isDark
            ? 'bg-gradient-to-b from-dark-950/85 via-dark-950/70 to-dark-950'
            : 'bg-gradient-to-b from-white/90 via-white/75 to-white'
        }`}
      />

      {/* Grid */}
      <div className={`absolute inset-0 z-[2] grid-bg ${isDark ? 'opacity-40' : 'opacity-20'}`} />

      {/* Glow */}
      {isDark && (
        <>
          <div className="absolute top-1/3 -right-20 z-[3] h-96 w-96 rounded-full bg-neon/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -left-10 z-[3] h-64 w-64 rounded-full bg-neon/5 blur-[100px] pointer-events-none" />
        </>
      )}
      {!isDark && (
        <div
          className="absolute top-1/3 right-10 z-[3] h-96 w-96 rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 60%)' }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <span
              className={`mb-8 inline-block rounded-full border px-4 py-1.5 mt-20 text-xs tracking-[0.2em] backdrop-blur-sm ${
                isDark
                  ? 'border-white/10 bg-white/5 text-white/60'
                  : 'border-gray-300 bg-white/60 text-gray-500'
              }`}
            >
              PRODUCT ECOSYSTEM
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mb-6 font-[Outfit] text-5xl font-bold leading-tight md:text-7xl lg:text-8xl"
          >
            <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>
              Our{' '}
            </span>
            <span className={isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}>
              Products
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className={`mb-12 max-w-3xl text-lg leading-relaxed md:text-xl ${
              isDark ? 'text-white/60' : 'text-gray-500'
            }`}
          >
            Two versatile autonomous drone platforms — a precision Quadcopter
            and a heavy-lift Hexacopter — engineered to power any mission
            across agriculture, infrastructure, security, and beyond.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#product-lineup"
              className={`group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all duration-300 ${
                isDark
                  ? 'bg-neon text-dark-950 hover:shadow-xl hover:shadow-neon/30'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30'
              }`}
            >
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#comparison"
              className={`group inline-flex items-center gap-2 rounded-full border px-8 py-4 text-base transition-all duration-300 ${
                isDark
                  ? 'border-white/20 text-white hover:bg-white/5'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
              }`}
            >
              Compare Models
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className={`text-xs uppercase tracking-[0.2em] ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className={isDark ? 'text-white/30' : 'text-gray-400'} />
        </motion.div>
      </motion.div>
    </section>
  );
}
