import type { TargetDetails } from "../../../model/types";
import { GuideList } from "../../FindingChart";

interface Props {
  extra: TargetDetails;

  /** Facts too long for a stat tile, listed as sentences. */
  notes: { label: string; value: string }[];
  guideStars: Parameters<typeof GuideList>[0]["stars"];
}

/** What the target is, how to find it, and the bright stars to find it from. */
export default function AboutText({ extra, notes, guideStars }: Props) {
  return (
    <>
      <h5>About</h5>
      <p>{extra.about}</p>
      {notes.length > 0 && (
        <ul>
          {notes.map((note) => (
            <li key={note.label}>
              <strong>{note.label}:</strong> {note.value}
            </li>
          ))}
        </ul>
      )}
      <h5>How to find it</h5>
      <p>{extra.howToFind}</p>
      {guideStars.length > 0 && (
        <>
          <h5>Triangulate from bright stars</h5>
          <GuideList stars={guideStars} />
        </>
      )}
      <small>A fist held at arm's length is about 10°, three fingers about 5°, your thumb about 2°.</small>
    </>
  );
}
