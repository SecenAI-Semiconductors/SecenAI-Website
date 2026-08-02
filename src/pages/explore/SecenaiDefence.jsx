import { useEffect } from 'react';

// Components
import DefenceHero from '../../components/secenai-defence/DefenceHero';
import DefenceOverview from '../../components/secenai-defence/DefenceOverview';
import DefenceProcessing from '../../components/secenai-defence/DefenceProcessing';
import DefenceSensorArchitecture from '../../components/secenai-defence/DefenceSensorArchitecture';
import DefenceFaultManagement from '../../components/secenai-defence/DefenceFaultManagement';
import DefencePowerArchitecture from '../../components/secenai-defence/DefencePowerArchitecture';
import DefenceConnectivity from '../../components/secenai-defence/DefenceConnectivity';
import DefenceMissionIntegration from '../../components/secenai-defence/DefenceMissionIntegration';
import DefenceSoftwareMonitoring from '../../components/secenai-defence/DefenceSoftwareMonitoring';
import DefenceApplications from '../../components/secenai-defence/DefenceApplications';

export default function SecenaiDefencePage() {
  // Set page title
  useEffect(() => {
    document.title = 'SECENAI Defence Flight Controller | SECENAI Flight Systems';
    return () => {
      document.title = 'AeroVault | Flight Control Systems';
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-dark-950">
      <DefenceHero />
      <DefenceOverview />
      <DefenceProcessing />
      <DefenceSensorArchitecture />
      <DefenceFaultManagement />
      <DefencePowerArchitecture />
      <DefenceConnectivity />
      <DefenceMissionIntegration />
      <DefenceSoftwareMonitoring />
      <DefenceApplications />
    </main>
  );
}
