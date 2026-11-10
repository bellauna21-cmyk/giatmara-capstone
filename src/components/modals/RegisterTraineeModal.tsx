// src/components/modals/RegisterTraineeModal.tsx
"use client";

import React, { useState } from "react";
import { GraduationCap, X, CheckCircle2 } from "lucide-react";
import { GIATMARA_CENTERS_BY_STATE } from "@/lib/giatmara-data";
import { usePlatform } from "@/context/PlatformContext";

interface RegisterTraineeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: () => void;
}

export function RegisterTraineeModal({
  isOpen,
  onClose,
  onRegistered,
}: RegisterTraineeModalProps) {
  const { skillsList, registerTrainee } = usePlatform();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "Perak",
    city: "Kuala Kangsar",
    giatmaraCenter: "GIATMARA Kuala Kangsar",
    studentId: "GM-PK-2026-0999",
    headline: "",
    skillSlug: "electrical-wiring",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerTrainee({
      name: form.name,
      email: form.email,
      headline: form.headline || "Certified GIATMARA Technical Specialist",
      bio: `Graduated from ${form.giatmaraCenter}. Providing reliable technical services in ${form.city}, ${form.state}.`,
      phone: form.phone,
      whatsapp: form.phone.replace(/[^0-9]/g, ""),
      state: form.state,
      city: form.city,
      giatmaraCenter: form.giatmaraCenter,
      graduationYear: 2026,
      studentId: form.studentId,
      certifications: ["Sijil Profesional GIATMARA"],
      portfolio: [],
      isVerified: false,
      isPubliclyListed: false,
      planTier: "BASIC",
      availability: "AVAILABLE",
      workingHours: "Mon - Sat, 9:00 AM - 6:00 PM",
      emergencyAvailable: false,
      startingRateRM: 50,
      skills: [form.skillSlug],
      rating: 5.0,
      completedJobs: 0,
    });
    onRegistered();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Clean Modern Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0170B9]/10 text-[#0170B9]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-slate-900">
                Register as a GIATMARA Trainee
              </h3>
              <p className="text-xs text-slate-500">
                Create your public skill profile for the Malaysian directory
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3.5 p-6 text-xs sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block font-bold text-slate-700">
              Full Name
            </label>
            <input
              required
              type="text"
              placeholder="Ahmad Firdaus bin Zainal"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-[#0170B9] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              Email Address
            </label>
            <input
              required
              type="email"
              placeholder="firdaus@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-[#0170B9] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              WhatsApp / Phone Number
            </label>
            <input
              required
              type="text"
              placeholder="+60123456789"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-[#0170B9] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              State (Negeri)
            </label>
            <select
              value={form.state}
              onChange={(e) => {
                const st = e.target.value;
                setForm({
                  ...form,
                  state: st,
                  giatmaraCenter: GIATMARA_CENTERS_BY_STATE[st]?.[0] || "",
                });
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 focus:border-[#0170B9]"
            >
              {Object.keys(GIATMARA_CENTERS_BY_STATE).map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              GIATMARA Campus
            </label>
            <select
              value={form.giatmaraCenter}
              onChange={(e) =>
                setForm({ ...form, giatmaraCenter: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 focus:border-[#0170B9]"
            >
              {(GIATMARA_CENTERS_BY_STATE[form.state] || []).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              City / Coverage Area
            </label>
            <input
              required
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-[#0170B9] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              GIATMARA Matrix ID
            </label>
            <input
              required
              type="text"
              value={form.studentId}
              onChange={(e) => setForm({ ...form, studentId: e.target.value })}
              className="font-mono-code w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-bold text-slate-900 focus:border-[#0170B9] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block font-bold text-slate-700">
              Primary Trade Skill
            </label>
            <select
              value={form.skillSlug}
              onChange={(e) => setForm({ ...form, skillSlug: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 focus:border-[#0170B9]"
            >
              {skillsList.map((sk) => (
                <option key={sk.id} value={sk.slug}>
                  {sk.malayName} ({sk.name})
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block font-bold text-slate-700">
              Service Headline
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Certified PW2 Wireman & Aircond Specialist"
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-[#0170B9] focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2.5 border-t border-slate-100 bg-slate-50/70 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0170B9] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#005a96]"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Create Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
