"use client";

import React, { useState } from "react";
import {
  UserCircle2,
  Plus,
  ShieldCheck,
  Wrench,
  Compass,
  ArrowUpRight,
} from "lucide-react";

export type PortalMode = "CLIENT" | "TRAINEE" | "ADMIN";

interface NavbarProps {
  activePortal: PortalMode;
  setActivePortal: (portal: PortalMode) => void;
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

export function Navbar({
  activePortal,
  setActivePortal,
  onOpenRegister,
  onOpenLogin,
}: NavbarProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Official GIATMARA Logo + Modern Brand Tag */}
        <button
          onClick={() => setActivePortal("CLIENT")}
          className="flex items-center gap-3.5 text-left transition hover:opacity-90 focus:outline-none"
        >
          {!logoError ? (
            <img
              src="https://giatmara.edu.my/wp-content/uploads/2022/07/KKDW-MARA-GIATMARA-Logo-1.png.webp"
              alt="GIATMARA Malaysia"
              className="h-10 w-auto object-contain sm:h-11"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0170B9] font-extrabold text-white">
              GM
            </div>
          )}
          <div className="hidden border-l border-slate-200 pl-3.5 sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold tracking-tight text-slate-900">
                SkillsHub
              </span>
              <span className="rounded-full bg-[#0170B9]/10 px-2 py-0.5 text-[10px] font-bold text-[#0170B9]">
                TVET
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500">
              Direktori Usahawan GIATMARA
            </p>
          </div>
        </button>

        {/* Center: Modern Segmented Pill Switcher */}
        <nav className="flex items-center rounded-full border border-slate-200/90 bg-slate-100/80 p-1">
          <button
            onClick={() => setActivePortal("CLIENT")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
              activePortal === "CLIENT"
                ? "bg-white text-[#0170B9] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Explore Talent</span>
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
            <span>Trainee Studio</span>
          </button>

          <button
            onClick={() => setActivePortal("ADMIN")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
              activePortal === "ADMIN"
                ? "bg-white text-[#0170B9] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Admin</span>
          </button>
        </nav>

        {/* Right: Clean Modern Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="http://gspel.giatmara.edu.my/"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-[#0170B9] xl:inline-flex"
          >
            <span>GSPel Portal</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            onClick={onOpenLogin}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <UserCircle2 className="h-4 w-4 text-[#0170B9]" />
            <span className="hidden sm:inline">Sign In</span>
          </button>

          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0170B9] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#005a96]"
          >
            <Plus className="h-4 w-4" />
            <span>List Your Skill</span>
          </button>
        </div>
      </div>
    </header>
  );
}
