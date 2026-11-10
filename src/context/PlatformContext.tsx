// src/context/PlatformContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  GIATMARA_SKILLS,
  INITIAL_TRAINEES,
  TraineeListing,
  GiatmaraSkill,
} from "@/lib/giatmara-data";

interface PlatformContextType {
  trainees: TraineeListing[];
  skillsList: GiatmaraSkill[];
  currentTrainee: TraineeListing;
  currentTraineeId: string;
  setCurrentTraineeId: (id: string) => void;
  updateTrainee: (id: string, updates: Partial<TraineeListing>) => void;
  registerTrainee: (newTrainee: Omit<TraineeListing, "id">) => TraineeListing;
  deleteTrainee: (id: string) => void;
  addSkill: (name: string, cluster: string) => void;
  deleteSkill: (id: string) => void;
  resetDemoData: () => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TRAINEES: "giatmara_skillshub_trainees_v1",
  SKILLS: "giatmara_skillshub_skills_v1",
  CURRENT_TRAINEE_ID: "giatmara_skillshub_current_id_v1",
};

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [trainees, setTrainees] = useState<TraineeListing[]>(INITIAL_TRAINEES);
  const [skillsList, setSkillsList] = useState<GiatmaraSkill[]>(GIATMARA_SKILLS);
  const [currentTraineeId, setCurrentTraineeId] = useState<string>("tr-101");
  const [hydrated, setHydrated] = useState(false);

  // Load saved state from localStorage / Backend API on client mount
  useEffect(() => {
    try {
      const savedTrainees = localStorage.getItem(STORAGE_KEYS.TRAINEES);
      const savedSkills = localStorage.getItem(STORAGE_KEYS.SKILLS);
      const savedCurrentId = localStorage.getItem(STORAGE_KEYS.CURRENT_TRAINEE_ID);

      if (savedTrainees) setTrainees(JSON.parse(savedTrainees));
      if (savedSkills) setSkillsList(JSON.parse(savedSkills));
      if (savedCurrentId) setCurrentTraineeId(savedCurrentId);
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist changes to localStorage
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEYS.TRAINEES, JSON.stringify(trainees));
  }, [trainees, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skillsList));
  }, [skillsList, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEYS.CURRENT_TRAINEE_ID, currentTraineeId);
  }, [currentTraineeId, hydrated]);

  const currentTrainee =
    trainees.find((t) => t.id === currentTraineeId) || trainees[0];

  const updateTrainee = (id: string, updates: Partial<TraineeListing>) => {
    setTrainees((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    // Sync asynchronously with backend API
    fetch(`/api/trainees/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }).catch(() => {});
  };

  const registerTrainee = (newTraineeData: Omit<TraineeListing, "id">) => {
    const created: TraineeListing = {
      ...newTraineeData,
      id: `tr-${Date.now()}`,
    };
    setTrainees((prev) => [created, ...prev]);
    setCurrentTraineeId(created.id);

    // Sync asynchronously with backend API
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: created.name,
        email: created.email,
        phone: created.phone,
        state: created.state,
        city: created.city,
        giatmaraCenter: created.giatmaraCenter,
        studentId: created.studentId,
        headline: created.headline,
        skillSlug: created.skills[0] || "electrical-wiring",
      }),
    }).catch(() => {});

    return created;
  };

  const deleteTrainee = (id: string) => {
    setTrainees((prev) => prev.filter((t) => t.id !== id));
    fetch(`/api/trainees/${id}`, { method: "DELETE" }).catch(() => {});
  };

  const addSkill = (name: string, cluster: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const createdSkill: GiatmaraSkill = {
      id: `sk-${Date.now()}`,
      name: name.trim(),
      malayName: name.trim(),
      cluster: cluster.trim(),
      slug,
    };
    setSkillsList((prev) => [...prev, createdSkill]);

    fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, cluster }),
    }).catch(() => {});
  };

  const deleteSkill = (id: string) => {
    setSkillsList((prev) => prev.filter((s) => s.id !== id));
    fetch(`/api/skills?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    }).catch(() => {});
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.TRAINEES);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_TRAINEE_ID);
    setTrainees(INITIAL_TRAINEES);
    setSkillsList(GIATMARA_SKILLS);
    setCurrentTraineeId("tr-101");
  };

  return (
    <PlatformContext.Provider
      value={{
        trainees,
        skillsList,
        currentTrainee,
        currentTraineeId,
        setCurrentTraineeId,
        updateTrainee,
        registerTrainee,
        deleteTrainee,
        addSkill,
        deleteSkill,
        resetDemoData,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) {
    throw new Error("usePlatform must be used within a PlatformProvider");
  }
  return ctx;
}
