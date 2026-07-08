import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Package, Clock, Navigation, Battery, ArrowRight, Plane } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import quadcopterImg from '../assets/quadcopter-prototype.png';

const SLIDE_INTERVAL = 7000; // 7 seconds per slide

const products = [
  {
    id: 'quadcopter-q1',
    name: 'SecenAI Quadcopter',
    tagline: 'Versatile 4-Rotor Platform',
    description:
      'A highly agile 4-rotor autonomous drone built for precision agriculture, infrastructure inspection, surveillance, and emergency response.',
    image: quadcopterImg,
    badge: 'QUADCOPTER',
    specs: [
      { label: 'Payload', value: '4.5 kg', icon: Package },
      { label: 'Endurance', value: '30-35 min', icon: Clock },
      { label: 'Battery', value: '10,000 mAh', icon: Battery },
    ],
  },
  {
    id: 'hexacopter-h1',
    name: 'SecenAI Hexacopter',
    tagline: 'Heavy-Lift 6-Rotor Platform',
    description:
      'A robust 6-rotor heavy-lift drone engineered for demanding missions requiring superior payload capacity and rock-solid stability.',
    image: null,
    badge: 'HEXACOPTER',
    specs: [
      { label: 'Payload', value: '12 kg', icon: Package },
      { label: 'Endurance', value: '20-25 min', icon: Clock },
      { label: 'Battery', value: '16,000 mAh', icon: Battery },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function FeaturedDrone() {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [[activeIndex, direction], setActiveIndex] = useState([0, 1]);
  const [progress, setProgress] = useState(0);

  const goToSlide = useCallback((index) => {
    setActiveIndex(([prev]) => [index, index > prev ? 1 : -1]);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex(([prev]) => [(prev + 1) % products.length, 1]);
    setProgress(0);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      nextSlide();
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [isInView, nextSlide]);

  // Progress bar animation
  useEffect(() => {
    if (!isInView) return;

    setProgress(0);
    const startTime = Date.now();

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(elapsed / SLIDE_INTERVAL, 1);
      setProgress(pct);
      if (pct < 1) {
        rafId = requestAnimationFrame(frame);
      }
    };

    let rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [activeIndex, isInView]);

  const product = products[activeIndex];

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-16 md:py-24 ${isDark ? 'bg-dark-900' : 'bg-[#f5f5f7]'
        }`}
    >
      {/* Grid Background Overlay */}
      <div className="grid-bg absolute inset-0" />

      {/* Ambient Glow */}
      {isDark && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/5 blur-[120px]" />
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <motion.span
            className={`mb-4 inline-block text-xs font-medium tracking-[0.3em] ${isDark ? 'text-neon' : 'text-emerald-600'
              }`}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0}
          >
            OUR PRODUCTS
          </motion.span>

          <motion.h2
            className="font-[Outfit] text-3xl font-bold sm:text-4xl md:text-5xl"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0.1}
          >
            <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>Drone </span>
            <span className={isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}>
              Product Lineup
            </span>
          </motion.h2>

          <motion.p
            className={`mx-auto mt-4 max-w-xl text-sm sm:text-base ${isDark ? 'text-white/40' : 'text-gray-500'
              }`}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0.2}
          >
            Two purpose-built autonomous platforms: a precision Quadcopter
            for agile operations and a heavy-lift Hexacopter for demanding missions.
          </motion.p>
        </div>

        {/* Slideshow */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0.4}
        >
          <div className="relative mx-auto max-w-3xl">
            {/* Slide Container */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={product.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`relative group rounded-2xl overflow-hidden ${isDark
                    ? 'bg-dark-800 border border-white/5'
                    : 'bg-white border border-gray-200 shadow-lg'
                    }`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-[300px] sm:h-[380px]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.5] ${product.id === 'quadcopter-q1' ? 'scale-[1.4]' : ''
                          }`}
                      />
                    ) : (
                      <div className={`w-full h-full flex flex-col items-center justify-center ${isDark ? 'bg-dark-800' : 'bg-gray-100'}`}>
                        <Plane className={`h-16 w-16 mb-3 ${isDark ? 'text-white/15' : 'text-gray-300'}`} />
                        <span className={`text-sm font-medium tracking-wider ${isDark ? 'text-white/20' : 'text-gray-400'}`}>Image Coming Soon</span>
                      </div>
                    )}
                    {/* Overlay gradient — skip for quadcopter since it has white bg */}
                    {product.image && product.id !== 'quadcopter-q1' && (
                      <div
                        className={`absolute inset-0 ${isDark
                          ? 'bg-gradient-to-t from-dark-800 via-dark-800/30 to-transparent'
                          : 'bg-gradient-to-t from-white via-white/20 to-transparent'
                          }`}
                      />
                    )}

                    {/* Badge */}
                    <span
                      className={`absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.15em] ${isDark
                        ? 'bg-dark-950/80 text-neon border border-neon/30 backdrop-blur-sm'
                        : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        }`}
                    >
                      {product.badge}
                    </span>

                    {/* Floating Specs */}
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                      {product.specs.map((spec) => {
                        const Icon = spec.icon;
                        return (
                          <div
                            key={spec.label}
                            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 backdrop-blur-md ${isDark
                              ? 'bg-dark-950/70 border border-white/10'
                              : 'bg-white/80 border border-gray-200 shadow-sm'
                              }`}
                          >
                            <Icon className={`h-3 w-3 ${isDark ? 'text-neon' : 'text-emerald-600'}`} />
                            <div>
                              <p className={`text-[8px] uppercase tracking-wider leading-none ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                                {spec.label}
                              </p>
                              <p className={`text-[11px] font-semibold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {spec.value}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <p
                      className={`text-[10px] font-medium tracking-[0.2em] mb-1.5 ${isDark ? 'text-neon' : 'text-emerald-600'
                        }`}
                    >
                      {product.tagline.toUpperCase()}
                    </p>

                    <h3
                      className={`font-[Outfit] text-xl sm:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1e1b4b]'
                        }`}
                    >
                      {product.name}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-white/45' : 'text-gray-500'
                        }`}
                    >
                      {product.description}
                    </p>

                    <a
                      href="/products"
                      className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/link ${isDark
                        ? 'text-neon hover:text-neon-dim'
                        : 'text-emerald-600 hover:text-emerald-700'
                        }`}
                    >
                      View Details
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            <div className="mt-8 flex items-center justify-center gap-3">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => goToSlide(i)}
                  className="relative flex items-center justify-center"
                  aria-label={`View ${p.name}`}
                >
                  {/* Background dot */}
                  <span
                    className={`block h-2.5 w-2.5 rounded-full transition-all duration-300 ${i === activeIndex
                      ? isDark
                        ? 'bg-neon scale-125'
                        : 'bg-emerald-600 scale-125'
                      : isDark
                        ? 'bg-white/20 hover:bg-white/40'
                        : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                </button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className={`mt-4 mx-auto max-w-xs h-0.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'
              }`}>
              <div
                className={`h-full rounded-full transition-none ${isDark ? 'bg-neon' : 'bg-emerald-500'
                  }`}
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* CTA — View Full Lineup */}
        <motion.div
          className="mt-12 text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0.8}
        >
          <a
            href="/products"
            className={`inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition-all duration-300 ${isDark
              ? 'bg-neon text-dark-950 hover:shadow-[0_0_30px_rgba(204,255,0,0.3)]'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]'
              }`}
          >
            Explore Full Product Lineup
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
