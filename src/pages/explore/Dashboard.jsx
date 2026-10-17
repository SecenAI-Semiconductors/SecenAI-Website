import { useEffect } from 'react';
import DashboardHero from '../../components/dashboard/DashboardHero';
import LifeCycleAssure from '../../sections/LifeCycleAssure';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Agriculture Dashboard | SecenAI';
    return () => { document.title = 'SecenAI'; };
  }, []);

  return (
    <>
      <DashboardHero />
      <LifeCycleAssure />
    </>
  );
}
