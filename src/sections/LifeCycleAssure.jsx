import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  MapPin, Microscope, MessageSquare, HeartPulse,
  Truck, Shield, Search, X, CheckCircle2,
  Sprout,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/* ═══════════════════════════════════════════
   LIFE CYCLE DATA — 7 Steps
   ═══════════════════════════════════════════ */

const lifecycleSteps = [
  {
    id: 1,
    title: 'Land Assure',
    shortDesc: 'Comprehensive land assessment',
    icon: MapPin,
    color: '#6366f1',
    description:
      'AI-powered land evaluation and soil analysis using drone imagery, satellite data, and IoT sensors to determine optimal crop suitability, land health, and potential yield capacity.',
    features: [
      'Soil composition & nutrient analysis',
      'Topographic mapping & drainage assessment',
      'Historical yield pattern analysis',
      'Climate zone compatibility scoring',
      'Water table depth evaluation',
      'Land certification & documentation',
      'Geospatial boundary mapping',
    ],
  },
  {
    id: 2,
    title: 'Seed Quality',
    shortDesc: 'AI-powered seed inspection',
    icon: Microscope,
    color: '#8b5cf6',
    description:
      'AI-powered seed inspection and viability prediction using computer vision and machine learning to ensure high germination rates and crop quality.',
    features: [
      'Seed purity and quality testing',
      'Germination rate prediction',
      'Genetic purity verification',
      'Disease resistance assessment',
      'Storage condition monitoring',
      'Batch quality certification',
      'Traceability system integration',
    ],
  },
  {
    id: 3,
    title: 'Advisory',
    shortDesc: 'Real-time expert guidance',
    icon: MessageSquare,
    color: '#a78bfa',
    description:
      'Real-time AI-driven advisory system providing actionable recommendations on crop management, pest control, fertilization schedules, and weather-based planning.',
    features: [
      'Personalized crop management plans',
      'Weather-based activity scheduling',
      'Pest & disease early warning alerts',
      'Fertilizer & nutrient recommendations',
      'Irrigation scheduling optimization',
      'Market price trend analysis',
      'Government scheme eligibility alerts',
    ],
  },
  {
    id: 4,
    title: 'Crop Health',
    shortDesc: 'Health monitoring & detection',
    icon: HeartPulse,
    color: '#c084fc',
    description:
      'Continuous crop health monitoring using drone-captured multispectral imagery and AI-based anomaly detection to identify diseases, nutrient deficiencies, and stress factors early.',
    features: [
      'NDVI & multispectral health indexing',
      'Disease detection & classification',
      'Nutrient deficiency identification',
      'Water stress analysis',
      'Growth stage tracking',
      'Pest infestation mapping',
      'Automated health report generation',
    ],
  },
  {
    id: 5,
    title: 'Distribution',
    shortDesc: 'Optimized logistics & supply chain',
    icon: Truck,
    color: '#e879f9',
    description:
      'End-to-end supply chain optimization covering post-harvest handling, cold chain logistics, warehouse management, and last-mile delivery coordination.',
    features: [
      'Route optimization & fleet tracking',
      'Cold chain temperature monitoring',
      'Warehouse inventory management',
      'Demand forecasting & allocation',
      'Quality preservation during transit',
      'Delivery scheduling & coordination',
      'Supply chain traceability dashboard',
    ],
  },
  {
    id: 6,
    title: 'Insurance',
    shortDesc: 'Comprehensive insurance solutions',
    icon: Shield,
    color: '#f472b6',
    description:
      'AI-driven crop insurance solutions using drone imagery and satellite data for accurate risk assessment, automated claim processing, and transparent coverage management.',
    features: [
      'Automated risk assessment scoring',
      'Drone-based damage verification',
      'Weather index-based coverage',
      'Instant claim processing & settlement',
      'Historical loss pattern analysis',
      'Multi-peril insurance plans',
      'Government subsidy integration',
    ],
  },
  {
    id: 7,
    title: 'Gap Assist',
    shortDesc: 'Identifying gaps in practices',
    icon: Search,
    color: '#fb7185',
    description:
      'Comprehensive gap analysis system that identifies inefficiencies, compliance gaps, and improvement opportunities across the entire agricultural lifecycle.',
    features: [
      'Practice compliance auditing',
      'Yield gap analysis & benchmarking',
      'Resource utilization assessment',
      'Sustainability score tracking',
      'Regulatory compliance checking',
      'Best practice recommendation engine',
      'Continuous improvement roadmap',
    ],
  },
];

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════
   DETAIL MODAL COMPONENT
   ═══════════════════════════════════════════ */

function DetailModal({ step, isDark, onClose }) {
  if (!step) return null;
  const Icon = step.icon;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className={`relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl ${
          isDark
            ? 'bg-dark-800 border border-white/10 shadow-2xl shadow-black/40'
            : 'bg-white border border-gray-200 shadow-2xl shadow-black/10'
        }`}
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Header gradient bar */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${step.color}, ${step.color}88, ${step.color}44)`,
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full transition-all duration-200 z-20 ${
            isDark
              ? 'hover:bg-white/10 text-white/50 hover:text-white'
              : 'hover:bg-gray-100 text-gray-400 hover:text-gray-700'
          }`}
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* Icon + Title */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl shrink-0"
              style={{ backgroundColor: `${step.color}18` }}
            >
              <Icon size={26} style={{ color: step.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${step.color}18`,
                    color: step.color,
                  }}
                >
                  Step {step.id}
                </span>
              </div>
              <h3
                className={`font-[Outfit] text-2xl font-bold mt-1 ${
                  isDark ? 'text-white' : 'text-[#1e1b4b]'
                }`}
              >
                {step.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p
            className={`text-sm leading-relaxed mb-8 ${
              isDark ? 'text-white/50' : 'text-gray-500'
            }`}
          >
            {step.description}
          </p>

          {/* Key Features heading */}
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle2
              size={18}
              style={{ color: step.color }}
            />
            <h4
              className={`font-[Outfit] text-base font-semibold ${
                isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
            >
              Key Features
            </h4>
          </div>

          {/* Features list */}
          <div className="space-y-1">
            {step.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                className={`flex items-center gap-3 py-3 border-b ${
                  isDark ? 'border-white/5' : 'border-gray-100'
                } last:border-0`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M3 8L6.5 11.5L13 4.5"
                    stroke={step.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={`text-sm ${
                    isDark ? 'text-white/70' : 'text-gray-600'
                  }`}
                >
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   LIFECYCLE FLOWCHART — ALL-IN-ONE LAYOUT
   Labels positioned around the orbital ring
   ═══════════════════════════════════════════ */

function LifecycleFlowchart({ isDark, onStepClick, activeStep }) {
  const svgSize = 700;
  const center = svgSize / 2;
  const radius = 195;
  const iconPctSize = 8.5; // icon circle as % of container width

  const getNodePosition = (index) => {
    const angle = (index * 360) / 7 - 90;
    const rad = (angle * Math.PI) / 180;
    const nx = center + radius * Math.cos(rad);
    const ny = center + radius * Math.sin(rad);
    return { nx, ny, rad };
  };

  // Compute label position at a larger radius in SVG coords
  // and determine alignment based on which side of the circle
  const getLabelLayout = (index) => {
    const angle = (index * 360) / 7 - 90;
    const rad = (angle * Math.PI) / 180;
    const nx = center + radius * Math.cos(rad);
    const ny = center + radius * Math.sin(rad);
    const dx = nx - center;
    const dy = ny - center;

    // Label is placed further outward from center
    const labelDist = 55; // SVG units further out from the icon
    const lx = nx + labelDist * Math.cos(rad);
    const ly = ny + labelDist * Math.sin(rad);
    const lxPct = (lx / svgSize) * 100;
    const lyPct = (ly / svgSize) * 100;

    // Determine alignment
    const isNearVertical = Math.abs(dx) < radius * 0.2;

let align, transform;

if (isNearVertical && dy < 0) {
  // Top
  align = 'center';
  transform = 'translate(-50%, -120%)';
} else if (isNearVertical && dy > 0) {
  // Bottom
  align = 'center';
  transform = 'translate(-50%, 20%)';
} else if (dx > 0) {
  // Right side
  align = 'left';
  transform = 'translate(15px, -50%)';
} else {
  // Left side
  align = 'right';
  transform = 'translate(calc(-100% - 15px), -50%)';
}

    return { lxPct, lyPct, align, transform };
  };

  return (
    <div className="relative mx-auto" style={{ maxWidth: 650 }}>
      <div className="relative w-full" style={{ paddingBottom: '100%' }}>
        <div className="absolute inset-0 overflow-visible">
          {/* SVG rings and connection lines */}
          <svg
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1, overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="lcOrbitalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f472b6" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="lcOrbitalGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#f472b6" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Outer decorative ring */}
            <circle
              cx={center} cy={center} r={radius + 45}
              fill="none"
              stroke={isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}
              strokeWidth="1"
            />

            {/* Main orbital ring */}
            <motion.circle
              cx={center} cy={center} r={radius}
              fill="none" stroke="url(#lcOrbitalGrad)"
              strokeWidth="2" strokeDasharray="8 5"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: `${center}px ${center}px` }}
            />

            {/* Inner decorative ring */}
            <circle
              cx={center} cy={center} r={90}
              fill="none" stroke="url(#lcOrbitalGrad2)" strokeWidth="1"
            />

            {/* Connection lines from center to each node */}
            {lifecycleSteps.map((step, i) => {
              const { nx, ny } = getNodePosition(i);
              return (
                <motion.line
                  key={step.id}
                  x1={center} y1={center} x2={nx} y2={ny}
                  stroke={isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}
                  strokeWidth="1" strokeDasharray="4 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
                />
              );
            })}

            {/* Sequential arcs between adjacent nodes */}
            {lifecycleSteps.map((step, i) => {
              const next = (i + 1) % 7;
              const { nx: x1, ny: y1 } = getNodePosition(i);
              const { nx: x2, ny: y2 } = getNodePosition(next);
              const mx = (x1 + x2) / 2 + (center - (x1 + x2) / 2) * 0.15;
              const my = (y1 + y2) / 2 + (center - (y1 + y2) / 2) * 0.15;
              return (
                <motion.path
                  key={`arc-${step.id}`}
                  d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                  fill="none"
                  stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                  strokeWidth="1.5" strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                />
              );
            })}
          </svg>

          {/* Center hub */}
          <motion.div
            className={`absolute rounded-full flex flex-col items-center justify-center text-center ${
              isDark
                ? 'bg-gradient-to-br from-dark-700 to-dark-800 border border-white/10 shadow-2xl shadow-black/30'
                : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-2xl shadow-gray-200/50'
            }`}
            style={{
              width: '15%', height: '15%',
              left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', damping: 15 }}
          >
            <Sprout
              className={`mb-1 ${isDark ? 'text-neon' : 'text-emerald-600'}`}
              style={{ width: '22%', height: '22%', minWidth: 16, minHeight: 16 }}
            />
            <span className={`font-[Outfit] font-bold leading-tight ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}
              style={{ fontSize: 'clamp(8px, 1.5vw, 13px)' }}>Life Cycle</span>
            <span className={`font-[Outfit] font-bold leading-tight ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}
              style={{ fontSize: 'clamp(8px, 1.5vw, 13px)' }}>Assure</span>
            <span className={`tracking-wider uppercase ${isDark ? 'text-white/30' : 'text-gray-400'}`}
              style={{ fontSize: 'clamp(5px, 0.8vw, 8px)', marginTop: 2 }}>AI-Powered</span>
          </motion.div>

          {/* Step nodes — icon circle + label */}
          {lifecycleSteps.map((step, i) => {
            const { nx, ny } = getNodePosition(i);
            const { lxPct, lyPct, align, transform: labelTransform } = getLabelLayout(i);
            const Icon = step.icon;
            const isActive = activeStep === step.id;

            const xPct = (nx / svgSize) * 100;
            const yPct = (ny / svgSize) * 100;

            return (
              <div key={step.id}>
                {/* Icon circle */}
                <motion.button
                  className={`absolute rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    isDark
                      ? 'bg-dark-800 border-2 hover:border-white/20'
                      : 'bg-white border-2 hover:border-gray-400 shadow-lg'
                  }`}
                  style={{
                    width: `${iconPctSize}%`,
                    height: `${iconPctSize}%`,
                    left: `${xPct}%`,
                    top: `${yPct}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20,
                    borderColor: isActive ? step.color
                      : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
                    boxShadow: isActive
                      ? `0 0 24px ${step.color}30, 0 0 48px ${step.color}10`
                      : isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 15px rgba(0,0,0,0.08)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', damping: 15 }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStepClick(step)}
                >
                  <Icon size={24} style={{ color: step.color }} />
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.id}
                  </span>
                </motion.button>

                {/* Label — positioned at larger radius, pure percentage */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${lxPct}%`,
                    top: `${lyPct}%`,
                    transform: labelTransform,
                    zIndex: 15,
                    textAlign: align,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                >
                  <h4
                    className={`font-[Outfit] font-semibold leading-tight whitespace-nowrap ${
                      isDark ? 'text-white' : 'text-[#1e1b4b]'
                    }`}
                    style={{ fontSize: 'clamp(11px, 1.4vw, 15px)' }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={`leading-tight mt-0.5 whitespace-nowrap ${
                      isDark ? 'text-white/35' : 'text-gray-400'
                    }`}
                    style={{ fontSize: 'clamp(8px, 1vw, 11px)' }}
                  >
                    {step.shortDesc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MOBILE CARD LIST — fallback for small screens
   ═══════════════════════════════════════════ */

function MobileStepList({ isDark, onStepClick, activeStep }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {lifecycleSteps.map((step, i) => {
        const Icon = step.icon;
        const isActive = activeStep === step.id;

        return (
          <motion.button
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onStepClick(step)}
            className={`relative text-left rounded-2xl p-4 transition-all duration-300 ${
              isDark
                ? 'bg-white/[0.03] border border-white/[0.06] hover:border-white/15'
                : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
            }`}
            style={{
              borderColor: isActive
                ? step.color
                : undefined,
              boxShadow: isActive
                ? `0 0 20px ${step.color}15`
                : undefined,
            }}
          >
            {/* Badge */}
            <span
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
              style={{ backgroundColor: step.color }}
            >
              {step.id}
            </span>

            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: `${step.color}12` }}
            >
              <Icon size={20} style={{ color: step.color }} />
            </div>

            <h4
              className={`font-[Outfit] text-sm font-semibold ${
                isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
            >
              {step.title}
            </h4>
            <p
              className={`text-[11px] leading-tight mt-1 ${
                isDark ? 'text-white/35' : 'text-gray-400'
              }`}
            >
              {step.shortDesc}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION EXPORT
   ═══════════════════════════════════════════ */

export default function LifeCycleAssure() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [selectedStep, setSelectedStep] = useState(null);

  return (
    <>
      <section
        id="lifecycle"
        ref={sectionRef}
        className={`relative pt-10 pb-4 md:pt-14 md:pb-6 overflow-x-clip ${
          isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'
        }`}
      >
        {/* Background effects */}
        <div
          className={`absolute inset-0 grid-bg ${
            isDark ? 'opacity-30' : 'opacity-15'
          }`}
        />

        {isDark && (
          <>
            <div className="pointer-events-none absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#6366f1]/[0.03] blur-[180px]" />
            <div className="pointer-events-none absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-[#a78bfa]/[0.03] blur-[160px]" />
          </>
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Section header */}
          <motion.div
            className="mb-6 md:mb-10 text-center"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.span
              className={`inline-block text-xs font-bold tracking-[0.25em] uppercase mb-4 ${
                isDark ? 'text-neon/70' : 'text-emerald-600'
              }`}
              variants={fadeUp}
            >
              Our Services
            </motion.span>

            <motion.h2
              className="font-[Outfit] text-4xl font-bold md:text-6xl"
              variants={fadeUp}
            >
              <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>
                Life Cycle{' '}
              </span>
              <span
                className={
                  isDark ? 'text-gradient-neon' : 'text-gradient-emerald'
                }
              >
                Assure
              </span>
            </motion.h2>

            <motion.p
              className={`mx-auto mt-6 max-w-3xl text-lg leading-relaxed ${
                isDark ? 'text-white/50' : 'text-gray-500'
              }`}
              variants={fadeUp}
            >
              A comprehensive 7-step AI-powered lifecycle management system
              ensuring quality, efficiency, and risk mitigation throughout the
              agricultural value chain.
            </motion.p>

            <motion.div
              className={`mx-auto mt-8 h-0.5 w-24 rounded-full ${
                isDark ? 'bg-neon' : 'bg-emerald-500'
              }`}
              variants={fadeUp}
            />
          </motion.div>

          {/* Desktop: Orbital flowchart with inline labels */}
          {isInView && (
            <div className="hidden md:block">
              <LifecycleFlowchart
                isDark={isDark}
                onStepClick={(step) => setSelectedStep(step)}
                activeStep={selectedStep?.id}
              />
            </div>
          )}

          {/* Mobile: Card grid */}
          {isInView && (
            <div className="block md:hidden">
              <MobileStepList
                isDark={isDark}
                onStepClick={(step) => setSelectedStep(step)}
                activeStep={selectedStep?.id}
              />
            </div>
          )}

          {/* Bottom tagline */}
          {isInView && (
            <motion.p
              className={`text-center mt-4 text-sm ${
                isDark ? 'text-white/30' : 'text-gray-400'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Click on any step to explore its detailed features and capabilities
            </motion.p>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStep && (
          <DetailModal
            step={selectedStep}
            isDark={isDark}
            onClose={() => setSelectedStep(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
