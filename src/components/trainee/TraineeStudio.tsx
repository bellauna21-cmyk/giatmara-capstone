"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  QrCode,
  Save,
  Trash2,
  Eye,
  EyeOff,
  Award,
  Briefcase,
  UserCheck,
  Wrench,
  Clock,
  Power,
  AlertTriangle,
  LogOut,
  Sparkles,
} from "lucide-react";
import {
  MALAYSIA_STATES,
  MALAYSIA_DISTRICTS_BY_STATE,
  SUBSCRIPTION_TIERS,
  DAYS_OF_WEEK,
  TIME_SLOTS,
  TraineeListing,
  PlanTier,
  AvailabilityStatus,
} from "@/lib/giatmara-data";
import { getInitials } from "@/lib/avatar-utils";
import { usePlatform } from "@/context/PlatformContext";

interface TraineeStudioProps {
  trainees: TraineeListing[];
  activeTraineeId: string;
  setActiveTraineeId: (id: string) => void;
  onUpdateTrainee: (id: string, updates: Partial<TraineeListing>) => void;
  onDeleteAccount: (id: string) => void;
  onOpenPaymentModal: (tier: PlanTier) => void;
  onPreviewProfile: (trainee: TraineeListing) => void;
  onLogout: () => void;
}

export function TraineeStudio({
  trainees,
  activeTraineeId,
  setActiveTraineeId,
  onUpdateTrainee,
  onDeleteAccount,
  onOpenPaymentModal,
  onPreviewProfile,
  onLogout,
}: TraineeStudioProps) {
  const { language, skillsList } = usePlatform();
  const activeTrainee =
    trainees.find((t) => t.id === activeTraineeId) || trainees[0];

  const [studioTab, setStudioTab] = useState<
    "OVERVIEW" | "PROFILE" | "PORTFOLIO" | "SUBSCRIPTION"
  >("OVERVIEW");

  const [editHeadline, setEditHeadline] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editExpYears, setEditExpYears] = useState(3);
  const [editPhone, setEditPhone] = useState("");
  const [editState, setEditState] = useState("Perak");
  const [editDistrict, setEditDistrict] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([
    "Isnin",
    "Selasa",
    "Rabu",
    "Khamis",
    "Jumaat",
    "Sabtu",
  ]);
  const [startTime, setStartTime] = useState("09:00 PG");
  const [endTime, setEndTime] = useState("06:00 PTG");

  const [newCertInput, setNewCertInput] = useState("");
  const [projTitle, setProjTitle] = useState("");
  const [projLocation, setProjLocation] = useState("");
  const [projCost, setProjCost] = useState(150);
  const [projSummary, setProjSummary] = useState("");
  const [saveToast, setSaveToast] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (activeTrainee) {
      setEditHeadline(activeTrainee.headline);
      setEditBio(activeTrainee.bio);
      setEditExpYears(activeTrainee.experienceYears || 3);
      setEditPhone(activeTrainee.phone);
      setEditState(activeTrainee.state);
      setEditDistrict(
        activeTrainee.district ||
          (MALAYSIA_DISTRICTS_BY_STATE[activeTrainee.state] || [])[0] ||
          activeTrainee.city
      );
      setSelectedDays(
        activeTrainee.availableDays && activeTrainee.availableDays.length > 0
          ? activeTrainee.availableDays
          : ["Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"]
      );
      setStartTime(activeTrainee.startTime || "09:00 PG");
      setEndTime(activeTrainee.endTime || "06:00 PTG");
      setConfirmDelete(false);
    }
  }, [activeTrainee]);

  if (!activeTrainee) return null;

  const formatWorkingHoursSummary = (
    days: string[],
    start: string,
    end: string
  ) => {
    if (days.length === 0) return "Mengikut Temujanji";
    if (days.length === 7) return `Setiap Hari • ${start} - ${end}`;
    return `${days[0]} - ${days[days.length - 1]} • ${start} - ${end}`;
  };

  const handleToggleDay = (dayId: string) => {
    const exists = selectedDays.includes(dayId);
    const ordered = DAYS_OF_WEEK.map((d) => d.id).filter((d) =>
      exists ? d !== dayId && selectedDays.includes(d) : d === dayId || selectedDays.includes(d)
    );
    if (ordered.length === 0) return;
    setSelectedDays(ordered);
    onUpdateTrainee(activeTrainee.id, {
      availableDays: ordered,
      workingHours: formatWorkingHoursSummary(ordered, startTime, endTime),
    });
  };

  const handleSaveProfileDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedHours = formatWorkingHoursSummary(
      selectedDays,
      startTime,
      endTime
    );
    onUpdateTrainee(activeTrainee.id, {
      headline: editHeadline,
      bio: editBio,
      experienceYears: Number(editExpYears) || 1,
      availableDays: selectedDays,
      startTime,
      endTime,
      workingHours: formattedHours,
      phone: editPhone,
      whatsapp: editPhone.replace(/[^0-9]/g, ""),
      state: editState,
      district: editDistrict,
      city: editDistrict,
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleToggleSkill = (slug: string) => {
    const exists = activeTrainee.skills.includes(slug);
    const updated = exists
      ? activeTrainee.skills.filter((s) => s !== slug)
      : [...activeTrainee.skills, slug];
    if (updated.length === 0) return;
    onUpdateTrainee(activeTrainee.id, { skills: updated });
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertInput.trim()) return;
    onUpdateTrainee(activeTrainee.id, {
      certifications: [...activeTrainee.certifications, newCertInput.trim()],
    });
    setNewCertInput("");
  };

  const handleRemoveCert = (certName: string) => {
    onUpdateTrainee(activeTrainee.id, {
      certifications: activeTrainee.certifications.filter(
        (c) => c !== certName
      ),
    });
  };

  const handleAddPortfolioProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim() || !projLocation.trim()) return;
    const newItem = {
      id: `pf-${Date.now()}`,
      title: projTitle.trim(),
      location: projLocation.trim(),
      clientLocation: projLocation.trim(),
      completedDate: new Date().toLocaleDateString("ms-MY", {
        month: "short",
        year: "numeric",
      }),
      costRM: Number(projCost) || 100,
      summary:
        projSummary.trim() ||
        "Kerja disiapkan mengikut piawaian keselamatan teknikal.",
    };
    onUpdateTrainee(activeTrainee.id, {
      portfolio: [newItem, ...(activeTrainee.portfolio || [])],
      completedJobs: activeTrainee.completedJobs + 1,
    });
    setProjTitle("");
    setProjLocation("");
    setProjSummary("");
  };

  const handleDeletePortfolioProject = (projId: string) => {
    onUpdateTrainee(activeTrainee.id, {
      portfolio: (activeTrainee.portfolio || []).filter((p) => p.id !== projId),
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      {/* Header Bar */}
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs sm:p-6 lg:flex-row lg:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0170B9]/10 px-3 py-1 text-[11px] font-bold text-[#0170B9]">
            <Wrench className="h-3.5 w-3.5" />
            <span>
              {language === "ms"
                ? "Panel Pengurusan Pakar Kemahiran"
                : "Skilled Specialist Management Panel"}
            </span>
          </div>
          <h1 className="mt-2 font-heading text-xl font-extrabold text-slate-900 sm:text-2xl">
            {language === "ms"
              ? "Urus Profil, Jadual Hari/Waktu & Akaun Anda"
              : "Manage Your Profile, Flexible Schedule & Account"}
          </h1>
          <p className="text-xs text-slate-500">
            {language === "ms"
              ? "Kemas kini waktu operasi fleksibel, daerah perkhidmatan, sijil/pengalaman, dan status akaun."
              : "Update your flexible working days/hours, service district, certificates/experience, and account status."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:w-auto">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {language === "ms"
                ? "Akaun Pakar Semasa"
                : "Active Specialist Account"}
            </label>
            <select
              value={activeTrainee.id}
              onChange={(e) => setActiveTraineeId(e.target.value)}
              className="mt-0.5 w-full bg-transparent text-xs font-extrabold text-slate-900 focus:outline-none"
            >
              {trainees.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.district || t.state})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => onPreviewProfile(activeTrainee)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 sm:flex-none"
          >
            <Eye className="h-4 w-4 text-[#0170B9]" />
            <span>
              {language === "ms" ? "Pratonton Profil" : "Preview Profile"}
            </span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
          >
            <LogOut className="h-4 w-4" />
            <span>{language === "ms" ? "Log Keluar" : "Log Out"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Sidebar: Specialist Summary Card & Navigation Tabs */}
        <div className="space-y-4 lg:col-span-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0170B9] font-heading text-base font-extrabold text-white">
                {getInitials(activeTrainee.name)}
              </div>
              <div className="min-w-0">
                <h2 className="truncate font-heading text-base font-extrabold text-slate-900">
                  {activeTrainee.name}
                </h2>
                <p className="truncate text-xs font-semibold text-[#0170B9]">
                  {activeTrainee.district || activeTrainee.city},{" "}
                  {activeTrainee.state}
                </p>
                <p className="font-mono-code mt-0.5 text-[11px] text-slate-400">
                  {activeTrainee.phone}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">
                  {language === "ms" ? "Status Akaun" : "Account Status"}
                </span>
                {activeTrainee.isAccountActive !== false &&
                activeTrainee.isPubliclyListed ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-bold text-[#09B474]">
                    <Eye className="h-3 w-3" />{" "}
                    {language === "ms" ? "Aktif di Direktori" : "Active"}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 font-bold text-amber-700">
                    <EyeOff className="h-3 w-3" />{" "}
                    {language === "ms" ? "Tidak Aktif / Disembunyikan" : "Inactive"}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">
                  {language === "ms" ? "Pelan Semasa" : "Current Plan"}
                </span>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-mono-code font-bold text-[#09B474]">
                  {activeTrainee.planTier === "TRIAL"
                    ? language === "ms"
                      ? "PERCUBAAN PERCUMA 3 BULAN"
                      : "3-MONTH FREE TRIAL"
                    : activeTrainee.planTier}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">
                  {language === "ms"
                    ? "Pengesahan Direktori"
                    : "Directory Verification"}
                </span>
                <span className="font-semibold text-slate-800">
                  {activeTrainee.isVerified
                    ? language === "ms"
                      ? "Disahkan ✓"
                      : "Verified ✓"
                    : language === "ms"
                    ? "Menunggu Semakan"
                    : "Pending Review"}
                </span>
              </div>
            </div>
          </div>

          {/* Responsive Tab Navigation (2x2 Grid on Phone, Vertical Stack on Desktop) */}
          <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xs sm:grid-cols-4 lg:grid-cols-1">
            {(
              [
                {
                  id: "OVERVIEW",
                  label:
                    language === "ms"
                      ? "Jadual & Status"
                      : "Schedule & Status",
                  icon: Clock,
                },
                {
                  id: "PROFILE",
                  label:
                    language === "ms"
                      ? "Profil & Daerah"
                      : "Profile & District",
                  icon: UserCheck,
                },
                {
                  id: "PORTFOLIO",
                  label:
                    language === "ms"
                      ? "Sijil & Pengalaman"
                      : "Certs & Experience",
                  icon: Award,
                },
                {
                  id: "SUBSCRIPTION",
                  label:
                    language === "ms"
                      ? "Pelan & Bayaran QR"
                      : "Plans & QR Billing",
                  icon: QrCode,
                },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const active = studioTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setStudioTab(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition ${
                    active
                      ? "bg-[#0170B9] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8">
          {saveToast && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-[#09B474] px-4 py-3 text-xs font-bold text-white shadow-xs">
              <CheckCircle2 className="h-4 w-4" />
              {language === "ms"
                ? "Perubahan profil dan jadual berjaya disimpan!"
                : "Profile and schedule changes saved!"}
            </div>
          )}

          {/* TAB 1: FLEXIBLE SCHEDULE, AVAILABILITY & ACCOUNT DEACTIVATION/DELETION */}
          {studioTab === "OVERVIEW" && (
            <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6">
              {/* Live Availability Status */}
              <div>
                <h3 className="font-heading text-base font-extrabold text-slate-900 sm:text-lg">
                  {language === "ms"
                    ? "1. Status Ketersediaan Semasa"
                    : "1. Live Availability Status"}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  {language === "ms"
                    ? "Pilih status semasa anda yang akan dipaparkan pada kad direktori utama."
                    : "Select your real-time status shown on the directory cards."}
                </p>

                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {(
                    [
                      {
                        status: "AVAILABLE",
                        title:
                          language === "ms"
                            ? "Sedia Menerima Kerja"
                            : "Available Now",
                        desc:
                          language === "ms"
                            ? "Boleh dihubungi terus"
                            : "Ready for new jobs",
                        activeClass:
                          "border-[#09B474] bg-emerald-50/70 text-[#09B474]",
                      },
                      {
                        status: "BUSY",
                        title:
                          language === "ms"
                            ? "Jadual Penuh Hari Ini"
                            : "Booked Today",
                        desc:
                          language === "ms"
                            ? "Tempahan awal sahaja"
                            : "Advance booking only",
                        activeClass:
                          "border-amber-500 bg-amber-50 text-amber-800",
                      },
                      {
                        status: "UNAVAILABLE",
                        title:
                          language === "ms"
                            ? "Tidak Aktif / Cuti"
                            : "Away / Offline",
                        desc:
                          language === "ms"
                            ? "Rehat sementara"
                            : "Not taking jobs",
                        activeClass:
                          "border-slate-400 bg-slate-100 text-slate-700",
                      },
                    ] as {
                      status: AvailabilityStatus;
                      title: string;
                      desc: string;
                      activeClass: string;
                    }[]
                  ).map((opt) => {
                    const selected = activeTrainee.availability === opt.status;
                    return (
                      <button
                        type="button"
                        key={opt.status}
                        onClick={() =>
                          onUpdateTrainee(activeTrainee.id, {
                            availability: opt.status,
                          })
                        }
                        className={`rounded-xl border-2 p-3.5 text-left transition ${
                          selected
                            ? opt.activeClass
                            : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
                        }`}
                      >
                        <p className="text-xs font-extrabold">{opt.title}</p>
                        <p className="mt-0.5 text-[11px] opacity-80">
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flexible Working Days & Hours Builder */}
              <div className="border-t border-slate-100 pt-5">
                <h3 className="font-heading text-base font-extrabold text-slate-900 sm:text-lg">
                  {language === "ms"
                    ? "2. Waktu Operasi Fleksibel (Pilih Hari & Masa Free)"
                    : "2. Flexible Working Hours (Select Available Days & Time)"}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  {language === "ms"
                    ? "Klik untuk pilih hari apa yang anda lapang dan tetapkan waktu operasi anda."
                    : "Tap to toggle which days you are free and set your working hours."}
                </p>

                {/* Day Toggle Pills */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {DAYS_OF_WEEK.map((day) => {
                    const isSelected = selectedDays.includes(day.id);
                    return (
                      <button
                        type="button"
                        key={day.id}
                        onClick={() => handleToggleDay(day.id)}
                        className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
                          isSelected
                            ? "border-[#0170B9] bg-[#0170B9] text-white shadow-2xs"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {language === "ms" ? day.ms : day.en}
                      </button>
                    );
                  })}
                </div>

                {/* Start & End Time Selectors */}
                <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700">
                      {language === "ms"
                        ? "Waktu Mula (Start Time)"
                        : "Start Time"}
                    </label>
                    <select
                      value={startTime}
                      onChange={(e) => {
                        const val = e.target.value;
                        setStartTime(val);
                        onUpdateTrainee(activeTrainee.id, {
                          startTime: val,
                          workingHours: formatWorkingHoursSummary(
                            selectedDays,
                            val,
                            endTime
                          ),
                        });
                      }}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-900"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700">
                      {language === "ms"
                        ? "Waktu Tamat (End Time)"
                        : "End Time"}
                    </label>
                    <select
                      value={endTime}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEndTime(val);
                        onUpdateTrainee(activeTrainee.id, {
                          endTime: val,
                          workingHours: formatWorkingHoursSummary(
                            selectedDays,
                            startTime,
                            val
                          ),
                        });
                      }}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-900"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-3 rounded-xl bg-blue-50/70 px-3.5 py-2.5 text-xs font-semibold text-[#0170B9]">
                  {language === "ms"
                    ? "Paparan Jadual Anda: "
                    : "Your Displayed Schedule: "}
                  <strong>
                    {formatWorkingHoursSummary(
                      selectedDays,
                      startTime,
                      endTime
                    )}
                  </strong>
                </div>
              </div>

              {/* 24/7 Emergency Toggle */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
                <div>
                  <p className="text-xs font-bold text-slate-900 sm:text-sm">
                    {language === "ms"
                      ? "Sedia Untuk Panggilan Kecemasan 24/7"
                      : "24/7 Emergency Callout Available"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {language === "ms"
                      ? "Tunjukkan lencana 24/7 untuk kerosakan kecemasan luar waktu pejabat."
                      : "Display 24/7 badge for urgent night or weekend repairs."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateTrainee(activeTrainee.id, {
                      emergencyAvailable: !activeTrainee.emergencyAvailable,
                    })
                  }
                  className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition ${
                    activeTrainee.emergencyAvailable
                      ? "bg-rose-600 text-white"
                      : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {activeTrainee.emergencyAvailable
                    ? language === "ms"
                      ? "Aktif (24/7)"
                      : "Enabled"
                    : language === "ms"
                    ? "Tidak Aktif"
                    : "Disabled"}
                </button>
              </div>

              {/* Account Active / Inactive & Delete Account Section */}
              <div className="space-y-3 border-t border-slate-200 pt-5">
                <h3 className="font-heading text-sm font-extrabold uppercase tracking-wider text-slate-500">
                  {language === "ms"
                    ? "3. Kawalan Status Akaun (Nyahaktif / Padam)"
                    : "3. Account Control (Deactivate / Delete)"}
                </h3>

                {/* Set Account Inactive / Active */}
                <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold text-slate-900 sm:text-sm">
                      {language === "ms"
                        ? "Status Siaran Profil (Aktif / Rehatkan Akaun)"
                        : "Profile Visibility (Active / Deactivate Account)"}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {language === "ms"
                        ? "Sembunyikan sementara profil anda daripada direktori awam jika anda sedang sibuk atau berehat."
                        : "Temporarily hide your profile from the public directory when taking a break."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const nextState = !(
                        activeTrainee.isPubliclyListed &&
                        activeTrainee.isAccountActive !== false
                      );
                      onUpdateTrainee(activeTrainee.id, {
                        isPubliclyListed: nextState,
                        isAccountActive: nextState,
                      });
                    }}
                    className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                      activeTrainee.isPubliclyListed &&
                      activeTrainee.isAccountActive !== false
                        ? "bg-amber-100 text-amber-900 hover:bg-amber-200"
                        : "bg-[#09B474] text-white hover:bg-[#079660]"
                    }`}
                  >
                    <Power className="h-3.5 w-3.5" />
                    <span>
                      {activeTrainee.isPubliclyListed &&
                      activeTrainee.isAccountActive !== false
                        ? language === "ms"
                          ? "Nyahaktifkan Sementara (Inactive)"
                          : "Set Account Inactive"
                        : language === "ms"
                        ? "Aktifkan Semula Akaun"
                        : "Reactivate Account"}
                    </span>
                  </button>
                </div>

                {/* Delete Account Permanently */}
                <div className="flex flex-col justify-between gap-3 rounded-2xl border border-rose-200 bg-rose-50/50 p-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold text-rose-900 sm:text-sm">
                      {language === "ms"
                        ? "Padam Akaun Pakar Secara Kekal"
                        : "Delete Specialist Account Permanently"}
                    </p>
                    <p className="text-[11px] text-rose-700">
                      {language === "ms"
                        ? "Tindakan ini akan memadamkan profil anda sepenuhnya daripada senarai direktori."
                        : "This will permanently remove your profile from the directory."}
                    </p>
                  </div>

                  {!confirmDelete ? (
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(true)}
                      className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-rose-300 bg-white px-4 py-2.5 text-xs font-bold text-rose-600 transition hover:bg-rose-600 hover:text-white"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>
                        {language === "ms" ? "Padam Akaun" : "Delete Account"}
                      </span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onDeleteAccount(activeTrainee.id)}
                        className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-rose-700"
                      >
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>
                          {language === "ms"
                            ? "Ya, Padam Sekarang"
                            : "Yes, Delete"}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(false)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"
                      >
                        {language === "ms" ? "Batal" : "Cancel"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE DETAILS, STATE & DISTRICT (NO CAMPUS) */}
          {studioTab === "PROFILE" && (
            <form
              onSubmit={handleSaveProfileDetails}
              className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6"
            >
              <h3 className="font-heading text-base font-extrabold text-slate-900 sm:text-lg">
                {language === "ms"
                  ? "Maklumat Perkhidmatan, Negeri & Daerah"
                  : "Service Details, State & District"}
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  {language === "ms"
                    ? "Tajuk Ringkas Kepakaran (Headline)"
                    : "Specialist Headline"}
                </label>
                <input
                  type="text"
                  value={editHeadline}
                  onChange={(e) => setEditHeadline(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium focus:border-[#0170B9] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  {language === "ms"
                    ? "Penerangan Skop Kerja & Pengalaman (Dipaparkan bila pelanggan klik Profil)"
                    : "Full Bio & Scope of Work (Shown in full profile view)"}
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:border-[#0170B9] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    {language === "ms"
                      ? "No. Telefon / WhatsApp"
                      : "Phone / WhatsApp Number"}
                  </label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium focus:border-[#0170B9] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    {language === "ms"
                      ? "Tahun Pengalaman Kerja"
                      : "Years of Working Experience"}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={editExpYears}
                    onChange={(e) => setEditExpYears(Number(e.target.value))}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono-code text-sm font-bold focus:border-[#0170B9] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    {language === "ms" ? "Negeri (State)" : "State (Negeri)"}
                  </label>
                  <select
                    value={editState}
                    onChange={(e) => {
                      const st = e.target.value;
                      setEditState(st);
                      const dists = MALAYSIA_DISTRICTS_BY_STATE[st] || [];
                      if (dists.length > 0) setEditDistrict(dists[0]);
                    }}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium"
                  >
                    {MALAYSIA_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    {language === "ms"
                      ? "Daerah Liputan (District)"
                      : "District (Daerah)"}
                  </label>
                  <select
                    value={editDistrict}
                    onChange={(e) => setEditDistrict(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium"
                  >
                    {(
                      MALAYSIA_DISTRICTS_BY_STATE[editState] || [editDistrict]
                    ).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <label className="mb-2.5 block text-xs font-bold text-slate-700">
                  {language === "ms"
                    ? "Pilih Kemahiran Umum Anda"
                    : "Select Your General Skills"}
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {skillsList.map((sk) => {
                    const checked = activeTrainee.skills.includes(sk.slug);
                    return (
                      <button
                        type="button"
                        key={sk.id}
                        onClick={() => handleToggleSkill(sk.slug)}
                        className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-xs font-bold transition ${
                          checked
                            ? "border-[#0170B9] bg-[#0170B9]/10 text-[#0170B9]"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>
                          {language === "ms" ? sk.malayName : sk.name}
                        </span>
                        {checked && <CheckCircle2 className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0170B9] px-5 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#005a96] sm:w-auto"
                >
                  <Save className="h-4 w-4" />
                  {language === "ms"
                    ? "Simpan Perubahan Profil"
                    : "Save Profile Changes"}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: CERTIFICATES & COMPLETED WORK LOG */}
          {studioTab === "PORTFOLIO" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6">
                <h3 className="font-heading text-base font-extrabold text-slate-900">
                  {language === "ms"
                    ? "Sijil Kemahiran & Pentauliahan (SKM / PW2 / CIDB)"
                    : "Certifications & Trade Credentials"}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeTrainee.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800"
                    >
                      <Award className="h-3.5 w-3.5 text-[#0170B9]" />
                      {cert}
                      <button
                        type="button"
                        onClick={() => handleRemoveCert(cert)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <form
                  onSubmit={handleAddCert}
                  className="mt-4 flex flex-col gap-2 sm:flex-row"
                >
                  <input
                    type="text"
                    value={newCertInput}
                    onChange={(e) => setNewCertInput(e.target.value)}
                    placeholder={
                      language === "ms"
                        ? "Tambah sijil (cth: SKM Tahap 3 / PW2 Suruhanjaya Tenaga)..."
                        : "Add certificate or qualification..."
                    }
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:border-[#0170B9] focus:bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#0170B9] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#005a96]"
                  >
                    + {language === "ms" ? "Tambah Sijil" : "Add Certificate"}
                  </button>
                </form>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6">
                <h3 className="font-heading text-base font-extrabold text-slate-900">
                  {language === "ms"
                    ? `Rekod Kerja & Pengalaman Projek (${
                        (activeTrainee.portfolio || []).length
                      })`
                    : `Completed Work Log (${
                        (activeTrainee.portfolio || []).length
                      })`}
                </h3>
                <form
                  onSubmit={handleAddPortfolioProject}
                  className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-3"
                >
                  <input
                    type="text"
                    required
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    placeholder={
                      language === "ms"
                        ? "Nama kerja (cth: Tukar Kotak DB 3-Fasa)"
                        : "Project title"
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                  <input
                    type="text"
                    required
                    value={projLocation}
                    onChange={(e) => setProjLocation(e.target.value)}
                    placeholder={
                      language === "ms"
                        ? "Kawasan (cth: Shah Alam)"
                        : "Location"
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                  <input
                    type="number"
                    value={projCost}
                    onChange={(e) => setProjCost(Number(e.target.value))}
                    placeholder="Kos Anggaran (RM)"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono-code text-xs"
                  />
                  <input
                    type="text"
                    value={projSummary}
                    onChange={(e) => setProjSummary(e.target.value)}
                    placeholder={
                      language === "ms"
                        ? "Ringkasan kerja yang disiapkan..."
                        : "Brief summary of work..."
                    }
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:col-span-2"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#09B474] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#079660]"
                  >
                    + {language === "ms" ? "Tambah Rekod" : "Add Record"}
                  </button>
                </form>

                <div className="mt-4 space-y-2.5">
                  {(activeTrainee.portfolio || []).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between rounded-xl border border-slate-100 p-3.5"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900 sm:text-sm">
                            {item.title}
                          </h4>
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#09B474]">
                            <Briefcase className="h-3 w-3" />
                            {item.clientLocation || item.location}
                          </span>
                        </div>
                        {item.summary && (
                          <p className="mt-1 text-xs text-slate-500">
                            {item.summary}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeletePortfolioProject(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 3-MONTH FREE TRIAL & MANUAL QR SUBSCRIPTION PLANS */}
          {studioTab === "SUBSCRIPTION" && (
            <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-heading text-base font-extrabold text-slate-900 sm:text-lg">
                    {language === "ms"
                      ? "Pelan Percubaan Percuma 3 Bulan & Langganan Direktori"
                      : "3-Month Free Trial & Directory Subscription Plans"}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {language === "ms"
                      ? "Pakar perintis menikmati 3 bulan pertama secara percuma. Pembaharuan seterusnya menggunakan Kod QR manual & pengesahan WhatsApp Urusetia (integrasi Billplz akan datang)."
                      : "Pioneer specialists enjoy the first 3 months free. Subsequent renewals use manual QR & WhatsApp proof submission (Billplz gateway ready)."}
                  </p>
                </div>
              </div>

              {/* Pioneer Free Trial Highlight Banner */}
              <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#09B474]" />
                <div className="text-xs text-emerald-950">
                  <p className="font-extrabold">
                    {language === "ms"
                      ? "Tawaran Perintis: Percubaan Percuma Selama 3 Bulan (RM 0)"
                      : "Pioneer Offer: 3-Month Free Trial (RM 0)"}
                  </p>
                  <p className="mt-0.5 text-emerald-800">
                    {language === "ms"
                      ? "Semua pakar kemahiran baharu boleh menyenaraikan perkhidmatan secara percuma selama 3 bulan pertama sebelum memilih pelan bulanan."
                      : "All newly registered skilled specialists can list their services free for the first 3 months before choosing a monthly plan."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {SUBSCRIPTION_TIERS.map((plan) => {
                  const isCurrent =
                    activeTrainee.planTier === plan.tier &&
                    activeTrainee.isPubliclyListed;
                  const isFreeTrial = plan.tier === "TRIAL";

                  return (
                    <div
                      key={plan.tier}
                      className={`flex flex-col justify-between rounded-2xl border p-5 ${
                        plan.popular
                          ? "border-[#0170B9] bg-[#0170B9]/[0.02] ring-1 ring-[#0170B9]"
                          : isFreeTrial
                          ? "border-emerald-300 bg-emerald-50/20"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-mono-code rounded-md px-2 py-0.5 text-[10px] font-bold ${
                              isFreeTrial
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {plan.tier}
                          </span>
                          {plan.popular && (
                            <span className="rounded-full bg-[#0170B9] px-2.5 py-0.5 text-[10px] font-bold text-white">
                              {language === "ms"
                                ? "Pilihan Utama"
                                : "Most Popular"}
                            </span>
                          )}
                        </div>
                        <h4 className="mt-2.5 font-heading text-base font-extrabold text-slate-900">
                          {language === "ms" ? plan.name : plan.nameEn}
                        </h4>
                        <div className="mt-1.5 flex items-baseline gap-1">
                          <span className="font-mono-code text-2xl font-extrabold text-slate-900">
                            RM {plan.priceRM}
                          </span>
                          <span className="text-xs text-slate-500">
                            {language === "ms" ? plan.period : plan.periodEn}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-slate-500">
                          {language === "ms"
                            ? plan.description
                            : plan.descriptionEn}
                        </p>
                        <ul className="mt-3.5 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
                          {(language === "ms"
                            ? plan.features
                            : plan.featuresEn
                          ).map((feat) => (
                            <li key={feat} className="flex items-start gap-1.5">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#09B474]" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenPaymentModal(plan.tier)}
                        className={`mt-5 w-full rounded-xl py-2.5 text-xs font-bold transition ${
                          isCurrent
                            ? "border border-[#09B474] bg-emerald-50 text-[#09B474]"
                            : isFreeTrial
                            ? "bg-[#09B474] text-white hover:bg-[#079660]"
                            : "bg-[#0170B9] text-white hover:bg-[#005a96]"
                        }`}
                      >
                        {isCurrent
                          ? language === "ms"
                            ? "Pelan Semasa Anda (Aktif)"
                            : "Current Active Plan"
                          : isFreeTrial
                          ? language === "ms"
                            ? "Aktifkan Percubaan Percuma 3 Bulan"
                            : "Activate 3-Month Free Trial"
                          : language === "ms"
                          ? `Pilih ${plan.name} (Bayaran QR)`
                          : `Select ${plan.nameEn} (QR Payment)`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
