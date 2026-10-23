import { TYPE_SYMBOLS } from "./heat";

/** Footnotes under the table, including where the data came from. */
export function Footnotes({ source }: { source: string }) {
  return (
    <>
      <p className="muted astro-source">
        Types: {Object.entries(TYPE_SYMBOLS).map(([type, symbol]) => `${symbol} ${type}`).join(" · ")}.
      </p>
      <p className="muted astro-source">
        Score = Sky × Size fit × Light × Core, scaled to 100, weighted Size fit 40%, Core 30%, Light 20% and Sky 10%. Sky: how high it is during your window. Size fit: how
        well it fills your field of view (big targets need a short focal length). Light: the target's average surface brightness (its light spread over its area) against what your mirror or lens can show, after light pollution (which hurts more near the horizon). Core: the same test on the bright centre, since a compact core is easy to spot even when the whole object is faint. {source}
      </p>
    </>
  );
}
