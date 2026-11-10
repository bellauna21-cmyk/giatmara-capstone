// src/lib/avatar-utils.ts

const AVATAR_GRADIENTS = [
  "from-blue-600 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-violet-600 to-purple-600",
  "from-rose-500 to-pink-600",
];

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((n) => !["bin", "binti"].includes(n.toLowerCase()))
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function getAvatarGradient(id: string): string {
  const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_GRADIENTS[sum % AVATAR_GRADIENTS.length];
}

