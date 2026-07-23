import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sprout, Factory, Building2, Route } from 'lucide-react';

import { useTheme } from '../context/ThemeContext';

const categories = [
  {
    title: 'Smart Agriculture',
    icon: Sprout,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
    description: 'Monitor crop health, detect diseases, analyze vegetation, and integrate IoT soil sensors to enable data-driven precision farming and early intervention.',
  },
  {
    title: 'Infrastructure Inspection',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
    description: 'Automate inspection of buildings, bridges, power lines, roads, and solar farms using AI-powered defect detection and high-resolution aerial imagery.',
  },
  {
    title: 'Custom Flight Controller',
    icon: Route,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
    description:
      'Create, manage, and execute autonomous drone missions using a custom flight controller with waypoint planning, route optimization, telemetry tracking, and real-time mission monitoring.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
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

export default function DroneCategories() {
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
      className={`relative pt-20 pb-16 md:pt-24 md:pb-20 ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
        }`}
    >
      {/* Header */}
      <motion.div
        className="mx-auto mb-14 max-w-7xl px-6 text-center"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.h2
          className="font-[Outfit] text-4xl font-bold md:text-6xl"
          variants={headingVariants}
        >
          <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>Industry</span>{' '}
          <span className={isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}>Solutions</span>
        </motion.h2>

        <motion.p
          className={`mx-auto mt-6 max-w-4xl text-center text-lg leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-500'
            }`}
          variants={headingVariants}
        >
          Empowering agriculture, infrastructure, and smart city operations
          with AI-driven aerial intelligence, real-time monitoring, advanced
          analytics, and actionable insights from drone imagery, telemetry,
          and IoT sensor data.
        </motion.p>

        <motion.div
          className={`mx-auto mt-8 h-0.5 w-24 rounded-full ${isDark ? 'bg-neon' : 'bg-emerald-500'
            }`}
          variants={headingVariants}
        />
      </motion.div>

      {/* Cards Container */}
      <motion.div
        className="
          mx-auto
          mt-8
          mb-0
          flex
          w-full
          max-w-7xl
          flex-wrap
          justify-center
          gap-8
          px-6
        "
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <motion.div
              key={category.title}
              className={`group w-full md:w-[calc(50%_-_1rem)] lg:w-[calc(33.333%_-_1.333rem)] overflow-hidden rounded-2xl ${isDark
                ? 'glass-card'
                : 'border border-gray-200 shadow-sm hover:shadow-lg hover:border-emerald-200'
                }`}
              style={!isDark ? { backgroundColor: '#ffffff' } : undefined}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              {/* Image */}
              <div className="h-56 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${isDark ? 'bg-neon/10' : 'bg-emerald-50'
                  }`}>
                  <Icon className={`h-5 w-5 ${isDark ? 'text-neon' : 'text-emerald-600'}`} />
                </div>

                <h3 className={`font-[Outfit] text-xl font-semibold ${isDark ? 'text-white' : 'text-[#1e1b4b]'
                  }`}>
                  {category.title}
                </h3>

                <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-500'
                  }`}>
                  {category.description}
                </p>

                <a
                  href="/defence/gps-denied-navigation"
                  className={`mt-6 inline-block text-sm font-medium transition-all hover:tracking-wider ${isDark ? 'text-neon' : 'text-emerald-600'
                    }`}
                >
                  Explore Solution →
                </a>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}