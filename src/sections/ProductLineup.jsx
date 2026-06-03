import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Package, Clock, Navigation, Battery,
  ArrowRight, CheckCircle2,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   PRODUCT DATA — 2 versatile drone platforms
   ═══════════════════════════════════════════ */

const products = [
  {
    id: 'quadcopter-q1',
    name: 'SecenAI Quadcopter',
    tagline: 'Versatile 4-Rotor Platform',
    description:
      'A highly agile and precise 4-rotor autonomous drone built for versatility. From precision agriculture and infrastructure inspection to surveillance, surveying, and emergency response — the Quadcopter adapts to any mission profile with rapid deployment and exceptional maneuverability.',
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=900&q=80',
    badge: 'QUADCOPTER',
    specs: [
      { label: 'Payload', value: '4.5 kg', icon: Package },
      { label: 'Endurance', value: '90 min', icon: Clock },
      { label: 'Range', value: '35 km', icon: Navigation },
      { label: 'Battery', value: '10,000 mAh', icon: Battery },
    ],
    useCases: ['Agriculture', 'Inspection', 'Surveillance', 'Surveying', 'Mapping', 'Emergency Response'],
    highlights: [
      'Lightweight & highly maneuverable airframe',
      'Modular payload bay — swap sensors in seconds',
      'RTK GPS for centimeter-level positioning',
      'IP54 all-weather flight capability',
      'Automated return-to-home & failsafe protocols',
      'Rapid field deployment in under 5 minutes',
    ],
  },
  {
    id: 'hexacopter-h1',
    name: 'SecenAI Hexacopter',
    tagline: 'Heavy-Lift 6-Rotor Platform',
    description:
      'A robust 6-rotor heavy-lift drone engineered for demanding missions requiring superior payload capacity and rock-solid stability. Whether carrying advanced LiDAR sensors, multispectral cameras, spray systems, or delivery payloads — the Hexacopter delivers unmatched performance in any industry.',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=900&q=80',
    badge: 'HEXACOPTER',
    specs: [
      { label: 'Payload', value: '12 kg', icon: Package },
      { label: 'Endurance', value: '120 min', icon: Clock },
      { label: 'Range', value: '50 km', icon: Navigation },
      { label: 'Battery', value: '16,000 mAh', icon: Battery },
    ],
    useCases: ['Heavy Payload', 'Crop Spraying', 'LiDAR Mapping', 'Delivery', 'Industrial', 'Defense'],
    highlights: [
      'Heavy-lift capacity up to 12 kg payload',
      'Redundant 6-motor design — safe single-motor failure',
      'Ultra-stable platform for precision sensor work',
      'Dual-battery hot-swap for extended missions',
      'IP55 weather resistance rating',
      'Enterprise-grade encrypted communications',
    ],
  },
];

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════
   PRODUCT CARD
   ═══════════════════════════════════════════ */

function ProductCard({ product, isDark, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-8 lg:gap-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    >
      {/* Image Side */}
      <div className="relative lg:w-1/2 group">
        <div
          className={`overflow-hidden rounded-2xl ${
            isDark ? '' : 'shadow-xl'
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[350px] lg:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div
            className={`absolute inset-0 rounded-2xl ${
              isDark
                ? 'bg-gradient-to-t from-dark-950/60 via-transparent to-transparent'
                : 'bg-gradient-to-t from-black/20 via-transparent to-transparent'
            }`}
          />
        </div>

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

        {/* Floating Spec Cards */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {product.specs.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.label}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 backdrop-blur-md ${
                  isDark
                    ? 'bg-dark-950/70 border border-white/10'
                    : 'bg-white/80 border border-gray-200 shadow-sm'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isDark ? 'text-neon' : 'text-emerald-600'}`} />
                <div>
                  <p className={`text-[9px] uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                    {spec.label}
                  </p>
                  <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {spec.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Side */}
      <div className="lg:w-1/2 flex flex-col justify-center">
        <p className={`text-xs font-medium tracking-[0.2em] mb-3 ${isDark ? 'text-neon' : 'text-emerald-600'}`}>
          {product.tagline.toUpperCase()}
        </p>

        <h3 className={`font-[Outfit] text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
          {product.name}
        </h3>

        <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
          {product.description}
        </p>

        {/* Use Case Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.useCases.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                isDark
                  ? 'bg-white/5 text-white/60 border border-white/10'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <div className="space-y-3 mb-8">
          {product.highlights.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${isDark ? 'text-neon' : 'text-emerald-500'}`} />
              <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <a
            href="/contact"
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
              isDark
                ? 'bg-neon text-dark-950 hover:shadow-lg hover:shadow-neon/20'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20'
            }`}
          >
            Get Quote
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="#comparison"
            className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm transition-all duration-300 ${
              isDark
                ? 'border-white/15 text-white/70 hover:border-white/30 hover:bg-white/5'
                : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            Compare Specs
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════ */

export default function ProductLineup({ isDark }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      id="product-lineup"
      className={`relative py-20 md:py-28 ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'}`}
    >
      {/* Header */}
      <motion.div
        className="mx-auto mb-16 max-w-7xl px-6 text-center"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={stagger}
      >
        <motion.h2
          className="font-[Outfit] text-4xl font-bold md:text-6xl"
          variants={fadeUp}
        >
          <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>Drone </span>
          <span className={isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}>Product Lineup</span>
        </motion.h2>

        <motion.p
          className={`mx-auto mt-6 max-w-3xl text-lg leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-500'}`}
          variants={fadeUp}
        >
          Two purpose-built autonomous platforms designed for maximum versatility —
          a precision Quadcopter for agile operations and a heavy-lift Hexacopter
          for demanding missions. Both configurable for any industry.
        </motion.p>

        <motion.div
          className={`mx-auto mt-8 h-0.5 w-24 rounded-full ${isDark ? 'bg-neon' : 'bg-emerald-500'}`}
          variants={fadeUp}
        />
      </motion.div>

      {/* Product Cards */}
      <div className="mx-auto max-w-7xl px-6 space-y-20 lg:space-y-28">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} isDark={isDark} index={index} />
        ))}
      </div>
    </section>
  );
}
