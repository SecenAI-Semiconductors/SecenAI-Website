import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, ShieldCheck, BrainCircuit, Server } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const features = [
  {
    icon: Cpu,
    title: 'Flight Controller',
    description:
      'High-performance UAV control systems designed for reliable processing, precise navigation, and flexible integration across commercial, research, and specialised drone platforms.',
  },
  {
    icon: BrainCircuit,
    title: 'Ground Control Suite',
    description:
      'A unified software platform for mission planning, real-time UAV monitoring, fleet management, telemetry analysis, and operational control.',
  },
  {
    icon: Server,
    title: 'Our Dashboard',
    description:
      'A unified platform for farm management, drone monitoring, crop insights, market data, and AI-assisted farming.',
  },
  {
    icon: ShieldCheck,
    title: 'Defence Solutions',
    description:
      'Indigenous UAV technologies focused on mission-specific applications, including GPS-denied navigation, Edge AI-based VIO, autonomous operations, and customised defence integration.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Features() {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 md:py-20 ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
        }`}
    >
      {/* Section Header */}
      <motion.div
        className="mx-auto mb-12 max-w-6xl px-6 text-center"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.h2
          className="font-[Outfit] text-4xl font-bold md:text-5xl"
          variants={headingVariants}
        >
          <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>Platform</span>{' '}
          <span className={isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}>Capabilities</span>
        </motion.h2>

        <motion.p
          className={`mx-auto mt-4 max-w-2xl text-base ${isDark ? 'text-white/40' : 'text-gray-500'
            }`}
          variants={headingVariants}
        >
          Advanced AI, drone intelligence, IoT integration, and real-time
          analytics powering smarter decisions across industries.
        </motion.p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              className={`group rounded-2xl p-8 text-center ${isDark
                ? 'glass-card'
                : 'border border-gray-200 shadow-sm hover:shadow-lg hover:border-emerald-200'
                }`}
              style={!isDark ? { backgroundColor: '#ffffff' } : undefined}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              {/* Icon Container */}
              <div className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${isDark
                ? 'bg-neon/10 group-hover:bg-neon/20'
                : 'bg-emerald-50 group-hover:bg-emerald-100'
                }`}>
                <Icon className={`h-6 w-6 ${isDark ? 'text-neon' : 'text-emerald-600'}`} />
              </div>

              {/* Title */}
              <h3 className={`font-[Outfit] text-lg font-semibold ${isDark ? 'text-white' : 'text-[#1e1b4b]'
                }`}>
                {feature.title}
              </h3>

              {/* Description */}
              <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'
                }`}>
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}