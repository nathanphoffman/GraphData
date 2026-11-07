import type { ReactNode } from "react";
import { COLORS } from "../../model/style";
import type { Cell, EconomicSystemsData, EconomicSystemsViewsData } from "../../model/types";
import Stories from "./Stories";
import ViewsList from "./ViewsList";

interface Props {
  cell: Cell;
  model: EconomicSystemsData;
  views: EconomicSystemsViewsData["cells"][string];
  categories: string[];
  attitudes: ReactNode;
  combos: ReactNode;
}

/** One system: its summary, stories, common views, who is likely to like it, historical examples and blend buttons. */
export default function SystemDetails({ cell, model, views, categories, attitudes, combos }: Props) {
  return (
    <>
      <h2>{cell.name}</h2>
      <p className="muted">
        {model.rows[cell.row]} · {model.columns[cell.col]}. {views.summary}
      </p>
      <Stories examples={views.examples} />
      <ViewsList views={views.views} categories={categories} />
      {attitudes}
      <p className="views-examples">
        <strong>Historical examples:</strong> <span style={{ color: COLORS.auth }}>Auth:</span> {cell.auth} ·{" "}
        <span style={{ color: COLORS.dem }}>Dem:</span> {cell.dem}
      </p>
      <p className="views-note">Views commonly held by supporters of this system, as a summary and not a position.</p>
      {combos}
    </>
  );
}
