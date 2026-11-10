"use client";

import React from "react";
import {
  MapPin,
  Star,
  CheckCircle2,
  MessageCircle,
  GraduationCap,
  Zap,
  Award,
  ArrowUpRight,
} from "lucide-react";
import { GIATMARA_SKILLS, TraineeListing } from "@/lib/giatmara-data";
import { getInitials } from "@/lib/avatar-utils";

interface TraineeCardProps {
  trainee: TraineeListing;
  onSelect: (trainee: TraineeListing) => void;
}

export function TraineeCard({ trainee, onSelect }: TraineeCardProps) {
  const isAvailable = trainee.availability === "AVAILABLE";
  const isBusy = trainee.availability === "BUSY";

  const tierBadge = {
    PREMIUM: {
      label: "Featured Pro",
      className: "bg-amber-50 text-amber-800 border-amber-200/80",
      avatarBg: "bg-[#0170B9] text-white",
    },
    PRO: {
      label: "Pro Member",
      className: "bg-blue-50 text-[#0170B9] border-blue-200/80",
      avatarBg: "bg-slate-900 text-white",
    },
    BASIC: {
      label: "Listed",
      className: "bg-slate-100 text-slate-600 border-slate-200",
      avatarBg: "bg-slate-700 text-white",
    },
  }[trainee.planTier];

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_2px_10px_-3px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-[#0170B9]/40 hover:shadow-[0_14px_30px_-8px_rgba(1,112,185,0.12)]">
      <div>
        {/* Top Meta Row: Availability + Tier/Matrix */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
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
            {isAvailable ? "Available now" : isBusy ? "Booked today" : "Away"}
          </span>

          <div className="flex items-center gap-1.5">
            {trainee.emergencyAvailable && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-600">
                <Zap className="h-3 w-3" />
                24/7
              </span>
            )}
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${tierBadge.className}`}
            >
              {tierBadge.label}
            </span>
          </div>
        </div>

        {/* Identity Row */}
        <div className="mt-4 flex items-start gap-3.5">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-heading text-sm font-extrabold shadow-xs ${tierBadge.avatarBg}`}
          >
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
                  className="h-4 w-4 shrink-0 text-[#0170B9]"
                  aria-label="Verified GIATMARA Trainee"
                />
              )}
            </div>

            <p className="mt-0.5 line-clamp-1 text-xs font-semibold text-slate-600">
              {trainee.headline}
            </p>

            <div className="mt-1.5 flex items-center gap-2.5 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 font-bold text-slate-800">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {trainee.rating.toFixed(1)}
              </span>
              <span>•</span>
              <span>{trainee.completedJobs} jobs completed</span>
            </div>
          </div>
        </div>

        {/* Modern Soft Bento Info Box: Campus & Rate */}
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-slate-100 bg-slate-50/90 p-3">
          <div>
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <GraduationCap className="h-3 w-3 text-[#0170B9]" />
              <span>Campus</span>
            </div>
            <p className="mt-0.5 truncate text-xs font-bold text-slate-800">
              {trainee.giatmaraCenter}
            </p>
            <p className="font-mono-code text-[10px] text-slate-400">
              {trainee.studentId}
            </p>
          </div>

          <div className="border-l border-slate-200/80 pl-3 text-right">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Starting Rate
            </span>
            <p className="mt-0.5 font-mono-code text-sm font-extrabold text-slate-900">
              RM {trainee.startingRateRM}
              <span className="text-[11px] font-normal text-slate-500">
                /hr
              </span>
            </p>
            <p className="truncate text-[10px] font-medium text-slate-500">
              <MapPin className="mr-0.5 inline h-2.5 w-2.5 text-[#0170B9]" />
              {trainee.city}, {trainee.state}
            </p>
          </div>
        </div>

        {/* Short Bio */}
        <p className="mt-3.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {trainee.bio}
        </p>

        {/* Skill Chips */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {trainee.skills.map((slug) => {
            const sk = GIATMARA_SKILLS.find((s) => s.slug === slug);
            return (
              <span
                key={slug}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
              >
                {sk ? sk.malayName : slug}
              </span>
            );
          })}
          {trainee.certifications[0] && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-[#0170B9]/8 px-2.5 py-1 text-[11px] font-semibold text-[#0170B9]">
              <Award className="h-3 w-3" />
              <span className="max-w-[160px] truncate">
                {trainee.certifications[0]}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex items-center gap-2.5 border-t border-slate-100 pt-4">
        <button
          onClick={() => onSelect(trainee)}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <span>Profile</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
        </button>

        <a
          href={`https://wa.me/${trainee.whatsapp}?text=${encodeURIComponent(
            `Hi ${trainee.name}, I found your GIATMARA profile (${trainee.headline}) on GIATMARA SkillsHub and would like to inquire about your service.`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-[1.4] items-center justify-center gap-1.5 rounded-xl bg-[#1FAF54] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#199946]"
        >
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </article>
  );
}
