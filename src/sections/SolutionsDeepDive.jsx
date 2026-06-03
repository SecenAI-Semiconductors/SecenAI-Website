import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Sprout, Factory, Route,
  Eye, BrainCircuit, Wifi, Droplets,
  BarChart3, Thermometer, Camera, Crosshair,
  Layers, Shield, Navigation, Zap,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   SOLUTION DATA
   ═══════════════════════════════════════════ */

const solutions = [
  {
    title: 'Smart Agriculture',
    icon: Sprout,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&q=80',
    subtitle: 'Data-driven precision farming powered by aerial intelligence',
    description:
      'Transform agricultural operations with AI-driven crop monitoring, disease detection, and yield optimization. Combine drone imagery with IoT soil sensor data for comprehensive farm intelligence.',
    capabilities: [
      { icon: Eye, text: 'NDVI vegetation index mapping & crop health scoring' },
      { icon: BrainCircuit, text: 'AI-powered disease & pest detection from aerial imagery' },
      { icon: Droplets, text: 'Precision variable-rate spraying & seeding automation' },
      { icon: Wifi, text: 'IoT soil moisture, pH, temperature sensor integration' },
      { icon: BarChart3, text: 'Yield prediction models & harvest planning analytics' },
      { icon: Thermometer, text: 'Thermal stress detection & irrigation optimization' },
    ],
    stats: [
      { value: '23%', label: 'Avg. Yield Increase' },
      { value: '500+', label: 'Acres Per Flight' },
      { value: '60%', label: 'Water Savings' },
    ],
  },
  {
    title: 'Infrastructure Inspection',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=80',
    subtitle: 'Automated AI-powered inspection for critical infrastructure',
    description:
      'Automate inspection of buildings, bridges, power lines, roads, and solar farms. AI-powered defect detection analyzes high-resolution aerial imagery to identify structural issues before they become critical.',
    capabilities: [
      { icon: Camera, text: 'High-resolution 4K aerial imagery with zoom capabilities' },
      { icon: Crosshair, text: 'AI defect detection — cracks, corrosion, deformation' },
      { icon: Thermometer, text: 'Thermal imaging for electrical & insulation faults' },
      { icon: Layers, text: '3D photogrammetric modeling & digital twin creation' },
      { icon: Shield, text: 'Automated compliance report generation' },
      { icon: BarChart3, text: 'Historical damage progression tracking & prediction' },
    ],
    stats: [
      { value: '80%', label: 'Inspection Time Saved' },
      { value: '99.2%', label: 'Defect Detection Rate' },
      { value: '0', label: 'Worker Safety Incidents' },
    ],
  },
  {
    title: 'Custom Flight Controller',
    icon: Route,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80',
    subtitle: 'Autonomous mission planning & real-time flight management',
    description:
      'Create, manage, and execute autonomous drone missions using our custom flight controller. Features waypoint planning, route optimization, live telemetry tracking, and real-time mission monitoring with automated failsafe protocols.',
    capabilities: [
      { icon: Navigation, text: 'Drag-and-drop waypoint mission planning interface' },
      { icon: Zap, text: 'AI-optimized flight routes for battery efficiency' },
      { icon: Wifi, text: 'Real-time telemetry — altitude, speed, battery, GPS' },
      { icon: Shield, text: 'Geofencing, no-fly zones, and automated RTH failsafes' },
      { icon: Layers, text: 'Multi-drone fleet coordination & swarm management' },
      { icon: BarChart3, text: 'Post-flight analytics & mission performance reports' },
    ],
    stats: [
      { value: '40%', label: 'Route Efficiency Gain' },
      { value: '24/7', label: 'Mission Monitoring' },
      { value: '50+', label: 'Fleet Capacity' },
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
   SOLUTION PANEL
   ═══════════════════════════════════════════ */

function SolutionPanel({ solution, isDark, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isEven = index % 2 === 0;
  const Icon = solution.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-3xl overflow-hidden ${
        isDark
          ? 'bg-dark-800/50 border border-white/5'
          : 'bg-white border border-gray-200 shadow-lg'
      }`}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        {/* Image */}
        <div className="lg:w-2/5 h-[280px] lg:h-auto relative overflow-hidden">
          <img
            src={solution.image}
            alt={solution.title}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 ${
              isDark
                ? 'bg-gradient-to-r from-dark-800/80 via-dark-800/40 to-transparent'
                : 'bg-gradient-to-r from-white/50 via-transparent to-transparent'
            }`}
          />

          {/* Stats overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex gap-6">
            {solution.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className={`font-[Outfit] text-2xl font-bold ${isDark ? 'text-neon' : 'text-white'}`}>
                  {stat.value}
                </p>
                <p className={`text-[10px] tracking-wider uppercase ${isDark ? 'text-white/50' : 'text-white/80'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-3/5 p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                isDark ? 'bg-neon/10' : 'bg-emerald-50'
              }`}
            >
              <Icon className={`h-5 w-5 ${isDark ? 'text-neon' : 'text-emerald-600'}`} />
            </div>
            <h3 className={`font-[Outfit] text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
              {solution.title}
            </h3>
          </div>

          <p className={`text-xs font-medium tracking-[0.15em] uppercase mb-4 ${isDark ? 'text-neon/70' : 'text-emerald-600'}`}>
            {solution.subtitle}
          </p>

          <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
            {solution.description}
          </p>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {solution.capabilities.map((cap) => {
              const CapIcon = cap.icon;
              return (
                <div
                  key={cap.text}
                  className={`flex items-start gap-3 rounded-xl p-3 transition-colors ${
                    isDark
                      ? 'bg-white/[0.02] hover:bg-white/[0.05]'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <CapIcon className={`h-4 w-4 mt-0.5 shrink-0 ${isDark ? 'text-neon/70' : 'text-emerald-500'}`} />
                  <span className={`text-xs leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    {cap.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════ */

export default function SolutionsDeepDive({ isDark }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 md:py-28 overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-[#f5f5f7]'}`}
    >
      <div className={`absolute inset-0 grid-bg ${isDark ? 'opacity-30' : 'opacity-15'}`} />

      {isDark && (
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-neon/3 blur-[160px]" />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.h2
            className="font-[Outfit] text-4xl font-bold md:text-6xl"
            variants={fadeUp}
          >
            <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>Industry </span>
            <span className={isDark ? 'text-gradient-neon' : 'text-gradient-emerald'}>Solutions</span>
          </motion.h2>

          <motion.p
            className={`mx-auto mt-6 max-w-3xl text-lg leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-500'}`}
            variants={fadeUp}
          >
            Both drone platforms can be deployed across these specialized solutions —
            powered by AI analytics, IoT integration, and real-time intelligence.
          </motion.p>

          <motion.div
            className={`mx-auto mt-8 h-0.5 w-24 rounded-full ${isDark ? 'bg-neon' : 'bg-emerald-500'}`}
            variants={fadeUp}
          />
        </motion.div>

        {/* Solution Panels */}
        <div className="space-y-10">
          {solutions.map((solution, index) => (
            <SolutionPanel key={solution.title} solution={solution} isDark={isDark} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
