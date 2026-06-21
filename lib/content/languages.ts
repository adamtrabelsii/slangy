// The languages Slangy supports for selection. Only the Spanish course
// (target "es") has real content today; the rest are "coming soon".

export type LangCode = "es" | "en" | "fr" | "ar";

export interface Language {
  code: LangCode;
  name: string; // English name
  native: string; // endonym
  monogram: string; // 2-letter badge (no emoji)
  rtl?: boolean;
}

export const LANGUAGES: Language[] = [
  { code: "es", name: "Spanish", native: "Español", monogram: "ES" },
  { code: "en", name: "English", native: "English", monogram: "EN" },
  { code: "fr", name: "French", native: "Français", monogram: "FR" },
  { code: "ar", name: "Arabic", native: "العربية", monogram: "AR", rtl: true },
];

export function getLanguage(code: LangCode): Language {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

/** Which target languages currently have a real course built. */
export function hasCourse(target: LangCode): boolean {
  return target === "es";
}
