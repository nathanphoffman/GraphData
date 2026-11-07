import { useEffect, useState } from "react";
import { hasSavedSettings, loadSettings, saveSettings } from "../model/settings";
import type { Settings } from "../model/types";

/** The controls, remembered in this browser once the visitor has answered the first-visit question. */
export function useSavedSettings() {
  const [settings, setSettings] = useState(loadSettings);
  const [asked, setAsked] = useState(hasSavedSettings);

  useEffect(() => {
    if (asked) saveSettings(settings);
  }, [asked, settings]);

  const update = (changes: Partial<Settings>) => setSettings((current) => ({ ...current, ...changes }));

  return { settings, update, asked, markAsked: () => setAsked(true) };
}
