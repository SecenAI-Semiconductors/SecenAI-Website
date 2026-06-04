import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BrainCircuit, Cpu, Server, ShieldCheck } from 'lucide-react';

/* ═══════════════════════════════════════════
   TECH DATA
   ═══════════════════════════════════════════ */

const techCapabilities = [
  {
    icon: BrainCircuit,
    title: 'AI-Powered Analytics',
    description:
      'Leverage computer vision and deep learning models to detect crop diseases, structural defects, objects, and environmental changes from aerial imagery. Supports custom model training for specialized detection tasks.',
  },
  {
    icon: Cpu,
    title: 'Real-Time Monitoring',
    description:
      'Track live telemetry, flight paths, video streams, mission status, and drone health metrics through a centralized monitoring dashboard with sub-second latency.',
  },
  {
    icon: Server,
    title: 'IoT Sensor Integration',
    description:
      'Combine drone intelligence with ground-based IoT sensor networks. Soil moisture, temperature, humidity, pH, and environmental data feeds merge into a unified analytics platform.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Platform',
    description:
      'Generate automated reports, interactive maps, alerts, and analytics for agriculture, infrastructure, logistics, and smart city operations with role-based access control.',
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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ═══════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════ */

export default function PlatformTechStack({ isDark }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });


  return (
    <section
      ref={sectionRef}
      className={`relative py-20 md:py-28 ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'}`}
    >
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
            <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>Platform </span>
            <span className={isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}>Technology</span>
          </motion.h2>

          <motion.p
            className={`mx-auto mt-6 max-w-3xl text-lg leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-500'}`}
            variants={fadeUp}
          >
            The intelligent backbone powering every SecenAI product — from
            edge AI inference to enterprise-grade analytics.
          </motion.p>

          <motion.div
            className={`mx-auto mt-8 h-0.5 w-24 rounded-full ${isDark ? 'bg-neon' : 'bg-emerald-500'}`}
            variants={fadeUp}
          />
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {techCapabilities.map((tech) => {
            const Icon = tech.icon;

            return (
              <motion.div
                key={tech.title}
                variants={cardVariants}
                className={`group rounded-2xl p-8 transition-all duration-400 ${isDark
                    ? 'glass-card'
                    : 'bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-emerald-200'
                  }`}
                whileHover={{ y: -4 }}
              >
                {/* Icon + Title */}
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${isDark
                        ? 'bg-neon/10 group-hover:bg-neon/20'
                        : 'bg-emerald-50 group-hover:bg-emerald-100'
                      }`}
                  >
                    <Icon className={`h-6 w-6 ${isDark ? 'text-neon' : 'text-emerald-600'}`} />
                  </div>

                  <div className="flex-1">
                    <h3 className={`font-[Outfit] text-xl font-semibold mb-1 ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
                      {tech.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                      {tech.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
