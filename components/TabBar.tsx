"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Repeat, MessageCircle, User, type LucideIcon } from "lucide-react";
import { useT } from "@/lib/i18n";

const TABS: { href: string; icon: LucideIcon; key: string }[] = [
  { href: "/", icon: Home, key: "tab_learn" },
  { href: "/review", icon: Repeat, key: "tab_review" },
  { href: "/practice", icon: MessageCircle, key: "tab_practice" },
  { href: "/profile", icon: User, key: "tab_profile" },
];

export function TabBar() {
  const pathname = usePathname();
  const t = useT();

  // Full-screen flows hide the tab bar.
  if (pathname === "/onboarding" || pathname.startsWith("/lesson")) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 glass-strong border-t border-white/60">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 pb-6 pt-2.5">
        {TABS.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          const Ico = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className="flex flex-col items-center gap-1"
              style={{ color: active ? "var(--sg-primary-deep)" : "#B8A698" }}
            >
              <Ico size={21} strokeWidth={active ? 2.6 : 2} />
              <span className="text-[9px] font-extrabold tracking-wide">{t(tab.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
