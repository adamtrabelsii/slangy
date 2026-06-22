import type { Course, VocabItem } from "@/lib/types";

// Italian course. Glosses in en/es (others fall back to English).
const v = (id: string, term: string, en: string, es: string, extra?: { slang?: boolean }): VocabItem => ({
  id: `it:${id}`,
  term,
  gloss: { en, es },
  ...extra,
});

const basics: VocabItem[] = [
  v("ciao", "ciao", "hi / bye", "hola / adiós"),
  v("buongiorno", "buongiorno", "good morning", "buenos días"),
  v("grazie", "grazie", "thank you", "gracias"),
  v("perfavore", "per favore", "please", "por favor"),
  v("prego", "prego", "you're welcome", "de nada"),
  v("arrivederci", "arrivederci", "goodbye", "adiós"),
  v("si", "sì", "yes", "sí"),
  v("no", "no", "no", "no"),
  v("scusa", "scusa", "sorry / excuse me", "perdón"),
  v("buonanotte", "buonanotte", "good night", "buenas noches"),
  v("come-stai", "come stai?", "how are you?", "¿cómo estás?"),
  v("sto-bene", "sto bene", "I'm fine", "estoy bien"),
];

const food: VocabItem[] = [
  v("acqua", "l'acqua", "water", "agua"),
  v("caffe", "il caffè", "coffee", "café"),
  v("pane", "il pane", "bread", "pan"),
  v("vino", "il vino", "wine", "vino"),
  v("il-conto", "il conto", "the bill", "la cuenta"),
  v("ho-fame", "ho fame", "I'm hungry", "tengo hambre"),
  v("il-menu", "il menù", "the menu", "el menú"),
  v("buonissimo", "è buonissimo", "it's delicious", "está delicioso"),
  v("colazione", "la colazione", "breakfast", "el desayuno"),
  v("cena", "la cena", "dinner", "la cena"),
];

const family: VocabItem[] = [
  v("madre", "la madre", "mother", "madre"),
  v("padre", "il padre", "father", "padre"),
  v("fratello", "il fratello", "brother", "hermano"),
  v("sorella", "la sorella", "sister", "hermana"),
  v("amico", "l'amico", "friend", "amigo"),
  v("la-mia-famiglia", "la mia famiglia", "my family", "mi familia"),
  v("quanti-anni", "quanti anni hai?", "how old are you?", "¿cuántos años tienes?"),
];

const travel: VocabItem[] = [
  v("dove", "dov'è… ?", "where is…?", "¿dónde está…?"),
  v("stazione", "la stazione", "the station", "la estación"),
  v("sinistra", "a sinistra", "to the left", "a la izquierda"),
  v("destra", "a destra", "to the right", "a la derecha"),
  v("dritto", "sempre dritto", "straight ahead", "todo recto"),
  v("bagno", "il bagno", "the bathroom", "el baño"),
  v("aeroporto", "l'aeroporto", "the airport", "el aeropuerto"),
  v("biglietto", "il biglietto", "the ticket", "el billete"),
];

const numbers: VocabItem[] = [
  v("uno", "uno", "one", "uno"),
  v("due", "due", "two", "dos"),
  v("tre", "tre", "three", "tres"),
  v("quattro", "quattro", "four", "cuatro"),
  v("cinque", "cinque", "five", "cinco"),
  v("quanto-costa", "quanto costa?", "how much is it?", "¿cuánto cuesta?"),
  v("caro", "caro", "expensive", "caro"),
  v("soldi", "i soldi", "money", "dinero"),
];

const slang: VocabItem[] = [
  v("figo", "figo", "cool / awesome", "guay / genial", { slang: true }),
  v("magari", "magari!", "I wish! / maybe", "¡ojalá! / quizás", { slang: true }),
  v("dai", "dai!", "come on!", "¡vamos! / ¡venga!", { slang: true }),
  v("che-palle", "che palle!", "what a pain! (informal)", "¡qué rollo! (informal)", { slang: true }),
  v("boh", "boh", "dunno", "ni idea", { slang: true }),
  v("in-bocca-al-lupo", "in bocca al lupo", "good luck (idiom)", "buena suerte (modismo)", { slang: true }),
];

export const ITALIAN: Course = {
  target: "it",
  units: [
    {
      id: "it-u1",
      title: "Unit 1 · Foundations",
      description: "Greetings, food, and family.",
      skills: [
        { id: "it-basics", title: "Basics", blurb: "Greetings & essentials", icon: "Sparkles", color: "#FB7427", minLevel: "beginner", items: basics },
        { id: "it-food", title: "Food", blurb: "Bar & trattoria talk", icon: "Utensils", color: "#F59E0B", minLevel: "beginner", items: food },
        { id: "it-family", title: "Family & People", blurb: "Talk about who's who", icon: "Users", color: "#EA580C", minLevel: "beginner", items: family },
      ],
    },
    {
      id: "it-u2",
      title: "Unit 2 · Out in the World",
      description: "Navigate, count, and shop.",
      skills: [
        { id: "it-travel", title: "Getting Around", blurb: "Directions & transport", icon: "MapPin", color: "#FB7427", minLevel: "intermediate", items: travel },
        { id: "it-numbers", title: "Numbers & Prices", blurb: "Count and pay", icon: "ShoppingBag", color: "#F59E0B", minLevel: "beginner", items: numbers },
        { id: "it-slang", title: "Real Talk: Slang", blurb: "How locals actually speak", icon: "MessageSquareText", color: "#C2410C", minLevel: "advanced", slang: true, items: slang },
      ],
    },
  ],
};
