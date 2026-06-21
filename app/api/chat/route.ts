import { NextRequest, NextResponse } from "next/server";
import { askTutor } from "@/lib/gemini";
import { getScenario } from "@/lib/content/scenarios";
import type { ChatMessage, Level } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const scenario = getScenario(body?.scenarioId);
  if (!scenario) {
    return NextResponse.json({ error: "Unknown scenario" }, { status: 400 });
  }

  const level: Level = body?.level ?? "beginner";
  const history: ChatMessage[] = Array.isArray(body?.history) ? body.history : [];

  // Guard against runaway histories.
  const trimmed = history.slice(-20).filter(
    (m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
  );

  const reply = await askTutor(scenario, level, trimmed);
  return NextResponse.json(reply);
}
