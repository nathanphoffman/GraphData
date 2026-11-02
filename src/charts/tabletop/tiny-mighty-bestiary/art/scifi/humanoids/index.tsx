import type { ReactNode } from "react";
import { ChromeTrooper, DreadLord, DuskMonk, FuzzWarrior, IronMarshal, LaserGrunt, StarTempler } from "./Part1";
import {
  GearPriest,
  RuinKnight,
  ScrapjawBrawler,
  SilverSeer,
  SkyCoalitionWarrior,
  SuitGuard,
  WitchHunter,
} from "./Part2";
import { ChopShopDoc, ChromePsycho, GigCourier, NeonBusker, OrganBroker, StreetRazor, WireJockey } from "./Part3";
import { ArenaChampion, CantinaSmuggler, MegacorpChairman, RogueStarAce, SandRaider, ScrapGremlin } from "./Part4";
import { FieldMedicDroid, FleetAdmiral, RimScrapper, ShadowEmperor, ShipLordRegent } from "./Part5";

export const sciFiHumanoidsArt: Record<string, () => ReactNode> = {
  "chrome-trooper": ChromeTrooper,
  "fuzz-warrior": FuzzWarrior,
  "dusk-monk": DuskMonk,
  "dread-lord": DreadLord,
  "laser-grunt": LaserGrunt,
  "star-templar": StarTempler,
  "iron-marshal": IronMarshal,
  "scrapjaw-brawler": ScrapjawBrawler,
  "ruin-knight": RuinKnight,
  "silver-seer": SilverSeer,
  "sky-coalition-warrior": SkyCoalitionWarrior,
  "gear-priest": GearPriest,
  "witch-hunter": WitchHunter,
  "suit-guard": SuitGuard,
  "street-razor": StreetRazor,
  "wire-jockey": WireJockey,
  "chop-shop-doc": ChopShopDoc,
  "chrome-psycho": ChromePsycho,
  "neon-busker": NeonBusker,
  "gig-courier": GigCourier,
  "organ-broker": OrganBroker,
  "megacorp-chairman": MegacorpChairman,
  "scrap-gremlin": ScrapGremlin,
  "sand-raider": SandRaider,
  "cantina-smuggler": CantinaSmuggler,
  "arena-champion": ArenaChampion,
  "rogue-star-ace": RogueStarAce,
  "fleet-admiral": FleetAdmiral,
  "rim-scrapper": RimScrapper,
  "shadow-emperor": ShadowEmperor,
  "field-medic-droid": FieldMedicDroid,
  "ship-lord-regent": ShipLordRegent,
};
