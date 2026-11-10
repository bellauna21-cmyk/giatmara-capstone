// src/backend/validators/trainee.validator.ts
import { AvailabilityStatus, PlanTier } from "@/lib/giatmara-data";

export interface TraineeSearchParams {
  query: string;
  skill: string;
  state: string;
  city: string;
  onlyAvailable: boolean;
  onlyEmergency: boolean;
}

export function parseTraineeSearchParams(searchParams: URLSearchParams): TraineeSearchParams {
  return {
    query: (searchParams.get("q") || "").trim(),
    skill: (searchParams.get("skill") || "ALL").trim(),
    state: (searchParams.get("state") || "ALL").trim(),
    city: (searchParams.get("city") || "").trim(),
    onlyAvailable: searchParams.get("available") === "true",
    onlyEmergency: searchParams.get("emergency") === "true",
  };
}

export function validateProfileUpdate(body: Record<string, unknown>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (body.availability) {
    const validStatuses: AvailabilityStatus[] = ["AVAILABLE", "BUSY", "UNAVAILABLE"];
    if (!validStatuses.includes(body.availability as AvailabilityStatus)) {
      errors.push("Invalid availability status.");
    }
  }

  if (body.planTier) {
    const validTiers: PlanTier[] = ["BASIC", "PRO", "PREMIUM"];
    if (!validTiers.includes(body.planTier as PlanTier)) {
      errors.push("Invalid subscription plan tier.");
    }
  }

  if (body.startingRateRM !== undefined && Number(body.startingRateRM) < 0) {
    errors.push("Starting rate (RM) cannot be negative.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

