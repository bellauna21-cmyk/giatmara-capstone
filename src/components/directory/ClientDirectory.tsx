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
  Sparkles,
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
    <div className="pb-20 bg-[#F8FAFC] overflow-x-hidden">
      {/* 1. Hero Section with Warm Architectural Gradient & Direct Headline */}
      <section className="relative overflow-hidden border-b border-slate-200/90 bg-gradient-to-b from-[#F1F5F9]/80 via-white to-[#F8FAFC] pt-6 pb-7 sm:pt-10 sm:pb-9">
        {/* Subtle decorative warmth */}
        <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-[#0170B9]/5 blur-3xl" />
        <div className="pointer-events-none absolute top-40 left-10 h-72 w-72 rounded-full bg-[#FCB900]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Accreditation Badge with Warm Accent */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] sm:text-xs font-bold text-slate-800 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#09B474]" />
              <span>TVET Malaysia</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#0170B9]">GIATMARA • IKM • KKTM • ILP</span>
            </div>

            {/* 1-2 Line Direct Headline */}
            <h1 className="mt-3.5 font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {t.heroHeadline}
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-medium">
              {t.heroSubline}
            </p>
          </div>

          {/* 2. THE MAIN FOCUS: TACTILE, PROMINENT TRADE ICON GRID */}
          <div className="mt-6 sm:mt-8">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#0170B9]" />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800">
                  {t.chooseSkillTitle}
                </span>
              </div>
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

            {/* Prominent Visual Icon Grid: 3 cols on mobile, 4 on tablet, 6 on desktop */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
              {/* Tile 0: Semua Kemahiran */}
              <button
                type="button"
                onClick={() => setSelectedSkill("ALL")}
                className={`group flex flex-col items-center justify-between rounded-2xl border-2 p-2 sm:p-3.5 text-center transition-all ${
                  selectedSkill === "ALL"
                    ? "border-[#0170B9] bg-[#0170B9] text-white shadow-md ring-2 ring-[#0170B9]/20 -translate-y-0.5"
                    : "border-slate-200/90 bg-white text-slate-800 hover:border-[#0170B9]/60 hover:shadow-xs hover:-translate-y-0.5"
                }`}
              >
                <div
                  className={`flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-2xl transition-all shadow-xs border ${
                    selectedSkill === "ALL"
                      ? "bg-white/20 text-white border-white/30"
                      : "bg-blue-50/90 text-[#0170B9] border-blue-200/70 group-hover:scale-105"
                  }`}
                >
                  <LayoutGrid className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="mt-1.5 text-[10.5px] sm:text-xs font-extrabold leading-tight text-center w-full min-h-[28px] sm:min-h-[32px] flex items-center justify-center break-words px-0.5">
                  {t.allSkills}
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    selectedSkill === "ALL" ? "text-blue-100" : "text-slate-400"
                  }`}
                >
                  {trainees.filter((x) => x.isPubliclyListed && x.isAccountActive !== false).length}{" "}
                  {language === "ms" ? "Pakar" : "Experts"}
                </span>
              </button>

              {/* Tiles 1-10: Distinct, Tasteful Trade Category Icons */}
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

                const displayName =
                  language === "ms"
                    ? config.labelMs || skill.shortMalay || skill.malayName
                    : config.labelEn || skill.shortEn || skill.name;

                return (
                  <button
                    type="button"
                    key={skill.id}
                    onClick={() => setSelectedSkill(active ? "ALL" : skill.slug)}
                    className={`group flex flex-col items-center justify-between rounded-2xl border-2 p-2 sm:p-3.5 text-center transition-all ${
                      active
                        ? "border-[#0170B9] bg-[#0170B9] text-white shadow-md ring-2 ring-[#0170B9]/20 -translate-y-0.5"
                        : "border-slate-200/90 bg-white text-slate-800 hover:border-slate-300 hover:shadow-xs hover:-translate-y-0.5"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-2xl transition-all shadow-xs border ${
                        active
                          ? "bg-white/20 text-white border-white/30"
                          : `${config.iconBg} ${config.iconColor} group-hover:scale-105`
                      }`}
                    >
                      <SkillIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="mt-1.5 text-[10.5px] sm:text-xs font-extrabold leading-tight text-center w-full min-h-[28px] sm:min-h-[32px] flex items-center justify-center break-words px-0.5">
                      {displayName}
                    </span>
                    <span
                      className={`text-[10px] font-semibold ${
                        active ? "text-blue-100" : "text-slate-400"
                      }`}
                    >
                      {count} {language === "ms" ? "Pakar" : "Experts"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Container */}
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 pt-6">
        {/* Anti-Scam Precaution Banner */}
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/90 p-3.5 sm:p-4 text-xs text-amber-900 shadow-xs">
          <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
          <div>
            <span className="font-extrabold text-amber-950">
              {t.safetyBannerTitle}{" "}
            </span>
            <span className="leading-relaxed">{t.safetyBannerDesc}</span>
          </div>
        </div>

        {/* Filter Controls: Negeri, Daerah, Search & Status */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5 shadow-xs">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-12 items-center">
            {/* Search Input */}
            <div className="relative lg:col-span-4">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-3 text-xs text-slate-800 placeholder-slate-400 transition focus:border-[#0170B9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0170B9]"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-xs font-semibold text-slate-800 transition focus:border-[#0170B9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0170B9]"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-xs font-semibold text-slate-800 transition focus:border-[#0170B9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0170B9]"
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
                className={`inline-flex flex-1 sm:flex-none justify-center items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                  onlyAvailableNow
                    ? "bg-[#09B474] text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
                title={t.availableNowFilter}
              >
                <Clock className="h-3.5 w-3.5" />
                <span>{t.availableNowFilter}</span>
              </button>

              <button
                type="button"
                onClick={() => setOnlyEmergency(!onlyEmergency)}
                className={`inline-flex flex-1 sm:flex-none justify-center items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                  onlyEmergency
                    ? "bg-rose-600 text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
                title={t.emergencyFilter}
              >
                <Zap className="h-3.5 w-3.5" />
                <span>24/7</span>
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
          <h2 className="font-heading text-base sm:text-lg font-extrabold text-slate-900">
            {t.showingResults}{" "}
            <span className="text-[#0170B9]">{filteredTrainees.length}</span>{" "}
            {t.expertsCountLabel}
          </h2>
        </div>

        {/* Cards Grid */}
        {filteredTrainees.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white p-10 sm:p-14 text-center shadow-xs">
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
          <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
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
