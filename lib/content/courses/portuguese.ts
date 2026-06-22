import type { Course, VocabItem } from "@/lib/types";

// Portuguese (Brazilian) course. Glosses in en/es (others fall back to English).
const v = (id: string, term: string, en: string, es: string, extra?: { slang?: boolean }): VocabItem => ({
  id: `pt:${id}`,
  term,
  gloss: { en, es },
  ...extra,
});

const basics: VocabItem[] = [
  v("ola", "olá", "hello", "hola"),
  v("bom-dia", "bom dia", "good morning", "buenos días"),
  v("obrigado", "obrigado", "thank you", "gracias"),
  v("por-favor", "por favor", "please", "por favor"),
  v("de-nada", "de nada", "you're welcome", "de nada"),
  v("tchau", "tchau", "bye", "adiós"),
  v("sim", "sim", "yes", "sí"),
  v("nao", "não", "no", "no"),
  v("desculpa", "desculpa", "sorry / excuse me", "perdón"),
  v("boa-noite", "boa noite", "good night", "buenas noches"),
  v("tudo-bem", "tudo bem?", "how are you? / all good?", "¿qué tal?"),
  v("estou-bem", "estou bem", "I'm fine", "estoy bien"),
];

const food: VocabItem[] = [
  v("agua", "a água", "water", "agua"),
  v("cafe", "o café", "coffee", "café"),
  v("pao", "o pão", "bread", "pan"),
  v("cerveja", "a cerveja", "beer", "cerveza"),
  v("a-conta", "a conta", "the bill", "la cuenta"),
  v("estou-com-fome", "estou com fome", "I'm hungry", "tengo hambre"),
  v("o-cardapio", "o cardápio", "the menu", "el menú"),
  v("delicioso", "está delicioso", "it's delicious", "está delicioso"),
  v("cafe-da-manha", "o café da manhã", "breakfast", "el desayuno"),
];

const family: VocabItem[] = [
  v("mae", "a mãe", "mother", "madre"),
  v("pai", "o pai", "father", "padre"),
  v("irmao", "o irmão", "brother", "hermano"),
  v("irma", "a irmã", "sister", "hermana"),
  v("amigo", "o amigo", "friend", "amigo"),
  v("minha-familia", "minha família", "my family", "mi familia"),
  v("quantos-anos", "quantos anos você tem?", "how old are you?", "¿cuántos años tienes?"),
];

const travel: VocabItem[] = [
  v("onde-esta", "onde está…?", "where is…?", "¿dónde está…?"),
  v("estacao", "a estação", "the station", "la estación"),
  v("esquerda", "à esquerda", "to the left", "a la izquierda"),
  v("direita", "à direita", "to the right", "a la derecha"),
  v("reto", "sempre reto", "straight ahead", "todo recto"),
  v("banheiro", "o banheiro", "the bathroom", "el baño"),
  v("aeroporto", "o aeroporto", "the airport", "el aeropuerto"),
  v("passagem", "a passagem", "the ticket", "el billete"),
];

const numbers: VocabItem[] = [
  v("um", "um", "one", "uno"),
  v("dois", "dois", "two", "dos"),
  v("tres", "três", "three", "tres"),
  v("quatro", "quatro", "four", "cuatro"),
  v("cinco", "cinco", "five", "cinco"),
  v("quanto-custa", "quanto custa?", "how much is it?", "¿cuánto cuesta?"),
  v("caro", "caro", "expensive", "caro"),
  v("dinheiro", "o dinheiro", "money", "dinero"),
];

const slang: VocabItem[] = [
  v("legal", "legal", "cool / nice", "genial / chévere", { slang: true }),
  v("cara", "cara", "dude / guy", "tío / tipo", { slang: true }),
  v("beleza", "beleza?", "all good? / cool", "¿todo bien? / vale", { slang: true }),
  v("nossa", "nossa!", "wow!", "¡guau!", { slang: true }),
  v("valeu", "valeu", "thanks! (informal)", "¡gracias! (informal)", { slang: true }),
  v("massa", "que massa!", "how cool!", "¡qué guay!", { slang: true }),
];

export const PORTUGUESE: Course = {
  target: "pt",
  units: [
    {
      id: "pt-u1",
      title: "Unit 1 · Foundations",
      description: "Greetings, food, and family.",
      skills: [
        { id: "pt-basics", title: "Basics", blurb: "Greetings & essentials", icon: "Sparkles", color: "#FB7427", minLevel: "beginner", items: basics },
        { id: "pt-food", title: "Food", blurb: "Café & table talk", icon: "Utensils", color: "#F59E0B", minLevel: "beginner", items: food },
        { id: "pt-family", title: "Family & People", blurb: "Talk about who's who", icon: "Users", color: "#EA580C", minLevel: "beginner", items: family },
      ],
    },
    {
      id: "pt-u2",
      title: "Unit 2 · Out in the World",
      description: "Navigate, count, and shop.",
      skills: [
        { id: "pt-travel", title: "Getting Around", blurb: "Directions & transport", icon: "MapPin", color: "#FB7427", minLevel: "intermediate", items: travel },
        { id: "pt-numbers", title: "Numbers & Prices", blurb: "Count and pay", icon: "ShoppingBag", color: "#F59E0B", minLevel: "beginner", items: numbers },
        { id: "pt-slang", title: "Real Talk: Slang", blurb: "How locals actually speak", icon: "MessageSquareText", color: "#C2410C", minLevel: "advanced", slang: true, items: slang },
      ],
    },
  ],
};
