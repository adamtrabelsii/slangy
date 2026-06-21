"use client";

import {
  Sparkles,
  Utensils,
  MapPin,
  Clock,
  Brain,
  MessageSquareText,
  Quote,
  Lock,
  Check,
  Star,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Sparkles,
  Utensils,
  MapPin,
  Clock,
  Brain,
  MessageSquareText,
  Quote,
  Lock,
  Check,
  Star,
};

export function Icon({
  name,
  size = 22,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const C = MAP[name] ?? Star;
  return <C size={size} className={className} />;
}
