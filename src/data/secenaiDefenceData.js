/* ── Logo assets (reuse existing) ── */
import ardupilotLogoImg from '../assets/flight-controller/ardupilot-logo.png';
import px4LogoImg from '../assets/flight-controller/px4-logo.png';

/**
 * SECENAI Defence Flight Controller — Product Data
 * All copy, specifications, and section metadata for the dedicated Defence product page.
 * Content remains at a public capability level — no internal implementation details.
 */

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

export const defenceHeroData = {
  badge: 'Mission-Focused Flight Controller',
  heading: 'Resilient Flight Control for Demanding UAV Operations',
  primaryDescription:
    'A high-performance flight-control platform developed for specialised UAV integration, resilient autonomous operation, and demanding mission environments.',
  secondaryDescription:
    'Built on the engineering foundation of the SECENAI flight-control platform, it combines real-time processing, resilient sensing, protected power architecture, advanced fault management, and flexible mission-system integration.',
  badges: [
    'Real-Time Processing',
    'Resilient Sensing',
    'Fault Management',
    'Protected Power',
    'Mission Integration',
    'Open Autopilot Ecosystem',
  ],
  productImage: null, // Placeholder until approved Defence render is available
};

/* ═══════════════════════════════════════════
   OVERVIEW
   ═══════════════════════════════════════════ */

export const defenceOverviewData = {
  badge: 'Platform Overview',
  title: 'Engineered for Mission Resilience',
  description:
    'SECENAI Defence is a mission-focused flight-control platform designed for UAV systems requiring reliable processing, resilient sensing, protected power management, flexible peripheral connectivity, and controlled system integration. Its architecture supports demanding multirotor, fixed-wing, VTOL, and custom unmanned platforms without exposing mission-specific implementation details.',

  capabilityStrip: [
    { label: 'High-Performance Processing' },
    { label: 'Multi-Sensor Resilience' },
    { label: 'Automatic Fault Response' },
    { label: 'Protected Power Management' },
    { label: 'Mission-System Connectivity' },
    { label: 'Flight-Data Monitoring' },
  ],

  integrationTitle: 'Designed Around Reliable Integration',
  integrationHighlights: [
    'PCB-level vibration-isolation considerations',
    'Enclosure-level vibration isolation',
    'EMI-aware hardware design',
    'Optimised signal routing',
    'Compact integration-focused architecture',
    'Designed for reliable continuous operation',
  ],
};

/* ═══════════════════════════════════════════
   PROCESSING
   ═══════════════════════════════════════════ */

export const defenceProcessingData = {
  badge: 'Processing Core',
  title: 'High-Performance Real-Time Processing',
  description:
    'The processing platform provides the real-time computational capability required for flight control, navigation, system-health monitoring, telemetry management, payload coordination, and integration with external mission computers.',

  capabilities: [
    'High-performance STM32H7-class architecture',
    'ARM Cortex-M7 real-time processing',
    'Hardware floating-point acceleration',
    'DSP instruction support',
    'Deterministic flight-control execution',
    'Support for advanced UAV-control algorithms',
    'Simultaneous navigation and system-health processing',
    'Telemetry and peripheral coordination',
    'Companion-computer communication',
    'Designed for reliable continuous operation',
  ],

  flowSteps: [
    'Navigation Inputs',
    'Real-Time Processing',
    'Flight Control',
    'Vehicle Outputs',
  ],
};

/* ═══════════════════════════════════════════
   SENSOR ARCHITECTURE
   ═══════════════════════════════════════════ */

export const defenceSensorData = {
  badge: 'Sensor Architecture',
  title: 'Resilient Multi-Sensor Architecture',
  description:
    'The sensor architecture is designed to compare multiple sensor observations, detect inconsistent behaviour, isolate affected measurements, and support continued flight-state estimation under defined fault conditions.',

  capabilities: [
    'Multiple inertial sensing elements',
    'Redundant atmospheric-pressure sensing',
    'Sensor voting',
    'Automatic IMU failover',
    'IMU fault isolation',
    'Continuous sensor consistency monitoring',
    'Multi-source flight-state validation',
    'Optimised sensor placement',
    'PCB vibration isolation',
    'Enclosure vibration isolation',
    'External navigation-sensor integration',
    'External magnetometer integration',
  ],

  flowSteps: [
    'Inertial Sensors',
    'Sensor Comparison',
    'Validated Flight Estimate',
  ],
};

/* ═══════════════════════════════════════════
   FAULT MANAGEMENT
   ═══════════════════════════════════════════ */

export const defenceFaultData = {
  badge: 'Fault Management',
  title: 'Intelligent Fault Detection and Controlled Response',
  description:
    'The flight-control architecture continuously evaluates system and sensor health, enabling abnormal behaviour to be identified and managed through controlled fault-response mechanisms.',

  capabilities: [
    'Continuous sensor-health monitoring',
    'Multi-source data validation',
    'Sensor voting',
    'Automatic IMU failover',
    'IMU fault isolation',
    'Abnormal-data detection',
    'Fault-event recording',
    'Configurable failsafe support',
    'System-health reporting',
    'Controlled degradation under defined fault conditions',
    'Flight-status monitoring',
    'Maintenance-oriented diagnostics',
  ],

  flowSteps: [
    'Sensor Inputs',
    'Health Monitoring',
    'Consistency Evaluation',
    'Fault Isolation',
    'Validated Flight Estimate',
  ],
};

/* ═══════════════════════════════════════════
   POWER ARCHITECTURE
   ═══════════════════════════════════════════ */

export const defencePowerData = {
  badge: 'Power Architecture',
  title: 'Protected and Monitored Power Architecture',
  description:
    'The power architecture is designed to maintain stable controller operation during power-source variation and demanding platform conditions while continuously monitoring essential electrical parameters.',

  management: [
    { title: 'Multiple power-source support', description: 'Supports multiple external power inputs for reliable operation.' },
    { title: 'Automatic source management', description: 'Seamless power-source management for continuous operation.' },
    { title: 'Input-voltage monitoring', description: 'Continuous monitoring of input voltage levels.' },
    { title: 'Current monitoring', description: 'Real-time current measurement for power management.' },
    { title: 'Regulated internal power rails', description: 'Stable internal regulation for consistent system operation.' },
    { title: 'Power-health reporting', description: 'Continuous power-system health data for telemetry and diagnostics.' },
    { title: 'Battery monitoring support', description: 'Battery voltage and current monitoring for power management.' },
  ],

  protection: [
    { title: 'Reverse-polarity protection', description: 'Protection against incorrect power-supply connections.' },
    { title: 'Surge protection', description: 'Transient voltage suppression across critical power paths.' },
    { title: 'Transient protection', description: 'Protection against electrical transients on power and signal lines.' },
    { title: 'ESD protection', description: 'Electrostatic discharge protection across interfaces.' },
    { title: 'Overcurrent protection', description: 'Protection against excessive current draw conditions.' },
    { title: 'Protected peripheral interfaces', description: 'Electrical protection on peripheral connectivity interfaces.' },
    { title: 'Stable internal regulation', description: 'Clean regulated power for processor and sensor systems.' },
  ],

  flowSteps: [
    'Power Sources',
    'Protection and Monitoring',
    'Regulated Controller Power',
  ],
};

/* ═══════════════════════════════════════════
   CONNECTIVITY
   ═══════════════════════════════════════════ */

export const defenceConnectivityData = {
  badge: 'Connectivity',
  title: 'Flexible UAV and Peripheral Connectivity',
  description:
    'SECENAI Defence supports flexible integration with navigation systems, telemetry radios, companion computers, payload controllers, propulsion systems, RC receivers, and standard UAV peripherals.',

  capabilities: [
    'Multiple serial communication interfaces',
    'CAN-based peripheral connectivity',
    'I²C expansion',
    'SPI-based system integration',
    'PWM motor-control support',
    'Digital motor-protocol support',
    'GPS integration',
    'External-compass support',
    'Telemetry-radio compatibility',
    'Dedicated RC receiver integration',
    'USB configuration access',
    'Firmware update support',
    'Companion-computer connectivity',
    'Payload-system integration',
    'Standard UAV peripheral compatibility',
  ],

  peripherals: [
    'GNSS',
    'Telemetry',
    'Companion Computer',
    'Payloads',
    'RC Input',
    'Vehicle Systems',
    'Power Monitoring',
  ],
};

/* ═══════════════════════════════════════════
   MISSION INTEGRATION
   ═══════════════════════════════════════════ */

export const defenceMissionData = {
  badge: 'System Integration',
  title: 'Navigation and Mission-System Integration',
  description:
    'The platform is designed to integrate with external visual, inertial, satellite-based, and alternative-navigation systems for specialised mission requirements.',

  navigation: [
    'Satellite navigation',
    'External compass',
    'Airspeed sensing',
    'Range sensing',
    'Alternative navigation sources',
    'Companion-computer navigation input',
  ],

  mission: [
    'Telemetry systems',
    'Payload controllers',
    'Companion computers',
    'Ground-control systems',
    'Vehicle-status monitoring',
    'Custom peripheral integration',
  ],
};

/* ═══════════════════════════════════════════
   SOFTWARE AND MONITORING
   ═══════════════════════════════════════════ */

export const defenceSoftwareData = {
  badge: 'Software & Monitoring',
  title: 'Open Autopilot Compatibility and System Monitoring',
  description:
    'SECENAI Defence is compatible with established open-autopilot ecosystems and provides comprehensive system-monitoring capabilities for operational reliability.',

  platforms: [
    {
      name: 'ArduPilot',
      description: 'Open-source autopilot software supporting multirotor, fixed-wing, VTOL, and other autonomous vehicle types.',
      url: 'https://ardupilot.org',
      logo: ardupilotLogoImg,
    },
    {
      name: 'PX4',
      description: 'Open-source flight control software for drones and autonomous vehicles with a modular architecture.',
      url: 'https://px4.io',
      logo: px4LogoImg,
    },
  ],

  softwareCapabilities: [
    'ArduPilot compatibility',
    'PX4 compatibility',
    'MAVLink ecosystem integration',
    'Mission Planner support',
    'QGroundControl support',
    'Companion-computer integration',
    'Custom firmware integration',
    'Configurable vehicle setup',
    'Configurable peripheral integration',
    'Support for established UAV software workflows',
  ],

  ecosystemTools: [
    'MAVLink Protocol',
    'Mission Planner',
    'QGroundControl',
  ],

  validationNotice:
    'Compatibility depends on the selected firmware build, board configuration, peripheral setup, and project-specific integration requirements.',

  monitoringCapabilities: [
    { title: 'High-speed flight-data logging', description: 'Fast data capture for flight analysis and post-flight review.' },
    { title: 'Sensor-health monitoring', description: 'Continuous monitoring of sensor system health and performance.' },
    { title: 'Power-system monitoring', description: 'Real-time monitoring of power-system parameters and status.' },
    { title: 'Fault-event recording', description: 'Persistent recording of fault events for diagnostics and review.' },
    { title: 'Failsafe reporting', description: 'Reporting of failsafe activations and system-state transitions.' },
    { title: 'System-status reporting', description: 'Comprehensive system-status data for telemetry and ground control.' },
    { title: 'Configurable diagnostic information', description: 'Configurable diagnostic data streams for system analysis.' },
    { title: 'Post-flight analysis support', description: 'Flight-data support for post-flight review and optimisation.' },
    { title: 'Maintenance support', description: 'Diagnostic data to support maintenance planning and scheduling.' },
    { title: 'Test and validation support', description: 'Data logging and reporting capabilities for test and validation workflows.' },
  ],
};

/* ═══════════════════════════════════════════
   APPLICATIONS
   ═══════════════════════════════════════════ */

export const defenceApplicationsData = {
  badge: 'Applications',
  title: 'Designed for Specialised UAV Platforms',
  description:
    'SECENAI Defence is intended for advanced UAV platforms requiring reliable control, resilient system architecture, flexible integration, and continuous system-health monitoring.',

  applicationAreas: [
    'Surveillance and observation UAVs',
    'Border and perimeter-monitoring platforms',
    'Infrastructure-security UAVs',
    'Emergency-response platforms',
    'Long-endurance fixed-wing systems',
    'Autonomous VTOL platforms',
    'Specialised payload-carrying UAVs',
    'Research and technology demonstrators',
    'Custom unmanned aerial systems',
    'Defence and aerospace integration projects',
    'Industrial monitoring UAVs',
    'Government and institutional research platforms',
  ],

  vehicleCategories: [
    'Multirotor UAVs',
    'Fixed-wing aircraft',
    'VTOL platforms',
    'Custom airframes',
    'Research aircraft',
    'Autonomous aerial platforms',
    'Specialised unmanned platforms',
  ],

  whyDefence: [
    { title: 'Built on SECENAI engineering', description: 'Built on the SECENAI flight-control engineering foundation.' },
    { title: 'High-performance processing', description: 'High-performance real-time processing for demanding control algorithms.' },
    { title: 'Resilient sensing', description: 'Resilient multi-sensor architecture with voting and fault isolation.' },
    { title: 'Automatic IMU failover', description: 'Automatic failover and fault isolation for inertial sensing.' },
    { title: 'Protected power', description: 'Protected and monitored power architecture for stable operation.' },
    { title: 'Vibration isolation', description: 'PCB and enclosure vibration-isolation considerations.' },
    { title: 'Flexible integration', description: 'Flexible navigation, telemetry, and companion-computer integration.' },
    { title: 'Payload support', description: 'Payload-system integration for specialised missions.' },
    { title: 'Flight-data monitoring', description: 'Flight-data and fault-event monitoring for diagnostics.' },
    { title: 'Multi-platform support', description: 'Support for multirotor, fixed-wing, VTOL, and custom UAVs.' },
    { title: 'Open autopilot ecosystem', description: 'Compatible with established open-autopilot ecosystems.' },
    { title: 'Controlled integration', description: 'Designed for controlled mission-system integration.' },
  ],

  tagline: 'Engineered for resilient control. Designed for demanding missions. Built for specialised system integration.',
};
