import type { Course, VocabItem } from "@/lib/types";

// German course. Glosses in en/es (others fall back to English).
const v = (id: string, term: string, en: string, es: string, extra?: { slang?: boolean }): VocabItem => ({
  id: `de:${id}`,
  term,
  gloss: { en, es },
  ...extra,
});

const basics: VocabItem[] = [
  v("hallo", "hallo", "hello", "hola"),
  v("guten-morgen", "guten Morgen", "good morning", "buenos días"),
  v("danke", "danke", "thank you", "gracias"),
  v("bitte", "bitte", "please / you're welcome", "por favor / de nada"),
  v("tschuss", "tschüss", "bye", "adiós"),
  v("ja", "ja", "yes", "sí"),
  v("nein", "nein", "no", "no"),
  v("entschuldigung", "Entschuldigung", "sorry / excuse me", "perdón"),
  v("gute-nacht", "gute Nacht", "good night", "buenas noches"),
  v("wie-gehts", "wie geht's?", "how are you?", "¿cómo estás?"),
  v("mir-gehts-gut", "mir geht's gut", "I'm fine", "estoy bien"),
];

const food: VocabItem[] = [
  v("wasser", "das Wasser", "water", "agua"),
  v("kaffee", "der Kaffee", "coffee", "café"),
  v("brot", "das Brot", "bread", "pan"),
  v("bier", "das Bier", "beer", "cerveza"),
  v("die-rechnung", "die Rechnung", "the bill", "la cuenta"),
  v("ich-habe-hunger", "ich habe Hunger", "I'm hungry", "tengo hambre"),
  v("die-karte", "die Speisekarte", "the menu", "el menú"),
  v("lecker", "es ist lecker", "it's delicious", "está delicioso"),
  v("fruhstuck", "das Frühstück", "breakfast", "el desayuno"),
];

const family: VocabItem[] = [
  v("mutter", "die Mutter", "mother", "madre"),
  v("vater", "der Vater", "father", "padre"),
  v("bruder", "der Bruder", "brother", "hermano"),
  v("schwester", "die Schwester", "sister", "hermana"),
  v("freund", "der Freund", "friend", "amigo"),
  v("meine-familie", "meine Familie", "my family", "mi familia"),
  v("wie-alt", "wie alt bist du?", "how old are you?", "¿cuántos años tienes?"),
];

const travel: VocabItem[] = [
  v("wo-ist", "wo ist…?", "where is…?", "¿dónde está…?"),
  v("bahnhof", "der Bahnhof", "the station", "la estación"),
  v("links", "nach links", "to the left", "a la izquierda"),
  v("rechts", "nach rechts", "to the right", "a la derecha"),
  v("geradeaus", "geradeaus", "straight ahead", "todo recto"),
  v("toilette", "die Toilette", "the bathroom", "el baño"),
  v("flughafen", "der Flughafen", "the airport", "el aeropuerto"),
  v("fahrkarte", "die Fahrkarte", "the ticket", "el billete"),
];

const numbers: VocabItem[] = [
  v("eins", "eins", "one", "uno"),
  v("zwei", "zwei", "two", "dos"),
  v("drei", "drei", "three", "tres"),
  v("vier", "vier", "four", "cuatro"),
  v("funf", "fünf", "five", "cinco"),
  v("wie-viel", "wie viel kostet das?", "how much is it?", "¿cuánto cuesta?"),
  v("teuer", "teuer", "expensive", "caro"),
  v("geld", "das Geld", "money", "dinero"),
];

const slang: VocabItem[] = [
  v("geil", "geil", "awesome / cool (informal)", "genial (informal)", { slang: true }),
  v("krass", "krass", "crazy / wow", "increíble / fuerte", { slang: true }),
  v("quatsch", "Quatsch!", "nonsense!", "¡tonterías!", { slang: true }),
  v("alter", "Alter!", "dude!", "¡tío!", { slang: true }),
  v("na", "na?", "hey, what's up?", "¿qué tal?", { slang: true }),
  v("bock", "ich habe Bock", "I'm up for it", "me apetece", { slang: true }),
];

export const GERMAN: Course = {
  target: "de",
  units: [
    {
      id: "de-u1",
      title: "Unit 1 · Foundations",
      description: "Greetings, food, and family.",
      skills: [
        { id: "de-basics", title: "Basics", blurb: "Greetings & essentials", icon: "Sparkles", color: "#FB7427", minLevel: "beginner", items: basics },
        { id: "de-food", title: "Food", blurb: "Café & table talk", icon: "Utensils", color: "#F59E0B", minLevel: "beginner", items: food },
        { id: "de-family", title: "Family & People", blurb: "Talk about who's who", icon: "Users", color: "#EA580C", minLevel: "beginner", items: family },
      ],
    },
    {
      id: "de-u2",
      title: "Unit 2 · Out in the World",
      description: "Navigate, count, and shop.",
      skills: [
        { id: "de-travel", title: "Getting Around", blurb: "Directions & transport", icon: "MapPin", color: "#FB7427", minLevel: "intermediate", items: travel },
        { id: "de-numbers", title: "Numbers & Prices", blurb: "Count and pay", icon: "ShoppingBag", color: "#F59E0B", minLevel: "beginner", items: numbers },
        { id: "de-slang", title: "Real Talk: Slang", blurb: "How locals actually speak", icon: "MessageSquareText", color: "#C2410C", minLevel: "advanced", slang: true, items: slang },
      ],
    },
  ],
};
