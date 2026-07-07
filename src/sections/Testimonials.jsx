import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const testimonials = [
  {
    name: "Rajesh Patel",
    initials: "RP",
    company: "Pilot Partner, Precision Farming",
    review:
      "We were among the first farms to test SecenAI's Quadcopter for crop scouting. Even in the early prototype stage, the multispectral data quality impressed us. The team is incredibly responsive and the technology has real potential to change how small farms operate.",
  },
  {
    name: "Ananya Sharma",
    initials: "AS",
    company: "Beta Tester, Infrastructure",
    review:
      "I got a hands-on demo of SecenAI's Hexacopter during their beta program. The AI-based defect detection is genuinely innovative. It flagged surface cracks on a test structure that our team had overlooked. Excited to see where this goes as they scale.",
  },
  {
    name: "Dr. Vikram Rao",
    initials: "VR",
    company: "Industry Advisor, Smart Cities",
    review:
      "As an advisor, I've watched SecenAI evolve from an idea to a working platform. Their custom flight controller and real-time analytics dashboard are impressive for a team this early. This is a startup worth keeping an eye on.",
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function StarRating({ isDark }) {
  return (
    <div className="flex gap-1 mb-5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${
          isDark ? 'text-neon fill-neon' : 'text-emerald-500 fill-emerald-500'
        }`} />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, isDark }) {
  return (
    <motion.div
      variants={cardVariants}
      className={`rounded-2xl p-8 flex flex-col ${
        isDark
          ? 'glass-card'
          : 'bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-emerald-200'
      }`}
    >
      {/* Quote Icon */}
      <Quote className={`w-10 h-10 mb-4 -scale-x-100 ${
        isDark ? 'text-neon/30' : 'text-emerald-200'
      }`} />

      {/* Star Rating */}
      <StarRating isDark={isDark} />

      {/* Review Text */}
      <p className={`text-sm leading-relaxed italic flex-1 mb-8 ${
        isDark ? 'text-white/60' : 'text-gray-500'
      }`}>
        &ldquo;{testimonial.review}&rdquo;
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          isDark ? 'bg-neon/20' : 'bg-emerald-50'
        }`}>
          <span className={`text-sm font-semibold ${
            isDark ? 'text-neon' : 'text-emerald-600'
          }`}>
            {testimonial.initials}
          </span>
        </div>

        {/* Name & Company */}
        <div>
          <p className={`font-medium text-sm ${
            isDark ? 'text-white' : 'text-[#1e1b4b]'
          }`}>{testimonial.name}</p>
          <p className={`text-xs ${
            isDark ? 'text-white/40' : 'text-gray-400'
          }`}>{testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className={`relative py-16 md:py-20 overflow-hidden ${
      isDark ? 'bg-dark-900' : 'bg-[#f5f5f7]'
    }`}>
      {/* Subtle grid background */}
      <div className={`absolute inset-0 grid-bg ${isDark ? 'opacity-20' : 'opacity-10'}`} />

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`text-xs tracking-[0.3em] text-center mb-4 font-semibold ${
            isDark ? 'text-neon' : 'text-emerald-600'
          }`}
        >
          EARLY FEEDBACK
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-[Outfit] text-4xl md:text-5xl font-bold text-center mb-12"
        >
          <span className={isDark ? 'text-white' : 'text-[#1e1b4b]'}>What People Are</span>
          <span className={isDark ? ' text-gradient-neon' : ' text-gradient-emerald'}> Saying</span>
        </motion.h2>

        {/* Testimonial Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} isDark={isDark} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
