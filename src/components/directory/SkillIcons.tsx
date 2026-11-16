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

// 1. Handcrafted Professional Motorcycle Icon (Matching Lucide 2px stroke, NOT a pedal bike!)
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
      {/* Front & Rear Wheels */}
      <circle cx="5" cy="16" r="3" />
      <circle cx="19" cy="16" r="3" />
      {/* Frame & Engine */}
      <path d="M5 16h4l3.5-6h4.5l2 6" />
      {/* Handlebars */}
      <path d="M14 6.5l1.5 3.5" />
      <path d="M13 6.5h3.5" />
      {/* Fuel Tank & Seat */}
      <path d="M8.5 10h4" />
      {/* Exhaust Pipe */}
      <path d="M7 16l3-1.5h4.5" />
    </svg>
  );
}

// 2. Handcrafted Professional Hair Salon & Barber Icon (Shears & Styling Comb, NOT AI sparkles!)
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
      {/* Barber Shears */}
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8 8l8.5 8" />
      <path d="M16.5 8L8 16" />
      {/* Fine-toothed barber comb */}
      <path d="M19 4v16" strokeWidth="2" />
      <line x1="19" y1="7" x2="16.5" y2="7" strokeWidth="1.8" />
      <line x1="19" y1="10" x2="16.5" y2="10" strokeWidth="1.8" />
      <line x1="19" y1="13" x2="16.5" y2="13" strokeWidth="1.8" />
      <line x1="19" y1="16" x2="16.5" y2="16" strokeWidth="1.8" />
    </svg>
  );
}

// 3. Trade Icon Mapping - Clean, professional, authentic TVET symbols
export const TRADE_ICON_CONFIG: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    labelMs: string;
    labelEn: string;
    descMs: string;
  }
> = {
  ALL: {
    icon: LayoutGrid,
    labelMs: "Semua Kemahiran",
    labelEn: "All Skills",
    descMs: "Katalog penuh pakar TVET",
  },
  "electrical-wiring": {
    icon: Zap,
    labelMs: "Elektrik & Pendawaian",
    labelEn: "Electrical & Wiring",
    descMs: "Single/3-phase, DB & litar",
  },
  "aircond-hvac": {
    icon: Wind,
    labelMs: "Servis Aircond",
    labelEn: "Aircond & HVAC",
    descMs: "Pemasangan, cuci & gas",
  },
  plumbing: {
    icon: Wrench,
    labelMs: "Baiki Paip & Sanitari",
    labelEn: "Plumbing & Sanitary",
    descMs: "Paip bocor, tangki & tandas",
  },
  automotive: {
    icon: Car,
    labelMs: "Mekanik Kereta",
    labelEn: "Car Mechanic",
    descMs: "Enjin, servis & brek",
  },
  "motorcycle-repair": {
    icon: MotorcycleTradeIcon,
    labelMs: "Mekanik Motosikal",
    labelEn: "Motorcycle Mechanic",
    descMs: "Servis enjin, tayar & rantai",
  },
  "welding-fabrication": {
    icon: Flame,
    labelMs: "Kimpalan & Besi",
    labelEn: "Welding & Metal",
    descMs: "Pintu pagar, grill & awning",
  },
  "tailoring-fashion": {
    icon: Scissors,
    labelMs: "Jahitan & Pakaian",
    labelEn: "Tailoring & Fashion",
    descMs: "Baju melayu, kurung & alter",
  },
  "culinary-pastry": {
    icon: UtensilsCrossed,
    labelMs: "Masakan & Katering",
    labelEn: "Culinary & Catering",
    descMs: "Katering, kuih & pastri",
  },
  "beauty-hair": {
    icon: BarberSalonIcon,
    labelMs: "Gunting & Dandanan",
    labelEn: "Hair Salon & Barber",
    descMs: "Gunting rambut & salun",
  },
  "computer-networking": {
    icon: Monitor,
    labelMs: "Komputer & IT",
    labelEn: "Computer & IT",
    descMs: "Format, wifi & rangkaian",
  },
};
