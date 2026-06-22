import type { Course, VocabItem } from "@/lib/types";

// Russian — foundational basics. Cyrillic term + romanization (en/es glosses).
const v = (id: string, term: string, roman: string, en: string, es: string): VocabItem => ({
  id: `ru:${id}`,
  term,
  roman,
  gloss: { en, es },
});

const basics: VocabItem[] = [
  v("privet", "привет", "privet", "hi (informal)", "hola (informal)"),
  v("zdravstvuyte", "здравствуйте", "zdravstvuyte", "hello (formal)", "hola (formal)"),
  v("spasibo", "спасибо", "spasibo", "thank you", "gracias"),
  v("pozhaluysta", "пожалуйста", "pozhaluysta", "please / you're welcome", "por favor / de nada"),
  v("da", "да", "da", "yes", "sí"),
  v("net", "нет", "net", "no", "no"),
  v("izvinite", "извините", "izvinite", "excuse me / sorry", "perdón"),
  v("do-svidaniya", "до свидания", "do svidaniya", "goodbye", "adiós"),
  v("dobroy-nochi", "доброй ночи", "dobroy nochi", "good night", "buenas noches"),
  v("kak-dela", "как дела?", "kak dela?", "how are you?", "¿cómo estás?"),
];

const numbers: VocabItem[] = [
  v("odin", "один", "odin", "one", "uno"),
  v("dva", "два", "dva", "two", "dos"),
  v("tri", "три", "tri", "three", "tres"),
  v("chetyre", "четыре", "chetyre", "four", "cuatro"),
  v("pyat", "пять", "pyat'", "five", "cinco"),
];

export const RUSSIAN: Course = {
  target: "ru",
  units: [
    {
      id: "ru-u1",
      title: "Unit 1 · First Words",
      description: "Greetings and numbers in Cyrillic.",
      skills: [
        { id: "ru-basics", title: "Basics", blurb: "Greetings & essentials", icon: "Sparkles", color: "#FB7427", minLevel: "beginner", items: basics },
        { id: "ru-numbers", title: "Numbers", blurb: "Count to five", icon: "ShoppingBag", color: "#F59E0B", minLevel: "beginner", items: numbers },
      ],
    },
  ],
};
