import {
  Sprout,
  LayoutDashboard,
  CloudSun,
  Radar,
  TrendingUp,
  Users,
} from 'lucide-react';

/**
 * SECENAI Agriculture Dashboard — Page Data
 * All copy and section metadata for the dedicated Dashboard showcase page.
 */

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

export const dashboardHeroData = {
  eyebrow: 'SECENAI Agriculture Intelligence Platform',

  headingLines: [
    { text: 'Smarter Farm Decisions.', accent: false },
    // { text: 'Connected Operations.', accent: true },
    // { text: 'Better Outcomes.', accent: false },
  ],

  subtitle:
    'A unified agriculture dashboard built for farmers, field teams and platform administrators.',

  description:
    'SECENAI brings essential farming tools into one connected platform. Farmers can monitor soil conditions, weather, crop health, pest risks, market prices, insurance information and AI-based recommendations, while administrators can manage farmers, fields, drone missions, crop performance and disease analytics from a single dashboard.',

  ctaText: 'Launch Agriculture Dashboard',
  ctaUrl: 'https://secen-ai-dashboard.vercel.app/',

  badges: [
    'Admin & Farmer Portals',
    'AI Crop Analysis',
    'Live Weather Data',
    'Market Intelligence',
    'Drone Operations',
    'Field Management',
  ],
};

/* ═══════════════════════════════════════════
   HIGHLIGHT CARDS (inside hero)
   ═══════════════════════════════════════════ */

export const dashboardHighlights = [
  {
    title: 'Farmer Intelligence',
    description:
      'Access soil insights, live weather intelligence, drone-based pest detection, market prices, crop insurance information and AI-powered farming assistance.',
    Icon: Sprout,
  },
  {
    title: 'Platform Management',
    description:
      'Manage farmer profiles, field records, drone operations, crop and yield analytics, and disease or pest insights across the agriculture platform.',
    Icon: LayoutDashboard,
  },
];

/* ═══════════════════════════════════════════
   CAPABILITY CARDS
   ═══════════════════════════════════════════ */

export const dashboardCapabilities = [
  {
    title: 'Soil & Weather Intelligence',
    description:
      'Monitor field conditions and receive weather insights for better planning and irrigation decisions.',
    Icon: CloudSun,
  },
  {
    title: 'Drone Crop Monitoring',
    description:
      'Use aerial imagery and AI analysis to identify crop-health issues and pest risks.',
    Icon: Radar,
  },
  {
    title: 'Market & AI Insights',
    description:
      'Access live mandi prices, selling opportunities and intelligent farming recommendations.',
    Icon: TrendingUp,
  },
  {
    title: 'Farm Operations Management',
    description:
      'Manage farmers, fields, drone missions, crop performance and platform-wide agricultural data.',
    Icon: Users,
  },
];
