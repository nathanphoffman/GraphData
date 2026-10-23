import type { ReactNode } from "react";
import { LivingArmor, MossTortoise, MountainMammoth, Orc, Ogre, LegendaryChampion } from "./Part1";
import { Owlbear, MountainDinosaur, PuffDragon, MountainGriffin, PipeWyrm, MushroomMayor } from "./Part2";
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
