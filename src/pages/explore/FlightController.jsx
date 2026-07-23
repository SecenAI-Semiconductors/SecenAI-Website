import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PlaceholderPage from '../../components/PlaceholderPage';
import SecenaiFCH743 from '../../components/SecenaiFCH743';

export default function FlightController() {
  const { hash } = useLocation();

  // Scroll to the target section when navigating with a hash
  useEffect(() => {
    if (hash) {
      // Small delay to allow DOM to paint before scrolling
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
        description="SECENAI’s custom-designed flight controllers deliver unmatched performance for autonomous UAV operations. Explore our range of flight controller variants engineered for different mission profiles."
      />
      <SecenaiFCH743 />
    </>
  );
}
