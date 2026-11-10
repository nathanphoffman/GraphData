import type { ReactNode } from "react";

import { PALETTE, SPRITES } from "./pixel_sprites";

function Pixels({ id }: { id: string }) {
  return (
    <svg
      viewBox="0 0 400 240"
      role="img"
      // Hyphens in the id become spaces so the label reads as words.
      aria-label={`Pixel art drawing of a ${id.replace(/-/g, " ")}`}
      shapeRendering="crispEdges"
    >
      {/* Sprite rows are written as run-length text; draw each run of colour as one rectangle. */}
      {SPRITES[id].split("/").flatMap((row, index) => {
        let xPos = 0;

        // Each match is a colour letter followed by how many pixels in a row use it (one if missing).
        return [...row.matchAll(/(.)(\d*)/g)].flatMap(([, color, count]) => {
          const width = count ? Number(count) : 1;
          const rect =
            color === "."
              ? []
              : [
                  <rect
                    key={`${index}-${xPos}`}
                    x={xPos * 10}
                    y={index * 10}
                    width={width * 10}
                    height={10}
                    fill={PALETTE[color]}
                  />,
                ];
          xPos += width;

          return rect;
        });
      })}
    </svg>
  );
}

export const pixelArt: Record<string, () => ReactNode> = Object.fromEntries(
  Object.keys(SPRITES).map((identifier) => [identifier, () => <Pixels id={identifier} />]),
);
