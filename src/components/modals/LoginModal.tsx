// src/components/modals/LoginModal.tsx
"use client";

import React, { useState } from "react";
import { UserCircle2, X, FolderKanban, Wrench } from "lucide-react";
import { usePlatform } from "@/context/PlatformContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: "TRAINEE" | "ADMIN", traineeName?: string) => void;
  onSwitchToRegister: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onSwitchToRegister,
}: LoginModalProps) {
  const { trainees, setCurrentTraineeId, setAuthRole, language } =
    usePlatform();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const normalized = email.trim().toLowerCase();

    try {
      if (
        normalized === "admin@giatmara.edu.my" ||
        normalized === "admin@direktori.my"
      ) {
        setAuthRole("ADMIN");
        onLoginSuccess("ADMIN");
        onClose();
        return;
      }

      const matchedTrainee = trainees.find(
        (t) => t.email.toLowerCase() === normalized
      );

      if (matchedTrainee) {
        setCurrentTraineeId(matchedTrainee.id);
        setAuthRole("TRAINEE");
        onLoginSuccess("TRAINEE", matchedTrainee.name);
        onClose();
        return;
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalized, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(
          language === "ms"
            ? "Emel atau kata laluan tidak sah."
            : "Invalid email or password."
        );
      } else if (data.role === "ADMIN") {
        setAuthRole("ADMIN");
        onLoginSuccess("ADMIN");
        onClose();
      } else if (data.trainee) {
        setCurrentTraineeId(data.trainee.id);
        setAuthRole("TRAINEE");
        onLoginSuccess("TRAINEE", data.trainee.name);
        onClose();
      }
    } catch {
      setError(
        language === "ms"
          ? "Gagal log masuk buat masa ini. Sila cuba lagi."
          : "Unable to sign in right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("pakar2026");
    setError(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Clean High-Contrast Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0170B9]/10 text-[#0170B9]">
              <UserCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-slate-900">
                {language === "ms"
                  ? "Log Masuk Pakar & Direktori"
                  : "Specialist & Directory Sign In"}
              </h3>
              <p className="text-xs font-medium text-slate-500">
                {language === "ms"
                  ? "Akses Panel Pakar Kemahiran & Urusetia Direktori"
                  : "Access Expert Panel & Directory Management"}
              </p>
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

        <div className="space-y-4 p-5 sm:p-6">
          {/* Quick Demo Account Selector */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3.5">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {language === "ms"
                ? "Akaun Demo Pantas (Klik untuk Isi Automatik)"
                : "Quick Demo Accounts (Click to Autofill)"}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials("haziq.pw2@gmail.com")}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-[#0170B9] hover:text-[#0170B9]"
              >
                <Wrench className="h-3.5 w-3.5 text-[#0170B9]" />
                <span>
                  {language === "ms" ? "Demo Pakar" : "Expert Demo"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials("admin@giatmara.edu.my")}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-[#0170B9] hover:text-[#0170B9]"
              >
                <FolderKanban className="h-3.5 w-3.5 text-[#09B474]" />
                <span>
                  {language === "ms" ? "Demo Direktori" : "Directory Admin"}
                </span>
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-600">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
            <div>
              <label className="mb-1 block font-bold text-slate-700">
                {language === "ms"
                  ? "Alamat Emel (Email Address)"
                  : "Email Address"}
              </label>
              <input
                required
                type="email"
                placeholder="haziq.pw2@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#0170B9] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block font-bold text-slate-700">
                {language === "ms"
                  ? "Kata Laluan (Password)"
                  : "Password"}
              </label>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#0170B9] focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#0170B9] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#005a96]"
            >
              {loading
                ? language === "ms"
                  ? "Memproses Log Masuk..."
                  : "Signing in..."
                : language === "ms"
                ? "Log Masuk Sekarang"
                : "Sign In"}
            </button>
          </form>

          <div className="border-t border-slate-100 pt-3 text-center text-xs text-slate-500">
            {language === "ms"
              ? "Pakar kemahiran baharu?"
              : "New skilled specialist?"}{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                onSwitchToRegister();
              }}
              className="font-bold text-[#0170B9] hover:underline"
            >
              {language === "ms"
                ? "Daftar Percubaan Percuma 3 Bulan"
                : "Register 3-Month Free Trial"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
