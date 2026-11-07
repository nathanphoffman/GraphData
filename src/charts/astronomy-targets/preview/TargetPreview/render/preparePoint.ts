import { AVERTED_BOOST, BLOOM_RANGE, BLOOM_START, SCALE } from "./constants";

/** Stars and planets are far smaller than a pixel of the field, so they are drawn as a glowing dot, not from the photo. */
export function preparePoint(
  context: CanvasRenderingContext2D,
  size: number,
  pointMargin: number,
  skyGlow: number,
  quality: number,
) {
  const frame = context.createImageData(size, size);
  const d = frame.data;
  const half = size / 2;

  // Poor optics smear a star into a bigger, hazier dot; good optics keep it tight.
  const poor = Math.max(0, -quality);
  const skyLevel = skyGlow ** 2.5 * 0.3 + 0.015 * poor;
  const base = [0.86, 0.93, 1.0];
  const skyTint = [1, 0.82, 0.62];

  // Returns a renderer for a given averted-vision level (0 = looking straight at it, 1 = looking beside it), for point-like targets.
  return (averted: number) => {
    // Brighter points bloom bigger; one that is only just brighter than the faintest star shows as a tiny dot.
    const reach = Math.max(0, Math.min(0.6 * (pointMargin + AVERTED_BOOST * averted), 8));
    const glowRadius = (2 + 2.5 * reach) * SCALE * (1 + 0.6 * poor);

    // Only things far brighter than the faintest star bloom; faint points (small planetary nebulae, dim stars) stay sharp pinpoints.
    const bloom = Math.max(0, Math.min(1, (pointMargin + AVERTED_BOOST * averted - BLOOM_START) / BLOOM_RANGE));

    for (let p = 0; p < size * size; p++) {
      const index = p * 4;
      const dist = Math.hypot((p % size) - half, Math.floor(p / size) - half);
      d[index + 3] = 255;

      if (dist > half) {
        d[index] = d[index + 1] = d[index + 2] = 0;
        continue;
      }

      const level = Math.min(
        1,
        Math.exp(-((dist / (1.2 * SCALE * (1 + 0.5 * poor))) ** 2)) +
          bloom * (0.35 + 0.2 * poor) * Math.exp(-dist / glowRadius),
      );
      const vignette = 1 - 0.25 * (dist / half) ** 2;

      for (let c = 0; c < 3; c++) {
        const value = Math.min(1, skyLevel * skyTint[c] + level * base[c]) * vignette;
        d[index + c] = Math.round(255 * value ** (1 / 2.2));
      }
    }

    context.putImageData(frame, 0, 0);
  };
}
