"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Wrench,
  RotateCcw,
  Clock,
  Zap,
  ShieldAlert,
  Users,
  Snowflake,
  Droplets,
  Car,
  Bike,
  Flame,
  Scissors,
  UtensilsCrossed,
  Sparkles,
  Laptop,
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

interface ClientDirectoryProps {
  trainees: TraineeListing[];
  onSelectTrainee: (trainee: TraineeListing) => void;
}

const SKILL_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Snowflake,
  Droplets,
  Car,
  Bike,
  Flame,
  Scissors,
  UtensilsCrossed,
  Sparkles,
  Laptop,
  Wrench,
};

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

  const availableDistricts = useMemo(() => {
    if (selectedState === "ALL") {
      return Object.values(MALAYSIA_DISTRICTS_BY_STATE).flat();
    }
    return MALAYSIA_DISTRICTS_BY_STATE[selectedState] || [];
  }, [selectedState]);

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
    <div className="pb-16">
      {/* 1. COMPACT 1-2 LINE HERO + VISUAL SKILL ICON GRID (NO LONG SCROLLING) */}
      <section className="border-b border-slate-200/80 bg-white pt-5 pb-6 sm:pt-7 sm:pb-8">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          {/* 1-2 Line Direct Headline */}
          <div className="text-center sm:text-left">
            <h1 className="font-heading text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
              {t.heroHeadline}
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
              {t.heroSubline}
            </p>
          </div>

          {/* Interactive Skill Icon Grid */}
          <div className="mt-4 sm:mt-5">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
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

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
              {/* "Semua Kemahiran" Tile */}
              <button
                type="button"
                onClick={() => setSelectedSkill("ALL")}
                className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all sm:flex-col sm:items-start sm:p-3 ${
                  selectedSkill === "ALL"
                    ? "border-[#0170B9] bg-[#0170B9] text-white shadow-sm"
                    : "border-slate-200/90 bg-slate-50/70 text-slate-700 hover:border-[#0170B9]/40 hover:bg-white"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    selectedSkill === "ALL"
                      ? "bg-white/20 text-white"
                      : "bg-[#0170B9]/10 text-[#0170B9]"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-extrabold">
                    {t.allSkills}
                  </p>
                  <p
                    className={`truncate text-[10px] ${
                      selectedSkill === "ALL"
                        ? "text-blue-100"
                        : "text-slate-400"
                    }`}
                  >
                    {trainees.filter((x) => x.isPubliclyListed && x.isAccountActive !== false).length}{" "}
                    {language === "ms" ? "Pakar" : "Experts"}
                  </p>
                </div>
              </button>

              {/* Individual Visual Skill Icon Cards */}
              {skillsList.map((skill) => {
                const active = selectedSkill === skill.slug;
                const IconComponent =
                  SKILL_ICON_MAP[skill.iconName] || Wrench;

                return (
                  <button
                    type="button"
                    key={skill.id}
                    onClick={() =>
                      setSelectedSkill(active ? "ALL" : skill.slug)
                    }
                    className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all sm:flex-col sm:items-start sm:p-3 ${
                      active
                        ? "border-[#0170B9] bg-[#0170B9] text-white shadow-sm"
                        : "border-slate-200/90 bg-white text-slate-800 hover:border-[#0170B9]/50 hover:shadow-xs"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-[#0170B9]/10 text-[#0170B9]"
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="line-clamp-1 text-xs font-extrabold">
                        {language === "ms"
                          ? skill.shortMalay || skill.malayName
                          : skill.shortEn || skill.name}
                      </p>
                      <p
                        className={`line-clamp-1 text-[10px] ${
                          active ? "text-blue-100" : "text-slate-400"
                        }`}
                      >
                        {language === "ms" ? skill.malayName : skill.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. STATE (NEGERI), DISTRICT (DAERAH) & KEYWORD FILTER BAR */}
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-2.5 shadow-2xs sm:p-3">
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-12">
              {/* Keyword Search */}
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 md:col-span-4">
                <Search className="h-4 w-4 shrink-0 text-[#0170B9]" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {t.searchLabel}
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* State (Negeri) Filter */}
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 md:col-span-4">
                <MapPin className="h-4 w-4 shrink-0 text-[#09B474]" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {t.stateLabel}
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedDistrict("ALL");
                    }}
                    className="w-full cursor-pointer bg-transparent text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="ALL">{t.allStates}</option>
                    {MALAYSIA_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* District (Daerah) Filter */}
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 md:col-span-4">
                <MapPin className="h-4 w-4 shrink-0 text-[#0170B9]" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {t.districtLabel}
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full cursor-pointer bg-transparent text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="ALL">{t.allDistricts}</option>
                    {availableDistricts.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Status Filters Row */}
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOnlyAvailableNow(!onlyAvailableNow)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                    onlyAvailableNow
                      ? "bg-[#09B474] text-white shadow-2xs"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  <span>{t.availableNowFilter}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOnlyEmergency(!onlyEmergency)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                    onlyEmergency
                      ? "bg-rose-600 text-white shadow-2xs"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>{t.emergencyFilter}</span>
                </button>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1 rounded-xl bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-100"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{t.resetFilter}</span>
                  </button>
                )}
              </div>

              <span className="text-xs font-semibold text-slate-500">
                {t.showingResults}{" "}
                <strong className="text-slate-900">
                  {filteredTrainees.length}
                </strong>{" "}
                {t.expertsCountLabel}
              </span>
            </div>
          </div>

          {/* 3. SAFETY PRECAUTION BANNER (JUMPA SEBELUM BAYAR) */}
          <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-amber-300/90 bg-amber-50/90 px-3.5 py-2.5 text-xs text-amber-900">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="leading-relaxed">
              <strong className="font-extrabold">{t.safetyBannerTitle}</strong>{" "}
              {t.safetyBannerDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 4. SPECIALIST DIRECTORY CARDS GRID */}
      <div className="mx-auto mt-6 max-w-7xl px-3 sm:px-6 lg:px-8">
        {filteredTrainees.length === 0 ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-10 text-center shadow-xs">
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
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#0170B9] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#005a96]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t.resetFilter}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
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
