// src/backend/services/skill.service.ts
// Official GIATMARA TVET Skill Catalog Management

import { ServerStore } from "./store";
import { GiatmaraSkill } from "@/lib/giatmara-data";

export const SkillService = {
  getAllSkills(): GiatmaraSkill[] {
    return ServerStore.getSkills();
  },

  createSkill(name: string, cluster: string): GiatmaraSkill {
    const skills = ServerStore.getSkills();
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newSkill: GiatmaraSkill = {
      id: `sk-${Date.now()}`,
      name: name.trim(),
      malayName: name.trim(),
      cluster: cluster.trim() || "Kemahiran Teknikal",
      slug,
    };

    ServerStore.setSkills([...skills, newSkill]);
    return newSkill;
  },

  deleteSkill(id: string): boolean {
    const skills = ServerStore.getSkills();
    const filtered = skills.filter((s) => s.id !== id);
    if (filtered.length === skills.length) return false;

    ServerStore.setSkills(filtered);
    return true;
  },
};

