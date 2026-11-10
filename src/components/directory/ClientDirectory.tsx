"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  MapPin,
  Wrench,
  RotateCcw,
  Clock,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Users,
  SlidersHorizontal,
} from "lucide-react";
import {
  GIATMARA_SKILLS,
  MALAYSIA_STATES,
  TraineeListing,
} from "@/lib/giatmara-data";
import { TraineeCard } from "./TraineeCard";

interface ClientDirectoryProps {
  trainees: TraineeListing[];
  onSelectTrainee: (trainee: TraineeListing) => void;
}

const SHOWCASE_SLIDES = [
  {
    image:
      "https://giatmara.edu.my/wp-content/uploads/2022/07/Slider-1_1024x600.jpg.webp",
    caption: "Certified TVET Specialists Across 232 GIATMARA Campuses",
    tag: "Kemahiran Pilihan Pertama",
  },
  {
    image: "https://giatmara.edu.my/wp-content/uploads/2022/07/Slider-02.jpg",
    caption: "SKM & Suruhanjaya Tenaga (PW2/PW4) Accredited Graduates",
    tag: "Verified Competency",
  },
  {
    image: "https://giatmara.edu.my/wp-content/uploads/2022/07/Slider-03.jpg",
    caption: "Empowering Local Technical Entrepreneurs Nationwide",
    tag: "Direktori Usahawan MARA",
  },
];

export function ClientDirectory({
  trainees = [],
  onSelectTrainee,
}: ClientDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("ALL");
  const [selectedState, setSelectedState] = useState("ALL");
  const [onlyAvailableNow, setOnlyAvailableNow] = useState(false);
  const [onlyEmergency, setOnlyEmergency] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const filteredTrainees = useMemo(() => {
    const tierPriority = { PREMIUM: 3, PRO: 2, BASIC: 1 };

    return trainees
      .filter((t) => {
        if (!t.isPubliclyListed) return false;
        if (selectedState !== "ALL" && t.state !== selectedState) return false;
        if (selectedSkill !== "ALL" && !t.skills.includes(selectedSkill))
          return false;
        if (onlyAvailableNow && t.availability !== "AVAILABLE") return false;
        if (onlyEmergency && !t.emergencyAvailable) return false;

        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          return (
            t.name.toLowerCase().includes(q) ||
            t.headline.toLowerCase().includes(q) ||
            t.city.toLowerCase().includes(q) ||
            t.giatmaraCenter.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => tierPriority[b.planTier] - tierPriority[a.planTier]);
  }, [
    trainees,
    searchQuery,
    selectedSkill,
    selectedState,
    onlyAvailableNow,
    onlyEmergency,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSkill("ALL");
    setSelectedState("ALL");
    setOnlyAvailableNow(false);
    setOnlyEmergency(false);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedSkill !== "ALL" ||
    selectedState !== "ALL" ||
    onlyAvailableNow ||
    onlyEmergency;

  const slide = SHOWCASE_SLIDES[activeSlide];

  return (
    <div className="pb-16">
      {/* 1. Modern Split Bento Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white pt-8 pb-14 lg:pt-12 lg:pb-16">
        {/* Subtle Ambient Background Accent */}
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#0170B9]/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-[#09B474]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left 7 Columns: Modern Typography & Value Prop */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0170B9]/20 bg-[#0170B9]/5 px-3.5 py-1.5 text-xs font-bold text-[#0170B9]">
                <span className="h-2 w-2 rounded-full bg-[#09B474]" />
                <span>Official GIATMARA Malaysia Skill Directory</span>
              </div>

              <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl">
                Hire verified{" "}
                <span className="text-[#0170B9]">GIATMARA specialists</span>{" "}
                directly in your area.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                Connect with accredited TVET graduates and technical
                entrepreneurs for electrical wiring (PW2/PW4), air-conditioning,
                plumbing, welding, automotive, and tailoring—with zero
                commission fees.
              </p>

              {/* Trust Highlights + Pilihan Pertama Emblem */}
              <div className="mt-7 flex flex-wrap items-center gap-6">
                <img
                  src="https://giatmara.edu.my/wp-content/uploads/2022/07/Pilihan-withoutFont-1024x317.png.webp"
                  alt="Kemahiran Pilihan Pertama"
                  className="h-10 w-auto object-contain"
                />

                <div className="flex flex-wrap items-center gap-4 border-l border-slate-200 pl-6 text-xs font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#09B474]" />
                    Matrix ID Verified
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#0170B9]" />
                    Direct WhatsApp Deal
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Modern Bento Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900 shadow-xl">
                <div className="relative h-72 sm:h-80">
                  <img
                    src={slide.image}
                    alt={slide.caption}
                    className="h-full w-full object-cover opacity-90 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Top Floating Pill */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-[#0170B9] shadow-xs backdrop-blur-md">
                      {slide.tag}
                    </span>

                    <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur-md">
                      {SHOWCASE_SLIDES.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSlide(idx)}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === activeSlide
                              ? "w-5 bg-[#09B474]"
                              : "w-1.5 bg-white/50"
                          }`}
                          aria-label={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Glassmorphic Info & 24/7 Emergency Switch */}
                  <div className="absolute right-4 bottom-4 left-4 space-y-3">
                    <p className="font-heading text-sm font-bold text-white">
                      {slide.caption}
                    </p>

                    <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500 text-white">
                          <Zap className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">
                            24/7 Emergency Callout
                          </p>
                          <p className="text-[11px] text-slate-300">
                            Urgent wiring, pipe burst &amp; breakdown
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setOnlyEmergency(!onlyEmergency)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-extrabold transition ${
                          onlyEmergency
                            ? "bg-[#FCB900] text-slate-950 shadow-xs"
                            : "bg-white text-slate-900 hover:bg-slate-100"
                        }`}
                      >
                        {onlyEmergency ? "Active (24/7)" : "Filter 24/7"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Modern Elevated Search Command Bar */}
          <div className="mt-10 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
            <div className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-12 md:divide-x md:divide-y-0">
              {/* Keyword Input */}
              <div className="flex items-center gap-3 px-4 py-3 md:col-span-5">
                <Search className="h-5 w-5 shrink-0 text-[#0170B9]" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    What service do you need?
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search wireman, aircond, Shah Alam, Ipoh..."
                    className="mt-0.5 w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* State Select */}
              <div className="flex items-center gap-3 px-4 py-3 md:col-span-3">
                <MapPin className="h-5 w-5 shrink-0 text-[#09B474]" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    State (Negeri)
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="mt-0.5 w-full cursor-pointer bg-transparent text-sm font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="ALL">All States in Malaysia</option>
                    {MALAYSIA_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Skill Cluster Select */}
              <div className="flex items-center gap-3 px-4 py-3 md:col-span-4">
                <Wrench className="h-5 w-5 shrink-0 text-[#0170B9]" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    TVET Skill Cluster
                  </label>
                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="mt-0.5 w-full cursor-pointer bg-transparent text-sm font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="ALL">All GIATMARA Trades</option>
                    {GIATMARA_SKILLS.map((sk) => (
                      <option key={sk.id} value={sk.slug}>
                        {sk.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filter Pills & Directory Grid */}
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Horizontal Skill & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedSkill("ALL")}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                selectedSkill === "ALL"
                  ? "bg-[#0170B9] text-white shadow-xs"
                  : "border border-slate-200/90 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              All Trades
            </button>
            {GIATMARA_SKILLS.map((skill) => {
              const active = selectedSkill === skill.slug;
              return (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkill(active ? "ALL" : skill.slug)}
                  className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-[#0170B9] text-white shadow-xs"
                      : "border border-slate-200/90 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  {skill.malayName}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlyAvailableNow(!onlyAvailableNow)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                onlyAvailableNow
                  ? "bg-[#09B474] text-white shadow-xs"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>Available Now</span>
            </button>

            <button
              onClick={() => setOnlyEmergency(!onlyEmergency)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                onlyEmergency
                  ? "bg-rose-600 text-white shadow-xs"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>24/7 Emergency</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Count Header */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-xl font-extrabold text-slate-900">
              Verified Service Providers
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredTrainees.length} active GIATMARA trainees &amp;
              entrepreneurs
            </p>
          </div>

          <div className="hidden items-center gap-1.5 text-xs font-medium text-slate-500 sm:flex">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#0170B9]" />
            <span>Sorted by Featured Tier &amp; Verification</span>
          </div>
        </div>

        {/* Cards Grid */}
        {filteredTrainees.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-slate-200/80 bg-white p-14 text-center shadow-xs">
            <Users className="mx-auto h-10 w-10 text-slate-300" />
            <h3 className="mt-3 font-heading text-base font-bold text-slate-900">
              No trainees match your current filters
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-xs text-slate-500">
              Try selecting another state or clearing the active search filters
              to see all listed GIATMARA specialists.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-[#0170B9] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#005a96]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
