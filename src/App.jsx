import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import ParticleGrid from './components/ParticleGrid'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import About from './pages/About'
import Footer from './sections/Footer'

// Explore Us pages
import FlightController from './pages/explore/FlightController'
import GroundControlSuite from './pages/explore/GroundControlSuite'
import Dashboard from './pages/explore/Dashboard'
import Defence from './pages/explore/Defence'

function App() {
  const { theme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleClick = (e) => {
      const href = e.target.closest('a')?.getAttribute('href')
      if (href?.startsWith('#')) {
        e.preventDefault()
        const el = document.querySelector(href)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Scroll to top on route change (skip when hash is present)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  const isDark = theme === 'dark'

  return (
    <AnimatePresence>
      <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-400 ${isDark ? 'bg-dark-950 text-white' : 'bg-gray-50 text-gray-900'
        }`}>
        {/* Ambient particle grid background — dark mode only */}
        {isDark && (
          <div className="fixed inset-0 z-0 pointer-events-none">
            <ParticleGrid />
          </div>
        )}

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/about" element={<About />} />

            {/* Explore Us routes */}
            <Route path="/flight-controller" element={<FlightController />} />
            <Route path="/ground-control-suite" element={<GroundControlSuite />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/defence" element={<Defence />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </AnimatePresence>
  )
}

export default App
