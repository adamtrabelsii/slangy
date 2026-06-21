// Canonical Spanish↔English for each itemId referenced by exercises.
// The SRS engine turns these into review cards as the learner encounters them.

export interface VocabEntry {
  es: string;
  en: string;
  slang?: boolean;
}

export const VOCAB: Record<string, VocabEntry> = {
  hola: { es: "hola", en: "hello" },
  gracias: { es: "gracias", en: "thank you" },
  "buenos-dias": { es: "buenos días", en: "good morning" },
  "me-llamo": { es: "me llamo…", en: "my name is…" },
  "por-favor": { es: "por favor", en: "please" },
  "match-greetings": { es: "saludos", en: "greetings" },
  "como-estas": { es: "¿cómo estás?", en: "how are you?" },
  bien: { es: "estoy bien", en: "I'm fine" },

  agua: { es: "agua", en: "water" },
  "quiero-cafe": { es: "quiero un café", en: "I want a coffee" },
  "la-cuenta": { es: "la cuenta", en: "the bill" },
  "tengo-hambre": { es: "tengo hambre", en: "I'm hungry" },

  "donde-esta": { es: "¿dónde está…?", en: "where is…?" },
  izquierda: { es: "a la izquierda", en: "to the left" },
  "cuanto-cuesta": { es: "¿cuánto cuesta?", en: "how much is it?" },

  comi: { es: "comí", en: "I ate" },
  fui: { es: "fui", en: "I went" },
  vimos: { es: "vimos", en: "we saw" },

  "espero-que": { es: "espero que…", en: "I hope that…" },
  ojala: { es: "ojalá", en: "hopefully / I wish" },

  "que-guay": { es: "¡qué guay!", en: "how cool! (Spain)", slang: true },
  chido: { es: "chido", en: "cool / awesome (Mexico)", slang: true },
  "slang-match": { es: "jerga", en: "slang" , slang: true },
  "no-mames": { es: "no mames", en: "no way! (very informal, MX)", slang: true },

  "tomar-pelo": { es: "tomar el pelo", en: "to pull someone's leg", slang: true },
  "buena-onda": { es: "buena onda", en: "good vibe / nice person", slang: true },
  "idiom-match": { es: "modismos", en: "idioms", slang: true },
};

export function vocabFor(itemId: string): VocabEntry {
  return VOCAB[itemId] ?? { es: itemId, en: itemId };
}
