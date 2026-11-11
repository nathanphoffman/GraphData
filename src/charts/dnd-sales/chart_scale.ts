import data from "../../../data/dnd-sales/dnd-sales.json";
import type { DndSalesData } from "./types";

export const model = data as DndSalesData;

export const WIDTH = 900;
export const HEIGHT = 420;
export const MARGIN = { top: 20, right: 24, bottom: 70, left: 56 };
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right;
const PLOT_H = HEIGHT - MARGIN.top - MARGIN.bottom;

/** The middle of an edition's slot, as a share of the slot. */
const SLOT_MIDDLE = 0.5;

export const maxValue = Math.ceil(Math.max(...model.editions.map((edition) => edition.high)));

/** Editions are spaced evenly (oldest first) so close release years don't overlap. */
const SLOT = PLOT_W / model.editions.length;

/** Horizontal position for each edition, evenly spaced. */
export const xScale = (index: number) => MARGIN.left + SLOT * (index + SLOT_MIDDLE);

/** Vertical position for a sales number. */
export const yScale = (value: number) => MARGIN.top + PLOT_H - (value / maxValue) * PLOT_H;
