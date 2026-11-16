// src/components/layout/Navbar.tsx
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
  ShieldCheck,
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
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {/* Left: Professional Brand Emblem (Non-AI, Official TVET styling) */}
          <button
            onClick={() => setActivePortal("CLIENT")}
            className="flex items-center gap-3 text-left transition hover:opacity-90 focus:outline-none"
          >
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-[#0170B9] font-heading text-sm font-extrabold text-white shadow-xs">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-sm sm:text-base font-extrabold tracking-tight text-slate-900">
                  {t.brandTitle}
                </span>
                <span className="hidden sm:inline-block rounded-full bg-[#0170B9]/10 px-2 py-0.5 text-[10px] font-bold text-[#0170B9]">
                  TVET
                </span>
              </div>
              <p className="line-clamp-1 text-[11px] font-medium text-slate-500">
                {t.brandSubtitle}
              </p>
            </div>
          </button>

          {/* Center: Modern Segmented Pill Switcher (Like Last Week) */}
          <nav className="hidden md:flex items-center rounded-full border border-slate-200/90 bg-slate-100/80 p-1">
            <button
              onClick={() => setActivePortal("CLIENT")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activePortal === "CLIENT"
                  ? "bg-white text-[#0170B9] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>{t.navExplore}</span>
            </button>

            <button
              onClick={() => setActivePortal("TRAINEE")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activePortal === "TRAINEE"
                  ? "bg-white text-[#0170B9] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Wrench className="h-3.5 w-3.5" />
              <span>{t.navExpertPanel}</span>
            </button>

            <button
              onClick={() => setActivePortal("ADMIN")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activePortal === "ADMIN"
                  ? "bg-white text-[#0170B9] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FolderKanban className="h-3.5 w-3.5" />
              <span>{t.navDirectory}</span>
            </button>
          </nav>

          {/* Right: Language Switcher + Sign In / Register */}
          <div className="flex items-center gap-2">
            {/* Clean Language Switcher Pill */}
            <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLanguage("ms")}
                className={`rounded-md px-2 py-1 transition ${
                  language === "ms"
                    ? "bg-[#0170B9] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                BM
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-md px-2 py-1 transition ${
                  language === "en"
                    ? "bg-[#0170B9] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                EN
              </button>
            </div>

            {authRole !== "GUEST" ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenLogin}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <UserCircle2 className="h-4 w-4 text-[#0170B9]" />
                  <span className="hidden sm:inline">
                    {authRole === "ADMIN"
                      ? language === "ms"
                        ? "Urusetia"
                        : "Admin"
                      : currentTrainee?.name.split(" ")[0] || "Pakar"}
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                  title={t.signOut}
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t.signOut}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <UserCircle2 className="h-4 w-4 text-[#0170B9]" />
                <span className="hidden sm:inline">{t.signIn}</span>
              </button>
            )}

            <button
              onClick={onOpenRegister}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0170B9] px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#005a96]"
            >
              <Plus className="h-4 w-4" />
              <span>{t.registerExpert}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Bottom Navigation Bar (Phone Mode) */}
      <nav className="fixed right-0 bottom-0 left-0 z-40 flex items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-md px-2 py-2 shadow-lg md:hidden">
        <button
          onClick={() => setActivePortal("CLIENT")}
          className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-bold transition ${
            activePortal === "CLIENT"
              ? "bg-[#0170B9]/10 text-[#0170B9]"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Compass className="h-4 w-4" />
          <span>{t.navExplore}</span>
        </button>

        <button
          onClick={() => setActivePortal("TRAINEE")}
          className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-bold transition ${
            activePortal === "TRAINEE"
              ? "bg-[#0170B9]/10 text-[#0170B9]"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Wrench className="h-4 w-4" />
          <span>{t.navExpertPanel}</span>
        </button>

        <button
          onClick={() => setActivePortal("ADMIN")}
          className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-bold transition ${
            activePortal === "ADMIN"
              ? "bg-[#0170B9]/10 text-[#0170B9]"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <FolderKanban className="h-4 w-4" />
          <span>{t.navDirectory}</span>
        </button>
      </nav>
    </>
  );
}
