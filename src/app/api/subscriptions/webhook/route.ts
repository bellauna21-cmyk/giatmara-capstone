// src/app/api/subscriptions/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { TraineeService } from "@/backend/services/trainee.service";
import { PlanTier } from "@/lib/giatmara-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { traineeId, statusId, planTier } = body;

    if (!traineeId) {
      return NextResponse.json(
        { error: "Missing traineeId in webhook payload" },
        { status: 400 }
      );
    }

    // ToyyibPay status_id "1" = Successful FPX transaction
    if (String(statusId) === "1") {
      const updated = TraineeService.updateTrainee(traineeId, {
        isPubliclyListed: true,
        ...(planTier && { planTier: planTier as PlanTier }),
      });

      return NextResponse.json({
        received: true,
        status: "ACTIVATED",
        trainee: updated,
      });
    }

    return NextResponse.json({
      received: true,
      status: "IGNORED_OR_FAILED",
    });
  } catch (error) {
    console.error("[POST /api/subscriptions/webhook]:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

