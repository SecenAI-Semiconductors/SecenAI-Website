import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center justify-center pb-20"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <img
          src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&q=80"
          alt="Drone Intelligence Platform"
          className="w-full h-[120%] object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        className={`absolute inset-0 z-[1] ${
          isDark
            ? "bg-gradient-to-b from-dark-950/80 via-dark-950/60 to-dark-950"
            : "bg-gradient-to-b from-white/85 via-white/70 to-white/95"
        }`}
        style={{ opacity: overlayOpacity }}
      />

      {/* Grid Overlay */}
      <div className={`absolute inset-0 z-[2] grid-bg ${isDark ? 'opacity-40' : 'opacity-20'}`} />

      {/* Glow Effects — dark mode only */}
      {isDark && (
        <>
          <div className="absolute top-1/4 -right-20 z-[3] h-96 w-96 rounded-full bg-neon/10 blur-[120px] animate-float pointer-events-none" />
          <div className="absolute bottom-1/3 -left-10 z-[3] h-64 w-64 rounded-full bg-neon/5 blur-[100px] animate-float-delayed pointer-events-none" />
        </>
      )}

      {/* Light mode subtle accent orb */}
      {!isDark && (
        <div className="absolute top-1/4 right-10 z-[3] h-96 w-96 rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 60%)' }}
        />
      )}

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center min-h-screen justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeSlideUp}>
            <span className={`mb-8 inline-block rounded-full border px-4 py-1.5 mt-20 text-xs tracking-[0.2em] backdrop-blur-sm ${
              isDark
                ? "border-white/10 bg-white/5 text-white/60"
                : "border-gray-300 bg-white/60 text-gray-500"
            }`}>
              AI-POWERED DRONE INTELLIGENCE
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeSlideUp}
            className="mb-6 font-[Outfit] text-4xl font-bold leading-tight sm:text-5xl md:text-7xl lg:text-8xl"
          >
            <span className={isDark ? "text-white" : "text-[#1e1b4b]"}>
              AI-Powered Drone
            </span>
            <span className={`block ${isDark ? "text-gradient-neon" : "text-gradient-emerald"}`}>
              Intelligence Platform
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeSlideUp}
            className={`mb-12 max-w-4xl text-base leading-relaxed sm:text-lg md:text-xl ${
              isDark ? "text-white/60" : "text-gray-500"
            }`}
          >
            Real-time drone monitoring, AI analytics, IoT integration,
            crop disease detection, infrastructure inspection, aerial
            surveying, logistics intelligence, and smart city monitoring
            through a unified analytics platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeSlideUp}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            <a
              href="/products#industry-solutions"
              className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 ${
                isDark
                  ? "bg-neon text-dark-950 hover:shadow-xl hover:shadow-neon/30"
                  : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30"
              }`}
            >
              Explore Solutions

              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>

            <a
              href="#demo"
              className={`group inline-flex items-center gap-3 rounded-full border px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base transition-all duration-300 ${
                isDark
                  ? "border-white/20 text-white hover:bg-white/5"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
              }`}
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                isDark
                  ? "bg-white/10 group-hover:bg-neon/20"
                  : "bg-emerald-50 group-hover:bg-emerald-100"
              }`}>
                <Play
                  size={14}
                  className={`ml-0.5 transition-colors ${
                    isDark ? "group-hover:text-neon" : "text-emerald-600"
                  }`}
                />
              </span>

              Watch Platform Demo
            </a>
          </motion.div>
        </motion.div>


      </div>
    </section>
  );
}