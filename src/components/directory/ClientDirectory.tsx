// src/components/directory/ClientDirectory.tsx
"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  RotateCcw,
  Clock,
  Zap,
  ShieldAlert,
  Users,
  LayoutGrid,
} from "lucide-react";
import {
  MALAYSIA_STATES,
  MALAYSIA_DISTRICTS_BY_STATE,
  TraineeListing,
} from "@/lib/giatmara-data";
import { TraineeCard } from "./TraineeCard";
import { usePlatform } from "@/context/PlatformContext";
import { TRANSLATIONS } from "@/lib/i18n";
import { TRADE_ICON_CONFIG } from "./SkillIcons";

interface ClientDirectoryProps {
  trainees: TraineeListing[];
  onSelectTrainee: (trainee: TraineeListing) => void;
}

export function ClientDirectory({
  trainees = [],
  onSelectTrainee,
}: ClientDirectoryProps) {
  const { language, skillsList } = usePlatform();
  const t = TRANSLATIONS[language];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("ALL");
  const [selectedState, setSelectedState] = useState("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState("ALL");
  const [onlyAvailableNow, setOnlyAvailableNow] = useState(false);
  const [onlyEmergency, setOnlyEmergency] = useState(false);

  // Dynamic districts based on selected state
  const availableDistricts = useMemo(() => {
    if (selectedState === "ALL") {
      return Object.values(MALAYSIA_DISTRICTS_BY_STATE).flat();
    }
    return MALAYSIA_DISTRICTS_BY_STATE[selectedState] || [];
  }, [selectedState]);

  // Filtered list
  const filteredTrainees = useMemo(() => {
    const tierPriority = { PREMIUM: 4, PRO: 3, BASIC: 2, TRIAL: 1 };

    return trainees
      .filter((tr) => {
        if (!tr.isPubliclyListed) return false;
        if (tr.isAccountActive === false) return false;
        if (selectedState !== "ALL" && tr.state !== selectedState) return false;
        if (
          selectedDistrict !== "ALL" &&
          tr.district !== selectedDistrict &&
          !tr.city.toLowerCase().includes(selectedDistrict.toLowerCase())
        ) {
          return false;
        }
        if (selectedSkill !== "ALL" && !tr.skills.includes(selectedSkill))
          return false;
        if (onlyAvailableNow && tr.availability !== "AVAILABLE") return false;
        if (onlyEmergency && !tr.emergencyAvailable) return false;

        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          return (
            tr.name.toLowerCase().includes(q) ||
            tr.headline.toLowerCase().includes(q) ||
            (tr.district || "").toLowerCase().includes(q) ||
            tr.city.toLowerCase().includes(q) ||
            tr.state.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort(
        (a, b) =>
          (tierPriority[b.planTier] || 1) - (tierPriority[a.planTier] || 1)
      );
  }, [
    trainees,
    searchQuery,
    selectedSkill,
    selectedState,
    selectedDistrict,
    onlyAvailableNow,
    onlyEmergency,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSkill("ALL");
    setSelectedState("ALL");
    setSelectedDistrict("ALL");
    setOnlyAvailableNow(false);
    setOnlyEmergency(false);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedSkill !== "ALL" ||
    selectedState !== "ALL" ||
    selectedDistrict !== "ALL" ||
    onlyAvailableNow ||
    onlyEmergency;

  return (
    <div className="pb-16 bg-[#FAFAFC]">
      {/* 1. Clean, Executive Hero Section (Like Last Week, Professional & Direct) */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white pt-8 pb-10 sm:pt-10 sm:pb-12">
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#0170B9]/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-[#09B474]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0170B9]/20 bg-[#0170B9]/5 px-3 py-1 text-xs font-bold text-[#0170B9]">
              <span className="h-2 w-2 rounded-full bg-[#09B474]" />
              <span>TVET Malaysia (GIATMARA • IKM • KKTM • ILP)</span>
            </div>

            {/* 1-2 Line Direct Headline */}
            <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {t.heroHeadline}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              {t.heroSubline}
            </p>
          </div>

          {/* 2. Skill Category Icon Bar / Grid (Straight away on main page, no long scrolling!) */}
          <div className="mt-8">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                {t.chooseSkillTitle}
              </span>
              {selectedSkill !== "ALL" && (
                <button
                  type="button"
                  onClick={() => setSelectedSkill("ALL")}
                  className="text-xs font-bold text-[#0170B9] hover:underline"
                >
                  {t.allSkills}
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* All Trades Button */}
              <button
                type="button"
                onClick={() => setSelectedSkill("ALL")}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  selectedSkill === "ALL"
                    ? "bg-[#0170B9] text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span>{t.allSkills}</span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                    selectedSkill === "ALL"
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {trainees.filter((x) => x.isPubliclyListed && x.isAccountActive !== false).length}
                </span>
              </button>

              {/* Individual Skill Buttons with Clean Icons */}
              {skillsList.map((skill) => {
                const active = selectedSkill === skill.slug;
                const config = TRADE_ICON_CONFIG[skill.slug] || TRADE_ICON_CONFIG["ALL"];
                const SkillIcon = config.icon;
                const count = trainees.filter(
                  (tr) =>
                    tr.isPubliclyListed &&
                    tr.isAccountActive !== false &&
                    tr.skills.includes(skill.slug)
                ).length;

                return (
                  <button
                    type="button"
                    key={skill.id}
                    onClick={() => setSelectedSkill(active ? "ALL" : skill.slug)}
                    className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                      active
                        ? "bg-[#0170B9] text-white shadow-xs font-bold"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <SkillIcon className="h-4 w-4" />
                    <span>
                      {language === "ms"
                        ? skill.shortMalay || skill.malayName
                        : skill.shortEn || skill.name}
                    </span>
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Container */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* Anti-Scam Precaution Banner */}
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-xs text-amber-900 shadow-xs">
          <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
          <div>
            <span className="font-extrabold text-amber-950">
              {t.safetyBannerTitle}{" "}
            </span>
            <span className="leading-relaxed">{t.safetyBannerDesc}</span>
          </div>
        </div>

        {/* Filter Controls: Negeri, Daerah, Search & Status */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 items-center">
            {/* Search Input */}
            <div className="relative lg:col-span-4">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-3 text-xs text-slate-800 placeholder-slate-400 transition focus:border-[#0170B9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0170B9]"
              />
            </div>

            {/* Filter Negeri (State) */}
            <div className="relative lg:col-span-3">
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict("ALL");
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-xs font-semibold text-slate-800 transition focus:border-[#0170B9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0170B9]"
              >
                <option value="ALL">📍 {t.allStates}</option>
                {MALAYSIA_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Daerah (District) */}
            <div className="relative lg:col-span-3">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-xs font-semibold text-slate-800 transition focus:border-[#0170B9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0170B9]"
              >
                <option value="ALL">
                  🏙️ {t.allDistricts}{" "}
                  {selectedState !== "ALL" ? `(${selectedState})` : ""}
                </option>
                {availableDistricts.map((dst) => (
                  <option key={dst} value={dst}>
                    {dst}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Quick Toggles & Reset */}
            <div className="flex items-center gap-2 lg:col-span-2 justify-end">
              <button
                type="button"
                onClick={() => setOnlyAvailableNow(!onlyAvailableNow)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                  onlyAvailableNow
                    ? "bg-[#09B474] text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
                title={t.availableNowFilter}
              >
                <Clock className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">{t.availableNowFilter}</span>
              </button>

              <button
                type="button"
                onClick={() => setOnlyEmergency(!onlyEmergency)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                  onlyEmergency
                    ? "bg-rose-600 text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
                title={t.emergencyFilter}
              >
                <Zap className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">{t.emergencyFilter}</span>
              </button>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 rounded-xl px-2.5 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50"
                  title={t.resetFilter}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-extrabold text-slate-900">
              {t.showingResults}{" "}
              <span className="text-[#0170B9]">{filteredTrainees.length}</span>{" "}
              {t.expertsCountLabel}
            </h2>
          </div>
        </div>

        {/* Cards Grid */}
        {filteredTrainees.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-xs">
            <Users className="mx-auto h-10 w-10 text-slate-300" />
            <h3 className="mt-3 font-heading text-base font-bold text-slate-900">
              {t.noResultsTitle}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-xs text-slate-500">
              {t.noResultsDesc}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#0170B9] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#005a96]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t.resetFilter}</span>
            </button>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredTrainees.map((trainee) => (
              <TraineeCard
                key={trainee.id}
                trainee={trainee}
                onSelect={onSelectTrainee}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
