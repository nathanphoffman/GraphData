import { describe, expect, it } from "vitest";
import { DIFFICULTY_BANDS, compareBy, difficultyOf, model, tierFor } from "./data";
import { matches } from "./search";
import type { Creature } from "./types";

const creature = (overrides: Partial<Creature>): Creature => ({
  id: "x",
  name: "Test",
  type: model.creatureTypes[0].id,
  themes: [],
  tone: 1,
  tier: 1,
  flying: false,
  aliases: [],
  description: "",
  attack: "",
  skills: [],
  powers: [],
  tactics: "",
  ...overrides,
});

describe("model", () => {
  it("has a combat tier for every creature", () => {
    for (const c of model.creatures) expect(() => tierFor(c)).not.toThrow();
  });

  it("gives every creature a unique id", () => {
    const ids = model.creatures.map((c) => c.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("only uses themes and types that exist", () => {
    const themes = new Set(model.themes.map((t) => t.id));
    const types = new Set(model.creatureTypes.map((t) => t.id));

    for (const c of model.creatures) {
      expect(types.has(c.type)).toBe(true);
      for (const theme of c.themes) expect(themes.has(theme)).toBe(true);
    }
  });
});

describe("tierFor", () => {
  it("throws for a tier that is not in the combat table", () => {
    expect(() => tierFor(creature({ tier: 999 }))).toThrow(/No combat tier/);
  });
});

describe("difficultyOf", () => {
  it("adds half a tier for every power use", () => {
    const powers = [{ uses: 1 }, { uses: 2 }] as Creature["powers"];

    expect(difficultyOf(creature({ tier: 2, powers }))).toBe(3.5);
    expect(difficultyOf(creature({ tier: 2 }))).toBe(2);
  });

  it("falls inside exactly one difficulty band", () => {
    for (const value of [0.25, 1, 2.5, 4.5, 5, 7]) {
      const inBands = DIFFICULTY_BANDS.filter((b) => value >= b.min && value <= b.max);

      expect(inBands).toHaveLength(1);
    }
  });
});

describe("compareBy", () => {
  const list = [
    creature({ id: "b", name: "Bat", tier: 2, tone: 3 }),
    creature({ id: "a", name: "Ant", tier: 3, tone: 1 }),
    creature({ id: "c", name: "Cat", tier: 1, tone: 3 }),
  ];
  const names = (sort: string) => [...list].sort(compareBy(sort)).map((c) => c.name);

  it("sorts by name in both directions", () => {
    expect(names("az")).toEqual(["Ant", "Bat", "Cat"]);
    expect(names("za")).toEqual(["Cat", "Bat", "Ant"]);
  });

  it("sorts by difficulty, which is also the default", () => {
    expect(names("difficulty")).toEqual(["Cat", "Bat", "Ant"]);
    expect(names("anything-else")).toEqual(["Cat", "Bat", "Ant"]);
  });

  it("breaks tone ties by difficulty", () => {
    expect(names("tone")).toEqual(["Ant", "Cat", "Bat"]);
  });
});

describe("matches", () => {
  const bat = creature({ name: "Giant Bat", aliases: ["AT-AT"], description: "Hangs upside down", flying: true });

  it("finds a creature by every word of the query in any order", () => {
    expect(matches(bat, "bat giant")).toBe(true);
    expect(matches(bat, "bat dragon")).toBe(false);
  });

  it("matches names and aliases ignoring spaces and punctuation", () => {
    expect(matches(bat, "giantbat")).toBe(true);
    expect(matches(bat, "at at")).toBe(true);
    expect(matches(bat, "atat")).toBe(true);
  });

  it("searches descriptions and the flying flag", () => {
    expect(matches(bat, "upside")).toBe(true);
    expect(matches(bat, "flying")).toBe(true);
    expect(matches(creature({ name: "Rock" }), "flying")).toBe(false);
  });

  it("matches everything for an empty search", () => {
    expect(matches(bat, "")).toBe(true);
  });
});
