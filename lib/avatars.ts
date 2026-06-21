// Warm gradient avatars (no emoji) — the user's initials sit on a gradient chip.

export interface Avatar {
  id: string;
  grad: string;
}

export const AVATARS: Avatar[] = [
  { id: "sunset", grad: "linear-gradient(145deg,#FB7427,#F59E0B)" },
  { id: "ember", grad: "linear-gradient(145deg,#EA580C,#C2410C)" },
  { id: "gold", grad: "linear-gradient(145deg,#F59E0B,#FBBF24)" },
  { id: "clay", grad: "linear-gradient(145deg,#C2410C,#9A3412)" },
  { id: "honey", grad: "linear-gradient(145deg,#FBBF24,#FB923C)" },
  { id: "rust", grad: "linear-gradient(145deg,#B45309,#EA580C)" },
];

export function avatarGrad(id: string): string {
  return (AVATARS.find((a) => a.id === id) ?? AVATARS[0]).grad;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
