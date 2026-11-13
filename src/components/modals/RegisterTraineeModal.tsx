// src/components/modals/RegisterTraineeModal.tsx
"use client";

import React, { useState } from "react";
import { Wrench, X, Sparkles } from "lucide-react";
import {
  MALAYSIA_STATES,
  MALAYSIA_DISTRICTS_BY_STATE,
  TIME_SLOTS,
} from "@/lib/giatmara-data";
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
  const { registerTrainee, language, skillsList } = usePlatform();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "+601",
    state: "Perak",
    district: "Kuala Kangsar",
    experienceYears: 3,
    certification: "Sijil Kemahiran Malaysia (SKM) / Sijil Profesional TVET",
    headline: "",
    skillSlug: "electrical-wiring",
    startTime: "09:00 PG",
    endTime: "06:00 PTG",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultDays = [
      "Isnin",
      "Selasa",
      "Rabu",
      "Khamis",
      "Jumaat",
      "Sabtu",
    ];
    registerTrainee({
      name: form.name,
      email: form.email,
      headline:
        form.headline ||
        (language === "ms"
          ? "Pakar Kemahiran Bertauliah"
          : "Certified Skilled Specialist"),
      bio:
        language === "ms"
          ? `Pakar kemahiran berpengalaman selama ${form.experienceYears} tahun menyediakan perkhidmatan di sekitar ${form.district}, ${form.state}.`
          : `Experienced skilled specialist (${form.experienceYears} years) serving clients in ${form.district}, ${form.state}.`,
      phone: form.phone,
      whatsapp: form.phone.replace(/[^0-9]/g, ""),
      state: form.state,
      district: form.district,
      city: form.district,
      giatmaraCenter: form.district,
      graduationYear: 2023,
      experienceYears: Number(form.experienceYears) || 2,
      studentId: `PKR-${Date.now().toString().slice(-4)}`,
      certifications: [form.certification || "Sijil Kemahiran TVET"],
      portfolio: [],
      isVerified: false,
      isPubliclyListed: true,
      isAccountActive: true,
      planTier: "TRIAL",
      trialEndsAt: "2027-02-11",
      paymentProofStatus: "NONE",
      availability: "AVAILABLE",
      availableDays: defaultDays,
      startTime: form.startTime,
      endTime: form.endTime,
      workingHours: `Isnin - Sabtu • ${form.startTime} - ${form.endTime}`,
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-3 backdrop-blur-xs sm:p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Clean Modern Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0170B9]/10 text-[#0170B9]">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-slate-900">
                {language === "ms"
                  ? "Daftar Sebagai Pakar Kemahiran"
                  : "Register as Skilled Specialist"}
              </h3>
              <p className="text-xs font-medium text-slate-500">
                {language === "ms"
                  ? "Percubaan Percuma 3 Bulan (Program Perintis)"
                  : "Includes 3-Month Free Pioneer Trial"}
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

        <div className="grid grid-cols-1 gap-3.5 p-5 text-xs sm:grid-cols-2 sm:p-6">
          {/* Free Trial Banner */}
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-900 sm:col-span-2">
            <Sparkles className="h-4 w-4 shrink-0 text-[#09B474]" />
            <span className="font-bold">
              {language === "ms"
                ? "Akaun anda akan terus disenaraikan secara PERCUMA selama 3 bulan pertama!"
                : "Your profile will be listed FREE for the first 3 months!"}
            </span>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block font-bold text-slate-700">
              {language === "ms" ? "Nama Penuh Pakar" : "Full Name"}
            </label>
            <input
              required
              type="text"
              placeholder="Ahmad Firdaus bin Zainal"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:border-[#0170B9] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              {language === "ms" ? "Alamat Emel" : "Email Address"}
            </label>
            <input
              required
              type="email"
              placeholder="firdaus@gmail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:border-[#0170B9] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              {language === "ms"
                ? "No. Telefon / WhatsApp"
                : "Phone / WhatsApp"}
            </label>
            <input
              required
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:border-[#0170B9] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              {language === "ms" ? "Negeri (State)" : "State"}
            </label>
            <select
              value={form.state}
              onChange={(e) => {
                const st = e.target.value;
                const dists = MALAYSIA_DISTRICTS_BY_STATE[st] || [];
                setForm({
                  ...form,
                  state: st,
                  district: dists[0] || "",
                });
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm"
            >
              {MALAYSIA_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              {language === "ms" ? "Daerah (District)" : "District"}
            </label>
            <select
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm"
            >
              {(MALAYSIA_DISTRICTS_BY_STATE[form.state] || []).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              {language === "ms"
                ? "Bidang Kemahiran Utama"
                : "Primary Skill"}
            </label>
            <select
              value={form.skillSlug}
              onChange={(e) => setForm({ ...form, skillSlug: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm"
            >
              {skillsList.map((sk) => (
                <option key={sk.id} value={sk.slug}>
                  {language === "ms" ? sk.malayName : sk.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              {language === "ms"
                ? "Tahun Pengalaman"
                : "Years of Experience"}
            </label>
            <input
              required
              type="number"
              min={1}
              max={40}
              value={form.experienceYears}
              onChange={(e) =>
                setForm({ ...form, experienceYears: Number(e.target.value) })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono-code text-sm focus:border-[#0170B9] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              {language === "ms" ? "Waktu Mula Kerja" : "Start Time"}
            </label>
            <select
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm"
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold text-slate-700">
              {language === "ms" ? "Waktu Tamat Kerja" : "End Time"}
            </label>
            <select
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm"
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block font-bold text-slate-700">
              {language === "ms"
                ? "Sijil / Kelayakan Kemahiran (SKM / PW2 / CIDB / Pengalaman)"
                : "Certificate / Qualification"}
            </label>
            <input
              required
              type="text"
              value={form.certification}
              onChange={(e) =>
                setForm({ ...form, certification: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:border-[#0170B9] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block font-bold text-slate-700">
              {language === "ms"
                ? "Tajuk Perkhidmatan Anda"
                : "Service Headline"}
            </label>
            <input
              required
              type="text"
              placeholder={
                language === "ms"
                  ? "cth: Pendawai Elektrik PW2 & Servis Aircond Rumah"
                  : "e.g. Certified PW2 Wireman & Aircond Specialist"
              }
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:border-[#0170B9] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-3 sm:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 font-bold text-slate-600 hover:bg-slate-50"
            >
              {language === "ms" ? "Batal" : "Cancel"}
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#0170B9] px-5 py-2.5 font-bold text-white shadow-xs hover:bg-[#005a96]"
            >
              {language === "ms"
                ? "Daftar Percubaan Percuma 3 Bulan"
                : "Activate 3-Month Free Trial"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
