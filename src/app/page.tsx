"use client";

import React, { useState } from "react";
import {
  TraineeListing,
  PlanTier,
  SUBSCRIPTION_TIERS,
} from "@/lib/giatmara-data";
import { usePlatform } from "@/context/PlatformContext";
import { Navbar, PortalMode } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientDirectory } from "@/components/directory/ClientDirectory";
import { TraineeStudio } from "@/components/trainee/TraineeStudio";
import { AdminConsole } from "@/components/admin/AdminConsole";
import { TraineeDetailModal } from "@/components/modals/TraineeDetailModal";
import { RegisterTraineeModal } from "@/components/modals/RegisterTraineeModal";
import { LoginModal } from "@/components/modals/LoginModal";
import { ManualQrPaymentModal } from "@/components/modals/ManualQrPaymentModal";

export default function GiatmaraSkillDirectoryApp() {
  const {
    language,
    logout,
    trainees,
    skillsList,
    currentTrainee,
    currentTraineeId,
    setCurrentTraineeId,
    updateTrainee,
    deleteTrainee,
    addSkill,
    deleteSkill,
    resetDemoData,
  } = usePlatform();

  // Top-level Navigation State
  const [activePortal, setActivePortal] = useState<PortalMode>("CLIENT");

  // Modal States
  const [selectedTrainee, setSelectedTrainee] = useState<TraineeListing | null>(
    null
  );
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<{
    tier: PlanTier;
    name: string;
    priceRM: number;
  } | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogout = () => {
    logout();
    setActivePortal("CLIENT");
    triggerToast(
      language === "ms"
        ? "Anda telah berjaya log keluar."
        : "You have been logged out."
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFC] text-slate-900">
      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed right-4 bottom-20 z-50 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white shadow-xl md:bottom-5">
          {toastMessage}
        </div>
      )}

      {/* Header + Mobile Bottom Navigation */}
      <Navbar
        activePortal={activePortal}
        setActivePortal={setActivePortal}
        onOpenRegister={() => setShowRegisterModal(true)}
        onOpenLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Portal 1: Public Client Search & Directory */}
        {activePortal === "CLIENT" && (
          <ClientDirectory
            trainees={trainees}
            onSelectTrainee={setSelectedTrainee}
          />
        )}

        {/* Portal 2: Skilled Specialist Panel */}
        {activePortal === "TRAINEE" && (
          <TraineeStudio
            trainees={trainees}
            activeTraineeId={currentTraineeId}
            setActiveTraineeId={setCurrentTraineeId}
            onUpdateTrainee={updateTrainee}
            onPreviewProfile={setSelectedTrainee}
            onLogout={handleLogout}
            onDeleteAccount={(id) => {
              deleteTrainee(id);
              logout();
              setActivePortal("CLIENT");
              triggerToast(
                language === "ms"
                  ? "Akaun pakar anda telah dipadamkan."
                  : "Your specialist account has been deleted."
              );
            }}
            onOpenPaymentModal={(tier) => {
              const planObj = SUBSCRIPTION_TIERS.find((p) => p.tier === tier);
              if (planObj) {
                setCheckoutPlan({
                  tier: planObj.tier,
                  name: language === "ms" ? planObj.name : planObj.nameEn,
                  priceRM: planObj.priceRM,
                });
              }
            }}
          />
        )}

        {/* Portal 3: Directory Management (Urusetia Direktori) */}
        {activePortal === "ADMIN" && (
          <AdminConsole
            trainees={trainees}
            skillsCatalog={skillsList}
            onLogout={handleLogout}
            onVerifyToggle={(id) => {
              const target = trainees.find((t) => t.id === id);
              if (target) {
                updateTrainee(id, { isVerified: !target.isVerified });
                triggerToast(
                  language === "ms"
                    ? "Status pengesahan pakar dikemas kini."
                    : "Specialist verification status updated."
                );
              }
            }}
            onListingToggle={(id) => {
              const target = trainees.find((t) => t.id === id);
              if (target) {
                const nextActive = !(
                  target.isPubliclyListed && target.isAccountActive !== false
                );
                updateTrainee(id, {
                  isPubliclyListed: nextActive,
                  isAccountActive: nextActive,
                });
                triggerToast(
                  language === "ms"
                    ? "Status aktif akaun dikemas kini."
                    : "Account active status updated."
                );
              }
            }}
            onDeleteTrainee={(id) => {
              deleteTrainee(id);
              triggerToast(
                language === "ms"
                  ? "Rekod pakar telah dipadamkan."
                  : "Specialist record deleted."
              );
            }}
            onUpdateTrainee={(id, updates) => {
              updateTrainee(id, updates);
              triggerToast(
                language === "ms"
                  ? "Maklumat pakar telah disimpan."
                  : "Specialist details saved."
              );
            }}
            onAddSkill={(name, cluster) => {
              addSkill(name, cluster);
              triggerToast(
                language === "ms"
                  ? `Kategori kemahiran "${name}" ditambah.`
                  : `Skill category "${name}" added.`
              );
            }}
            onDeleteSkill={(id) => {
              deleteSkill(id);
              triggerToast(
                language === "ms"
                  ? "Kategori kemahiran telah dikeluarkan."
                  : "Skill category removed."
              );
            }}
            onResetDemoData={() => {
              resetDemoData();
              triggerToast(
                language === "ms"
                  ? "Data asal direktori telah dipulihkan."
                  : "Default directory dataset restored."
              );
            }}
          />
        )}
      </main>

      {/* Modals */}
      <TraineeDetailModal
        trainee={selectedTrainee}
        onClose={() => setSelectedTrainee(null)}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => setShowRegisterModal(true)}
        onLoginSuccess={(role, traineeName) => {
          if (role === "ADMIN") {
            setActivePortal("ADMIN");
            triggerToast(
              language === "ms"
                ? "Log masuk berjaya: Urusetia Direktori."
                : "Signed in: Directory Management."
            );
          } else {
            setActivePortal("TRAINEE");
            triggerToast(
              language === "ms"
                ? `Selamat kembali, ${traineeName || "Pakar Kemahiran"}.`
                : `Welcome back, ${traineeName || "Skilled Specialist"}.`
            );
          }
        }}
      />

      <RegisterTraineeModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegistered={() => {
          setShowRegisterModal(false);
          setActivePortal("TRAINEE");
          triggerToast(
            language === "ms"
              ? "Pendaftaran berjaya! Percubaan Percuma 3 Bulan anda kini aktif."
              : "Registration successful! Your 3-Month Free Trial is now active."
          );
        }}
      />

      <ManualQrPaymentModal
        checkoutPlan={checkoutPlan}
        expertName={currentTrainee?.name || "Pakar Kemahiran"}
        onClose={() => setCheckoutPlan(null)}
        onSuccess={(tier, name, priceRM, refCode) => {
          if (currentTrainee) {
            updateTrainee(currentTrainee.id, {
              planTier: tier,
              isPubliclyListed: true,
              isAccountActive: true,
              paymentProofStatus: tier === "TRIAL" ? "NONE" : "PENDING",
              paymentReference: refCode,
            });
          }
          setCheckoutPlan(null);
          triggerToast(
            tier === "TRIAL"
              ? language === "ms"
                ? "Percubaan Percuma 3 Bulan telah diaktifkan!"
                : "3-Month Free Trial activated!"
              : language === "ms"
              ? `Bukti transaksi QR (${refCode}) dihantar! Pelan ${name} sedang disemak oleh Urusetia.`
              : `QR payment proof (${refCode}) submitted! ${name} is pending verification.`
          );
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
