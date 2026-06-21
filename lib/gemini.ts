import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { ChatMessage, Level, Scenario, TutorReply } from "@/lib/types";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const LEVEL_GUIDE: Record<Level, string> = {
  beginner:
    "The learner is a BEGINNER. Use very short, simple sentences and common vocabulary. Speak slowly and clearly. Avoid slang and complex tenses.",
  intermediate:
    "The learner is INTERMEDIATE. Use natural everyday Spanish with a mix of tenses, but keep sentences manageable.",
  advanced:
    "The learner is ADVANCED. Speak naturally and fluently, including idioms and colloquial expressions where they fit the scene.",
};

function systemPrompt(scenario: Scenario, level: Level): string {
  return [
    "You are Lola, a warm, encouraging Spanish conversation tutor inside the Slangy app. You roleplay real-life scenes so an English speaker can practice speaking Spanish.",
    "",
    `# Scene: ${scenario.title}`,
    `Goal for the learner: ${scenario.description}`,
    `Your role and setting: ${scenario.setup}`,
    "",
    "# How to behave",
    LEVEL_GUIDE[level],
    scenario.slang
      ? "This is a 'Real Talk' scene — use natural, colloquial, slang-rich Spanish (e.g. 'tío', 'guay', 'qué onda', 'chido') that fits the setting."
      : "Use clear, correct Spanish appropriate to the learner's level.",
    "- Stay fully in character and inside this scene at all times. Never break role or mention that you are an AI.",
    "- Reply in Spanish only. Keep each reply to 1-2 short, natural sentences.",
    "- Always move the conversation forward: react to what they said, then ask a relevant follow-up question that fits the scene.",
    "",
    "# Corrections (important)",
    "Set 'correction' whenever the learner's last message has a real problem; otherwise set it to null. You MUST set a correction when:",
    "- They write fully or partly in English → 'fixed' is the natural Spanish way to say it (e.g. original 'I would like a sandwich' → fixed 'Quiero un sándwich', note explaining it). Still reply in Spanish as if they had said it correctly.",
    "- They make a Spanish mistake: wrong verb conjugation (e.g. 'yo querer' → 'yo quiero'), wrong gender/agreement, missing accents on key words, or unnatural phrasing.",
    "Only correct the single most important issue. 'original' = their text (or the wrong part), 'fixed' = the corrected Spanish, 'note' = a short friendly tip written in English explaining the fix. Do NOT invent mistakes when the Spanish is already correct.",
  ].join("\n");
}

const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    reply: {
      type: SchemaType.STRING,
      description: "Your in-character Spanish reply, 1-2 short sentences.",
    },
    correction: {
      type: SchemaType.OBJECT,
      nullable: true,
      description: "A gentle correction of the learner's last message, or null.",
      properties: {
        original: { type: SchemaType.STRING, description: "The learner's original text." },
        fixed: { type: SchemaType.STRING, description: "The corrected Spanish." },
        note: { type: SchemaType.STRING, description: "A short friendly tip in English." },
      },
      required: ["original", "fixed", "note"],
    },
  },
  required: ["reply"],
} as const;

/** Gemini requires the conversation to start with a user turn — drop the
 * scenario opener (and any leading model turns) before sending. */
function toContents(history: ChatMessage[]) {
  const turns = history
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.content }],
    }));
  while (turns.length && turns[0].role === "model") turns.shift();
  return turns;
}

export async function askTutor(
  scenario: Scenario,
  level: Level,
  history: ChatMessage[]
): Promise<TutorReply> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return simulatedTutor(scenario, level, history);
  }

  const contents = toContents(history);
  // Nothing for the model to respond to yet — return the scripted opener.
  if (contents.length === 0) {
    return { reply: OPENERS[scenario.id] ?? "¡Hola! ¿Empezamos?", correction: null, simulated: false };
  }

  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: systemPrompt(scenario, level),
      generationConfig: {
        temperature: 0.8,
        // Generous budget: 2.5-flash spends some of this on internal "thinking",
        // and a too-small limit produced truncated/garbled replies.
        maxOutputTokens: 2048,
        responseMimeType: "application/json",
        responseSchema: responseSchema as any,
      },
    });

    const result = await model.generateContent({ contents });
    const text = result.response.text().trim();
    const parsed = safeParse(text);

    if (parsed && typeof parsed.reply === "string" && parsed.reply.trim()) {
      const c = parsed.correction;
      const correction =
        c && typeof c.fixed === "string" && c.fixed.trim()
          ? { original: String(c.original ?? ""), fixed: String(c.fixed), note: String(c.note ?? "") }
          : null;
      return { reply: parsed.reply.trim(), correction, simulated: false };
    }

    // Structured output failed for some reason — degrade gracefully.
    return simulatedTutor(scenario, level, history);
  } catch (err) {
    console.error("[askTutor] Gemini call failed:", err);
    return simulatedTutor(scenario, level, history);
  }
}

function safeParse(text: string): any | null {
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

// ---- Local fallback so the app fully works without an API key -----------

const OPENERS: Record<string, string> = {
  cafe: "¡Hola! Bienvenido. ¿Qué te pongo hoy?",
  directions: "¡Hola! Claro, ¿a dónde quieres ir?",
  market: "¡Buenas! Tengo fruta fresquísima. ¿Qué te llevas?",
  introductions: "¡Hola! Mucho gusto. ¿Cómo te llamas?",
  doctor: "Buenos días, pase y siéntese. ¿Qué le pasa hoy?",
  interview: "Buenas tardes, gracias por venir. Cuénteme un poco sobre usted.",
  friends: "¡Eyy! ¿Qué onda, tío? ¿Todo guay?",
  nightout: "¡Venga! ¿Qué plan tienes para esta noche?",
};

function simulatedTutor(
  scenario: Scenario,
  _level: Level,
  history: ChatMessage[]
): TutorReply {
  const userTurns = history.filter((m) => m.role === "user");
  if (userTurns.length === 0) {
    return {
      reply: OPENERS[scenario.id] ?? "¡Hola! ¿Empezamos?",
      correction: null,
      simulated: true,
    };
  }

  const last = userTurns[userTurns.length - 1].content.trim();
  const lower = last.toLowerCase();

  // A few light, deterministic conversational responses.
  let reply: string;
  if (/(hola|buenas|hey|hi)/.test(lower)) {
    reply = "¡Hola! Me alegro de verte. ¿Cómo va todo?";
  } else if (/(gracias|thanks)/.test(lower)) {
    reply = "¡De nada! ¿Algo más?";
  } else if (/(café|cafe|agua|cerveza|comida)/.test(lower)) {
    reply = "¡Marchando! ¿Para tomar aquí o para llevar?";
  } else if (lower.endsWith("?") || /(dónde|donde|cuánto|cuanto|qué|que)/.test(lower)) {
    reply = "Buena pregunta. Está justo al final de la calle, a la derecha.";
  } else {
    reply = "¡Vale, perfecto! Cuéntame un poco más.";
  }

  // Naive "correction": if they typed obvious English, nudge them.
  const looksEnglish = /\b(the|and|please|where|hello|thank you|i want)\b/i.test(last);
  const correction = looksEnglish
    ? {
        original: last,
        fixed: "Intenta decirlo en español",
        note: "Try expressing that in Spanish — even a small attempt counts!",
      }
    : null;

  return { reply, correction, simulated: true };
}
