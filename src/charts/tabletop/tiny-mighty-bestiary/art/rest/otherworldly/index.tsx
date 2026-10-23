import type { ReactNode } from "react";
import { WarpFiend, DreamEater, WarpLord, GhostInTheWire, RiftWhisperer } from "./Part1";
import { NeonShrineFox, BoilerGhost, StarlightWisp, WarpImp } from "./Part2";
import { GlitchGremlin, CogSprite, NetspaceWraith, DeepNetGod } from "./Part3";
import { AetherPoltergeist, AetherSovereign, PocketPetGhost, WarpSeer } from "./Part4";
import { WarpJester, DataSuccubus, TickTockWraith } from "./Part5";

export const restOtherworldlyArt: Record<string, () => ReactNode> = {
  "warp-fiend": WarpFiend,
  "dream-eater": DreamEater,
  "warp-lord": WarpLord,
  "ghost-in-the-wire": GhostInTheWire,
  "rift-whisperer": RiftWhisperer,
  "neon-shrine-fox": NeonShrineFox,
  "boiler-ghost": BoilerGhost,
  "starlight-wisp": StarlightWisp,
  "warp-imp": WarpImp,
  "glitch-gremlin": GlitchGremlin,
  "cog-sprite": CogSprite,
  "netspace-wraith": NetspaceWraith,
  "deep-net-god": DeepNetGod,
  "aether-poltergeist": AetherPoltergeist,
  "aether-sovereign": AetherSovereign,
  "pocket-pet-ghost": PocketPetGhost,
  "warp-seer": WarpSeer,
  "warp-jester": WarpJester,
  "data-succubus": DataSuccubus,
  "tick-tock-wraith": TickTockWraith,
};
