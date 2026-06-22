import type { Course, VocabItem } from "@/lib/types";

// Spanish course. Glosses provided in en/fr/de (others fall back to English).
// Lessons & exercises are generated from these items per the learner's language.

const v = (
  id: string,
  term: string,
  en: string,
  fr: string,
  de: string,
  extra?: { roman?: string; slang?: boolean }
): VocabItem => ({ id: `es:${id}`, term, gloss: { en, fr, de }, ...extra });

const basics: VocabItem[] = [
  v("hola", "hola", "hello", "bonjour", "hallo"),
  v("gracias", "gracias", "thank you", "merci", "danke"),
  v("buenos-dias", "buenos días", "good morning", "bonjour (matin)", "guten Morgen"),
  v("por-favor", "por favor", "please", "s'il te plaît", "bitte"),
  v("de-nada", "de nada", "you're welcome", "de rien", "gern geschehen"),
  v("adios", "adiós", "goodbye", "au revoir", "tschüss"),
  v("si", "sí", "yes", "oui", "ja"),
  v("no", "no", "no", "non", "nein"),
  v("perdon", "perdón", "sorry / excuse me", "pardon", "Entschuldigung"),
  v("buenas-noches", "buenas noches", "good night", "bonne nuit", "gute Nacht"),
  v("hasta-luego", "hasta luego", "see you later", "à plus tard", "bis später"),
  v("mucho-gusto", "mucho gusto", "nice to meet you", "enchanté", "freut mich"),
  v("como-estas", "¿cómo estás?", "how are you?", "comment vas-tu ?", "wie geht's?"),
  v("bien", "estoy bien", "I'm fine", "je vais bien", "mir geht's gut"),
];

const food: VocabItem[] = [
  v("agua", "agua", "water", "eau", "Wasser"),
  v("cafe", "café", "coffee", "café", "Kaffee"),
  v("pan", "pan", "bread", "pain", "Brot"),
  v("la-cuenta", "la cuenta", "the bill", "l'addition", "die Rechnung"),
  v("tengo-hambre", "tengo hambre", "I'm hungry", "j'ai faim", "ich habe Hunger"),
  v("el-menu", "el menú", "the menu", "le menu", "die Speisekarte"),
  v("delicioso", "está delicioso", "it's delicious", "c'est délicieux", "es ist köstlich"),
  v("desayuno", "el desayuno", "breakfast", "le petit-déjeuner", "Frühstück"),
  v("almuerzo", "el almuerzo", "lunch", "le déjeuner", "Mittagessen"),
  v("cena", "la cena", "dinner", "le dîner", "Abendessen"),
  v("vino", "vino", "wine", "vin", "Wein"),
  v("cerveza", "cerveza", "beer", "bière", "Bier"),
];

const family: VocabItem[] = [
  v("madre", "madre", "mother", "mère", "Mutter"),
  v("padre", "padre", "father", "père", "Vater"),
  v("hermano", "hermano", "brother", "frère", "Bruder"),
  v("hermana", "hermana", "sister", "sœur", "Schwester"),
  v("hijo", "hijo", "son", "fils", "Sohn"),
  v("hija", "hija", "daughter", "fille", "Tochter"),
  v("amigo", "amigo", "friend", "ami", "Freund"),
  v("mi-familia", "mi familia", "my family", "ma famille", "meine Familie"),
  v("simpatica", "simpático", "nice / friendly", "sympathique", "nett"),
  v("cuantos-anos", "¿cuántos años tienes?", "how old are you?", "quel âge as-tu ?", "wie alt bist du?"),
];

const travel: VocabItem[] = [
  v("donde-esta", "¿dónde está…?", "where is…?", "où est… ?", "wo ist…?"),
  v("estacion", "la estación", "the station", "la gare", "der Bahnhof"),
  v("izquierda", "a la izquierda", "to the left", "à gauche", "nach links"),
  v("derecha", "a la derecha", "to the right", "à droite", "nach rechts"),
  v("recto", "todo recto", "straight ahead", "tout droit", "geradeaus"),
  v("el-bano", "el baño", "the bathroom", "les toilettes", "die Toilette"),
  v("necesito-taxi", "necesito un taxi", "I need a taxi", "j'ai besoin d'un taxi", "ich brauche ein Taxi"),
  v("aeropuerto", "el aeropuerto", "the airport", "l'aéroport", "der Flughafen"),
  v("billete", "el billete", "the ticket", "le billet", "die Fahrkarte"),
];

const shopping: VocabItem[] = [
  v("cuanto-cuesta", "¿cuánto cuesta?", "how much is it?", "combien ça coûte ?", "wie viel kostet das?"),
  v("muy-caro", "muy caro", "very expensive", "très cher", "sehr teuer"),
  v("barato", "barato", "cheap", "bon marché", "billig"),
  v("camisa", "la camisa", "shirt", "la chemise", "das Hemd"),
  v("zapatos", "los zapatos", "shoes", "les chaussures", "die Schuhe"),
  v("la-talla", "la talla", "the size", "la taille", "die Größe"),
  v("pagar-tarjeta", "pagar con tarjeta", "to pay by card", "payer par carte", "mit Karte zahlen"),
  v("dinero", "el dinero", "money", "l'argent", "das Geld"),
];

const past: VocabItem[] = [
  v("comi", "comí", "I ate", "j'ai mangé", "ich aß"),
  v("fui", "fui", "I went", "je suis allé", "ich ging"),
  v("vimos", "vimos", "we saw", "nous avons vu", "wir sahen"),
  v("trabaje", "trabajé", "I worked", "j'ai travaillé", "ich arbeitete"),
  v("compro", "compró", "she/he bought", "il/elle a acheté", "er/sie kaufte"),
  v("ayer", "ayer", "yesterday", "hier", "gestern"),
  v("lo-pasamos", "lo pasamos genial", "we had a great time", "on a passé un super moment", "wir hatten eine tolle Zeit"),
];

const daily: VocabItem[] = [
  v("me-despierto", "me despierto", "I wake up", "je me réveille", "ich wache auf"),
  v("me-levanto", "me levanto", "I get up", "je me lève", "ich stehe auf"),
  v("trabajo-casa", "trabajo desde casa", "I work from home", "je travaille à la maison", "ich arbeite von zu Hause"),
  v("todos-los-dias", "todos los días", "every day", "tous les jours", "jeden Tag"),
  v("ducharse", "ducharse", "to shower", "se doucher", "duschen"),
  v("dormir", "dormir", "to sleep", "dormir", "schlafen"),
  v("llego-tarde", "llego tarde", "I arrive late", "j'arrive en retard", "ich komme zu spät"),
  v("voy-a-dormir", "me voy a dormir", "I'm going to sleep", "je vais dormir", "ich gehe schlafen"),
];

const feelings: VocabItem[] = [
  v("feliz", "feliz", "happy", "heureux", "glücklich"),
  v("triste", "triste", "sad", "triste", "traurig"),
  v("cansado", "cansado", "tired", "fatigué", "müde"),
  v("enojado", "enojado", "angry", "en colère", "wütend"),
  v("nervioso", "nervioso", "nervous", "nerveux", "nervös"),
  v("creo-que", "creo que…", "I think that…", "je pense que…", "ich glaube, dass…"),
  v("me-gusta", "me gusta", "I like it", "j'aime", "es gefällt mir"),
];

const future: VocabItem[] = [
  v("voy-a-viajar", "voy a viajar", "I'm going to travel", "je vais voyager", "ich werde reisen"),
  v("te-llamare", "te llamaré", "I'll call you", "je t'appellerai", "ich rufe dich an"),
  v("manana", "mañana", "tomorrow", "demain", "morgen"),
  v("iremos", "iremos", "we'll go", "nous irons", "wir werden gehen"),
  v("el-futuro", "el futuro", "the future", "le futur", "die Zukunft"),
];

const subjunctive: VocabItem[] = [
  v("espero-que", "espero que…", "I hope that…", "j'espère que…", "ich hoffe, dass…"),
  v("ojala", "ojalá", "hopefully / I wish", "j'espère / si seulement", "hoffentlich"),
  v("quiero-que", "quiero que…", "I want you to…", "je veux que…", "ich will, dass…"),
  v("es-importante-que", "es importante que…", "it's important that…", "il est important que…", "es ist wichtig, dass…"),
  v("cuando-sea", "cuando sea mayor", "when I'm older", "quand je serai plus grand", "wenn ich älter bin"),
];

const slangStreet: VocabItem[] = [
  v("que-guay", "¡qué guay!", "how cool! (Spain)", "trop cool ! (Espagne)", "wie cool! (Spanien)", { slang: true }),
  v("chido", "chido", "cool / awesome (Mexico)", "cool (Mexique)", "cool (Mexiko)", { slang: true }),
  v("tio", "tío / tía", "dude / mate (Spain)", "mec / meuf (Espagne)", "Kumpel (Spanien)", { slang: true }),
  v("que-onda", "¿qué onda?", "what's up? (Latam)", "quoi de neuf ? (Am. latine)", "was geht? (Lateinam.)", { slang: true }),
  v("mola", "mola", "it's cool (Spain)", "c'est cool (Espagne)", "das ist cool (Spanien)", { slang: true }),
  v("no-mames", "no mames", "no way! (very informal, MX)", "sérieux ?! (très familier, MX)", "krass! (sehr salopp, MX)", { slang: true }),
  v("sin-un-duro", "estar sin un duro", "to be broke (Spain)", "être fauché (Espagne)", "pleite sein (Spanien)", { slang: true }),
];

const slangIdioms: VocabItem[] = [
  v("tomar-pelo", "tomar el pelo", "to pull someone's leg", "faire marcher quelqu'un", "jemanden auf den Arm nehmen", { slang: true }),
  v("buena-onda", "buena onda", "good vibe / nice person", "bonne ambiance / sympa", "gute Vibes / nette Person", { slang: true }),
  v("estar-nubes", "estar en las nubes", "to be daydreaming", "être dans la lune", "in Gedanken sein", { slang: true }),
  v("costar-ojo", "costar un ojo de la cara", "to cost an arm and a leg", "coûter les yeux de la tête", "ein Vermögen kosten", { slang: true }),
  v("ponerse-pilas", "ponerse las pilas", "to get one's act together", "se bouger", "sich am Riemen reißen", { slang: true }),
  v("pan-comido", "ser pan comido", "to be a piece of cake", "être du gâteau", "ein Kinderspiel sein", { slang: true }),
];

const slangText: VocabItem[] = [
  v("tqm", "tqm", "love you lots (txt)", "je t'aime fort (sms)", "hab dich lieb (SMS)", { slang: true }),
  v("finde", "el finde", "the weekend", "le week-end", "das Wochenende", { slang: true }),
  v("porfa", "porfa", "please (casual)", "stp (familier)", "bitte (locker)", { slang: true }),
  v("jaja", "jajaja", "hahaha", "hahaha", "hahaha", { slang: true }),
  v("quedamos", "¿quedamos?", "shall we meet up?", "on se voit ?", "treffen wir uns?", { slang: true }),
];

export const SPANISH: Course = {
  target: "es",
  units: [
    {
      id: "es-u1",
      title: "Unit 1 · Foundations",
      description: "Greetings, food, and family.",
      skills: [
        { id: "es-basics", title: "Basics", blurb: "Greetings & essentials", icon: "Sparkles", color: "#FB7427", minLevel: "beginner", items: basics },
        { id: "es-food", title: "Food", blurb: "Order like you mean it", icon: "Utensils", color: "#F59E0B", minLevel: "beginner", items: food },
        { id: "es-family", title: "Family & People", blurb: "Talk about who's who", icon: "Users", color: "#EA580C", minLevel: "beginner", items: family },
      ],
    },
    {
      id: "es-u2",
      title: "Unit 2 · Out in the World",
      description: "Navigate, shop, and talk about the past.",
      skills: [
        { id: "es-travel", title: "Getting Around", blurb: "Directions & transport", icon: "MapPin", color: "#FB7427", minLevel: "intermediate", items: travel },
        { id: "es-shopping", title: "Shopping", blurb: "Prices, sizes & paying", icon: "ShoppingBag", color: "#F59E0B", minLevel: "intermediate", items: shopping },
        { id: "es-past", title: "Past Tense", blurb: "Talk about yesterday", icon: "Clock", color: "#C2410C", minLevel: "intermediate", items: past },
      ],
    },
    {
      id: "es-u3",
      title: "Unit 3 · Everyday Life",
      description: "Routines, feelings, and plans.",
      skills: [
        { id: "es-daily", title: "Daily Life", blurb: "Routines in the present", icon: "Coffee", color: "#F59E0B", minLevel: "intermediate", items: daily },
        { id: "es-feelings", title: "Feelings & Opinions", blurb: "Say how you feel", icon: "Smile", color: "#FB7427", minLevel: "intermediate", items: feelings },
        { id: "es-future", title: "Making Plans", blurb: "Talk about the future", icon: "Rocket", color: "#EA580C", minLevel: "intermediate", items: future },
      ],
    },
    {
      id: "es-u4",
      title: "Unit 4 · Real Talk",
      description: "Advanced grammar plus how people actually speak.",
      skills: [
        { id: "es-subjunctive", title: "Subjunctive", blurb: "Wishes, doubts & emotion", icon: "Brain", color: "#C2410C", minLevel: "advanced", items: subjunctive },
        { id: "es-slang-street", title: "Real Talk: Street", blurb: "How people actually speak", icon: "MessageSquareText", color: "#EA580C", minLevel: "advanced", slang: true, items: slangStreet },
        { id: "es-slang-idioms", title: "Real Talk: Idioms", blurb: "Sound like a native", icon: "Quote", color: "#C2410C", minLevel: "advanced", slang: true, items: slangIdioms },
        { id: "es-slang-text", title: "Real Talk: Texting", blurb: "Chat like a local", icon: "Smartphone", color: "#9A3412", minLevel: "advanced", slang: true, items: slangText },
      ],
    },
  ],
};
