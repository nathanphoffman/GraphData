import type { ReactNode } from "react";
import { GoggledInventor, AirshipPirate, SmogBaron, BackAlleySurgeon, ApprenticeTinker, IndustrialMagnate } from "./Part1";
import { SyndicateEnforcer, StarforgedSquire, AstralArchmage, IronCrusadeLord, BrassWarlord, ChimneyUrchin, CyberSamuraiChampion } from "./Part2";
import { BumblingGuardsman, BoilerhouseMender, StarLanternHealer, HullBreakerGrunt, SmugglerSparker, VendingMachineMimic, SewerVatHorror, BoilerbackWyrm } from "./Part3";
import { AlleySlime, BoilerNewt, TunnelSpawn, WarpBehemoth, BiolabEscapee, OilSlickCrawler, FurnaceMaw } from "./Part4";
import { GrotGobbler, SkyPikeBrood, SmogDrake, GutterHag, ChromeGargoyle } from "./Part5";

export const restHumanoidsMonstersArt: Record<string, () => ReactNode> = {
  "goggled-inventor": GoggledInventor,
  "airship-pirate": AirshipPirate,
  "smog-baron": SmogBaron,
  "back-alley-surgeon": BackAlleySurgeon,
  "apprentice-tinker": ApprenticeTinker,
  "industrial-magnate": IndustrialMagnate,
  "syndicate-enforcer": SyndicateEnforcer,
  "starforged-squire": StarforgedSquire,
  "astral-archmage": AstralArchmage,
  "iron-crusade-lord": IronCrusadeLord,
  "brass-warlord": BrassWarlord,
  "chimney-urchin": ChimneyUrchin,
  "cyber-samurai-champion": CyberSamuraiChampion,
  "bumbling-guardsman": BumblingGuardsman,
  "boilerhouse-mender": BoilerhouseMender,
  "star-lantern-healer": StarLanternHealer,
  "hull-breaker-grunt": HullBreakerGrunt,
  "smuggler-sparker": SmugglerSparker,
  "vending-machine-mimic": VendingMachineMimic,
  "sewer-vat-horror": SewerVatHorror,
  "boilerback-wyrm": BoilerbackWyrm,
  "alley-slime": AlleySlime,
  "boiler-newt": BoilerNewt,
  "tunnel-spawn": TunnelSpawn,
  "warp-behemoth": WarpBehemoth,
  "biolab-escapee": BiolabEscapee,
  "oil-slick-crawler": OilSlickCrawler,
  "furnace-maw": FurnaceMaw,
  "grot-gobbler": GrotGobbler,
  "sky-pike-brood": SkyPikeBrood,
  "smog-drake": SmogDrake,
  "gutter-hag": GutterHag,
  "chrome-gargoyle": ChromeGargoyle,
};
