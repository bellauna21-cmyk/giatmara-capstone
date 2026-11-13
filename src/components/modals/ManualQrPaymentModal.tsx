// src/components/modals/ManualQrPaymentModal.tsx
"use client";

import React, { useState } from "react";
import { QrCode, X, MessageCircle, CheckCircle2, Sparkles } from "lucide-react";
import { PlanTier } from "@/lib/giatmara-data";
import { usePlatform } from "@/context/PlatformContext";

interface ManualQrPaymentModalProps {
  checkoutPlan: { tier: PlanTier; name: string; priceRM: number } | null;
  expertName: string;
  onClose: () => void;
  onSuccess: (
    tier: PlanTier,
    name: string,
    priceRM: number,
    refCode: string
  ) => void;
}

export function ManualQrPaymentModal({
  checkoutPlan,
  expertName,
  onClose,
  onSuccess,
}: ManualQrPaymentModalProps) {
  const { language } = usePlatform();
  const [referenceNo, setReferenceNo] = useState("");

  if (!checkoutPlan) return null;

  const isFreeTrial = checkoutPlan.tier === "TRIAL" || checkoutPlan.priceRM === 0;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = isFreeTrial
      ? "TRIAL-3M-FREE"
      : referenceNo.trim() || `QR-${Date.now().toString().slice(-6)}`;

    if (!isFreeTrial) {
      const waMessage =
        language === "ms"
          ? `Salam Urusetia Direktori, saya ${expertName} telah membuat bayaran Kod QR sebanyak RM ${checkoutPlan.priceRM}.00 untuk ${checkoutPlan.name}. No Rujukan Transaksi: ${ref}. Mohon pengesahan.`
          : `Hi Directory Admin, I (${expertName}) have completed the QR payment of RM ${checkoutPlan.priceRM}.00 for ${checkoutPlan.name}. Reference No: ${ref}.`;
      window.open(
        `https://wa.me/60125438890?text=${encodeURIComponent(waMessage)}`,
        "_blank"
      );
    }

    onSuccess(checkoutPlan.tier, checkoutPlan.name, checkoutPlan.priceRM, ref);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <form
        onSubmit={handleConfirm}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0170B9]/10 text-[#0170B9]">
              {isFreeTrial ? (
                <Sparkles className="h-5 w-5 text-[#09B474]" />
              ) : (
                <QrCode className="h-5 w-5" />
              )}
            </div>
            <div>
              <span className="font-mono-code block text-[10px] font-bold uppercase tracking-wider text-[#0170B9]">
                {isFreeTrial
                  ? language === "ms"
                    ? "Program Perintis"
                    : "Pioneer Program"
                  : language === "ms"
                  ? "Bayaran Manual Kod QR"
                  : "Manual QR Payment"}
              </span>
              <h3 className="font-heading text-base font-extrabold text-slate-900">
                {checkoutPlan.name}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-5 text-xs sm:p-6">
          {isFreeTrial ? (
            <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-950">
              <div className="flex items-center justify-between">
                <span className="font-bold">
                  {language === "ms" ? "Jumlah Bayaran:" : "Amount Due:"}
                </span>
                <span className="font-mono-code text-lg font-extrabold text-[#09B474]">
                  RM 0.00 (3 Bulan)
                </span>
              </div>
              <p className="leading-relaxed text-emerald-800">
                {language === "ms"
                  ? "Tiada bayaran dikenakan untuk 3 bulan pertama. Profil anda akan terus disenaraikan di direktori awam serta-merta."
                  : "No payment is required for the first 3 months. Your profile will be listed in the public directory immediately."}
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="font-bold text-slate-600">
                  {language === "ms" ? "Jumlah Perlu Dibayar" : "Total Amount"}
                </span>
                <span className="font-mono-code text-lg font-extrabold text-slate-900">
                  RM {checkoutPlan.priceRM}.00
                </span>
              </div>

              {/* Simulated DuitNow QR Box */}
              <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-[#0170B9]/40 bg-slate-50 p-5 text-center">
                <div className="flex h-40 w-40 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
                  <QrCode className="h-28 w-28 text-slate-900" />
                  <span className="mt-1 text-[9px] font-extrabold uppercase tracking-wider text-rose-600">
                    DuitNow QR • Urusetia Direktori
                  </span>
                </div>
                <p className="mt-3 font-bold text-slate-800">
                  {language === "ms"
                    ? "Langkah 1: Imbas Kod QR di atas untuk bayaran"
                    : "Step 1: Scan the QR Code above to transfer"}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {language === "ms"
                    ? "Langkah 2: Masukkan No. Rujukan resit & tekan butang WhatsApp di bawah untuk hantar bukti transaksi kepada Urusetia."
                    : "Step 2: Enter your receipt reference number & click the WhatsApp button below to send proof to Directory Admin."}
                </p>
              </div>

              <div>
                <label className="mb-1 block font-bold text-slate-700">
                  {language === "ms"
                    ? "No. Rujukan Resit / Transaksi Bank"
                    : "Bank Receipt / Reference Number"}
                </label>
                <input
                  required
                  type="text"
                  placeholder={
                    language === "ms"
                      ? "cth: DN202611119821"
                      : "e.g. DN202611119821"
                  }
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono-code text-sm focus:border-[#0170B9] focus:bg-white focus:outline-none"
                />
              </div>

              <p className="rounded-lg bg-slate-100 px-3 py-2 text-[11px] text-slate-500">
                *{" "}
                {language === "ms"
                  ? "Nota: Pembayaran automatik melalui gerbang Billplz akan diaktifkan selepas pendaftaran akaun rasmi."
                  : "Note: Automated Billplz payment gateway will be enabled upon official account setup."}
              </p>
            </>
          )}

          <div className="flex flex-col gap-2 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 font-bold text-slate-600 hover:bg-slate-50"
            >
              {language === "ms" ? "Batal" : "Cancel"}
            </button>

            <button
              type="submit"
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 font-bold text-white shadow-xs transition ${
                isFreeTrial
                  ? "bg-[#09B474] hover:bg-[#079660]"
                  : "bg-[#1FAF54] hover:bg-[#189344]"
              }`}
            >
              {isFreeTrial ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    {language === "ms"
                      ? "Aktifkan Percubaan Percuma 3 Bulan"
                      : "Activate 3-Month Free Trial"}
                  </span>
                </>
              ) : (
                <>
                  <MessageCircle className="h-4 w-4" />
                  <span>
                    {language === "ms"
                      ? "Hantar Bukti Transaksi (WhatsApp)"
                      : "Send Payment Proof (WhatsApp)"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

