import type { ReactNode } from "react";
import { HauntedDoll, GhostGalleon, GiantSpider, HornedJackrabbit, DreamCat, Goblin, GrandpaGiant } from "./Part1";
import { ErrantKnight, GreenwoodArcher, Hexmaster, DuskEnchantress, HoodedHeadsman, IronWarlord, HollowThrall } from "./Part2";
import { FrostKing, GraveClerk, Dragon, JellyBlock, GreatRoc, HullCrusher, GiggleSprite } from "./Part3";
import { GraveKnight, Hellspawn, HauntedSheriff, Ghoul, GallowsTree, GraveImp, HearthSpirit } from "./Part4";
import { FerrymanOfSouls, DrownedCaptain, GaslampSpecter } from "./Part5";

export const fantasyArtDK: Record<string, () => ReactNode> = {
  "haunted-doll": HauntedDoll,
  "ghost-galleon": GhostGalleon,
  "giant-spider": GiantSpider,
  "horned-jackrabbit": HornedJackrabbit,
  "dream-cat": DreamCat,
  goblin: Goblin,
  "grandpa-giant": GrandpaGiant,
  "errant-knight": ErrantKnight,
  "greenwood-archer": GreenwoodArcher,
  hexmaster: Hexmaster,
  "dusk-enchantress": DuskEnchantress,
  "hooded-headsman": HoodedHeadsman,
  "iron-warlord": IronWarlord,
  "hollow-thrall": HollowThrall,
  "frost-king": FrostKing,
  "grave-clerk": GraveClerk,
  dragon: Dragon,
  "jelly-block": JellyBlock,
  "great-roc": GreatRoc,
  "hull-crusher": HullCrusher,
  "giggle-sprite": GiggleSprite,
  "grave-knight": GraveKnight,
  hellspawn: Hellspawn,
  "haunted-sheriff": HauntedSheriff,
  ghoul: Ghoul,
  "gallows-tree": GallowsTree,
  "grave-imp": GraveImp,
  "hearth-spirit": HearthSpirit,
  "ferryman-of-souls": FerrymanOfSouls,
  "drowned-captain": DrownedCaptain,
  "gaslamp-specter": GaslampSpecter,
};
