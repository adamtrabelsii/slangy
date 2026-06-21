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
  "de-nada": { es: "de nada", en: "you're welcome" },
  tres: { es: "tres", en: "three" },
  "mucho-gusto": { es: "mucho gusto", en: "nice to meet you" },
  "buenas-noches": { es: "buenas noches", en: "good night" },
  "hasta-luego": { es: "hasta luego", en: "see you later" },

  agua: { es: "agua", en: "water" },
  "quiero-cafe": { es: "quiero un café", en: "I want a coffee" },
  "la-cuenta": { es: "la cuenta", en: "the bill" },
  "tengo-hambre": { es: "tengo hambre", en: "I'm hungry" },
  "el-menu": { es: "el menú", en: "the menu" },
  delicioso: { es: "está delicioso", en: "it's delicious" },
  "la-cena": { es: "la cena", en: "dinner" },
  "soy-vegetariano": { es: "soy vegetariano", en: "I'm vegetarian" },
  "meals-match": { es: "las comidas", en: "meals" },

  madre: { es: "madre", en: "mother" },
  "family-match": { es: "la familia", en: "family" },
  "tengo-hermanos": { es: "tengo dos hermanos", en: "I have two brothers" },
  "mi-familia": { es: "mi familia", en: "my family" },
  "mi-amigo": { es: "mi amigo", en: "my friend" },
  simpatica: { es: "simpática", en: "nice / friendly" },
  "cuantos-anos": { es: "¿cuántos años tienes?", en: "how old are you?" },

  "donde-esta": { es: "¿dónde está…?", en: "where is…?" },
  izquierda: { es: "a la izquierda", en: "to the left" },
  "cuanto-cuesta": { es: "¿cuánto cuesta?", en: "how much is it?" },
  "el-bano": { es: "el baño", en: "the bathroom" },
  "necesito-taxi": { es: "necesito un taxi", en: "I need a taxi" },
  aeropuerto: { es: "el aeropuerto", en: "the airport" },
  "tren-sale": { es: "el tren sale", en: "the train leaves" },

  "muy-caro": { es: "muy caro", en: "very expensive" },
  "clothes-match": { es: "la ropa", en: "clothes" },
  "la-talla": { es: "la talla", en: "the size" },
  "pagar-tarjeta": { es: "pagar con tarjeta", en: "to pay by card" },

  comi: { es: "comí", en: "I ate" },
  fui: { es: "fui", en: "I went" },
  vimos: { es: "vimos", en: "we saw" },
  trabaje: { es: "trabajé", en: "I worked" },
  "lo-pasamos": { es: "lo pasamos genial", en: "we had a great time" },
  compro: { es: "compró", en: "she/he bought" },

  "me-despierto": { es: "me despierto", en: "I wake up" },
  "trabajo-casa": { es: "trabajo desde casa", en: "I work from home" },
  "todos-los-dias": { es: "todos los días", en: "every day" },
  "me-levanto": { es: "me levanto", en: "I get up" },
  "routine-match": { es: "la rutina", en: "routine" },
  "llego-tarde": { es: "llego tarde", en: "I arrive late" },
  "voy-a-dormir": { es: "me voy a dormir", en: "I'm going to sleep" },

  "estoy-feliz": { es: "estoy feliz", en: "I'm happy" },
  "emotions-match": { es: "las emociones", en: "emotions" },
  cansado: { es: "cansado", en: "tired" },
  "creo-que": { es: "creo que…", en: "I think that…" },
  nervioso: { es: "estoy nervioso", en: "I'm nervous" },

  "voy-a-viajar": { es: "voy a viajar", en: "I'm going to travel" },
  "te-llamare": { es: "te llamaré", en: "I'll call you" },
  iremos: { es: "iremos", en: "we'll go" },
  "el-futuro": { es: "el futuro", en: "the future" },

  "espero-que": { es: "espero que…", en: "I hope that…" },
  ojala: { es: "ojalá", en: "hopefully / I wish" },
  "quiero-que": { es: "quiero que…", en: "I want you to…" },
  "es-importante-que": { es: "es importante que…", en: "it's important that…" },
  "cuando-sea": { es: "cuando sea mayor", en: "when I'm older" },

  "que-guay": { es: "¡qué guay!", en: "how cool! (Spain)", slang: true },
  chido: { es: "chido", en: "cool / awesome (Mexico)", slang: true },
  "slang-match": { es: "jerga", en: "slang", slang: true },
  "no-mames": { es: "no mames", en: "no way! (very informal, MX)", slang: true },
  "que-onda": { es: "¿qué onda?", en: "what's up? (Latam)", slang: true },
  mola: { es: "mola", en: "it's cool (Spain)", slang: true },
  "slang-match-2": { es: "más jerga", en: "more slang", slang: true },
  "sin-un-duro": { es: "sin un duro", en: "broke / no money (Spain)", slang: true },

  "tomar-pelo": { es: "tomar el pelo", en: "to pull someone's leg", slang: true },
  "buena-onda": { es: "buena onda", en: "good vibe / nice person", slang: true },
  "idiom-match": { es: "modismos", en: "idioms", slang: true },
  "tirar-toalla": { es: "tirar la toalla", en: "to give up", slang: true },
  "pelos-lengua": { es: "no tener pelos en la lengua", en: "to be outspoken", slang: true },
  "idiom-match-2": { es: "más modismos", en: "more idioms", slang: true },

  "text-match": { es: "jerga de chat", en: "chat slang", slang: true },
  jaja: { es: "jajaja", en: "hahaha (laughing)", slang: true },
  "quedamos-finde": { es: "¿quedamos el finde?", en: "meet up this weekend?", slang: true },
};

export function vocabFor(itemId: string): VocabEntry {
  return VOCAB[itemId] ?? { es: itemId, en: itemId };
}
