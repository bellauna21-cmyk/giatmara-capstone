// src/backend/validators/auth.validator.ts

export interface RegisterTraineeInput {
  name: string;
  email: string;
  password?: string;
  phone: string;
  state: string;
  city: string;
  giatmaraCenter: string;
  studentId: string;
  headline: string;
  skillSlug: string;
}

export interface LoginInput {
  email: string;
  password?: string;
}

export function validateRegisterInput(body: Record<string, unknown>): {
  valid: boolean;
  errors: string[];
  data?: RegisterTraineeInput;
} {
  const errors: string[] = [];

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").trim();
  const state = String(body.state || "").trim();
  const city = String(body.city || "").trim();
  const giatmaraCenter = String(body.giatmaraCenter || "").trim();
  const studentId = String(body.studentId || "").trim();
  const headline = String(body.headline || "").trim();
  const skillSlug = String(body.skillSlug || "electrical-wiring").trim();

  if (name.length < 3) errors.push("Full name must be at least 3 characters.");
  if (!email.includes("@")) errors.push("A valid email address is required.");
  if (phone.length < 9) errors.push("A valid Malaysian phone/WhatsApp number is required.");
  if (!state) errors.push("Malaysian state is required.");
  if (!city) errors.push("City or district is required.");
  if (!giatmaraCenter) errors.push("GIATMARA center is required.");
  if (!studentId) errors.push("GIATMARA Student Matrix ID is required.");
  if (headline.length < 5) errors.push("Service headline must be at least 5 characters.");

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: {
      name,
      email,
      password: body.password ? String(body.password) : undefined,
      phone,
      state,
      city,
      giatmaraCenter,
      studentId,
      headline,
      skillSlug,
    },
  };
}

