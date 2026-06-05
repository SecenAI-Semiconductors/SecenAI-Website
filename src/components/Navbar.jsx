import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "Home", href: "/#home" }, // Changed to include root path base
  { label: "About", href: "/about", isRoute: true },
  { label: "Products", href: "/products", isRoute: true },
  { label: "Careers", href: "/careers", isRoute: true },
  { label: "Contact", href: "/contact", isRoute: true },
];

function NavLink({ label, href, isDark, isRoute }) {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const className = `relative py-2 text-sm tracking-wide transition-colors duration-300 ${isDark
    ? "text-white/70 hover:text-neon"
    : "text-gray-600 hover:text-emerald-700"
    }`;

  // Handle cross-page section scrolling safely
  const handleHashClick = (e, targetHref) => {
    if (isRoute) return; // If it's a structural route page, pass through normal logic

    // If the user is not on the homepage and clicks a hash link, force path navigation back home
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate(targetHref);
    }
  };

  const content = (
    <>
      {label}
      <AnimatePresence>
        {hovered && (
          <motion.span
            layoutId="nav-underline"
            className={`absolute -bottom-0.5 left-0 h-px w-full ${isDark ? "bg-neon" : "bg-emerald-600"
              }`}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1, originX: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </>
  );

  if (isRoute) {
    return (
      <Link
        to={href}
        className={className}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => handleHashClick(e, href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {content}
    </a>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Handle Logo clicks across page boundaries smoothly
  const handleLogoClick = (e) => {
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate("/#home");
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
          ? isDark
            ? "bg-dark-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10"
            : "bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-lg shadow-black/5"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo - Cross Page Hash Logic Enabled */}
          <a
            href="/#home"
            onClick={handleLogoClick}
            className="flex items-center gap-0.5 font-[Outfit] text-xl tracking-widest"
          >
            <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>SECEN</span>
            <span className={`font-bold ${isDark ? "text-neon" : "text-emerald-600"}`}>AI</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.label} label={link.label} href={link.href} isDark={isDark} isRoute={link.isRoute} />
            ))}
          </div>

          {/* Desktop Right Side: Theme Toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isDark
                ? "bg-white/10 hover:bg-white/15 text-white/70 hover:text-neon"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-emerald-600"
                }`}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -90, scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* CTA Button */}
            <Link
              to="/contact"
              className={`font-semibold px-6 py-2.5 rounded-full text-sm hover:shadow-lg transition-all duration-300 inline-block ${isDark ? 'bg-neon text-dark-950 hover:shadow-neon/20' : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-600/20'}`}
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Actions Button Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isDark ? "bg-white/10 text-white/70" : "bg-gray-100 text-gray-600"
                }`}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`relative z-50 p-2 transition-colors ${isDark ? "text-white/80 hover:text-neon" : "text-gray-700 hover:text-emerald-600"
                }`}
              aria-label="Toggle navigation menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              className={`absolute inset-0 backdrop-blur-2xl ${isDark ? "bg-dark-950/90" : "bg-white/90"
                }`}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`absolute top-0 right-0 w-full max-w-sm h-full backdrop-blur-xl border-l flex flex-col ${isDark ? "bg-dark-900/95 border-white/5" : "bg-white/95 border-gray-200"
                }`}
            >
              <div className="flex flex-col justify-center flex-1 px-10 gap-2 pt-24">
                {navLinks.map((link, i) => {
                  const mobileClassName = `text-2xl font-[Outfit] font-medium py-3 border-b transition-colors ${isDark
                    ? "text-white/80 hover:text-neon border-white/5"
                    : "text-gray-700 hover:text-emerald-600 border-gray-100"
                    }`;
                  const motionProps = {
                    initial: { opacity: 0, x: 40 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: 40 },
                    transition: { delay: 0.1 + i * 0.05, duration: 0.4 },
                  };

                  if (link.isRoute) {
                    return (
                      <motion.div key={link.label} {...motionProps}>
                        <Link
                          to={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={mobileClassName}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      {...motionProps}
                      onClick={(e) => {
                        setMobileOpen(false);
                        handleHashClick(e, link.href);
                      }}
                      className={mobileClassName}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className={`mt-8 font-semibold px-8 py-4 rounded-full text-center text-base hover:shadow-lg transition-all duration-300 block ${isDark ? 'bg-neon text-dark-950 hover:shadow-neon/20' : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-600/20'}`}
                  >
                    Get Quote
                  </Link>
                </motion.div>
              </div>

              <div className="px-10 pb-10">
                <p className={`text-xs tracking-widest font-[Outfit] ${isDark ? "text-white/20" : "text-gray-400"}`}>
                  AERO<span className={isDark ? "text-neon/40" : "text-emerald-600/40"}>VAULT</span> © 2026
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}   