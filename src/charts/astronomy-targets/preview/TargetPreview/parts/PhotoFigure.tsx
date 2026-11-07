import type { Target } from "../../../model/types";
import type { TargetImage } from "../../images";
import { VIEW_SIZE } from "../render/constants";
import type { LoadedPhoto } from "../state/useLoadedPhoto";
import { CIRCLE_BELOW, TargetCircle } from "./TargetCircle";

interface Props {
  target: Target;
  info: TargetImage;
  loaded: LoadedPhoto | null;
}

/** The target's photo, with a red circle round the target when it is only a small part of the picture. */
export default function PhotoFigure({ target, info, loaded }: Props) {
  const circled = loaded && info.footprint && !info.noCircle && target.major > 0 && target.major / info.widthArcmin < CIRCLE_BELOW;

  return (
    <figure>
      <div className="astro-photo">
        <img src={info.src} alt={target.nickname || target.id} style={{ height: VIEW_SIZE }} />
        {loaded && <TargetCircle target={target} info={info} img={loaded.img} />}
      </div>
      <figcaption>Photo{circled ? " (target circled)" : ""}</figcaption>
    </figure>
  );
}
