import { compassWord, measure, type GuideStar } from "../model/guideStars";
import { CONSTELLATIONS } from "../model/constellations";

const SIZE = 320;
const CENTRE = SIZE / 2;
const PAD = 52;
/** A fist held at arm's length covers about this many degrees of sky. */
const FIST = 10;

/** A round scale length (degrees) that fits in about a third of the chart. */
function niceScale(radius: number): number {
  const target = radius / 3;
  return [1, 2, 5, 10, 20, 30].reduce((best, v) => (Math.abs(v - target) < Math.abs(best - target) ? v : best));
}

function formatDegrees(d: number): string {
  return `${d < 10 ? d.toFixed(1) : d.toFixed(0)}°`;
}

/** Map of the three guide stars around the target with the distances to each, drawn to scale. North is up and east is left, as on a sky chart. */
export function FindingChart({ stars, target }: { stars: GuideStar[]; target: { ra: number; dec: number } }) {
  if (stars.length === 0) return null;
  const maxSep = Math.max(...stars.map((s) => s.separation));
  const px = (CENTRE - PAD) / maxSep;
  const place = (s: GuideStar) => ({
    x: CENTRE - Math.sin((s.bearing * Math.PI) / 180) * s.separation * px,
    y: CENTRE - Math.cos((s.bearing * Math.PI) / 180) * s.separation * px,
  });
  const points = stars.map(place);
  const scale = niceScale(maxSep);
  const rings = [scale, scale * 2, scale * 3].filter((r) => r * px < CENTRE - 6);
  // Faint stick figures for any constellation with a star inside the chart. Anything past the edge is clipped by the svg.
  const reach = CENTRE / px;
  const project = (p: { ra: number; dec: number }) => {
    const m = measure(target, p);
    return { sep: m.separation, x: CENTRE - Math.sin((m.bearing * Math.PI) / 180) * m.separation * px, y: CENTRE - Math.cos((m.bearing * Math.PI) / 180) * m.separation * px };
  };
  const figures = CONSTELLATIONS.map((c) => ({ name: c.name, lines: c.lines.map((chain) => chain.map(project)) }))
    .filter((c) => c.lines.some((chain) => chain.some((p) => p.sep < reach)))
    .map((c) => {
      const inside = c.lines.flat().filter((p) => p.sep < reach);
      return { ...c, labelX: inside.reduce((t, p) => t + p.x, 0) / inside.length, labelY: inside.reduce((t, p) => t + p.y, 0) / inside.length };
    });
  const barLeft = 12;
  const barY = SIZE - 12;

  return (
    <svg className="astro-guide" viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Triangulation chart: distances from the three nearest bright stars to the target">
      {figures.map((c) => (
        <g key={c.name}>
          {c.lines.map((chain, i) => (
            <polyline key={i} className="astro-guide-constellation" points={chain.map((p) => `${p.x},${p.y}`).join(" ")} />
          ))}
          <text className="astro-guide-constellation-name" x={c.labelX} y={c.labelY} textAnchor="middle">{c.name}</text>
        </g>
      ))}
      {rings.map((r) => (
        <circle key={r} className="astro-guide-ring" cx={CENTRE} cy={CENTRE} r={r * px} />
      ))}
      <polygon className="astro-guide-tri" points={points.map((p) => `${p.x},${p.y}`).join(" ")} />
      {points.map((p, i) => {
        const s = stars[i];
        const mx = (p.x + CENTRE) / 2;
        const my = (p.y + CENTRE) / 2;
        return (
          <g key={s.name}>
            <line className="astro-guide-line" x1={p.x} y1={p.y} x2={CENTRE} y2={CENTRE} />
            <text className="astro-guide-dist" x={mx} y={my} dy={-3} textAnchor="middle">{formatDegrees(s.separation)}</text>
            <circle className="astro-guide-star" cx={p.x} cy={p.y} r={Math.max(3, 6.5 - s.mag * 1.2)} />
            <text className="astro-guide-name" x={p.x} y={p.y + (p.y < CENTRE ? -10 : 17)} textAnchor={p.x < 60 ? "start" : p.x > SIZE - 60 ? "end" : "middle"}>{s.name}</text>
          </g>
        );
      })}
      <circle className="astro-guide-target" cx={CENTRE} cy={CENTRE} r={7} />
      <circle className="astro-guide-target" cx={CENTRE} cy={CENTRE} r={1.5} />
      <text className="astro-guide-dist" x={SIZE - 10} y={14} textAnchor="end">N ↑ · E ←</text>
      <line className="astro-guide-bar" x1={barLeft} y1={barY} x2={barLeft + scale * px} y2={barY} />
      <line className="astro-guide-bar" x1={barLeft} y1={barY - 4} x2={barLeft} y2={barY + 4} />
      <line className="astro-guide-bar" x1={barLeft + scale * px} y1={barY - 4} x2={barLeft + scale * px} y2={barY + 4} />
      <text className="astro-guide-dist" x={barLeft + scale * px + 6} y={barY + 4}>{scale}° (rings every {scale}°)</text>
    </svg>
  );
}

/** Distance and direction from each guide star to the target, in words. */
export function GuideList({ stars }: { stars: GuideStar[] }) {
  return (
    <ul className="astro-guide-list">
      {stars.map((s) => (
        <li key={s.name}>
          <strong>{s.name}</strong> (mag {s.mag.toFixed(1)}): target is {formatDegrees(s.separation)} ({(s.separation / FIST).toFixed(1)} fists) to its {compassWord((s.bearing + 180) % 360)}
        </li>
      ))}
    </ul>
  );
}
