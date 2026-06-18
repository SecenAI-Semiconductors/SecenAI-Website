import { motion, useInView } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const videoSrc = "https://res.cloudinary.com/dil1zgzdb/video/upload/Video-project1_kapelv.mp4";

export default function VideoShowcase() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

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
          onClick={togglePlay}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            src={videoSrc}
            onEnded={handleVideoEnd}
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay - fades out when playing */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : ''} ${isDark
              ? 'bg-dark-950/40 group-hover:bg-dark-950/50'
              : 'bg-black/25 group-hover:bg-black/35'
              }`}
          />

          {/* Centered Play/Pause Button */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              }`}
          >
            <div className="relative flex items-center justify-center">
              {/* Play/Pause Circle */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${isDark
                ? 'bg-neon shadow-neon/30'
                : 'bg-emerald-600 shadow-emerald-600/30'
                }`}>
                {isPlaying ? (
                  <Pause className={`w-7 h-7 ${isDark ? 'text-dark-950 fill-dark-950' : 'text-white fill-white'}`} />
                ) : (
                  <Play className={`w-7 h-7 ml-1 ${isDark ? 'text-dark-950 fill-dark-950' : 'text-white fill-white'}`} />
                )}
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
