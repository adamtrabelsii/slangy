"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", emoji: "🏠", label: "Aprende" },
  { href: "/review", emoji: "🔁", label: "Repasa" },
  { href: "/practice", emoji: "💬", label: "Habla" },
  { href: "/profile", emoji: "👤", label: "Perfil" },
];

export function TabBar() {
  const pathname = usePathname();

  // Full-screen flows hide the tab bar (matches the design).
  if (pathname === "/onboarding" || pathname.startsWith("/lesson")) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 glass-40 border-t">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 pb-6 pt-2.5">
        {TABS.map((t) => {
          const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className="flex flex-col items-center gap-0.5 transition-opacity"
              style={{ opacity: active ? 1 : 0.5 }}
            >
              <span className="text-xl">{t.emoji}</span>
              <span
                className="text-[9px] font-extrabold tracking-wide"
                style={{ color: active ? "var(--sg-coral-deep)" : "#9CA3AF" }}
              >
                {t.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
