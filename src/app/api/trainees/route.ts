// src/app/api/trainees/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseTraineeSearchParams } from "@/backend/validators/trainee.validator";
import { TraineeService } from "@/backend/services/trainee.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeUnlisted = searchParams.get("admin") === "true";

    if (includeUnlisted) {
      const all = TraineeService.getAllTraineesForAdmin();
      return NextResponse.json({ data: all, total: all.length });
    }

    const filters = parseTraineeSearchParams(searchParams);
    const results = TraineeService.searchPublicTrainees(filters);

    return NextResponse.json({
      data: results,
      total: results.length,
      filters,
    });
  } catch (error) {
    console.error("[GET /api/trainees]:", error);
    return NextResponse.json(
      { error: "Failed to fetch trainees" },
      { status: 500 }
    );
  }
}

