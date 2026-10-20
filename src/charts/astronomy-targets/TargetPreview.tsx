import { useEffect, useRef, useState } from "react";
import type { ScoredTarget, Settings, Target } from "./types";
import { viewConditions } from "./calculate";
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
function meanLinear(img: HTMLImageElement, info: TargetImage, target: Target): number {
  const w = 256;
  const h = Math.round(w * (img.naturalHeight / img.naturalWidth));
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  if (!g) return 0.05;
  g.drawImage(img, 0, 0, w, h);
  const px = g.getImageData(0, 0, w, h).data;
  const f = info.footprint;
  const pxPerArcmin = w / info.widthArcmin;
  const a = (target.major / 2) * pxPerArcmin;
  const b = (target.minor / 2) * pxPerArcmin;
  const angle = ((f?.angleDeg ?? 0) * Math.PI) / 180;
  let sum = 0;
  let n = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (f) {
        const dx = x - f.cx * w;
        const dy = y - f.cy * h;
        const u = dx * Math.cos(angle) + dy * Math.sin(angle);
        const v = -dx * Math.sin(angle) + dy * Math.cos(angle);
        if ((u / a) ** 2 + (v / b) ** 2 > 1) continue;
      }
      const i = (y * w + x) * 4;
      sum += Math.pow((0.3 * px[i] + 0.59 * px[i + 1] + 0.11 * px[i + 2]) / 255, 2.2);
      n++;
    }
  }
  return Math.max(0.005, n ? sum / n : 0.05);
}

/**
 * Rough eyepiece simulation: the photo is placed at the right scale inside a round field, then each pixel is dimmed by how far
 * the scope's reach (after sky glow) is from the target's brightness. Faint nebulosity and faint stars drop out first,
 * leaving bright stars on a grey or orange sky. This is an approximation, not a calibrated render.
 */
function drawView(canvas: HTMLCanvasElement, img: HTMLImageElement, widthArcmin: number, mean: number, fov: number, margin: number, skyGlow: number) {
  const size = VIEW_SIZE * SCALE;
  canvas.width = canvas.height = size;
  const g = canvas.getContext("2d", { willReadFrequently: true });
  if (!g) return;
  const pxPerArcmin = size / fov;
  const w = widthArcmin * pxPerArcmin;
  const h = w * (img.naturalHeight / img.naturalWidth);
  g.fillStyle = "#000";
  g.fillRect(0, 0, size, size);
  g.imageSmoothingQuality = "high";
  g.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
  const frame = g.getImageData(0, 0, size, size);
  const d = frame.data;
  const gain = Math.pow(10, 0.4 * margin) / mean;
  const skyLevel = Math.pow(skyGlow, 2.5) * 0.3;
  const half = size / 2;
  for (let i = 0; i < d.length; i += 4) {
    const p = i / 4;
    const x = (p % size) - half;
    const y = Math.floor(p / size) - half;
    const r = Math.hypot(x, y) / half;
    if (r > 1) {
      d[i] = d[i + 1] = d[i + 2] = 0;
      d[i + 3] = 255;
      continue;
    }
    const lin = [d[i], d[i + 1], d[i + 2]].map((v) => Math.pow(v / 255, 2.2));
    const lum = 0.3 * lin[0] + 0.59 * lin[1] + 0.11 * lin[2];
    // Soft edge where the photo ends so its border doesn't show.
    const ex = Math.min(1, Math.max(0, (w / 2 - Math.abs(x)) / 12));
    const ey = Math.min(1, Math.max(0, (h / 2 - Math.abs(y)) / 12));
    const seen = lum * gain * ex * ey;
    const level = 1 - Math.exp(-Math.max(0, seen - 2.5) / 8);
    // The eye sees almost no colour in the dark; keep a hint of the photo's tint.
    const vignette = 1 - 0.25 * r * r;
    const base = [0.86, 0.93, 1.0];
    for (let c = 0; c < 3; c++) {
      const tint = lum > 0 ? 0.85 + 0.15 * (lin[c] / lum) : 1;
      const sky = skyLevel * [1, 0.82, 0.62][c];
      const v = Math.min(1, sky + level * base[c] * tint) * vignette;
      d[i + c] = Math.round(255 * Math.pow(v, 1 / 2.2));
    }
    d[i + 3] = 255;
  }
  g.putImageData(frame, 0, 0);
}

export function hasPreview(id: string): boolean {
  return id in TARGET_IMAGES;
}

export function TargetPreview({ row, settings, x, y }: { row: ScoredTarget; settings: Settings; x: number; y: number }) {
  const info = TARGET_IMAGES[row.target.id];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState<{ img: HTMLImageElement; mean: number } | null>(null);
  const alt = row.peakAltitude > 0 ? Math.max(20, row.peakAltitude) : 45;
  const { fov, margin, skyGlow } = viewConditions(row.target, settings, alt);

  useEffect(() => {
    let cancelled = false;
    loadImage(info.src).then((img) => {
      if (!cancelled) setLoaded({ img, mean: meanLinear(img, info, row.target) });
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [info, row.target]);

  useEffect(() => {
    if (loaded && canvasRef.current) drawView(canvasRef.current, loaded.img, info.widthArcmin, loaded.mean, fov, margin, skyGlow);
  }, [loaded, info.widthArcmin, fov, margin, skyGlow]);

  const width = VIEW_SIZE * 2 + 48;
  const left = Math.min(x + 16, window.innerWidth - width - 8);
  const top = Math.min(y + 16, window.innerHeight - VIEW_SIZE - 90);

  return (
    <div className="astro-preview" style={{ left: Math.max(8, left), top: Math.max(8, top) }}>
      <figure>
        <img src={info.src} alt={row.target.nickname || row.target.id} style={{ height: VIEW_SIZE }} />
        <figcaption>Photo</figcaption>
      </figure>
      <figure>
        <canvas ref={canvasRef} style={{ width: VIEW_SIZE, height: VIEW_SIZE }} />
        <figcaption>Your view (approximate)</figcaption>
      </figure>
      <small>{info.credit}</small>
    </div>
  );
}
