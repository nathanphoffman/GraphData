import { HEIGHT, model, WIDTH } from "./chart_scale";
import EditionBar from "./parts/EditionBar";
import EditionNote from "./parts/EditionNote";
import GridLines from "./parts/GridLines";

/** D&D sales page: a bar for each edition with the range of estimates. */
export default function DndSales() {
  return (
    <div>
      <p className="muted">
        {model.unit}. As of {model.asOf}. Bars are the best guess, whiskers are the low-high range, and fainter bars
        mean less reliable data.
      </p>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="D&D sales by edition"
        style={{ width: "100%", maxWidth: WIDTH }}
      >
        <GridLines />
        {model.editions.map((edition, index) => (
          <EditionBar key={edition.id} edition={edition} index={index} />
        ))}
      </svg>

      <h2>How each number was reached</h2>
      {model.editions.map((edition) => (
        <EditionNote key={edition.id} edition={edition} />
      ))}
    </div>
  );
}
