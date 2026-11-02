import type { ReactNode } from "react";
import { LegendaryChampion, LivingArmor, MossTortoise, MountainMammoth, Ogre, Orc } from "./Part1";
import { MountainDinosaur, MountainGriffin, MushroomMayor, Owlbear, PipeWyrm, PuffDragon } from "./Part2";
import { Moonhorn, PocketSprite } from "./Part3";

export const fantasyArtLP: Record<string, () => ReactNode> = {
  "living-armor": LivingArmor,
  "moss-tortoise": MossTortoise,
  "mountain-mammoth": MountainMammoth,
  orc: Orc,
  ogre: Ogre,
  "legendary-champion": LegendaryChampion,
  owlbear: Owlbear,
  "mountain-dinosaur": MountainDinosaur,
  "puff-dragon": PuffDragon,
  "mountain-griffin": MountainGriffin,
  "pipe-wyrm": PipeWyrm,
  "mushroom-mayor": MushroomMayor,
  moonhorn: Moonhorn,
  "pocket-sprite": PocketSprite,
};
