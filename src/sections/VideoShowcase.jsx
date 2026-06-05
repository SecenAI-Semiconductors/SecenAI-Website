import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";
import { useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function VideoShowcase() {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="demo" className={`relative py-16 md:py-20 overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-[#f5f5f7]'
      }`}>
      {/* Subtle grid background */}
      <div className={`absolute inset-0 grid-bg ${isDark ? 'opacity-30' : 'opacity-15'}`} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`text-xs tracking-[0.3em] text-center mb-6 font-semibold ${isDark ? 'text-neon' : 'text-emerald-600'
            }`}
        >
          SEE IT IN ACTION
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-[Outfit] text-4xl md:text-5xl font-bold text-center mb-14"
        >
          <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>Experience the</span>
          <span className={isDark ? ' text-gradient-neon' : ' text-gradient-emerald'}> Future of Flight</span>
        </motion.h2>

        {/* Video Preview Container */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={`max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden relative group cursor-pointer ${!isDark ? 'shadow-xl' : ''
            }`}
        >
          {/* Background Thumbnail */}
          <img
            src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1400&q=80"
            alt="AeroVault Phantom X1 in flight"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className={`absolute inset-0 transition-colors duration-500 ${isDark
              ? 'bg-dark-950/40 group-hover:bg-dark-950/50'
              : 'bg-black/25 group-hover:bg-black/35'
            }`} />

          {/* Centered Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              {/* Pulse Rings */}
              <span className={`absolute w-24 h-24 rounded-full border pulse-ring ${isDark ? 'border-neon/30' : 'border-emerald-400/40'
                }`} style={{ animationDelay: "0s" }} />
              <span className={`absolute w-24 h-24 rounded-full border pulse-ring ${isDark ? 'border-neon/20' : 'border-emerald-400/30'
                }`} style={{ animationDelay: "0.8s" }} />
              <span className={`absolute w-24 h-24 rounded-full border pulse-ring ${isDark ? 'border-neon/10' : 'border-emerald-400/20'
                }`} style={{ animationDelay: "1.6s" }} />

              {/* Outer Ring */}
              <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isDark ? 'border-neon/50' : 'border-emerald-400/60'
                }`}>
                {/* Inner Circle */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${isDark
                    ? 'bg-neon shadow-neon/30'
                    : 'bg-emerald-600 shadow-emerald-600/30'
                  }`}>
                  <Play className={`w-7 h-7 ml-1 ${isDark
                      ? 'text-dark-950 fill-dark-950'
                      : 'text-white fill-white'
                    }`} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`text-sm text-center mt-6 ${isDark ? 'text-white/30' : 'text-gray-400'
            }`}
        >
          Autonomous Mission Demo
        </motion.p>
      </div>
    </section>
  );
}
