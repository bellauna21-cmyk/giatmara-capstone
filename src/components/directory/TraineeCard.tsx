// src/components/directory/TraineeCard.tsx
"use client";

import React from "react";
import {
  MapPin,
  CheckCircle2,
  MessageCircle,
  Zap,
  Award,
  Clock,
  Phone,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import { TraineeListing } from "@/lib/giatmara-data";
import { getInitials } from "@/lib/avatar-utils";
import { usePlatform } from "@/context/PlatformContext";
import { TRANSLATIONS } from "@/lib/i18n";
import { TRADE_ICON_CONFIG } from "./SkillIcons";

interface TraineeCardProps {
  trainee: TraineeListing;
  onSelect: (trainee: TraineeListing) => void;
}

export function TraineeCard({ trainee, onSelect }: TraineeCardProps) {
  const { language, skillsList } = usePlatform();
  const t = TRANSLATIONS[language];

  const isAvailable = trainee.availability === "AVAILABLE";
  const isBusy = trainee.availability === "BUSY";

  const primarySkillSlug = trainee.skills[0] || "electrical-wiring";
  const primarySkill = skillsList.find((s) => s.slug === primarySkillSlug);
  const tradeConfig = TRADE_ICON_CONFIG[primarySkillSlug] || TRADE_ICON_CONFIG["ALL"];
  const SkillIcon = tradeConfig.icon;

  const displaySkillName = primarySkill
    ? language === "ms"
      ? primarySkill.shortMalay || primarySkill.malayName
      : primarySkill.shortEn || primarySkill.name
    : primarySkillSlug;

  const districtDisplay = trainee.district
    ? trainee.district
    : trainee.city;

  const workingDaysText =
    trainee.availableDays && trainee.availableDays.length > 0
      ? trainee.availableDays.length >= 6
        ? language === "ms"
          ? "Isnin - Sabtu"
          : "Mon - Sat"
        : trainee.availableDays.slice(0, 3).join(", ") +
          (trainee.availableDays.length > 3 ? "..." : "")
      : language === "ms"
      ? "Isnin - Sabtu"
      : "Mon - Sat";

  const workingHoursText = trainee.workingHours
    ? trainee.workingHours
    : "8:30 PG - 6:00 PTG";

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0170B9]/40 hover:shadow-[0_12px_24px_-6px_rgba(1,112,185,0.12)]">
      <div>
        {/* Top Meta Row: Status & Badges */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
              isAvailable
                ? "bg-emerald-50 text-[#09B474]"
                : isBusy
                ? "bg-amber-50 text-amber-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isAvailable
                  ? "bg-[#09B474]"
                  : isBusy
                  ? "bg-amber-500"
                  : "bg-slate-400"
              }`}
            />
            {isAvailable
              ? t.statusAvailable
              : isBusy
              ? t.statusBusy
              : t.statusAway}
          </span>

          <div className="flex items-center gap-1.5">
            {trainee.emergencyAvailable && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">
                <Zap className="h-3 w-3" />
                24/7
              </span>
            )}
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
              TVET
            </span>
          </div>
        </div>

        {/* 1. Kemahiran Utama & Daerah */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-1.5">
          <div className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold border border-slate-200/60 ${tradeConfig.badgeBg}`}>
            <SkillIcon className={`h-3.5 w-3.5 ${tradeConfig.iconColor}`} />
            <span>{displaySkillName}</span>
          </div>

          <div className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
            <MapPin className="h-3 w-3 text-[#0170B9]" />
            <span className="font-semibold text-slate-700">{districtDisplay}</span>
            <span>, {trainee.state}</span>
          </div>
        </div>

        {/* 2. Available Time: Hari & Waktu Ketersediaan */}
        <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700">
          <Clock className="h-3.5 w-3.5 shrink-0 text-[#0170B9]" />
          <div className="min-w-0 flex-1 flex flex-wrap items-center justify-between gap-x-2">
            <span className="font-semibold text-slate-800">{workingDaysText}</span>
            <span className="text-[11px] font-medium text-slate-500">{workingHoursText}</span>
          </div>
        </div>

        {/* 3. Nama Pakar & No Telefon */}
        <div className="mt-3.5 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 font-heading text-xs font-extrabold text-white shadow-xs">
            {getInitials(trainee.name)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3
                onClick={() => onSelect(trainee)}
                className="cursor-pointer truncate font-heading text-sm font-extrabold text-slate-900 transition group-hover:text-[#0170B9]"
              >
                {trainee.name}
              </h3>
              {trainee.isVerified && (
                <CheckCircle2
                  className="h-3.5 w-3.5 shrink-0 text-[#0170B9]"
                  aria-label="Verified"
                />
              )}
            </div>

            <p className="mt-0.5 line-clamp-1 text-xs text-slate-600">
              {trainee.headline}
            </p>

            <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-slate-500">
              <Phone className="h-3 w-3 text-slate-400" />
              <span>+{trainee.whatsapp}</span>
            </div>
          </div>
        </div>

        {/* 4. Sijil & Pengalaman */}
        <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-slate-100 bg-white px-2.5 py-1.5 text-xs text-slate-600">
          <Award className="h-3.5 w-3.5 shrink-0 text-[#0170B9]" />
          <span className="truncate font-medium">
            {trainee.certifications[0] || (language === "ms" ? "Sijil Kemahiran Malaysia (SKM)" : "SKM Certified")}
          </span>
          <span className="text-slate-300">•</span>
          <span className="shrink-0 font-bold text-slate-700">
            {trainee.experienceYears || 3} {language === "ms" ? "Tahun Exp" : "Yrs Exp"}
          </span>
        </div>

        {/* 5. Kadar Harga Sulit (Bincang ikut skop kerja) */}
        <div className="mt-2.5 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-xs">
          <span className="text-[11px] font-semibold text-slate-500">
            {t.cardRateLabel}:
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-slate-700">
            <Lock className="h-3 w-3 text-slate-400" />
            <span>{t.cardRateConfidential}</span>
          </span>
        </div>
      </div>

      {/* 6. Butang Tindakan (Profil Detail & WhatsApp) */}
      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => onSelect(trainee)}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <span>{t.cardViewProfile}</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
        </button>

        <a
          href={`https://wa.me/${trainee.whatsapp}?text=${encodeURIComponent(
            language === "ms"
              ? `Salam ${trainee.name}, saya melihat profil perkhidmatan anda (${trainee.headline}) dan ingin berbincang mengenai kerja.`
              : `Hello ${trainee.name}, I saw your service profile (${trainee.headline}) and would like to inquire about a job.`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#1FAF54] px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#199946]"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>{t.cardWhatsapp}</span>
        </a>
      </div>
    </article>
  );
}
