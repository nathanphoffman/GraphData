import type { MouseEvent } from "react";

export type TipHandler = (event: MouseEvent, text: string) => void;

/** What the tooltip handlers need, shared by every dot. */
export interface TipProps {
  onTip: TipHandler;
  onTipHide: () => void;
}
