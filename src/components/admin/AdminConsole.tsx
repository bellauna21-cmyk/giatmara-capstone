"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Trash2,
  Edit3,
  Plus,
  RotateCcw,
  FolderKanban,
  Users,
  Award,
  QrCode,
  LogOut,
  MapPin,
} from "lucide-react";
import {
  TraineeListing,
  GiatmaraSkill,
  PlanTier,
  AvailabilityStatus,
  SUBSCRIPTION_TIERS,
  MALAYSIA_STATES,
  MALAYSIA_DISTRICTS_BY_STATE,
} from "@/lib/giatmara-data";
import { usePlatform } from "@/context/PlatformContext";

interface AdminConsoleProps {
  trainees: TraineeListing[];
  skillsCatalog: GiatmaraSkill[];
  onVerifyToggle: (id: string) => void;
  onListingToggle: (id: string) => void;
  onDeleteTrainee: (id: string) => void;
  onUpdateTrainee: (id: string, updates: Partial<TraineeListing>) => void;
  onAddSkill: (name: string, cluster: string) => void;
  onDeleteSkill: (id: string) => void;
  onResetDemoData: () => void;
  onLogout: () => void;
}

export function AdminConsole({
  trainees,
  skillsCatalog,
  onVerifyToggle,
  onListingToggle,
  onDeleteTrainee,
  onUpdateTrainee,
  onAddSkill,
  onDeleteSkill,
  onResetDemoData,
  onLogout,
}: AdminConsoleProps) {
  const { language } = usePlatform();
  const [adminTab, setAdminTab] = useState<
    "TRAINEES" | "SKILLS" | "SUBSCRIPTIONS"
  >("TRAINEES");
  const [editingTrainee, setEditingTrainee] = useState<TraineeListing | null>(
    null
  );
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCluster, setNewSkillCluster] = useState(
    "Elektrikal & Elektronik"
  );

  const monthlyRevenue = trainees
    .filter((t) => t.isPubliclyListed && t.isAccountActive !== false)
    .reduce((acc, t) => {
      const tierObj = SUBSCRIPTION_TIERS.find((s) => s.tier === t.planTier);
      return acc + (tierObj ? tierObj.priceRM : 0);
    }, 0);

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    onAddSkill(newSkillName.trim(), newSkillCluster.trim());
    setNewSkillName("");
  };

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      {/* Directory Management Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:p-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0170B9]/10 px-3 py-1 text-[11px] font-bold text-[#0170B9]">
            <FolderKanban className="h-3.5 w-3.5" />
            <span>
              {language === "ms"
                ? "Pengurusan Urusetia Direktori"
                : "Directory Management Console"}
            </span>
          </div>
          <h1 className="mt-2 font-heading text-xl font-extrabold text-slate-900 sm:text-2xl">
            {language === "ms"
              ? "Pengesahan Pakar Kemahiran & Senarai Direktori"
              : "Skilled Specialist Verification & Directory Governance"}
          </h1>
          <p className="text-xs text-slate-500">
            {language === "ms"
              ? "Sahkan pendaftaran pakar, semak resit bayaran QR manual, dan urus status aktif/nyahaktif akaun."
              : "Verify specialists, approve manual QR payment proofs, and manage active/inactive accounts."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onResetDemoData}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50 sm:flex-none"
          >
            <RotateCcw className="h-3.5 w-3.5 text-[#0170B9]" />
            <span>
              {language === "ms" ? "Reset Data Demo" : "Reset Demo Data"}
            </span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>{language === "ms" ? "Log Keluar" : "Log Out"}</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs sm:p-5">
          <p className="text-xs font-semibold text-slate-500">
            {language === "ms" ? "Jumlah Pakar" : "Total Specialists"}
          </p>
          <p className="mt-1 font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {trainees.length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs sm:p-5">
          <p className="text-xs font-semibold text-slate-500">
            {language === "ms" ? "Pakar Disahkan" : "Verified Specialists"}
          </p>
          <p className="mt-1 font-heading text-2xl font-extrabold text-[#09B474] sm:text-3xl">
            {trainees.filter((t) => t.isVerified).length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs sm:p-5">
          <p className="text-xs font-semibold text-slate-500">
            {language === "ms"
              ? "Percubaan Percuma (3 Bln)"
              : "Free Trial (3 Mos)"}
          </p>
          <p className="mt-1 font-heading text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {trainees.filter((t) => t.planTier === "TRIAL").length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs sm:p-5">
          <p className="text-xs font-semibold text-slate-500">
            {language === "ms"
              ? "Kutipan Langganan QR"
              : "Active Plan Revenue"}
          </p>
          <p className="mt-1 font-mono-code text-2xl font-extrabold text-[#0170B9] sm:text-3xl">
            RM {monthlyRevenue}
          </p>
        </div>
      </div>

      {/* Sub-navigation Pills */}
      <div className="mb-5 flex flex-wrap gap-2">
        {(
          [
            {
              id: "TRAINEES",
              label:
                language === "ms"
                  ? `Senarai Pakar (${trainees.length})`
                  : `Specialists (${trainees.length})`,
              icon: Users,
            },
            {
              id: "SKILLS",
              label:
                language === "ms"
                  ? `Kategori Kemahiran (${skillsCatalog.length})`
                  : `Skill Categories (${skillsCatalog.length})`,
              icon: Award,
            },
            {
              id: "SUBSCRIPTIONS",
              label:
                language === "ms"
                  ? "Semakan Percubaan & Bayaran QR"
                  : "Trial & QR Payment Verification",
              icon: QrCode,
            },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const active = adminTab === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
                active
                  ? "bg-[#0170B9] text-white shadow-xs"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SPECIALISTS MANAGEMENT (Mobile Cards + Desktop Table) */}
      {adminTab === "TRAINEES" && (
        <>
          {/* Mobile Phone View: Full-Featured Specialist Action Cards */}
          <div className="space-y-3 md:hidden">
            {trainees.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-heading text-sm font-extrabold text-slate-900">
                      {t.name}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-[#0170B9]">
                      <MapPin className="h-3 w-3" />
                      {t.district || t.city}, {t.state}
                    </p>
                    <p className="font-mono-code mt-0.5 text-[11px] text-slate-500">
                      {t.phone} • {t.experienceYears || 3}{" "}
                      {language === "ms" ? "thn pengalaman" : "yrs exp"}
                    </p>
                  </div>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono-code text-[10px] font-bold text-slate-800">
                    {t.planTier}
                  </span>
                </div>

                {/* Mobile Action Buttons Grid */}
                <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() => onVerifyToggle(t.id)}
                    className={`inline-flex items-center justify-center gap-1 rounded-xl py-2 text-xs font-bold ${
                      t.isVerified
                        ? "bg-emerald-50 text-[#09B474]"
                        : "bg-amber-50 text-amber-800"
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>
                      {t.isVerified
                        ? language === "ms"
                          ? "Disahkan"
                          : "Verified"
                        : language === "ms"
                        ? "Sahkan Pakar"
                        : "Verify Now"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onListingToggle(t.id)}
                    className={`rounded-xl py-2 text-xs font-bold ${
                      t.isPubliclyListed && t.isAccountActive !== false
                        ? "bg-[#0170B9]/10 text-[#0170B9]"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {t.isPubliclyListed && t.isAccountActive !== false
                      ? language === "ms"
                        ? "Aktif (Disenarai)"
                        : "Active (Listed)"
                      : language === "ms"
                      ? "Tidak Aktif"
                      : "Inactive"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingTrainee(t)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>{language === "ms" ? "Kemaskini" : "Edit"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteTrainee(t.id)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 py-2 text-xs font-bold text-rose-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>{language === "ms" ? "Padam" : "Delete"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase text-slate-400">
                  <tr>
                    <th className="px-5 py-3.5">
                      {language === "ms"
                        ? "Pakar & No. Telefon"
                        : "Specialist & Phone"}
                    </th>
                    <th className="px-5 py-3.5">
                      {language === "ms"
                        ? "Daerah & Negeri"
                        : "District & State"}
                    </th>
                    <th className="px-5 py-3.5">
                      {language === "ms" ? "Pelan" : "Plan"}
                    </th>
                    <th className="px-5 py-3.5">
                      {language === "ms"
                        ? "Pengesahan Urusetia"
                        : "Verification"}
                    </th>
                    <th className="px-5 py-3.5">
                      {language === "ms" ? "Status Akaun" : "Account Status"}
                    </th>
                    <th className="px-5 py-3.5 text-right">
                      {language === "ms" ? "Tindakan" : "Actions"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trainees.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/60">
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">{t.name}</p>
                        <p className="font-mono-code text-[11px] text-slate-500">
                          {t.phone} • {t.experienceYears || 3}{" "}
                          {language === "ms" ? "Tahun Pengalaman" : "Yrs Exp"}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {t.district || t.city}
                        </p>
                        <p className="text-[11px] text-slate-500">{t.state}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-md px-2.5 py-1 font-mono-code text-[11px] font-bold ${
                            t.planTier === "TRIAL"
                              ? "bg-emerald-50 text-[#09B474]"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {t.planTier}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => onVerifyToggle(t.id)}
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold ${
                            t.isVerified
                              ? "bg-emerald-50 text-[#09B474]"
                              : "bg-amber-50 text-amber-800"
                          }`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {t.isVerified
                            ? language === "ms"
                              ? "Disahkan"
                              : "Verified"
                            : language === "ms"
                            ? "Sahkan Sekarang"
                            : "Verify Now"}
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => onListingToggle(t.id)}
                          className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                            t.isPubliclyListed && t.isAccountActive !== false
                              ? "bg-[#0170B9]/10 text-[#0170B9]"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {t.isPubliclyListed && t.isAccountActive !== false
                            ? language === "ms"
                              ? "Aktif"
                              : "Active"
                            : language === "ms"
                            ? "Tidak Aktif"
                            : "Inactive"}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingTrainee(t)}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                            title="Kemaskini Pakar"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteTrainee(t.id)}
                            className="rounded-lg border border-rose-100 p-2 text-rose-600 hover:bg-rose-50"
                            title="Padam Akaun"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* TAB 2: SKILLS CATALOG */}
      {adminTab === "SKILLS" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <form
            onSubmit={handleAddSkillSubmit}
            className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:p-6 lg:col-span-4"
          >
            <h3 className="font-heading text-base font-extrabold text-slate-900">
              {language === "ms"
                ? "Tambah Kategori Kemahiran"
                : "Add Skill Category"}
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-700">
                {language === "ms" ? "Nama Kemahiran" : "Skill Name"}
              </label>
              <input
                type="text"
                required
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="cth: Pemasangan Solar PV"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700">
                {language === "ms" ? "Kluster Bidang" : "Cluster Category"}
              </label>
              <input
                type="text"
                value={newSkillCluster}
                onChange={(e) => setNewSkillCluster(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#0170B9] py-2.5 text-xs font-bold text-white hover:bg-[#005a96]"
            >
              <Plus className="h-4 w-4" />
              {language === "ms" ? "Tambah ke Direktori" : "Add to Directory"}
            </button>
          </form>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8">
            {skillsCatalog.map((sk) => (
              <div
                key={sk.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs"
              >
                <div>
                  <span className="rounded-md bg-[#0170B9]/10 px-2 py-0.5 text-[10px] font-bold text-[#0170B9]">
                    {sk.cluster}
                  </span>
                  <p className="mt-1.5 font-heading text-sm font-extrabold text-slate-900">
                    {sk.malayName}
                  </p>
                  <p className="text-xs text-slate-500">{sk.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteSkill(sk.id)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SUBSCRIPTIONS & MANUAL QR VERIFICATION */}
      {adminTab === "SUBSCRIPTIONS" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">
                    {language === "ms" ? "Nama Pakar" : "Specialist"}
                  </th>
                  <th className="px-5 py-3.5">
                    {language === "ms"
                      ? "Daerah & Negeri"
                      : "District & State"}
                  </th>
                  <th className="px-5 py-3.5">
                    {language === "ms" ? "Pelan" : "Plan"}
                  </th>
                  <th className="px-5 py-3.5">
                    {language === "ms" ? "Kadar" : "Amount"}
                  </th>
                  <th className="px-5 py-3.5">
                    {language === "ms"
                      ? "Status Resit QR / Percubaan"
                      : "QR Proof / Trial Status"}
                  </th>
                  <th className="px-5 py-3.5 text-right">
                    {language === "ms" ? "Tindakan" : "Action"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trainees.map((t) => {
                  const tierPrice =
                    SUBSCRIPTION_TIERS.find((s) => s.tier === t.planTier)
                      ?.priceRM ?? 0;
                  return (
                    <tr key={t.id}>
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">{t.name}</p>
                        {t.paymentReference && (
                          <p className="font-mono-code text-[11px] text-[#0170B9]">
                            Ref: {t.paymentReference}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4 text-slate-500">
                        {t.district || t.city}, {t.state}
                      </td>
                      <td className="px-5 py-4 font-mono-code font-bold text-[#0170B9]">
                        {t.planTier}
                      </td>
                      <td className="px-5 py-4 font-mono-code font-bold text-slate-900">
                        {t.planTier === "TRIAL"
                          ? "RM 0 (Percuma 3 Bulan)"
                          : `RM ${tierPrice}.00`}
                      </td>
                      <td className="px-5 py-4">
                        {t.planTier === "TRIAL" ? (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 font-bold text-[#09B474]">
                            {language === "ms"
                              ? "Percubaan Percuma Aktif"
                              : "Free Trial Active"}
                          </span>
                        ) : t.paymentProofStatus === "PENDING" ? (
                          <span className="rounded-full bg-amber-50 px-3 py-1 font-bold text-amber-800">
                            {language === "ms"
                              ? "Menunggu Pengesahan QR"
                              : "Pending QR Verification"}
                          </span>
                        ) : (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 font-bold text-[#09B474]">
                            {language === "ms"
                              ? "Bayaran QR Disahkan"
                              : "QR Payment Verified"}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        {t.paymentProofStatus === "PENDING" && (
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateTrainee(t.id, {
                                paymentProofStatus: "VERIFIED",
                                isVerified: true,
                                isPubliclyListed: true,
                              })
                            }
                            className="rounded-xl bg-[#09B474] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#079660]"
                          >
                            {language === "ms"
                              ? "Luluskan Resit QR"
                              : "Approve QR Proof"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingTrainee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-heading text-base font-extrabold text-slate-900">
                {language === "ms" ? "Kemaskini Pakar:" : "Edit Specialist:"}{" "}
                {editingTrainee.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingTrainee(null)}
                className="text-sm font-bold text-slate-400 hover:text-slate-800"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onUpdateTrainee(editingTrainee.id, editingTrainee);
                setEditingTrainee(null);
              }}
              className="mt-4 space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700">
                  {language === "ms" ? "Nama Penuh" : "Full Name"}
                </label>
                <input
                  type="text"
                  value={editingTrainee.name}
                  onChange={(e) =>
                    setEditingTrainee({
                      ...editingTrainee,
                      name: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700">
                  {language === "ms" ? "Tajuk Kepakaran" : "Headline"}
                </label>
                <input
                  type="text"
                  value={editingTrainee.headline}
                  onChange={(e) =>
                    setEditingTrainee({
                      ...editingTrainee,
                      headline: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="font-bold text-slate-700">
                    {language === "ms" ? "Negeri" : "State"}
                  </label>
                  <select
                    value={editingTrainee.state}
                    onChange={(e) => {
                      const st = e.target.value;
                      const dists = MALAYSIA_DISTRICTS_BY_STATE[st] || [];
                      setEditingTrainee({
                        ...editingTrainee,
                        state: st,
                        district: dists[0] || "",
                      });
                    }}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                  >
                    {MALAYSIA_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">
                    {language === "ms" ? "Daerah" : "District"}
                  </label>
                  <select
                    value={editingTrainee.district || ""}
                    onChange={(e) =>
                      setEditingTrainee({
                        ...editingTrainee,
                        district: e.target.value,
                        city: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                  >
                    {(
                      MALAYSIA_DISTRICTS_BY_STATE[editingTrainee.state] || []
                    ).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">
                    {language === "ms" ? "Pelan" : "Plan"}
                  </label>
                  <select
                    value={editingTrainee.planTier}
                    onChange={(e) =>
                      setEditingTrainee({
                        ...editingTrainee,
                        planTier: e.target.value as PlanTier,
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                  >
                    <option value="TRIAL">TRIAL (Percuma 3 Bulan)</option>
                    <option value="BASIC">BASIC</option>
                    <option value="PRO">PRO</option>
                    <option value="PREMIUM">PREMIUM</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">
                    {language === "ms" ? "Status Ketersediaan" : "Status"}
                  </label>
                  <select
                    value={editingTrainee.availability}
                    onChange={(e) =>
                      setEditingTrainee({
                        ...editingTrainee,
                        availability: e.target.value as AvailabilityStatus,
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="BUSY">BUSY</option>
                    <option value="UNAVAILABLE">UNAVAILABLE</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingTrainee(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-600"
                >
                  {language === "ms" ? "Batal" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0170B9] px-5 py-2 font-bold text-white"
                >
                  {language === "ms" ? "Simpan" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
