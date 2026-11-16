// src/components/directory/SkillIcons.tsx
"use client";

import React from "react";
import {
  LayoutGrid,
  Zap,
  Wind,
  Wrench,
  Car,
  Flame,
  Scissors,
  UtensilsCrossed,
  Monitor,
} from "lucide-react";

export interface IconProps {
  className?: string;
}

// 1. Handcrafted Professional Motorcycle Icon (Matching Lucide 2px stroke)
export function MotorcycleTradeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="5" cy="16" r="3" />
      <circle cx="19" cy="16" r="3" />
      <path d="M5 16h4l3.5-6h4.5l2 6" />
      <path d="M14 6.5l1.5 3.5" />
      <path d="M13 6.5h3.5" />
      <path d="M8.5 10h4" />
      <path d="M7 16l3-1.5h4.5" />
    </svg>
  );
}

// 2. Handcrafted Professional Hair Salon & Barber Icon (Shears & Styling Comb)
export function BarberSalonIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8 8l8.5 8" />
      <path d="M16.5 8L8 16" />
      <path d="M19 4v16" strokeWidth="2" />
      <line x1="19" y1="7" x2="16.5" y2="7" strokeWidth="1.8" />
      <line x1="19" y1="10" x2="16.5" y2="10" strokeWidth="1.8" />
      <line x1="19" y1="13" x2="16.5" y2="13" strokeWidth="1.8" />
      <line x1="19" y1="16" x2="16.5" y2="16" strokeWidth="1.8" />
    </svg>
  );
}

// 3. Trade Icon Mapping - Tasteful, distinguished, non-AI trade palette
export const TRADE_ICON_CONFIG: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    labelMs: string;
    labelEn: string;
    descMs: string;
    iconColor: string;
    iconBg: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  ALL: {
    icon: LayoutGrid,
    labelMs: "Semua Kemahiran",
    labelEn: "All Skills",
    descMs: "Katalog penuh pakar TVET",
    iconColor: "text-[#0170B9]",
    iconBg: "bg-blue-50/90 border-blue-200/70",
    badgeBg: "bg-blue-50 text-[#0170B9]",
    badgeText: "text-[#0170B9]",
  },
  "electrical-wiring": {
    icon: Zap,
    labelMs: "Elektrik & Pendawaian",
    labelEn: "Electrical & Wiring",
    descMs: "Single/3-phase, DB & litar",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50/90 border-amber-200/80",
    badgeBg: "bg-amber-50 text-amber-700",
    badgeText: "text-amber-700",
  },
  "aircond-hvac": {
    icon: Wind,
    labelMs: "Servis Aircond",
    labelEn: "Aircond & HVAC",
    descMs: "Pemasangan, cuci & gas",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50/90 border-sky-200/80",
    badgeBg: "bg-sky-50 text-sky-700",
    badgeText: "text-sky-700",
  },
  plumbing: {
    icon: Wrench,
    labelMs: "Baiki Paip & Sanitari",
    labelEn: "Plumbing & Sanitary",
    descMs: "Paip bocor, tangki & tandas",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50/90 border-blue-200/80",
    badgeBg: "bg-blue-50 text-blue-700",
    badgeText: "text-blue-700",
  },
  automotive: {
    icon: Car,
    labelMs: "Mekanik Kereta",
    labelEn: "Car Mechanic",
    descMs: "Enjin, servis & brek",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50/90 border-rose-200/80",
    badgeBg: "bg-rose-50 text-rose-700",
    badgeText: "text-rose-700",
  },
  "motorcycle-repair": {
    icon: MotorcycleTradeIcon,
    labelMs: "Mekanik Motosikal",
    labelEn: "Motorcycle Mechanic",
    descMs: "Servis enjin, tayar & rantai",
    iconColor: "text-slate-700",
    iconBg: "bg-slate-100 border-slate-300/80",
    badgeBg: "bg-slate-100 text-slate-700",
    badgeText: "text-slate-700",
  },
  "welding-fabrication": {
    icon: Flame,
    labelMs: "Kimpalan & Besi",
    labelEn: "Welding & Metal",
    descMs: "Pintu pagar, grill & awning",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50/90 border-orange-200/80",
    badgeBg: "bg-orange-50 text-orange-700",
    badgeText: "text-orange-700",
  },
  "tailoring-fashion": {
    icon: Scissors,
    labelMs: "Jahitan & Pakaian",
    labelEn: "Tailoring & Fashion",
    descMs: "Baju melayu, kurung & alter",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50/90 border-purple-200/80",
    badgeBg: "bg-purple-50 text-purple-700",
    badgeText: "text-purple-700",
  },
  "culinary-pastry": {
    icon: UtensilsCrossed,
    labelMs: "Masakan & Katering",
    labelEn: "Culinary & Catering",
    descMs: "Katering, kuih & pastri",
    iconColor: "text-amber-800",
    iconBg: "bg-amber-100/70 border-amber-300/80",
    badgeBg: "bg-amber-100/70 text-amber-800",
    badgeText: "text-amber-800",
  },
  "beauty-hair": {
    icon: BarberSalonIcon,
    labelMs: "Gunting & Dandanan",
    labelEn: "Hair Salon & Barber",
    descMs: "Gunting rambut & salun",
    iconColor: "text-pink-600",
    iconBg: "bg-pink-50/90 border-pink-200/80",
    badgeBg: "bg-pink-50 text-pink-700",
    badgeText: "text-pink-700",
  },
  "computer-networking": {
    icon: Monitor,
    labelMs: "Komputer & IT",
    labelEn: "Computer & IT",
    descMs: "Format, wifi & rangkaian",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50/90 border-indigo-200/80",
    badgeBg: "bg-indigo-50 text-indigo-700",
    badgeText: "text-indigo-700",
  },
};
