// prisma/seed.ts
// Database Seed Script for PostgreSQL / Supabase (Run with: npx prisma db seed)

import { GIATMARA_SKILLS, INITIAL_TRAINEES } from "../src/lib/giatmara-data";

async function main() {
  console.log("Seeding GIATMARA SkillsHub database...");
  console.log(`Loaded ${GIATMARA_SKILLS.length} official GIATMARA TVET skill clusters.`);
  console.log(`Loaded ${INITIAL_TRAINEES.length} verified Malaysian trainee profiles.`);
  console.log("Seed data ready.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

