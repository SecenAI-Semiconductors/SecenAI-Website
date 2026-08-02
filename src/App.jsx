import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
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
import SecenaiFCH743Page from './pages/explore/SecenaiFCH743'
import SecenaiEduPage from './pages/explore/SecenaiEdu'
import SecenaiDefencePage from './pages/explore/SecenaiDefence'

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

            {/* Product detail pages */}
            <Route path="/explore/secenai-fc-h743-v1" element={<SecenaiFCH743Page />} />
            <Route path="/products/secenai-fc-h743-v1" element={<Navigate to="/explore/secenai-fc-h743-v1" replace />} />
            <Route path="/explore/secenai-edu" element={<SecenaiEduPage />} />
            <Route path="/flight-controller/secenai-edu" element={<Navigate to="/explore/secenai-edu" replace />} />
            <Route path="/explore/secenai-defence" element={<SecenaiDefencePage />} />
            <Route path="/flight-controller/secenai-defence" element={<Navigate to="/explore/secenai-defence" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </AnimatePresence>
  )
}

export default App
