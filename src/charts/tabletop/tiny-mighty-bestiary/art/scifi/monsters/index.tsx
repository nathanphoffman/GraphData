import type { ReactNode } from "react";
import { OreMuncher, PitGorger, SandMaw, DuneWyrm, SlugLord } from "./Part1";
import { VatHorror, HiveLurker, RotColossus, VoidSerpent, VoidSultan } from "./Part2";
import { DuneGullet, SlugBoss, AsteroidLeviathan, VentCrawler, HangarGrub } from "./Part3";
import { AsteroidDevourer, NovaSlug, VacuumLurker, UploadGhost, StaticSprite, HangarHaunt } from "./Part4";
import { StarOracle, VoidWhisperer, NebulaPhantom, CometSprite, WillOWire, VoidBride } from "./Part5";

export const sciFiMonstersArt: Record<string, () => ReactNode> = {
  "ore-muncher": OreMuncher,
  "pit-gorger": PitGorger,
  "sand-maw": SandMaw,
  "dune-wyrm": DuneWyrm,
  "slug-lord": SlugLord,
  "vat-horror": VatHorror,
  "hive-lurker": HiveLurker,
  "rot-colossus": RotColossus,
  "void-serpent": VoidSerpent,
  "void-sultan": VoidSultan,
  "dune-gullet": DuneGullet,
  "slug-boss": SlugBoss,
  "asteroid-leviathan": AsteroidLeviathan,
  "vent-crawler": VentCrawler,
  "hangar-grub": HangarGrub,
  "asteroid-devourer": AsteroidDevourer,
  "nova-slug": NovaSlug,
  "vacuum-lurker": VacuumLurker,
  "upload-ghost": UploadGhost,
  "static-sprite": StaticSprite,
  "hangar-haunt": HangarHaunt,
  "star-oracle": StarOracle,
  "void-whisperer": VoidWhisperer,
  "nebula-phantom": NebulaPhantom,
  "comet-sprite": CometSprite,
  "will-o-wire": WillOWire,
  "void-bride": VoidBride,
};
