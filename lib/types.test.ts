import { describe, expect, it } from "vitest";
import { levelAtLeast, levelForXp, maxLevel, nextLevel } from "@/lib/types";

describe("levelAtLeast", () => {
  it("is true when the level meets or exceeds the requirement", () => {
    expect(levelAtLeast("advanced", "beginner")).toBe(true);
    expect(levelAtLeast("intermediate", "intermediate")).toBe(true);
  });

  it("is false when the level falls short", () => {
    expect(levelAtLeast("beginner", "advanced")).toBe(false);
  });
});

describe("levelForXp", () => {
  it("starts at beginner", () => {
    expect(levelForXp(0)).toBe("beginner");
    expect(levelForXp(49)).toBe("beginner");
  });

  it("crosses into intermediate at the threshold", () => {
    expect(levelForXp(50)).toBe("intermediate");
    expect(levelForXp(149)).toBe("intermediate");
  });

  it("crosses into advanced at the threshold", () => {
    expect(levelForXp(150)).toBe("advanced");
    expect(levelForXp(10000)).toBe("advanced");
  });
});

describe("nextLevel", () => {
  it("returns the next level up", () => {
    expect(nextLevel("beginner")).toBe("intermediate");
    expect(nextLevel("intermediate")).toBe("advanced");
  });

  it("returns null at the top level", () => {
    expect(nextLevel("advanced")).toBeNull();
  });
});

describe("maxLevel", () => {
  it("returns the higher of the two levels, in either order", () => {
    expect(maxLevel("beginner", "advanced")).toBe("advanced");
    expect(maxLevel("advanced", "beginner")).toBe("advanced");
    expect(maxLevel("intermediate", "intermediate")).toBe("intermediate");
  });
});
