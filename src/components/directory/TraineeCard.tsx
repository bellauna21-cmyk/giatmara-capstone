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
  ShieldCheck,
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

  const primarySkillSlug = trainee.skills[0] || "ALL";
  const skillConfig = TRADE_ICON_CONFIG[primarySkillSlug] || TRADE_ICON_CONFIG["ALL"];
  const PrimarySkillIcon = skillConfig.icon;

  const scheduleDisplay =
    trainee.availableDays && trainee.availableDays.length > 0
      ? `${
          trainee.availableDays.length === 7
            ? language === "ms"
              ? "Setiap Hari"
              : "Daily"
            : `${trainee.availableDays[0]} - ${
                trainee.availableDays[trainee.availableDays.length - 1]
              }`
        } • ${trainee.startTime || "09:00 PG"} - ${
          trainee.endTime || "06:00 PTG"
        }`
      : trainee.workingHours;

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#01528A] hover:shadow-md">
      {/* Top Trade Accent Strip for Authentic Personality */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: skillConfig.accentColor }}
      />

      <div className="space-y-3.5 pt-1">
        {/* 1. KEMAHIRAN UMUM + DAERAH & NEGERI (NO CAMPUS) */}
        <div>
          <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-1">
              <PrimarySkillIcon className="h-3.5 w-3.5 text-slate-500" />
              <span>{t.cardGeneralSkill}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold normal-case text-[#01528A]">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C8102E]" />
              {trainee.district || trainee.city}, {trainee.state}
            </span>
          </div>

          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {trainee.skills.map((slug) => {
              const sk = skillsList.find((s) => s.slug === slug);
              const conf = TRADE_ICON_CONFIG[slug] || TRADE_ICON_CONFIG["ALL"];
              const Icon = conf.icon;
              return (
                <span
                  key={slug}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-extrabold ${conf.badgeBg}`}
                >
                  <Icon className="h-3 w-3" />
                  <span>
                    {sk
                      ? language === "ms"
                        ? sk.shortMalay || sk.malayName
                        : sk.shortEn || sk.name
                      : slug}
                  </span>
                </span>
              );
            })}
          </div>
        </div>

        {/* 2. WAKTU & HARI KETERSEDIAAN (AVAILABLE TIME, DAY & HOURS) */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                isAvailable
                  ? "bg-emerald-100 text-[#09B474]"
                  : isBusy
                  ? "bg-amber-100 text-amber-800"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isAvailable
                    ? "bg-[#09B474]"
                    : isBusy
                    ? "bg-amber-500"
                    : "bg-slate-500"
                }`}
              />
              {isAvailable
                ? t.statusAvailable
                : isBusy
                ? t.statusBusy
                : t.statusAway}
            </span>

            {trainee.emergencyAvailable && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                <Zap className="h-3 w-3 text-amber-500 fill-amber-500" />
                24/7 Kecemasan
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Clock className="h-3.5 w-3.5 shrink-0 text-[#01528A]" />
            <span>{scheduleDisplay}</span>
          </div>
        </div>

        {/* 3. NAMA PAKAR & NO. TELEFON */}
        <div className="flex items-start gap-3 pt-0.5">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-heading text-sm font-extrabold text-white shadow-xs"
            style={{ backgroundColor: skillConfig.accentColor }}
          >
            {getInitials(trainee.name)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3
                onClick={() => onSelect(trainee)}
                className="cursor-pointer truncate font-heading text-base font-extrabold text-slate-900 transition hover:text-[#01528A]"
              >
                {trainee.name}
              </h3>
              {trainee.isVerified && (
                <span title={language === "ms" ? "Pakar TVET Disahkan" : "Verified TVET Expert"}>
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-[#09B474]"
                    aria-label="Pakar Disahkan"
                  />
                </span>
              )}
            </div>

            <a
              href={`tel:${trainee.phone}`}
              className="mt-1 inline-flex items-center gap-1.5 font-mono-code text-xs font-bold text-slate-800 hover:text-[#01528A]"
            >
              <Phone className="h-3.5 w-3.5 text-[#09B474]" />
              <span>{trainee.phone}</span>
            </a>
          </div>
        </div>

        {/* 4. SIJIL / PENGALAMAN & KADAR HARGA SULIT (CONFIDENTIAL) */}
        <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
          <div className="flex items-start gap-2">
            <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#01528A]" />
            <div className="min-w-0 flex-1">
              <span className="font-bold text-slate-900">
                {trainee.experienceYears || 3} {t.cardYearsExp}
              </span>
              {trainee.certifications[0] && (
                <p className="truncate text-[11px] font-medium text-slate-600">
                  {trainee.certifications[0]}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-amber-50/70 border border-amber-200/80 px-3 py-1.5">
            <span className="text-[11px] font-bold text-amber-900">
              {t.cardRateLabel}:
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-950">
              <Lock className="h-3 w-3 text-amber-700" />
              {t.cardRateConfidential}
            </span>
          </div>
        </div>
      </div>

      {/* 5. ACTION BUTTONS: LIHAT PROFIL DETAIL & WHATSAPP */}
      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3.5">
        <button
          type="button"
          onClick={() => onSelect(trainee)}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:border-[#01528A] hover:bg-slate-50 hover:text-[#01528A]"
        >
          <span>{t.cardViewProfile}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>

        <a
          href={`https://wa.me/${trainee.whatsapp}?text=${encodeURIComponent(
            language === "ms"
              ? `Salam ${trainee.name}, saya melihat profil kemahiran anda di Direktori Pakar Kemahiran (${trainee.district}, ${trainee.state}) dan ingin bertanya mengenai perkhidmatan anda.`
              : `Hi ${trainee.name}, I found your profile on the Skilled Specialist Directory (${trainee.district}, ${trainee.state}) and would like to inquire about your service.`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#1FAF54] px-3 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#189344]"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{t.cardWhatsapp}</span>
        </a>
      </div>
    </article>
  );
}
