import type { ReactNode } from "react";
import { ClockworkGunslinger, GallowsMarionette, IronHorseAutomaton, RunawayLocomotive } from "./Part1";
import { DustRattler, GreatWhiteBuffalo, JackalopeGang, PrairieHawk, ThunderHerd, TumbleweedWarBot } from "./Part2";
import { BanditChief, DoomsdayPreacher, MaskHunter, PrairieSkyray, QuickdrawOutlaw, SaloonBrawler } from "./Part3";
import { FrontierDoc, GilaGiant, GoatSucker, GreenhornDeputy, OutlawKing, RailroadBaron } from "./Part4";
import { BadlandsDevil, CactusCrawler, CanyonWurm, DustDevil, MesaTitan, SandstormRoc } from "./Part5";

export const westernArt: Record<string, () => ReactNode> = {
  "runaway-locomotive": RunawayLocomotive,
  "clockwork-gunslinger": ClockworkGunslinger,
  "iron-horse-automaton": IronHorseAutomaton,
  "gallows-marionette": GallowsMarionette,
  "tumbleweed-war-bot": TumbleweedWarBot,
  "dust-rattler": DustRattler,
  "thunder-herd": ThunderHerd,
  "great-white-buffalo": GreatWhiteBuffalo,
  "jackalope-gang": JackalopeGang,
  "prairie-hawk": PrairieHawk,
  "prairie-skyray": PrairieSkyray,
  "mask-hunter": MaskHunter,
  "quickdraw-outlaw": QuickdrawOutlaw,
  "bandit-chief": BanditChief,
  "doomsday-preacher": DoomsdayPreacher,
  "saloon-brawler": SaloonBrawler,
  "greenhorn-deputy": GreenhornDeputy,
  "railroad-baron": RailroadBaron,
  "outlaw-king": OutlawKing,
  "frontier-doc": FrontierDoc,
  "gila-giant": GilaGiant,
  "goat-sucker": GoatSucker,
  "cactus-crawler": CactusCrawler,
  "canyon-wurm": CanyonWurm,
  "mesa-titan": MesaTitan,
  "sandstorm-roc": SandstormRoc,
  "badlands-devil": BadlandsDevil,
  "dust-devil": DustDevil,
};
