import type { Course, VocabItem } from "@/lib/types";

// Arabic (Modern Standard) — foundational basics. Term in Arabic script +
// romanization for pronunciation (en/es glosses).
const v = (id: string, term: string, roman: string, en: string, es: string): VocabItem => ({
  id: `ar:${id}`,
  term,
  roman,
  gloss: { en, es },
});

const basics: VocabItem[] = [
  v("marhaban", "مرحباً", "marhaban", "hello", "hola"),
  v("ahlan", "أهلاً", "ahlan", "hi (informal)", "hola (informal)"),
  v("shukran", "شكراً", "shukran", "thank you", "gracias"),
  v("min-fadlik", "من فضلك", "min fadlik", "please", "por favor"),
  v("afwan", "عفواً", "afwan", "you're welcome / excuse me", "de nada / perdón"),
  v("naam", "نعم", "naam", "yes", "sí"),
  v("la", "لا", "la", "no", "no"),
  v("maa-salama", "مع السلامة", "ma'a as-salama", "goodbye", "adiós"),
  v("tisbah-ala-khair", "تصبح على خير", "tisbah 'ala khair", "good night", "buenas noches"),
  v("kayfa-haluk", "كيف حالك؟", "kayfa haluk?", "how are you?", "¿cómo estás?"),
  v("ana-bikhair", "أنا بخير", "ana bikhair", "I'm fine", "estoy bien"),
];

const numbers: VocabItem[] = [
  v("wahid", "واحد", "wahid", "one", "uno"),
  v("ithnan", "اثنان", "ithnan", "two", "dos"),
  v("thalatha", "ثلاثة", "thalatha", "three", "tres"),
  v("arbaa", "أربعة", "arba'a", "four", "cuatro"),
  v("khamsa", "خمسة", "khamsa", "five", "cinco"),
];

export const ARABIC: Course = {
  target: "ar",
  units: [
    {
      id: "ar-u1",
      title: "Unit 1 · First Words",
      description: "Greetings and numbers to get started.",
      skills: [
        { id: "ar-basics", title: "Basics", blurb: "Greetings & essentials", icon: "Sparkles", color: "#FB7427", minLevel: "beginner", items: basics },
        { id: "ar-numbers", title: "Numbers", blurb: "Count to five", icon: "ShoppingBag", color: "#F59E0B", minLevel: "beginner", items: numbers },
      ],
    },
  ],
};
