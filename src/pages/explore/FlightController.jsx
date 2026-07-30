import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import PlaceholderPage from '../../components/PlaceholderPage';
import fcEnclosureBlackImg from '../../assets/flight-controller/secenai-fc-h743-v1/fc-enclosure-black.webp';
import { ArrowRight } from 'lucide-react';

export default function FlightController() {
  const { hash } = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Scroll to the target section when navigating with a hash
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <>
      <PlaceholderPage
        title="Flight Controller"
        badgeText="FLIGHT CONTROLLER PLATFORM"
        description="SECENAI's custom-designed flight controllers deliver unmatched performance for autonomous UAV operations. Explore our range of flight controller variants engineered for different mission profiles."
        backgroundImage={fcEnclosureBlackImg}
      />

      {/* Product links */}
      <section className={`pb-24 ${isDark ? 'bg-dark-950' : 'bg-[#f9fafb]'}`}>
        <div className="mx-auto max-w-7xl px-6">
          {/* SECENAI FC H743 V1 */}
          <Link
            to="/explore/secenai-fc-h743-v1"
            className={`glass-card group flex items-center justify-between rounded-2xl px-8 py-6 transition-all duration-300 ${isDark ? 'hover:border-neon/20' : 'hover:border-emerald-300'
              }`}
          >
            <div>
              <span className={`text-xs font-bold tracking-[0.2em] uppercase ${isDark ? 'text-neon/60' : 'text-emerald-600'}`}>
                Flight Controller
              </span>
              <h3 className={`mt-1 font-[Outfit] text-xl font-semibold ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
                SECENAI FC H743 V1
              </h3>
              <p className={`mt-1 text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                STM32H743 · Triple IMU · Dual Barometer · ArduPilot & PX4
              </p>
            </div>
            <ArrowRight className={`h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${isDark ? 'text-neon/40 group-hover:text-neon' : 'text-emerald-400 group-hover:text-emerald-600'}`} />
          </Link>

          {/* SECENAI EDU */}
          <Link
            to="/explore/secenai-edu"
            className={`glass-card group flex items-center justify-between rounded-2xl px-8 py-6 transition-all duration-300 mt-4 ${isDark ? 'hover:border-neon/20' : 'hover:border-emerald-300'
              }`}
          >
            <div>
              <span className={`text-xs font-bold tracking-[0.2em] uppercase ${isDark ? 'text-neon/60' : 'text-emerald-600'}`}>
                Education Flight Controller
              </span>
              <h3 className={`mt-1 font-[Outfit] text-xl font-semibold ${isDark ? 'text-white' : 'text-[#1e1b4b]'}`}>
                SECENAI EDU
              </h3>
              <p className={`mt-1 text-sm hidden sm:block ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                STM32H743 · Single IMU · Single Barometer · ArduPilot & PX4
              </p>
              <p className={`mt-1 text-sm sm:hidden ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                STM32H743 · ICM42688P · BMP581 · ArduPilot & PX4
              </p>
            </div>
            <ArrowRight className={`h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${isDark ? 'text-neon/40 group-hover:text-neon' : 'text-emerald-400 group-hover:text-emerald-600'}`} />
          </Link>
        </div>
      </section>
    </>
  );
}
