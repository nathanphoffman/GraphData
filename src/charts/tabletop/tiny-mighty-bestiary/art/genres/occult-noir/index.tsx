import type { ReactNode } from "react";
import { MidnightRadio, MannequinButler, PossessedTypewriter, CursedHearse, WaxworkStalker, HauntedUmbrella, GraveShiftGurney } from "./Part1";
import { VoidHound, LibrarySilverfish, CrowInformant, GraveyardHound, HellhoundStalker, OverdramaticRaven, BarghestWarden, RobedCultist } from "./Part2";
import { CultMagister, EagerCultist, CurioDealer, TeaRoomMedium, CultInquisitor, MidnightKingpin, NosyLandlady, ParishExorcist } from "./Part3";
import { BlackOozeMass, TentacledBellhop, WallpaperThing, DrainLeech, BasementElder, BatSwarmColossus, BrainDrinker } from "./Part4";
import { BrinyKin, FacelessGaunt, PaleFungoid, StarWing, LampPostGhoul, SaloonSpirit, SunkenLighthouseKeeper, HollowMan } from "./Part5";

export const occultNoirArt: Record<string, () => ReactNode> = {
  "midnight-radio": MidnightRadio,
  "mannequin-butler": MannequinButler,
  "possessed-typewriter": PossessedTypewriter,
  "cursed-hearse": CursedHearse,
  "waxwork-stalker": WaxworkStalker,
  "haunted-umbrella": HauntedUmbrella,
  "grave-shift-gurney": GraveShiftGurney,
  "void-hound": VoidHound,
  "library-silverfish": LibrarySilverfish,
  "crow-informant": CrowInformant,
  "graveyard-hound": GraveyardHound,
  "hellhound-stalker": HellhoundStalker,
  "overdramatic-raven": OverdramaticRaven,
  "barghest-warden": BarghestWarden,
  "robed-cultist": RobedCultist,
  "cult-magister": CultMagister,
  "eager-cultist": EagerCultist,
  "curio-dealer": CurioDealer,
  "tea-room-medium": TeaRoomMedium,
  "cult-inquisitor": CultInquisitor,
  "midnight-kingpin": MidnightKingpin,
  "nosy-landlady": NosyLandlady,
  "parish-exorcist": ParishExorcist,
  "black-ooze-mass": BlackOozeMass,
  "tentacled-bellhop": TentacledBellhop,
  "wallpaper-thing": WallpaperThing,
  "drain-leech": DrainLeech,
  "basement-elder": BasementElder,
  "bat-swarm-colossus": BatSwarmColossus,
  "brain-drinker": BrainDrinker,
  "briny-kin": BrinyKin,
  "faceless-gaunt": FacelessGaunt,
  "pale-fungoid": PaleFungoid,
  "star-wing": StarWing,
  "lamp-post-ghoul": LampPostGhoul,
  "saloon-spirit": SaloonSpirit,
  "sunken-lighthouse-keeper": SunkenLighthouseKeeper,
  "hollow-man": HollowMan,
};
