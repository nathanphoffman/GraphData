import type { ReactNode } from "react";
import { ButlerBot, ClockworkSpider, BrassDuelist, ZeppelinDread, NeonKoi, ChitteringSkull } from "./Part1";
import { CrystalSentinel, CrystalCourier, RuneWalker, ServoCherub, SiegeAutomaton, RiotDrone, ArcologyWarden, TinFootman } from "./Part2";
import { ServoJanitor, MeatGrinderAutomaton, ForgeSentinel, SootPigeon, IronDraftHorse, ChromeRatKing, HiveHound, BulkheadRavager } from "./Part3";
import { CyberHound, ChromePantherPrime, BoilerRhino, SteamDrake, PrismMoth, BouncingGrubPup, AstralStag } from "./Part4";
import { GrotHoundPack, ChaosHydra, BackAlleyTiger, BoilerWyrm, HiveWyvern, NeonPigeonFlock } from "./Part5";

export const restMachinesBeastsArt: Record<string, () => ReactNode> = {
  "butler-bot": ButlerBot,
  "clockwork-spider": ClockworkSpider,
  "brass-duelist": BrassDuelist,
  "zeppelin-dread": ZeppelinDread,
  "neon-koi": NeonKoi,
  "chittering-skull": ChitteringSkull,
  "crystal-sentinel": CrystalSentinel,
  "crystal-courier": CrystalCourier,
  "rune-walker": RuneWalker,
  "servo-cherub": ServoCherub,
  "siege-automaton": SiegeAutomaton,
  "riot-drone": RiotDrone,
  "arcology-warden": ArcologyWarden,
  "tin-footman": TinFootman,
  "servo-janitor": ServoJanitor,
  "meat-grinder-automaton": MeatGrinderAutomaton,
  "forge-sentinel": ForgeSentinel,
  "soot-pigeon": SootPigeon,
  "iron-draft-horse": IronDraftHorse,
  "chrome-rat-king": ChromeRatKing,
  "hive-hound": HiveHound,
  "bulkhead-ravager": BulkheadRavager,
  "cyber-hound": CyberHound,
  "chrome-panther-prime": ChromePantherPrime,
  "boiler-rhino": BoilerRhino,
  "steam-drake": SteamDrake,
  "prism-moth": PrismMoth,
  "bouncing-grub-pup": BouncingGrubPup,
  "astral-stag": AstralStag,
  "grot-hound-pack": GrotHoundPack,
  "chaos-hydra": ChaosHydra,
  "back-alley-tiger": BackAlleyTiger,
  "boiler-wyrm": BoilerWyrm,
  "hive-wyvern": HiveWyvern,
  "neon-pigeon-flock": NeonPigeonFlock,
};
