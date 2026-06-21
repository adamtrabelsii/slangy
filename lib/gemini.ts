import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ChatMessage, Level, Scenario, TutorReply } from "@/lib/types";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function systemPrompt(scenario: Scenario, level: Level): string {
  return [
    "You are Slangy, a warm, encouraging Spanish conversation tutor for an English speaker.",
    `The learner's level is: ${level}.`,
    `Roleplay this scenario: ${scenario.setup}`,
    scenario.slang
      ? "Use natural, colloquial, slang-rich Spanish appropriate to the scene."
      : "Use clear Spanish appropriate to the learner's level; keep sentences short for beginners.",
    "Always stay in character and reply primarily in Spanish.",
    "If the learner makes a meaningful Spanish mistake, gently correct it.",
    "",
    "Respond with ONLY a JSON object (no markdown fences) of the form:",
    '{"reply": "<your in-character Spanish reply, 1-2 sentences>",',
    ' "correction": null OR {"original":"<their text>","fixed":"<corrected Spanish>","note":"<short English tip>"}}',
    "Keep 'reply' concise and conversational. Only include a correction when there is a real mistake.",
  ].join("\n");
}

function extractJson(text: string): any | null {
  // Be lenient: strip code fences and grab the first {...} block.
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(cleaned.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
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

  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: systemPrompt(scenario, level),
      generationConfig: { temperature: 0.8, maxOutputTokens: 300 },
    });

    const contents = history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const result = await model.generateContent({ contents });
    const text = result.response.text();
    const parsed = extractJson(text);

    if (parsed && typeof parsed.reply === "string") {
      return {
        reply: parsed.reply,
        correction: parsed.correction ?? null,
        simulated: false,
      };
    }
    // Model didn't return JSON — use the raw text as the reply.
    return { reply: text.trim() || "¿Perdona?", correction: null, simulated: false };
  } catch (err) {
    // Network/quota/etc — degrade gracefully instead of failing the request.
    return simulatedTutor(scenario, level, history);
  }
}

// ---- Local fallback so the app fully works without an API key -----------

const OPENERS: Record<string, string> = {
  cafe: "¡Hola! Bienvenido. ¿Qué te pongo hoy? ☕",
  directions: "¡Hola! Claro, ¿a dónde quieres ir?",
  market: "¡Buenas! Tengo fruta fresquísima. ¿Qué te llevas?",
  friends: "¡Eyy! ¿Qué onda, tío? ¿Todo guay? 😎",
  nightout: "¡Venga! ¿Qué plan tienes para esta noche? 🎉",
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
        fixed: "Intenta decirlo en español 🙂",
        note: "Try expressing that in Spanish — even a small attempt counts!",
      }
    : null;

  return { reply, correction, simulated: true };
}
