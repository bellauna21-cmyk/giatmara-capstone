// src/components/modals/TraineeDetailModal.tsx
"use client";

import React from "react";
import {
  CheckCircle2,
  MapPin,
  Clock,
  GraduationCap,
  Award,
  Briefcase,
  Phone,
  MessageCircle,
  X,
} from "lucide-react";
import { TraineeListing, GIATMARA_SKILLS } from "@/lib/giatmara-data";
import { getInitials } from "@/lib/avatar-utils";

interface TraineeDetailModalProps {
  trainee: TraineeListing | null;
  onClose: () => void;
}

export function TraineeDetailModal({
  trainee,
  onClose,
}: TraineeDetailModalProps) {
  if (!trainee) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clean Modern Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-6 py-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0170B9] font-heading text-lg font-extrabold text-white shadow-xs">
              {getInitials(trainee.name)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono-code rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                  {trainee.studentId}
                </span>
                {trainee.isVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-[#09B474]">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified GIATMARA
                  </span>
                )}
              </div>
              <h3 className="mt-1 font-heading text-lg font-extrabold text-slate-900">
                {trainee.name}
              </h3>
              <p className="text-xs font-medium text-slate-500">
                {trainee.headline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="space-y-5 p-6">
          <p className="text-xs leading-relaxed text-slate-600">
            {trainee.bio}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[#0170B9]" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  GIATMARA Campus
                </span>
                <span className="font-bold text-slate-900">
                  {trainee.giatmaraCenter} ({trainee.graduationYear})
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#09B474]" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Coverage Area
                </span>
                <span className="font-bold text-slate-900">
                  {trainee.city}, {trainee.state}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#0170B9]" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Working Hours
                </span>
                <span className="font-bold text-slate-900">
                  {trainee.workingHours}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-[#09B474]" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Starting Rate
                </span>
                <span className="font-mono-code font-extrabold text-slate-900">
                  RM {trainee.startingRateRM} / hr
                </span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              TVET Skill Specializations
            </span>
            <div className="flex flex-wrap gap-1.5">
              {trainee.skills.map((slug) => {
                const sk = GIATMARA_SKILLS.find((s) => s.slug === slug);
                return (
                  <span
                    key={slug}
                    className="rounded-lg bg-[#0170B9]/10 px-3 py-1 text-xs font-bold text-[#0170B9]"
                  >
                    {sk ? `${sk.malayName} (${sk.name})` : slug}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <span className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <Award className="h-4 w-4 text-[#0170B9]" />
              Official Certifications
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
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Recent Completed Work
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
                    <span className="font-mono-code shrink-0 rounded-md bg-emerald-50 px-2.5 py-1 font-bold text-[#09B474]">
                      RM {proj.costRM}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Contact Buttons */}
          <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
            <a
              href={`tel:${trainee.phone}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <Phone className="h-4 w-4 text-[#0170B9]" />
              <span>Call {trainee.phone}</span>
            </a>
            <a
              href={`https://wa.me/${trainee.whatsapp}?text=${encodeURIComponent(
                `Hi ${trainee.name}, I saw your GIATMARA profile on GIATMARA SkillsHub and would like to inquire about your service.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1FAF54] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#189344]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
