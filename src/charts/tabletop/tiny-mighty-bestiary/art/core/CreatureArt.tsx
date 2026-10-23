import type { ReactNode } from "react";
import { ink, CARD_COLOR } from "./artStyle";
import { fantasyArt } from "../fantasy/set-1";
import { fantasyArtDK } from "../fantasy/set-2";
import { fantasyArtLP } from "../fantasy/set-3";
import { fantasyArtQZ } from "../fantasy/set-4";
import { occultNoirArt } from "../genres/occult-noir";
import { ageOfSailArt } from "../genres/age-of-sail";
import { restOtherworldlyArt } from "../rest/otherworldly";
import { restHumanoidsMonstersArt } from "../rest/humanoids-monsters";
import { restMachinesBeastsArt } from "../rest/machines-beasts";
import { postApocArt } from "../genres/post-apoc";
import { sciFiMonstersArt } from "../scifi/monsters";
import { sciFiHumanoidsArt } from "../scifi/humanoids";
import { sciFiMachinesArt } from "../scifi/machines";
import { westernArt } from "../genres/western";
import { pixelArt } from "../genres/PixelArt";

/** Maggots packed into a dome: rows of short capsules, tilted by a fixed pseudo-random angle. */
const maggots = Array.from({ length: 6 }, (_unused, row) => {
  const yPos = 196 - row * 20;
  const half = Math.sqrt(Math.max(0, 1 - (row / 6) ** 2)) * 130;
  const count = Math.max(1, Math.round(half / 15));

  // Spread the maggots evenly across the drawing.
  return Array.from({ length: count }, (_unused, index) => ({
    x: 200 + (count === 1 ? 0 : (index / (count - 1) - 0.5) * 2 * half),
    y: yPos,
    angle: ((row * 37 + index * 71) % 120) - 60,
  }));
}).flat();

function Fly({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="7" ry="4" fill="currentColor" />
      <circle cx="8" cy="0" r="3" fill="currentColor" />
      <ellipse cx="-2" cy="-7" rx="8" ry="4" fill={CARD_COLOR} {...ink} strokeWidth={2.5} transform="rotate(-25 -2 -7)" />
    </g>
  );
}

function MaggotSwarm() {
  return (
    <svg viewBox="0 0 400 240" role="img" aria-label="Drawing of a heap of maggots with flies above it">
      {/* Draw each maggot at its spot, turned to its angle. */}
      {maggots.map((maggot, index) => (
        <g key={index} transform={`translate(${maggot.x} ${maggot.y}) rotate(${maggot.angle})`}>
          <rect x="-11" y="-5" width="22" height="10" rx="5" fill={CARD_COLOR} {...ink} strokeWidth={3} />
          <path d="M-3 -4 V4 M3 -4 V4" fill="none" {...ink} strokeWidth={2} />
          <circle cx="7" cy="0" r="1.5" fill="currentColor" />
        </g>
      ))}
      <Fly x={110} y={70} />
      <Fly x={250} y={48} />
      <Fly x={310} y={92} />
      <path
        d="M120 62 q10 6 4 14 M250 40 q-8 -4 -4 -12"
        fill="none"
        {...ink}
        strokeWidth={2}
        strokeDasharray="2 6"
      />
      <path d="M20 218 H380" fill="none" {...ink} strokeWidth={3} strokeDasharray="2 10" />
    </svg>
  );
}

/** Ten stalks fanned over the top of the orb: [angle in degrees from straight up, length]. */
const stalks: [number, number][] = [
  [-80, 62], [-62, 78], [-44, 58], [-26, 80], [-9, 60], [9, 74], [26, 58], [44, 80], [62, 62], [80, 72],
];

function EyeTyrant() {
  const centerX = 200;
  const centerY = 150;
  const r = 66;

  return (
    <svg viewBox="0 0 400 240" role="img" aria-label="Drawing of a floating orb with one large eye, teeth and eye-stalks">
      {/* One eye stalk per angle and length. */}
      {stalks.map(([deg, len], index) => {
        const a = (deg * Math.PI) / 180;
        const startX = centerX + Math.sin(a) * (r - 4);
        const startY = centerY - Math.cos(a) * (r - 4);
        const x1 = centerX + Math.sin(a) * (r + len);
        const y1 = centerY - Math.cos(a) * (r + len) * 0.9;
        const bend = index % 2 ? 14 : -14;

        return (
          <g key={index}>
            <path
              d={`M${startX} ${startY} Q${(startX + x1) / 2 + bend} ${(startY + y1) / 2} ${x1} ${y1}`}
              fill="none"
              {...ink}
              strokeWidth={4}
            />
            <circle cx={x1} cy={y1} r="8" fill={CARD_COLOR} {...ink} strokeWidth={3} />
            <circle cx={x1} cy={y1} r="3" fill="currentColor" />
          </g>
        );
      })}
      <circle cx={centerX} cy={centerY} r={r} fill={CARD_COLOR} {...ink} />
      <ellipse cx={centerX} cy={centerY - 14} rx="34" ry="24" fill={CARD_COLOR} {...ink} strokeWidth={4} />
      <circle cx={centerX} cy={centerY - 14} r="14" fill="currentColor" />
      <circle cx={centerX - 5} cy={centerY - 19} r="4" fill={CARD_COLOR} />
      <path
        d="M146 172 Q200 200 254 172"
        fill="none"
        {...ink}
        strokeWidth={4}
      />
      <path
        d="M156 176 l6 12 l6 -9 l8 14 l7 -12 l9 14 l9 -14 l7 12 l8 -14 l6 9 l6 -12"
        fill="none"
        {...ink}
        strokeWidth={3}
      />
      <path d="M150 228 Q200 238 250 228" fill="none" {...ink} strokeWidth={3} strokeDasharray="2 10" />
    </svg>
  );
}

/** Black and white line art keyed by creature id. Creatures without an entry show no art. */
const art: Record<string, () => ReactNode> = {
  "maggot-swarm": MaggotSwarm,
  "eye-tyrant": EyeTyrant,
  ...fantasyArt,
  ...fantasyArtDK,
  ...fantasyArtLP,
  ...fantasyArtQZ,
  ...occultNoirArt,
  ...westernArt,
  ...sciFiMachinesArt,
  ...sciFiHumanoidsArt,
  ...sciFiMonstersArt,
  ...postApocArt,
  ...restMachinesBeastsArt,
  ...restHumanoidsMonstersArt,
  ...restOtherworldlyArt,
  ...ageOfSailArt,
  ...pixelArt,
};

export default function CreatureArt({ id }: { id: string }) {
  const Art = art[id];

  return Art ? (
    <div className="bestiary-art">
      <Art />
    </div>
  ) : null;
}
