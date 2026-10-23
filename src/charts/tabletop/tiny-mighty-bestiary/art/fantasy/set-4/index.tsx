import type { ReactNode } from "react";
import { TumbleweedImp, StoneGolem, SteamGolem, RuneTeapot, ScarecrowSentinel, RatKing } from "./Part1";
import { SmogHound, ThunderRam, RoamingMinstrel, TempleHealer, SchemingChancellor, SellswordCaptain } from "./Part2";
import { TollTroll, StoneGazer, SpikedHodag, SugarWyrm, VainWyrm, Shellback } from "./Part3";
import { Stormbird, Skeleton, RestlessGhost, RainbowTrickster, VoidTentacle, SwampHag } from "./Part4";
import { SunkenDreamer, RiddleSphinx, Siren } from "./Part5";

export const fantasyArtQZ: Record<string, () => ReactNode> = {
  "tumbleweed-imp": TumbleweedImp,
  "stone-golem": StoneGolem,
  "steam-golem": SteamGolem,
  "rune-teapot": RuneTeapot,
  "scarecrow-sentinel": ScarecrowSentinel,
  "rat-king": RatKing,
  "smog-hound": SmogHound,
  "thunder-ram": ThunderRam,
  "roaming-minstrel": RoamingMinstrel,
  "temple-healer": TempleHealer,
  "scheming-chancellor": SchemingChancellor,
  "sellsword-captain": SellswordCaptain,
  "toll-troll": TollTroll,
  "stone-gazer": StoneGazer,
  "spiked-hodag": SpikedHodag,
  "sugar-wyrm": SugarWyrm,
  "vain-wyrm": VainWyrm,
  shellback: Shellback,
  stormbird: Stormbird,
  skeleton: Skeleton,
  ghost: RestlessGhost,
  "rainbow-trickster": RainbowTrickster,
  "void-tentacle": VoidTentacle,
  "swamp-hag": SwampHag,
  "sunken-dreamer": SunkenDreamer,
  "riddle-sphinx": RiddleSphinx,
  siren: Siren,
};
