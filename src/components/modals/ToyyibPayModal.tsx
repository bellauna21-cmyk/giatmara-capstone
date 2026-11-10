// src/components/modals/ToyyibPayModal.tsx
"use client";

import React, { useState } from "react";
import { CreditCard, ShieldCheck, X } from "lucide-react";
import { PlanTier } from "@/lib/giatmara-data";

const MALAYSIAN_BANKS = [
  "Maybank2u",
  "CIMB Clicks",
  "Bank Islam",
  "RHB Now",
  "Public Bank",
  "Hong Leong Connect",
  "AmOnline",
  "Bank Rakyat",
];

interface ToyyibPayModalProps {
  checkoutPlan: {
    tier: PlanTier;
    name: string;
    priceRM: number;
  } | null;
  onClose: () => void;
  onSuccess: (
    tier: PlanTier,
    name: string,
    priceRM: number,
    bank: string
  ) => void;
}

export function ToyyibPayModal({
  checkoutPlan,
  onClose,
  onSuccess,
}: ToyyibPayModalProps) {
  const [selectedBank, setSelectedBank] = useState(MALAYSIAN_BANKS[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!checkoutPlan) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(
        checkoutPlan.tier,
        checkoutPlan.name,
        checkoutPlan.priceRM,
        selectedBank
      );
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Clean Modern Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0170B9]/10 text-[#0170B9]">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <span className="font-mono-code block text-[10px] font-bold uppercase tracking-wider text-[#0170B9]">
                ToyyibPay • FPX Online Banking
              </span>
              <h3 className="font-heading text-base font-extrabold text-slate-900">
                Activate Directory Subscription
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

        <div className="space-y-5 p-6">
          <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50 p-4">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Selected Plan
              </span>
              <span className="font-heading text-base font-extrabold text-slate-900">
                {checkoutPlan.name} (30 Days)
              </span>
            </div>
            <span className="font-mono-code text-xl font-extrabold text-[#0170B9]">
              RM {checkoutPlan.priceRM}.00
            </span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Select FPX Bank
            </label>
            <div className="grid grid-cols-2 gap-2">
              {MALAYSIAN_BANKS.map((bank) => (
                <button
                  key={bank}
                  type="button"
                  onClick={() => setSelectedBank(bank)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition ${
                    selectedBank === bank
                      ? "border-[#0170B9] bg-[#0170B9] text-white shadow-xs"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {bank}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1FAF54] py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#189344] disabled:opacity-50"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>
              {isProcessing
                ? "Authorizing FPX Transfer..."
                : `Pay RM ${checkoutPlan.priceRM}.00 via ${selectedBank}`}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
