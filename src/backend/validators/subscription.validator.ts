// src/backend/validators/subscription.validator.ts
import { PlanTier } from "@/lib/giatmara-data";

export interface CheckoutRequestInput {
  traineeId: string;
  planTier: PlanTier;
  bankName?: string;
}

export function validateCheckoutInput(body: Record<string, unknown>): {
  valid: boolean;
  error?: string;
  data?: CheckoutRequestInput;
} {
  const traineeId = String(body.traineeId || "").trim();
  const planTier = String(body.planTier || "").toUpperCase() as PlanTier;
  const bankName = body.bankName ? String(body.bankName).trim() : "Maybank2u";

  if (!traineeId) {
    return { valid: false, error: "traineeId is required." };
  }

  if (!["BASIC", "PRO", "PREMIUM"].includes(planTier)) {
    return { valid: false, error: "Invalid subscription tier. Choose BASIC, PRO, or PREMIUM." };
  }

  return {
    valid: true,
    data: { traineeId, planTier, bankName },
  };
}

