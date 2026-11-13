// src/backend/services/auth.service.ts
// Authentication & Trainee Onboarding Business Logic

import { ServerStore } from "./store";
import { RegisterTraineeInput } from "../validators/auth.validator";
import { TraineeListing } from "@/lib/giatmara-data";

export const AuthService = {
  registerTrainee(input: RegisterTraineeInput): {
    success: boolean;
    error?: string;
    trainee?: TraineeListing;
  } {
    const trainees = ServerStore.getTrainees();
    const existing = trainees.find(
      (t) => t.email.toLowerCase() === input.email.toLowerCase()
    );

    if (existing) {
      return {
        success: false,
        error: "An account with this email address is already registered.",
      };
    }

    const newTrainee: TraineeListing = {
      id: `tr-${Date.now()}`,
      name: input.name,
      email: input.email,
      headline: input.headline,
      bio: `Pakar kemahiran menyediakan perkhidmatan teknikal di ${input.city}, ${input.state}.`,
      phone: input.phone,
      whatsapp: input.phone.replace(/[^0-9]/g, ""),
      state: input.state,
      district: input.city,
      city: input.city,
      giatmaraCenter: input.giatmaraCenter,
      graduationYear: new Date().getFullYear(),
      experienceYears: 3,
      studentId: input.studentId,
      certifications: ["Sijil Kemahiran TVET"],
      portfolio: [],
      isVerified: false,
      isPubliclyListed: true,
      isAccountActive: true,
      planTier: "TRIAL",
      trialEndsAt: "2027-02-11",
      paymentProofStatus: "NONE",
      availability: "AVAILABLE",
      availableDays: ["Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"],
      startTime: "09:00 PG",
      endTime: "06:00 PTG",
      workingHours: "Isnin - Sabtu • 09:00 PG - 06:00 PTG",
      emergencyAvailable: false,
      startingRateRM: 50,
      skills: [input.skillSlug],
      rating: 5.0,
      completedJobs: 0,
    };

    ServerStore.setTrainees([newTrainee, ...trainees]);

    return {
      success: true,
      trainee: newTrainee,
    };
  },

  login(email: string): {
    success: boolean;
    role?: "TRAINEE" | "ADMIN";
    trainee?: TraineeListing;
    error?: string;
  } {
    const normalized = email.trim().toLowerCase();

    if (normalized === "admin@giatmara.edu.my") {
      return {
        success: true,
        role: "ADMIN",
      };
    }

    const trainee = ServerStore.getTrainees().find(
      (t) => t.email.toLowerCase() === normalized
    );

    if (!trainee) {
      return {
        success: false,
        error: "No registered trainee found with that email address.",
      };
    }

    return {
      success: true,
      role: "TRAINEE",
      trainee,
    };
  },
};

