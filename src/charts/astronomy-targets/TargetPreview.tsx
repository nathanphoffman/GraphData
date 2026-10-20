import { useEffect, useRef, useState } from "react";
import type { ScoredTarget, Settings, Target, TargetDetails } from "./types";
import details from "../../../data/astronomy-target-details.json";
import { difficulty, effectiveQuality, formatHour, formatSize, isNakedEye, previewOptics, surfaceBrightness, viewConditions } from "./calculate";
import { TARGET_IMAGES, type TargetImage } from "./images";

const VIEW_SIZE = 280;
const SCALE = 2;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Average linear brightness of the photo (or of the target's own oval within it), used as "the target's typical surface brightness". */
function measurePhoto(img: HTMLImageElement, info: TargetImage, target: Target): { mean: number; bg: number } {
  const w = 256;
  const h = Math.round(w * (img.naturalHeight / img.naturalWidth));
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  if (!g) return { mean: 0.05, bg: 0 };
  g.drawImage(img, 0, 0, w, h);
  const px = g.getImageData(0, 0, w, h).data;
  const f = info.footprint;
  const pxPerArcmin = w / info.widthArcmin;
  const a = (target.major / 2) * pxPerArcmin;
  const b = (target.minor / 2) * pxPerArcmin;
  const angle = ((f?.angleDeg ?? 0) * Math.PI) / 180;
  let sum = 0;
  let n = 0;
  const all: number[] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const lum = Math.pow((0.3 * px[i] + 0.59 * px[i + 1] + 0.11 * px[i + 2]) / 255, 2.2);
      all.push(lum);
      if (f) {
        const dx = x - f.cx * w;
        const dy = y - f.cy * h;
        const u = dx * Math.cos(angle) + dy * Math.sin(angle);
        const v = -dx * Math.sin(angle) + dy * Math.cos(angle);
        if ((u / a) ** 2 + (v / b) ** 2 > 1) continue;
      }
      sum += lum;
      n++;
    }
  }
  // The photo's own sky level (its dim 10th percentile) is not part of the target, so it is taken off before brightening.
  all.sort((p, q) => p - q);
  const bg = all[Math.floor(all.length * 0.1)] ?? 0;
  return { mean: Math.max(0.005, (n ? sum / n : 0.05) - bg), bg };
}

/** Targets smaller than this share of the photo's width get a red circle on the photo, so you can tell which thing in the picture is the target. */
const CIRCLE_BELOW = 0.5;
/** The circle is never smaller than this share of the photo's width, so tiny targets can still be found. */
const CIRCLE_MIN = 0.03;

/** A red outline around the target on the photo, when the target is only a small part of what the photo shows. */
function TargetCircle({ target, info, img }: { target: Target; info: TargetImage; img: HTMLImageElement }) {
  const f = info.footprint;
  if (!f || target.major <= 0 || target.major / info.widthArcmin >= CIRCLE_BELOW) return null;
  const w = info.widthArcmin;
  const h = w * (img.naturalHeight / img.naturalWidth);
  const min = (w * CIRCLE_MIN) / 2;
  const cx = f.cx * w;
  const cy = f.cy * h;
  return (
    <svg className="astro-circle" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <ellipse cx={cx} cy={cy} rx={Math.max(target.major / 2, min)} ry={Math.max(target.minor / 2, min)} transform={`rotate(${f.angleDeg} ${cx} ${cy})`} />
    </svg>
  );
}

/** How much more you see looking slightly off to the side of the target (the eye's rod cells are more sensitive), in magnitudes. */
const AVERTED_BOOST = 0.9;
/** Dark-adapted eyes see red as dark and blue-green as bright, and sky-survey photos are red-heavy, so the photo's red is turned down and its blue turned up. */
const COOL_BALANCE = [0.65, 0.9, 1.15];
/** Magnitudes above the faintest star where a point starts to glow, and how much further it takes to glow fully. */
const BLOOM_START = 4;
const BLOOM_RANGE = 6;
/** Seconds for one full direct, averted, direct cycle. */
const CYCLE_SECONDS = 8;

/** Stars and planets are far smaller than a pixel of the field, so they are drawn as a glowing dot, not from the photo. */
function preparePoint(g: CanvasRenderingContext2D, size: number, pointMargin: number, skyGlow: number, quality: number) {
  const frame = g.createImageData(size, size);
  const d = frame.data;
  const half = size / 2;
  // Poor optics smear a star into a bigger, hazier dot; good optics keep it tight.
  const poor = Math.max(0, -quality);
  const skyLevel = Math.pow(skyGlow, 2.5) * 0.3 + 0.015 * poor;
  const base = [0.86, 0.93, 1.0];
  const skyTint = [1, 0.82, 0.62];
  return (averted: number) => {
    // Brighter points bloom bigger; one that is only just brighter than the faintest star shows as a tiny dot.
    const reach = Math.max(0, Math.min(0.6 * (pointMargin + AVERTED_BOOST * averted), 8));
    const glowRadius = (2 + 2.5 * reach) * SCALE * (1 + 0.6 * poor);
    // Only things far brighter than the faintest star bloom; faint points (small planetary nebulae, dim stars) stay sharp pinpoints.
    const bloom = Math.max(0, Math.min(1, (pointMargin + AVERTED_BOOST * averted - BLOOM_START) / BLOOM_RANGE));
    for (let p = 0; p < size * size; p++) {
      const i = p * 4;
      const dist = Math.hypot((p % size) - half, Math.floor(p / size) - half);
      d[i + 3] = 255;
      if (dist > half) {
        d[i] = d[i + 1] = d[i + 2] = 0;
        continue;
      }
      const level = Math.min(1, Math.exp(-((dist / (1.2 * SCALE * (1 + 0.5 * poor))) ** 2)) + bloom * (0.35 + 0.2 * poor) * Math.exp(-dist / glowRadius));
      const vignette = 1 - 0.25 * (dist / half) ** 2;
      for (let c = 0; c < 3; c++) {
        const v = Math.min(1, skyLevel * skyTint[c] + level * base[c]) * vignette;
        d[i + c] = Math.round(255 * Math.pow(v, 1 / 2.2));
      }
    }
    g.putImageData(frame, 0, 0);
  };
}

/**
 * Rough eyepiece simulation: the photo is placed at the right scale inside a round field, then each pixel is dimmed by how far
 * the scope's reach (after sky glow) is from the target's brightness. Faint nebulosity and faint stars drop out first,
 * leaving bright stars on a grey or orange sky. This is an approximation, not a calibrated render.
 * Returns a function that draws one frame for a given amount of averted vision (0 = looking straight at it, 1 = looking to the side):
 * averted vision is more sensitive but softer and colourless.
 */
function prepareView(canvas: HTMLCanvasElement, img: HTMLImageElement, widthArcmin: number, mean: number, bg: number, fov: number, margin: number, pointMargin: number, skyGlow: number, center: { cx: number; cy: number } | undefined, point: boolean, quality: number) {
  const size = VIEW_SIZE * SCALE;
  canvas.width = canvas.height = size;
  const g = canvas.getContext("2d", { willReadFrequently: true });
  if (!g) return null;
  if (point) return preparePoint(g, size, pointMargin, skyGlow, quality);
  const pxPerArcmin = size / fov;
  const w = widthArcmin * pxPerArcmin;
  const h = w * (img.naturalHeight / img.naturalWidth);
  g.fillStyle = "#000";
  g.fillRect(0, 0, size, size);
  g.imageSmoothingQuality = "high";
  // Put the target (when we know where it is in the photo) in the middle of the field.
  const left = size / 2 - (center?.cx ?? 0.5) * w;
  const top = size / 2 - (center?.cy ?? 0.5) * h;
  g.drawImage(img, left, top, w, h);
  const sharp = g.getImageData(0, 0, size, size).data;
  // A softened copy, blended in for averted vision (skipped where the browser can't blur a canvas).
  const soft = document.createElement("canvas");
  soft.width = soft.height = size;
  const sg = soft.getContext("2d", { willReadFrequently: true });
  if (!sg) return null;
  sg.filter = "blur(3px)";
  sg.drawImage(canvas, 0, 0);
  const blur = sg.getImageData(0, 0, size, size).data;

  const frame = g.createImageData(size, size);
  const d = frame.data;
  const half = size / 2;
  // Per-pixel factors that don't change between frames: inside the round field, soft photo edge, and vignette.
  // Photos smaller than the field (planets in a wide view) get a proportionally smaller soft edge so they don't fade away.
  const feather = Math.max(0.5, Math.min(12, Math.min(w, h) / 4));
  const weight = new Float32Array(size * size);
  const vignette = new Float32Array(size * size);
  for (let p = 0; p < size * size; p++) {
    const px = p % size;
    const py = Math.floor(p / size);
    const r = Math.hypot(px - half, py - half) / half;
    if (r > 1) continue;
    const ex = Math.min(1, Math.max(0, Math.min(px - left, left + w - px) / feather));
    const ey = Math.min(1, Math.max(0, Math.min(py - top, top + h - py) / feather));
    weight[p] = ex * ey;
    vignette[p] = 1 - 0.25 * r * r;
  }
  const lut = new Float32Array(256).map((_, v) => Math.pow(v / 255, 2.2));
  // Optical quality: good optics add contrast and colour; poor optics flatten them, lift the sky with scattered light and soften the image.
  const poor = Math.max(0, -quality);
  const skyLevel = Math.pow(skyGlow, 2.5) * 0.3 + 0.015 * poor;
  const skyTint = [1, 0.82, 0.62];

  return (averted: number) => {
    const gain = Math.pow(10, 0.4 * (margin + AVERTED_BOOST * averted)) / mean;
    const soften = Math.min(1, 0.6 * averted + 0.6 * poor);
    // The eye sees almost no colour in the dark and none at all in averted vision; good optics keep more of the photo's colour.
    const colour = Math.max(0, (0.175 + 0.25 * quality) * (1 - averted));
    const contrast = 8 * (1 - 0.3 * quality);
    const tone = (x: number, w: number) => 1 - Math.exp(-Math.max(0, x * gain * w - 2.5) / contrast);
    const tint = [0.86 + 0.14 * colour, 0.93 + 0.07 * colour, 1.0];
    for (let p = 0; p < size * size; p++) {
      const i = p * 4;
      d[i + 3] = 255;
      if (vignette[p] === 0) {
        d[i] = d[i + 1] = d[i + 2] = 0;
        continue;
      }
      const lin0 = (lut[sharp[i]] + (lut[blur[i]] - lut[sharp[i]]) * soften) * COOL_BALANCE[0];
      const lin1 = (lut[sharp[i + 1]] + (lut[blur[i + 1]] - lut[sharp[i + 1]]) * soften) * COOL_BALANCE[1];
      const lin2 = (lut[sharp[i + 2]] + (lut[blur[i + 2]] - lut[sharp[i + 2]]) * soften) * COOL_BALANCE[2];
      const w = weight[p];
      const grey = tone(Math.max(0, 0.3 * lin0 + 0.59 * lin1 + 0.11 * lin2 - bg), w);
      for (let c = 0; c < 3; c++) {
        const chan = tone(Math.max(0, (c === 0 ? lin0 : c === 1 ? lin1 : lin2) - bg), w);
        const level = grey + (chan - grey) * colour;
        const v = Math.min(1, skyLevel * skyTint[c] + level * tint[c]) * vignette[p];
        d[i + c] = Math.round(255 * Math.pow(v, 1 / 2.2));
      }
    }
    g.putImageData(frame, 0, 0);
  };
}

const DETAILS = details as Record<string, TargetDetails>;

/** The facts we already have for a target, then the extra details and a short description. */
function TargetInfo({ row, settings }: { row: ScoredTarget; settings: Settings }) {
  const t = row.target;
  const extra = DETAILS[t.id];
  const level = isNakedEye(t, settings.bortle) ? "Naked Eye" : difficulty(row.score).label;
  const rows: [string, string][] = [
    ["Magnitude", t.magnitude.toFixed(1)],
    ["Size", formatSize(t.major, t.minor)],
  ];
  if (t.type !== "Star" && !t.planet && t.type !== "Moon") rows.push(["Surface brightness", `${surfaceBrightness(t).toFixed(1)} mag/arcmin²`]);
  if (extra) rows.push(["Distance", extra.distance]);
  rows.push(["Best time", `${t.bestSeason === "any" ? "Any season" : t.bestSeason[0].toUpperCase() + t.bestSeason.slice(1)}${row.bestHour === null ? "" : `, ${formatHour(row.bestHour)}`}`]);
  rows.push(["Peak altitude", row.peakAltitude > 0 ? `${row.peakAltitude.toFixed(0)}°` : "below horizon"]);
  rows.push(["Score", `${row.score.toFixed(0)} (${level})`]);
  for (const f of extra?.facts ?? []) rows.push([f.label, f.value]);
  return (
    <div className="astro-info">
      <h4>
        {t.id}
        {t.nickname && <span> {t.nickname}</span>}
      </h4>
      <div className="astro-info-sub">{t.type} · {t.constellation}</div>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      {extra && <p>{extra.about}</p>}
      {extra && (
        <>
          <h5>How to find it</h5>
          <p>{extra.howToFind}</p>
          <small>A fist held at arm's length is about 10°, three fingers about 5°, your thumb about 2°.</small>
        </>
      )}
    </div>
  );
}

export function hasPreview(id: string): boolean {
  return id in TARGET_IMAGES;
}

export function TargetPreview({ row, settings, x, y }: { row: ScoredTarget; settings: Settings; x: number; y: number }) {
  const info = TARGET_IMAGES[row.target.id];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const [loaded, setLoaded] = useState<{ img: HTMLImageElement; mean: number; bg: number } | null>(null);
  const alt = row.peakAltitude > 0 ? Math.max(20, row.peakAltitude) : 45;
  const view = viewConditions(row.target, settings, alt);
  // The preview eyepiece: more magnification shows a smaller patch of sky, bigger and dimmer.
  const eyepiece = previewOptics(settings);
  const fov = eyepiece.fov;
  const margin = view.margin - eyepiece.dimming;
  const skyGlow = view.skyGlow;
  const unresolved = row.target.major * ((VIEW_SIZE * SCALE) / fov) < 6;

  useEffect(() => {
    let cancelled = false;
    loadImage(info.src).then((img) => {
      if (!cancelled) setLoaded({ img, ...measurePhoto(img, info, row.target) });
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [info, row.target]);

  useEffect(() => {
    if (!loaded || !canvasRef.current) return;
    const render = prepareView(canvasRef.current, loaded.img, info.widthArcmin, loaded.mean, loaded.bg, fov, margin, view.pointMargin, skyGlow, info.footprint, unresolved, (effectiveQuality(settings) - 50) / 50);
    if (!render) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const show = (averted: number) => {
      render(averted);
      if (thumbRef.current) thumbRef.current.style.left = `${averted * 100}%`;
    };
    if (still) {
      show(0.5);
      return;
    }
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      // About 20 frames a second is plenty for a slow fade and keeps the per-pixel work light.
      if (now - last > 50) {
        last = now;
        show((1 - Math.cos((now / 1000) * ((2 * Math.PI) / CYCLE_SECONDS))) / 2);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [loaded, info.widthArcmin, info.footprint, fov, margin, skyGlow, unresolved, effectiveQuality(settings)]);

  const width = VIEW_SIZE * 2 + 48;
  const height = VIEW_SIZE + 520;
  const left = Math.min(x + 16, window.innerWidth - width - 8);
  const top = Math.min(y + 16, window.innerHeight - height);

  return (
    <div className="astro-preview" style={{ left: Math.max(8, left), top: Math.max(8, top) }}>
      <figure>
        <div className="astro-photo">
          <img src={info.src} alt={row.target.nickname || row.target.id} style={{ height: VIEW_SIZE }} />
          {loaded && <TargetCircle target={row.target} info={info} img={loaded.img} />}
        </div>
        <figcaption>Photo{loaded && info.footprint && row.target.major > 0 && row.target.major / info.widthArcmin < CIRCLE_BELOW ? " (target circled)" : ""}</figcaption>
      </figure>
      <figure>
        <canvas ref={canvasRef} style={{ width: VIEW_SIZE, height: VIEW_SIZE }} />
        <div className="astro-gaze" aria-hidden="true">
          <span>Direct</span>
          <div className="astro-gaze-track">
            <span ref={thumbRef} className="astro-gaze-thumb" />
          </div>
          <span>Averted</span>
        </div>
        <figcaption>Your view (approximate), {eyepiece.magnification.toFixed(0)}×</figcaption>
      </figure>
      <TargetInfo row={row} settings={settings} />
      <small>{info.credit}</small>
    </div>
  );
}
