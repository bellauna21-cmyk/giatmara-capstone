"use client";

import React from "react";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200/80 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Col 1: Brand & Mission (5 cols) */}
          <div className="space-y-4 lg:col-span-5">
            <img
              src="https://giatmara.edu.my/wp-content/uploads/2022/07/KKDW-MARA-GIATMARA-Logo-1.png.webp"
              alt="GIATMARA Malaysia"
              className="h-11 w-auto object-contain"
            />
            <p className="max-w-sm text-xs leading-relaxed text-slate-500">
              Platform direktori moden untuk menghubungkan pelatih &amp; alumni
              berkemahiran tinggi GIATMARA Malaysia terus dengan pelanggan
              kediaman serta komersial tanpa orang tengah.
            </p>
            <div className="pt-1">
              <img
                src="https://giatmara.edu.my/wp-content/uploads/2022/07/Pilihan-withoutFont-1024x317.png.webp"
                alt="Kemahiran Pilihan Pertama"
                className="h-8 w-auto object-contain opacity-90"
              />
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Ekosistem GIATMARA
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-medium text-slate-500">
              <li>
                <a
                  href="https://giatmara.edu.my/direktori-usahawan/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition hover:text-[#0170B9]"
                >
                  <span>Direktori Usahawan Rasmi</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://giatmara.edu.my/senarai-kursus/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition hover:text-[#0170B9]"
                >
                  <span>Senarai Kursus &amp; Sijil SKM</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="http://gspel.giatmara.edu.my/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition hover:text-[#0170B9]"
                >
                  <span>Permohonan Latihan (GSPel)</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://giatmara.edu.my/direktori-giatmara/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition hover:text-[#0170B9]"
                >
                  <span>232 Pusat GIATMARA Negeri</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Wisma GIATMARA Contact (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Ibu Pejabat Korporat
            </h4>
            <ul className="mt-4 space-y-3 text-xs text-slate-500">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0170B9]" />
                <span>
                  Wisma GIATMARA, No 39 &amp; 41 Jalan Medan Tuanku, 50300 Kuala
                  Lumpur, Malaysia
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#09B474]" />
                <span>03-2691 2690 (Talian Rasmi)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#0170B9]" />
                <span>pelatih@giatmara.edu.my</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} GIATMARA Malaysia (KKDW &amp; MARA). All
            rights reserved.
          </p>
          <p className="font-medium text-slate-500">
            FPX Billing powered by ToyyibPay Malaysia
          </p>
        </div>
      </div>
    </footer>
  );
}
