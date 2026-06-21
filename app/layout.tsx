import type { Metadata } from "next";
import "./globals.css";
import { TabBar } from "@/components/TabBar";
import { LangSync } from "@/components/LangSync";

export const metadata: Metadata = {
  title: "Slangy — languages, the way they're actually spoken",
  description:
    "Learn a language the way people actually speak it — slang, idioms, and a real AI tutor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LangSync />
        <main className="mx-auto w-full max-w-md px-5 pb-28 pt-6">{children}</main>
        <TabBar />
      </body>
    </html>
  );
}
