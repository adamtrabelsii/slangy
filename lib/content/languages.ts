// The languages Slangy supports for selection (both "speak" and "learn").
// Course availability lives in lib/content/index.ts (hasCourse).

export type LangCode =
  | "es"
  | "en"
  | "fr"
  | "it"
  | "de"
  | "pt"
  | "ar"
  | "cs"
  | "ru"
  | "zh"
  | "ja";

export interface Language {
  code: LangCode;
  name: string; // English name
  native: string; // endonym
  monogram: string; // short badge (no emoji)
  rtl?: boolean;
}

export const LANGUAGES: Language[] = [
  { code: "es", name: "Spanish", native: "Español", monogram: "ES" },
  { code: "en", name: "English", native: "English", monogram: "EN" },
  { code: "fr", name: "French", native: "Français", monogram: "FR" },
  { code: "it", name: "Italian", native: "Italiano", monogram: "IT" },
  { code: "de", name: "German", native: "Deutsch", monogram: "DE" },
  { code: "pt", name: "Portuguese", native: "Português", monogram: "PT" },
  { code: "ar", name: "Arabic", native: "العربية", monogram: "ع", rtl: true },
  { code: "cs", name: "Czech", native: "Čeština", monogram: "CS" },
  { code: "ru", name: "Russian", native: "Русский", monogram: "RU" },
  { code: "zh", name: "Chinese", native: "中文", monogram: "中" },
  { code: "ja", name: "Japanese", native: "日本語", monogram: "日" },
];

export function getLanguage(code: LangCode): Language {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}
