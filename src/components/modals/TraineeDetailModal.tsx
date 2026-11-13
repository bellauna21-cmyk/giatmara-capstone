// src/components/modals/TraineeDetailModal.tsx
"use client";

import React from "react";
import {
  CheckCircle2,
  MapPin,
  Clock,
  Award,
  Briefcase,
  Phone,
  MessageCircle,
  X,
  ShieldAlert,
  Lock,
  Calendar,
} from "lucide-react";
import { TraineeListing } from "@/lib/giatmara-data";
import { getInitials } from "@/lib/avatar-utils";
import { usePlatform } from "@/context/PlatformContext";
import { TRANSLATIONS } from "@/lib/i18n";

interface TraineeDetailModalProps {
  trainee: TraineeListing | null;
  onClose: () => void;
}

export function TraineeDetailModal({
  trainee,
  onClose,
}: TraineeDetailModalProps) {
  const { language, skillsList } = usePlatform();
  const t = TRANSLATIONS[language];

  if (!trainee) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-3 backdrop-blur-xs sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-white px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#0170B9] font-heading text-lg font-extrabold text-white shadow-xs">
              {getInitials(trainee.name)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {trainee.isVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-[#09B474]">
                    <CheckCircle2 className="h-3 w-3" />
                    {language === "ms"
                      ? "Pakar Kemahiran Disahkan"
                      : "Verified Skilled Specialist"}
                  </span>
                )}
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                  {trainee.experienceYears || 3} {t.cardYearsExp}
                </span>
              </div>
              <h3 className="mt-1 font-heading text-base font-extrabold text-slate-900 sm:text-lg">
                {trainee.name}
              </h3>
              <p className="text-xs font-medium text-slate-500">
                {trainee.headline}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="space-y-4 p-5 sm:p-6">
          {/* Safety Precaution Inside Profile Modal */}
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="leading-relaxed">
              <strong className="font-extrabold">{t.safetyBannerTitle}</strong>{" "}
              {t.safetyBannerDesc}
            </p>
          </div>

          {/* Detailed Bio */}
          <div>
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {language === "ms"
                ? "Penerangan Perkhidmatan & Pengalaman"
                : "Service Overview & Experience"}
            </span>
            <p className="text-xs leading-relaxed text-slate-700">
              {trainee.bio}
            </p>
          </div>

          {/* Info Grid: Location, Schedule, Phone, Rate */}
          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#09B474]" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {language === "ms"
                    ? "Daerah & Negeri Liputan"
                    : "District & State Coverage"}
                </span>
                <span className="font-bold text-slate-900">
                  {trainee.district || trainee.city}, {trainee.state}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#0170B9]" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {language === "ms" ? "No. Telefon" : "Phone Number"}
                </span>
                <span className="font-mono-code font-bold text-slate-900">
                  {trainee.phone}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#0170B9]" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {t.cardAvailableTime}
                </span>
                <span className="font-bold text-slate-900">
                  {trainee.startTime || "09:00 PG"} -{" "}
                  {trainee.endTime || "06:00 PTG"}
                </span>
                {trainee.availableDays && trainee.availableDays.length > 0 && (
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    <Calendar className="mr-1 inline h-3 w-3 text-[#0170B9]" />
                    {trainee.availableDays.join(", ")}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {t.cardRateLabel}
                </span>
                <span className="font-bold text-slate-900">
                  {t.cardRateConfidential}
                </span>
                <p className="text-[10px] text-slate-500">
                  {language === "ms"
                    ? "Bincang harga selepas pemeriksaan kerja"
                    : "Discuss quote upon site inspection"}
                </p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {t.cardGeneralSkill}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {trainee.skills.map((slug) => {
                const sk = skillsList.find((s) => s.slug === slug);
                return (
                  <span
                    key={slug}
                    className="rounded-lg bg-[#0170B9]/10 px-3 py-1 text-xs font-bold text-[#0170B9]"
                  >
                    {sk ? (language === "ms" ? sk.malayName : sk.name) : slug}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <span className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <Award className="h-4 w-4 text-[#0170B9]" />
              {t.cardCertExp} ({trainee.experienceYears || 3} {t.cardYearsExp})
            </span>
            <ul className="space-y-1.5 text-xs">
              {trainee.certifications.map((c, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2 font-semibold text-slate-800"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#09B474]" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          {trainee.portfolio && trainee.portfolio.length > 0 && (
            <div>
              <span className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <Briefcase className="h-4 w-4 text-[#09B474]" />
                {language === "ms"
                  ? "Rekod Kerja & Projek Selesai"
                  : "Completed Work Portfolio"}
              </span>
              <div className="space-y-2">
                {trainee.portfolio.map((proj) => (
                  <div
                    key={proj.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{proj.title}</p>
                      <p className="text-[11px] text-slate-500">
                        {proj.clientLocation || proj.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Contact Buttons */}
          <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-4 sm:flex-row">
            <a
              href={`tel:${trainee.phone}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <Phone className="h-4 w-4 text-[#0170B9]" />
              <span>
                {language === "ms" ? "Hubungi" : "Call"} {trainee.phone}
              </span>
            </a>
            <a
              href={`https://wa.me/${trainee.whatsapp}?text=${encodeURIComponent(
                language === "ms"
                  ? `Salam ${trainee.name}, saya melihat profil anda di Direktori Pakar Kemahiran (${trainee.district}, ${trainee.state}) dan ingin bertanya mengenai perkhidmatan anda.`
                  : `Hi ${trainee.name}, I saw your profile on the Skilled Specialist Directory and would like to inquire about your service.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1FAF54] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#189344]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>
                {language === "ms"
                  ? "WhatsApp Pakar Terus"
                  : "WhatsApp Specialist"}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
