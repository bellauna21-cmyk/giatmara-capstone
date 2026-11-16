// src/components/layout/Footer.tsx
"use client";

import React from "react";
import { ShieldAlert, Wrench, CheckCircle2 } from "lucide-react";
import { usePlatform } from "@/context/PlatformContext";
import { TRANSLATIONS } from "@/lib/i18n";

export function Footer() {
  const { language } = usePlatform();
  const t = TRANSLATIONS[language];

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white pb-20 text-slate-600 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Col 1: Brand & TVET Agencies (5 cols) */}
          <div className="space-y-3 md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0170B9] text-white shadow-xs">
                <Wrench className="h-4 w-4" />
              </div>
              <div>
                <span className="font-heading text-base font-extrabold text-slate-900 block">
                  {t.brandTitle}
                </span>
                <span className="text-[11px] font-semibold text-[#0170B9]">
                  GIATMARA • IKM • KKTM • ILP
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              {language === "ms"
                ? "Platform direktori komuniti perintis untuk menghubungkan tenaga mahir dan usahawan teknikal bertauliah terus dengan pelanggan mengikut daerah tanpa sebarang orang tengah."
                : "Pioneer community directory connecting certified skilled professionals and technical specialists directly with clients by district without middlemen."}
            </p>

            {/* Agency Badges (Subtle & Professional) */}
            <div className="pt-1">
              <div className="flex flex-wrap gap-1.5">
                {["GIATMARA", "IKM", "KKTM", "ILP / TVET"].map((agency) => (
                  <span
                    key={agency}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-700"
                  >
                    {agency}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[11px] italic text-slate-500">
                * {t.agencyPermissionNote}
              </p>
            </div>
          </div>

          {/* Col 2: Pioneer Program & Subscription Info (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1.5">
              {language === "ms"
                ? "Program Perintis Pakar"
                : "Pioneer Specialist Program"}
            </h4>
            <ul className="mt-3 space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#09B474]" />
                <span>
                  {language === "ms"
                    ? "Percubaan Percuma 3 Bulan untuk pakar kemahiran baharu"
                    : "3-Month Free Trial for newly registered specialists"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#09B474]" />
                <span>
                  {language === "ms"
                    ? "Tiada komisen atas kerja — urusan terus bersama pelanggan"
                    : "Zero job commission — deal directly with clients"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#09B474]" />
                <span>
                  {language === "ms"
                    ? "Bayaran langganan manual QR (sokongan gateway masa hadapan)"
                    : "Manual QR subscription billing (payment gateway ready)"}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Safety Precaution Box (4 cols) */}
          <div className="md:col-span-4">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-950">
                <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600" />
                <span>{t.safetyBannerTitle}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-amber-900">
                {t.safetyBannerDesc}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-amber-200/60 pt-2 text-[10px] font-bold text-amber-800">
                <span>✓ Semak Kerosakan</span>
                <span>✓ Setuju Harga</span>
                <span>✓ Selesai Kerja</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Terms */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Direktori Pakar TVET Malaysia.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Inisiatif Capstone TVET</span>
            <span>•</span>
            <span>Pelan Percubaan 3 Bulan</span>
            <span>•</span>
            <span>Sokongan Manual QR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
