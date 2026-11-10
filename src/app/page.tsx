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
import { ToyyibPayModal } from "@/components/modals/ToyyibPayModal";

export default function GiatmaraSkillDirectoryApp() {
  const {
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

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA] text-[#2C333A]">
      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 rounded-lg border border-[#0170B9] bg-[#003459] px-4 py-3 text-xs font-bold text-white shadow-xl">
          {toastMessage}
        </div>
      )}

      {/* Official GIATMARA Two-Tier Header */}
      <Navbar
        activePortal={activePortal}
        setActivePortal={setActivePortal}
        onOpenRegister={() => setShowRegisterModal(true)}
        onOpenLogin={() => setShowLoginModal(true)}
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

        {/* Portal 2: Trainee Studio */}
        {activePortal === "TRAINEE" && (
          <TraineeStudio
            trainees={trainees}
            activeTraineeId={currentTraineeId}
            setActiveTraineeId={setCurrentTraineeId}
            onUpdateTrainee={updateTrainee}
            onPreviewProfile={setSelectedTrainee}
            onOpenPaymentModal={(tier) => {
              const planObj = SUBSCRIPTION_TIERS.find((p) => p.tier === tier);
              if (planObj) {
                setCheckoutPlan({
                  tier: planObj.tier,
                  name: planObj.name,
                  priceRM: planObj.priceRM,
                });
              }
            }}
          />
        )}

        {/* Portal 3: Administrator Console */}
        {activePortal === "ADMIN" && (
          <AdminConsole
            trainees={trainees}
            skillsCatalog={skillsList}
            onVerifyToggle={(id) => {
              const target = trainees.find((t) => t.id === id);
              if (target) {
                updateTrainee(id, { isVerified: !target.isVerified });
                triggerToast(`Status pengesahan matriks dikemas kini.`);
              }
            }}
            onListingToggle={(id) => {
              const target = trainees.find((t) => t.id === id);
              if (target) {
                updateTrainee(id, {
                  isPubliclyListed: !target.isPubliclyListed,
                });
                triggerToast(`Status siaran direktori dikemas kini.`);
              }
            }}
            onDeleteTrainee={(id) => {
              deleteTrainee(id);
              triggerToast(`Rekod pelatih telah dipadamkan.`);
            }}
            onUpdateTrainee={(id, updates) => {
              updateTrainee(id, updates);
              triggerToast(`Maklumat pelatih telah disimpan.`);
            }}
            onAddSkill={(name, cluster) => {
              addSkill(name, cluster);
              triggerToast(`Kemahiran baharu "${name}" ditambah.`);
            }}
            onDeleteSkill={(id) => {
              deleteSkill(id);
              triggerToast(`Kemahiran telah dikeluarkan daripada katalog.`);
            }}
            onResetDemoData={() => {
              resetDemoData();
              triggerToast(`Data asal GIATMARA telah dipulihkan.`);
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
            triggerToast("Log masuk berjaya: Urusetia Pentadbir GIATMARA.");
          } else {
            setActivePortal("TRAINEE");
            triggerToast(
              `Selamat kembali, ${traineeName || "Pelatih GIATMARA"}.`
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
            "Pendaftaran pelatih berjaya! Pilih pelan ToyyibPay FPX untuk mengaktifkan siaran awam."
          );
        }}
      />

      <ToyyibPayModal
        checkoutPlan={checkoutPlan}
        onClose={() => setCheckoutPlan(null)}
        onSuccess={(tier, name, priceRM, bank) => {
          if (currentTrainee) {
            updateTrainee(currentTrainee.id, {
              planTier: tier,
              isPubliclyListed: true,
            });
          }
          setCheckoutPlan(null);
          triggerToast(
            `Bayaran FPX (RM ${priceRM}.00 melalui ${bank}) berjaya! Pelan ${name} telah diaktifkan.`
          );
        }}
      />

      {/* Official GIATMARA Footer */}
      <Footer />
    </div>
  );
}
