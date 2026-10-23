import type { ReactNode } from "react";
import { Line, Shape } from "./artStyle";

/** Plain standing person, front view, centered on x=200. Accessories go in `children` and draw on top. */
export function Figure({ arms, head = true, children }: { arms?: ReactNode; head?: boolean; children?: ReactNode }) {
  return (
    <>
      <Shape d="M166 176 H196 V226 H166 Z M204 176 H234 V226 H204 Z" w={4} />
      <Shape d="M150 106 H250 L256 180 H144 Z" />
      {head && <Shape d="M174 74 C174 36 226 36 226 74 C226 100 174 100 174 74 Z" />}
      {arms ?? <Line d="M152 114 L126 172 M248 114 L274 172" w={7} />}
      {children}
    </>
  );
}
