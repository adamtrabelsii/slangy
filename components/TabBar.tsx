"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Repeat, MessageCircle, User, type LucideIcon } from "lucide-react";

const TABS: { href: string; icon: LucideIcon; label: string }[] = [
  { href: "/", icon: Home, label: "Aprende" },
  { href: "/review", icon: Repeat, label: "Repasa" },
  { href: "/practice", icon: MessageCircle, label: "Habla" },
  { href: "/profile", icon: User, label: "Perfil" },
];

export function TabBar() {
  const pathname = usePathname();

  // Full-screen flows hide the tab bar.
  if (pathname === "/onboarding" || pathname.startsWith("/lesson")) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 glass-strong border-t border-white/60">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 pb-6 pt-2.5">
        {TABS.map((t) => {
          const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
          const Ico = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="flex flex-col items-center gap-1"
              style={{ color: active ? "var(--sg-primary-deep)" : "#B8A698" }}
            >
              <Ico size={21} strokeWidth={active ? 2.6 : 2} />
              <span className="text-[9px] font-extrabold tracking-wide">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
