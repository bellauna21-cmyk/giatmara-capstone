"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  CreditCard,
  Save,
  Trash2,
  Eye,
  EyeOff,
  Award,
  Briefcase,
  UserCheck,
  GraduationCap,
} from "lucide-react";
import {
  GIATMARA_SKILLS,
  MALAYSIA_STATES,
  GIATMARA_CENTERS_BY_STATE,
  SUBSCRIPTION_TIERS,
  TraineeListing,
  PlanTier,
  AvailabilityStatus,
} from "@/lib/giatmara-data";
import { getInitials } from "@/lib/avatar-utils";

interface TraineeStudioProps {
  trainees: TraineeListing[];
  activeTraineeId: string;
  setActiveTraineeId: (id: string) => void;
  onUpdateTrainee: (id: string, updates: Partial<TraineeListing>) => void;
  onOpenPaymentModal: (tier: PlanTier) => void;
  onPreviewProfile: (trainee: TraineeListing) => void;
}

export function TraineeStudio({
  trainees,
  activeTraineeId,
  setActiveTraineeId,
  onUpdateTrainee,
  onOpenPaymentModal,
  onPreviewProfile,
}: TraineeStudioProps) {
  const activeTrainee =
    trainees.find((t) => t.id === activeTraineeId) || trainees[0];

  const [studioTab, setStudioTab] = useState<
    "OVERVIEW" | "PROFILE" | "PORTFOLIO" | "SUBSCRIPTION"
  >("OVERVIEW");
  const [editHeadline, setEditHeadline] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editRate, setEditRate] = useState(50);
  const [editHours, setEditHours] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editState, setEditState] = useState("");
  const [editCenter, setEditCenter] = useState("");
  const [newCertInput, setNewCertInput] = useState("");
  const [projTitle, setProjTitle] = useState("");
  const [projLocation, setProjLocation] = useState("");
  const [projCost, setProjCost] = useState(120);
  const [projSummary, setProjSummary] = useState("");
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (activeTrainee) {
      setEditHeadline(activeTrainee.headline);
      setEditBio(activeTrainee.bio);
      setEditRate(activeTrainee.startingRateRM);
      setEditHours(activeTrainee.workingHours);
      setEditPhone(activeTrainee.phone);
      setEditCity(activeTrainee.city);
      setEditState(activeTrainee.state);
      setEditCenter(activeTrainee.giatmaraCenter);
    }
  }, [activeTrainee]);

  if (!activeTrainee) return null;

  const handleSaveProfileDetails = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTrainee(activeTrainee.id, {
      headline: editHeadline,
      bio: editBio,
      startingRateRM: Number(editRate),
      workingHours: editHours,
      phone: editPhone,
      whatsapp: editPhone.replace(/[^0-9]/g, ""),
      city: editCity,
      state: editState,
      giatmaraCenter: editCenter,
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
      completedDate: new Date().toLocaleDateString("en-MY", {
        month: "short",
        year: "numeric",
      }),
      costRM: Number(projCost) || 100,
      summary:
        projSummary.trim() ||
        "Completed installation and technical inspection according to GIATMARA standards.",
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Modern Header Bar */}
      <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:flex-row lg:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0170B9]/10 px-3 py-1 text-[11px] font-bold text-[#0170B9]">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Trainee Entrepreneur Studio</span>
          </div>
          <h1 className="mt-2 font-heading text-2xl font-extrabold text-slate-900">
            Manage Your Skill Profile &amp; Availability
          </h1>
          <p className="text-xs text-slate-500">
            Update your live status, hourly rate, SKM certificates, and
            ToyyibPay subscription tier.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Trainee Account
            </label>
            <select
              value={activeTrainee.id}
              onChange={(e) => setActiveTraineeId(e.target.value)}
              className="mt-0.5 bg-transparent text-xs font-extrabold text-slate-900 focus:outline-none"
            >
              {trainees.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.giatmaraCenter})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => onPreviewProfile(activeTrainee)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <Eye className="h-4 w-4 text-[#0170B9]" />
            <span>Preview Public Card</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Sidebar: Trainee Card & Navigation */}
        <div className="space-y-5 lg:col-span-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#0170B9] font-heading text-base font-extrabold text-white">
                {getInitials(activeTrainee.name)}
              </div>
              <div>
                <h2 className="font-heading text-base font-extrabold text-slate-900">
                  {activeTrainee.name}
                </h2>
                <p className="text-xs font-semibold text-[#0170B9]">
                  {activeTrainee.giatmaraCenter}
                </p>
                <p className="font-mono-code mt-0.5 text-[11px] text-slate-400">
                  {activeTrainee.studentId}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Directory Status</span>
                {activeTrainee.isPubliclyListed ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-bold text-[#09B474]">
                    <Eye className="h-3 w-3" /> Public
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 font-bold text-amber-700">
                    <EyeOff className="h-3 w-3" /> Unlisted
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Current Plan</span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono-code font-bold text-slate-800">
                  {activeTrainee.planTier}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">GIATMARA Verification</span>
                <span className="font-semibold text-slate-800">
                  {activeTrainee.isVerified ? "Verified" : "Pending Review"}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Pills */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xs">
            {(
              [
                {
                  id: "OVERVIEW",
                  label: "Availability & Coverage",
                  icon: UserCheck,
                },
                {
                  id: "PROFILE",
                  label: "Service Details & Skills",
                  icon: Award,
                },
                {
                  id: "PORTFOLIO",
                  label: "Certificates & Work Log",
                  icon: Briefcase,
                },
                {
                  id: "SUBSCRIPTION",
                  label: "FPX Subscription Plan",
                  icon: CreditCard,
                },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const active = studioTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStudioTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-bold transition ${
                    active
                      ? "bg-[#0170B9] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
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
              Profile changes saved and synced.
            </div>
          )}

          {studioTab === "OVERVIEW" && (
            <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
              <div>
                <h3 className="font-heading text-lg font-extrabold text-slate-900">
                  Live Availability Status
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Control how clients see your availability in real time.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {(
                  [
                    {
                      status: "AVAILABLE",
                      title: "Available Now",
                      desc: "Ready to accept new jobs",
                      activeClass:
                        "border-[#09B474] bg-emerald-50/70 text-[#09B474]",
                    },
                    {
                      status: "BUSY",
                      title: "Booked Today",
                      desc: "Advance bookings only",
                      activeClass: "border-amber-500 bg-amber-50 text-amber-800",
                    },
                    {
                      status: "UNAVAILABLE",
                      title: "Away / Offline",
                      desc: "Not taking requests",
                      activeClass: "border-slate-400 bg-slate-100 text-slate-700",
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
                      key={opt.status}
                      onClick={() =>
                        onUpdateTrainee(activeTrainee.id, {
                          availability: opt.status,
                        })
                      }
                      className={`rounded-2xl border-2 p-4 text-left transition ${
                        selected
                          ? opt.activeClass
                          : "border-slate-200 bg-white text-slate-800 hover:border-slate-300"
                      }`}
                    >
                      <p className="text-xs font-extrabold">{opt.title}</p>
                      <p className="mt-1 text-[11px] opacity-80">{opt.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    24/7 Emergency Callout Badge
                  </p>
                  <p className="text-xs text-slate-500">
                    Highlight your profile for urgent night or weekend repairs.
                  </p>
                </div>
                <button
                  onClick={() =>
                    onUpdateTrainee(activeTrainee.id, {
                      emergencyAvailable: !activeTrainee.emergencyAvailable,
                    })
                  }
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                    activeTrainee.emergencyAvailable
                      ? "bg-rose-600 text-white"
                      : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {activeTrainee.emergencyAvailable ? "Enabled" : "Disabled"}
                </button>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Public Directory Visibility
                  </p>
                  <p className="text-xs text-slate-500">
                    Temporarily hide or show your profile in public search
                    results.
                  </p>
                </div>
                <button
                  onClick={() =>
                    onUpdateTrainee(activeTrainee.id, {
                      isPubliclyListed: !activeTrainee.isPubliclyListed,
                    })
                  }
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                    activeTrainee.isPubliclyListed
                      ? "bg-[#09B474] text-white"
                      : "border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {activeTrainee.isPubliclyListed ? "Visible" : "Hidden"}
                </button>
              </div>
            </div>
          )}

          {studioTab === "PROFILE" && (
            <form
              onSubmit={handleSaveProfileDetails}
              className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs"
            >
              <h3 className="font-heading text-lg font-extrabold text-slate-900">
                Service Details &amp; Trade Skills
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Service Headline
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
                  Bio &amp; Scope of Work
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:border-[#0170B9] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Starting Rate (RM / hr)
                  </label>
                  <input
                    type="number"
                    value={editRate}
                    onChange={(e) => setEditRate(Number(e.target.value))}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono-code text-sm font-bold focus:border-[#0170B9] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Phone / WhatsApp
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
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={editHours}
                    onChange={(e) => setEditHours(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium focus:border-[#0170B9] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    State (Negeri)
                  </label>
                  <select
                    value={editState}
                    onChange={(e) => {
                      const st = e.target.value;
                      setEditState(st);
                      const centers = GIATMARA_CENTERS_BY_STATE[st] || [];
                      if (centers.length > 0) setEditCenter(centers[0]);
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
                    GIATMARA Campus
                  </label>
                  <select
                    value={editCenter}
                    onChange={(e) => setEditCenter(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium"
                  >
                    {(
                      GIATMARA_CENTERS_BY_STATE[editState] || [editCenter]
                    ).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    City / Coverage Area
                  </label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <label className="mb-2.5 block text-xs font-bold text-slate-700">
                  GIATMARA Skill Clusters
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {GIATMARA_SKILLS.map((sk) => {
                    const checked = activeTrainee.skills.includes(sk.slug);
                    return (
                      <button
                        type="button"
                        key={sk.id}
                        onClick={() => handleToggleSkill(sk.slug)}
                        className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-xs font-bold transition ${
                          checked
                            ? "border-[#0170B9] bg-[#0170B9]/8 text-[#0170B9]"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{sk.malayName}</span>
                        {checked && <CheckCircle2 className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0170B9] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#005a96]"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {studioTab === "PORTFOLIO" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <h3 className="font-heading text-base font-extrabold text-slate-900">
                  Certifications &amp; SKM Credentials
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
                <form onSubmit={handleAddCert} className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={newCertInput}
                    onChange={(e) => setNewCertInput(e.target.value)}
                    placeholder="Add SKM or Suruhanjaya Tenaga certificate..."
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs focus:border-[#0170B9] focus:bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#0170B9] px-4 py-2 text-xs font-bold text-white hover:bg-[#005a96]"
                  >
                    + Add
                  </button>
                </form>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                <h3 className="font-heading text-base font-extrabold text-slate-900">
                  Completed Work Log ({(activeTrainee.portfolio || []).length})
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
                    placeholder="Project title (e.g. 3-Phase DB Upgrade)"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                  <input
                    type="text"
                    required
                    value={projLocation}
                    onChange={(e) => setProjLocation(e.target.value)}
                    placeholder="Location (e.g. Shah Alam)"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                  <input
                    type="number"
                    value={projCost}
                    onChange={(e) => setProjCost(Number(e.target.value))}
                    placeholder="Job Value (RM)"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono-code text-xs"
                  />
                  <input
                    type="text"
                    value={projSummary}
                    onChange={(e) => setProjSummary(e.target.value)}
                    placeholder="Brief summary of work completed..."
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:col-span-2"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#09B474] px-4 py-2 text-xs font-bold text-white hover:bg-[#079660]"
                  >
                    + Add Job Record
                  </button>
                </form>

                <div className="mt-4 space-y-2.5">
                  {(activeTrainee.portfolio || []).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between rounded-xl border border-slate-100 p-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">
                            {item.title}
                          </h4>
                          <span className="font-mono-code rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-[#09B474]">
                            RM {item.costRM}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {item.clientLocation || item.location}{" "}
                          {item.completedDate ? `• ${item.completedDate}` : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeletePortfolioProject(item.id)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {studioTab === "SUBSCRIPTION" && (
            <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
              <div>
                <h3 className="font-heading text-lg font-extrabold text-slate-900">
                  Directory Subscription Plans
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Activate or upgrade your public directory placement via
                  ToyyibPay FPX.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {SUBSCRIPTION_TIERS.map((plan) => {
                  const isCurrent =
                    activeTrainee.planTier === plan.tier &&
                    activeTrainee.isPubliclyListed;
                  return (
                    <div
                      key={plan.tier}
                      className={`flex flex-col justify-between rounded-2xl border p-5 ${
                        plan.popular
                          ? "border-[#0170B9] bg-[#0170B9]/[0.02] ring-1 ring-[#0170B9]"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono-code rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-800">
                            {plan.tier}
                          </span>
                          {plan.popular && (
                            <span className="rounded-full bg-[#0170B9] px-2.5 py-0.5 text-[10px] font-bold text-white">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <h4 className="mt-3 font-heading text-base font-extrabold text-slate-900">
                          {plan.name}
                        </h4>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="font-mono-code text-2xl font-extrabold text-slate-900">
                            RM {plan.priceRM}
                          </span>
                          <span className="text-xs text-slate-500">
                            / 30 days
                          </span>
                        </div>
                        <ul className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
                          {plan.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-1.5">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#09B474]" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => onOpenPaymentModal(plan.tier)}
                        className={`mt-6 w-full rounded-xl py-2.5 text-xs font-bold transition ${
                          isCurrent
                            ? "border border-[#09B474] bg-emerald-50 text-[#09B474]"
                            : "bg-[#0170B9] text-white hover:bg-[#005a96]"
                        }`}
                      >
                        {isCurrent
                          ? "Active Plan (Renew)"
                          : `Select ${plan.tier}`}
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
