"use client";

// Wrapper over the Web Speech API that speaks in the *target* language with a
// matching native voice. Voices load asynchronously, so we retry once they're
// ready instead of falling back to an English voice reading foreign words.

import type { LangCode } from "@/lib/content/languages";

export function ttsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

// BCP-47 preferences per target language (first match wins).
const LANG_PREFS: Record<LangCode, string[]> = {
  es: ["es-ES", "es-MX", "es-US", "es-419", "es"],
  en: ["en-US", "en-GB", "en"],
  fr: ["fr-FR", "fr-CA", "fr"],
  ar: ["ar-SA", "ar-EG", "ar"],
};

let currentLang: LangCode = "es";

/** Set which language subsequent speak() calls should use (from learnTarget). */
export function setSpeechLang(code: LangCode): void {
  currentLang = code;
}

function bestVoice(code: LangCode): SpeechSynthesisVoice | null {
  if (!ttsSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;
  const prefs = LANG_PREFS[code];
  for (const pref of prefs) {
    // Exact region first, then prefer a local (offline) voice.
    const matches = voices.filter((v) => v.lang.toLowerCase().startsWith(pref.toLowerCase()));
    if (matches.length) {
      return matches.find((v) => v.localService) ?? matches[0];
    }
  }
  return null;
}

function utter(text: string, code: LangCode, rate: number): void {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = LANG_PREFS[code][0];
  u.rate = rate;
  const voice = bestVoice(code);
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}

export function speak(text: string, rate = 0.95): void {
  if (!ttsSupported()) return;
  const code = currentLang;
  window.speechSynthesis.cancel();

  // If voices haven't loaded yet, wait for them so we don't read foreign words
  // with the default (likely English) voice.
  if (window.speechSynthesis.getVoices().length === 0) {
    const once = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", once);
      utter(text, code, rate);
    };
    window.speechSynthesis.addEventListener("voiceschanged", once);
    // Safety: some browsers populate voices without firing the event.
    setTimeout(() => {
      if (window.speechSynthesis.getVoices().length > 0) {
        window.speechSynthesis.removeEventListener("voiceschanged", once);
        utter(text, code, rate);
      }
    }, 250);
    return;
  }

  utter(text, code, rate);
}

// Warm the voice list as early as possible.
if (typeof window !== "undefined" && ttsSupported()) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
