import type { Course, VocabItem } from "@/lib/types";

// French course. Glosses in en/es (others fall back to English).
const v = (id: string, term: string, en: string, es: string, extra?: { slang?: boolean }): VocabItem => ({
  id: `fr:${id}`,
  term,
  gloss: { en, es },
  ...extra,
});

const basics: VocabItem[] = [
  v("bonjour", "bonjour", "hello / good morning", "hola / buenos días"),
  v("merci", "merci", "thank you", "gracias"),
  v("sil-vous-plait", "s'il vous plaît", "please", "por favor"),
  v("de-rien", "de rien", "you're welcome", "de nada"),
  v("au-revoir", "au revoir", "goodbye", "adiós"),
  v("oui", "oui", "yes", "sí"),
  v("non", "non", "no", "no"),
  v("pardon", "pardon", "sorry / excuse me", "perdón"),
  v("bonne-nuit", "bonne nuit", "good night", "buenas noches"),
  v("comment-ca-va", "comment ça va ?", "how are you?", "¿cómo estás?"),
  v("ca-va-bien", "ça va bien", "I'm fine", "estoy bien"),
  v("enchante", "enchanté", "nice to meet you", "mucho gusto"),
];

const food: VocabItem[] = [
  v("eau", "l'eau", "water", "agua"),
  v("cafe", "le café", "coffee", "café"),
  v("pain", "le pain", "bread", "pan"),
  v("fromage", "le fromage", "cheese", "queso"),
  v("addition", "l'addition", "the bill", "la cuenta"),
  v("jai-faim", "j'ai faim", "I'm hungry", "tengo hambre"),
  v("le-menu", "le menu", "the menu", "el menú"),
  v("delicieux", "c'est délicieux", "it's delicious", "está delicioso"),
  v("petit-dejeuner", "le petit-déjeuner", "breakfast", "el desayuno"),
  v("vin", "le vin", "wine", "vino"),
];

const family: VocabItem[] = [
  v("mere", "la mère", "mother", "madre"),
  v("pere", "le père", "father", "padre"),
  v("frere", "le frère", "brother", "hermano"),
  v("soeur", "la sœur", "sister", "hermana"),
  v("ami", "l'ami", "friend", "amigo"),
  v("ma-famille", "ma famille", "my family", "mi familia"),
  v("quel-age", "quel âge as-tu ?", "how old are you?", "¿cuántos años tienes?"),
];

const travel: VocabItem[] = [
  v("ou-est", "où est… ?", "where is…?", "¿dónde está…?"),
  v("gare", "la gare", "the station", "la estación"),
  v("a-gauche", "à gauche", "to the left", "a la izquierda"),
  v("a-droite", "à droite", "to the right", "a la derecha"),
  v("tout-droit", "tout droit", "straight ahead", "todo recto"),
  v("toilettes", "les toilettes", "the bathroom", "el baño"),
  v("aeroport", "l'aéroport", "the airport", "el aeropuerto"),
  v("billet", "le billet", "the ticket", "el billete"),
];

const numbers: VocabItem[] = [
  v("un", "un", "one", "uno"),
  v("deux", "deux", "two", "dos"),
  v("trois", "trois", "three", "tres"),
  v("quatre", "quatre", "four", "cuatro"),
  v("cinq", "cinq", "five", "cinco"),
  v("combien", "combien ça coûte ?", "how much is it?", "¿cuánto cuesta?"),
  v("cher", "cher", "expensive", "caro"),
  v("argent", "l'argent", "money", "dinero"),
];

const slang: VocabItem[] = [
  v("cool", "c'est cool", "it's cool", "es genial", { slang: true }),
  v("truc", "le truc", "the thing / stuff", "la cosa", { slang: true }),
  v("mec", "le mec", "guy / dude", "el tipo", { slang: true }),
  v("bouffer", "bouffer", "to eat (slang)", "comer (jerga)", { slang: true }),
  v("ouais", "ouais", "yeah", "sí (informal)", { slang: true }),
  v("ca-marche", "ça marche", "works for me / okay", "vale / de acuerdo", { slang: true }),
];

const timeWeather: VocabItem[] = [
  v("aujourdhui", "aujourd'hui", "today", "hoy"),
  v("demain", "demain", "tomorrow", "mañana"),
  v("hier", "hier", "yesterday", "ayer"),
  v("quelle-heure", "quelle heure est-il ?", "what time is it?", "¿qué hora es?"),
  v("il-fait-beau", "il fait beau", "the weather is nice", "hace buen tiempo"),
  v("il-pleut", "il pleut", "it's raining", "está lloviendo"),
  v("il-fait-froid", "il fait froid", "it's cold", "hace frío"),
  v("il-fait-chaud", "il fait chaud", "it's hot", "hace calor"),
];

const feelings: VocabItem[] = [
  v("fatigue", "je suis fatigué", "I'm tired", "estoy cansado"),
  v("content", "je suis content", "I'm happy", "estoy feliz"),
  v("triste", "je suis triste", "I'm sad", "estoy triste"),
  v("mal-tete", "j'ai mal à la tête", "I have a headache", "tengo dolor de cabeza"),
  v("malade", "je me sens malade", "I feel sick", "me siento mal"),
  v("retablissement", "bon rétablissement", "get well soon", "que te mejores"),
  v("prends-soin", "prends soin de toi", "take care", "cuídate"),
];

export const FRENCH: Course = {
  target: "fr",
  units: [
    {
      id: "fr-u1",
      title: "Unit 1 · Foundations",
      description: "Greetings, food, and family.",
      skills: [
        { id: "fr-basics", title: "Basics", blurb: "Greetings & essentials", icon: "Sparkles", color: "#FB7427", minLevel: "beginner", items: basics },
        { id: "fr-food", title: "Food", blurb: "Café & table talk", icon: "Utensils", color: "#F59E0B", minLevel: "beginner", items: food },
        { id: "fr-family", title: "Family & People", blurb: "Talk about who's who", icon: "Users", color: "#EA580C", minLevel: "beginner", items: family },
      ],
    },
    {
      id: "fr-u2",
      title: "Unit 2 · Out in the World",
      description: "Navigate, count, and shop.",
      skills: [
        { id: "fr-travel", title: "Getting Around", blurb: "Directions & transport", icon: "MapPin", color: "#FB7427", minLevel: "intermediate", items: travel },
        { id: "fr-numbers", title: "Numbers & Prices", blurb: "Count and pay", icon: "ShoppingBag", color: "#F59E0B", minLevel: "beginner", items: numbers },
        { id: "fr-slang", title: "Real Talk: Slang", blurb: "How locals actually speak", icon: "MessageSquareText", color: "#C2410C", minLevel: "advanced", slang: true, items: slang },
      ],
    },
    {
      id: "fr-u3",
      title: "Unit 3 · Everyday Life",
      description: "Talk about time, weather, and how you feel.",
      skills: [
        { id: "fr-time-weather", title: "Time & Weather", blurb: "Today, tomorrow, and the forecast", icon: "Clock", color: "#F59E0B", minLevel: "beginner", items: timeWeather },
        { id: "fr-feelings", title: "Feelings & Health", blurb: "How you're doing, for real", icon: "Smile", color: "#EA580C", minLevel: "intermediate", items: feelings },
      ],
    },
  ],
};
