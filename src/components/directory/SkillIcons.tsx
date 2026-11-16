// src/components/directory/SkillIcons.tsx
"use client";

import React from "react";

export interface IconProps {
  className?: string;
}

// 0. Katalog Semua Kemahiran (Grid)
export function AllCategoriesIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

// 1. Pendawaian Elektrik (Malaysian 3-Pin Plug)
export function ElectricalPlugIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* 3-pin British Standard BS 1363 plug body */}
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <path d="M5 11h14a2 2 0 0 1 2 2v2a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5v-2a2 2 0 0 1 2-2z" />
      {/* Pins */}
      <line x1="12" y1="2" x2="12" y2="4" strokeWidth="2.5" />
      <line x1="8" y1="5" x2="8" y2="7" strokeWidth="2.5" />
      <line x1="16" y1="5" x2="16" y2="7" strokeWidth="2.5" />
      {/* Cable */}
      <line x1="12" y1="20" x2="12" y2="23" strokeWidth="2.5" />
    </svg>
  );
}

// 2. Penyaman Udara / HVAC (Blower Fan & Cool Flow)
export function HvacFanIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
      {/* 4 curved fan blades */}
      <path d="M12 9.5c0-3.5 2-4.5 4-4.5s2 2 0 4.5" />
      <path d="M14.5 12c3.5 0 4.5 2 4.5 4s-2 2-4.5 0" />
      <path d="M12 14.5c0 3.5-2 4.5-4 4.5s-2-2 0-4.5" />
      <path d="M9.5 12c-3.5 0-4.5-2-4.5-4s2-2 4.5 0" />
    </svg>
  );
}

// 3. Perpaipan & Sanitari (Heavy Duty Pipe Fitting & Gate Valve)
export function PlumbingPipeIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Main T pipe */}
      <path d="M4 10h5v-5h6v5h5v4h-5v6h-6v-6h-5z" />
      {/* Flange joints */}
      <path d="M3 8v8" strokeWidth="2.5" />
      <path d="M21 8v8" strokeWidth="2.5" />
      <path d="M8 4h8" strokeWidth="2.5" />
      <path d="M8 21h8" strokeWidth="2.5" />
    </svg>
  );
}

// 4. Mekanik Automotif (Piston & Sedan Car)
export function AutomotiveIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H7c-.8 0-1.5.4-1.9 1.1L3.3 11.4C2.5 11.9 2 12.8 2 13.8V16c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <path d="M5 12h14" />
      <path d="M9 7l1.5 5" />
      <path d="M14 7l-1 5" />
    </svg>
  );
}

// 5. Baiki Motosikal (Real Handcrafted Motorcycle - NOT pedal bike!)
export function MotorcycleIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Wheels with hubs */}
      <circle cx="18.5" cy="16.5" r="3.5" />
      <circle cx="5.5" cy="16.5" r="3.5" />
      <circle cx="18.5" cy="16.5" r="1" fill="currentColor" />
      <circle cx="5.5" cy="16.5" r="1" fill="currentColor" />
      {/* Frame, engine & tank */}
      <path d="M5.5 16.5h3.5l3.5-6.5h3.5l2.5 6.5" />
      <path d="M14.5 6.5l1.5 3.5" />
      <path d="M13 6.5h3.5" />
      <path d="M8.5 10h4" />
      <path d="M8 16.5l3.5-1.5h3.5" />
    </svg>
  );
}

// 6. Kimpalan & Fabrikasi (Welding Torch Flame & Joint)
export function WeldingTorchIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
    </svg>
  );
}

// 7. Jahitan & Rekaan Fesyen (Professional Tailor Shears)
export function TailorShearsIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}

// 8. Masakan & Seni Kulinari (Chef Toque & Crossed Knife/Fork)
export function CulinaryChefIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Chef Toque */}
      <path d="M6 18h12v3H6z" />
      <path d="M6 18a4 4 0 0 1-2-7 4.5 4.5 0 0 1 5-4.5 5 5 0 0 1 6 0 4.5 4.5 0 0 1 5 4.5 4 4 0 0 1-2 7" />
      <line x1="9" y1="18" x2="9" y2="21" />
      <line x1="15" y1="18" x2="15" y2="21" />
    </svg>
  );
}

// 9. Dandanan Rambut & Kecantikan (Barber Shears & Comb - NOT AI sparkles!)
export function HairSalonIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Scissors */}
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8 8l10 8" />
      <path d="M18 8L8 16" />
      {/* Professional comb teeth on the side */}
      <path d="M19 4v16" strokeWidth="2" />
      <line x1="19" y1="7" x2="16.5" y2="7" strokeWidth="1.8" />
      <line x1="19" y1="10" x2="16.5" y2="10" strokeWidth="1.8" />
      <line x1="19" y1="13" x2="16.5" y2="13" strokeWidth="1.8" />
      <line x1="19" y1="16" x2="16.5" y2="16" strokeWidth="1.8" />
    </svg>
  );
}

// 10. Komputer & Rangkaian (Workstation Monitor & Cable Nodes)
export function ComputerNetworkIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2" />
      <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2" />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" />
      <path d="M6 10h4.5" />
      <path d="M13.5 10H18" />
    </svg>
  );
}

// Dedicated trade visual configuration & theme accents
export const TRADE_ICON_CONFIG: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    badgeBg: string;
    badgeText: string;
    borderActive: string;
    borderLight: string;
  }
> = {
  ALL: {
    icon: AllCategoriesIcon,
    accentColor: "#01528A",
    badgeBg: "bg-slate-900 text-white",
    badgeText: "text-slate-900",
    borderActive: "border-slate-900 bg-slate-900 text-white",
    borderLight: "border-slate-200 bg-white text-slate-800 hover:border-slate-400",
  },
  "electrical-wiring": {
    icon: ElectricalPlugIcon,
    accentColor: "#D97706",
    badgeBg: "bg-amber-500/15 text-amber-700",
    badgeText: "text-amber-800",
    borderActive: "border-amber-600 bg-amber-600 text-white",
    borderLight: "border-amber-200 bg-amber-50/40 text-slate-800 hover:border-amber-400",
  },
  "aircond-hvac": {
    icon: HvacFanIcon,
    accentColor: "#0284C7",
    badgeBg: "bg-sky-500/15 text-sky-700",
    badgeText: "text-sky-800",
    borderActive: "border-sky-600 bg-sky-600 text-white",
    borderLight: "border-sky-200 bg-sky-50/40 text-slate-800 hover:border-sky-400",
  },
  plumbing: {
    icon: PlumbingPipeIcon,
    accentColor: "#2563EB",
    badgeBg: "bg-blue-500/15 text-blue-700",
    badgeText: "text-blue-800",
    borderActive: "border-blue-600 bg-blue-600 text-white",
    borderLight: "border-blue-200 bg-blue-50/40 text-slate-800 hover:border-blue-400",
  },
  automotive: {
    icon: AutomotiveIcon,
    accentColor: "#C8102E",
    badgeBg: "bg-rose-500/15 text-rose-700",
    badgeText: "text-rose-800",
    borderActive: "border-rose-700 bg-rose-700 text-white",
    borderLight: "border-rose-200 bg-rose-50/40 text-slate-800 hover:border-rose-400",
  },
  "motorcycle-repair": {
    icon: MotorcycleIcon,
    accentColor: "#334155",
    badgeBg: "bg-slate-700/15 text-slate-800",
    badgeText: "text-slate-900",
    borderActive: "border-slate-800 bg-slate-800 text-white",
    borderLight: "border-slate-300 bg-slate-100/50 text-slate-800 hover:border-slate-500",
  },
  "welding-fabrication": {
    icon: WeldingTorchIcon,
    accentColor: "#EA580C",
    badgeBg: "bg-orange-500/15 text-orange-700",
    badgeText: "text-orange-800",
    borderActive: "border-orange-600 bg-orange-600 text-white",
    borderLight: "border-orange-200 bg-orange-50/40 text-slate-800 hover:border-orange-400",
  },
  "tailoring-fashion": {
    icon: TailorShearsIcon,
    accentColor: "#9333EA",
    badgeBg: "bg-purple-500/15 text-purple-700",
    badgeText: "text-purple-800",
    borderActive: "border-purple-600 bg-purple-600 text-white",
    borderLight: "border-purple-200 bg-purple-50/40 text-slate-800 hover:border-purple-400",
  },
  "culinary-pastry": {
    icon: CulinaryChefIcon,
    accentColor: "#B45309",
    badgeBg: "bg-amber-600/15 text-amber-800",
    badgeText: "text-amber-900",
    borderActive: "border-amber-700 bg-amber-700 text-white",
    borderLight: "border-amber-200 bg-amber-50/40 text-slate-800 hover:border-amber-400",
  },
  "beauty-hair": {
    icon: HairSalonIcon,
    accentColor: "#DB2777",
    badgeBg: "bg-pink-500/15 text-pink-700",
    badgeText: "text-pink-800",
    borderActive: "border-pink-600 bg-pink-600 text-white",
    borderLight: "border-pink-200 bg-pink-50/40 text-slate-800 hover:border-pink-400",
  },
  "computer-networking": {
    icon: ComputerNetworkIcon,
    accentColor: "#4F46E5",
    badgeBg: "bg-indigo-500/15 text-indigo-700",
    badgeText: "text-indigo-800",
    borderActive: "border-indigo-600 bg-indigo-600 text-white",
    borderLight: "border-indigo-200 bg-indigo-50/40 text-slate-800 hover:border-indigo-400",
  },
};
