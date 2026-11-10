// src/backend/services/subscription.service.ts
// Subscription Plan & ToyyibPay FPX Payment Gateway Integration Logic

import { ServerStore, SubscriptionTransaction } from "./store";
import { TraineeService } from "./trainee.service";
import { SUBSCRIPTION_TIERS, PlanTier } from "@/lib/giatmara-data";

export const SubscriptionService = {
  /**
   * Create a ToyyibPay FPX Bill (or auto-activate in Sandbox/Capstone Demo mode)
   */
  async createCheckoutSession(
    traineeId: string,
    planTier: PlanTier,
    bankName = "Maybank2u"
  ): Promise<{
    success: boolean;
    error?: string;
    transaction?: SubscriptionTransaction;
    paymentUrl?: string;
    mode?: "TOYYIBPAY_LIVE" | "SANDBOX_AUTO_ACTIVATED";
  }> {
    const trainee = TraineeService.getTraineeById(traineeId);
    if (!trainee) {
      return { success: false, error: "Trainee profile not found." };
    }

    const planConfig = SUBSCRIPTION_TIERS.find((p) => p.tier === planTier);
    if (!planConfig) {
      return { success: false, error: "Invalid subscription plan selected." };
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    const billCode = `TP-GM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const transactionRef = `FPX-${Date.now()}`;

    const transaction: SubscriptionTransaction = {
      id: `sub-${Date.now()}`,
      traineeId: trainee.id,
      planTier,
      amountRM: planConfig.priceRM,
      gateway: "TOYYIBPAY_FPX",
      bankName,
      billCode,
      transactionRef,
      status: "ACTIVE",
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    // Save transaction & activate trainee's public directory listing
    ServerStore.addSubscription(transaction);
    TraineeService.updateTrainee(trainee.id, {
      planTier,
      isPubliclyListed: true,
    });

    return {
      success: true,
      transaction,
      paymentUrl: `/dashboard/subscription?status=success&billcode=${billCode}`,
      mode: "SANDBOX_AUTO_ACTIVATED",
    };
  },

  /**
   * List all subscription transactions for Admin Ledger
   */
  getAllTransactions(): SubscriptionTransaction[] {
    return ServerStore.getSubscriptions();
  },
};

