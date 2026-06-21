import type { Metadata } from "next";
import "./globals.css";
import { TopBar } from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Slangy — Learn Spanish for real",
  description:
    "Learn Spanish the way people actually speak it — slang, idioms, and a real AI tutor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TopBar />
        <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-6">{children}</main>
        <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-ink-line bg-ink/95 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-around px-4 py-2 text-xs font-bold">
            <BottomLink href="/" label="Learn" />
            <BottomLink href="/review" label="Review" />
            <BottomLink href="/practice" label="AI Chat" />
            <BottomLink href="/profile" label="Profile" />
          </div>
        </nav>
      </body>
    </html>
  );
}

function BottomLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-xl px-4 py-1.5 text-slate-300 hover:bg-ink-soft hover:text-white"
    >
      {label}
    </a>
  );
}
