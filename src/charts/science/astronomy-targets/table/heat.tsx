const pct = (v: number) => `${Math.round(v * 100)}%`;

/** Red (0) through yellow to green (1), see-through so it works on light and dark backgrounds. */
export const heat = (v: number, alpha = 0.35) => `hsl(${Math.round(Math.min(1, Math.max(0, v)) * 120)} 70% 45% / ${alpha})`;

export function Percent({ value }: { value: number }) {
  return <span className="astro-heat" style={{ background: heat(value) }}>{pct(value)}</span>;
}

export const TYPE_SYMBOLS: Record<string, string> = {
  Galaxy: "🌀",
  "Open cluster": "✨",
  "Globular cluster": "🔮",
  Nebula: "☁️",
  "Planetary nebula": "💍",
  "Supernova remnant": "💥",
  "Double star": "🌟",
  Star: "⭐",
  Planet: "🪐",
  Moon: "🌙",
};
