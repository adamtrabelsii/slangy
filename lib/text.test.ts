import { describe, expect, it } from "vitest";
import { matchesAny, normalize, shuffle } from "@/lib/text";

describe("normalize", () => {
  it("lowercases, strips accents and punctuation, and collapses whitespace", () => {
    expect(normalize("¿Cómo  estás?")).toBe("como estas");
    expect(normalize("¡Hola!")).toBe("hola");
    expect(normalize("  Mucho   gusto.  ")).toBe("mucho gusto");
  });

  it("is idempotent on already-normalized input", () => {
    expect(normalize("hola")).toBe("hola");
  });
});

describe("matchesAny", () => {
  it("matches regardless of case, accents, or punctuation", () => {
    expect(matchesAny("COMO ESTAS", ["¿Cómo estás?"])).toBe(true);
    expect(matchesAny("buenos dias", ["Buenos días"])).toBe(true);
  });

  it("returns false when nothing matches", () => {
    expect(matchesAny("adiós", ["hola", "buenas"])).toBe(false);
  });

  it("returns false for an empty answers list", () => {
    expect(matchesAny("hola", [])).toBe(false);
  });
});

describe("shuffle", () => {
  it("returns an array with the same elements", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result).toHaveLength(input.length);
    expect([...result].sort()).toEqual([...input].sort());
  });

  it("does not mutate the original array", () => {
    const input = [1, 2, 3];
    const copy = [...input];
    shuffle(input);
    expect(input).toEqual(copy);
  });
});
