"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, Send, Volume2 } from "lucide-react";
import { SCENARIOS } from "@/lib/content/scenarios";
import { levelAtLeast, type Scenario } from "@/lib/types";
import { useStore } from "@/lib/store";
import { speak, ttsSupported } from "@/lib/tts";

interface Msg {
  role: "user" | "assistant";
  content: string;
  correction?: { original: string; fixed: string; note: string } | null;
}

const OPENERS: Record<string, string> = {
  cafe: "¡Hola! Bienvenido. ¿Qué te pongo hoy? ☕",
  directions: "¡Hola! Claro, ¿a dónde quieres ir?",
  market: "¡Buenas! Tengo fruta fresquísima. ¿Qué te llevas?",
  friends: "¡Eyy! ¿Qué onda, tío? ¿Todo guay? 😎",
  nightout: "¡Venga! ¿Qué plan tienes para esta noche? 🎉",
  introductions: "¡Hola! Mucho gusto. ¿Cómo te llamas? 👋",
  doctor: "Buenos días, pase y siéntese. ¿Qué le pasa hoy? 🩺",
  interview: "Buenas tardes, gracias por venir. Cuénteme un poco sobre usted. 💼",
};

export default function PracticePage() {
  const hydrated = useStore((s) => s.hydrated);
  const level = useStore((s) => s.level);
  const [scenario, setScenario] = useState<Scenario | null>(null);

  if (!hydrated) return <div className="py-20 text-center text-slate-400">Cargando…</div>;

  if (!scenario) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="font-display text-2xl font-900">AI Conversation Tutor</h1>
          <p className="text-slate-400">
            Practice real conversations. Your tutor replies in Spanish and corrects you as you go.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {SCENARIOS.map((s) => {
            const unlocked = levelAtLeast(level, s.level);
            return (
              <button
                key={s.id}
                disabled={!unlocked}
                onClick={() => setScenario(s)}
                className={`card flex items-center gap-4 p-4 text-left transition-transform ${
                  unlocked ? "hover:scale-[1.02]" : "opacity-60"
                }`}
              >
                <span className="text-4xl">{s.emoji}</span>
                <span className="flex-1">
                  <span className="flex items-center gap-2 font-display font-900">
                    {s.title}
                    {s.slang && (
                      <span className="chip bg-brand-500/15 text-brand-200 text-[11px]">
                        SLANG
                      </span>
                    )}
                  </span>
                  <span className="block text-sm text-slate-400">{s.description}</span>
                  {!unlocked && (
                    <span className="mt-1 flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Lock size={12} /> Reach {s.level} to unlock
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return <Chat scenario={scenario} level={level} onExit={() => setScenario(null)} />;
}

function Chat({
  scenario,
  level,
  onExit,
}: {
  scenario: Scenario;
  level: string;
  onExit: () => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: OPENERS[scenario.id] ?? "¡Hola! ¿Empezamos?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [simulated, setSimulated] = useState<boolean | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId: scenario.id,
          level,
          history: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setSimulated(Boolean(data.simulated));
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? "…", correction: data.correction ?? null },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Ups, algo salió mal. Inténtalo de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-180px)] flex-col">
      <div className="mb-3 flex items-center justify-between">
        <button onClick={onExit} className="text-sm font-bold text-slate-400 hover:text-white">
          ← Scenarios
        </button>
        <div className="flex items-center gap-2 font-display font-900">
          <span className="text-xl">{scenario.emoji}</span>
          {scenario.title}
        </div>
        {simulated ? (
          <span className="chip bg-amber-500/15 text-amber-300 text-[11px]">PRACTICE MODE</span>
        ) : (
          <span className="w-24" />
        )}
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto rounded-3xl bg-ink-soft/40 p-4">
        {messages.map((m, i) => (
          <div key={i}>
            <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  m.role === "user"
                    ? "bg-brand-600 text-white"
                    : "bg-ink-line text-slate-100"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="whitespace-pre-wrap font-medium">{m.content}</span>
                  {m.role === "assistant" && ttsSupported() && (
                    <button
                      onClick={() => speak(m.content)}
                      className="mt-0.5 shrink-0 text-sky-300 hover:text-sky-200"
                      aria-label="Play"
                    >
                      <Volume2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
            {m.correction && (
              <div className="mt-1 flex justify-start">
                <div className="max-w-[80%] rounded-2xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
                  <span className="font-900">✍️ Tip:</span> {m.correction.note}
                  <div className="mt-1 text-amber-200/90">
                    <span className="line-through opacity-70">{m.correction.original}</span> →{" "}
                    <span className="font-bold">{m.correction.fixed}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-ink-line px-4 py-2.5 text-slate-400">…</div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={1}
          placeholder="Escribe en español…"
          className="flex-1 resize-none rounded-2xl border-2 border-ink-line bg-ink-soft p-3 font-medium text-white outline-none focus:border-brand-500"
        />
        <button onClick={send} disabled={loading || !input.trim()} className="btn-primary px-4 py-3">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
