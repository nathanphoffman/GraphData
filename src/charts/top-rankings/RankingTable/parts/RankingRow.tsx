import { PERCENT } from "../../maintenance/quality";
import { heat, InfoCell, NameCell, RatedCell, type SaveCell } from "../../RankingCells";
import { fractionBetween, letterGrade } from "../../score/grade";
import type { Item } from "../../score/ranking_types";
import type { TableColumns } from "../model/columns";
import type { RankedRow } from "../model/rankedRows";
import FeaturesCell from "./FeaturesCell";

interface RowProps {
  row: RankedRow;
  columns: TableColumns;
  showScore: boolean;
  scoreRange: [number, number];
  canEdit: boolean;
  saveCell: SaveCell;
  dimmed: boolean;
  dn?: number;
  languageColors?: Map<string, string>;
  onFeatures?: (item: Item) => void;
}

/** One ranked item: rank, name, information, score, grade and rated cells. */
export function RankingRow({
  row: rankedRow,
  columns,
  showScore,
  scoreRange,
  canEdit,
  saveCell,
  dimmed,
  dn,
  languageColors,
  onFeatures,
}: RowProps) {
  const { item, score, grade, rank } = rankedRow;
  const cell = { item, canEdit, saveCell };

  return (
    <tr className={dimmed ? "rankings-dimmed" : undefined}>
      <td>{dimmed ? "" : rank}</td>
      <NameCell
        item={item}
        linkIndex={columns.linkIndex}
        dn={dn}
        techLines={item.values[columns.techIndex]}
        languageColors={languageColors}
      />
      {columns.info.map(({ column, index }) => (
        <InfoCell key={column.label} {...cell} column={column} index={index} />
      ))}

      {showScore && (
        <td style={heat(fractionBetween(score, scoreRange[0], scoreRange[1]))}>{Number(score.toFixed(2))}</td>
      )}

      <td style={heat(grade / PERCENT)}>
        {grade.toFixed(1)}
        <small> ({letterGrade(grade)})</small>
      </td>
      {columns.rated.map(({ column, index }) => (
        <RatedCell
          key={column.label}
          {...cell}
          column={column}
          index={index}
          episodic={item.values[columns.episodicIndex]}
          techLines={item.values[columns.techIndex]}
          growth={item.values[columns.growthIndex]}
        />
      ))}

      {onFeatures && <FeaturesCell item={item} canEdit={canEdit} onOpen={onFeatures} />}
    </tr>
  );
}
