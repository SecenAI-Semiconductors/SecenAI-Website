/* ── Logo assets (reuse existing) ── */
import ardupilotLogoImg from '../assets/flight-controller/ardupilot-logo.png';
import px4LogoImg from '../assets/flight-controller/px4-logo.png';

/**
 * SECENAI EDU — Product Data
 * All copy, specifications, and section metadata for the dedicated EDU product page.
 * This is the education / light flight controller — single IMU, single barometer.
 */

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

export const eduHeroData = {
  badge: 'Education Flight Controller',
  title: 'SECENAI EDU',
  heading: 'The Modern Flight Controller for Learning, Building, and Innovating',
  description:
    'The SECENAI EDU is a cost-effective STM32H743-based flight controller designed for students, makers, educational institutions, drone enthusiasts, and research laboratories. It delivers modern performance, reliable sensing, flexible connectivity, electrical protection, and open-autopilot compatibility without the complexity of enterprise-grade sensor redundancy.',
  badges: [
    'STM32H743',
    'ArduPilot',
    'PX4',
    'DroneCAN',
    'USB Type-C',
  ],
  productImage: null, // Placeholder until real image is provided
};

/* ═══════════════════════════════════════════
   OVERVIEW
   ═══════════════════════════════════════════ */

export const eduOverviewData = {
  badge: 'Product Overview',
  title: 'Modern flight control, simplified',
  description:
    'SECENAI EDU combines a high-performance processor, reliable sensors, and flexible connectivity in a compact, cost-effective package optimised for education and prototyping.',

  specStrip: [
    { value: '480 MHz', label: 'Processor' },
    { value: '1 ICM42688P', label: 'IMU' },
    { value: '1 BMP581', label: 'Barometer' },
    { value: '8', label: 'Motor Outputs' },
    { value: '2', label: 'MAVLink Telemetry' },
    { value: '1', label: 'DroneCAN' },
  ],

  pcbHighlights: [
    'Four-layer high-speed PCB',
    'Compact and lightweight design',
    'Optimised signal routing',
    'EMI-aware PCB layout',
    'Production-ready hardware design',
  ],
};

/* ═══════════════════════════════════════════
   PROCESSING
   ═══════════════════════════════════════════ */

export const eduProcessorData = {
  badge: 'Processing Core',
  title: 'STM32H743VIT6',
  subtitle: 'ARM Cortex-M7 Architecture',
  description:
    'The SECENAI EDU is powered by the STM32H743VIT6 microcontroller, providing the computational performance required for real-time sensor fusion, control-loop execution, and flight algorithms.',

  specs: [
    { label: 'Processor', value: 'STM32H743VIT6' },
    { label: 'Core', value: 'ARM Cortex-M7' },
    { label: 'Clock Speed', value: 'Up to 480 MHz' },
    { label: 'Flash Memory', value: '2 MB' },
    { label: 'SRAM', value: '1 MB' },
    { label: 'FPU', value: 'Hardware Floating Point Unit' },
    { label: 'DSP', value: 'DSP instruction support' },
  ],

  stats: [
    { value: 480, unit: 'MHz', label: 'Clock Speed' },
    { value: 2, unit: 'MB', label: 'Flash Memory' },
    { value: 1, unit: 'MB', label: 'SRAM' },
  ],
};

/* ═══════════════════════════════════════════
   NAVIGATION (IMU, BARO, GPS)
   ═══════════════════════════════════════════ */

export const eduNavigationData = {
  badge: 'Navigation Sensors',
  title: 'Reliable sensing for flight estimation',
  description:
    'SECENAI EDU provides a single high-precision IMU and a single barometer for attitude estimation and altitude measurement, with external compass support through the GPS module.',

  imu: {
    name: 'ICM42688P',
    role: 'Six-axis IMU',
    axes: '3-axis gyroscope + 3-axis accelerometer',
    note: 'Optimised sensor placement for reliable inertial measurement',
  },

  barometer: {
    name: 'BMP581',
    role: 'High-precision barometer',
    note: 'Accurate barometric pressure measurement for altitude estimation',
  },

  gps: {
    port: '1× GPS port (UART + I²C)',
    magnetometer: 'External magnetometer support',
    compatibility: ['GPS', 'GLONASS', 'Galileo', 'BeiDou'],
    note: 'External compass through the GPS module',
  },
};

/* ═══════════════════════════════════════════
   RC AND MOTOR
   ═══════════════════════════════════════════ */

export const eduRcMotorData = {
  badge: 'RC Input & Motor Output',
  title: 'Flexible receiver and motor control',
  description:
    'SECENAI EDU supports a wide range of RC receiver protocols and provides eight PWM motor and servo outputs compatible with modern ESC protocols.',

  rcProtocols: [
    { name: 'ExpressLRS', via: 'CRSF' },
    { name: 'TBS Crossfire', via: null },
    { name: 'SBUS / SBUS2', via: null },
    { name: 'FPort / FPort2', via: null },
    { name: 'FlySky IBUS', via: null },
    { name: 'DSM / DSMX', via: null },
    { name: 'PPM Sum', via: null },
  ],

  motorOutputs: {
    count: 8,
    type: 'PWM outputs',
    protocols: ['PWM', 'OneShot', 'DShot'],
    servoSupport: true,
  },
};

/* ═══════════════════════════════════════════
   CONNECTIVITY
   ═══════════════════════════════════════════ */

export const eduConnectivityData = {
  badge: 'Connectivity & I/O',
  title: 'Essential connectivity for UAV integration',
  description:
    'SECENAI EDU provides the connectivity required for telemetry, GPS, RC input, CAN peripherals, and USB programming in a streamlined interface layout.',

  interfaces: [
    { name: 'MAVLink Telemetry', count: 2, description: 'Serial telemetry ports for ground-station communication', icon: 'Radio' },
    { name: 'DroneCAN', count: 1, description: 'CAN bus interface for smart ESCs, GPS, and airspeed sensors', icon: 'Network' },
    { name: 'USB Type-C', count: 1, description: 'Configuration, firmware update, and debug interface', icon: 'Usb' },
    { name: 'RC Input', count: 1, description: 'Dedicated receiver input supporting multiple protocols', icon: 'SatelliteDish' },
    { name: 'GPS Port', count: 1, description: 'UART and I²C combined port for GPS and compass modules', icon: 'SatelliteDish' },
    { name: 'I²C Expansion', count: 1, description: 'I²C port for additional peripherals and external compass', icon: 'Cpu' },
  ],

  peripherals: [
    'GPS Module',
    'Telemetry Radio',
    'RC Receiver',
    'ESCs / Motors',
    'Servos',
    'DroneCAN Devices',
    'USB Computer',
    'External Compass',
  ],
};

/* ═══════════════════════════════════════════
   POWER AND PROTECTION
   ═══════════════════════════════════════════ */

export const eduPowerProtectionData = {
  badge: 'Power & Protection',
  title: 'Protected power for reliable operation',
  description:
    'SECENAI EDU features a clean power architecture with automatic switching, efficient regulation, battery monitoring, and comprehensive electrical protection.',

  power: [
    { title: 'USB Type-C programming', description: 'Power and configure through USB during development and firmware updates.' },
    { title: 'External power-module input', description: 'Dedicated power input from external power module for flight operation.' },
    { title: 'Automatic USB / power-module switching', description: 'Seamless transition between USB and external power sources.' },
    { title: 'High-efficiency 5 V regulation', description: 'Regulated 5 V supply for onboard systems and peripherals.' },
    { title: 'High-efficiency 3.3 V regulation', description: 'Regulated 3.3 V supply for processor and sensor systems.' },
    { title: 'Battery-voltage monitoring', description: 'Real-time battery voltage measurement for telemetry and failsafe.' },
    { title: 'Battery-current monitoring', description: 'Real-time current draw measurement for power management.' },
  ],

  protection: [
    { title: 'USB ESD protection', description: 'Electrostatic discharge protection on the USB interface.' },
    { title: 'RC input protection', description: 'ESD protection on the receiver input.' },
    { title: 'CAN bus protection', description: 'ESD and transient protection on the DroneCAN interface.' },
    { title: 'GPS and telemetry ESD protection', description: 'ESD protection on GPS and telemetry serial ports.' },
    { title: 'TVS surge protection', description: 'Transient voltage suppression across critical power paths.' },
    { title: 'Resettable polyfuse protection', description: 'Self-resetting fuse protection for overcurrent conditions.' },
  ],
};

/* ═══════════════════════════════════════════
   LOGGING AND DEVELOPER TOOLS
   ═══════════════════════════════════════════ */

export const eduLoggingDevData = {
  badge: 'Logging & Developer Tools',
  title: 'Built-in logging, interface, and developer access',
  description:
    'SECENAI EDU includes onboard data logging, visual status indicators, and developer interfaces for firmware development and debugging.',

  logging: [
    { title: 'External flash memory', description: 'Onboard flash storage for blackbox logging.' },
    { title: 'High-speed logging', description: 'Fast data capture for flight analysis and debugging.' },
    { title: 'Flight-log storage', description: 'Persistent storage of flight data for post-flight review.' },
  ],

  userInterface: [
    { title: 'RGB status LED', description: 'Multi-colour LED indicating system state and flight mode.' },
    { title: 'Power LED', description: 'Power-on indicator for quick visual confirmation.' },
    { title: 'Buzzer output', description: 'Audio output for arming, warnings, and lost-model alerts.' },
    { title: 'Safety-switch support', description: 'External safety switch for additional arming control.' },
  ],

  developer: [
    { title: 'SWD programming interface', description: 'Serial Wire Debug access for firmware development and debugging.' },
    { title: 'Bootloader support', description: 'Built-in bootloader for firmware updates without external tools.' },
    { title: 'Open-firmware compatibility', description: 'Compatible with open-source autopilot firmware development.' },
    { title: 'Firmware updates through USB Type-C', description: 'Simple firmware flashing via USB connection.' },
  ],
};

/* ═══════════════════════════════════════════
   SOFTWARE COMPATIBILITY
   ═══════════════════════════════════════════ */

export const eduSoftwareData = {
  badge: 'Software Ecosystem',
  title: 'Built for the Open Autopilot Ecosystem',
  description:
    'SECENAI EDU is compatible with industry-standard open-source autopilot software and ground-control tools, providing access to a mature ecosystem for flight control development.',

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

  ecosystemTools: [
    'MAVLink Protocol',
    'Mission Planner',
    'QGroundControl',
  ],

  validationNotice:
    'Specific firmware versions and board-target files may require configuration. Refer to the respective autopilot documentation for setup instructions.',
};

/* ═══════════════════════════════════════════
   APPLICATIONS
   ═══════════════════════════════════════════ */

export const eduApplicationsData = {
  badge: 'Applications',
  title: 'Designed for education, prototyping, and innovation',
  description:
    'SECENAI EDU is built for a wide range of users and platforms, from classroom learning to UAV research and hobby drone building.',

  targetUsers: [
    'Educational institutions',
    'Engineering colleges',
    'Universities',
    'Drone training academies',
    'Robotics clubs',
    'UAV research laboratories',
    'Makers and hobby drone builders',
  ],

  platforms: [
    'Multirotor UAVs',
    'Fixed-wing aircraft',
    'VTOL platforms',
    'Student projects',
    'Research prototypes',
    'Robotics projects',
    'Flight-control experimentation',
    'Autonomous-system development',
  ],

  whyEdu: [
    { title: 'Modern STM32H743 architecture', description: 'Industry-standard 32-bit processing for real-time flight control.' },
    { title: 'Designed for education and prototyping', description: 'Approachable design with clear documentation and open-firmware support.' },
    { title: 'Cost-effective without compromising core reliability', description: 'Reliable single-sensor architecture at an accessible price point.' },
    { title: 'Compatible with industry-standard autopilot software', description: 'Full ArduPilot and PX4 compatibility for professional-grade development.' },
    { title: 'Based on SECENAI flight-control engineering principles', description: 'Designed using the same engineering standards as the SECENAI FC H743 V1.' },
    { title: 'Suitable for learning and real-world UAV development', description: 'Bridge the gap between classroom learning and practical drone deployment.' },
  ],
};
