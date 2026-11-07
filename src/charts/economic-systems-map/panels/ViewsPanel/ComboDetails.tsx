import type { ReactNode } from "react";
import type { Combo, EconomicSystemsViewsData } from "../../model/types";
import Stories from "./Stories";
import ViewsList from "./ViewsList";

interface Props {
  combo: Combo;
  viewsModel: EconomicSystemsViewsData;
  attitudes: ReactNode;
}

/** A blend of two or four neighbouring systems: its summary, stories, views and who is likely to like it. */
export default function ComboDetails({ combo, viewsModel, attitudes }: Props) {
  return (
    <>
      <h2>{combo.name}</h2>
      <p className="muted">
        {combo.cells.join(" + ")}. {combo.summary}
      </p>
      <Stories examples={combo.examples} />
      <ViewsList views={combo.views} categories={viewsModel.categories} />
      {attitudes}
      <p className="views-note">
        A blend of {combo.cells.length === 2 ? "the two" : "all four"} systems, not a position anyone necessarily holds.
        Click the map elsewhere to pick a different one.
      </p>
    </>
  );
}
