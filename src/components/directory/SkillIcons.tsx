// src/components/directory/SkillIcons.tsx
"use client";

import React from "react";
import {
  LayoutGrid,
  Zap,
  Wind,
  Wrench,
  Car,
  Gauge,
  Flame,
  Scissors,
  UtensilsCrossed,
  Sparkles,
  Monitor,
} from "lucide-react";

export interface IconProps {
  className?: string;
}

// Clean, standard, non-AI line stroke icons
export const TRADE_ICON_CONFIG: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }
> = {
  ALL: {
    icon: LayoutGrid,
    label: "Semua Kemahiran",
  },
  "electrical-wiring": {
    icon: Zap,
    label: "Pendawaian Elektrik",
  },
  "aircond-hvac": {
    icon: Wind,
    label: "Penyaman Udara",
  },
  plumbing: {
    icon: Wrench,
    label: "Perpaipan & Sanitari",
  },
  automotive: {
    icon: Car,
    label: "Mekanik Automotif",
  },
  "motorcycle-repair": {
    icon: Gauge,
    label: "Baiki Motosikal",
  },
  "welding-fabrication": {
    icon: Flame,
    label: "Kimpalan & Logam",
  },
  "tailoring-fashion": {
    icon: Scissors,
    label: "Jahitan & Fesyen",
  },
  "culinary-pastry": {
    icon: UtensilsCrossed,
    label: "Masakan & Kulinari",
  },
  "beauty-hair": {
    icon: Sparkles,
    label: "Dandanan & Salun",
  },
  "computer-networking": {
    icon: Monitor,
    label: "Komputer & Rangkaian",
  },
};
