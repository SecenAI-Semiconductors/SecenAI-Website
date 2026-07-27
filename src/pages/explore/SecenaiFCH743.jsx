import { useEffect } from 'react';
import FlightControllerHero from '../../components/flight-controller/FlightControllerHero';
import ProcessorSection from '../../components/flight-controller/ProcessorSection';
import TripleIMUSection from '../../components/flight-controller/TripleIMUSection';
import DualBarometerSection from '../../components/flight-controller/DualBarometerSection';
import SensorArchitectureSection from '../../components/flight-controller/SensorArchitectureSection';
import ConnectivitySection from '../../components/flight-controller/ConnectivitySection';
import PowerFirmwareSection from '../../components/flight-controller/PowerFirmwareSection';
import TechnicalSpecifications from '../../components/flight-controller/TechnicalSpecifications';
import MechanicalDesignSection from '../../components/flight-controller/MechanicalDesignSection';
import DocumentationCTA from '../../components/flight-controller/DocumentationCTA';

export default function SecenaiFCH743() {
  useEffect(() => {
    document.title = 'SECENAI FC H743 V1 — High-Performance Flight Controller | SecenAI';
    return () => { document.title = 'SecenAI'; };
  }, []);

  return (
    <>
      <FlightControllerHero />
      <ProcessorSection />
      <TripleIMUSection />
      <DualBarometerSection />
      <SensorArchitectureSection />
      <ConnectivitySection />
      <PowerFirmwareSection />
      <TechnicalSpecifications />
      <MechanicalDesignSection />
      <DocumentationCTA />
    </>
  );
}
