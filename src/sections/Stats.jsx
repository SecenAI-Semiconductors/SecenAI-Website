import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

// ─── Animated Counter (preserved from original) ───────────────────────────────
function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  const easeOutQuart = useCallback((t) => 1 - Math.pow(1 - t, 4), []);

  useEffect(() => {
    if (!isInView || hasAnimated.current || target <= 0) return;
    hasAnimated.current = true;

    let startTime = null;
    let rafId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = easedProgress * target;

      setCount(currentValue);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isInView, target, duration, easeOutQuart]);

  const formatter = new Intl.NumberFormat();
  const displayValue = formatter.format(Math.round(count));

  return (
    <span ref={counterRef}>
      {displayValue}
    </span>
  );
}

// ─── Country flag emoji from ISO 3166-1 alpha-2 code ──────────────────────────
function countryFlag(code) {
  if (!code || code.length !== 2) return "🌐";
  const upper = code.toUpperCase();
  const codePoints = [...upper].map(
    (c) => 0x1f1e6 + c.charCodeAt(0) - 65
  );
  try {
    return String.fromCodePoint(...codePoints);
  } catch {
    return "🌐";
  }
}

// ─── Country name from ISO code via Intl.DisplayNames ──────────────────────────
function countryName(code) {
  try {
    const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
    return displayNames.of(code.toUpperCase()) || code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

// ─── Skeleton placeholders ────────────────────────────────────────────────────
function StatSkeleton({ isDark }) {
  return (
    <div className="text-center py-6 md:py-8 animate-pulse">
      <div
        className={`mx-auto h-10 md:h-12 w-24 rounded ${
          isDark ? "bg-white/5" : "bg-gray-200"
        }`}
      />
      <div
        className={`mx-auto mt-3 h-4 w-28 rounded ${
          isDark ? "bg-white/5" : "bg-gray-200"
        }`}
      />
    </div>
  );
}

function CountrySkeleton({ isDark }) {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div
        className={`w-8 h-8 rounded-full shrink-0 ${
          isDark ? "bg-white/5" : "bg-gray-200"
        }`}
      />
      <div className="flex-1 min-w-0">
        <div
          className={`h-4 w-24 rounded mb-2 ${
            isDark ? "bg-white/5" : "bg-gray-200"
          }`}
        />
        <div
          className={`h-2 rounded-full ${
            isDark ? "bg-white/5" : "bg-gray-200"
          }`}
        />
      </div>
      <div
        className={`h-4 w-12 rounded shrink-0 ${
          isDark ? "bg-white/5" : "bg-gray-200"
        }`}
      />
    </div>
  );
}

// ─── Main Stats Component ─────────────────────────────────────────────────────
export default function Stats() {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const res = await fetch("/api/visitor-stats");
        if (!res.ok) {
          throw new Error(`API responded with ${res.status}`);
        }
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          if (import.meta.env.DEV) {
            console.error("Stats fetch error:", err);
          }
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, []);

  // If the API errored, hide the section or show a subtle message
  if (error) {
    return (
      <section
        ref={sectionRef}
        className={`relative py-10 border-y ${
          isDark
            ? "bg-dark-950 border-white/5"
            : "bg-[#f9fafb] border-gray-200"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p
            className={`text-sm ${
              isDark ? "text-white/30" : "text-gray-400"
            }`}
          >
            Visitor statistics are temporarily unavailable
          </p>
        </div>
      </section>
    );
  }

  // Check for empty data (analytics not yet collected)
  const hasData =
    data && (data.visitors > 0 || data.pageViews > 0 || data.countriesReached > 0);

  const statsItems = data
    ? [
        { target: data.visitors, label: "Total Visitors" },
        { target: data.pageViews, label: "Total Page Views" },
        { target: data.countriesReached, label: "Countries Reached" },
      ]
    : [];

  const formatter = new Intl.NumberFormat();
  const maxCountryVisitors =
    data?.topCountries?.length > 0 ? data.topCountries[0].visitors : 0;

  return (
    <section
      ref={sectionRef}
      className={`relative py-10 border-y ${
        isDark
          ? "bg-dark-950 border-white/5"
          : "bg-[#f9fafb] border-gray-200"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-5xl mx-auto px-6"
      >
        {/* ── Three-column stat counters ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${
                  i < 2
                    ? isDark
                      ? "sm:border-r sm:border-white/5"
                      : "sm:border-r sm:border-gray-200"
                    : ""
                }`}
              >
                <StatSkeleton isDark={isDark} />
              </div>
            ))}
          </div>
        ) : hasData ? (
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {statsItems.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center py-6 md:py-8 ${
                  index < statsItems.length - 1
                    ? isDark
                      ? "sm:border-r sm:border-white/5"
                      : "sm:border-r sm:border-gray-200"
                    : ""
                }`}
              >
                <div
                  className={`font-[Outfit] text-4xl md:text-5xl font-bold ${
                    isDark ? "text-neon" : "text-emerald-600"
                  }`}
                >
                  <AnimatedCounter
                    target={stat.target}
                    duration={2000}
                  />
                </div>
                <p
                  className={`text-sm mt-2 ${
                    isDark ? "text-white/40" : "text-gray-500"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p
              className={`text-sm ${
                isDark ? "text-white/30" : "text-gray-400"
              }`}
            >
              Analytics data is being collected — check back soon
            </p>
          </div>
        )}

        {/* ── Global Reach — Top 5 Countries ── */}
        {loading ? (
          <div className="mt-10">
            <div
              className={`mx-auto h-5 w-32 rounded mb-6 animate-pulse ${
                isDark ? "bg-white/5" : "bg-gray-200"
              }`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {[0, 1, 2, 3, 4].map((i) => (
                <CountrySkeleton key={i} isDark={isDark} />
              ))}
            </div>
          </div>
        ) : hasData && data.topCountries && data.topCountries.length > 0 ? (
          <div className="mt-10">
            <h3
              className={`text-center text-sm font-semibold tracking-wider uppercase mb-6 ${
                isDark ? "text-white/40" : "text-gray-500"
              }`}
            >
              Global Reach
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {data.topCountries.map((country) => {
                const widthPct =
                  maxCountryVisitors > 0
                    ? (country.visitors / maxCountryVisitors) * 100
                    : 0;

                return (
                  <motion.div
                    key={country.code}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`rounded-lg px-4 py-3 ${
                      isDark
                        ? "bg-white/[0.03] border border-white/5"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg leading-none" aria-hidden="true">
                        {countryFlag(country.code)}
                      </span>
                      <span
                        className={`text-xs font-medium truncate ${
                          isDark ? "text-white/70" : "text-gray-700"
                        }`}
                      >
                        {countryName(country.code)}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div
                      className={`h-1.5 rounded-full overflow-hidden mb-1.5 ${
                        isDark ? "bg-white/5" : "bg-gray-100"
                      }`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${widthPct}%` } : {}}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          isDark
                            ? "bg-neon/60"
                            : "bg-emerald-500/60"
                        }`}
                      />
                    </div>

                    <p
                      className={`text-xs ${
                        isDark ? "text-white/30" : "text-gray-400"
                      }`}
                    >
                      {formatter.format(country.visitors)} visitors
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
