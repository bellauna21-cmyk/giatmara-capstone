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
    <div className="pb-16 bg-[#F4F6F9]">
      {/* 1. MARA-INSPIRED WARM HERO BANNER (NOT STERILE WHITE, WITH DIGNIFIED MARA NAVY & GOLD) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#002D4A] via-[#01426A] to-[#01528A] text-white pt-7 pb-8 sm:pt-9 sm:pb-10 shadow-sm border-b-4 border-[#FCB900]">
        {/* Subtle decorative heritage geometry */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
        <div className="pointer-events-none absolute left-1/3 bottom-0 h-40 w-40 rounded-full bg-[#FCB900]/10 blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          {/* Top TVET Badge */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCB900] px-3 py-0.5 text-[11px] font-extrabold text-slate-950 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]" />
              {language === "ms" ? "Inisiatif TVET Malaysia" : "Malaysia TVET Initiative"}
            </span>
            <span className="text-xs font-semibold text-blue-200">
              GIATMARA • IKM • KKTM • ILP
            </span>
          </div>

          {/* 1-2 Line Direct Headline with MARA Prestige */}
          <div className="text-center sm:text-left">
            <h1 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl text-white">
              {t.heroHeadline}
            </h1>
            <p className="mt-1.5 max-w-2xl text-xs font-medium text-blue-100 sm:text-sm leading-relaxed">
              {t.heroSubline}
            </p>
          </div>
        </div>
      </section>

      {/* 2. PROPER NON-AI SKILL ICONS GRID (ABOVE THE FOLD, REAL CRAFT BADGES) */}
      <section className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 -mt-4">
        <div className="rounded-2xl border-2 border-slate-200/90 bg-white p-3.5 sm:p-5 shadow-md">
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#C8102E]" />
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800">
                {t.chooseSkillTitle}
              </h2>
            </div>
            {selectedSkill !== "ALL" && (
              <button
                type="button"
                onClick={() => setSelectedSkill("ALL")}
                className="text-xs font-bold text-[#01528A] hover:underline"
              >
                {t.allSkills}
              </button>
            )}
          </div>

          {/* Grid of Distinct, Non-AI Skill Badges */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {/* "Semua Kemahiran" Card */}
            <button
              type="button"
              onClick={() => setSelectedSkill("ALL")}
              className={`group flex items-center gap-2.5 rounded-xl border-2 p-2.5 text-left transition-all sm:flex-col sm:items-start sm:p-3 ${
                selectedSkill === "ALL"
                  ? "border-[#002D4A] bg-[#002D4A] text-white shadow-md ring-2 ring-[#FCB900]"
                  : "border-slate-200 bg-slate-50 text-slate-800 hover:border-[#01528A] hover:bg-white"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-xs transition ${
                  selectedSkill === "ALL"
                    ? "bg-[#FCB900] text-slate-950"
                    : "bg-[#002D4A]/10 text-[#002D4A] group-hover:bg-[#002D4A] group-hover:text-white"
                }`}
              >
                <LayoutGrid className="h-5 w-5" />
              </div>
              <div className="min-w-0 w-full">
                <p className="truncate text-xs font-extrabold">{t.allSkills}</p>
                <p
                  className={`truncate text-[10px] font-semibold ${
                    selectedSkill === "ALL" ? "text-amber-200" : "text-slate-500"
                  }`}
                >
                  {trainees.filter((x) => x.isPubliclyListed && x.isAccountActive !== false).length}{" "}
                  {language === "ms" ? "Pakar Aktif" : "Active Experts"}
                </p>
              </div>
            </button>

            {/* Individual Proper Non-AI Skill Cards */}
            {skillsList.map((skill) => {
              const active = selectedSkill === skill.slug;
              const config = TRADE_ICON_CONFIG[skill.slug] || TRADE_ICON_CONFIG["ALL"];
              const IconComponent = config.icon;
              const countInTrade = trainees.filter(
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
                  className={`group flex items-center gap-2.5 rounded-xl border-2 p-2.5 text-left transition-all sm:flex-col sm:items-start sm:p-3 ${
                    active
                      ? `${config.borderActive} shadow-md ring-2 ring-[#FCB900]`
                      : `${config.borderLight} hover:shadow-xs`
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-xs transition ${
                      active
                        ? "bg-white text-slate-900"
                        : `${config.badgeBg} group-hover:scale-105`
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 w-full">
                    <p className="line-clamp-1 text-xs font-extrabold">
                      {language === "ms"
                        ? skill.shortMalay || skill.malayName
                        : skill.shortEn || skill.name}
                    </p>
                    <p
                      className={`truncate text-[10px] font-medium ${
                        active ? "text-white/80" : "text-slate-500"
                      }`}
                    >
                      {countInTrade} {language === "ms" ? "Pakar" : "Experts"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 3. NEGERI, DAERAH & KEYWORD FILTER BAR WITH CLEAR MARA CONTRAST */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-100/70 p-2.5 sm:p-3">
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-12">
              {/* Keyword Search */}
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 md:col-span-4 shadow-2xs">
                <Search className="h-4 w-4 shrink-0 text-[#01528A]" />
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
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 md:col-span-4 shadow-2xs">
                <MapPin className="h-4 w-4 shrink-0 text-[#C8102E]" />
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
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 md:col-span-4 shadow-2xs">
                <MapPin className="h-4 w-4 shrink-0 text-[#01528A]" />
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

            {/* Quick Status Filters */}
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/80">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOnlyAvailableNow(!onlyAvailableNow)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                    onlyAvailableNow
                      ? "bg-[#09B474] text-white shadow-2xs"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
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
                      ? "bg-[#C8102E] text-white shadow-2xs"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Zap className="h-3.5 w-3.5 text-amber-300" />
                  <span>{t.emergencyFilter}</span>
                </button>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1 rounded-xl bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{t.resetFilter}</span>
                  </button>
                )}
              </div>

              <span className="text-xs font-bold text-slate-700">
                {t.showingResults}{" "}
                <strong className="text-[#01528A]">
                  {filteredTrainees.length}
                </strong>{" "}
                {t.expertsCountLabel}
              </span>
            </div>
          </div>

          {/* 4. SOLID ANTI-SCAM PRECAUTION BANNER (JUMPA SEBELUM BAYAR) */}
          <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border-2 border-amber-300 bg-amber-50 px-3.5 py-2.5 text-xs text-amber-950 shadow-2xs">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
            <p className="leading-relaxed">
              <strong className="font-extrabold text-[#C8102E]">{t.safetyBannerTitle}</strong>{" "}
              {t.safetyBannerDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 5. SPECIALIST DIRECTORY CARDS (WITH WARM AUTHENTIC MARA TVET LOOK) */}
      <div className="mx-auto mt-6 max-w-7xl px-3 sm:px-6 lg:px-8">
        {filteredTrainees.length === 0 ? (
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-10 text-center shadow-xs">
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
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#01528A] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#002D4A]"
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
