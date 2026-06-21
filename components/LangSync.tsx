"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { getLanguage } from "@/lib/content/languages";
import { setSpeechLang } from "@/lib/tts";

/** Keeps TTS voice + document language/direction in sync with the learner. */
export function LangSync() {
  const learnFrom = useStore((s) => s.learnFrom);
  const learnTarget = useStore((s) => s.learnTarget);

  useEffect(() => {
    setSpeechLang(learnTarget);
  }, [learnTarget]);

  useEffect(() => {
    const lang = getLanguage(learnFrom);
    document.documentElement.lang = learnFrom;
    document.documentElement.dir = lang.rtl ? "rtl" : "ltr";
  }, [learnFrom]);

  return null;
}
