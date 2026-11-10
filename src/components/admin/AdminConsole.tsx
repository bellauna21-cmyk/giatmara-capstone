"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Trash2,
  Edit3,
  Plus,
  RotateCcw,
  ShieldCheck,
  Users,
  Award,
  CreditCard,
} from "lucide-react";
import {
  TraineeListing,
  GiatmaraSkill,
  PlanTier,
  AvailabilityStatus,
  SUBSCRIPTION_TIERS,
} from "@/lib/giatmara-data";

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
}: AdminConsoleProps) {
  const [adminTab, setAdminTab] = useState<
    "TRAINEES" | "SKILLS" | "SUBSCRIPTIONS"
  >("TRAINEES");
  const [editingTrainee, setEditingTrainee] = useState<TraineeListing | null>(
    null
  );
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCluster, setNewSkillCluster] = useState("Elektrik & Elektronik");

  const monthlyRevenue = trainees
    .filter((t) => t.isPubliclyListed)
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Modern Admin Header & Bento KPIs */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0170B9]/10 px-3 py-1 text-[11px] font-bold text-[#0170B9]">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>GIATMARA Administrator Console</span>
          </div>
          <h1 className="mt-2 font-heading text-2xl font-extrabold text-slate-900">
            Directory Governance &amp; Verification
          </h1>
        </div>
        <button
          onClick={onResetDemoData}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50"
        >
          <RotateCcw className="h-3.5 w-3.5 text-[#0170B9]" />
          Reset Demo Dataset
        </button>
      </div>

      {/* Bento KPI Grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Total Trainees</p>
          <p className="mt-1 font-heading text-3xl font-extrabold text-slate-900">
            {trainees.length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">
            Matrix Verified
          </p>
          <p className="mt-1 font-heading text-3xl font-extrabold text-[#09B474]">
            {trainees.filter((t) => t.isVerified).length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">
            TVET Skill Clusters
          </p>
          <p className="mt-1 font-heading text-3xl font-extrabold text-slate-900">
            {skillsCatalog.length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">
            Active FPX Revenue
          </p>
          <p className="mt-1 font-mono-code text-3xl font-extrabold text-[#0170B9]">
            RM {monthlyRevenue}
          </p>
        </div>
      </div>

      {/* Sub-navigation Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(
          [
            {
              id: "TRAINEES",
              label: `Trainees (${trainees.length})`,
              icon: Users,
            },
            {
              id: "SKILLS",
              label: `Skill Catalog (${skillsCatalog.length})`,
              icon: Award,
            },
            {
              id: "SUBSCRIPTIONS",
              label: "FPX Subscriptions",
              icon: CreditCard,
            },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const active = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
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

      {/* Tab 1: Trainees CRUD Table */}
      {adminTab === "TRAINEES" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">Trainee &amp; Matrix ID</th>
                  <th className="px-5 py-3.5">Campus</th>
                  <th className="px-5 py-3.5">Plan</th>
                  <th className="px-5 py-3.5">Verification</th>
                  <th className="px-5 py-3.5">Directory Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trainees.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/60">
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-900">{t.name}</p>
                      <p className="font-mono-code text-[11px] text-slate-400">
                        {t.studentId} • RM {t.startingRateRM}/hr
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {t.giatmaraCenter}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {t.city}, {t.state}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-slate-100 px-2.5 py-1 font-mono-code text-[11px] font-bold text-slate-800">
                        {t.planTier}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => onVerifyToggle(t.id)}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold ${
                          t.isVerified
                            ? "bg-emerald-50 text-[#09B474]"
                            : "bg-amber-50 text-amber-800"
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {t.isVerified ? "Verified" : "Verify Now"}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => onListingToggle(t.id)}
                        className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                          t.isPubliclyListed
                            ? "bg-[#0170B9]/10 text-[#0170B9]"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {t.isPubliclyListed ? "Listed" : "Hidden"}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingTrainee(t)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                          title="Edit Trainee"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteTrainee(t.id)}
                          className="rounded-lg border border-rose-100 p-2 text-rose-600 hover:bg-rose-50"
                          title="Delete Trainee"
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
      )}

      {/* Tab 2: Skills Catalog */}
      {adminTab === "SKILLS" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <form
            onSubmit={handleAddSkillSubmit}
            className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-4"
          >
            <h3 className="font-heading text-base font-extrabold text-slate-900">
              Add TVET Skill Cluster
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-700">
                Skill / Course Name
              </label>
              <input
                type="text"
                required
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="e.g. Solar PV Installation"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700">
                Cluster Category
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
              Add to Catalog
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

      {/* Tab 3: Subscriptions */}
      {adminTab === "SUBSCRIPTIONS" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Trainee</th>
                <th className="px-5 py-3.5">GIATMARA Campus</th>
                <th className="px-5 py-3.5">Tier</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">ToyyibPay Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trainees.map((t) => {
                const tierPrice =
                  SUBSCRIPTION_TIERS.find((s) => s.tier === t.planTier)
                    ?.priceRM || 15;
                return (
                  <tr key={t.id}>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {t.name}
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {t.giatmaraCenter}
                    </td>
                    <td className="px-5 py-4 font-mono-code font-bold text-[#0170B9]">
                      {t.planTier}
                    </td>
                    <td className="px-5 py-4 font-mono-code font-bold text-slate-900">
                      RM {tierPrice}.00
                    </td>
                    <td className="px-5 py-4">
                      {t.isPubliclyListed ? (
                        <span className="rounded-full bg-emerald-50 px-3 py-1 font-bold text-[#09B474]">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-50 px-3 py-1 font-bold text-amber-800">
                          Pending Payment
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingTrainee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-heading text-base font-extrabold text-slate-900">
                Edit Trainee: {editingTrainee.name}
              </h3>
              <button
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
                <label className="font-bold text-slate-700">Full Name</label>
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
                <label className="font-bold text-slate-700">Headline</label>
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
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Rate (RM)</label>
                  <input
                    type="number"
                    value={editingTrainee.startingRateRM}
                    onChange={(e) =>
                      setEditingTrainee({
                        ...editingTrainee,
                        startingRateRM: Number(e.target.value),
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono-code"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Plan</label>
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
                    <option value="BASIC">BASIC</option>
                    <option value="PRO">PRO</option>
                    <option value="PREMIUM">PREMIUM</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">Status</label>
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
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#0170B9] px-5 py-2 font-bold text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
