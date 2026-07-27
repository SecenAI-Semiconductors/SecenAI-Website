import { useRef, useState, useCallback } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  Cable, Network, Cpu, Layers, Gauge, Cog, Zap,
  Usb, SatelliteDish, Radio, HardDrive, Plug, Info, X, FileText,
} from 'lucide-react';
import { connectivityData } from '../../data/secenaiFCH743V1Data';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════
   ICON MAP
   ═══════════════════════════════════════════ */

const iconMap = {
  Cable, Network, Cpu, Layers, Gauge, Cog, Zap,
  Usb, SatelliteDish, Radio, HardDrive, Plug,
};

function getIcon(name) {
  return iconMap[name] || Plug;
}

/* ═══════════════════════════════════════════
   INTERFACE COUNT CARD
   ═══════════════════════════════════════════ */

function InterfaceCard({ iface, isDark, variants }) {
  const Icon = getIcon(iface.icon);
  return (
    <motion.div className="glass-card rounded-xl px-5 py-5" variants={variants}>
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            isDark ? 'bg-neon/[0.08]' : 'bg-emerald-50'
          }`}
        >
          <Icon size={15} className={isDark ? 'text-neon' : 'text-emerald-600'} />
        </div>
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold font-[Outfit] leading-none ${
                isDark ? 'text-neon' : 'text-emerald-600'
              }`}
            >
              {iface.count}×
            </span>
            <span
              className={`text-sm font-semibold ${
                isDark ? 'text-white/70' : 'text-[#1e1b4b]'
              }`}
            >
              {iface.name}
            </span>
          </div>
          <p
            className={`mt-1.5 text-[0.6875rem] leading-relaxed ${
              isDark ? 'text-white/35' : 'text-gray-500'
            }`}
          >
            {iface.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HOTSPOT TOOLTIP (Desktop hover / keyboard)
   ═══════════════════════════════════════════ */

function HotspotDot({ hotspot, isDark, onSelect, isSelected }) {
  const [hovered, setHovered] = useState(false);
  const showTooltip = hovered || isSelected;

  return (
    <div
      className="absolute"
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: showTooltip ? 30 : 10,
      }}
    >
      <button
        className={`relative h-3.5 w-3.5 rounded-full border-2 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 ${
          isDark
            ? 'bg-neon/30 border-neon/60 hover:bg-neon/50 focus-visible:ring-neon/40'
            : 'bg-emerald-400/40 border-emerald-500/70 hover:bg-emerald-400/60 focus-visible:ring-emerald-400/40'
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={() => onSelect(hotspot.id)}
        aria-label={`${hotspot.name}: ${hotspot.peripheral}`}
      >
        {/* Pulse ring */}
        <span
          className={`absolute inset-[-4px] rounded-full animate-ping ${
            isDark ? 'bg-neon/10' : 'bg-emerald-400/10'
          }`}
          style={{ animationDuration: '3s' }}
        />
      </button>

      {/* Tooltip — desktop hover / keyboard focus */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className={`hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap rounded-lg px-4 py-3 text-left pointer-events-none ${
              isDark
                ? 'bg-dark-800 border border-white/[0.08] shadow-xl shadow-black/30'
                : 'bg-white border border-gray-200 shadow-xl shadow-black/5'
            }`}
          >
            {/* Arrow */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 -mt-1 ${
                isDark ? 'bg-dark-800 border-r border-b border-white/[0.08]' : 'bg-white border-r border-b border-gray-200'
              }`}
            />
            <span className={`block text-xs font-semibold ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'}`}>
              {hotspot.name}
            </span>
            <span className={`block text-[0.625rem] mt-0.5 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
              {hotspot.interfaceType} · {hotspot.peripheral}
            </span>
            {hotspot.voltage && (
              <span className={`block text-[0.625rem] mt-0.5 ${isDark ? 'text-neon/50' : 'text-emerald-500'}`}>
                {hotspot.voltage}
              </span>
            )}
            {!hotspot.pinout && (
              <span className={`block text-[0.5625rem] mt-1 italic ${isDark ? 'text-white/20' : 'text-gray-300'}`}>
                Pinout pending
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MOBILE INFO CARD (tap-to-open)
   ═══════════════════════════════════════════ */

function MobileInfoCard({ hotspot, isDark, onClose }) {
  if (!hotspot) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.2 }}
      className={`md:hidden rounded-xl border px-5 py-4 mt-4 ${
        isDark
          ? 'bg-dark-800 border-white/[0.08]'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`block text-sm font-semibold ${isDark ? 'text-white/80' : 'text-[#1e1b4b]'}`}>
            {hotspot.name}
          </span>
          <span className={`block text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
            {hotspot.interfaceType} · {hotspot.peripheral}
          </span>
          {hotspot.voltage && (
            <span className={`block text-xs mt-0.5 ${isDark ? 'text-neon/50' : 'text-emerald-500'}`}>
              {hotspot.voltage}
            </span>
          )}
          {!hotspot.pinout && (
            <span className={`block text-[0.6875rem] mt-1.5 italic ${isDark ? 'text-white/20' : 'text-gray-300'}`}>
              Pinout pending
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className={`p-1 rounded-md transition-colors ${
            isDark ? 'hover:bg-white/5 text-white/30' : 'hover:bg-gray-100 text-gray-400'
          }`}
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   BOARD HOTSPOT VIEW
   ═══════════════════════════════════════════ */

function BoardHotspotView({ isDark, prefersReducedMotion }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = useCallback((id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const selectedHotspot = connectivityData.hotspots.find((h) => h.id === selectedId) || null;

  return (
    <div>
      <div
        className={`relative rounded-2xl overflow-hidden aspect-square ${
          isDark ? 'bg-dark-800 border border-white/[0.06]' : 'bg-white border border-gray-200'
        }`}
        style={{
          boxShadow: isDark
            ? '0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)'
            : '0 25px 80px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
        }}
      >
        {/* Grid trace pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? `linear-gradient(rgba(204,255,0,0.025) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(204,255,0,0.025) 1px, transparent 1px)`
              : `linear-gradient(rgba(83,137,68,0.035) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(83,137,68,0.035) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 50%, rgba(204,255,0,0.04) 0%, transparent 60%)'
              : 'radial-gradient(circle at 50% 50%, rgba(83,137,68,0.04) 0%, transparent 60%)',
          }}
        />

        {/* Top-view image or placeholder */}
        {connectivityData.topViewImage ? (
          <img
            src={connectivityData.topViewImage}
            alt="SECENAI FC H743 V1 — top view showing connector layout and component placement"
            className="absolute inset-0 w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div
                className={`mx-auto mb-3 h-14 w-14 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-neon/[0.06] border border-neon/10' : 'bg-emerald-50 border border-emerald-200/30'
                }`}
              >
                <Cpu size={24} className={isDark ? 'text-neon/30' : 'text-emerald-400/40'} strokeWidth={1.5} />
              </div>
              <span className={`text-[0.625rem] font-semibold tracking-[0.15em] uppercase ${isDark ? 'text-white/12' : 'text-gray-300'}`}>
                Top-View Render
              </span>
            </div>
          </div>
        )}

        {/* Hotspot dots */}
        {connectivityData.hotspots.map((hotspot) => (
          <HotspotDot
            key={hotspot.id}
            hotspot={hotspot}
            isDark={isDark}
            onSelect={handleSelect}
            isSelected={selectedId === hotspot.id}
          />
        ))}
      </div>

      {/* Mobile tap-to-open card */}
      <AnimatePresence>
        {selectedHotspot && (
          <MobileInfoCard
            hotspot={selectedHotspot}
            isDark={isDark}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CONNECTIVITY SECTION
   ═══════════════════════════════════════════ */

export default function ConnectivitySection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 overflow-hidden ${
        isDark ? 'bg-dark-900' : 'bg-[#f0f0f3]'
      }`}
    >
      {/* Ambient glow */}
      {isDark && (
        <>
          <div className="pointer-events-none absolute left-[15%] top-[15%] h-[450px] w-[500px] rounded-full bg-neon/[0.02] blur-[180px]" />
          <div className="pointer-events-none absolute right-[5%] bottom-[10%] h-[350px] w-[400px] rounded-full bg-[#6366f1]/[0.02] blur-[160px]" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">

          {/* ─── Left: Text + Cards ─── */}
          <motion.div
            className="flex-1 max-w-xl"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            {/* Eyebrow */}
            <motion.span
              className={`inline-block text-[0.6875rem] font-bold tracking-[0.25em] uppercase mb-4 ${
                isDark ? 'text-neon/50' : 'text-emerald-600/70'
              }`}
              variants={fadeUp}
            >
              {connectivityData.badge}
            </motion.span>

            {/* Heading */}
            <motion.h2
              className={`font-[Outfit] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.12] ${
                isDark ? 'text-white' : 'text-[#1e1b4b]'
              }`}
              variants={fadeUp}
            >
              {connectivityData.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className={`mt-5 text-[0.9375rem] md:text-base leading-[1.75] ${
                isDark ? 'text-white/50' : 'text-gray-600'
              }`}
              variants={fadeUp}
            >
              {connectivityData.description}
            </motion.p>

            {/* Divider */}
            <motion.div
              className={`my-8 h-px w-full ${
                isDark
                  ? 'bg-gradient-to-r from-neon/15 via-white/5 to-transparent'
                  : 'bg-gradient-to-r from-emerald-300/30 via-gray-200 to-transparent'
              }`}
              variants={fadeUp}
            />

            {/* Interface count cards */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3" variants={stagger}>
              {connectivityData.interfaces.map((iface) => (
                <InterfaceCard
                  key={iface.name}
                  iface={iface}
                  isDark={isDark}
                  variants={fadeUp}
                />
              ))}
            </motion.div>

            {/* Additional features */}
            <motion.div className="mt-8" variants={fadeUp}>
              <span
                className={`block text-[0.625rem] font-bold tracking-[0.2em] uppercase mb-3 ${
                  isDark ? 'text-white/25' : 'text-gray-400'
                }`}
              >
                Also includes
              </span>
              <div className="flex flex-wrap gap-2">
                {connectivityData.additionalFeatures.map((feat) => (
                  <span
                    key={feat}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.6875rem] font-medium border ${
                      isDark
                        ? 'border-white/[0.06] text-white/40 bg-white/[0.02]'
                        : 'border-gray-200 text-gray-500 bg-gray-50'
                    }`}
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Pinout notice */}
            <motion.div
              className={`mt-8 flex items-center gap-2.5 rounded-xl border px-5 py-3.5 ${
                isDark
                  ? 'bg-white/[0.02] border-white/[0.06]'
                  : 'bg-gray-50 border-gray-200'
              }`}
              variants={fadeUp}
            >
              <FileText size={14} className={isDark ? 'text-neon/40' : 'text-emerald-500/60'} />
              <span className={`text-xs font-medium ${isDark ? 'text-white/35' : 'text-gray-400'}`}>
                {connectivityData.pinoutStatus}
              </span>
            </motion.div>
          </motion.div>

          {/* ─── Right: Board Hotspot View ─── */}
          <motion.div
            className="flex-1 flex items-start justify-center lg:sticky lg:top-32 lg:self-start"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <BoardHotspotView isDark={isDark} prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
