import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import { TabBar } from "@/components/TabBar";
import { LangSync } from "@/components/LangSync";

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

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
    <html lang="en" className={`${baloo2.variable} ${nunito.variable}`}>
      <body>
        <LangSync />
        <main className="mx-auto w-full max-w-md px-5 pb-28 pt-6">{children}</main>
        <TabBar />
      </body>
    </html>
  );
}
