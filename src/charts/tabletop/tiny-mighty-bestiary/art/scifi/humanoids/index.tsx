import type { ReactNode } from "react";
import { ChromeTrooper, FuzzWarrior, DuskMonk, DreadLord, LaserGrunt, StarTempler, IronMarshal } from "./Part1";
import { ScrapjawBrawler, RuinKnight, SilverSeer, SkyCoalitionWarrior, GearPriest, WitchHunter, SuitGuard } from "./Part2";
import { StreetRazor, WireJockey, ChopShopDoc, ChromePsycho, NeonBusker, GigCourier, OrganBroker } from "./Part3";
import { MegacorpChairman, ScrapGremlin, SandRaider, CantinaSmuggler, ArenaChampion, RogueStarAce } from "./Part4";
import { FleetAdmiral, RimScrapper, ShadowEmperor, FieldMedicDroid, ShipLordRegent } from "./Part5";

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
