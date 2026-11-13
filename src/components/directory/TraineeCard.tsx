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

interface TraineeCardProps {
  trainee: TraineeListing;
  onSelect: (trainee: TraineeListing) => void;
}

export function TraineeCard({ trainee, onSelect }: TraineeCardProps) {
  const { language, skillsList } = usePlatform();
  const t = TRANSLATIONS[language];

  const isAvailable = trainee.availability === "AVAILABLE";
  const isBusy = trainee.availability === "BUSY";

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
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0170B9]/50 hover:shadow-md">
      <div className="space-y-3.5">
        {/* 1. KEMAHIRAN UMUM + DAERAH & NEGERI */}
        <div>
          <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span>{t.cardGeneralSkill}</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold normal-case text-[#0170B9]">
              <MapPin className="h-3 w-3 shrink-0" />
              {trainee.district || trainee.city}, {trainee.state}
            </span>
          </div>

          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {trainee.skills.map((slug) => {
              const sk = skillsList.find((s) => s.slug === slug);
              return (
                <span
                  key={slug}
                  className="rounded-lg bg-[#0170B9]/10 px-2.5 py-1 text-xs font-extrabold text-[#0170B9]"
                >
                  {sk
                    ? language === "ms"
                      ? sk.shortMalay || sk.malayName
                      : sk.shortEn || sk.name
                    : slug}
                </span>
              );
            })}
          </div>
        </div>

        {/* 2. WAKTU & HARI KETERSEDIAAN (AVAILABLE TIME, DAY & HOURS) */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                isAvailable
                  ? "bg-emerald-100/80 text-[#09B474]"
                  : isBusy
                  ? "bg-amber-100/80 text-amber-800"
                  : "bg-slate-200 text-slate-600"
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
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">
                <Zap className="h-3 w-3" />
                24/7
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Clock className="h-3.5 w-3.5 shrink-0 text-[#0170B9]" />
            <span>{scheduleDisplay}</span>
          </div>
        </div>

        {/* 3. NAMA PAKAR & NO. TELEFON */}
        <div className="flex items-start gap-3 pt-0.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0170B9] font-heading text-sm font-extrabold text-white shadow-2xs">
            {getInitials(trainee.name)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3
                onClick={() => onSelect(trainee)}
                className="cursor-pointer truncate font-heading text-base font-extrabold text-slate-900 transition group-hover:text-[#0170B9]"
              >
                {trainee.name}
              </h3>
              {trainee.isVerified && (
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-[#09B474]"
                  aria-label="Pakar Disahkan"
                />
              )}
            </div>

            <a
              href={`tel:${trainee.phone}`}
              className="mt-1 inline-flex items-center gap-1.5 font-mono-code text-xs font-bold text-slate-800 hover:text-[#0170B9]"
            >
              <Phone className="h-3.5 w-3.5 text-[#09B474]" />
              <span>{trainee.phone}</span>
            </a>
          </div>
        </div>

        {/* 4. SIJIL / PENGALAMAN & KADAR HARGA SULIT (CONFIDENTIAL) */}
        <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
          <div className="flex items-start gap-2">
            <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#0170B9]" />
            <div className="min-w-0 flex-1">
              <span className="font-bold text-slate-800">
                {trainee.experienceYears || 3} {t.cardYearsExp}
              </span>
              {trainee.certifications[0] && (
                <p className="truncate text-[11px] font-medium text-slate-600">
                  {trainee.certifications[0]}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5">
            <span className="text-[11px] font-semibold text-slate-500">
              {t.cardRateLabel}:
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700">
              <Lock className="h-3 w-3 text-amber-600" />
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
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:border-[#0170B9] hover:text-[#0170B9]"
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
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#1FAF54] px-3 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#199946]"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{t.cardWhatsapp}</span>
        </a>
      </div>
    </article>
  );
}
