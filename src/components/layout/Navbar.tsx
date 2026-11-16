"use client";

import React from "react";
import {
  UserCircle2,
  Plus,
  FolderKanban,
  Wrench,
  Compass,
  LogOut,
  Globe,
  Award,
} from "lucide-react";
import { usePlatform } from "@/context/PlatformContext";
import { TRANSLATIONS } from "@/lib/i18n";

export type PortalMode = "CLIENT" | "TRAINEE" | "ADMIN";

interface NavbarProps {
  activePortal: PortalMode;
  setActivePortal: (portal: PortalMode) => void;
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export function Navbar({
  activePortal,
  setActivePortal,
  onOpenRegister,
  onOpenLogin,
  onLogout,
}: NavbarProps) {
  const { language, setLanguage, authRole, currentTrainee } = usePlatform();
  const t = TRANSLATIONS[language];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xs">
        {/* Top MARA TVET Community Strip */}
        <div className="border-b border-[#002035] bg-[#002D4A] px-3 py-1.5 text-[11px] text-slate-200">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[#FCB900] px-1.5 py-0.5 text-[10px] font-extrabold text-slate-950">
                TVET MALAYSIA
              </span>
              <span className="font-bold text-white">
                GIATMARA • IKM • KKTM • ILP
              </span>
              <span className="hidden text-blue-200 lg:inline">
                | {language === "ms"
                  ? "Direktori Tenaga Mahir Komuniti (Logo rasmi tertakluk kebenaran agensi)"
                  : "Community Skilled Specialist Directory"}
              </span>
            </div>

            {/* Language Switcher Pill (BM / EN) */}
            <div className="flex items-center gap-2 ml-auto">
              <div className="inline-flex items-center rounded-lg border border-slate-700 bg-slate-800/90 p-0.5 text-[11px] font-bold">
                <Globe className="ml-1.5 mr-1 h-3 w-3 text-[#FCB900]" />
                <button
                  type="button"
                  onClick={() => setLanguage("ms")}
                  className={`rounded-md px-2 py-0.5 transition ${
                    language === "ms"
                      ? "bg-[#01528A] text-white shadow-xs"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  BM
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`rounded-md px-2 py-0.5 transition ${
                    language === "en"
                      ? "bg-[#01528A] text-white shadow-xs"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header Row */}
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:h-20 sm:px-6 lg:px-8">
          {/* Left: Distinctive MARA Brand Emblem */}
          <button
            onClick={() => setActivePortal("CLIENT")}
            className="flex items-center gap-2.5 text-left transition hover:opacity-90 focus:outline-none sm:gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#002D4A] to-[#01528A] font-heading text-sm font-extrabold text-white shadow-md border-2 border-[#FCB900]/60">
              <Wrench className="h-5 w-5 text-[#FCB900]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-sm font-extrabold tracking-tight text-slate-900 sm:text-base">
                  {t.brandTitle}
                </span>
                <span className="hidden rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-extrabold text-amber-900 sm:inline-block">
                  {language === "ms" ? "Perintis" : "Pioneer"}
                </span>
              </div>
              <p className="line-clamp-1 text-[10px] font-semibold text-slate-600 sm:text-[11px]">
                {t.brandSubtitle}
              </p>
            </div>
          </button>

          {/* Center: Desktop Portal Switcher */}
          <nav className="hidden items-center rounded-full border border-slate-200 bg-slate-100 p-1 md:flex shadow-2xs">
            <button
              onClick={() => setActivePortal("CLIENT")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activePortal === "CLIENT"
                  ? "bg-[#01528A] text-white shadow-xs"
                  : "text-slate-700 hover:text-[#01528A]"
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>{t.navExplore}</span>
            </button>

            <button
              onClick={() => setActivePortal("TRAINEE")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activePortal === "TRAINEE"
                  ? "bg-[#01528A] text-white shadow-xs"
                  : "text-slate-700 hover:text-[#01528A]"
              }`}
            >
              <Wrench className="h-3.5 w-3.5" />
              <span>{t.navExpertPanel}</span>
            </button>

            <button
              onClick={() => setActivePortal("ADMIN")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activePortal === "ADMIN"
                  ? "bg-[#01528A] text-white shadow-xs"
                  : "text-slate-700 hover:text-[#01528A]"
              }`}
            >
              <FolderKanban className="h-3.5 w-3.5" />
              <span>{t.navDirectory}</span>
            </button>
          </nav>

          {/* Right: Auth & Registration Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {authRole !== "GUEST" ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenLogin}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-[11px] font-bold text-slate-800 transition hover:bg-slate-100 sm:px-3 sm:text-xs"
                  title={
                    language === "ms" ? "Tukar Akaun" : "Switch Account"
                  }
                >
                  <UserCircle2 className="h-4 w-4 text-[#01528A]" />
                  <span className="max-w-[90px] truncate sm:max-w-[130px]">
                    {authRole === "ADMIN"
                      ? language === "ms"
                        ? "Urusetia Direktori"
                        : "Directory Admin"
                      : currentTrainee?.name.split(" ")[0] || "Pakar"}
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-2 text-[11px] font-bold text-rose-700 transition hover:bg-rose-100 sm:px-3 sm:text-xs"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>{t.signOut}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-2.5 py-2 text-[11px] font-bold text-slate-800 transition hover:border-[#01528A] hover:bg-slate-50 sm:px-3.5 sm:py-2.5 sm:text-xs"
              >
                <UserCircle2 className="h-4 w-4 text-[#01528A]" />
                <span>{t.signIn}</span>
              </button>
            )}

            <button
              onClick={onOpenRegister}
              className="inline-flex items-center gap-1 rounded-xl bg-[#01528A] px-2.5 py-2 text-[11px] font-bold text-white shadow-xs transition hover:bg-[#002D4A] sm:px-4 sm:py-2.5 sm:text-xs"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FCB900]" />
              <span>{t.registerExpert}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="fixed right-0 bottom-0 left-0 z-40 flex items-center justify-around border-t-2 border-slate-200 bg-white px-2 py-2 shadow-lg md:hidden">
        <button
          onClick={() => setActivePortal("CLIENT")}
          className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-bold transition ${
            activePortal === "CLIENT"
              ? "bg-[#01528A]/10 text-[#01528A]"
              : "text-slate-500"
          }`}
        >
          <Compass className="h-4 w-4" />
          <span>{t.navExplore}</span>
        </button>

        <button
          onClick={() => setActivePortal("TRAINEE")}
          className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-bold transition ${
            activePortal === "TRAINEE"
              ? "bg-[#01528A]/10 text-[#01528A]"
              : "text-slate-500"
          }`}
        >
          <Wrench className="h-4 w-4" />
          <span>{t.navExpertPanel}</span>
        </button>

        <button
          onClick={() => setActivePortal("ADMIN")}
          className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-bold transition ${
            activePortal === "ADMIN"
              ? "bg-[#01528A]/10 text-[#01528A]"
              : "text-slate-500"
          }`}
        >
          <FolderKanban className="h-4 w-4" />
          <span>{t.navDirectory}</span>
        </button>
      </nav>
    </>
  );
}
