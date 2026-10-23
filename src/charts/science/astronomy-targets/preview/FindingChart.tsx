import { compassWord, measure, type GuideStar } from "../model/guideStars";
import { CONSTELLATIONS } from "../model/constellations";

const SIZE = 320;
const CENTRE = SIZE / 2;
const PADDING = 52;

/** A fist held at arm's length covers about this many degrees of sky. */
const FIST = 10;

/** A round scale length (degrees) that fits in about a third of the chart. */
function niceScale(radius: number): number {
  const target = radius / 3;

  // Pick the nicest round field size closest to the target by keeping whichever candidate is nearest so far.
  return [1, 2, 5, 10, 20, 30].reduce((best, value) => (Math.abs(value - target) < Math.abs(best - target) ? value : best));
}

/** Degrees with one decimal and a degree sign. */
function formatDegrees(d: number): string {
  return `${d < 10 ? d.toFixed(1) : d.toFixed(0)}°`;
}

/** Map of the three guide stars around the target with the distances to each, drawn to scale. North is up and east is left, as on a sky chart. */
export function FindingChart({ stars, target }: { stars: GuideStar[]; target: { ra: number; dec: number } }) {
  if (stars.length === 0) return null;
  const maxSep = Math.max(...stars.map((guideStar) => guideStar.separation));
  const pixels = (CENTRE - PADDING) / maxSep;

  // Turn a guide star's bearing and distance into a point on the chart.
  const place = (guideStar: GuideStar) => ({
    x: CENTRE - Math.sin((guideStar.bearing * Math.PI) / 180) * guideStar.separation * pixels,
    y: CENTRE - Math.cos((guideStar.bearing * Math.PI) / 180) * guideStar.separation * pixels,
  });

  const points = stars.map(place);
  const scale = niceScale(maxSep);
  const rings = [scale, scale * 2, scale * 3].filter((r) => r * pixels < CENTRE - 6);

  // Faint stick figures for any constellation with a star inside the chart. Anything past the edge is clipped by the svg.
  const reach = CENTRE / pixels;

  // Turn a sky position into a chart point, relative to the target in the middle.
  const project = (p: { ra: number; dec: number }) => {
    const m = measure(target, p);

    return { sep: m.separation, x: CENTRE - Math.sin((m.bearing * Math.PI) / 180) * m.separation * pixels, y: CENTRE - Math.cos((m.bearing * Math.PI) / 180) * m.separation * pixels };
  };

  const figures = CONSTELLATIONS.map((constellationFigure) => ({ name: constellationFigure.name, lines: constellationFigure.lines.map((chain) => chain.map(project)) }))
    .filter((c) => c.lines.some((chain) => chain.some((p) => p.sep < reach)))

    // Put each constellation name at the middle of its lines that fall inside the chart.
    .map((c) => {
      const inside = c.lines.flat().filter((line) => line.sep < reach);

      // Label sits at the average position of the points inside the view, so it stays near the visible part.
      return { ...c, labelX: inside.reduce((t, p) => t + p.x, 0) / inside.length, labelY: inside.reduce((t, p) => t + p.y, 0) / inside.length };
    });

  const barLeft = 12;
  const barY = SIZE - 12;

  // Draw the constellation outlines first, then the guide stars and distances on top.
  return (
    <svg className="astro-guide" viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Triangulation chart: distances from the three nearest bright stars to the target">
      {/* Draw each constellation's lines and its name. */}
      {figures.map((figure) => (
        <g key={figure.name}>
          {/* One line of connected stars. */}
          {figure.lines.map((chain, index) => (
            <polyline key={index} className="astro-guide-constellation" points={chain.map((p) => `${p.x},${p.y}`).join(" ")} />
          ))}
          <text className="astro-guide-constellation-name" x={figure.labelX} y={figure.labelY} textAnchor="middle">{figure.name}</text>
        </g>
      ))}

      {/* One ring per distance, so you can judge how far each guide star is. */}
      {rings.map((ring) => (
        <circle key={ring} className="astro-guide-ring" cx={CENTRE} cy={CENTRE} r={ring * pixels} />
      ))}
      <polygon className="astro-guide-tri" points={points.map((point) => `${point.x},${point.y}`).join(" ")} />
      {/* Draw each guide star with its distance label halfway along the line to the target. */}
      {points.map((point, index) => {
        const guideStar = stars[index];
        const mx = (point.x + CENTRE) / 2;
        const my = (point.y + CENTRE) / 2;

        return (
          <g key={guideStar.name}>
            <line className="astro-guide-line" x1={point.x} y1={point.y} x2={CENTRE} y2={CENTRE} />
            <text className="astro-guide-dist" x={mx} y={my} dy={-3} textAnchor="middle">{formatDegrees(guideStar.separation)}</text>
            <circle className="astro-guide-star" cx={point.x} cy={point.y} r={Math.max(3, 6.5 - guideStar.mag * 1.2)} />
            {/* Keep the label away from the chart edges by flipping it above or beside the point. */}
            <text className="astro-guide-name" x={point.x} y={point.y + (point.y < CENTRE ? -10 : 17)} textAnchor={point.x < 60 ? "start" : point.x > SIZE - 60 ? "end" : "middle"}>{guideStar.name}</text>
          </g>
        );
      })}
      <circle className="astro-guide-target" cx={CENTRE} cy={CENTRE} r={7} />
      <circle className="astro-guide-target" cx={CENTRE} cy={CENTRE} r={1.5} />
      <text className="astro-guide-dist" x={SIZE - 10} y={14} textAnchor="end">N ↑ · E ←</text>
      <line className="astro-guide-bar" x1={barLeft} y1={barY} x2={barLeft + scale * pixels} y2={barY} />
      <line className="astro-guide-bar" x1={barLeft} y1={barY - 4} x2={barLeft} y2={barY + 4} />
      <line className="astro-guide-bar" x1={barLeft + scale * pixels} y1={barY - 4} x2={barLeft + scale * pixels} y2={barY + 4} />
      <text className="astro-guide-dist" x={barLeft + scale * pixels + 6} y={barY + 4}>{scale}° (rings every {scale}°)</text>
    </svg>
  );
}

/** Distance and direction from each guide star to the target, in words. */
export function GuideList({ stars }: { stars: GuideStar[] }) {
  return (
    <ul className="astro-guide-list">
      {/* One line of written directions per guide star. */}
      {stars.map((guideStar) => (
        <li key={guideStar.name}>
          <strong>{guideStar.name}</strong> (mag {guideStar.mag.toFixed(1)}): target is {formatDegrees(guideStar.separation)} ({(guideStar.separation / FIST).toFixed(1)} fists) to its {compassWord((guideStar.bearing + 180) % 360)}
        </li>
      ))}
    </ul>
  );
}
