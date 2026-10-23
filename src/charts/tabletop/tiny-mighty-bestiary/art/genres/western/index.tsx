import type { ReactNode } from "react";
import { RunawayLocomotive, ClockworkGunslinger, IronHorseAutomaton, GallowsMarionette } from "./Part1";
import { TumbleweedWarBot, DustRattler, ThunderHerd, GreatWhiteBuffalo, JackalopeGang, PrairieHawk } from "./Part2";
import { PrairieSkyray, MaskHunter, QuickdrawOutlaw, BanditChief, DoomsdayPreacher, SaloonBrawler } from "./Part3";
import { GreenhornDeputy, RailroadBaron, OutlawKing, FrontierDoc, GilaGiant, GoatSucker } from "./Part4";
import { CactusCrawler, CanyonWurm, MesaTitan, SandstormRoc, BadlandsDevil, DustDevil } from "./Part5";

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
