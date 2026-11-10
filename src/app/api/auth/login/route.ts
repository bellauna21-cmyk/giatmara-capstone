// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/backend/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const result = AuthService.login(email);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({
      message: "Authenticated successfully",
      role: result.role,
      trainee: result.trainee ?? null,
    });
  } catch (error) {
    console.error("[POST /api/auth/login]:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

