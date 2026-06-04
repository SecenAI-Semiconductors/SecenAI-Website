import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════
   COMPARISON DATA — 2 models only
   ═══════════════════════════════════════════ */

const comparisonSpecs = [
  { label: 'Configuration', key: 'config' },
  { label: 'Payload Capacity', key: 'payload' },
  { label: 'Flight Endurance', key: 'endurance' },

  { label: 'Battery', key: 'battery' },
  { label: 'Camera System', key: 'camera' },
  { label: 'Obstacle Avoidance', key: 'obstacle' },
  { label: 'Weather Rating', key: 'weather' },
  { label: 'Motor Redundancy', key: 'redundancy' },
  { label: 'Price Tier', key: 'price' },
];

const comparisonData = {
  'SecenAI Quadcopter': {
    config: '4-Rotor',
    payload: '4.5 kg',
    endurance: '30-35 min',

    battery: '10,000 mAh',
    camera: 'Modular payload bay — swappable sensors',
    obstacle: '360° LiDAR',
    weather: 'IP54',
    redundancy: 'No — requires all 4 motors',
    price: 'Professional',
  },
  'SecenAI Hexacopter': {
    config: '6-Rotor',
    payload: '12 kg',
    endurance: '20-25 min',

    battery: '16,000 mAh',
    camera: 'Dual-gimbal — supports heavy sensors & LiDAR',
    obstacle: '360° LiDAR + downward sonar',
    weather: 'IP55',
    redundancy: 'Yes — safe single-motor failure',
    price: 'Enterprise',
  },
};

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
   MAIN SECTION
   ═══════════════════════════════════════════ */

export default function ComparisonTable({ isDark }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const modelNames = Object.keys(comparisonData);

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className={`relative py-20 md:py-28 overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-[#f5f5f7]'}`}
    >
      <div className={`absolute inset-0 grid-bg ${isDark ? 'opacity-20' : 'opacity-10'}`} />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.h2
            className="font-[Outfit] text-4xl font-bold md:text-6xl"
            variants={fadeUp}
          >
            <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>Compare </span>
            <span className={isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}>Models</span>
          </motion.h2>

          <motion.p
            className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-500'}`}
            variants={fadeUp}
          >
            Side-by-side specifications to help you choose the right
            platform for your mission requirements.
          </motion.p>

          <motion.div
            className={`mx-auto mt-8 h-0.5 w-24 rounded-full ${isDark ? 'bg-neon' : 'bg-emerald-500'}`}
            variants={fadeUp}
          />
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <div
            className={`rounded-2xl overflow-hidden ${isDark
                ? 'border border-white/5'
                : 'border border-gray-200 shadow-lg'
              }`}
          >
            <table className="w-full min-w-[500px]">
              {/* Table Head */}
              <thead>
                <tr className={isDark ? 'bg-dark-800' : 'bg-gray-50'}>
                  <th
                    className={`text-left py-5 px-6 text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-white/30' : 'text-gray-400'
                      }`}
                  >
                    Specification
                  </th>
                  {modelNames.map((name) => (
                    <th
                      key={name}
                      className={`text-center py-5 px-6 font-[Outfit] text-sm font-semibold ${isDark ? 'text-white' : 'text-[#1e1b4b]'
                        }`}
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {comparisonSpecs.map((spec, rowIdx) => (
                  <tr
                    key={spec.key}
                    className={`transition-colors ${isDark
                        ? `${rowIdx % 2 === 0 ? 'bg-dark-950/50' : 'bg-dark-900/50'} hover:bg-white/[0.02]`
                        : `${rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-emerald-50/30`
                      }`}
                  >
                    <td
                      className={`py-4 px-6 text-sm font-medium ${isDark ? 'text-white/60' : 'text-gray-600'
                        }`}
                    >
                      {spec.label}
                    </td>
                    {modelNames.map((name) => (
                      <td
                        key={name}
                        className={`py-4 px-6 text-center text-sm ${isDark ? 'text-white/50' : 'text-gray-500'
                          }`}
                      >
                        {comparisonData[name][spec.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Table Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`text-center text-xs mt-6 ${isDark ? 'text-white/20' : 'text-gray-400'}`}
        >
          * Specifications may vary based on configuration and environmental conditions. Contact sales for detailed specs.
        </motion.p>
      </div>
    </section>
  );
}
