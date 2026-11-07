import { DEFAULT_WEIGHT, MAX_WEIGHT, MIN_WEIGHT } from "./constants";
import type { Settings } from "./types";
import { YEAR_STEPS } from "./yearSteps";

/** The controls are kept in this browser, next to your games. */
const SETTINGS_STORAGE_KEY = "board-games-settings";

const DEFAULT_SETTINGS: Settings = {
  preferWeight: false,
  weight: DEFAULT_WEIGHT,
  yearStep: 0,
  onlyMine: false,
  search: "",
};

/** Whether the controls were ever saved in this browser; if not, it is the visitor's first time. */
export function hasSavedSettings(): boolean {
  try {
    return localStorage.getItem(SETTINGS_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

/** The saved controls, with anything missing or not making sense replaced by its default. */
export function loadSettings(): Settings {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) ?? "{}");
    const validWeight = typeof saved.weight === "number" && saved.weight >= MIN_WEIGHT && saved.weight <= MAX_WEIGHT;
    const validStep = Number.isInteger(saved.yearStep) && saved.yearStep >= 0 && saved.yearStep < YEAR_STEPS.length;

    return {
      preferWeight: saved.preferWeight === true,
      weight: validWeight ? saved.weight : DEFAULT_SETTINGS.weight,
      yearStep: validStep ? saved.yearStep : DEFAULT_SETTINGS.yearStep,
      onlyMine: saved.onlyMine === true,
      search: typeof saved.search === "string" ? saved.search : "",
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Settings) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage can be blocked; the controls still work until the page closes.
  }
}
