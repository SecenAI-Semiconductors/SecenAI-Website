import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ProductsHero from '../sections/ProductsHero';
import ProductLineup from '../sections/ProductLineup';
import SolutionsDeepDive from '../sections/SolutionsDeepDive';
import PlatformTechStack from '../sections/PlatformTechStack';
import ComparisonTable from '../sections/ComparisonTable';
import ProductsCTA from '../sections/ProductsCTA';

export default function Products() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <>
      <ProductsHero isDark={isDark} />
      <ProductLineup isDark={isDark} />
      <SolutionsDeepDive isDark={isDark} />
      <PlatformTechStack isDark={isDark} />
      <ComparisonTable isDark={isDark} />
      <ProductsCTA isDark={isDark} />
    </>
  );
}
