/** Shape of data/tiny-mighty-bestiary.json. */
export type PowerType = "multi" | "direct" | "area" | "heal" | "utility";

export interface CreatureType {
  id: string;
  label: string;
}

export interface Theme {
  id: string;
  label: string;
}

export interface Tier {
  difficulty: number;
  turns: number;
  defense: number;
  defenseDice: string;
  health: number;
  healthDice: string;
  bonus: number;
  bonusDice: string;
  /** True when this row is extrapolated past the printed combat table. */
  extended?: boolean;
}

export interface Power {
  name: string;
  type: PowerType;
  /** Uses per rest. Each use adds 0.5 difficulty. */
  uses: number;
  text: string;
}

export interface Skill {
  skill: "Physique" | "Wits" | "Charm" | "Senses";
  /** "+" is advantage, "-" is disadvantage. */
  mod: "+" | "-";
  /** Short qualifier, shown in brackets. */
  note?: string;
}

export interface Creature {
  id: string;
  name: string;
  /** Id from `creatureTypes`; sets the card color. */
  type: string;
  /** Ids from `themes`; a creature can fit several. */
  themes: string[];
  /** 1 (Whimsy) to 5 (Dark); an index into `toneScale` plus one. */
  tone: number;
  /** Base difficulty from the combat table, before powers. */
  tier: number;
  flying: boolean;
  /** Extra search terms, e.g. the classic name this creature stands in for. Not shown on the card. */
  aliases: string[];
  description: string;
  attack: string;
  skills: Skill[];
  /** Extra rule text that is not a plain skill advantage. */
  skillNote?: string;
  powers: Power[];
  tactics: string;
}

export interface BestiaryData {
  title: string;
  rulesVersion: string;
  /** Labels for tone 1-5, lightest first. */
  toneScale: string[];
  themes: Theme[];
  creatureTypes: CreatureType[];
  tiers: Tier[];
  powerTypes: Record<PowerType, { label: string; dice: string }>;
  creatures: Creature[];
}
