/** Shape of data/tiny-mighty-bestiary.json. */
export type PowerType = "multi" | "direct" | "area" | "heal";

export interface Tier {
  difficulty: number;
  turns: number;
  defense: number;
  defenseDice: string;
  health: number;
  healthDice: string;
  bonus: number;
  bonusDice: string;
}

export interface Power {
  name: string;
  type: PowerType;
  /** Uses per rest. Each use adds 0.5 difficulty. */
  uses: number;
  text: string;
}

export interface Creature {
  id: string;
  name: string;
  /** Base difficulty from the combat table, before powers. */
  tier: number;
  flying: boolean;
  description: string;
  attack: string;
  skills: string;
  powers: Power[];
  tactics: string;
}

export interface BestiaryData {
  title: string;
  rulesVersion: string;
  tiers: Tier[];
  powerTypes: Record<PowerType, { label: string; dice: string }>;
  creatures: Creature[];
}
