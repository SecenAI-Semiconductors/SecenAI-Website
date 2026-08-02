import { useEffect } from 'react';
import EduHero from '../../components/secenai-edu/EduHero';
import EduOverview from '../../components/secenai-edu/EduOverview';
import EduProcessing from '../../components/secenai-edu/EduProcessing';
import EduNavigation from '../../components/secenai-edu/EduNavigation';
import EduRcAndMotor from '../../components/secenai-edu/EduRcAndMotor';
import EduConnectivity from '../../components/secenai-edu/EduConnectivity';
import EduPowerAndProtection from '../../components/secenai-edu/EduPowerAndProtection';
import EduLoggingAndDeveloperTools from '../../components/secenai-edu/EduLoggingAndDeveloperTools';
import EduSoftwareCompatibility from '../../components/secenai-edu/EduSoftwareCompatibility';
import EduApplications from '../../components/secenai-edu/EduApplications';

export default function SecenaiEdu() {
  useEffect(() => {
    document.title = 'SECENAI EDU — Education Flight Controller | SecenAI';
    return () => { document.title = 'SecenAI'; };
  }, []);

  return (
    <>
      <EduHero />
      <EduOverview />
      <EduProcessing />
      <EduNavigation />
      <EduRcAndMotor />
      <EduConnectivity />
      <EduPowerAndProtection />
      <EduLoggingAndDeveloperTools />
      <EduSoftwareCompatibility />
      <EduApplications />
    </>
  );
}
