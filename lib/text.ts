// Lenient answer comparison: ignore case, accents, punctuation, extra spaces.

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics
    .replace(/[¿?¡!.,;:'"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesAny(input: string, answers: string[]): boolean {
  const n = normalize(input);
  return answers.some((a) => normalize(a) === n);
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
