import type { Course, VocabItem } from "@/lib/types";

// Mandarin Chinese — foundational basics. Hanzi term + pinyin (en/es glosses).
const v = (id: string, term: string, roman: string, en: string, es: string): VocabItem => ({
  id: `zh:${id}`,
  term,
  roman,
  gloss: { en, es },
});

const basics: VocabItem[] = [
  v("nihao", "你好", "nǐ hǎo", "hello", "hola"),
  v("xiexie", "谢谢", "xièxie", "thank you", "gracias"),
  v("qing", "请", "qǐng", "please", "por favor"),
  v("bukeqi", "不客气", "bù kèqi", "you're welcome", "de nada"),
  v("shi", "是", "shì", "yes / to be", "sí"),
  v("bu", "不", "bù", "no / not", "no"),
  v("duibuqi", "对不起", "duìbuqǐ", "sorry", "perdón"),
  v("zaijian", "再见", "zàijiàn", "goodbye", "adiós"),
  v("wanan", "晚安", "wǎn'ān", "good night", "buenas noches"),
  v("nihaoma", "你好吗？", "nǐ hǎo ma?", "how are you?", "¿cómo estás?"),
];

const numbers: VocabItem[] = [
  v("yi", "一", "yī", "one", "uno"),
  v("er", "二", "èr", "two", "dos"),
  v("san", "三", "sān", "three", "tres"),
  v("si", "四", "sì", "four", "cuatro"),
  v("wu", "五", "wǔ", "five", "cinco"),
];

export const CHINESE: Course = {
  target: "zh",
  units: [
    {
      id: "zh-u1",
      title: "Unit 1 · First Words",
      description: "Greetings and numbers in Mandarin.",
      skills: [
        { id: "zh-basics", title: "Basics", blurb: "Greetings & essentials", icon: "Sparkles", color: "#FB7427", minLevel: "beginner", items: basics },
        { id: "zh-numbers", title: "Numbers", blurb: "Count to five", icon: "ShoppingBag", color: "#F59E0B", minLevel: "beginner", items: numbers },
      ],
    },
  ],
};
