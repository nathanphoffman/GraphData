import { callApi } from "../../../../api";
import { LINES_LABEL, SCAFFOLDING_LINES, withQuality, withStatus } from "../../maintenance";
import type { SaveCell } from "../../RankingCells";
import { isNumber, type Ranking } from "../../score";

/**
 * Returns a function that saves one changed value of an item, keeping the rest of its saved values (`source`).
 * Completed Lines is shown with the scaffolding added, so that comes back off before saving.
 */
export function cellSaver(ranking: Ranking, source: Ranking, onSaved: () => Promise<void>): SaveCell {
  // The item and column pick the cell; the inner function runs once the new value has been typed.
  return (item, index) => async (value) => {
    const saved = source.items.find((candidate) => candidate.name === item.name) ?? item;
    const isLines = ranking.columns[index].label === LINES_LABEL && isNumber(value);

    // Copy the saved item with the one value changed; a Lines value comes back without the scaffolding lines.
    // Pad short value lists so every column has a value.
    const padded = ranking.columns.map((_, valueIndex) => saved.values[valueIndex] ?? null);
    const changed = {
      ...saved,
      values: padded.map((oldValue, valueIndex) =>
        valueIndex === index ? (isLines ? value - SCAFFOLDING_LINES : value) : oldValue,
      ),
    };

    // Quality and Status are worked out from the other values, so save them fresh along with the change.
    const { values } = withStatus(withQuality({ ...source, items: [changed] })).items[0];

    // Save the whole item; the server adds it or changes it by name.
    await callApi(`/api/rankings/${ranking.id}/items/${encodeURIComponent(item.name)}`, "PUT", { values });
    await onSaved();
  };
}
