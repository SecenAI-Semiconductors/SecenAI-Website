import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown, ChevronRight, Cpu, Monitor, LayoutDashboard, Shield } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

/* ═══════════════════════════════════════════
   NAV LINKS DATA
   ═══════════════════════════════════════════ */

const navLinks = [
  { label: "Home", href: "/#home" }, // Changed to include root path base
  { label: "About", href: "/about", isRoute: true },
  { label: "Explore Us", hasDropdown: true },
  { label: "Careers", href: "/careers", isRoute: true },
  { label: "Contact", href: "/contact", isRoute: true },
];

/* ═══════════════════════════════════════════
   DROPDOWN DATA — Our Products & Services
   ═══════════════════════════════════════════ */

const dropdownCategories = [
  {
    title: "Flight Controller",
    icon: Cpu,
    href: "/flight-controller",
    items: [
      { label: "SECENAI FC H743 V1", href: "/flight-controller#secenai-fc-h743" },
      { label: "Edu/Light Version", href: "/flight-controller#edu-light" },
      { label: "Defence-Grade Version", href: "/flight-controller#defence" },
    ],
  },
  {
    title: "Ground Control Suite",
    icon: Monitor,
    href: "/ground-control-suite",
    items: [
      { label: "Industrial", href: "/ground-control-suite#industrial" },
      { label: "Enterprise", href: "/ground-control-suite#enterprise" },
      { label: "Defence", href: "/ground-control-suite#defence" },
    ],
  },
  {
    title: "Our Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    items: [],
  },
  {
    title: "Defence Solutions",
    icon: Shield,
    href: "/defence",
    items: [
      { label: "GPS-Denied Navigation", href: "/defence#gps-denied" },
      { label: "Edge AI-Based VIO", href: "/defence#edge-ai-vio" },
    ],
  },
];

/* ═══════════════════════════════════════════
   DESKTOP NAV LINK (unchanged for non-dropdown)
   ═══════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════
   DESKTOP DROPDOWN (vertical, click-to-open)
   ═══════════════════════════════════════════ */

function DropdownCategory({ category, isDark, onNavigate }) {
  const [expanded, setExpanded] = useState(false);
  const CatIcon = category.icon;
  const hasSubItems = category.items.length > 0;

  // No sub-items — render as a direct link
  if (!hasSubItems && category.href) {
    return (
      <button
        onClick={() => onNavigate(category.href)}
        className={`mega-dropdown-item w-full text-left ${isDark ? "!text-white/70 hover:!text-neon" : "!text-gray-700 hover:!text-emerald-600"}`}
      >
        <CatIcon className={`h-4 w-4 shrink-0 ${isDark ? "text-neon/60" : "text-emerald-500"}`} />
        <span className="flex-1 font-medium">{category.title}</span>
      </button>
    );
  }

  // Has sub-items — render as accordion
  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`mega-dropdown-item w-full text-left ${isDark ? "!text-white/70 hover:!text-neon" : "!text-gray-700 hover:!text-emerald-600"}`}
      >
        <CatIcon className={`h-4 w-4 shrink-0 ${isDark ? "text-neon/60" : "text-emerald-500"}`} />
        <span className="flex-1 font-medium">{category.title}</span>
        <ChevronDown className={`h-3 w-3 shrink-0 opacity-50 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`flex flex-col gap-0.5 ml-5 pl-3 my-1 border-l ${isDark ? "border-white/8" : "border-gray-200"}`}>
              {/* Parent overview link if available */}
              {category.href && (
                <button
                  onClick={() => onNavigate(category.href)}
                  className="mega-dropdown-item w-full text-left text-xs"
                >
                  <span>Overview</span>
                </button>
              )}
              {category.items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.href)}
                  className="mega-dropdown-item w-full text-left text-xs"
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExploreUsDesktop({ isDark }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleNavigate = (href) => {
    setOpen(false);
    navigate(href);
  };

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`relative py-2 text-sm tracking-wide transition-colors duration-300 flex items-center gap-1 ${isDark
          ? "text-white/70 hover:text-neon"
          : "text-gray-600 hover:text-emerald-700"
          }`}
      >
        Explore Us
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mega-dropdown absolute top-full left-0 mt-3 rounded-xl p-2 min-w-[240px] w-max"
          >
            {/* Small triangle pointer */}
            <div className={`absolute -top-1.5 left-6 w-3 h-3 rotate-45 ${isDark ? "bg-dark-900 border-l border-t border-white/6" : "bg-white border-l border-t border-black/8"}`} />

            <div className="flex flex-col gap-0.5">
              {dropdownCategories.map((cat) => (
                <DropdownCategory
                  key={cat.title}
                  category={cat}
                  isDark={isDark}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MOBILE ACCORDION SUB-SECTION
   ═══════════════════════════════════════════ */

function MobileAccordionCategory({ category, isDark, onItemClick }) {
  const [expanded, setExpanded] = useState(false);
  const CatIcon = category.icon;
  const hasSubItems = category.items.length > 0;

  // If the category has no sub-items, render it as a direct link with same styling as expandable items
  if (!hasSubItems && category.href) {
    return (
      <Link
        to={category.href}
        className={`flex items-center justify-between w-full text-sm font-semibold tracking-wider uppercase py-2 ${isDark ? "text-white/40" : "text-gray-400"}`}
      >
        <span className="flex items-center gap-2">
          <CatIcon className={`h-3.5 w-3.5 ${isDark ? "text-neon/50" : "text-emerald-500"}`} />
          {category.title}
        </span>
        <ChevronRight className="h-3.5 w-3.5 opacity-40" />
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center justify-between w-full text-sm font-semibold tracking-wider uppercase py-2 ${isDark ? "text-white/40" : "text-gray-400"}`}
      >
        <span className="flex items-center gap-2">
          <CatIcon className={`h-3.5 w-3.5 ${isDark ? "text-neon/50" : "text-emerald-500"}`} />
          {category.title}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="mobile-accordion-content"
          >
            <div className="flex flex-col gap-0.5 pb-2">
              {/* Parent page link if available */}
              {category.href && (
                <Link
                  to={category.href}
                  className={`mobile-sub-item ${isDark ? "text-white/60" : "text-gray-600"}`}
                >
                  <span>Overview</span>
                  <ChevronRight className="h-3 w-3 opacity-40 ml-auto" />
                </Link>
              )}
              {category.items.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`mobile-sub-item ${isDark ? "text-white/60" : "text-gray-600"}`}
                >
                  <span className="flex-1">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MOBILE EXPLORE US ACCORDION
   ═══════════════════════════════════════════ */

function MobileExploreUs({ isDark, onClose, motionProps }) {
  const [expanded, setExpanded] = useState(false);

  const mobileClassName = `text-2xl font-[Outfit] font-medium py-3 border-b transition-colors flex items-center justify-between ${isDark
    ? "text-white/80 hover:text-neon border-white/5"
    : "text-gray-700 hover:text-emerald-600 border-gray-100"
    }`;

  return (
    <motion.div {...motionProps}>
      <button
        onClick={() => setExpanded(!expanded)}
        className={mobileClassName + " w-full"}
      >
        <span>Explore Us</span>
        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mobile-accordion-content"
          >
            <div className={`py-3 pl-2 space-y-3 ${isDark ? "border-b border-white/5" : "border-b border-gray-100"}`}>
              {dropdownCategories.map((cat) => (
                <MobileAccordionCategory
                  key={cat.title}
                  category={cat}
                  isDark={isDark}
                  onItemClick={onClose}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN NAVBAR COMPONENT
   ═══════════════════════════════════════════ */

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

  // Close mobile menu and reset scroll when route changes
  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  }, [location.pathname]);

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
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return <ExploreUsDesktop key={link.label} isDark={isDark} />;
              }
              return (
                <NavLink key={link.label} label={link.label} href={link.href} isDark={isDark} isRoute={link.isRoute} />
              );
            })}
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
              <div className="flex flex-col justify-center flex-1 px-10 gap-2 pt-24 overflow-y-auto">
                {navLinks.map((link, i) => {
                  const motionProps = {
                    initial: { opacity: 0, x: 40 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: 40 },
                    transition: { delay: 0.1 + i * 0.05, duration: 0.4 },
                  };

                  // Render accordion for Explore Us
                  if (link.hasDropdown) {
                    return (
                      <MobileExploreUs
                        key={link.label}
                        isDark={isDark}
                        onClose={() => setMobileOpen(false)}
                        motionProps={motionProps}
                      />
                    );
                  }

                  const mobileClassName = `text-2xl font-[Outfit] font-medium py-3 border-b transition-colors ${isDark
                    ? "text-white/80 hover:text-neon border-white/5"
                    : "text-gray-700 hover:text-emerald-600 border-gray-100"
                    }`;

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
                        if (location.pathname !== "/") {
                          e.preventDefault();
                          navigate(link.href);
                        }
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
                  SECEN<span className={isDark ? "text-neon/40" : "text-emerald-600/40"}>AI</span> © 2026
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}   