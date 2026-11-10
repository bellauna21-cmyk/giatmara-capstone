// src/components/modals/LoginModal.tsx
"use client";

import React, { useState } from "react";
import { UserCircle2, X, ShieldCheck, Wrench } from "lucide-react";
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
  const { trainees, setCurrentTraineeId } = usePlatform();
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
      if (normalized === "admin@giatmara.edu.my") {
        onLoginSuccess("ADMIN");
        onClose();
        return;
      }

      const matchedTrainee = trainees.find(
        (t) => t.email.toLowerCase() === normalized
      );

      if (matchedTrainee) {
        setCurrentTraineeId(matchedTrainee.id);
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
        setError(data.error || "Invalid email or password.");
      } else if (data.role === "ADMIN") {
        onLoginSuccess("ADMIN");
        onClose();
      } else if (data.trainee) {
        setCurrentTraineeId(data.trainee.id);
        onLoginSuccess("TRAINEE", data.trainee.name);
        onClose();
      }
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("giatmara2026");
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
        {/* Clean Modern Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0170B9]/10 text-[#0170B9]">
              <UserCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-slate-900">
                Log Masuk Warga GIATMARA
              </h3>
              <p className="text-xs font-medium text-slate-500">
                Akses Studio Pelatih Usahawan &amp; Urusetia Admin
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

        <div className="space-y-4 p-6">
          {/* Quick Demo Account Selector */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3.5">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Akaun Demo Pantas (Klik untuk Isi Automatik)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials("haziq.pw2@gmail.com")}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-[#0170B9] hover:text-[#0170B9]"
              >
                <Wrench className="h-3.5 w-3.5 text-[#0170B9]" />
                <span>Demo Pelatih</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials("admin@giatmara.edu.my")}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-[#0170B9] hover:text-[#0170B9]"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#09B474]" />
                <span>Demo Admin</span>
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
                Alamat Emel (Email Address)
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
                Kata Laluan (Password)
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
              {loading ? "Memproses Log Masuk..." : "Log Masuk"}
            </button>
          </form>

          <div className="border-t border-slate-100 pt-3 text-center text-xs text-slate-500">
            Pelatih baharu GIATMARA?{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                onSwitchToRegister();
              }}
              className="font-bold text-[#0170B9] hover:underline"
            >
              Daftar profil anda di sini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
