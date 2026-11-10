// src/backend/services/store.ts
// Server-side in-memory store seeded with official GIATMARA data (acts as fallback DB when PostgreSQL is offline)

import {
  INITIAL_TRAINEES,
  GIATMARA_SKILLS,
  TraineeListing,
  GiatmaraSkill,
  PlanTier,
} from "@/lib/giatmara-data";

export interface SubscriptionTransaction {
  id: string;
  traineeId: string;
  planTier: PlanTier;
  amountRM: number;
  gateway: "TOYYIBPAY_FPX";
  bankName: string;
  billCode: string;
  transactionRef: string;
  status: "ACTIVE" | "PENDING" | "CANCELLED";
  startDate: string;
  endDate: string;
}

const globalStore = globalThis as unknown as {
  traineesStore?: TraineeListing[];
  skillsStore?: GiatmaraSkill[];
  subscriptionsStore?: SubscriptionTransaction[];
};

if (!globalStore.traineesStore) {
  globalStore.traineesStore = [...INITIAL_TRAINEES];
}

if (!globalStore.skillsStore) {
  globalStore.skillsStore = [...GIATMARA_SKILLS];
}

if (!globalStore.subscriptionsStore) {
  globalStore.subscriptionsStore = [];
}

export const ServerStore = {
  getTrainees: () => globalStore.traineesStore!,
  setTrainees: (list: TraineeListing[]) => {
    globalStore.traineesStore = list;
  },
  getSkills: () => globalStore.skillsStore!,
  setSkills: (list: GiatmaraSkill[]) => {
    globalStore.skillsStore = list;
  },
  getSubscriptions: () => globalStore.subscriptionsStore!,
  addSubscription: (sub: SubscriptionTransaction) => {
    globalStore.subscriptionsStore!.unshift(sub);
  },
};

