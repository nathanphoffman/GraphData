import type { ReactNode } from "react";
import { FigureheadGuardian, KnotSnake, RiggingMarionette, CursedManOWar, IronMaidenCannon, GaleGargoyle } from "./Part1";
import { MastPuppet, ParrotLookout, PirateCrab, ReefShark, HammerheadTerror, KrakenSpawn, DrownedPack } from "./Part2";
import { AlbatrossOmen, GreatWhiteTerror, DeckhandScallywag, PressGanger, CutlassCorsair, NavyLieutenant, PirateCaptain } from "./Part3";
import { RoyalMarineSergeant, PirateKing, ShipsSurgeon, IroncladQuartermaster, BarnacleBiter, SeaSerpent, MaelstromLeviathan } from "./Part4";
import { CatacombCrawler, BilgeSprite, SquallWraith, CabinBoyGhost, LanternKeeperGhost, SpectralLeviathanCaptain, GhostTide } from "./Part5";

export const ageOfSailArt: Record<string, () => ReactNode> = {
  "figurehead-guardian": FigureheadGuardian,
  "knot-snake": KnotSnake,
  "rigging-marionette": RiggingMarionette,
  "cursed-man-o-war": CursedManOWar,
  "iron-maiden-cannon": IronMaidenCannon,
  "gale-gargoyle": GaleGargoyle,
  "mast-puppet": MastPuppet,
  "parrot-lookout": ParrotLookout,
  "pirate-crab": PirateCrab,
  "reef-shark": ReefShark,
  "hammerhead-terror": HammerheadTerror,
  "kraken-spawn": KrakenSpawn,
  "drowned-pack": DrownedPack,
  "albatross-omen": AlbatrossOmen,
  "great-white-terror": GreatWhiteTerror,
  "deckhand-scallywag": DeckhandScallywag,
  "press-ganger": PressGanger,
  "cutlass-corsair": CutlassCorsair,
  "navy-lieutenant": NavyLieutenant,
  "pirate-captain": PirateCaptain,
  "royal-marine-sergeant": RoyalMarineSergeant,
  "pirate-king": PirateKing,
  "ships-surgeon": ShipsSurgeon,
  "ironclad-quartermaster": IroncladQuartermaster,
  "barnacle-biter": BarnacleBiter,
  "sea-serpent": SeaSerpent,
  "maelstrom-leviathan": MaelstromLeviathan,
  "catacomb-crawler": CatacombCrawler,
  "bilge-sprite": BilgeSprite,
  "squall-wraith": SquallWraith,
  "cabin-boy-ghost": CabinBoyGhost,
  "lantern-keeper-ghost": LanternKeeperGhost,
  "spectral-leviathan-captain": SpectralLeviathanCaptain,
  "ghost-tide": GhostTide,
};
