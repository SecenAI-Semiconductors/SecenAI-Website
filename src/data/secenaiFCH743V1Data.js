/* ── Product image assets (KiCad renders & Enclosure) ── */
import fcEnclosureBlackImg from '../assets/flight-controller/secenai-fc-h743-v1/fc-enclosure-black.webp';
import heroPerspectiveImg from '../assets/flight-controller/secenai-fc-h743-v1/hero-perspective.webp';
import topViewImg from '../assets/flight-controller/secenai-fc-h743-v1/top-view.webp';
import bottomViewImg from '../assets/flight-controller/secenai-fc-h743-v1/bottom-view.webp';
import sideViewImg from '../assets/flight-controller/secenai-fc-h743-v1/side-view.webp';

/**
 * SECENAI FC H743 V1 — Product Data
 * All copy, specifications, and section metadata for the dedicated product page.
 */

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

export const heroData = {
  badge: 'Flight Controller',
  title: 'SECENAI FC H743 V1',
  subtitle: 'High-Performance Flight Controller for Advanced UAV Systems',
  description:
    'An STM32H743-based flight controller engineered for reliable processing, flexible integration, and professional-grade autonomous UAV development.',
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/flight-controller' },
    { label: 'Flight Controller', href: '/flight-controller' },
    { label: 'FC H743 V1', href: null },
  ],
  productImage: fcEnclosureBlackImg,
};

/* ═══════════════════════════════════════════
   PROCESSOR
   ═══════════════════════════════════════════ */

export const processorData = {
  badge: 'Processing Core',
  title: 'STM32H743',
  subtitle: 'ARM Cortex-M7 Architecture',
  description:
    'The STM32H743 is a high-performance 32-bit microcontroller from STMicroelectronics, delivering the computational headroom needed for complex sensor fusion, real-time control loops, and advanced flight algorithms.',
  stats: [
    { value: 480, unit: 'MHz', label: 'Clock Speed' },
    { value: 2, unit: 'MB', label: 'Flash Memory' },
    { value: 1, unit: 'MB', label: 'SRAM' },
  ],
  features: [
    'Hardware floating-point unit (FPU) for real-time sensor fusion',
    'L1 cache for reduced memory latency',
    'Multiple DMA channels for parallel peripheral handling',
    'Fault-tolerant architecture with dual watchdogs',
    'Low-power modes for efficient idle operation',
    'Real-time clock (RTC) with battery backup capability',
  ],
};

/* ═══════════════════════════════════════════
   TRIPLE IMU
   ═══════════════════════════════════════════ */

export const tripleIMUData = {
  badge: 'Inertial Measurement',
  title: 'Three IMUs. One resilient sensing system.',
  subtitle: 'Triple-redundant six-axis inertial measurement',
  description:
    'Two ICM-42688-P sensors and one ICM-42605 provide three onboard six-axis inertial measurement sources for motion sensing, fault monitoring and flight-state estimation.',
  sensors: [
    {
      name: 'ICM-42688-P',
      role: 'IMU 1',
      axes: '3-axis gyroscope + 3-axis accelerometer',
      spiBus: 'SPI Bus A (shared)',
      busNote: 'Shares SPI bus with IMU 2',
    },
    {
      name: 'ICM-42688-P',
      role: 'IMU 2',
      axes: '3-axis gyroscope + 3-axis accelerometer',
      spiBus: 'SPI Bus A (shared)',
      busNote: 'Shares SPI bus with IMU 1',
    },
    {
      name: 'ICM-42605',
      role: 'IMU 3',
      axes: '3-axis gyroscope + 3-axis accelerometer',
      spiBus: 'SPI Bus B (separate)',
      busNote: 'Independent SPI bus',
    },
  ],
  features: [
    'Automatic IMU failover',
    'Sensor voting',
    'IMU fault isolation',
  ],
  busTopology: {
    note: 'Two IMUs share one SPI bus. The third IMU uses a separate SPI bus. All three feed flight-state estimation.',
  },
};

/* ═══════════════════════════════════════════
   DUAL BAROMETER
   ═══════════════════════════════════════════ */

export const dualBarometerData = {
  badge: 'Altitude Sensing',
  title: 'Independent dual barometric sensing',
  subtitle: 'Redundant pressure measurement for altitude estimation',
  description:
    'Two independently connected BMP581 pressure sensors provide multiple pressure measurements for altitude estimation and firmware-level consistency checking.',
  sensors: [
    {
      label: 'BARO1',
      name: 'BMP581',
      description: 'Independent pressure sensor',
      spiBus: 'Independent SPI connection',
    },
    {
      label: 'BARO2',
      name: 'BMP581',
      description: 'Independent pressure sensor',
      spiBus: 'Independent SPI connection',
    },
  ],
  crossCheck: 'Firmware Barometer Cross-Check',
};

/* ═══════════════════════════════════════════
   SENSOR ARCHITECTURE
   ═══════════════════════════════════════════ */

export const sensorArchitectureData = {
  badge: 'System Architecture',
  title: 'Redundancy built into the sensing architecture',
  subtitle: 'End-to-end sensor fusion with fault management',
  description:
    'The SECENAI FC H743 V1 combines three inertial sensors, two independently connected barometers and confirmed fault-management capabilities within a unified flight-control platform.',
  imuPipeline: [
    { label: 'Inertial Data', type: 'data' },
    { label: 'Sensor Voting', type: 'process' },
    { label: 'Fault Isolation', type: 'process' },
    { label: 'Automatic IMU Failover', type: 'process' },
    { label: 'Flight-State Estimation', type: 'output' },
  ],
  baroPipeline: [
    { label: 'Pressure Data', type: 'data' },
    { label: 'Barometer Cross-Check', type: 'process' },
    { label: 'Altitude Estimation', type: 'output' },
  ],
  busNote:
    'Two IMUs share one SPI bus, while the third uses a separate SPI bus. The two barometers are independently connected on separate SPI buses.',
  mechanicalIsolation: [
    'PCB vibration isolation',
    'Enclosure vibration isolation',
  ],
};

/* ═══════════════════════════════════════════
   CONNECTIVITY
   ═══════════════════════════════════════════ */

export const connectivityData = {
  badge: 'Connectivity & I/O',
  title: 'Extensive connectivity for UAV integration',
  subtitle: 'Serial, bus, analog and digital interfaces',
  description:
    'Designed to connect propulsion systems, navigation sensors, communication modules and UAV peripherals across a wide range of autonomous platforms.',

  /* Top-view board image (KiCad render) */
  topViewImage: topViewImg,

  /* ── Primary interface counts ── */
  interfaces: [
    { name: 'UART', count: 6, description: 'Serial ports for GPS, telemetry, ESC telemetry, rangefinder, companion computer', icon: 'Cable' },
    { name: 'CAN', count: 2, description: 'DroneCAN-ready bus interfaces for smart ESCs, GPS, airspeed sensors', icon: 'Network' },
    { name: 'I²C', count: 3, description: 'Buses for compass, barometer, airspeed and other I²C peripherals', icon: 'Cpu' },
    { name: 'SPI', count: 8, description: 'High-speed buses for onboard IMUs, barometers and external peripherals', icon: 'Layers' },
    { name: 'ADC', count: 2, description: 'Analog inputs for battery voltage and current sensing', icon: 'Gauge' },
    { name: 'PWM / Servo', count: 14, description: 'DShot-capable motor and servo outputs', icon: 'Cog' },
    { name: 'AUX', count: 2, description: 'Dedicated DShot-capable auxiliary outputs', icon: 'Zap' },
  ],

  /* ── Additional features ── */
  additionalFeatures: [
    'GPS support',
    'RC input',
    'USB Type-C',
    'Internal Molex USB',
    'External MicroSD logging',
    'Molex connectors',
    'Pixhawk-standard connector approach',
  ],

  /* ── Pinout status ── */
  pinoutStatus: 'Pinout documentation coming soon',

  /* ── Hotspot system (placeholder coordinates) ── */
  hotspots: [
    { id: 'uart1', name: 'UART 1', interfaceType: 'UART', peripheral: 'GPS', voltage: null, pinout: null, x: 15, y: 20 },
    { id: 'uart2', name: 'UART 2', interfaceType: 'UART', peripheral: 'Telemetry', voltage: null, pinout: null, x: 15, y: 35 },
    { id: 'uart3', name: 'UART 3', interfaceType: 'UART', peripheral: 'ESC Telemetry', voltage: null, pinout: null, x: 15, y: 50 },
    { id: 'uart4', name: 'UART 4', interfaceType: 'UART', peripheral: 'Rangefinder', voltage: null, pinout: null, x: 15, y: 65 },
    { id: 'uart5', name: 'UART 5', interfaceType: 'UART', peripheral: 'Companion Computer', voltage: null, pinout: null, x: 15, y: 80 },
    { id: 'uart6', name: 'UART 6', interfaceType: 'UART', peripheral: 'General', voltage: null, pinout: null, x: 30, y: 20 },
    { id: 'can1', name: 'CAN 1', interfaceType: 'CAN', peripheral: 'DroneCAN Bus', voltage: null, pinout: null, x: 85, y: 25 },
    { id: 'can2', name: 'CAN 2', interfaceType: 'CAN', peripheral: 'DroneCAN Bus', voltage: null, pinout: null, x: 85, y: 40 },
    { id: 'i2c1', name: 'I²C 1', interfaceType: 'I²C', peripheral: 'Compass', voltage: null, pinout: null, x: 85, y: 55 },
    { id: 'i2c2', name: 'I²C 2', interfaceType: 'I²C', peripheral: 'Airspeed', voltage: null, pinout: null, x: 85, y: 70 },
    { id: 'i2c3', name: 'I²C 3', interfaceType: 'I²C', peripheral: 'Peripheral', voltage: null, pinout: null, x: 85, y: 85 },
    { id: 'usbc', name: 'USB Type-C', interfaceType: 'USB', peripheral: 'Configuration / Debug', voltage: null, pinout: null, x: 50, y: 10 },
    { id: 'molex-usb', name: 'Internal Molex USB', interfaceType: 'USB', peripheral: 'Internal USB', voltage: null, pinout: null, x: 50, y: 90 },
    { id: 'microsd', name: 'MicroSD', interfaceType: 'SD', peripheral: 'Flight Log Storage', voltage: null, pinout: null, x: 65, y: 10 },
    { id: 'rc-in', name: 'RC Input', interfaceType: 'RC', peripheral: 'SBUS / PPM / CRSF', voltage: null, pinout: null, x: 30, y: 90 },
    { id: 'pwm-main', name: 'PWM Main Out', interfaceType: 'PWM', peripheral: 'Motors / Servos', voltage: null, pinout: null, x: 50, y: 50 },
    { id: 'aux-out', name: 'AUX Out', interfaceType: 'AUX', peripheral: 'Auxiliary DShot', voltage: null, pinout: null, x: 65, y: 50 },
    { id: 'gps', name: 'GPS Port', interfaceType: 'UART + I²C', peripheral: 'GPS / Compass', voltage: null, pinout: null, x: 30, y: 50 },
  ],
};

/* ═══════════════════════════════════════════
   POWER & FIRMWARE
   ═══════════════════════════════════════════ */

export const powerFirmwareData = {
  /* ── Power ── */
  power: {
    badge: 'Power Architecture',
    title: 'Wide-range protected power architecture',
    description:
      'The SECENAI FC H743 V1 supports a 5 V to 36 V input range with two protected power inputs and power redundancy for demanding UAV integration.',
    features: [
      { title: '5–36 V input', description: 'Wide operating range from low-voltage bench supply through multi-cell LiPo packs.' },
      { title: 'Two power inputs', description: 'Dual power connectors allow redundant supply configurations.' },
      { title: 'Power protection', description: 'Integrated protection circuitry for input power.' },
      { title: 'Power redundancy', description: 'Redundant power paths support continued operation under single-source failure.' },
    ],
  },

  /* ── Firmware ── */
  firmware: {
    badge: 'Firmware Compatibility',
    title: 'Built for open autopilot platforms',
    description:
      'The SECENAI FC H743 V1 supports ArduPilot and PX4-based platforms across multirotor, fixed-wing, VTOL, helicopter, blimp and submarine configurations.',
    platforms: [
      {
        name: 'ArduPilot',
        description: 'Open-source autopilot software supporting a wide range of autonomous vehicle types.',
      },
      {
        name: 'PX4',
        description: 'Open-source flight control software for drones and other autonomous vehicles.',
      },
    ],
    platformTags: [
      'Multirotor',
      'Fixed-wing',
      'VTOL',
      'Helicopter',
      'Blimp',
      'Submarine',
    ],
    validationNotice:
      'Exact firmware versions and board-target documentation will be published after final validation.',
  },
};

/* ═══════════════════════════════════════════
   TECHNICAL SPECIFICATIONS
   ═══════════════════════════════════════════ */

export const technicalSpecsData = {
  badge: 'Specifications',
  title: 'Technical Specifications',
  subtitle: 'Complete hardware specification reference',
  categories: [
    {
      name: 'Processing',
      specs: [
        { label: 'Processor', value: 'STM32H743' },
        { label: 'Core', value: 'Arm Cortex-M7' },
        { label: 'Maximum frequency', value: 'Up to 480 MHz' },
      ],
    },
    {
      name: 'Sensor Architecture',
      specs: [
        { label: 'IMUs', value: '2× ICM-42688-P + 1× ICM-42605' },
        { label: 'Total IMUs', value: '3' },
        { label: 'IMU bus architecture', value: 'Two IMUs on one SPI bus and one IMU on a separate SPI bus' },
        { label: 'Barometers', value: '2× BMP581' },
        { label: 'Barometer connection', value: 'Independently connected on separate SPI buses' },
      ],
    },
    {
      name: 'Reliability and Isolation',
      specs: [
        { label: 'Independent IMU power', value: 'No' },
        { label: 'Automatic IMU failover', value: 'Supported' },
        { label: 'Sensor voting', value: 'Supported' },
        { label: 'IMU fault isolation', value: 'Supported' },
        { label: 'Barometer cross-checking', value: 'Supported in firmware' },
        { label: 'PCB vibration isolation', value: 'Supported' },
        { label: 'Enclosure vibration isolation', value: 'Supported' },
      ],
    },
    {
      name: 'Power and Outputs',
      specs: [
        { label: 'Input voltage', value: '5 V to 36 V' },
        { label: 'Power inputs', value: '2' },
        { label: 'Power protection', value: 'Supported' },
        { label: 'Power redundancy', value: 'Supported' },
        { label: 'PWM/servo outputs', value: '14' },
        { label: 'PWM protocol capability', value: 'DShot capable' },
        { label: 'Dedicated AUX outputs', value: '2' },
        { label: 'AUX protocol capability', value: 'DShot capable' },
      ],
    },
    {
      name: 'Interfaces and Storage',
      specs: [
        { label: 'UART', value: '6' },
        { label: 'CAN', value: '2' },
        { label: 'I²C', value: '3' },
        { label: 'SPI', value: '8' },
        { label: 'ADC', value: '2' },
        { label: 'USB', value: 'USB Type-C and internal Molex connection' },
        { label: 'Logging', value: 'External MicroSD' },
        { label: 'FRAM', value: '32 MB, verification required for MB versus Mbit' },
        { label: 'GPS', value: 'Supported' },
        { label: 'RC input', value: 'Supported' },
        { label: 'Connector system', value: 'Molex, Pixhawk-standard approach' },
      ],
    },
    {
      name: 'Firmware and Platforms',
      specs: [
        { label: 'ArduPilot', value: 'Supported' },
        { label: 'PX4', value: 'Supported' },
        { label: 'Platforms', value: 'Multirotor, fixed-wing, VTOL, helicopter, blimp and submarine' },
      ],
    },
    {
      name: 'Environmental and Commercial Status',
      specs: [
        { label: 'Operating temperature', value: '-30 °C to 85 °C' },
        { label: 'Commercial availability', value: 'Not announced' },
      ],
    },
  ],
};

/* ═══════════════════════════════════════════
   MECHANICAL DESIGN
   ═══════════════════════════════════════════ */

export const mechanicalData = {
  badge: 'Mechanical Design',
  title: 'Compact engineering for UAV installation',
  dimensionNotice: 'Final mechanical dimensions coming soon',

  /* Board view images (KiCad renders) */
  images: {
    top: topViewImg,
    bottom: bottomViewImg,
    side: sideViewImg,
  },

  /* Confirmed features */
  features: [
    'M2.5 mounting holes',
    'PCB vibration isolation',
    'Enclosure vibration isolation',
    'Connector clearance',
  ],

  /* Dimensions — all TBD until confirmed */
  dimensions: {
    boardDimensions: 'TBD',
    mountingHoleSpacing: 'TBD',
    pcbThickness: 'TBD',
    weight: 'TBD',
  },

  downloadButton: {
    label: 'Download Mechanical Drawing',
    disabled: true,
    disabledLabel: 'Coming Soon',
  },
};

/* ═══════════════════════════════════════════
   DOCUMENTATION CTA
   ═══════════════════════════════════════════ */

export const documentationData = {
  badge: 'Documentation & Resources',
  title: 'Start building with SecenAI',

  resources: [
    {
      title: 'Product Datasheet',
      description: 'Electrical and mechanical specifications',
      status: 'Coming Soon',
      action: null,
    },
    {
      title: 'Pinout Reference',
      description: 'Connector definitions, voltages and signal mapping',
      status: 'Coming Soon',
      action: null,
    },
    {
      title: 'Integration Guide',
      description: 'Power, peripheral, firmware and installation guidance',
      status: 'Coming Soon',
      action: null,
    },
    {
      title: 'Firmware Package',
      description: 'ArduPilot and PX4 board-target resources',
      status: 'Coming Soon',
      action: null,
    },
    {
      title: 'Technical Enquiry',
      description: 'Discuss UAV integration and custom requirements',
      status: null,
      action: { label: 'Contact Engineering', href: '/contact' },
    },
  ],

  cta: {
    heading: 'Engineering an autonomous UAV platform?',
    text: 'Speak with SecenAI about flight-controller integration, custom interfaces and platform requirements.',
    buttons: [
      { label: 'Request Product Details', href: '/contact', primary: true },
      { label: 'Contact Engineering', href: '/contact', primary: false },
    ],
  },
};
