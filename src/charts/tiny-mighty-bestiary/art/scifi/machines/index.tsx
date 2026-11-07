import type { ReactNode } from "react";
import { BattleClank, BeepBot, BuzzDrone, ChromeRevenant, IronColossus, RiotWalker, WireGhost } from "./Part1";
import {
  CargoLoader,
  ClankWalker,
  DataCourierDrone,
  DreadnoughtCore,
  NoodleCartBot,
  RustedSentinel,
  SiegeWalker,
} from "./Part2";
import { CaveSucker, CosmicWhale, FrostStrider, HiveStalker, ScrapperDroneHive, SnowMauler } from "./Part3";
import { ChitinCrusher, ChompBall, NeonGutterCat, SewerGator, SludgePup, Swarmling } from "./Part4";
import { DustRaptor, NebulaStalker, PlasmaPanther, ScoutLizard, VoidKrillSwarm } from "./Part5";

export const sciFiMachinesArt: Record<string, () => ReactNode> = {
  "battle-clank": BattleClank,
  "beep-bot": BeepBot,
  "chrome-revenant": ChromeRevenant,
  "iron-colossus": IronColossus,
  "buzz-drone": BuzzDrone,
  "wire-ghost": WireGhost,
  "riot-walker": RiotWalker,
  "noodle-cart-bot": NoodleCartBot,
  "clank-walker": ClankWalker,
  "rusted-sentinel": RustedSentinel,
  "data-courier-drone": DataCourierDrone,
  "dreadnought-core": DreadnoughtCore,
  "cargo-loader": CargoLoader,
  "siege-walker": SiegeWalker,
  "scrapper-drone-hive": ScrapperDroneHive,
  "cave-sucker": CaveSucker,
  "frost-strider": FrostStrider,
  "snow-mauler": SnowMauler,
  "cosmic-whale": CosmicWhale,
  "hive-stalker": HiveStalker,
  swarmling: Swarmling,
  "chitin-crusher": ChitinCrusher,
  "neon-gutter-cat": NeonGutterCat,
  "sewer-gator": SewerGator,
  "chomp-ball": ChompBall,
  "sludge-pup": SludgePup,
  "nebula-stalker": NebulaStalker,
  "dust-raptor": DustRaptor,
  "plasma-panther": PlasmaPanther,
  "scout-lizard": ScoutLizard,
  "void-krill-swarm": VoidKrillSwarm,
};
