import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  Target, Users, Globe, Lightbulb,
  Award, TrendingUp, Leaf, Cpu,
} from 'lucide-react';
import LifeCycleAssure from '../sections/LifeCycleAssure';
import Leadership from '../sections/Leadership';
import aboutImg from '../assets/about.jpg';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardFade = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ═══════════════════════════════════════════
   VALUES DATA
   ═══════════════════════════════════════════ */

const values = [
  {
    icon: Target,
    title: 'Precision First',
    description:
      'Every solution we build is designed for accuracy. From seed quality prediction to crop health detection, we ensure data-driven precision at every step.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Agriculture',
    description:
      'We believe in technology that nurtures the planet. Our AI systems optimize resource usage, reduce waste, and promote sustainable farming practices.',
  },
  {
    icon: Users,
    title: 'Farmer-Centric',
    description:
      'Built with farmers in mind. Our platform delivers complex analytics through intuitive interfaces accessible to everyone in the agricultural chain.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    description:
      "We push the boundaries of agricultural technology by combining AI, drone intelligence, and IoT to solve tomorrow's food security challenges today.",
  },
];

/* ═══════════════════════════════════════════
   STATS DATA
   ═══════════════════════════════════════════ */

const stats = [
  { value: '7', label: 'Lifecycle Stages', icon: Globe },
  { value: '500+', label: 'Acres Analyzed Daily', icon: TrendingUp },
  { value: '98%', label: 'Detection Accuracy', icon: Award },
  { value: 'AI', label: 'Powered Platform', icon: Cpu },
];

/* ═══════════════════════════════════════════
   ABOUT PAGE COMPONENT
   ═══════════════════════════════════════════ */

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const heroRef = useRef(null);
  const valuesRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });

  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <section
        ref={heroRef}
        className={`relative pt-24 pb-14 md:pt-28 md:pb-20 overflow-hidden ${
          isDark ? 'bg-dark-950' : 'bg-white'
        }`}
      >
        {/* Background effects */}
        {isDark && (
          <>
            <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-neon/[0.02] blur-[200px]" />
            <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[#6366f1]/[0.02] blur-[160px]" />
          </>
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
            {/* Left — Text content */}
            <motion.div
              className="flex-1 max-w-2xl"
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
              variants={stagger}
            >
              <motion.span
                className={`inline-block text-xs font-bold tracking-[0.25em] uppercase mb-4 ${
                  isDark ? 'text-neon/70' : 'text-emerald-600'
                }`}
                variants={fadeUp}
              >
                About Us
              </motion.span>

              <motion.h1
                className="font-[Outfit] text-5xl font-bold md:text-7xl leading-[1.1]"
                variants={fadeUp}
              >
                <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>
                  Transforming Agriculture{' '}
                </span>
                <span
                  className={
                    isDark ? 'text-gradient-neon' : 'text-gradient-emerald'
                  }
                >
                  with AI
                </span>
              </motion.h1>

              <motion.p
                className={`mt-6 text-lg leading-relaxed ${
                  isDark ? 'text-white/50' : 'text-gray-500'
                }`}
                variants={fadeUp}
              >
                At SecenAI, we're building the future of agricultural management.
                Our AI-powered Life Cycle Assure platform integrates drone intelligence,
                IoT sensors, and machine learning to empower farmers and agribusinesses
                with actionable, data-driven insights, from seed to shelf.
              </motion.p>

              {/* Stats row */}
              <motion.div
                className="flex flex-wrap gap-8 mt-12"
                variants={stagger}
              >
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      className="flex items-center gap-3"
                      variants={fadeUp}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isDark ? 'bg-neon/10' : 'bg-emerald-50'
                        }`}
                      >
                        <Icon
                          size={18}
                          className={isDark ? 'text-neon' : 'text-emerald-600'}
                        />
                      </div>
                      <div>
                        <span
                          className={`font-[Outfit] text-xl font-bold block leading-tight ${
                            isDark ? 'text-white' : 'text-[#1e1b4b]'
                          }`}
                        >
                          {stat.value}
                        </span>
                        <span
                          className={`text-[11px] tracking-wider uppercase ${
                            isDark ? 'text-white/40' : 'text-gray-400'
                          }`}
                        >
                          {stat.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right — Image */}
            <motion.div
              className="w-full lg:flex-[1.3] max-w-xl lg:max-w-none"
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={
                heroInView
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: 60, scale: 0.95 }
              }
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <div
                className="relative rounded-3xl overflow-hidden group"
                style={{
                  boxShadow: isDark
                    ? '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)'
                    : '0 25px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)',
                }}
              >
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(204,255,0,0.06) 0%, transparent 50%, rgba(99,102,241,0.06) 100%)'
                      : 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, transparent 50%, rgba(99,102,241,0.06) 100%)',
                  }}
                />

                <img
                  src={aboutImg}
                  alt="SecenAI team at Entrepreneurship Bootcamp"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ display: 'block' }}
                />

                {/* Bottom caption bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-20 px-5 py-3"
                  style={{
                    background: isDark
                      ? 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                  }}
                >
                  <span className="text-white text-xs font-medium tracking-wide opacity-80">
                    🏆 Entrepreneurship Bootcamp 1.0: Grand Demo Day
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <LifeCycleAssure />
      <Leadership />
    </>
  );
}
