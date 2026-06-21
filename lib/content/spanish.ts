import type { Course, Skill } from "@/lib/types";

// Spanish-for-English-speakers course content.
// Beginner → Intermediate → Advanced. "Real talk" slang skills are advanced-gated.

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
      description: "Greetings, food, and your first real sentences.",
      skills: [basics, food],
    },
    {
      id: "u2",
      title: "Unit 2 · Out in the World",
      description: "Navigate, shop, and talk about the past.",
      skills: [travel, past],
    },
    {
      id: "u3",
      title: "Unit 3 · Real Talk",
      description: "Advanced grammar plus how people actually speak — slang & idioms.",
      skills: [subjunctive, slangStreet, slangIdioms],
    },
  ],
};

// Flat skill lookup helpers.
export const ALL_SKILLS: Skill[] = SPANISH_COURSE.units.flatMap((u) => u.skills);

export function getSkill(id: string): Skill | undefined {
  return ALL_SKILLS.find((s) => s.id === id);
}
