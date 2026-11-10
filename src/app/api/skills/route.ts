// src/app/api/skills/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SkillService } from "@/backend/services/skill.service";

export async function GET() {
  try {
    const skills = SkillService.getAllSkills();
    return NextResponse.json({ data: skills, total: skills.length });
  } catch (error) {
    console.error("[GET /api/skills]:", error);
    return NextResponse.json(
      { error: "Failed to fetch GIATMARA skills" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const cluster = String(body.cluster || "Kemahiran Teknikal").trim();

    if (!name) {
      return NextResponse.json(
        { error: "Skill name is required" },
        { status: 400 }
      );
    }

    const created = SkillService.createSkill(name, cluster);
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/skills]:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Skill id query parameter is required" },
        { status: 400 }
      );
    }

    const removed = SkillService.deleteSkill(id);
    if (!removed) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Skill deleted" });
  } catch (error) {
    console.error("[DELETE /api/skills]:", error);
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    );
  }
}

