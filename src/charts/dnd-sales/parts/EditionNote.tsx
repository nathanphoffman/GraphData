import { model } from "../chart_scale";
import type { Confidence, Edition } from "../types";

const CONFIDENCE_LABEL: Record<Confidence, string> = {
  guess: "Mostly a guess",
  low: "Low: community estimates",
  medium: "Medium: some hard data",
};

/** How an edition's number was reached: its estimates, how sure they are, the note and the sources. */
export default function EditionNote({ edition }: { edition: Edition }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <strong>{edition.name}</strong> ({edition.year}): {edition.best}M best guess, range {edition.low}-{edition.high}M.{" "}
      <span className="muted">{CONFIDENCE_LABEL[edition.confidence]}.</span>
      <div>{edition.note}</div>
      {edition.sources.length > 0 && (
        <div className="muted">
          Sources:{" "}
          {edition.sources.map((source, index) => (
            <span key={source}>
              {index > 0 && ", "}
              <a href={model.sources[source].url} target="_blank" rel="noreferrer">
                {model.sources[source].label}
              </a>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
