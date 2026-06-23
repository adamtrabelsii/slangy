import type { Course, VocabItem } from "@/lib/types";

// English course. The term IS English, so `gloss.en` is a short clarifying
// definition (not a translation) and the real translations live in es/fr/ar —
// the three non-English native languages the rest of the app fully localizes.
const v = (
  id: string,
  term: string,
  en: string,
  es: string,
  fr: string,
  ar: string,
  extra?: { slang?: boolean }
): VocabItem => ({
  id: `en:${id}`,
  term,
  gloss: { en, es, fr, ar },
  ...extra,
});

const basics: VocabItem[] = [
  v("hello", "hello", "a greeting", "hola", "bonjour", "مرحباً"),
  v("thank-you", "thank you", "expressing gratitude", "gracias", "merci", "شكراً"),
  v("please", "please", "a polite request word", "por favor", "s'il vous plaît", "من فضلك"),
  v("youre-welcome", "you're welcome", "reply to thanks", "de nada", "de rien", "عفواً"),
  v("goodbye", "goodbye", "a farewell", "adiós", "au revoir", "وداعاً"),
  v("yes", "yes", "affirmative", "sí", "oui", "نعم"),
  v("no", "no", "negative", "no", "non", "لا"),
  v("sorry", "sorry", "an apology", "perdón", "pardon", "آسف"),
  v("good-night", "good night", "an evening farewell", "buenas noches", "bonne nuit", "ليلة سعيدة"),
  v("how-are-you", "how are you?", "asking about wellbeing", "¿cómo estás?", "comment ça va ?", "كيف حالك؟"),
  v("im-fine", "I'm fine", "a wellbeing reply", "estoy bien", "ça va bien", "أنا بخير"),
  v("nice-to-meet-you", "nice to meet you", "an introduction greeting", "mucho gusto", "enchanté", "سررت بلقائك"),
];

const food: VocabItem[] = [
  v("water", "water", "the drink", "agua", "l'eau", "ماء"),
  v("coffee", "coffee", "the drink", "café", "le café", "قهوة"),
  v("bread", "bread", "the food", "pan", "le pain", "خبز"),
  v("cheese", "cheese", "the food", "queso", "le fromage", "جبن"),
  v("the-bill", "the bill", "what you pay at the end", "la cuenta", "l'addition", "الفاتورة"),
  v("im-hungry", "I'm hungry", "wanting food", "tengo hambre", "j'ai faim", "أنا جائع"),
  v("the-menu", "the menu", "the list of dishes", "el menú", "le menu", "قائمة الطعام"),
  v("its-delicious", "it's delicious", "praising food", "está delicioso", "c'est délicieux", "إنه لذيذ"),
  v("breakfast", "breakfast", "the morning meal", "el desayuno", "le petit-déjeuner", "وجبة الإفطار"),
  v("wine", "wine", "the drink", "vino", "le vin", "نبيذ"),
];

const family: VocabItem[] = [
  v("mother", "mother", "a parent", "madre", "la mère", "أم"),
  v("father", "father", "a parent", "padre", "le père", "أب"),
  v("brother", "brother", "a sibling", "hermano", "le frère", "أخ"),
  v("sister", "sister", "a sibling", "hermana", "la sœur", "أخت"),
  v("friend", "friend", "someone close to you", "amigo", "l'ami", "صديق"),
  v("my-family", "my family", "your relatives", "mi familia", "ma famille", "عائلتي"),
  v("how-old-are-you", "how old are you?", "asking someone's age", "¿cuántos años tienes?", "quel âge as-tu ?", "كم عمرك؟"),
];

const travel: VocabItem[] = [
  v("wheres", "where's…?", "asking for a location", "¿dónde está…?", "où est… ?", "أين…؟"),
  v("the-station", "the station", "where trains/buses stop", "la estación", "la gare", "المحطة"),
  v("to-the-left", "to the left", "a direction", "a la izquierda", "à gauche", "إلى اليسار"),
  v("to-the-right", "to the right", "a direction", "a la derecha", "à droite", "إلى اليمين"),
  v("straight-ahead", "straight ahead", "a direction", "todo recto", "tout droit", "إلى الأمام مباشرة"),
  v("the-bathroom", "the bathroom", "where to wash up", "el baño", "les toilettes", "الحمام"),
  v("the-airport", "the airport", "where planes depart", "el aeropuerto", "l'aéroport", "المطار"),
  v("the-ticket", "the ticket", "what you need to board", "el billete", "le billet", "التذكرة"),
];

const numbers: VocabItem[] = [
  v("one", "one", "the number 1", "uno", "un", "واحد"),
  v("two", "two", "the number 2", "dos", "deux", "اثنان"),
  v("three", "three", "the number 3", "tres", "trois", "ثلاثة"),
  v("four", "four", "the number 4", "cuatro", "quatre", "أربعة"),
  v("five", "five", "the number 5", "cinco", "cinq", "خمسة"),
  v("how-much-is-it", "how much is it?", "asking the price", "¿cuánto cuesta?", "combien ça coûte ?", "كم سعره؟"),
  v("expensive", "expensive", "costing a lot", "caro", "cher", "غالي"),
  v("money", "money", "currency", "dinero", "l'argent", "مال"),
];

const slang: VocabItem[] = [
  v("cool", "that's cool", "expressing approval", "es genial", "c'est cool", "هذا رائع", { slang: true }),
  v("stuff", "stuff", "things, informally", "cosas", "des trucs", "أشياء", { slang: true }),
  v("dude", "dude", "informal address for a person", "tío / amigo", "mec", "صاحبي", { slang: true }),
  v("gonna", "gonna", "informal contraction of 'going to'", "voy a (informal)", "je vais (informel)", "سأقوم بـ (عامية)", { slang: true }),
  v("yeah", "yeah", "informal 'yes'", "sí (informal)", "ouais", "أيه (عامية)", { slang: true }),
  v("no-worries", "no worries", "a casual 'it's fine'", "no hay problema", "pas de soucis", "لا بأس", { slang: true }),
];

const timeWeather: VocabItem[] = [
  v("today", "today", "the current day", "hoy", "aujourd'hui", "اليوم"),
  v("tomorrow", "tomorrow", "the day after today", "mañana", "demain", "غداً"),
  v("yesterday", "yesterday", "the day before today", "ayer", "hier", "أمس"),
  v("what-time-is-it", "what time is it?", "asking for the current time", "¿qué hora es?", "quelle heure est-il ?", "كم الساعة؟"),
  v("nice-weather", "the weather is nice", "describing good weather", "hace buen tiempo", "il fait beau", "الجو جميل"),
  v("its-raining", "it's raining", "rain is falling", "está lloviendo", "il pleut", "إنها تمطر"),
  v("its-cold", "it's cold", "a low temperature", "hace frío", "il fait froid", "الجو بارد"),
  v("its-hot", "it's hot", "a high temperature", "hace calor", "il fait chaud", "الجو حار"),
];

const feelings: VocabItem[] = [
  v("im-tired", "I'm tired", "lacking energy", "estoy cansado", "je suis fatigué", "أنا متعب"),
  v("im-happy", "I'm happy", "feeling joy", "estoy feliz", "je suis content", "أنا سعيد"),
  v("im-sad", "I'm sad", "feeling down", "estoy triste", "je suis triste", "أنا حزين"),
  v("headache", "I have a headache", "head pain", "tengo dolor de cabeza", "j'ai mal à la tête", "عندي صداع"),
  v("feel-sick", "I feel sick", "feeling unwell", "me siento mal", "je me sens malade", "أشعر بالمرض"),
  v("get-well-soon", "get well soon", "a wish for recovery", "que te mejores", "bon rétablissement", "شفاك الله"),
  v("take-care", "take care", "a caring farewell", "cuídate", "prends soin de toi", "خذ بالك من نفسك"),
];

export const ENGLISH: Course = {
  target: "en",
  units: [
    {
      id: "en-u1",
      title: "Unit 1 · Foundations",
      description: "Greetings, food, and family.",
      skills: [
        { id: "en-basics", title: "Basics", blurb: "Greetings & essentials", icon: "Sparkles", color: "#FB7427", minLevel: "beginner", items: basics },
        { id: "en-food", title: "Food", blurb: "Café & table talk", icon: "Utensils", color: "#F59E0B", minLevel: "beginner", items: food },
        { id: "en-family", title: "Family & People", blurb: "Talk about who's who", icon: "Users", color: "#EA580C", minLevel: "beginner", items: family },
      ],
    },
    {
      id: "en-u2",
      title: "Unit 2 · Out in the World",
      description: "Navigate, count, and shop.",
      skills: [
        { id: "en-travel", title: "Getting Around", blurb: "Directions & transport", icon: "MapPin", color: "#FB7427", minLevel: "intermediate", items: travel },
        { id: "en-numbers", title: "Numbers & Prices", blurb: "Count and pay", icon: "ShoppingBag", color: "#F59E0B", minLevel: "beginner", items: numbers },
        { id: "en-slang", title: "Real Talk: Slang", blurb: "How locals actually speak", icon: "MessageSquareText", color: "#C2410C", minLevel: "advanced", slang: true, items: slang },
      ],
    },
    {
      id: "en-u3",
      title: "Unit 3 · Everyday Life",
      description: "Talk about time, weather, and how you feel.",
      skills: [
        { id: "en-time-weather", title: "Time & Weather", blurb: "Today, tomorrow, and the forecast", icon: "Clock", color: "#F59E0B", minLevel: "beginner", items: timeWeather },
        { id: "en-feelings", title: "Feelings & Health", blurb: "How you're doing, for real", icon: "Smile", color: "#EA580C", minLevel: "intermediate", items: feelings },
      ],
    },
  ],
};
