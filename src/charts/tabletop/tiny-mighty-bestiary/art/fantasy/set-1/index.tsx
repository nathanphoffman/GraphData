import type { ReactNode } from "react";
import { AbyssalLeviathan, BarnCatTerror, BlinkCat, CarnivalColossus, CarrionCrow, ClockworkSongbird } from "./Part1";
import { BefuddledWizard, BraggartKnight, CastleGuard, CaveDwarf, CaveTroll, Cutpurse } from "./Part2";
import { BlackKnight, BoneSorcerer, BouncySlime, CaveWurm, ChestLurker, CloudLeviathan } from "./Part3";
import { AetherDjinn, BloodNoble, CheekyPoltergeist, CrossroadsFiend } from "./Part4";

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
