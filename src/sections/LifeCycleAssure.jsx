import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

  return createPortal(
    <motion.div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 99999 }}
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
        className={`relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto no-scrollbar rounded-3xl ${
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
    </motion.div>,
    document.body
  );
}

/* ═══════════════════════════════════════════
   LIFECYCLE FLOWCHART — ALL-IN-ONE LAYOUT
   Labels positioned around the orbital ring
   ═══════════════════════════════════════════ */

// LifecycleFlowchart — fixed label positioning to match reference design
// Drop-in replacement for the LifecycleFlowchart function in your codebase.
// Props: isDark, onStepClick, activeStep (same as before)

function LifecycleFlowchart({ isDark, onStepClick, activeStep }) {
  const svgSize = 700;
  const center = svgSize / 2;
  const radius = 220;
  const iconSize = 56; // px-equivalent in SVG units
  const hubSize = 110;

  const getNodePosition = (index) => {
    const angle = (index * 360) / 7 - 90;
    const rad = (angle * Math.PI) / 180;
    const nx = center + radius * Math.cos(rad);
    const ny = center + radius * Math.sin(rad);
    return { nx, ny, rad, angle };
  };

  // Compute label anchor + alignment for each step
  const getLabelLayout = (index) => {
    const angle = (index * 360) / 7 - 90;
    const rad = (angle * Math.PI) / 180;
    const nx = center + radius * Math.cos(rad);
    const ny = center + radius * Math.sin(rad);
    const dx = nx - center;
    const dy = ny - center;

    const labelDist = 55;
    const lx = nx + labelDist * Math.cos(rad);
    const ly = ny + labelDist * Math.sin(rad);

    const isNearVertical = Math.abs(dx) < radius * 0.25;
    const isNearBottom = dy > radius * 0.6 && Math.abs(dx) < radius * 0.8;

    let anchor, yOffset, labelY;

    if (isNearVertical && dy < 0) {
      anchor = 'middle';
      yOffset = -12;
      labelY = ly;
    } else if (isNearVertical && dy > 0) {
      anchor = 'middle';
      yOffset = 12;
      labelY = ly;
    } else if (isNearBottom) {
      anchor = 'middle';
      yOffset = 12;
      labelY = ly;
    } else if (dx > 0) {
      // Right side — keep label vertically centered with icon
      anchor = 'start';
      yOffset = 0;
      labelY = ny;
    } else {
      // Left side — keep label vertically centered with icon
      anchor = 'end';
      yOffset = 0;
      labelY = ny;
    }

    return { lx, ly: labelY, anchor, yOffset };
  };

  return (
    <div className="relative mx-auto" style={{ maxWidth: 850 }}>
      <svg
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="w-full h-auto"
        style={{ overflow: 'visible' }}
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
          cx={center} cy={center} r={radius + 40}
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
          cx={center} cy={center} r={100}
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

        {/* Center hub via foreignObject — perfectly centered in SVG coords */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', damping: 15 }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        >
          <foreignObject
            x={center - hubSize / 2}
            y={center - hubSize / 2}
            width={hubSize}
            height={hubSize}
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              className={`w-full h-full rounded-full flex flex-col items-center justify-center text-center ${
                isDark
                  ? 'bg-gradient-to-br from-dark-700 to-dark-800 border border-white/10 shadow-2xl shadow-black/30'
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-2xl shadow-gray-200/50'
              }`}
            >
              <Sprout
                className={`mb-1 ${isDark ? 'text-neon' : 'text-emerald-600'}`}
                style={{ width: 22, height: 22 }}
              />
              <span className={`font-[Outfit] text-[13px] font-bold leading-tight ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
                Life Cycle
              </span>
              <span className={`font-[Outfit] text-[13px] font-bold leading-tight ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
                Assure
              </span>
              <span className={`text-[7px] tracking-wider uppercase mt-0.5 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                AI-Powered
              </span>
            </div>
          </foreignObject>
        </motion.g>

        {/* Step nodes — icon circles + numbered badges + labels */}
        {lifecycleSteps.map((step, i) => {
          const { nx, ny } = getNodePosition(i);
          const { lx, ly, anchor, yOffset } = getLabelLayout(i);
          const Icon = step.icon;
          const isActive = activeStep === step.id;

          return (
            <g key={step.id}>
              {/* Icon circle via foreignObject */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring', damping: 15 }}
                style={{ transformOrigin: `${nx}px ${ny}px` }}
              >
                <foreignObject
                  x={nx - iconSize / 2}
                  y={ny - iconSize / 2}
                  width={iconSize}
                  height={iconSize}
                  style={{ cursor: 'pointer', overflow: 'visible' }}
                >
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDark
                        ? 'bg-dark-800 hover:border-white/20'
                        : 'bg-white hover:border-gray-400 shadow-lg'
                    }`}
                    style={{
                      border: `2px solid ${
                        isActive ? step.color
                          : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'
                      }`,
                      boxShadow: isActive
                        ? `0 0 24px ${step.color}30, 0 0 48px ${step.color}10`
                        : isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 15px rgba(0,0,0,0.08)',
                    }}
                    onClick={() => onStepClick(step)}
                  >
                    <Icon size={24} style={{ color: step.color }} />
                  </div>
                </foreignObject>
                {/* Number badge — rendered as SVG for perfect circle */}
                <circle
                  cx={nx + iconSize / 2 - 6}
                  cy={ny - iconSize / 2 + 6}
                  r={10}
                  fill={step.color}
                />
                <text
                  x={nx + iconSize / 2 - 6}
                  y={ny - iconSize / 2 + 6}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  style={{ fontSize: 10, fontWeight: 700 }}
                >
                  {step.id}
                </text>
              </motion.g>

              {/* Label text — rendered as SVG text for perfect alignment */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
              >
                {yOffset < 0 ? (
                  <>
                    {/* Top labels: subtitle above title, both above the icon */}
                    <text
                      x={lx}
                      y={ly + yOffset + 16}
                      textAnchor={anchor}
                      dominantBaseline="auto"
                      style={{ fontSize: 11 }}
                      fill={isDark ? 'rgba(255,255,255,0.35)' : 'rgba(156,163,175,1)'}
                    >
                      {step.shortDesc}
                    </text>
                    <text
                      x={lx}
                      y={ly + yOffset}
                      textAnchor={anchor}
                      dominantBaseline="auto"
                      className="font-[Outfit]"
                      style={{ fontSize: 15, fontWeight: 600 }}
                      fill={isDark ? '#ffffff' : '#0d0d0d'}
                    >
                      {step.title}
                    </text>
                  </>
                ) : (
                  <>
                    {/* Bottom / side labels: title first, subtitle below */}
                    <text
                      x={lx}
                      y={ly + yOffset}
                      textAnchor={anchor}
                      dominantBaseline={yOffset > 0 ? 'hanging' : 'middle'}
                      className="font-[Outfit]"
                      style={{ fontSize: 15, fontWeight: 600 }}
                      fill={isDark ? '#ffffff' : '#0d0d0d'}
                    >
                      {step.title}
                    </text>
                    <text
                      x={lx}
                      y={ly + yOffset + 18}
                      textAnchor={anchor}
                      dominantBaseline={yOffset > 0 ? 'hanging' : 'middle'}
                      style={{ fontSize: 11 }}
                      fill={isDark ? 'rgba(255,255,255,0.35)' : 'rgba(156,163,175,1)'}
                    >
                      {step.shortDesc}
                    </text>
                  </>
                )}
              </motion.g>
            </g>
          );
        })}
      </svg>
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedStep) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedStep]);

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
