// src/app/api/subscriptions/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validateCheckoutInput } from "@/backend/validators/subscription.validator";
import { SubscriptionService } from "@/backend/services/subscription.service";

export async function GET() {
  try {
    const transactions = SubscriptionService.getAllTransactions();
    return NextResponse.json({
      data: transactions,
      total: transactions.length,
    });
  } catch (error) {
    console.error("[GET /api/subscriptions/checkout]:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription ledger" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateCheckoutInput(body);

    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const result = await SubscriptionService.createCheckoutSession(
      validation.data.traineeId,
      validation.data.planTier,
      validation.data.bankName
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }

    return NextResponse.json({
      message: "Subscription checkout completed",
      transaction: result.transaction,
      paymentUrl: result.paymentUrl,
      mode: result.mode,
    });
  } catch (error) {
    console.error("[POST /api/subscriptions/checkout]:", error);
    return NextResponse.json(
      { error: "Subscription checkout failed" },
      { status: 500 }
    );
  }
}

