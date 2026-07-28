import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const videoSrc = "https://res.cloudinary.com/dil1zgzdb/video/upload/Video-project1_kapelv.mp4";

export default function VideoShowcase() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(true);

  /* Sync volume / muted state to the video element */
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.volume = volume;
    videoRef.current.muted = isMuted;
  }, [volume, isMuted]);

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

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) setIsMuted(false);
    if (val === 0) setIsMuted(true);
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
            muted={isMuted}
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

          {/* ── Volume Control Strip ── */}
          <div
            className={`absolute bottom-3 right-3 z-20 flex items-center gap-2 rounded-full px-3 py-2 backdrop-blur-md transition-opacity duration-300 ${isPlaying ? 'opacity-60 hover:opacity-100' : 'opacity-80 hover:opacity-100'
              } ${isDark
                ? 'bg-dark-950/70 border border-white/10'
                : 'bg-white/70 border border-gray-200 shadow-sm'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleMute}
              className={`flex items-center justify-center rounded-full p-1 transition-colors ${isDark ? 'hover:bg-white/10 text-white/80' : 'hover:bg-gray-100 text-gray-700'
                }`}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="video-volume-slider w-16 sm:w-20 h-1 cursor-pointer"
              aria-label="Volume"
            />
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
        </motion.p>
      </div>
    </section>
  );
}
