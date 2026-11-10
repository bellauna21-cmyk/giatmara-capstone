// src/app/api/trainees/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validateProfileUpdate } from "@/backend/validators/trainee.validator";
import { TraineeService } from "@/backend/services/trainee.service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const trainee = TraineeService.getTraineeById(id);

    if (!trainee) {
      return NextResponse.json(
        { error: "Trainee profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: trainee });
  } catch (error) {
    console.error("[GET /api/trainees/[id]]:", error);
    return NextResponse.json(
      { error: "Failed to fetch trainee profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const validation = validateProfileUpdate(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: "Invalid profile update", details: validation.errors },
        { status: 400 }
      );
    }

    const updated = TraineeService.updateTrainee(id, body);
    if (!updated) {
      return NextResponse.json(
        { error: "Trainee profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Trainee profile updated",
      data: updated,
    });
  } catch (error) {
    console.error("[PATCH /api/trainees/[id]]:", error);
    return NextResponse.json(
      { error: "Failed to update trainee profile" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = TraineeService.deleteTrainee(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Trainee profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Trainee profile deleted permanently",
    });
  } catch (error) {
    console.error("[DELETE /api/trainees/[id]]:", error);
    return NextResponse.json(
      { error: "Failed to delete trainee profile" },
      { status: 500 }
    );
  }
}

