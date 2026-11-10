// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validateRegisterInput } from "@/backend/validators/auth.validator";
import { AuthService } from "@/backend/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateRegisterInput(body);

    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    const result = AuthService.registerTrainee(validation.data);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json(
      {
        message: "Trainee registered successfully",
        data: result.trainee,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/auth/register]:", error);
    return NextResponse.json(
      { error: "Internal server error during registration" },
      { status: 500 }
    );
  }
}

