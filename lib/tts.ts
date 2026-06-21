"use client";

// Thin wrapper over the Web Speech API for Spanish audio. Feature-detected so
// the UI can hide audio affordances when unsupported.

export function ttsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickSpanishVoice(): SpeechSynthesisVoice | null {
  if (!ttsSupported()) return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  cachedVoice =
    voices.find((v) => v.lang.toLowerCase().startsWith("es")) ?? null;
  return cachedVoice;
}

export function speak(text: string, rate = 0.95): void {
  if (!ttsSupported()) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "es-ES";
  u.rate = rate;
  const voice = pickSpanishVoice();
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}

// Voices can load asynchronously; warm the cache once available.
if (typeof window !== "undefined" && ttsSupported()) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    pickSpanishVoice();
  };
}
