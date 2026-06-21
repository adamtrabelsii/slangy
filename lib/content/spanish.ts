import type { Course, Skill } from "@/lib/types";

// Spanish-for-English-speakers course content.
// Beginner → Intermediate → Advanced. "Real talk" slang skills are advanced-gated.
//
// NOTE: every exercise's `itemId` must have a matching entry in lib/content/vocab.ts
// so the SRS engine can build a proper review card (es ↔ en) for it.

const basics: Skill = {
  id: "basics",
  title: "Basics",
  blurb: "Greetings & essentials",
  icon: "Sparkles",
  color: "#3ccd7c",
  minLevel: "beginner",
  lessons: [
    {
      id: "basics-1",
      exercises: [
        {
          id: "b1e1",
          kind: "multipleChoice",
          itemId: "hola",
          prompt: "How do you say “hello”?",
          choices: ["hola", "adiós", "gracias", "perdón"],
          answer: "hola",
        },
        {
          id: "b1e2",
          kind: "multipleChoice",
          itemId: "gracias",
          prompt: "How do you say “thank you”?",
          choices: ["por favor", "gracias", "hola", "sí"],
          answer: "gracias",
        },
        {
          id: "b1e3",
          kind: "listen",
          itemId: "buenos-dias",
          audio: "buenos días",
          choices: ["buenos días", "buenas noches", "hasta luego"],
          answer: "buenos días",
          translation: "good morning",
        },
        {
          id: "b1e4",
          kind: "wordBank",
          itemId: "me-llamo",
          prompt: "“My name is Ana.”",
          answer: ["Me", "llamo", "Ana"],
          distractors: ["soy", "tú", "es"],
        },
        {
          id: "b1e5",
          kind: "translate",
          itemId: "por-favor",
          prompt: "please",
          direction: "en-es",
          answers: ["por favor"],
        },
      ],
    },
    {
      id: "basics-2",
      exercises: [
        {
          id: "b2e1",
          kind: "match",
          itemId: "match-greetings",
          pairs: [
            { es: "adiós", en: "goodbye" },
            { es: "sí", en: "yes" },
            { es: "no", en: "no" },
            { es: "perdón", en: "sorry" },
          ],
        },
        {
          id: "b2e2",
          kind: "translate",
          itemId: "como-estas",
          prompt: "¿Cómo estás?",
          direction: "es-en",
          answers: ["how are you", "how are you?"],
        },
        {
          id: "b2e3",
          kind: "multipleChoice",
          itemId: "bien",
          prompt: "“I'm fine, thanks.”",
          choices: ["Estoy bien, gracias.", "Tengo hambre.", "No sé.", "Hasta mañana."],
          answer: "Estoy bien, gracias.",
        },
      ],
    },
    {
      id: "basics-3",
      exercises: [
        {
          id: "b3e1",
          kind: "multipleChoice",
          itemId: "de-nada",
          prompt: "How do you say “you're welcome”?",
          choices: ["de nada", "lo siento", "con permiso", "claro"],
          answer: "de nada",
        },
        {
          id: "b3e2",
          kind: "listen",
          itemId: "tres",
          audio: "tres",
          choices: ["tres", "trece", "treinta"],
          answer: "tres",
          translation: "three",
        },
        {
          id: "b3e3",
          kind: "wordBank",
          itemId: "mucho-gusto",
          prompt: "“Nice to meet you.”",
          answer: ["Mucho", "gusto"],
          distractors: ["por", "bien", "tú"],
        },
        {
          id: "b3e4",
          kind: "translate",
          itemId: "buenas-noches",
          prompt: "good night",
          direction: "en-es",
          answers: ["buenas noches"],
        },
        {
          id: "b3e5",
          kind: "multipleChoice",
          itemId: "hasta-luego",
          prompt: "“See you later.”",
          choices: ["Hasta luego.", "Buenos días.", "De nada.", "Tengo sueño."],
          answer: "Hasta luego.",
        },
      ],
    },
  ],
};

const food: Skill = {
  id: "food",
  title: "Food",
  blurb: "Order like you mean it",
  icon: "Utensils",
  color: "#f59e0b",
  minLevel: "beginner",
  lessons: [
    {
      id: "food-1",
      exercises: [
        {
          id: "f1e1",
          kind: "multipleChoice",
          itemId: "agua",
          prompt: "How do you say “water”?",
          choices: ["agua", "pan", "leche", "vino"],
          answer: "agua",
        },
        {
          id: "f1e2",
          kind: "wordBank",
          itemId: "quiero-cafe",
          prompt: "“I want a coffee, please.”",
          answer: ["Quiero", "un", "café", "por", "favor"],
          distractors: ["agua", "tú", "es"],
        },
        {
          id: "f1e3",
          kind: "translate",
          itemId: "la-cuenta",
          prompt: "the bill / the check",
          direction: "en-es",
          answers: ["la cuenta"],
        },
        {
          id: "f1e4",
          kind: "listen",
          itemId: "tengo-hambre",
          audio: "tengo hambre",
          choices: ["tengo hambre", "tengo sueño", "tengo frío"],
          answer: "tengo hambre",
          translation: "I'm hungry",
        },
      ],
    },
    {
      id: "food-2",
      exercises: [
        {
          id: "f2e1",
          kind: "translate",
          itemId: "el-menu",
          prompt: "The menu, please.",
          direction: "en-es",
          answers: ["el menú por favor", "la carta por favor", "el menu por favor"],
          hint: "el menú / la carta = the menu",
        },
        {
          id: "f2e2",
          kind: "multipleChoice",
          itemId: "delicioso",
          prompt: "“It's delicious!”",
          choices: ["¡Está delicioso!", "Está frío.", "No tengo hambre.", "Está caro."],
          answer: "¡Está delicioso!",
        },
        {
          id: "f2e3",
          kind: "listen",
          itemId: "la-cena",
          audio: "la cena",
          choices: ["la cena", "el desayuno", "el almuerzo"],
          answer: "la cena",
          translation: "dinner",
        },
        {
          id: "f2e4",
          kind: "wordBank",
          itemId: "soy-vegetariano",
          prompt: "“I am vegetarian.”",
          answer: ["Soy", "vegetariano"],
          distractors: ["tengo", "está", "muy"],
        },
        {
          id: "f2e5",
          kind: "match",
          itemId: "meals-match",
          pairs: [
            { es: "desayuno", en: "breakfast" },
            { es: "almuerzo", en: "lunch" },
            { es: "cena", en: "dinner" },
            { es: "postre", en: "dessert" },
          ],
        },
      ],
    },
  ],
};

const family: Skill = {
  id: "family",
  title: "Family & People",
  blurb: "Talk about who's who",
  icon: "Users",
  color: "#22d3ee",
  minLevel: "beginner",
  lessons: [
    {
      id: "family-1",
      exercises: [
        {
          id: "fa1e1",
          kind: "multipleChoice",
          itemId: "madre",
          prompt: "How do you say “mother”?",
          choices: ["madre", "padre", "hermano", "hijo"],
          answer: "madre",
        },
        {
          id: "fa1e2",
          kind: "match",
          itemId: "family-match",
          pairs: [
            { es: "madre", en: "mother" },
            { es: "padre", en: "father" },
            { es: "hermano", en: "brother" },
            { es: "hermana", en: "sister" },
          ],
        },
        {
          id: "fa1e3",
          kind: "translate",
          itemId: "tengo-hermanos",
          prompt: "I have two brothers.",
          direction: "en-es",
          answers: ["tengo dos hermanos"],
        },
        {
          id: "fa1e4",
          kind: "listen",
          itemId: "mi-familia",
          audio: "mi familia",
          choices: ["mi familia", "mi casa", "mi amigo"],
          answer: "mi familia",
          translation: "my family",
        },
      ],
    },
    {
      id: "family-2",
      exercises: [
        {
          id: "fa2e1",
          kind: "multipleChoice",
          itemId: "mi-amigo",
          prompt: "“This is my friend.”",
          choices: ["Este es mi amigo.", "Tengo un perro.", "Es mi casa.", "Soy de aquí."],
          answer: "Este es mi amigo.",
        },
        {
          id: "fa2e2",
          kind: "wordBank",
          itemId: "simpatica",
          prompt: "“My sister is very nice.”",
          answer: ["Mi", "hermana", "es", "muy", "simpática"],
          distractors: ["amigo", "tengo", "casa"],
        },
        {
          id: "fa2e3",
          kind: "translate",
          itemId: "cuantos-anos",
          prompt: "¿Cuántos años tienes?",
          direction: "es-en",
          answers: ["how old are you", "how old are you?"],
        },
      ],
    },
  ],
};

const travel: Skill = {
  id: "travel",
  title: "Getting Around",
  blurb: "Directions & transport",
  icon: "MapPin",
  color: "#38bdf8",
  minLevel: "intermediate",
  lessons: [
    {
      id: "travel-1",
      exercises: [
        {
          id: "t1e1",
          kind: "translate",
          itemId: "donde-esta",
          prompt: "Where is the station?",
          direction: "en-es",
          answers: ["dónde está la estación", "donde esta la estacion", "¿dónde está la estación?"],
          hint: "estación = station",
        },
        {
          id: "t1e2",
          kind: "multipleChoice",
          itemId: "izquierda",
          prompt: "“Turn left.”",
          choices: ["Gira a la izquierda.", "Sigue recto.", "Gira a la derecha.", "Para aquí."],
          answer: "Gira a la izquierda.",
        },
        {
          id: "t1e3",
          kind: "wordBank",
          itemId: "cuanto-cuesta",
          prompt: "“How much does the ticket cost?”",
          answer: ["¿Cuánto", "cuesta", "el", "billete?"],
          distractors: ["dónde", "cuándo", "café"],
        },
      ],
    },
    {
      id: "travel-2",
      exercises: [
        {
          id: "t2e1",
          kind: "multipleChoice",
          itemId: "el-bano",
          prompt: "“Where is the bathroom?”",
          choices: ["¿Dónde está el baño?", "¿Qué hora es?", "¿Cuánto cuesta?", "¿Cómo te llamas?"],
          answer: "¿Dónde está el baño?",
        },
        {
          id: "t2e2",
          kind: "translate",
          itemId: "necesito-taxi",
          prompt: "I need a taxi.",
          direction: "en-es",
          answers: ["necesito un taxi"],
        },
        {
          id: "t2e3",
          kind: "listen",
          itemId: "aeropuerto",
          audio: "el aeropuerto",
          choices: ["el aeropuerto", "la estación", "la parada"],
          answer: "el aeropuerto",
          translation: "the airport",
        },
        {
          id: "t2e4",
          kind: "wordBank",
          itemId: "tren-sale",
          prompt: "“The train leaves at nine.”",
          answer: ["El", "tren", "sale", "a", "las", "nueve"],
          distractors: ["llega", "coche", "ocho"],
        },
      ],
    },
  ],
};

const past: Skill = {
  id: "past-tense",
  title: "Past Tense",
  blurb: "Talk about yesterday",
  icon: "Clock",
  color: "#a78bfa",
  minLevel: "intermediate",
  lessons: [
    {
      id: "past-1",
      exercises: [
        {
          id: "p1e1",
          kind: "translate",
          itemId: "comi",
          prompt: "I ate paella yesterday.",
          direction: "en-es",
          answers: ["comí paella ayer", "ayer comí paella"],
        },
        {
          id: "p1e2",
          kind: "multipleChoice",
          itemId: "fui",
          prompt: "“I went to the beach.”",
          choices: ["Fui a la playa.", "Voy a la playa.", "Iré a la playa.", "Iba a la playa."],
          answer: "Fui a la playa.",
        },
        {
          id: "p1e3",
          kind: "wordBank",
          itemId: "vimos",
          prompt: "“We saw a great movie.”",
          answer: ["Vimos", "una", "película", "genial"],
          distractors: ["veo", "verá", "casa"],
        },
      ],
    },
    {
      id: "past-2",
      exercises: [
        {
          id: "p2e1",
          kind: "translate",
          itemId: "trabaje",
          prompt: "Yesterday I worked a lot.",
          direction: "en-es",
          answers: ["ayer trabajé mucho", "trabajé mucho ayer"],
        },
        {
          id: "p2e2",
          kind: "multipleChoice",
          itemId: "lo-pasamos",
          prompt: "“We had a great time.”",
          choices: ["Lo pasamos genial.", "Lo pasamos mal.", "Tengo prisa.", "Voy a casa."],
          answer: "Lo pasamos genial.",
        },
        {
          id: "p2e3",
          kind: "wordBank",
          itemId: "compro",
          prompt: "“She bought a new dress.”",
          answer: ["Compró", "un", "vestido", "nuevo"],
          distractors: ["compra", "comprará", "casa"],
        },
      ],
    },
  ],
};

const shopping: Skill = {
  id: "shopping",
  title: "Shopping",
  blurb: "Prices, sizes & paying",
  icon: "ShoppingBag",
  color: "#f472b6",
  minLevel: "intermediate",
  lessons: [
    {
      id: "shop-1",
      exercises: [
        {
          id: "sh1e1",
          kind: "multipleChoice",
          itemId: "cuanto-cuesta",
          prompt: "How do you ask “How much does it cost?”",
          choices: ["¿Cuánto cuesta?", "¿Qué hora es?", "¿Dónde está?", "¿Cómo te llamas?"],
          answer: "¿Cuánto cuesta?",
        },
        {
          id: "sh1e2",
          kind: "translate",
          itemId: "muy-caro",
          prompt: "It's too expensive.",
          direction: "en-es",
          answers: ["es demasiado caro", "es muy caro", "está muy caro"],
        },
        {
          id: "sh1e3",
          kind: "match",
          itemId: "clothes-match",
          pairs: [
            { es: "camisa", en: "shirt" },
            { es: "zapatos", en: "shoes" },
            { es: "pantalones", en: "pants" },
            { es: "vestido", en: "dress" },
          ],
        },
        {
          id: "sh1e4",
          kind: "listen",
          itemId: "la-talla",
          audio: "la talla",
          choices: ["la talla", "el precio", "la tienda"],
          answer: "la talla",
          translation: "the size",
        },
        {
          id: "sh1e5",
          kind: "wordBank",
          itemId: "pagar-tarjeta",
          prompt: "“Can I pay by card?”",
          answer: ["¿Puedo", "pagar", "con", "tarjeta?"],
          distractors: ["dinero", "cuánto", "compro"],
        },
      ],
    },
  ],
};

// ---- Unit 3 · Everyday Life (intermediate) -------------------------------

const daily: Skill = {
  id: "daily",
  title: "Daily Life",
  blurb: "Routines in the present",
  icon: "Coffee",
  color: "#fbbf24",
  minLevel: "intermediate",
  lessons: [
    {
      id: "daily-1",
      exercises: [
        {
          id: "d1e1",
          kind: "multipleChoice",
          itemId: "me-despierto",
          prompt: "“I wake up at seven.”",
          choices: ["Me despierto a las siete.", "Me acuesto a las siete.", "Tengo siete.", "Son las siete."],
          answer: "Me despierto a las siete.",
        },
        {
          id: "d1e2",
          kind: "translate",
          itemId: "trabajo-casa",
          prompt: "I work from home.",
          direction: "en-es",
          answers: ["trabajo desde casa", "trabajo en casa"],
        },
        {
          id: "d1e3",
          kind: "wordBank",
          itemId: "todos-los-dias",
          prompt: "“Every day I drink coffee.”",
          answer: ["Todos", "los", "días", "tomo", "café"],
          distractors: ["bebo", "ayer", "noche"],
        },
        {
          id: "d1e4",
          kind: "listen",
          itemId: "me-levanto",
          audio: "me levanto",
          choices: ["me levanto", "me lavo", "me visto"],
          answer: "me levanto",
          translation: "I get up",
        },
      ],
    },
    {
      id: "daily-2",
      exercises: [
        {
          id: "d2e1",
          kind: "match",
          itemId: "routine-match",
          pairs: [
            { es: "ducharse", en: "to shower" },
            { es: "desayunar", en: "to have breakfast" },
            { es: "dormir", en: "to sleep" },
            { es: "despertarse", en: "to wake up" },
          ],
        },
        {
          id: "d2e2",
          kind: "translate",
          itemId: "llego-tarde",
          prompt: "Siempre llego tarde.",
          direction: "es-en",
          answers: ["i always arrive late", "i always arrive late.", "i'm always late"],
        },
        {
          id: "d2e3",
          kind: "multipleChoice",
          itemId: "voy-a-dormir",
          prompt: "“I'm going to sleep.”",
          choices: ["Me voy a dormir.", "Me levanto.", "Tengo hambre.", "Voy a trabajar."],
          answer: "Me voy a dormir.",
        },
      ],
    },
  ],
};

const feelings: Skill = {
  id: "feelings",
  title: "Feelings & Opinions",
  blurb: "Say how you feel",
  icon: "Smile",
  color: "#34d399",
  minLevel: "intermediate",
  lessons: [
    {
      id: "feel-1",
      exercises: [
        {
          id: "fe1e1",
          kind: "multipleChoice",
          itemId: "estoy-feliz",
          prompt: "How do you say “I'm happy”?",
          choices: ["Estoy feliz.", "Estoy triste.", "Estoy cansado.", "Estoy enfermo."],
          answer: "Estoy feliz.",
        },
        {
          id: "fe1e2",
          kind: "match",
          itemId: "emotions-match",
          pairs: [
            { es: "feliz", en: "happy" },
            { es: "triste", en: "sad" },
            { es: "cansado", en: "tired" },
            { es: "enojado", en: "angry" },
          ],
        },
        {
          id: "fe1e3",
          kind: "translate",
          itemId: "cansado",
          prompt: "I'm a little tired.",
          direction: "en-es",
          answers: ["estoy un poco cansado", "estoy un poco cansada"],
        },
        {
          id: "fe1e4",
          kind: "wordBank",
          itemId: "creo-que",
          prompt: "“I think it's a good idea.”",
          answer: ["Creo", "que", "es", "una", "buena", "idea"],
          distractors: ["pienso", "mala", "no"],
        },
        {
          id: "fe1e5",
          kind: "listen",
          itemId: "nervioso",
          audio: "estoy nervioso",
          choices: ["estoy nervioso", "estoy contento", "estoy aburrido"],
          answer: "estoy nervioso",
          translation: "I'm nervous",
        },
      ],
    },
  ],
};

const future: Skill = {
  id: "future",
  title: "Making Plans",
  blurb: "Talk about the future",
  icon: "Rocket",
  color: "#818cf8",
  minLevel: "intermediate",
  lessons: [
    {
      id: "fut-1",
      exercises: [
        {
          id: "fu1e1",
          kind: "translate",
          itemId: "voy-a-viajar",
          prompt: "Tomorrow I'm going to travel.",
          direction: "en-es",
          answers: ["mañana voy a viajar", "voy a viajar mañana"],
        },
        {
          id: "fu1e2",
          kind: "multipleChoice",
          itemId: "te-llamare",
          prompt: "“I'll call you later.”",
          choices: ["Te llamaré más tarde.", "Te llamé ayer.", "Te llamo ahora.", "No te llamo."],
          answer: "Te llamaré más tarde.",
        },
        {
          id: "fu1e3",
          kind: "wordBank",
          itemId: "iremos",
          prompt: "“Next year we'll go to Spain.”",
          answer: ["El", "año", "que", "viene", "iremos", "a", "España"],
          distractors: ["ayer", "fuimos", "casa"],
        },
        {
          id: "fu1e4",
          kind: "listen",
          itemId: "el-futuro",
          audio: "el futuro",
          choices: ["el futuro", "el pasado", "el presente"],
          answer: "el futuro",
          translation: "the future",
        },
      ],
    },
  ],
};

// ---- Advanced + slang ("real talk") --------------------------------------

const subjunctive: Skill = {
  id: "subjunctive",
  title: "Subjunctive",
  blurb: "Wishes, doubts & emotion",
  icon: "Brain",
  color: "#fb7185",
  minLevel: "advanced",
  lessons: [
    {
      id: "subj-1",
      exercises: [
        {
          id: "s1e1",
          kind: "translate",
          itemId: "espero-que",
          prompt: "I hope that you come to the party.",
          direction: "en-es",
          answers: ["espero que vengas a la fiesta"],
          hint: "esperar que + subjunctive",
        },
        {
          id: "s1e2",
          kind: "multipleChoice",
          itemId: "ojala",
          prompt: "“Hopefully it doesn't rain.”",
          choices: ["Ojalá no llueva.", "Ojalá no llueve.", "Ojalá no lloverá.", "Ojalá no lloviendo."],
          answer: "Ojalá no llueva.",
        },
      ],
    },
    {
      id: "subj-2",
      exercises: [
        {
          id: "s2e1",
          kind: "translate",
          itemId: "quiero-que",
          prompt: "I want you to help me.",
          direction: "en-es",
          answers: ["quiero que me ayudes"],
          hint: "querer que + subjunctive",
        },
        {
          id: "s2e2",
          kind: "multipleChoice",
          itemId: "es-importante-que",
          prompt: "“It's important that you study.”",
          choices: [
            "Es importante que estudies.",
            "Es importante que estudias.",
            "Es importante estudiando.",
            "Estudias mucho.",
          ],
          answer: "Es importante que estudies.",
        },
        {
          id: "s2e3",
          kind: "wordBank",
          itemId: "cuando-sea",
          prompt: "“When I'm older, I'll travel.”",
          answer: ["Cuando", "sea", "mayor", "viajaré"],
          distractors: ["soy", "es", "ayer"],
        },
      ],
    },
  ],
};

const slangStreet: Skill = {
  id: "slang-street",
  title: "Real Talk: Street Spanish",
  blurb: "How people actually speak",
  icon: "MessageSquareText",
  color: "#16b35e",
  minLevel: "advanced",
  slang: true,
  lessons: [
    {
      id: "slang-1",
      exercises: [
        {
          id: "sl1e1",
          kind: "multipleChoice",
          itemId: "que-guay",
          prompt: "In Spain, “¡Qué guay!” means…",
          choices: ["How cool!", "How sad.", "What a shame.", "How expensive!"],
          answer: "How cool!",
        },
        {
          id: "sl1e2",
          kind: "multipleChoice",
          itemId: "chido",
          prompt: "In Mexico, “Está bien chido” means it's…",
          choices: ["really cool / awesome", "very expensive", "broken", "boring"],
          answer: "really cool / awesome",
        },
        {
          id: "sl1e3",
          kind: "match",
          itemId: "slang-match",
          pairs: [
            { es: "tío/tía", en: "dude / mate (Spain)" },
            { es: "chamba", en: "job / work (Mexico)" },
            { es: "guay", en: "cool (Spain)" },
            { es: "neta", en: "for real / truth (Mexico)" },
          ],
        },
        {
          id: "sl1e4",
          kind: "translate",
          itemId: "no-mames",
          prompt: "“No way! / You're kidding!” (informal Mexican)",
          direction: "en-es",
          answers: ["no mames", "¡no mames!", "no manches", "¡no manches!"],
          hint: "Very informal — use with friends.",
        },
      ],
    },
    {
      id: "slang-2",
      exercises: [
        {
          id: "sl2e1",
          kind: "multipleChoice",
          itemId: "que-onda",
          prompt: "In much of Latin America, “¿Qué onda?” means…",
          choices: ["What's up?", "What time is it?", "How much?", "Where are you?"],
          answer: "What's up?",
        },
        {
          id: "sl2e2",
          kind: "multipleChoice",
          itemId: "mola",
          prompt: "If a Spaniard says “¡Mola!”, they mean…",
          choices: ["It's cool!", "It's broken.", "It's expensive.", "It's far."],
          answer: "It's cool!",
        },
        {
          id: "sl2e3",
          kind: "match",
          itemId: "slang-match-2",
          pairs: [
            { es: "chaval", en: "kid / young guy (Spain)" },
            { es: "chévere", en: "cool / great (Latam)" },
            { es: "pijo", en: "posh / snobby (Spain)" },
            { es: "padre", en: "cool / awesome (Mexico)" },
          ],
        },
        {
          id: "sl2e4",
          kind: "translate",
          itemId: "sin-un-duro",
          prompt: "“I'm broke (no money).” (very colloquial)",
          direction: "en-es",
          answers: ["no tengo un duro", "estoy sin un duro", "estoy pelado"],
          hint: "Spain: 'un duro' = a penny. Latam: 'pelado'.",
        },
      ],
    },
  ],
};

const slangIdioms: Skill = {
  id: "slang-idioms",
  title: "Real Talk: Idioms",
  blurb: "Sound like a native",
  icon: "Quote",
  color: "#0a8f4a",
  minLevel: "advanced",
  slang: true,
  lessons: [
    {
      id: "idiom-1",
      exercises: [
        {
          id: "id1e1",
          kind: "multipleChoice",
          itemId: "tomar-pelo",
          prompt: "“Me estás tomando el pelo” literally is “you're taking my hair.” It means…",
          choices: ["you're pulling my leg", "you're cutting my hair", "you're annoying me", "you're helping me"],
          answer: "you're pulling my leg",
        },
        {
          id: "id1e2",
          kind: "multipleChoice",
          itemId: "buena-onda",
          prompt: "Someone who is “buena onda” is…",
          choices: ["a good/nice vibe person", "in a bad mood", "very rich", "always late"],
          answer: "a good/nice vibe person",
        },
        {
          id: "id1e3",
          kind: "match",
          itemId: "idiom-match",
          pairs: [
            { es: "estar en las nubes", en: "to be daydreaming" },
            { es: "costar un ojo de la cara", en: "to cost an arm and a leg" },
            { es: "ponerse las pilas", en: "to get one's act together" },
            { es: "echar una mano", en: "to lend a hand" },
          ],
        },
      ],
    },
    {
      id: "idiom-2",
      exercises: [
        {
          id: "id2e1",
          kind: "multipleChoice",
          itemId: "tirar-toalla",
          prompt: "“Tirar la toalla” means…",
          choices: ["to give up", "to do the laundry", "to take a shower", "to relax"],
          answer: "to give up",
        },
        {
          id: "id2e2",
          kind: "multipleChoice",
          itemId: "pelos-lengua",
          prompt: "Someone with “no pelos en la lengua”…",
          choices: ["speaks bluntly / is outspoken", "is very quiet", "talks too fast", "lies a lot"],
          answer: "speaks bluntly / is outspoken",
        },
        {
          id: "id2e3",
          kind: "match",
          itemId: "idiom-match-2",
          pairs: [
            { es: "meter la pata", en: "to mess up" },
            { es: "estar como una cabra", en: "to be crazy" },
            { es: "dar en el clavo", en: "to nail it" },
            { es: "ser pan comido", en: "to be a piece of cake" },
          ],
        },
      ],
    },
  ],
};

const slangText: Skill = {
  id: "slang-text",
  title: "Real Talk: Texting & Online",
  blurb: "Chat like a local",
  icon: "Smartphone",
  color: "#2dd4bf",
  minLevel: "advanced",
  slang: true,
  lessons: [
    {
      id: "text-1",
      exercises: [
        {
          id: "tx1e1",
          kind: "match",
          itemId: "text-match",
          pairs: [
            { es: "tqm", en: "love you lots (txt)" },
            { es: "xq", en: "because / why (txt)" },
            { es: "finde", en: "weekend" },
            { es: "porfa", en: "please" },
          ],
        },
        {
          id: "tx1e2",
          kind: "multipleChoice",
          itemId: "jaja",
          prompt: "In a chat, “jajaja” is the Spanish equivalent of…",
          choices: ["hahaha (laughing)", "crying", "yawning", "clapping"],
          answer: "hahaha (laughing)",
        },
        {
          id: "tx1e3",
          kind: "multipleChoice",
          itemId: "quedamos-finde",
          prompt: "“¿Quedamos el finde?” means…",
          choices: [
            "Shall we meet up this weekend?",
            "Are you busy this weekend?",
            "See you next year.",
            "I'm at work.",
          ],
          answer: "Shall we meet up this weekend?",
        },
      ],
    },
  ],
};

export const SPANISH_COURSE: Course = {
  id: "es-en",
  language: "Spanish",
  from: "English",
  units: [
    {
      id: "u1",
      title: "Unit 1 · Foundations",
      description: "Greetings, food, family, and your first real sentences.",
      skills: [basics, food, family],
    },
    {
      id: "u2",
      title: "Unit 2 · Out in the World",
      description: "Navigate, shop, and talk about the past.",
      skills: [travel, shopping, past],
    },
    {
      id: "u3",
      title: "Unit 3 · Everyday Life",
      description: "Routines, feelings, and making plans in present and future.",
      skills: [daily, feelings, future],
    },
    {
      id: "u4",
      title: "Unit 4 · Real Talk",
      description: "Advanced grammar plus how people actually speak — slang, idioms & texting.",
      skills: [subjunctive, slangStreet, slangIdioms, slangText],
    },
  ],
};

// Flat skill lookup helpers.
export const ALL_SKILLS: Skill[] = SPANISH_COURSE.units.flatMap((u) => u.skills);

export function getSkill(id: string): Skill | undefined {
  return ALL_SKILLS.find((s) => s.id === id);
}
