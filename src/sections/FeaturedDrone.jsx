import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, Clock, Navigation, Battery, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';


const products = [
  {
    id: 'quadcopter-q1',
    name: 'SecenAI Quadcopter',
    tagline: 'Versatile 4-Rotor Platform',
    description:
      'A highly agile 4-rotor autonomous drone built for precision agriculture, infrastructure inspection, surveillance, and emergency response.',
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=900&q=80',
    badge: 'QUADCOPTER',
    specs: [
      { label: 'Payload', value: '4.5 kg', icon: Package },
      { label: 'Endurance', value: '30-35 min', icon: Clock },
      { label: 'Range', value: '20 km', icon: Navigation },
      { label: 'Battery', value: '10,000 mAh', icon: Battery },
    ],
  },
  {
    id: 'hexacopter-h1',
    name: 'SecenAI Hexacopter',
    tagline: 'Heavy-Lift 6-Rotor Platform',
    description:
      'A robust 6-rotor heavy-lift drone engineered for demanding missions requiring superior payload capacity and rock-solid stability.',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=900&q=80',
    badge: 'HEXACOPTER',
    specs: [
      { label: 'Payload', value: '12 kg', icon: Package },
      { label: 'Endurance', value: '20-25 min', icon: Clock },
      { label: 'Range', value: '30 km', icon: Navigation },
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

const statVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
};

function ProductCard({ product, isDark, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={cardRef}
      className={`relative group rounded-2xl overflow-hidden ${
        isDark
          ? 'bg-dark-800 border border-white/5'
          : 'bg-white border border-gray-200 shadow-lg'
      }`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      custom={index * 0.2}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-[260px] sm:h-[300px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-t from-dark-800 via-dark-800/30 to-transparent'
              : 'bg-gradient-to-t from-white via-white/20 to-transparent'
          }`}
        />

        {/* Badge */}
        <span
          className={`absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.15em] ${
            isDark
              ? 'bg-neon/20 text-neon border border-neon/30 backdrop-blur-sm'
              : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
          }`}
        >
          {product.badge}
        </span>

        {/* Floating Specs */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          {product.specs.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.label}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 backdrop-blur-md ${
                  isDark
                    ? 'bg-dark-950/70 border border-white/10'
                    : 'bg-white/80 border border-gray-200 shadow-sm'
                }`}
                variants={statVariant}
                custom={0.3 + i * 0.1}
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
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <p
          className={`text-[10px] font-medium tracking-[0.2em] mb-1.5 ${
            isDark ? 'text-neon' : 'text-emerald-600'
          }`}
        >
          {product.tagline.toUpperCase()}
        </p>

        <h3
          className={`font-[Outfit] text-xl sm:text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-[#1e1b4b]'
          }`}
        >
          {product.name}
        </h3>

        <p
          className={`text-sm leading-relaxed mb-5 ${
            isDark ? 'text-white/45' : 'text-gray-500'
          }`}
        >
          {product.description}
        </p>

        <a
          href="/products"
          className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/link ${
            isDark
              ? 'text-neon hover:text-neon-dim'
              : 'text-emerald-600 hover:text-emerald-700'
          }`}
        >
          View Details
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}

export default function FeaturedDrone() {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-16 md:py-24 ${
        isDark ? 'bg-dark-900' : 'bg-[#f5f5f7]'
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
            className={`mb-4 inline-block text-xs font-medium tracking-[0.3em] ${
              isDark ? 'text-neon' : 'text-emerald-600'
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
            className={`mx-auto mt-4 max-w-xl text-sm sm:text-base ${
              isDark ? 'text-white/40' : 'text-gray-500'
            }`}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0.2}
          >
            Two purpose-built autonomous platforms — a precision Quadcopter
            for agile operations and a heavy-lift Hexacopter for demanding missions.
          </motion.p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isDark={isDark}
              index={index}
            />
          ))}
        </div>

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
            className={`inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition-all duration-300 ${
              isDark
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
