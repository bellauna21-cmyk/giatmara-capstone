// src/backend/services/trainee.service.ts
// Trainee Search, Filtering, Self-Update & Admin CRUD Business Logic

import { ServerStore } from "./store";
import { TraineeSearchParams } from "../validators/trainee.validator";
import { TraineeListing, PlanTier } from "@/lib/giatmara-data";

const TIER_PRIORITY: Record<PlanTier, number> = {
  PREMIUM: 4,
  PRO: 3,
  BASIC: 2,
  TRIAL: 1,
};

export const TraineeService = {
  /**
   * Public directory search with multi-criteria filtering & subscription tier ranking
   */
  searchPublicTrainees(params: TraineeSearchParams): TraineeListing[] {
    const trainees = ServerStore.getTrainees();

    return trainees
      .filter((t) => {
        if (!t.isPubliclyListed) return false;
        if (params.state !== "ALL" && t.state !== params.state) return false;
        if (params.skill !== "ALL" && !t.skills.includes(params.skill)) return false;
        if (params.onlyAvailable && t.availability !== "AVAILABLE") return false;
        if (params.onlyEmergency && !t.emergencyAvailable) return false;

        if (params.city) {
          const matchCity = t.city.toLowerCase().includes(params.city.toLowerCase());
          if (!matchCity) return false;
        }

        if (params.query) {
          const q = params.query.toLowerCase();
          return (
            t.name.toLowerCase().includes(q) ||
            t.headline.toLowerCase().includes(q) ||
            t.city.toLowerCase().includes(q) ||
            t.giatmaraCenter.toLowerCase().includes(q)
          );
        }

        return true;
      })
      .sort((a, b) => TIER_PRIORITY[b.planTier] - TIER_PRIORITY[a.planTier]);
  },

  /**
   * Get all trainees (including unlisted) for Admin Console
   */
  getAllTraineesForAdmin(): TraineeListing[] {
    return ServerStore.getTrainees();
  },

  /**
   * Get single trainee by ID
   */
  getTraineeById(id: string): TraineeListing | null {
    return ServerStore.getTrainees().find((t) => t.id === id) || null;
  },

  /**
   * Update trainee profile, availability, skills, or admin flags
   */
  updateTrainee(
    id: string,
    updates: Partial<TraineeListing>
  ): TraineeListing | null {
    const trainees = ServerStore.getTrainees();
    const index = trainees.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const updated: TraineeListing = {
      ...trainees[index],
      ...updates,
      id, // Prevent ID overwrite
    };

    const nextList = [...trainees];
    nextList[index] = updated;
    ServerStore.setTrainees(nextList);

    return updated;
  },

  /**
   * Permanently delete a trainee profile (Admin only)
   */
  deleteTrainee(id: string): boolean {
    const trainees = ServerStore.getTrainees();
    const filtered = trainees.filter((t) => t.id !== id);
    if (filtered.length === trainees.length) return false;

    ServerStore.setTrainees(filtered);
    return true;
  },
};

