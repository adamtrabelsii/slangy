"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, Send, Volume2, Pencil, MessageCircle, ArrowLeft } from "lucide-react";
import { SCENARIOS } from "@/lib/content/scenarios";
import { levelAtLeast, type Scenario } from "@/lib/types";
import { useStore } from "@/lib/store";
import { speak, ttsSupported } from "@/lib/tts";
import { useT } from "@/lib/i18n";

interface Msg {
  role: "user" | "assistant";
  content: string;
  correction?: { original: string; fixed: string; note: string } | null;
}

const OPENERS: Record<string, string> = {
  cafe: "¡Hola! Bienvenido. ¿Qué te pongo hoy?",
  directions: "¡Hola! Claro, ¿a dónde quieres ir?",
  market: "¡Buenas! Tengo fruta fresquísima. ¿Qué te llevas?",
  friends: "¡Eyy! ¿Qué onda, tío? ¿Todo guay?",
  nightout: "¡Venga! ¿Qué plan tienes para esta noche?",
  introductions: "¡Hola! Mucho gusto. ¿Cómo te llamas?",
  doctor: "Buenos días, pase y siéntese. ¿Qué le pasa hoy?",
  interview: "Buenas tardes, gracias por venir. Cuénteme un poco sobre usted.",
};

export default function PracticePage() {
  const hydrated = useStore((s) => s.hydrated);
  const level = useStore((s) => s.level);
  const learnFrom = useStore((s) => s.learnFrom);
  const t = useT();
  const [scenario, setScenario] = useState<Scenario | null>(null);

  if (!hydrated) return <div className="py-20 text-center text-sg-sub">{t("loading")}</div>;

  if (!scenario) {
    return (
      <div className="space-y-5">
        <div>
          <p className="tagline">{t("practice_tagline")}</p>
          <h1 className="font-display text-3xl font-900 text-sg-ink">{t("practice_title")}</h1>
          <p className="mt-1 text-sm text-sg-sub">{t("practice_subtitle")}</p>
        </div>
        <div className="space-y-3">
          {SCENARIOS.map((s) => {
            const unlocked = levelAtLeast(level, s.level);
            return (
              <button
                key={s.id}
                disabled={!unlocked}
                onClick={() => setScenario(s)}
                className={`card flex w-full items-center gap-4 p-4 text-left transition-transform ${
                  unlocked ? "active:scale-[0.99]" : "opacity-60"
                }`}
              >
                <span
                  className="grid h-12 w-12 flex-none place-items-center rounded-2xl font-display text-base font-900 text-white"
                  style={{ background: unlocked ? "var(--sg-grad)" : "#D7BFA8" }}
                >
                  {s.title.slice(0, 1)}
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-2 font-display font-900 text-sg-ink">
                    {s.title}
                    {s.slang && (
                      <span className="chip sg-grad-soft text-[11px] text-sg-primary-deep">SLANG</span>
                    )}
                  </span>
                  <span className="block text-sm text-sg-sub">{s.description}</span>
                  {!unlocked && (
                    <span className="mt-1 flex items-center gap-1 text-xs font-bold text-sg-primary-deep">
                      <Lock size={12} /> {t("practice_reach", { level: t(`level_${s.level}`) })}
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

  return (
    <Chat scenario={scenario} level={level} learnFrom={learnFrom} onExit={() => setScenario(null)} />
  );
}

function Chat({
  scenario,
  level,
  learnFrom,
  onExit,
}: {
  scenario: Scenario;
  level: string;
  learnFrom: string;
  onExit: () => void;
}) {
  const t = useT();
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
          learnFrom,
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
        { role: "assistant", content: t("practice_error") },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="-mx-5 -mt-6 flex h-[calc(100vh-96px)] flex-col">
      {/* Chat header */}
      <div className="flex items-center gap-3 glass-strong px-5 py-3">
        <button onClick={onExit} className="text-sg-light hover:text-sg-ink" aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <div
          className="sg-grad relative flex h-10 w-10 items-center justify-center rounded-full text-white"
          style={{ boxShadow: "var(--sg-glow)" }}
        >
          <MessageCircle size={18} />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-sg-success" />
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-extrabold text-sg-ink">{t("practice_tutor")}</div>
          <div className="text-[11px] text-sg-sub">{scenario.title}</div>
        </div>
        {simulated && (
          <span className="chip bg-sg-amber/15 text-[11px] text-sg-primary-deep">{t("practice_mode")}</span>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
        {messages.map((m, i) =>
          m.role === "assistant" ? (
            <div key={i} className="flex max-w-[82%] animate-pop flex-col gap-1.5 self-start">
              {m.correction && (
                <div
                  className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5"
                  style={{ background: "rgba(245,158,11,.14)", border: "1px solid rgba(245,158,11,.35)" }}
                >
                  <Pencil size={12} style={{ color: "#B45309" }} />
                  <span className="text-[11.5px] font-semibold" style={{ color: "#B45309" }}>
                    {m.correction.note}: <s className="opacity-70">{m.correction.original}</s> →{" "}
                    <b>{m.correction.fixed}</b>
                  </span>
                </div>
              )}
              <div className="flex items-start gap-2">
                <div
                  className="glass-strong px-4 py-3 text-sm leading-5 text-sg-ink"
                  style={{ borderRadius: "18px 18px 18px 5px" }}
                >
                  {m.content}
                </div>
                {ttsSupported() && (
                  <button
                    onClick={() => speak(m.content)}
                    className="mt-1 shrink-0 text-sg-primary"
                    aria-label="Play"
                  >
                    <Volume2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div
              key={i}
              className="sg-grad max-w-[82%] animate-pop self-end px-4 py-3 text-sm leading-5 text-white"
              style={{ borderRadius: "18px 18px 5px 18px", boxShadow: "var(--sg-glow)" }}
            >
              {m.content}
            </div>
          )
        )}
        {loading && (
          <div
            className="glass-strong self-start px-4 py-3 text-sg-light"
            style={{ borderRadius: "18px 18px 18px 5px" }}
          >
            …
          </div>
        )}
      </div>

      {/* Input */}
      <div className="glass-soft px-4 py-3">
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5">
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
            placeholder={t("practice_placeholder")}
            className="flex-1 resize-none bg-transparent text-sm text-sg-ink outline-none"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="sg-grad flex h-8 w-8 flex-none items-center justify-center rounded-full text-white disabled:opacity-40"
            aria-label="Send"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
