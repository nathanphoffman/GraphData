import type { ReactNode } from "react";
import { RatKing, RuneTeapot, ScarecrowSentinel, SteamGolem, StoneGolem, TumbleweedImp } from "./Part1";
import { RoamingMinstrel, SchemingChancellor, SellswordCaptain, SmogHound, TempleHealer, ThunderRam } from "./Part2";
import { Shellback, SpikedHodag, StoneGazer, SugarWyrm, TollTroll, VainWyrm } from "./Part3";
import { RainbowTrickster, RestlessGhost, Skeleton, Stormbird, SwampHag, VoidTentacle } from "./Part4";
import { RiddleSphinx, Siren, SunkenDreamer } from "./Part5";

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
