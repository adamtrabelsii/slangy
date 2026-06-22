import type { Course, VocabItem } from "@/lib/types";

// Japanese — foundational basics. Kana/kanji term + romaji (en/es glosses).
const v = (id: string, term: string, roman: string, en: string, es: string): VocabItem => ({
  id: `ja:${id}`,
  term,
  roman,
  gloss: { en, es },
});

const basics: VocabItem[] = [
  v("konnichiwa", "こんにちは", "konnichiwa", "hello", "hola"),
  v("arigatou", "ありがとう", "arigatō", "thank you", "gracias"),
  v("onegai", "お願いします", "onegai shimasu", "please", "por favor"),
  v("dou-itashimashite", "どういたしまして", "dō itashimashite", "you're welcome", "de nada"),
  v("hai", "はい", "hai", "yes", "sí"),
  v("iie", "いいえ", "iie", "no", "no"),
  v("sumimasen", "すみません", "sumimasen", "excuse me / sorry", "perdón"),
  v("sayounara", "さようなら", "sayōnara", "goodbye", "adiós"),
  v("oyasumi", "おやすみ", "oyasumi", "good night", "buenas noches"),
  v("genki", "元気ですか？", "genki desu ka?", "how are you?", "¿cómo estás?"),
];

const numbers: VocabItem[] = [
  v("ichi", "一", "ichi", "one", "uno"),
  v("ni", "二", "ni", "two", "dos"),
  v("san", "三", "san", "three", "tres"),
  v("yon", "四", "yon", "four", "cuatro"),
  v("go", "五", "go", "five", "cinco"),
];

export const JAPANESE: Course = {
  target: "ja",
  units: [
    {
      id: "ja-u1",
      title: "Unit 1 · First Words",
      description: "Greetings and numbers in Japanese.",
      skills: [
        { id: "ja-basics", title: "Basics", blurb: "Greetings & essentials", icon: "Sparkles", color: "#FB7427", minLevel: "beginner", items: basics },
        { id: "ja-numbers", title: "Numbers", blurb: "Count to five", icon: "ShoppingBag", color: "#F59E0B", minLevel: "beginner", items: numbers },
      ],
    },
  ],
};
