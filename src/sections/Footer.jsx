import {
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const platformLinks = [
  { name: 'Drone Telemetry', path: '/dashboard' },
  { name: 'AI Analytics', path: '/dashboard' },
  { name: 'IoT Monitoring', path: '/dashboard' },
  { name: 'Mission Planning', path: '/ground-control-suite' },
];

const solutionLinks = [
  { name: 'Defence Solutions', path: '/defence/gps-denied-navigation' },
  { name: 'GPS-Denied Navigation', path: '/defence/gps-denied-navigation' },
  { name: 'Flight Controller', path: '/flight-controller' },
];

const socialIcons = [
  { Icon: Github, href: '#', label: 'GitHub' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/company/secenai-semiconductors', label: 'LinkedIn' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
];

const contactInfo = [
  { Icon: Mail, text: 'info@secenai.com', href: 'https://mail.google.com/mail/?view=cm&to=info@secenai.com&su=General%20Inquiry', external: true },
  { Icon: Phone, text: '+91 95509 67278', href: 'tel:+919550967278' },
  { Icon: MapPin, text: 'Hyderabad, India' },
];

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const location = useLocation();

  const handleFooterLinkClick = (path) => {
    const [pathname, hash] = path.split('#');
    // If already on the same page, manually scroll to the section or top
    if (location.pathname === pathname) {
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigating to a different page — scroll to top so the new page starts from top
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <footer
      className={`border-t pt-20 pb-8 ${isDark
        ? 'border-white/5 bg-dark-950'
        : 'border-gray-200 bg-gray-50'
        }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-4">
          {/* Column 1 - Branding */}
          <div className="md:col-span-1">
            <a
              href="#"
              className="inline-block font-[Outfit] text-xl tracking-widest"
            >
              <span
                className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'
                  }`}
              >
                SECEN
              </span>
              <span
                className={`font-bold ${isDark ? 'text-neon' : 'text-emerald-600'
                  }`}
              >
                AI
              </span>
            </a>

            <p
              className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-white/30' : 'text-gray-500'
                }`}
            >
              AI-powered drone intelligence platform delivering real-time
              monitoring, aerial analytics, IoT integration, infrastructure
              inspection, precision agriculture insights, and enterprise-grade
              decision support.
            </p>

            <div className="mt-6 flex gap-4">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`transition-colors ${isDark
                    ? 'text-white/30 hover:text-neon'
                    : 'text-gray-400 hover:text-emerald-600'
                    }`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Platform */}
          <div>
            <h4
              className={`mb-4 text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'
                }`}
            >
              Platform
            </h4>

            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => handleFooterLinkClick(link.path)}
                    className={`text-sm transition-colors ${isDark
                      ? 'text-white/30 hover:text-neon'
                      : 'text-gray-500 hover:text-emerald-600'
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Solutions */}
          <div>
            <h4
              className={`mb-4 text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'
                }`}
            >
              Solutions
            </h4>

            <ul className="space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => handleFooterLinkClick(link.path)}
                    className={`text-sm transition-colors ${isDark
                      ? 'text-white/30 hover:text-neon'
                      : 'text-gray-500 hover:text-emerald-600'
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4
              className={`mb-4 text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'
                }`}
            >
              Contact
            </h4>

            <ul className="space-y-4">
              {contactInfo.map(({ Icon, text, href, external }) => (
                <li
                  key={text}
                  className="flex items-center gap-3"
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${isDark ? 'text-neon/50' : 'text-emerald-500'
                      }`}
                  />

                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`text-sm transition-colors ${isDark
                        ? 'text-white/30 hover:text-neon'
                        : 'text-gray-500 hover:text-emerald-600'
                        }`}
                    >
                      {text}
                    </a>
                  ) : (
                    <span
                      className={`text-sm transition-colors cursor-default ${isDark
                        ? 'text-white/30 hover:text-neon'
                        : 'text-gray-500 hover:text-emerald-600'
                        }`}
                    >
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row ${isDark ? 'border-white/5' : 'border-gray-200'
            }`}
        >
          <p
            className={`text-xs ${isDark ? 'text-white/20' : 'text-gray-400'
              }`}
          >
            © 2026 SecenAI. All rights reserved.
          </p>

          <div
            className={`flex items-center gap-1 text-xs ${isDark ? 'text-white/20' : 'text-gray-400'
              }`}
          >
            <a
              href="#"
              className={`transition-colors ${isDark
                ? 'hover:text-white/40'
                : 'hover:text-gray-600'
                }`}
            >
              Privacy Policy
            </a>

            <span>·</span>

            <a
              href="#"
              className={`transition-colors ${isDark
                ? 'hover:text-white/40'
                : 'hover:text-gray-600'
                }`}
            >
              Terms of Service
            </a>

            <span>·</span>

            <a
              href="#"
              className={`transition-colors ${isDark
                ? 'hover:text-white/40'
                : 'hover:text-gray-600'
                }`}
            >
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}