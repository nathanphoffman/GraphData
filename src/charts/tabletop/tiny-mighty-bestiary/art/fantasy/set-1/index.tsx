import type { ReactNode } from "react";
import { CarnivalColossus, ClockworkSongbird, BlinkCat, CarrionCrow, AbyssalLeviathan, BarnCatTerror } from "./Part1";
import { CaveTroll, BefuddledWizard, CaveDwarf, BraggartKnight, CastleGuard, Cutpurse } from "./Part2";
import { BlackKnight, ChestLurker, BouncySlime, CaveWurm, CloudLeviathan, BoneSorcerer } from "./Part3";
import { BloodNoble, CrossroadsFiend, CheekyPoltergeist, AetherDjinn } from "./Part4";

export const fantasyArt: Record<string, () => ReactNode> = {
  "carnival-colossus": CarnivalColossus,
  "clockwork-songbird": ClockworkSongbird,
  "blink-cat": BlinkCat,
  "carrion-crow": CarrionCrow,
  "abyssal-leviathan": AbyssalLeviathan,
  "barn-cat-terror": BarnCatTerror,
  troll: CaveTroll,
  "befuddled-wizard": BefuddledWizard,
  "cave-dwarf": CaveDwarf,
  "braggart-knight": BraggartKnight,
  "castle-guard": CastleGuard,
  cutpurse: Cutpurse,
  "black-knight": BlackKnight,
  "chest-lurker": ChestLurker,
  "bouncy-slime": BouncySlime,
  "cave-wurm": CaveWurm,
  "cloud-leviathan": CloudLeviathan,
  "bone-sorcerer": BoneSorcerer,
  "blood-noble": BloodNoble,
  "crossroads-fiend": CrossroadsFiend,
  "cheeky-poltergeist": CheekyPoltergeist,
  "aether-djinn": AetherDjinn,
};
