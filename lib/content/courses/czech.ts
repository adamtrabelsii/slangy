import type { Course, VocabItem } from "@/lib/types";

// Czech — foundational basics (en/es glosses).
const v = (id: string, term: string, en: string, es: string): VocabItem => ({
  id: `cs:${id}`,
  term,
  gloss: { en, es },
});

const basics: VocabItem[] = [
  v("ahoj", "ahoj", "hi / bye (informal)", "hola / adiós (informal)"),
  v("dobry-den", "dobrý den", "hello (formal)", "buenos días (formal)"),
  v("dekuji", "děkuji", "thank you", "gracias"),
  v("prosim", "prosím", "please / you're welcome", "por favor / de nada"),
  v("ano", "ano", "yes", "sí"),
  v("ne", "ne", "no", "no"),
  v("prominte", "promiňte", "excuse me / sorry", "perdón"),
  v("na-shledanou", "na shledanou", "goodbye", "adiós"),
  v("dobrou-noc", "dobrou noc", "good night", "buenas noches"),
  v("jak-se-mas", "jak se máš?", "how are you?", "¿cómo estás?"),
];

const numbers: VocabItem[] = [
  v("jedna", "jedna", "one", "uno"),
  v("dva", "dva", "two", "dos"),
  v("tri", "tři", "three", "tres"),
  v("ctyri", "čtyři", "four", "cuatro"),
  v("pet", "pět", "five", "cinco"),
];

export const CZECH: Course = {
  target: "cs",
  units: [
    {
      id: "cs-u1",
      title: "Unit 1 · First Words",
      description: "Greetings and numbers to get started.",
      skills: [
        { id: "cs-basics", title: "Basics", blurb: "Greetings & essentials", icon: "Sparkles", color: "#FB7427", minLevel: "beginner", items: basics },
        { id: "cs-numbers", title: "Numbers", blurb: "Count to five", icon: "ShoppingBag", color: "#F59E0B", minLevel: "beginner", items: numbers },
      ],
    },
  ],
};
